/*
 通用的http组件
 author: wangbicheng/80234525
*/
function CmbHttp() {
    this.METHOD_POST = "POST";
    this.METHOD_GET = "GET";
    this.httpGet = function (options) {
        if (typeof options === 'object') {
            var method = this.METHOD_GET;
            var url = this.getOrDefault(options, "url", "");
            if (!url) {
                throw new Error("url must be not empty");
            }
            var async = this.getOrDefault(options, "async", true);
            var header = this.getOrDefault(options, "header", {
            });
            var body = this.getOrDefault(options, "body", null);
            var success = this.getOrDefault(options, "success", null);
            var error = this.getOrDefault(options, "error", null);
            var complete = this.getOrDefault(options, "complete", null);
            this.httpRequest(method, url, async, header, body, success, error, complete);
        }
    };
    this.httpPost = function (options) {
        if (typeof options === 'object') {
            var method = this.METHOD_POST;
            var url = this.getOrDefault(options, "url", "");
            if (!url) {
                throw new Error("url must be not empty");
            }
            var async = this.getOrDefault(options, "async", true);
            var header = this.getOrDefault(options, "header", {
            });
            var body = this.getOrDefault(options, "body", null);
            var success = this.getOrDefault(options, "success", null);
            var error = this.getOrDefault(options, "error", null);
            var complete = this.getOrDefault(options, "complete", null);
            this.httpRequest(method, url, async, header, body, success, error, complete);
        }
    };
    this.getOrDefault = function (object, key, defaultValue) {
        return typeof object[key] !== 'undefined' && !!object[key] ? object[key] : defaultValue;
    };
    this.httpRequest = function (method, url, async, header, body, success, error, complete) {
        var xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp !== null) {
            xmlhttp.onreadystatechange = function () {
                try {
                    if (xmlhttp.readyState === 4 && typeof success === 'function') {
                        var response = xmlhttp.responseText;
                        try {
                            response = JSON.parse(response);
                        }
                        catch (e) {
                        }
                        success({
                            status: xmlhttp.status,
                            data: response
                        });
                    }
                }
                catch (e) {
                    if (typeof error === 'function') {
                        error(e);
                    }
                }
                finally {
                    if (typeof complete === 'function') {
                        complete();
                    }
                }
            };
            // set method get query params 
            if (method === this.METHOD_GET) {
                if (url.indexOf("?") < 0) {
                    var str = this.getQueryParamsString(body);
                    if (!!str) {
                        url += "?" + str;
                    }
                }
            }
            xmlhttp.open(method, url, async);
            // set header
            if (typeof header === 'object') {
                for (const key in header) {
                    if (header.hasOwnProperty(key)) {
                        const element = header[key];
                        if (typeof key === 'string' && typeof element === 'string') {
                            xmlhttp.setRequestHeader(key, element);
                        }
                    }
                }
            }
            // set body
            var data = null;
            if (method === this.METHOD_POST) {
                if (typeof body === 'object') {
                    data = JSON.stringify(body);
                }
                if (typeof body === 'string') {
                    data = body;
                }
            }
            xmlhttp.send(data);
        }
    };
    this.getQueryParamsString = function (body) {
        var queryParamsString = "";
        if (typeof body === 'object') {
            var queryParams = [];
            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    const element = body[key];
                    queryParams.push(key + "=" + element);
                }
            }
            if (queryParams.length > 0) {
                queryParamsString = queryParams.join("&");
            }
        }
        return queryParamsString;
    };

    this.jsonp = function (url, data, success, error, complete) {
        var script = document.createElement("script");
        var str = this.getQueryParamsString(data);
        if (!!str) { url += "?" + str + "&callback=success"; } else { url += "?callback=success"; }
        script.setAttribute("src", url);
        document.querySelector("head").appendChild(script);
    }
}
window.cmbhttp = new CmbHttp();

