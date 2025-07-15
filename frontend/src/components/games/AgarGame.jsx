import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';

const AgarGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('agar-high-score') || '0')
  );
  const [player, setPlayer] = useState({ x: 200, y: 200, size: 20 });
  const [food, setFood] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 200, y: 200 });
  const [gameTime, setGameTime] = useState(0);

  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 400;
  const FOOD_COUNT = 25;
  const ENEMY_COUNT = 8;

  // Generate random food
  const generateFood = useCallback(() => {
    const newFood = [];
    for (let i = 0; i < FOOD_COUNT; i++) {
      newFood.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
    return newFood;
  }, []);

  // Generate enemies
  const generateEnemies = useCallback(() => {
    const newEnemies = [];
    for (let i = 0; i < ENEMY_COUNT; i++) {
      newEnemies.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 30 + 15,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 50%, 40%)`
      });
    }
    return newEnemies;
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    setPlayer({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, size: 20 });
    setFood(generateFood());
    setEnemies(generateEnemies());
    setScore(0);
    setGameTime(0);
    setGameOver(false);
  }, [generateFood, generateEnemies]);

  // Mouse movement
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameRunning || gameOver) return;

    const gameLoop = setInterval(() => {
      setGameTime(prev => prev + 1);
      
      // Move player towards mouse
      setPlayer(prevPlayer => {
        const dx = mousePos.x - prevPlayer.x;
        const dy = mousePos.y - prevPlayer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
          const speed = Math.max(3 - prevPlayer.size / 20, 1);
          return {
            ...prevPlayer,
            x: prevPlayer.x + (dx / distance) * speed,
            y: prevPlayer.y + (dy / distance) * speed
          };
        }
        return prevPlayer;
      });

      // Move enemies
      setEnemies(prevEnemies => 
        prevEnemies.map(enemy => ({
          ...enemy,
          x: enemy.x + enemy.speedX,
          y: enemy.y + enemy.speedY,
          speedX: enemy.x <= 0 || enemy.x >= CANVAS_WIDTH ? -enemy.speedX : enemy.speedX,
          speedY: enemy.y <= 0 || enemy.y >= CANVAS_HEIGHT ? -enemy.speedY : enemy.speedY
        }))
      );

      // Check food collision
      setFood(prevFood => {
        const newFood = [...prevFood];
        setPlayer(prevPlayer => {
          let newPlayer = { ...prevPlayer };
          
          for (let i = newFood.length - 1; i >= 0; i--) {
            const foodItem = newFood[i];
            const dx = foodItem.x - newPlayer.x;
            const dy = foodItem.y - newPlayer.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < newPlayer.size / 2 + foodItem.size / 2) {
              newFood.splice(i, 1);
              newPlayer.size += 1;
              setScore(prevScore => prevScore + 10);
              
              // Add new food
              newFood.push({
                x: Math.random() * CANVAS_WIDTH,
                y: Math.random() * CANVAS_HEIGHT,
                size: Math.random() * 3 + 2,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`
              });
            }
          }
          
          return newPlayer;
        });
        
        return newFood;
      });

  // Check enemy collision
      setEnemies(prevEnemies => {
        let newEnemies = [...prevEnemies];
        
        setPlayer(prevPlayer => {
          let newPlayer = { ...prevPlayer };
          
          for (let i = newEnemies.length - 1; i >= 0; i--) {
            const enemy = newEnemies[i];
            const dx = enemy.x - newPlayer.x;
            const dy = enemy.y - newPlayer.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < newPlayer.size / 2 + enemy.size / 2) {
              if (newPlayer.size > enemy.size) {
                setScore(prevScore => prevScore + 50);
                newPlayer.size += 5;
                newEnemies.splice(i, 1);
                
                // Add new enemy
                newEnemies.push({
                  x: Math.random() * CANVAS_WIDTH,
                  y: Math.random() * CANVAS_HEIGHT,
                  size: Math.random() * 30 + 15,
                  speedX: (Math.random() - 0.5) * 2,
                  speedY: (Math.random() - 0.5) * 2,
                  color: `hsl(${Math.random() * 360}, 50%, 40%)`
                });
              } else {
                setGameOver(true);
                setGameRunning(false);
                return newPlayer;
              }
            }
          }
          
          return newPlayer;
        });
        
        return newEnemies;
      });

    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameRunning, mousePos, gameOver, player.x, player.y, player.size]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('agar-high-score', score.toString());
      onScoreUpdate?.({ game: 'agar', score, isHighScore: true });
    }
  }, [score, highScore, onScoreUpdate]);

  // Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CANVAS_WIDTH; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i <= CANVAS_HEIGHT; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }

    // Draw food
    food.forEach(foodItem => {
      ctx.fillStyle = foodItem.color;
      ctx.beginPath();
      ctx.arc(foodItem.x, foodItem.y, foodItem.size, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw enemies
    enemies.forEach(enemy => {
      ctx.fillStyle = enemy.color;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.size, 0, 2 * Math.PI);
      ctx.fill();
      
      // Enemy border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw player
    ctx.fillStyle = '#00ff88';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, 2 * Math.PI);
    ctx.fill();
    
    // Player border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

  }, [player, food, enemies]);

  const startGame = () => {
    initGame();
    setGameRunning(true);
  };

  const pauseGame = () => {
    setGameRunning(!gameRunning);
  };

  const resetGame = () => {
    setGameRunning(false);
    initGame();
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
          <div className="text-lg font-bold text-blue-400">{player.size}</div>
          <div className="text-xs text-gray-400">Taille</div>
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
          className="cursor-crosshair"
          style={{ background: '#1a1a1a' }}
        />
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-red-400">Game Over</div>
              <div className="text-lg text-white">Score: {score}</div>
              <div className="text-sm text-blue-400">Taille finale: {player.size}</div>
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
        <p>Déplacez la souris pour diriger votre cellule</p>
        <p>Mangez la nourriture colorée pour grandir</p>
        <p>Évitez les ennemis plus gros que vous</p>
      </div>
    </div>
  );
};

export default AgarGame;