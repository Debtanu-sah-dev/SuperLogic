class Structure{
    constructor(){
        if(arguments.length == 0){
            this.structure = []
        }
        else if(arguments.length == 1 && typeof arguments[0] == "number"){
            this.structure = new Array(arguments[0])
        }
        else if(arguments.length == 1 && Array.isArray(arguments[0])){
            this.structure = arguments[0]
        }
        else{
            this.structure = Array.from(arguments)
        }
    }

    filterEmpty(){
        this.structure = this.structure.filter((e) => {
            return e != (null || undefined);
        });
        return this;
    }

    delete(index){
        let rnd = Math.random();
        this.structure[index] = rnd;
        this.structure = this.structure.filter(e => e != rnd);
        return this;
    }

    add(element,spread=false){
        if(Array.isArray(element) && spread){
            this.structure = [...this.structure,...element];
        }
        else{
            this.structure.push(element)
        }

        return this;
    }
    addBefore(element,spread=false){
        
        if(Array.isArray(element) && spread){
            this.structure = [...this.structure,...element];
        }
        else{
            this.structure.unshift(element)
        }

        return this;
    }

    reverse(){
        this.structure = this.structure.reverse()
    }

    mutate(diffrenceThershold = 1){
        for(let i = 0; i < this.structure.length; i++){
            let e = this.structure[i];
            if(typeof e == "number"){
                this.structure[i] = e + ((Math.random()+Math.random()-1)/diffrenceThershold)
            }
        }
        return this;
    }

    copy(additional = []){
        let struc = new Structure([...this.structure,...additional]);
        return struc;
    }

    get(){
        return this.structure;
    }

    update(index,value){
        this.structure[index] = value;
        return this;
    }

    set(array){
        this.structure = Array.from(array);
        return this;
    }
}