function test({
    descriptionAtSuccess = "",
    initialCallback = () => {},
    descriptionAtFail = "",
    failCallback = () => {},
    successCallback = () => {},
    shouldOpenDebugger = false,
    parameters = [],
    failParameters = parameters,
    successParameters = parameters
}) {
    try {
        if(shouldOpenDebugger){
            debugger;
        }
        let val = initialCallback(...parameters);
        if ((val) == false) {
            throw new Error(`Failed Execution Resulted In ${val}`)
        } else {
            if(shouldOpenDebugger){
                debugger;
            }
            console.log(descriptionAtSuccess)
            successCallback(...[val,...successParameters])
        }
    } catch (err) {
        if(shouldOpenDebugger){
            debugger;
        }
        console.log(descriptionAtFail)
        failCallback(...[err,...failParameters])
    }
}

function log(){
    console.log(...arguments);
}
function assert(){
    console.assert(...arguments);
}
function clear(){
    console.clear(...arguments);
}
function count(){
    console.count(...arguments);
}
function countReset(){
    console.countReset(...arguments);
}
function debug(){
    console.debug(...arguments);
}
function dir(){
    console.dir(...arguments);
}
function dirxml(){
    console.dirxml(...arguments);
}
function error(){
    console.error(...arguments);
}
function exception(){
    console.exception(...arguments);
}
function group(){
    console.group(...arguments);
}
function groupCollapsed(){
    console.groupCollapsed(...arguments);
}
function groupEnd(){
    console.groupEnd(...arguments);
}
function info(){
    console.info(...arguments);
}
function profile(){
    console.profile(...arguments);
}
function profileEnd(){
    console.profileEnd(...arguments);
}
function table(){
    console.table(...arguments);
}
function time(){
    console.time(...arguments);
}
function timeEnd(){
    console.timeEnd(...arguments);
}
function timeLog(){
    console.timeLog(...arguments);
}
function timeStamp(){
    console.timeStamp(...arguments);
}
function trace(){
    console.trace(...arguments);
}
function warn(){
    console.warn(...arguments);
}
