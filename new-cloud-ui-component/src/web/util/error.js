import MSG from "./dialog";
import Util from "./util";
import Storge from "./storge";
import "./less/error.less";

var Error = {
    tip: function (message, obj_id) {
        this.show(message, obj_id, "tip");
    },
    show: function (message, obj_id, type) {
        if (obj_id == undefined) {
            MSG.alert(message);
            return;
        }
        var obj = $("#" + obj_id);
        (type == undefined) && (type = "error")
        if (obj.length > 0) {
            //obj[0].focus();
            if (type == "error") {
                //obj.css('background','red');
                var border_w = parseInt(obj.css("border-right-width"));
                if (border_w == 0) {
                    //自己的边框隐藏了，所以是加边框的情况
                    //obj.parents(".center_login_num").css("border", "1px solid red");
                    obj.parents(".center_login_num").removeClass("input_hover").removeClass("input_normal").addClass("input_error");
                }
                else {
                    //自己的边框没隐藏，那就是真的喽~
                    //obj.css("border", "1px solid red");
                    obj.removeClass("input_hover").removeClass("input_normal").addClass("input_error");
                }
            }
        }
        var err_id = obj_id + "_err";
        var obj_err = $("#" + err_id);
        if (obj_err.length > 0) {
            obj_err.html(message).show();
            obj_err.removeClass("message_error");
            obj_err.removeClass("message_tip");
            if (type == "error") {
                //error
                obj_err.addClass("message_error");
            }
            else {
                //tip
                obj_err.addClass("message_tip");
            }
        }
        else if ($(".new_message_error").length > 0) {
            $(".new_message_error").html(message).show();
        }
        else {
            if (obj.length > 0) {
                //当由focus事件触发的时候，这里可能会有问题，慎用...
                new dialog({
                    content: message,
                    quickClose: true// 点击空白处快速关闭
                }).show(document.getElementById(obj_id));
            }
            else {
                MSG.alert(message);
            }
        }
    },
    hide: function (obj_id) {
        var err_id = obj_id + "_err";
        if ($("#" + err_id).length > 0) {
            $("#" + err_id).html("").hide();
        }
        if ($("#" + obj_id).length > 0) {
            var obj = $("#" + obj_id);
            var border_w = parseInt(obj.css("border-right-width"));
            if (border_w == 0) {
                //自己的边框隐藏了，所以是加边框的情况
                obj.parents(".center_login_num").removeClass("input_error").addClass("input_normal");
            }
            else {
                //自己的边框没隐藏，那就是真的喽~
                obj.removeClass("input_error").addClass("input_normal");
            }
        }
    }
};
export default Error;

