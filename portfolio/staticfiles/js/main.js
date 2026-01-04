/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';



   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {scale: [0, 1]},
            {opacity: [1, .7]}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100)
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');

   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        window.addEventListener('load', function() {
            
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader

   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {

            link.addEventListener("click", function(evt) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu

   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll('.target-section');

        // Add an event listener listening for scroll
        window.addEventListener('scroll', navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height, top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');
        
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.main-nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
                } else {
                    document.querySelector('.main-nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
                }
            });
        }

    }; // end ssScrollSpy

   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll('[data-animate-block]');
        const els = document.querySelectorAll('[data-animate-el]');

        blocks.forEach(function(current) {

            const viewportHeight = window.innerHeight;
            const triggerTop = (viewportHeight * .8);

            function animateIt() {
                let scrollY = window.pageYOffset;
                let elementTop = current.offsetTop;
                let elementHeight = current.offsetHeight;
                let elementBottom = elementTop + elementHeight;

                function inViewport() {
                    return ((elementBottom - triggerTop) <= scrollY) && (elementTop >= (scrollY - triggerTop));
                }

                if (inViewport()) {
                    current.classList.add('ss-animated');
                }
            }

            // Run on load
            animateIt();
            
            window.addEventListener('scroll', animateIt);
        });

        els.forEach(function(current) {

            const viewportHeight = window.innerHeight;
            const triggerTop = (viewportHeight * .8);

            function animateIt() {
                let scrollY = window.pageYOffset;
                let elementTop = current.offsetTop;
                let elementHeight = current.offsetHeight;
                let elementBottom = elementTop + elementHeight;

                function inViewport() {
                    return ((elementBottom - triggerTop) <= scrollY) && (elementTop >= (scrollY - triggerTop));
                }

                if (inViewport()) {
                    current.classList.add('ss-animated');
                }
            }

            // Run on load
            animateIt();
            
            window.addEventListener('scroll', animateIt);
        });

    }; // end ssViewAnimate

   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.testimonial-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
        });

    }; // end ssSwiper

   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = document.querySelectorAll('.modal-popup');

        folioLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {

                e.preventDefault();
                let href = link.getAttribute('href');
                let modal = document.querySelector(href);

                if (modal) {
                    modal.style.display = 'block';
                    
                    setTimeout(function() {
                        modal.classList.add('show');
                    }, 100);

                    // Close modal functionality
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal || e.target.classList.contains('modal-close')) {
                            modal.classList.remove('show');
                            setTimeout(function() {
                                modal.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });

    }; // end ssLightbox

   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes

   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo

   /* Contact Form
    * ------------------------------------------------------ */
    const ssContactForm = function() {
        
        const contactForm = document.querySelector('#contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('contactName');
            const email = formData.get('contactEmail');
            const subject = formData.get('contactSubject');
            const message = formData.get('contactMessage');
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare data for Django
            const csrfToken = contactForm.querySelector('[name=csrfmiddlewaretoken]').value;
            const data = {
                contactName: name,
                contactEmail: email,
                contactSubject: subject,
                contactMessage: message
            };
            
            // Send to Django backend
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    showFormMessage(data.message, 'success');
                    contactForm.reset();
                } else {
                    showFormMessage(data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                showFormMessage('An error occurred while sending your message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
        
        // Helper function to show form messages
        function showFormMessage(message, type) {
            const messageEl = document.getElementById('form-message');
            if (!messageEl) {
                alert(message); // Fallback to alert
                return;
            }
            
            messageEl.textContent = message;
            messageEl.style.display = 'block';
            
            if (type === 'success') {
                messageEl.style.backgroundColor = '#d4edda';
                messageEl.style.color = '#155724';
                messageEl.style.border = '1px solid #c3e6cb';
            } else {
                messageEl.style.backgroundColor = '#f8d7da';
                messageEl.style.color = '#721c24';
                messageEl.style.border = '1px solid #f5c6cb';
            }
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 5000);
        }
    };

   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();
        ssContactForm();

    })();

})(document.documentElement);
