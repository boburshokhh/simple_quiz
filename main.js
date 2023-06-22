const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
submitBtn.onclick = checkAnswer;

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  let headerTemplate = `<h2 class="title">%title%</h2>`;
  headerTemplate = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = headerTemplate;

  let answerNumber = 1;
  for ([index, answersText] of questions[questionIndex]["answers"].entries()) {
    const questionTemplate = `<li>
        <label>
          <input value='%number%' type="radio" class="answer" name="answer" />
          <span>%answer%</span>
        </label>
      </li>`;

    const answerHTML = questionTemplate
      .replace("%number%", answerNumber)
      .replace("%answer%", answersText);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}
function checkAnswer() {
  const checkRadio = listContainer.querySelector('input[type="radio"]:checked');

  if (!checkRadio) {
    submitBtn.blur();
    return;
  }
  const userAnswer = parseInt(checkRadio.value);
  if (questions[questionIndex]["correct"] === userAnswer) {
    score++;
  }
  if (questionIndex !== questions.length - 1) {
    console.log("Это не последный вопрос");
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    console.log("Послденый вопрос");
    clearPage();
    showResult();
    return;
  }
}

function showResult() {
  console.log("showResult");
  console.log(score);

  const resultsTemplate = `		
  
    <h2 class="title">%title%</h2>
    <h3 class="summary">%message%</h3>
    <p class="result">%result%</p>
  
`;
  let title, messsage;
  if (score === questions.length) {
    title = "Поздравляем!";
    messsage = "Вы ответили верно на все вопросы!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой резултат!";
    messsage = "Вы дали более половины правильных ответов";
  } else {
    title = "Вой жаллаб, надо учиться!";
    messsage = "Пока у вас меньше половины правильных ответов";
  }

  let result = `${score} из  ${questions.length}`;

  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", messsage)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;
  submitBtn.innerText = 'Начать заново'
  submitBtn.onclick = function(){
    history.go()
  };
}
