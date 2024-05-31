function cart_add(pval1) {
	var k = 0;
	var num	= cartreg.opt_cnt.value;
	for (i=1; i<=num; i++) {
		pval = eval("cartreg.opt"+i+".value");
		if (pval != "") {
			k++;
		}
	}
	if (k < num) { alert("Description 빠짐 없이 선택 해주세요."); return false; }
	if (cartreg.opt_num.value=="") { alert("수량을 입력해주세요."); return false; cartreg.opt_num.focus(); }
	if (pval1=="cart") {
		var queryString = $("form[name=cartreg]").serialize() ;

		$.ajax({
			type : 'post',
			url : '/kr/ajax/cart_proc.asp',
			data : queryString,
			dataType: 'json',
				async: false,
				success: function(json) {
					if (json.result == 'success') {
						alert(json.MSG);
					} else if (json.result == 'fail') {
						alert("오류가 발생 했습니다.");
					}
				},
				error: function(request,status,error) {
					//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					alert("오류발생");
				}
		});
	} else {
		cartreg.submit();
	}
}

function cart_del(pval1, pval2) {
	if (confirm("정말 삭제 하시겠습니까?")) {
		location.href="/kr/sub/products/cart_proc.asp?mode=cart_del&cartrid="+pval1+"&o_code="+pval2;
	}
}

function cart_add_en(pval1) {
	var k = 0;
	var num	= cartreg.opt_cnt.value;
	for (i=1; i<=num; i++) {
		pval = eval("cartreg.opt"+i+".value");
		if (pval != "") {
			k++;
		}
	}
	if (k < num) { alert("Description Please choose one."); return false; }
	if (cartreg.opt_num.value=="") { alert("Please enter the quantity."); return false; cartreg.opt_num.focus(); }
	if (pval1=="cart") {
		var queryString = $("form[name=cartreg]").serialize() ;

		$.ajax({
			type : 'post',
			url : '/en/ajax/cart_proc.asp',
			data : queryString,
			dataType: 'json',
				async: false,
				success: function(json) {
					if (json.result == 'success') {
						alert(json.MSG);
					} else if (json.result == 'fail') {
						alert("An error has occurred.");
					}
				},
				error: function(request,status,error) {
					//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					alert("An error has occurred.");
				}
		});
	} else {
		cartreg.submit();
	}
}

function cart_del_en(pval1, pval2) {
	if (confirm("Are you sure you want to delete it?")) {
		location.href="/en/sub/products/cart_proc.asp?mode=cart_del&cartrid="+pval1+"&o_code="+pval2;
	}
}