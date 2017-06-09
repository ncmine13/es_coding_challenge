var Papa = require('babyparse');
var fs = require('fs');
var file1 = 'data/domain_order.csv';
var file2 = 'data/student_tests.csv';
var domainOrder = fs.readFileSync(file1, { encoding: 'binary' });
var studentTests = fs.readFileSync(file2, { encoding: 'binary' });

var types = [];
var grade = [];
var topic = [];
var students = [];
var testArray = [];


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



Papa.parse(studentTests, {
	header: true,
	step: function(row){
		var rowData = row.data[0];
		var studentInfo = [];
		testInfo = [];
		category = [];
		for(key in rowData){
			studentInfo.push(rowData[key])
		}
		for(key in rowData){
			category.push(key);
		}	
		students.push(studentInfo[0])
		for(var i=1;i<studentInfo.length;i++){
			testInfo.push([studentInfo[i]]);
		}
		testArray.push(testInfo);
		for(i = 1; i < category.length; i++){
			if(types.length < category.length - 1) {
				types.push(category[i])
			}
		}
	}
});
console.log(types)


function producePlan(student){
	var slicedGrade = grade.slice();
	var expStudent =[];
	var currGrade = 0;
	var currTopic = "";
	var plan = [];
	for(var i=0;i<student.length;i++){
		if(student[i][0] === 'K'){
			student[i][0] = 0;
		}
		expStudent.push([
			student[i][0],
			types[i]
		]);
	}
	for(var i=0;i<student.length;i++){
		currGrade = parseInt(expStudent[i][0]);
		currTopic = expStudent[i][1];
		for(var j=0;j<slicedGrade.length;j++){
			if((slicedGrade[j][0] < currGrade) && (currTopic === slicedGrade[j][1])){
				slicedGrade[j] = "nada";
			} 
		}
	}
	for(i=0;i<slicedGrade.length;i++){
		if(plan.length < 5) {
			if(slicedGrade[i] != ["nada"]){
				if(slicedGrade[i] !== undefined){
					plan.push(slicedGrade[i].join("."))
				}
			}
		}
	}
	process.stdout.write(plan.join(", ") + "\n");
}



function initiateApp(){
	for(var i=0;i<grade.length;i++){
		grade[i].splice(1, 0, topic[i])
	}
	for(var i = 0; i < testArray.length; i++){
		process.stdout.write("Learning plan for " + students[i] + ": ");
		producePlan(testArray[i]);
	}
}


initiateApp();


module.exports = {
	initiateApp: initiateApp,
	producePlan: producePlan,
	grade: grade,
	testArray: testArray,
	students: students,
	types: types,
	topic: topic
}

