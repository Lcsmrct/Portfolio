import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';

const PongGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('pong-high-score') || '0')
  );
  const [difficulty, setDifficulty] = useState('medium');

  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 400;
  const PADDLE_WIDTH = 10;
  const PADDLE_HEIGHT = 60;
  const BALL_SIZE = 8;
  const WINNING_SCORE = 10;

  const gameState = useRef({
    player: {
      x: 10,
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      speed: 5
    },
    ai: {
      x: CANVAS_WIDTH - 20,
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      speed: 3
    },
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      speedX: 4,
      speedY: 3,
      size: BALL_SIZE
    }
  });

  const getDifficultySettings = useCallback(() => {
    switch (difficulty) {
      case 'easy':
        return { aiSpeed: 2, ballSpeed: 3 };
      case 'medium':
        return { aiSpeed: 3, ballSpeed: 4 };
      case 'hard':
        return { aiSpeed: 4, ballSpeed: 5 };
      default:
        return { aiSpeed: 3, ballSpeed: 4 };
    }
  }, [difficulty]);

  const resetBall = useCallback(() => {
    const settings = getDifficultySettings();
    gameState.current.ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      speedX: (Math.random() > 0.5 ? 1 : -1) * settings.ballSpeed,
      speedY: (Math.random() > 0.5 ? 1 : -1) * settings.ballSpeed,
      size: BALL_SIZE
    };
  }, [getDifficultySettings]);

  const resetGame = useCallback(() => {
    setScore({ player: 0, ai: 0 });
    setGameOver(false);
    gameState.current = {
      player: {
        x: 10,
        y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        speed: 5
      },
      ai: {
        x: CANVAS_WIDTH - 20,
        y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        speed: getDifficultySettings().aiSpeed
      },
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        speedX: 4,
        speedY: 3,
        size: BALL_SIZE
      }
    };
    resetBall();
  }, [getDifficultySettings, resetBall]);

  const checkCollision = useCallback((rect1, rect2) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }, []);

  const updateGame = useCallback(() => {
    if (!gameRunning || gameOver) return;

    const { player, ai, ball } = gameState.current;

    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom walls
    if (ball.y <= 0 || ball.y >= CANVAS_HEIGHT - ball.size) {
      ball.speedY = -ball.speedY;
    }

    // Ball collision with paddles
    const ballRect = { x: ball.x, y: ball.y, width: ball.size, height: ball.size };
    const playerRect = { x: player.x, y: player.y, width: PADDLE_WIDTH, height: PADDLE_HEIGHT };
    const aiRect = { x: ai.x, y: ai.y, width: PADDLE_WIDTH, height: PADDLE_HEIGHT };

    if (checkCollision(ballRect, playerRect) && ball.speedX < 0) {
      ball.speedX = -ball.speedX;
      ball.speedY += (ball.y - (player.y + PADDLE_HEIGHT / 2)) * 0.1;
    }

    if (checkCollision(ballRect, aiRect) && ball.speedX > 0) {
      ball.speedX = -ball.speedX;
      ball.speedY += (ball.y - (ai.y + PADDLE_HEIGHT / 2)) * 0.1;
    }

    // AI movement
    const aiCenter = ai.y + PADDLE_HEIGHT / 2;
    const ballCenter = ball.y + ball.size / 2;
    
    if (ballCenter < aiCenter - 20) {
      ai.y = Math.max(0, ai.y - ai.speed);
    } else if (ballCenter > aiCenter + 20) {
      ai.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, ai.y + ai.speed);
    }

    // Scoring
    if (ball.x < 0) {
      setScore(prev => {
        const newScore = { ...prev, ai: prev.ai + 1 };
        if (newScore.ai >= WINNING_SCORE) {
          setGameOver(true);
          setGameRunning(false);
        }
        return newScore;
      });
      resetBall();
    } else if (ball.x > CANVAS_WIDTH) {
      setScore(prev => {
        const newScore = { ...prev, player: prev.player + 1 };
        if (newScore.player >= WINNING_SCORE) {
          setGameOver(true);
          setGameRunning(false);
          if (newScore.player > highScore) {
            setHighScore(newScore.player);
            localStorage.setItem('pong-high-score', newScore.player.toString());
            onScoreUpdate?.({ game: 'pong', score: newScore.player, isHighScore: true });
          }
        }
        return newScore;
      });
      resetBall();
    }
  }, [gameRunning, gameOver, checkCollision, resetBall, highScore, onScoreUpdate]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { player, ai, ball } = gameState.current;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(player.x, player.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(ai.x, ai.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    // Draw scores
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(score.player.toString(), CANVAS_WIDTH / 4, 30);
    ctx.fillText(score.ai.toString(), (3 * CANVAS_WIDTH) / 4, 30);
  }, [score]);

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      updateGame();
      draw();
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameRunning, updateGame, draw]);

  // Mouse/Touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      if (!gameRunning) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      gameState.current.player.y = Math.max(0, 
        Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, mouseY - PADDLE_HEIGHT / 2)
      );
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!gameRunning) return;
      
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchY = touch.clientY - rect.top;
      gameState.current.player.y = Math.max(0, 
        Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, touchY - PADDLE_HEIGHT / 2)
      );
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameRunning]);

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
          <div className="text-2xl font-bold text-green-400">{score.player}</div>
          <div className="text-xs text-gray-400">Joueur</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center">
            <Trophy size={20} className="mr-1" />
            {highScore}
          </div>
          <div className="text-xs text-gray-400">Record</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{score.ai}</div>
          <div className="text-xs text-gray-400">IA</div>
        </div>
      </div>

      {/* Difficulty */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-400 text-sm">Difficulté:</span>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-gray-800 text-white rounded px-2 py-1 text-sm"
          disabled={gameRunning}
        >
          <option value="easy">Facile</option>
          <option value="medium">Moyen</option>
          <option value="hard">Difficile</option>
        </select>
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
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-white">
                {score.player > score.ai ? 'Victoire!' : 'Défaite!'}
              </div>
              <div className="text-lg text-white">
                {score.player} - {score.ai}
              </div>
              {score.player === highScore && score.player > 0 && (
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
        <p>Déplacez la souris pour contrôler votre raquette</p>
        <p>Premier à {WINNING_SCORE} points gagne</p>
      </div>
    </div>
  );
};

export default PongGame;