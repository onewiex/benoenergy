jQuery(function($) {'use strict';
	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	
//	$('.navbar-collapse ul li a').on('click', function() {  
//		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
//		return false;
//	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
                    contentTop.push( $( $(this).attr('href') ).offset().top);
                    contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		});
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});
	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();
});
function set_btc_price(x){
    $.ajax({
        type:'POST',
        url:x+'controller/post.php?get_btc_value=yes',
        data:{'get_btc_value':'yes'},
        success: function(data){
            $("#btc_value").html(data);
        }
    });
}

/// ger server time
//function set_server_time(x){
//    $.ajax({
//        type:'POST',
//        url:x+'controller/post.php?get_server_time=yes',
//        data:{'get_server_time':'yes'},
//        success: function(data){
//            $("#server_time").html(data);
//        }
//    });
//}
function set_server_time(x,y){
    $.ajax({
        type:'POST',
        url:x+'controller/post.php?get_server_time=yes&place='+y,
        data:{'get_server_time':'yes'},
        success: function(data){
            $("#server_time").html(data);
        }
    });
}

//////////
//
function swap_modal(x,y){
    $(x).modal('hide');
    $(y).modal('show');
}
function moveToNext(e,t){0<e.value.length&&document.getElementById("digit"+t+"-input").focus();};
function toggle_password(x,y){
    if($(x)[0].type == 'password' ){
        $(x)[0].type = 'text';
        $('#'+y).html('<i class="fa fa-eye align-middle"></i>');
    }else{
        $(x)[0].type = 'password';
        $('#'+y).html('<i class="fa fa-eye-slash align-middle"></i>');
    }
}
function toggle_password2(x,y){
    if($(x).prop("type") == 'password' ){
        $(x).prop("type",'text')
        $('#'+y).html('<i class="fa fa-eye align-middle"></i>');
    }else{
        $(x).prop("type",'password')
        $('#'+y).html('<i class="fa fa-eye-slash align-middle"></i>');
    }
}
////////////////////// Logout script ///////////////
function logout(done){
    if(done == 0) {
        $('#loader').css({'display':'block','opacity':'1'});
	var data = {'logout':'yes'};
	$.ajax({
            type:'POST',
            url:'../controller/post.php?logout',
            data:data,
            beforeSend: function(){	
                $(".logout").html('<i class="fa fa-spinner fa-spin"></i>');
            },
            success: function(data){
                if(data == 1){
                    Msg("<strong><i class='fa fa-check-square'></i>&nbsp;</strong> Successfully logged out","alert-success",0,"#system_msg",10000);
                    setTimeout(function() {
			window.location = "../logout";
                    },3000);
                    
                } else if (data == 2){
                    Msg("<strong><em class='icon ni ni-cross-c'></em>&nbsp;</strong> System Error. Refresh page and try again!","alert-danger",0,"#system_msg",12000);
                    setTimeout(function() {
			window.location = "../logout";
                    },3000);
                }else{
                    Msg("<strong><em class='icon ni ni-cross-c'></em>&nbsp;</strong> Unknown error. please try again","alert-danger",0,"#system_msg",12000);
                    $('#loader').css({'display':'none','opacity':'0'});
                } 
                done = 1;
                $(".logout").html('<i class="fa fa-sign-out"></i> logout');
            }
	});
    }
}
////////////////////// contact us script for home page... ///////////////
function quick_contact(x){
        if($("#form_name1").val().length == 0 || $("#form_email1").val().length == 0 || $("#form_subject1").val().length == 0||$("#form_message1").val().length == 0 ){
		Msg("<i class='fa fa-warning'></i>&nbsp; fill all fields!!!","alert-danger",0,"#status",10000);
	} else {
	var data = $("#contact_form").serialize();
	$.ajax({
		type:'POST',
		url:x+'controller/post.php?contact-home',
		data:data,
		beforeSend: function(){	
			$("#contact_btn1").html('<i class="fa fa-spinner fa-spin"></i> ');
		},
		success: function(data){
			if(data == 1){
				$("#contact_btn1").html('<i class="fa" aria-hidden="true"></i>Send Message');
				Msg("<strong><i class='fa fa-check-square'></i>&nbsp;  Sent successfuly</strong>","alert-success",0,"#status",6000);
				setTimeout(function() {
					$("#contact_form").trigger('reset');
				},10000);
			} else if (data == 2){
				Msg("<strong><i class='fa fa-warning'></i>&nbsp; fill all fields!!!</strong>","alert-danger",0,"#status",10000);
				$("#contact_btn1").html('<i class="fa" aria-hidden="true"></i>Send Message');
			} else if(data == 3){
				Msg("<strong><i class='fa fa-warning'></i>&nbsp; account does not exist</strong>","alert-danger",0,"#status",10000);				
				$("#contact_btn1").html('<i class="fa" aria-hidden="true"></i>Send Message');
			}else{
				Msg("<strong><i class='fa fa-warning'></i>&nbsp; Unknown error. please try again"+data+"</strong>","alert-danger",0,"#status",10000);				
				$("#contact_btn1").html('<i class="fa" aria-hidden="true"></i>Send Message');
			} 
		}
	});
    }
}

