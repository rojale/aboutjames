const bodyEl = document.getElementById("IndexBody");

const themeSelectorContainer = document.getElementById("ThemeSelector");
const themeToggleButton = document.getElementById("themeMenuButton");

const themeButtons = document.getElementsByClassName("themeButton");

const navCards = document.getElementsByClassName("NavCard");

const bindThemeMenuButton = () => {
  themeToggleButton.addEventListener("click", onThemeMenuButtonClick);
};

const bindThemeButtons = () =>
  Array.from(themeButtons).forEach((themeButton) => {
    themeButton.addEventListener("click", onThemeButtonClick);
  });

const onThemeMenuButtonClick = () => {
  const { classList } = themeSelectorContainer;
  if (classList.contains("expanded")) {
    classList.remove("expanded");
  } else {
    classList.add("expanded");
  }
};

const onThemeButtonClick = ({ target }) => {
  const theme = getThemeFromId(target.id);
  applyThemeToBody(theme);
  updateThemeButtonSelection(theme);
};

const getThemeFromId = (id) => id.split("-")[1];

const applyThemeToBody = (theme) => {
  bodyEl.className = theme;
};

const updateThemeButtonSelection = (theme) => {
  Array.from(themeButtons).forEach((themeButton) => {
    if (getThemeFromId(themeButton.id) === theme) {
      themeButton.className = "themeButton selected";
    } else {
      themeButton.className = "themeButton";
    }
  });
};

bindThemeMenuButton();
bindThemeButtons();
