(function ($) {
  "use strict";

  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
  });

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($("#ftco-loader").length > 0) {
        $("#ftco-loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  // Scrollax
  $.Scrollax();

  var carousel = function () {
    $(".carousel-testimony").owlCarousel({
      autoplay: true,
      autoHeight: true,
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: false,
      dots: true,
      navText: [
        '<span class="ion-ios-arrow-back">',
        '<span class="ion-ios-arrow-forward">',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  };
  carousel();

  $("nav .dropdown").hover(
    function () {
      var $this = $(this);
      // 	 timer;
      // clearTimeout(timer);
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").addClass("show");
    },
    function () {
      var $this = $(this);
      // timer;
      // timer = setTimeout(function(){
      $this.removeClass("show");
      $this.find("> a").attr("aria-expanded", false);
      // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").removeClass("show");
      // }, 100);
    }
  );

  $("#dropdown04").on("show.bs.dropdown", function () {
    console.log("show");
  });

  // scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");

      if (st > 150) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
        }
      }
      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }

        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }
      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  };
  scrollWindow();

  var counter = function () {
    $(".ftco-counter").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(
            ","
          );
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            // console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step,
              },
              7000
            );
          });
        }
      },
      { offset: "95%" }
    );
  };
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn ftco-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };
  contentWayPoint();

  // magnific popup
  $(".image-popup").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
    },
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  $(".appointment_date").datepicker({
    format: "m/d/yyyy",
    autoclose: true,
  });
  $(".appointment_time").timepicker();
})(jQuery);

const handlePopupSubmit = async function (e) {
  e.preventDefault();
  $("#request-quote-btn").addClass("disabled");
  $("#request-quote-btn").prop("disabled", true);

  const fname = document.getElementById("popup-first-name").value;
  const lname = document.getElementById("popup-last-name").value;
  const phone = document.getElementById("popup-phone").value;
  const selectService = document.getElementById("popup-service");
  const service = selectService.options[selectService.selectedIndex].value;
  const message = document.getElementById("popup-message").value;

  const to_send = {
    firstname: fname,
    lastname: lname,
    phone: phone,
    service: service,
    message: message,
  };
  console.log(to_send);
  try {
    const response = await fetch("/.netlify/functions/sendmail?inquire=1", {
      //fetch("/api/sendmail", {
      method: "POST",
      body: JSON.stringify(to_send),
    });
    if (!response.ok) {
      //Do something when request fails
      //alert("worked");
      //$("#inquiry-error-alert").removeClass("hide");
      //$("#inquiry-error-alert").addClass("show");
      $("#inquiry-error-alert").show();

      $("#request-quote-btn").removeClass("disabled");
      $("#request-quote-btn").prop("disabled", false);
      console.log("failed to send message");
      return false;
    }
    //Do something when request is successful
    //$("#inquiry-success-alert").removeClass("hide");
    //$("#inquiry-success-alert").addClass("show");
    $("#inquiry-success-alert").show();

    $("#request-quote-btn").removeClass("disabled");
    $("#request-quote-btn").prop("disabled", false);
    console.log("Message submitted successfully!");
  } catch (e) {
    console.log(e);
    //$("#inquiry-error-alert").removeClass("hide");
    //$("#inquiry-error-alert").addClass("show");
    $("#inquiry-error-alert").show();

    $("#request-quote-btn").removeClass("disabled");
    $("#request-quote-btn").prop("disabled", false);
    return false;
  }

  //$("#exampleModalCenter").modal("toggle");
  return false;
};

$(function () {
  $("[data-hide]").on("click", function () {
    console.log("click!");
    //$("." + $(this).attr("data-hide")).hide();
    $(this)
      .closest("." + $(this).attr("data-hide"))
      .hide(100);
    // $(this)
    //   .closest("." + $(this).attr("data-hide"))
    //   .removeClass("show");
    // $(this)
    //   .closest("." + $(this).attr("data-hide"))
    //   .addClass("hide");
    /*
     * The snippet above will hide all elements with the class specified in data-hide,
     * i.e: data-hide="alert" will hide all elements with the alert property.
     *
     * Xeon06 provided an alternative solution:
     * $(this).closest("." + $(this).attr("data-hide")).hide();
     * Use this if are using multiple alerts with the same class since it will only find the closest element
     *
     * (From jquery doc: For each element in the set, get the first element that matches the selector by
     * testing the element itself and traversing up through its ancestors in the DOM tree.)
     */
  });
});

$("#inquiry-success-alert").hide();
$("#inquiry-error-alert").hide();
