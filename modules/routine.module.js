class Routine{
    constructor(space = {},methods = {}){
        this.space = {...space};
        this.methods = methods;
    }

    addValue(key, value){
        this.space[key] = value;
        return this;
    }

    getValue(key){
        return this.space[key];
    }

    updateValue(key,value){
        this.space[key] = value;
        return this;
    }

    addMethod(name, func){
        this.methods[name] = func
        return this
    }

    async hashKey(key,algorithm = "SHA-256") {
        const msgBuffer = new TextEncoder().encode(this.space[key]);
        const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        this.space[key] = hashHex;

        return this;
    }

    evaluteMethod(name){
        for(let i in this.space){
            this.methods[name](i,this.space[i],this.space);
        }

        return this
    }

    delete(key){
        delete this.space[key]
        return this;
    }

    mutate(key,diffrenceThershold = 1){
        if(typeof this.structure[key] == "number"){
            this.structure[key] = this.structure[key] + ((Math.random()+Math.random()-1)/diffrenceThershold)
        }
        return this;
    }

    copy(space = this.space, methods = this.methods){
        let rout = new Routine(space,methods);
        return rout;
    }

    get(){
        return this.space;
    }

    set(space){
        this.space = space;
        return this;
    }
}