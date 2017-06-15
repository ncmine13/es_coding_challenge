var Papa = require('babyparse');
var fs = require('fs');
var json2csv = require('json2csv');
var fields = ['name', 'plan'];
var file1 = 'data/domain_order.csv';
var file2 = 'data/student_tests.csv';
var domainOrderFile = fs.readFileSync(file1, { encoding: 'binary' });
var studentTestFile = fs.readFileSync(file2, { encoding: 'binary' });


var planToCsv = [];
var reducedPlanToCsv = [];
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
		var testInfo = [];
		var headers = [];
		for(key in rowData){
			studentTestInfo.push(rowData[key]);
			headers.push(key);
		}
		students.push(studentTestInfo[0]);
		studentTestInfo.shift();
		testArray.push(studentTestInfo);
		for(i = 1; i < headers.length; i++){
			if(domainHeaders.length < headers.length - 1) {
				domainHeaders.push(headers[i]);
			}
		}
	}
});


function producePlan(testInfo){
	var learningPlanCopy = learningPlan.slice();
	var indStudentInfo =[];
	var currGrade = 0;
	var currDomain = "";
	var individualizedPlan = [];
	for(var i=0;i<testInfo.length;i++){
		indStudentInfo.push([
			testInfo[i][0],
			domainHeaders[i]
		]);
		currGrade = parseInt(indStudentInfo[i][0]);
		currDomain = indStudentInfo[i][1];
		for(var j=0;j<learningPlanCopy.length;j++){
			if(learningPlanCopy[j][0] === 'K'){
				learningPlanCopy[j][0] = 0;
			}
			if((learningPlanCopy[j][0] < currGrade) && (currDomain === learningPlanCopy[j][1])){
				learningPlanCopy[j] = "nada";
			} 
		}
	}	
	for(var i=0;i<learningPlanCopy.length;i++){
		if((individualizedPlan.length < 5) && (learningPlanCopy[i] !== "nada") && (learningPlanCopy[i] !== undefined)) {
			if(learningPlanCopy[i][0] === 0){
				learningPlanCopy[i][0] = 'K';
			}
			individualizedPlan.push(learningPlanCopy[i].join("."));
		}
	}
	planToCsv.push({plan: individualizedPlan.join(", ")})
	process.stdout.write(individualizedPlan.join(", ") + "\n");
}


function initiateProgram(){
	for(var i=0;i<learningPlan.length;i++){
		learningPlan[i].splice(1, 0, domainList[i])
	}
	for(var i = 0; i < testArray.length; i++){
		planToCsv.push({name: students[i]});
		process.stdout.write(students[i] + ": ");
		producePlan(testArray[i]);
		var reducedObject = planToCsv.reduce(function(result, currentObject) {
		    for(var key in currentObject) {
		        if (currentObject.hasOwnProperty(key)) {
		            result[key] = currentObject[key];
		        }
		    }
		    return result;
		}, {});
		reducedPlanToCsv.push(reducedObject)
	}
	createCSV();
}

function createCSV() {
	var csv = json2csv({ data: reducedPlanToCsv, fields: fields});

	fs.writeFile('learning-plan.csv', csv, function(err) {
	  if (err) throw err;
	  console.log('file saved');
	});
}


initiateProgram();


module.exports = {
	initiateProgram: initiateProgram,
	producePlan: producePlan,
	learningPlan: learningPlan,
	testArray: testArray,
	students: students,
	domainHeaders: domainHeaders,
	domainList: domainList
}

