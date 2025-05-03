(function ($) {
    "use strict";

    // 1. ---- Sticky Menu ----

    var wind = $(window);
    var sticky = $("#header-sticky");
    wind.on('scroll', function () {
        var scroll = $(wind).scrollTop();
        if (scroll < 2) {
            sticky.removeClass("sticky-menu");
        } else {
            $("#header-sticky").addClass("sticky-menu");
        }
    });

    // 2. ---- Background Image ----

    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
    });

    // 3. ---- Mobile Menu ----

    $("#mobile-menu").meanmenu({
        meanMenuContainer: ".mobile-menu",
        meanScreenWidth: "1199",
    });

    // 4. ---- One Page Nav ----

    var top_offset = $('.header-area').height() - 75;
    $('.main-menu nav ul').onePageNav({
        currentClass: 'active',
        scrollOffset: top_offset,
    });

    // 5. ---- Mobile Menu Sidebar ----

    $(".mobile-menubar").on("click", function () {
        $(".side-mobile-menu").addClass('open-menubar');
        $(".body-overlay").addClass("opened");
    });
    $(".close-icon").click(function () {
        $(".side-mobile-menu").removeClass('open-menubar');
        $(".body-overlay").removeClass("opened");
    });

    $(".body-overlay").on("click", function () {
        $(".side-mobile-menu").removeClass('open-menubar');
        $(".body-overlay").removeClass("opened");
    });

    $(document).on("click", ".side-mobile-menu a", function () {
        setTimeout(function () {
            $(".side-mobile-menu").removeClass('open-menubar');
            $(".body-overlay").removeClass("opened");
        }, 100);
    });

    // 6. ---- Preloader (para habilitar después) ----

    $(window).load(function () {
        $('#preloader').fadeOut('slow', function () { $(this).remove(); });
    });

    // 7. ---- Brand (para habilitar después) ----

    (function () {
        if (typeof EventTarget !== "undefined") {
            let func = EventTarget.prototype.addEventListener;
            EventTarget.prototype.addEventListener = function (type, fn, capture) {
                this.func = func;
                if (typeof capture !== "boolean") {
                    capture = capture || {};
                    capture.passive = false;
                }
                this.func(type, fn, capture);
            };
        };
    }());

    $('.brand-active').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });

    // 8. ---- Counter (para habilitar después, números al alza) ----

    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });

    // 9. ---- Knob (para circulos animados, por habilitar después) ----

    if (typeof ($.fn.knob) != 'undefined') {
        $('.knob').each(function () {
            var $this = $(this),
                knobVal = $this.attr('data-rel');

            $this.knob({
                'draw': function () {
                    $(this.i).val(this.cv + '%');
                }
            });

            $this.appear(function () {
                $({
                    value: 0
                }).animate({
                    value: knobVal
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.val(Math.ceil(this.value)).trigger('change');
                    }
                });
            }, {
                accX: 0,
                accY: -150
            });
        });
    }

    // 10. ---- AOS JS ----

    AOS.init();

    // 11. ---- Isotope JS (para Portfolio tipo grid, habilitar después) ----

    $('.grid').imagesLoaded(function () {
        var grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
                columnWidth: '.grid-item'
            }
        });

        $('.portfolio-menu').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            grid.isotope({ filter: filterValue });
        });
    });

    $('.portfolio-menu button').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    // 12. --- Scroll to Top ----

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $('#scroll').fadeIn(1200);
        } else {
            $('#scroll').fadeOut(1200);
        }
    });

    $('#scroll').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });

    // 13. ---- Copia de Email ----

    document.addEventListener("DOMContentLoaded", () => {
        const copyBtn = document.getElementById("copyEmailBtn");
        const email = "miguelmondacag89@gmail.com";
        const icon = copyBtn.querySelector("i");

        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(email).then(() => {

                icon.classList.remove("fa-envelope");
                icon.classList.add("fa-check");

                copyBtn.innerHTML = '<i class="fas fa-check"></i>Email copied';
                console.log("Email copied.");

                setTimeout(() => {
                    icon.classList.remove("fa-check");
                    icon.classList.add("fa-envelope");
                    copyBtn.innerHTML = '<i class="fas fa-envelope"></i>Copy to clipboard';
                }, 3000);
            }).catch(err => {
                console.error("Error copying email.", err);
            });
        });
    });

    // 14. ---- Modal Focus para evitar bug de Bootstrap ----

    jQuery(document).on('show.bs.modal', function (event) {
        window.lastTriggerElement = document.activeElement;
    });

    jQuery(document).on('hide.bs.modal', function (event) {
        var activeElement = document.activeElement;
        if (activeElement && $(activeElement).closest('.modal').length) {
            activeElement.blur();
        }
    });

    jQuery(document).on('hidden.bs.modal', function (event) {
        if (window.lastTriggerElement) {
            window.lastTriggerElement.focus();
            window.lastTriggerElement = null;
        }
    });

})(jQuery);