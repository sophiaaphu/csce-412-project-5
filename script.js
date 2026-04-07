document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  document.querySelectorAll(".dropdown-toggle").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const dropdown = button.closest(".dropdown");
      if (!dropdown) return;
      const isOpen = dropdown.classList.contains("open");
      document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
      if (!isOpen) dropdown.classList.add("open");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
  });

  document.querySelectorAll(".alert-dismiss").forEach((button) => {
    button.addEventListener("click", () => {
      const alert = button.closest(".emergency-alert");
      if (alert) {
        alert.style.display = "none";
      }
    });
  });

  document.querySelectorAll("[data-fake-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = form.querySelector(".form-message");
      if (message) {
        message.style.display = "block";
        message.textContent =
          "Submission received and routed to the Bureau of Immediate Vibe Containment. Reference ID: DRPS-" +
          Math.floor(100000 + Math.random() * 900000) +
          ".";
      }
      form.reset();
    });
  });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(".faq-item");
      if (parent) {
        parent.classList.toggle("open");
      }
    });
  });

  const registrySearch = document.querySelector("#registrySearch");
  const registryTier = document.querySelector("#registryTier");
  if (registrySearch || registryTier) {
    const rows = Array.from(document.querySelectorAll("#registryTable tbody tr"));
    const filterRows = () => {
      const text = registrySearch ? registrySearch.value.trim().toLowerCase() : "";
      const tier = registryTier ? registryTier.value : "";
      rows.forEach((row) => {
        const rowText = row.textContent.toLowerCase();
        const rowTier = row.getAttribute("data-tier");
        const textMatch = !text || rowText.includes(text);
        const tierMatch = !tier || rowTier === tier;
        row.style.display = textMatch && tierMatch ? "" : "none";
      });
    };
    if (registrySearch) registrySearch.addEventListener("input", filterRows);
    if (registryTier) registryTier.addEventListener("change", filterRows);
  }

  document.querySelectorAll("[data-count-target]").forEach((el) => {
    const target = Number(el.getAttribute("data-count-target")) || 0;
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(target * progress);
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    requestAnimationFrame(step);
  });
});
