(function (global) { "use strict"; var _Base64 = global.Base64; var version = "2.1.9"; var buffer; if (typeof module !== "undefined" && module.exports) { try { buffer = require("buffer").Buffer } catch (err) { } } var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var b64tab = function (bin) { var t = {}; for (var i = 0, l = bin.length; i < l; i++)t[bin.charAt(i)] = i; return t }(b64chars); var fromCharCode = String.fromCharCode; var cb_utob = function (c) { if (c.length < 2) { var cc = c.charCodeAt(0); return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63) } else { var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320); return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63) } }; var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g; var utob = function (u) { return u.replace(re_utob, cb_utob) }; var cb_encode = function (ccc) { var padlen = [0, 2, 1][ccc.length % 3], ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0), chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)]; return chars.join("") }; var btoa = global.btoa ? function (b) { return global.btoa(b) } : function (b) { return b.replace(/[\s\S]{1,3}/g, cb_encode) }; var _encode = buffer ? function (u) { return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64") } : function (u) { return btoa(utob(u)) }; var encode = function (u, urisafe) { return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) { return m0 == "+" ? "-" : "_" }).replace(/=/g, "") }; var encodeURI = function (u) { return encode(u, true) }; var re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"); var cb_btou = function (cccc) { switch (cccc.length) { case 4: var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536; return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320); case 3: return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2)); default: return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1)) } }; var btou = function (b) { return b.replace(re_btou, cb_btou) }; var cb_decode = function (cccc) { var len = cccc.length, padlen = len % 4, n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0), chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)]; chars.length -= [0, 0, 2, 1][padlen]; return chars.join("") }; var atob = global.atob ? function (a) { return global.atob(a) } : function (a) { return a.replace(/[\s\S]{1,4}/g, cb_decode) }; var _decode = buffer ? function (a) { return (a.constructor === buffer.constructor ? a : new buffer(a, "base64")).toString() } : function (a) { return btou(atob(a)) }; var decode = function (a) { return _decode(String(a).replace(/[-_]/g, function (m0) { return m0 == "-" ? "+" : "/" }).replace(/[^A-Za-z0-9\+\/]/g, "")) }; var noConflict = function () { var Base64 = global.Base64; global.Base64 = _Base64; return Base64 }; global.Base64 = { VERSION: version, atob: atob, btoa: btoa, fromBase64: decode, toBase64: encode, utob: utob, encode: encode, encodeURI: encodeURI, btou: btou, decode: decode, noConflict: noConflict }; if (typeof Object.defineProperty === "function") { var noEnum = function (v) { return { value: v, enumerable: false, writable: true, configurable: true } }; global.Base64.extendString = function () { Object.defineProperty(String.prototype, "fromBase64", noEnum(function () { return decode(this) })); Object.defineProperty(String.prototype, "toBase64", noEnum(function (urisafe) { return encode(this, urisafe) })); Object.defineProperty(String.prototype, "toBase64URI", noEnum(function () { return encode(this, true) })) } } if (global["Meteor"]) { Base64 = global.Base64 } })(this);
var CMBLS = window.CMBLS || {};
Function.prototype.curry = function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
};

// var _baseUrl = "https://log.cmbchina.com/CmbBank_Mobile/Handler/ca.gif?q=";
var _baseUrl = "http://99.12.88.17:80/CmbBank_Mobile/Handler/ca.gif?q=";

