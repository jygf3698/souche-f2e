define(['index/car-god',
    'index/top-nav',
    "index/qiugou",
    'souche/custom-select',
    "index/collect",
    "lib/lazyload",
    "index/carConstrast",
    "index/record-tip",
    "souche/util/image-resize",
    "souche/time-countdown",
    "index/mod/loadCars"
], function(carGod,
    topNav,
    qiugou,
    customSelect,
    collect,
    lazyload,
    carConstrast,
    recordTip,
    ImageResize,
    TimeCountDown,
    loadCars) {
    var config = {};
    var myAdviserPageIndex = 1,
        hotNewCarsPageIndex = 0;

    var _bind = function() {
        var timeout = null;


        var adviser_end = false;
        var newcar_end = false;
        var getMore = function(id) {
            $("." + $("#carsNav li.active").attr("id") + ".carsMore span").html("正在获取");
            var self = this;
            if ($(this).hasClass("myAdviser-more") || id == "myAdviser") {
                if (adviser_end) return;
                myAdviserPageIndex++;
                console.log(myAdviserPageIndex)
                var url = config.getMoreUserRecommend_api + "=" + myAdviserPageIndex;
                $(self).find("span").html("正在加载中...")
                if (myAdviserPageIndex > 2) {
                    $(".myAdviser-loading").removeClass("hidden")
                }

                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json"
                }).done(function(result) {
                    $(self).find("span").html("查看更多")
                    $(".myAdviser-loading").addClass("hidden")
                    $(".carsMore.myAdviser-more").remove();
                    if (result.code == 204) {} else {
                        var list = result.recommendCars;
                        var list = result.recommendCars.items;
                        var template = "";
                        for (var idx = 0, len = list.length; idx < len; idx++) {
                            var url = (contextPath + "/pages/choosecarpage/choose-car-detail.html?carId=" + list[idx].id);
                            template += "<div class=\"carsItem carItem\"><a target='_blank' href=\"" + url + "\" class=\"carImg\"><img src='" + (list[idx].carPicturesVO || {}).pictureBig + "' ><\/a><a target='_blank' href='" + url + "' class='car-link'>" + list[idx].carVo.carOtherAllName + "<\/a>" +
                                "<div class='info'><span class='price'>￥" + list[idx].carVo.salePriceToString + "万<\/span><span class='shangpai'>上牌：" + list[idx].carVo.firstLicensePlateDateShow + "<\/span><\/div>" +
                                "<div class='other'>" +
                                "<div title='" + list[idx].recommendReasonStr + "' class='recommended'><span class='" + (list[idx].recommendReasonStr ? "" : "hidden") + "' >推荐理由：" + list[idx].recommendReasonStr + "<\/span><\/div>" +
                                "<\/div>" +
                                "<div class='carTail clearfix'>" +
                                "<a data-carid='" + list[idx].id + "' data-num='" + list[idx].count + "' class='collect carCollect " + (list[idx].favorite ? "active" : "") + "'>收藏<span>" + list[idx].count + "<\/span><\/a>" +
                                "<span class='recommendedToday'>" + list[idx].recommendTime + "<\/span><\/div>" +
                                "<\/div>";
                        }
                        $(".myAdviserContent .myAdviser").eq(0).append(template);
                        $(".myAdviserContent .myAdviser-more").remove();
                        if (result.hasNext) {

                        } else {
                            adviser_end = true;
                        }


                    }
                    isScrolling = true;
                });
            } else {
                if (newcar_end) return;

                hotNewCarsPageIndex++;
                var url = config.getMoreHotCars_api + hotNewCarsPageIndex;
                $(self).find("span").html("正在加载中...")
                if (hotNewCarsPageIndex > 2) {
                    $(".hotNewCars-loading").removeClass("hidden")
                }

                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json"
                }).done(function(result) {
                    $(self).find("span").html("查看更多")
                    $(".hotNewCars-loading").addClass("hidden")
                    $(".carsMore.hotNewCars-more").remove();
                    if (result.code == 204) {

                    } else {
                        var list = result.newCars.items;
                        if (list.length == 0) {
                            newcar_end = true;
                        } else {
                            var template = "";

                            for (var idx = 0, len = list.length; idx < len; idx++) {
                                var url = (contextPath + "/pages/choosecarpage/choose-car-detail.html?carId=" + list[idx].id);
                                template += "<div class='carsItem carItem'><a target='_blank' href='" + url + "' class='carImg'><img src='" + (list[idx].carPicturesVO || {}).pictureBig + "' ><\/a><a target='_blank' href='" + url + "' class='car-link'>" + list[idx].carVo.carOtherAllName + "<\/a>" +
                                    "<div class='info'><span class='price'>￥" + (list[idx].limitSpec || list[idx].price) + "万<\/span><span class='shangpai'>上牌：" + list[idx].carVo.firstLicensePlateDateShow + "<\/span><\/div>" +
                                    "<div class='other'>" +
                                    "<div title='" + list[idx].recommendReasonStr + "' class='recommended'><span class='" + (list[idx].recommendReasonStr ? "" : "hidden") + "' >推荐理由：" + list[idx].recommendReasonStr + "<\/span><\/div>" +
                                    "<\/div>" +
                                    "<div class='carTail clearfix'>" +
                                    "<a data-carid='" + list[idx].id + "' data-num='" + list[idx].count + "' class='collect carCollect " + (list[idx].favorite ? "active" : "") + "'>收藏<span>" + list[idx].count + "<\/span><\/a>" +
                                    "<div class='carConstrast' contrastid='" + list[idx].contrastId + "' carid='" + list[idx].id + "'><input type='checkbox'  " + (list[idx].contrastId ? "checked" : "") + "><span>加入对比<\/span><\/div>" +
                                    "<div class='contrast-waring hidden'>对比栏已满！你可以删除不需要的车辆，再继续添加。<\/div><\/div><\/div>";
                            }
                            $(".hotNewCarsContent .hotNewCars").eq(0).append(template);

                        }


                    }
                    isScrolling = true;
                });
            }
        }

        var isScrolling = true;
        //查看更多
        $(".carsMore").click(function() {
            getMore.call(this);
            var self = this;
            $(window).scroll(function() {
                if($("#hotNewCars").hasClass("active")||$("#myAdviser").hasClass("active")){
                    if ($("." + $("#carsNav li.active").attr("id") + "Content .carsMore").length == 0) {
                        if (($("#footer").offset().top - 600) <= ($(window).scrollTop() + $(window).height())) {
                            if (isScrolling) {
                                isScrolling = false;
                                getMore($("#carsNav li.active").attr("id"));
                            }
                        }
                    }
                }

            });
        });
    }


    return {
        init: function(_config) {
            $.extend(config, _config);
            $(document).ready(function() {
                $('.flexslider').flexslider({
                    animation: "slide",
                    slideshowSpeed: 5000,
                    directionNav: true,
                    controlNav: true,
                    pauseOnHover: true
                });
                $(".right-slide").flexslider({
                    slideshow: false,
                    animation: "slide",
                    slideshowSpeed: 5000,
                    controlNav: true,
                    animationLoop: false,
                    randomize: true,
                    directionNav: false

                });
                $(".flex-direction-nav").hide();
                $(".main-slider").mouseenter(function() {
                    $(".flex-direction-nav").fadeIn("normal");
                });
                $(".main-slider").mouseleave(function() {
                    $(".flex-direction-nav").fadeOut("normal");
                });
            });
            _bind();
            carGod.init();
            topNav.init();


            qiugou.init(config);
            carConstrast.init(config);



            $(".down-counter").each(function() {
                var $this = $(this);
                TimeCountDown.init($this);
            });


            collect.init(config);

            $(".carsContent img").lazyload({
                threshold: 200
            });

            $(".card-login").click(function() {
                Souche.MiniLogin.checkLogin(function() {
                    window.location.reload();
                })
            })
            // 获取"猜你喜欢"的数据, 用apear方法控制lazy加载到dom
            function initGuessLike(){
                var guessLikeCtn = $(".guess-like");
                guessLikeCtn.addClass('loading');
                $.ajax({
                    url: config.api_guessCars,
                    success: function(html) {
                        
                        Souche.Util.appear( ".guess-like", fillGuessCallback );
                        $(window).trigger("scroll")
                        function fillGuessCallback(){
                            guessLikeCtn.removeClass('loading');
                            guessLikeCtn.html(html);
                            ImageResize.init(".guess-like .carsItem img", 240, 160);
                            // "不喜欢"事件处理
                            guessLikeCtn.on('click', '.nolike', function(e) {
                                var self = this;
                                $(self).closest(".like-box").animate({
                                    opacity: 0,
                                    width: 0
                                }, 500, function() {
                                    $(self).closest(".like-box").remove()
                                })
                                $.ajax({
                                    url: config.api_nolikeUrl,
                                    data: {
                                        carId: $(this).attr("data-id")
                                    },
                                    dataType: "json",
                                    success: function() {}
                                })
                            })
                        }
                    }
                });
            }
            initGuessLike();


            ImageResize.init(".carsItem .img", 240, 160);
            //提示品牌是否加入心愿单
            recordTip.init(config);
            loadCars.init(config);
            //闹着玩
            // Souche.Util.appear(".hotNewCars", function() {
            //     $(".hotNewCars .carItem").css({
            //         opacity: 0
            //     }).each(function(i, item) {
            //         setTimeout(function() {
            //             $(item).animate({
            //                 opacity: 1
            //             })
            //         }, i * 100)

            //     });
            // }, 300)

        }
    }

});