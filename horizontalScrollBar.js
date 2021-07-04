const checkForScrollBar = () => {
    const body = getMainBody();

    const bodyIsOverflowing = checkBodyOverflow(body);

    conditionallyApplyOverflowShrink(bodyIsOverflowing);
};

const getMainBody = () => document.getElementById("MainBody");

const checkBodyOverflow = (bodyElement) =>
    bodyElement.scrollHeight > window.innerHeight;

const partialApply = (fn, ...args) =>
    args.reduce((acc, curr) => acc.bind(null, curr), fn);

const functionIf = (trueCb, falseCb, bool) => {
    if (bool) {
        trueCb();
    } else {
        falseCb();
    }
};

const applyShrink = () => {
    const scrollBarWidth = getScrollbarWidth();
    const bodyElement = getMainBody()
    bodyElement.style.width = `calc(100vw - ${scrollBarWidth}px)`
};

const removeShrink = () => {
    const bodyElement = getMainBody()
    bodyElement.style.width = "100vw"
};

const getScrollbarWidth = () => {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
};

const conditionallyApplyOverflowShrink = partialApply(
    functionIf,
    applyShrink,
    removeShrink
);

const throttledCheckForScrollBar = () => {
    window.requestAnimationFrame(checkForScrollBar);
};

window.addEventListener("resize", throttledCheckForScrollBar);

throttledCheckForScrollBar();