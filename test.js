var language_en = {
		add_category : 'Add a new Category',
		edit_category : 'Edit Category',
		error_add_category : 'Error : add a new category',
		add_sub_category : 'Add a Sub-Category',
		edit_sub_category :'Edit Sub-Category',
		error_add_sub_category : 'Error : add a new sub-category',
		error_Category : 'Error : change category status',
		error_Subcategory : 'Error : change sub-category status',
		disable_Category  : 'Are you sure, you want to disable Category ?',
		enable_Category  : 'Are you sure, you want to enable Category ?',
		disable_Subcategory  : 'Are you sure, you want to disable Sub-category ?',
		enable_Subcategory  : 'Are you sure, you want to disable Sub-category ?'
}

var language_nl = {
		add_category: 'Voeg een nieuwe categorie',
		edit_category: 'Edit categorie',
		error_add_category: 'Fout: voeg een nieuwe categorie',
		add_sub_category: 'Voeg een Sub-categorie',
		edit_sub_category: 'Edit Sub-categorie',
		error_add_sub_category: 'Fout: voeg een nieuwe sub-categorie',
		error_Category: 'Fout: verandering categorie status',
		error_Subcategory: 'Fout: verandering subcategorie status',
		disable_Category: 'Weet u zeker dat u wilt uitschakelen categorie?',
		enable_Category: 'Weet u zeker dat u wilt Categorie inschakelen? ',
		disable_Subcategory: 'Weet u zeker dat u wilt uitschakelen Sub-categorie?',
		enable_Subcategory: 'Weet u zeker dat u wilt uitschakelen Sub-categorie?'
}

var language_be = {
		add_category: 'Voeg een nieuwe categorie',
		edit_category: 'Edit categorie',
		error_add_category: 'Fout: voeg een nieuwe categorie',
		add_sub_category: 'Voeg een Sub-categorie',
		edit_sub_category: 'Edit Sub-categorie',
		error_add_sub_category: 'Fout: voeg een nieuwe sub-categorie',
		error_Category: 'Fout: verandering categorie status',
		error_Subcategory: 'Fout: verandering subcategorie status',
		disable_Category: 'Weet u zeker dat u wilt uitschakelen categorie?',
		enable_Category: 'Weet u zeker dat u wilt Categorie inschakelen? ',
		disable_Subcategory: 'Weet u zeker dat u wilt uitschakelen Sub-categorie?',
		enable_Subcategory: 'Weet u zeker dat u wilt uitschakelen Sub-categorie?'
}

var curLanguage = eval('language_'+cLang+'');


$(function() {
 	$("#category").validate({
		submitHandler: function(form){	
			return saveCategory(cLang);
		},
		errorElement: "div"
	});

 	$("#subcategory").validate({
		submitHandler: function(form){	
			return saveSubCategory(cLang);
		},
		errorElement: "div"
	});
	
	$("#dialogSub").dialog({
		bgiframe: true,
		autoOpen: false,
		resizable : false,
		draggable : false,
		width:750,
		modal: true,
		position: 'center'
	});

	
	$(window).scroll(function () {
		$("#dialogSub").dialog("option","position","center");
  });

});

function getContent(page)
{
	$(".content-box-blue").load("/admin/paging/Bannedword/"+page+"/fetechAllpages");
}

