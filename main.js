
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
Webcam.attach("#camera");

function takepic() {
    Webcam.snap(function (cam_pic) {
        document.getElementById("result").innerHTML = '<img src="' + cam_pic + '" id="obj_pic">';
    });
}

console.log("ml5 version:", ml5.version);
model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7ay1pe0Lz/model.json", model_load);

function model_load() {
    console.log("model loaded successfuly");
}

function identifypic() {
    obj_pic = document.getElementById("obj_pic");
    model.classify(obj_pic, get_result);
}

function get_result(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        obj_name=results[0].label;
        obj_accuracy=results[0].confidence;
        obj_accuracy=obj_accuracy*100;
        obj_accuracy=Math.floor(obj_accuracy);
        if (obj_accuracy>=80){
            document.getElementById("object_name").innerHTML=obj_name;
            document.getElementById("object_accuracy").innerHTML=obj_accuracy+"%";
        } else{
            document.getElementById("object_name").innerHTML="Not Sure But looks Like "+obj_name;
            document.getElementById("object_accuracy").innerHTML=obj_accuracy+"%";
        }
    }
}