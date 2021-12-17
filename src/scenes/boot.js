export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.json('gameConfig', 'assets/config.json');
    this.loadFont('AllTheWayToTheSun', 'assets/AllTheWayToTheSun-o2O0.ttf');
    this.loadFont('Junegull', 'assets/junegull.ttf');
    this.loadFont('Stanberry', 'assets/Stanberry.ttf');
    this.load.image('preload', 'assets/new assets/preload.png');
   
    this.load.image('sitelogotitle', 'assets/new assets/bclogo-title.png');

    console.log("here 0")
  
    
  }
  create() {
     console.log("here 1")
      this.scene.start('Preload');
  }
  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }
  resize({ viewArea }) {}
}
