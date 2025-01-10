const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

// スピーチボックスを作成
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // 'active'クラスを付与
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  main.appendChild(box);
}

// セットされた音声を初期化
const message = new SpeechSynthesisUtterance();

// 音声を格納
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `
      ${voice.name} ${voice.lang}
    `;

    voicesSelect.appendChild(option);
  });
}

// テキストをセット
function setTextMessage(text) {
  message.text = text;
}

// セットしたテキストを音声にする
function speakText() {
  speechSynthesis.speak(message);
}

// 音声の変更
speechSynthesis.addEventListener("voiceschanged", getVoices);

// トグルボタンをクリックしてモーダルを表示
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

// 閉じるボタンをクリックしてモーダルを非表示
closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

getVoices();
