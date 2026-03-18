// Typing Effect
const text = ["Nilesh Rane", "Safety Expert", "Team Leader"];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  current = text[i];
  document.getElementById("typing").textContent = current.substring(0, j);

  if (!isDeleting) {
    j++;
    if (j === current.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    j--;
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % text.length;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// Scroll Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      if (entry.target.id === "skills") {
        document.querySelectorAll(".bar div").forEach(el => {
          el.style.width = el.dataset.width;
        });
      }
    }
  });
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

// Contact Toggle
function toggleContactMenu() {
  const menu = document.getElementById("contactMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Close on outside click
document.addEventListener("click", function(e) {
  const menu = document.getElementById("contactMenu");
  const fab = document.querySelector(".contact-fab");

  if (!menu.contains(e.target) && !fab.contains(e.target)) {
    menu.style.display = "none";
  }
});

// Particle Background
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = "#58a6ff";
    ctx.fill();
    p.y += 0.3;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(animate);
}
animate();