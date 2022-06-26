class Reactive{
    static reactive = [];
    constructor(name,value){
        this.name = name;
        this.value = value;
        let can = true;

        Reactive.reactive.forEach((e) => {
            if(e.name == this.name){
                can = false;
            }
        })

        if(!can) return

        Reactive.reactive.push({name,value})
        this.render();
    }
    
    render(){
        let vars = Array.from(document.querySelectorAll("reactive")).filter((e) => {
            return e.hasAttribute(`@${this.name.replace(/ /g,"-")}`)
        });
    
        vars.forEach(element => {
            element.innerText = typeof this.value == "object" ? JSON.stringify(this.value) : `${this.value}`
        });
    }
    
    static renderAll(){
        Reactive.reactive.forEach((element) => {
            let vars = Array.from(document.querySelectorAll("reactive")).filter((e) => {
                return e.hasAttribute(`@${element.name.replace(/ /g,"-")}`)
            });
        
            vars.forEach(element => {
                element.innerText = typeof element.value == "object" ? JSON.stringify(element.value) : `${element.value}`
            });
        })
    }

    getValue(){
        return this.value
    }


    setValue(value){
        this.value = value;
        Reactive.reactive.forEach((e) => {
            if(e.name == this.name){
                e.value = this.value
            }
        })
        this.render();
    }
}