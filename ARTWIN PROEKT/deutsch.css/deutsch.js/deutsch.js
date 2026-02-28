// Навигация
function showSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function goBack() {
    showSection("home");
}

// Книги
const books = [
"Anna wohnt in Berlin. Sie lernt Deutsch jeden Tag.",
"Max geht in die Schule. Er hat viele Freunde."
];

document.getElementById("bookText").innerText =
books[Math.floor(Math.random() * books.length)];

function speakText() {
    const text = document.getElementById("bookText").innerText;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "de-DE";
    speechSynthesis.speak(speech);
}

// Игра
const animals = [
{q:"Es ist groß und grau mit einem Rüssel.",a:"Elefant"},
{q:"Es sagt Miau.",a:"Katze"},
{q:"Es sagt Wuff.",a:"Hund"}
];

let currentAnimal = animals[Math.floor(Math.random()*animals.length)];
document.getElementById("animalQuestion").innerText = currentAnimal.q;

function checkAnimal(){
let ans = document.getElementById("animalAnswer").value;
if(ans.toLowerCase()==currentAnimal.a.toLowerCase()){
document.getElementById("animalResult").innerText="Richtig!";
saveProgress(5);
}else{
document.getElementById("animalResult").innerText="Falsch! "+currentAnimal.a;
}
}

// Тест + уровень
const questions = [
{q:"Ich ___ Deutsch.",a:"lerne",level:"A1"},
{q:"Perfekt von gehen?",a:"gegangen",level:"A2"},
{q:"Konjunktiv II von haben?",a:"hätte",level:"B1"}
];

let score = localStorage.getItem("score") || 0;
updateLevel();

let currentQuestion = questions[Math.floor(Math.random()*questions.length)];
document.getElementById("question").innerText = currentQuestion.q;

function checkAnswer(){
let ans = document.getElementById("answer").value;
if(ans.toLowerCase()==currentQuestion.a.toLowerCase()){
document.getElementById("testResult").innerText="Sehr gut!";
saveProgress(10);
}else{
document.getElementById("testResult").innerText="Richtig: "+currentQuestion.a;
}
currentQuestion = questions[Math.floor(Math.random()*questions.length)];
document.getElementById("question").innerText = currentQuestion.q;
}

function saveProgress(points){
score = parseInt(score) + points;
localStorage.setItem("score", score);
updateLevel();
}

function updateLevel(){
let level="A1";
if(score>50) level="A2";
if(score>100) level="B1";
if(score>200) level="B2";
if(score>300) level="C1";
document.getElementById("level").innerText=level;
}

// PWA
if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js");
}