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
        oper: ""
    },
    methods: {
        number: function(num) {
            // no leading '0'
            if (this.display === "0") {
                this.display = "";
            // clear display to start next calculation if user hasn't hit AC
            } else if (this.secondOp !== "") {
                this.secondOp = "";
                this.display = "";
            }
            this.display += num;
        },
        operator: function(op) {
            // add test here if display is calculated, perform additional operations on
            //  that result
            if (this.secondOp !== "") {
                // this display is the prev calculation!
                this.firstOp = this.display;
                this.secondOp = "";
            // otherwise, starting with new calculation
            } else {
                this.firstOp = this.display;
            }
            this.oper = op;
            this.display += op;
        },
        equals: function() {
            let x = this.display;
            // strip first operand and operator
            this.secondOp = x.replace(/\d{1,}(\+|\-|x|\/)/g, "");

            this.display = calculate(this.firstOp, this.secondOp, this.oper);
        },
        allClear: function() {
            this.display = "0";
        }
    }

});

/* TODO: compute a chain of operators, or reject multiple operators
 */
