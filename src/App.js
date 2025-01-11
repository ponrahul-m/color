import React, { useState, useEffect, useLayoutEffect } from "react";
import color_background from "../src/Assets/BASE.png";
import color_board from "../src/Assets/color_board.png";
import score_board from "../src/Assets/score_board.png";
import timer_bar from "../src/Assets/status_bar.png";
import overlay from "../src/Assets/overlay.svg";
import "./App.css";

const colors = {
  Red: "#FF1717",
  Blue: "#00BBFFC7",
  Green: "#49BC26",
  Yellow: "#FFEF16",
  Cyan: "#00FFFF",
  Purple: "#CD0099",
  Pink: "#FF3988",
  Black: "#191919",
  Brown: "#883F1C",
  Gray: "#838383",
  White: "#F5F5F5",
  Orange: "#FFA500",
  Lime: "#51FF00",
  Peach: "#FEDAB8",
  Maroon: "#800000",
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(3); // Timer dynamically set
  const [isGameOver, setIsGameOver] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [clickedColor, setClickedColor] = useState("");
  const [numColors, setNumColors] = useState(3); // Number of colors to display

  const getTimerDuration = (colorsCount) => {
    if (colorsCount === 2) return 1;
    if (colorsCount === 3) return 1;
    if (colorsCount === 4) return 1;
    return 3; // Default fallback
  };

  const generateRound = () => {
    const shuffledColors = Object.keys(colors).sort(() => Math.random() - 0.5);
    setOptions(shuffledColors.slice(0, 3)); // Choose `numColors` options
    setTargetColor(
      shuffledColors[Math.floor(Math.random() * 3)] // Choose one target color
    );
    setTimer(getTimerDuration(3)); // Dynamically reset timer
  };

  const handleColorClick = (color) => {
    setClickedColor(color);
    if (color === targetColor) {
      // Adjust score based on `numColors`
      const scoreIncrement = numColors === 3 ? 1 : numColors === 3 ? 1 : 1;
      setScore((prev) => prev + scoreIncrement);
      setTimeout(() => {
        generateRound();
      }, 80);

      // Start the timer after the first correct click
      if (!timerActive) {
        setTimerActive(true);
      }
    } else {
      setIsGameOver(true);
    }
    setTimeout(() => setClickedColor(""), 80);
  };

  useEffect(() => {
    if (timerActive) {
      if (timer <= 0) {
        setIsGameOver(true); // Trigger Game Over when the timer runs out
        setTimerActive(false); // Stop the timer
      } else {
        const interval = setInterval(() => setTimer((prev) => prev - 0.1), 100); // Update every 100ms
        return () => clearInterval(interval);
      }
    }
    generateRound();
  }, [timer, timerActive]);

  useLayoutEffect(() => {
    if (window) {
      if (window.gameloaded) {
        window.gameloaded.postMessage("");
        console.log("gameLoaded event sent to Flutter.");
      } else {
        console.error("Flutter WebView is not available.");
      }
    }
  }, [isGameOver]);

  const scoreSend = () => {
    const ans = {
      score: score,
    };
    const ansString = JSON.stringify(ans);
    console.log(ansString);
    if (window) {
      if (window.scoreChallengeComplete) {
        window.scoreChallengeComplete.postMessage(ansString);
        console.log("yes");
      } else {
        console.error("window.scoreChallengeComplete is not defined.");
      }
    }
  };

  useEffect(() => {
    if (isGameOver) {
      scoreSend();
    }
  }, [isGameOver]);

  const renderSVG = (color) => {
    return (
      <svg
        width="255"
        height="70"
        viewBox="0 0 255 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g filter="url(#filter0_d_4521_17236)">
          <mask
            id="mask0_4521_17236"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="255"
            height="66"
          >
            <path
              d="M4.96245 3.04624C4.31471 3.05716 3.74717 3.4827 3.55515 4.10143C2.60024 7.17836 2.04861 11.4306 1.76077 16.209C1.47143 21.0124 1.44384 26.445 1.57568 31.9321C1.83936 42.9063 2.74281 54.1734 3.49628 61.2058C3.57344 61.926 4.15413 62.4881 4.87638 62.5419C42.5646 65.3477 184.056 63.712 250.014 62.5466C250.748 62.5337 251.366 61.9904 251.472 61.2633C254.296 41.8968 253.319 15.2975 252.483 4.43098C252.427 3.70117 251.852 3.11845 251.123 3.05218C220.219 0.242713 74.0692 1.88058 4.96245 3.04624Z"
              fill="#D9D9D9"
              stroke="white"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </mask>
          <g mask="url(#mask0_4521_17236)">
            <path
              d="M4.96245 3.04624C4.31471 3.05716 3.74717 3.4827 3.55515 4.10143C2.60024 7.17836 2.04861 11.4306 1.76077 16.209C1.47143 21.0124 1.44384 26.445 1.57568 31.9321C1.83936 42.9063 2.74281 54.1734 3.49628 61.2058C3.57344 61.926 4.15413 62.4881 4.87638 62.5419C42.5646 65.3477 184.056 63.712 250.014 62.5466C250.748 62.5337 251.366 61.9904 251.472 61.2633C254.296 41.8968 253.319 15.2975 252.483 4.43098C252.427 3.70117 251.852 3.11845 251.123 3.05218C220.219 0.242713 74.0692 1.88058 4.96245 3.04624Z"
              fill={colors[color]} // Dynamic color
              stroke="white"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <g style={{ mixBlendMode: "hard-light" }}>
              <rect
                x="3.4873"
                y="3.04688"
                width="249"
                height="59"
                fill="url(#pattern0_4521_17236)"
                fillOpacity="0.62"
              />
              <rect
                x="3.4873"
                y="3.04688"
                width="249"
                height="59"
                stroke="white"
                strokeWidth="3"
              />
            </g>
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4521_17236"
            x="0"
            y="0"
            width="254.85"
            height="70.5938"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4521_17236"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4521_17236"
              result="shape"
            />
          </filter>
          <pattern
            id="pattern0_4521_17236"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_4521_17236"
              transform="scale(0.00200026 0.00813008)"
            />
          </pattern>
        </defs>
      </svg>
    );
  };

  return (
    <div className="game-container">
      <div className="image_header">
        <div className="image-container">
          <img src={color_board} alt="tree" />
          <div className="target-color">{targetColor}</div>
        </div>
        <div className="image-container">
          <img src={score_board} alt="tree" style={{ marginLeft: "-24px" }} />
          <div className="score">{score}</div>
        </div>
      </div>

      <div className="timer-wrapper">
        <div
          className="timer-background"
          style={{ backgroundImage: `url(${timer_bar})` }}
        >
          {timerActive && (
            <div
              className="timer-slider"
              style={{
                width: `${(timer / getTimerDuration(numColors)) * 94}%`,
                transition: "width 0.1s linear",
              }}
            ></div>
          )}
        </div>
      </div>

      <div>
        <img src={color_background} alt="tree" />
        <div className="colors-container">
          {options.map((color, index) => (
            <div
              key={`${color}-${index}`} // Add unique key based on color and index
              style={{ position: "relative", display: "inline-block" }}
              className={`color-image ${
                clickedColor === color ? "clicked" : ""
              }`}
              onAnimationEnd={() => {
                if (color === clickedColor && color === targetColor) {
                  generateRound(); // Only generate a new round if the correct color was clicked
                }
              }}
            >
              <div
                className="color-box"
                onClick={() => handleColorClick(color)}
              >
                {renderSVG(color)}
              </div>
              <img
                src={overlay}
                alt="over"
                style={{
                  position: "absolute",
                  top: "-4px",
                  left: 0,
                  width: "100%", // Adjust size as needed
                  height: "100%", // Adjust size as needed
                  pointerEvents: "none", // Optional: to allow interaction with the SVG
                  mixBlendMode: "hard-light",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {isGameOver && (
        <div className="game-over-popup">
          <div className="game-over-text">Game Over</div>
          <div className="score-text">Score : {score}</div>
        </div>
      )}
    </div>
  );
};

export default ColorGame;
