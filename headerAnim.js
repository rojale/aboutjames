const baseHeader = "James Zhang";
let currentHeader = baseHeader;

let animQueue = [];
let running = false;

if (
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
  const headerObserver = new IntersectionObserver(
    (entry) => {
      const newHeader = getNewHeader(entry);
      if (newHeader === currentHeader) {
        return;
      }

      runAnim(currentHeader, newHeader);

      currentHeader = newHeader;
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: [1],
    }
  );
  const headerObserverTargets = document.querySelectorAll(".piececontent");

  headerObserverTargets.forEach((headerObserverTarget) =>
    headerObserver.observe(headerObserverTarget)
  );
}

const runAnim = (currentHeader, newHeader) => {
  setHiddenHeader(newHeader);
  runFadeShift(currentHeader, newHeader);
};

const runFadeShift = (currentHeader, newHeader) => {
  const [shiftLetters, fadeLetters] = getLetterDiffs(currentHeader, newHeader);

  applyShiftStyles(shiftLetters);
};

applyShiftStyles = (shiftLetters) => {
    const parentX = document.getElementById('displayheader').getBoundingClientRect().x;
  shiftLetters.forEach((shiftLetter) => {
    const spanEl = getDisplayLetter(shiftLetter.currentIndex);
    const posX = spanEl.getBoundingClientRect().x;
    console.log({posX, parentX})
    spanEl.className="shiftLetter"

  });
};

const getDisplayLetter = (idx) => document.getElementById(`dis${idx}`);

const getLetterDiffs = (currentHeader, newHeader) => {
  let morphLetters = [];
  let fadeLetters = [];
  currentHeader.split("").forEach((currentLetter, currentLetterIndex) => {
    const targetIndex = findUnfoundIndex(
      newHeader,
      currentLetter,
      morphLetters
    );
    if (targetIndex >= 0) {
      morphLetters.push({
        letter: currentLetter,
        currentIndex: currentLetterIndex,
        newIndex: targetIndex,
      });
    } else {
      fadeLetters.push({
        letter: currentLetter,
        currentIndex: currentLetterIndex,
      });
    }
  });
  return [morphLetters, fadeLetters];
};

const findUnfoundIndex = (
  inputString,
  currentLetter,
  existingData,
  startIndex = 0
) => {
  const retIndex = inputString.indexOf(currentLetter, startIndex);
  if (retIndex >= 0) {
    if (
      !existingData.some((morphLetter) => morphLetter.currentIndex === retIndex)
    ) {
      return retIndex;
    } else {
      return findUnfoundIndex(
        inputString,
        currentLetter,
        existingData,
        retIndex + 1
      );
    }
  }
  return retIndex;
};

const setHiddenHeader = (newHeader) => {
  const container = getHiddenHeaderContainer();
  const positionContainer = getPositionHeaderContainer();
  setContainerHtmlFromString(newHeader, container, { idPrefix: "hid" });
  setContainerHtmlFromString(newHeader, positionContainer, { idPrefix: "pos" });
};

const setContainerHtmlFromString = (newString, container, { idPrefix }) => {
  container.innerHTML = createSpansFromString(newString, { idPrefix });
};

const createSpansFromString = (newString, { idPrefix, appliedClasses }) => {
  let outputHtml = "";
  newString.split("").forEach((letter, idx) => {
    outputHtml += createSpanFromLetter(letter, {
      appliedId: `${idPrefix}${idx}`,
      appliedClasses,
    });
  });

  return outputHtml;
};

const createSpanFromLetter = (letter, { appliedId, appliedClasses }) =>
  `<span ${appliedId ? `id="${appliedId}"` : ""} ${
    appliedClasses ? `class=${appliedClasses}` : ""
  }>${letter}</span>`;

const getPositionHeaderContainer = () =>
  document.getElementById("positionheader");
const getHiddenHeaderContainer = () => document.getElementById("hiddenheader");
const getDisplayHeaderContainer = () =>
  document.getElementById("displayheader");

const getNewHeader = (entries) => {
  // skip initialization
  if (entries.length !== 1) {
    return baseHeader;
  }

  const entry = entries[0];
  switch (entry.target.id) {
    case "srContent":
      return "Simple Reddit";
    case "axsourcecontent":
      return "AXSource";
    case "jbContent":
      return "Javelin's Armory";
    case "vidmultitrackcontent":
      return "OCV - Multitrack";
    case "tkdokucontent":
      return "tkDoku";
    case "calstatscontent":
      return "CalStats";
    case "wilkscontent":
      return "Wilks Calculator";
    case "googlebettercontent":
      return "Google Better";
    case "notemecontent":
      return "Note Me!";

    default: {
      return baseHeader;
    }
  }
};
