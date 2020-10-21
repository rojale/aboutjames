const bodyEl = document.getElementById("IndexBody");

const themeToggleButton = document.getElementById("themeMenuButton");

const themeButtons = document.getElementsByClassName("themeButton");

const navCards = document.getElementsByClassName("NavCard");

const bindThemeButtons = () =>
  Array.from(themeButtons).forEach((themeButton) => {
    themeButton.addEventListener("click", onThemeButtonClick);
  });

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

bindThemeButtons();
