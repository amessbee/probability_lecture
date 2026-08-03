buildDoors("doorStage1", "s1", false);
setStage1Interactivity(false);
resetOpenStage();
resetFlow();
resetFive();
resetSim();
reset100();
resetParadox();

document.getElementById("runOpenAnim").addEventListener("click", runOpenStage);
document
  .getElementById("resetOpenAnim")
  .addEventListener("click", resetOpenStage);
document.getElementById("runFlow").addEventListener("click", runFlow);
document.getElementById("resetFlow").addEventListener("click", resetFlow);
document.getElementById("runFive").addEventListener("click", runFive);
document.getElementById("resetFive").addEventListener("click", resetFive);
document.getElementById("run1k").addEventListener("click", () => runSim(1000));
document.getElementById("run5k").addEventListener("click", () => runSim(5000));
document
  .getElementById("run10k")
  .addEventListener("click", () => runSim(10000));
document
  .getElementById("run50k")
  .addEventListener("click", () => runSim(50000));
document.getElementById("resetSim").addEventListener("click", resetSim);
document.getElementById("run100").addEventListener("click", run100);
document.getElementById("reset100").addEventListener("click", reset100);

document.getElementById("nextSlide").addEventListener("click", next);
document.getElementById("prevSlide").addEventListener("click", prev);
document
  .getElementById("toggleFullscreen")
  .addEventListener("click", toggleFullscreen);
document
  .getElementById("toggleThemePanel")
  .addEventListener("click", () => toggleThemePanel());
document
  .getElementById("toggleDeckMode")
  .addEventListener("click", toggleDeckMode);
document
  .getElementById("toggleInvertColors")
  .addEventListener("click", toggleInvertedColors);
document
  .getElementById("toggleDoodles")
  .addEventListener("click", () => toggleDoodlesPanel());
document
  .getElementById("doodleEnabledSwitch")
  .addEventListener("change", (event) => {
    setDoodlesEnabled(event.target.checked);
  });
document
  .getElementById("doodleLightnessSlider")
  .addEventListener("input", (event) => {
    const raw = Number(event.target.value);
    if (!Number.isFinite(raw)) {
      return;
    }
    setDoodleLightness(raw / 100);
  });
document
  .getElementById("doodleSizeSlider")
  .addEventListener("input", (event) => {
    const raw = Number(event.target.value);
    if (!Number.isFinite(raw)) {
      return;
    }
    setDoodleZoom(raw / 100);
  });
document.querySelectorAll("#themePanel .theme-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyTheme(btn.dataset.theme);
    toggleThemePanel(false);
  });
});
document.getElementById("homeSlide").addEventListener("click", () => {
  showSlide(0);
});

document.addEventListener("fullscreenchange", syncFullscreenButton);

document.addEventListener("click", (event) => {
  const panel = document.getElementById("themePanel");
  const toggleBtn = document.getElementById("toggleThemePanel");
  const doodlePanel = document.getElementById("doodlePanel");
  const doodleToggle = document.getElementById("toggleDoodles");
  if (
    panel.classList.contains("open") &&
    !panel.contains(event.target) &&
    event.target !== toggleBtn
  ) {
    toggleThemePanel(false);
  }
  if (
    doodlePanel.classList.contains("open") &&
    !doodlePanel.contains(event.target) &&
    event.target !== doodleToggle
  ) {
    toggleDoodlesPanel(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (
    event.key === "ArrowRight" ||
    event.key === "PageDown" ||
    event.key === " "
  ) {
    event.preventDefault();
    next();
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    prev();
  }
  if (event.key === "Home") {
    event.preventDefault();
    showSlide(0);
  }
  if (event.key === "Escape") {
    toggleThemePanel(false);
    toggleDoodlesPanel(false);
  }
});

document.getElementById("slide-doors").addEventListener("click", () => {
  if (state.doorIntroPhase === "revealed_waiting") {
    startDoorShuffleSequence();
  }
});

let initialSlide = 0;
restoreDeckModePreference();
try {
  const saved = Number(localStorage.getItem(slideStorageKey));
  if (Number.isInteger(saved)) {
    initialSlide = Math.max(0, Math.min(slides.length - 1, saved));
  }
} catch (_err) {
  // Ignore storage failures and start from the first slide.
}

let initialTheme = "atelier";
try {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme) {
    initialTheme = savedTheme;
  }
} catch (_err) {
  // Ignore storage failures and keep default theme.
}

applyTheme(initialTheme);
syncFullscreenButton();
restoreDoodlesPreference(initialTheme === "atelier");
restoreDoodleLightnessPreference();
restoreDoodleZoomPreference();
restoreInvertedColorsPreference();
syncDoodleControls();

showSlide(initialSlide);
