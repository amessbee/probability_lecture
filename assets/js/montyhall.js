const SCORE_KEY = "montyHallSessionScore";

const modeButtons = {
  single: document.getElementById("singleModeBtn"),
  two: document.getElementById("twoModeBtn"),
};

const setupCard = document.getElementById("setupCard");
const gameCard = document.getElementById("gameCard");
const playerOneInput = document.getElementById("playerOneInput");
const playerTwoInput = document.getElementById("playerTwoInput");
const startSessionBtn = document.getElementById("startSessionBtn");
const modeTitle = document.getElementById("modeTitle");
const modeHelp = document.getElementById("modeHelp");
const scoreboard = document.getElementById("scoreboard");
const statusText = document.getElementById("statusText");
const doorsHost = document.getElementById("doors");
const decisionRow = document.getElementById("decisionRow");
const decisionPrompt = document.getElementById("decisionPrompt");
const stayBtn = document.getElementById("stayBtn");
const switchBtn = document.getElementById("switchBtn");
const newRoundBtn = document.getElementById("newRoundBtn");
const changeSetupBtn = document.getElementById("changeSetupBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const state = {
  mode: "single",
  phase: "setup",
  players: {
    one: "player1",
    two: "player2",
  },
  score: {
    singleRounds: 0,
    singleWins: 0,
    singleLosses: 0,
    singleStayWins: 0,
    singleSwitchWins: 0,
    twoRounds: 0,
    playerOneWins: 0,
    playerTwoWins: 0,
  },
  round: {
    carDoor: null,
    selectedDoor: null,
    hostDoor: null,
    switchedDoor: null,
  },
};

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function availableDoors(excluded) {
  return [0, 1, 2].filter((doorIndex) => !excluded.includes(doorIndex));
}

function chooseHostDoor(selectedDoor, carDoor) {
  const choices = [0, 1, 2].filter(
    (doorIndex) => doorIndex !== selectedDoor && doorIndex !== carDoor,
  );
  return choices[randomInt(choices.length)];
}

function chooseSwitchDoor(selectedDoor, hostDoor) {
  return availableDoors([selectedDoor, hostDoor])[0];
}

