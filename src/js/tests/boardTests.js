import {Board} from "../gameContext/board.js"
import {VictoryState} from "../gameContext/victoryState.js"
import {Player} from "../gameContext/player.js"
import {CheckEquality} from "../equality.js"
import {Point} from "../gameContext/point.js"

describe("A Board", function() {
  beforeEach(function() {
    jasmine.addCustomEqualityTester(CheckEquality);
  });

    it("when empty has no winner", function() {
      let board = new Board();

      expect(VictoryState.Indetermined).toEqual(board.VictoryState);
    });

    it("is immutable", function() {
      let board = new Board();
      let pos = new Point(0, 0);
      let newBoard = board.SetCellOwner (Player.X,pos);

      expect(board.getPlayer(pos)).toEqual(Player.None);
    });

    
    it("has winner on the first row", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X,new Point(0, 0));
			board = board.SetCellOwner (Player.X, new Point(1, 0));
      board = board.SetCellOwner (Player.X, new Point (2, 0));
      
      expect(board.VictoryState.Winner).toEqual(Player.X);
    });

    it("has winner on the first column", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X,new Point(0, 0));
			board = board.SetCellOwner (Player.X, new Point(0, 1));
      board = board.SetCellOwner (Player.X, new Point (0, 2));
      
      expect(board.VictoryState.Winner).toEqual(Player.X);
    });

    it("has winner on the second column", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X,new Point(1, 0));
			board = board.SetCellOwner (Player.X, new Point(1, 1));
      board = board.SetCellOwner (Player.X, new Point (1, 2));
      
      expect(board.VictoryState.Winner).toEqual(Player.X);
    });

    it("has winner on the left to right diagonal", function() {
      let board = new Board();
      
      board = board.SetCellOwner (Player.O,new Point  (0, 0));
			board = board.SetCellOwner (Player.O, new Point (1, 1));
      board = board.SetCellOwner (Player.O, new Point (2, 2));
      board = board.SetCellOwner (Player.X, new Point (0, 1));
      board = board.SetCellOwner (Player.X, new Point (0, 2));
      
      expect(board.VictoryState.Winner).toEqual(Player.O);
    });

    it("has winner on the right to left diagonal", function() {
      let board = new Board();
      
      board = board.SetCellOwner (Player.O,new Point  (2, 0));
			board = board.SetCellOwner (Player.O, new Point (1, 1));
      board = board.SetCellOwner (Player.O, new Point (0, 2));
      board = board.SetCellOwner (Player.X, new Point (2, 1));
      board = board.SetCellOwner (Player.X, new Point (2, 2));
      
      expect(board.VictoryState.Winner).toEqual(Player.O);
    });

    it("has no winner when the first row is mixed", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X, new Point(0, 0));
			board = board.SetCellOwner (Player.O, new Point(1, 0));
			board = board.SetCellOwner (Player.X, new Point(2, 0));
			board = board.SetCellOwner (Player.X, new Point(0, 1));
      
      expect(board.VictoryState.Winner).toEqual(Player.None);
    });

    it("has no winner when the second row is mixed", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X, new Point(0, 1));
			board = board.SetCellOwner (Player.O, new Point(1, 1));
			board = board.SetCellOwner (Player.X, new Point(2, 1));
			board = board.SetCellOwner (Player.X, new Point(0, 2));
      
      expect(board.VictoryState.Winner).toEqual(Player.None);
    });

    it("has no winner when the second column is mixed", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X, new Point(1, 0));
			board = board.SetCellOwner (Player.O, new Point(1, 1));
			board = board.SetCellOwner (Player.X, new Point(1, 2));
			board = board.SetCellOwner (Player.X, new Point(2, 2));
      
      expect(board.VictoryState.Winner).toEqual(Player.None);
    });

    it("has no winner", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X, new Point(0, 0));
			board = board.SetCellOwner (Player.O, new Point(1, 0));
			board = board.SetCellOwner (Player.X, new Point(1, 1));
      
      expect(board.VictoryState.Winner).toEqual(Player.None);
    });

  });