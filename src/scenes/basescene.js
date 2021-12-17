import AudioManager from "../utils/audio_manager";

export default class BaseScene extends Phaser.Scene {
  static localData=null;
  constructor(args) {
    super(args);
    // console.log(args);
  }
  preload() {
    this.bgContainer = this.add.container();
    this.contentContainer = this.add.container();
    this.levelsCompleted=[];
    if (this.scene.key != "Preload") {
      this.addUI();
    }
    this.resize({ viewArea: this.game.refViewArea });
    // console.log(this);
  }
  // create() {
  //   this.resize({ viewArea: this.game.refViewArea });
  // }

  loadAssetPack(pack, forceStart) {
    this.isAssetPackLoaded = false;

    if (pack.images) {
      for (var i = 0; i < pack.images.length; i++) {
        let imagePath =
          this.game.DPR === 1
            ? pack.images[i].path
            : pack.images[i].path.replace("@1x", "@2x");
        this.load.image(pack.images[i].key, imagePath);
      }
    }
    if (pack.atlas) {
      for (var i = 0; i < pack.atlas.length; i++) {
        this.load.atlas(
          pack.atlas[i].key,
          pack.atlas[i].imgPath,
          pack.atlas[i].jsonPath
        );
      }
    }
    if (pack.video) {
      for (var i = 0; i < pack.video.length; i++) {
        this.load.video(
          pack.video[i].key,
          pack.video[i].path,
          "canplaythrough",
          false,
          pack.video[i].mute
        );
      }
    }
    if (pack.multiatlas) {
      for (var i = 0; i < pack.multiatlas.length; i++) {
        this.load.multiatlas(
          pack.multiatlas[i].key,
          pack.multiatlas[i].jsonPath,
          "assets/"
        );
      }
    }
    if (pack.audio) {
      for (var i = 0; i < pack.audio.length; i++) {
        this.load.audio(pack.audio[i].key, pack.audio[i].path);
      }
    }
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      if (!AudioManager.scene) {
        AudioManager.init(this);
      }
      for (var i = 0; i < pack.audio.length; i++) {
        AudioManager.addSound(pack.audio[i].key);
      }
      this.assetPackLoaded();
    });
    if (forceStart) {
      this.load.start();
    }
  }
  assetPackLoaded() {
    this.isAssetPackLoaded = true;
  }
  startScreen(name, options) {
    // console.log("..startScreen", name);
    if (this.isAssetPackLoaded) {
      this.scene.start(name, options);
    } else {
      setTimeout(() => {
        this.startScreen(name, options);
      }, 1000);
    }
  }
  resize({ viewArea }) {
    if (this.backButton) {
      this.backButton.x = (this.backButton.width/2+40)*this.game.contentScale ;
      this.backButton.y = (this.backButton.height/2+40)*this.game.contentScale ;
    }
    if (this.helpButton) {
      this.helpButton.x = this.game.refWidth-(this.helpButton.width/2+40)*this.game.contentScale;
      this.helpButton.y = (this.helpButton.height/2+40)*this.game.contentScale;
    }
    if(this.bgContainer){
      // console.log(this.game.bgScale)
      this.bgContainer.setScale(this.game.bgScale)
      this.bgContainer.x=this.game.refWidth/2;
      this.bgContainer.y=this.game.refHeight/2;
    }
  }

  addUI() {
    this.uiContianer = this.add.container();
   
    if( this.scene.key === "Help"){
      this.helpButton = new ToggleButton(this, "next_level", "next_level");
    }else{
      this.helpButton = new ToggleButton(this, "homebtn", "homebtn");
    }
    
    this.helpButton.scale = this.game.contentScale*1.5;

    if (this.scene.key === "Sections" || this.scene.key === "Levels" || this.scene.key === "Help") {
      this.helpButton.visible = true;
      this.backButton = new UIButton(
        this,
        "ui",
        "backbtn",
        "backbtn"
      );
  
      this.backButton.scale = this.game.contentScale*1.5;
      this.uiContianer.add(this.backButton);
      this.prevScene=this.scene.key;
      this.backButton.once(
        UIButton.CLICK,
        this.backButtonClickHandler.bind(this)
      );
    } else {
      this.helpButton.visible = false;
    }
    this.uiContianer.add(this.helpButton);
    this.helpButton.on('pointerdown',(e)=>{
      if( this.scene.key === "Help"){
        this.scene.start("Sections");
      }else{
        this.scene.start("Intro");
      }
      
    });
    // this.helpButton.toggle();
  
  
    /* 
    this.resetButton.once(
      UIButton.CLICK,
      this.resetButtonClickHandler.bind(this)
    );*/
    // this.helpButton.on(ToggleButton.TOGGLE, this.handleSoundToggle.bind(this));
  }

  backButtonClickHandler() {
    //TODO: Add code to add back button.
    
    if (this.scene.key === "Sections" || this.scene.key === "Help") {
      this.scene.start("Intro");
    }else if(this.scene.key === "Levels"){
      this.scene.start("Sections");
    }
    // console.log(this);
  }

  helpButtonEnable() {
    //TODO: Add code to add back button.
    this.helpButton.visible = true;
    this.helpButton.setInteractive({ useHandCursor: "pointer" });
  }
  helpButtonDisable() {
    //TODO: Add code to add back button.
    this.helpButton.visible = false;
    this.helpButton.disableInteractive();
  }
  handleSoundToggle(on) {
   // console.log("help");
    AudioManager.toggleSound(on);
  }
} //end basescene

