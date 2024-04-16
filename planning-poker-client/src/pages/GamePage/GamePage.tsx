import React, { FunctionComponent, ReactNode } from 'react';
import { Poker } from '../../components/Poker/Poker';
import './GamePage.css';

export const GamePage : FunctionComponent = () => {
  return (
    <div>
        <Poker />
    </div>
  );
};