/*
 通用的loading组件
 author: wangbicheng/80234525
*/
function CmbLoading() {
    this.init = function () {
        var style = `
        .cmb-loading-body {
            overflow: hidden;
        }
        .cmb-loading-hide {
            display: none;
        }
        .cmb-loading-container {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 9999;
            background: #ffffff;
            overflow: hidden;
        }
        .cmb-loading-container-hide {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 9999;
            background: #ffffff;
            animation: cmb-loading-hide 0.3s ease-in-out 1;
            -webkit-animation: cmb-loading-hide 0.3s ease-in-out 1;
        }
        .cmb-loading-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .cmb-loading-progress {
            display: inline-block;
            width: 100%;
            position: relative;
        }
        .cmb-loading-outer {
            display: inline-block;
            width: 100%;
            margin-right: 0;
            padding-right: 0;
        }
        .cmb-loading-inner {
            display: inline-block;
            width: 100%;
            background-color: #f3f3f3;
            border-radius: 100px;
            vertical-align: middle;
            position: relative;
            margin-top: 12px;
        }
        .cmb-loading-img {
            width: 150px;
            height: 150px;
        }
        .cmb-loading-text {
            text-align: center;
            font-size: 14px;
            margin-top: 16px;
        }
        .cmb-loading-bg {
            border-radius: 100px;
            background-color: #ff3502;
            transition: all .1s ease-in-out;
            position: relative;
            height: 3px;
            width: 0%;
        }
        .cmb-loading-active:before {
            content: "";
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
            border-radius: 10px;
            animation: cmb-loading-active 1.2s ease-in-out infinite;
            -webkit-animation: cmb-loading-active 1.2s ease-in-out infinite;
        }
        @keyframes cmb-loading-active {
            0% {
                opacity: .5;
                width: 0;
            }
    
            100% {
                opacity: .1;
                width: 100%;
            }
        }
        .cmb-loading-text-wrap {
            width: 90px;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
        @keyframes cmb-loading-show {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 0.75;
            }
            75% {
                opacity: 0.9;
            }
            100% {
                opacity: 1;
            }
        }
        @keyframes cmb-loading-hide {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.25;
            }
            75% {
                opacity: 0.1;
            }
            100% {
                opacity: 0;
            }
        }
        `
        // 提示图节点
        var cmbLoadingImg = document.createElement("img");
        cmbLoadingImg.setAttribute("class", "cmb-loading-img");
        var imgSrc = "data:image/gif;base64,R0lGODlhkAGQAffsAPlMSfrtzfh9cbOVlflWUPhgWvk8O1tKSv7Ppvk/Pvh4bfuopv+dpviFefzr6/iBdfhyaflcVv75+flIRflZVPN7cfuZmMa2tv/AxdXJyfh0avzi4feGef3PdPvz4/leWPvb2/lEQm9TUvj19f7+/vlXUvzZi/zT0vh2bPhoYPhmXviJfPiNf/zjsPzLy/+8wfhwZvhrYvlQTLMVFfhkXPeKfPqinPyfErulpfiCdvlSTviAdPlCQPu+uf3KTPiSg//8/Ovl5ffz88OPj/htZIZ2dvhiW/r4+Pu1svh5bsYtK5eMjPiPgfq5tf2sMfqTi/qwqv7NVPhuZfrQzfh6cPllY/lUT/d1a/eMfvvKxf/19flGRP/Fyv/57+Hb24lTUPiLff10bf7x8fuMif22TKpaVvluZvuEgveOgPeHeviIe/vY1v2jHXplZflua//N0fjw7/p9e/p1cvh+cvro5udrYt5IQ/lLR/6rsfDs7P+0uvljX9NhW+VjXOmwtPhrYf1wafhPS/1sZf6+ZvzdnP/V2fiEd/nFwPmakP7e3/j17f2UKfxnYfpqZvqBfv3Ewfl5dZt2d//m5/iDefhnX/nHxP/39+9tZPlybvqTkeCqru92a/x6RO9kXfiGffzCvvnBv/zHxP2BTPxqY/13cf1ya//z8/K5vv7u7vtgXP1/evNXUf2FgPlXVfyCffFTTvlOSvC1uviCdetOSdGeotNnYP15c/hxZ8BdWP/08/mAd/lTT//8+Pd9eNSGhKmChPmHhPpraOGBfflnZNE8OPyPjvpQT/lRTfh2cf/9/PhsZt5cVPtkXfn5+fhlXft8d/tsZPxuaPpjYf39/flST/z8/Pv7+/r6+v38/Pv6+v/6+v/9/fh/c/ljXPpbWPhfWPtuZvPe3vhpYf3QYfuIhviXiv////j4+NJXUuZ7deaPi/DR0/hsYflSTP5mXlBAQPz///ZcVv9zavxdV/5jXPpnX/1ZUvyHe/39/vz9/fTIzP3DNPSPifPDwP9tZQAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZEMjMwN0FDREY0QTExRTg4NThEOTQ5QTZGRTcxNzhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZEMjMwN0FEREY0QTExRTg4NThEOTQ5QTZGRTcxNzhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkQyMzA3QUFERjRBMTFFODg1OEQ5NDlBNkZFNzE3OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkQyMzA3QUJERjRBMTFFODg1OEQ5NDlBNkZFNzE3OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0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"
        cmbLoadingImg.setAttribute("src", imgSrc);
        // 进度提示文字节点
        var cmbLoadingTextWrap = document.createElement("div");
        cmbLoadingTextWrap.setAttribute("class", "cmb-loading-text-wrap");
        this.cmbLoadingText = document.createElement("div");
        this.cmbLoadingText.setAttribute("class", "cmb-loading-text");
        this.cmbLoadingText.innerHTML = "正在加载中...";
        cmbLoadingTextWrap.appendChild(this.cmbLoadingText);
        // 进度条节点
        var cmbLoadingProgress = document.createElement("div");
        cmbLoadingProgress.setAttribute("class", "cmb-loading-progress");
        var cmbLoadingInner = document.createElement("div");
        cmbLoadingInner.setAttribute("class", "cmb-loading-inner");
        this.cmbLoadingBg = document.createElement("div");
        this.cmbLoadingBg.setAttribute("class", "cmb-loading-bg cmb-loading-active");
        cmbLoadingInner.appendChild(this.cmbLoadingBg);
        cmbLoadingProgress.appendChild(cmbLoadingInner);
        // content节点
        var cmbLoadingContent = document.createElement("div");
        cmbLoadingContent.setAttribute("class", "cmb-loading-content");
        cmbLoadingContent.appendChild(cmbLoadingImg);
        cmbLoadingContent.appendChild(cmbLoadingTextWrap);
        cmbLoadingContent.appendChild(cmbLoadingProgress);
        // 根节点
        this.cmbLoadingContainer = document.createElement("div");
        this.cmbLoadingContainer.setAttribute("class", "cmb-loading-container-hide");
        this.cmbLoadingContainer.appendChild(cmbLoadingContent);
        // 添加到body
        document.body.appendChild(this.cmbLoadingContainer);
        // 添加样式
        var styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        document.head.appendChild(styleElement);
        // 展示
        this.cmbLoadingContainer.setAttribute("class", "cmb-loading-container");
        // 暂时禁止body滑动
        document.body.setAttribute("style", "overflow: hidden");

        this.progressVal = 0;
        var that = this;
        var pointList = ["."];
        var loadingTextInterval = setInterval(function () {
            if (pointList.length <= 2) {
                pointList.push(".");
                that.cmbLoadingText.innerHTML = "正在加载中" + pointList.join("");
            } else {
                pointList = ["."];
                that.cmbLoadingText.innerHTML = "正在加载中" + pointList.join("");
            }
            if (this.progressVal >= 100) {
                clearInterval(loadingTextInterval);
                that.cmbLoadingText.innerHTML = "正在加载中..."
            }
        }, 500);
    }

    this.hide = function () {
        this.cmbLoadingContainer.setAttribute("class", "cmb-loading-container-hide");
        var that = this;
        setTimeout(function () {
            that.cmbLoadingContainer.setAttribute("class", "cmb-loading-container-hide cmb-loading-hide");
            // 解除禁止body滑动
            document.body.setAttribute("style", "");
        }, 300);
    }

    this.show = function () {
        this.cmbLoadingContainer.setAttribute("class", "cmb-loading-container");
    }

    this.progress = function (progressVal) {
        this.progressVal = progressVal;
        if (this.progressVal < 100) {
            this.cmbLoadingBg.setAttribute("style", "width: " + this.progressVal + "%");
        } else if (this.progressVal >= 100) {
            this.cmbLoadingBg.setAttribute("style", "width: 100%");
            this.cmbLoadingBg.setAttribute("class", "cmb-loading-bg");
        } else {
            this.cmbLoadingBg.setAttribute("style", "width: " + 0 + "%");
        }
    }

    this.progressTo = function (maxVal) {
        var interval;
        if (this.progressVal < maxVal) {
            var that = this;
            interval = setInterval(function () {
                that.progressVal = that.progressVal + 10;
                if (that.progressVal >= maxVal) {
                    try {
                        clearInterval(interval);
                    } catch (e) { }
                } else {
                    that.progress(that.progressVal);
                }
            }, 50);
        } else {
            try {
                clearInterval(interval);
            } catch (e) { }
        }
    }
}

