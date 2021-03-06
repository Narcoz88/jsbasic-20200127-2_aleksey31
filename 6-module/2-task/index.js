'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  i = 0;

  constructor(element) {
    this.el = element;
    this.el.innerHTML = `<div id="mainCarousel" class="main-carousel carousel slide">
                             <ol class="carousel-indicators">
                                 <li data-target="#mainCarousel" data-slide-to="0" class="carousel-indicator"></li>
                                 <li data-target="#mainCarousel" data-slide-to="1" class="carousel-indicator"></li>
                                 <li data-target="#mainCarousel" data-slide-to="2" class="carousel-indicator"></li>
                             </ol>
                             <div class="carousel-inner">
                                 <!--Вот здесь будет активный слайд-->
                             </div>
                         
                             <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
                                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                 <span class="sr-only">Previous</span>
                             </button>
                             <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
                                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                 <span class="sr-only">Next</span>
                             </button>
                         </div>`;


    let render = this.slides.map((item, index, arr) => {

      return `<div class="carousel-item" data-id="${item.id}">
                      <img src="${item.img}" alt="Activelide">
                      <div class="container">
                          <div class="carousel-caption">
                              <h3 class="h1">${item.title}</h3>
                              <div>
                                  <a class="btn" href="#" role="button">
                                      View all DEALS
                                      <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>`;
    });

    this.el.querySelector(".carousel-inner").innerHTML = render[0];

    this.el.querySelectorAll(".carousel-item")[+this.slides[0].id].classList.add("active");
    this.el.querySelector(`*[data-slide-to="${this.slides[this.i].id}"]`).classList.add("active");

    this.el.querySelector(".carousel-control-next").addEventListener('click', (e) => {
      console.log(this.i);

      if (this.i <= this.slides.length - 1) {
        this.i++;
      }
      if (this.i <= this.slides.length - 1) {

        this.el.querySelector(".carousel-inner").innerHTML += render[this.slides[this.i].id];

      }
      if (this.el.querySelector(".carousel-item.active").nextElementSibling) {
        this.el.querySelector(".carousel-item.active").nextElementSibling.classList.add("active");
        this.el.querySelector(".carousel-item.active").classList.remove("active");
      } else {
        this.el.querySelector(".carousel-item").classList.add("active");
        this.el.querySelectorAll(".carousel-item.active")[1].classList.remove("active");
      }

      this.el.querySelectorAll(".carousel-indicator").forEach((item => {
        if (item.classList.contains("active")){
          item.classList.remove("active");
        }
      }));
      console.log("активный слайд", this.el.querySelector(".carousel-item.active").dataset.id);
      this.el.querySelector(`*[data-slide-to="${this.el.querySelector(".carousel-item.active").dataset.id}"]`).classList.add("active");
    });

    this.el.querySelector(".carousel-control-prev").addEventListener('click', (e) => {
      if (this.i <= this.slides.length - 1) {
        this.i++;
      }

      if (this.i <= this.slides.length - 1) {
        this.el.querySelector(".carousel-inner").innerHTML += render[this.slides[this.i].id];

      }

      if (this.el.querySelector(".carousel-item.active").previousElementSibling) {
        this.el.querySelector(".carousel-item.active").previousElementSibling.classList.add("active");
        this.el.querySelectorAll(".carousel-item.active")[1].classList.remove("active");
        this.el.querySelectorAll(".carousel-indicator").forEach((item => {
          if (item.classList.contains("active")){
            item.classList.remove("active");
          }
        }));
        console.log("активный слайд", this.el.querySelector(".carousel-item.active").dataset.id);
        this.el.querySelector(`*[data-slide-to="${this.el.querySelector(".carousel-item.active").dataset.id}"]`).classList.add("active");
      } else {
        if (this.el.querySelectorAll(".carousel-item").length > 1) {
          this.el.querySelector(".carousel-inner").lastElementChild.classList.add("active");
          this.el.querySelector(".carousel-item.active").classList.remove("active");
          this.el.querySelectorAll(".carousel-indicator").forEach((item => {
            if (item.classList.contains("active")){
              item.classList.remove("active");
            }
          }));
        }

        if (this.el.querySelectorAll(".carousel-item").length > 1) {
          console.log("активный слайд", this.el.querySelector(".carousel-item.active").dataset.id);
          this.el.querySelector(`*[data-slide-to="${this.el.querySelector(".carousel-item.active").dataset.id}"]`).classList.add("active");
        }
      }
    });

    this.el.querySelector(".carousel-indicators").addEventListener('click', (e) => {

        if (e.target.tagName === "LI" &&  this.el.querySelector(`.carousel-item[data-id="${e.target.dataset.slideTo}"]`)) {
          this.el.querySelectorAll(".carousel-indicator").forEach((item => {
            if (item.classList.contains("active")){
              item.classList.remove("active");
            }
          }));
          e.target.classList.toggle("active");
          this.el.querySelector(".carousel-item.active").classList.remove("active");
          this.el.querySelectorAll(".carousel-item")[e.target.dataset.slideTo].classList.add("active");
        }
    });


  }






}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
