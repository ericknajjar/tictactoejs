import {CheckEquality} from "../equality.js"
import {Point} from "../gameContext/point.js"
import {BoardVictoryAnalyser} from "../gameContext/boardVictoryAnalyser.js"

function ContainsOnly(analyser,strategies){
    
        let all = BoardVictoryAnalyser.AllStrategies;
        let only = true;
    
        let others = all.filter(function(item) { 
            return strategies.find((e)=>{
                return e.equals(item);

            }) == undefined;
        });


        for (let i = 0; i < strategies.length; i++)
        {
            only = only && analyser.Contains (strategies[i]);
        }

        for (let i = 0; i < others.length; i++)
        {
            only = only && !analyser.Contains (others[i]);
        }
     
        return only;
}

describe("The VictoryAnalyser", function() {
beforeEach(function() {
    jasmine.addCustomEqualityTester(CheckEquality);
});

    it("should contain the right check strategies for Point(0,0) ", function() {

        let analyser = new BoardVictoryAnalyser (new Point(0,0));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.FirstColumn,BoardVictoryAnalyser.FirstRow,BoardVictoryAnalyser.LeftRightDiagonal]);
        
        expect(containsOnly).toBe(true);

    });

    it("should contain the right check strategies for Point(0,1)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(0,1));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.FirstColumn,BoardVictoryAnalyser.SecondRow]);
        
        expect(containsOnly).toBe(true);
        
    });

    it("should contain the right check strategies for Point(0,2)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(0,2));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.FirstColumn,BoardVictoryAnalyser.ThirdRow,BoardVictoryAnalyser.RightLeftDiagonal]);
        
        expect(containsOnly).toBe(true);
        
    });

    it("should contain the right check strategies for Point(1,0)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(1,0));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.SecondColumn,BoardVictoryAnalyser.FirstRow]);
        
        expect(containsOnly).toBe(true);
        
    });

    it("should contain the right check strategies for Point(1,1)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(1,1));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.SecondColumn,BoardVictoryAnalyser.SecondRow,
					BoardVictoryAnalyser.RightLeftDiagonal,BoardVictoryAnalyser.LeftRightDiagonal]);
        
        expect(containsOnly).toBe(true);
        
    });

    it("should contain the right check strategies for Point(1,2)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(1,2));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.SecondColumn,BoardVictoryAnalyser.ThirdRow]);
        
        expect(containsOnly).toBe(true);
        
    });

    it("should contain the right check strategies for Point(2,0)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(2,0));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.ThirdColumn,BoardVictoryAnalyser.FirstRow,BoardVictoryAnalyser.RightLeftDiagonal]);
        
        expect(containsOnly).toBe(true);
        
    });

    it("should contain the right check strategies for Point(2,1)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(2,1));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.ThirdColumn,BoardVictoryAnalyser.SecondRow]);
        
        expect(containsOnly).toBe(true);
        
    });

    it("should contain the right check strategies for Point(2,2)", function() {
        
        let analyser = new BoardVictoryAnalyser (new Point(2,2));
        
        let containsOnly = ContainsOnly(analyser,
                [BoardVictoryAnalyser.ThirdColumn,BoardVictoryAnalyser.ThirdRow,BoardVictoryAnalyser.LeftRightDiagonal]);
        
        expect(containsOnly).toBe(true);
        
    });
   

});