//Helper button classes
class UIButtonBase extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene);
    this.on("pointerover", this.handlePointerOver.bind(this));
    this.on("pointerout", this.handlePointerOut.bind(this));
  }
  handlePointerOver() {
    this.timeline = this.scene.tweens.timeline();
    this.timeline.loop = -1;
    this.timeline.add({
      targets: this,
      duration: 100,
      angle: -10,
    });
    this.timeline.add({
      targets: this,
      duration: 100,
      angle: 10,
    });
    this.timeline.add({
      targets: this,
      duration: 50,
      angle: 0,
    });
    this.timeline.play();
  }
  handlePointerOut() {
    this.timeline.stop();
    this.angle = 0;
  }
}

class UIButton extends UIButtonBase {
  static CLICK = "CLICK";
  constructor(scene, atlas, upTexture, downTexture) {
    super(scene);
    this.atlas = atlas;
    this.upTexture = upTexture;
    this.downTexture = downTexture;
    this.setTexture( upTexture);
    this.setInteractive({ useHandCursor: "pointer" });
    this.on("pointerdown", this.handlePointerDown.bind(this));
    this.on("pointerdown", this.handlePointerUp.bind(this));
  }
  handlePointerDown() {
    this.setTexture(this.downTexture);
  }
  handlePointerUp() {
    this.setTexture(this.upTexture);
    this.emit(UIButton.CLICK);
  }
}

class ToggleButton extends UIButtonBase {
  static TOGGLE = "TOGGLE";
  constructor(scene, onTexture, offTexture) {
    super(scene);
    this.onTexture = onTexture;
    this.offTexture = offTexture;
    this.setTexture(onTexture);
    this.setInteractive({ useHandCursor: "pointer" });
    this.on("pointerup", this.handlePointerUp.bind(this));
    this.isOn = true;
  }
  handlePointerUp() {
    this.isOn = !this.isOn;
    this.toggle(this.isOn);
    this.emit(ToggleButton.TOGGLE, this.isOn);
  }
  handlePointerDisable() {
    this.disableInteractive();
  }
  handlePointerenable() {
    this.setInteractive({ useHandCursor: "pointer", pixelPerfect: true });
    
  }
  toggle(isOn) {
    this.isOn = isOn;
    if (this.isOn) {
      this.setTexture(this.onTexture);
    } else {
      this.setTexture(this.offTexture);
    }
  }
}