function doorMarkup(index) {
  return `
    <div class="mh-door-card" data-door="${index}">
      <button class="mh-door-hit" aria-label="Door ${index + 1}">
        <svg class="mh-door-svg" viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Door ${index + 1}">
          <rect x="10" y="10" width="200" height="320" rx="28" fill="#2b1f14" opacity="0.25" />
          <g class="mh-door-panel">
            <rect x="20" y="20" width="180" height="300" rx="24" fill="url(#wood-mh-${index})" stroke="#f2c182" stroke-width="4" />
            <rect x="45" y="52" width="130" height="236" rx="16" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <circle cx="163" cy="171" r="10" fill="#f7dfb3" stroke="#8f5d20" stroke-width="2" />
          </g>
          <g class="mh-door-goat">
            <ellipse cx="106" cy="284" rx="62" ry="11" fill="rgba(0,0,0,0.3)" />
            <g filter="url(#softShadow-mh-${index})">
              <path d="M48 246 C53 217, 87 199, 131 205 C165 210, 180 233, 176 258 C171 285, 143 298, 108 298 C74 298, 54 282, 48 246 Z" fill="url(#goatBody-mh-${index})" />
              <path d="M68 236 C84 227, 100 224, 124 226" stroke="rgba(255,255,255,0.42)" stroke-width="2.2" fill="none" />
              <ellipse cx="96" cy="249" rx="11" ry="8" fill="rgba(140,115,88,0.35)" />
              <ellipse cx="128" cy="257" rx="12" ry="9" fill="rgba(140,115,88,0.34)" />
              <path d="M80 299 L77 261" stroke="#bca988" stroke-width="7" stroke-linecap="round" />
              <path d="M101 299 L101 262" stroke="#bca988" stroke-width="7" stroke-linecap="round" />
              <path d="M128 299 L130 263" stroke="#bca988" stroke-width="7" stroke-linecap="round" />
              <path d="M150 299 L153 264" stroke="#bca988" stroke-width="7" stroke-linecap="round" />
              <ellipse cx="77" cy="298" rx="6" ry="3" fill="#4b3c2e" />
              <ellipse cx="101" cy="298" rx="6" ry="3" fill="#4b3c2e" />
              <ellipse cx="130" cy="298" rx="6" ry="3" fill="#4b3c2e" />
              <ellipse cx="153" cy="298" rx="6" ry="3" fill="#4b3c2e" />
            </g>
            <path d="M150 225 C154 206, 171 196, 187 201 C198 205, 203 218, 201 229 C199 241, 189 249, 176 249 C163 249, 147 241, 150 225 Z" fill="url(#goatHead-mh-${index})" />
            <path d="M181 245 C183 252, 182 260, 177 265" stroke="#cbb699" stroke-width="3" fill="none" stroke-linecap="round" />
            <path d="M190 204 C202 189, 205 173, 196 164" stroke="#8d7454" stroke-width="4" fill="none" stroke-linecap="round" />
            <path d="M165 204 C154 191, 151 177, 158 168" stroke="#8d7454" stroke-width="4" fill="none" stroke-linecap="round" />
            <path d="M170 247 L166 259" stroke="#dac8ac" stroke-width="3" stroke-linecap="round" />
            <ellipse cx="194" cy="219" rx="5" ry="9" fill="#c8b093" />
            <ellipse cx="161" cy="219" rx="5" ry="9" fill="#c8b093" />
            <circle cx="183" cy="220" r="2.5" fill="#111" />
            <circle cx="172" cy="220" r="2.4" fill="#111" />
            <ellipse cx="178" cy="230" rx="4" ry="2.4" fill="#7b5d49" />
            <path d="M176 232 C177 235, 180 236, 181 239" stroke="#7b5d49" stroke-width="1.8" fill="none" stroke-linecap="round" />
          </g>
          <g class="mh-door-car">
            <ellipse cx="110" cy="286" rx="70" ry="11" fill="rgba(0,0,0,0.32)" />
            <g filter="url(#carShadow-mh-${index})">
              <path d="M32 258 C37 243, 53 225, 76 219 L130 216 C155 215, 174 228, 186 247 L192 258 C194 262, 191 266, 184 266 L41 266 C35 266, 30 262, 32 258 Z" fill="url(#carPaint-mh-${index})" />
              <path d="M77 219 L95 199 C99 194, 106 191, 115 191 L139 191 C150 191, 159 195, 168 205 L179 219 Z" fill="url(#glass-mh-${index})" />
              <path d="M97 198 L150 206" stroke="rgba(255,255,255,0.45)" stroke-width="1.6" fill="none" />
              <path d="M47 258 C67 251, 116 248, 178 252" stroke="rgba(255,255,255,0.24)" stroke-width="2" fill="none" />
              <path d="M54 238 L66 238" stroke="#ffdcae" stroke-width="6" stroke-linecap="round" />
              <path d="M168 239 L180 239" stroke="#ffdcae" stroke-width="6" stroke-linecap="round" />
              <path d="M88 217 L90 266" stroke="rgba(10,32,52,0.42)" stroke-width="1.8" />
              <path d="M147 214 L149 266" stroke="rgba(10,32,52,0.42)" stroke-width="1.8" />
              <circle cx="76" cy="268" r="17" fill="#0d1420" />
              <circle cx="76" cy="268" r="10" fill="url(#rim-mh-${index})" />
              <circle cx="76" cy="268" r="4" fill="#5f738e" />
              <circle cx="148" cy="268" r="17" fill="#0d1420" />
              <circle cx="148" cy="268" r="10" fill="url(#rim-mh-${index})" />
              <circle cx="148" cy="268" r="4" fill="#5f738e" />
              <path d="M66 268 L86 268 M76 258 L76 278" stroke="rgba(225,236,247,0.75)" stroke-width="1.1" />
              <path d="M138 268 L158 268 M148 258 L148 278" stroke="rgba(225,236,247,0.75)" stroke-width="1.1" />
              <path d="M80 223 C110 212, 152 215, 173 228" stroke="rgba(255,255,255,0.55)" stroke-width="2.2" fill="none" />
            </g>
          </g>
          <defs>
            <linearGradient id="wood-mh-${index}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#d19443" />
              <stop offset="100%" stop-color="#7f3a17" />
            </linearGradient>
            <linearGradient id="goatBody-mh-${index}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#f7f0e2" />
              <stop offset="55%" stop-color="#e8dcc6" />
              <stop offset="100%" stop-color="#cbb699" />
            </linearGradient>
            <radialGradient id="goatHead-mh-${index}" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#fff6e7" />
              <stop offset="70%" stop-color="#e1cfb3" />
              <stop offset="100%" stop-color="#baa384" />
            </radialGradient>
            <linearGradient id="carPaint-mh-${index}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#84e7ff" />
              <stop offset="38%" stop-color="#41c0f8" />
              <stop offset="72%" stop-color="#208fcd" />
              <stop offset="100%" stop-color="#0f4f87" />
            </linearGradient>
            <linearGradient id="glass-mh-${index}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="rgba(179,231,255,0.9)" />
              <stop offset="100%" stop-color="rgba(64,139,187,0.85)" />
            </linearGradient>
            <radialGradient id="rim-mh-${index}" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stop-color="#e6edf6" />
              <stop offset="100%" stop-color="#8f9fb5" />
            </radialGradient>
            <filter id="softShadow-mh-${index}" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.24)" />
            </filter>
            <filter id="carShadow-mh-${index}" x="-20%" y="-20%" width="150%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="rgba(0,0,0,0.28)" />
            </filter>
          </defs>
        </svg>
      </button>
    </div>
  `;
}

