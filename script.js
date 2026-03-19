const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const bars = document.querySelectorAll(".bar span");
const filterButtons = document.querySelectorAll(".filter-button");
const skillRows = document.querySelectorAll(".skill-row");
const timelineItems = document.querySelectorAll(".timeline-item");
const interactiveCards = document.querySelectorAll(
  ".hero-highlights article, .panel, .timeline-content, .floating-note, .impact-item"
);

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("in-view");

      if (entry.target.id === "home") {
        animateCounters();
      }

      if (entry.target.id === "skills") {
        animateBars();
      }
    });
  },
  { threshold: 0.24 }
);

reveals.forEach((section) => revealObserver.observe(section));

let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) {
    return;
  }

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = target === 100 ? "%" : "+";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));

    const tick = () => {
      current = Math.min(current + step, target);
      counter.textContent = `${current}${suffix}`;
      if (current < target) {
        requestAnimationFrame(tick);
      }
    };

    tick();
  });

  countersAnimated = true;
}

let barsAnimated = false;
function animateBars() {
  if (barsAnimated) {
    return;
  }

  bars.forEach((bar) => {
    bar.style.width = bar.style.getPropertyValue("--target") || "0";
  });

  barsAnimated = true;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    let firstVisibleMarked = false;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    skillRows.forEach((row) => {
      const match = category === "all" || row.dataset.group === category;
      row.classList.toggle("is-hidden", !match);
    });

    timelineItems.forEach((item) => {
      const match = category === "all" || item.dataset.filter === category;
      item.classList.toggle("is-hidden", !match);
      item.classList.toggle("active", match && !firstVisibleMarked);
      if (match && !firstVisibleMarked) {
        firstVisibleMarked = true;
      }
    });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
      if (!activeLink) {
        return;
      }

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.52 }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

interactiveCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.transform = `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.removeProperty("--mx");
    card.style.removeProperty("--my");
    card.style.transform = "";
  });
});
