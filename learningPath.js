console.log("lalala")

var Papa = require('babyparse');
var fs = require('fs');
var file = 'data/domain_order.csv';

var content = fs.readFileSync(file, { encoding: 'binary' });
Papa.parse(content, {
    step: function(row){
        console.log("Row: ", row.data);
    }
});