function renderDoors() {
  doorsHost.innerHTML = [0, 1, 2].map((index) => doorMarkup(index)).join("");
  bindDoorEvents();
}

function doorCards() {
  return Array.from(doorsHost.querySelectorAll(".mh-door-card"));
}

function bindDoorEvents() {
  doorCards().forEach((card) => {
    const hit = card.querySelector(".mh-door-hit");
    hit.addEventListener("click", handleDoorClick);
  });
}

function resetDoorVisuals() {
  doorCards().forEach((card) => {
    card.classList.remove(
      "active",
      "open",
      "show-goat",
      "show-car",
      "win",
      "lose",
    );
    const hit = card.querySelector(".mh-door-hit");
    hit.disabled = false;
  });
}

function revealDoor(doorIndex) {
  const card = doorCards()[doorIndex];
  if (!card) {
    return;
  }

  card.classList.add("open");
  if (doorIndex === state.round.carDoor) {
    card.classList.add("show-car");
    return;
  }

  card.classList.add("show-goat");
}

function revealAllDoors() {
  [0, 1, 2].forEach((doorIndex) => revealDoor(doorIndex));
}

function setMode(mode) {
  state.mode = mode;
  modeButtons.single.classList.toggle("active", mode === "single");
  modeButtons.two.classList.toggle("active", mode === "two");
  modeButtons.single.setAttribute("aria-pressed", String(mode === "single"));
  modeButtons.two.setAttribute("aria-pressed", String(mode === "two"));
  renderScoreboard();
}

function sanitizeName(value, fallback) {
  const cleaned = String(value || "").trim();
  return cleaned.length ? cleaned : fallback;
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SCORE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    if (parsed && parsed.players && parsed.score) {
      state.players.one = sanitizeName(parsed.players.one, "player1");
      state.players.two = sanitizeName(parsed.players.two, "player2");
      state.score = {
        ...state.score,
        ...parsed.score,
      };
      playerOneInput.value = state.players.one;
      playerTwoInput.value = state.players.two;
    }
  } catch (_err) {
    // Ignore broken session payloads.
  }
}

