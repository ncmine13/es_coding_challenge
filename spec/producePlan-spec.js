var producePlan = require('../learningPath.js');
var intercept = require("intercept-stdout")

describe("The produce plan function", function(){
	it("should correctly predict learning plan", function(){
		var testArray = [[[ '2' ], [ '3' ], [ 0 ], [ '3' ]]];
		var student = testArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt).toEqual("0.RI, 1.RI, 2.RF, 2.RI, 3.RF\n");
		});

		producePlan.producePlan(student);
		logInterceptor();
	});

	it("should produce a plan that starts at the beginning if there are no scores available for a given student", function(){
		var testArray = [[]];
		var student = testArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt).toEqual("0.RF, 0.RL, 0.RI, 1.RF, 1.RL\n");
		});

		producePlan.producePlan(student);
		logInterceptor();

	});
	it("should produce a learning path with no more than five units", function(){
		var testArray = [[ [ 0 ], [ '2' ], [ 0 ], [ '4' ] ]];
		var student = testArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt.split(" ").length).toEqual(5);
		});

		producePlan.producePlan(student);
		logInterceptor();

	});
	it("can make a plan with less than five units if the student has completed all others", function(){
		var testArray = [[[ '6' ], [ '6' ], [ '6' ], [ '6' ] ]];
		var student = testArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt.split(" ").length).toBeLessThan(5);
		});

		producePlan.producePlan(student);
		logInterceptor();
	});
})



