import { delayTime } from "../utils";
import AudioManager from "../utils/audio_manager";
import BaseScene from "./basescene";

export default class IntroScene extends BaseScene {
  constructor() {
    super("Intro");
  }

  preload() {
    super.preload();
    let data=window.localStorage.getItem("tdxgrammerbox");

    AudioManager.stopSound("background_music")

    if(data){
      BaseScene.localData=JSON.parse(data)
    }
    else{
      data={
          consonants:{
            sectionscore:0,
            opened:1,
            scores:{}
          },
          vowels:{
            sectionscore:0,
            opened:1,
            scores:{}
          },
          nouns:{
            sectionscore:0,
            opened:1,
            scores:{}
          },
          verbs:{
            sectionscore:0,
            opened:1,
            scores:{}
          },
          tscore:0
      }
      BaseScene.localData=data;
      window.localStorage.setItem("tdxgrammerbox",JSON.stringify(data))
    }
    this.oData = this.cache.json.get("gameConfig");
    this.loadAssetPack(this.oData.assetPacks["Intro"], true);
    // console.log(this.oData.assetPacks["Intro"]);
    this.loadingComplete = false;
    this.background = this.add.image(0, 0, "homebg");
    this.background.setOrigin(0.5,0.5);
    this.bgContainer.add(this.background);
    this.gameTitle = this.add.image(0, 0, "game_title");
    this.gameTitle.setOrigin(0.5,0.5).setScale(0.7);
    this.gameTitle.y=-this.background.height / 4;
    this.bgContainer.add(this.gameTitle);
    var fontSize = 84 * this.game.DPR;
    

  this.playGame = this.add.image(this.game.refWidth / 2, this.game.refHeight / 2, "playbtn");
  this.playGame.setOrigin(0.5,0.5).setScale(this.game.contentScale);
  this.contentContainer.add(this.playGame);
  
  this.helpbtn = this.add.image(0,0, "helpbtn");
  this.helpbtn.setOrigin(0.5,0.5).setScale(this.game.contentScale);
  
  console.log(this.game.contentScale)
  this.contentContainer.add(this.helpbtn);
  this.helpbtn.x=this.playGame.x;
  this.helpbtn.y=this.playGame.y+(this.helpbtn.height+100)*this.game.contentScale;
  console.log(window.cordova)
  if(window.cordova){
    console.log("cordvoa")
    console.log(cordova.plugins,cordova.plugins.playGamesServices)
    if(cordova.plugins.playGamesServices){
      cordova.plugins.playGamesServices.isSignedIn(function (result) {
        // ‘result’ is the following object
        // {
        //         "isSignedIn": boolean
        // }
          console.log("Is user signed in: " + result.isSignedIn);
      }, function() {
          // On error: Auth check could not be done
      });
      }
  }


  this.siteLogoTitle = this.add.image(0, 0, "sitelogotitle");
  this.siteLogoTitle.setOrigin(0.5,0.5).setScale(this.game.contentScale);
  this.siteLogoTitle.x=this.playGame.x;
  this.siteLogoTitle.y=this.game.refHeight - (this.siteLogoTitle.height/2+40)*this.game.contentScale;
  this.contentContainer.add(this.siteLogoTitle);

  this.load.on("progress", (value) => {});
  }

  create() {
    this.loadingComplete = true;
    this.playGame.setInteractive({ useHandCursor: true });
    this.playGame.on("pointerdown", this.playGameClickHandler.bind(this)); 
    this.helpbtn.setInteractive({ useHandCursor: true });
    this.helpbtn.on("pointerdown", this.helpBtnClickHandler.bind(this)); 
  }
  async playGameClickHandler() {
    // console.log("single");
    await delayTime(500);
    this.scene.start("Sections");
    // AudioManager.playBgSound("background_music");
  }
  async helpBtnClickHandler(){
    // console.log("helpBtnClickHandler");
    await delayTime(500);
    this.scene.start("Help");
    // if(!this.instructionText.visible){
    //   this.instructionText.visible=true;
    // }else{
    //   this.instructionText.visible=false;
    // }
    
  }
}
