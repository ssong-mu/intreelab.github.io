$(document).ready(function () {

	setTimeout(function(){
		$("#sv").addClass("on");	
	}, 20);

	// $("header").css("position", "relative")

	var pathname = $(location).attr("pathname"),
			header = $("header"),
			lnbBox = $(".lnbBox"),
			lnb = $("#lnb");

	function getParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	// path
	header.find("#gnb > li").each(function () {
		var aHref = $(this).children("a").attr("href");
		if (pathname.split("/")[3] === aHref.split("/")[3]) {
			$(".path1 button span").text($(this).children("a").text());
			$(this).closest("ul").children("li").clone().appendTo(".path1 ul").find("ul").remove();
//			$(this).siblings("li").clone().appendTo(".path1 ul").find("ul").remove();
		}
		if (pathname.split("/")[3] == "products") {
			$(".path2").remove();
		}
	})
	header.find(".depth2 > li").each(function () {
		var aHref = $(this).children("a").attr("href"),
			data = $(this).children("a").data("sub_url");
		if (pathname === aHref || pathname === data) {
			$(".path2 button span").text($(this).children("a").text())
			$(this).addClass("on");
			$(this).closest("ul").children("li").clone().appendTo(".path2 ul");
		}
		if(data) {
			var arrData = data.split(",");
			if(arrData.indexOf(pathname) > -1) {
				$(".path2 button span").text($(this).children("a").text())
				$(this).addClass("on");
				$(this).closest("ul").children("li").clone().appendTo(".path2 ul");
			}
		}
	})
	if(!$(".path button").find("i").length) {
		$("<i class='xi-angle-down-min'></i>").appendTo($(".path button"))
	}
	if(!$(".path2 ul").find("li").length){
		$(".path2").remove();
	}
//	var pathFlag = false;
	$(".path").find("button").on("click", function(){
//		pathFlag = !pathFlag;
		var ul = $(this).siblings("ul");
		ul.stop().slideToggle();
//		if (pathFlag) {
//			ul.stop().slideDown();
//		} else {
//			ul.stop().slideUp();
//		}
	})

	$(window).on("load resize", function () {
		var windowWidth = $(window).width();
	})
	
});