var logUtils = {
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
            r = window.location.search.substr(1).match(reg);
        return (r != null) ? unescape(r[2]) : "";
    },
    goUrl: function (url) {
        if (!!url) {
            window.location.href = url;
        }
    },
    addEntryID: function (url, entryid) {
        if (!url || !entryid || "" === entryid) {
            return url;
        }
        if (url.indexOf("behavior_entryid=") > -1) {
            return url;
        }
        if (url.indexOf("?") > -1) {
            return url + "&behavior_entryid=" + entryid;
        } else {
            return url + "?behavior_entryid=" + entryid;
        }
    },
    cloneObj: function (oldObj) { //复制对象方法
        if (typeof (oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = {};
        for (var i in oldObj)
            newObj[i] = this.cloneObj(oldObj[i]);
        return newObj;
    },
    extendObj: function () { //扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = this.cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    }
}

var _client = function () {
    var a = navigator.userAgent.toLowerCase().match(/mpbank\/(\d+\.\d+\.\d+)/);
    if (a) return a[1];
    return "";
}();
//站内外判断
var _isApp = function () {
    var userAgent = navigator.userAgent;
    if (!userAgent)
        return false;
    return !!userAgent.toLowerCase().match(/mpbank\/(\d+\.\d+\.\d+)/);
}();
var _entryId = logUtils.getQueryString("behavior_entryid");
CMBLS.CMBAppLog = {
    defaults: function () {
        return {
            id: "",
            eventId: "",
            behavior: null,
            successfunc: null,
            failfunc: null,
            version: "6.0"
        }
    },
    call: function (_options, _url) {
        var b = logUtils.extendObj({}, CMBLS.CMBAppLog.defaults(), _options);
        try {
            if (typeof b.behavior === 'object') {
                b.behavior = encodeURIComponent(JSON.stringify(b.behavior));
            }
        } catch (e) {
            if (!!_url) { logUtils.goUrl(_url); }
            return;
        }
        CMBLS.CMBAppLog.successfunc = b.successfunc;
        CMBLS.CMBAppLog.failfunc = b.failfunc;
        if (!!_client && _client.substr(0, 1) < 6) {
            logUtils.goUrl(_url);
        }
        else {
            if (window.cmblsExecutor) {
                try {
                    cmblsExecutor.executeCmbls(b.version, "http://cmbls/CMBAppLog?id=" + b.id + "&eventId=" + b.eventId + "&behavior=" + b.behavior);
                    logUtils.goUrl(_url);
                } catch (e) {
                    logUtils.goUrl(_url);
                    return;
                }
            }
            else {
                if (!!_url) {
                    logUtils.goUrl(_url);
                }
                else {
                    document.addEventListener('CMBLSExecutorReady', CMBLS.CMBAppLog.call.curry(_options, _url), false);
                }
            }
        }
    },
    outCall: function (_options, _url) {
        if (!_options || typeof _options !== "object") {
            return;
        }
        try {
            var data = Base64.toBase64(JSON.stringify(_options));
            data = encodeURIComponent(data);
            var img = new Image()
            img.src = _baseUrl + data;
        }
        catch (e) { }
        logUtils.goUrl(_url);
    },
    successCallback: function (id, message) {
        try {
            if ("function" === typeof CMBLS.CMBAppLog.successfunc) {
                CMBLS.CMBAppLog.successfunc.apply(null, [id, message]);
            }
        } catch (e) {
            return;
        }
    },
    failCallback: function (id, message) {
        try {
            if ("function" === typeof CMBLS.CMBAppLog.failfunc)
                CMBLS.CMBAppLog.failfunc.apply(null, [id, message]);
        } catch (e) {
            return;
        }
    }
}

var commonPageLog = {
    //{"PageNo": "PS0", "PageName": "test", "ProdCode":"ns000001", "ErrorCode": ""}
    pageLoadLog: function (behaviorObj) {//加载埋点
        if (!behaviorObj || typeof behaviorObj !== "object") return;
        //参数拼接
        var _behavior = commonPageLog.transParams({
            entryid: _entryId,
            pageno: "",
            pagename: "",
            prodcode: "",
            errorcode: ""
        }, behaviorObj);

        if (!_behavior.pageno) return;//pageno为埋点必备字段

        if (_isApp) {
            CMBLS.CMBAppLog.call({ id: "", eventId: "PageLoad", behavior: commonPageLog.outParamsGenerate(_behavior) });
        }
        else {
            CMBLS.CMBAppLog.outCall({ "EventID": "PageLoad", "Websites": "", "Behavior": commonPageLog.outParamsGenerate(_behavior) });
        }
    },
    pageClickLog: function (behaviorObj, url) {
        if (!behaviorObj || typeof behaviorObj !== "object") {
            logUtils.goUrl(url);
            return;
        }
        var _behavior = commonPageLog.transParams({
            widgetno: "",
            widgetstatus: "",
            prodcode: "",
            clickprodcode: "",
            widgetname: "",
            modulename: ""
        }, behaviorObj);
        if (!_behavior.widgetno) return;//widgetno为埋点必备字段
        if (!!url && url.length > 0) {
            url = logUtils.addEntryID(url, _behavior.widgetno);
        }
        try {
            _behavior = encodeURIComponent(JSON.stringify(_behavior));
        }
        catch (e) {
            logUtils.goUrl(url);
            return;
        }
        if (_isApp) {
            CMBLS.CMBAppLog.call({ id: "", eventId: "ClickUnload", behavior: commonPageLog.outParamsGenerate(_behavior) }, url);
        }
        else {
            CMBLS.CMBAppLog.outCall({ EventID: "ClickUnload", Behavior: commonPageLog.outParamsGenerate(_behavior) }, url);
        }
    },
    outParamsGenerate: function (_behavior) {
        _behavior.corp = logUtils.getQueryString("Corp");//渠道码
        _behavior.recm = logUtils.getQueryString("Recm");//推荐人
        _behavior.bran = logUtils.getQueryString("Bran");//分行
        _behavior.orga = logUtils.getQueryString("Orga");//支行
        _behavior.utm_id = logUtils.getQueryString("utm_id");
        return _behavior;
    },
    transParams: function (_behavior, behaviorObj) {
        var _key = "";
        for (var key in behaviorObj) {
            _key = key.toLocaleLowerCase();
            if (_key !== "entryid") {
                _behavior[_key] = !!behaviorObj[key] ? behaviorObj[key] : "";
            }
        }
        return _behavior;
    }
}



