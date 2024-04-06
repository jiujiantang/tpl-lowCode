(function (doc, win) {
  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if(clientWidth > 800) clientWidth=800;
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  recalc();

  function initShare(_url) {
    window.shareConfig = {
      link: _url,
      title: "招行企业明星",
      desc: "好礼送不停，优质企业专享",
      img_url: "http://newgametest.weijuju.com/res/moxiu/Template/mobile/star/images/icon.png",// TODO 配置微信图文分享图片
      img_width: 80,
      img_height: 80
    };
    window['initShareInfo'](shareConfig.title, shareConfig.desc, shareConfig.img_url, shareConfig.link, function () {
    });
  }
  initShare(window.location.href);

})(document, window);

var originalJson = JSON.parse( json )

// 随机颜色HSL
var randomHsl = function() {
  return "hsla(" + Math.round(360 * Math.random()) + "," + "60%, 50%, .75)";
},
// CSS transform变换应用
transform = function(element, value, key) {
  key = key || "Transform";
  ["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
  element.style[prefix + key] = value;	
});	
  return element;
},
// 浏览器选择器API
_$ = function(selector) {
  return document.querySelector(selector);
}, $$ = function(selector) {
  return document.querySelectorAll(selector);
},
// px2rem
px2rem = function( px ) {
  return px / ( 40 * 75/64 )
};

// 3d木马
var htmlPic = '', arrayPic = [1, 2, 3, 4, 5, 6, 7, 8, 9], rotate = 360 / arrayPic.length;
var MerryGoRound = {
  built : function() {
    arrayPic.forEach(function(i) {
      htmlPic = htmlPic + '<div id="piece'+ i +'" style="background-image: url('+ originalJson[3].banner.src.path3 +')" class="piece" />'
      +'<p class="textTitle"></p>'
      +'<p class="textSubTitle"></p>'
      +'<div class="ad"></div>'+
      '</div>';	
    });
    
		var eleStage = _$("#stage"), eleContainer = _$("#container"), indexPiece = 0;
    var elePics = $$(".piece"), transZ = (577/2) / Math.tan((rotate / 2 / 180) * Math.PI);
    
    eleContainer.innerHTML = htmlPic;

    // 滑动事件 
    var lock = true
    $('.piece').each(function(index, dom) {

      easyTouch.touchend( dom, function () {
        console.log("滑动结束")
        lock = true
      })
      easyTouch.swiperLeft( dom, function () {
        if( lock ) {
          console.log("向左滑动")
          indexPiece = indexPiece + 1
          transform(eleContainer, "rotateY("+ (-1 * rotate * indexPiece) +"deg)");	
          lock = false
        }
      })
      easyTouch.swiperRight( dom, function () {
        if( lock ) {
          console.log("向右滑动")
          indexPiece = indexPiece - 1
          transform(eleContainer, "rotateY("+ (-1 * rotate * indexPiece) +"deg)");
          lock = false
        }
      })
    })

    setInterval( function () {
      if(lock){
        indexPiece = indexPiece + 1
        transform(eleContainer, "rotateY("+ (-1 * rotate * indexPiece) +"deg)");	
      }
    }, 2000);

    arrayPic.forEach(function(i, j) {
			transform(_$("#piece" + i), "rotateY("+ j * rotate +"deg) translateZ("+ px2rem(transZ + 10) +"rem)");	
		});
  }
}

MerryGoRound.built()

// 解析
var cssBg = function( $dom, src, type, color) {
  $dom.css({"background-image":'url("'+ src +'")'})
  if( type == 0 ) {
    $dom.css({"background-image":'none'})
    $dom.css({"background-color": color})
  }
}

var fillWord = function( $dom, arr, style ) {
  $dom.each(function( i ){
    $dom.eq(i).text(arr[i])
    $dom.eq(i).css({
      "line-height": style.lineHeight ? (style.lineHeight/46.875 + "rem") : $dom.eq(i).height(),
      "fontSize": style.fontSize/46.875 + "rem",
      "color": style.color,
      "background": style.background
    })
  })
}

