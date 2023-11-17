

//////////////////// registration script validation on the registration page
var spinner = '<div class="spinner-border text-warning spinner-border-sm me-4" role="status"><span class="visually-hidden">Loading...</span></div>';
function register_member(done){  
    if($("#FullName").val().length == 0){
        $("#FullName").focus();
    }else if($("#InputEmail").val().length == 0 ){
        $("#InputEmail").focus();
    }else if($("#password").val().length == 0){
        $("#password").focus();
    }else if(done == 0){
        var data = $("#register-form").serialize();
        var btn_content = $("#btn-register").html();
        $("#btn-register").prop('disabled',true);
        $.ajax({
            type:'POST',
            url:'../register/index.php?register=&e=',
            data:data,
            beforeSend: function(){	
                $("#btn-register").html(spinner);
            },
            success: function(data){
                    if(data == 1){
                        Msg("Account successfully created. Redirecting to login...","alert-success",0,"#msg1",60000);
                        setTimeout(function() {
                            window.location = "../login";
                            $("#register-form").trigger('reset');
                            
                        },3000);
                        return;
                        var email = $("#InputEmail").val();
                        $(".cover_email").html(email);
                        $("#email_verify").val(email);
                        $("#loginCon").addClass('d-none');
                        $("#verifyCon").removeClass('d-none');
                        setTimeout(function() {
                            $("#one").focus();
                        },1000);
                        Msg("Please check your email for instructions to activate your account. If there is no mail in the \"Inbox\", please check your \"Spam\" folder.","alert-success",0,"#msg1",60000);
                        setTimeout(function() {
                            $("#register-form").trigger('reset');
//                                $("#btn-register").html('Sign up');
                            //window.location = "../account-verification";
                        },2000);
                    } else if(data == 2){
                            Msg("<i class='ri-error-warning-line'></i> fill all fields.","alert-danger",0,"#msg1",10000);
                            
                    }else if(data == 3){
                            Msg("<i class='ri-error-warning-line'></i> Enter a valid  email address","alert-danger",0,"#msg1",10000);
                            $("#InputEmail").focus();
                    }else if(data == 31){
                        Msg("<i class='ri-error-warning-line'></i> Enter full name","alert-danger",0,"#msg1",10000);
                        $("#FullName").focus();
                            
                    }else if(data == 4){
                            Msg("<i class='ri-error-warning-line'></i> password must be at least 8 characters","alert-danger",0,"#msg1",10000);
                            $("#password").focus();
                    }else if(data == 41){
                        Msg("<i class='ri-error-warning-line'></i> password must contain at least one uppercase letter","alert-danger",0,"#msg1",10000);
                        $("#password").focus();
                    }else if(data == 42){
                        Msg("<i class='ri-error-warning-line'></i> password must contain at least one lowercase letter","alert-danger",0,"#msg1",10000);
                        $("#password").focus();
                    }else if(data == 43){
                        Msg("<i class='ri-error-warning-line'></i> password must contain at least one number","alert-danger",0,"#msg1",10000);
                        $("#password").focus();
                    }else if(data == 44){
                        Msg("<i class='ri-error-warning-line'></i> password must contain at least one special character","alert-danger",0,"#msg1",10000);
                        $("#password").focus();
                    }else if(data == 45){
                            Msg("<i class='ri-error-warning-line'></i> Passwords do not match.","alert-danger",0,"#msg1",10000);
                            
                    }else if(data == 6){
                            Msg("<i class='ri-error-warning-line'></i> Username already exist.","alert-danger",0,"#msg1",10000);
                            
                    }else if(data == 7){
                            Msg("<i class='ri-error-warning-line'></i> Email already exist. Login instead","alert-danger",0,"#msg1",10000);
                            $("#InputEmail").focus();
                    }else if(data == 8){
                            Msg("<i class='ri-error-warning-line'></i> Sponsor does not exits.","alert-danger",0,"#msg1",10000);
                            
                    }else if (data == 9){
                            Msg("<i class='ri-error-warning-line'></i> Action unsucessfull, check the form and try again.","alert-danger",0,"#msg1",10000);
                            
                    }else if (data == 10){
                            Msg("<i class='ri-error-warning-line'></i> Please accept our Terms of Service.","alert-danger",0,"#msg1",10000);
                            
                    }else if(data == 11){
                        Msg("<i class='ri-error-warning-line'></i> Captcha is required","alert-danger",0,"#msg1",12000);
                    } else if(data == 12){
                        Msg("<i class='ri-error-warning-line'></i> Captcha verification failed","alert-danger",0,"#msg1",12000);
                    }else{
                            Msg("<i class='ri-error-warning-line'></i> Action unsucessfull, "+data,"alert-danger",0,"#msg1",10000);
                            
                    }
                    if(data != 1){
                        $("#btn-register").prop('disabled',false);
                        $("#btn-register").html(btn_content);
                        grecaptcha.reset();
                    }

                    
                    
            }
    })}
}
$("#btn-register").click(function(e) {
    register_member(0);
    e.preventDefault();
});

//////////////////// registration script validation on the registration page
function verify_email(done){  
    if($("#one").val().length == 0){
        $("#one").focus();
        // Msg("<i class='ri-error-warning-line'></i> fill all fields!!!","alert-danger",0,"#msg",10000);
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
                            Msg("Email successfully verified..","alert-success",0,"#msg",60000);
                            window.location = "../dashboard";
                            setTimeout(function() {
                                $("#verify-form").trigger('reset');
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

