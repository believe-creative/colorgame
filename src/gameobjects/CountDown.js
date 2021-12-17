export default class CountDown extends Phaser.GameObjects.Container {
  constructor(scene,frame) {
    super(scene);

    this.frame = frame;
    this.scene = scene;
    this.body = scene.add
      .image(0, 0, "start_timer000"+this.frame)
      .setOrigin(0);
    this.add(this.body);
  }
  update() {
    // console.log("hell");
  }
  setDown(){
    if(!this.isMouseDown){
      this.isMouseDown = true;
      this.body.setTexture('boxhighlight');
    }
  }
  changeFrame(frame){
    this.frame=frame;
    this.body.setTexture("start_timer000"+this.frame);
  }
  hide(){
    this.alpha=0;
  }
  show(){
    this.alpha=1;
  }
  
  
}
