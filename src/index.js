import Phaser from "phaser";
import * as scenes from "./scenes";

let DPR = 1;
if (window.devicePixelRatio >= 2 || window.outerWidth >= 1920) {
  DPR = 2;
}
console.log("Original DPR", window.devicePixelRatio);
console.log("Using DPR", DPR);
console.log("Window outerwidth", window.outerWidth);

const GAMEPLAY = {
  WIDTH: 768 * DPR,
  HEIGHT: 1365 * DPR,
  SAFE_WIDTH: 768 * DPR,
  SAFE_HEIGHT: 1365 * DPR,
  NEW_WIDTH:window.innerWidth>window.innerHeight?768:window.innerWidth,
  NEW_HEIGHT:window.innerWidth>window.innerHeight?1365:window.innerHeight,
  ASSET_WIDTH: 768,
  ASSET_HEIGHT: 1365,
};
console.log(GAMEPLAY.NEW_WIDTH,window.innerWidth,window.innerHeight)
const config = {
  type: Phaser.CANVAS,
  width: GAMEPLAY.NEW_WIDTH,
  height: GAMEPLAY.NEW_HEIGHT,
  backgroundColor: "#1a4242",
  parent: "gameContent",
  scene: Object.values(scenes),
};

const game = new Phaser.Game(config);

const gameWidth = GAMEPLAY.WIDTH;
const gameHeight = GAMEPLAY.HEIGHT;
const safeWidth =
  GAMEPLAY.SAFE_WIDTH <= GAMEPLAY.WIDTH ? GAMEPLAY.SAFE_WIDTH : GAMEPLAY.WIDTH;
const safeHeight =
  GAMEPLAY.SAFE_HEIGHT <= GAMEPLAY.HEIGHT
    ? GAMEPLAY.SAFE_HEIGHT
    : GAMEPLAY.WIDTH;

let scaleRatio = 1;

var viewArea = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

game.refWidth = GAMEPLAY.NEW_WIDTH;
game.refHeight = GAMEPLAY.NEW_HEIGHT;
game.DPR = DPR;
let heightRatio=(GAMEPLAY.NEW_HEIGHT-GAMEPLAY.ASSET_HEIGHT)/GAMEPLAY.ASSET_HEIGHT
let widthRatio=(GAMEPLAY.NEW_WIDTH-GAMEPLAY.ASSET_WIDTH)/GAMEPLAY.ASSET_WIDTH
let minWidth=Math.min(GAMEPLAY.NEW_WIDTH,560)
if(Math.abs(heightRatio)<0.1 || GAMEPLAY.NEW_HEIGHT > GAMEPLAY.ASSET_HEIGHT){
  game.bgScale=1+(Math.abs(heightRatio)>Math.abs(widthRatio)?heightRatio:widthRatio)
  minWidth=Math.min(GAMEPLAY.NEW_WIDTH,980)
}
else{
  game.bgScale=1+(Math.abs(heightRatio)>Math.abs(widthRatio)?widthRatio:heightRatio)
}

game.refBGWidth = GAMEPLAY.NEW_WIDTH*game.bgScale;
game.refBGHeight = GAMEPLAY.NEW_HEIGHT*game.bgScale;
game.contentScale=1+(minWidth-GAMEPLAY.ASSET_WIDTH)/GAMEPLAY.ASSET_WIDTH

// window.addEventListener("resize", onResize);
// function onResize() {
//   triggerResize();
//   setTimeout(triggerResize, 50);
// }

// game.events.once("boot", () => {
//   onResize();
// });

function triggerResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log("resize");
  // Calculate Canvas size and scale
  scaleRatio = Math.min(width / safeWidth, height / safeHeight);

  const nWidth = Math.max(0, Math.min(gameWidth * scaleRatio, width));
  const nHeight = Math.max(0, Math.min(gameHeight * scaleRatio, height));
  const scale = {
    x: (gameWidth / nWidth) * scaleRatio,
    y: (gameHeight / nHeight) * scaleRatio,
  };
  const scaledWidth = width / scaleRatio;
  const scaledHeight = height / scaleRatio;

  viewArea.left = Math.max(-(scaledWidth - gameWidth) * 0.5, 0);
  viewArea.top = Math.max(-(scaledHeight - gameHeight) * 0.5, 0);
  viewArea.right = Math.min(viewArea.left + scaledWidth, gameWidth);
  viewArea.bottom = Math.min(viewArea.top + scaledHeight, gameHeight);

  viewArea.x = viewArea.left;
  viewArea.y = viewArea.top;
  viewArea.width = viewArea.right - viewArea.left;
  viewArea.height = viewArea.bottom - viewArea.top;

  game.canvas.style.width = `${GAMEPLAY.WIDTH * scaleRatio}px`;
  game.canvas.style.height = `${GAMEPLAY.HEIGHT * scaleRatio}px`;

  game.refViewArea = viewArea;
  game.scene.scenes.forEach((scene) => {
    scene.resize({ scaleRatio, viewArea });
  });
}
