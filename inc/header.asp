<!DOCTYPE HTML>
<html lang="ko">
	<head>
		<title>Global ZEUS</title>
		<meta charset="UTF-8">
		<!--#include virtual="/site/setting.asp" -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
		<link rel="shortcut" href="파일이름.ico">
		<link rel="stylesheet" type="text/css" href="/css/jquery.fullpage.css" />
		<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />
		<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/xpressengine/xeicon@2.3.1/xeicon.min.css">
		<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="/js/jquery.fullpage.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
		<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
		<script src="/js/common.js"></script>
		<script>
			var windowWidth = window.screen.width
			setViewPort(windowWidth);
			function setViewPort(w_width) {
				if (w_width <= 420 ){
					$("meta[name=viewport]").attr("content", "width=420, maximum-scale=2.0, user-scalable=no, target-densitydpi=medium-dpi");
				} else {
					$("meta[name=viewport]").attr("content", "width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi");
				} 
			}
			$(window).resize(function(){
				var windowWidth = window.screen.width
				setViewPort(windowWidth);
			});
			function updateOrientation() {
				var orientationValue = window.orientation
				if (orientationValue == 90 || orientationValue == -90) {
					$("meta[name=viewport]").attr("content",
						"width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, user-scalable=yes,target-densitydpi=medium-dpi"
					);
				}
			}
			window.onload = function() {
				document.body.onorientationchange = updateOrientation;
			}

			if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
				window.location = 'microsoft-edge:' + window.location;
				setTimeout(function() {
					window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
				}, 1);
			}
		</script>
	</head>
<body>
<div class="cursor"><i class="xi-plus"></i></div>
<div id="wrap">
	<header>
		<div class="headerBox">
			<h1 class="logo">
				<a href="/kr/index.asp"><img class="svg" src="/img/svg/logo.svg" alt=""></a>
			</h1>
			<nav>
				<ul id="gnb" class="depth1">
					<li>
						<a href="/kr/sub/company/overview.asp">COMPANY</a>
						<ul class="depth2 menu01">
							<li><a href="/kr/sub/company/overview.asp">기업개요</a></li>
							<li><a href="/kr/sub/company/ceo.asp">CEO인사말</a></li>
							<li><a href="/kr/sub/company/history.asp">연혁</a></li>
							<li><a href="/kr/sub/company/philosophy.asp">비전/경영철학</a></li>
							<li><a href="/kr/sub/company/affiliate.asp">계열사 소개</a></li>
							<li><a href="/kr/sub/company/workplace.asp">사업장 소개</a></li>
							<li><a href="/kr/sub/company/customers.asp">주요 고객사</a></li>
						</ul>
					</li>
					<li>
						<a href="/kr/sub/products/list.asp" data-sub_url="/kr/sub/products/detail.asp">PRODUCTS</a>
						<ul class="depth2 menu02">
						<%
							Set objView = Server.CreateObject("ADODB.Recordset")
							SQL = "SELECT c_code, c_name FROM tbl_cate WHERE c_lang = '한국어' AND c_depth = '1' AND c_hide = '0' ORDER BY c_lev ASC "
							objView.open SQL, Dbcon, 1, 3
							If Not objView.eof Then arrRS = objView.getrows()
							objView.close
							Set objView = Nothing

							If isset(arrRS) <> "Null" Then
								For i = LBound(arrRS, 2) To UBound(arrRS, 2)
									c_code	= arrRS(0,i)
									c_name	= arrRS(1,i)
						%>
							<li><a href="/kr/sub/products/list.asp?p_cate=<%=c_code%>"><%=c_name%></a></li>
						<%
								Next
								Erase arrRS
							End If
						%>
						</ul>
					</li>
					<li>
						<a href="/kr/sub/esg/ethical.asp">ESG</a>
						<ul class="depth2 menu03">
							<li><a href="/kr/sub/esg/ethical.asp">윤리경영</a></li>
							<li><a href="/kr/sub/esg/social.asp">사회공헌</a></li>
							<li><a href="/kr/sub/esg/safety.asp">환경안전경영</a></li>
							<li><a href="/kr/sub/esg/management.asp">윤리경영제보</a></li>
						</ul>
					</li>
					<li>
						<a href="/kr/sub/ir/stock.asp">IR</a>
						<ul class="depth2 menu04">
