var Board = function(columns, rows) {
  this.slots = {};
  this.currentPlayer = 'red';
  this.winner = null;
  if (columns && rows) { this.build(columns, rows) }; 
}
