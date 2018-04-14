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

    // b/c of javscript conversions to binary,
    //    we want floating point to make  a bit more sense
    // could use .toFixed for decimals, but introduces rounding errors
    //    --feature anyway?
    return result.toPrecision(8);
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
                    // allows for secondOp to have decimal place
                    this.decimalPresent = false;
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
        /*
         *posNeg() {
         *    // entering frist operand
         *    if (this.firstOp === "") {
         *        if (/^\-{1}/.test(this.display)) {
         *            this.display = this.display.slice(1);
         *        } else if (this.display !== "0") {
         *            this.display = "-";
         *        }
         *    } else if (this.oper !== "") {
         *        // TODO:  +/- for second operand
         *        // remove - when no numbers have been pressed for second operand
         *        if (/(\+|\-|x|\/)\-{1}/g.test(this.display)) {
         *            this.display = this.display.replace(/\-{1}/, "");
         *        } else {
         *            // add -
         *            // TODO: bug when adding '-' after digit(s) have been entered
         *            //          adds the digit(s) and the '-'...
         *            this.display += this.display.substr(
         *                this.display.lastIndexOf(this.oper) + 1) + "-";
         *        }
         *    }
         *    // TODO: also change sign of first operand?
         *},
         */
        operator(op) {
            // take care of any lingering decimal that has no digits after it in first operand
            if (/\.$/.test(this.display)) {
                this.display = this.display.substring(0, this.display.length - 1);
            }
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
                // to allow decimal place for second operand
                this.decimalPresent = false;
            } else if (this.oper !== "") {
                //CHAIN CALCULATIONS by performing a calc on the two given operands
                //   before going onto the next
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

            // prevent throw error from calculate()
            if (this.firstOp !== "" && this.secondOp !== "" && this.oper !== "") {
                this.display = calculate(this.firstOp, this.secondOp, this.oper);
                this.oper = "";
            }
            // reset decimalPresent based on result
            if (/\./g.test(this.display)) {
                this.decimalPresent = true;
            } else {
                this.decimalPresent = false;
            }
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
                if (/(\+|\-|x|\/).$/.test(this.display)) {
                    this.display =
                        this.display.substr(0, this.display.lastIndexOf(this.oper) + 1);
                    this.decimalPresent = false;
                } else {
                    /* only the operator has been pressed */
                    this.oper = "";
                    this.display = this.display.replace(/(\+|\-|x|\/)$/, "");
                    // test to see if first operand has a decimal and set flag appropriately
                    if (/\.{1}/g.test(this.firstOp)) {
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
 * need to pretty the output that javascript math does >:|
 * add +/- to change positive and negative values:
 *
 */