function saveSession() {
  const payload = {
    players: state.players,
    score: state.score,
  };
  sessionStorage.setItem(SCORE_KEY, JSON.stringify(payload));
}

function scoreboardTiles() {
  if (state.mode === "single") {
    return [
      {
        title: "Single-player rounds",
        value: String(state.score.singleRounds),
      },
      {
        title: `${state.players.one} record`,
        value: `${state.score.singleWins} wins / ${state.score.singleLosses} losses`,
      },
      {
        title: "Stay vs switch wins",
        value: `${state.score.singleStayWins} stay / ${state.score.singleSwitchWins} switch`,
      },
    ];
  }

  return [
    { title: "Two-player rounds", value: String(state.score.twoRounds) },
    {
      title: `${state.players.one} (always stay)`,
      value: `${state.score.playerOneWins} wins`,
    },
    {
      title: `${state.players.two} (always switch)`,
      value: `${state.score.playerTwoWins} wins`,
    },
  ];
}

function renderScoreboard() {
  scoreboard.innerHTML = scoreboardTiles()
    .map(
      (tile) =>
        `<article class="mh-score-tile"><p class="mh-score-title">${tile.title}</p><p class="mh-score-value">${tile.value}</p></article>`,
    )
    .join("");
}

function setStatus(message, tone = "") {
  statusText.textContent = message;
  statusText.classList.remove("win", "lose");
  if (tone) {
    statusText.classList.add(tone);
  }
}

function beginRound() {
  state.phase = "choose";
  state.round.carDoor = randomInt(3);
  state.round.selectedDoor = null;
  state.round.hostDoor = null;
  state.round.switchedDoor = null;
  resetDoorVisuals();
  decisionRow.classList.add("hidden");

  if (state.mode === "single") {
    modeTitle.textContent = "Single player mode";
    modeHelp.textContent = `${state.players.one} picks first, then decides stay or switch.`;
    setStatus("Pick one door to start the round.");
  } else {
    modeTitle.textContent = "Two player mode";
    modeHelp.textContent = `${state.players.one} always stays. ${state.players.two} always switches.`;
    setStatus(`${state.players.one}, choose the starting door.`);
  }

  renderScoreboard();
}

function lockDoors() {
  doorCards().forEach((card) => {
    const hit = card.querySelector(".mh-door-hit");
    hit.disabled = true;
  });
}

function markSelection(doorIndex) {
  const card = doorCards()[doorIndex];
  if (card) {
    card.classList.add("active");
  }
}

function handleSingleSelection(doorIndex) {
  state.round.selectedDoor = doorIndex;
  markSelection(doorIndex);
  state.round.hostDoor = chooseHostDoor(doorIndex, state.round.carDoor);
  revealDoor(state.round.hostDoor);
  state.phase = "decision";

  decisionPrompt.textContent =
    "Host opened a goat door. Stay with your choice or switch to the remaining closed door?";
  decisionRow.classList.remove("hidden");
  setStatus("Choose Stay or Switch.");

  doorCards().forEach((card, idx) => {
    const hit = card.querySelector(".mh-door-hit");
    hit.disabled = idx !== state.round.selectedDoor;
  });
}

function settleSingleRound(choice) {
  const stayed = choice === "stay";
  const finalDoor = stayed
    ? state.round.selectedDoor
    : chooseSwitchDoor(state.round.selectedDoor, state.round.hostDoor);

  state.round.switchedDoor = finalDoor;
  state.score.singleRounds += 1;
  revealAllDoors();
  decisionRow.classList.add("hidden");
  lockDoors();

  const win = finalDoor === state.round.carDoor;
  if (win) {
    state.score.singleWins += 1;
    if (stayed) {
      state.score.singleStayWins += 1;
    } else {
      state.score.singleSwitchWins += 1;
    }
    doorCards()[finalDoor].classList.add("win");
    setStatus(
      `${state.players.one} ${stayed ? "stayed" : "switched"} and won the car behind Door ${
        finalDoor + 1
      }.`,
      "win",
    );
  } else {
    state.score.singleLosses += 1;
    doorCards()[finalDoor].classList.add("lose");
    doorCards()[state.round.carDoor].classList.add("win");
    setStatus(
      `${state.players.one} ${stayed ? "stayed" : "switched"} and got a goat. Car was behind Door ${
        state.round.carDoor + 1
      }.`,
      "lose",
    );
  }

  state.phase = "revealed";
  renderScoreboard();
  saveSession();
}

