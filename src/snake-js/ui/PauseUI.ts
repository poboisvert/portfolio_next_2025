
/**
 * Interface for Game Statistics displayed in Pause Menu
 */
export interface GameStats {
    score: number;      // Current score
    length: number;     // Current snake length
    time: number;       // In seconds
    distance: number;   // Total units traveled
    avgSpeed: number;   // Average SPM
    maxSpeed?: number;  // Max SPM (optional)
    foodCount: {
        green: number;
        blue: number;
        pink: number;
        total: number;
    }
}

export class PauseUI {
    private container!: HTMLElement;
    private resumeBtn!: HTMLButtonElement;
    private settingsBtn!: HTMLButtonElement;

    // Stats Elements
    private scoreEl!: HTMLElement;
    private lengthEl!: HTMLElement;
    private timeEl!: HTMLElement;
    private distanceEl!: HTMLElement;
    private speedEl!: HTMLElement;
    private foodGreenEl!: HTMLElement;
    private foodBlueEl!: HTMLElement;
    private foodPinkEl!: HTMLElement;

    private onResume: () => void;
    private onSettings: () => void;

    constructor(onResume: () => void, onSettings: () => void) {
        this.onResume = onResume;
        this.onSettings = onSettings;
        this.createUI();
    }

    private createUI() {
        this.container = document.createElement('div');
        this.container.className = 'pause-screen';

        // 1. Title Panel
        const titlePanel = document.createElement('div');
        titlePanel.className = 'pause-panel title-panel';
        const title = document.createElement('h1');
        title.className = 'pause-title';
        title.textContent = 'PAUSE';
        titlePanel.appendChild(title);

        // 2. Stats Panel
        const statsPanel = document.createElement('div');
        statsPanel.className = 'pause-panel stats-panel';

        const statsInner = document.createElement('div');
        statsInner.className = 'stats-inner';

        this.scoreEl = this.createStatRow(statsInner, 'SCORE');
        this.lengthEl = this.createStatRow(statsInner, 'LENGTH');
        this.timeEl = this.createStatRow(statsInner, 'TIME');
        this.distanceEl = this.createStatRow(statsInner, 'DIST');
        this.speedEl = this.createStatRow(statsInner, 'AVG SPD');

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

        // 3. Settings Panel (Button)
        this.settingsBtn = document.createElement('button');
        this.settingsBtn.className = 'pause-panel menu-btn settings-btn';
        this.settingsBtn.textContent = 'SETTINGS';
        this.settingsBtn.onclick = () => this.onSettings();

        // 4. Resume Panel (Button)
        this.resumeBtn = document.createElement('button');
        this.resumeBtn.className = 'pause-panel menu-btn resume-btn';
        this.resumeBtn.textContent = 'RESUME';
        this.resumeBtn.onclick = () => this.onResume();

        this.container.appendChild(titlePanel);
        this.container.appendChild(statsPanel);
        this.container.appendChild(this.settingsBtn);
        this.container.appendChild(this.resumeBtn);

        document.body.appendChild(this.container);

        // Inject styles
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
        const style = document.createElement('style');
        style.textContent = `
            /* Container reusing some game-over-screen logic but customized */
            .pause-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                pointer-events: none;
                background: rgba(10, 20, 30, 0.5);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                opacity: 0;
                transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 16px;
            }

            .pause-screen.active {
                pointer-events: auto;
                opacity: 1;
            }

            /* Generic Panel Style */
            .pause-panel {
                background: rgba(173, 216, 230, 0.08);
                backdrop-filter: blur(30px) saturate(180%);
                -webkit-backdrop-filter: blur(30px) saturate(180%);
                padding: 24px 64px 24px 64px;
                display: flex;
                align-items: center;
                transform: translateX(-100%);
                transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                border-right: 2px solid rgba(200, 230, 255, 0.3);
                color: #e0f4ff;
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 8px 32px rgba(0, 0, 0, 0.3);
            }

            .pause-screen.active .pause-panel {
                transform: translateX(0);
            }

            /* Title Panel specific */
            .title-panel {
                padding: 28px 96px;
                border-right-color: rgba(200, 230, 255, 0.4);
                /* No delay */
            }

            .pause-title {
                font-family: 'Jura', sans-serif;
                font-size: 5rem;
                font-weight: 900;
                margin: 0;
                letter-spacing: 6px;
                text-transform: uppercase;
                line-height: 1;
                color: #e0f4ff;
                text-shadow: 
                    0 0 30px rgba(173, 216, 230, 0.6),
                    0 2px 8px rgba(0, 0, 0, 0.4);
            }

            /* Stats Panel specific */
            .stats-panel {
                padding: 24px 64px;
                transition-delay: 0.1s;
                border-right-color: rgba(173, 216, 230, 0.25);
                min-width: 320px;
            }

            .stats-inner {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 100%;
            }

            .stat-row {
                display: flex;
                justify-content: space-between;
                font-family: 'Jura', sans-serif;
                font-size: 1.2rem;
                font-weight: 700;
                letter-spacing: 1.5px;
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

            /* Buttons */
            .menu-btn {
                font-family: 'Jura', sans-serif;
                font-size: 1.5rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 3px;
                cursor: pointer;
                outline: none;
                border: none;
                border-right: 2px solid;
                color: #e0f4ff;
                background: rgba(173, 216, 230, 0.06);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                            background 0.3s, color 0.3s, padding-left 0.3s,
                            box-shadow 0.3s, border-color 0.3s;
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
                text-shadow: 0 0 8px rgba(173, 216, 230, 0.3);
            }

            .menu-btn:hover {
                background: rgba(173, 216, 230, 0.12);
                padding-left: 72px;
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    0 4px 16px rgba(0, 0, 0, 0.2);
            }

            .settings-btn {
                transition-delay: 0.2s;
                border-right-color: rgba(135, 206, 250, 0.4); /* Sky blue */
                padding: 32px 64px;
            }
            .settings-btn:hover {
                color: #87ceeb;
                border-right-color: rgba(135, 206, 250, 0.6);
                text-shadow: 0 0 15px rgba(135, 206, 250, 0.6);
            }

            .resume-btn {
                transition-delay: 0.3s;
                border-right-color: rgba(173, 216, 230, 0.5); /* Light blue */
                padding: 32px 64px;
            }
            .resume-btn:hover {
                color: #add8e6;
                border-right-color: rgba(173, 216, 230, 0.7);
                text-shadow: 0 0 15px rgba(173, 216, 230, 0.6);
            }

            .leaders-btn {
                transition-delay: 0.25s;
                border-right-color: #0088ff; /* Blue */
                padding: 30px 60px;
            }
            .leaders-btn:hover {
                color: #0088ff;
            }


            /* Responsive Adjustments */
            @media (max-width: 600px) {
                .pause-title {
                    font-size: 3rem;
                }
                .pause-panel {
                    padding: 15px 30px;
                }
                .menu-btn {
                    font-size: 1rem;
                    padding: 20px 30px;
                }
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
        this.container.style.display = 'flex';
    }

    public hide() {
        this.container.classList.remove('active');
        // Wait for transitions to finish before setting display none?
        // Actually, CSS opacity transition handles fade out, transform handles slide out.
        // If we set display:none immediately, animation is cut.
        setTimeout(() => {
            if (!this.container.classList.contains('active')) {
                this.container.style.display = 'none';
            }
        }, 600); // 0.6s match the CSS transition duration
    }

    public dispose() {
        this.container.remove();
    }
}
