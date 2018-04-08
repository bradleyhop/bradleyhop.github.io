// global function to take in two strings, convert them to numbers, and
//  return the result as a string based on the operator
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

    return String(result);
}

var Calc = new Vue({
    el: "#calculator",
    data: {
        display        : "0",
        firstOp        : "",
        secondOp       : "",
        oper           : "",
        decimalPresent : false
    },
    methods: {
        number(num) {
            // no leading '0' after other numbers have been pressed on initial entry
            if (this.display === "0") {
                this.display = "";
                this.display += num;
            } else if (this.secondOp !== "") {
                // clear display to start next calculation if user hasn't hit AC
                this.secondOp = this.display = "";
                this.display += num;
            } else if (/(\+|\-|x|\/)\d{0}$/.test(this.display)) {
                //  no leading 0's for second operand
                if (num !== "0") {
                    this.display += num;
                }
            } else {
                this.display += num;
            }
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
        posNeg() {
            // entering frist operand
            if (this.firstOp === "") {
                if (/^\-{1}/.test(this.display)) {
                    this.display = this.display.slice(1);
                } else {
                    this.display = "-" + this.display;
                }
            } else if (this.oper !== "") {
                console.log("working on second operation");
            }
            // TODO:  +/- for second operand

        },
        operator(op) {
            /* only accept one operator at a time */
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
                 /*
                  *CHAIN CALCULATIONS by performing a calc on the two given operands
                  *     before going onto the next
                  */
                let isNumberAfterOp = this.display;
                if (! /(\+|\-|x|\/)$/.test(isNumberAfterOp) ) {
                    this.secondOp =
                        this.display.substr(this.display.lastIndexOf(this.oper) + 1);
                    this.display = calculate(this.firstOp, this.secondOp, this.oper);
                    this.firstOp = this.display;
                    this.display += op;
                    this.oper = op;
                    this.secondOp = "";
                }
            }
        },
        equals() {
            // strip first operand and operator, also decimals if present
            this.secondOp = this.display.substr(this.display.lastIndexOf(this.oper) + 1);

            this.display = calculate(this.firstOp, this.secondOp, this.oper);
            this.oper = "";
        },
        allClear() {
            this.display = "0";
            this.oper = this.firstOp = this.secondOp = "";
            this.decimalPresent = false;
        },
        clearEntry() {
            if (this.secondOp !== "") {
                /* calculation as been performed */
                this.allClear();
            } else if (this.oper !== "") {
                /* operator button has been pressed */

                // need to check if there's anything that was pressed after the operator
                const hasStuffAfterOper = this.display;
                if (/(\+|\-|x|\/)./.test(hasStuffAfterOper)) {
                    this.display =
                        this.display.substr(0, this.display.lastIndexOf(this.oper) + 1);
                    this.decimalPresent = false;
                } else {
                    /* only the operator has been pressed */
                    this.oper = "";
                    this.display = this.display.replace(/(\+|\-|x|\/)/, "");
                    // test to see if first operand has a decimal and set flag appropriately
                    const ceDecimal = this.firstOp;
                    if (/\.{1}/g.test(ceDecimal)) {
                        this.decimalPresent = true;
                    }
                }
            } else {
                /* first operator is being entered */
                this.firstOp = "";
                this.display = "0";
                this.decimalPresent = false;
            }
        },
    }
});

/* TODO:
 *
 * Clear Entry button implementation
 *
 * need to pretty the output that javascript math does >:|
 * add +/- to change positive and negative values:
 *
 * Chaining calculations is getting buggy
 *
 */
