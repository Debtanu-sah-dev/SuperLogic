const rootElement = document.querySelector("html");
const body = document.body;
function on(selectorOrEventType,eventTypeOrCallback,callbackOrBubble,bubble){
    if(typeof eventTypeOrCallback == "function"){
        let f = eventTypeOrCallback.bind(this)
        this.addEventListener(selectorOrEventType,f,callbackOrBubble);
        return this
    }
    else{
        let f = callbackOrBubble.bind(this)
        document.querySelector(selectorOrEventType).addEventListener(eventTypeOrCallback,f,bubble||false);
        return document.querySelector(selectorOrEventType);
    }
}

function newElement(tagName){
    return document.createElement(tagName);
}

function isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

const MethodsInDomSetters = ["on","when","click","input","change","html","iHtml","oHtml","addHtml","addIHtml","removeClass","toogleClass","addClass","setClass","addOHtml","addText","setValue","addValue","setHtml","setIHtml","attr","setAttr","setOHtml","setText","text","hide","show","delete","deleteChild","add"]
const MethodsInDomGetters = ["getOHtml","getHtml","getIHtml","getText","getCss","$","css","_","width","height","top","left","offParent","parent","nthChild","getValue","getAttr","clone"]

class ElementCollection extends Array{}

for(let method of MethodsInDomSetters){
    ElementCollection.prototype[method] = function (){
        let args = arguments;
        for(let element of this){
            element[method](...args);
        }
        return this
    }
}
for(let method of MethodsInDomGetters){
    ElementCollection.prototype[method] = function (){
        let args = arguments;
        let array = []
        for(let element of this){
            array.push([element,element[method](...args)]);
        }
        return array
    }
}

ElementCollection.prototype.each = function (func) {
    this.forEach((element,index,array) => {
        const f = func.bind(element);
        f(element,index,array);
    })
    return this
}

function $(queryString){
    if(typeof queryString == "string"){
        return document.querySelector(queryString)
    }
    else if(isElement(queryString)) {
        return queryString
    }
}

function _(queryString){
    if(typeof queryString == "string"){
        return new ElementCollection(...document.querySelectorAll(queryString))
    }
}

function when(key,cb){
    if((typeof key == "string") || (typeof key == "number")){
        this.addEventListener("keydown", (e) => {
            if(e.key == key || e.keyCode == key){
                cb(e);
            }
        })
    }
    else if(Array.isArray(key)){
        for(let k of key){
            this.addEventListener("keydown", (e) => {
                if(e.key == k || e.keyCode == k){
                    cb(e);
                }
            })
        }
    }

    return this
}


//Setters
HTMLElement.prototype.on = on;
HTMLElement.prototype.when = when;
HTMLElement.prototype.click = function(cb){
    let f = cb.bind(this)
    this.addEventListener("click",f)
    return this;
};
HTMLElement.prototype.input = function(cb){
    let f = cb.bind(this)
    this.addEventListener("input",f)
    return this;
};
HTMLElement.prototype.change = function(cb){
    let f = cb.bind(this)
    this.addEventListener("change",f)
    return this;
};
HTMLElement.prototype.add = function(element){
    this.appendChild(element)
    return this;
};
HTMLElement.prototype.addClass = function(classs){
    this.classList.add(classs)
    return this;
};
HTMLElement.prototype.removeClass = function(classs){
    this.classList.remove(classs)
    return this;
};
HTMLElement.prototype.setClass = function(classs){
    this.className = classs
    return this;
};
HTMLElement.prototype.toggleClass = function(classs){
    this.classList.toggle(classs)
    return this;
};

// DOMManipulation
    //No KeyWord Set
HTMLElement.prototype.props = {};
HTMLElement.prototype.html = function(str){
    this.innerHTML = str;
    return this;
};
HTMLElement.prototype.text = function(str){
    this.innerText = str;
    return this;
};
HTMLElement.prototype.iHtml = function(str){
    this.innerHTML = str;
    return this;
};
HTMLElement.prototype.oHtml = function(str){
    this.outerHTML = str;
    return this;
};
    //KeyWord Set
