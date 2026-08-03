const allSlides = Array.from(
  document.querySelectorAll(".reveal .slides > section"),
);
let slides = allSlides.slice();
const progressBar = document.getElementById("deckProgressBar");
const slideStorageKey = "probability_lecture_current_slide";
const themeStorageKey = "probability_lecture_theme";
const deckModeStorageKey = "probability_lecture_deck_mode";
let currentSlide = 0;
let deckMode = "short";

function isLongOnlySlide(slide) {
  return slide.classList.contains("long-only");
}

function visibleSlidesForMode(mode) {
  if (mode === "long") {
    return allSlides.slice();
  }
  return allSlides.filter((slide) => !isLongOnlySlide(slide));
}

function syncDeckModeButton() {
  const btn = document.getElementById("toggleDeckMode");
  if (!btn) {
    return;
  }
  btn.textContent = deckMode === "long" ? "LONG" : "SHORT";
  btn.title =
    deckMode === "long" ? "Switch to short lecture" : "Switch to long lecture";
  btn.setAttribute("aria-pressed", deckMode === "long" ? "true" : "false");
}

function applyDeckModeVisibility() {
  const visible = new Set(slides);
  allSlides.forEach((slide) => {
    slide.classList.toggle("mode-hidden", !visible.has(slide));
    if (!visible.has(slide)) {
      slide.classList.remove("active");
    }
  });
  document.body.setAttribute("data-deck-mode", deckMode);
}

function setDeckMode(mode, persist = true, anchorSlideId, render = true) {
  const nextMode = mode === "long" ? "long" : "short";
  const currentId =
    anchorSlideId || slides[currentSlide]?.id || allSlides[0]?.id;
  deckMode = nextMode;
  slides = visibleSlidesForMode(deckMode);
  applyDeckModeVisibility();

  let nextIndex = slides.findIndex((slide) => slide.id === currentId);
  if (nextIndex < 0) {
    nextIndex = Math.min(currentSlide, Math.max(0, slides.length - 1));
  }
  currentSlide = Math.max(0, nextIndex);
  syncDeckModeButton();
  if (render) {
    showSlide(currentSlide);
  }

  if (!persist) {
    return;
  }
  try {
    localStorage.setItem(deckModeStorageKey, deckMode);
  } catch (_err) {
    // Ignore storage failures.
  }
}

function toggleDeckMode() {
  setDeckMode(deckMode === "short" ? "long" : "short");
}

function restoreDeckModePreference() {
  let mode = "short";
  try {
    const saved = localStorage.getItem(deckModeStorageKey);
    if (saved === "short" || saved === "long") {
      mode = saved;
    }
  } catch (_err) {
    // Ignore storage failures and keep default.
  }
  setDeckMode(mode, false, undefined, false);
}

function fragmentsFor(i) {
  return Array.from(slides[i].querySelectorAll(".fragment"));
}

function resetFragments(i) {
  fragmentsFor(i).forEach((f) => f.classList.remove("visible"));
}

function updateProgress() {
  progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
}

function onSlideChanged() {
  const id = slides[currentSlide].id;
  if (id === "slide-doors") {
    runDoorIntroSequence();
  } else {
    state.doorIntroToken += 1;
    state.doorIntroPhase = "idle";
  }
  if (id === "slide-trap") {
    runTrap();
  } else {
    resetTrap();
  }
  if (id === "slide-paradox") {
    runParadox();
  } else {
    resetParadox();
  }
  if (id === "slide-open") {
    resetOpenStage();
  }
  if (typeof refreshAtelierDoodles === "function") {
    refreshAtelierDoodles(slides[currentSlide], currentSlide);
  }
}

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));
  const visible = new Set(slides);
  allSlides.forEach((slide) => {
    if (!visible.has(slide)) {
      slide.classList.remove("active");
    }
  });
  slides.forEach((slide, i) => {
    const isActive = i === currentSlide;
    slide.classList.toggle("active", isActive);
    if (!isActive) {
      resetFragments(i);
    }
  });
  updateProgress();
  onSlideChanged();
  try {
    localStorage.setItem(slideStorageKey, String(currentSlide));
  } catch (_err) {
    // Ignore storage failures (private mode, restricted browser settings).
  }
}

function revealNextFragment() {
  const hidden = fragmentsFor(currentSlide).find(
    (f) => !f.classList.contains("visible"),
  );
  if (hidden) {
    hidden.classList.add("visible");
    if (typeof onFragmentVisibilityChanged === "function") {
      onFragmentVisibilityChanged(hidden, true);
    }
    return true;
  }
  return false;
}

function hidePrevFragment() {
  const visible = fragmentsFor(currentSlide).filter((f) =>
    f.classList.contains("visible"),
  );
  if (visible.length) {
    const fragment = visible[visible.length - 1];
    fragment.classList.remove("visible");
    if (typeof onFragmentVisibilityChanged === "function") {
      onFragmentVisibilityChanged(fragment, false);
    }
    return true;
  }
  return false;
}

function next() {
  const id = slides[currentSlide].id;
  if (id === "slide-doors" && state.doorIntroPhase === "revealed_waiting") {
    startDoorShuffleSequence();
    return;
  }
  if (id === "slide-doors" && state.doorIntroPhase === "shuffling") {
    return;
  }
  if (!revealNextFragment()) {
    showSlide(currentSlide + 1);
  }
}

function prev() {
  if (!hidePrevFragment()) {
    showSlide(currentSlide - 1);
  }
}
