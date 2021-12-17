import AudioManager from "../utils/audio_manager";
import BaseScene from "./basescene";
export default class PreloadScene extends BaseScene {
  constructor() {
    super("Preload");
  }

  preload() {
    super.preload();
    this.loaded=false;
    console.log("here 2")

    this.background = this.add.image(0, 0, "preload");
    this.background.setOrigin(0.5, 0.5);
    this.bgContainer.add(this.background);

    this.logo = this.add.image(this.game.refWidth/2, this.game.refHeight/2, "sitelogotitle");
    this.logo.setOrigin(0.5, 0.5);
    this.contentContainer.add(this.logo);
    this.logo.setScale(this.game.contentScale);

    
    this.progressBar = this.add.graphics();
    this.progressBar.clear();
    this.progressBar.fillStyle(0x006822, 1);
    this.contentContainer.add(this.progressBar)
  



    
    this.load.json('grammerwords', 'assets/works.json');
    this.load.json('fourLetter', 'assets/four.json');
    this.load.json('threeLetter', 'assets/three.json');
    this.load.image('sitelogo', 'assets/new assets/bclogo-blue.png');
    
    this.load.image('game_title', 'assets/new assets/hometitle.png');
    this.load.image('playbtn', 'assets/new assets/play.png');
    this.load.image('play_again', 'assets/new assets/playagainbtn.png');
    this.load.image('next_level', 'assets/new assets/nextlevelbtn.png');
    this.load.image('levels', 'assets/new assets/levelsbtn.png');
    this.load.image('playbg', 'assets/new assets/playbtn.png');
    this.load.image('overlay', 'assets/new assets/overlay.png');
    this.load.image('box', 'assets/new assets/box.png');
    this.load.image('boxhighlight', 'assets/new assets/boxhighlight.png');
    this.load.image('boxwrong', 'assets/new assets/boxwrong.png');
    this.load.image('centerpanel', 'assets/new assets/centerpanel.png');
    this.load.image('pausebg', 'assets/new assets/puasebtn.png');
    this.load.image('sectionbtn', 'assets/new assets/sectionbtn.png');
    this.load.image('gamebg', 'assets/new assets/screen1.jpg');
    this.load.image('levelholder', 'assets/new assets/levelbg.png');
    this.load.image('choicebg', 'assets/new assets/choicebg.png');
    this.load.image('homebtn', 'assets/new assets/homebtn.png');
    this.load.image('backbtn', 'assets/new assets/backbtn.png');
    this.load.image('resetbtn', 'assets/new assets/resetbtn.png');
    this.load.image('leaderboardbtn', 'assets/new assets/leaderboard.png');
    this.load.image('timer', 'assets/new assets/timer.png');
    this.load.image('timerbg', 'assets/new assets/timerbg.png');
    this.load.image('scorebg', 'assets/new assets/score.png');
    this.load.image('card_selected', 'assets/new assets/card_selected.png');
    this.load.image('card_wrong', 'assets/new assets/card_wrong.png');
    this.load.image('card_correct', 'assets/new assets/card_correct.png');


    this.load.image('papers0001', 'assets/new assets/papers0001.png');
    this.load.image('papers0002', 'assets/new assets/papers0002.png');
    this.load.image('papers0003', 'assets/new assets/papers0003.png');
    this.load.image('papers0004', 'assets/new assets/papers0004.png');
    this.load.image('papers0005', 'assets/new assets/papers0005.png');
    this.load.image('papers0006', 'assets/new assets/papers0006.png');

    this.load.image('start_timer0001', 'assets/new assets/start_timer0001.png');
    this.load.image('start_timer0002', 'assets/new assets/start_timer0002.png');
    this.load.image('start_timer0003', 'assets/new assets/start_timer0003.png');
    this.load.image('start_timer0004', 'assets/new assets/start_timer0004.png');
    this.load.image('wrong', 'assets/new assets/wrong.png');
    this.load.image('correct', 'assets/new assets/correct.png');
    this.load.image('submitBtn', 'assets/new assets/submitBtn.png');

    this.load.image('homebg', 'assets/new assets/home3.jpg');
    this.load.image('helpbtn', 'assets/new assets/help.png');
    this.load.image('gamepaused', 'assets/new assets/pause.png');
    this.load.image('gameover', 'assets/new assets/gameover2.png');
    this.load.image('levelcompleted', 'assets/new assets/levelcompleted2.png');
    this.load.image('paneltop', 'assets/new assets/paneltop.png');
    this.load.image('panelbottom', 'assets/new assets/panelbottom.png');
    this.load.image('wordHolder', 'assets/new assets/card.png');
    this.load.image('level', 'assets/new assets/level.png');
    this.load.image('levellock', 'assets/new assets/lock.png');



    this.load.on("progress", (value) => {
        this.progressBar.clear();
          this.progressBar.fillStyle(0x006822, 1);
          this.progressBar.fillRect(0,
            this.game.refHeight-30,
            this.game.refWidth*value,
            10
          );
          
        // this.timerlaoder.setScale(value*this.game.contentScale,1*this.game.contentScale);
        if(value==1){
            this.loaded=true;
        }
    });
    
  }

  create() {
    if (this.loaded) {
        console.log("here 4")
        this.scene.start('Intro');
      }
  }

}