var producePlan = require('../learningPath.js');
var intercept = require("intercept-stdout")

describe("The produce plan function", function(){
	it("should correctly predict learning plan", function(){
		var testArray = [[[ '2' ], [ '3' ], [ 0 ], [ '3' ]]];
		var student = testArray[0];

		var logInterceptor = intercept(function(txt){
			expect(txt).toEqual("0RI, 1RI, 2RF, 2RI, 3RF\n");
		});
		
		producePlan.producePlan(student);
		logInterceptor();
	})
})