function addCategory()
{
	$('#formTitle').html(curLanguage.add_category);
	$("#post_error").empty();
	$('#addeditCategory').toggle();
	$('#id').val('');
	$('#mode').val('new');
	$('#Name').val('');
	$('#Category').val('');
	$('#Category_nl').val('');
	$('#category ol div').hide();
	if ($('#addeditCategory').is(':visible')) {
	    $('#spanBut').attr('class','minus-admin-icon ui-corner-all');
	} else {
	    $('#spanBut').attr('class','plus-admin-icon ui-corner-all');
	}
}

	
function saveCategory(clang){
	var formvar = {
			id			: $('#id').val(),
			mode		: $('#mode').val(),
			Name		: $('#Name').val(),
			Category	: $('#Category').val()
		};
	for(i=0;i<globalLang.length;i++){
		fldName = 'Category_'+globalLang[i];
		if(globalLang[i] != 'en')
			formvar[fldName] = $('#Category_'+globalLang[i]+'').val();
	}
	if(clang == 'en')
		var dispCat =  $('#Category').val();
	else
		var dispCat =  $('#Category_'+clang+'').val();
	var catPass = '';
	for(i=0;i<globalLang.length;i++){
		comaVal = (i > 0 )?",":"";
		if(globalLang[i] == 'en')
			 catPass += comaVal+$('#Category').val()+"^"+globalLang[i];
		else
			 catPass += comaVal+$('#Category_'+globalLang[i]+'').val()+"^"+globalLang[i];
	}
	//var catPass = $('#Category').val()+"^"+'en,'+$('#Category_nl').val()+"^"+'nl,'+$('#Category_be').val()+"^"+'be';
	$.ajax({
	  type: "POST",
	  url: "/admin/ajax/addcategory",
      data: formvar,
	  dataType:"jsondata",
	  success:function(response){
	  	var myjson ='';
		eval ( 'myjson =' + response +';'); 
		if (myjson.Status == 'Success'){
			$("#post_error").empty();
			if($('#mode').val() == 'new'){
				catId = myjson.catId;
				var jsonary = "{\\'id\\\' : \\\'"+catId+"\\\',\\\'Name\\\':\\\'"+ $('#Name').val()+"\\\',\\\'Category\\\': \\\'"+ catPass+"\\\'}";
				$('#tbCategory').append('<tr id="crow_'+catId+'"><td>' + $('#Name').val()+'</td><td id="catData_'+catId+'">'+dispCat+'</td>'
				+'<td><a class="action-item edit-admin-icon" href="#" onclick="getCategory(\''+jsonary+'\');return false;"><span>Edit</span></a>' 
				//+'<a title="Change Status" onclick="changeStatus(\'Category\',\''+catId+'\');return false;" href="#" class="action-item status-enable-admin-icon" id="catLink_'+catId+'"><span>Edit</span></a>'
				+'<a title="Add Sub-Category" onclick="addSubCategory(\''+catId+'\');return false;" class="action-item add-sub-edit-admin-icon" href="#"><span>Add Sub-Category</span></a>'
				+'<a id="subLink_'+catId+'" title="Expand Sub-Category" onclick="toggleSubCategory(\''+catId+'\');return false;" class="action-item sub-close-admin-icon" href="#"><span>Sub-Category</span></a>'
				+'</td></tr><tr style="display: none;" id="subCatRow_'+catId+'"><td style="padding: 0pt;" colspan="3">'
				+'<table align="right" width="90%" style="background-color:#FFFFFF" id="tbSubCategory_'+catId+'" ><tbody>'
				+'</tbody></table></td></tr>'); 
			}else {
				var jsonary = "{\\'id\\\' : \\\'"+$('#id').val()+"\\\',\\\'Name\\\':\\\'"+ $('#Name').val()+"\\\',\\\'Category\\\': \\\'"+ catPass+"\\\'}";
				$('#crow_'+$('#id').val()+'').html('<td>' + $('#Name').val()+'</td><td id="catData_'+$('#id').val()+'">'+dispCat+'</td>'
				+'<td><a class="action-item edit-admin-icon" href="#" onclick="getCategory(\''+jsonary+'\');return false;"><span>Edit</span></a>'
				//+'<a title="Change Status" onclick="changeStatus(\'Category\',\''+$('#id').val()+'\');return false;" href="#" class="action-item status-enable-admin-icon" id="catLink_'+$('#id').val()+'"><span>Edit</span></a>'
				+'<a title="Add Sub-Category" onclick="addSubCategory(\''+$('#id').val()+'\');return false;" class="action-item add-sub-edit-admin-icon" href="#"><span>Add Sub-Category</span></a>'
				+'<a id="subLink_'+$('#id').val()+'" title="Expand Sub-Category" onclick="toggleSubCategory(\''+$('#id').val()+'\');return false;" class="action-item sub-close-admin-icon" href="#"><span>Sub-Category</span></a>'
				+'</td>');
			}
			addCategory();
			$("#post_error").html(myjson.Message+"<BR>");
		} else {
			$("#post_error").html(myjson.Message+"<BR>");
		}
	  },
	  Error: function(){
	  	$("#post_error").html(curLanguage.error_add_category);
		return false;
	  }
	});
	return false;
}


