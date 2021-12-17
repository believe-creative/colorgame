import AudioManager from "../utils/audio_manager";
import { delayTime } from "../utils";
import BaseScene from "./basescene";
import Box from "../gameobjects/Box";
import MultiChoice from "../gameobjects/multiChoice";
import ParticleBox from "../gameobjects/ParticleBox";
import Particle from "../gameobjects/Particle";
import CountDown from "../gameobjects/CountDown"
import WordBox from "../gameobjects/WordBox";

export default class gameBonusLevel extends BaseScene {
  constructor() {
    super("GameBonusLevel");
    this.score=0;
  }

  init(data) {
    this.section=data.section;
    this.gameLevel=data.gameLevel;
    this.score=data.Score;
  }

  async create() {
    this.initialTime = 3000;
    this.loaderTime=0;
    this.minScore=1000;
    this.tempTime = 0;
    this.gap = 10 ;
    this.selectLettersWord=[];
    this.isGameRunning = false;
    this.boxSize = 72 * this.game.DPR;
    this.oData=this.cache.json.get("gameConfig");
    this.noOfBoxes = 8;
    AudioManager.playBgSound("background_music");

    this.particleContainer = this.add.container();

    this.background = this.add.image(0, 0, "gamebg");
    this.background.setOrigin(0.5,0.5);
    this.bgContainer.add(this.background);
    this.paneltop = this.add.container();
    this.contentContainer.add(this.paneltop);
    this.paneltopBG = this.add.image(0, 0, "paneltop");
    this.paneltopBG.setOrigin(0.5, 0.5);
    this.paneltop.add(this.paneltopBG);
    this.paneltop.setScale(this.game.contentScale);
    this.paneltop.x = this.game.refWidth / 2;
    this.paneltop.y = -this.paneltopBG.height / 2;



      this.partileBoxes=[];
      for(var i=0;i<8;i++){
        let particleBox=new ParticleBox(this,this.boxSize);
        this.contentContainer.add(particleBox);
        this.partileBoxes.push(particleBox);
      }
      this.createParticleEffect();
    this.wordBoxs=[];
    let xValue = 0;
    let yValue = 0;
    let gap = 15;
    this.wordHolders = [];
   
    this.sitelogo = this.add.image(0, 0, "sitelogo");
    this.sitelogo.setOrigin(0.5, 0.5).setScale(this.game.contentScale*0.3);
    this.sitelogo.x = 10+(this.sitelogo.width*this.game.contentScale*0.3)/2;
    this.sitelogo.y = 10+(this.sitelogo.height*this.game.contentScale*0.3)/2;
    this.contentContainer.add(this.sitelogo);

    this.levelholder = this.add.container();
    this.contentContainer.add(this.levelholder);
    this.levelbg = this.add.image(0, 0, "levelholder");
    this.levelbg.setOrigin(0.5, 0.5);
    this.levelholder.add(this.levelbg);
    this.levelholder.setScale(this.game.contentScale);
    this.levelholder.x=this.sitelogo.x+((this.sitelogo.width+40)/2)*this.game.contentScale
    this.levelholder.y=(this.levelbg.height/2+25)*this.game.contentScale
    this.gameLevelText = this.add
      .text(0, -5, "Level: "+this.gameLevel, {
        font: "40px Junegull",
        fill: "#FFFFFF",
        align: "center", strokeThickness: 1
      })
      .setOrigin(0.5);
    this.levelholder.add(this.gameLevelText);

    
    let levelTitle =
      this.oData.levels[this.section]["level" + this.gameLevel].question || "";
    this.levelText = this.add
      .text(0, 0, levelTitle, {
        font: "48px Junegull",
        fill: "#5ec6b7",
        align: "center",
      })
      .setOrigin(0.5);
    this.paneltop.add(this.levelText);
    this.levelText.y=-this.levelText.height/2;
    

    this.pausebg = this.add.image(0,0, "pausebg");
    this.pausebg.setOrigin(0.5,0.5).setScale(this.game.contentScale*1.2);
    this.pausebg.setInteractive({ useHandCursor: true ,pixelPerfectOver:true});
    this.pausebg.pause=false;
    this.pausebg.on("pointerdown", this.handlePauseClick.bind(this,this.pausebg));
    this.contentContainer.add(this.pausebg);
    this.pausebg.x=this.game.refWidth-10-(this.pausebg.width*this.game.contentScale*1.2)/2
    this.pausebg.y=10+(this.pausebg.height*this.game.contentScale)/2

    // this.resetbtn = this.add.image(0,0, "resetbtn");
    // this.resetbtn.setOrigin(0.5,0.5).setScale(1.2);
    // this.resetbtn.setInteractive({ useHandCursor: true ,pixelPerfectOver:true});
    // this.resetbtn.on("pointerdown", this.handleResetClick.bind(this,this.resetbtn));
    // this.paneltop.add(this.resetbtn);
    // this.resetbtn.x=this.paneltopBG.width/2-this.resetbtn.width/2-10;
    // this.resetbtn.y=-this.paneltopBG.height/2+this.resetbtn.height/2+15;


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

    let countDown = new CountDown(this, 1);
    this.contentContainer.add(countDown);
    countDown.setScale(this.game.contentScale*0.90);
    countDown.x = this.game.refWidth / 2 - this.centerpanelBG.width * this.game.contentScale * this.centerpanelBG.scale / 2
    countDown.y = this.game.refHeight / 2 + 10 - this.centerpanelBG.height * this.game.contentScale * this.centerpanelBG.scale / 2



    

  // this.timedEvent = this.time.addEvent({
  //   delay: 60 * 1000,
  //   callback: this.endGame,
  //   callbackScope: this,
  //   loop: false,
  // });

  let nextLine=0;
  this.sentanceArray=[];
  let ySentanceWord=this.game.refHeight / 2-500*0.5;
  if(this.oData.levels[this.section]["level"+this.gameLevel].type == "selectwords"){
    let questions=this.oData.levels[this.section]["level"+this.gameLevel].questions;
    this.choice_ran=parseInt(Math.random()*questions.length)
    let ques=this.oData.levels[this.section]["level" + this.gameLevel].questions[this.choice_ran].question
    this.levelText.setText(ques);
    this.sentanceArray= questions[this.choice_ran].sentance.split(" ");
    for (let i = 1; i <= this.sentanceArray.length; i++) {
      let card=new WordBox(this,this.sentanceArray[i-1])
      this.wordHolders.push(card);
      this.centerpanel.add(card);
      console.log(card.body.displayWidth)
      card.x=120+(xValue*(card.body.displayWidth+20));
      card.y=ySentanceWord;
      card.addEvents()
      card.isClick=false;
      // card.on("CLICK", (e,gameObject)=>{
      //     if(!card.isClick){
      //       card.isClick=true;
      //       this.selectLettersWord.push(card.boxText.text);
      //     }else{
      //       card.isClick=false;
      //       this.selectLettersWord.splice(this.selectLettersWord.indexOf(card.boxText.text), 1);
      //     }
      //   // console.log(this.selectLettersWord);
      // }); 
      if(i%3===0){
        xValue=0;
        ySentanceWord=ySentanceWord+150*0.5;
          
      }else{
        xValue++;
      }
      
    }
    // console.log(this.sentanceArray);
    
  }else{
    let boxIndex = 1;
    this.gap = 10;
    let questions=this.oData.levels[this.section]["level"+this.gameLevel].questions;
    this.choice_ran=parseInt(Math.random()*questions.length)
    console.log(this.choice_ran)
    let word_count=questions[this.choice_ran].word.length;
    console.log(word_count)
    let word_c=0;
    const word = questions[this.choice_ran].word;
    for (var i = 0; i < this.noOfBoxes; i++) {
      for (var j = 0; j < this.noOfBoxes; j++) {
        let box = new Box(this, word.charAt(word_c), i, j, this.boxSize,boxIndex,this.gameLevel);
        box.x = (j * this.gap + j * box.body.width * 0.85) - gap * this.game.contentScale + 60;
        box.y = (i * this.gap + i * box.body.width * 0.85) - gap * this.game.contentScale + 60;
        box.setScale(0.85)
        if(this.oData.levels[this.section]["level"+this.gameLevel].type=="selectletters"){
          box.addEvents();
          // box.on("pointerdown",(e,gameObject)=>{
          //   // console.log(this.selectLettersWord);
          //   if(box.list[0].isClick){
          //     this.selectLettersWord.push(word.charAt(word_c));
          //   }else{
          //     this.selectLettersWord.splice(this.selectLettersWord.indexOf(word.charAt(word_c)), 1);
          //   }
          //   // console.log(this.selectLettersWord);
          // });
         }
        this.wordBoxs.push(box);
        this.centerpanel.add(box);
        word_c++;
        if(word_c>=word_count){
          break;
        }
      }
      if (boxIndex == 5) {
        boxIndex = 1;
      } else {
        boxIndex++;
      }
      if(word_c>=word_count){
        break;
      }
    }
  // for (let i = 0; i < this.oData.levels[this.section]["level"+this.gameLevel].word.length; i++) {
  //   const word = this.oData.levels[this.section]["level"+this.gameLevel].word;
  //   let box = new Box(this, word.charAt(i), i, i, this.boxSize,i,this.gameLevel);
  //       box.setScale(0.38);
  //       if(i<8){
  //         box.x = (i * this.gap + i * box.body.width*0.38)-0.5* this.game.contentScale+40;
  //         box.y = this.game.refHeight / 2 -540*0.5*this.game.contentScale;
  //       }else if(i<16){
          
  //         box.x = ((i * this.gap + i * box.body.width*0.38)-0.5* this.game.contentScale+38)-(338);
  //         box.y = this.game.refHeight / 2 -340*0.5*this.game.contentScale;
  //         nextLine++;
  //         if(i==15){
  //           nextLine=0;
  //         }
  //       }else if(i<24){
  //         box.x = ((i * this.gap + i * box.body.width*0.38)-0.5* this.game.contentScale+38)-(676);
  //         box.y = this.game.refHeight / 2 -140*0.5*this.game.contentScale;
  //         nextLine++;
  //         if(i==23){
  //           nextLine=0;
  //         }
  //       }else{
  //         box.x = ((i * this.gap + i * box.body.width*0.38)-0.5* this.game.contentScale+38)-(1014);
  //         box.y = this.game.refHeight / 2+60*0.5*this.game.contentScale;
  //         nextLine++;
         
  //       }
        
  //      if(this.oData.levels[this.section]["level"+this.gameLevel].type=="selectletters"){
  //       box.addEvents();
  //       box.on("pointerdown",(e,gameObject)=>{
  //         // console.log(this.selectLettersWord);
  //         if(box.list[0].isClick){
  //           this.selectLettersWord.push(word.charAt(i));
  //         }else{
  //           this.selectLettersWord.splice(this.selectLettersWord.indexOf(word.charAt(i)), 1);
  //         }
  //         // console.log(this.selectLettersWord);
  //       });
  //      }
  //   this.contentContainer.add(box);
  //   this.wordBoxs.push(box);
  // }
  
}
if(this.oData.levels[this.section]["level"+this.gameLevel].type=="selectletters" || this.oData.levels[this.section]["level"+this.gameLevel].type=="selectwords"){
  this.submitBtn = this.add.image(this.centerpanelBG.width/2, this.game.refHeight / 2+100, "submitBtn");
  this.submitBtn.setOrigin(0.5,0.5).setScale(1.5);
  this.centerpanel.add(this.submitBtn);
  this.submitBtn.x=this.centerpanelBG.width/2-this.submitBtn.width/2;
  this.submitBtn.setInteractive({ useHandCursor: true });
  this.submitBtn.on("pointerdown", this.submitBtnClickHandler.bind(this)); 
}
  if(this.oData.levels[this.section]["level"+this.gameLevel].answerChoices){
    
  for (let i = 1; i <= 4; i++) {
    let choiceText=this.oData.levels[this.section]["level"+this.gameLevel].questions[this.choice_ran].answerChoices[i-1].toUpperCase();
    let choice = new MultiChoice(this, choiceText,this.section );
    choice.x =((i*50 + i*choice.choicebg.width));
    choice.y = this.centerpanelBG.height / 2+100;
    this.centerpanel.add(choice);
    choice.setScale(1.5)
    choice.addEvents();
    choice.on("pointerdown", this.correctAnswerCheck.bind(this,{object:choice,text:choiceText}));
    }
  }

  this.tweens.add({
    targets: this.paneltop,
    y: ((this.paneltopBG.height ) / 2 + 120)* this.game.contentScale,
    ease: "Back.out",
    duration: 250,
    // onComplete: this.showScoresResults  // set context? how?
  });


    await delayTime(1000);
    countDown.changeFrame(2);
    await delayTime(1000);
    countDown.changeFrame(3);
    await delayTime(1000);
    countDown.changeFrame(4);
    await delayTime(1000);
    countDown.hide();
    countDown.changeFrame(1)
    this.isGameRunning = true;
  
 
  }
  async sentanceWordClick(word){
    // console.log(word.text);
  }
  async submitBtnClickHandler(){
    // console.log("submit");
    let arrString=this.selectLettersWord;
    // if(this.section =="consonants" || this.section =="vowels"){
      
      if(this.oData.levels[this.section]["level"+this.gameLevel].type=="selectletters"){
        let correctAnswer= this.oData.levels[this.section]["level"+this.gameLevel].questions[this.choice_ran].correctAnswer;
        for (let i = 0; i < this.wordBoxs.length; i++) {
          if(this.wordBoxs[i].body.isClick){
            let index=correctAnswer.toLowerCase().indexOf(this.wordBoxs[i].letter.toLowerCase())
            if(index>=0){
              console.log(index)
              correctAnswer=correctAnswer.replace(correctAnswer.charAt(index), '');
              console.log(correctAnswer)
            }
          }
          
        }
        
        if (
          correctAnswer.length>0
        ) {
          this.wordBoxs.map((word)=>{
            if(word.body.isClick){
              word.showWrong();
            }
          })
          this.wordBoxs.map((word)=>{
            if(word.body.isClick){
              word.body.isClick=false;
            }
          })
          await delayTime(2000)
          this.selectLettersWord=[];
          this.wordBoxs.map((word)=>{
            if(!word.body.isClick){
              word.setUp();
            }
          })
          // console.log("showHint");
          // this.showHint();
        }else{
          // console.log("nextLevel");
          this.score=Math.max((this.initialTime-this.loaderTime)*2,this.minScore);
          this.wordBoxs.map((word)=>{
            if(word.body.isClick){
              word.showCorrect();
            }
            word.disable();
          })
          await delayTime(2000)
          this.nextLevel();
        }
      }else if(this.oData.levels[this.section]["level"+this.gameLevel].type == "selectwords"){
        arrString=[];
        let correctAnswer=this.oData.levels[this.section]["level"+this.gameLevel].questions[this.choice_ran].correctAnswer
        for (let i = 0; i < correctAnswer.length; i++) {
          const str = correctAnswer[i];
          this.wordHolders.filter(e => {
            console.log(e);
            if(e.isClick && e.word==str){
              arrString.push(str);
            }
          }); 
        }
        if (
          arrString.length === correctAnswer.length
        ) {
          this.score=Math.max((this.initialTime-this.loaderTime)*2,this.minScore);
          this.wordHolders.map((word)=>{
            if(word.isClick){
              word.showCorrect();
            }
            word.disable();
          })
          await delayTime(2000)
          this.nextLevel();
          
        }else{
          console.log("showHint");
          // this.showHint();
          this.wordHolders.map((word)=>{
            if(word.isClick){
              word.showWrong();
            }
          })
          this.wordHolders.map((word)=>{
            if(word.isClick){
              word.isClick=false;
            }
          })
          await delayTime(2000)
          this.selectLettersWord=[];
          this.wordHolders.map((word)=>{
            if(!word.isClick){
              word.setUp();
            }
          })
        }
      }
    // }else if(this.section =="nouns" || this.section =="verbs"){
    //   if(this.oData.levels[this.section]["level"+this.gameLevel].type == "selectwords"){
    //     arrString=[];
    //     for (let i = 0; i < this.oData.levels[this.section]["level"+this.gameLevel].correctAnswer.length; i++) {
    //       const str = this.oData.levels[this.section]["level"+this.gameLevel].correctAnswer[i];
    //       this.selectLettersWord.filter(e => {
    //         // console.log(e);
    //         if(e==str){
    //           arrString.push(str);
    //         }
    //       }); 
    //     }
    //     if (
    //       arrString.length === this.oData.levels[this.section]["level"+this.gameLevel].correctAnswer.length && 
    //       (this.selectLettersWord.length === this.oData.levels[this.section]["level"+this.gameLevel].correctAnswer.length)
    //     ) {
    //       // console.log("nextLevel");
    //       this.score=Math.max((this.initialTime-this.loaderTime)*2,this.minScore);
    //       this.nextLevel();
          
    //     }else{
    //       // console.log("showHint");
    //       this.showHint();
    //     }
    //   }
    // }
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
    this.gamepaused.setOrigin(0.5, 0.5).setScale(0.9*this.game.contentScale);
    this.contentContainer.add(this.gamepaused);
    this.playbtn = this.add.image(
      this.game.refWidth / 2 - 150 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "playbg"
    );
    this.playbtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.playbtn);
    this.playbtn.setInteractive({ useHandCursor: true });
    this.playbtn.setScale(this.game.contentScale* 1.2);
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
    this.homebtn.setScale(this.game.contentScale* 1.2);
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
    this.levelsbtn.setScale(this.game.contentScale* 1.2);
    this.levelsbtn.on("pointerdown", (e) => {
      this.scene.start("Levels", { levelopen: this.gameLevel, section: this.section });
    });
  }
  async update() {
    if (this.scoreText) {
    if(!this.pausebg.pause && this.isGameRunning){
      if (this.loaderTime >= this.initialTime) {
        this.isGameRunning = false;
        this.levelGameOver()
      }
      else {
        this.loaderTime += 1;
      }
      // this.formatTime(this.initialTime - 60 * this.timedEvent.getProgress());
   }
   this.score=Math.max((this.initialTime-this.loaderTime)*2,this.minScore)
   this.scoreText.setText(
     this.score
   );
     
        let percent = this.loaderTime / this.initialTime
        let value = percent * this.timerlaoder.width;
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
    this.partileBoxes.map(particleBox=>particleBox.update());
    if(this.particle){
      this.particle.map((particle) => particle.update());
    }
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
    this.homebtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.homebtn);
    this.homebtn.setScale(this.game.contentScale* 1.2);
    this.homebtn.setInteractive({ useHandCursor: true });
    this.homebtn.on("pointerdown", (e) => {
      this.scene.start("Intro");
    });

    this.levelsbtn = this.add.image(

      this.game.refWidth / 2 + 5 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "levels"
    );
    this.levelsbtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.levelsbtn);
    this.levelsbtn.setScale(this.game.contentScale* 1.2);
    this.levelsbtn.setInteractive({ useHandCursor: true });
    this.levelsbtn.on("pointerdown", (e) => {

      this.scene.start("Levels", { levelopen: this.gameLevel, section: this.section });
    });

    this.play_again = this.add.image(
      this.game.refWidth / 2 + 160 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "play_again"
    );
    this.play_again.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.play_again);
    this.play_again.setScale(this.game.contentScale* 1.2);
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


  }
  async endGame() {
    // console.log("Game Over. Score: " + this.score);
    this.pausebg.pause = true;
    this.pausebg.disableInteractive();
    this.backpanel = this.add.image(
      this.game.refWidth / 2,
      this.game.refHeight / 2,
      "overlay"
    );
    this.backpanel.setOrigin(0.5, 0.5).setScale(3*0.5*this.game.contentScale);
    this.contentContainer.add(this.backpanel);
    // console.log(this.game.contentScale);
    this.scorebg = this.add.image(this.game.refWidth / 2, this.game.refHeight / 2-500*0.5*this.game.contentScale, "scorebg");
    this.scorebg.setOrigin(0.5,0.5).setScale(2.5*0.5*this.game.contentScale);
    this.contentContainer.add(this.scorebg);
    this.scoreCard = this.add
    .text(0, 0, this.score, {
      font: 96*0.5*this.game.contentScale + "px Junegull",
      fill: "#FFFFFF",
      align: "center",
    })
    .setOrigin(0.5);
    this.scoreCard.x = this.game.refWidth / 2;
    this.scoreCard.y = this.game.refHeight / 2 -470*0.5*this.game.contentScale;
    this.contentContainer.add(this.scoreCard);
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
    this.homebtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.homebtn);
    this.homebtn.setScale(this.game.contentScale* 1.2);
    this.homebtn.setInteractive({ useHandCursor: true });
    this.homebtn.on("pointerdown", (e) => {
      this.scene.start("Intro");
    });

    this.levelsbtn = this.add.image(
  
      this.game.refWidth / 2+ 5 * this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "levels"
    );
    this.levelsbtn.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.levelsbtn);
    this.levelsbtn.setScale(this.game.contentScale* 1.2);
    this.levelsbtn.setInteractive({ useHandCursor: true });
    this.levelsbtn.on("pointerdown", (e) => {
      this.scene.start("Levels", {levelopen:this.gameLevel, section: this.section });
    });

    this.play_again = this.add.image(
      this.game.refWidth / 2 + 160 *this.game.contentScale,
      this.game.refHeight / 2 + 40 * this.game.contentScale,
      "play_again"
    );
    this.play_again.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.play_again);
    this.play_again.setScale(this.game.contentScale* 1.2);
    this.play_again.setInteractive({ useHandCursor: true });
    this.play_again.on("pointerdown", async (e) => {
      await delayTime(1000);
      if(this.gameLevel % 3 == 0){
        this.scene.start("GameBonusLevel",{gameLevel:this.gameLevel,section:this.section,Score:0});
      }else{
        this.scene.start("Game",{gameLevel:this.gameLevel,section:this.section,Score:0});
      }
    });
  }
  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = Math.floor(seconds % 60);
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, "0");
    // Returns formated time
    this.timerCount=partInSeconds;
    
    return `${minutes}:${partInSeconds}`;
  }
  async correctAnswerCheck(choice){
    // console.log(choice);
      if (
        this.oData.levels[this.section]["level"+this.gameLevel].questions[this.choice_ran].correctAnswer == choice.text 
      ) {
        this.score=Math.max((this.initialTime-this.loaderTime)*2,this.minScore);
        this.isGameRunning=false;
        choice.object.showCorrect()
        AudioManager.playSound("correct")
        await delayTime(1000);
        this.nextLevel();
        
      }else{
        choice.object.showWrong()
        AudioManager.playSound("wrongbox")
        await delayTime(1000);
        choice.object.showIdle();
      }
  }

  wrongAnswer(){
      
  }
  async showHint(){
    // console.log("showHint",this.gameLevel);
    let hint;
    if(this.oData.levels[this.section]["level"+this.gameLevel].type=="selectletters" || this.oData.levels[this.section]["level"+this.gameLevel].type=="selectwords"){
      if(this.oData.levels[this.section]["level"+this.gameLevel].type=="selectwords"){
        hint=this.oData.levels[this.section]["level"+this.gameLevel].correctAnswer.join(', ');
      }else{
        hint=this.oData.levels[this.section]["level"+this.gameLevel].correctAnswer;
      }
      this.hintText = this.add
      .text(
      this.game.refWidth / 2,
      this.game.refHeight / 2 +300*0.5*this.game.contentScale,
      "hint: "+hint,
      {
        font: "84px Stanberry",
        fill: "#FFFFFF",
        align: "center",
      }).setOrigin(0.5).setScale(1 * 0.5 * this.game.contentScale);
      this.contentContainer.add(this.hintText);
    }else{
      if(this.wordBoxs.length){
        for (let i = 0; i < this.wordBoxs.length; i++) {
          const wBox = this.wordBoxs[i];
          wBox.setShowHint();
        }
      }
    }
    
   
    
  }
  async nextLevel() {
    this.canPlay = false;
    


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
      if (window.cordova && cordova.plugins.playGamesServices) {
        cordova.plugins.playGamesServices.isSignedIn((result) => {
          cordova.plugins.playGamesServices.showLeaderboard({
            leaderboardId: this.leaderboardId
        }, () => {
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
      await delayTime(1000);
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
      cordova.plugins.playGamesServices.isSignedIn((result)=> {
        if (result.isSignedIn) {
          var data = {
            leaderboardId: this.leaderboardId
          };
          cordova.plugins.playGamesServices.getPlayerScore(data, (result)=> {
              if(result.playerScore){
                if(BaseScene.localData[this.section].scores[this.gameLevel]>result.playerScore){
                  var data = {
                    score: BaseScene.localData[this.section].scores[this.gameLevel],
                    leaderboardId: this.leaderboardId
                  };
                  cordova.plugins.playGamesServices.submitScoreNow(data, (result)=> {
                    
                    console.log("Is this your best score: " + result.newBest);
                  }, ()=> {
                    // On error
                  });
                }
                else{
                  BaseScene.localData[this.section].scores[this.gameLevel]=result.playerScore;
                  if(this.bscoreCard){
                    this.bscoreCard.setText("Your best: " + BaseScene.localData[this.section].scores[this.gameLevel])
                  }
                }
              }
          }, ()=> {
            // On error
          });
        }

      }, ()=> {
        // On error: Auth check could not be done
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



    this.playParticleEffects();
  }
  createParticleEffect(){    
    this.particle = [];
    for (let i = 0; i < 100; i++) {
      let right = i % 2 == 0;
      let particleType = new Particle(
        this,
        "papers000" + (parseInt(Math.random() * 4) + 1),
        i % 2 == 0,
        400,
        400,
        1
      );      
      this.contentContainer.add(particleType);
      this.particle.push(particleType);
    }    
  }
  async playParticleEffects(){
    console.log("playing")
    this.particle.map((particle) => this.contentContainer.bringToTop(particle));
    this.particle.map((particle) => particle.startAnimation());
      
  }
}
