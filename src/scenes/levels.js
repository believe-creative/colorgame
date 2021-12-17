import AudioManager from "../utils/audio_manager";
import BaseScene from "./basescene";
import Level from "../gameobjects/level";

export default class LevelsScene extends BaseScene {
  constructor() {
    super("Levels");

  }

  init(data) {
    this.section=data.section;
    this.levelopen=data.levelopen;
  }

  create() {
    this.oData = this.cache.json.get("gameConfig");

    AudioManager.stopSound("background_music")

    this.background = this.add.image(0, 0, "gamebg");
    this.background.setOrigin(0.5,0.5);
    this.bgContainer.add(this.background);

  //   this.gameOverText = this.add
  //   .text(0, 0, "Select Level from "+this.section, {
  //     font: 96*0.5*this.game.DPR + "px Junegull",
  //     fill: "#ffffff",
  //     align: "center",
  //     fontWeight:"bold"
  //   })
  //   .setOrigin(0.5);
  // this.gameOverText.x = this.game.refWidth / 2;
  // this.gameOverText.y = this.game.refHeight / 2 -900*0.5*this.game.DPR;
  // this.contentContainer.add(this.gameOverText);

  this.siteLogoTitle = this.add.image(0, 0, "sitelogotitle");
  this.siteLogoTitle.setOrigin(0.5, 0.5).setScale(this.game.contentScale);
  this.siteLogoTitle.x = this.game.refWidth / 2;
  this.siteLogoTitle.y = this.game.refHeight - this.siteLogoTitle.height / 2;
  this.contentContainer.add(this.siteLogoTitle);

  let noOFLevels=this.oData.levels[this.section].nofolevels;
  // console.log(noOFLevels,Math.ceil(noOFLevels/3),(noOFLevels%3==0?3:noOFLevels%3),noOFLevels%3);
  let j=0;
  let gap=10
  for (let i = 0; i < Math.ceil(noOFLevels/3) ; i++) {
    let tempNum=((Math.ceil(noOFLevels/3)-i)!=1 || noOFLevels%3 ==0?3:Math.ceil(noOFLevels%3));
    // console.log(tempNum,Math.ceil(noOFLevels/3-i));
    for (let k = 0; k < tempNum; k++) {
      j++;
      
      let level = new Level(this, j,this.section,k );
          
          level.setScale(this.game.contentScale);
          this.contentContainer.add(level);
          level.x=this.game.refWidth / 2 + ((level.levelbg.width+gap)*(k-1)*this.game.contentScale)
          level.y=this.game.refHeight / 2 + ((level.levelbg.height+gap)*(i-Math.floor(Math.ceil(noOFLevels/3)/2))*this.game.contentScale)
          level.addEvents();
          level.on("pointerdown", this.gameLevelClickHandler.bind(this,j)); 
          console.log(j,BaseScene.localData[this.section]);
          if(j>BaseScene.localData[this.section].opened){
            level.showLock();
          }
          // if(j>(this.levelopen?this.levelopen:1)){
            
          // }
          level.scale = 0;
          this.tweens.add({
            targets: level,
            scaleX: this.game.contentScale,
            scaleY: this.game.contentScale,
            ease: "Back.out",
            duration: 200,
            delay: 50*j,
          });
    }
  }
 
  }
  gameLevelClickHandler(gameLevel){
      if(gameLevel % 3 == 0){
        this.scene.start("GameBonusLevel",{gameLevel:gameLevel,section:this.section,Score:0});
      }else{
        this.scene.start("Game",{gameLevel:gameLevel,section:this.section,Score:0});
      }
  }
}
