import { gsap } from "gsap";

var cursor = document.querySelector(".cursor");

gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50
});

window.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
    gsap.to(cursor, {
        duration: 0.8,
        x: e.clientX,
        y: e.clientY,
        ease: "power3.out"
    });
}
