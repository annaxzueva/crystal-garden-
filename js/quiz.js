// Практическая работа 3, вариант 1 - Сленг

const questions = [
  {
    question: "А когда с человеком может произойти дрожемент?",
    answers: [
      { text: "Когда он влюбляется", right: false },
      { text: "Когда он идет шопиться", right: false },
      { text: "Когда он слышит смешную шутку", right: false },
      { text: "Когда он боится, пугается", right: true }
    ],
    info: "Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят»."
  },
  {
    question: "Говорят, Антон заовнил всех. Это еще как понимать?",
    answers: [
      { text: "Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?", right: false },
      { text: "Антон очень надоедливый и въедливый человек, всех задолбал", right: false },
      { text: "Молодец, Антон, всех победил!", right: true },
      { text: "Нет ничего плохого в том, что Антон тщательно выбирает себе друзей", right: false }
    ],
    info: "Термин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить»."
  },
  {
    question: "А фразу «заскамить мамонта» как понимать?",
    answers: [
      { text: "Разозлить кого-то из родителей", right: false },
      { text: "Увлекаться археологией", right: false },
      { text: "Развести недотепу на деньги", right: true },
      { text: "Оскорбить пожилого человека", right: false }
    ],
    info: "Заскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца."
  },
  {
    question: "Кто такие бефефе?",
    answers: [
      { text: "Вши?", right: false },
      { text: "Милые котики, такие милые, что бефефе", right: false },
      { text: "Лучшие друзья", right: true },
      { text: "Люди, которые не держат слово", right: false }
    ],
    info: "Бефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever."
  },
  {
    question: "Что из перечисленного можно назвать крашем, если ты чиллишь в компании и вдруг залипаешь на кого-то?",
    answers: [
      { text: "Человек, который тебе очень нравится и вызывает симпатию.", right: true },
      { text: "Тот, на кого приятно смотреть и хочется общаться.", right: true },
      { text: "Твоя сильно накрашенная подруга, которая переоценила свой макияж.", right: false },
      { text: "Трэш в более мягкой интерпретации.", right: false }
    ],
    info: "«Краш» — это объект симпатии; «чиллить» — расслабляться, отдыхать; «залипать» — засматриваться или задумываться."
  }
];

const list = document.getElementById("questions");
const end = document.getElementById("end");
const result = document.getElementById("result");

const order = questions.slice().sort(function () {
  return Math.random() - 0.5;
});

let num = 0;
let count = 0;
let busy = false;

function showQuestion() {
  if (num == order.length) {
    finish();
    return;
  }

  let q = order[num];

  let item = document.createElement("div");
  item.className = "item";

  let title = document.createElement("div");
  title.className = "question";
  title.innerHTML = (num + 1) + ". " + q.question + ' <span class="mark"></span>';

  let answersBox = document.createElement("div");
  answersBox.className = "answers";

  let answers = q.answers.slice().sort(function () {
    return Math.random() - 0.5;
  });

  for (let i = 0; i < answers.length; i++) {
    let block = document.createElement("div");
    block.className = "answer";
    block.innerHTML = answers[i].text;
    block.onclick = function () {
      checkAnswer(block, answers[i], q, item);
    };
    answersBox.appendChild(block);
  }

  let rightText = "";
  for (let i = 0; i < q.answers.length; i++) {
    if (q.answers[i].right) {
      if (rightText != "") rightText += " / ";
      rightText += q.answers[i].text;
    }
  }

  let rightAnswer = document.createElement("div");
  rightAnswer.className = "right-answer hidden";
  rightAnswer.innerHTML = "<b>Правильный ответ:</b> " + rightText + "<br>" + q.info;

  item.appendChild(title);
  item.appendChild(answersBox);
  item.appendChild(rightAnswer);
  list.appendChild(item);
}

function checkAnswer(block, answer, q, item) {
  if (busy) return;
  busy = true;

  let mark = item.querySelector(".mark");
  let blocks = item.querySelectorAll(".answer");

  block.classList.add("selected");

  if (answer.right) {
    count++;
    block.classList.add("correct");
    block.innerHTML += '<p class="info">Правильно! ' + q.info + "</p>";
  }

  setTimeout(function () {
    if (answer.right) {
      mark.innerHTML = "✔";
      mark.classList.add("ok");
    } else {
      mark.innerHTML = "✘";
      mark.classList.add("no");
    }

    let k = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (answer.right && blocks[i] == block) continue;
      moveRight(blocks[i], k);
      k++;
    }
    if (answer.right) {
      moveRight(block, k);
      k++;
    }

    setTimeout(function () {
      item.querySelector(".answers").remove();
      num++;
      busy = false;
      showQuestion();
    }, k * 400 + 800);
  }, 2000);
}

function moveRight(block, k) {
  setTimeout(function () {
    block.classList.add("go");
  }, k * 400);
}

function finish() {
  end.classList.remove("hidden");
  result.innerHTML = "Правильных ответов: " + count + " из " + order.length;

  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    let title = items[i].querySelector(".question");
    title.classList.add("can-click");
    title.onclick = function () {
      let rightAnswer = items[i].querySelector(".right-answer");
      let wasHidden = rightAnswer.classList.contains("hidden");

      let all = document.querySelectorAll(".right-answer");
      for (let j = 0; j < all.length; j++) {
        all[j].classList.add("hidden");
      }

      if (wasHidden) rightAnswer.classList.remove("hidden");
    };
  }
}

showQuestion();
