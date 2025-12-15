// ----------------------------
// jQuery Slider (if using slick)
// ----------------------------
$(document).ready(function(){
    $('.slider').slick({
        arrows: false,
        dots: true,
        appendDots: '.slider-dots',
        dotsClass: 'dots'
    });
});

// ----------------------------
// MOBILE MENU TOGGLE
// ----------------------------
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const menu = document.getElementById('leftMenu');
const closeBtn = document.querySelector('.times');

hamburger.addEventListener('click', () => {
    mobileNav.style.display = "block";
    menu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
    setTimeout(() => {
        mobileNav.style.display = "none";
    }, 400);
});

// ----------------------------
// MENU ITEM TOGGLE BUTTON (if any)
// ----------------------------
const itemButtons = document.querySelectorAll(".item-btn");
itemButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(btn.textContent === "+"){
            btn.textContent = "−";
            btn.style.background = "#00f0ff";
            btn.style.color = "#161616";
        } else {
            btn.textContent = "+";
            btn.style.background = "rgba(255,255,255,0.05)";
            btn.style.color = "#fff";
        }
    });
});

// ----------------------------
// MAGNETIC NEON LINKS EFFECT
// ----------------------------
const magnets = document.querySelectorAll(".nav-link");
magnets.forEach(link => {
    link.addEventListener("mousemove", e => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        link.style.transform = `translate(${x*0.2}px, ${y*0.2}px) rotateX(${y*0.1}deg) rotateY(${-x*0.1}deg) scale(1.05)`;
    });
    link.addEventListener("mouseleave", () => {
        link.style.transform = "translate(0,0) rotateX(0) rotateY(0) scale(1)";
    });
});

// ----------------------------
// THEME TOGGLE
// ----------------------------
const themeBtn = document.getElementById("theme-toggle");

// Load previous theme
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
} else {
    themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if(document.body.classList.contains("light")){
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

// ----------------------------
// SCROLL REVEAL / FADE-UP
// ----------------------------
const faders = document.querySelectorAll('.fade-up');
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ----------------------------
// HERO TEXT TYPING EFFECT
// ----------------------------
const heroText = document.querySelector('.hero-text');
const typingSpan = document.getElementById('typing');
const textArray = ["Developer", "Designer"];
let arrayIndex = 0, charIndex = 0;

function type() {
    if(arrayIndex < textArray.length){
        if(charIndex < textArray[arrayIndex].length){
            typingSpan.textContent += textArray[arrayIndex][charIndex];
            charIndex++;
            setTimeout(type, 150);
        } else {
            setTimeout(erase, 1000);
        }
    }
}

function erase(){
    if(charIndex > 0){
        typingSpan.textContent = textArray[arrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, 100);
    } else {
        arrayIndex = (arrayIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

// Trigger typing when hero text is in view
window.addEventListener('scroll', () => {
    const heroTop = heroText.getBoundingClientRect().top;
    if(heroTop < window.innerHeight - 100 && !typingSpan.dataset.started){
        typingSpan.dataset.started = true;
        type();
    }
});

// ----------------------------
// CARD TILT & SCROLL ANIMATION
// ----------------------------
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => {
    observer.observe(card);
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height/2) / (rect.height/2)) * 10;
        const rotateY = ((x - rect.width/2) / (rect.width/2)) * 10;
        card.style.transform = `translateY(-10px) scale(1.05) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
    });
});

// ----------------------------
// SPARKS ON CLICK
// ----------------------------
const canvas = document.getElementById("spark-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let sparks = [];

function spawnSparks(x,y){
    for(let i=0;i<25;i++){
        sparks.push({
            x,y,
            dx:(Math.random()-0.5)*6,
            dy:(Math.random()-0.5)*6,
            life: Math.random()*20+10,
            size: Math.random()*3+2
        });
    }
}

function animateSparks(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    sparks.forEach((p,i)=>{
        ctx.fillStyle = `rgba(255,255,255,${p.life/30})`;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
        if(p.life <= 0) sparks.splice(i,1);
    });
    requestAnimationFrame(animateSparks);
}
animateSparks();

const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", e => {
    spawnSparks(e.clientX, e.clientY);
});
