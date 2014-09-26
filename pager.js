// basic table pager

// namespace
var ctable = (function(ctable){

    // keep track of built tables
    var ctables = [];

    function CRow()
    {
        this.sort_col = 0;
        this.data = [];
        this.sort = [];
    }

    CRow.prototype = 
    {
        add: function(  val, sort_special ) {
            this.data.push( val );
            if ( arguments.length > 1 && sort_special ) {
                this.sort.push( sort_special ); // if set, sort by this instead of data
            }
            else
                this.sort.push( null );
        }
    };

    function CTable( json, style )
    {
        this.cur_row = -1;
        this.rows = [];
        this.headers = [];
        this.pad_output = true; // not using
        this.id = this.auto_id();
        this['class'] = null;
        this['parent'] = null;
        this.direction = []; // true is descending

        // for table wide definitions:
        // structure, can be any of: { "table":{},"th":{},"tr":{},"td":{} } 
        this.styles = {}; 


        if ( json ) {
            this.loadJSON(json);
        }
        if ( style ) {
            this.loadCSS(style);
        }

        ctables.push(this);        
        this.index = ctables.length - 1;
    }

    CTable.prototype = 
    {
        new_row: function() {
            this.rows.push( new CRow() );
            ++this.cur_row;
        },

        // adds one column at a time, assumes user calls new_row() 
        add: function ( val, spec )
        {
            if ( this.cur_row === -1 ) {
                this.new_row();
            }
            this.rows[this.cur_row].add( val, spec );
        },

        // sets an entire row. calls new_row() itself
        add_row: function( ary ) 
        {
            if ( ary instanceof Array ) {
                this.new_row();
                var that = this;
                ary.forEach(function(x) {
                    if ( x instanceof Array )
                        that.rows[that.cur_row].add(x[0],x[1]); // sort is passed by JSON as length==2 Array
                    else
                        that.rows[that.cur_row].add(x);
                });
            }
            else /* failover to add() if not Array */
            {
                this.add.apply(arguments);
            }
        },

        dprint: function( spacing, xtra ) {
            var s = spacing ? spacing : ' ';
            this.rows.forEach(function(row) {
                console.log( row.data.join( s ) );
            });
            if ( xtra )
                console.log( xtra );
        },

        html: function( header ) {
            if ( this.direction.length === 0 ) { // late loading
                var n = 0;
                this.rows.forEach(function(row) {
                    if ( row.length > n )
                        n = row.length; // set as many directions as the longest row
                });
                var i = 0;
                while ( i++ < n ) 
                    this.direction.push(true);
            }
            var ts = this.getStyle( 'table' );
            var id = ' id="'+this.id+'"';
            var c = this['class'] ? ' class="'+this['class']+'"' : '';
            // allow explicitly set styles to trump Object styles
            var s = header ? '<table'+id+c+ts+' ' + header + " >\n" : "<table"+id+c+ts+">\n" ;
            s += this.innerHTML();
            return s + "</table>\n";
        },

        innerHTML: function() 
        {
            var s = '';
            var tr = this.getStyle('tr');

            // <th> row
            var th = this.getStyle('th');
            if ( this.headers.length > 0 ) 
                s += "  <tr"+tr+">\n";
            for ( var i = 0; i < this.headers.length; i++ ) {
                // is there a fundamental difference/reason why to use href="function()" over onclick="function()" ?

                //s += "    <th"+th+" onclick=\"sortCTable("+this.index+","+i+")\"><a href=\"javascript:void(0)\">"+this.headers[i]+"</a></th>\n";
                // header can be either array of strings, or array of objects of fmt: {title:url_title,name:string}
                if ( typeof this.headers[i] === "object" )
                    s += "    <th"+th+"><a href=\"javascript:sortCTable("+this.index+","+i+")\" title=\""+this.headers[i].title+"\">"+this.headers[i].name+"</a></th>\n";
                else
                    s += "    <th"+th+"><a href=\"javascript:sortCTable("+this.index+","+i+")\">"+this.headers[i]+"</a></th>\n";
            }
            if ( this.headers.length > 0 ) 
                s += "  </tr>\n";

            // <tr><td> rows
            var td = this.getStyle('td');
            this.rows.forEach(function(row) {
                s += "  <tr"+tr+">\n";
                row.data.forEach(function(col) {
                    s += "    <td"+td+">"+col+"</td>\n";
                } );
                s += "  </tr>\n";
            });

            return s;
        },

        sort_by: function( col, desc ) 
        {
            var direction = desc ? -1 : 1;

            this.rows.sort(function(a,b) 
            {
                // sort by these when they are (optionally) set
                var sorting = ( a.sort[col] && b.sort[col] ) ? 'sort' : 'data';

                if ( typeof a[sorting][col] === "string" && typeof b[sorting][col] === "string" )
                    return a[sorting][col].localeCompare(b[sorting][col]) * direction;
                else
                    return a[sorting][col] > b[sorting][col] ? direction : -direction;
            });
        },

        loadJSON: function(j) {
            // structure. either are optional: { "table":[[]], "style":{}, "class":"" }
            //  OR
            // structure: { "table":{"th":[e,e,e],"tbody":[[a,b,c],[d,e,f]] }, "style":{}, "class":"" }
            if ( j && typeof j === 'string' ) 
                j = JSON.parse(j);
            
            if ( j && typeof j === 'object' && j.table ) {
                var table = j.table;
                var that = this;

                var rows = typeof table === "object" && table.tbody ? table.tbody : table;
                if ( rows instanceof Array ) {
                    rows.forEach(function(row){
                        that.add_row.call(that,row);
                    });
                }

                if ( typeof table === "object" && table.th ) 
                    this.headers = table.th;
            }

            if ( j && j.style ) {
                this.loadCSS(j.style);
            }

            if ( j && j['class'] ) {
                this['class'] = j['class'];
            }
        },

        loadCSS: function(style) {
            // structure, can be any of: { "table":{},"th":{},"tr":{},"td":{} }, for table wide definitions.
            // for specific rows & columns: { "x": ... err, not sure
            if ( typeof style === 'object' && (style.table || style.th || style.tr || style.td) )
                this.styles = style;
        },

        // get style information for a certain key, and format as => 'style="key1:val1;key2:val2;"'
        getStyle: function( elt ) {
            var c = '';
            if ( this.styles[elt] ) {
                var t = this.styles[elt];
                c = ' style="';
                for ( var i in t ) {
                    if ( t.hasOwnProperty(i) ) {
                        c += i+':'+t[i]+';';   
                    }
                }
                c += '"';
            }
            return c;
        },

        auto_id: function() 
        {
            function base_convert( num, base )
            {
                var HEX_LETTERS = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
                num = Math.floor(num) + '';
                var div = num;
                num = [];

                while ( div >= 1.0 ) {
                    var mod = Math.floor( div % base );
                    num.push( HEX_LETTERS[mod] );
                    div = div / base;
                }

                return num.reverse().join('');
            }
            var r = Math.floor(Math.random()*10000000);
            return '_T'+  base_convert( r, 16 );
        },

        toggleDirection: function ( c ) {   
            this.direction[c] = !this.direction[c];
            return this.direction[c];
        },

        setParent: function(p) {
            this['parent'] = p;
        }

    }; //CTable.prototype

    function sortCTable( index, col ) 
    {
        var table = this.ctables[index];
        table.sort_by(col, table.toggleDirection( col ) );
        if ( window.$ )
            $("#"+table.id).html( table.innerHTML() );
        else if ( table['parent'] ) 
            table['parent'].innerHTML = table.html();
    }

    ctable.CTable = CTable;
    ctable.CRow = CRow;
    ctable.sortCTable = sortCTable;

    try {
        if ( window ) {
            window.CTable = CTable;
            window.CRow = CRow;
            window.ctables = ctables;
        }
    } catch(e) { }

    return ctable;

})(typeof exports === "undefined" ? {} : exports);

