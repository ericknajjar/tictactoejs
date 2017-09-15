
export class GameState extends Phaser.State{ 
    constructor() {
        super();
    }

    preload(){

        this.game.load.image('background', 'assets/img/background2.jpg');
        this.game.load.atlasJSONHash('grid', 'assets/img/grid.png', 'assets/img/grid.json');
        

    }

    create(){

        let background = this.game.add.image(0, 0, 'background');
        let grid = this.game.add.sprite(400, 300, 'grid', 'frame1.png');
        grid.anchor.x = 0.5;
        grid.anchor.y = 0.5;
        grid.scale.setTo(2,2);
        grid.animations.add('loop');

        grid.animations.play('loop', 15, true);

        background.scale.setTo(0.5,0.5);
    }

    
}