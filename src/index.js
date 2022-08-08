import shuffle from "./utilites/shuffle.js";
import Card from "./components/Card.js";

const audio = new Audio("../liqwyd-trick-or-treat.mp3");

let idioms = [
  {
    eng: "It’s raining cats and dogs",
    pl: "leje jak z cebra",
  },
  {
    eng: "Let the cat out of the bag",
    pl: "wygadać się",
  },
  {
    eng: "It’s not a rocket science",
    pl: "To nie jest zbyt skomplikoane",
  },
  {
    eng: "No pain, no gain",
    pl: "Trzeba racować na efekty",
  },
];

let idiomsPL = [
  "leje jak z cebra",
  "wygadać się",
  "To nie jest zbyt skomplikoane",
  "Trzeba racować na efekty",
];

let idiomsAng = [
  "It’s raining cats and dogs",
  "Let the cat out of the bag",
  "It’s not a rocket science",
  "No pain, no gain",
];

let allCards = [...document.getElementsByClassName("Card")];
const points = document.getElementById("points-value");

idiomsPL = shuffle(idiomsPL);
idiomsAng = shuffle(idiomsAng);

let finished = [];

const plCards = [];
const angCards = [];

let firstCardIdiom = false;
let firstCardClicked = false;

const showIdiom = (element, idiom) => {
  element.classList.add("clicked");
  element.insertAdjacentHTML("afterbegin", `<p>${idiom}</p>`);
};

const audioWin = new Audio("../halloween-114610.mp3");

const game = (event, cardIdiom) => {
  if (cardIdiom === firstCardIdiom) return;
  event.target.classList.add("clicked");
  showIdiom(event.target, cardIdiom);
  if (firstCardIdiom !== false) {
    let firstID;
    let secondID;
    idioms.forEach((idiom, id) => {
      if (firstCardIdiom === idiom.pl || firstCardIdiom === idiom.eng) {
        firstID = id;
      }

      if (cardIdiom === idiom.pl || cardIdiom === idiom.eng) {
        secondID = id;
      }
    });

    if (firstID === secondID) {
      points.innerHTML = +points.innerHTML + 10;
      finished.push(idioms[firstID]);
      firstCardIdiom = false;
      setTimeout(() => {
        firstCardClicked.style.visibility = "hidden";
        event.target.style.visibility = "hidden";
        firstCardClicked.removeEventListener("click", game);
        event.target.removeEventListener("click", game);
        GameFinished();
      }, 2000);
    } else {
      firstCardIdiom = false;
      setTimeout(() => {
        event.target.classList.remove("clicked");
        firstCardClicked.classList.remove("clicked");
        event.target.innerHTML = "";
        firstCardClicked.innerHTML = "";
      }, 2000);
    }
  } else {
    firstCardIdiom = cardIdiom;
    firstCardClicked = event.target;
  }
};

const rerender = () => {
  allCards = allCards.map((card) => {
    card.remove();
    let card1 = document.createElement("div");
    card1.classList.add("Card");
    document.getElementById("Board").appendChild(card1);
    return card1;
  });
};

const randomize = () => {
  rerender();
  idiomsPL = shuffle(idiomsPL);
  idiomsAng = shuffle(idiomsAng);
  for (let i = 0; i < 4; i++) {
    const card = Card(allCards[i], idiomsPL[i]);
    card.addEventListener(game);
    plCards[i] = card;
  }

  for (let i = 4; i < 8; i++) {
    const card = Card(allCards[i], idiomsAng[i - 4]);
    card.addEventListener(game);
    angCards[i] = card;
  }
};

randomize();

const reload = document.getElementById("reload");

reload.addEventListener("click", () => {
  location.reload();
  return false;
});

window.addEventListener("load", audio.play());

const randomizeBtn = document.getElementById("randomize");

const pause = () => {
  if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
};

const mute = document.getElementById("mute");
mute.addEventListener("click", pause);

randomizeBtn.addEventListener("click", randomize);

function youWon() {
  audio.pause();
  audioWin.play();
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("congratulations").style.display = "none";
    }
  });
}

function GameFinished() {
  if (+points.innerHTML == 40) {
    const div = document.getElementById("congratulations");
    div.style.display = "block";
    div.addEventListener("click", youWon);
  }
}
