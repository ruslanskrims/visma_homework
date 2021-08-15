"use strict";
const Module = (function () {
  //private variables and functions
  let currentHeroX = 0,
    currentHeroY = 0;
  const canvas = document.getElementById("myCanvas");
  const mainContainer = document.getElementById("main");
  const context = canvas.getContext("2d");
  const modalWindow = document.createElement("div");
  modalWindow.className = "congratulation__message";
  modalWindow.innerHTML = "Congratulations! You have reached the finish point!";
  modalWindow.style.display = "none";
  mainContainer.appendChild(modalWindow);

  const checkTheHeroForFinish = function (currentHeroPosition) {
    if (currentHeroPosition === 3) {
      modalWindow.style.display = "block";
      setTimeout(() => {
        modalWindow.style.display = "none";
        currentHeroX = currentHeroY = 0;
        Module.drawMaze();
      }, 3000);
    }
  };

  const drawRectangle = function (i, j, sqrSize, bTopx, bTopy) {
    const xOffset = bTopx + j * sqrSize;
    const yOffset = bTopy + i * sqrSize;
    context.fillRect(xOffset, yOffset, sqrSize, sqrSize);
  };

  window.onkeypress = (e) => {
    const pressedKey = e.key;
    const maze = Module.maze;
    const mazeLength = Module.maze.length;
    switch (pressedKey) {
      case "a": {
        if (currentHeroY === 0) {
          return;
        }
        if (
          maze[currentHeroX][currentHeroY - 1] === 1 ||
          maze[currentHeroX][currentHeroY - 1] === 3
        ) {
          currentHeroY--;
        }
        break;
      }
      case "d":
        if (currentHeroY === mazeLength - 1) {
          return;
        }
        if (
          maze[currentHeroX][currentHeroY + 1] === 1 ||
          maze[currentHeroX][currentHeroY + 1] === 3
        ) {
          currentHeroY++;
        }
        break;
      case "w":
        if (currentHeroX < 1) {
          return;
        }
        if (
          maze[currentHeroX - 1][currentHeroY] === 1 ||
          maze[currentHeroX - 1][currentHeroY] === 3
        ) {
          currentHeroX--;
        }
        break;
      case "s":
        if (currentHeroX === mazeLength - 1) {
          return;
        }
        if (
          maze[currentHeroX + 1][currentHeroY] === 1 ||
          maze[currentHeroX + 1][currentHeroY] === 3
        ) {
          currentHeroX++;
        }
        break;
      default:
        break;
    }
    checkTheHeroForFinish(maze[currentHeroX][currentHeroY]);
    Module.drawMaze();
  };

  //public methods and variables
  return {
    maze: [
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 3],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    ],
    drawMaze: function () {
      const squareSize = 50;
      const boardTopX = 50;
      const boardTopY = 50;
      for (let i = 0; i < this.maze.length; i++) {
        for (let j = 0; j < this.maze[i].length; j++) {
          const mazeElement = this.maze[i][j];
          context.fillStyle =
            mazeElement === 1
              ? `white`
              : (context.fillStyle = mazeElement === 3 ? `red` : `black`);
          if (i === currentHeroX && j === currentHeroY) {
            context.fillStyle = "green";
          }
          drawRectangle(i, j, squareSize, boardTopX, boardTopY);
        }
      }
    },
  };
})();

Module.drawMaze();
