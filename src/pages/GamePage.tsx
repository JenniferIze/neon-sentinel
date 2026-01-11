import { useEffect, useRef } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { initGame } from '../game/Game';

function GamePage() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    if (!gameContainerRef.current) return;

    // Initialize Phaser game
    const game = initGame(gameContainerRef.current);
    gameInstanceRef.current = game;

    // Cleanup on unmount
    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, []);

  // Expose wallet address to game scenes via game registry
  useEffect(() => {
    if (gameInstanceRef.current && primaryWallet) {
      const walletAddress = primaryWallet.address;
      gameInstanceRef.current.registry.set('walletAddress', walletAddress);
    } else if (gameInstanceRef.current) {
      gameInstanceRef.current.registry.set('walletAddress', undefined);
    }
  }, [primaryWallet]);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden scanlines">
      <div 
        ref={gameContainerRef} 
        className="flex items-center justify-center w-full h-full"
      />
    </div>
  );
}

export default GamePage;

