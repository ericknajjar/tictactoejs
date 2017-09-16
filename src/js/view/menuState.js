export class GameState extends Phaser.State{ 
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

    }

}