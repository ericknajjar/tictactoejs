import {Signals} from "../utils/signals.js";

export class MenuState extends Phaser.State{ 

    constructor() {
        super();
    }

    init(){
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
    }

    preload(){
        this.game.load.image('background', 'assets/img/background2.jpg');
        this.game.load.image('logo', 'assets/img/logo.png');       
    }
        
    create(){

        let background = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'background');
        background.anchor.x = 0.5;
        background.anchor.y = 0.5;
        background.scale.setTo(0.25,0.25);

        let logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY-75, 'logo');
        logo.anchor.x = 0.5;
        logo.anchor.y = 0.5;

        
        let possible = this.createButton("Possible",true);
        let impossible = this.createButton("Impossible",false);

        let clickables = this.game.add.group();

        clickables.add(possible);
        clickables.add(impossible);
        clickables.x = this.game.world.centerX-20;
        clickables.y = this.game.world.centerY+20;

        clickables.align(1,-1,possible.width,possible.height);
        this.game.world.bringToTop(clickables);

    }

    createButton(text,easy){
        let style = { font: "50px Comic", fill: 0, align: "center" };
        let btn = this.game.add.text(0, 0, text, style);
        btn.inputEnabled = true;
        btn.anchor.x = 0.5;
        btn.anchor.y = 0.5;

        Signals.signalToObservable(btn.events.onInputDown,btn,this).subscribe(()=>{
            this.game.state.start("gameState", true, false,easy);
        });


        return btn;
    }
    

}