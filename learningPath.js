console.log("lalala")

var Papa = require('babyparse');
var fs = require('fs');
var file = 'data/domain_order.csv';

var kindergarten = [];

var content = fs.readFileSync(file, { encoding: 'binary' });
Papa.parse(content, {
	preview: 1,
    step: function(row){
    	var firstRow = row.data[0];
        kindergarten.push(firstRow)
        console.log(kindergarten, "kindergarten")
    }
});




//objective: take in data from both files and produce learning path based on students' current levels in 4 categories
//first:
	//check for lowest grade performance. assign levels up to where it might go past something they're already at
	//find lowest and start there 
	//want an output of 5; skip if it's lower than current grade level