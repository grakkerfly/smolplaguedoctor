/* =========================================================
   EASY CONFIG — CHANGE THE 3 PROJECT LINKS HERE
   ========================================================= */

const PROJECT_LINKS = {
  twitter: "https://x.com/smolplaguedr",
  pumpfun: "https://pump.fun/coin/9QrQ823pGjgEsaHgx7d3BHmqhqj8hrZ2RhcP4CG9pump",
  contractAddress: "9QrQ823pGjgEsaHgx7d3BHmqhqj8hrZ2RhcP4CG9pump"
};

function updateProjectLinks({
  twitter = PROJECT_LINKS.twitter,
  pumpfun = PROJECT_LINKS.pumpfun,
  contractAddress = PROJECT_LINKS.contractAddress
} = {}) {
  PROJECT_LINKS.twitter = twitter;
  PROJECT_LINKS.pumpfun = pumpfun;
  PROJECT_LINKS.contractAddress = contractAddress;

  document.getElementById("twitterLink").href = PROJECT_LINKS.twitter;
  document.getElementById("pumpLink").href = PROJECT_LINKS.pumpfun;
  document.getElementById("copyStatus").textContent = PROJECT_LINKS.contractAddress;
}

/* =========================================================
   CONTENT
   Phrase + PNG + sound always change together.
   ========================================================= */

const diagnoses = [
  {
    text: "i diagnose you with ai model best friend syndrome",
    image: "assets/claudefriend.png",
    sound: "assets/soundeffect/1.mp3"
  },
  {
    text: "i diagnose you with bullish delulu",
    image: "assets/delulu.png",
    sound: "assets/soundeffect/2.mp3"
  },
  {
    text: "i diagnose you with always early syndrome",
    image: "assets/early.png",
    sound: "assets/soundeffect/3.mp3"
  },
  {
    text: "i diagnose you with gambling addiction",
    image: "assets/gambling.png",
    sound: "assets/soundeffect/4.mp3"
  }
];

let currentIndex = 0;
let switching = false;

const stage = document.getElementById("stage");
const diagnosisText = document.getElementById("diagnosisText");
const diagnosisImage = document.getElementById("diagnosisImage");
const soundPlayer = document.getElementById("soundPlayer");
const copyCaButton = document.getElementById("copyCaButton");
const copyStatus = document.getElementById("copyStatus");

updateProjectLinks();

function playSound(src) {
  soundPlayer.pause();
  soundPlayer.src = src;
  soundPlayer.volume = 1;
  soundPlayer.muted = false;
  soundPlayer.load();

  soundPlayer.play().catch((error) => {
    console.error("Erro ao tocar áudio:", soundPlayer.src, error);
  });
}

soundPlayer.addEventListener("error", () => {
  console.error(
    "Não foi possível carregar o áudio:",
    soundPlayer.src,
    soundPlayer.error
  );
});

function switchDiagnosis() {
  if (switching) return;
  switching = true;

  currentIndex = (currentIndex + 1) % diagnoses.length;
  const next = diagnoses[currentIndex];

  diagnosisText.textContent = next.text;
  diagnosisImage.src = next.image;
  playSound(next.sound);

  stage.classList.remove("shake");
  void stage.offsetWidth;
  stage.classList.add("shake");

  setTimeout(() => {
    stage.classList.remove("shake");
    switching = false;
  }, 200);
}

async function copyContractAddress() {
  const value = PROJECT_LINKS.contractAddress;

  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const temp = document.createElement("textarea");
    temp.value = value;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }

  copyStatus.textContent = "copied";

  setTimeout(() => {
    copyStatus.textContent = PROJECT_LINKS.contractAddress;
  }, 900);
}

document.addEventListener("click", (event) => {
  if (event.target.closest("a, button")) return;
  switchDiagnosis();
});

copyCaButton.addEventListener("click", (event) => {
  event.stopPropagation();
  copyContractAddress();
});
