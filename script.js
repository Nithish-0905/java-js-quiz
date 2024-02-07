const questions = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            { text:"var", correct:false},
            { text:"let", correct:false},
            { text:"both a and b", correct:true},
            { text:"none", correct:false},
        ]
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers: [
            { text:"throw an error", correct:false},
            { text:"ignores the statment", correct:true},
            { text:"gives a warning", correct:false},
            { text:"none", correct:false},
        ]
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            { text:"document.write()", correct:false},
            { text:"console.log()", correct:false},
            { text:"window.alert()", correct:false},
            { text:"All of the above", correct:true},
        ]
    },
    {
        question: "Choose the server-side JavaScript object?",
        answers: [
            { text:"FileUpLoad", correct:false},
            { text:"File", correct:true},
            { text:"Date", correct:false},
            { text:"Function", correct:false},
        ]
    },
    {
        question: "Which method of an Array object adds and/or removes elements from an array",
        answers: [
            { text:"Reverse", correct:false},
            { text:"Splice", correct:true},
            { text:"Shift", correct:false},
            { text:"Slice", correct:false},
        ]
    },
    {
        question: "The syntax of a blur method in a buttonobject is?",
        answers: [
            { text:"Blur()", correct:true},
            { text:"Blur(contrast)", correct:false},
            { text:"Blur(value)", correct:false},
            { text:"Blur(depth)", correct:false},
        ]
    },
    {
        question: "What is mean by <this> keyword in javascript?",
        answers: [
            { text:"It refers current object", correct:true},
            { text:"It referes previous object", correct:false},
            { text:"It is variable which contains value", correct:false},
            { text:"None of the above", correct:false},
        ]
    },
    {
        question: "What is the use of the <noscript> tag in Javascript?",
        answers: [
            { text:"The contents are displayed by non-JS-based browsers", correct:false},
            { text:"Clears all the cookies", correct:false},
            { text:"none", correct:false},
            { text:"Both A and B", correct:true},
        ]
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        answers: [
            { text:"is in", correct:false},
            { text:"exists", correct:false},
            { text:"in", correct:true},
            { text:"lies", correct:false},
        ]
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: [
            { text:"constant", correct:false},
            { text:"let", correct:false},
            { text:"var", correct:false},
            { text:"const", correct:true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-button");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
   
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton=e.target;
    const isCorrect = selectedButton.dataset.correct==="true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    if(score>7){
    questionElement.innerHTML=`Congratulation you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    }
    else{
        questionElement.innerHTML=`You scored ${score} out of ${questions.length}! Dont worry try again!!!`;

    }
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();