$(document).ready(function () {

	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) {
		if (ua.indexOf('chrome') > -1) {
			// Chrome
			$("body").addClass("chrome")
		} else {
			// Safari
			$("body").addClass("safari")
		}
	}

	setTimeout(function () {
		$(".visual").addClass("on");
	}, 200);

	var fullPageCreated = false;
	createFullpage();
	fullResize();

	$("#fp-nav ul").find("li").each(function () {
		if ($(this).find("a").hasClass("active")) {
			$(this).addClass("on");
		} else {
			$(this).removeClass("on");
		}
		$(this).on("mouseenter mouseleave", function (e) {
			var type = e.type;
			if (type == "mouseenter") {
				$("#fp-nav ul").find("li").removeClass("on");
				$(this).addClass("on");
			} else if (type == "mouseleave") {
			}
		})
	})

	var header = $("header"),
		visual = $(".visual"),
		animation = $(".animation");
	function createFullpage() {
		if (fullPageCreated === false) {
			fullPageCreated = true;
			$("#fullpage").fullpage({
				autoScrolling: true,
				navigation: true,
				verticalCentered: true,
				scrollingSpeed: 1000,
				scrollHorizontally: true,
				responsiveHeight: 800,
				css3: false,
				onLeave: function (index, nextIndex, direction) {
					console.log(nextIndex)
					if (nextIndex == 2 || nextIndex == 4) {
						$("#fp-nav").addClass("gray");
					} else {
						$("#fp-nav").removeClass("gray");
					}
				},
				afterLoad: function (origin, destination, direction) {
					if (destination != 1) {
						$(this).addClass("on");
						$(this).find(animation).addClass("on");
					}
					$("#fp-nav ul").find("li").each(function () {
						var index = $(this).index() + 1;
						if(!$(this).find(".text").length) {
							$("<div class='text'><img src='/img/main/fpText" + index + ".png' alt='icon'></div>").appendTo($(this).find("a"))
						}
						if ($(this).find("a").hasClass("active")) {
							$(this).addClass("on");
						} else {
							$(this).removeClass("on");
						}
					})
				}
			});
		}
	}
	function fullResize() {
		if ($(window).width() <= 1200) {
			$(".visual").addClass("active");
			if (fullPageCreated == true) {
				$.fn.fullpage.destroy("all");
				fullPageCreated = false;
			}
			var section = $(".section");
			$(window).scroll(function () {
				var scrollTop = $(this).scrollTop();
				section.each(function (idx) {
					var sectionTop = $(this).offset().top;
					if (scrollTop >= sectionTop - 600) {
						$(this).addClass("on");
					}
				});
			});
			
			$("#fullpage .products .swiper-slide").each(function(){
				var productsSrc = $(this).find("img").attr("src");
				if(productsSrc == "/img/main/productsImg4.png") {
					$(this).find("img").attr("src", "/img/main/productsImg4_mo.png")
				}
			})
		} else {
			if (fullPageCreated == false) {
				$(".section").removeClass("active");
				createFullpage();
				fullPageCreated = true;
			}
			$("#fullpage .products .swiper-slide").each(function(){
				var productsSrc = $(this).find("img").attr("src");
				if(productsSrc == "/img/main/productsImg4_mo.png") {
					$(this).find("img").attr("src", "/img/main/productsImg4.png")
				}
			})
		}
	}

	// visual
	var defaultTime = 4800;
	var visualSwiper = new Swiper(".visualSlideBox", {
		slidesPerView: 1,
		effect: "fade",
		loop: true,
		speed: 1000,
		autoplay: {
			delay: defaultTime,
			disableOnInteraction: false,
		},
//		autoplay: false,
		navigation: {
			nextEl: ".visual .swiper-button-next",
			prevEl: ".visual .swiper-button-prev",
		},
		on: {
			init: function () {
				setTimeout(function () {
					$(".visual .swiper-slide-active").addClass("on");
				}, 20);
			},
			slideChange: function () {
//				$(".visual .bg").addClass("on");
			},
			slideChangeTransitionStart: function () {
//				$(".visual .title").removeClass("on");
				$(".visual .swiper-slide").removeClass("on");
				$(".visualSvgOn").stop().animate({
					"stroke-dashoffset": 314
				}, 0);
			},
			slideChangeTransitionEnd: function () {
//				$(".visual .bg").removeClass("on");
				$(".visual .swiper-slide").removeClass("on");
				setTimeout(function () {
//					$(".visual .title").addClass("on");
					$(".visual .swiper-slide-active").addClass("on");
				}, 0);
				$(".visualSvgOn").stop().animate({
					"stroke-dashoffset": 0
				}, defaultTime);
			}
		}
	})

	// products
	var productsKR = [],
		productsEN = [],
		productsLink = [];

	$(".productsSlide").find(".swiper-slide").each(function (index) {
		var kr = $(this).data("kr"),
				en = $(this).data("en");
		productsKR.push(kr);
		productsEN.push(en);
		productsLink.push($(this).find("a").attr("href"))
	})
	var productsSwiper = new Swiper(".productsSlideBox", {
		slidesPerView: 1,
		effect: "fade",
		loop: true,
		pagination: {
			el: ".products .swiper-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return "<li class='" + className + "'><dl><dt>" + (productsKR[index]) + "</dt><dd>" + (productsEN[index]) + "</dd></dl><div class='dot3Arrow'><span></span><span></span><span></span></div></li>";
			},
		},
	})
	$(".products .swiper-pagination > li").each(function(){
		var index = $(this).index() + 1;
		if (!$(this).find(".icon").length) {
			$("<div class='icon'><img src='/img/main/productsIcon" + index + ".png' alt='icon'></div>").prependTo($(this))
		}
	})
	$(".products .swiper-pagination > li").on("click", function () {
		var idx = $(this).index();
		location.replace(productsLink[idx])
	})
	$(".products .swiper-pagination > li").on("mouseenter mouseleave", function (e) {
		var type = e.type;
		if (type == "mouseenter") {
			productsSwiper.slideTo(($(this).index() + 1));
		} else if (type == "mouseleave") {
		}
	});

	// cursor
	var cursor = $(".cursor");
	$(".products").find(".swiper-slide").on("mouseenter mouseleave mousemove", function(e){
		var type = e.type,
				mouseX = e.pageX,
				mouseY = e.pageY;
		if (type == "mouseenter") {
			cursor.addClass("on");
			$("*").css({
				"cursor": "none"
			});
		} else if (type == "mouseleave") {
			cursor.removeClass("on");
			$("*").css({
				"cursor": "revert"
			})
		} else if (type == "mousemove") {
			cursor.css({
				top: mouseY + "px",
				left: mouseX + "px"
			});
		}
	})

	// subsidiary
	var subsidiary = $(".subsidiary");
	subsidiary.find(".item").each(function () {
		$(this).on("mouseenter mouseleave", function (e) {
			var type = e.type;
			if (type == "mouseenter") {
				subsidiary.find(".item").not(this).removeClass("on");
				$(this).addClass("on");
			} else if (type == "mouseleave") {
				subsidiary.find(".item").removeClass("on");
				subsidiary.find(".item:first-child").addClass("on");
			}
		})
	})

	$(window).on("load resize", function () {
		fullResize();
		var windowWidth = $(window).width();

	});

});