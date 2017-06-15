var initiateProgram = require('../learningPath.js');

describe("The initiation function", function(){
	it("should populate grade array with topics", function() {
		var plan = initiateProgram.learningPlan;
		expect(plan[0][0]).not.toBe(undefined);
	});
	it("should have access to student test data", function(){
		var testArray = initiateProgram.testArray;
		expect(testArray[0]).not.toBe(undefined);
	})
})