// 跳转
var jump = function( $sel , way , link, name, Num, NumOut) {
  $sel.each(function(index, dom){
    dom.setAttribute("way", way)
    dom.setAttribute("url", link)
    dom.setAttribute("widgetName", name)
    dom.setAttribute("moduleName", "模板组件")
    dom.setAttribute("widgetNo", Num),
    dom.setAttribute("widgetNoForOut", NumOut)
    $(dom).on("click",function( event ){
      pageLog.onClickLog( event, dom )
    })
  })
}

// 动效
var addEF = function( $el, type ) {
  var bfname = ''
  if (type == 0) {
    bfname = 'swing'
  }else if(type == 1) {
    bfname = 'pulse'
  }else if(type == 2) {
    bfname = 'tada'
  }else {
    bfname = ''
  }
  $el.addClass(bfname)
}
 
// 单图替换 messageBg
$(".contentBg").css("backgroundImage", "url('"+ originalJson[0].mainBg.src.path +"')")
$(".app .title").css("backgroundImage", "url('"+ originalJson[0].titleBg.src.path +"')")
$(".app .ruleBtn").css("backgroundImage", "url('"+ originalJson[5].ruleBtn.src.path +"')")
$(".app .ruleBgImg").attr("src", originalJson[5].ruleBg.src.path)
$(".app .qxflBgImg").attr("src", originalJson[5].messageBg.src.path)
$(".app .subtitle0 img").attr("src", originalJson[0].titleAct.src.path)
$(".app .subtitle1 img").attr("src", originalJson[0].title.src.path)
$(".app .subtitle2 img").attr("src", originalJson[1].title.src.path)
$(".app .mySubTitleBg").css("backgroundImage", "url('"+ originalJson[0].subTitleBg.src.path +"')")
$(".app .ldjyBg").css("backgroundImage", "url('"+ originalJson[0].ldjyBg.src.path +"')")

$(".app .ad").eq(0).css("backgroundImage", "url('"+ originalJson[3].banner.src.path +"')")
fillWord( $(".app .textTitle").eq(0), [originalJson[3].banner1_title.content0],originalJson[3].banner1_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(0), [originalJson[3].banner1_subtTitle.content0],originalJson[3].banner1_subtTitle.custom.style)

$(".app .ad").eq(1).css("backgroundImage", "url('"+ originalJson[3].banner.src.path1 +"')")
fillWord( $(".app .textTitle").eq(1), [originalJson[3].banner2_title.content0],originalJson[3].banner2_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(1), [originalJson[3].banner2_subtTitle.content0],originalJson[3].banner2_subtTitle.custom.style)

$(".app .ad").eq(2).css("backgroundImage", "url('"+ originalJson[3].banner.src.path2 +"')")
fillWord( $(".app .textTitle").eq(2), [originalJson[3].banner3_title.content0],originalJson[3].banner3_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(2), [originalJson[3].banner3_subtTitle.content0],originalJson[3].banner3_subtTitle.custom.style)

$(".app .ad").eq(3).css("backgroundImage", "url('"+ originalJson[3].banner.src.path +"')")
fillWord( $(".app .textTitle").eq(3), [originalJson[3].banner1_title.content0],originalJson[3].banner1_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(3), [originalJson[3].banner1_subtTitle.content0],originalJson[3].banner1_subtTitle.custom.style)

$(".app .ad").eq(4).css("backgroundImage", "url('"+ originalJson[3].banner.src.path1 +"')")
fillWord( $(".app .textTitle").eq(4), [originalJson[3].banner2_title.content0],originalJson[3].banner2_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(4), [originalJson[3].banner2_subtTitle.content0],originalJson[3].banner2_subtTitle.custom.style)

$(".app .ad").eq(5).css("backgroundImage", "url('"+ originalJson[3].banner.src.path2 +"')")
fillWord( $(".app .textTitle").eq(5), [originalJson[3].banner3_title.content0],originalJson[3].banner3_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(5), [originalJson[3].banner3_subtTitle.content0],originalJson[3].banner3_subtTitle.custom.style)

$(".app .ad").eq(6).css("backgroundImage", "url('"+ originalJson[3].banner.src.path +"')")
fillWord( $(".app .textTitle").eq(6), [originalJson[3].banner1_title.content0],originalJson[3].banner1_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(6), [originalJson[3].banner1_subtTitle.content0],originalJson[3].banner1_subtTitle.custom.style)

