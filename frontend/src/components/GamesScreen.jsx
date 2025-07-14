import React, { useState } from 'react';
import { ArrowLeft, Trophy, Clock, Target } from 'lucide-react';
import SnakeGame from './games/SnakeGame';
import AgarGame from './games/AgarGame';
import TetrisGame from './games/TetrisGame';
import PongGame from './games/PongGame';
import FlappyBirdGame from './games/FlappyBirdGame';
import BreakoutGame from './games/BreakoutGame';
import { gameScores } from '../data/mockData';

const GamesScreen = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [scores, setScores] = useState(gameScores);

  const handleScoreUpdate = (gameData) => {
    setScores(prev => ({
      ...prev,
      [gameData.game]: {
        ...prev[gameData.game],
        highScore: Math.max(prev[gameData.game].highScore, gameData.score)
      }
    }));
  };

  const games = [
    {
      id: 'snake',
      name: 'Snake',
      description: 'Jeu classique du serpent qui grandit',
      icon: '🐍',
      highScore: scores.snake.highScore,
      difficulty: 'Facile',
      component: SnakeGame
    },
    {
      id: 'tetris',
      name: 'Tetris',
      description: 'Alignez les blocs pour faire des lignes',
      icon: '🧩',
      highScore: scores.tetris.highScore,
      difficulty: 'Moyen',
      component: TetrisGame
    },
    {
      id: 'pong',
      name: 'Pong',
      description: 'Tennis de table rétro contre IA',
      icon: '🏓',
      highScore: scores.pong.highScore,
      difficulty: 'Moyen',
      component: PongGame
    },
    {
      id: 'flappy',
      name: 'Flappy Bird',
      description: 'Volez entre les obstacles',
      icon: '🐦',
      highScore: scores.flappy.highScore,
      difficulty: 'Difficile',
      component: FlappyBirdGame
    },
    {
      id: 'breakout',
      name: 'Breakout',
      description: 'Cassez les briques avec la balle',
      icon: '🧱',
      highScore: scores.breakout.highScore,
      difficulty: 'Moyen',
      component: BreakoutGame
    },
    {
      id: 'agar',
      name: 'Agar.io',
      description: 'Mangez pour grandir, évitez les prédateurs',
      icon: '🟢',
      highScore: scores.agar.highScore,
      difficulty: 'Difficile',
      component: AgarGame
    }
  ];

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <div className="h-full flex flex-col">
        {/* Game Header */}
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <button
            onClick={() => setSelectedGame(null)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <h1 className="text-xl font-bold text-white">{selectedGame.name}</h1>
          <div className="flex items-center space-x-2">
            <Trophy size={18} className="text-yellow-400" />
            <span className="text-yellow-400 font-bold">{selectedGame.highScore}</span>
          </div>
        </div>
        
        {/* Game Content */}
        <div className="flex-1 overflow-hidden">
          <GameComponent onScoreUpdate={handleScoreUpdate} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold text-white mb-2">Mini-Jeux</h1>
        <p className="text-gray-400 text-sm">Détendez-vous avec quelques jeux</p>
      </div>
      
      {/* Games Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{game.icon}</div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg">{game.name}</h3>
                <p className="text-gray-400 text-sm">{game.description}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Target size={14} className="text-blue-400" />
                    <span className="text-blue-400 text-sm">{game.difficulty}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{game.highScore}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-gray-400">
                <ArrowLeft size={20} className="rotate-180" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Game Stats */}
      <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-400">{games.length}</div>
            <div className="text-xs text-gray-400">Jeux</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {Math.max(...games.map(g => g.highScore))}
            </div>
            <div className="text-xs text-gray-400">Meilleur score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {games.reduce((sum, g) => sum + g.highScore, 0)}
            </div>
            <div className="text-xs text-gray-400">Total points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesScreen;