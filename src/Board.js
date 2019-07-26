// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // get board at row index set to variable
      // use higher order function any to determine if 'some' of the elements equal one. 
      // return result of higher order function 
      // console.log( board.get(rowIndex)
      //       .some( ele => ele === 1) );
      return this.get(rowIndex).reduce( (acc,curr) => acc + curr, 0) > 1 ? true : false;
      // return this.get(rowIndex).some( ele => ele === 1);

// var total = [ 0, 1, 2, 3 ].reduce(
//   ( accumulator, currentValue ) => accumulator + currentValue,
//   0
// );

      // console.log(board.get(rowIndex));
      // return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get all rows of board and set to variable
      // return array with high order funciton
      // if any of rows has row conflict, return true

      let arr2d = this.rows();

      for (let i=0; i < arr2d.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme <-- fixed
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // set rows of board to variable
      // loop though variable
        // if array[i][colIndex] === 1
         // return true
      // if no true is found return false
      return this.rows().reduce( (acc,curr) => acc + curr[colIndex], 0) > 1;
      // return this.rows().some( row => row[colIndex] === 1);
         // return this.get(rowIndex).reduce( (acc,curr) => acc + curr, 0) > 1 ? true : false;

      // return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // set rows of board to variable
      // loop through variable 
        // if element is equal to 1, return true
      for (let i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var myBoard = this.rows();
      // console.log(`majDiagColIdxatFirstRow is ${majorDiagonalColumnIndexAtFirstRow}`);
      // return this.rows().reduce( (acc,curr) => acc + curr[colIndex], 0) > 1 ? true : false;
      let count = 0;
      let md = majorDiagonalColumnIndexAtFirstRow
      for (let i = 0; i < myBoard.length; i++) {
         if (md > myBoard.length) {
          break;
         }
         if (myBoard[i][md] === 1) {
           count++;
         }
         md++;
      }
      return count > 1; 

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // set the variable called array set this.rows
      // will do a for loop, and we will pass in at i
      // do an if statement inside loop return true
      // if for loop doesn't return true, return false.
      let arr = this.rows();
      for (let i = -(arr.length - 1); i < arr.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // set the 2d array called this.rows that duplicates the board
      let twoDArr = this.rows();
      // set a count variable initialized to zero that will increment
      let count = 0;
      let md = minorDiagonalColumnIndexAtFirstRow;
      // iterate through the array 
      for (let i = 0; i < twoDArr.length; i++){
        // check each element along the minor diagonal and 
    
        if(twoDArr[i][md-i] === 1){
          // console.log(twoDArr[i][md-i], 'after minus')
          // increment the counter if the element is equal to 1
          count++
        }
        
      }
      // return whether the counter is 2 
      return count > 1;
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // varaible named arr and set to board
      let arr = this.rows();
      // look through arr with changing the breaking condition to be arr.length plus arr.length minus one
      for (let i = 0; i < arr.length + (arr.length - 1); i++){
        // if there is a minor diagonal conflict (the function runs true)
        if (this.hasMinorDiagonalConflictAt(i)){
          // return true
          return true;
        }
      }
      // if we do not find any true staments in the for loop
      // return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
