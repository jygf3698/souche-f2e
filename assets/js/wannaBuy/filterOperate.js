// 筛选条件的 保存和移除
define(function(){

    // 保存筛选条件 到个人数据中
    // 如果没有login, 先填写手机号再发送请求
    $(".choose_save").click(function(e) {
        var self = this;
        Souche.NoRegLogin.checkLogin(function(isLogin) {
            $(".historyRecord").removeClass("hidden");

            var chooseValue = $(".choose_save").attr("");
            var queryName = $(".choose_save").attr("queryname");
            var queryParams = $(".choose_save").attr("queryparams");
            var url = '/pages/onsale/sale_car_list.html' + '?' + queryParams;

            var self = {
                queryName: queryName,
                queryParams: queryParams,
                url: url,
                event:e
            };

            $.ajax({
                url : '/pages/saleDetailAction/saveSearchResult.json',
                type : 'POST',
                data : {
                    queryName : queryName,
                    queryParams : queryParams
                },
                dataType : 'json',
                context : self
            }).done(function(data) {
                var id = data.id;
                if(id) {
                    var template = "<li><a class=\"content \"  href=\"" + this.url + "\" title=\""+this.queryName+"\">" + this.queryName + "</a><a delid=\"" + id + "\" class=\"close \">x<\/a><\/li>";
                    if($(".historyRecord_content ul li").length==0)
                    {
                        $(".historyRecord_content ul").append($(template));
                    }
                    else
                    {
                        $(template).insertBefore($(".historyRecord_content ul li").eq(0));
                    }
                    $(".choose_saved").removeClass("hidden");
                    window.setTimeout(function()
                    {
                        $(".choose_saved").addClass("hidden");
                    },2000);
                    $(".choose_save").addClass("hidden");
                }
                else
                {
                    var top = $(".choose_save ").offset().top;
                    var left = $(".choose_save ").offset().left;
                                        
                    $(".choose_saved").removeClass("hidden");
                    window.setTimeout(function()
                    {
                        $(".choose_saved").addClass("hidden");
                    },2000);
                    $(".choose_save").addClass("hidden");
                }
            });
        })
        return false;
    });

    // 删除保存的筛选条件
    $(".historyRecord_content ul li .close").live("click", function() {
        var chooseValueID = $(this).attr("delid");
        var self = this;

        $.ajax({
            url : '/pages/saleDetailAction/delSearchResult.json',
            type : 'POST',
            data : {
                id : chooseValueID
            },
            context : self
        }).done(function(data) {
            $(this).parent().remove();
        });

        return false;
    });

    function init(){

    }

    return {
        init: init
    };

})