let form = $("#form");
let searchForm = $("#searchForm");
let items = $("#items");
let searchButton = $("#searchButton")
let searchBar = $("#searchBar")
let itemsList;
let Items = [];
let inpval = new Reactive("inpval", "")

$("#name").input(function (){
    inpval.setValue(this.getValue())
})

searchForm.on("submit", (e) => {
    e.preventDefault();
})


searchButton.click(() => {
    Items.forEach(function (element){
        if((element.$("h1").getText().toLowerCase().includes(searchBar.getValue().toLowerCase())) || (element.$("h4").getText().toLowerCase().includes(searchBar.getValue().toLowerCase()))){
            element.show("flex")
        }
        else{
            element.hide()
        }
    })
    items.scrollIntoView();
})

if(LocalStorage.available("todo")){
    let fullArray = LocalStorage.getItem("todo");

    itemsList = new Collection(Routine, (index) => {
        return [fullArray[index],{}]
    },fullArray.length);
}
else{
    itemsList = new Collection(Routine, (index) => {
        return [{},{}]
    },0);
}


let item = new Component("item", (args,props,name,element,index,array) => {
    let itemElement = new Structure();
    let itemWrapper = newElement("div");
    for(let itemsss in itemsList.get()){
        let itemss = itemsList.get()[itemsss]
        let wrapper = newElement("div");
        let contentWrapper = newElement("div");
        let controls = newElement("div");
        let deleteButton = newElement("button");
        let editElement = newElement("button");
        let doneElement = newElement("button");
        let img = newElement("img");
        wrapper.addClass("item");
        wrapper.id = itemss.getValue("name").replace(/ /g,"-");
        deleteButton.text("Delete")
        editElement.text("Edit")
        doneElement.text("Done")
        let name = newElement("h1");
        name.text(`${itemss.getValue("name")}`);
        let description = newElement("h4");
        description.html(itemss.getValue("description").replace(/ /g,"&nbsp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/\?(.*)\?/gi, (aa) => {
            let a = newElement("img");
            a.src = aa.slice(1,aa.length - 1).replace(/&nbsp;/g," ")
            return a.getOHtml();
        }).replace(/\`\`\`(.*)\`\`\`/gi, (aa) => {
            let a = newElement("code");
            a.innerHTML = aa.slice(3,aa.length - 3)
            return a.getOHtml();
        }).replace(/\_(.*)\_/gi, (aa) => {
            let a = newElement("em");
            a.innerHTML = aa.slice(1,aa.length - 1)
            return a.getOHtml();
        }).replace(/\*(.*)\*/gi, (aa) => {
            let a = newElement("strong");
            a.innerHTML = aa.slice(1,aa.length - 1)
            return a.getOHtml();
        }).replace(/\~(.*)\~/gi, (aa) => {
            let a = newElement("s");
            a.innerHTML = aa.slice(1,aa.length - 1)
            return a.getOHtml();
        }).replace(/\`\`(.*)\`\`/gi, (aa) => {
            let a = newElement("a");
            a.target = "_blank"
            a.href = aa.slice(2,aa.length - 2);
            a.innerHTML = aa.slice(2,aa.length - 2)
            return a.getOHtml();
        }).replace(/(---)/gi, (aa,b) => {
            let a = newElement("hr");
            a.innerHTML = b
            return a.getOHtml();
        }).replace(/\#(.*)\#([1-6])/gi, (aa,b,c) => {
            let a = newElement(`h${c}`);
            a.innerHTML = b
            return a.getOHtml();
        }).replace(/"""/gi, (aa,b,c) => {
            return name.innerText;
        }));
        let date = newElement("h6");
        date.text(itemss.getValue("date"));

        wrapper.addClass("card")
        // wrapper.addClass("p-3")
        contentWrapper.addClass("d-flex")
        contentWrapper.addClass("p-3")
        img.src = `https://source.unsplash.com/1600x500/?${itemss.getValue("name").trim().replace(/ /g,",").toLowerCase()}`
        img.addClass("card-img-top")
        wrapper.addClass("mb-5");
        contentWrapper.addClass("flex-column")
        description.css({
            "white-space":"pre-wrap"
        },true)

        deleteButton.addClass("btn")
        editElement.addClass("btn")
        doneElement.addClass("btn")
        deleteButton.addClass("btn-danger")
        editElement.addClass("btn-primary")
        doneElement.addClass("btn-warning")

        controls.addClass("d-flex")
        controls.addClass("gap-3")

        date.addClass("badge")
        date.addClass("border")
        date.addClass("border-dark")
        date.addClass("text-dark")
        date.addClass("p-2")

        date.css("align-self","flex-end")
        
        controls.css("margin-top","1rem")
        controls.css("align-self","flex-end")

        deleteButton.click(() => {
            itemsList.delete(itemsss)
            saveToDatabase()
        })

        editElement.click(() => {
            if(!itemss.getValue("done")){
                if(confirm("Do You Really Want To Edit This Todo's Content")){
                    let nameI = prompt("Set Name",name.getText());
                    let descriptionI = prompt("Set Description",description.getText());
                    if(nameI != "" && descriptionI != ""){
                        name.text(nameI)
                        description.text(descriptionI)
    
                        itemsList.evaluteOn(itemsss,"updateValue", () => {
                            return ["name",nameI]
                        })
                        itemsList.evaluteOn(itemsss,"updateValue", () => {
                            return ["description",descriptionI]
                        })
    
                        saveToDatabase()
                    }
                    else{
                        alert("Please Fill The Inputs To Edit This ToDo Item")
                    }
                }
            }
        })

        doneElement.click(() => {
            itemsList.evaluteOn(itemsss,"updateValue", () => {
                return ["done",!itemss.getValue("done")]
            })

            saveToDatabase()
        })

        controls.add(doneElement);
        controls.add(editElement);
        controls.add(deleteButton);

        if(itemss.getValue("done") == true){
            name.css("text-decoration-line", "line-through")
            wrapper.addClass("done")
            wrapper.css({
                background:"#bbb",
                overflow:"hidden"
            },true)
            img.css("filter","blur(4px) grayscale(100%)")
            name.css({
                filter:"blur(3px)",
                "user-select":"none"
            })
            description.css({
                filter:"blur(3px)",
                "user-select":"none"
            })
            date.css({
                filter:"blur(3px)",
                "user-select":"none"
            })
            doneElement.text("Undo")
            editElement.hide()
        }
        wrapper.add(img)
        contentWrapper.add(date);
        contentWrapper.add(name);
        contentWrapper.add(newElement("hr"))
        contentWrapper.add(description);
        contentWrapper.add(controls);
        wrapper.add(contentWrapper)
        itemElement.add(wrapper)
    }
    
    for(e of itemElement.get()){
        itemWrapper.add(e)
    }

    Items = itemElement.get();
    return itemWrapper
});

item.initOn(items)

form.on("submit", (e) => {
    e.preventDefault();
    let formdata = new FormData(form);
    if((formdata.get("name").trim() !== "") && (formdata.get("description").trim() !== "")){
        itemsList.addNLBefore({
            name:formdata.get("name"),
            description:formdata.get("description"),
            done:false,
            date:`${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
        })
        saveToDatabase()
    }
    else{
        alert("Please Fill The Inputs To Make A ToDo Item")
    }
});

function saveToDatabase(){
    let fullArray = itemsList.get().map(e => e.get())
    LocalStorage.setItem("todo",fullArray)
    item.initOn(items)
}