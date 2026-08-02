const state = {
        pickedDoor: 0,
        carDoor: 2,
        stage1Picked: null,
        lastDoorPick: null,
        doorIntroToken: 0,
        doorIntroPhase: "idle",
      };

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      function doorMarkup(index, idPrefix) {
        return `
          <div class="door-card glass" data-idx="${index}">
            <button class="door-hit" aria-label="Door ${index + 1}">
              <svg class="door-svg" viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="200" height="320" rx="28" fill="#2b1f14" opacity="0.25" />
                <g class="door-panel">
                  <rect x="20" y="20" width="180" height="300" rx="24" fill="url(#wood-${idPrefix}-${index})" stroke="#f2c182" stroke-width="4" />
                  <rect x="45" y="52" width="130" height="236" rx="16" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
                  <circle cx="163" cy="171" r="10" fill="#f7dfb3" stroke="#8f5d20" stroke-width="2" />
                </g>
                <g class="door-goat">
                  <ellipse cx="106" cy="284" rx="62" ry="11" fill="rgba(0,0,0,0.3)" />
                  <g filter="url(#softShadow-${idPrefix}-${index})">
                    <path d="M48 246 C53 217, 87 199, 131 205 C165 210, 180 233, 176 258 C171 285, 143 298, 108 298 C74 298, 54 282, 48 246 Z" fill="url(#goatBody-${idPrefix}-${index})" />
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
                  <path d="M150 225 C154 206, 171 196, 187 201 C198 205, 203 218, 201 229 C199 241, 189 249, 176 249 C163 249, 147 241, 150 225 Z" fill="url(#goatHead-${idPrefix}-${index})" />
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
                <g class="door-car">
                  <ellipse cx="110" cy="286" rx="70" ry="11" fill="rgba(0,0,0,0.32)" />
                  <g filter="url(#carShadow-${idPrefix}-${index})">
                    <path d="M32 258 C37 243, 53 225, 76 219 L130 216 C155 215, 174 228, 186 247 L192 258 C194 262, 191 266, 184 266 L41 266 C35 266, 30 262, 32 258 Z" fill="url(#carPaint-${idPrefix}-${index})" />
                    <path d="M77 219 L95 199 C99 194, 106 191, 115 191 L139 191 C150 191, 159 195, 168 205 L179 219 Z" fill="url(#glass-${idPrefix}-${index})" />
                    <path d="M97 198 L150 206" stroke="rgba(255,255,255,0.45)" stroke-width="1.6" fill="none" />
                    <path d="M47 258 C67 251, 116 248, 178 252" stroke="rgba(255,255,255,0.24)" stroke-width="2" fill="none" />
                    <path d="M54 238 L66 238" stroke="#ffdcae" stroke-width="6" stroke-linecap="round" />
                    <path d="M168 239 L180 239" stroke="#ffdcae" stroke-width="6" stroke-linecap="round" />
                    <path d="M88 217 L90 266" stroke="rgba(10,32,52,0.42)" stroke-width="1.8" />
                    <path d="M147 214 L149 266" stroke="rgba(10,32,52,0.42)" stroke-width="1.8" />
                    <circle cx="76" cy="268" r="17" fill="#0d1420" />
                    <circle cx="76" cy="268" r="10" fill="url(#rim-${idPrefix}-${index})" />
                    <circle cx="76" cy="268" r="4" fill="#5f738e" />
                    <circle cx="148" cy="268" r="17" fill="#0d1420" />
                    <circle cx="148" cy="268" r="10" fill="url(#rim-${idPrefix}-${index})" />
                    <circle cx="148" cy="268" r="4" fill="#5f738e" />
                    <path d="M66 268 L86 268 M76 258 L76 278" stroke="rgba(225,236,247,0.75)" stroke-width="1.1" />
                    <path d="M138 268 L158 268 M148 258 L148 278" stroke="rgba(225,236,247,0.75)" stroke-width="1.1" />
                    <path d="M80 223 C110 212, 152 215, 173 228" stroke="rgba(255,255,255,0.55)" stroke-width="2.2" fill="none" />
                  </g>
                </g>
                <defs>
                  <linearGradient id="wood-${idPrefix}-${index}" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#d19443" />
                    <stop offset="100%" stop-color="#7f3a17" />
                  </linearGradient>
                  <linearGradient id="goatBody-${idPrefix}-${index}" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#f7f0e2" />
                    <stop offset="55%" stop-color="#e8dcc6" />
                    <stop offset="100%" stop-color="#cbb699" />
                  </linearGradient>
                  <radialGradient id="goatHead-${idPrefix}-${index}" cx="40%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#fff6e7" />
                    <stop offset="70%" stop-color="#e1cfb3" />
                    <stop offset="100%" stop-color="#baa384" />
                  </radialGradient>
                  <linearGradient id="carPaint-${idPrefix}-${index}" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#84e7ff" />
                    <stop offset="38%" stop-color="#41c0f8" />
                    <stop offset="72%" stop-color="#208fcd" />
                    <stop offset="100%" stop-color="#0f4f87" />
                  </linearGradient>
                  <linearGradient id="glass-${idPrefix}-${index}" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="rgba(179,231,255,0.9)" />
                    <stop offset="100%" stop-color="rgba(64,139,187,0.85)" />
                  </linearGradient>
                  <radialGradient id="rim-${idPrefix}-${index}" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="#e6edf6" />
                    <stop offset="100%" stop-color="#8f9fb5" />
                  </radialGradient>
                  <filter id="softShadow-${idPrefix}-${index}" x="-20%" y="-20%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.24)" />
                  </filter>
                  <filter id="carShadow-${idPrefix}-${index}" x="-20%" y="-20%" width="150%" height="160%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="rgba(0,0,0,0.28)" />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>
        `;
      }

      function buildDoors(targetId, idPrefix, interactive = false) {
        const el = document.getElementById(targetId);
        el.innerHTML = [0, 1, 2].map((i) => doorMarkup(i, idPrefix)).join("");
        if (interactive) {
          el.querySelectorAll(".door-card").forEach((card) => {
            card.addEventListener("click", () => {
              el.querySelectorAll(".door-card").forEach((c) =>
                c.classList.remove("active"),
              );
              card.classList.add("active");
              const idx = Number(card.dataset.idx);
              state.stage1Picked = idx;
              state.pickedDoor = idx;
              state.lastDoorPick = idx;
              document.getElementById("doorPickNote").textContent =
                `Door ${idx + 1} selected. Audience committed.`;
            });
          });
        }
      }

      function setStage1Interactivity(enabled) {
        const stage = document.getElementById("doorStage1");
        stage.querySelectorAll(".door-card").forEach((card) => {
          const btn = card.querySelector(".door-hit");
          const idx = Number(card.dataset.idx);
          btn.disabled = !enabled;
          btn.onclick = enabled
            ? () => {
                stage
                  .querySelectorAll(".door-card")
                  .forEach((c) => c.classList.remove("active"));
                card.classList.add("active");
                state.stage1Picked = idx;
                state.pickedDoor = idx;
                state.lastDoorPick = idx;
                document.getElementById("doorPickNote").textContent =
                  `Door ${idx + 1} selected. Audience committed.`;
              }
            : null;
        });
      }

      function selectedDoorIndex() {
        if (Number.isInteger(state.stage1Picked)) {
          return state.stage1Picked;
        }
        if (Number.isInteger(state.lastDoorPick)) {
          return state.lastDoorPick;
        }
        if (Number.isInteger(state.pickedDoor)) {
          return state.pickedDoor;
        }
        return 0;
      }

      function swapTwoDoorCardsOnce(container, durationMs) {
        return new Promise((resolve) => {
          const cards = Array.from(container.querySelectorAll(".door-card"));
          const first = new Map(
            cards.map((card) => [card, card.getBoundingClientRect()]),
          );

          let a = Math.floor(Math.random() * cards.length);
          let b = Math.floor(Math.random() * cards.length);
          while (b === a) {
            b = Math.floor(Math.random() * cards.length);
          }

          const cardA = cards[a];
          const cardB = cards[b];
          const nextA = cardA.nextSibling;
          const nextB = cardB.nextSibling;
          const distance = Math.abs(a - b);
          const arcHeight = distance === 2 ? 88 : 62;

          if (nextA === cardB) {
            container.insertBefore(cardB, cardA);
          } else if (nextB === cardA) {
            container.insertBefore(cardA, cardB);
          } else {
            container.insertBefore(cardA, nextB);
            container.insertBefore(cardB, nextA);
          }

          const last = new Map(
            cards.map((card) => [card, card.getBoundingClientRect()]),
          );
          const animations = [];

          cards.forEach((card) => {
            const p0 = first.get(card);
            const p1 = last.get(card);
            const dx = p0.left - p1.left;
            const dy = p0.top - p1.top;

            if (card === cardA || card === cardB) {
              const lift = card === cardA ? -arcHeight : arcHeight;
              const delay = card === cardA ? 0 : 28;
              card.classList.add(card === cardA ? "swap-a" : "swap-b");
              const frames = [
                { transform: `translate(${dx}px, ${dy}px) rotate(0deg)` },
                {
                  transform: `translate(${dx * 0.82}px, ${dy * 0.82}px) rotate(${card === cardA ? 3 : -3}deg)`,
                },
                {
                  transform: `translate(${dx * 0.5}px, ${dy * 0.5 + lift}px) rotate(${card === cardA ? 11 : -11}deg)`,
                },
                { transform: "translate(0px, 0px) rotate(0deg)" },
              ];
              animations.push(
                card.animate(frames, {
                  duration: durationMs,
                  delay,
                  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                  fill: "both",
                }),
              );
            } else {
              const frames = [
                { transform: `translate(${dx}px, ${dy}px)` },
                { transform: "translate(0px, 0px)" },
              ];
              animations.push(
                card.animate(frames, {
                  duration: Math.max(220, durationMs - 40),
                  delay: 12,
                  easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                  fill: "both",
                }),
              );
            }
          });

          Promise.all(
            animations.map((anim) => anim.finished.catch(() => undefined)),
          ).then(() => {
            cards.forEach((card) => {
              card.style.transform = "";
              card.classList.remove("swap-a", "swap-b");
            });
            resolve();
          });
        });
      }

      function runDoorIntroSequence() {
        ++state.doorIntroToken;
        const stage = document.getElementById("doorStage1");
        const note = document.getElementById("doorPickNote");

        state.stage1Picked = null;
        state.doorIntroPhase = "revealed_waiting";
        buildDoors("doorStage1", "s1", false);
        setStage1Interactivity(false);

        const cards = Array.from(stage.querySelectorAll(".door-card"));
        state.carDoor = Math.floor(Math.random() * 3);

        cards.forEach((card, idx) => {
          card.classList.add("open");
          card.classList.add(idx === state.carDoor ? "show-car" : "show-goat");
        });
        note.textContent =
          "One car. Two goats. Keep your eyes on the car. Click anywhere or press next to shuffle.";
      }

      async function startDoorShuffleSequence() {
        if (state.doorIntroPhase !== "revealed_waiting") {
          return;
        }

        state.doorIntroPhase = "shuffling";
        const token = state.doorIntroToken;
        const stage = document.getElementById("doorStage1");
        const note = document.getElementById("doorPickNote");
        const cards = Array.from(stage.querySelectorAll(".door-card"));

        note.textContent = "Closing doors...";
        cards.forEach((card) => {
          card.classList.remove("open", "show-goat", "show-car", "active");
        });

        await sleep(300);
        note.textContent = "Shuffling...";
        for (let i = 0; i < 10; i += 1) {
          if (token !== state.doorIntroToken) {
            return;
          }
          await swapTwoDoorCardsOnce(stage, 760);
          await sleep(120);
        }

        if (token !== state.doorIntroToken) {
          return;
        }

        note.textContent = "Now pick one door.";
        state.doorIntroPhase = "ready_pick";
        setStage1Interactivity(true);
      }

      function resetOpenStage() {
        buildDoors("doorStage2", "s2", false);
        const pick = selectedDoorIndex();
        const cards = document.querySelectorAll("#doorStage2 .door-card");
        cards[pick].classList.add("active");
        document.getElementById("openNote").textContent = "Run the animation.";
      }

      function runOpenStage() {
        resetOpenStage();
        const pick = selectedDoorIndex();
        const car = state.carDoor;
        const cards = Array.from(
          document.querySelectorAll("#doorStage2 .door-card"),
        );
        const candidates = [0, 1, 2].filter((i) => i !== pick && i !== car);
        const opened =
          candidates[Math.floor(Math.random() * candidates.length)];
        setTimeout(() => {
          cards[opened].classList.add("open", "show-goat");
          const switchDoor = [0, 1, 2].find((i) => i !== pick && i !== opened);
          const stayWin = pick === car;
          const switchWin = switchDoor === car;
          setTimeout(() => {
            document.getElementById("openNote").textContent =
              `Host reveals a goat. Stay would ${stayWin ? "win" : "lose"}; switch would ${switchWin ? "win" : "lose"}.`;
          }, 620);
        }, 450);
      }

      function resetTrap() {
        const f = document.getElementById("fiftyText");
        f.classList.remove("cracked");
        document
          .querySelectorAll("#trapArrows .arrow-pill")
          .forEach((a) => a.classList.remove("reveal"));
      }

      function runTrap() {
        resetTrap();
        setTimeout(() => {
          document.getElementById("fiftyText").classList.add("cracked");
        }, 380);
        document.querySelectorAll("#trapArrows .arrow-pill").forEach((a, i) => {
          setTimeout(() => a.classList.add("reveal"), 680 + i * 220);
        });
      }

      function resetFlow() {
        const wrap = document.getElementById("flowWrap");
        wrap.classList.remove("flowed");
        document.getElementById("lPick").textContent = "1/3";
        document.getElementById("lOpen").textContent = "1/3";
        document.getElementById("lRemain").textContent = "1/3";
      }

      function runFlow() {
        resetFlow();
        setTimeout(() => {
          document.getElementById("flowWrap").classList.add("flowed");
          document.getElementById("lOpen").textContent = "0";
          document.getElementById("lRemain").textContent = "2/3";
        }, 350);
      }

      const fiveOutcomes = [
        "Game 1: Stay loses | Switch wins",
        "Game 2: Stay wins | Switch loses",
        "Game 3: Stay loses | Switch wins",
        "Game 4: Stay loses | Switch wins",
        "Game 5: Stay wins | Switch loses",
      ];

      function resetFive() {
        document.getElementById("fiveFeed").textContent =
          "Press Start to run 5 rounds.";
      }

      function runFive() {
        resetFive();
        let i = 0;
        const feed = document.getElementById("fiveFeed");
        const timer = setInterval(() => {
          if (i >= fiveOutcomes.length) {
            clearInterval(timer);
            return;
          }
          feed.textContent = fiveOutcomes.slice(0, i + 1).join("  |  ");
          i += 1;
        }, 520);
      }

      const sim = {
        running: false,
        requestId: 0,
      };

      function resetSim() {
        sim.running = false;
        sim.requestId += 1;
        document.getElementById("simCounter").textContent = "Games: 0";
        document.getElementById("stayFill").style.width = "0%";
        document.getElementById("switchFill").style.width = "0%";
        document.getElementById("stayPct").textContent = "0%";
        document.getElementById("switchPct").textContent = "0%";
      }

      function runSim(total) {
        if (sim.running) {
          return;
        }
        sim.running = true;
        const current = ++sim.requestId;

        let games = 0;
        let stayWins = 0;
        let switchWins = 0;

        function tick() {
          if (current !== sim.requestId) {
            sim.running = false;
            return;
          }

          const batch = 120;
          for (let i = 0; i < batch && games < total; i += 1) {
            const car = Math.floor(Math.random() * 3);
            const pick = Math.floor(Math.random() * 3);
            const hostChoices = [0, 1, 2].filter(
              (d) => d !== pick && d !== car,
            );
            const opened =
              hostChoices[Math.floor(Math.random() * hostChoices.length)];
            const switched = [0, 1, 2].find((d) => d !== pick && d !== opened);
            if (pick === car) {
              stayWins += 1;
            }
            if (switched === car) {
              switchWins += 1;
            }
            games += 1;
          }

          const stayPct = games ? (stayWins / games) * 100 : 0;
          const switchPct = games ? (switchWins / games) * 100 : 0;
          document.getElementById("simCounter").textContent = `Games: ${games}`;
          document.getElementById("stayFill").style.width =
            `${stayPct.toFixed(1)}%`;
          document.getElementById("switchFill").style.width =
            `${switchPct.toFixed(1)}%`;
          document.getElementById("stayPct").textContent =
            `${stayPct.toFixed(1)}%`;
          document.getElementById("switchPct").textContent =
            `${switchPct.toFixed(1)}%`;

          if (games < total) {
            requestAnimationFrame(tick);
          } else {
            sim.running = false;
          }
        }

        tick();
      }

      function build100() {
        const grid = document.getElementById("grid100");
        grid.innerHTML = "";
        for (let i = 0; i < 100; i += 1) {
          const d = document.createElement("div");
          d.className = "mini-door";
          d.dataset.i = String(i);
          grid.appendChild(d);
        }

        const chosen = 8;
        const car = 87;
        const doors = Array.from(grid.children);
        doors[chosen].classList.add("chosen");

        return { doors, chosen, car };
      }

      let hundredState = null;

      function reset100() {
        hundredState = build100();
      }

      function run100() {
        if (!hundredState) {
          hundredState = build100();
        }

        const { doors, chosen, car } = hundredState;
        let opened = 0;
        const openable = doors
          .map((_, i) => i)
          .filter((i) => i !== chosen && i !== car)
          .sort(() => Math.random() - 0.5)
          .slice(0, 98);

        function step() {
          if (opened >= openable.length) {
            doors[car].classList.add("final");
            doors[chosen].classList.add("final");
            return;
          }
          const idx = openable[opened];
          doors[idx].classList.add("opened");
          opened += 1;
          const delay = opened < 75 ? 22 : 36;
          setTimeout(step, delay);
        }

        step();
      }

      let paradoxShown = false;
      function runParadox() {
        if (paradoxShown) {
          return;
        }
        paradoxShown = true;
        document.querySelectorAll("#paradoxGrid .paradox").forEach((p, i) => {
          setTimeout(() => p.classList.add("show"), i * 190);
        });
      }

      function resetParadox() {
        paradoxShown = false;
        document
          .querySelectorAll("#paradoxGrid .paradox")
          .forEach((p) => p.classList.remove("show"));
      }

      function applyTheme(themeName) {
        if (!themeName || themeName === "default") {
          document.body.removeAttribute("data-theme");
        } else {
          document.body.setAttribute("data-theme", themeName);
        }

        document
          .querySelectorAll("#themePanel .theme-option")
          .forEach((btn) => {
            btn.classList.toggle(
              "active",
              btn.dataset.theme === (themeName || "default"),
            );
          });

        try {
          localStorage.setItem(themeStorageKey, themeName || "default");
        } catch (_err) {
          // Ignore storage failures (private mode, restricted browser settings).
        }
      }

      function toggleThemePanel(forceOpen) {
        const panel = document.getElementById("themePanel");
        const shouldOpen =
          typeof forceOpen === "boolean"
            ? forceOpen
            : !panel.classList.contains("open");
        panel.classList.toggle("open", shouldOpen);
      }

      async function toggleFullscreen() {
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          }
        } else if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }

      function syncFullscreenButton() {
        const btn = document.getElementById("toggleFullscreen");
        const inFullscreen = Boolean(document.fullscreenElement);
        btn.textContent = inFullscreen ? "Exit" : "FS";
        btn.title = inFullscreen ? "Exit full screen" : "Toggle full screen";
      }

