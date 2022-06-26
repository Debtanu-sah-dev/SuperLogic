function load(objectOrSrc){
    let script = document.createElement("script");
    if(typeof objectOrSrc == "object" && !(Array.isArray(objectOrSrc))){
        for(e in objectOrSrc){
            script[e] == objectOrSrc[e];
        }
    }
    else if(typeof objectOrSrc == "string"){
        script.src = objectOrSrc
    }
    document.body.appendChild(script)
}