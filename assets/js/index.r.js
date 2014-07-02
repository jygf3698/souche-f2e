/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.3
 *
 */

/*
 * jQuery FlexSlider v2.2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */

var contextPath = contextPath || "",
    Souche = Souche || {};
Souche.Util = function() {
    var e = {};
    return {
        mixin: function(e, t) {
            for (var n in t) e[n] = t[n]
        },
        appear: function(t, n, r, i) {
            e[t] = e[t] || [], e[t].push(n), r || (r = 0), e[t].distance = r, e[t].multi = i
        },
        init: function() {
            var t = $(window).width(),
                n = $(window).height(),
                r = function() {
                    var t = $(window).scrollTop();
                    for (var r in e) {
                        var i = $(r).offset(),
                            s = $(r).height();
                        if (i.top - t > 0 && i.top - t < n - e[r].distance) {
                            for (var o = 0; o < e[r].length; o++) e[r][o]();
                            e[r].multi || (e[r] = [])
                        }
                    }
                };
            $(document).ready(function() {
                r()
            }), $(window).scroll(r)
        },
        actionList: function(e) {}
    }
}(), Souche.Util.init(), Souche.Data = {
    DropdownzIndex: 1e3
}, Souche.UI = Souche.UI || {}, Souche.UI.Select = function() {
    var e = function(e) {
        this.config = {
            eles: ["#J_buybrand", "#J_buyset", ""],
            type: "car-subdivision",
            defaultValues: []
        }, Souche.Util.mixin(this.config, e), this.init()
    };
    return e.prototype = {
        init: function() {
            var e = this.config;
            for (var t = 0; t < e.eles.length; t++) e.defaultValues[t] = e.defaultValues[t] || "", e.eles[t] = "#" + e.eles[t];
            $.ajax({
                url: contextPath + "/pages/dicAction/loadRootLevel.json",
                dataType: "json",
                data: {
                    type: e.type
                },
                success: function(t) {
                    $(e.eles[0]).append($("<option value=''>-请选择-</option>"));
                    for (var n in t.items) {
                        var r = t.items[n];
                        $(e.eles[0]).append('<option value="' + r.code + '" ' + (e.defaultValues[0] == r.code ? "selected" : "") + ">" + r.name + "</option>")
                    }
                    e.defaultValues[0] && $(e.eles[0]).change()
                },
                error: function() {},
                failure: function() {}
            });
            for (var t in e.eles) $(e.eles[t]).attr("data-index", t).change(function() {
                var t = this.value;
                if (t == null) return;
                var n = t.split("-")[0],
                    r = $(this).attr("data-index") * 1;
                if (r >= e.eles.length - 1) return;
                n == "brand" ? $.ajax({
                    url: contextPath + "/pages/dicAction/loadRootLevelForCar.json",
                    dataType: "json",
                    data: {
                        type: e.type,
                        code: t
                    },
                    success: function(t) {
                        $(e.eles[1]).empty(), $(e.eles[1]).append($("<option value=''>-请选择-</option>"));
                        for (var n = 0; n < t.keys.length; n++) {
                            var r = t.keys[n],
                                i = $("<optgroup label='" + r + "' style='color:green;font-style: italic;background-color:#f5f5f5;'></optgroup>");
                            $(e.eles[1]).append(i);
                            for (var s = 0; s < t.codes[r].length; s++) {
                                var o = t.codes[r][s];
                                i.append($("<option style='background-color:#ffffff;color:#000000;font-style: normal;' value='" + o.code + "' " + (e.defaultValues[1] == o["code"] ? "selected" : "") + ">" + o.name + "</option>"))
                            }
                            $(e.eles[1]).append($(""))
                        }
                        e.defaultValues[1] && $(e.eles[1]).change()
                    }
                }) : $.ajax({
                    url: contextPath + "/pages/dicAction/loadNextLevel.json",
                    dataType: "json",
                    data: {
                        type: e.type,
                        code: t
                    },
                    success: function(t) {
                        $(e.eles[r + 1]).empty(), $(e.eles[r + 1]).append($("<option value=''>-请选择-</option>"));
                        for (var n in t.items) {
                            var i = t.items[n];
                            $(e.eles[r + 1]).append('<option value="' + i.code + '" ' + (e.defaultValues[r + 1] == i.code ? "selected" : "") + ">" + i.name + "</option>")
                        }
                    }
                })
            })
        }
    }, {
        init: function(t) {
            return new e(t)
        }
    }
}(), Souche.Form = Souche.Form || {}, Souche.Form = function() {
    jQuery.validator && (jQuery.validator.addMethod("exactlength", function(e, t, n) {
        return this.optional(t) || e.length == n
    }, jQuery.format("请输入 {0} 字符.")), jQuery.validator.addMethod("vin", function(e, t) {
        return this.optional(t) || /^[A-Z0-9]{8}[0-9X][A-Z0-9]{2}[A-Z0-9]{6}$/.test(e.toUpperCase())
    }, jQuery.format("vin编码格式错误.")));
    var e = function(e) {
        this.config = {
            ele: "loginform",
            isAsync: !1,
            beforeSubmit: function() {
                return !0
            },
            validateFail: function(e, t) {},
            success: function(e) {},
            error: function() {}
        }, Souche.Util.mixin(this.config, e)
    };
    return e.prototype = {
        submit: function(e) {
            var t = this.config;
            $("#" + t.ele).validate({
                messages: t.messages || {},
                submitHandler: function(e) {
                    t.beforeSubmit() && (t.isAsync ? ($("*[type='submit']").attr("disabled", !0), $.ajax({
                        url: $(e).attr("action") || "",
                        type: $(e).attr("method") || "get",
                        dataType: "json",
                        data: $(e).serialize(),
                        success: function(e) {
                            $("*[type='submit']").attr("disabled", !1), e.errorMessage ? t.error(e.errorMessage) : t.success(e)
                        },
                        error: function() {
                            $("*[type='submit']").attr("disabled", !1), t.error()
                        }
                    })) : e.submit())
                },
                errorPlacement: function(e, n) {
                    t.validateFail(e.html(), n)
                }
            })
        }
    }, {
        submit: function(t) {
            (new e(t)).submit()
        }
    }
}(), Souche.MiniLogin = Souche.MiniLogin || {}, Souche.MiniLogin = function() {
    var e = contextPath + "/pages/minilogin.html",
        t = null,
        n = null,
        r = function() {};
    return {
        callback: function() {
            this.close(), r()
        },
        close: function() {
            $(".result_p .warning ").addClass("hidden"), t && t.css({
                display: "none"
            }), n && n && n.css({
                display: "none"
            })
        },
        _show: function() {
            t ? (t.attr("src", e), t.css({
                display: "block"
            }), n.css({
                display: "block"
            })) : (t = $("<iframe id='minilogin' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>"), t.attr("src", e), t.css({
                display: "block",
                width: 400,
                height: 340,
                position: "fixed",
                top: 100,
                left: $(window).width() / 2 - 200,
                zIndex: 100000001
            }), n = $("<div id='minilayer'></div>"), n.css({
                display: "block",
                width: $(document.body).width(),
                left: 0,
                top: 0,
                height: $(document.body).height(),
                position: "absolute",
                background: "#111",
                zIndex: 1e8
            }).css("opacity", .7), $(document.body).append(n), $(document.body).append(t))
        },
        checkLogin: function(e) {
            r = e;
            var t = this;
            $.ajax({
                url: contextPath + "/pages/evaluateAction/isLogin.json",
                type: "post",
                dataType: "json",
                success: function(e) {
                    e.result == "true" ? t.callback && t.callback() : t._show()
                },
                error: function() {
                    t._show()
                }
            })
        }
    }
}(), Souche.NoRegLogin = Souche.NoRegLogin || {}, Souche.NoRegLogin = function() {
    var e = null,
        t = null,
        n = /^1[3458][0-9]{9}$/,
        r = function() {};
    return {
        callback: function() {
            this.close(), r()
        },
        close: function() {
            $(".result_p .warning ").addClass("hidden"), e && e.css({
                display: "none"
            }), t && t && t.css({
                display: "none"
            })
        },
        _show: function() {
            var r = this;
            e ? (e.css({
                display: "block"
            }).removeClass("hidden"), t.css({
                display: "block"
            })) : (e = $('<div id="noreg-popup" class="apply_popup">      <span class="apply_close"></span>      <h1 class="popup-title">手机号一键登录</h1>      <form id="noreg-phone-form" action="">      <div class="result_p">      <div class="warning hidden clearfix">       <div class="input-error-tip">     <span class="error-icon"></span>    请输入正确的手机号</div>     </div>  <div class="tip">输入您的手机号码，完成后续操作:</div>            <div class="phone">            <input type="text" name="" value="" id="noreg-phone"  placeholder="输入你的手机号"/>    <i class="phone-true hidden"></i>      </div>      </div>      <button type="submit" class="submit">确认</button>      </form>    </div>'), e.css({
                display: "block",
                zIndex: 100000001
            }).removeClass("hidden"), t = $("<div id='minilayer'></div>"), t.css({
                display: "block",
                width: $(document.body).width(),
                left: 0,
                top: 0,
                height: $(document.body).height(),
                position: "absolute",
                background: "#111",
                zIndex: 1e8
            }).css("opacity", .7), $(document.body).append(t), $(document.body).append(e), $("#noreg-phone-form").on("submit", function(e) {
                e.preventDefault(), n.test($("#noreg-phone").val()) ? Souche.PhoneRegister($("#noreg-phone").val(), function() {
                    r.callback && r.callback()
                }) : $(".warning", this).removeClass("hidden")
            }), $("#noreg-phone").blur(function(e) {
                e.preventDefault(), n.test($("#noreg-phone").val()) ? ($(".warning", $("#noreg-phone-form")).addClass("hidden"), $(".phone-true").removeClass("hidden")) : $(".warning", $("#noreg-phone-form")).removeClass("hidden")
            }), $("#noreg-popup .apply_close").on("click", function(e) {
                r.close()
            }))
        },
        checkLogin: function(e) {
            r = e;
            var t = this;
            Souche.checkPhoneExist(function(e) {
                e ? t.callback && t.callback() : t._show()
            })
        }
    }
}(), Souche.checkPhoneExist = function(e) {
    $.ajax({
        url: contextPath + "/pages/evaluateAction/isNoRegisterLogin.json",
        type: "post",
        dataType: "json",
        success: function(t) {
            t.result == "true" ? e(!0) : e(!1)
        },
        error: function() {
            e(!1)
        }
    })
}, Souche.PhoneRegister = function(e, t) {
    $.ajax({
        url: contextPath + "/pages/evaluateAction/noRegisterLogin.json",
        type: "post",
        dataType: "json",
        data: {
            phone: e
        },
        success: function(e) {
            e.errorMessage ? t(!1) : t(!0)
        },
        error: function() {
            t(!1)
        }
    })
},
function() {
    function t(e) {
        return o.raw ? e : encodeURIComponent(e)
    }

    function n(e) {
        return o.raw ? e : decodeURIComponent(e)
    }

    function r(e) {
        return t(o.json ? JSON.stringify(e) : String(e))
    }

    function i(t) {
        t.indexOf('"') === 0 && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return t = decodeURIComponent(t.replace(e, " ")), o.json ? JSON.parse(t) : t
        } catch (n) {}
    }

    function s(e, t) {
        var n = o.raw ? e : i(e);
        return $.isFunction(t) ? t(n) : n
    }
    var e = /\+/g,
        o = $.cookie = function(e, i, u) {
            if (i !== undefined && !$.isFunction(i)) {
                u = $.extend({}, o.defaults, u);
                if (typeof u.expires == "number") {
                    var a = u.expires,
                        f = u.expires = new Date;
                    f.setTime(+f + a * 864e5)
                }
                return document.cookie = [t(e), "=", r(i), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
            }
            var l = e ? undefined : {}, c = document.cookie ? document.cookie.split("; ") : [];
            for (var h = 0, p = c.length; h < p; h++) {
                var d = c[h].split("="),
                    v = n(d.shift()),
                    m = d.join("=");
                if (e && e === v) {
                    l = s(m, i);
                    break
                }!e && (m = s(m)) !== undefined && (l[v] = m)
            }
            return l
        };
    o.defaults = {}, $.removeCookie = function(e, t) {
        return $.cookie(e) === undefined ? !1 : ($.cookie(e, "", $.extend({}, t, {
            expires: -1
        })), !$.cookie(e))
    }
}(), $(document).ready(function() {
    $(".apply_popup .apply_close").on("click", function() {
        $(".apply_popup").addClass("hidden"), $(".wrapGrayBg").hide()
    });
    var e = !1,
        t = function() {
            e || ($(window).height() < 650 ? ($("#guwen_slider_global").addClass("small-global"), $(".guwen-flexslider .slides li").each(function(e, t) {
                $(t).css({
                    background: "url(" + $(t).attr("data-small-image") + ") no-repeat center center"
                })
            })) : $(".guwen-flexslider .slides li").each(function(e, t) {
                $(t).css({
                    background: "url(" + $(t).attr("data-image") + ") no-repeat center center"
                })
            }), $.getScript("http://souche.cdn.aliyuncs.com/assets/js/lib/jquery.flexslider-min.js", function() {
                $(".guwen-flexslider").flexslider({
                    animation: "slide",
                    animationSpeed: 300,
                    initDelay: 0,
                    slideshowSpeed: 5e3,
                    useCSS: !1
                }), e = !0
            }))
        };
    $.cookie("show_guwen_tip") || window.location.href.indexOf("sellCarNew.html") == -1 && (t(), setTimeout(function() {
        $("#guwen_slider_global").animate({
            top: 0
        }, 600), $("#guwen_show_global").css({
            top: -30
        })
    }, 900), $("#guwen_slider_global").focus()), $("#guwen_show_global").click(function(e) {
        t(), $("#guwen_slider_global").animate({
            top: 0
        }, 600), $("#guwen_show_global").css({
            top: -30
        })
    }), $(".wedo").click(function() {
        t(), $("#guwen_slider_global").animate({
            top: 0
        }, 600), $("#guwen_show_global").css({
            top: -30
        })
    });
    var n = function() {
        $("#guwen_slider_global").animate({
            top: -560
        }, 600, null, function() {
            $("#guwen_show_global").animate({
                top: 0
            }, 400)
        }), $.cookie("show_guwen_tip", "1", {
            expires: 100,
            path: "/"
        })
    };
    $("#guwen_slider_global .close").on("click", function(e) {
        e.preventDefault(), n()
    }), $("#guwen_slider_global .link").on("click", function(e) {
        n()
    })
}), define("souche", function() {}),
function(e, t, n, r) {
    var i = e(t);
    e.fn.lazyload = function(n) {
        function s() {
            var t = 0;
            o.each(function() {
                var n = e(this);
                if (f.skip_invisible && !n.is(":visible")) return;
                if (!e.abovethetop(this, f) && !e.leftofbegin(this, f))
                    if (!e.belowthefold(this, f) && !e.rightoffold(this, f)) n.trigger("appear"), t = 0;
                    else
                if (++t > f.failure_limit) return !1
            })
        }
        var o = this,
            u, f = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: t,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null
            };
        return n && (r !== n.failurelimit && (n.failure_limit = n.failurelimit, delete n.failurelimit), r !== n.effectspeed && (n.effect_speed = n.effectspeed, delete n.effectspeed), e.extend(f, n)), u = f.container === r || f.container === t ? i : e(f.container), 0 === f.event.indexOf("scroll") && u.bind(f.event, function(e) {
            return s()
        }), this.each(function() {
            var t = this,
                n = e(t);
            t.loaded = !1, n.one("appear", function() {
                if (!this.loaded) {
                    if (f.appear) {
                        var r = o.length;
                        f.appear.call(t, r, f)
                    }
                    e("<img />").bind("load", function() {
                        n.hide().attr("src", n.data(f.data_attribute))[f.effect](f.effect_speed), t.loaded = !0;
                        var r = e.grep(o, function(e) {
                            return !e.loaded
                        });
                        o = e(r);
                        if (f.load) {
                            var i = o.length;
                            f.load.call(t, i, f)
                        }
                    }).attr("src", n.data(f.data_attribute))
                }
            }), 0 !== f.event.indexOf("scroll") && n.bind(f.event, function(e) {
                t.loaded || n.trigger("appear")
            })
        }), i.bind("resize", function(e) {
            s()
        }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && i.bind("pageshow", function(t) {
            t.originalEvent.persisted && o.each(function() {
                e(this).trigger("appear")
            })
        }), e(t).load(function() {
            s()
        }), this
    }, e.belowthefold = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = i.height() + i.scrollTop() : o = e(s.container).offset().top + e(s.container).height(), o <= e(n).offset().top - s.threshold
    }, e.rightoffold = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = i.width() + i.scrollLeft() : o = e(s.container).offset().left + e(s.container).width(), o <= e(n).offset().left - s.threshold
    }, e.abovethetop = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = i.scrollTop() : o = e(s.container).offset().top, o >= e(n).offset().top + s.threshold + e(n).height()
    }, e.leftofbegin = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = i.scrollLeft() : o = e(s.container).offset().left, o >= e(n).offset().left + s.threshold + e(n).width()
    }, e.inviewport = function(t, n) {
        return !e.rightoffold(t, n) && !e.leftofbegin(t, n) && !e.belowthefold(t, n) && !e.abovethetop(t, n)
    }, e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        },
        "above-the-fold": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-fold": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-fold": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document), define("lib/lazyload", function() {}),
