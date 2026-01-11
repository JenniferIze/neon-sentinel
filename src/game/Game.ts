import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { UIScene } from "./scenes/UIScene";
import { GAME_CONFIG } from "./config";

export function initGame(container: HTMLElement): Phaser.Game {
    // Get actual container dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        parent: container,
        backgroundColor: GAME_CONFIG.backgroundColor,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { x: 0, y: 0 },
                debug: false,
            },
        },
        scene: [BootScene, GameScene, UIScene],
        scale: {
            mode: Phaser.Scale.RESIZE,
            width: width,
            height: height,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
    };

    return new Phaser.Game(config);
}
