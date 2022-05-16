import gsap from 'gsap';

window.addEventListener("DOMContentLoaded", (event) => {

    var actualSection = document.querySelector("section.section-hero");
    actualSection.classList.add('actual')
    var actualSectionIndex = 0;
    var canScroll = true;
    var sections = []
    let scrollbtn = document.querySelector(".scroll-text .slide-vertical")
    sections = document.querySelectorAll("section");
    setSlider()
    sections.forEach(s => {
        s.style.display = 'none'
    })
    actualSection.style.display = 'block'

    scrollbtn.addEventListener("click", function (e) {
        nextSection(actualSection, actualSectionIndex)
    })

    document.addEventListener("wheel", function (e) {
        // print "down" if direction is down and "up" if up
        var variation = parseInt(e.deltaY);
        if (variation > 0 && canScroll) {

            console.log("Down");
            nextSection(actualSection, actualSectionIndex)
        } else if (variation < 0 && canScroll) {

            console.log("Up");
            previousSection(actualSection, actualSectionIndex);
        }
    });

    function nextSection(section, index) {

        if (index != sections.length - 1) {
            canScroll = false
            section.classList.remove('actual')
            actualSection = sections.item(index + 1)
            actualSection.classList.add('actual')
            actualSectionIndex = index + 1;
            let tl_night = gsap.timeline()
            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,1)", duration: 1 });
            setTimeout(() => {
                section.style.display = "none"
                actualSection.style.display = 'block'
    
            }, 1000)
    
            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,0)", duration: 1, delay: .5 });
            setTimeout(() => {
                canScroll = true
    
            }, 2000)
        }
    }
    
    function previousSection(section, index) {
        if (index != 0) {
            canScroll = false
            actualSection = sections.item(index - 1)
            actualSectionIndex = index - 1;
            let tl_night = gsap.timeline()
            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,1)", duration: 1 });
            setTimeout(() => {
                section.style.display = "none"
                actualSection.style.display = 'block'
            }, 1000)
    
            tl_night.to(".loader-wrapper", { backgroundColor: "rgba(0,0,0,0)", duration: 1, delay: .5 });
            setTimeout(() => {
                canScroll = true
            }, 2000)
        }
    }
})



//////////////////////////////////////////////////
/*                                              */
/*                                              */
/*  VERTICAL SLIDER                             */
/*                                              */
/*                                              */
//////////////////////////////////////////////////

function setSlider() {
    /*--------------------
    Vars
    --------------------*/

    const $menu = document.querySelector('.menu');
    const $items = document.querySelectorAll('.menu--item');
    let menuHeight = $menu.clientHeight;
    let itemHeight = $items[0].clientHeight;
    let wrapHeight = $items.length * itemHeight;
    let maxScroll = wrapHeight - $menu.clientHeight

    let scrollSpeed = 0;
    let oldScrollY = 0;
    let scrollY = 0;
    let y = 0;



    /*--------------------
    Lerp
    --------------------*/
    const lerp = (v0, v1, t) => {
        return v0 * (1 - t) + v1 * t;
    };
    const clamp = (val, min, max) => Math.max(min, Math.min(val, max))


    /*--------------------
    Dispose
    --------------------*/
    const dispose = scroll => {
        gsap.set($items, {
            y: i => {
                return clamp(i * itemHeight + scroll, -maxScroll, i * itemHeight);
            },
            /* modifiers: {
                y: y => {
                    const s = clamp(, 0, maxScrolsl)
                    return `${s}px`;
                }
            } */
        });
    };
    dispose(0);



    /*--------------------
    Touch
    --------------------*/
    let touchStart = 0;
    let touchY = 0;
    let isDragging = false;
    const handleTouchStart = e => {
        touchStart = e.clientY || e.touches[0].clientY;
        isDragging = true;
        $menu.classList.add('is-dragging');
    };
    const handleTouchMove = e => {
        if (!isDragging) return;
        touchY = e.clientY || e.touches[0].clientY;
        scrollY = clamp(scrollY + (touchY - touchStart) * 2.5, -maxScroll, 0);
        touchStart = touchY;
    };
    const handleTouchEnd = () => {
        isDragging = false;
        $menu.classList.remove('is-dragging');
    };


    /*--------------------
    Listeners
    --------------------*/

    $menu.addEventListener('touchstart', handleTouchStart);
    $menu.addEventListener('touchmove', handleTouchMove);
    $menu.addEventListener('touchend', handleTouchEnd);

    $menu.addEventListener('mousedown', handleTouchStart);
    $menu.addEventListener('mousemove', handleTouchMove);
    $menu.addEventListener('mouseleave', handleTouchEnd);
    $menu.addEventListener('mouseup', handleTouchEnd);

    $menu.addEventListener('selectstart', () => { return false; });


    /*--------------------
    Resize
    --------------------*/
    /* window.addEventListener('resize', () => {
        menuHeight = $menu.clientHeight;
        itemHeight = $items[0].clientHeight;
        wrapHeight = $items.length * itemHeight;
    }); */


    /*--------------------
    Render
    --------------------*/
    const render = () => {
        if (document.getElementsByClassName("section-vertical-slider").length > 0) {
            requestAnimationFrame(render);
        }
        y = lerp(y, scrollY, .1);
        dispose(y);

        scrollSpeed = y - oldScrollY;
        oldScrollY = y;

        gsap.to($items, {
            scale: clamp(1 - Math.min(100, Math.abs(scrollSpeed)) * 0.1, 0.5, 1)
        });
    };
    render()
}

//////////////////////////////////////////////////
/*                                              */
/*                                              */
/*  MAGNET LINK                                 */
/*                                              */
/*                                              */
//////////////////////////////////////////////////

document.addEventListener("mousemove", function (event) {
    magnetize('.section-bio a.contact', event)
})

function magnetize(el, e) {
    var mX = e.pageX,
        mY = e.pageY;
    const items = document.querySelectorAll(el);

    [].forEach.call(items, function (item) {
        const customDist = item.getAttribute('dist') * 20 || 100;
        const centerX = getOffsetLeft(item) + (item.clientWidth / 2);
        const centerY = getOffsetTop(item) + (item.clientHeight / 2);

        var deltaX = Math.floor((centerX - mX)) * -0.45;
        var deltaY = Math.floor((centerY - mY)) * -0.45;

        var distance = calculateDistance(item, mX, mY);

        if (distance < customDist) {
            gsap.to(item, { y: deltaY, x: deltaX, scale: 1.1, duration: 0.3 });
            item.classList.add('magnet');
        }
        else {
            gsap.to(item, { y: 0, x: 0, scale: 1, duration: 0.45 });
            item.classList.remove('magnet');
        }
    });
}

function getOffsetLeft(elem) {
    var offsetLeft = 0;
    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while (elem = elem.offsetParent);
    return offsetLeft;
}

function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (getOffsetLeft(elem) + (elem.clientWidth / 2)), 2) + Math.pow(mouseY - (getOffsetTop(elem) + (elem.clientHeight / 2)), 2)));
}


