// global function to take in two strings, convert them to numbers, and
//  return the result based on the operator
function calculate(firstOperand, secondOperand, operator) {
    firstOperand  = Number(firstOperand);
    secondOperand = Number(secondOperand);
    let result = 0;

    switch (operator) {
        case ("+"):
            result = firstOperand + secondOperand;
            break;
        case("-"):
            result = firstOperand - secondOperand;
            break;
        case("x"):
            result = firstOperand * secondOperand;
            break;
        case("/"):
            result = firstOperand / secondOperand;
            break;
        default:
            throw "calculate Error!!";
    }

    return result;
}

var Calc = new Vue({
    el: '#calculator',
    data: {
        display: "0",
        firstOp: "",
        secondOp: "" ,
        op: ""
    },
    methods: {
        number: function(num) {
            // no leading '0'
            if (this.display === "0") {
                this.display = "";
            }
            return this.display += num;
        },
        operator: function(op) {
            this.firstOp = this.display;
            this.op = op;
            return this.display += op;
        },
        equals: function() {
            this.secondOp = this.display;

            // put the calculate fn here?
            return this.display;
        }
    }

});

//console.log(calculate("50", "2.02", "*"));
// 101
