import { delayTime } from "../utils";
import AudioManager from "../utils/audio_manager";
import Box from "../gameobjects/Box";
import BaseScene from "./basescene";
import axios from "axios";
import { Threeletter } from "../gameobjects/Threeletter";
import { Fourletter } from "../gameobjects/Fourletter";
import ParticleBox from "../gameobjects/ParticleBox";
import Particle from "../gameobjects/Particle";
import CountDown from "../gameobjects/CountDown"


export default class GameScene extends BaseScene {
  constructor() {
    super("Game");
    this.gameLevel = 0;
    this.score = 0;
  }
  init(data) {
    this.gameLevel = data.gameLevel;
    this.section = data.section;
    this.score = data.Score;
  }
  getCharcter() {
    let ran = parseInt(Math.random() * 10);
    let str = "";
    if (ran < 1) {
      var ran2 = parseInt(Math.random() * this.Pairs.length);
      str = this.Pairs[ran2];
    } else if (ran < 5) {
      var ran2 = parseInt(Math.random() * Threeletter.length);
      str = Threeletter[ran2];
    } else {
      var ran2 = parseInt(Math.random() * Fourletter.length);
      str = Fourletter[ran2];
    }
    return str;
  }
  async create() {
    this.oData = this.cache.json.get("gameConfig");
    this.grammerWords = this.cache.json.get("grammerwords");
    this.fourLetterData = this.cache.json.get("fourLetter");
    this.threeLetterData = this.cache.json.get("threeLetter");
    this.gridContainer = this.add.container();
    // this.topContainer = this.add.container();
    // this.lowerContainer = this.add.container();
    // this.contentContainer.add(this.topContainer);
    // this.contentContainer.add(this.lowerContainer);
    this.particleContainer = this.add.container();
    this.vowels = ["A", "E", "I", "O", "U"];
    this.initialTime = 3000;
    this.loaderTime = 0;
    this.numberOfCorrectAnswer = {
      consonants: [],
      vowels: [],
      nouns: [],
      verbs: [],
    };
    this.Pairs = [
      "AU",
      "AB",
      "AC",
      "AD",
      "AG",
      "AL",
      "AM",
      "AN",
      "AP",
      "AR",
      "AS",
      "AT",
      "AV",
      "AW",
      "AX",
      "AY",
      "EA",
      "EE",
      "EI",
      "EO",
      "ED",
      "EL",
      "EM",
      "EN",
      "ER",
      "ES",
      "ET",
      "EW",
      "EX",
      "EY",
      "IE",
      "ID",
      "IG",
      "IL",
      "IM",
      "IN",
      "IP",
      "IR",
      "IS",
      "IT",
      "IV",
      "IW",
      "OA",
      "OE",
      "OO",
      "OU",
      "OB",
      "OD",
      "OG",
      "OL",
      "OM",
      "ON",
      "OP",
      "OR",
      "OS",
      "OT",
      "OV",
      "OW",
      "UB",
      "UD",
      "UG",
      "UL",
      "UM",
      "UN",
      "UR",
      "US",
      "BA",
      "BE",
      "BI",
      "BO",
      "BU",
      "BL",
      "BR",
      "BY",
      "CA",
      "CE",
      "CO",
      "CU",
      "CH",
      "CL",
      "CR",
      "CT",
      "CY",
      "DA",
      "DE",
      "DI",
      "DO",
      "DU",
      "DH",
      "DL",
      "DR",
      "DW",
      "DY",
      "DZ",
      "FA",
      "FI",
      "FT",
      "FO",
      "FL",
      "FR",
      "GA",
      "GE",
      "GI",
      "GO",
      "GU",
      "GH",
      "GL",
      "GR",
      "HA",
      "HE",
      "HI",
      "HO",
      "HU",
      "JA",
      "JE",
      "JU",
      "KI",
      "KR",
      "LA",
      "LE",
      "LI",
      "LO",
      "LU",
      "LD",
      "LL",
      "LN",
      "LT",
      "LY",
      "MA",
      "ME",
      "MI",
      "MO",
      "MU",
      "NA",
      "NE",
      "NI",
      "NO",
      "NU",
      "NT",
      "NY",
      "PA",
      "PE",
      "PI",
      "PO",
      "PU",
      "PH",
      "PL",
      "PR",
      "PY",
      "QU",
      "RA",
      "RE",
      "RI",
      "RO",
      "RU",
      "RC",
      "RD",
      "RG",
      "RK",
      "RM",
      "RN",
      "RP",
      "RT",
      "RY",
      "SA",
      "SE",
      "SI",
      "SO",
      "SU",
      "SC",
      "SH",
      "SK",
      "SL",
      "SM",
      "SN",
      "SP",
      "SR",
      "SS",
      "ST",
      "SW",
      "TA",
      "TE",
      "TI",
      "TO",
      "TU",
      "TH",
      "TL",
      "TR",
      "TY",
      "VA",
      "VE",
      "VI",
      "WA",
      "WE",
      "WI",
      "WO",
      "WU",
      "WH",
      "WL",
      "WN",
      "WR",
      "XE",
      "YA",
      "YE",
      "ZI",
      "ZO",
    ];
    this.consonants = [
      "B",
      "C",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    this.boxes = [];
    this.tempTime = 0;
    // console.log(this.game.refWidth/2,60 * this.game.DPR);
    this.gridContainer.x = 60 * this.game.DPR;
    this.gridContainer.y = 400 * this.game.DPR;
    this.contentContainer.add(this.gridContainer);
    this.isGameRunning = true;
    AudioManager.playBgSound("background_music");

    this.boxSize = 72 * this.game.DPR;
    this.noOfBoxes = 8;
    this.first = null;
    this.current = null;
    this.direction = null;
    this.canPlay = true;
    const HORIZONTAL = 4;
    const VERTICAL = 5;
    const DIAGNOL = 6;
    const DIAGNOLREVERSE = 7;
    this.reverse = false;
    let con = false;
    // console.log(this.section,(this.gameLevel - 1),this.oData.levels[this.section]);
    this.background = this.add.image(0, 0, "gamebg");
    this.background.setOrigin(0.5, 0.5);
    this.bgContainer.add(this.background);

    this.paneltop = this.add.container();
    this.contentContainer.add(this.paneltop);
    this.paneltopBG = this.add.image(0, 0, "paneltop");
    this.paneltopBG.setOrigin(0.5, 0.5);
    this.paneltop.add(this.paneltopBG);
    this.paneltop.setScale(this.game.contentScale);
    this.paneltop.x = this.game.refWidth / 2;
    this.paneltop.y = -this.paneltopBG.height / 2;

    this.panelbottom = this.add.container();
    this.contentContainer.add(this.panelbottom);
    this.panelbottomBG = this.add.image(0, 0, "panelbottom");
    this.panelbottomBG.setOrigin(0.5, 0.5);
    this.panelbottom.add(this.panelbottomBG);
    this.panelbottom.setScale(this.game.contentScale);
    this.panelbottom.x =
      this.game.refWidth / 2;
    this.panelbottom.y =
      this.game.refHeight +
      (this.panelbottomBG.height * this.game.contentScale) / 2;

    let xValue = 0;
    let yValue = 0;
    let gap = 15;
    this.wordHolders = [];
    for (let i = 1; i <= 9; i++) {
      let CAbg = this.add.image(0, 0, "wordHolder");
      CAbg.setOrigin(0.5, 0.5);
      // console.log(xValue,CAbg.displayWidth);
      CAbg.x = (CAbg.width + gap) * (xValue - 1);
      CAbg.y = (CAbg.height + gap) * (yValue - 1);
      this.wordHolders.push(CAbg);
      this.panelbottom.add(CAbg);

      if (i % 3 === 0) {
        xValue = 0;
        yValue++;
      } else {
        xValue++;
      }
    }

    this.sitelogo = this.add.image(0, 0, "sitelogo");
    this.sitelogo.setOrigin(0.5, 0.5).setScale(this.game.contentScale * 0.3);
    this.sitelogo.x = (10 + (this.sitelogo.width * 0.3) / 2) * this.game.contentScale;
    this.sitelogo.y = (10 + (this.sitelogo.height * 0.3) / 2) * this.game.contentScale;
    this.contentContainer.add(this.sitelogo);

    this.levelholder = this.add.container();
    this.contentContainer.add(this.levelholder);
    this.levelbg = this.add.image(0, 0, "levelholder");
    this.levelbg.setOrigin(0.5, 0.5);
    this.levelholder.add(this.levelbg);
    this.levelholder.setScale(this.game.contentScale);
    this.levelholder.x = this.sitelogo.x + ((this.sitelogo.width + 40) / 2) * this.game.contentScale
    this.levelholder.y = (this.levelbg.height / 2 + 25) * this.game.contentScale
    this.gameLevelText = this.add
      .text(0, -5, "Level: " + this.gameLevel, {
        font: "40px Junegull",
        fill: "#FFFFFF",
        align: "center", strokeThickness: 1
      })
      .setOrigin(0.5);
    this.levelholder.add(this.gameLevelText);


    let levelTitle =
      this.oData.levels[this.section]["level" + this.gameLevel].question;
    this.leaderboardId =
      this.oData.levels[this.section]["level" + this.gameLevel].lb_id;
    this.levelText = this.add
      .text(0, 0, levelTitle, {
        font: "48px Junegull",
        fill: "#5ec6b7",
        align: "center",
      })
      .setOrigin(0.5);
    this.paneltop.add(this.levelText);
    this.levelText.y = -this.levelText.height / 2;


    this.pausebg = this.add.image(0, 0, "pausebg");
    this.pausebg.setOrigin(0.5, 0.5).setScale(this.game.contentScale * 1.2);
    this.pausebg.setInteractive({ useHandCursor: true, pixelPerfectOver: true });
    this.pausebg.pause = false;
    this.pausebg.on("pointerdown", this.handlePauseClick.bind(this, this.pausebg));
    this.contentContainer.add(this.pausebg);
    this.pausebg.x = this.game.refWidth - ((this.pausebg.width * 1.2) / 2 + 10) * this.game.contentScale
    this.pausebg.y = (10 + (this.pausebg.height * 1.2) / 2) * this.game.contentScale

    this.resetbtn = this.add.image(0, 0, "resetbtn");
    this.resetbtn.setOrigin(0.5, 0.5).setScale(1.2);
    this.resetbtn.setInteractive({ useHandCursor: true, pixelPerfectOver: true });
    this.resetbtn.on("pointerdown", this.handleResetClick.bind(this, this.resetbtn));
    this.paneltop.add(this.resetbtn);
    this.resetbtn.x = this.paneltopBG.width / 2 - this.resetbtn.width / 2 - 10;
    this.resetbtn.y = -this.paneltopBG.height / 2 + this.resetbtn.height / 2 + 15;


    this.scoreholder = this.add.container();
    this.contentContainer.add(this.scoreholder);
    this.scorebg = this.add.image(0, 0, "scorebg");
    this.scorebg.setOrigin(0.5, 0.5);
    this.scoreholder.add(this.scorebg);
    this.scoreBuffer = 0;
    this.scoreText = this.add
      .text(
        0,
        5,
        this.score,
        {
          font: "40px Junegull",
          fill: "#FFFFFF", strokeThickness: 1
        }
      )
      .setOrigin(0.5);
    this.scoreholder.add(this.scoreText);
    this.scoreholder.setScale(this.game.contentScale);
    this.scoreholder.x = this.levelholder.x + (this.levelbg.width / 2 + 30 + this.scorebg.width / 2) * this.game.contentScale;
    this.scoreholder.y = this.levelholder.y - 5;

    this.timerbg = this.add.image(0, this.paneltopBG.height / 2 - 30, "timerbg");
    this.timerbg.setOrigin(0.5, 0.5);
    this.paneltop.add(this.timerbg);
    this.timerlaoder = this.add.image(0, this.paneltopBG.height / 2 - 30, "timer");
    this.timerlaoder.setOrigin(0.5, 0.5);
    // this.timerlaoder.scaleX=0.5;
    this.paneltop.add(this.timerlaoder);
    this.progressBar = this.add.graphics();
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    this.paneltop.add(this.progressBar)

    this.centerpanel = this.add.container();
    this.contentContainer.add(this.centerpanel);
    this.centerpanelBG = this.add.image(0, 0, "centerpanel");
    this.centerpanelBG.setOrigin(0, 0);
    this.centerpanelBG.setScale(0.90);
    this.centerpanel.add(this.centerpanelBG);
    this.contentContainer.sendToBack(this.centerpanel);
    this.centerpanel.x = this.game.refWidth / 2 - this.centerpanelBG.width * this.game.contentScale * this.centerpanelBG.scale / 2
    this.centerpanel.y = this.game.refHeight / 2 + 10 - this.centerpanelBG.height * this.game.contentScale * this.centerpanelBG.scale / 2
    this.centerpanel.setScale(this.game.contentScale)






    // // this.scoreText = this.add.tween(this.scoreText.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
    // this.timedEvent = this.time.addEvent({
    //   delay: 60 * 1000,
    //   callback: this.levelGameOver,
    //   callbackScope: this,
    //   loop: false,
    // });
    this.resetBoxes();
    this.isGameRunning = false;

    let countDown = new CountDown(this, 1);
    this.contentContainer.add(countDown);
    countDown.setScale(this.game.contentScale * 0.90);
    countDown.x = this.game.refWidth / 2 - this.centerpanelBG.width * this.game.contentScale * this.centerpanelBG.scale / 2
    countDown.y = this.game.refHeight / 2 + 10 - this.centerpanelBG.height * this.game.contentScale * this.centerpanelBG.scale / 2



    this.tweens.add({
      targets: this.paneltop,
      y: ((this.paneltopBG.height) / 2 + 120) * this.game.contentScale,
      ease: "Back.out",
      duration: 250,
      // onComplete: this.showScoresResults  // set context? how?
    });
    this.tweens.add({
      targets: this.panelbottom,
      y:
        this.game.refHeight -
        ((this.panelbottomBG.height) / 2 + 20) * this.game.contentScale,
      ease: "Back.out",
      duration: 250,
    });

    this.input.on("pointermove", (pointer, x, y, event) => {
      if (this.isGameRunning) {
        for (var i = 0; i < this.boxes.length; i++) {
          for (var j = 0; j < this.boxes[i].length; j++) {
            let x1 = this.centerpanel.x + this.boxes[i][j].x * this.game.contentScale;
            let x2 =
              this.centerpanel.x + (this.boxes[i][j].x + this.boxes[i][j].body.width) * this.game.contentScale;
            let y1 = this.centerpanel.y + this.boxes[i][j].y * this.game.contentScale;
            let y2 =
              this.centerpanel.y + (this.boxes[i][j].y + this.boxes[i][j].body.width) * this.game.contentScale;

            if (
              x1 <= pointer.position.x &&
              x2 >= pointer.position.x &&
              y1 <= pointer.position.y &&
              y2 >= pointer.position.y
            ) {
              this.current = [i, j];
              break;
            }
          }
        }
        if (this.first && this.current && this.direction == null) {
          // console.log(
          //   this.current[1] - this.first[1] == this.current[0] - this.first[0]
          // );
          if (
            this.first[0] == this.current[0] &&
            this.first[1] == this.current[1]
          ) {
          } else {
            if (this.first[0] == this.current[0]) {
              this.direction = HORIZONTAL;
            } else if (this.first[1] == this.current[1]) {
              this.direction = VERTICAL;
            } else if (
              this.current[1] - this.first[1] ==
              this.current[0] - this.first[0]
            ) {
              this.direction = DIAGNOL;
            }
            else if (
              this.current[1] - this.first[1] ==
              -(this.current[0] - this.first[0])
            ) {
              this.direction = DIAGNOLREVERSE;
            }
          }
        }
        if (this.direction) {
          for (var i = 0; i < this.noOfBoxes; i++) {
            for (var j = 0; j < this.noOfBoxes; j++) {
              this.boxes[i][j].setUp();
            }
          }
          for (var i = 0; i < this.boxes.length; i++) {
            for (var j = 0; j < this.boxes[i].length; j++) {
              if (this.direction == HORIZONTAL) {
                if (this.first[0] == i) {
                  if (this.first[1] < this.current[1]) {
                    if (j >= this.first[1] && j <= this.current[1]) {
                      this.boxes[i][j].setDown();
                    }
                  } else if (this.first[1] > this.current[1]) {
                    if (j <= this.first[1] && j >= this.current[1]) {
                      this.boxes[i][j].setDown();
                    }
                  }
                }
              } else if (this.direction == VERTICAL) {
                if (this.first[1] == j) {
                  if (this.first[0] < this.current[0]) {
                    if (i >= this.first[0] && i <= this.current[0]) {
                      this.boxes[i][j].setDown();
                    }
                  } else if (this.first[0] > this.current[0]) {
                    if (i <= this.first[0] && i >= this.current[0]) {
                      this.boxes[i][j].setDown();
                    }
                  }
                }
              } else if (this.direction == DIAGNOL) {
                if (
                  this.first[1] - j == this.first[0] - i
                ) {
                  if (this.first[0] < this.current[0]) {
                    if (i >= this.first[0] && i <= this.current[0]) {
                      this.boxes[i][j].setDown();
                    }
                  } else if (this.first[0] > this.current[0]) {
                    if (i <= this.first[0] && i >= this.current[0]) {
                      this.boxes[i][j].setDown();
                    }
                  }
                }
              }
              else if (this.direction == DIAGNOLREVERSE) {
                if (
                  this.first[1] - j == -(this.first[0] - i)
                ) {
                  if (this.first[0] < this.current[0]) {
                    if (i >= this.first[0] && i <= this.current[0]) {
                      this.boxes[i][j].setDown();
                    }
                  } else if (this.first[0] > this.current[0]) {
                    if (i <= this.first[0] && i >= this.current[0]) {
                      this.boxes[i][j].setDown();
                    }
                  }
                }
              }
            }
          }
        }
      }

    });
    this.input.on("pointerdown", (pointer, x, y, event) => {
      if (this.isGameRunning) {
        for (var i = 0; i < this.boxes.length; i++) {
          for (var j = 0; j < this.boxes[i].length; j++) {
            let x1 = this.centerpanel.x + this.boxes[i][j].x * this.game.contentScale;
            let x2 =
              this.centerpanel.x + (this.boxes[i][j].x + this.boxes[i][j].body.width) * this.game.contentScale;
            let y1 = this.centerpanel.y + this.boxes[i][j].y * this.game.contentScale;
            let y2 =
              this.centerpanel.y + (this.boxes[i][j].y + this.boxes[i][j].body.width) * this.game.contentScale;

            if (
              x1 <= pointer.position.x &&
              x2 >= pointer.position.x &&
              y1 <= pointer.position.y &&
              y2 >= pointer.position.y
            ) {
              this.first = [i, j];
              this.boxes[i][j].setDown();
              break;
            }
          }
        }
      }

    });
    this.input.on("pointerup", (pointer, gameObject) => {

      // console.log(this.first);
      if (this.first != null && this.current != null) {
        if (this.current[0] < this.first[0] && this.direction == VERTICAL) {
          this.reverse = true;
        } else if (this.current[1] < this.first[1] && this.direction == HORIZONTAL) {
          this.reverse = true;
        } else if (this.current[1] < this.first[1] && this.direction == DIAGNOL) {
          this.reverse = true;
        } else if (this.current[0] < this.first[0] && this.direction == DIAGNOLREVERSE) {
          this.reverse = true;
        } else {
          this.reverse = false;
        }
      }
      this.checkCorrectNess();
    });
    this.partileBoxes = [];
    for (var i = 0; i < 8; i++) {
      let particleBox = new ParticleBox(this, this.boxSize);
      this.centerpanel.add(particleBox);
      this.partileBoxes.push(particleBox);
    }
    this.createParticleEffect();
    AudioManager.playSound("countdown1")
    await delayTime(1000);
    AudioManager.playSound("countdown1")
    countDown.changeFrame(2);
    await delayTime(1000);
    AudioManager.playSound("countdown1")
    countDown.changeFrame(3);
    await delayTime(1000);
    AudioManager.playSound("go")
    countDown.changeFrame(4);
    await delayTime(1000);
    countDown.hide();
    countDown.changeFrame(1)
    this.isGameRunning = true;

  }
  resetBoxes() {
    let boxIndex = 1;
    this.gap = 10;
    for (var i = 0; i < this.noOfBoxes; i++) {
      this.boxes.push([]);
      for (var j = 0; j < this.noOfBoxes; j++) {
        var ran = parseInt(Math.random() * this.Pairs.length);
        let str = this.Pairs[ran];
        let box = new Box(this, str.charAt(0), i, j, this.boxSize, boxIndex, this.gameLevel);
        box.x = (j * this.gap + j * box.body.width * 0.85) - this.gap * this.game.contentScale + 45;
        box.y = (i * this.gap + i * box.body.width * 0.85) - this.gap * this.game.contentScale + 45;
        box.setScale(0.85)
        this.boxes[i].push(box);
        this.centerpanel.add(box);
      }
      if (boxIndex == 5) {
        boxIndex = 1;
      } else {
        boxIndex++;
      }
    }
    let ccount = 0;
    let str = "";
    str = this.getCharcter();
    for (var i = 0; i < this.noOfBoxes; i++) {
      for (var j = 0; j < this.noOfBoxes; j++) {
        if (ccount >= str.length) {
          ccount = 0;
          str = this.getCharcter();
        }
        this.boxes[i][j].setLetter(str.charAt(ccount));
        ccount++;
      }
    }
  }
  async handleResetClick(e) {
    console.log("reset");

    this.pausebg.pause = true;
    this.pausebg.disableInteractive();
    let boxIndex = 1;
    for (let i = 0; i < this.boxes.length; i++) {
      let previousBoxs = this.boxes[i];
      for (let j = 0; j < previousBoxs.length; j++) {
        const eachBox = previousBoxs[j];
        eachBox.destroy();
      }

    }
    this.boxes = [];
    this.resetBoxes();

    for (var i = 0; i < this.partileBoxes.length; i++) {
      this.centerpanel.bringToTop(this.partileBoxes[i]);
    }

    this.pausebg.pause = false;
    this.pausebg.setInteractive({ useHandCursor: true });
  }
  async handlePauseClick(e) {
    // console.log("puse",e);
    this.pausebg.pause = true;
    this.isGameRunning = false;
    this.pausebg.disableInteractive();
    this.backpanel = this.add.image(
      this.game.refWidth / 2,
      this.game.refHeight / 2,
      "overlay"
    );
    this.backpanel.setOrigin(0.5, 0.5).setScale(1.5 * this.game.contentScale);
    this.contentContainer.add(this.backpanel);
    // console.log(this.game.contentScale);
    this.gamepaused = this.add.image(
      this.game.refWidth / 2,
      this.game.refHeight / 2,
      "gamepaused"
    );
    this.gamepaused.setOrigin(0.5, 0.5).setScale(0.9 * this.game.contentScale);
    this.contentContainer.add(this.gamepaused);
    this.playbtn = this.add.image(
      this.game.refWidth / 2 - 150 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "playbg"
    );
    this.playbtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.playbtn);
    this.playbtn.setInteractive({ useHandCursor: true });
    this.playbtn.setScale(this.game.contentScale);
    this.playbtn.on("pointerdown", (e) => {
      this.pausebg.pause = false;
      this.isGameRunning = true;
      this.pausebg.setInteractive({ useHandCursor: true });
      this.contentContainer.sendToBack(this.centerpanel);
      this.gamepaused.destroy();
      this.levelsbtn.destroy();
      this.homebtn.destroy();
      this.backpanel.destroy();
      this.playbtn.destroy();
    });
    this.homebtn = this.add.image(
      this.game.refWidth / 2 + 5 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "homebtn"
    );
    this.homebtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.homebtn);
    this.homebtn.setInteractive({ useHandCursor: true });
    this.homebtn.setScale(this.game.contentScale);
    this.homebtn.on("pointerdown", (e) => {
      this.scene.start("Intro");
    });
    this.levelsbtn = this.add.image(
      this.game.refWidth / 2 + 160 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "levels"
    );
    this.levelsbtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.levelsbtn);
    this.levelsbtn.setInteractive({ useHandCursor: true });
    this.levelsbtn.setScale(this.game.contentScale);
    this.levelsbtn.on("pointerdown", (e) => {
      this.scene.start("Levels", { levelopen: this.gameLevel, section: this.section });
    });
  }

  async levelCompletePopup(e) {
    // console.log("puse",e);
    this.pausebg.pause = true;
    this.isGameRunning = false;
    this.pausebg.disableInteractive();
    this.backpanel = this.add.image(
      this.game.refWidth / 2,
      this.game.refHeight / 2,
      "overlay"
    );
    this.backpanel.setOrigin(0.5, 0.5).setScale(1.5 * this.game.contentScale);
    this.contentContainer.add(this.backpanel);
    // console.log(this.game.contentScale);
    // this.scorebg = this.add.image(this.game.refWidth / 2, this.game.refHeight / 2-500*0.5*this.game.contentScale, "scorebg");
    // this.scorebg.setOrigin(0.5,0.5).setScale(2.5*0.5*this.game.contentScale);
    // this.contentContainer.add(this.scorebg);


    this.levelComplete = this.add.image(
      this.game.refWidth / 2,
      this.game.refHeight / 2,
      "levelcompleted"
    );
    this.levelComplete.setOrigin(0.5, 0.5).setScale(1.2 * this.game.contentScale);
    this.contentContainer.add(this.levelComplete);
    this.homebtn = this.add.image(

      0,
      0,
      "leaderboardbtn"
    ).setScale(1.2 * this.game.contentScale);
    this.homebtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.homebtn);
    this.homebtn.x = this.game.refWidth / 2 - 150 * this.game.contentScale;
    this.homebtn.y = this.levelComplete.y + (this.levelComplete.height / 2) * this.levelComplete.scale - this.homebtn.height / 2 * this.homebtn.scale - 10 * this.game.contentScale;
    this.homebtn.setInteractive({ useHandCursor: true });
    this.homebtn.on("pointerdown", (e) => {
      console.log("-----------------pointerdown-")
      if (window.cordova && cordova.plugins.playGamesServices) {
        console.log("-----------------playGamesServices-")
        cordova.plugins.playGamesServices.isSignedIn((result) => {
          console.log("----------isSignedIn--")
          cordova.plugins.playGamesServices.showLeaderboard( {
            leaderboardId: this.leaderboardId
        }, () => {
            console.log("----------showLeaderboard--")
            // On success
          }, () => {
            // On error
          });
        }, () => {
          // On error: Auth check could not be done
        });
      } else {
        // this.scene.start("Intro");
      }

    });


    this.levelsbtn = this.add.image(
      0,
      0,

      "levels"
    ).setScale(1.2 * this.game.contentScale);
    this.levelsbtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.levelsbtn);
    this.levelsbtn.x = this.game.refWidth / 2 + 5 * this.game.contentScale;
    this.levelsbtn.y = this.levelComplete.y + (this.levelComplete.height / 2) * this.levelComplete.scale - this.levelsbtn.height / 2 * this.levelsbtn.scale - 10 * this.game.contentScale;
    this.levelsbtn.setInteractive({ useHandCursor: true });
    this.levelsbtn.on("pointerdown", (e) => {
      this.scene.start("Levels", { levelopen: this.gameLevel + 1, section: this.section });
    });
    

    this.next_level = this.add.image(
      this.game.refWidth / 2 + 160 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "next_level"
    ).setScale(1.2 * this.game.contentScale);
    this.next_level.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.next_level);
    this.next_level.x = this.game.refWidth / 2 + 160 * this.game.contentScale;
    this.next_level.y = this.levelComplete.y + (this.levelComplete.height / 2) * this.levelComplete.scale - this.next_level.height / 2 * this.next_level.scale - 10 * this.game.contentScale;
    this.next_level.setInteractive({ useHandCursor: true });
    this.next_level.on("pointerdown", async (e) => {
      // await delayTime(1000);
      this.score = 0;
      console.log(this.oData.levels[this.section].nofolevels,(this.gameLevel + 1))
      if(this.oData.levels[this.section].nofolevels>=(this.gameLevel + 1)){
        if ((this.gameLevel + 1) % 3 == 0) {
          this.scene.start("GameBonusLevel", { gameLevel: (this.gameLevel + 1), section: this.section, Score: 0 });
        } else {
          this.scene.start("Game", { gameLevel: (this.gameLevel + 1), section: this.section, Score: 0 });
        }
      }
      else{
        if(this.oData.levels[this.section].next){
          if ((this.gameLevel + 1) % 3 == 0) {
            this.scene.start("GameBonusLevel", { gameLevel: 1, section: this.oData.levels[this.section].next, Score: 0 });
          } else {
            this.scene.start("Game", { gameLevel: 1, section: this.oData.levels[this.section].next, Score: 0 });
          }
        }
        else{
          this.scene.start("Levels", { levelopen: this.gameLevel, section: this.section });
        }
      }
      
    });
    if (BaseScene.localData[this.section].scores[this.gameLevel]) {
      if (BaseScene.localData[this.section].scores[this.gameLevel] < this.score) {
        BaseScene.localData[this.section].scores[this.gameLevel] = this.score;
      }
    }
    else {
      BaseScene.localData[this.section].scores[this.gameLevel] = this.score;
    }
    if (BaseScene.localData[this.section].opened < this.gameLevel + 1) {
      BaseScene.localData[this.section].opened = this.gameLevel + 1
    }
    if (window.cordova && cordova.plugins.playGamesServices && this.leaderboardId) {
      console.log("submitting")
      cordova.plugins.playGamesServices.isSignedIn((result) => {
        console.log("submitting 1")
        if (result.isSignedIn) {
          var data = {
            leaderboardId: this.leaderboardId
          };
          console.log("submitting 2")
          cordova.plugins.playGamesServices.getPlayerScore(data, (result) => {
            console.log("submitting 3")
            if (result.playerScore) {
              console.log("submitting 4")
              if (BaseScene.localData[this.section].scores[this.gameLevel] > result.playerScore) {
                console.log("submitting 5")
                var data = {
                  score: BaseScene.localData[this.section].scores[this.gameLevel],
                  leaderboardId: this.leaderboardId
                };
                cordova.plugins.playGamesServices.submitScoreNow(data, (result) => {

                  console.log("Is this your best score: " + result.newBest);
                }, () => {
                  // On error
                  console.log("submitting 6")
                });
              }
              else {
                console.log("submitting 7")
                BaseScene.localData[this.section].scores[this.gameLevel] = result.playerScore;
                if (this.bscoreCard) {
                  this.bscoreCard.setText("Your best: " + BaseScene.localData[this.section].scores[this.gameLevel])
                }
              }
            }
          }, (e) => {
            // On error
            console.log("submitting 8",e,BaseScene.localData[this.section].scores[this.gameLevel])
            var data = {
              score: BaseScene.localData[this.section].scores[this.gameLevel],
              leaderboardId: this.leaderboardId
            };
            cordova.plugins.playGamesServices.submitScoreNow(data, (result) => {

              console.log("Is this your best score: " + result.newBest);
            }, (e) => {
              // On error
              console.log("submitting 10",e)
            });
            if (this.bscoreCard) {
              this.bscoreCard.setText("Your best: " + BaseScene.localData[this.section].scores[this.gameLevel])
            }
          });
        }

      }, () => {
        // On error: Auth check could not be done
        console.log("submitting 9")
      });


    }
    let sscore = 0;
    console.log(BaseScene.localData[this.section].scores)
    for (var key in BaseScene.localData[this.section].scores) {
      if (BaseScene.localData[this.section].scores.hasOwnProperty(key)) {
        console.log(BaseScene.localData[this.section].scores[key])
        sscore += BaseScene.localData[this.section].scores[key]
      }
    }
    BaseScene.localData[this.section].sectionscore = sscore;
    BaseScene.localData.tscore = BaseScene.localData.consonants.sectionscore + BaseScene.localData.vowels.sectionscore + BaseScene.localData.nouns.sectionscore + BaseScene.localData.verbs.sectionscore;
    window.localStorage.setItem("tdxgrammerbox", JSON.stringify(BaseScene.localData))
    this.scoreCard = this.add
      .text(0, 0, "Your score: " + this.score, {
        font: 96 * 0.5 * this.game.contentScale + "px Junegull",
        fill: "#FFFFFF",
        align: "center",
      })
      .setOrigin(0.5);
    this.scoreCard.x = this.game.refWidth / 2;
    this.scoreCard.y = this.levelComplete.y - (this.levelComplete.height / 2) * this.levelComplete.scale + 150 * this.game.contentScale;
    this.contentContainer.add(this.scoreCard);
    this.bscoreCard = this.add
      .text(0, 0, "Your best: " + BaseScene.localData[this.section].scores[this.gameLevel], {
        font: 96 * 0.5 * this.game.contentScale + "px Junegull",
        fill: "#FFFFFF",
        align: "center",
      })
      .setOrigin(0.5);
    this.bscoreCard.x = this.game.refWidth / 2;
    this.bscoreCard.y = this.levelComplete.y - (this.levelComplete.height / 2) * this.levelComplete.scale + 250 * this.game.contentScale;
    this.contentContainer.add(this.bscoreCard);
    AudioManager.playSound("complete")



  }

  async levelGameOver(e) {
    // // console.log("puse",e);
    this.pausebg.pause = true;
    this.pausebg.disableInteractive();
    this.backpanel = this.add.image(
      this.game.refWidth / 2,
      this.game.refHeight / 2,
      "overlay"
    );
    this.backpanel.setOrigin(0.5, 0.5).setScale(1.5 * this.game.contentScale);
    this.contentContainer.add(this.backpanel);
    // console.log(this.game.contentScale);
    // this.scorebg = this.add.image(this.game.refWidth / 2, this.game.refHeight / 2 - 500 * 0.5 * this.game.contentScale, "scorebg");
    // this.scorebg.setOrigin(0.5, 0.5).setScale(2.5 * 0.5 * this.game.contentScale);
    // this.contentContainer.add(this.scorebg);
    // this.scoreCard = this.add
    //   .text(0, 0, this.score, {
    //     font: 96 * 0.5 * this.game.contentScale + "px Junegull",
    //     fill: "#FFFFFF",
    //     align: "center",
    //   })
    //   .setOrigin(0.5);
    // this.scoreCard.x = this.game.refWidth / 2;
    // this.scoreCard.y = this.game.refHeight / 2 - 470 * 0.5 * this.game.contentScale;
    // this.contentContainer.add(this.scoreCard);
    this.gameover = this.add.image(
      this.game.refWidth / 2,
      this.game.refHeight / 2,
      "gameover"
    );
    this.gameover.setOrigin(0.5, 0.5).setScale(this.game.contentScale);
    this.contentContainer.add(this.gameover);

    this.homebtn = this.add.image(

      this.game.refWidth / 2 - 150 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "homebtn"
    );
    this.homebtn.setOrigin(0.5, 0.5).setScale(this.game.contentScale);
    this.contentContainer.add(this.homebtn);
    this.homebtn.setInteractive({ useHandCursor: true });
    this.homebtn.on("pointerdown", (e) => {
      this.scene.start("Intro");
    });

    this.levelsbtn = this.add.image(

      this.game.refWidth / 2 + 5 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "levels"
    );
    this.levelsbtn.setOrigin(0.5, 0.5).setScale(this.game.contentScale);
    this.contentContainer.add(this.levelsbtn);
    this.levelsbtn.setInteractive({ useHandCursor: true });
    this.levelsbtn.on("pointerdown", (e) => {

      this.scene.start("Levels", { levelopen: this.gameLevel, section: this.section });
    });

    this.play_again = this.add.image(
      this.game.refWidth / 2 + 160 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "play_again"
    );
    this.play_again.setOrigin(0.5, 0.5).setScale(this.game.contentScale);
    this.contentContainer.add(this.play_again);
    this.play_again.setInteractive({ useHandCursor: true });
    this.play_again.on("pointerdown", async (e) => {
      await delayTime(1000);
      this.score = 0;
      if (this.gameLevel % 3 == 0) {
        this.scene.start("GameBonusLevel", { gameLevel: this.gameLevel, section: this.section, Score: 0 });
      } else {
        this.scene.start("Game", { gameLevel: this.gameLevel, section: this.section, Score: 0 });
      }
    });
    AudioManager.playSound("fail")


  }
  incrementScore() {
    var me = this;

    me.scoreText.text = me.scoreBuffer;
  }
  async update() {
    if (this.scoreText) {
      if (!this.pausebg.pause && this.isGameRunning) {
        if (this.loaderTime >= this.initialTime) {
          this.isGameRunning = false;
          this.levelGameOver()
        }
        else {
          this.loaderTime += 1;
        }
        // this.formatTime(this.initialTime - 60 * this.timedEvent.getProgress());
      }

      if (this.scoreBuffer < this.score) {
        this.scoreBuffer += 10;
        if (this.scoreBuffer > this.score) {
          this.scoreBuffer = this.score;
        }
        this.incrementScore();

        // console.log(this.scoreBuffer);
      }

      if (this.tempTime != this.timerCount) {
        let percent = this.loaderTime / this.initialTime
        let value = percent * this.timerlaoder.width;
        // this.tempTime = this.timerCount;
        // let value = this.loaderTime + 22.25*this.game.contentScale;
        // this.loaderTime = value;
        // console.log(this.loaderTime);
        if (parseInt(value) > 0) {
          this.progressBar.clear();
          this.progressBar.fillStyle(0xffffff, 1);
          this.progressBar.fillRoundedRect(this.timerlaoder.width / 2,
            this.timerlaoder.y - this.timerlaoder.height / 2,
            -value,
            this.timerlaoder.height,
            { tl: 0, tr: this.timerlaoder.height * (1 / 3), bl: 0, br: this.timerlaoder.height * (1 / 3) }
          );
        }
      }
    }
    this.partileBoxes.map(particleBox => particleBox.update());
    if (this.particle) {
      this.particle.map((particle) => particle.update());
    }
  }
  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = Math.floor(seconds % 60);
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, "0");
    // Returns formated time
    this.timerCount = partInSeconds;

    return `${minutes}:${partInSeconds}`;
  }
  async endGame() {
    // console.log("Game Over. Score: " + this.score);
    // this.answers.map(answer=>answer.timedOut=true);
    this.scene.start("Rewards", {
      Score: this.score,
      gameLevel: this.gameLevel,
      section: this.section,
    });
  }
  async checkByLevel(data) {
    // console.log(data)
    if (data.word != "") {
      let nonSubject = true;
      let noOfCA = this.numberOfCorrectAnswer[this.section].length;
      for (var i = 0; i < this.selected.length; i++) {
        this.selected[i].showCorrect();
      }
      let wordLength = data.word.length;
      if (this.section == "consonants") {
        // console.log(this.section);
        let firstLetter = data.word.charAt(0).toUpperCase();
        let lastLetter = data.word.slice(-1).toUpperCase();
        if (this.gameLevel == 1) {
          this.numberOfCorrectAnswer.consonants.push(
            data.word
          );
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (
          this.consonants.indexOf(firstLetter) > -1 &&
          this.gameLevel == 2
        ) {
          this.numberOfCorrectAnswer.consonants.push(
            data.word
          );
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (
          this.consonants.indexOf(lastLetter) > -1 &&
          this.gameLevel == 4
        ) {
          this.numberOfCorrectAnswer.consonants.push(
            data.word
          );
          // this.scoreBuffer = wordLength * 100;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (
          this.gameLevel == 5 ||
          this.gameLevel == 7 ||
          this.gameLevel == 13
        ) {
          let letterCount = 0;
          for (let i = 0; i < this.consonants.length; i++) {
            const chac = this.consonants[i];
            if (this.gameLevel == 5) {
              if (data.word.toUpperCase().includes(chac)) {
                letterCount++;
              }
            } else if (
              (this.gameLevel == 7 && firstLetter == chac) ||
              lastLetter == chac
            ) {
              letterCount++;
            } else if (
              (this.gameLevel == 13 &&
                data.word.length == 4 &&
                firstLetter == chac) ||
              lastLetter == chac
            ) {
              // console.log(firstLetter==chac,lastLetter==chac);
              letterCount++;
            }
          }
          if (letterCount >= 2) {
            console.log("in 1")
            this.numberOfCorrectAnswer.consonants.push(
              data.word
            );
            // this.scoreBuffer = wordLength * 100 ;
            this.score =
              this.score + wordLength * 100;
            nonSubject = false;
          }
        }
        if (this.gameLevel >= 8) {
          // console.log(firstLetter,lastLetter,this.gameLevel);
          if (this.gameLevel == 8) {
            for (let i = 0; i < this.consonants.length; i++) {
              const char = this.consonants[i];
              if (
                data.word.length == 3 &&
                firstLetter == char
              ) {
                this.numberOfCorrectAnswer.consonants.push(
                  data.word
                );
                // this.scoreBuffer =
                //   wordLength * 100;
                this.score =
                  this.score + wordLength * 100;
                nonSubject = false;
              }
            }
          }
          if (this.gameLevel == 10) {
            let consecutiveWord = -100;

            for (let i = 0; i < data.word.length; i++) {

              if (this.consonants.includes(data.word.charAt(i).toUpperCase())) {
                console.log(this.consonants.includes(data.word.charAt(i).toUpperCase()))
                if (Math.abs(consecutiveWord - i) == 1) {
                  consecutiveWord = 100;
                  console.log("cons", Math.abs(consecutiveWord - i))
                  break;
                }
                consecutiveWord = i;
              }
            }
            if (consecutiveWord >= 20) {
              this.numberOfCorrectAnswer.consonants.push(
                data.word
              );
              // this.scoreBuffer =
              //   wordLength * 100;
              this.score =
                this.score + wordLength * 100;
              nonSubject = false;
            }
          }
          if (this.gameLevel == 11 && (firstLetter == "B" || firstLetter == "C")) {
            this.numberOfCorrectAnswer.consonants.push(
              data.word
            );
            this.score =
              this.score + wordLength * 100;
            nonSubject = false;
          }
          if (
            this.gameLevel == 14 &&
            (data.word.toUpperCase().includes("T") || data.word.toUpperCase().includes("D"))
          ) {
            this.numberOfCorrectAnswer.consonants.push(
              data.word
            );
            this.score =
              this.score + wordLength * 100;
            nonSubject = false;
          }
        }
      }
      if (this.section == "vowels") {
        // console.log(this.section);
        let firstLetter = data.word.charAt(0).toUpperCase();
        let lastLetter = data.word.slice(-1).toUpperCase();
        if (this.gameLevel == 1) {
          let isThere = false;
          for (let i = 0; i < this.vowels.length; i++) {
            const letter = this.vowels[i];
            if (data.word.toUpperCase().includes(letter)) {
              isThere = true;
            }
          }
          if (isThere) {
            this.numberOfCorrectAnswer.vowels.push(data.word);
            // this.scoreBuffer = wordLength * 100 ;
            this.score =
              this.score + wordLength * 100;
            nonSubject = false;
          }
        }
        if (
          this.vowels.indexOf(firstLetter) > -1 &&
          this.gameLevel == 2
        ) {
          this.numberOfCorrectAnswer.vowels.push(data.word);
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (this.vowels.indexOf(lastLetter) > -1 && this.gameLevel == 4) {
          this.numberOfCorrectAnswer.vowels.push(data.word);
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (this.gameLevel == 5) {
          let letterCount = 0;
          for (let i = 0; i < this.vowels.length; i++) {
            const chac = this.vowels[i];
            if (data.word.toUpperCase().includes(chac)) {
              letterCount++;
            }
          }
          if (letterCount > this.gameLevel - 2) {
            this.numberOfCorrectAnswer.vowels.push(data.word);
            // this.scoreBuffer = wordLength * 100;
            this.score =
              this.score + wordLength * 100;
            nonSubject = false;
          }
        }
        if (this.gameLevel == 7) {
          for (let i = 0; i < this.vowels.length; i++) {
            const char = this.vowels[i];
            if (
              data.word.length == 3 &&
              firstLetter == char
            ) {
              this.numberOfCorrectAnswer.vowels.push(
                data.word
              );
              // this.scoreBuffer =
              //   wordLength * 100 ;
              this.score =
                this.score + wordLength * 100;
              nonSubject = false;
            }
          }
        }
        if (this.gameLevel == 8 || this.gameLevel == 11) {
          let consecutiveWord = "";
          for (let i = 0; i < this.vowels.length; i++) {
            const chac = this.vowels[i];
            if (data.word.toUpperCase().includes(chac)) {
              if (consecutiveWord.includes(chac)) {
                consecutiveWord = consecutiveWord + chac;
              }
              letterCount++;
            }
          }
          if (consecutiveWord.length >= 2) {
            this.numberOfCorrectAnswer.vowels.push(data.word);
            // this.scoreBuffer = wordLength * 100 ;
            this.score =
              this.score + wordLength * 100;
            nonSubject = false;
          }
        }
        if (this.gameLevel == 10 && firstLetter == "A") {
          this.numberOfCorrectAnswer.vowels.push(data.word);
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (
          this.gameLevel == 13 &&
          data.word.toUpperCase().includes("E") &&
          data.word.toUpperCase().includes("A")
        ) {
          this.numberOfCorrectAnswer.vowels.push(data.word);
          // this.scoreBuffer = wordLength * 100;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (
          this.gameLevel == 14 &&
          data.word.toUpperCase().includes("I")
        ) {
          this.numberOfCorrectAnswer.vowels.push(data.word);
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
      }
      if (this.section == "nouns") {
        const partOfSpeech = data.partOfSpeech;
        if (
          partOfSpeech == "noun" &&
          this.gameLevel == 1
        ) {
          this.numberOfCorrectAnswer.nouns.push(data.word);
          // this.scoreBuffer = wordLength * 100;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (
          partOfSpeech == "noun" &&
          wordLength ==
          this.oData.levels[this.section][this.gameLevel]
            .lettersLength
        ) {
          this.numberOfCorrectAnswer.nouns.push(data.word);
          // this.scoreBuffer = wordLength * 100;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
      }
      if (this.section == "verbs") {

        const partOfSpeech = data.partOfSpeech;
        if (
          partOfSpeech == "verb" &&
          this.gameLevel == 1
        ) {
          this.numberOfCorrectAnswer.nouns.push(data.word);
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
        if (
          partOfSpeech == "verb" &&
          wordLength ==
          this.oData.levels[this.section][this.gameLevel]
            .lettersLength
        ) {
          this.numberOfCorrectAnswer.nouns.push(data.word);
          // this.scoreBuffer = wordLength * 100 ;
          this.score =
            this.score + wordLength * 100;
          nonSubject = false;
        }
      }
      if (nonSubject) {
        console.log(nonSubject)
        // this.scoreBuffer = wordLength * wordLength;
        this.score =
          this.score + wordLength * wordLength;
      }


      if (this.numberOfCorrectAnswer[this.section].length > noOfCA) {
        let wordindex =
          this.numberOfCorrectAnswer[this.section].length - 1;
        this.CAText = this.add
          .text(
            this.wordHolders[wordindex].x,
            this.wordHolders[wordindex].y,
            data.word,
            {
              font: "56px Stanberry",
              fill: "#FFFFFF",
              align: "center",
            }
          )
          .setOrigin(0.5);
        this.panelbottom.add(this.CAText);
      }

      // for (let i = 1; i < 8; i++) {
      //   if (
      //     this.selected.length > 0 &&
      //     this.selected.length == i &&
      //     i <= 3
      //   ) {
      //     this.score = this.score + 9;
      //   }
      //   if (this.selected.length > 3 && this.selected.length == i) {
      //     this.score = this.score + i * i;
      //   }
      // }
      if (
        this.numberOfCorrectAnswer[this.section].length ==
        (this.gameLevel != 14 ? 5 : 9)
      ) {

        this.levelCompletePopup();
        this.playParticleEffects();
      }
      for (var i = 0; i < this.selected.length; i++) {
        this.partileBoxes[i].reset(
          this.selected[i].x,
          this.selected[i].y,
          this.selected[i].letter
        );
        this.partileBoxes[i].startAnimation();
      }

      await delayTime(200);


      var ran = parseInt(Math.random() * 10);
      let ccount = 0;
      let str = this.getCharcter();
      for (var i = 0; i < this.selected.length; i++) {
        if (ccount >= str.length) {
          ccount = 0;
          str = this.getCharcter();
        }
        this.selected[i].setNewLetter(str.charAt(ccount));
        ccount++;
      }

      for (var i = 0; i < this.noOfBoxes; i++) {
        for (var j = 0; j < this.noOfBoxes; j++) {
          this.boxes[i][j].setUp();
        }
      }
      this.first = null;
      this.current = null;
      this.direction = null;
      this.canPlay = true;
    } else {
      this.bringBoxesUp();
    }
  }
  async bringBoxesUp() {
    for (var i = 0; i < this.selected.length; i++) {
      if (this.selected[i].isMouseDown) {
        this.selected[i].showWrong();
      }
    }
    await delayTime(200);
    for (var i = 0; i < this.noOfBoxes; i++) {
      for (var j = 0; j < this.noOfBoxes; j++) {
        this.boxes[i][j].setUp();
      }
    }
    this.first = null;
    this.current = null;
    this.direction = null;
  }
  checkCorrectNess() {
    this.canPlay = false;
    var str = "";
    this.selected = [];
    for (var i = 0; i < this.noOfBoxes; i++) {
      for (var j = 0; j < this.noOfBoxes; j++) {
        if (this.boxes[i][j].isMouseDown) {
          this.selected.push(this.boxes[i][j]);
        }
      }
    }
    if (this.reverse) {
      this.selected = this.selected.reverse();
    }
    var str = "";
    for (var i = 0; i < this.selected.length; i++) {
      str += this.selected[i].letter;
    }
    // console.log(str);
    if (this.selected.length >= 3) {
      // if(this.selected.length<5){
      //     if(this.selected.length==3){
      //       let word=this.threeLetterData[str];
      //       if(word){
      //         this.checkByLevel(word)
      //       }
      //       else{
      //         this.bringBoxesUp();
      //       }
      //     }
      //     if(this.selected.length==4){
      //       let word=this.fourLetterData[str];
      //       if(word){
      //         this.checkByLevel(word)
      //       }
      //       else{
      //         this.bringBoxesUp();
      //       }
      //     }
      // }
      // else
      let wordRespose = { word: "", partOfSpeech: "" };
      for (const key in this.grammerWords) {
        if (key === str) {
          wordRespose.word = str;
          wordRespose.partOfSpeech = this.grammerWords[key];
        }
      }
      if (wordRespose.word != "") {
        this.checkByLevel(wordRespose);
      } else {
        this.bringBoxesUp();
      }
    } else {
      for (var i = 0; i < this.noOfBoxes; i++) {
        for (var j = 0; j < this.noOfBoxes; j++) {
          this.boxes[i][j].setUp();
        }
      }
      this.first = null;
      this.current = null;
      this.direction = null;
    }

    // console.log(this.selected.length);
  }

  stopAllVOs() {
    for (let index = 0; index < this.oData.VO.length; index++) {
      AudioManager.stopSound(this.oData.VO[index]);
    }
  }

  async nextLevel() {
    this.canPlay = false;
    await delayTime(2000);
    this.scene.start("LevelComplete", {
      gameLevel: this.gameLevel + 1,
      Score: this.score,
      section: this.section,
    });
  }


  createParticleEffect() {
    this.particle = [];
    for (let i = 0; i < 100; i++) {
      let right = i % 2 == 0;
      let particleType = new Particle(
        this,
        "papers000" + (parseInt(Math.random() * 6) + 1),
        i % 2 == 0,
        400,
        400,
        1
      );
      this.contentContainer.add(particleType);
      this.particle.push(particleType);
    }
  }
  async playParticleEffects() {
    console.log("playing")
    this.particle.map((particle) => this.contentContainer.bringToTop(particle));
    this.particle.map((particle) => particle.startAnimation());

  }

}
