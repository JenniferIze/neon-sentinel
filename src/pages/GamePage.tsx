import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { initGame } from "../game/Game";
import "./GamePage.css";

function GamePage() {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<Phaser.Game | null>(null);
    const { primaryWallet } = useDynamicContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!gameContainerRef.current) return;

        // Initialize Phaser game
        const game = initGame(gameContainerRef.current);
        gameInstanceRef.current = game;

        // Listen for return to menu event
        const handleReturnToMenu = () => {
            navigate("/");
        };

        // Expose navigation function to game
        (game as any).returnToMenu = handleReturnToMenu;

        // Handle window resize
        const handleResize = () => {
            if (game && game.scale && gameContainerRef.current) {
                const newWidth =
                    gameContainerRef.current.clientWidth || window.innerWidth;
                const newHeight =
                    gameContainerRef.current.clientHeight || window.innerHeight;
                game.scale.resize(newWidth, newHeight);
            }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            if (gameInstanceRef.current) {
                gameInstanceRef.current.destroy(true);
                gameInstanceRef.current = null;
            }
        };
    }, [navigate]);

    // Expose wallet address to game scenes via game registry
    useEffect(() => {
        if (gameInstanceRef.current && primaryWallet) {
            const walletAddress = primaryWallet.address;
            gameInstanceRef.current.registry.set(
                "walletAddress",
                walletAddress
            );
        } else if (gameInstanceRef.current) {
            gameInstanceRef.current.registry.set("walletAddress", undefined);
        }
    }, [primaryWallet]);

    return (
        <div className="game-page-container">
            <div ref={gameContainerRef} className="game-container" />
        </div>
    );
}

export default GamePage;
