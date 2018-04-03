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
        number(num) {
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
        decimal() {
            if (this.decimalPresent === false) {
                if (this.oper === "") {
                    this.display += ".";
                } else {
                    // allow for a decimal for the second operand
                    const secDec = this.display;
                    if ( /(\+|\-|x|\/)\d{1,}$/.test(secDec) )  {
                        this.display += ".";
                    } else {
                        // add a leading '0' for second operand
                        this.display += "0.";
                    }
                }
                this.decimalPresent = true;
            }
        },
        operator(op) {
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
            } else if (this.oper !== "") {
                // CHAIN CALCULATIONS by performing a calc on the two given operands
                //      before going onto the next
                let isNumberAfterOp = this.display;
                if (! /(\+|\-|x|\/)$/.test(isNumberAfterOp) ) {
                    this.equals();
                }
            }
        },
        equals() {
            // strip first operand and operator, also decimals if present
            let x = this.display;
            this.secondOp = x.replace(/\-{0,1}\d{1,}\.{0,}\d{0,}(\+|\-|x|\/)/, "");

            this.display = calculate(this.firstOp, this.secondOp, this.oper);
            this.oper = "";
        },
        allClear() {
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
