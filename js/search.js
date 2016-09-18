var input = $('input');
var title ='';
var url = 'http://www.libooc.com/libooc/search/default';
var pageID = 'templates/book.html?ebid=';

//文本框回车事件
document.onkeydown=keyDownSearch; 
function keyDownSearch(e) {  
        // 兼容FF和IE和Opera  
        var theEvent = e || window.event;  
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;  
        if (code == 13) {   
            search(1);//具体处理函数  
            return false;  
        }  
        return true;  
} 
$('.searchBtn').click(function () {
	search(1);
})

function search (p) {  
	title = input.val();
	$.ajax({  
		    url: url,  
		    type: 'GET',  
		    dataType: 'json', 
		    data:{
		        search:title,
		        "page":p,
		        pagesize:10
		    }, 
		             // timeout: 1000,  
		    cache: false,  
		    beforeSend: LoadFunction, //加载执行方法    
		    error: erryFunction,  //错误执行方法    
		    success: succFunction //成功执行方法    
	})  
}
 
//加载中
function LoadFunction() {  
	$("#list").html('Loading...');  
}  

//错误函数
function erryFunction (XMLHttpRequest,textStatus,errorThrown){
	if (XMLHttpRequest.status==200) {alert(XMLHttpRequest.status+":"+errorThrown+"<br>服务器请求超时，请重新输入");}
	else{	alert(XMLHttpRequest.status+":"+errorThrown+"\n"+"请重新输入");  }
}  

//成功调用的函数
function succFunction(result) { 
	$("#list").html('');
	if (result.errorcode=='未知异常') {alert("系统遇到巨大故障，我们的技术人员正在加紧抢修<br>"+
		"如果您需要什么书，请点击<a href='https://item.taobao.com/item.htm?id=537497008124'>淘宝链接</a>与客服联系");}
	else if(result.errorcode=='001'||result.errorcode=='002'){alert("errorcode:"+result.errorcode+"<br>该条数据缺失，请搜索其他内容");}
	else{

		    var json = eval(result.indexs); //数组  
		    var str=$("#list").html();
		    if (json.length==0) {
		        str='';
		        str=str+"<p class='help'>╭（╯_╰）╭<br>对不起，没有找到相关的结果<br>您可以尝试缩短搜索词，再次搜索</p>";
		        $("#list").html(str);
		        //搜索不到则隐藏分页div
		        $(".tcdPageCode").hide();
		    }
		    else{
		    	$(".tcdPageCode").show();
		        str='';
			    $.each(json, function (index, item) {  
				    str=str+"<a href='"+pageID+json[index].e_id+"'target='_blank'><li class='bookRow'><div class='row'><div class='col-md-12'>";
				    str=str+"<h1 class='bookTitle'>";
				    str=str+json[index].title+"</h1><p class='bookAuthor'>";
				    str=str+json[index].author+"</p><a href='templates/freelink.html'><p class='buyUrl'>Download</p></a></div></div></li></a>";
				    $("#list").html(str);
			     }); 
		    }  

			//调用分页

			if (result.maxIndexs) {
				pageFunction(result.maxIndexs);
			}
	}
}
	//调用分页插件
function pageFunction(max){
		$(".tcdPageCode").unbind();
		$(".tcdPageCode").createPage({ 
			pageCount:Math.ceil(max/10), 
			current:1, 
			backFn:function(p){ 
				$.ajax({  
					url: url,  
					type: 'GET',  
					dataType: 'json', 
					data:{
						search:title,
						page:p,
						pagesize:10
					}, 
					timeout: 1000,  
					cache: false,  
					beforeSend: LoadFunction, //加载执行方法    
					error: erryFunction,  //错误执行方法    
					success: Pagesucc //成功执行方法    
				}) 
			}	        
		})
}
//分页的ajax成功的调用方法
function Pagesucc(result) { 
	$("#list").html('');  
	if (result.errorcode=='未知异常') {alert("系统遇到巨大故障，我们的技术人员正在加紧抢修<br>"+
		"如果您需要什么书，请点击<a href='https://item.taobao.com/item.htm?id=537497008124'>淘宝链接</a>与客服联系");}
	else if(result.errorcode=='001'||result.errorcode=='002'){alert("errorcode:"+result.errorcode+"<br>该条数据缺失，请搜索其他内容");}
	else{
		var json = eval(result.indexs); //数组  
		var str=$("#list").html();
		if (json.length==0) {
			str='';
			str=str+"对不起，查不到该结果";
			$("#list").html(str);
		}
		else{
			str='';
			$.each(json, function (index, item) {  
				str=str+"<a href='"+pageID+json[index].e_id+"' target='_blank'><li class='bookRow'><div class='row'><div class='col-md-12'>";
				str=str+"<h1 class='bookTitle'>";
				str=str+json[index].title+"</h1><p class='bookAuthor'>";
				str=str+json[index].author+"</p><a href='https://item.taobao.com/item.htm?id=537497008124'><p class='buyUrl'>Get</a></p></a>";
				$("#list").html(str);
			}); 
		} 
	}
}
