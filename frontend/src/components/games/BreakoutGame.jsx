import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';

const BreakoutGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('breakout-high-score') || '0')
  );

  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 400;
  const PADDLE_WIDTH = 60;
  const PADDLE_HEIGHT = 10;
  const BALL_SIZE = 8;
  const BRICK_WIDTH = 30;
  const BRICK_HEIGHT = 15;
  const BRICK_ROWS = 6;
  const BRICK_COLS = 10;

  const gameState = useRef({
    paddle: {
      x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
      y: CANVAS_HEIGHT - 30,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      speed: 6
    },
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      speedX: 3,
      speedY: -3,
      size: BALL_SIZE
    },
    bricks: [],
    powerUps: []
  });

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

  const createBricks = useCallback(() => {
    const bricks = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          x: col * BRICK_WIDTH,
          y: row * BRICK_HEIGHT + 50,
          width: BRICK_WIDTH - 2,
          height: BRICK_HEIGHT - 2,
          color: colors[row % colors.length],
          destroyed: false,
          hits: 1
        });
      }
    }
    return bricks;
  }, []);

  const resetGame = useCallback(() => {
    gameState.current = {
      paddle: {
        x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
        y: CANVAS_HEIGHT - 30,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        speed: 6
      },
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        speedX: 3 * (Math.random() > 0.5 ? 1 : -1),
        speedY: -3,
        size: BALL_SIZE
      },
      bricks: createBricks(),
      powerUps: []
    };
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setGameWon(false);
  }, [createBricks]);

  const checkCollision = useCallback((rect1, rect2) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }, []);

  const updateGame = useCallback(() => {
    if (!gameRunning || gameOver || gameWon) return;

    const { paddle, ball, bricks } = gameState.current;

    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with walls
    if (ball.x <= 0 || ball.x >= CANVAS_WIDTH - ball.size) {
      ball.speedX = -ball.speedX;
    }
    if (ball.y <= 0) {
      ball.speedY = -ball.speedY;
    }

    // Ball collision with paddle
    const ballRect = { x: ball.x, y: ball.y, width: ball.size, height: ball.size };
    const paddleRect = { x: paddle.x, y: paddle.y, width: paddle.width, height: paddle.height };

    if (checkCollision(ballRect, paddleRect) && ball.speedY > 0) {
      ball.speedY = -ball.speedY;
      // Add some English based on where the ball hits the paddle
      const hitPos = (ball.x - paddle.x) / paddle.width;
      ball.speedX = (hitPos - 0.5) * 6;
    }

    // Ball collision with bricks
    bricks.forEach(brick => {
      if (!brick.destroyed && checkCollision(ballRect, brick)) {
        brick.destroyed = true;
        ball.speedY = -ball.speedY;
        setScore(prev => prev + 10);
        
        // Check if all bricks are destroyed
        if (bricks.every(b => b.destroyed)) {
          setGameWon(true);
          setGameRunning(false);
        }
      }
    });

    // Ball falls off screen
    if (ball.y > CANVAS_HEIGHT) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setGameRunning(false);
        } else {
          // Reset ball position
          ball.x = CANVAS_WIDTH / 2;
          ball.y = CANVAS_HEIGHT / 2;
          ball.speedX = 3 * (Math.random() > 0.5 ? 1 : -1);
          ball.speedY = -3;
        }
        return newLives;
      });
    }
  }, [gameRunning, gameOver, gameWon, checkCollision]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { paddle, ball, bricks } = gameState.current;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw bricks
    bricks.forEach(brick => {
      if (!brick.destroyed) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        
        // Brick border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });

    // Draw paddle
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    // Paddle border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Draw ball
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x + ball.size/2, ball.y + ball.size/2, ball.size/2, 0, Math.PI * 2);
    ctx.fill();

    // Draw UI
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 25);
    ctx.fillText(`Lives: ${lives}`, 10, 45);
    ctx.textAlign = 'right';
    ctx.fillText(`Level: ${level}`, CANVAS_WIDTH - 10, 25);
  }, [score, lives, level]);

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      updateGame();
      draw();
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameRunning, updateGame, draw]);

  // Mouse controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      if (!gameRunning) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      gameState.current.paddle.x = Math.max(0, 
        Math.min(CANVAS_WIDTH - gameState.current.paddle.width, mouseX - gameState.current.paddle.width / 2)
      );
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [gameRunning]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;
      
      const { paddle } = gameState.current;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          paddle.x = Math.max(0, paddle.x - paddle.speed);
          break;
        case 'ArrowRight':
          e.preventDefault();
          paddle.x = Math.min(CANVAS_WIDTH - paddle.width, paddle.x + paddle.speed);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('breakout-high-score', score.toString());
      onScoreUpdate?.({ game: 'breakout', score, isHighScore: true });
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
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs text-center">
        <div>
          <div className="text-xl font-bold text-green-400">{score}</div>
          <div className="text-xs text-gray-400">Score</div>
        </div>
        <div>
          <div className="text-xl font-bold text-yellow-400 flex items-center justify-center">
            <Trophy size={16} className="mr-1" />
            {highScore}
          </div>
          <div className="text-xs text-gray-400">Record</div>
        </div>
        <div>
          <div className="text-xl font-bold text-red-400">{lives}</div>
          <div className="text-xs text-gray-400">Vies</div>
        </div>
        <div>
          <div className="text-xl font-bold text-purple-400">{level}</div>
          <div className="text-xs text-gray-400">Niveau</div>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative border border-gray-600 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="cursor-none"
          style={{ background: '#000' }}
        />
        
        {/* Game Over Overlay */}
        {(gameOver || gameWon) && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className={`text-2xl font-bold ${gameWon ? 'text-green-400' : 'text-red-400'}`}>
                {gameWon ? 'Victoire!' : 'Game Over'}
              </div>
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
        {!gameRunning && !gameOver && !gameWon && (
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
        
        {(gameOver || gameWon) && (
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
        <p>Déplacez la souris ou utilisez ← → pour contrôler</p>
        <p>Cassez toutes les briques pour gagner</p>
      </div>
    </div>
  );
};

export default BreakoutGame;