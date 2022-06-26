let container = $("#container");
body.setClass("bg-dark text-light")
let subjects;
if(LocalStorage.available("subject")){
    subjects = LocalStorage.getItem("subject")
}
else{
    subjects = subject
}
let studyStatus = new Component("studystatus", (args,props,name,element,index,array) => {
    let subjectWrappers = newElement("div");
    for(let e of subjects){
        let wrapper = newElement("div");
        wrapper.addClass("p-3")
        let header = newElement("h1");
        let report = "";
        header.text(e.name).addClass("pb-3")
        let subjectList = newElement("ul");
        subjectList.setClass("list-group")
        for(let ij in e.chapters){
            let j = e.chapters[ij];
            let listItem = newElement("li");
            listItem.setClass("list-group-item d-flex justify-content-between align-items-center bg-secondary bg-opacity-25 text-white border-bottom border-dark-gray")
            let chapterName = newElement("h5");
            chapterName.text(e.name == "French" ? `${parseInt(ij)+1}. ${j.name}` : j.name).css("margin","0")
            let controls = newElement("div");
            controls.setClass("d-flex gap-3 m-1")
            let school = newElement("button");
            school.text("School");
            school.addClass("btn")
            let tution = newElement("button");
            tution.text("Tution");
            tution.addClass("btn")
            let student = newElement("button");
            student.text("Student");
            student.addClass("btn")
            if(j.school){
                school.addClass("btn-success");
            }
            else{
                school.addClass("btn-danger");
            }
            if(j.tution){
                tution.addClass("btn-success");
            }
            else{
                tution.addClass("btn-danger");
            }
            if(j.student){
                student.addClass("btn-success");
            }
            else{
                student.addClass("btn-danger");
            }
            function filterCheck(){
                if(j.school + j.tution + j.student == 0){
                    school.removeClass("btn-danger");
                    school.addClass("btn-secondary");
                    tution.removeClass("btn-danger");
                    tution.addClass("btn-secondary");
                    student.removeClass("btn-danger");
                    student.addClass("btn-secondary");
                }
                else{
                    school.removeClass("btn-secondary");
                    student.removeClass("btn-secondary");
                    tution.removeClass("btn-secondary");
                    if(j.school){
                        school.addClass("btn-success");
                    }
                    else{
                        school.addClass("btn-danger");
                    }
                    if(j.tution){
                        tution.addClass("btn-success");
                    }
                    else{
                        tution.addClass("btn-danger");
                    }
                    if(j.student){
                        student.addClass("btn-success");
                    }
                    else{
                        student.addClass("btn-danger");
                    }
                }
            }
            filterCheck()
            school.click(function (){
                j.school = !j.school;
                if(j.school){
                    this.removeClass("btn-danger");
                    this.addClass("btn-success");
                }
                else{
                    this.removeClass("btn-success");
                    this.addClass("btn-danger");
                }
                filterCheck()
                saveToDatabase()
            })
            tution.click(function (){
                j.tution = !j.tution;
                if(j.tution){
                    this.removeClass("btn-danger");
                    this.addClass("btn-success");
                }
                else{
                    this.removeClass("btn-success");
                    this.addClass("btn-danger");
                }
                filterCheck()
                saveToDatabase()
            })
            student.click(function (){
                j.student = !j.student;
                if(j.student){
                    this.removeClass("btn-danger");
                    this.addClass("btn-success");
                }
                else{
                    this.removeClass("btn-success");
                    this.addClass("btn-danger");
                }
                filterCheck()
                saveToDatabase()
            })
            controls.add(school)
            controls.add(tution)
            controls.add(student)
            listItem.add(chapterName)
            listItem.add(controls)
            subjectList.add(listItem)
        }
        wrapper.add(header)
        wrapper.add(subjectList)
        subjectWrappers.add(wrapper)
        subjectWrappers.add(html`
            <div class="text-light">
                <hr class="border-2">
            </div>`
        )
    }
    return subjectWrappers
});
studyStatus.initOn(container)
function saveToDatabase(){
    LocalStorage.setItem("subject",subjects);
}