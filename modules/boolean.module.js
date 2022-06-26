let yes = true;
let no = false;
let bit1 = true;
let bit0 = false;

function and(){
    let things = Array.from(arguments);
    if(arguments.length == 0){
        return false;
    }
    if(arguments.length == 1){
        return arguments[0];
    }
    return things.every(e => e == true);
}

function or(){
    let things = Array.from(arguments);
    if(arguments.length == 0){
        return false;
    }
    if(arguments.length == 1){
        return arguments[0];
    }
    return things.some(e => e == true);
}

function xor(){
    let things = Array.from(arguments);
    if(arguments.length == 0){
        return false;
    }
    if(arguments.length == 1){
        return false;
    }

    let alltrue = things.every(e => e == true)
    let allfalse = things.every(e => e == false)

    return  !(alltrue || allfalse);
}

function xnor(){
    return !xor(...arguments)
}

function nor(){
    return !or(...arguments);
}

function nand(){
    return !and(...arguments);
}

function not(a){
    return !a
}

function equal(){
    let things = Array.from(arguments);
    if(arguments.length == 0){
        return false;
    }
    if(arguments.length == 1){
        return true;
    }

    for(let i = 1; i < things.length; i++){
        if(!(things[0] == things[i])){
            return false;
        }
        else{
            continue;
        }
    }
    return true
}

function equalStrict(){
    let things = Array.from(arguments);
    if(arguments.length == 0){
        return false;
    }
    if(arguments.length == 1){
        return true;
    }

    for(let i = 1; i < things.length; i++){
        if(!(things[0] === things[i])){
            return false
        }
        else{
            continue;
        }
    }
    return true
}

class BooleanComponent{
    constructor(func,inputs = func.length){
        this.func = func;
        this.inputs = inputs
    }

    evalute(){
        return this.func(...arguments)
    }

    truthTable(value = this.inputs){
        let length = value;
        let func = this.func
        let inputsspace = [];

        for(let i = 0; i <= ((2 ** length)-1); i++){
            inputsspace.push(i)
        }

        inputsspace = inputsspace.map(function dec2bin(dec) {
            return (dec >>> 0).toString(2);
        })

        inputsspace = inputsspace.map((e) => {
            let str = "";
            if(e.length < length){
                for(let i = 1;i <= (length - e.length);i++){
                    str+="0"
                }
            }
            return str+e
        })

        inputsspace = inputsspace.map((e) => {
            let arr = [];
            for(let c of e){
                arr.push(c)
            }
            return arr
        })

        inputsspace = inputsspace.map((a) => {
            return a.map((e) => {
                if(e == "0"){
                    return false
                }
                else if(e == "1"){
                    return true
                }
            })
        })

        let outputsspace = inputsspace;

        outputsspace = outputsspace.map((e) => {
            return func(...e);
        })

        let table = [];
        
        for(let i = 0; i < inputsspace.length;i++){
            table.push({
                input:inputsspace[i],
                output:outputsspace[i]
            })
        }

        return table;
    }

    copy(){
        let comp = new BooleanComponent(this.func,this.inputs);
        return comp;
    }

    get(){
        return this.func;
    }

    set(func){
        this.func = func;
        return this;
    }
}