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
import Splitting from "splitting";

var gsap = require('gsap');

gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin);

let tl_loader = gsap.timeline();
tl_loader.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,0)", duration: 1 });

window.onload = (event) => {
    console.log('Page Loaded');
    Splitting();
    let tl = gsap.timeline().to(".section-hero", { scale: 1, ease: "power2.inOut", duration: 1.5 })
        .to("header .logo", { height: 33, width: 30, x: 0, y: 0, top: 50, left: 50, ease: "power3.inOut", duration: 1.5, delay: -.8 })
        .to("header .social-wrapper .social-icon", { y: 0, duration: .5, stagger: .1, ease: "power4.out" })
        .to(".scroll-text .arrow", { top: 12, ease: "power2.inOut", duration: 1,delay: -2})
        .to(".slide-vertical .char", { y: 0, ease: "power2.inOut", stagger: 0.1, duration: 1, delay: -1.5 , onComplete:function(){document.querySelector('.slide-vertical').classList.add('show'); }});
        
    document.querySelector(".loader-wrapper").classList.remove('fade');
    document.body.classList.remove('stop-scrolling')
};