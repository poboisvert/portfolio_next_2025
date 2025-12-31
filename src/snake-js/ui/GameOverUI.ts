import { GameStats } from './PauseUI';

export class GameOverUI {
    private container!: HTMLElement;
    private restartBtn!: HTMLButtonElement;

    // Stats Elements
    // Stats Elements
    private scoreEl!: HTMLElement;
    private lengthEl!: HTMLElement;
    private timeEl!: HTMLElement;
    private distanceEl!: HTMLElement;
    private speedEl!: HTMLElement;
    private maxSpeedEl!: HTMLElement;
    private foodGreenEl!: HTMLElement;
    private foodBlueEl!: HTMLElement;
    private foodPinkEl!: HTMLElement;

    private onRestart: () => void;

    constructor(onRestart: () => void) {
        this.onRestart = onRestart;
        this.createUI();
    }

    private createUI() {
        this.container = document.createElement('div');
        this.container.className = 'game-over-screen';

        const title = document.createElement('h1');
        title.className = 'game-over-title';
        title.textContent = 'GAME OVER';

        this.restartBtn = document.createElement('button');
        this.restartBtn.className = 'restart-btn';
        this.restartBtn.textContent = 'RESTART';

        this.restartBtn.addEventListener('click', () => {
            if (this.container.classList.contains('active')) {
                this.onRestart();
            }
        });

        // Wrapper for the sliding effect (Title)
        const titlePanel = document.createElement('div');
        titlePanel.className = 'game-over-panel';
        titlePanel.appendChild(title);

        this.container.appendChild(titlePanel);

        // Stats Panel
        const statsPanel = document.createElement('div');
        statsPanel.className = 'game-over-panel stats-panel';

        const statsInner = document.createElement('div');
        statsInner.className = 'stats-inner';

        this.scoreEl = this.createStatRow(statsInner, 'SCORE');
        this.lengthEl = this.createStatRow(statsInner, 'LENGTH');
        this.timeEl = this.createStatRow(statsInner, 'TIME');
        this.distanceEl = this.createStatRow(statsInner, 'DIST');
        this.speedEl = this.createStatRow(statsInner, 'AVG SPD');
        this.maxSpeedEl = this.createStatRow(statsInner, 'MAX SPD');

        const foodRow = document.createElement('div');
        foodRow.className = 'stat-row food-row';
        const foodLabel = document.createElement('span');
        foodLabel.className = 'stat-label';
        foodLabel.textContent = 'FOOD';

        const foodValues = document.createElement('div');
        foodValues.className = 'food-values';

        this.foodGreenEl = this.createFoodValue(foodValues, '#4ade80');
        this.foodBlueEl = this.createFoodValue(foodValues, '#60a5fa');
        this.foodPinkEl = this.createFoodValue(foodValues, '#f472b6');

        foodRow.appendChild(foodLabel);
        foodRow.appendChild(foodValues);
        statsInner.appendChild(foodRow);

        statsPanel.appendChild(statsInner);
        this.container.appendChild(statsPanel);

        this.container.appendChild(this.restartBtn);

        document.body.appendChild(this.container);

        this.injectStyles();
    }

    private createStatRow(parent: HTMLElement, label: string): HTMLElement {
        const row = document.createElement('div');
        row.className = 'stat-row';

        const labelEl = document.createElement('span');
        labelEl.className = 'stat-label';
        labelEl.textContent = label;

        const valueEl = document.createElement('span');
        valueEl.className = 'stat-value';
        valueEl.textContent = '0';

        row.appendChild(labelEl);
        row.appendChild(valueEl);
        parent.appendChild(row);

        return valueEl;
    }

    private createFoodValue(parent: HTMLElement, color: string): HTMLElement {
        const span = document.createElement('span');
        span.className = 'food-val';
        span.style.color = color;
        span.textContent = '0';
        parent.appendChild(span);
        return span;
    }

    private injectStyles() {
        // Reuse some styles from PauseUI if available, but ensure we have our own for safety
        const style = document.createElement('style');
        style.textContent = `
            .stats-panel {
                min-width: 320px;
                /* Delay for slide animation to stagger with title */
                transition-delay: 0.1s; 
                flex-direction: column;
                align-items: stretch;
                border-right-color: rgba(173, 216, 230, 0.25);
            }

            .stats-inner {
                display: flex;
                flex-direction: column;
                gap: 8px;
                width: 100%;
            }

            .stat-row {
                display: flex;
                justify-content: space-between;
                font-family: 'Jura', sans-serif;
                font-size: 1.2rem;
                font-weight: 700;
                letter-spacing: 1px;
            }

            .stat-label {
                color: #b0d4e8;
            }

            .stat-value {
                color: #e0f4ff;
                text-shadow: 0 0 10px rgba(173, 216, 230, 0.4);
            }

            .food-values {
                display: flex;
                gap: 12px;
            }
            
            .food-val {
                font-weight: bold;
            }
            
            /* Update restart button delay to come after stats */
            .restart-btn {
                transition-delay: 0.2s; 
            }
            
            .leaders-btn {
                margin-bottom: 20px;
            }
            .leaders-btn:hover {
                background: #1a1a1a;
            }
        `;
        document.head.appendChild(style);
    }

    public updateStats(stats: GameStats) {
        this.scoreEl.textContent = stats.score.toString();
        this.lengthEl.textContent = stats.length.toString();
        this.timeEl.textContent = this.formatTime(stats.time);
        this.distanceEl.textContent = Math.round(stats.distance).toString();
        this.speedEl.textContent = Math.round(stats.avgSpeed).toString();
        this.maxSpeedEl.textContent = Math.round(stats.maxSpeed || 0).toString();

        this.foodGreenEl.textContent = stats.foodCount.green.toString();
        this.foodBlueEl.textContent = stats.foodCount.blue.toString();
        this.foodPinkEl.textContent = stats.foodCount.pink.toString();
    }

    private formatTime(seconds: number): string {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    public show() {
        this.container.classList.add('active');
    }

    public hide() {
        this.container.classList.remove('active');
    }

    public dispose() {
        this.restartBtn.removeEventListener('click', this.onRestart);
        this.container.remove();
    }
}
