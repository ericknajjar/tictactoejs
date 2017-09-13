import {Board} from "../js/gameContext/board.js"
import {VictoryState} from "../js/gameContext/victoryState.js"
import {Player} from "../js/gameContext/player.js"
import {CheckEquality} from "../js/equality.js"
import {Point} from "../js/gameContext/point.js"

describe("A Board", function() {
  beforeEach(function() {
    jasmine.addCustomEqualityTester(CheckEquality);
  });

    it("when empty has no winner", function() {
      let board = new Board();

      expect(VictoryState.Indetermined).toEqual(board.VictoryState);
    });

    
    it("has winner on the first row", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X,new Point(0, 0));
			board = board.SetCellOwner (Player.X, new Point(1, 0));
      board = board.SetCellOwner (Player.X, new Point (2, 0));
      
      expect(board.VictoryState.Winner).toEqual(Player.X);
    });

    /*it("break first row win", function() {
      let board = new Board();

      board = board.SetCellOwner (Player.X, new Point(0, 0));
			board = board.SetCellOwner (Player.O, new Point(1, 0));
			board = board.SetCellOwner (Player.X, new Point(2, 0));
			board = board.SetCellOwner (Player.X, new Point(0, 1));
      
      expect(board.VictoryState.Winner).toEqual(Player.None);
    });*/

  });
  /*
  [TestFixture]
	public class BoardTests
	{
		[Test]
		public void EmptyBoardHasNoWinner()
		{
			var board = new Board ();

			Assert.AreEqual (VictoryState.Indetermined, board.VictoryState);
		}

		[Test]
		public void FirstRow()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.X, Point.Make (0, 0));
			board = board.SetCellOwner (Player.X, Point.Make (1, 0));
			board = board.SetCellOwner (Player.X, Point.Make (2, 0));

			Assert.AreEqual (Player.X, board.VictoryState.Winner);
		}

		[Test]
		public void FirstRowOBreaks()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.X, Point.Make (0, 0));
			board = board.SetCellOwner (Player.O, Point.Make (1, 0));
			board = board.SetCellOwner (Player.X, Point.Make (2, 0));
			board = board.SetCellOwner (Player.X, Point.Make (0, 1));

			Assert.AreEqual (Player.None,board.VictoryState.Winner);
		}

		[Test]
		public void SecondRowOBreaks()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.X, Point.Make (0, 1));
			board = board.SetCellOwner (Player.O, Point.Make (1, 1));
			board = board.SetCellOwner (Player.X, Point.Make (2, 1));
			board = board.SetCellOwner (Player.X, Point.Make (0, 2));

			Assert.AreEqual (Player.None,board.VictoryState.Winner);
		}

		[Test]
		public void FirstColumn()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.X, Point.Make (0, 0));
			board = board.SetCellOwner (Player.X, Point.Make (0, 1));
			board = board.SetCellOwner (Player.X, Point.Make (0, 2));


			Assert.AreEqual (Player.X, board.VictoryState.Winner);
		}

		[Test]
		public void SecondColumn()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.X, Point.Make (1, 0));
			board = board.SetCellOwner (Player.X, Point.Make (1, 1));
			board = board.SetCellOwner (Player.X, Point.Make (1, 2));


			Assert.AreEqual (Player.X, board.VictoryState.Winner);
		}

		[Test]
		public void SecondColumnOBreaks()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.X, Point.Make (1, 0));
			board = board.SetCellOwner (Player.O, Point.Make (1, 1));
			board = board.SetCellOwner (Player.X, Point.Make (1, 2));
			board = board.SetCellOwner (Player.X, Point.Make (2, 2));

			Assert.AreEqual (Player.None,board.VictoryState.Winner);
		}

		[Test]
		public void LeftRightDiagonal()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.O, Point.Make (0, 0));
			board = board.SetCellOwner (Player.O, Point.Make (1, 1));
			board = board.SetCellOwner (Player.O, Point.Make (2, 2));
			board = board.SetCellOwner (Player.X, Point.Make (0, 1));
			board = board.SetCellOwner (Player.X, Point.Make (0, 2));

			Assert.AreEqual (Player.O,board.VictoryState.Winner);
		}

		[Test]
		public void RightLeftDiagonal()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.O, Point.Make (2, 0));
			board = board.SetCellOwner (Player.O, Point.Make (1, 1));
			board = board.SetCellOwner (Player.O, Point.Make (0, 2));
			board = board.SetCellOwner (Player.X, Point.Make (2, 1));
			board = board.SetCellOwner (Player.X, Point.Make (2, 2));

			Assert.AreEqual (Player.O, board.VictoryState.Winner);
		}

		[Test]
		public void NoVitory()
		{
			var board = new Board ();

			board = board.SetCellOwner (Player.X, Point.Make (0, 0));
			board = board.SetCellOwner (Player.O, Point.Make (1, 0));
			board = board.SetCellOwner (Player.X, Point.Make (1, 1));

			Assert.AreEqual (Player.None,board.VictoryState.Winner);
		}
}
*/