HTMLElement.prototype.setHtml = function(str){
    this.innerHTML = str;
    return this;
};
HTMLElement.prototype.setText = function(str){
    this.innerText = str;
    return this;
};
HTMLElement.prototype.setValue = function(str){
    this.value = str;
    return this;
};
HTMLElement.prototype.setIHtml = function(str){
    this.innerHTML = str;
    return this;
};
HTMLElement.prototype.setOHtml = function(str){
    this.outerHTML = str;
    return this;
};
    //KeyWord Add
HTMLElement.prototype.addHtml = function(str){
    this.innerHTML += str;
    return this;
};
HTMLElement.prototype.addText = function(str){
    this.innerText += str;
    return this;
};
HTMLElement.prototype.addValue = function(str){
    this.value += str;
    return this;
};
HTMLElement.prototype.addIHtml = function(str){
    this.innerHTML += str;
    return this;
};
HTMLElement.prototype.addOHtml = function(str){
    this.outerHTML += str;
    return this;
};


HTMLElement.prototype.hide = function(){
    this.style.display = "none"
    return this;
};
HTMLElement.prototype.attr = function(key,value){
    this.setAttribute(key,value)
    return this;
};
HTMLElement.prototype.setAttr = function(key,value){
    this.setAttribute(key,value)
    return this;
};
HTMLElement.prototype.show = function(display = "block"){
    this.style.display = display;
    return this;
};
HTMLElement.prototype.delete = function(){
    this.remove()
};
HTMLElement.prototype.deleteChild = function(child = this.firstChild){
    return this.removeChild(child)
};
HTMLElement.prototype.css = function(object,incapsulate){
    if(typeof object === "string"){
        if(incapsulate != null){
            this.style[object] = typeof incapsulate == "number"? incapsulate + "px":Array.isArray(incapsulate) ? incapsulate.join(""):incapsulate
        }
        return getComputedStyle(this)[object];
    }
    else{
        if(!incapsulate){
            for(e in object){
                this.style[e] = typeof object[e] == "number"? object[e] + "px":Array.isArray(object[e]) ? object[e].join(""):object[e];
            }
        }
        else{
            for(e in object){
                this.style.setProperty(e,typeof object[e] == "number"? object[e] + "px":Array.isArray(object[e]) ? object[e].join(""):object[e]);
            }
        }
        return object
    }
}

//Getters
HTMLElement.prototype.clone = function (){
    return this.cloneNode()
};
HTMLElement.prototype.getHtml = function (){
    return this.innerHTML
};
HTMLElement.prototype.getIHtml = function (){
    return this.innerHTML
};
HTMLElement.prototype.getOHtml = function (){
    return this.outerHTML
};
HTMLElement.prototype.getText = function (){
    return this.innerText
};
HTMLElement.prototype.getValue = function (){
    return this.value
};
HTMLElement.prototype.height = function (){
    return this.offsetHeight
};
HTMLElement.prototype.getAttr = function(key){
    this.getAttribute(key,value)
    return this;
};
HTMLElement.prototype.width = function (){
    return this.offsetWidth
};
HTMLElement.prototype.left = function (){
    return this.offsetLeft
};
HTMLElement.prototype.top = function (){
    return this.offsetTop
};
HTMLElement.prototype.offParent = function (){
    return this.offsetParent
};
HTMLElement.prototype.parent = function (){
    return this.parentElement
};
HTMLElement.prototype.$ = function (queryString){
    if(typeof queryString == "string"){
        return this.querySelector(queryString)
    }
    else if(isElement(queryString)) {
        return queryString
    }
}
HTMLElement.prototype._ = function (queryString){
    if(typeof queryString == "string"){
        return new ElementCollection(...this.querySelectorAll(queryString))
    }
}
HTMLElement.prototype.nthChild = function (index){
    return this.$(`*:nth-child(${index})`)
};
HTMLElement.prototype.getCss = function (prop){
    if(prop != null){
        return getComputedStyle(this)[prop]
    }
    else{
        return this.style
    }
};

//Mouse
let mouseX;
let mouseY;

window.addEventListener("mousemove", (e) => {
    mouseX = e.x;
    mouseY = e.y;
})