import './style.css';
import { Game } from './core/Game';

// Initialize the game when the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    // Start the game directly without network initialization
    new Game();
});

