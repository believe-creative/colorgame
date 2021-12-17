import AudioManager from "../utils/audio_manager";
import { delayTime } from "../utils";
export default class ParticleBox extends Phaser.GameObjects.Container {
  constructor(scene,size) {
    super(scene);
    this.gravity = 5;
    this.count = 180;
    this.scene = scene;
    this.size = size;
    let xyValue=0;
    // if(gameLevel%3){
    //   xyValue=this.size/2*0.5*scene.game.DPR;
    // }else{
    //   xyValue=0;
    // }
    
    this.body = scene.add
      .image(xyValue, xyValue, "boxhighlight")
      .setOrigin(0.5);
    this.add(this.body);
   
    this.boxText = scene.add
      .text(xyValue, xyValue, "",{
        font: "56px Junegull",
        fill: "#FFFFFF"
      })
      .setOrigin(0.5);
    this.add(this.boxText);


    this.shouldAnimate = false;
    this.alpha = 0;
    // this.reset();
  }
  setInitial() {}
  update() {
    // this.Displacement-=5;
    if (this.shouldAnimate) {
      this.angle += this.direction * this.rot;
      this.x =
          this.x + this.direction * this.Displacement * Math.cos(this.ang);

      this.y = this.y - this.Displacement * Math.sin(this.ang) + this.gravity;
      this.gravity += 5;

      this.prevy = this.y;
      this.count--;
      if (this.count <= 0) {
        this.count = 60;
        this.shouldAnimate = false;
        // this.reset();
        this.alpha = 0;
      }
    }
  }
  startAnimation() {
    this.shouldAnimate = true;
    this.alpha = 1;
  }
  reset(x,y,letter) {
    this.alpha = 0;
    this.ang = 0;
    this.Displacement =
      this.scene.game.DPR == 2
        ? (35 + Math.random() * 3) * 1.4
        : 35 + Math.random() * 3;
    this.gravity = 10;
    this.ang = Math.PI / 2 + (Math.PI / 4) * Math.random();
    this.direction = Math.random()*10<5 ? -1 : 1;
    this.rot = Math.random() * 20;
    this.prevy = 10000;
    this.nogravity = false;
    this.x = x;
    this.y = y;
    this.letter=letter;
    this.boxText.setText(this.letter.toUpperCase());
  }
}
