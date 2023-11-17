// JavaScript Document
var spinner = '<div class="spinner-border text-warning spinner-border-sm me-4" role="status"><span class="visually-hidden">Loading...</span></div>';
function Login(x){
    if($("#Uemail").val().length == 0){
        $("#Uemail").focus();
        // Msg("<i class='fa fa-warning'></i>&nbsp; Required Field(s) Empty!!!.","alert-danger",0,"#msg",12000);
    }else if($("#password").val().length == 0){
        $("#password").focus();
    }else{
        var data = $("#loginform").serialize();
        var btn_content = $("#btn-login").html();
        $("#btn-login").prop('disabled',true);
        $.ajax({
            type:'POST',
            url: x+'login/index.php?login',
            data:data,
            beforeSend: function(){	
                $("#btn-login").html(spinner);        
            },
            success: function(data){
                if(data == 1){
                    Msg("Redirecting...","alert-success",0,"#msg",6000);
                    setTimeout(function(){
                        window.location = x+"dashboard";
                    },1500);
                }else if(data == 11){
                    window.location = x+"login/?xy="+Math.floor(Math.random()*982773773687766)+Math.floor(Math.random()*982773773687766)+"&security-clearance="+$("#Uemail").val()+"#login_section";
                } else if(data == 2){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Invalid credentials...","alert-danger",0,"#msg",12000);
                } else if(data == 3){
                    var email = $("#Uemail").val();
                    $(".cover_email").html(email);
                    $("#email_verify").val(email);
                    $("#loginCon").addClass('d-none');
                    $("#verifyCon").removeClass('d-none');
                    setTimeout(function() {
                        $("#one").focus();
                    },1000);
                    Msg("<i class='fa fa-globe fa fa-spin'></i>&nbsp; Please check your email for instructions to activate your account. If there is no mail in the \"Inbox\", please check your \"Spam\" folder.","alert-success",0,"#msg",10000);
                } else if(data == 4){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Account Suspended, Contact Adminstrator!!!","alert-danger",0,"#msg",12000);
                } else if(data == 0){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Required Field(s)","alert-danger",0,"#msg",12000);
                }else if(data == 10){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Captcha is required","alert-danger",0,"#msg",12000);
                } else if(data == 12){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Captcha verification failed","alert-danger",0,"#msg",12000);
                }else{
                    Msg("<i class='fa fa-warning'></i>&nbsp;"+data,"alert-danger",0,"#msg",12000);
                }
                if(data != 1 && data != 11){
                    $("#btn-login").prop('disabled',false);
                    $("#btn-login").html(btn_content);
                    grecaptcha.reset();
                }
                
            }            
    })}
}
$("#btn-login").click(function(e) {
    Login('../');
    e.preventDefault();
});
function Login2(){
    if($("#username_email").val().length == 0 || $("#code").val().length == 0){
        Msg("<i class='fa fa-warning'></i>&nbsp; Required Field(s) Empty!!!.","alert-danger",0,"#msg",12000);
    } else{
        var data = $("#loginform").serialize();
        $("#btn-login2").prop('disabled',true);
        $.ajax({
            type:'POST',
            url:'../login/index.php?login_pin',
            data:data,
            beforeSend: function(){	
                $("#btn-login2").html(spinner);
            },
            success: function(data){
                if(data == 1){
                    setTimeout(function(){
                        Msg("<i class='fa fa-globe fa fa-spin'></i>&nbsp; Login Successful. Redirecting...","alert-success",0,"#msg",6000);
                        window.location = "../dashboard";
                    },1500);
                } else if(data == 2){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Invalid code!!!","alert-danger",0,"#msg",12000);
                } else if(data == 0){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Required Field(s)","alert-danger",0,"#msg",12000);
                }
                if(data != 1){
                    $("#btn-login2").prop('disabled',false);
                    $("#btn-login2").html('Confirm Login');
                }
                
            }            
    })}
}
//$(document).ready(function(){
//    $("#btn-login2").click(function(e) {
//        Login2();
//        e.preventDefault();
//    });
//});
///////////////// for google 2fa
function Login3(){
    if($("#username_email").val().length == 0 ){
        Msg("<i class='fa fa-warning'></i>&nbsp; Reload page and try again...","alert-danger",0,"#msg",12000);
    } else if($("#code").val().length == 0){
        $("#code").focus();
    }else {
        $("#btn-login3").prop('disabled', true);
        var btn_content = $("#btn-login3").html();
        var data = $("#loginform").serialize();
        $.ajax({
            type:'POST',
            url:'../login/index.php?login_2fa',
            data:data,
            beforeSend: function(){	
                $("#btn-login3").html(spinner);
            },
            success: function(data){
                if(data == 1){
                    Msg("&nbsp; Redirecting...","alert-success",0,"#msg",6000);
                    setTimeout(function(){     
                        window.location = "../dashboard";
                    },1500);
                    
                }else if(data == 2){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Required Field(s)","alert-danger",0,"#msg",12000);
                }else if(data == 3){
                    Msg("<i class='fa fa-warning'></i>&nbsp; User account not found..","alert-danger",0,"#msg",12000);
                }else if(data == 4){
                    Msg("<i class='fa fa-warning'></i>&nbsp; Invalid code","alert-danger",0,"#msg",12000);
                } 
                if( data != 1){
                    $("#btn-login3").prop('disabled', false);
                    $("#btn-login3").html(btn_content);
                }
            }
        });
    }
}
$("#btn-login3").click(function(e) {
    Login3();
    e.preventDefault();
});
//////////////////// registration script validation on the registration page
function verify_email(done){  
    if($("#one").val().length == 0){
        $("#one").focus();
        // Msg("<i class='fa fa-warning'></i>&nbsp; fill all fields!!!","alert-danger",0,"#msg",10000);
    }else if($("#two").val().length == 0){
        $("#two").focus();
    }else if($("#three").val().length == 0){
        $("#three").focus();
    }else if($("#four").val().length == 0){
        $("#four").focus();
    }else if(done == 0){
        var pin = $("#one").val()+$("#two").val()+$("#three").val()+$("#four").val();
        $('#code_verify').val(pin);
        var data = $("#verify-form").serialize();
        var btn_content = $("#btn-verify").html();
        $("#btn-verify").prop('disabled',true);
        $.ajax({
            type:'POST',
            url:'../register/index.php?code_verify=&e=',
            data:data,
            beforeSend: function(){	
                $("#btn-verify").html(spinner);
            },
            success: function(data){
                    if(data == 1){
                            Msg(" Email successfully verified..","alert-success",0,"#msg",60000);
                            setTimeout(function() {
                                $("#verify-form").trigger('reset');
                                window.location = "../dashboard";
                            },2000);
                    } else if(data == 2){
                            Msg("<i class='ri-error-warning-line'></i> fill all fields.","alert-danger",0,"#msg",10000);
                            
                    }else if(data == 3){
                            Msg("<i class='ri-error-warning-line'></i> Enter a valid  email.","alert-danger",0,"#msg",10000);
                            
                    }else if(data == 4){
                            Msg("<i class='ri-error-warning-line'></i> invalid pin","alert-danger",0,"#msg",10000);
                            
                    }else if(data == 5){
                        Msg("<i class='ri-error-warning-line'></i> account already verified...","alert-danger",0,"#msg",10000);
                        window.location = "../login";
                            
                    }else{
                            Msg("<i class='ri-error-warning-line'></i> Action unsucessfull, "+data,"alert-danger",0,"#msg",10000);
                            
                    }
                    if(data != 1){
                        $("#btn-verify").prop('disabled',false);
                        $("#btn-verify").html(btn_content);
                    }             
            }
    })}
}
$("#btn-verify").click(function(e) {
    verify_email(0);
    e.preventDefault();
});