<!-- 								<li><a href="/kr/sub/ir/stock.asp">주가정보</a></li> -->
							<li><a href="/kr/sub/ir/disclosure.asp" data-sub_url="/kr/sub/ir/rules.asp,/kr/sub/ir/notice.asp,/kr/sub/ir/noticeView.asp">공시정보</a></li>
							<li><a href="/kr/sub/ir/financial.asp">재무정보</a></li>
<!-- 							<li><a href="/kr/sub/ir/rules.asp">공시규정</a></li> -->
							<li><a href="/kr/sub/ir/media.asp" data-sub_url="/kr/sub/ir/mediaView.asp">NEWS</a></li>
<!-- 							<li><a href="/kr/sub/ir/notice.asp" data-sub_url="/kr/sub/ir/noticeView.asp">공지사항</a></li> -->
						</ul>
					</li>
					<li>
						<a target="_blank" href="http://www.globalzeus.com/recruit/index.asp">CAREERS</a>
												<ul class="depth2 menu05">
							<li><a target="_blank" href="http://www.globalzeus.com/recruit/index.asp">채용 홈페이지 <i class="xi-external-link"></i></a></li>
						</ul>
					</li>
					<li>
						<a href="/kr/sub/pr/center.asp">CUSTOMER</a>
						 <ul class="depth2 menu06">
							<li><a href="/kr/sub/pr/center.asp">고객센터</a></li>
							<li><a target="_blank" href="http://visit.globalzeus.com">방문예약 <i class="xi-external-link"></i></a></li>
						</ul>
					</li>
				</ul>
			</nav>
			<div class="languageBox">
				<button class="languageButton">
					<div class="icon"><img class="svg" src="/img/svg/languageIcon.svg" alt=""></div>
					<span>KR</span>
					<i class="xi-caret-down-min"></i>
				</button>
				<ul>
					<li><a href="/kr/index.asp">KR</a></li>
					<li><a href="/en/index.asp">EN</a></li>
					<!--<li><a href="/cn/index.asp">CH</a></li>
					<li><a href="/jp/index.asp">JP</a></li>-->
				</ul>
			</div>
			<button class="searchButton">
				<img src="/img/common/searchIcon.png" alt="">
			</button>
			<button class="menuButton menuOpen">
				<span></span><span></span><span></span>
			</button>
		</div>
		<div class="searchBox">
			<div class="inner">
				<h4 class="font32">
					<b>찾으시는 제품</b>이 <br>
					있으신가요?
				</h4>
				<form name="searchform" method="post" action="/kr/sub/products/list.asp">
					<label for="">
						<input type="text" name="s_keyword" placeholder="검색어를 입력해주세요.">
						<button type="button" onclick="search_form()"><img src="/img/common/searchIcon.png" alt=""></button>
					</label>
				</form>	
			</div>
		</div>
	</header>
	<div class="allMenu">
		<button class="menuButton menuClose"><i class="xi-close"></i></button>
		<div class="flexBox">
			<div class="bg"><img src="/img/common/menuBg.jpg" alt=""></div>
			<ul id="snb"></ul>
		</div>
	</div>
<%
	If Instr(Request.ServerVariables("URL"),"index.asp") = 0 And Instr(Request.ServerVariables("URL"),"indexNew.asp") = 0 Then
	foldname = Split(Request.ServerVariables("URL"), "/")
		Select Case foldname(3)
			Case "company"
			num = "1"
			subTitle = "COMPANY"

			Case "products"
			num = "2"
			subTitle = "PRODUCTS"

			Case "esg"
			num = "3"
			subTitle = "ESG"

			Case "ir"
			num = "4"
			subTitle = "IR"

			Case "pr"
			num = "5"
			subTitle = "CUSTOMER"

			Case "policy"
			num = "6"
			subTitle = "POLICY"
		End Select
