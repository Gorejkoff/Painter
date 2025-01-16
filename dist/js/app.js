"use strict"
document.addEventListener("DOMContentLoaded", (event) => {
   // window.addEventListener('load', (event) => {});

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
   if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

   // media queries
   const MIN1024 = window.matchMedia('(min-width: 1024px)');
   const MIN768 = window.matchMedia('(min-width: 768px)');

   // variables
   const HEADER = document.getElementById('header');


   //  exemple
   // const exemple = {
   //    trigger: "#author-title",
   //    start: "0% 0%",
   //    end: "100% 100%",
   //    end: () => widthAuthorGallery + "px",
   //    pin: true,
   //    pin: ".about-author__body",
   //    pinSpacing: true,
   //    scrub: true,
   //    markers: {
   //       startColor: "green",
   //       endColor: "red",
   //       fontSize: "40px",
   //       fontWeight: "bold",
   //       indent: 20
   //    }
   // }


   function addTitleAnimation(className, fun1, fun2) {
      const title = document.querySelector(className)
      const tr = {
         trigger: title.parentElement,
         start: "50% 100%",
         end: "50% 0%",
         toggleActions: 'play none none reverse',
         onLeave: () => { if (fun1) fun1() },
         onEnterBack: () => { if (fun1) fun2() },
         // markers: {
         //    startColor: "green",
         //    endColor: "red",
         //    fontSize: "40px",
         //    fontWeight: "bold",
         //    indent: 20
         // },
      }
      gsap.fromTo(title,
         {
            y: "30nh",
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

   let windowWidth = window.innerWidth;
   let windowHeight = window.innerHeight;
   let widthAuthorGallery = document.querySelector('.about-author__gallery').offsetWidth;

   const optionsAnimate = {
      scrub: 1,
      ease: "none",
   }

   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip)

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

   const tr_2 = {
      trigger: ".about-author__title-trigger",
      start: "0% 0%",
      end: `${windowHeight * 2} 0%`,
      pin: true,
      scrub: optionsAnimate.scrub,
   }

   gsap.fromTo(".about-author__title",
      {
         x: "80vw",
      },
      {
         x: "-200vw",
         ease: optionsAnimate.ease,
         scrollTrigger: tr_2,
      })


   addTextAnimation(".about-text__body", ".about-text__animate");

   addTitleAnimation('.painting__title', flipTitlePainding, invertTitlePainding);

   const paintingFlipdestination = document.querySelector('.painting__flip-destination');
   const paintingTitleItem = document.querySelector('.painting__title');
   const paintingTitleHome = document.querySelector('.painting__title-home');


   function getVarFontTitle() {
      return window.getComputedStyle(document.body).getPropertyValue('--font-size-title')
   }

   function flipTitlePainding() {
      let state = Flip.getState('.painting__title');
      paintingFlipdestination.append(paintingTitleItem);
      Flip.from(state, { duration: 1, ease: "power1.inOut", fontSize: "18px", scale: true, })
   }
   function invertTitlePainding() {
      let state = Flip.getState('.painting__title');
      paintingTitleHome.append(paintingTitleItem);
      Flip.from(state, { duration: 1, ease: "power1.inOut", fontSize: getVarFontTitle(), scale: true, })
   }

   let widthPaintingList = document.querySelector('.painting__list').offsetWidth;
   const widthPainting = document.querySelector('.painting__body').offsetWidth;
   const tl_3 = gsap.timeline({
      scrollTrigger: {
         trigger: ".painting__list",
         start: "0% 0%",
         end: () => widthPaintingList + "px",
         pin: true,
         scrub: optionsAnimate.scrub,
      }
   })
   tl_3.to(".painting__list",
      {
         x: `-${widthPaintingList - widthPainting}px`,
         ease: optionsAnimate.ease,
      })

   addTitleAnimation('.exposition__title')

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


   gsap.to(".painting__flip-body",
      {
         color: "#red",
         ease: optionsAnimate.ease,

         scrollTrigger: {
            trigger: ".painting",
            start: "0% 0%",
            end: "100% 100%",
            toggleActions: 'play none none reverse',
            toggleClass: { targets: ".painting__flip-body", className: "active" },
         },
      })




   const paintingList = document.querySelector('.painting__list');
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

   })








});




// перемещение блоков при адаптиве
// data-da=".class,3,768" 
// класс родителя куда перемещать
// порядковый номер в родительском блоке куда перемещается начиная с 0 как индексы массива
// ширина экрана min-width
// два перемещения: data-da=".class,3,768,.class2,1,1024"
const ARRAY_DATA_DA = document.querySelectorAll('[data-da]');
ARRAY_DATA_DA.forEach(function (e) {
   const dataArray = e.dataset.da.split(',');
   const addressMove = searchDestination(e, dataArray[0]);
   const addressMoveSecond = dataArray[3] && searchDestination(e, dataArray[3]);
   const addressParent = e.parentElement;
   const listChildren = addressParent.children;
   const mediaQuery = window.matchMedia(`(min-width: ${dataArray[2]}px)`);
   const mediaQuerySecond = dataArray[5] && window.matchMedia(`(min-width: ${dataArray[5]}px)`);
   for (let i = 0; i < listChildren.length; i++) { !listChildren[i].dataset.n && listChildren[i].setAttribute('data-n', `${i}`) };
   mediaQuery.matches && startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   if (mediaQuerySecond && mediaQuerySecond.matches) moving(e, dataArray[4], addressMoveSecond);
   mediaQuery.addEventListener('change', () => { startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) });
   if (mediaQuerySecond) mediaQuerySecond.addEventListener('change', () => {
      if (mediaQuerySecond.matches) { moving(e, dataArray[4], addressMoveSecond); return; };
      startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   });
});

function startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) {
   if (mediaQuery.matches) { moving(e, dataArray[1], addressMove); return; }
   if (listChildren.length > 0) {
      for (let z = 0; z < listChildren.length; z++) {
         if (listChildren[z].dataset.n > e.dataset.n) {
            listChildren[z].before(e);
            break;
         } else if (z == listChildren.length - 1) {
            addressParent.append(e);
         }
      }
      return;
   }
   addressParent.prepend(e);
};

function searchDestination(e, n) {
   if (e.classList.contains(n.slice(1))) { return e }
   if (e.parentElement.querySelector(n)) { return e.parentElement.querySelector(n) };
   return searchDestination(e.parentElement, n);
}

function moving(e, order, addressMove) {
   if (order == "first") { addressMove.prepend(e); return; };
   if (order == "last") { addressMove.append(e); return; };
   if (addressMove.children[order]) { addressMove.children[order].before(e); return; }
   addressMove.append(e);
}


