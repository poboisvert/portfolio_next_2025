/**
 * Информация об игроке для отображения в HUD
 */
export interface PlayerInfo {
  name: string;
  score: number;
  length: number;
  speed: number;
  isPlayer?: boolean; // true для текущего игрока
  color?: string; // цвет игрока (hex)
  isDead?: boolean; // жив или мертв
}

export class GameHUD {
  private container!: HTMLElement;
  private playersContainer!: HTMLElement;
  private notificationsContainer!: HTMLElement;

  constructor() {
    this.createUI();
    this.createNotificationsContainer();
  }

  private createUI() {
    this.container = document.createElement("div");
    this.container.className = "hud-panel";

    this.playersContainer = document.createElement("div");
    this.playersContainer.className = "hud-players";

    this.container.appendChild(this.playersContainer);
    document.body.appendChild(this.container);
  }

  /**
   * Обновить HUD с данными обо всех игроках
   * @param players - массив информации о всех игроках (включая текущего)
   */
  public updatePlayers(players: PlayerInfo[]) {
    this.playersContainer.innerHTML = "";

    for (const player of players) {
      const row = document.createElement("div");
      row.className = "hud-player-row";
      if (player.isPlayer) {
        row.classList.add("hud-player-current");
      }
      if (player.isDead) {
        row.classList.add("hud-player-dead");
      }

      // Header: Color + Name
      const header = document.createElement("div");
      header.className = "hud-player-header";

      const colorDot = document.createElement("span");
      colorDot.className = "hud-player-color";

      if (player.isDead) {
        // Show 'X' for dead players
        colorDot.textContent = "✕"; // Cross character
        colorDot.style.color = "#ff0000"; // Red color for cross
        colorDot.style.backgroundColor = "transparent";
        colorDot.style.boxShadow = "none";
        colorDot.style.fontSize = "14px";
        colorDot.style.lineHeight = "12px";
        colorDot.style.textAlign = "center";
        colorDot.style.fontWeight = "bold";
      } else {
        colorDot.style.backgroundColor = player.color || "#ffffff";
        colorDot.style.boxShadow = `0 0 5px ${player.color || "#ffffff"}`;
      }

      const nameEl = document.createElement("span");
      nameEl.className = "hud-player-name";
      nameEl.textContent = player.name;

      header.appendChild(colorDot);
      header.appendChild(nameEl);
      row.appendChild(header);

      // Stats Row: Score, Length, Speed
      const statsRow = document.createElement("div");
      statsRow.className = "hud-player-stats-row";

      const createStat = (label: string, value: string | number) => {
        const statEl = document.createElement("div");
        statEl.className = "hud-stat";

        const labelEl = document.createElement("span");
        labelEl.className = "hud-stat-label";
        labelEl.textContent = label;

        const valueEl = document.createElement("span");
        valueEl.className = "hud-stat-value";
        valueEl.textContent = value.toString();

        statEl.appendChild(labelEl);
        statEl.appendChild(valueEl);
        return statEl;
      };

      statsRow.appendChild(createStat("SCORE", player.score));
      statsRow.appendChild(createStat("LEN", player.length));
      statsRow.appendChild(createStat("SPD", Math.round(player.speed)));

      row.appendChild(statsRow);
      this.playersContainer.appendChild(row);
    }
  }

  /**
   * Обратная совместимость - обновление только для текущего игрока
   */
  public update(score: number, length: number, speed: number) {
    this.updatePlayers([
      {
        name: "You",
        score,
        length,
        speed,
        isPlayer: true,
        color: "#ffffff",
      },
    ]);
  }

  public dispose() {
    this.container.remove();
    const btn = document.querySelector(".hud-pause-btn");
    if (btn) btn.remove();
  }