%>
<!--index 페이지 아닐때-->
	<script src="/js/sub.js"></script>
	<script>
	$pageIndex = <%=num%>;
	</script>
	<div id="subWrap">
		<section id="sv" class="sv0<%=num%>">
			<div class="subVisual">
				<div class="bg"></div>
				<h2 class="font64"><%=subTitle%></h2>
			</div>
			<div class="pathBox">
				<div class="width1400">
					<ul class="path">
						<li class="home">
							<a href="/kr/index.asp">
								<i class="xi-home"></i>
							</a>
						</li>
						<li class="path1">
							<button><span></span></button>
							<ul></ul>
						</li>
						<li class="path2<% If pageNum="noPage" Then%> noPage<% End If %>">
							<button><span></span></button>
							<ul></ul>
						</li>
						<%
							If detail = "true" Then
								Set objView = Server.CreateObject("ADODB.Recordset")
								SQL = "SELECT * FROM tbl_prod WHERE idx = '"&Request("p_idx")&"' "
								objView.open SQL, Dbcon, 1, 3
								If Not objView.eof Then
									p_cate1	= objView("p_cate")
									p_cate2	= objView("p_cate2")
									p_name	= objView("p_name")
								End If
								objView.close
								Set objView = Nothing

								Set objView = Server.CreateObject("ADODB.Recordset")
								SQL = "SELECT c_code, c_name FROM tbl_cate WHERE c_lang = '한국어' AND c_depth = '1' AND c_hide = '0' ORDER BY c_lev ASC "
								objView.open SQL, Dbcon, 1, 3
								If Not objView.eof Then arrRS = objView.getrows()
								objView.close
								Set objView = Nothing
								If isset(arrRS) <> "Null" Then
						%>
						<li class="detailPath">
							<button type="button"><span><%=CateName(p_cate1)%></span></button>
							<ul>
							<%
									For i = LBound(arrRS, 2) To UBound(arrRS, 2)
										a_code	= arrRS(0,i)
										a_name	= arrRS(1,i)
							%>
								<li><a href="/kr/sub/products/list.asp?p_cate=<%=a_code%>"><%=a_name%></a></li>
							<%
									Next
									Erase arrRS
							%>
							</ul>
						</li>
						<%
								End If
						%>
						<%
							Set objView = Server.CreateObject("ADODB.Recordset")
							SQL = "SELECT c_code, c_name FROM tbl_cate WHERE c_lang = '한국어' AND c_depth = '2' AND c_hide = '0' AND c_code LIKE '"&p_cate1&"%' ORDER BY c_lev ASC "
							objView.open SQL, Dbcon, 1, 3
							If Not objView.eof Then arrRS = objView.getrows()
							objView.close
							Set objView = Nothing
							If isset(arrRS) <> "Null" Then
						%>
						<li class="detailPath">
							<button><span><%=CateName(p_cate2)%></span></button>
							<ul>
							<%
								For i = LBound(arrRS, 2) To UBound(arrRS, 2)
									b_code	= arrRS(0,i)
									b_name	= arrRS(1,i)
							%>
								<li><a href="/kr/sub/products/list.asp?p_cate=<%=b_code%>"><%=b_name%></a></li>
							<%
									Next
									Erase arrRS
							%>
							</ul>
						</li>
						<%
							End If
						%>
						<%
							Set objView = Server.CreateObject("ADODB.Recordset")
							SQL = "SELECT idx, p_cate, p_name, p_memo, p_image1 FROM tbl_prod WHERE idx != '' AND p_hide = '0' AND p_cate = '"&p_cate1&"' AND p_cate2 = '"&p_cate2&"' ORDER BY p_lev ASC "
							objView.open SQL, Dbcon, 1, 3
							If Not objView.eof Then arrRS = objView.getrows()
							objView.close
							Set objView = Nothing

							If isset(arrRS) <> "Null" Then
						%>
						<li class="detailPath">
							<button><span><%=p_name%></span></button>
							<ul>
							<%
								For i = LBound(arrRS, 2) To UBound(arrRS, 2)
									p_idx		= arrRS(0,i)
									p_cate	= arrRS(1,i)
									p_name	= arrRS(2,i)
									p_memo	= arrRS(3,i)
									p_image	= arrRS(4,i)
							%>
								<li><% If Left(p_cate,2) = "13" Then %><a href="/kr/sub/products/vacuum_detail.asp?p_idx=<%=p_idx%>"><% Else %><a href="/kr/sub/products/detail.asp?p_idx=<%=p_idx%>"><% End If %><%=p_name%></a></li>
							<%
								Next
								Erase arrRS
							%>
							</ul>
						</li>
						<%
							End If
						%>
						<% End If %>
					</ul>
				</div>
			</div>
		</section>
		<section id="subContents" class="clearfix">
		
<% End If %>