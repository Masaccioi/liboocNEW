
	var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
 document.write(unescape("%3Cspan id='cnzz_stat_icon_1255256463'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1255256463%26online%3D1%26show%3Dline' type='text/javascript'%3E%3C/script%3E"));
 var cnzzSpan = $("#cnzz_stat_icon_1255256463");
 // $("#cnzz_stat_icon_1255256463").hide();
$(".ipstatic").prepend(cnzzSpan);

 cnzzSpan.css('marginTop','1.8em');
  cnzzSpan.css('marginLeft','2em');
   cnzzSpan.css('fontFamily','Lato');
   cnzzSpan.css("display","inline-block");
   // var cnzzA =cnzzSpan.childNodes;
   // for (var i = 0; i < cnzzA.length; i++) {
   // 		cnzzA.css("color","#333");
   // }
var spanA=$("#cnzz_stat_icon_1255256463 a");
console.log(spanA);
for (var i = 0; i < spanA.length; i++) {
	console.log(spanA[i]);
}