var CTable = ctable.CTable;
var CRow = ctable.CRow;
var sortCTable = ctable.sortCTable;


/* test 1
var table = new CTable();
var a = 'a'.charCodeAt(0);
var dim = 5;
for ( var i = 0; i < dim; i++ ) {
    table.new_row();
    var end = a + dim;
    table.add( a++ );
    while ( a < end ) {
        table.add( String.fromCharCode(a++) );
    }
}
table.sort_by(0,true);
table.dprint();
console.log( "\n" + table.html() );
*/

/* test 2
var t2 = new CTable();
t2.add_row( [ 'a', 7, 'z', 1 ] );
t2.add_row( [ 'b', 6, 'y', 2 ] );
t2.add_row( [ 'c', 5, 'x', 3 ] );
t2.dprint(' ','');
t2.sort_by( 2 );
t2.dprint(' ','');
t2.sort_by( 3 );
t2.dprint(' ','');
t2.sort_by( 3, true );
t2.dprint(' ','');
*/

/* test 3
//var json = JSON.parse( '{"table":[[1,2,3,4],["a","b","c","d"]],"style":{"table":{"border":"2px dashed red","background-color":"#909"}}}' );
var json = JSON.parse('{"table":[[1,2,3,4],["a","b","c","d"]],"style":{"table":{"border":"2px dashed brown","padding":"10px"},"td":{"padding":"8px","font-weight":"bold","border":"1px solid #bbb"}}}' );
var t = new CTable(json);
console.log( "\n" + t.html() );
*/

// test 4
/*
var t = new CTable( '{"table":{"th":["one","two","three","four"],"tbody":[[1,2,"a","f","b"],[6,4,"c","d","e"]]},"style":{"table":{"border":"1px solid brown","padding":"3px","margin":"5px"},"td":{"padding":"8px","font-weight":"bold","border":"1px solid #bbb"},"th":{"font-style":"italic","font-weight":"normal"}},"class":"htable"}' );
console.log( "\n" + t.html() );
*/

/* test 5 - sortable
debugger;
var table = new CTable( '{"table":[[["<a href=\\"http://a.com/1\\">1</a>",1],2,"b"],[["<a href=\\"http://2\\">2</a>",2],3,"c"], [["<a href=\\"http://a.com/10\\">10</a>",10],1,"a"]] }' );
table.sort_by(0, table.toggleDirection( 0 ) );
console.log( "\n" + table.html() );
table.sort_by(0, table.toggleDirection( 0 ) );
console.log( "\n" + table.html() );
table.sort_by(0, table.toggleDirection( 0 ) );
console.log( "\n" + table.html() );
*/

