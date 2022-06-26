class Hash{
    static async generateHash(value,algorithm = "SHA-256"){
        const msgBuffer = new TextEncoder().encode(value);
        const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    static compareHashes(){
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
}