$(".app .ad").eq(7).css("backgroundImage", "url('"+ originalJson[3].banner.src.path1 +"')")
fillWord( $(".app .textTitle").eq(7), [originalJson[3].banner2_title.content0],originalJson[3].banner2_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(7), [originalJson[3].banner2_subtTitle.content0],originalJson[3].banner2_subtTitle.custom.style)

$(".app .ad").eq(8).css("backgroundImage", "url('"+ originalJson[3].banner.src.path2 +"')")
fillWord( $(".app .textTitle").eq(8), [originalJson[3].banner3_title.content0],originalJson[3].banner3_title.custom.style) 
fillWord( $(".app .textSubTitle").eq(8), [originalJson[3].banner3_subtTitle.content0],originalJson[3].banner3_subtTitle.custom.style)

// 图片或颜色替换
cssBg( $(".app .footer"), 
  originalJson[4].footer.src.path, 
  originalJson[4].footer.custom.moduleBgType,
  originalJson[4].footer.custom.color
)
for(var j = 0; j < 3; j++) {
  cssBg( $(".app .coupon"+ (j+1) +" .couponT"), 
    originalJson[j].couponT.src.path, 
    originalJson[j].couponT.custom.moduleBgType,
    originalJson[j].couponT.custom.color
  )
  cssBg( $(".app .coupon"+ (j+1) +" .couponM"), 
    originalJson[j].couponM.src.path, 
    originalJson[j].couponM.custom.moduleBgType,
    originalJson[j].couponM.custom.color
  )
  cssBg( $(".app .coupon"+ (j+1) +" .couponB"), 
    originalJson[j].couponB.src.path, 
    originalJson[j].couponB.custom.moduleBgType,
    originalJson[j].couponB.custom.color
  )
}

for(var i = 0; i < 4; i++) {
  cssBg( $(".app .coupon1 .couponItem1").eq(i), 
    originalJson[0]["coupon"+(i+1)].src.path, 
    originalJson[0]["coupon"+(i+1)].custom.moduleBgType,
    originalJson[0]["coupon"+(i+1)].custom.color
  )
  cssBg( $(".app .coupon1 .btnPic").eq(i), 
    originalJson[0]["coupon"+(i+1)].src.path1, 
    originalJson[0]["coupon"+(i+1)].custom.moduleBgType,
    originalJson[0]["coupon"+(i+1)].custom.btnColor
  )
  cssBg( $(".app .coupon2 .couponItem2").eq(i), 
    originalJson[1]["coupon"+(i+1)].src.path, 
    originalJson[1]["coupon"+(i+1)].custom.moduleBgType,
    originalJson[1]["coupon"+(i+1)].custom.color
  )
  cssBg( $(".app .coupon2 .btnPic").eq(i), 
    originalJson[1]["coupon"+(i+1)].src.path1, 
    originalJson[1]["coupon"+(i+1)].custom.moduleBgType,
    originalJson[1]["coupon"+(i+1)].custom.btnColor
  )
}

// 填充文字

