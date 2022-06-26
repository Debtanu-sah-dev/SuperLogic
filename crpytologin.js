// Server

let unhashedusers = [
    {
        name:"Albert",
        password:"Albert"
    },
    {
        name:"Pythogoras",
        password:"Pythogoras"
    },
    {
        name:"Issac",
        password:"Issac"
    },
    {
        name:"Debtanu",
        password:"Debtanu"
    }
]

let userdata = new Collection(Routine,(index) => {
    return [
        unhashedusers[index],
        {}
    ]
},unhashedusers.length)

userdata.evalute("hashKey",() => {
    return ["password"]
});

// Client
async function login(username,password,state){
    try{
        let userinfo = [...userdata.get()];
        let space;
        userinfo.forEach(element => {
            let tempspace = element.get();
            if(tempspace.name == username){
                space = tempspace;
            }
        });

        let newhash = await Hash.generateHash(password);
        
        if(Hash.compareHashes(space.password, newhash)){
            // value.innerText = "Success"
            state.setValue("Success")
            return "success"
        }
        else{
            // value.innerText = "Password Or Username Inncorrect"
            state.setValue("Password Or Username Inncorrect")
            return "error"
        }
    }
    catch(err){
        // value.innerText = "Error occured"
        state.setValue(`Error occured`)
    }
}


let loginPage = new Component("login",(initArguments,props,name,element,index) => {
    let state = new Reactive(`login${index}`,"Input ?")
    let container = Component.html(`
    <label for="name${index}">Name:</label>
    <input id="name${index}">
    <label for="password${index}">Password:</label>
    <input id="password${index}">
    <button id="login${index}">Login</button>
    <reactive @login${index}>Input ?</reactive>
    `)
    let username = container.querySelector(`#name${index}`);
    let password = container.querySelector(`#password${index}`);
    let login_btn = container.querySelector(`#login${index}`);

    login_btn.addEventListener("click", () => {
        login(username.value,password.value,state)
    })

    return container
});

loginPage.init()
// let username = document.querySelector(`#name`);
// let password = document.querySelector(`#password`);
// let value = new Reactive("value", "Input ?");
// let login_btn = document.querySelector(`#login`);

// login_btn.addEventListener("click", () => {
//     login(username.value,password.value,value)
// })