/* 
从url里解析一些信息
Author: wangbicheng/80234525 
*/
var urlInfo = urlInfo || {};
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

(function initRedirect() {
    if (typeof isRedirect !== 'undefined' && !!isRedirect && isRedirect === 'True') {
        var cmbLoading = new CmbLoading();
        cmbLoading.init();
        cmbLoading.progressTo(80);
        if (urlInfo.status === 'online') {
            cmbhttp.httpGet({
                async: false,
                url: bffUrl + "/redirect/getOnlineRedirectUrl",
                body: {
                    "pageGroupNo": urlInfo.pageGroupNo
                },
                success: function (response) {
                    if (response.status === 200) {
                        if (response.data.data.needRedirect) {
                            setTimeout(function () {
                                cmbLoading.progress(100);
                            }, 350);
                            setTimeout(function () {
                                location.href = response.data.data.redirectUrl;
                            }, 500);
                        } else {
                            setTimeout(function () {
                                cmbLoading.progress(100);
                            }, 350);
                            setTimeout(function () {
                                cmbLoading.hide();
                            }, 500);
                        }
                    }
                },
                error: function (error) {
                    setTimeout(function () {
                        cmbLoading.progress(100);
                    }, 350);
                    setTimeout(function () {
                        cmbLoading.hide();
                    }, 500);
                },
                complete: function () {
                }
            });
        } else if (urlInfo.status === 'preview') {
            // 预览状态接口 需要区分是否镜像
            var isMirror = urlInfo.filename.toLowerCase().indexOf("mirror") > -1;
            cmbhttp.httpGet({
                async: false,
                url: bffUrl + "/redirect/getPreviewRedirectUrl",
                body: {
                    "pageGroupNo": urlInfo.pageGroupNo,
                    "isMirror": isMirror
                },
                success: function (response) {
                    if (response.status === 200) {
                        if (response.data.data.needRedirect) {
                            setTimeout(function () {
                                cmbLoading.progress(100);
                            }, 350);
                            setTimeout(function () {
                                location.href = response.data.data.redirectUrl;
                            }, 500);
                        } else {
                            setTimeout(function () {
                                cmbLoading.progress(100);
                            }, 350);
                            setTimeout(function () {
                                cmbLoading.hide();
                            }, 500);
                        }
                    }
                },
                error: function (error) {
                    setTimeout(function () {
                        cmbLoading.progress(100);
                    }, 350);
                    setTimeout(function () {
                        cmbLoading.hide();
                    }, 500);
                },
                complete: function () {
                }
            });
        }
    }
})();



