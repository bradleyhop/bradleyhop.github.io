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

    // need to floor the result for floating point numbers
    return result;
}

var Calc = new Vue({
    el: '#calculator',
    data: {
        display        : "0",
        firstOp        : "",
        secondOp       : "",
        oper           : "",
        decimalPresent : false
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
        decimal: function() {
            if (this.decimalPresent === false) {
                if (this.oper === "") {
                    this.display += ".";
                } else {
                    //const secDec = this.display;
                    //if (secDec.test(/(\+|\-|x|\/)\d{1,}/g, "") === false) {
                        this.display += "0."; // add a leading '0' for second operand
                    //} else {
                        //this.display += ".";
                    //}
                }
                this.decimalPresent = true;
            }
        },
        operator: function(op) {
            // only accept one operator at a time
            if (this.oper === "") {
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
                // allows for secondOp to have decimal place
                this.decimalPresent = false;
            }
        },
        equals: function() {
            // strip first operand and operator, also decimals if present
            let x = this.display;
            this.secondOp = x.replace(/\-{0,1}\d{1,}\.{0,}\d{0,}(\+|\-|x|\/)/, "");

            this.display = calculate(this.firstOp, this.secondOp, this.oper);
            this.oper = "";
        },
        allClear: function() {
            this.display = "0";
            this.oper = "";
            this.decimalPresent = false;
        }
    }
});

/* TODO:
 *
 * compute a chain of operators?
 * need to pretty the output that javascript math does >:|
 * add +/- to change positive and negative values:
 *      BUG: adding a leading 0 to a decimal on second operand only makes sense if no
 *              other number has been pressed before it...
 *
 */
