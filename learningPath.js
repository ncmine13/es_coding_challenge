
var Papa = require('babyparse');
var fs = require('fs');
var file = 'data/domain_order.csv';

var sampleStudent = [5,5,5,2]
min = Math.min.apply(Math, sampleStudent)
console.log(min, "this is min");

var levels = [];

var content = fs.readFileSync(file, { encoding: 'binary' });
Papa.parse(content, {
    step: function(row){
    	var rowData = row.data[0];
    	var gradeLevel = rowData[0];
    	rowData.shift();
    	for(i=0; i<rowData.length; i++){
    		var j = rowData[i].split("");
    		j.unshift(gradeLevel);
    		var k = j.join("");
    		levels.push(k);
    	}
    }
});

console.log(levels, "these are the levels");

//with sample student:
	//sort through 1-4 in array and find lowest number;
	//get up to grade level in that category: (2L, 3L, 4L) 5RI, 5RL

//objective: take in data from both files and produce learning path based on students' current levels in 4 categories
//first:
	//check for lowest grade performance. assign levels up to where it might go past something they're already at
	//find lowest and start there 
	//want an output of 5; skip if it's lower than current grade level