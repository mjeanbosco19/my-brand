const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

function openMenu(){

    newProductModal.classList.remove("hidden")
}


const openMenu = document.querySelectorAll("openMenu");
openMenu.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("openMenu--opened");
  })
);
