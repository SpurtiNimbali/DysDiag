const opt_lst=document.querySelector(".option_lst");
var startTime=0;

document.getElementById("start_btn").onclick = function() {
    document.getElementById("main").style.display = "none";
    document.getElementById("ques").style.display = "block";
    startTime=Date.now();
    showQues(0);
}

document.getElementById("cont").onclick = function() {
    document.getElementById("trans").style.display = "none";
    document.body.style.height = "360vh";
    document.getElementById("part2").style.display = "flex";
}



var score=0;
var time=0;
const next_btn=document.querySelector(".next_ques_but button")
let que_count=0;

function timeCalc(){
    let endTime=Date.now();
    let diffTime=(endTime-startTime)/1000;
    console.log(diffTime);
    if (diffTime<5){
        time+=4
    }
    else if (diffTime<10){
        time+=3
    }
    else if (diffTime<15){
        time+=2
    }
    else if (diffTime<30){
        time+=1
    }
    startTime=endTime;
    console.log(time);
}

document.getElementById("exit_btn").onclick = function() {
    document.location.href = "index.html";
}

document.getElementById("next_btn").onclick = function() {
    console.log(selected);
    let correctAns= questions[que_count].answer;
    if (correctAns==selected){
        score++;
        console.log("Correct Answer");
    }
    console.log(startTime);
    timeCalc();
    if (que_count<questions.length-1){
        que_count++;
        showQues(que_count);
        selected="";
    }else{
        document.getElementById("ques").style.display = "none";
        document.getElementById("trans").style.display = "block"; 
        console.log(score);
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
    no_tag= '<span>Question '+ questions[index].num + ' of 7</span>';
    que_no.innerHTML=no_tag;
    const option = opt_lst.querySelectorAll(".option");
    for (let i=0; i< option.length;i++){
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}
var selected=""

function optionSelected(answer){
    let id= answer.id;
    console.log(id)
    let userAns= answer.textContent; 
    document.getElementById("op1").style.backgroundColor = "transparent";
    document.getElementById("op2").style.backgroundColor = "transparent";
    document.getElementById("op3").style.backgroundColor = "transparent";
    document.getElementById("op4").style.backgroundColor = "transparent";
    document.getElementById(id).style.backgroundColor = "rgb(255, 245, 232)";
    console.log(userAns)
    selected= userAns;
}

var c1score = 0;
var c2score = 0;
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
        if (choices2[i].value == 'c2') {
          c2score = c2score + 1;
        }
        if (choices2[i].value == 'c3') {
          c3score = c3score + 1;
        }
      }
    }
    final_score= 5*score + (3*c1score) + c2score + time;
    const res_text=document.querySelector(".result_text");
    if (final_score>75) {
        let res_tag= "<div class='res_txt'><span>Congratulations! The child does not show any signs or symptoms of Dyslexia</span></div>"
        res_text.innerHTML=res_tag;
    }
    else if (final_score>50){
        let res_tag= "<div class='res_txt'><span>Unfortunately, the child is showing mild signs of Dyslexia. Our risk-assessment test has categorized the results under the category, MILD RISK. Kindly get the child examined by a certified medical professional.</span></div>"
        res_text.innerHTML=res_tag;
    }
    else if (final_score>25){
        let res_tag= "<div class='res_txt'><span>Unfortunately, the child is showing certain signs of Dyslexia. Our risk-assessment test has categorized the results under the category, HIGH RISK. Kindly get the child examined by a certified medical professional at the earliest.</span></div>"
        res_text.innerHTML=res_tag;
    }
    else{
        let res_tag= "<div class='res_txt'><span>Unfortunately, the child is showing serious signs of Dyslexia. Our risk-assessment test has categorized the results under the category, VERY HIGH RISK. This requires immediate intervention. Kindly get the child examined by a certified medical professional.</span></div>"
        res_text.innerHTML=res_tag;
    }
    
}

document.getElementById("submit_btn").onclick = function() {
    tabulateAnswers();
    console.log(c1score)
    console.log(c2score)
    console.log(c3score)
    console.log(final_score)
    document.body.style.height = "100vh";
    document.getElementById("part2").style.display = "none";
    document.getElementById("end").style.display = "block";
}

function playAudio(url) {
    new Audio(url).play();
  }