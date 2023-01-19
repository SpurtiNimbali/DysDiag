let questions=[
    {
        num:1,
        img: '<img src="MATH1.png" class="ques_img">',
        question: "How many centimeters are there in 5 meters?",
        answer: "Option4",
        options: [
            '<img src="MATH1A.png" class="opt_img">',
            '<img src="MATH1B.png" class="opt_img">',
            '<img src="MATH1C.png" class="opt_img">',
            '<img src="MATH1D.png" class="opt_img">'
        ]
    },
    {
        num:2,
        img: '<img src="MATH2.png" class="ques_img"></img>',
        question: "The smallest 3-digit number is?",
        answer: "Option1",
        options: [
            '<img src="MATH2A.png" class="opt_img">',
            '<img src="MATH2B.png" class="opt_img">',
            '<img src="MATH2C.png" class="opt_img">',
            '<img src="MATH2D.png" class="opt_img">'
        ]
    },
    {
        num:3,
        img: '<img src="MATH3.png" class="ques_img"></img>',
        question: "Which shape has the most corners?",
        answer: "Option3",
        options: [
            '<img src="MATH3A.png" class="opt_img">',
            '<img src="MATH3B.png" class="opt_img">',
            '<img src="MATH3C.png" class="opt_img">',
            '<img src="MATH3D.png" class="opt_img">'
        ]
    },
    {
        num:4,
        img: '<img src="MATH4.png" class="ques_img"></img>',
        question: "Which of the following has more milk: 10 bottles of 0.5 liters or 5 bottles of 1 liter?",
        answer: "Option3",
        options: [
            '<img src="MATH4A.png" class="opt_img">',
            '<img src="MATH4B.png" class="opt_img">',
            '<img src="MATH4C.png" class="opt_img">',
            '<img src="MATH4D.png" class="opt_img">'
        ]
    },
    {
        num:5,
        img: '<img src="MATH5.png" class="ques_img"></img>',
        question: "What is the area of a rectangle whose opposite sides are of the length 8m and 4m?",
        answer: "Option1",
        options: [
            '<img src="MATH5A.png" class="opt_img">',
            '<img src="MATH5B.png" class="opt_img">',
            '<img src="MATH5C.png" class="opt_img">',
            '<img src="MATH5D.png" class="opt_img">'
        ]
    },
    {
        num:6,
        img: '<img src="MATH6.png" class="ques_img"></img>',
        question: "How many minutes are there in 5 hours?",
        answer: "Option3",
        options: [
            '<img src="MATH6A.png" class="opt_img">',
            '<img src="MATH6B.png" class="opt_img">',
            '<img src="MATH6C.png" class="opt_img">',
            '<img src="MATH6D.png" class="opt_img">'
        ]
    },
    {
        num:7,
        img: '<img src="MATH7.png" class="ques_img"></img>',
        question: "The next prime number after 7 is? ",
        answer: "Option2",
        options: [
            '<img src="MATH7A.png" class="opt_img">',
            '<img src="MATH7B.png" class="opt_img">',
            '<img src="MATH7C.png" class="opt_img">',
            '<img src="MATH7D.png" class="opt_img">'
        ]
    },
    {
        num:8,
        img: '<img src="MATH7.png" class="ques_img"></img>',
        question: "Which of the following is a right angle?",
        answer: "Option2",
        options: [
            '<img src="MATH8A.png" class="opt_img">',
            '<img src="MATH8B.png" class="opt_img">',
            '<img src="MATH8C.png" class="opt_img">',
            '<img src="MATH8D.png" class="opt_img">'
        ]
    },
    {
        num:9,
        img: '<img src="MATH9.png" class="ques_img"></img>',
        question: "In 25,600, the place value of 6 is?",
        answer: "Option3",
        options: [
            '<img src="MATH9A.png" class="opt_img">',
            '<img src="MATH9B.png" class="opt_img">',
            '<img src="MATH9C.png" class="opt_img">',
            '<img src="MATH9D.png" class="opt_img">'
        ]
    },
    {
        num:10,
        img: '<img src="MATH7.png" class="ques_img"></img>',
        question: "Which emoji wouldyou use to express how you feel while doing math?",
        answer: "Option2",
        options: [
            '<img src="MATH10A.png" class="opt_img">',
            '<img src="MATH10B.png" class="opt_img">',
            '<img src="MATH10C.png" class="opt_img">',
            '<img src="MATH10D.png" class="opt_img">'
        ]
    }

]

let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
let media_recorder=null;
let stream=null;

async function vid(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(mediaStream => {
        window.mediaStream = mediaStream;
	    video.srcObject = mediaStream;
    })
}
pred=0;

async function run() {
    const model = await tf.automl.loadImageClassification('model.json');
    const test=document.getElementById("canvas");
    const predictions = await model.classify(test);
    console.log(predictions);
    let res= [predictions['0']['prob'],predictions['1']['prob'],predictions['2']['prob'],predictions['3']['prob'],predictions['4']['prob'], ];
    let max= Math.max(...res);
    let idx= res.indexOf(max);
    if (idx==3){
        pred+=2;
    }
    if (idx==4){
        pred+=2;
    }
    if (idx==0){
        pred+=1;
    }
}

const opt_lst=document.querySelector(".option_lst");
var startTime=0;

