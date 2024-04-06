// 从url里解析一些信息
var urlInfo = {};
(function getUrlInfo() {
    var lowerUrl = window.location.href.toLowerCase();
    // 获取页面组编号
    var pgnPattern = /\/\d{15}\//
    var pgnStart = lowerUrl.search(pgnPattern);
    urlInfo.pageGroupNo = window.location.href.substr(pgnStart + 1, 15);
    // 获取文件名
    var flnPattern = /\.html/
    var flnEnd = lowerUrl.search(flnPattern);
    var flnStart = flnEnd;
    for (var i = flnEnd; i >= 0; i--) {
        if (window.location.href[i] == "/") {
            flnStart = i;
            break;
        }
    }
    urlInfo.filename = window.location.href.substring(flnStart + 1, flnEnd);
    // 获取queryString
    urlInfo.queryString = window.location.search.substr(1);
    // 获取页面状态
    urlInfo.status = lowerUrl.indexOf("/online/") > -1 ? "online" : "preview";
})();

var pageLog = {
    logUtils: {
        getUrlKey: function (params, name) {
            var paramsArr = params.split("&");
            var tmpParam = "";
            name = name.toLocaleLowerCase();
            for (var i = 0; i < paramsArr.length; i++) {
                tmpParam = paramsArr[i].toLocaleLowerCase();
                if (tmpParam.indexOf(name) > -1) {
                    return paramsArr[i].split("=")[1];
                }
            }
            return "";
        },
        // 如果跳转的是中间页，返回跳转的页面组id和页面文件名
        getMPageCode: function (url) {
            if (!!url) {
                url = url.toLocaleLowerCase();
                var mPageObj = {};
                if (url.indexOf("market.cmbchina.com/mpage/online/") > -1) {
                    url = url.split("market.cmbchina.com/mpage/online/")[1];
                    var urlGaps = url.split("/");
                    if (urlGaps.length >= 2) {
                        mPageObj.clickmpagecode = urlGaps[0];
                        mPageObj.clickmpagename = urlGaps[urlGaps.length - 1].split(".")[0];
                        if (!mPageObj.clickmpagename) {
                            mPageObj.clickmpagename = "magicshow";
                        }
                    }
                }
                return mPageObj;
            }
            return {};
        },
        // 如果跳转的是活动平台，返回跳转的活动ID
        getActPrdCode: function (url) {
            if (!!url) {
                var tmpurl = url.toLocaleLowerCase();
                if (!!tmpurl) {
                    if (tmpurl.indexOf("http://cmbt.cn/qqmnzr?") > -1) {
                        return url.split('?')[1];
                    }
                    if (tmpurl.indexOf("funcid=16335001") > -1 || tmpurl.indexOf("act.cmbchina.com/actshipmobile/") > -1) {
                        return getUrlKey(url.split("?")[1], "actgroupid");
                    }
                }
            }
            return "";
        }
    },
    onPageLoadLog: function () {
        var logParams = {}
        if (_isApp) {
            logParams = {
                PageNo: "ZJY",
                MPageCode: urlInfo.pageGroupNo,
                MPageName: urlInfo.filename,
                PageName: "中间页默认埋点（站内）"
            }
        } else {
            logParams = {
                PageNo: "ZJZ",
                MPageCode: urlInfo.pageGroupNo,
                MPageName: urlInfo.filename,
                PageName: "中间页默认埋点（站外）"
            }
        }
        commonPageLog.pageLoadLog(logParams);
    },
    onClickLog: function (event, target) {
        if (typeof target === "undefined" || target === null || target === undefined) { return; }
        if (typeof event !== "undefined" && event !== null && event !== undefined) {
            event.preventDefault();
            event.stopPropagation();
        }
        var attrbutes = {
            url: target.getAttribute("url"),
            way: target.getAttribute("way"),
            widgetName: target.getAttribute("widgetName"),
            moduleName: target.getAttribute("moduleName"),
            widgetNo: target.getAttribute("widgetNo"),
            widgetNoForOut: target.getAttribute("widgetNoForOut")
        }
        var mPageObj = pageLog.logUtils.getMPageCode(attrbutes.url);
        var actPrdCode = pageLog.logUtils.getActPrdCode(attrbutes.url);
        var logParams = {};
        logParams = {
            WidgetName: attrbutes.widgetName,
            MpageCode: urlInfo.pageGroupNo,
            MPageName: urlInfo.filename,
            ModuleName: attrbutes.moduleName,
            WidgetNo: _isApp ? attrbutes.widgetNo : attrbutes.widgetNoForOut
        }
        if (!!mPageObj && !!mPageObj.clickmpagecode && !!mPageObj.clickmpagename) {
            logParams.clickmpagecode = mPageObj.clickmpagecode;
            logParams.clickmpagename = mPageObj.clickmpagename;
        }
        if (!!actPrdCode) {
            logParams.clickprodcode = actPrdCode;
        }
        if (!!attrbutes.url) {
            var url = attrbutes.url;
            if (!!attrbutes.way && attrbutes.way === "0" && !_isApp) {
                url = shortUrl + "?status=" + urlInfo.status + "&pagegroupno=" + urlInfo.pageGroupNo + "&filename=" + urlInfo.filename + ".html";
                if (!!urlInfo.queryString) {
                    url += "&querystring=" + encodeURIComponent(urlInfo.queryString);
                }
            }
            commonPageLog.pageClickLog(logParams, url);
        } else {
            commonPageLog.pageClickLog(logParams);
        }
    }
}