//TODO
fillWord( $(".app .title .zt1").eq(0), 
  [originalJson[0].zt1.content0],
  originalJson[0].zt1.custom.style
) 
//TODO
fillWord( $(".app .zt2").eq(0), 
  [originalJson[0].zt2.content0],
  originalJson[0].zt2.custom.style
)
//TODO
fillWord( $(".app .zt3").eq(0), 
  [originalJson[1].zt3.content0],
  originalJson[1].zt3.custom.style
)
fillWord( $(".app .title .t1").eq(0), 
  [originalJson[0].t1.content0],
  originalJson[0].t1.custom.style
)
fillWord( $(".app .t2").eq(0), 
  [originalJson[0].t2.content0],
  originalJson[0].t2.custom.style
)
//TODO
fillWord( $(".app .t3").eq(0), 
  [originalJson[1].t3.content0],
  originalJson[1].t3.custom.style
)
fillWord( $(".app .title .mySubTitle").eq(0), 
  [originalJson[0].subTitle.content0],
  originalJson[0].subTitle.custom.style
) 
fillWord( $(".app .title .myLeader").eq(0), 
  [originalJson[0].Leader.content0],
  originalJson[0].Leader.custom.style
) 
fillWord( $(".app .coupon1 .textTitle").eq(0), 
  [originalJson[0].coupon1_title.content0],
  originalJson[0].coupon1_title.custom.style
) 
fillWord( $(".app .coupon1 .textSubTitle").eq(0), 
  [originalJson[0].coupon1_subTitle.content0],
  originalJson[0].coupon1_subTitle.custom.style
) 
fillWord( $(".app .coupon1 .textTitle").eq(1), 
  [originalJson[0].coupon2_title.content0],
  originalJson[0].coupon2_title.custom.style
) 
fillWord( $(".app .coupon1 .textSubTitle").eq(1), 
  [originalJson[0].coupon2_subTitle.content0],
  originalJson[0].coupon2_subTitle.custom.style
) 
fillWord( $(".app .coupon1 .textTitle").eq(2), 
  [originalJson[0].coupon3_title.content0],
  originalJson[0].coupon3_title.custom.style
) 
fillWord( $(".app .coupon1 .textSubTitle").eq(2), 
  [originalJson[0].coupon3_subTitle.content0],
  originalJson[0].coupon3_subTitle.custom.style
) 
fillWord( $(".app .coupon1 .textTitle").eq(3), 
  [originalJson[0].coupon4_title.content0],
  originalJson[0].coupon4_title.custom.style
) 
fillWord( $(".app .coupon1 .textSubTitle").eq(3), 
  [originalJson[0].coupon4_subTitle.content0],
  originalJson[0].coupon4_subTitle.custom.style
) 

fillWord( $(".app .coupon2 .textTitle").eq(0), 
  [originalJson[1].coupon1_title.content0],
  originalJson[1].coupon1_title.custom.style
) 
fillWord( $(".app .coupon2 .textSubTitle").eq(0), 
  [originalJson[1].coupon1_subTitle.content0],
  originalJson[1].coupon1_subTitle.custom.style
) 
fillWord( $(".app .coupon2 .textTitle").eq(1), 
  [originalJson[1].coupon2_title.content0],
  originalJson[1].coupon2_title.custom.style
) 
fillWord( $(".app .coupon2 .textSubTitle").eq(1), 
  [originalJson[1].coupon2_subTitle.content0],
  originalJson[1].coupon2_subTitle.custom.style
) 
fillWord( $(".app .coupon2 .textTitle").eq(2), 
  [originalJson[1].coupon3_title.content0],
  originalJson[1].coupon3_title.custom.style
) 
fillWord( $(".app .coupon2 .textSubTitle").eq(2), 
  [originalJson[1].coupon3_subTitle.content0],
  originalJson[1].coupon3_subTitle.custom.style
) 
fillWord( $(".app .coupon2 .textTitle").eq(3), 
  [originalJson[1].coupon4_title.content0],
  originalJson[1].coupon4_title.custom.style
) 
fillWord( $(".app .coupon2 .textSubTitle").eq(3), 
  [originalJson[1].coupon4_subTitle.content0],
  originalJson[1].coupon4_subTitle.custom.style
) 

fillWord( $(".app .footer p:nth-child(1)"), 
  [originalJson[4].footer_tip_1.content0],
  originalJson[4].footer_tip_1.custom.style
) 
fillWord( $(".app .footer p:nth-child(2)"), 
  [originalJson[4].footer_tip_2.content0],
  originalJson[4].footer_tip_2.custom.style
) 

fillWord( $(".app .ruleBg .textScroll"), 
  [originalJson[5].rule.content0],
  originalJson[5].rule.custom.style
) 
fillWord( $(".app .qxflBg .textScroll"), 
  [originalJson[5].message.content0],
  originalJson[5].message.custom.style
) 

