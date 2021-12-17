
export default class MultiChoice extends Phaser.GameObjects.Container {
    constructor(scene,choice,section) {
      super(scene);
  
      this.scene = scene;
      this.choice = choice;
      this.section = section;

      this.choicebg = scene.add.image(0,0, "choicebg");
      this.choicebg.setOrigin(0.5,0.5);
      this.add(this.choicebg);
      this.answerChoice = scene.add
      .text(-5, -5, this.choice, {
        font: "40px Junegull",
        fill: "#fff",
        align: "center",
      })
      .setOrigin(0.5);
      this.add(this.answerChoice);
      this.isMouseDown = false;
      this.correct = scene.add.image(0,0, "correct");
      this.correct.setOrigin(0.5,0.5);
      this.correct.setScale(0.5);
      this.correct.x=this.choicebg.width*scene.game.contentScale/2;
      this.correct.y=-this.choicebg.height*scene.game.contentScale/2;
      this.add(this.correct);
      this.correct.alpha=0;
      this.wrong = scene.add.image(0,0, "wrong");
      this.wrong.setOrigin(0.5,0.5);
      this.add(this.wrong);
      this.wrong.setScale(0.5);
      this.wrong.x=this.choicebg.width*scene.game.contentScale/2;
      this.wrong.y=-this.choicebg.height*scene.game.contentScale/2;
      this.wrong.alpha=0;
    }
    update() {
      // console.log("hell");
    }
    addEvents(){
      this.setSize(this.choicebg.displayWidth, this.choicebg.displayHeight);
      this.setInteractive({ useHandCursor: true });
      // this.levelbg.on("pointerdown", this.handleClick.bind(this));
  }
    setDown(){
      if(!this.isMouseDown){
        this.isMouseDown = true;
        this.body.setTexture('boxdown2');
      }
      
    }
    setShowHint(){
      this.isMouseDown = false;
      this.body.setTexture('box1');
    }
    showWrong(){
      this.wrong.alpha=1;
    }
    showIdle(){
      this.wrong.alpha=0;
      this.correct.alpha=0;
    }
    showCorrect(){
      this.correct.alpha=1;
    }
   
    
    
  }