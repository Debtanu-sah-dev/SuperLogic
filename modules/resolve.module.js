let resolves = document.querySelectorAll("resolve");

for(let e of resolves){
    let code = e.innerText;
    e.style.display = "none"
    if(!e.hasAttribute("@no")){
        window.eval(code);
        if(e.hasAttribute("@forever")){
            setInterval(() => {
                eval(e.innerText);
            },parseInt(e.getAttribute("@forever")) ?? 0)
        }
    
        if(e.hasAttribute("@for")){
            let array = JSON.parse(`[${e.getAttribute("@for")}]`)
            for(let i = 1; i <= array[0]; i++){
                setTimeout(() => {
                    eval(e.innerText);
                },(array[1] ?? 0)*i)
            }
        }
    }
}

class Resolve{
    constructor(option = {},callback = () => {},defaultParams = []){
        this.option = option;
        this.callback = callback;
        this.defaultParams = defaultParams;
        if(!this.option.no){
            this.callback(...this.defaultParams)
            if(this.option.forever !== null){
                setInterval(() => {
                    this.callback(...this.defaultParams)
                },this.option.forever ?? 0)
            }
            else if(this.option["for"] !== null){
                let array = this.option["for"];
                for(let i = 1; i <= array[0]; i++){
                    setTimeout(() => {
                        this.callback(...this.defaultParams)
                    },(array[1] ?? 0)*i)
                }
            }
        }
    }

    resolve(){
        if(arguments.length === 0){
            this.callback(...this.defaultParams)
        }
        else{
            this.callback(...arguments)
        }
    }

    resolveForever(time){
        setInterval(() => {
            this.callback(...this.defaultParams)
        },time)
    }

    resolveFor(times,time){
        for(let i = 1; i <= times; i++){
            setTimeout(() => {
                this.callback(...this.defaultParam)
            },(time ?? 0)*i)
        }
    }

    get(){
        return this.callback
    }

    setDefaultParameters(){
        this.defaultParams = (arguments.length === 1) && Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments)
    }
}

function range(start,end){
    if(end){
        return new Array(end - start + 1).fill(start).map((e,i) => e+i)
    }
    else{
        return new Array(start).fill(0).map((e,i) => i)
    }
}

function rangeI(start,end){
    if(end){
        return new Array(end - start).fill(start).map((e,i) => e+i)
    }
    else{
        return new Array(start).fill(0).map((e,i) => i)
    }
}