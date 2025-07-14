import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';

const SnakeGame = ({ onScoreUpdate }) => {
  const GRID_SIZE = 20;
  const GRID_WIDTH = 15;
  const GRID_HEIGHT = 20;
  
  const [snake, setSnake] = useState([{ x: 7, y: 10 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('snake-high-score') || '0')
  );
  const [speed, setSpeed] = useState(150);

  // Generate random food position
  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  // Check collision
  const checkCollision = useCallback((head) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
      return true;
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }, [snake]);

  // Game loop
  useEffect(() => {
    if (!gameRunning || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;
        
        if (checkCollision(head)) {
          setGameOver(true);
          setGameRunning(false);
          return prevSnake;
        }
        
        newSnake.unshift(head);
        
        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
          const newScore = score + 10;
          setScore(newScore);
          setFood(generateFood());
          
          // Increase speed every 50 points
          if (newScore % 50 === 0) {
            setSpeed(prevSpeed => Math.max(prevSpeed - 10, 80));
          }
        } else {
          newSnake.pop();
        }
        
        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [gameRunning, direction, food, score, speed, checkCollision, generateFood, gameOver]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection(prev => prev.y === 0 ? { x: 0, y: -1 } : prev);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection(prev => prev.y === 0 ? { x: 0, y: 1 } : prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection(prev => prev.x === 0 ? { x: -1, y: 0 } : prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection(prev => prev.x === 0 ? { x: 1, y: 0 } : prev);
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
      localStorage.setItem('snake-high-score', score.toString());
      onScoreUpdate?.({ game: 'snake', score, isHighScore: true });
    }
  }, [score, highScore, onScoreUpdate]);

  const startGame = () => {
    setSnake([{ x: 7, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
    setSpeed(150);
  };

  const pauseGame = () => {
    setGameRunning(!gameRunning);
  };

  const resetGame = () => {
    setGameRunning(false);
    setGameOver(false);
    setSnake([{ x: 7, y: 10 }]);
    setFood({ x: 10, y: 10 });
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setSpeed(150);
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

      {/* Game Board */}
      <div className="relative bg-gray-800 border border-gray-600 rounded-lg p-2">
        <div 
          className="grid gap-px bg-gray-700"
          style={{
            gridTemplateColumns: `repeat(${GRID_WIDTH}, ${GRID_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_HEIGHT}, ${GRID_SIZE}px)`
          }}
        >
          {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, i) => {
            const x = i % GRID_WIDTH;
            const y = Math.floor(i / GRID_WIDTH);
            
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;
            
            return (
              <div
                key={i}
                className={`w-5 h-5 ${
                  isFood 
                    ? 'bg-red-500 rounded-full' 
                    : isHead 
                      ? 'bg-green-300 rounded-sm' 
                      : isSnake 
                        ? 'bg-green-500 rounded-sm' 
                        : 'bg-gray-900'
                }`}
              />
            );
          })}
        </div>
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-red-400">Game Over</div>
              <div className="text-lg text-white">Score: {score}</div>
              {score === highScore && (
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
          onClick={resetGame}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={16} className="text-white" />
          <span className="text-white text-sm">Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-400 text-xs space-y-1">
        <p>Utilisez les flèches pour diriger le serpent</p>
        <p>Mangez la nourriture rouge pour grandir</p>
      </div>
    </div>
  );
};

export default SnakeGame;