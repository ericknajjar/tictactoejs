import {Point} from "../gameContext/point.js"
import {Player} from "../gameContext/player.js"
import {GameState} from "../gameContext/gameState.js"
import {Move} from "../gameContext/move.js"
import {CheckEquality} from "../equality.js"

let starterWins = [
    new Point(0,0),new Point(0,2),new Point(1,0),new Point(1,2),new Point(2,0)
];

let starterAlmostVictoirous = [
    new Point(0,0),new Point(0,2),new Point(1,0),new Point(1,2)
];

let secondWins = [
    new Point(0,0),new Point(0,2),new Point(1,0),new Point(1,2),new Point(2,1),new Point(2,2)
];

let draw = [new Point(1,1),new Point(0,0),new Point(0,1),
    new Point(2,1),new Point(0,2),new Point(2,0),
    new Point(1,0),new Point(1,2),new Point(2,2)];


describe("A GameState", function() {

    beforeEach(function() {
        jasmine.addCustomEqualityTester(CheckEquality);
      });

    it("when new should have 9 possible moves", function() {
        
        let gameState = new GameState (Player.X);
                
        expect(gameState.PossibleMoves.length).toEqual(9);
        
    });

    it("should have 8 possible moves after first move", function() {
        
        let gameState = new GameState (Player.X);

        gameState = gameState.PickAMove (gameState.PossibleMoves[0]);
                
        expect(gameState.PossibleMoves.length).toEqual(8);
        
    });

    it("should remove an already played move", function() {
        
        let gameState = new GameState (Player.X);

        let move = gameState.PossibleMoves [0];

        gameState = gameState.PickAMove (move);

        let notContains = gameState.PossibleMoves.find( (m) => {
            
            return m.equals(move);
            
        }) == undefined;
                
        expect(notContains).toEqual(true);
        
    });

    it("when new should have all possible moves", function() {
        
        let gameState = new GameState (Player.X);
        let points = [];

        for (let i = 0; i < 3; ++i) 
        {
            for (let j = 0; j < 3; ++j) 
            {
                points.push ( new Point(i,j));
            }
        }

        let reminder =  gameState.PossibleMoves.filter((move)=>{

            return points.find((point)=> {return point.equals(move.Target);}) == undefined;
        });

        expect(reminder.length).toEqual(0);
            
    });

    it("should change cell owner on pick a move", function() {
        
        let gameState = new GameState (Player.X);
        
        let move = gameState.PossibleMoves [0];

        gameState = gameState.PickAMove (move);

        let owner = gameState.getPlayer(move.Target);
                
        expect(owner).toEqual(Player.X);
        
    });

    it("should change cell owner to current player on pick a move", function() {
        
        let gameState = new GameState (Player.O);
        
        let move = gameState.PossibleMoves [0];

        gameState = gameState.PickAMove (move);

        let owner = gameState.getPlayer(move.Target);
                
        expect(Player.O).toEqual(owner);
        
    });

    it("should change turn on pick a move", function() {
        
        let gameState = new GameState (Player.X);
        
        let move = gameState.PossibleMoves [1];

        gameState = gameState.PickAMove (move);
                
        expect(Player.O).toEqual(gameState.CurrentPlayer);
        
    });

    it("should let X win", function() {
        
        let gameState = new GameState (Player.X);
        
        starterWins.forEach((target)=>{

            gameState = gameState.PickAMove (new Move (target));
        });
                
        expect(gameState.VictoryState.Winner).toEqual(Player.X);
        
    });

    it("should let O win", function() {
        
        let gameState = new GameState (Player.O);
        
        starterWins.forEach((target)=>{

            gameState = gameState.PickAMove (new Move (target));
        });
                
        expect(gameState.VictoryState.Winner).toEqual(Player.O);
        
    });

    it("should let second player win as O", function() {
        
        let gameState = new GameState (Player.X);
        
        secondWins.forEach((target)=>{

            gameState = gameState.PickAMove (new Move (target));
        });
                
        expect(gameState.VictoryState.Winner).toEqual(Player.O);
        
    });

    it("should let second player win as X", function() {
        
        let gameState = new GameState (Player.O);
        
        secondWins.forEach((target)=>{

            gameState = gameState.PickAMove (new Move (target));
        });
                
        expect(gameState.VictoryState.Winner).toEqual(Player.X);
        
    });

    it("should not let anyone win after single move", function() {
        
        let gameState = new GameState (Player.X);
        
     
        gameState = gameState.PickAMove (new Move (secondWins[0]));
        
        expect(gameState.VictoryState.Winner).toEqual(Player.None);
        
    });

    it("should not let anyone win after single move", function() {
        
        let gameState = new GameState (Player.X);
        let move = new Move(new Point(0,0));
     
        gameState = gameState.PickAMove (move);

        expect( ()=>{gameState.PickAMove (move);} ).toThrow();
        
    });

    it("when new should have no winner", function() {
        
        let gameState = new GameState (Player.X);
                
        expect(gameState.VictoryState.Winner).toEqual(Player.None);
        
    });

    it("should draw", function() {
        
        let gameState = new GameState (Player.X);
        let alwaysNone = true;

        for(let i=0;i<draw.length;++i)
        {
            let target = draw[i];
            gameState = gameState.PickAMove (new Move (target));

            alwaysNone = alwaysNone && gameState.VictoryState.Winner.equals (Player.None);
            if (!alwaysNone) {
                fail(gameState.VictoryState.Winner+" should not have won");
                break;
            }
            
        }
                
        expect(gameState.PossibleMoves.length).toEqual(0);
        
    });

    it("should contain the winning move", function() {
        
        let gameState = new GameState (Player.X);
        
        starterAlmostVictoirous.forEach((target)=>{

            gameState = gameState.PickAMove (new Move (target));
        });
              
        let theMove = new Move(new Point(2,0));

        let contains = gameState.PossibleMoves.find ((e)=>{return e.equals(theMove);}) != undefined;
        expect(contains).toEqual(true);
        
    });

    it("should never contain an already played move", function() {
        
        let gameState = new GameState (Player.X);
    
        for(let i=0;i<draw.length;++i)
        {
            let target = draw[i];
            var move = new Move (target);
            gameState = gameState.PickAMove (move);

            let contains = gameState.PossibleMoves.find ((e)=>{return e.equals(move);}) != undefined;
            if (contains) {
                fail ("should not contain move "+move);
                break;
            }
            
        }
                
    });

});
