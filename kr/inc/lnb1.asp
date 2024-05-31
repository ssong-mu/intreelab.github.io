<li <%If urlPath="/sub/about/greeting.asp" Then Response.Write "class='on'"%>><a href="/sub/about/greeting.asp">인사말</a></li>
여러개일경우
<%If urlPath="/sub/about/fundInfo.asp" Or urlPath="/sub/about/fundNews.asp" Then Response.Write "class='on'"%>

<!-- 변수안에 문자열 검사-특정문자 있는지 확인-->
<% 
	Dim lnb1 , lnb2
	lnb1 = "/sub/company/"
	lnb2 = "/sub/product/"
%>
<% IF instr(lnb1,"/sub/company/") Then %><a href="/sub/company/greeting.asp">회사소개</a>
<% ElseIf  instr(lnb2,"/sub/promotion/") Then %><a href="/sub/company/greeting.asp">회사소개</a>
<% End If %>


 <%If instr(urlPath,"/sub/company/") Then Response.Write "class='on'"%>

<% IF instr(urlPath,"/sub/company/") Then %><a href="/sub/company/greeting.asp">회사소개</a>
<% ElseIf  instr(urlPath,"/sub/promotion/") Then %><a href="/sub/company/greeting.asp">회사소개</a>
<% End If %>

