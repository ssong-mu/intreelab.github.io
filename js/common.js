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
	AOS.init({
		duration: 600,
	});

	var header = $("header"),
		animation = $(".animation"),
		gnb = $("#gnb"),
		depth1 = gnb.children("li"),
		snb = $("#snb"),
		allMenu = $(".allMenu"),
		menuOpen = $(".menuOpen"),
		menuClose = $(".menuClose"),
		languageButton = $(".languageButton"),
		languageFlag = false,
		searchButton = $(".searchButton"),
		searchFlag = false,
		familyButton = $(".familySite button"),
		familyFlag = false;
	
	// animation
	$(window).on("load scroll", function () {
		var scrollTop = $(this).scrollTop();
		animation.each(function () {
			var animationTop = $(this).offset().top;
			if (scrollTop >= animationTop - 600) {
				$(this).addClass("on");
			}
		})
	});
	animation.each(function () {
		var delay = $(this).data("delay");
		$(this).css({
			"transition-delay": delay
		})
	});
	
	// snb
	depth1.clone().appendTo(snb);

	// menu button
	menuOpen.on("click", function () {
		allMenu.stop().fadeIn();
		allMenu.addClass("on");
	})
	menuClose.on("click", function () {
		allMenu.stop().fadeOut();
		allMenu.removeClass("on");
	})

	// language button
	languageButton.on("click", function () {
		languageFlag = !languageFlag;
		if (languageFlag) {
			$(this).parents(".languageBox").addClass("on");
		} else {
			$(this).parents(".languageBox").removeClass("on");
		}
	})
	
	// search button
	searchButton.on("click", function () {
		searchFlag = !searchFlag;
		if (searchFlag) {
			header.find(".searchBox").stop().slideDown();
		} else {
			header.find(".searchBox").stop().slideUp();
		}
	})

	
	// family site
	familyButton.on("click", function () {
		familyFlag = !familyFlag;
		if (familyFlag) {
			$(this).siblings("ul").stop().slideDown();
		} else {
			$(this).siblings("ul").stop().slideUp();
		}
	})

	// tab
	if ($(".tabContents").length) {
		var tabT = $(".tabTitle > li");
		var tabC = $(".tabContents > div");
	
		tabT.click(function () {
			var count = $(this);
			var index = count.index();
	
			tabT.removeClass("on");
			count.addClass("on");
	
			tabC.removeClass("on");
			tabC.eq(index).addClass("on");
			$(".aos-init").each(function () {
				var animationTop = $(this).offset().top;
				if($(this).hasClass("aos-animate")){
					$(".aos-init").removeClass("aos-animate");
				}
			})
		})
	}


	// desktop
	function initEvent_pc(val) {

		depth1.on("mouseenter mouseleave", function (e) {
			var type = e.type,
					depth2 = $(this).find(".depth2");
			if (type == "mouseenter") {
        header.addClass("on");
				depth2.addClass("on");
			} else if (type == "mouseleave") {
        header.removeClass("on");
				depth2.removeClass("on");
			}
		});

	};

	// mobile
	function initEvent_mo(val) {

		snb.children("li").each(function () {
			$(this).children("a").on("click", function (e) {
				e.preventDefault();
			})
			$(this).on("click", function () {
				snb.children("li").not(this).find(".cover").removeClass("off");
				snb.children("li").not(this).find(".depth2").removeClass("on");
			})
		});

	};

	function hdlr_switch(val) {
		if (val > 1200) {
			initEvent_pc(val);

		} else {
			initEvent_mo(val);
		};
	};

	var footer = $("footer");
	$(window).on("load resize", function () {
		var doc_width = $(window).width();
		hdlr_switch(doc_width);

		if(doc_width <= 768) {
//			snb.children("li").children("a").on("click", function(e){
//				var depth = $(this).siblings(".depth2");
//				if(depth.length) {
//					e.preventDefault()
//					snb.children("li").children("a").not(this).siblings(".depth2").stop().slideUp();
//					depth.stop().slideToggle();
//				}
//			});
			snb.children("li").children("a").off("click");
			snb.children("li").children("a").on("click", function (e) {
				var depth2 = $(this).siblings(".depth2");
				if (depth2.length) {
					e.preventDefault();
					snb.children("li").children("a").not(this).siblings(".depth2").stop().slideUp()
					depth2.stop().slideToggle();
				}
			});
		}

	});

	// 100vh
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	// img to svg
	document.querySelectorAll('img.svg').forEach(function (img) {
		var imgID = img.id;
		var imgClass = img.className;
		var imgURL = img.src;

		fetch(imgURL).then(function (response) {
			return response.text();
		}).then(function (text) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(text, "text/xml");
			// Get the SVG tag, ignore the rest
			var svg = xmlDoc.getElementsByTagName('svg')[0];
			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				svg.setAttribute('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				svg.setAttribute('class', imgClass + ' replaced-svg');
			}
			// Remove any invalid XML tags as per http://validator.w3.org
			svg.removeAttribute('xmlns:a');
			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
				svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
			}
			// Replace image with new SVG
			img.parentNode.replaceChild(svg, img);
		});
	});

	function autoHeightAnimate(element, time) {
		var curHeight = element.height(), // Get Default Height
			autoHeight = element.css('height', 'auto').height(); // Get Auto Height
		element.height(curHeight); // Reset to Default Height
		element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
	}
});

function search_form() {
	if (searchform.s_keyword.value=='') { alert("검색어를 입력하세요."); searchform.s_keyword.focus(); return false; }
	searchform.submit();
}