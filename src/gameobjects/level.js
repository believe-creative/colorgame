export default class Level extends Phaser.GameObjects.Container {
    constructor(scene,level,section,index) {
      super(scene);
  
      this.scene = scene;
      this.level = level;
      this.section = section;

      this.levelbg = scene.add.image(0,0, "level");
      this.levelbg.setOrigin(0.5,0.5);
      this.add(this.levelbg);
      // this.levellock = scene.add.image(0,0, "levellock");
      // this.levellock.setOrigin(0.5,0.5);
      // this.add(this.levellock);
      this.levelChoice = scene.add
      .text(-2, -2, this.level, {
        font: 40 + "px AllTheWayToTheSun",
        fill: "#FFD400",
        align: "center",
        fontWeight:"bold"
      }).setShadow(0, 0, "#333333", 0, false, true)
      .setOrigin(0.5);
      this.add(this.levelChoice);
      this.isMouseDown = false;
    }
    update() {
      // console.log("hell");
    }
    addEvents(){
        this.setSize(this.levelbg.displayWidth, this.levelbg.displayHeight);
        this.setInteractive({ useHandCursor: true });
        // this.levelbg.on("pointerdown", this.handleClick.bind(this));
    }
    handleClick(){
        // console.log("click");
        this.emit("CLICK", this);
    }
    showLock(){
      this.levelbg.setTexture('levellock');
      this.levelChoice.y=8;
      this.levelChoice.setColor("#1a4242")
      this.disableInteractive();
    }
    show() {
      
    }
    
    
  }