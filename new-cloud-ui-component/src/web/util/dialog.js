import "./../../plugins/artDialog/dialog-plus-min";
import "./../../plugins/artDialog/ui-dialog.css";
import "./less/dialog.less";
import CONFIG from "./../config";

var export_obj = {
    alert: function (message, ok_function) {
        if (typeof dialog == "function") {
            var d = null;
            try {
                d = ((window.top != window.self) && typeof window.top.dialog == "function") ? window.top.dialog : dialog;
            }
            catch (e) {
                d = dialog;
            }
            new d({
                id: 'artDialog',//防止生成多个实例
                fixed: true,
                title: '',
                content: message,
                okValue: '确定',
                zIndex: 1026,//谷歌下zindex和遮罩层一样，都是默认的1024，所以这里强制设置一个
                ok: function () {
                    if (typeof (ok_function) == "function") {
                        ok_function();
                    }
                }
            }).width(270).showModal();
        }
        else {
            alert(message);
            if (typeof (ok_function) == "function") {
                ok_function();
            }
        }
    },
    confirm: function (message, ok_function, cancle_function) {
        if (typeof dialog == "function") {
            var d = null;
            try {
                d = ((window.top != window.self) && typeof window.top.dialog == "function") ? window.top.dialog : dialog;
            }
            catch (e) {
                d = dialog;
            }
            new d({
                id: 'artDialog',//防止生成多个实例
                fixed: true,
                title: '',
                content: message,
                okValue: '确定',
                cancelValue: '取消',
                zIndex: 1026,//谷歌下zindex和遮罩层一样，都是默认的1024，所以这里强制设置一个
                ok: function () {
                    if (typeof (ok_function) == "function") {
                        ok_function();
                    }
                },
                cancel: function () {
                    if (typeof (cancle_function) == "function") {
                        cancle_function();
                    }
                },
            }).width(270).showModal();
        }
        else {
            if (confirm(message)) {
                if (typeof (ok_function) == "function") {
                    ok_function();
                }
            }
            else {
                if (typeof (cancle_function) == "function") {
                    cancle_function();
                }
            }
        }
    },
    pop: function (url_or_jq_id, title, options) {
        if (options == undefined) {
            options = {};
        }
        var options_default = {
            width: 360,
            height: 360,
            skin: "",
        };
        var now_host = document.location.protocol + "//" + window.location.host;
        //console.log(now_host);
        switch (now_host) {
            case CONFIG.uc:
            case CONFIG.passport:
            case CONFIG.account:
                options_default.skin = "blue";
                break;
            case CONFIG.vip:
            case CONFIG.live:
                options_default.skin = "orange";
                break;
        }
        if (options.skin == "auto") {
            options.skin = options_default.skin;
        }
        options = $.extend({}, options_default, options);
        title = $.trim(title);
        title = (title == "") ? ' ' : title;
        if (url_or_jq_id.startWith("#") || url_or_jq_id.startWith(".")) {
            this.popDiv(url_or_jq_id, title, options);
        }
        else {
            this.popFrame(url_or_jq_id, title, options);
        }
    },
    popFrame: function (iframe_url, title, options) {
        if (typeof dialog == "function") {
            var width = parseInt(options.width);
            var height = parseInt(options.height);
            var content = "<iframe id='pop_iframe' onload='javascript:window.resize_iframe(\"pop_iframe\")' width='" + width + "' height='" + height + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' src='" + iframe_url + "'></iframe>";
            this.popDialogReal(title, content, options.skin);
        }
        else {
            window.open(iframe_url);
        }
    },
    popDiv: function (jq_id, title, options) {
        if (typeof dialog == "function") {
            var content = $(jq_id).clone().html();
            this.popDialogReal(title, content, options.skin);
            //$("#popup_agreement_con").niceScroll("#popup_agreement_text",{cursorcolor:"#9ebff4",boxzoom:true});
        }
        else {
            $(jq_id).css({"position": "absolute"}).show();
        }
    },
    popDialogReal(title, content, skin){
        if (typeof dialog == "function") {
            (skin == undefined) && (skin = "")
            if (skin != "") {
                skin = "dialog-" + skin;
            }
            var d = (window.top && typeof window.top.dialog == "function") ? window.top.dialog : dialog;
            new d({
                id: 'artDialogPop',//防止生成多个实例
                fixed: true,
                title: title,
                skin: skin,
                content: content,
            }).showModal();
        }
    },
};
window.MSG = export_obj;//注册到全局,以便嵌入页面调用
if (typeof dialog == "function") {
    window.dialog = dialog;   //注册到全局,便于iframe调用父对象的artDialog对象~
    // window.alert = function (message) {//改写全局alert
    //     window.MSG.alert(message);
    // }
    window.showLoginDialog = function (ret_url, site_url, skin) {
        //console.log(ret_url,skin);
        //console.log(site_url);
        var iframe_url = CONFIG.passport + "/pop-login.html";
        if (ret_url == undefined || ret_url == "auto") {//不传递此参数,就代表返回当前页面
            ret_url = window.location.href;
        }
        else if (ret_url == "" || ret_url == "uc") {
            ret_url = CONFIG.uc;
        }
        if (site_url == undefined) {
            site_url = "";
        }
        iframe_url += "?siteUrl=" + site_url;
        iframe_url += "&redirectUrl=" + encodeURIComponent(ret_url);
        (skin == undefined) & (skin = "auto")
        //console.log(ret_url,skin);
        //为验证码流出位置，多增加了点高度
        window.MSG.pop(iframe_url, "会员登录", {"width": 410, "height": 400, skin: skin});
    };
    $(".sys_btn_login").click(function () {
        if ($(this).data("d")) {
            showLoginDialog("auto", $(this).data("d"));
        }
        else {
            showLoginDialog();
        }
    });
}
window.resize_iframe = function (iframe_id) {
    try {
        var ifm = document.getElementById(iframe_id);
        var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
        if (ifm != null && subWeb != null) {
            var w = subWeb.body.scrollWidth;
            var h = subWeb.body.scrollHeight;
            var real_container = $(subWeb.body).find(".pop_container");
            //console.log(real_container);
            if (real_container.length > 0) {
                //alert(real_container.css("border-width"));
                w = real_container.outerWidth();
                h = real_container.outerHeight();
            }
            ifm.width = w;
            ifm.height = h;
            var title = $.trim($(subWeb.head).find("title").text());
            //$("#" + iframe_id).closest(".ui-dialog-title").text(title);
            $(".ui-dialog .ui-dialog-title").text(title);
        }
    }
    catch (e) {

    }
}
$(function () {
    $("a.pop_win").each(function () {
        var iframe_url = $(this).attr("href");
        $(this).attr("href", "javascript:void(0)").attr("target", "_SELF").click(function () {
            var title = $.trim($(this).attr("title"));
            if (title == "") {
                title = $.trim($(this).attr("alt"));
            }
            var options = {
                "width": $(this).data("width"),
                "height": $(this).data("height"),
                "skin": $(this).data("skin"),
            };
            window.MSG.pop(iframe_url, title, options);
        });
    });
    $(window).on("pop_resize", function () {
        //console.log("pop_resize");
        window.resize_iframe("pop_iframe");
    });
    window.pop_resize = function () {
        $(window).trigger("pop_resize");
    };
});
export default export_obj;