function(e) {
    e.flexslider = function(t, n) {
        var r = e(t);
        r.vars = e.extend({}, e.flexslider.defaults, n);
        var i = r.vars.namespace,
            s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            o = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
            u = "click touchend MSPointerUp",
            a = "",
            f, l = r.vars.direction === "vertical",
            c = r.vars.reverse,
            h = r.vars.itemWidth > 0,
            p = r.vars.animation === "fade",
            d = r.vars.asNavFor !== "",
            v = {}, m = !0;
        e.data(t, "flexslider", r), v = {
            init: function() {
                r.animating = !1, r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0), isNaN(r.currentSlide) && (r.currentSlide = 0), r.animatingTo = r.currentSlide, r.atEnd = r.currentSlide === 0 || r.currentSlide === r.last, r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" ")), r.slides = e(r.vars.selector, r), r.container = e(r.containerSelector, r), r.count = r.slides.length, r.syncExists = e(r.vars.sync).length > 0, r.vars.animation === "slide" && (r.vars.animation = "swing"), r.prop = l ? "top" : "marginLeft", r.args = {}, r.manualPause = !1, r.stopped = !1, r.started = !1, r.startTimeout = null, r.transitions = !r.vars.video && !p && r.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t)
                        if (e.style[t[n]] !== undefined) return r.pfx = t[n].replace("Perspective", "").toLowerCase(), r.prop = "-" + r.pfx + "-transform", !0;
                    return !1
                }(), r.vars.controlsContainer !== "" && (r.controlsContainer = e(r.vars.controlsContainer).length > 0 && e(r.vars.controlsContainer)), r.vars.manualControls !== "" && (r.manualControls = e(r.vars.manualControls).length > 0 && e(r.vars.manualControls)), r.vars.randomize && (r.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), r.container.empty().append(r.slides)), r.doMath(), r.setup("init"), r.vars.controlNav && v.controlNav.setup(), r.vars.directionNav && v.directionNav.setup(), r.vars.keyboard && (e(r.containerSelector).length === 1 || r.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!r.animating && (t === 39 || t === 37)) {
                        var n = t === 39 ? r.getTarget("next") : t === 37 ? r.getTarget("prev") : !1;
                        r.flexAnimate(n, r.vars.pauseOnAction)
                    }
                }), r.vars.mousewheel && r.bind("mousewheel", function(e, t, n, i) {
                    e.preventDefault();
                    var s = t < 0 ? r.getTarget("next") : r.getTarget("prev");
                    r.flexAnimate(s, r.vars.pauseOnAction)
                }), r.vars.pausePlay && v.pausePlay.setup(), r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init();
                if (r.vars.slideshow) {
                    r.vars.pauseOnHover && r.hover(function() {
                        !r.manualPlay && !r.manualPause && r.pause()
                    }, function() {
                        !r.manualPause && !r.manualPlay && !r.stopped && r.play()
                    });
                    if (!r.vars.pauseInvisible || !v.pauseInvisible.isHidden()) r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play()
                }
                d && v.asNav.setup(), o && r.vars.touch && v.touch(), (!p || p && r.vars.smoothHeight) && e(window).bind("resize orientationchange focus", v.resize), r.find("img").attr("draggable", "false"), setTimeout(function() {
                    r.vars.start(r)
                }, 200)
            },
            asNav: {
                setup: function() {
                    r.asNav = !0, r.animatingTo = Math.floor(r.currentSlide / r.move), r.currentItem = r.currentSlide, r.slides.removeClass(i + "active-slide").eq(r.currentItem).addClass(i + "active-slide"), s ? (t._slider = r, r.slides.each(function() {
                        var t = this;
                        t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), t.addEventListener("MSGestureTap", function(t) {
                            t.preventDefault();
                            var n = e(this),
                                i = n.index();
                            !e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass("active") && (r.direction = r.currentItem < i ? "next" : "prev", r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : r.slides.click(function(t) {
                        t.preventDefault();
                        var n = e(this),
                            s = n.index(),
                            o = n.offset().left - e(r).scrollLeft();
                        o <= 0 && n.hasClass(i + "active-slide") ? r.flexAnimate(r.getTarget("prev"), !0) : !e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass(i + "active-slide") && (r.direction = r.currentItem < s ? "next" : "prev", r.flexAnimate(s, r.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var t = r.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
                        n = 1,
                        s, o;
                    r.controlNavScaffold = e('<ol class="' + i + "control-nav " + i + t + '"></ol>');
                    if (r.pagingCount > 1)
                        for (var f = 0; f < r.pagingCount; f++) {
                            o = r.slides.eq(f), s = r.vars.controlNav === "thumbnails" ? '<img src="' + o.attr("data-thumb") + '"/>' : "<a>" + n + "</a>";
                            if ("thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
                                var l = o.attr("data-thumbcaption");
                                "" != l && undefined != l && (s += '<span class="' + i + 'caption">' + l + "</span>")
                            }
                            r.controlNavScaffold.append("<li>" + s + "</li>"), n++
                        }
                    r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), r.controlNavScaffold.delegate("a, img", u, function(t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            n.hasClass(i + "active") || (r.direction = s > r.currentSlide ? "next" : "prev", r.flexAnimate(s, r.vars.pauseOnAction))
                        }
                        a === "" && (a = t.type), v.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    r.controlNav = r.manualControls, v.controlNav.active(), r.controlNav.bind(u, function(t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            n.hasClass(i + "active") || (s > r.currentSlide ? r.direction = "next" : r.direction = "prev", r.flexAnimate(s, r.vars.pauseOnAction))
                        }
                        a === "" && (a = t.type), v.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = r.vars.controlNav === "thumbnails" ? "img" : "a";
                    r.controlNav = e("." + i + "control-nav li " + t, r.controlsContainer ? r.controlsContainer : r)
                },
                active: function() {
                    r.controlNav.removeClass(i + "active").eq(r.animatingTo).addClass(i + "active")
                },
                update: function(t, n) {
                    r.pagingCount > 1 && t === "add" ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : r.pagingCount === 1 ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove(), v.controlNav.set(), r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, t) : v.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + i + 'direction-nav"><li><a class="' + i + 'prev" href="#">' + r.vars.prevText + '</a></li><li><a class="' + i + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
                    r.controlsContainer ? (e(r.controlsContainer).append(t), r.directionNav = e("." + i + "direction-nav li a", r.controlsContainer)) : (r.append(t), r.directionNav = e("." + i + "direction-nav li a", r)), v.directionNav.update(), r.directionNav.bind(u, function(t) {
                        t.preventDefault();
                        var n;
                        if (a === "" || a === t.type) n = e(this).hasClass(i + "next") ? r.getTarget("next") : r.getTarget("prev"), r.flexAnimate(n, r.vars.pauseOnAction);
                        a === "" && (a = t.type), v.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = i + "disabled";
                    r.pagingCount === 1 ? r.directionNav.addClass(e).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(e).removeAttr("tabindex") : r.animatingTo === 0 ? r.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : r.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + i + 'pauseplay"><a></a></div>');
                    r.controlsContainer ? (r.controlsContainer.append(t), r.pausePlay = e("." + i + "pauseplay a", r.controlsContainer)) : (r.append(t), r.pausePlay = e("." + i + "pauseplay a", r)), v.pausePlay.update(r.vars.slideshow ? i + "pause" : i + "play"), r.pausePlay.bind(u, function(t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) e(this).hasClass(i + "pause") ? (r.manualPause = !0, r.manualPlay = !1, r.pause()) : (r.manualPause = !1, r.manualPlay = !0, r.play());
                        a === "" && (a = t.type), v.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    e === "play" ? r.pausePlay.removeClass(i + "pause").addClass(i + "play").html(r.vars.playText) : r.pausePlay.removeClass(i + "play").addClass(i + "pause").html(r.vars.pauseText)
                }
            },
            touch: function() {
                var e, n, i, o, u, a, f = !1,
                    d = 0,
                    v = 0,
                    m = 0;
                if (!s) {
                    t.addEventListener("touchstart", g, !1);

                    function g(s) {
                        if (r.animating) s.preventDefault();
                        else if (window.navigator.msPointerEnabled || s.touches.length === 1) r.pause(), o = l ? r.h : r.w, a = Number(new Date), d = s.touches[0].pageX, v = s.touches[0].pageY, i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o, e = l ? v : d, n = l ? d : v, t.addEventListener("touchmove", y, !1), t.addEventListener("touchend", b, !1)
                    }

                    function y(t) {
                        d = t.touches[0].pageX, v = t.touches[0].pageY, u = l ? e - v : e - d, f = l ? Math.abs(u) < Math.abs(d - n) : Math.abs(u) < Math.abs(v - n);
                        var s = 500;
                        if (!f || Number(new Date) - a > s) t.preventDefault(), !p && r.transitions && (r.vars.animationLoop || (u /= r.currentSlide === 0 && u < 0 || r.currentSlide === r.last && u > 0 ? Math.abs(u) / o + 2 : 1), r.setProps(i + u, "setTouch"))
                    }

                    function b(s) {
                        t.removeEventListener("touchmove", y, !1);
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var l = c ? -u : u,
                                h = l > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(h) && (Number(new Date) - a < 550 && Math.abs(l) > 50 || Math.abs(l) > o / 2) ? r.flexAnimate(h, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        t.removeEventListener("touchend", b, !1), e = null, n = null, u = null, i = null
                    }
                } else {
                    t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", w, !1), t._slider = r, t.addEventListener("MSGestureChange", E, !1), t.addEventListener("MSGestureEnd", S, !1);

                    function w(e) {
                        e.stopPropagation(), r.animating ? e.preventDefault() : (r.pause(), t._gesture.addPointer(e.pointerId), m = 0, o = l ? r.h : r.w, a = Number(new Date), i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o)
                    }

                    function E(e) {
                        e.stopPropagation();
                        var n = e.target._slider;
                        if (!n) return;
                        var r = -e.translationX,
                            s = -e.translationY;
                        m += l ? s : r, u = m, f = l ? Math.abs(m) < Math.abs(-r) : Math.abs(m) < Math.abs(-s);
                        if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
                            setImmediate(function() {
                                t._gesture.stop()
                            });
                            return
                        }
                        if (!f || Number(new Date) - a > 500) e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (u = m / (n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / o + 2 : 1)), n.setProps(i + u, "setTouch"))
                    }

                    function S(t) {
                        t.stopPropagation();
                        var r = t.target._slider;
                        if (!r) return;
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var s = c ? -u : u,
                                l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(l) && (Number(new Date) - a < 550 && Math.abs(s) > 50 || Math.abs(s) > o / 2) ? r.flexAnimate(l, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        e = null, n = null, u = null, i = null, m = 0
                    }
                }
            },
            resize: function() {
                !r.animating && r.is(":visible") && (h || r.doMath(), p ? v.smoothHeight() : h ? (r.slides.width(r.computedW), r.update(r.pagingCount), r.setProps()) : l ? (r.viewport.height(r.h), r.setProps(r.h, "setTotal")) : (r.vars.smoothHeight && v.smoothHeight(), r.newSlides.width(r.computedW), r.setProps(r.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!l || p) {
                    var t = p ? r : r.viewport;
                    e ? t.animate({
                        height: r.slides.eq(r.animatingTo).height()
                    }, e) : t.height(r.slides.eq(r.animatingTo).height())
                }
            },
            sync: function(t) {
                var n = e(r.vars.sync).data("flexslider"),
                    i = r.animatingTo;
                switch (t) {
                    case "animate":
                        n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        !n.playing && !n.asNav && n.play();
                        break;
                    case "pause":
                        n.pause()
                }
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
                    if (v.pauseInvisible.visProp) {
                        var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(n, function() {
                            v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[v.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(f), f = setTimeout(function() {
                    a = ""
                }, 3e3)
            }
        }, r.flexAnimate = function(t, n, s, u, a) {
            !r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev"), d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
            if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
                if (d && u) {
                    var f = e(r.vars.asNavFor).data("flexslider");
                    r.atEnd = t === 0 || t === r.count - 1, f.flexAnimate(t, !0, !1, !0, a), r.direction = r.currentItem < t ? "next" : "prev", f.direction = r.direction;
                    if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) return r.currentItem = t, r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), !1;
                    r.currentItem = t, r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), t = Math.floor(t / r.visible)
                }
                r.animating = !0, r.animatingTo = t, n && r.pause(), r.vars.before(r), r.syncExists && !a && v.sync("animate"), r.vars.controlNav && v.controlNav.active(), h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), r.atEnd = t === 0 || t === r.last, r.vars.directionNav && v.directionNav.update(), t === r.last && (r.vars.end(r), r.vars.animationLoop || r.pause());
                if (!p) {
                    var m = l ? r.slides.filter(":first").height() : r.computedW,
                        g, y, b;
                    h ? (g = r.vars.itemMargin, b = (r.itemW + g) * r.move * r.animatingTo, y = b > r.limit && r.visible !== 1 ? r.limit : b) : r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m, r.setProps(y, "", r.vars.animationSpeed);
                    if (r.transitions) {
                        if (!r.vars.animationLoop || !r.atEnd) r.animating = !1, r.currentSlide = r.animatingTo;
                        r.container.unbind("webkitTransitionEnd transitionend"), r.container.bind("webkitTransitionEnd transitionend", function() {
                            r.wrapup(m)
                        })
                    } else r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function() {
                        r.wrapup(m)
                    })
                } else o ? (r.slides.eq(r.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), r.slides.eq(t).css({
                    opacity: 1,
                    zIndex: 2
                }), r.wrapup(m)) : (r.slides.eq(r.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, r.vars.animationSpeed, r.vars.easing), r.slides.eq(t).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, r.vars.animationSpeed, r.vars.easing, r.wrapup));
                r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
            }
        }, r.wrapup = function(e) {
            !p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart")), r.animating = !1, r.currentSlide = r.animatingTo, r.vars.after(r)
        }, r.animateSlides = function() {
            !r.animating && m && r.flexAnimate(r.getTarget("next"))
        }, r.pause = function() {
            clearInterval(r.animatedSlides), r.animatedSlides = null, r.playing = !1, r.vars.pausePlay && v.pausePlay.update("play"), r.syncExists && v.sync("pause")
        }, r.play = function() {
            r.playing && clearInterval(r.animatedSlides), r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed), r.started = r.playing = !0, r.vars.pausePlay && v.pausePlay.update("pause"), r.syncExists && v.sync("play")
        }, r.stop = function() {
            r.pause(), r.stopped = !0
        }, r.canAdvance = function(e, t) {
            var n = d ? r.pagingCount - 1 : r.last;
            return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
        }, r.getTarget = function(e) {
            return r.direction = e, e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
        }, r.setProps = function(e, t, n) {
            var i = function() {
                var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
                    i = function() {
                        if (h) return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
                        switch (t) {
                            case "setTotal":
                                return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
                            case "setTouch":
                                return c ? e : e;
                            case "jumpEnd":
                                return c ? e : r.count * e;
                            case "jumpStart":
                                return c ? r.count * e : e;
                            default:
                                return e
                        }
                    }();
                return i * -1 + "px"
            }();
            r.transitions && (i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = n !== undefined ? n / 1e3 + "s" : "0s", r.container.css("-" + r.pfx + "-transition-duration", n)), r.args[r.prop] = i, (r.transitions || n === undefined) && r.container.css(r.args)
        }, r.setup = function(t) {
            if (!p) {
                var n, s;
                t === "init" && (r.viewport = e('<div class="' + i + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(r).append(r.container), r.cloneCount = 0, r.cloneOffset = 0, c && (s = e.makeArray(r.slides).reverse(), r.slides = e(s), r.container.empty().append(r.slides))), r.vars.animationLoop && !h && (r.cloneCount = 2, r.cloneOffset = 1, t !== "init" && r.container.find(".clone").remove(), r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))), r.newSlides = e(r.vars.selector, r), n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset, l && !h ? (r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    r.newSlides.css({
                        display: "block"
                    }), r.doMath(), r.viewport.height(r.h), r.setProps(n * r.h, "init")
                }, t === "init" ? 100 : 0)) : (r.container.width((r.count + r.cloneCount) * 200 + "%"), r.setProps(n * r.computedW, "init"), setTimeout(function() {
                    r.doMath(), r.newSlides.css({
                        width: r.computedW,
                        "float": "left",
                        display: "block"
                    }), r.vars.smoothHeight && v.smoothHeight()
                }, t === "init" ? 100 : 0))
            } else r.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), t === "init" && (o ? r.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(r.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : r.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(r.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, r.vars.animationSpeed, r.vars.easing)), r.vars.smoothHeight && v.smoothHeight();
            h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide")
        }, r.doMath = function() {
            var e = r.slides.first(),
                t = r.vars.itemMargin,
                n = r.vars.minItems,
                i = r.vars.maxItems;
            r.w = r.viewport === undefined ? r.width() : r.viewport.width(), r.h = e.height(), r.boxPadding = e.outerWidth() - e.width(), h ? (r.itemT = r.vars.itemWidth + t, r.minW = n ? n * r.itemT : r.w, r.maxW = i ? i * r.itemT - t : r.w, r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth, r.visible = Math.floor(r.w / r.itemW), r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible, r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1), r.last = r.pagingCount - 1, r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t) : (r.itemW = r.w, r.pagingCount = r.count, r.last = r.count - 1), r.computedW = r.itemW - r.boxPadding
        }, r.update = function(e, t) {
            r.doMath(), h || (e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1), r.animatingTo = r.currentSlide);
            if (r.vars.controlNav && !r.manualControls)
                if (t === "add" && !h || r.pagingCount > r.controlNav.length) v.controlNav.update("add");
                else
            if (t === "remove" && !h || r.pagingCount < r.controlNav.length) h && r.currentSlide > r.last && (r.currentSlide -= 1, r.animatingTo -= 1), v.controlNav.update("remove", r.last);
            r.vars.directionNav && v.directionNav.update()
        }, r.addSlide = function(t, n) {
            var i = e(t);
            r.count += 1, r.last = r.count - 1, l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i), r.update(n, "add"), r.slides = e(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.added(r)
        }, r.removeSlide = function(t) {
            var n = isNaN(t) ? r.slides.index(e(t)) : t;
            r.count -= 1, r.last = r.count - 1, isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove(), r.doMath(), r.update(n, "remove"), r.slides = e(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.removed(r)
        }, v.init()
    }, e(window).blur(function(e) {
        focused = !1
    }).focus(function(e) {
        focused = !0
    }), e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {}
    }, e.fn.flexslider = function(t) {
        t === undefined && (t = {});
        if (typeof t == "object") return this.each(function() {
            var n = e(this),
                r = t.selector ? t.selector : ".slides > li",
                i = n.find(r);
            i.length === 1 && t.allowOneSlide === !0 || i.length === 0 ? (i.fadeIn(400), t.start && t.start(n)) : n.data("flexslider") === undefined && new e.flexslider(this, t)
        });
        var n = e(this).data("flexslider");
        switch (t) {
            case "play":
                n.play();
                break;
            case "pause":
                n.pause();
                break;
            case "stop":
                n.stop();
                break;
            case "next":
                n.flexAnimate(n.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                n.flexAnimate(n.getTarget("prev"), !0);
                break;
            default:
                typeof t == "number" && n.flexAnimate(t, !0)
        }
    }
}(jQuery), define("lib/jquery.flexslider-min", function() {}), define("index", ["souche", "lib/lazyload", "lib/jquery.flexslider-min"], function(e) {
    var t = "";
    return Souche.Index = function() {
        var e = {
            has_qiugou: !1
        };
        return {
            init: function(t) {
                $.extend(e, t);
                var n = $($(".slides li img").get(0));
                n.attr("src", n.attr("data-src")), $(".flexslider").flexslider({
                    animation: "slide",
                    animationSpeed: 300,
                    initDelay: 0,
                    slideshowSpeed: 5e3,
                    useCSS: !0,
                    after: function(e) {
                        var t = e.slides,
                            n = e.animatingTo,
                            r = $(t[n]),
                            i = r.find("img[data-src]");
                        i.attr("src", i.attr("data-src"));
                        var s = $(".slides li:nth-child(" + (n + 2) + ") img");
                        s.attr("src", s.attr("data-src"))
                    }
                }), $(".flexslider").mouseenter(function() {
                    $(this).flexslider("stop")
                }).mouseleave(function() {
                    $(this).flexslider("play")
                }), $(".timebuy img").lazyload(), $(".whybuy img").lazyload(), $(".carlife img").lazyload(), $(".banners img").lazyload(), $(".buy-guide img").lazyload(), $(".hotsell-list img").lazyload(), $(".starbuy img").lazyload(), $(".cars img").lazyload(), $(".performance img").lazyload(), Souche.Util.appear(".timebuy", function() {
                    require(["index/timedown"], function(e) {
                        $(".down-counter").each(function() {
                            var t = $(this);
                            e(t)
                        })
                    })
                }), Souche.Util.appear(".qiugou", function() {
                    require(["index/qiugou"], function(t) {
                        t.init(e)
                    })
                }), Souche.Util.appear(".carlife", function() {
                    require(["index/carlife"], function(t) {
                        t.init(e)
                    })
                });
                var r = 200,
                    i = function() {
                        var e = setTimeout(function() {
                            var t = +$("#brand").css("z-index") + 1;
                            clearTimeout(e), s == 1 ? ($("#nav-item-brand .hr").css({
                                "border-bottom": "1px solid #fff"
                            }), $("#nav-item-brand").css({
                                border: "1px solid #fc7000",
                                "border-right": "1px solid #fff",
                                "z-index": t,
                                "background-color": "#fff"
                            }), $("#brand").show().animate({
                                width: "690px",
                                avoidTransforms: !0
                            }, r), $("#brand img").lazyload()) : $("#brand").animate({
                                width: "0px",
                                avoidTransforms: !0
                            }, r, function() {
                                $("#brand").hide(), $("#nav-item-brand .hr").css({
                                    "border-bottom": "1px solid #e6e6e6"
                                }), $("#nav-item-brand").css({
                                    border: "1px solid #f9f9f9",
                                    "z-index": 0,
                                    "background-color": "#f9f9f9"
                                })
                            })
                        }, r)
                    }, s = !1;
                $("#nav-item-brand,#brand").on("mouseenter", function() {
                    s = !0, i()
                }).on("mouseleave", function() {
                    s = !1, i()
                });
                var o = /^1[3458][0-9]{9}$/,
                    u = function() {
                        $.ajax({
                            url: contextPath + "/pages/saleDetailAction/sendAddressToPhone.json",
                            data: {},
                            type: "post",
                            success: function(e) {
                                $(".wrapGrayBg").show(), $("#address-popup").addClass("hidden"), $("#address-result-popup").removeClass("hidden")
                            }
                        })
                    };
                $("#address-form").on("submit", function(e) {
                    e.preventDefault(), o.test($("#address-phone").val()) ? Souche.PhoneRegister($("#address-phone").val(), function() {
                        u()
                    }) : $(".warning", this).removeClass("hidden")
                }), $(".sendadd").click(function() {
                    Souche.checkPhoneExist(function(e) {
                        e ? u() : ($("#address-popup").removeClass("hidden"), $(".wrapGrayBg").show())
                    })
                })
            }
        }
    }(), Souche.Index
}), Souche = window.Souche || {}, Souche.Sidebar = function() {
    $(document).ready(function() {
        $.ajax({
            url: contextPath + "/pages/toolbarAction/selectToolbarCount.json",
            dataType: "json",
            success: function(e) {
                e.dayCarNum * 1 > 0 && ($("#advisor_notice").html(e.dayCarNum).removeClass("hidden"), $("#advisor_count").html(e.dayCarNum), $.cookie("f2e_guwen_close") || $(".my-advisor-tip").removeClass("hidden"))
            }
        }), $(".advisor-tip-close").click(function(e) {
            e.preventDefault(), $(".my-advisor-tip").addClass("hidden"), $("#advisor_notice").addClass("hidden"), $.cookie("f2e_guwen_close", "1", {
                expires: 1
            }), e.stopPropagation()
        });
        var e = !1,
            t = function(t) {
                $(".sidebar .side-box").removeClass("active"), $(t.parentNode).addClass("active"), $("#toolbar").hasClass("sidebar-active") || ($("#toolbar").animate({
                    width: 905,
                    height: $(window).height() - 20 > 500 ? 500 : $(window).height() - 20
                }, 500, function() {
                    e = !0
                }), $(".sidebar  iframe").css({
                    height: ($(window).height() - 20 > 500 ? 500 : $(window).height() - 20) - 32
                }), $("#toolbar").addClass("sidebar-active"), $(".sidebar").removeClass("active")), $(".toolbar-content iframe").attr("src", $(t).attr("href")), $(".toolbar-content .iframe-loading").removeClass("hidden"), $(".toolbar-content iframe").load(function() {
                    $(this).removeClass("hidden"), $(".toolbar-content .iframe-loading").addClass("hidden")
                })
            };
        $(".sidebar").click(function(e) {
            e.stopPropagation()
        }), $(".sidebar .side-trigger").click(function(e) {
            e.preventDefault();
            var n = this;
            $(this).hasClass("contrast-box") ? t(n) : Souche.NoRegLogin.checkLogin(function(e) {
                t(n)
            })
        }), $("#my-advisor").on("mouseenter", function() {
            $("#my-advisor").addClass("active")
        }).mouseleave(function() {
            $("#my-advisor").removeClass("active")
        }), $(".sidebar").on("mouseenter", function() {
            $(".sidebar").hasClass("sidebar-active") || $(".sidebar").addClass("active")
        }).mouseleave(function() {
            $(".sidebar").removeClass("active")
        }), $(".toolbar-close").click(function() {
            $("#toolbar").animate({
                width: 58,
                height: 215
            }, 500, function() {}), $("#toolbar").removeClass("sidebar-active"), e = !1
        }), $(document.body).click(function() {
            e && ($("#toolbar").animate({
                width: 58,
                height: 215
            }, 500, function() {}), $("#toolbar").removeClass("sidebar-active"), e = !1)
        }), $("#noreg-popup").on("click", function(e) {
            e.stopPropagation()
        });
        var n = !1;
        $(window).scroll(function() {
            $(window).scrollTop() > 0 ? $("#toTop").show("slow") : $("#toTop").hide("slow")
        }), $("#toTop").click(function() {
            $("html,body").animate({
                scrollTop: 0
            })
        }), $("#suggest").mouseenter(function() {
            $(".suggest-tag").addClass("suggest-tag-active")
        }).mouseleave(function() {
            $(".suggest-tag").removeClass("suggest-tag-active")
        }), $(".suggest-tag").click(function() {
            $(".suggest-area").val("请填写反馈，我们会重视每一位用户的意见"), $(".suggest-remind").hasClass("hidden") || $(".suggest-remind").addClass("hidden"), $(".suggest-popup").removeClass("hidden"), $(".wrapGrayBg").length ? $(".wrapGrayBg").show() : $('<div class="wrapGrayBg" style="opacity: 0.7; display: block;"></div>').appendTo(document.body).css({
                opacity: .7
            })
        }), $(".suggest-close").click(function() {
            $(".suggest-popup").addClass("hidden"), $(".suggest-result").addClass("hidden"), $(".wrapGrayBg").hide()
        });
        var r = $(".suggest-area").val(),
            i = parseInt($(".suggest-num ins").text());
        $(".suggest-area").focus(function() {
            var e = $(this);
            e.addClass("suggest-area-active"), e.val() == r && e.val("")
        }).blur(function() {
            var e = $(this);
            e.removeClass("suggest-area-active"), e.val() == "" && e.val(r)
        }).keyup(function() {
            $(".suggest-remind").hasClass("hidden") || $(".suggest-remind").addClass("hidden");
            var e = $(this),
                t = e.val().length;
            t > i ? ($(".suggest-num").html("您已超过<ins>" + (t - i) + "</ins>字"), $(".suggest-submit").addClass("hidden"), $(".suggest-no").removeClass("hidden")) : ($(".suggest-num").html("您还可以输入<ins>" + (i - t) + "</ins>字"), $(".suggest-no").addClass("hidden"), $(".suggest-submit").removeClass("hidden"))
        }), $("#J_suggest_form").submit(function(e) {
            e.preventDefault();
            if ($(".suggest-area").val() == "" || $(".suggest-area").val() == $(".suggest-area").attr("default")) {
                $(".suggest-remind").removeClass("hidden");
                return
            }
            $.ajax({
                url: $("#J_suggest_form").action,
                type: "post",
                data: $("#J_suggest_form").serialize(),
                success: function() {
                    $(".suggest-popup").addClass("hidden"), $(".suggest-result").removeClass("hidden")
                }
            })
        })
    })
}(), define("index/sidebar", function() {});