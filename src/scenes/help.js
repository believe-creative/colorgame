import AudioManager from "../utils/audio_manager";
import BaseScene from "./basescene";
import Level from "../gameobjects/level";

export default class HelpScene extends BaseScene {
  constructor() {
    super("Help");

  }

  init(data) {
    console.log("help");

  }

  create() {
    this.oData = this.cache.json.get("gameConfig");
    this.background = this.add.image(0, 0, "gamebg");
    this.background.setOrigin(0.5,0.5);
    this.bgContainer.add(this.background);
    
    this.centerpanel = this.add.container();
    this.contentContainer.add(this.centerpanel);
    this.centerpanelBG = this.add.image(0,0, "centerpanel");
    this.centerpanelBG.setOrigin(0,0);
    this.centerpanelBG.setScale(0.90);
    this.centerpanel.add(this.centerpanelBG);
    this.contentContainer.sendToBack(this.centerpanel);
    this.centerpanel.x=this.game.refWidth / 2 -this.centerpanelBG.width*this.game.contentScale*this.centerpanelBG.scale/2
    this.centerpanel.y=this.game.refHeight / 2+10 -this.centerpanelBG.height*this.game.contentScale*this.centerpanelBG.scale/2
    this.centerpanel.setScale(this.game.contentScale);

    this.instructionText = this.add
    .text(0, 0, "Swipe across horizontally from \nleft to right or vertically from \ntop to bottom or diagonally over \na bunch of letters (atleast three) to\n form a meaningful word", {
      font: 40 + "px Stanberry",
      fill: "#fff",
      align: "center",
    })
    .setOrigin(0.5).setScale(this.game.contentScale);
  
  this.instructionText.x = this.game.refWidth / 2;
  this.instructionText.y = this.game.refHeight / 2;
  this.contentContainer.add(this.instructionText);

  this.siteLogoTitle = this.add.image(0, 0, "sitelogotitle");
  this.siteLogoTitle.setOrigin(0.5, 0.5).setScale(this.game.contentScale);
  this.siteLogoTitle.x = this.game.refWidth / 2;
  this.siteLogoTitle.y = this.game.refHeight - this.siteLogoTitle.height / 2;
  this.contentContainer.add(this.siteLogoTitle);

  }

}
