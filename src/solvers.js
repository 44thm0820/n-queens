/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var board = new Board({n:n});
  // //var solution = this.rows(); //fixme
  // // var solution = undefined; //fixme
  // // get the board and set it to a variable
  // var arr = board.rows();

  // // look through the array rows
  // for (var i = 0; i < arr.length; i++){
  //   // look through columns
  //   for(var j = 0; j < arr.length; j++){
  //     // set the array row column to 1 
  //     arr[i][j] = 1;
  //     // check whether it has any conflicts (row or column)
  //     if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()){
  //       // if it does set array row column back to zero
  //       arr[i][j] = 0;
  //     }
  //     // if theres no conflict leave array row column as one
  //   }
  // }
  // // return array
  // return arr

  var board = new Board({n:n});
  // get the board and set it to a variable
  var arr = board.rows();
  // look through the array rows
  for (var i = 0; i < arr.length; i++) {
      // each time set one of the elements of the row to 1 by using random function
        // One, set one of the elements of the row to 1 by using random function
    var j = Math.floor(Math.random() * arr.length );
    arr[i][j] = 1;
        // Two, check whether it has any conflicts (row or column)
        // if it has conflicts, reset that element to zero and 
        // use random function again
    while (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        // set array row column back to zero
        arr[i][j] = 0;
        // set one of the elements of the row to 1 by using random function
        j = Math.floor(Math.random() * arr.length );
        arr[i][j] = 1;
        // and loop back to trying again the same row, until no more conflicts exist
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(arr));
  return arr

  
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  // get the board and set it to a variable
  var arr = board.rows();
  // look through the array rows
  // for (var i = 0; i < arr.length; i++) {
  //     // each time set one of the elements of the row to 1 by using random function
  //       // One, set one of the elements of the row to 1 by using random function
  //   var j = Math.floor(Math.random() * arr.length );
  //   arr[i][j] = 1;
  //       // Two, check whether it has any conflicts (row or column)
  //       // if it has conflicts, reset that element to zero and 
  //       // use random function again
  //   while (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts() ) {
  //       // set array row column back to zero
  //       arr[i][j] = 0;
  //       // set one of the elements of the row to 1 by using random function
  //       j = Math.floor(Math.random() * arr.length );
  //       arr[i][j] = 1;
  //       // and loop back to trying again the same row, until no more conflicts exist
  //   }
  // }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(arr));
  return arr;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
