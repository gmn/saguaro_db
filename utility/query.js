
//"use strict";

var queryable = require( '../../queryable/queryable.js' );
var db = queryable.open( "Saguaro_Deep_Sky_queryable_db.json" );

var res = db.find( { type:"GALXY","mag":{$lte:11.5},"dec_deg":{$gt:0} } ).sort( {mag:1} );

res.print();
console.log( res.length + " results, mag <= 11.5" );


var res = db.find( { type:"GALXY", "dec_deg":{$gt:0} } );
console.log( res.length + " total results, declination > 0\n-----------------\n" );

var res = db.find( { type:"GALXY", "dec_deg":{$gt:0}, "mag":{$lt:10} } );
console.log( res.length + " results, mag < 10" );

var total = 0;
for ( var mag = 0; mag < 19; mag++ )
{
  var min = mag;
  var max = min + 1;

  // can't have duplicate keys in strict mode
  db.find( { type:"GALXY", "dec_deg":{$gt:0}, "mag":{$gte:min,$lt:max} } ,
    function(res) {
      total += res.length;
      console.log( total + "\t" + res.length + " results, mag >= " + min + ' && mag < ' + max );
    }
  );
}

res = db.distinct( 'type' );
res.rows.forEach( function(row){
  process.stdout.write( row.type + ', ' );
});
console.log( ' ' );

res = db.distinct( 'con' );
res.rows.forEach( function(row){
  process.stdout.write( row.con + ', ' );
});
console.log( ' ' );