function getCategory(data){
	
	eval ( 'data =' + data +';'); 
	str = data.Category.split(',');
	
	for(i=0;i<str.length;i++){
		valStr = str[i].split('^');
		if(globalLang.join().indexOf(valStr[1]) >= 0 ){
			if(valStr[1] == 'en')
				$('#Category').val(valStr[0]);
			else
				$('#Category_'+valStr[1]+'').val(valStr[0]);
		}
	}
	
	$('#id').val(data.id);
	$('#mode').val('edit');
	$('#Name').val(data.Name);
	
	$('#addeditCategory').show();
    $('#spanBut').attr('class','minus-admin-icon ui-corner-all');
	$('#formTitle').html(curLanguage.edit_category);
}


// Sub category 
//action-item sub-close-admin-icon
function toggleSubCategory(catId){
	
	dispObk = $('#subCatRow_'+catId+'');
	dispObk.toggle();
	sLink = "subLink_"+catId;
	if (dispObk.is(':visible')) {
	    $('#'+sLink+'').attr('class','action-item sub-open-admin-icon');
	} else {
	    $('#'+sLink+'').attr('class','action-item sub-close-admin-icon');
	}

}

function addSubCategory(catId)
{
	$('#dialogSub').dialog('option', 'title', curLanguage.add_sub_category);
	$("#post_error").empty();
	$('#submode').val('new');
	$('#Sub_category_id').val('');
	$('#Sub_Name').val('');
	$('#Sub_category').val('');
	$('#Sub_category_nl').val('');
	$('#subcategory ol div').hide();
	if(parseInt(catId) > 0 ) {
		var catName = $('#catData_'+catId+'').html();
		$('#Category_id').val(catId);
		$('#dialogSub').dialog('open');
	} else {
		var catName = '';
		$('#Category_id').val('0');
		$('#dialogSub').dialog('close');
	}
	$('#test1').html(catName);		
}


function getSubCategory(data){
	
	eval ( 'data =' + data +';'); 
	str = data.Sub_category.split(',');
	$('#dialogSub').dialog('option', 'title', curLanguage.edit_sub_category);
	
	for(i=0;i<str.length;i++){
		valStr = str[i].split('^');
		if(globalLang.join().indexOf(valStr[1]) >= 0 ){
			if(valStr[1] == 'en')
				$('#Sub_category').val(valStr[0]);
			else
				$('#Sub_category_'+valStr[1]+'').val(valStr[0]);
		}
	}
	
	var catName = $('#catData_'+data.Category_id+'').html();
	$('#test1').html(catName);	
	$('#Sub_category_id').val(data.Sub_category_id);
	$('#Category_id').val(data.Category_id);
	$('#submode').val('edit');
	$('#Sub_Name').val(data.Sub_Name);
	
	$('#dialogSub').dialog('open');
}

