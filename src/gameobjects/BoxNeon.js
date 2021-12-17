export default class BoxNeon extends Phaser.GameObjects.Container {
  constructor(scene, letter, row, col, size,boxIndex,gameLevel) {
    super(scene);

    this.letter = letter;
    this.scene = scene;
    this.row = row;
    this.col = col;
    this.size = size;
    this.boxIndex=boxIndex;
    // console.log(this.boxIndex);
    let xyValue=0;
    if(gameLevel%3){
      xyValue=this.size/2*0.5*scene.game.contentScale;
    }else{
      xyValue=0;
    }
    
    this.body = scene.add
      .image(xyValue, xyValue, "box")
      .setOrigin(0.5);
    this.add(this.body);
    this.boxText = scene.add
    .text(xyValue-2, xyValue-2, this.letter.toUpperCase(), {
      font: "56px Junegull",
      fill: "#FFFFFF"
    })
    .setOrigin(0.5);
    this.boxText.alpha=1;
    // this.boxText = scene.add
    //   .image(xyValue, xyValue, "letter"+this.letter.toUpperCase())
    //   .setOrigin(0.5);
    this.add(this.boxText);
    this.isMouseDown = false;
  }
  update() {
    // console.log("hell");
  }
  setDown(){
    if(!this.isMouseDown){
      this.isMouseDown = true;
      this.body.setTexture('boxhighlight');
    }
  }
  addEvents(){
    // console.log(this.body);
    this.setSize(this.body.displayWidth, this.body.displayHeight);
    this.setInteractive({ useHandCursor: true ,pixelPerfectOver:true});
    this.on("pointerdown", this.handleClick.bind(this));
    this.body.isClick=false;
    
  }
  handleClick(){
    this.emit("CLICK", this);
    // console.log("click",this.body.isClick);
    if(!this.body.isClick){
      this.body.isClick=true;
      this.body.setTexture('boxhighlight');
    }else{
      this.body.isClick=false;
    this.body.setTexture('box');
    }

    
  }
  setShowHint(){
    let vowels=["A", "E", "I", "O", "U"];
    for (let i = 0; i < vowels.length; i++) {
      const letter = vowels[i];
      // console.log(letter,this.letter.toUpperCase());
      if(this.letter.toUpperCase() == letter){
        this.body.setTexture('boxhighlight');
      }
    }
  }
  setUp(){
    this.isMouseDown = false;
    this.body.setTexture('box');
  }
  showWrong(){
    this.body.setTexture('boxwrong');
  }
  showCorrect(){
    this.body.setTexture('boxhighlight');
  }
  setLetter(letter){
    this.letter=letter;
    // this.boxText.setTexture("letter"+letter.toUpperCase());
    this.boxText.setText(letter.toUpperCase());
  }
  setNewLetter(letter) {
    // this.scale = 0;
    this.letter=letter;
    // this.boxText.setTexture("letter"+letter.toUpperCase());
    this.boxText.setText(letter.toUpperCase());
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
