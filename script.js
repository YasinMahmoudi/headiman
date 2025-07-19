'use strict';

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// SHOP

//******** Active Header Link



const headerListContainer = document.querySelector('.header__list');
const headerLinks = document.querySelectorAll('.header__link');
const sections = document.querySelectorAll('.section');

//-- Active by click
headerListContainer.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('header__link')) {
    // Remove active class from all links
    headerLinks.forEach((link) => link.classList.remove('header__link--active'));

    // Add active class for selected link

    e.target.classList.add('header__link--active');

    // Get section id
    const section = e.target.getAttribute('href');

    document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
  }
});

//-- Active by observing

const viewPortObsCallback = function (entries) {
  const [entry] = entries;

  headerLinks.forEach((link) => {
    link.classList.remove('header__link--active');

    if (link.getAttribute('href') === `#${entry.target.id}` && entry.isIntersecting) {
      link.classList.add('header__link--active');
    }
  });
};

const viewPortObserver = new IntersectionObserver(viewPortObsCallback, {
  root: null,
  threshold: 0.6,
});

sections.forEach((section) => viewPortObserver.observe(section));

//******** Sticky Header

const header = document.querySelector('.header');
const sliderSection = document.querySelector('.slider');

const headerHeight = header.getBoundingClientRect().height;

const headerObs = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add('sticky');
  else header.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(headerObs, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

headerObserver.observe(sliderSection);

//******** Card Slider


const cardSlider = function () {

  // Elements
  const allCards = document.querySelectorAll('.card');
  const nextArrow = document.querySelector('.btn-arrow--next');
  const prevArrow = document.querySelector('.btn-arrow--prev');
  const dotContainer = document.querySelector('.dots');

  // Default variables
  const cardWidth = document.querySelector('.card').getBoundingClientRect().width;
  const maxCardLength = allCards.length;

  let currentIndex = 0;

  // Creat dots
  const creatDots = function () {
    for (let i = 0; i < maxCardLength / 2 + 1; i++) {
      const dot = `<div class="dots__dot" data-card="${i}"></div>`;

      dotContainer.insertAdjacentHTML('beforeend', dot);
    }
  };


  // Slider functionality
  const goToSlide = function (slide) {
    allCards.forEach((card, _i) => {
      card.style.transform = `translateX(-${cardWidth * slide}px)`;
    });
  };


  // Activate dot
  const activeDot = function (slide) {
    // Remove active class
    document.querySelectorAll('.dots__dot').forEach((dot) => dot.classList.remove('dots__dot--active'));

    // Add active class
    dotContainer.querySelector(`.dots__dot[data-card="${slide}"]`).classList.add('dots__dot--active');

    currentIndex = slide;

    goToSlide(slide);
  };


  // Next slide
  const nextSlide = function () {
    if (currentIndex >= Math.trunc(allCards.length / 2) + 1) currentIndex = 0;
    else {
      currentIndex++;
    }


    

    activeDot(currentIndex);
    goToSlide(currentIndex);
  };

  // Prev slide
  const prevSlide = function () {
    if (currentIndex === 0) currentIndex = Math.trunc(allCards.length / 2) + 1;
    else {
      currentIndex--;
    }

    activeDot(currentIndex);
    goToSlide(currentIndex);
  };


  // Events
  nextArrow.addEventListener('click', nextSlide);
  prevArrow.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();

    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Add evetlistener to dots
  dotContainer.addEventListener('click', function (e) {
    const dot = e.target;

    if (!dot.classList.contains('dots__dot')) return;

    const { card } = dot.dataset;

    activeDot(card);
  });


  // Init function
  const init = function () {
    creatDots();
    goToSlide(0);
    activeDot(0);

  }

  init()

}

cardSlider()



//******** Main Slider



const slider = function () {

  // Elements
  const slideContainer = document.querySelector('.slider__container')
  const allSlides = document.querySelectorAll('.slide')
  const nextArr = document.querySelector('.slider__arrow--next')
  const prevArr = document.querySelector('.slider__arrow--prev')

  const maxSlidesLength = allSlides.length;


  let currentSlide = 0;


  // Add data-slide for each slide
  allSlides.forEach((s, i) => s.setAttribute('data-slide', i))

  // Activate Slide 
  const activateSlide = function (slide) {

    allSlides.forEach(s => s.classList.remove('slide--active'))

    slideContainer.querySelector(`.slide[data-slide="${slide}"]`).classList.add('slide--active');

  }


  // Go To Slide 
  const goTOSlide = function (slide) {
    allSlides.forEach((s, i) => {

      s.style.transform = `translateY(${(i - slide) * 100}%)`;

    })
  }



  // Next Slide
  const nextSlide = function () {

    if (currentSlide === maxSlidesLength - 1) {
      currentSlide = 0
    }
    else {
      currentSlide++
    }


    goTOSlide(currentSlide)
    activateSlide(currentSlide)

  }


  // Previous Slide
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlidesLength - 1
    }
    else {
      currentSlide--
    }


    goTOSlide(currentSlide)
    activateSlide(currentSlide)

  }



  // Events
  nextArr.addEventListener('click', nextSlide)
  prevArr.addEventListener('click', prevSlide)



  // Init function
  const init = function () {
    activateSlide(0)
    goTOSlide(0)

  }

  init()


}


slider()


//******** Burger Icon

const burger = document.querySelector('.burger');
const overlay = document.querySelector('.overlay')

const expandHeader = function () {
  burger.classList.toggle('active')
  header.classList.toggle('active')
  overlay.classList.toggle('hidden')
}


const hideHeader = function () {
  burger.classList.remove('active')
  header.classList.remove('active')
  overlay.classList.add('hidden')
}


burger.addEventListener('click', expandHeader)
overlay.addEventListener('click', hideHeader)