function settleTwoPlayerRound() {
  state.score.twoRounds += 1;
  state.round.hostDoor = chooseHostDoor(
    state.round.selectedDoor,
    state.round.carDoor,
  );
  state.round.switchedDoor = chooseSwitchDoor(
    state.round.selectedDoor,
    state.round.hostDoor,
  );

  revealDoor(state.round.hostDoor);
  revealAllDoors();
  lockDoors();

  const playerOneWon = state.round.selectedDoor === state.round.carDoor;
  const playerTwoWon = state.round.switchedDoor === state.round.carDoor;

  if (playerOneWon) {
    state.score.playerOneWins += 1;
    doorCards()[state.round.selectedDoor].classList.add("win");
  } else {
    doorCards()[state.round.selectedDoor].classList.add("lose");
  }

  if (playerTwoWon) {
    state.score.playerTwoWins += 1;
    doorCards()[state.round.switchedDoor].classList.add("win");
  } else {
    doorCards()[state.round.switchedDoor].classList.add("lose");
  }

  setStatus(
    `${state.players.one} stayed on Door ${state.round.selectedDoor + 1}. ${
      state.players.two
    } switched to Door ${state.round.switchedDoor + 1}. Car: Door ${
      state.round.carDoor + 1
    }.`,
    playerTwoWon ? "win" : "lose",
  );

  state.phase = "revealed";
  renderScoreboard();
  saveSession();
}

function handleDoorClick(event) {
  if (state.phase !== "choose") {
    return;
  }

  const card = event.currentTarget.closest(".mh-door-card");
  const doorIndex = Number(card?.dataset.door);
  if (!Number.isInteger(doorIndex) || doorIndex < 0 || doorIndex > 2) {
    return;
  }

  state.round.selectedDoor = doorIndex;
  markSelection(doorIndex);

  if (state.mode === "single") {
    handleSingleSelection(doorIndex);
    return;
  }

  settleTwoPlayerRound();
}

function startSession() {
  state.players.one = sanitizeName(playerOneInput.value, "player1");
  state.players.two = sanitizeName(playerTwoInput.value, "player2");
  playerOneInput.value = state.players.one;
  playerTwoInput.value = state.players.two;
  setupCard.classList.add("hidden");
  gameCard.classList.remove("hidden");
  beginRound();
  saveSession();
}

function resetScore() {
  state.score = {
    singleRounds: 0,
    singleWins: 0,
    singleLosses: 0,
    singleStayWins: 0,
    singleSwitchWins: 0,
    twoRounds: 0,
    playerOneWins: 0,
    playerTwoWins: 0,
  };
  saveSession();
  beginRound();
}

function showSetup() {
  setupCard.classList.remove("hidden");
  gameCard.classList.add("hidden");
  state.phase = "setup";
}

modeButtons.single.addEventListener("click", () => setMode("single"));
modeButtons.two.addEventListener("click", () => setMode("two"));
startSessionBtn.addEventListener("click", startSession);
newRoundBtn.addEventListener("click", beginRound);
changeSetupBtn.addEventListener("click", showSetup);
resetScoreBtn.addEventListener("click", resetScore);
stayBtn.addEventListener("click", () => settleSingleRound("stay"));
switchBtn.addEventListener("click", () => settleSingleRound("switch"));

renderDoors();
loadSession();
setMode("single");
renderScoreboard();
