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
    console.log(numoFGridItems);
    numoFGridItems === 256 ? MakeGrid(32) : MakeGrid(16);
  });
}

MakeGrid(16, 25);
ChangeSize();
