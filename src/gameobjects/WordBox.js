import AudioManager from "../utils/audio_manager";
export default class WordBox extends Phaser.GameObjects.Container {
  constructor(scene, word, row, col, size,boxIndex,gameLevel) {
    super(scene);

    this.word = word;
    this.scene = scene;
    this.row = row;
    this.col = col;
    this.size = size;
    this.boxIndex=boxIndex;
    // console.log(this.boxIndex);
    let xyValue=0;
    // if(gameLevel%3){
    //   xyValue=this.size/2*0.5*scene.game.contentScale;
    // }else{
    //   xyValue=0;
    // }
    
    this.body = scene.add
      .image(xyValue, xyValue, "wordHolder")
      .setOrigin(0.5);
    this.add(this.body);
    this.boxText = scene.add
    .text(xyValue-2, xyValue-2, this.word, {
      font: "42px Stanberry",
      fill: "#FFFFFF"
    })
    .setOrigin(0.5);
    this.boxText.alpha=1;
    // this.boxText = scene.add
    //   .image(xyValue, xyValue, "word"+this.word.toUpperCase())
    //   .setOrigin(0.5);
    this.add(this.boxText);
    this.isMouseDown = false;
    this.playedDown=false;
    this.isClick=false;
  }
  update() {
    // console.log("hell");
  }
  setDown(){
    if(!this.isMouseDown){
      this.isMouseDown = true;
      this.body.setTexture('card_selected');
      
      
    }
    if(!this.playedDown){
      this.playedDown=true;
      AudioManager.playSound("button")
    }
  }
  addEvents(){
    // console.log(this.body);
    this.setSize(this.body.displayWidth, this.body.displayHeight);
    this.setInteractive({ useHandCursor: true ,pixelPerfectOver:true});
    this.on("pointerup", this.handleClick.bind(this));
    this.isClick=false;
    
  }
  handleClick(){
    
    // console.log("click",this.isClick);
    if(!this.isClick){
      this.isClick=true;
      this.body.setTexture('card_selected');
    }else{
      this.isClick=false;
    this.body.setTexture('wordHolder');
    }
    this.emit("CLICK", this);

    
  }
  setShowHint(){
    let vowels=["A", "E", "I", "O", "U"];
    for (let i = 0; i < vowels.length; i++) {
      const letter = vowels[i];
      // console.log(letter,this.letter.toUpperCase());
      if(this.letter.toUpperCase() == letter){
        this.body.setTexture('card_selected');
      }
    }
  }
  setUp(){
    this.isMouseDown = false;
    this.body.setTexture('wordHolder');
  }
  showWrong(){
    this.body.setTexture('card_wrong');
    AudioManager.playSound("wrongbox")
    this.playedDown=false;
  }
  showCorrect(){
    this.body.setTexture('card_correct');
    AudioManager.playSound("correctbox")
    this.playedDown=false;
  }
  setWord(word){
    this.word=word;
    // this.boxText.setTexture("letter"+letter.toUpperCase());
    this.boxText.setText(word);
  }
  disable() {
    this.disableInteractive();
  }
  enable() {
    this.shaded.setInteractive();
  }

  setNewWord(word) {
    // this.scale = 0;
    this.word=word;
    // this.boxText.setTexture("letter"+letter.toUpperCase());
    this.boxText.setText(word);
    // this.scene.tweens.add({
    //   targets: this,
    //   scaleX: 1,
    //   scaleY: 1,
    //   ease: "Back.out",
    //   duration: 1000,
    //   delay: 0,
    // });
  }
  
  
}
