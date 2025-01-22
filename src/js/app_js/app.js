"use strict"
window.addEventListener("load", (event) => {

   function getVH() {
      document.body.style.setProperty('--vh', `${window.innerHeight}px`);
   }
   getVH()
   // desktop or mobile (mouse or touchscreen)
   const isMobile = {
      Android: function () { return navigator.userAgent.match(/Android/i) },
      BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
      iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
      Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
      Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
      any: function () {
         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
   };
   const isPC = !isMobile.any();
   // if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

   let windowHeight = window.innerHeight;
   let windowWidth = window.innerWidth;
   let widthAuthorGallery = document.querySelector('.about-author__gallery').offsetWidth;
   let widthAuthorTitle = document.querySelector('.about-author__title').offsetWidth;

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

   function addTitleAnimation(className) {
      const title = document.querySelector(className)
      const tr = {
         trigger: title.parentElement,
         start: "0% 75%",
         end: "0% 0%",
         toggleActions: 'play none none reverse',
         // markers: {
         //    startColor: "green",
         //    endColor: "red",
         //    fontSize: "40px",
         //    fontWeight: "bold",
         //    indent: 20
         // }
      }
      gsap.fromTo(title,
         {
            y: "20vh",
            opacity: 0,
         },
         {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
            scrollTrigger: tr,
         })
   }

   // function addTextAnimation(trigerName, itemMame) {
   //    const tl = gsap.timeline({
   //       scrollTrigger: {
   //          trigger: trigerName,
   //          start: "50% 50%",
   //          end: `${windowHeight * 3} 100%`,
   //          pin: true,
   //          scrub: optionsAnimate.scrub,
   //       }
   //    })
   //    const listItem = document.querySelectorAll(itemMame);
   //    if (listItem.length > 0) {
   //       listItem.forEach((e) => {
   //          tl.to(e, { duration: 5, backgroundPosition: "-100%", ease: "none", })
   //       })
   //    }
   // }

   function addTextAnimation(trigerName, parent) {
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: trigerName,
            start: "50% 50%",
            end: `${windowHeight * 3} 100%`,
            pin: true,
            scrub: optionsAnimate.scrub,
         }
      })
      let textList = document.querySelectorAll(`${parent} .text-animate`);
      let content;
      textList.forEach(e => {
         let words = e.innerHTML.split(' ');
         let wordsWrap = words.map(item => {
            return item.split('').map(e => { return `<span class="letter">${e}</span>` }).join('');
         })
         content = wordsWrap.map(item => { return `<span>${item}</span>` })
         e.innerHTML = '';
         e.insertAdjacentHTML('beforeend', content.join(' '));

         let listLetter = e.querySelectorAll(`${parent} .letter`);
         let colorLetter = window.getComputedStyle(e).getPropertyValue('--textColor');
         listLetter.forEach((e) => {
            tl.to(e, { duration: 5, color: colorLetter, ease: "none", })
         })
      })
   }



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
         x: () => -(widthAuthorTitle + windowWidth / 2) + "px",
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

   // addTextAnimation(".about-text__body", ".about-text__animate");
   addTextAnimation(".about-text__body", ".about-text__shell")


   addTitleAnimation('.painting__title');

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

   // addTextAnimation(".exposition__text", ".exposition__text-animate")
   addTextAnimation(".exposition__text", ".exposition__text")

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
         paintingItem.forEach((item) => {
            const eventTarget = event.target.closest('.painting__item');
            item.classList.toggle('active', item === eventTarget);
         })
      }
      if (event.target.closest('[href^="#"]')) {
         event.preventDefault();
         let getName = event.target.closest('[href^="#"]').getAttribute('href');
         document.documentElement.style.scrollBehavior = "smooth";
         smoother.scrollTo(getName);
         setTimeout(() => { document.documentElement.style.scrollBehavior = "auto"; }, 1000)
      }
   })

   function getDataVar() {
      windowWidth = window.innerWidth;
      widthAuthorGallery = document.querySelector('.about-author__gallery').offsetWidth;
      ScrollTrigger.update()
   }
   const setDataVars = throttle(getDataVar, 100)
   window.addEventListener('resize', (event) => {
      getVH();
      setDataVars();
   })

   let startTouchX;
   let startTouchY;
   let pageScroll;
   let horizontalScroll = false;
   let horizontalTest = false;

   if (!isPC) {
      document.addEventListener('touchstart', (event) => {
         horizontalTest = true;
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
      document.addEventListener('touchend', stopSwipeMouse)
   }

   if (isPC) {
      document.body.addEventListener("dragstart", (event) => {
         event.preventDefault();
      })

      document.addEventListener('mousedown', (event) => {
         horizontalTest = true;
         startTouchX = event.clientX;
         startTouchY = event.clientY;
         pageScroll = window.scrollY;
      })

      document.addEventListener('mousemove', (event) => {
         if (horizontalTest && Math.abs(event.clientX - startTouchX) > Math.abs(event.clientY - startTouchY)) {
            horizontalScroll = true;
         }
         horizontalTest = false;
         if (horizontalScroll) {
            event.preventDefault();
            let value = pageScroll + -(event.clientX - startTouchX) * 1.5;
            smoother.scrollTo(value, true)
         }
      })

      document.addEventListener('mouseup', stopSwipeMouse)
   }

   function stopSwipeMouse() {
      horizontalScroll = false;
      horizontalTest = false;
   }


});



