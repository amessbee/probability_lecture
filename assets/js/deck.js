      const slides = Array.from(
        document.querySelectorAll(".reveal .slides > section"),
      );
      const progressBar = document.getElementById("deckProgressBar");
      const slideStorageKey = "probability_lecture_current_slide";
      const themeStorageKey = "probability_lecture_theme";
      let currentSlide = 0;

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
      }

      function showSlide(index) {
        currentSlide = Math.max(0, Math.min(slides.length - 1, index));
        slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === currentSlide);
          if (i !== currentSlide) {
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
          return true;
        }
        return false;
      }

      function hidePrevFragment() {
        const visible = fragmentsFor(currentSlide).filter((f) =>
          f.classList.contains("visible"),
        );
        if (visible.length) {
          visible[visible.length - 1].classList.remove("visible");
          return true;
        }
        return false;
      }

      function next() {
        const id = slides[currentSlide].id;
        if (
          id === "slide-doors" &&
          state.doorIntroPhase === "revealed_waiting"
        ) {
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
