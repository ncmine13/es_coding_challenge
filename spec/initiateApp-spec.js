var initiateApp = require('../learningPath.js');

describe("The initiation function", function(){
	it("should populate grade array", function() {
		var grade = initiateApp.grade;
		expect(grade[0][0]).not.toBe(undefined);
	});
	it("should have access to student test data", function(){
		var testArray = initiateApp.testArray;
		expect(testArray[0]).not.toBe(undefined);
	})
})