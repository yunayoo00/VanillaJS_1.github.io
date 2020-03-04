const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"), //그냥 form, input하면 greeting.js안의 const 상수와 겹치므로 안됨. 해결하려면 유튜브 클론코딩 수강하기!
    toDoList = document.querySelector(".js-toDoList");

const  TODOS_LS = 'toDos';

let toDos = [];//이걸 따로 만드는 이유는 저장하기 위해서!

function deleteToDo(event){
    const btn = event.target; //event.target하면 btn을 가리킴.
    const li = btn.parentNode; // 그리고 .parentNode까지 하면 그 부모인 li을 가리킴. 
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    }); //toDos array안의 모든 todo를 지나가면서 여기서 true인 toDos만 return. 
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    const newId = toDos.length+1; //이거 랜덤생성으로 바꾸기.
    li.appendChild(delBtn);
    li.appendChild(span);                                                                        
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text, 
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);//string을 object로 만들어서 사이트가 저장된 내용을 이해하도록 한다. 
        parsedToDos.forEach(function (toDo){
            paintToDo(toDo.text);
        }); //forEach는 array에 담겨있는거 각각에 함수를 실행해준다. 
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();