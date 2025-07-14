import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, RotateCw } from 'lucide-react';

const TetrisGame = ({ onScoreUpdate }) => {
  const GRID_WIDTH = 10;
  const GRID_HEIGHT = 20;
  const INITIAL_SPEED = 500;
  
  const TETROMINOES = {
    I: {
      shape: [[1, 1, 1, 1]],
      color: '#00FFFF'
    },
    O: {
      shape: [[1, 1], [1, 1]],
      color: '#FFFF00'
    },
    T: {
      shape: [[0, 1, 0], [1, 1, 1]],
      color: '#800080'
    },
    S: {
      shape: [[0, 1, 1], [1, 1, 0]],
      color: '#00FF00'
    },
    Z: {
      shape: [[1, 1, 0], [0, 1, 1]],
      color: '#FF0000'
    },
    J: {
      shape: [[1, 0, 0], [1, 1, 1]],
      color: '#0000FF'
    },
    L: {
      shape: [[0, 0, 1], [1, 1, 1]],
      color: '#FFA500'
    }
  };

  const [grid, setGrid] = useState(() => 
    Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('tetris-high-score') || '0')
  );

  const getRandomPiece = useCallback(() => {
    const keys = Object.keys(TETROMINOES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return {
      type: randomKey,
      shape: TETROMINOES[randomKey].shape,
      color: TETROMINOES[randomKey].color,
      x: Math.floor(GRID_WIDTH / 2) - 1,
      y: 0
    };
  }, []);

  const rotatePiece = useCallback((piece) => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return { ...piece, shape: rotated };
  }, []);

  const isValidMove = useCallback((piece, newX, newY, newShape = null) => {
    const shape = newShape || piece.shape;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const nextX = newX + x;
          const nextY = newY + y;
          
          if (nextX < 0 || nextX >= GRID_WIDTH || nextY >= GRID_HEIGHT) {
            return false;
          }
          
          if (nextY >= 0 && grid[nextY][nextX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, [grid]);

  const clearLines = useCallback(() => {
    let linesCleared = 0;
    const newGrid = grid.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    while (newGrid.length < GRID_HEIGHT) {
      newGrid.unshift(Array(GRID_WIDTH).fill(0));
    }
    
    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared);
      setScore(prev => prev + linesCleared * 100 * level);
      setLevel(prev => Math.floor((lines + linesCleared) / 10) + 1);
    }
    
    return newGrid;
  }, [grid, level, lines]);

  const placePiece = useCallback(() => {
    if (!currentPiece) return;
    
    const newGrid = [...grid];
    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const gridY = currentPiece.y + y;
          const gridX = currentPiece.x + x;
          if (gridY >= 0) {
            newGrid[gridY][gridX] = currentPiece.color;
          }
        }
      });
    });
    
    setGrid(newGrid);
    setCurrentPiece(getRandomPiece());
  }, [currentPiece, grid, getRandomPiece]);

  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || !gameRunning) return;
    
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;
    
    if (isValidMove(currentPiece, newX, newY)) {
      setCurrentPiece(prev => ({ ...prev, x: newX, y: newY }));
    } else if (dy > 0) {
      placePiece();
    }
  }, [currentPiece, gameRunning, isValidMove, placePiece]);

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || !gameRunning) return;
    
    const rotated = rotatePiece(currentPiece);
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, rotated.shape)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, gameRunning, rotatePiece, isValidMove]);

  // Game loop
  useEffect(() => {
    if (!gameRunning || gameOver) return;
    
    const gameLoop = setInterval(() => {
      movePiece(0, 1);
    }, speed);
    
    return () => clearInterval(gameLoop);
  }, [gameRunning, gameOver, speed, movePiece]);

  // Clear lines effect
  useEffect(() => {
    if (!gameRunning) return;
    
    const newGrid = clearLines();
    if (newGrid !== grid) {
      setGrid(newGrid);
    }
  }, [grid, clearLines, gameRunning]);

  // Speed adjustment
  useEffect(() => {
    setSpeed(Math.max(INITIAL_SPEED - (level - 1) * 50, 50));
  }, [level]);

  // Game over check
  useEffect(() => {
    if (currentPiece && !isValidMove(currentPiece, currentPiece.x, currentPiece.y)) {
      setGameOver(true);
      setGameRunning(false);
    }
  }, [currentPiece, isValidMove]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          rotatePieceHandler();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, movePiece, rotatePieceHandler]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('tetris-high-score', score.toString());
      onScoreUpdate?.({ game: 'tetris', score, isHighScore: true });
    }
  }, [score, highScore, onScoreUpdate]);

  const renderGrid = () => {
    const displayGrid = grid.map(row => [...row]);
    
    // Add current piece to display
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell && currentPiece.y + y >= 0) {
            displayGrid[currentPiece.y + y][currentPiece.x + x] = currentPiece.color;
          }
        });
      });
    }
    
    return displayGrid;
  };

  const startGame = () => {
    setGrid(Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(0)));
    setCurrentPiece(getRandomPiece());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setGameRunning(true);
    setSpeed(INITIAL_SPEED);
  };

  const pauseGame = () => {
    setGameRunning(!gameRunning);
  };

  const resetGame = () => {
    setGameRunning(false);
    setGameOver(false);
    setGrid(Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(0)));
    setCurrentPiece(null);
    setScore(0);
    setLines(0);
    setLevel(1);
    setSpeed(INITIAL_SPEED);
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
          <div className="text-xl font-bold text-blue-400">{lines}</div>
          <div className="text-xs text-gray-400">Lignes</div>
        </div>
        <div>
          <div className="text-xl font-bold text-purple-400">{level}</div>
          <div className="text-xs text-gray-400">Niveau</div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative bg-gray-800 border border-gray-600 rounded-lg p-2">
        <div 
          className="grid gap-px bg-gray-700"
          style={{
            gridTemplateColumns: `repeat(${GRID_WIDTH}, 15px)`,
            gridTemplateRows: `repeat(${GRID_HEIGHT}, 15px)`
          }}
        >
          {renderGrid().map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className="w-4 h-4 border border-gray-600"
                style={{
                  backgroundColor: cell || '#111'
                }}
              />
            ))
          )}
        </div>
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-red-400">Game Over</div>
              <div className="text-lg text-white">Score: {score}</div>
              <div className="text-sm text-blue-400">Lignes: {lines}</div>
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
        
        {gameRunning && (
          <button
            onClick={rotatePieceHandler}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <RotateCw size={16} className="text-white" />
            <span className="text-white text-sm">Rotation</span>
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-400 text-xs space-y-1">
        <p>↑ ou Espace: Rotation | ← →: Déplacer</p>
        <p>↓: Descendre plus vite</p>
      </div>
    </div>
  );
};

export default TetrisGame;