import CONFIG from './../config';
import Storge from './storge';
import Error from './error';
import './../../common/Prototype';

export default {
    //手机格式函数
    mobileSpace: function (obj) {
        var value = obj.value;
        value = value.replace(/\s*/g, "");
        var result = [];
        for (var i = 0; i < value.length; i++) {
            if (i == 3 || i == 7) {
                result.push(" " + value.charAt(i));
            } else {
                result.push(value.charAt(i));
            }
        }
        obj.value = result.join("").substr(0, 13);
    },
    isMobile: function (mobile) {
        var mynospace = mobile.replace(/\s/g, "");
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(mynospace);
    },
    // 判断IP地址
    isIp: function (ip) {
        var ipNumber = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
        if (!ipNumber.test(ip)) {
            return false;
        }
        return true;
    },
    //是否为email
    isEmail: function (email) {
        var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (!pattern.test(email)) {
            return false;
        }
        return true;
    },
    // 短信验证码
    isSmsCaptcha: function (sms) {
        var smsnumber = /^\d{6}$/;
        if (!smsnumber.test(sms)) {
            return false;
        }
        return true;
    },
    //是否为中文名字
    isChinese: function (china) {
        var chineseName = /(^[\u4e00-\u9fa5]+)([.·]{0,1})([\u4e00-\u9fa5]+)$/;
        if (!chineseName.test(china)) {
            return false;
        }
        return true;
    },
    //是否为用户名称
    isNickname: function (nickname) {
        var text = /^((?!\d{5})[\u4E00-\u9FBF(.|·)|0-9A-Za-z_]){2,11}$/;
        if (!text.test(nickname) || !nickname.replace(/[^0-9]/g, "").length > 4) {
            return false;
        }
        return true;
    },
    //是否为密码
    isPassword: function (password) {
        var passwordNumber = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
        if (!passwordNumber.test(password)) {
            return false;
        }
        return true;
    },
    //是否为身份证
    isEntificationCard: function (idcard) {
        var identificationCard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
        if (!identificationCard.test(idcard)) {
            return false;
        }
        return true;
    },
    //取地址栏后面的参数
    getQueryStringArgs: function (key) {
        // 获取查询字符串参数，去除该字符串问号开关符号
        var qs = location.search.length > 0 ? location.search.substring(1) : "",
            args = {},//存放所有查询字符串参数对
            items = qs.split("&"),
            len = items.length,
            name = null,
            value = null;
        if (qs.length == 0) {
            return (key == undefined) ? [] : "";
        }
        for (var i = 0; i < len; i++) {
            var item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            args[name] = value;
        }
        if (key == undefined) {
            return args;
        }
        var ret = args[key];
        ret = (ret == undefined) ? "" : ret;
        return ret;
    },
    getRedirectUrl(){
        var next_url = this.getQueryStringArgs("redirectUrl");
        if (next_url != undefined) {
            if ((next_url.indexOf("login.html") >= 0) || (next_url.indexOf("exception.html") >= 0) || (next_url.indexOf("denied.html") >= 0)) {
                return "";
            }
            next_url = decodeURIComponent(next_url);
            if (next_url.startWith("http")) {
                var my_host = window.location.hostname;
                var next_url_parse = this.parseURL(next_url);
                var next_host = next_url_parse.hostname;
                if (my_host == next_host) {
                    return next_url;
                }
                else {
                    var my_host_arr = my_host.split(".");
                    var next_host_arr = next_host.split(".");
                    if (my_host_arr.length >= 3 && next_host_arr.length >= 3) {
                        var flag_1 = (my_host_arr[my_host_arr.length - 1] == next_host_arr[next_host_arr.length - 1]);
                        var flag_2 = (my_host_arr[my_host_arr.length - 2] == next_host_arr[next_host_arr.length - 2]);
                        if (flag_1 && flag_2) {
                            return next_url;
                        }
                        return "";
                    }
                    else {
                        return "";
                    }
                }
            }
        }
        return next_url;
    },
    goUrl: function (url) {
        if (window.top != window.self) {
            window.top.location.href = url;
        }
        else {
            var flag = false;
            if (url.startWith("http")) {
                flag = (window.location.href == url) ? true : false;
            }
            else {
                flag = ((window.location.pathname + window.location.hash) == url) ? true : false;
            }
            if (flag) {
                window.location.reload();
            }
            else {
                window.location.href = url;
            }
        }
    },
    //邮箱加*号
    maskEmail: function (email) {
        var reg = /(.{2}).+(.{2}@.+)/g;
        var emailNumber = email.replace(reg, "$1****$2");
        return emailNumber;
    },
    //下列函数用于外域配置pop参数。
    getLoadUrl: function () {
        //获取加载iframe的父页面的地址
        var vrl = "";
        if (window.top != window.self) {
            try {
                vrl = window.top.location.href;
            }
            catch (ex) {

            }
        }
        return vrl;
    },
    setDomainRoot: function () {
        var _domain = document.domain.toLowerCase();
        if (!this.isIp(_domain)) {
            //目前仅仅识别了".com.cn"的情况哦~ 其他的双数域名根可能会出问题哦~
            if (_domain.endWith(".com.cn")) {
                _domain = _domain.split('.').slice(-3).join('.');
            }
            else {
                _domain = _domain.split('.').slice(-2).join('.');
            }
            //为跨域做的准备
            try {
                document.domain = _domain;
            }
            catch (ex) {

            }
        }
    },
    popGetDiyConfig: function () {
        var config = undefined;
        if (window.top != window.self) {
            try {
                config = window.top.PopConfig;
            }
            catch (ex) {

            }
        }
        return config;
    },
    isContent:function(contentStr){
        if(contentStr == ''){
            return false;
        }
        return true;
    }
};
