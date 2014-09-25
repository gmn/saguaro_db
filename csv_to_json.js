#!/usr/bin/env node
'use strict';
var filename = 'SAC Deep Sky Database 8.1.csv';
var fs = require( 'fs' );
var csv = fs.readFileSync( filename, {encoding:'utf8',flag:'r'} );
var print = function(s) { console.log( s + "\n" ); };
var print_json = function(s) { console.log( JSON.stringify(s) ); };

var str_ary = csv.split( "\n" );
var obj_ary = [];
var headers = str_ary[0].split(',');
for ( var i = 1, l = str_ary.length; i < l; i++ ) {
  var o = {};
  var a = str_ary[i].split(',');
  for ( var j = 0; j < a.length; j++ ) {
    o[ headers[j] ] = a[j];
  }
  obj_ary.push( o );
}
print_json( obj_ary );
