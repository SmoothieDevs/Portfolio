import gsap from 'gsap';
window.addEventListener("DOMContentLoaded", (event) => {
    let body = document.body;
    let night = document.querySelector(".night")
    let day = document.querySelector(".day")
    let canClick = true
    let nightmode = false
    let portrait = document.querySelector('.section-bio .portrait')
    let portraitURL = portrait.getAttribute('data-night')

    night.addEventListener("click", function () {

        if (canClick == true) {
            canClick = false
            nightmode = true
            section = document.querySelector("section.actual")
            let tl_night = gsap.timeline()
            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,1)", duration: 1 });
            setTimeout(() => {
                body.classList.add('dark')
                day.style.display = 'block'
                night.style.display = 'none'
                portrait.src = portraitURL
                portraitURL = portrait.getAttribute('data-day')
            }, 1000)

            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,0)", duration: 1, delay: .5 });

            setTimeout(() => {
                canClick = true
            }, 1000)
        }

    })

    day.addEventListener("click", function () {

        if (canClick == true) {
            canClick = false
            nightmode = false
            let tl_night = gsap.timeline()
            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,1)", duration: 1 });
            setTimeout(() => {
                body.classList.remove('dark')
                day.style.display = 'none'
                night.style.display = 'block'
                portrait.src = portraitURL
                portraitURL = portrait.getAttribute('data-night')
            }, 1000)

            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,0)", duration: 1, delay: .5 });
            setTimeout(() => {
                canClick = true
            }, 1000)
        }
    })


})

