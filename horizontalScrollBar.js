const checkForScrollBar = () => {
    const body = document.getElementById("IndexBody");
    console.log(body.scrollHeight, body.clientHeight);

    const bodyIsOverflowing = checkBodyOverflow(body);

    conditionallyApplyOverflowShrink(bodyIsOverflowing);
};

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
    console.log('apply')

}

const removeShrink = () => { console.log('remove') }

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