jQuery(document).ready(function ($) {
    // Your code here
});
function send_contact(x){
	var btn = "#contact_btn";
	var status = "#contact_status";
	if($("#form_name").val().length == 0){
		$("#form_name").focus();
	} else if($("#form_email").val().length == 0){
		$("#form_email").focus();
	} else if($("#form_phone").val().length == 0){
		$("#form_phone").focus();
	}  else if($("#form_subject").val().length == 0){
		$("#form_subject").focus();
	}  else if( x==0 ){
        var data = $("#contact_page_form").serialize();
        var btn_content = $(btn).html();
        $(btn).prop('disabled',true);
        $.ajax({
			type:'POST',
			url:'index.php?contact_home',
			data:data,
			beforeSend: function(){	
					$(btn).html('<i class="fa fa-spinner fa-spin"></i>');
			},
			success: function(data){
				if(data == 1){
					Msg("<strong><i class='fa fa-check-square'></i>&nbsp;</strong>  Message received. We'll get back to you ASAP","alert-success",0,status,6000);
					setTimeout(function() {
						$("#contact_page_form").trigger('reset');
					},3000);
				} else if (data == 2){
					Msg("<strong><i class='fa fa-warning'></i>&nbsp;</strong> fill all fields !!!","alert-danger",0,status,10000);
				} else if(data == 3){
					Msg("<strong><i class='fa fa-warning'></i>&nbsp; account does not exist</strong>","alert-danger",0,status,10000);				
				}else{
					Msg("<strong><i class='fa fa-warning'></i>&nbsp; Unknown error. please try again"+data+"</strong>","alert-danger",0,status,10000);				
				} 
				$(btn).html(btn_content);
				$(btn).prop('disabled',false);
			}
        });
		x=1;
    }
}
$("#contact_btn").click(function(e) {
    send_contact(0);
    e.preventDefault();
});
function ClearMessage(x){
    var elem = _(x);
    x.innerHTML='';
}

function subscribe(){
        if($("#name").val().length == 0 ||  $("#email").val().length == 0 ){
		Msg("<i class='fa fa-warning'></i>&nbsp; fill all fields!!!","alert-danger",0,"#letterstatus",10000);
	} else {
	var data = $("#frmNewsletter1").serialize();
	$.ajax({
		type:'POST',
		url:'controller/post.php?subscribe',
		data:data,
		beforeSend: function(){	
			$("#sub_btn").html('<i class="fa fa-spinner fa-spin"></i> submitting...');
		},
		success: function(data){
			if(data == 1){
				$("#sub_btn").html("<i class='fa fa-newspaper-o'></i>&nbsp;Subscribe");
				Msg("<strong><i class='fa fa-check-square'></i>&nbsp;  Newsletter successfuly subscribed</strong>","alert-success",0,"#letterstatus",6000);
				setTimeout(function() {
					$("#frmNewsletter1").trigger('reset');
				},10000);
			} else if (data == 2){
				Msg("<strong><i class='fa fa-warning'></i>&nbsp; fill all fields!!!</strong>","alert-danger",0,"#letterstatus",10000);
				$("#sub_btn").html("<i class='fa fa-newspaper-o'></i>&nbsp;Subscribe");
			}else{
				Msg("<strong><i class='fa fa-warning'></i>&nbsp; Unknown error. please try again</strong>","alert-danger",0,"#letterstatus",10000);				
				$("#sub_btn").html("<i class='fa fa-newspaper-o'></i>&nbsp;Subscribe");
			} 
		}
	});
    }
}
$(function(){
	$.validator.setDefaults({
		errorClass: 'help-block',
		highlight: function(element){
			$(element)
			.closest('.form-group')
			.addClass('has-error');
		},
		unhighlight: function(element){
			$(element)
			.closest('.form-group')
			.removeClass('has-error');
		}
	});
	$("#frmNewsletter1").validate({
		rules:{
			name:{
				required:true,
			},
			email:{
				required:true,
                                email: true
			}			
		},
		messages:{
			name:{
				required:"First name cannot be blank",
			},
			email:{
				required:"Email cannot be blank",
			}
		},
		submitHandler: subscribe
	});
});
$(document).ready(function(){
    $(".page-loader").css('display','none')
});