// 福利票券
var flpq = {
  num : Number(originalJson[0].coupon1.custom.num),
  coupon1 : {
    status : originalJson[0].coupon1.custom.status,
    way : originalJson[0].coupon1.custom.way,
    link : originalJson[0].coupon1.custom.link,
    name : originalJson[0].coupon1.custom.name,
    animate : originalJson[0].coupon1.custom.animate,
    index: 0,
    btnText: originalJson[0].coupon1_btn,
    btnTextNone: originalJson[0].coupon1_btn_none
  },
  coupon2 : {
    status : originalJson[0].coupon2.custom.status,
    way : originalJson[0].coupon2.custom.way,
    link : originalJson[0].coupon2.custom.link,
    name : originalJson[0].coupon2.custom.name,
    animate : originalJson[0].coupon2.custom.animate,
    index: 1,
    btnText: originalJson[0].coupon2_btn,
    btnTextNone: originalJson[0].coupon2_btn_none
  },
  coupon3 : {
    status : originalJson[0].coupon3.custom.status,
    way : originalJson[0].coupon3.custom.way,
    link : originalJson[0].coupon3.custom.link,
    name : originalJson[0].coupon3.custom.name,
    animate : originalJson[0].coupon3.custom.animate,
    index: 2,
    btnText: originalJson[0].coupon3_btn,
    btnTextNone: originalJson[0].coupon3_btn_none
  },
  coupon4 : {
    status : originalJson[0].coupon4.custom.status,
    way : originalJson[0].coupon4.custom.way,
    link : originalJson[0].coupon4.custom.link,
    name : originalJson[0].coupon4.custom.name,
    animate : originalJson[0].coupon4.custom.animate,
    index: 3,
    btnText: originalJson[0].coupon4_btn,
    btnTextNone: originalJson[0].coupon4_btn_none
  }
}
// 薪享理财
var xxlc = {
  num : Number(originalJson[1].coupon1.custom.num),
  coupon1 : {
    status : originalJson[1].coupon1.custom.status,
    way : originalJson[1].coupon1.custom.way,
    link : originalJson[1].coupon1.custom.link,
    name : originalJson[1].coupon1.custom.name,
    animate : originalJson[1].coupon1.custom.animate,
    index: 4,
    btnText: originalJson[1].coupon1_btn,
    btnTextNone: originalJson[1].coupon1_btn_none
  },
  coupon2 : {
    status : originalJson[1].coupon2.custom.status,
    way : originalJson[1].coupon2.custom.way,
    link : originalJson[1].coupon2.custom.link,
    name : originalJson[1].coupon2.custom.name,
    animate : originalJson[1].coupon2.custom.animate,
    index: 5,
    btnText: originalJson[1].coupon2_btn,
    btnTextNone: originalJson[1].coupon2_btn_none
  },
  coupon3 : {
    status : originalJson[1].coupon3.custom.status,
    way : originalJson[1].coupon3.custom.way,
    link : originalJson[1].coupon3.custom.link,
    name : originalJson[1].coupon3.custom.name,
    animate : originalJson[1].coupon3.custom.animate,
    index: 6,
    btnText: originalJson[1].coupon3_btn,
    btnTextNone: originalJson[1].coupon3_btn_none
  },
  coupon4 : {
    status : originalJson[1].coupon4.custom.status,
    way : originalJson[1].coupon4.custom.way,
    link : originalJson[1].coupon4.custom.link,
    name : originalJson[1].coupon4.custom.name,
    animate : originalJson[1].coupon4.custom.animate,
    index: 7,
    btnText: originalJson[1].coupon4_btn,
    btnTextNone: originalJson[1].coupon4_btn_none
  }
}
// 优惠券隐藏
$(".couponItem1").each(function(index, dom){
  if(index >= flpq.num) {
    $(dom).hide()
  }
})
$(".couponItem2").each(function(index, dom){
  if(index >= xxlc.num) {
    $(dom).hide()
  }
})

