var SM=window.SM||{};SM.LoadingTip=function(){var n=null;return{show:function(o){n||(n=document.createElement("div"),n.className="loading-tip",n.innerHTML="正在加载中。。。",document.body.appendChild(n)),n.innerHTML=o||"正在加载中",$(n).css({left:$(window).width()/2-$(n).width()/2,top:$(window).height()/2-$(n).height()/2,display:"block"}).addClass("show")},hide:function(){n&&$(n).removeClass("show"),setTimeout(function(){$(n).css({display:"none"})},500)}}}(),SM.MiniLogin=SM.MiniLogin||{},SM.MiniLogin=function(){var n=contextPath+"/pages/mobile/login.html?redirect="+encodeURIComponent("http://"+window.location.host+"/"+contextPath+"/pages/mobile/loginSuccess.html"),o=null,t=function(){},i=function(){};return{callback:function(){this.close(),t()},close:function(){o&&o.css({display:"none"}),window.location.hash=""},_show:function(){var t=this;window.location.hash="#login",window.onhashchange=function(){"#login"!=window.location.hash&&t.close()},o?(o.attr("src",n),o.css({display:"block"})):(o=$("<iframe id='minilogin' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>"),o.attr("src",n),o.css({display:"block",width:$(document.body).width(),height:$(document.body).height(),position:"fixed",top:0,left:0,zIndex:100000001}),$(document.body).append(o))},checkLogin:function(n,o){t=n,i=o;var e=this;$.ajax({url:contextPath+"/pages/evaluateAction/isLogin.json",type:"post",dataType:"json",success:function(n){(!i||i(n))&&("true"==n.result?e.callback&&e.callback():e._show())},error:function(){e._show()}})}}}(),SM.checkPhoneExist=function(n){$.ajax({url:contextPath+"/pages/evaluateAction/isNoRegisterLogin.json",type:"get",dataType:"json",success:function(o){n("true"==o.result?!0:!1)},error:function(){n(!1)}})},SM.PhoneRegister=function(n,o){$.ajax({url:contextPath+"/pages/evaluateAction/noRegisterLogin.json",type:"get",dataType:"json",data:{phone:n},success:function(n){o(n.errorMessage?!1:!0)},error:function(){o(!1)}})};