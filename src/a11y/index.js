// Fix Vuetify empty buttons
const fixButtonText = function (myClass, myText) {
  const myButtons = document.getElementsByClassName(myClass);

  for (let i = 0, len = myButtons.length; i < len; ++i) {
    const el = document.createElement("span");
    el.innerHTML = myText;
    el.classList.add("aria-hidden");
    myButtons[i].appendChild(el);
    console.log("fixed buttons: ", myButtons[i]);
  }
};

// Fix Vuetify blank TH tag on expandable tables
const fixBlankTableHeadings = function () {
  const tableHeadings = document.getElementsByTagName("TH");
  for (let i = 0, len = tableHeadings.length; i < len; ++i) {
    if (tableHeadings[i].innerHTML === "<span></span>") {
      tableHeadings[i].innerHTML =
        "<span class='aria-hidden'>This cell is intentionally blank</span>";
    }
  }
};

// fix empty H2 headings with Nuxt 2.14+ sites using nuxt-content
const fixNuxtContentHeadings = function (querySelectors) {
  const els = document.querySelectorAll(querySelectors);
  for (let i = 0, len = els.length; i < len; ++i) {
    const subEl = els[i].querySelectorAll("a");
    for (let i = 0, len = subEl.length; i < len; ++i) {
      subEl[i].remove();
    }
  }
};

// Only in dev mode for new Nuxt 2.14+ sites using nuxt-content
// const fixNuxtTextArea = function (myClass, myText) {};

export { fixButtonText, fixBlankTableHeadings, fixNuxtContentHeadings };
