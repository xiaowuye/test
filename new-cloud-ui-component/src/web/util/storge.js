import Util from './util';
export default {
    set: function (key, value) {
        if (window.localStorage) {
            localStorage.setItem(key, value);
        } else {
            this.setCookie(key, value, 1);
        }
    },
    get: function (key) {
        var ret = "";
        if (window.localStorage) {
            ret = localStorage.getItem(key);
        } else {
            ret = this.getCookie(key);
        }
        if (ret == null) {
            ret = "";
        }
        return ret;
    },
    getDomain: function (domain) {
        var sdomain = document.domain;
        var domainStr = sdomain.split('.');
        var domains = "";
        if (domain == undefined) {
            if (Util.isIp(sdomain)) {
                domains = sdomain;
            } else if (domainStr.length >= 2) {
                domains = '.' + domainStr[domainStr.length - 2] + '.' + domainStr[domainStr.length - 1];
            }
        }
        return domains;
    },

    getExpiresString: function(time) {
        if (!!!time) return "";

        if (typeof time === 'number') {
            var t = new Date();
            t.setDate(t.getDate() + time);
            return "; expires="+t.toUTCString();
        }
        return "; expires="+time;
    },

    setCookie: function (name, value, time, domain) {
        domain = this.getDomain(domain);
        document.cookie = name + "=" + value + "; domain=" + domain + "; path=/" + this.getExpiresString(time);
    },

    getCookie: function (name) {
        var cookie = document.cookie;
        var arr = cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            var nameArr = arr[i].split("=");
            if (nameArr[0] == name) {
                return nameArr[1];
            }
        }
        return null;
    },

    delCookie: function (name, domain) {
        var cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + this.getExpiresString(-1) + ";domain=" + this.getDomain(domain);
        }
    },
}
