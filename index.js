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
    gridContainer.appendChild(gridItem);
  }
}

function ChangeSize() {
  let button = document.querySelector(".Buttons>button");
  button.addEventListener("click", () => {
    let numoFGridItems = Array.from(
      document.querySelectorAll(".Grid-Container>div")
    ).length;
    numoFGridItems === 256 ? MakeGrid(32) : MakeGrid(16);
    ChangeColor();
  });
}

function ChangeColor() {
  let gridCells = Array.from(document.querySelectorAll(".Grid-Container>div"));
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  let color = `rgb(${red}, ${green}, ${blue})`;

  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      if (cell.style.backgroundColor == "") {
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        color = `rgb(${red}, ${green}, ${blue})`;
        cell.style.backgroundColor = color;
      }
    });
  });
}

MakeGrid(32);
ChangeSize();
ChangeColor();
