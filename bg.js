const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image); //먼저 넣어줘서 이미지가 뒤에오게함.
}

function genRandom(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber  = genRandom();
    paintImage(randomNumber);
}

init();