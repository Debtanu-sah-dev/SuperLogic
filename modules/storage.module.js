class ItemBuffer{
    constructor(input){
        this.input = input;
        this.buffer = {
            type:typeof this.input,
            value:typeof this.input == "object" ? JSON.stringify(this.input) : `${this.input}`
        };
    }

    static convertBuffer(buffer){
        let obj=buffer;

        if(buffer.type == "object"){
            obj.value = JSON.parse(buffer.value)
        }
        else if(buffer.type == "function"){
            obj.value = eval(`function func(){return ${buffer.value}}func()`);
        }
        else if(buffer.type == "number"){
            obj.value = parseInt(buffer.value);
        }
        else if(buffer.type == "bigint"){
            obj.value = BigInt(buffer.value);
        }
        else if(buffer.type == "boolean"){
            obj.value = buffer.value == "true"?true:false;
        }
        else if(buffer.type == "undefined"){
            obj.value = undefined
        }
        else{
            obj.value = buffer.value
        }

        return obj
    }

    convert(){
        let obj=this.buffer;

        if(this.buffer.type == "object"){
            obj.value = JSON.parse(this.buffer.value)
        }
        else if(this.buffer.type == "function"){
            obj.value = eval(`function func(){return ${this.buffer.value}}func()`);
        }
        else if(this.buffer.type == "number"){
            obj.value = parseInt(this.buffer.value);
        }
        else if(this.buffer.type == "bigint"){
            obj.value = BigInt(this.buffer.value);
        }
        else if(this.buffer.type == "boolean"){
            obj.value = this.buffer.value == "true"?true:false;
        }
        else if(this.buffer.type == "undefined"){
            obj.value = undefined
        }
        else{
            obj.value = this.buffer.value
        }

        return obj
    }
}

class LocalStorage{
    static getItem(key){
        let buffer = JSON.parse(localStorage.getItem(key));
        if(buffer == null){
            return false;
        }
        return ItemBuffer.convertBuffer(buffer).value;
    }

    static setItem(key, value){
        let buffer = new ItemBuffer(value).buffer;
        localStorage.setItem(key,JSON.stringify(buffer));
        return this;
    }

    static removeItem(key){
        localStorage.removeItem(key);
        return this;
    }

    static clear(){
        localStorage.clear();
    }

    static available(key){
        return localStorage.getItem(key) != null
    }
}


class SessionStorage{
    static getItem(key){
        let buffer = JSON.parse(sessionStorage.getItem(key));
        if(buffer == null){
            return false;
        }
        return ItemBuffer.convertBuffer(buffer).value;
    }

    static setItem(key, value){
        let buffer = new ItemBuffer(value).buffer;
        sessionStorage.setItem(key,JSON.stringify(buffer));
        return this;
    }

    static removeItem(key){
        sessionStorage.removeItem(key);
        return this;
    }

    static clear(){
        sessionStorage.clear();
    }

    static available(key){
        return sessionStorage.getItem(key) != null
    }
}
