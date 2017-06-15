var Papa = require('babyparse');
var fs = require('fs');
var file1 = 'data/domain_order.csv';
var file2 = 'data/student_tests.csv';
var domainOrderFile = fs.readFileSync(file1, { encoding: 'binary' });
var studentTestFile = fs.readFileSync(file2, { encoding: 'binary' });

var domainHeaders = [];
var learningPlan = [];
var domainList = [];
var students = [];
var testArray = [];


Papa.parse(domainOrderFile, {
    step: function(row){
    	var rowData = row.data[0];
    	var gradeLevel = rowData[0];
    	rowData.shift();
    	for(i=0; i<rowData.length; i++){
    		learningPlan.push([gradeLevel])
    		domainList.push(rowData[i]);
    	}
    }
});



Papa.parse(studentTestFile, {
	header: true,
	step: function(row){
		var rowData = row.data[0];
		var studentTestInfo = [];
		testInfo = [];
		headers = [];
		for(key in rowData){
			studentTestInfo.push(rowData[key]);
			headers.push(key);
		}
		for(var i=1;i<studentTestInfo.length;i++){
			testInfo.push([studentTestInfo[i]]);
		}
		testArray.push(testInfo);
		students.push(studentTestInfo[0])
		for(i = 1; i < headers.length; i++){
			if(domainHeaders.length < headers.length - 1) {
				domainHeaders.push(headers[i]);
			}
		}
	}
});


function producePlan(student){
	var learninglearningPlanCopy = learningPlan.slice();
	var expStudent =[];
	var currGrade = 0;
	var currTopic = "";
	var plan = [];
	for(var i=0;i<student.length;i++){
		expStudent.push([
			student[i][0],
			domainHeaders[i]
		]);
	}
	for(var i=0;i<student.length;i++){
		currGrade = parseInt(expStudent[i][0]);
		currTopic = expStudent[i][1];
		for(var j=0;j<learningPlanCopy.length;j++){
			if(learningPlanCopy[j][0] === 'K'){
				learningPlanCopy[j][0] = 0;
			}
			if((learningPlanCopy[j][0] < currGrade) && (currTopic === learningPlanCopy[j][1])){
				learningPlanCopy[j] = "nada";
			} 
		}
	}
	for(i=0;i<learningPlanCopy.length;i++){
		if((plan.length < 5) && (learningPlanCopy[i] !== "nada") && (learningPlanCopy[i] !== undefined)) {
			if(learningPlanCopy[i][0] === 0){
				learningPlanCopy[i][0] = 'K';
			}
			plan.push(learningPlanCopy[i].join("."));
		}
	}
	process.stdout.write(plan.join(", ") + "\n");
}



function initiateApp(){
	for(var i=0;i<learningPlan.length;i++){
		learningPlan[i].splice(1, 0, domainList[i])
	}
	for(var i = 0; i < testArray.length; i++){
		process.stdout.write(students[i] + ": ");
		producePlan(testArray[i]);
	}
}


initiateApp();


module.exports = {
	initiateApp: initiateApp,
	producePlan: producePlan,
	learningPlan: learningPlan,
	testArray: testArray,
	students: students,
	domainHeaders: domainHeaders,
	domainList: domainList
}

