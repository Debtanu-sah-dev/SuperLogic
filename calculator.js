// let name = new Component("name", (args,props,name,element,index,array) => {

// });

let operators = [
    {
        label:"+",
        replacer:"+",
        keyboard:true,
        not:false
    },
    {
        label:"-",
        replacer:"-",
        keyboard:true,
        not:false
    },
    {
        label:"×",
        replacer:"*",
        key:true,
        keyboard:true,
        not:false
    },
    {
        label:"÷",
        replacer:"/",
        key:true,
        keyboard:true,
        not:false
    },
    {
        label:"^",
        replacer:"**",
        keyboard:true,
        not:false
    },
    {
        label:".",
        replacer:".",
        keyboard:true,
        not:false
    },
    {
        label:"π",
        replacer:"PI",
        not:true
    },
    {
        label:"e",
        replacer:"E",
        keyboard:true,
        not:true
    },
    {
        label:"(",
        replacer:"(",
        keyboard:true,
        not:true
    },
    {
        label:")",
        replacer:")",
        keyboard:true,
        not:true
    },
];
let calculator = new Component("calculator", (args,props,name,element,index,array) => {
    let wrapper = newElement("div");
    let number = newElement("div");
    let operator = newElement("div");
    let text = newElement("p");
    let equal_button = newElement("button");
    equal_button.text("=");
    let clearAll = newElement("button");
    clearAll.text("CA");
    let backspace = newElement("button");
    backspace.text("<");
    wrapper.add(text);
    wrapper.add(number);
    wrapper.add(operator);
    function isOperator(string){
        let operatorsfilter = operators.filter(e => !e.not)
        for(e of operatorsfilter){
            if(e.label == string){
                return true;
            }
        }

        return false;
    }
    function addLetterToP(element){
        if(isOperator(text.innerText[text.innerText.length - 1] ?? 0) && isOperator(element.innerText)) return
        if((text.innerText.length == 0) && isOperator(element.innerText)) return
        text.addText(element.innerText)
    }
    function addKeyBoardOperation(){
        let operatorsfilter = operators.filter(e => e.keyboard)
        for(let e of operatorsfilter){
            function addToP(){
                if(text.innerText == "Infinity"){
                    text.innerText = ""
                }
                if(text.innerText == "NaN"){
                    text.innerText = ""
                }
                let p = newElement("p");
                p.innerText = e.label;
                addLetterToP(p)
            }
            if(e.key){
                when(e.replacer,addToP);
            }
            else{
                when(e.label,addToP);
            }
        }
    }
    addKeyBoardOperation();
    function AddNumber(i){
        let button = newElement("button");
        button.innerText = i
        button.click(() => {
            if(text.innerText == "Infinity"){
                text.innerText = ""
            }
            if(text.innerText == "NaN"){
                text.innerText = ""
            }
            addLetterToP(button)
        })
        when((i+""), () => {
            if(text.innerText == "Infinity"){
                text.innerText = ""
            }
            if(text.innerText == "NaN"){
                text.innerText = ""
            }
            addLetterToP(button)
        })
        number.add(button)
        if(i%3 == 0){
            let br = newElement("br")
            number.add(br)
        }
    }
    for(let i = 1; i <= 9; i++){
        AddNumber(i)
        // number.innerHTML += `<button>${i}</button>`
        // if(i%3 == 0){
        //     number.innerHTML += "<br />"
        // }
    }
    AddNumber(0)
    for(e of operators){
        let operation = newElement("button");
        operation.innerText = e.label;
        operation.click(() => {
            if(text.innerText == "Infinity"){
                text.innerText = ""
            }
            if(text.innerText == "NaN"){
                text.innerText = ""
            }
            addLetterToP(operation)
        })
        operator.add(operation)
    }
    equal_button.click(() => {
        let string = text.innerText;

        for(e of operators){
            string = string.replaceAll(e.label,e.replacer);
        }

        text.innerText = eval(string)
    })
    when("enter", (e) => {
            let string = text.innerText;

            for(i of operators){
                string = string.replaceAll(i.label,i.replacer);
            }

            text.innerText = eval(string);
    })
    clearAll.click(()=> {
        text.innerText = ""
    });
    when(["C","c"], (e) => {
            text.innerText = ""
    })
    backspace.click(()=> {
        text.innerText = text.innerText.slice(0, text.innerText.length - 1);
    });
    when("Backspace", (e) => {
        text.innerText = text.innerText.slice(0, text.innerText.length - 2);
    })
    operator.add(equal_button)
    operator.add(backspace)
    operator.add(clearAll)
    return wrapper
});
calculator.init()