Webcam.set({
    width: 350,
    height: 300,
    img_type: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri'"/>';
    });
}

console.log('m15 version:' m15.version);
classifier = m15.imageClassifier('https://teachablemachine.withgoogle.com/models/hXtNCulHy/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function speak(){
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The First Prediction Is " + prediction_1;
    speak_data_2 = "And The Second Prediction Is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis); 
}
function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "fist"){
            document.getElementById("update_emotion").innerHTML = "&#128074;";
        }
        if(results[0].label == "horns"){
            document.getElementById("update_emotion").innerHTML = "&#9996;";
        }
        if(results[1].label == "superb"){
            document.getElementById("update_emotion2").innerHTML = "&#128076;";
        }
        if(results[1].label == "index"){
            document.getElementById("update_emotion2").innerHTML = "&#128070;";
        }
    }
}