import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin);
let tl_loader = gsap.timeline();
tl_loader.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,0)", duration: 1 });

window.onload = (event) => {
    console.log('Page Loaded');
    let tl = gsap.timeline().to(".section-hero", { scale: 1, ease: "power2.inOut", duration: 1.5 })
        .to("header .logo", { height: 33, width: 30, x: 0, y: 0, top: 50, left: 50, ease: "power1.inOut", duration: 1, delay: -.8 })
    document.querySelector(".loader-wrapper").classList.remove('fade');
    document.body.classList.remove('stop-scrolling')
};