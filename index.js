let brushColor = "";
let brushTypes = ["Black", "Random", "Eraser"];

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
  if (brush == brushTypes[0]) {
    color = `rgb(0, 0, 0)`;
  } else if (brush == brushTypes[1]) {
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

  buttons.forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = ColorGenerator(brushTypes[1]);
    });
    item.addEventListener("mouseout", () => {
      item.style.backgroundColor = ColorGenerator(brushTypes[2]);
    });
    if (index == 0) {
      item.addEventListener("click", () => {
        let numoFGridItems = Array.from(
          document.querySelectorAll(".Grid-Container>div")
        ).length;

        numoFGridItems === 256
          ? MakeGrid(Math.sqrt(numoFGridItems) * 2)
          : MakeGrid(Math.sqrt(numoFGridItems) / 2);
      });
    } else if (index == buttons.length - 2) {
      item.addEventListener("click", () => {
        let numoFGridItems = Array.from(
          document.querySelectorAll(".Grid-Container>div")
        ).length;
        if (numoFGridItems == 256) {
          MakeGrid(Math.sqrt(numoFGridItems));
        } else if (numoFGridItems === 1024) {
          MakeGrid(Math.sqrt(numoFGridItems));
        }
      });
    } else {
      item.addEventListener("click", () => {
        brushColor = brushTypes[index - 1];
      });
    }
  });
}

function handlecells() {
  let gridCells = Array.from(document.querySelectorAll(".Grid-Container>div"));

  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      if (brushColor == brushTypes[0]) {
        if (cell.brushType == brushTypes[0]) {
          return;
        }
        cell.brushType = brushColor;

        cell.style.backgroundColor = ColorGenerator(brushTypes[0]);
      } else if (brushColor == brushTypes[1]) {
        if (cell.brushType == brushTypes[1]) {
          return;
        }
        cell.brushType = brushColor;

        cell.style.backgroundColor = ColorGenerator(brushTypes[1]);
      } else {
        if (cell.brushType == brushTypes[2]) {
          return;
        }
        cell.brushType = brushColor;
        cell.style.backgroundColor = ColorGenerator(brushTypes[2]);
      }
    });
  });
}

MakeGrid(16);
AddButtonEvents();