// 优惠券跳转
$(".couponItem1 .btn").each(function(index, dom){
  var coupon = "coupon" + (index+1)
  addEF( $(dom).parent(".btnPic"), flpq[coupon]["animate"])
  if( flpq[coupon]["status"] == 1) {
    // 已抢光
    fillWord( $(dom), 
      [ flpq[coupon]["btnTextNone"].content0],
      flpq[coupon]["btnTextNone"].custom.style
    )
    return false
  }else {
    // 注册跳转
    fillWord( $(dom), 
      [ flpq[coupon]["btnText"].content0],
      flpq[coupon]["btnText"].custom.style
    )
    jump( $(dom), flpq[coupon]["way"], 
      flpq[coupon]["link"],  
      flpq[coupon]["name"], 
      "ZJY02000"+flpq[coupon]["index"], 
      "ZJZ0200"+flpq[coupon]["index"])
  }
})
$(".couponItem2 .btn").each(function(index, dom){
  var coupon = "coupon" + (index+1)
  addEF( $(dom).parent(".btnPic"), xxlc[coupon]["animate"])
  if( xxlc[coupon]["status"] == 1) {
    // 已抢光
    fillWord( $(dom), 
      [ xxlc[coupon]["btnTextNone"].content0],
      xxlc[coupon]["btnTextNone"].custom.style
    ) 
    return 
  }else {
    // 注册跳转
    fillWord( $(dom), 
      [ xxlc[coupon]["btnText"].content0],
      xxlc[coupon]["btnText"].custom.style
    )
    jump( $(dom), xxlc[coupon]["way"], 
      xxlc[coupon]["link"],  
      xxlc[coupon]["name"], 
      "ZJY02000"+(xxlc[coupon]["index"]), 
      "ZJZ0200"+(xxlc[coupon]["index"]))
  }
})
// 底部banner 跳转
jump( $(".couponItem3"), originalJson[2].ad.custom.way, 
  originalJson[2].ad.custom["link"],  
  originalJson[2].ad.custom["name"], 
  "ZJY02000"+ 8, 
  "ZJZ0200"+ 8)
// 顶部banner
var mbanner = {
  banner1 : {
    way : originalJson[3].banner.custom.way,
    link :originalJson[3].banner.custom.link,
    name : originalJson[3].banner.custom.name,
    index: 9
  },
  banner2 : {
    way : originalJson[3].banner.custom.way1,
    link :originalJson[3].banner.custom.link1,
    name : originalJson[3].banner.custom.name,
    index: 10
  },
  banner3 : {
    way : originalJson[3].banner.custom.way1,
    link :originalJson[3].banner.custom.link1,
    name : originalJson[3].banner.custom.name,
    index: 11
  }
}
$(".piece").each(function(index, dom){
  var id = index%3
  var banner = "banner" + (id+1)
  // 注册跳转
  jump( $(dom), mbanner[banner]["way"], 
  mbanner[banner]["link"],  
  mbanner[banner]["name"], 
  "ZJY02000"+(mbanner[banner]["index"]), 
  "ZJZ0200"+(mbanner[banner]["index"]))
})

var ruleBtn = {
  animate: originalJson[5].ruleBtn.custom.animate,
  hidden: originalJson[5].ruleBtn.custom.hidden,
  way: originalJson[5].ruleBtn.custom.way,
  link: originalJson[5].ruleBtn.custom.link,
  name: originalJson[5].ruleBtn.custom.name,
  popup: originalJson[5].ruleBtn.custom.popup,
  index: 12
}
var ldjyBtn = {
  way: originalJson[0].ldjyBg.custom.way,
  link: originalJson[0].ldjyBg.custom.link,
  name: originalJson[0].ldjyBg.custom.name,
  popup: originalJson[0].ldjyBg.custom.popup, //TODO
  index: 13
}
// 规则按钮动效
addEF( $(".app .ruleBtn"), ruleBtn.animate)

// 福利是否隐藏
if(ruleBtn.hidden == 0){
  $(".app .title .ruleBtn").show()
}else if(ruleBtn.hidden == 1) {
  $(".app .title .ruleBtn").hide()
}

if(ruleBtn.popup == 0) {
  $(".app .title .ruleBtn").on("click",function(){
    $(".mask").fadeIn()
    $(".ruleBg").hide()
    $(".qxflBg").show()
    return false
  })
  $(".mask").on("click",function(){
    $(".mask").fadeOut()
    return false
  })
}else {
  jump( $(".app .title .ruleBtn"), ruleBtn.way, 
  ruleBtn.link,
  ruleBtn.name,
  "ZJY02000"+(ruleBtn.index), 
  "ZJZ0200"+(ruleBtn.index))
}

if(ldjyBtn.popup == 0) {
  $(".ldjyBg,.myLeader").on("click",function(){
    $(".mask").fadeIn()
    $(".qxflBg").hide()
    $(".ruleBg").show()
    return false
  })
  $(".mask").on("click",function(){
    $(".mask").fadeOut()
    return false
  })  
}else {
  jump( $(".ldjyBg,.myLeader"), ldjyBtn.way,  //TODO
  ldjyBtn.link,
  ldjyBtn.name,
  "ZJY02000"+(ldjyBtn.index), 
  "ZJZ0200"+(ldjyBtn.index))
}









