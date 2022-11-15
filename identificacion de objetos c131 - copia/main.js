porsentaje = 0;
objets = [];
function setup() {
    canvas=createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    od = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("estatus").innerHTML = "estatus:detectando objetos";
}
function preload() {
    img = loadImage("dog_cat.jpg");
}
function draw() {
    image(video, 0, 0, 380, 380);
    /*fill("black");
    text("perro siendo abrasado por gato", 45, 75);
    noFill();
    stroke("blue");
    noFill();
    stroke("orange");
    fill("black");
    text("gato abrasando a un perro", 320, 120);
    noFill();
    stroke("orange");
    rect(300, 90, 270, 320);*/
    if (estatus!="") {
        console.log("hola");
        od.detect(video, gotResult);
        for (let i = 0;i < objets.length;i++) {
            document.getElementById("estatus").innerHTML = "estatus:objetos detectado ";;
            porsentaje = floor(objets[i].confidence*100);
            fill("red");
            text(objets[i].label + " " + porsentaje + "%", objets[i].x + 15, objets[i].y + 15);
            noFill();
            stroke("orange");
            noFill();
            rect(objets[i].x, objets[i].y, objets[i].width, objets[i].height);
        }
    }
}
function modelLoaded() {
    console.log("modelo cargado");
    estatus = true;
}
function gotResult(error, results) {
    if (error == true) {
        console.error(error);
    }else{
        console.log(results);
        objets = results;
    }
}