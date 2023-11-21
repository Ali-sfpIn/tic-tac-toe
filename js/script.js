"use strict";
////////////////////////////////////////////////////////////////////////////////////////* SELECTIONS...
const circle = `<span class="circle fa fa-circle-o"></span>`;
const cross = `<span class="cross fa fa-close"></span>`;
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart-btn");
const crossPoint = document.querySelector(".cross-l");
const circlePoint = document.querySelector(".circle-l");
const cellContainer = document.querySelector(".container");
const winnerLabel = document.querySelector(".winner");
// STATE VARIABLES...
let cellNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let winnerFinder = false;
let circleScore = 0;
let crossScore = 0;
//////////////////////////////////////////////////////////////////////////////////////////* FUNCTIONS
const randomCell = () => {
  const randomNum = cellNumbers[Math.floor(Math.random() * cellNumbers.length)];
  return document.querySelector(`[data-version='${randomNum}']`);
};

const winnerCheck = function (type) {
  const goldenComboNumbers = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];
  goldenComboNumbers.forEach((array) => {
    const winner = array.every((cell) =>
      cells[cell]?.firstChild?.classList.contains(`${type}`)
    );
    if (!winner) return;
    cellContainer.style.pointerEvents = "none";
    winnerLabel.textContent = `winner:${type}`;
    type === "cross" ? crossScore++ : circleScore++;
    type === "circle"
      ? (circlePoint.textContent = ` ${circleScore}`)
      : (crossPoint.textContent = ` ${crossScore}`);
    winnerFinder = true;
    return;
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////* EVENT HANDLERS..
cellContainer.addEventListener("click", gameHandler);
function gameHandler(e) {
  let currentPlayer = circle;
  const circleCell = e.target;
  if (circleCell.firstChild) return;
  // prettier-ignore
  cellNumbers.splice(cellNumbers.indexOf(Number(circleCell?.dataset.version)), 1);
  circleCell.insertAdjacentHTML("afterbegin", currentPlayer);
  winnerCheck("circle");
  if (winnerFinder) return;
  // IMPLEMENTING THE X MARK..
  setTimeout(() => {
    currentPlayer = cross;
    const crossCell = randomCell();
    // prettier-ignore
    cellNumbers.splice(cellNumbers.indexOf(Number(crossCell?.dataset.version)),1);
    crossCell?.insertAdjacentHTML("afterbegin", currentPlayer);
    winnerCheck("cross");
    if (winnerFinder) return;
  }, 100);
}

restartBtn.addEventListener("click", function () {
  cells.forEach((cell) => (cell.innerHTML = ""));
  cellNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  winnerLabel.textContent = "winner:";
  cellContainer.style.pointerEvents = "auto";
  winnerFinder = false;
});
