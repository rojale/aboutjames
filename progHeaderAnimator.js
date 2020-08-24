const baseHeader = "JAMES ZHANG";
let currentHeader = baseHeader;
let queuedAnims = [];
let running = false;
const runQueuedAnim = () => {
  if (running || queuedAnims.length === 0) {
  } else {
    running = true;
    setTimeout(queuedAnims[0], 500);
    queuedAnims = queuedAnims.slice(1);
  }
  requestAnimationFrame(runQueuedAnim);
};
runQueuedAnim();
queueAnim = (animFuncConstructor) => {
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
    (entry) => {
      const newHeader = getNewHeader(entry);

      if (newHeader === currentHeader) {
        return;
      }

      const {fadeout, fadein} = createAnimCbs(currentHeader, newHeader)

      queueAnim((onComplete) => {
        return () => {
          fadeout(currentHeader, newHeader);
          setTimeout(() => {
            fadein(currentHeader, newHeader);
            onComplete();
          }, 1000);
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

  headerObserverTargets.forEach((headerObserverTarget) =>
    headerObserver.observe(headerObserverTarget)
  );
}

const createAnimCbs = (currentHeader, newHeader)=>{
    return {
        fadein: ()=>runFadein(currentHeader, newHeader),
        fadeout: ()=>runFadeout(currentHeader, newHeader)
    }
}

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

const writeHeader = (charObjList) => {
  const container = document.getElementById("headerAnimationWrapper");

  container.innerHTML = concatStrings(charObjList.map(createSpansFromCharObj));
};

const createSpansFromCharObj = (charObj) => {
  return `<div class="${charObj.classString}"><span>${
    charObj.char === " " ? "&nbsp;" : charObj.char
  }</span></div>`;
};

const concatStrings = (passedStrings) => {
  let ret = "";
  passedStrings.forEach((passedString) => {
    ret += passedString;
  });
  return ret;
};

const runFadeout = (currentHeader, newHeader) => {
    console.log("runFadeout", currentHeader, newHeader)
  const charObjList = getFadeoutObjList(currentHeader, newHeader);

  writeHeader(charObjList);
};

const runFadein = (currentHeader, newHeader) => {
    console.log("runFadein", currentHeader, newHeader)
  const charObjList = getFadeInObjList(currentHeader, newHeader);
  writeHeader(charObjList);
};

const getFadeoutObjList = (currentHeader, tranformTargetHeader) => {
  let transformTargetChars = tranformTargetHeader.split("");

  return currentHeader.split("").map((newHeaderChar) => {
    const targetIndex = transformTargetChars.findIndex(
      (char) => char === newHeaderChar
    );
    if (targetIndex >= 0) {
      transformTargetChars = [
        ...transformTargetChars.slice(0, targetIndex),
        ...transformTargetChars.slice(targetIndex + 1),
      ];

      return {
        classString: "",
        char: newHeaderChar,
      };
    }
    return {
      classString: "fadeout",
      char: newHeaderChar,
    };
  });
};

const getFadeInObjList = (currentHeader, transformTargetHeader) => {
  let currentTargetChars = currentHeader.split("");

  return transformTargetHeader.split().map((newHeaderChar) => {
    const targetIndex = currentTargetChars.findIndex(
      (char) => char === newHeaderChar
    );
    if (targetIndex >= 0) {
      currentTargetChars = [
        ...currentTargetChars.slice(0, targetIndex),
        ...currentTargetChars.slice(targetIndex + 1),
      ];
      return {
        classString: "",
        char: newHeaderChar,
      };
    }
    return {
      classString: "fadein",
      char: newHeaderChar,
    };
  });
};
