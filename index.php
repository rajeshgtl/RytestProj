<script>
var language_en = {
		error_page : 'Error : change page status',
		disable_page  : 'Are you sure, you want to disable custom page ?',
		enable_page  : 'Are you sure, you want to enable custom page ?',
		delete_page : 'Are you sure you want to delete it?'
}

var language_nl = {
		error_page: 'Fout: verandering Page status',
		disable_page: 'Weet u zeker dat u wilt uitschakelen custom page?',
		enable_page: 'Weet u zeker dat u wilt custom page inschakelen? ',
		delete_page : 'Weet je zeker dat je wilt verwijderen?'
		
}

var language_be = {
		error_page: 'Fout: verandering Page status',
		disable_page: 'Weet u zeker dat u wilt uitschakelen custom page?',
		enable_page: 'Weet u zeker dat u wilt custom page inschakelen? ',
		delete_page : 'Weet je zeker dat je wilt verwijderen?'
		
}

var curLanguage = eval('language_'+cLang+'');
// get listing for page number 
function getContent(page)
{
	$(".content-box-blue").load("/admin/paging/Custompage/"+page+"/fetechAllpages");
}

//Change Page status 
//Change status of category/sub-category

function changePageStatus(model,id){
	$("#post_error").empty();
	var classStr = $('#pageLink_'+id+'').attr('class');
		
	if(classStr.indexOf('enable') != -1){
		var stat = 'enable';
		var newClassStr = classStr.replace('enable','disable');
		var msg = curLanguage.disable_page;
	} else {
		var stat = 'disable';
		var newClassStr = classStr.replace('disable','enable');
		var msg = curLanguage.enable_page;
	}
	if(confirm(msg)){
		var formvar = {id : id,model: model,status : stat};
		$.ajax({
			  type: "POST",
			  url: "/admin/ajax/changestatus",
		      data: formvar,
			  dataType:"jsondata",
			  success:function(response){
				eval ( 'myjson =' + response +';'); 
				if (myjson.stat == 'Success'){
					$("#post_error").empty();
					$('#pageLink_'+id+'').attr('class',newClassStr);
				}	
				$("#post_error").html(myjson.Message+"<BR>");
				return false;
			  },
			  error:function(){
				  $("#post_error").html(curLanguage.error_page);
					return false;
			  }
		});
	}		
}

//delete page 

function deletePage(id){
	$("#post_error").empty();
	var msg = curLanguage.delete_page;
	if(confirm(msg)){
		var formvar = {id : id,model: 'Custompage'};
		$.ajax({
			  type: "POST",
			  url: "/admin/ajax/delete",
		      data: formvar,
			  dataType:"jsondata",
			  success:function(response){
				eval ( 'myjson =' + response +';'); 
				if (myjson.stat == 'Success'){
					$('#Row_'+id+'').remove();
				}	
				$("#post_error").html(myjson.Message+"<BR>");
				return false;
			  },
			  error:function(){
				  $("#post_error").html(curLanguage.error_page);
					return false;
			  }
		});
	}		
}




</script>

<?php echo phoinfo()?>