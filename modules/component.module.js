class Component{
    constructor(name,generaterFunction){
        this.name = name;
        this.generaterFunction = generaterFunction
    }

    init(){
        function isElement(o){
            return (
              typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
              o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
          );
        }

        let args = Array.isArray(arguments[0])?arguments[0]:arguments;
        let components = Array.from(document.querySelectorAll("component")).filter((e) => {
            return e.hasAttribute(`@${this.name.replace(/ /g,"-")}`)
        });
        components.forEach((e,i,a) => {
            let html = this.generaterFunction([...args],e.dataset,this.name,e,i,a);
            if(!isElement(html)){
                console.error(`${typeof html == "object" ? JSON.stringify(html) : `${html}`} Is Not Valid HTMLElement`)
                return false
            };
            e.innerHTML = ""
            e.appendChild(html)
        })
        return this;
    }

    static html(string){
        let a = document.createElement("div");
        a.innerHTML = string;
        let b = Array.from(a.querySelectorAll("*")).filter((element) => {
            return element.parentElement == a
        })
        if(b.length == 1){
            return a.firstElementChild
        }
        else{
            return a;
        }
    }

    generaterHtml(args,props,index){
        let components = Array.from(document.querySelectorAll("component")).filter((e) => {
            return e.hasAttribute(`@${this.name.replace(/ /g,"-")}`)
        });
        return this.generaterFunction(args,props,this.name,components[index],index,components);
    }

    change(generaterFunction){
        this.generaterFunction = generaterFunction;
    }

    initOn(indexOrElement = 0,args = []){
        let elem;
        let index = 0;
        let comps = Array.from(document.querySelectorAll("component")).filter((e) => {
            return e.hasAttribute(`@${this.name.replace(/ /g,"-")}`)
        });
        if(typeof indexOrElement == "number"){
            elem = comps[indexOrElement]
            index = indexOrElement
        }
        else{
            elem = indexOrElement;
            for(e in comps){
                if(comps[e] == elem){
                    index = e;
                }
            }
        }

        function isElement(o){
            return (
              typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
              o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
          );
        }

        let html = this.generaterFunction([...args],elem.dataset,this.name,elem,index,comps);
        if(!isElement(html)){
            console.error(`${typeof html == "object" ? JSON.stringify(html) : `${html}`} Is Not Valid HTMLElement`)
            return false
        };
        elem.innerHTML = ""
        elem.appendChild(html)
    }
}

function html(string, ...values){
    let a = document.createElement("div");
    let newstring = ""
    if(typeof string == "string"){
        newstring = string;
    }
    else{
        string.forEach((str,i) => {
            newstring += str + values[i];
        })
    }
    a.innerHTML = newstring;
    let b = Array.from(a.querySelectorAll("*")).filter((element) => {
        return element.parentElement == a
    })
    if(b.length == 1){
        return a.firstElementChild
    }
    else{
        return a;
    }
}