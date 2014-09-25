
"use strict";

var filename = 'SAC\ Deep\ Sky\ Database\ 8.1.json';
var fs = require('fs');
var JSON = fs.readFileSync( filename, {encoding:'utf8',flag:'r'} );

var queryable = require( '../queryable/queryable.js' );
var db = queryable.open( {db_name:"Saguaro_Deep_Sky_queryable_db.json",data:JSON,db_dir:'./'} );



/*
  for every row in the table convert these fields to float
  otherwise, sort works alphabetically, producing wrong results
*/

/*
    "ra_hr": "12",
    "ra_min": "28.5",
    "dec_deg": "17",
    "dec_min": "5",
    "mag": "10.1",
    "subr": "13.2",
    "urano": "148",
    "ti": "13",
    "size_max": "5.4m",
    "size_min": "4.1m",
    "pa": "175",
*/
var fix = ['ra_hr','ra_min','dec_deg','dec_min','mag','subr','urano','ti','pa'];

var m = db.master;
for ( var i = 0, l = m.length; i < l; i++ ) 
{
  var o = m[i];

  var sm = 'size_max'; 
  if ( o[sm] && o[sm].trim().length > 0 ) {
    o[sm+'_arcmin'] = parseFloat( o[sm].replace('m','') );
  }
  delete o[sm];
  sm = 'size_min';
  if ( o[sm] && o[sm].trim().length > 0 ) {
    o[sm+'_arcmin'] = parseFloat( o[sm].replace('m','') );
  }
  delete o[sm];
    
  for ( var j = 0; j < fix.length; j++ ) 
  {
    if ( o[fix[j]] && o[fix[j]].trim().length > 0 )
      o[ fix[j] ] = parseFloat( o[fix[j]] );
  }
}

db.save();


