class Collection{
    constructor(Class,paramsFunction,times){
        this.Class = Class;
        this.paramsFunction = paramsFunction;
        this.times = times;
        this.store = [];

        for(let i = 0; i < this.times; i++){
            this.store.push(new this.Class(...Array.from(this.paramsFunction(i,this.Class))))
        }
    }

    evalute(functionName,paramsFunction){
        this.store.forEach((e,i) => {
            e[functionName](...Array.from(paramsFunction(e,i,this.Class)));
        })
    }

    evaluteOn(index,functionName,paramsFunction){
        (this.store[index])[functionName](...Array.from(paramsFunction(index,this.Class,this.store[index])))
    }

    delete(index){
        let rnd = Math.random();
        this.store[index] = rnd;
        this.store = this.store.filter(e => e != rnd);
        return this;
    }

    copy(paramsFunction = this.paramsFunction,times = this.times){
        let collec = new Collection(this.Class,paramsFunction,times);
        return collec;
    }

    reverse(){
        this.store = this.store.reverse()
    }

    addNLBefore(){
        this.store.unshift(new this.Class(...arguments))
    }
    addBefore(){
        this.store.unshift(new this.Class(...Array.from(this.paramsFunction(this.store.length,this.Class))))
    }
    addNL(){
        this.store.push(new this.Class(...arguments))
    }
    add(){
        this.store.push(new this.Class(...Array.from(this.paramsFunction(this.store.length,this.Class))))
    }
    

    get(){
        return this.store
    }
}