function saveSubCategory(cLang){
	var formvar = {
			id				: $('#Sub_category_id').val(),
			Category_id		: $('#Category_id').val(),
			mode			: $('#submode').val(),
			Sub_Name		: $('#Sub_Name').val(),
			Sub_category	: $('#Sub_category').val()
		};
	for(i=0;i<globalLang.length;i++){
		fldName = 'Sub_category_'+globalLang[i];
		if(globalLang[i] != 'en')
			formvar[fldName] = $('#Sub_category_'+globalLang[i]+'').val();
	}
	var cId = $('#Category_id').val();
	if(cLang == 'en')
		var dispCat =  $('#Sub_category').val();
	else
		var dispCat =  $('#Sub_category_'+cLang+'').val();
	subCatid = $('#Sub_category_id').val();
	//var catPass = $('#Sub_category').val()+"^"+'en,'+$('#Sub_category_nl').val()+"^"+'nl,'+$('#Sub_category_be').val()+"^"+'be';
	var catPass = '';
	for(i=0;i<globalLang.length;i++){
		comaVal = (i > 0 )?",":"";
		if(globalLang[i] == 'en')
			 catPass += comaVal+$('#Sub_category').val()+"^"+globalLang[i];
		else
			 catPass += comaVal+$('#Sub_category_'+globalLang[i]+'').val()+"^"+globalLang[i];
	}
	$.ajax({
	  type: "POST",
	  url: "/admin/ajax/addsubcategory",
      data: formvar,
	  dataType:"jsondata",
	  success:function(response){
	  	var myjson ='';
		eval ( 'myjson =' + response +';'); 
		if (myjson.Status == 'Success'){
			$("#post_error").empty();
			if($('#submode').val() == 'new'){
				subCatid = myjson.subCatId
				var jsonary = "{\\\'Category_id\\\':\\\'"+ cId+"\\\',\\\'Sub_category_id\\\':\\\'"+ subCatid+"\\\',\\\'Sub_Name\\\':\\\'"+ $('#Sub_Name').val()+"\\\',\\\'Sub_category\\\': \\\'"+ catPass+"\\\'}";
				$('#tbSubCategory_'+cId+'').append('<tr height="18px" style="background-color:#F9EFFF" id="subcrow_'+subCatid+'">'
				+'<td><img src="/public/images/icons/admin-icons/right_arrow_sub.png" height="12" alt="category"></td>'			
				+'<td>' + $('#Sub_Name').val()+'</td><td>'+dispCat+'</td>'
				+'<td><a class="action-item sub-edit-admin-icon" href="#" onclick="getSubCategory(\''+jsonary+'\');return false;"><span>Edit Sub-Category</span></a>'
				+'<a title="Change Status" onclick="changeStatus(\'Subcategory\',\''+subCatid+'\');return false;" href="#" class="action-item status-sub-enable-admin-icon" id="subcatLink_'+subCatid+'"><span>Edit</span></a>'
				+'</td></tr>'); 
			}else {
				var jsonary = "{\\\'Category_id\\\':\\\'"+ cId+"\\\',\\\'Sub_category_id\\\':\\\'"+ subCatid+"\\\',\\\'Sub_Name\\\':\\\'"+ $('#Sub_Name').val()+"\\\',\\\'Sub_category\\\': \\\'"+ catPass+"\\\'}";
				$('#subcrow_'+subCatid+'').html('<td><img src="/public/images/icons/admin-icons/right_arrow_sub.png" height="12" alt="category"></td>'
				+'<td>' + $('#Sub_Name').val()+'</td><td>'+dispCat+'</td>'
				+'<td><a class="action-item sub-edit-admin-icon" href="#" onclick="getSubCategory(\''+jsonary+'\');return false;"><span>Edit Sub-Category</span></a>'
				+'<a title="Change Status" onclick="changeStatus(\'Subcategory\',\''+subCatid+'\');return false;" href="#" class="action-item status-sub-enable-admin-icon" id="subcatLink_'+subCatid+'"><span>Edit</span></a>'
				+'</td>');
			}
			//
			if(typeof $('#noRow_'+cId+'') != "undefined") {
				$('#noRow_'+cId+'').remove();
			}
			addSubCategory();
			$('#dialogSub').dialog('close');
			$("#post_error").html(myjson.Message+"<BR>");
		} else {
			$("#post_error").html(myjson.Message+"<BR>");
		}
	  },
	  Error: function(){
	  	$("#post_error").html(curLanguage.error_add_sub_category);
		return false;
	  }
	});
	return false;
}

// Change status of category/sub-category

function changeStatus(model,id){
	$("#post_error").empty();
	if(model=='Category')
		var classStr = $('#catLink_'+id+'').attr('class');
	else
		var classStr = $('#subcatLink_'+id+'').attr('class');
		
	if(classStr.indexOf('enable') != -1){
		var stat = 'enable';
		var newClassStr = classStr.replace('enable','disable');
		var msg = eval('curLanguage.disable_'+model);
	} else {
		var stat = 'disable';
		var newClassStr = classStr.replace('disable','enable');
		var msg = eval('curLanguage.enable_'+model);
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
					if(model=='Category')
						$('#catLink_'+id+'').attr('class',newClassStr);
					else
						$('#subcatLink_'+id+'').attr('class',newClassStr);
				}	
				$("#post_error").html(myjson.Message+"<BR>");
				return false;
			  },
			  error:function(){
				  $("#post_error").html(eval('curLanguage.error_'+model));
					return false;
			  }
		});
	}		
}
