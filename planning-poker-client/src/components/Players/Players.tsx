import { Grow } from '@mui/material';
import React from 'react';
import { Game, GameResponse } from '../../types/game';
import { Player } from '../../types/player';
import { PlayerCard } from './PlayerCard/PlayerCard';
import './Players.css';

interface PlayersProps {
  game: GameResponse;
  players: Player[];
  currentPlayerId: string;
}
export const Players: React.FC<PlayersProps> = ({ game, players, currentPlayerId }) => {
  return (
    <Grow in={true} timeout={800}>
      <div className='PlayersContainer'>
        {players.map((player: Player) => (
          <PlayerCard key={player.playerId} game={game} player={player} currentPlayerId={currentPlayerId} />
        ))}
      </div>
    </Grow>
  );
};