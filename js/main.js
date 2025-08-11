gsap.registerPlugin(ScrollTrigger);

// Lenis 부드러운 스크롤 효과
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value) : window.scrollY;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.body.style.transform ? "transform" : "fixed"
});

lenis.on("scroll", ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: document.body });

// Lenis 효과 끝



window.addEventListener("DOMContentLoaded", () => {

  // gnb 메뉴 클릭 시 섹션 이동
  document.querySelector(".tab-1").addEventListener("click", () => {
    lenis.scrollTo("#section03", {
      offset: 0, 
      duration: 1.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  });

  document.querySelector(".tab-2").addEventListener("click", () => {
    lenis.scrollTo("#section05", {
      offset: 0,
      duration: 1.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  });

  document.querySelector(".tab-3").addEventListener("click", () => {
    lenis.scrollTo("#section06", {
      offset: 0,
      duration: 1.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  });


  if (window.innerWidth > 1024) {

    // section05 fade-up
    gsap.from("#section05", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#section05",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // section06 fade-up 
    gsap.from("#section06", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.3, 
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#section06",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });


    //SplitText
    const headingEl = document.querySelector("#heading");
    const html = headingEl.innerHTML;
    headingEl.innerHTML = "";

    const parts = html.match(/(<[^>]+>|[^<])/g);

    parts.forEach(part => {
      if (part.startsWith("<")) {
        headingEl.insertAdjacentHTML("beforeend", part); 
      } else {
        const span = document.createElement("span");
        span.textContent = part;
        headingEl.appendChild(span);
      }
    });

    gsap.set("#heading span", { display: "inline-block", opacity: 0, y: 40 });

    gsap.to("#heading span", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    });


    // main-visual border-radius 애니메이션
    gsap.fromTo(".main-visual", 
      { borderBottomLeftRadius: "0px" },
      {
        borderBottomLeftRadius: "500px",
        duration: 1.2,
        ease: "power2.out",
        delay: 0.5
      }
    );

   // section01 그래프 바 애니메이션
    const barHeights = [127, 183, 248, 303, 361];

    barHeights.forEach((height, i) => {
      gsap.fromTo(`.bar${i + 1}`,
        { height: 0 },
        {
          height: `${height}px`,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#section01",
            start: "top 80%", 
            toggleActions: "play none none none"
          },
          delay: i * 0.2 
        }
      );
    });

   // section02 fade-up 애니메이션
    gsap.from(".section02-tit", {
      y: 70,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#section02",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".section02-cont > li", {
      y: 70,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
      stagger: 0.4,
      scrollTrigger: {
        trigger: "#section02 .section02-cont",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".section02-foot", {
      y: 70,
      opacity: 0,
      duration: 1.8,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".section02-foot",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

      // .section03-right pin 고정
    ScrollTrigger.create({
      trigger: "#section03 .section03-cont",
      start: "top top",
       end: () => "+=" + (document.querySelector("#section03 .section03-left").scrollHeight - 550), 
      pin: "#section03 .section03-right",
      pinSpacing: false,
      scrub: true
    });


    //#section02 고정
    ScrollTrigger.create({
      trigger: "#section02",
      start: "bottom bottom", 
      endTrigger: "#section03",
      end: "top top",         
      pin: true,
      pinSpacing: false,
      scrub: true
    });

    // section04 fade-direction 애니메이션
    const section04Lists = document.querySelectorAll('#section04 .section04-cont > ul');

    section04Lists.forEach((el, i) => {
      const isSchedule = el.classList.contains("schedule");

      gsap.from(el, {
        x: isSchedule ? -100 : 100,   
        opacity: 0,
        duration: 1.5 + i * 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });








  } 
});
