if(!LocalStorage.available("route")){
    LocalStorage.setItem("route", {
        listens:[]
    })
}

function listen(event,cb){
    let strg = LocalStorage.getItem("route");

    if(!strg.listens.some(e => e.key == event)){
        strg.listens.push({
            isActivate:false,
            key:event,
            value:{}
        })
        LocalStorage.setItem("route",strg);
    }

    window.addEventListener('storage', e => {
        if(e.key == "route"){
            let ourstrg = LocalStorage.getItem("route");
            let val;
            
            for(let element of ourstrg.listens){
                if(((element.key == event && element.isActivate))){
                    val = element.value;
                    cb(val)
                    element.isActivate = false;
                    element.value = {};
                    LocalStorage.setItem("route", ourstrg)
                    break;
                    return;
                }
            }
        }
    });
}

function send(event,value = {}){
    let strg = LocalStorage.getItem("route");

    for(let element of strg.listens){
        if(((element.key == event))){
            element.isActivate = true;
            element.value = value;
            LocalStorage.setItem("route", strg)
            break;
            return;
        }
    }
}

class Listen{
    constructor(event){
        this.event = event;
        this.cbs = [];

        let strg = LocalStorage.getItem("route");

        if(!strg.listens.some(e => e.key == event)){
            strg.listens.push({
                isActivate:false,
                key:event,
                value:{}
            })
            LocalStorage.setItem("route",strg);
        }
    
        window.addEventListener('storage', e => {
            if(e.key == "route"){
                let ourstrg = LocalStorage.getItem("route");
                let val;
                
                for(let element of ourstrg.listens){
                    if(((element.key == event && element.isActivate))){
                        val = element.value;
                        this.cbs.forEach((callback) => {
                            callback(val)
                        })
                        element.isActivate = false;
                        LocalStorage.setItem("route", ourstrg)
                        break;
                        return;
                    }
                }
            }
        });
    }

    add(cb){
        this.cbs.push(cb);
        return this;
    }
}