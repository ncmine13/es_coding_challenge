
var Papa = require('babyparse');
var fs = require('fs');
var file1 = 'data/domain_order.csv';
var file2 = 'data/student_tests.csv';


var sampleStudent = [['1'],['1'],['1'],['K']]
var types = ['RF', 'RL', 'RI', 'L'];
var studentStrings = [];
var grade = [];
var topic = [];
var plan = [];

var domainOrder = fs.readFileSync(file1, { encoding: 'binary' });
Papa.parse(domainOrder, {
    step: function(row){
    	var rowData = row.data[0];
    	var gradeLevel = rowData[0];
    	if((gradeLevel) === 'K') {
    		gradeLevel = 0;
    	}
    	rowData.shift();
    	for(i=0; i<rowData.length; i++){
    		grade.push([parseInt(gradeLevel)]);
    		topic.push(rowData[i])
    	}
    }
});



// console.log(testArray)

var producePlan = function(input){
	for(i=0;i<grade.length;i++){
	grade[i].splice(1, 0, topic[i])
	}
	for(i=0;i<sampleStudent.length;i++){
		sampleStudent[i].splice(1, 0, types[i])
	}
	var slicedGrade = grade.slice();
	var currGrade = 0;
	var currTopic = ""
	var initialPlan = []
	for(i=0;i<input.length;i++){
		currGrade = parseInt(input[i][0]);
		currTopic = input[i][1];
		for(j=0;j<slicedGrade.length;j++){
			if((slicedGrade[j][0] < currGrade) && (currTopic === slicedGrade[j][1])){
				slicedGrade[j] = "nada"
			}
		}
	}
	for(i=0;i<slicedGrade.length;i++){
		if(slicedGrade[i] != ["nada"]){
			initialPlan.push(slicedGrade[i].join(""))
		}
	}
	for(i=0;i<5;i++){
		var n = initialPlan[i];
		plan.push(n)
	}
	console.log(plan, "this is the plan")
}



var students = [];
var testArray = [];
var studentTests = fs.readFileSync(file2, { encoding: 'binary' });
Papa.parse(studentTests, {
	header: true,
	step: function(row){
		var rowData = row.data[0];
		var studentInfo = [];
		testInfo = [];
		for(key in rowData){
			studentInfo.push(rowData[key])

		}
		students.push(studentInfo[0])
		for(i=1;i<studentInfo.length;i++){
			testInfo.push([studentInfo[i]])
		}
		testArray.push(testInfo)
	}
});



console.log(testArray, "this is the test array")
for(i=0;i<testArray.length;i++){
	sampleStudent = testArray[i];
	console.log(sampleStudent, "this is sample")
}


producePlan(sampleStudent)