  public addPauseButton(callback: () => void) {
    // Create container for top right controls
    const container = document.createElement("div");
    container.className = "hud-top-right-controls";

    // Create GitHub link
    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/poboisvert";
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.className = "hud-social-link hud-github-link";
    githubLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
        `;

    // Create LinkedIn link
    const linkedinLink = document.createElement("a");
    linkedinLink.href = "https://linkedin.com/in/poboisvert";
    linkedinLink.target = "_blank";
    linkedinLink.rel = "noopener noreferrer";
    linkedinLink.className = "hud-social-link hud-linkedin-link";
    linkedinLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        `;

    // Create pause button
    const btn = document.createElement("button");
    btn.className = "hud-pause-btn";
    btn.innerHTML = "||";
    btn.onclick = (e) => {
      e.stopPropagation(); // Prevent focus stealing issues if any
      callback();
    };

    container.appendChild(githubLink);
    container.appendChild(linkedinLink);
    container.appendChild(btn);
    document.body.appendChild(container);

    const style = document.createElement("style");
    style.textContent = `
            .hud-top-right-controls {
                position: fixed;
                top: 20px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 9999;
            }

            .hud-social-link {
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(173, 216, 230, 0.08);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(200, 230, 255, 0.2);
                border-radius: 12px;
                color: #e0f4ff;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .hud-social-link:hover {
                background: rgba(173, 216, 230, 0.15);
                border-color: rgba(200, 230, 255, 0.4);
                transform: translateY(-2px);
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    0 6px 20px rgba(0, 0, 0, 0.3),
                    0 0 20px rgba(173, 216, 230, 0.3);
                color: #add8e6;
            }

            .hud-social-link:active {
                transform: translateY(0);
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .hud-social-link svg {
                width: 20px;
                height: 20px;
            }

            .hud-pause-btn {
                width: 44px;
                height: 44px;
                background: rgba(173, 216, 230, 0.08);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(200, 230, 255, 0.2);
                border-radius: 12px;
                color: #e0f4ff;
                font-family: 'Consolas', monospace;
                font-weight: bold;
                font-size: 18px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 4px 12px rgba(0, 0, 0, 0.2);
                text-shadow: 0 0 8px rgba(173, 216, 230, 0.4);
            }

            .hud-pause-btn:hover {
                background: rgba(173, 216, 230, 0.15);
                border-color: rgba(200, 230, 255, 0.4);
                transform: translateY(-2px);
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    0 6px 20px rgba(0, 0, 0, 0.3),
                    0 0 20px rgba(173, 216, 230, 0.3);
                text-shadow: 0 0 12px rgba(173, 216, 230, 0.6);
            }

            .hud-pause-btn:active {
                background: rgba(173, 216, 230, 0.1);
                transform: translateY(0);
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 2px 8px rgba(0, 0, 0, 0.2);
            }
        `;
    document.head.appendChild(style);
  }
  public togglePauseButton(visible: boolean) {
    const container = document.querySelector(
      ".hud-top-right-controls"
    ) as HTMLElement;
    if (container) {
      container.style.display = visible ? "flex" : "none";
    }
  }

  public setVisibility(visible: boolean) {
    this.container.style.display = visible ? "block" : "none";
  }

  private createNotificationsContainer() {
    this.notificationsContainer = document.createElement("div");
    this.notificationsContainer.className = "hud-notifications-container";
    document.body.appendChild(this.notificationsContainer);

    const style = document.createElement("style");
    style.textContent = `
            .hud-notifications-container {
                position: fixed;
                bottom: 20px;
                left: 20px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                z-index: 9998;
                max-width: 400px;
                pointer-events: none;
            }

            .hud-notification {
                background: rgba(173, 216, 230, 0.08);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(200, 230, 255, 0.2);
                border-radius: 12px;
                padding: 16px 20px;
                color: #e0f4ff;
                font-family: 'Jura', system-ui, sans-serif;
                font-size: 13px;
                line-height: 1.6;
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 4px 12px rgba(0, 0, 0, 0.2);
                opacity: 0;
                transform: translateX(-20px);
                transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                            transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: auto;
            }

            .hud-notification.show {
                opacity: 1;
                transform: translateX(0);
            }

            .hud-notification.hide {
                opacity: 0;
                transform: translateX(-20px);
            }

            .hud-notification-title {
                font-weight: 700;
                font-size: 14px;
                margin-bottom: 8px;
                color: #add8e6;
                text-shadow: 0 0 10px rgba(173, 216, 230, 0.3);
            }

            .hud-notification-content {
                color: #b0d4e8;
            }

            .hud-notification-content p {
                margin: 8px 0;
            }

            .hud-notification-content p:first-child {
                margin-top: 0;
            }

            .hud-notification-content p:last-child {
                margin-bottom: 0;
            }

            .hud-notification-content strong {
                color: #c8e6f5;
                font-weight: 600;
            }

            @media (max-width: 600px) {
                .hud-notifications-container {
                    max-width: calc(100vw - 40px);
                    bottom: 10px;
                    left: 10px;
                }

                .hud-notification {
                    font-size: 12px;
                    padding: 12px 16px;
                }
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Show a notification message in the bottom left
   * @param title - Optional title for the notification
   * @param content - HTML content for the notification body
   * @param duration - Duration in milliseconds before auto-dismiss (0 = no auto-dismiss)
   */
  public showNotification(
    title: string | null,
    content: string,
    duration: number = 8000
  ) {
    const notification = document.createElement("div");
    notification.className = "hud-notification";

    if (title) {
      const titleEl = document.createElement("div");
      titleEl.className = "hud-notification-title";
      titleEl.textContent = title;
      notification.appendChild(titleEl);
    }

    const contentEl = document.createElement("div");
    contentEl.className = "hud-notification-content";
    contentEl.innerHTML = content;
    notification.appendChild(contentEl);

    this.notificationsContainer.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
      notification.classList.add("show");
    });

    // Auto-dismiss if duration is specified
    if (duration > 0) {
      setTimeout(() => {
        notification.classList.remove("show");
        notification.classList.add("hide");
        setTimeout(() => {
          notification.remove();
        }, 400); // Match transition duration
      }, duration);
    }

    return notification;
  }
}
