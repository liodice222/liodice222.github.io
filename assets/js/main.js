(() => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const progressLinks = document.querySelectorAll(".progress a");
  if (progressLinks.length) {
    const panels = document.querySelectorAll(".panel[id]");
    const panelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          progressLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { threshold: 0.55 }
    );
    panels.forEach((panel) => panelObserver.observe(panel));
  }

  document.querySelectorAll(".video-embed").forEach((button) => {
    button.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.className = "video-frame";
      iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1&rel=0`;
      iframe.title = button.getAttribute("aria-label");
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      button.replaceWith(iframe);
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
