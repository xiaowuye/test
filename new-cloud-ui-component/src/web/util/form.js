import Error from './error';
import Util from './util';
export default {
    getVal: function (input_id) {
        var _val = $.trim($("#" + input_id).val());
        var _placeholder = $.trim($("#" + input_id).attr("placeholder"));
        (_val == _placeholder) && (_val = "");
        return _val;
    },
    checkNull: function (input_id) {
        var _val = this.getVal(input_id);
        var _name = $.trim($("#" + input_id).attr("placeholder"));
        if (_name == "" || _name == undefined) {
            _name = input_id;
        }
        if (_val == "") {
            Error.show("请输入" + _name, input_id);
            return false;
        }
        return _val;
    },
    checkMobile: function (mobile_id) {
        var mobile = this.checkNull(mobile_id);
        if (mobile) {
            var mob = mobile.replace(/\s/g, "");
            if (!Util.isMobile(mob)) {
                Error.show("手机号格式不正确", mobile_id);
                return false;
            }
            else {
                Error.hide(mobile_id);
            }
        }
        return mobile;
    },
};
