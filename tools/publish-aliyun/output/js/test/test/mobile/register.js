!function(){function e(e){if(0==e.length)return!1;if(11!=e.length)return!1;var r=/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;return r.test(e)?!0:!1}function r(){var r,t=$("#phone").val(),a=($("#verification").val(),$("#pwd").val()),l=($("#repwd").val(),$("#person_name").val());return e(t)?a.length<6||a.length>10?(r="密码长度错误，请输入6~10位",alert(r),!1):l.length<1?(r="请填写姓名！",alert(r),!1):!0:(r="电话号码不正确",alert(r),!1)}function t(e){null==n&&(e.attr("disabled",!0),n=setInterval(function(){a(e)},1e3))}function a(e){l-=1,0==l?(clearInterval(n),e.attr("disabled",!1),e.html("获取验证码"),l=60,n=null):e.html(l+"秒后可重新发送...")}$("#getver").bind("click",function(){var r=$("#phone").val(),a=e(r);if(a){t($(this));var o=$(this).attr("data-url"),i="phoneNumber="+r+"&type=register";$.ajax({type:"POST",url:o,data:i,dataType:"json",success:function(e){e.msg?(alert(e.msg),null!=n&&(clearInterval(n),l=60,n=null),$("#getver").html("获取验证码"),$("#getver").attr("disabled",!1),$("#getver").button("refresh")):alert("验证码已经发送,请注意接收")},error:function(e){console.log("验证码获取失败:"+o),console.log(e)}})}else $("#phone").focus(),alert("号码格式错误")});var l=60,n=null;$("#register-form").on("submit",function(e){return e.preventDefault(),r()?($("#repwd").val($("#pwd").val()),void $.ajax({url:$("#register-form").attr("action"),dataType:"json",data:$("#register-form").serialize(),type:"post",success:function(e){if(e.id)console.log(e.id),null!=e.msg&&alert(e.msg);else{alert("注册成功"),console.log(e);var r=$("#redirectUrl").attr("data-url"),t="j_type=ajaxUserLogin&j_username="+$("#phone").val()+"&j_password="+$("#pwd").val();$.ajax({type:"POST",url:r,data:t,dataType:"json",success:function(e){if(0==e.errorMessage.length){var r=$("#redirectUrl").val();window.location.href=r?r:$("#redirectUrl").attr("data-orgin")}else alert(e.errorMessage)},error:function(){var e=$("#redirectUrl").val();window.location.href=e?e:$("#redirectUrl").attr("data-orgin")}})}}})):!1})}();