import AudioManager from "../utils/audio_manager";
import { delayTime } from "../utils";
export default class Particle extends Phaser.GameObjects.Container {
  constructor(scene, texture, right, originalX, originalY, scaling) {
    super(scene);
    this.body = this.scene.add.image(0, 0, texture).setOrigin(0.5, 0.5);
    this.originalSize = 0.5;
    this.scale = this.originalSize;
    this.add(this.body);
    this.gravity = 5;
    this.count = 180;
    this.originalX = originalX;
    this.originalY = originalY;
    this.x = this.originalX;
    this.y = this.originalY;
    this.right = right;
    this.shouldAnimate = false;
    this.reset();
  }
  setInitial() {}
  update() {
    // this.Displacement-=5;
    if (this.shouldAnimate) {
      
      if (!this.nogravity) {
        this.x =
          this.x + this.direction * this.Displacement * Math.cos(this.ang);
        this.gravity += 2;
        this.angle += this.direction * this.rot;
      }
      else{
        this.angle += this.direction * this.rot;
        if(this.scaleX<=-this.originalSize){
          this.scaleX=this.originalSize
        }
        this.scaleX=this.scaleX-this.flippingSpeed;
      }

      this.y = this.y - this.Displacement * Math.sin(this.ang) + this.gravity;
      if (this.prevy < this.y && !this.nogravity) {
        this.nogravity = true;
        this.gravity += 5;
      }

      this.prevy = this.y;
      this.count--;
      if (this.count <= 0) {
        this.count = 180;
        this.shouldAnimate = false;
        this.reset();
      }
    }
  }
  startAnimation() {
    this.shouldAnimate = true;
    this.alpha = 1;
  }
  reset() {
    this.alpha = 0;
    this.ang = 0;
    this.Displacement = 20 +30* Math.random();
    this.gravity = 5;
    this.ang = Math.PI / 4 + (Math.PI / 4) * Math.random();
    this.direction = this.right ? -1 : 1;
    this.rot = Math.random() * 20;
    this.prevy = 10000;
    this.scale = this.originalSize;
    this.flippingSpeed=0.05+Math.random()*0.1;
    this.nogravity = false;
    this.x = this.originalX;
    this.y = this.originalY;
  }
}
