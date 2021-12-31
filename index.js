let brushColor = "";
let brushColors = ["Black", "Random", "Eraser"];

let brushTypes = ["mouseover", "click"];
let brushType = brushTypes[0];
function MakeGrid(numofGridItems) {
  let gridContainer = document.querySelector(".Grid-Container");
  gridContainer.innerHTML = ""; //clear the grid for resizing
  gridContainer.style[
    "grid-template-columns"
  ] = `repeat(${numofGridItems},1fr)`;

  let gridWidth = parseInt(window.getComputedStyle(gridContainer).maxWidth);
  let gridHeight = parseInt(window.getComputedStyle(gridContainer).maxHeight);

  let gridItemWidth = gridWidth / numofGridItems;
  let gridItemHeight = gridHeight / numofGridItems;

  numofGridItems *= numofGridItems;
  for (let counter = 1; counter <= numofGridItems; counter++) {
    let gridItem = document.createElement("div");
    gridItem.style.height = `${gridItemHeight}px`;
    gridItem.style.width = `${gridItemWidth}px`;
    gridItem.brushType = "";
    gridContainer.appendChild(gridItem);
  }
  handlecells();
}

function ColorGenerator(brush) {
  let color = ``;
  if (brush == brushColors[0]) {
    color = `rgb(0, 0, 0)`;
  } else if (brush == brushColors[1]) {
    let red = Math.floor(Math.random() * 256),
      green = Math.floor(Math.random() * 256),
      blue = Math.floor(Math.random() * 256);
    color = `rgb(${red}, ${green}, ${blue})`;
  } else {
    color = `rgb(255, 255, 255)`;
  }
  return color;
}

function AddButtonEvents() {
  let buttons = Array.from(document.querySelectorAll(".Buttons>button"));

  buttons.forEach((button, index) => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = ColorGenerator(brushColors[1]);
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = ColorGenerator(brushColors[2]);
    });
    if (index == 0) {
      button.addEventListener("click", () => {
        let numoFGridItems = Array.from(
          document.querySelectorAll(".Grid-Container>div")
        ).length;

        numoFGridItems === 256
          ? MakeGrid(Math.sqrt(numoFGridItems) * 2)
          : MakeGrid(Math.sqrt(numoFGridItems) / 2);
      });
    } else if (index == buttons.length - 2) {
      button.addEventListener("click", () => {
        let numoFGridItems = Array.from(
          document.querySelectorAll(".Grid-Container>div")
        ).length;
        MakeGrid(Math.sqrt(numoFGridItems));
      });
    } else if (index == buttons.length - 1) {
      let gridCells = Array.from(
        document.querySelectorAll(".Grid-Container>div")
      );
      button.addEventListener("click", () => {
        let gridCells = Array.from(
          document.querySelectorAll(".Grid-Container>div")
        );

        if (brushType == brushTypes[0]) {
          gridCells.forEach((cell) => {
            cell.onmouseover = null;
          });
          brushType = brushTypes[1];
        } else if (brushType == brushTypes[1]) {
          gridCells.forEach((cell) => {
            cell.onmouseover = CellEventHandler.bind(cell, cell);
          });
          brushType = brushTypes[0];
        }
      });
    } else {
      button.addEventListener("click", () => {
        brushColor = brushColors[index - 1];
      });
    }
  });
}

function handlecells() {
  let gridCells = Array.from(document.querySelectorAll(".Grid-Container>div"));

  gridCells.forEach((cell) => {
    cell.onclick = CellEventHandler.bind(cell, cell);
    cell.onmouseover = CellEventHandler.bind(cell, cell);
  });
}

function CellEventHandler(cell, cell2) {
  if (brushColor == brushColors[0]) {
    if (cell.brushColor == brushColors[0]) {
      return;
    }
    cell.brushColor = brushColor;

    cell.style.backgroundColor = ColorGenerator(brushColors[0]);
  } else if (brushColor == brushColors[1]) {
    if (cell.brushColor == brushColors[1]) {
      return;
    }
    cell.brushColor = brushColor;

    cell.style.backgroundColor = ColorGenerator(brushColors[1]);
  } else {
    if (cell.brushColor == brushColors[2]) {
      return;
    }
    cell.brushColor = brushColor;
    cell.style.backgroundColor = ColorGenerator(brushColors[2]);
  }
}

MakeGrid(16);
AddButtonEvents();
