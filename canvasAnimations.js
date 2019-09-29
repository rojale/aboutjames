const headerCanvas = document.getElementById("headerCanvas");

const ctx = headerCanvas.getContext("2d");

const resizeCanvas = () => {
  ctx.canvas.width = window.innerWidth;
  const canvasParent = headerCanvas.parentElement;
  ctx.canvas.height = canvasParent.getBoundingClientRect().height;
};
const colors = [
  "#ff9ff3",
  "#feca57",
  "#ff6b6b",
  "#48dbfb",
  "#1dd1a1",
  "#00d2d3",
  "#54a0ff",
  "#c8d6e5",
  "#222f3e"
];

const maxVelocity = 2;

class AniPoint extends Object {
  constructor() {
    super();
    this.velocity = {
      x: Math.ceil(Math.random() * maxVelocity),
      y: Math.ceil(Math.random() * maxVelocity)
    };
    this.position = {
      x: Math.random() * headerCanvas.width,
      y: Math.random() * headerCanvas.height
    };
    this.color = colors[Math.floor(Math.random() * (colors.length - 1))];
    this.checkVelocity = () => {
      const { x, y } = this.position;
      if (x <= 0 || x >= headerCanvas.width) {
        this.velocity.x = -this.velocity.x;
      }
      if (y <= 0 || y >= headerCanvas.height) {
        this.velocity.y = -this.velocity.y;
      }
    };
    this.movePoint = () => {
      this.position = {
        x: this.position.x + this.velocity.x,
        y: this.position.y + this.velocity.y
      };
    };
  }
}

const minPoints = 2;

const maxPoints = 6;

class AniObject extends Object {
  constructor() {
    super();
    this.points = [new AniPoint()];
    this.maxPoints = Math.ceil(
      Math.random() * (maxPoints - minPoints) + minPoints
    );
    this.addPoint = () => {
      if (this.points.length < this.maxPoints) {
        this.points = this.points.concat(new AniPoint());
        return true;
      }
      return false;
    };
    this.updatePoints = () => {
      this.points.forEach(point => {
        point.checkVelocity();
        point.movePoint();
      });
    };
  }
}

//treat as stack for easier access of latest
let aniObjectList = [];
const maxShapes = 3;

const clearAniObjectList = () => {
  aniObjectList = [];
};

const removeLastAniObject = () => {
  aniObjectList = aniObjectList.slice(0, -1);
};

const newPoint = () => {
  if (aniObjectList.length === 0) {
    aniObjectList = aniObjectList.concat(new AniObject());
    setTimeout(newPoint, 5000);
    return;
  }
  //using return from addPoint for logic
  if (aniObjectList[0].addPoint()) {
    setTimeout(newPoint, 5000);
    return;
  } //add a new object
  if (aniObjectList.length >= maxShapes) {
    removeLastAniObject();
  } else {
    aniObjectList = [new AniObject()].concat(aniObjectList);
  }
  setTimeout(newPoint, 3000);
};

const drawPoint = point => {
  ctx.beginPath();
  ctx.fillStyle = ctx.strokeStyle = point.color;
  ctx.lineWidth = 5;
  ctx.arc(point.position.x, point.position.y, 1, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
};

const runAnimation = () => {
  ctx.clearRect(0, 0, headerCanvas.width, headerCanvas.height);
  ctx.lineWidth = 5;

  aniObjectList.forEach(aniObject => {
    const { points } = aniObject;
    if (aniObject.points.length === 1) {
      drawPoint(aniObject.points[0]);
      aniObject.updatePoints();
      return;
    }
    //first draw lines
    ctx.beginPath();
    ctx.moveTo(points[0].position.x, points[0].position.y);
    aniObject.points.forEach(point => {
      ctx.lineTo(point.position.x, point.position.y);
    });
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.fillStyle = ctx.strokeStyle = "white";
    ctx.lineJoin = "round";
    ctx.stroke();

    //draw circles
    aniObject.points.forEach(point => drawPoint(point));

    aniObject.updatePoints();
  });

  window.requestAnimationFrame(runAnimation);
};

//initialization
resizeCanvas();
const onResize = () => {
  resizeCanvas();
  clearAniObjectList();
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }
  newPoint();
};
window.addEventListener("resize", onResize);
newPoint();
runAnimation();