document.getElementById("start_btn").onclick = function() {
    document.getElementById("main").style.display = "none";
    document.getElementById("ques").style.display = "block";
    startTime=Date.now();
    vid();
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');
    run();
    showQues(0);
}

function stop(){
    window.mediaStream.getTracks().forEach(track => {
        track.stop();
    });
}

document.getElementById("cont").onclick = function() {
    stop();
    document.getElementById("trans").style.display = "none";
    document.body.style.height = "140vh";
    document.getElementById("part2").style.display = "flex";

}

var score=0;
var time=0;
const next_btn=document.querySelector(".next_ques_but button")
let que_count=0;

function timeCalc(){
    let endTime=Date.now();
    let diffTime=(endTime-startTime)/1000;
    if (diffTime<5){
        time+=2
    }
    else if (diffTime<10){
        time+=1.5
    }
    else if (diffTime<15){
        time+=1
    }
    else if (diffTime<30){
        time+=0.5
    }
    startTime=endTime;
}

document.getElementById("next_btn").onclick = function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');
    run();
    let correctAns= questions[que_count].answer;
    if (correctAns==selected){
        score++;
    }
    timeCalc();
    if (que_count<questions.length-1){
        que_count++;
        showQues(que_count);
        selected="";
    }else{
        document.getElementById("ques").style.display = "none";
        document.getElementById("trans").style.display = "block"; 
        selected="";
    } 
}
function showQues(index){
    const que_text=document.querySelector(".ques_txt");
    const que_img=document.querySelector(".ques-header");
    const que_no=document.querySelector(".ques-no");
    let que_tag= "<span>"+ questions[index].question+"<span>";
    que_text.innerHTML=que_tag;
    let option_tag = '<div class="option" id="op1">'+questions[index].options[0]+ '<h4>Option1</h4></div>' + 
                    '<div class="option" id="op2">'+questions[index].options[1]+ '<h4>Option2</h4></div>' + 
                    '<div class="option" id="op3">'+questions[index].options[2]+ '<h4>Option3</h4></div>'+ 
                    '<div class="option" id="op4">'+questions[index].options[3]+ '<h4>Option4</h4></div>'
    ;
    opt_lst.innerHTML=option_tag;
    let img_tag= questions[index].img;
    que_img.innerHTML=img_tag;
    no_tag= '<span>Question '+ questions[index].num + ' of 10</span>';
    que_no.innerHTML=no_tag;
    const option = opt_lst.querySelectorAll(".option");
    for (let i=0; i< option.length;i++){
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}
var selected=""

function optionSelected(answer){
    let id= answer.id;
    let userAns= answer.textContent; 
    document.getElementById("op1").style.backgroundColor = "transparent";
    document.getElementById("op2").style.backgroundColor = "transparent";
    document.getElementById("op3").style.backgroundColor = "transparent";
    document.getElementById("op4").style.backgroundColor = "transparent";
    document.getElementById(id).style.backgroundColor = "rgb(255, 245, 232)";
    selected= userAns;
}

var c1score = 0;
var c3score = 0;
var final_score=0;
function tabulateAnswers() {
    
    var choices2 = document.getElementsByTagName('input');
    // loop through all the radio inputs
    for (i=0; i<choices2.length; i++) {
      // if the radio is checked..
      if (choices2[i].checked) {
        // add 1 to that choice's score
        if (choices2[i].value == 'c1') {
          c1score = c1score + 1;
        }
        if (choices2[i].value == 'c3') {
          c3score = c3score + 1;
        }
      }
    }
    final_score= 3*score + (6*c1score) + time + pred;
    const res_text=document.querySelector(".result_text");
    if (final_score>75) {
        let res_tag= "<div class='res_txt'><span>Congratulations! The child does not show any signs or symptoms of Dyscalculia</span></div>"
        res_text.innerHTML=res_tag;
    }
    else if (final_score>50){
        let res_tag= "<div class='res_txt'><span>Unfortunately, the child is showing mild signs of Dyscalculia. Our risk-assessment test has categorized the results under the category, MILD RISK. Kindly get the child examined by a certified medical professional.</span></div>"
        res_text.innerHTML=res_tag;
    }
    else if (final_score>25){
        let res_tag= "<div class='res_txt'><span>Unfortunately, the child is showing certain signs of Dyscalculia. Our risk-assessment test has categorized the results under the category, HIGH RISK. Kindly get the child examined by a certified medical professional at the earliest.</span></div>"
        res_text.innerHTML=res_tag;
    }
    else{
        let res_tag= "<div class='res_txt'><span>Unfortunately, the child is showing serious signs of Dyscalculia. Our risk-assessment test has categorized the results under the category, VERY HIGH RISK. This requires immediate intervention. Kindly get the child examined by a certified medical professional.</span></div>"
        res_text.innerHTML=res_tag;
    }
    
}

document.getElementById("submit_btn").onclick = function() {
    tabulateAnswers();
    console.log("Score", score);
    console.log("c1", c1score);
    console.log("c3:", c3score);
    console.log("time:", time);
    console.log("pred", pred);
    console.log(final_score);
    document.body.style.height = "100vh";
    document.getElementById("part2").style.display = "none";
    document.getElementById("end").style.display = "block";
}

document.getElementById("exit_btn").onclick = function() {
    document.location.href = "index.html";
}