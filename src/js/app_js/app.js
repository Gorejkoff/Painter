"use strict"
document.addEventListener("DOMContentLoaded", (event) => {

   function throttle(callee, timeout) {
      let timer = null;
      return function perform(...args) {
         if (timer) return;
         timer = setTimeout(() => {
            callee(...args);
            clearTimeout(timer);
            timer = null;
         }, timeout)
      }
   }

   function addTitleAnimation(className, fun1, fun2) {
      const title = document.querySelector(className)
      const tr = {
         trigger: title.parentElement,
         start: "50% 100%",
         end: "50% 0%",
         toggleActions: 'play none none reverse',
         onLeave: () => { if (fun1) fun1() },
         onEnterBack: () => { if (fun1) fun2() },
      }
      gsap.fromTo(title,
         {
            y: "30vh",
            opacity: 0,
         },
         {
            duration: 1,
            y: 0,
            opacity: 1,
            scrollTrigger: tr,
         })
   }

   function addTextAnimation(trigerName, itemMame) {
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: trigerName,
            start: "50% 50%",
            end: "5000 100%",
            pin: true,
            scrub: optionsAnimate.scrub,
         }
      })
      const listItem = document.querySelectorAll(itemMame);
      if (listItem.length > 0) {
         listItem.forEach((e) => {
            tl.to(e, { duration: 5, backgroundPosition: "-100%", ease: "none", })
         })
      }
   }

   let windowHeight = window.innerHeight;
   let windowWidth = window.innerWidth;
   let widthAuthorGallery = document.querySelector('.about-author__gallery').offsetWidth;
   let widthAuthorTitle = document.querySelector('.about-author__gallery').offsetWidth;
   let fontSizeTitle = window.getComputedStyle(document.body).getPropertyValue('--font-size-title');

   const optionsAnimate = {
      scrub: 0,
      ease: "none",
   }

   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip, ScrollSmoother)

   ScrollTrigger.config({ ignoreMobileResize: true });
   ScrollTrigger.isTouch && ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

   const smoother = ScrollSmoother.create({
      wrapper: "#scroll",
      content: "#content",
      smooth: 5,
      // smoothTouth: 0.5,
      smoothTouch: true,
      effects: true,
      normalizeScroll: true
   })

   const tr_2 = {
      trigger: ".about-author__title-trigger",
      start: "0% 0%",
      end: `${windowWidth} 0%`,
      pin: true,
      scrub: optionsAnimate.scrub,
   }

   gsap.fromTo(".about-author__title",
      {
         x: "80vw",
      },
      {
         x: () => -(widthAuthorTitle / 2 + windowWidth) + "px",
         ease: optionsAnimate.ease,
         scrollTrigger: tr_2,
      })
   const tr_1 = {
      trigger: ".about-author__body",
      start: "0% 0%",
      end: () => widthAuthorGallery + "px",
      pin: true,
      scrub: optionsAnimate.scrub,
   }

   gsap.fromTo(".about-author__gallery",
      {
         x: "85vw",
      },
      {
         x: `-${widthAuthorGallery - windowWidth}px`,
         ease: optionsAnimate.ease,
         scrollTrigger: tr_1,
      })

   addTextAnimation(".about-text__body", ".about-text__animate");

   addTitleAnimation('.painting__title', flipTitlePainding, invertTitlePainding);

   const paintingFlipdestination = document.querySelector('.painting__flip-destination');
   const paintingTitleItem = document.querySelector('.painting__title');
   const paintingTitleHome = document.querySelector('.painting__title-home');


   function flipTitlePainding() {
      let state = Flip.getState('.painting__title');
      paintingFlipdestination.append(paintingTitleItem);
      Flip.from(state, { duration: 1, ease: "power1.inOut", fontSize: "18px", scale: true, })
   }
   function invertTitlePainding() {
      let state = Flip.getState('.painting__title');
      paintingTitleHome.append(paintingTitleItem);
      Flip.from(state, { duration: 1, ease: "power1.inOut", fontSize: fontSizeTitle, scale: true, })
   }

   addTitleAnimation('.exposition__title')

   let widthPaintingList = document.querySelector('.painting__list').offsetWidth;
   const widthPainting = document.querySelector('.painting__body').offsetWidth;
   const tl_3 = gsap.timeline({
      scrollTrigger: {
         trigger: ".painting__list",
         start: "0% 0%",
         end: () => widthPaintingList * 0.5 + "px",
         pin: true,
         scrub: optionsAnimate.scrub,
      }
   })
   tl_3.to(".painting__list",
      {
         x: `-${widthPaintingList - widthPainting}px`,
         ease: optionsAnimate.ease,
      })

   gsap.to(".painting__flip-body",
      {
         color: "#red",
         ease: optionsAnimate.ease,

         scrollTrigger: {
            trigger: ".painting",
            start: "0% 0%",
            end: () => widthPaintingList - windowHeight + "px 100px",
            toggleActions: 'play none none reverse',
            toggleClass: { targets: ".painting__flip-body", className: "active" },
            // markers: {
            //    startColor: "green",
            //    endColor: "red",
            //    fontSize: "40px",
            //    fontWeight: "bold",
            //    indent: 20
            // }
         },
      })

   addTextAnimation(".exposition__text", ".exposition__text-animate")

   addTitleAnimation('.contacts__title')

   gsap.to(".contacts__footer",
      {
         y: 0,
         ease: optionsAnimate.ease,
         scrollTrigger: {
            trigger: ".contacts",
            start: "0% 0%",
            end: "0% 0%",
            toggleActions: 'play none none reverse',
         },
      })


   const paintingItem = document.querySelectorAll(".painting__item");
   document.body.addEventListener('click', (event) => {
      if (event.target.closest('.painting__item')) {
         paintingItem.forEach((item, index, array) => {
            const eventTarget = event.target.closest('.painting__item');
            item.classList.toggle('active', item === eventTarget);
         })
         // setTimeout(() => {
         //    widthPaintingList = document.querySelector('.painting__list').offsetWidth;
         //    ScrollTrigger.refresh(true)
         // }, 1000)

      }
      if (event.target.closest('[href^="#"]')) {
         event.preventDefault();
         let getName = event.target.getAttribute('href');
         document.documentElement.style.scrollBehavior = "smooth";
         smoother.scrollTo(getName);
         setTimeout(() => { document.documentElement.style.scrollBehavior = "auto"; }, 1000)
      }
   })

   function getDataVar() {
      windowWidth = window.innerWidth;
      widthAuthorGallery = document.querySelector('.about-author__gallery').offsetWidth;
      fontSizeTitle = window.getComputedStyle(document.body).getPropertyValue('--font-size-title');
      ScrollTrigger.update()
   }
   const setDataVars = throttle(getDataVar, 100)
   window.addEventListener('resize', (event) => {
      setDataVars()
   })

   let startTouchX;
   let startTouchY;
   let pageScroll;
   let horizontalScroll = false;
   let horizontalTest = true;
   document.addEventListener('touchstart', (event) => {
      startTouchX = event.touches[0].clientX;
      startTouchY = event.touches[0].clientY;
      pageScroll = window.scrollY;
   })

   document.addEventListener('touchmove', (event) => {
      if (horizontalTest && Math.abs(event.touches[0].clientX - startTouchX) > Math.abs(event.touches[0].clientY - startTouchY)) {
         horizontalScroll = true;
      }
      horizontalTest = false;
      if (horizontalScroll) {
         event.preventDefault();
         let value = pageScroll + -(event.touches[0].clientX - startTouchX) * 1.5;
         smoother.scrollTo(value, true)
      }
   }, { passive: false })
   document.addEventListener('touchend', (event) => {
      horizontalScroll = false;
      horizontalTest = true;
   })


});



