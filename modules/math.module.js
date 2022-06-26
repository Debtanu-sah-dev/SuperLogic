// Constants

const E = Math.E;
const PI = Math.PI;
const HALF_PI = Math.PI / 2;
const QUARTER_PI = Math.PI / 4;
const THREE_QUARTER_PI = Math.PI * .75;
const TWO_PI = Math.PI * 2;
const SQRT2 = Math.SQRT2;
const SQRT1_2 = Math.SQRT1_2;
const LN2 = Math.LN2;
const LN10 = Math.LN10;
const LOG2E = Math.LOG2;
const LOG10E = Math.LOG10E;

// abs
function abs(number) {
    return Math.abs(number);
}

// acos
function acos(number) {
    return Math.acos(number);
}

// acosh
function acosh(number) {
    return Math.acosh(number);
}

// asin
function asin(number) {
    return Math.asin(number);
}

// asinh
function asinh(number) {
    return Math.asinh(number);
}

// atan
function atan(number) {
    return Math.atan(number);
}

// atan2
function atan2(number) {
    return Math.atan2(number);
}

// atanh
function atanh(number) {
    return Math.atanh(number);
}

// cbrt
function cbrt(number) {
    return Math.cbrt(number);
}

// ceil
function ceil(number) {
    return Math.ceil(number);
}

// clz32
function clz32(number) {
    return Math.clz32(number);
}

// cos
function cos(number) {
    return Math.cos(number);
}

// cosh
function cosh(number) {
    return Math.cosh(number);
}

// exp
function exp(number) {
    return Math.exp(number);
}

// expm1
function expm1(number) {
    return Math.expm1(number);
}

// floor
function floor(number) {
    return Math.floor(number);
}

// fround
function fround(number) {
    return Math.fround(number);
}

// hypot
function hypot(number) {
    return Math.hypot(number);
}

// imul
function imul(number) {
    return Math.imul(number);
}

// log
function log(number) {
    return Math.log(number);
}

// log1p
function log1p(number) {
    return Math.log1p(number);
}

// log2
function log2(number) {
    return Math.log2(number);
}

// log10
function log10(number) {
    return Math.log10(number);
}

// max
function max(number) {
    return Math.max(number);
}

// min
function min(number) {
    return Math.min(number);
}

// pow
function pow(number) {
    return Math.pow(number);
}

// random
function random(number) {
    return Math.random(number);
}

// round
function round(number) {
    return Math.round(number);
}

// sign
function sign(number) {
    return Math.sign(number);
}

// sin
function sin(number) {
    return Math.sin(number);
}

// sinh
function sinh(number) {
    return Math.sinh(number);
}

// sqrt
function sqrt(number) {
    return Math.sqrt(number);
}

// tan
function tan(number) {
    return Math.tan(number);
}

// tanh
function tanh(number) {
    return Math.tanh(number);
}

// trunc
function trunc(number) {
    return Math.trunc(number);
}


// **Calculate Aspect Rational Companion**

function CARC(width, height, widthOrHeight, what = "width") {
    if ("width" == what) {
        return (widthOrHeight / width) * height
    } else if ("height" == what) {
        return (widthOrHeight / height) * width
    }
}

// **Add Number**

function AN(num1, num2) {
    function reverseToArray(str) {
        let arr = []
        for (let i = str.length - 1; i >= 0; i--) {
            arr.push(parseInt(str[i]))
        }
        return arr;
    }

    function splitNumber(number) {
        let numstr = number + "";
        return [parseInt(numstr[1]), parseInt(numstr[0])];
    }

    let carry = [0];
    let num1arr = reverseToArray(num1);
    let num2arr = reverseToArray(num2);
    let answerArray = [];

    if (num1arr.length > num2arr.length) {
        carry = new Array(num1arr.length).fill(0)
        answerArray = new Array(num1arr.length).fill(0)
        while (num1arr.length != num2arr.length) {
            num2arr.push(0)
        }
    }

    if (num2arr.length > num1arr.length) {
        carry = new Array(num2arr.length).fill(0)
        answerArray = new Array(num2arr.length).fill(0)
        while (num2arr.length != num1arr.length) {
            num1arr.push(0)
        }
    }

    for (let i = 0; i < num1arr.length; i++) {
        let addedNumber = (num1arr[i] + num2arr[i] + carry[i])
        if (i < num1arr.length - 1) {
            if (addedNumber > 9) {
                let splitNumberValue = splitNumber(addedNumber);
                answerArray[i] = splitNumberValue[0]
                carry[i + 1] = splitNumberValue[1]
            } else {
                answerArray[i] = addedNumber
            }
        } else {
            if (addedNumber > 9) {
                let splitNumberValue = splitNumber(addedNumber);
                answerArray[i] = splitNumberValue[0]
                answerArray.push(splitNumberValue[1])
            } else {
                answerArray[i] = addedNumber
            }
        }
    }

    return answerArray.reverse().join("");
}

/**
 * * Factorial
 * ? With No Limit
 * * Uses Big Int When Factorial Goes Above (2^53 - 1) or Goes Below -(2^53 - 1) Which Is Limit Of Noraml JS Integers
 */

function FACTORIALnl(number) {
    let arr = new Array(number).fill(0);
    for (let i = 1; i <= number; i++) {
        arr[i - 1] = i
    }

    let val = arr.reduce((acc, curr) => {
        return acc * curr
    }, 1);

    if (val == Infinity) {
        for (let i = 1; i <= number; i++) {
            arr[i - 1] = BigInt(i)
        }

        val = arr.reduce((acc, curr) => {
            return acc * curr
        }, 1n);
    }

    return val
}

/**
 * * Factorial
 * ? With Limit
 * * Does Not Uses Big Int And Stays below (2^53 - 1) or Goes Above -(2^53 - 1) Which Is Limit Of Noraml JS Integers Or Else Diverges To Infinity
 */

function FACTORIAL(number) {
    let arr = new Array(number).fill(0);
    for (let i = 1; i <= number; i++) {
        arr[i - 1] = i
    }

    let val = arr.reduce((acc, curr) => {
        return acc * curr
    }, 1);

    return val
}

class Formula {
    constructor(sumstring) {
        this.sumstring = sumstring;
    }

    solve(scope = {}) {
        let str = this.sumstring;
        for (let c in scope) {
            str = str.replaceAll(c, scope[c])
        }

        return eval(str)
    }
}

class Equation {
    constructor(equation) {
        this.equation = equation
    }

    isTrue(scope) {
        let q = this.equation;

        if(scope == null){
            let map = {};
            let vars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
            for (let c in vars) {
                map[vars[c]] = parseInt(c)+1;
            }
            
            for(let c in map){
                if(q.toLowerCase().includes(c)){
                    q = q.replaceAll(c,map[c]);
                }
            }
        }
        else{
            for (let c in scope) {
                q = q.replaceAll(c, scope[c])
            }
        }

        let qs = q.split("=");

        let q1 = qs[0].trim();
        let q2 = qs[1].trim();
        return eval(q1) == eval(q2)
    }
}