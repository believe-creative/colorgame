import { delayTime } from "../utils";
import AudioManager from "../utils/audio_manager";
import BaseScene from "./basescene";

export default class SectionsScene extends BaseScene {
  constructor() {
    super("Sections");
  }

  create() {
    AudioManager.stopSound("background_music")
    this.oData = this.cache.json.get("gameConfig");

    this.background = this.add.image(0, 0, "gamebg");
    this.background.setOrigin(0.5, 0.5);
    this.bgContainer.add(this.background);

    // this.gameOverText = this.add
    //   .text(0, 0, "Select Section", {
    //     font: 96 * 0.5 * this.game.DPR + "px Junegull",
    //     fill: "#FFFFFF",
    //     align: "center",
    //   })
    //   .setOrigin(0.5);
    // this.gameOverText.x = this.game.refWidth / 2;
    // this.gameOverText.y = this.game.refHeight / 2 - 900 * 0.5 * this.game.DPR;
    // this.contentContainer.add(this.gameOverText);

    this.siteLogoTitle = this.add.image(0, 0, "sitelogotitle");
    this.siteLogoTitle.setOrigin(0.5, 0.5).setScale(this.game.contentScale);
    this.siteLogoTitle.x = this.game.refWidth / 2;
    this.siteLogoTitle.y = this.game.refHeight - (this.siteLogoTitle.height/2+40)*this.game.contentScale;
    this.contentContainer.add(this.siteLogoTitle);

    for (let i = 0; i < this.oData.sections.length; i++) {
      let section = this.oData.sections[i];
      let scale = 1.5 * 0.5 * this.game.DPR;
      let sectionbtn = this.add.container();
      this.contentContainer.add(sectionbtn);
      sectionbtn.setScale(this.game.contentScale)
      let sectionbg = this.add.image(0, 0, "sectionbtn");
      sectionbg.setOrigin(0.5, 0.5);
      sectionbg.section = section;
      sectionbtn.add(sectionbg);
      let sectionText = this.add
        .text(0, 0, section, {
          font: 72+"px Junegull",
          fill: "#FFFFFF",
          align: "center",
          fontWeight: "bold",
        })
        .setOrigin(0.5);
      sectionbtn.x = this.game.refWidth / 2;
      sectionbtn.add(sectionText);
      let verticalgap = 50;
      let initialY =
        this.game.refHeight / 2 -
        (4 * sectionbg.height +
          3 * verticalgap) /
          2;

      sectionbtn.y =
        (350 +
        i * (sectionbg.height + verticalgap))*this.game.contentScale ;
      
      sectionbg.setInteractive({ useHandCursor: true });
      sectionbg.on(
        "pointerdown",
        this.gameLevelClickHandler.bind(this, section)
      );
      sectionbtn.scale = 0;
      this.tweens.add({
        targets: sectionbtn,
        scaleX: this.game.contentScale,
        scaleY: this.game.contentScale,
        ease: "Back.out",
        duration: 200,
        delay: 50 * i,
      });
    }
  }
  async gameLevelClickHandler(section) {
    // console.log(section);
    await delayTime(1000);
    this.scene.start("Levels", { section: section });
  }
}
