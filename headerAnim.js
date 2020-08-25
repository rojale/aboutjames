String.prototype.width = function (font) {
  var f = font || "Source Sans Pro",
    o = $("<div></div>")
      .text(this)
      .css({
        position: "absolute",
        float: "left",
        "white-space": "nowrap",
        visibility: "hidden",
        font: f,
      })
      .appendTo($("body")),
    w = o.width();

  o.remove();

  return w;
};
const baseHeader = "James Zhang";
let currentHeader = baseHeader;

let queuedAnims = [];
let running = false;

const runQueuedAnim = () => {
  if (running || queuedAnims.length === 0) {
  } else {
    running = true;
    setTimeout(queuedAnims[0], 2000);
    queuedAnims = queuedAnims.slice(1);
  }
  requestAnimationFrame(runQueuedAnim);
};
runQueuedAnim();
queueAnim = animFuncConstructor => {
  queuedAnims = queuedAnims.concat(
    animFuncConstructor(() => {
      running = false;
    })
  );
};

if (
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
  const headerObserver = new IntersectionObserver(
    entry => {
      const newHeader = getNewHeader(entry);
      if (newHeader === currentHeader) {
        return;
      }

      const runFunc = createRunAnim(currentHeader, newHeader);

      queueAnim(onComplete => {
        return () => {
          runFunc(onComplete);
        };
      });

      currentHeader = newHeader;
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: [1],
    }
  );
  const headerObserverTargets = document.querySelectorAll(".piececontent");

  headerObserverTargets.forEach(headerObserverTarget =>
    headerObserver.observe(headerObserverTarget)
  );
}

const createRunAnim = (currentHeader, newHeader) => {
  return cb => {
    runAnim(currentHeader, newHeader, cb);
  };
};

const runAnim = (currentHeader, newHeader, cb) => {
  setHiddenHeader(newHeader);
  runFadeShift(currentHeader, newHeader, cb);
};

const setPositionHeader = newHeader => {
  const positionContainer = getPositionHeaderContainer();
  setContainerHtmlFromString(newHeader, positionContainer, { idPrefix: "pos" });
};

const runFadeShift = (currentHeader, newHeader, cb) => {
  const [shiftLetters, fadeLetters] = getLetterDiffs(currentHeader, newHeader);

  applyFadeLetters(fadeLetters);
  applyShiftStyles(shiftLetters);
  setTimeout(() => replaceDisplayHeader(newHeader, shiftLetters, cb), 750);
};

const replaceDisplayHeader = (newHeader, shiftLetters, onComplete) => {
  const displayContainer = getDisplayHeaderContainer();
  let newInnerHTML = "";
  Array.from(newHeader).forEach(
    (newLetter, idx) =>
      (newInnerHTML += createSpanFromLetter(newLetter, {
        appliedId: `dis${idx}`,
        ...(!shiftLetters.some(shiftLetter => shiftLetter.newIndex === idx) && {
          appliedClasses: "fadeInLetter",
        }),
      }))
  );

  displayContainer.innerHTML = newInnerHTML;
  onComplete();
};

const applyFadeLetters = fadeLetters => {
  fadeLetters.forEach(fadeLetter => {
    const displaySpan = getDisplayLetter(fadeLetter.currentIndex);
    displaySpan.className = "fadeOutLetter";
  });
};

applyShiftStyles = shiftLetters => {
  shiftLetters.forEach(shiftLetter => {
    const hiddenSpan = getHiddenSpan(shiftLetter.newIndex);
    const displaySpan = getDisplayLetter(shiftLetter.currentIndex);
    const hiddenPosX = hiddenSpan.getBoundingClientRect().x;
    const displayPosX = displaySpan.getBoundingClientRect().x;
    displaySpan.className = "shiftLetter";
    displaySpan.style.transform = `translateX(${hiddenPosX - displayPosX}px)`;
  });
};

const getHiddenSpan = idx => document.getElementById(`hid${idx}`);
const getDisplayLetter = idx => document.getElementById(`dis${idx}`);

const getLetterDiffs = (currentHeader, newHeader) => {
  let morphLetters = [];
  let fadeLetters = [];
  Array.from(currentHeader).forEach((currentLetter, currentLetterIndex) => {
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
      !existingData.some(morphLetter => morphLetter.currentIndex === retIndex)
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

const setHiddenHeader = newHeader => {
  const container = getHiddenHeaderContainer();
  setContainerHtmlFromString(newHeader, container, { idPrefix: "hid" });
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

const getNewHeader = entries => {
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

setPositionHeader("Javelin's Armory");
