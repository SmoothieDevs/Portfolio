import gsap from "gsap";

let btnMenu = document.querySelector('.nav-burger-w');
let navL = document.querySelector('.nav-l');
let navTop = document.querySelector('.nav-top');
let navBottom = document.querySelector('.nav-bottom');
let forward = true

let tl = gsap.timeline({ paused: true });
tl.to(navTop.querySelectorAll('div'), { duration: 0.5, y: 0, stagger: 0.05, ease: "power2.out" }, 'menu')
    .to(navBottom.querySelectorAll('div'), { duration: 0.5, y: 0, stagger: 0.05, ease: "power2.out" }, 'menu')
    .to(navL, { delay: -.1, duration: 0.3, opacity: 1, ease: "power1.inOut" })
    .to('.nav .nav-bar .nav-logo', { duration: 0.8, x: "-50%", y: "-50%", top: "50%", left: "calc(10% - 60px)", height: 56, width: 53, ease: "power2.inOut" }, 'menu');

btnMenu.addEventListener('click', function () {
    document.querySelector('.nav-w').classList.toggle('on');
    document.querySelector('.nav-bar').classList.toggle('on');
    if (forward) {
        tl.play();
        forward = false
    } else {
        tl.reverse();
        forward = true
    }
});