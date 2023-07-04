let brushColor = "#fff";
let gridCellsCount = 16;
const gridContainer = document.querySelector(".Grid-Container");
let gridCells = [];
const rainbowBrushBtn = document.querySelector(".rainbowBrushBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const blackBrushBtn = document.querySelector(".blackBrushBtn");
const fillBoardBtn = document.querySelector(".fillBoardBtn");

async function MakeGrid(numofGridItems) {
  gridContainer.innerHTML = ""; //clear the grid for resizing
  gridContainer.style[
    "grid-template-columns"
  ] = `repeat(${numofGridItems},1fr)`;

  let gridWidth = parseInt(window.getComputedStyle(gridContainer).maxWidth);
  let gridHeight = parseInt(window.getComputedStyle(gridContainer).maxHeight);

  let gridItemWidth = gridWidth / numofGridItems;
  let gridItemHeight = gridHeight / numofGridItems;

  for (let counter = 1; counter <= numofGridItems * numofGridItems; counter++) {
    let gridItem = document.createElement("div");
    gridItem.style.height = `${gridItemHeight}px`;
    gridItem.style.width = `${gridItemWidth}px`;
    gridItem.setAttribute("randomColor", false);

    gridContainer.appendChild(gridItem);
  }
  gridCells = Array.from(document.querySelectorAll(".Grid-Container>div"));
}

function setupGridCellHoverListener() {
  gridContainer.addEventListener("mouseover", ({ currentTarget, target }) => {
    let boxXCoord = currentTarget.getBoundingClientRect().x;
    let boxYCoord = currentTarget.getBoundingClientRect().y;
    let cellXCoord = target.getBoundingClientRect().x;
    let cellYCoord = target.getBoundingClientRect().y;
    let boxWidth = currentTarget.getBoundingClientRect().width;
    let positionX = (cellXCoord - boxXCoord) / (boxWidth / gridCellsCount);
    let positionY = Math.trunc(
      (cellYCoord - boxYCoord) / (boxWidth / gridCellsCount)
    );
    let cellIndex = positionY * gridCellsCount + positionX;

    if (brushColor == "random") {
      if (gridCells[cellIndex].getAttribute("randomColor") != "true") {
        gridCells[cellIndex].setAttribute("randomColor", true);
        gridCells[cellIndex].style.backgroundColor = ColorGenerator();
      }
    } else {
      gridCells[cellIndex].setAttribute("randomColor", false);
      gridCells[cellIndex].style.backgroundColor = brushColor;
    }
  });
}

function colorizeButtons() {
  let buttons = Array.from(document.querySelectorAll(".Buttons>button"));

  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = ColorGenerator();
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#fff";
    });
  });
}

function changeCurrentColor(newColor) {
  brushColor = newColor;
}

function setupBlackBrush() {
  blackBrushBtn.addEventListener("click", () => {
    changeCurrentColor("#000");
  });
}

function setupRainbowBrush() {
  rainbowBrushBtn.addEventListener("click", () => {
    changeCurrentColor("random");
  });
}

function setupEraserBrush() {
  eraserBtn.addEventListener("click", () => {
    changeCurrentColor("#fff");
  });
}

function setupColorPicker() {
  const colorPicker = document.querySelector("#colorPicker");
  colorPicker.addEventListener("input", (e) => {
    const colorValue = e.target.value;
    changeCurrentColor(colorValue);
  });

  colorPicker.addEventListener("click", (e) => {
    const colorValue = e.target.value;
    changeCurrentColor(colorValue);
  });
}

function changeGridSize() {
  const changeSizeBtn = document.querySelector(".changeSizeBtn");
  changeSizeBtn.addEventListener("click", () => {
    gridCellsCount = gridCellsCount === 16 ? 32 : 16;
    MakeGrid(gridCellsCount);
  });
}

function clearBoard() {
  const clearBoardBtn = document.querySelector(".clearBoardBtn");

  clearBoardBtn.addEventListener("click", () => {
    gridCells.forEach((gridCell) => {
        gridCell.setAttribute("randomColor", false);
      gridCell.style.backgroundColor = "#fff";
    });
  });
}

function fillBoard() {
  const fillBoardBtn = document.querySelector(".fillBoardBtn");
  fillBoardBtn.addEventListener("click", () => {
    gridCells.forEach((gridCell) => {
      if (brushColor == "random") {
        gridCell.setAttribute("randomColor", true);
        gridCell.style.backgroundColor = ColorGenerator();
      } else {
        gridCell.setAttribute("randomColor", false);
        gridCell.style.backgroundColor = brushColor;
      }
    });
  });
}

function ColorGenerator() {
  let red = Math.floor(Math.random() * 256),
    green = Math.floor(Math.random() * 256),
    blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

MakeGrid(gridCellsCount).then(() => {
  setupGridCellHoverListener();
  colorizeButtons();
  setupBlackBrush();
  setupRainbowBrush();
  setupEraserBrush();
  setupColorPicker();
  fillBoard();
  changeGridSize();
  clearBoard();
});
