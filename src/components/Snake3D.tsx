import { useEffect, useRef } from "react";
import { Game } from "../snake-js/core/Game";
import "../snake-js/style.css";

export default function Snake3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create an #app element inside the container for the game to use
    const appElement = document.createElement("div");
    appElement.id = "app";
    appElement.style.width = "100%";
    appElement.style.height = "100%";
    containerRef.current.appendChild(appElement);

    // Wait for next tick to ensure DOM is ready
    const initGame = () => {
      if (appElement.parentNode) {
        gameRef.current = new Game();
      }
    };

    // Use requestAnimationFrame to ensure DOM is fully ready
    requestAnimationFrame(() => {
      requestAnimationFrame(initGame);
    });

    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.dispose();
        gameRef.current = null;
      }
      if (appElement.parentNode) {
        appElement.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    />
  );
}
