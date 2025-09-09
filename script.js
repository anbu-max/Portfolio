// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith("#")) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mobile navbar toggle
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
let menuBtn;

function createMenuButton() {
  menuBtn = document.createElement('div');
  menuBtn.classList.add('menu-btn');
  menuBtn.innerHTML = "☰"; // hamburger icon
  navbar.insertBefore(menuBtn, navLinks);

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// only show menu button on mobile
if (window.innerWidth <= 768) {
  createMenuButton();
}
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768 && !menuBtn) {
    createMenuButton();
  } else if (window.innerWidth > 768 && menuBtn) {
    menuBtn.remove();
    menuBtn = null;
    navLinks.classList.remove('active');
  }
});

// Blog post redirect
document.querySelectorAll(".blog-post").forEach((post) => {
  post.addEventListener("click", () => {
    const link = post.getAttribute("data-link");
    window.location.href = link;
  });
});

// Fade-in effect on scroll
const faders = document.querySelectorAll("section, .project-card, .blog-post");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("fade-in");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});