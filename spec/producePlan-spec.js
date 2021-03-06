var producePlan = require('../learningPath.js');
var intercept = require("intercept-stdout")

describe("The produce plan function", function(){
	it("should correctly predict learning plan", function(){
		var studentTestsArray = [[[ '2' ], [ '3' ], [ 0 ], [ '3' ]]];
		var student = studentTestsArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt).toEqual("K.RI, 1.RI, 2.RF, 2.RI, 3.RF\n");
		});

		producePlan.producePlan(student);
		logInterceptor(); 
	});
	it("should produce a plan that starts at the lowest level if there are no scores available for a given student", function(){
		var studentTestsArray = [[]];
		var student = studentTestsArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt).toEqual("K.RF, K.RL, K.RI, 1.RF, 1.RL\n");
		});

		producePlan.producePlan(student);
		logInterceptor();
	});
	it("should produce a learning path with no more than five units", function(){
		var studentTestsArray = [[ [ 0 ], [ '2' ], [ 0 ], [ '4' ] ]];
		var student = studentTestsArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt.split(" ").length).toEqual(5);
		});

		producePlan.producePlan(student);
		logInterceptor();
	});
	it("can make a plan with less than five units if the student has mastered all necessary content", function(){
		var studentTestsArray = [[[ '6' ], [ '6' ], [ '6' ], [ '6' ] ]];
		var student = studentTestsArray[0];
		var logInterceptor = intercept(function(txt){
			expect(txt.split(" ").length).toBeLessThan(5);
		});

		producePlan.producePlan(student);
		logInterceptor();
	});
	it("works with string value 'K' representing Kindergarten input data", function(){
		var studentTestsArray = [[ [ 'K' ], [ '2' ], [ 'K' ], [ '4' ] ]];
		var student = studentTestsArray[0];

		var logInterceptor = intercept(function(txt){
			expect(txt).toEqual("K.RF, K.RI, 1.RF, 1.RI, 2.RF\n");
		});

		producePlan.producePlan(student);
		logInterceptor();
	})
})



