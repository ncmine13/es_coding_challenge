
var Papa = require('babyparse');
var fs = require('fs');
var file1 = 'data/domain_order.csv';
var file2 = 'data/student_tests.csv';



var types = ['RF', 'RL', 'RI', 'L'];
// var studentStrings = [];
var grade = [];
var topic = [];


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
		for(var i=1;i<studentInfo.length;i++){
			testInfo.push([studentInfo[i]])
		}
		testArray.push(testInfo)
	}
});

for(var i=0;i<grade.length;i++){
	grade[i].splice(1, 0, topic[i])
}

var producePlan = function(student){
	var newArr =[];
	for(var i=0;i<student.length;i++){
		if(student[i][0] === 'K'){
			student[i][0] = 0;
		}
		newArr.push([
			student[i][0],
			types[i]
		]);
		// student[i] = [student[i], types[i]]
		// student[i].splice(1, 0, types[i])
	}
	// console.log(newArr, "newArr")
	var slicedGrade = grade.slice();
	var currGrade = 0;
	var currTopic = "";
	var initialPlan = [];
	var plan = [];
	for(var i=0;i<student.length;i++){
		currGrade = parseInt(newArr[i][0]);
		currTopic = newArr[i][1];
		// console.log(currTopic, "currTopic")
		// console.log(currGrade, "currGrade")
		for(var j=0;j<slicedGrade.length;j++){
			if((slicedGrade[j][0] < currGrade) && (currTopic === slicedGrade[j][1])){
				slicedGrade[j] = "nada";
				// console.log(slicedGrade, "this is slicedGrade")
			} 
		}
	}
	for(i=0;i<slicedGrade.length;i++){
		if(slicedGrade[i] != ["nada"]){
			initialPlan.push(slicedGrade[i].join(""))
		}
	}
	for(var i=0;i<5;i++){
		var n = initialPlan[i];
		plan.push(n)
	}
	console.log(plan, "this is the plan")
}




function initiateApp(){
	console.log(testArray.length)
	for(var i = 0; i < testArray.length; i++){
		producePlan(testArray[i])
		//console.log(testArray[i])
	}
}

initiateApp()

