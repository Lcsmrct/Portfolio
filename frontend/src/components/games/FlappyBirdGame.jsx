import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';

const FlappyBirdGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('flappy-high-score') || '0')
  );

  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 400;
  const BIRD_SIZE = 20;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 120;
  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const PIPE_SPEED = 2;

  const gameState = useRef({
    bird: {
      x: 50,
      y: CANVAS_HEIGHT / 2,
      velocity: 0,
      size: BIRD_SIZE
    },
    pipes: [],
    score: 0,
    frameCount: 0
  });

  const createPipe = useCallback(() => {
    const minHeight = 50;
    const maxHeight = CANVAS_HEIGHT - PIPE_GAP - minHeight;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    
    return {
      x: CANVAS_WIDTH,
      topHeight: topHeight,
      bottomY: topHeight + PIPE_GAP,
      bottomHeight: CANVAS_HEIGHT - (topHeight + PIPE_GAP),
      passed: false
    };
  }, []);

  const resetGame = useCallback(() => {
    gameState.current = {
      bird: {
        x: 50,
        y: CANVAS_HEIGHT / 2,
        velocity: 0,
        size: BIRD_SIZE
      },
      pipes: [createPipe()],
      score: 0,
      frameCount: 0
    };
    setScore(0);
    setGameOver(false);
  }, [createPipe]);

  const checkCollision = useCallback((bird, pipe) => {
    // Check collision with top pipe
    if (bird.x < pipe.x + PIPE_WIDTH &&
        bird.x + bird.size > pipe.x &&
        bird.y < pipe.topHeight) {
      return true;
    }
    
    // Check collision with bottom pipe
    if (bird.x < pipe.x + PIPE_WIDTH &&
        bird.x + bird.size > pipe.x &&
        bird.y + bird.size > pipe.bottomY) {
      return true;
    }
    
    return false;
  }, []);

  const updateGame = useCallback(() => {
    if (!gameRunning || gameOver) return;

    const { bird, pipes } = gameState.current;
    gameState.current.frameCount++;

    // Update bird
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;

    // Check ground and ceiling collision
    if (bird.y <= 0 || bird.y >= CANVAS_HEIGHT - bird.size) {
      setGameOver(true);
      setGameRunning(false);
      return;
    }

    // Update pipes
    pipes.forEach(pipe => {
      pipe.x -= PIPE_SPEED;
      
      // Check collision
      if (checkCollision(bird, pipe)) {
        setGameOver(true);
        setGameRunning(false);
        return;
      }
      
      // Check score
      if (!pipe.passed && bird.x > pipe.x + PIPE_WIDTH) {
        pipe.passed = true;
        gameState.current.score++;
        setScore(gameState.current.score);
      }
    });

    // Remove pipes that have passed
    gameState.current.pipes = pipes.filter(pipe => pipe.x > -PIPE_WIDTH);

    // Add new pipe
    if (gameState.current.frameCount % 120 === 0) {
      gameState.current.pipes.push(createPipe());
    }
  }, [gameRunning, gameOver, checkCollision, createPipe]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { bird, pipes } = gameState.current;

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw pipes
    ctx.fillStyle = '#228B22';
    pipes.forEach(pipe => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, pipe.bottomHeight);
      
      // Pipe caps
      ctx.fillStyle = '#32CD32';
      ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
      ctx.fillRect(pipe.x - 5, pipe.bottomY, PIPE_WIDTH + 10, 20);
      ctx.fillStyle = '#228B22';
    });

    // Draw bird
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(bird.x + bird.size/2, bird.y + bird.size/2, bird.size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(bird.x + bird.size/2 + 5, bird.y + bird.size/2 - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird beak
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(bird.x + bird.size, bird.y + bird.size/2);
    ctx.lineTo(bird.x + bird.size + 8, bird.y + bird.size/2 - 3);
    ctx.lineTo(bird.x + bird.size + 8, bird.y + bird.size/2 + 3);
    ctx.fill();

    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeText(score.toString(), CANVAS_WIDTH/2, 50);
    ctx.fillText(score.toString(), CANVAS_WIDTH/2, 50);
  }, [score]);

  const jump = useCallback(() => {
    if (gameRunning) {
      gameState.current.bird.velocity = JUMP_FORCE;
    }
  }, [gameRunning]);

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      updateGame();
      draw();
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameRunning, updateGame, draw]);

  // Controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      jump();
    };

    window.addEventListener('keydown', handleKeyPress);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (canvas) {
        canvas.removeEventListener('click', handleClick);
      }
    };
  }, [jump]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappy-high-score', score.toString());
      onScoreUpdate?.({ game: 'flappy', score, isHighScore: true });
    }
  }, [score, highScore, onScoreUpdate]);

  const startGame = () => {
    resetGame();
    setGameRunning(true);
  };

  const pauseGame = () => {
    setGameRunning(!gameRunning);
  };

  const resetGameHandler = () => {
    setGameRunning(false);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* Score */}
      <div className="flex justify-between w-full max-w-xs">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{score}</div>
          <div className="text-xs text-gray-400">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center">
            <Trophy size={20} className="mr-1" />
            {highScore}
          </div>
          <div className="text-xs text-gray-400">Record</div>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative border border-gray-600 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="cursor-pointer"
        />
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-red-400">Game Over</div>
              <div className="text-lg text-white">Score: {score}</div>
              {score === highScore && score > 0 && (
                <div className="text-sm text-yellow-400">🎉 Nouveau record !</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex space-x-2">
        {!gameRunning && !gameOver && (
          <button
            onClick={startGame}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Play size={16} className="text-white" />
            <span className="text-white text-sm">Jouer</span>
          </button>
        )}
        
        {gameRunning && (
          <button
            onClick={pauseGame}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Pause size={16} className="text-white" />
            <span className="text-white text-sm">Pause</span>
          </button>
        )}
        
        {gameOver && (
          <button
            onClick={startGame}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Play size={16} className="text-white" />
            <span className="text-white text-sm">Rejouer</span>
          </button>
        )}
        
        <button
          onClick={resetGameHandler}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={16} className="text-white" />
          <span className="text-white text-sm">Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-400 text-xs space-y-1">
        <p>Cliquez ou appuyez sur Espace pour voler</p>
        <p>Évitez les tuyaux verts</p>
      </div>
    </div>
  );
};

export default FlappyBirdGame;