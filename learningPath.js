
var Papa = require('babyparse');
var fs = require('fs');
var file = 'data/domain_order.csv';

var sampleStudent = [['5'],['5'],['5'],['2']]
var types = ['RF', 'RL', 'RI', 'L'];
var studentStrings = [];
var grade = [];
var topic = [];
var plan = [];

var content = fs.readFileSync(file, { encoding: 'binary' });
Papa.parse(content, {
    step: function(row){
    	var rowData = row.data[0];

    	var gradeLevel = rowData[0];
    	var row1 = rowData[1];
    	if((gradeLevel) === 'K') {
    		gradeLevel = '0';
    	}
    	rowData.shift();
    	for(i=0; i<rowData.length; i++){
    		grade.push([gradeLevel])
    	}
    	for(i=0; i<rowData.length;i++){
    		topic.push(rowData[i])
    	}
    }
});

for(i=0;i<grade.length;i++){
	grade[i].splice(1, 0, topic[i])
}
for(i=0;i<sampleStudent.length;i++){
	sampleStudent[i].splice(1, 0, types[i])
}


console.log(sampleStudent, "this is sample student")

var producePlan = function(input){
	console.log(input);
	var slicedGrade = grade.slice();
	var currGrade = "";
	var currTopic = ""
	for(i=0;i<input.length;i++){
		currGrade = input[i][0];
		currTopic = input[i][1];
		for(j=0;j<slicedGrade.length;j++){
			if((currTopic === slicedGrade[j][1]) && (currGrade === slicedGrade[j][0]))   {
				slicedGrade[j] = "la";
			}
		}
	}
	console.log(slicedGrade)
}

console.log(grade, "these are the grades");

producePlan(sampleStudent)




// ['0RF', '0RL', '0RI', '1RF', '1RL', '1RI', '2RF', '2RI', '2RL', '2L', '3RF', '3RL', '3RI', '3L', '4RI', '4RL', '4L', '5RI', '5RL', '5L', '6RI', '6RL' ]


//with sample student:
	//sort through 1-4 in array and find lowest number;
	//get up to grade level in that category: (2L, 3L, 4L) 5RI, 5RL

//objective: take in data from both files and produce learning path based on students' current levels in 4 categories
//first:
	//check for lowest grade performance. assign levels up to where it might go past something they're already at
	//find lowest and start there 
	//want an output of 5; skip if it's lower than current grade level