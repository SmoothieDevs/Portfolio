import Splitting from "splitting";
import { gsap } from "gsap";

let tl_loader = gsap.timeline();

gsap.set(".nav .nav-bar .nav-logo", { x: "-50%", y: "-50%" });
window.onload = (event) => {
    console.log('Page Loaded');
    Splitting();
    tl_loader.to(".loader-w", { backgroundColor: "rgba(0,0,0,0)", duration: 1, pointerEvents: "none" });
    let tl = gsap.timeline().to(".section-hero", { scale: 1, ease: "power2.inOut", duration: 1.5 })
        .to(".nav .nav-bar .nav-logo", { height: 33, width: 30, x: 0, y: 0, top: 0, left: 0, ease: "power3.inOut", duration: 1.5, delay: -.8 })
        /*.to("header .social-wrapper .social-icon", { y: 0, duration: .5, stagger: .1, ease: "power4.out" })
        .to(".scroll-text .arrow", { top: 12, ease: "power2.inOut", duration: 1,delay: -2})
        .to(".slide-vertical .char", { y: 0, ease: "power2.inOut", stagger: 0.1, duration: 1, delay: -1.5 , onComplete:function(){document.querySelector('.slide-vertical').classList.add('show'); }}); */

};