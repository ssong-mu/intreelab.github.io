<%@Language="VBScript" CODEPAGE="65001" %>
<%
	Response.CharSet="utf-8"
	Session.codepage="65001"
	Response.codepage="65001"
	Response.ContentType="text/html;charset=utf-8"
%>
<!-- #include virtual="/site/common/dbconn.asp" -->
<!-- #include virtual="/site/common/function.asp" -->
<%
	If Request.Cookies("o_code") = "" Then
		Response.Cookies("o_code") = StrRand(12)
	End If
	o_code = Request.Cookies("o_code")

	mode			= Request("mode")
	idx				= Request("idx")
	p_idx			= Request("p_idx")
	p_name		= Request("p_name")
	opt_num	= Request("opt_num")
	opt_cnt		= Request("opt_cnt")

	'장바구니 추가
	If mode = "cart_reg" Then

		year2	=	Year(NOW)
		month2	=	Month(NOW)

		If Len(month2) < 2 Then month2="0"&month2
		date2	=	year2&month2

		Set RsO = Server.Createobject("ADODB.Recordset")
		SQL = " SELECT * FROM tbl_orderid WHERE orderid1 IN ('"&date2&"') "
		RsO.open SQL, Dbcon, 1, 3
		tqs = ""
		If RsO.EOF Then
			RsO.addnew
			RsO.fields("orderid1")	=	Trim(date2)
			RsO.fields("orderid2")	=	1
			RsO.update
			SQL = 1
		Else
			tqs = RsO.fields("orderid2") + 1
			RsO.fields("orderid2")	=	tqs
			RsO.update
		End If
		RsO.Close

		tstr = ""
		If Len(tqs) <> 6 Then
			For c = 1 To (6-Len(tqs))
				tstr = tstr&"0"
			Next
		End If
		orderid = Right(date2,4) & tstr & tqs
		Set RsO = Nothing
		
		For o = 1 To opt_cnt
			If Request("opt"&o) <> "" Then
				o_idx	= Split(Request("opt"&o),"||")
				SQL = "INSERT INTO tbl_mall_cart("
				SQL = SQL & "m_id, "
				SQL = SQL & "session_id, "
				SQL = SQL & "o_code, "
				SQL = SQL & "cartrid, "
				SQL = SQL & "o_idx, "
				SQL = SQL & "p_idx, "
				SQL = SQL & "p_name, "
				SQL = SQL & "p_option, "
				SQL = SQL & "p_qty) VALUES("
				SQL = SQL & "N'" & W_ID & "', "
				SQL = SQL & "N'" & W_SID & "', "
				SQL = SQL & "N'" & o_code & "', "
				SQL = SQL & "N'" & orderid & "', "
				SQL = SQL & "N'" & o_idx(0) & "', "
				SQL = SQL & "N'" & p_idx & "', "
				SQL = SQL & "N'" & p_name & "', "
				SQL = SQL & "N'" & Request("opt"&o) & "', "
				SQL = SQL & "N'" & opt_num & "')"
				Dbcon.Execute SQL
			End If
		Next

		MSG = "장바구니에 추가 되었습니다."
		json = "{""result"" : ""success"", ""MSG"" : """& MSG &"""}"
		Response.Write json
		Response.End

	End If
%>