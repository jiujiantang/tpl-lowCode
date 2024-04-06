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
      title: "观影指南",
      desc: "人人都想要的电影特惠，你不看一下吗？",
      img_url: "http://newgametest.weijuju.com/res/moxiu/filmGuide/mobile/images/icon.png",// TODO 配置微信图文分享图片
      img_width: 80,
      img_height: 80
    };
    window['initShareInfo'](shareConfig.title, shareConfig.desc, shareConfig.img_url, shareConfig.link, function () {
    });
  }
  initShare(window.location.href);

  // 禁止分享
  // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
  //   WeixinJSBridge.call('hideOptionMenu');
  // })
})(document, window);

(function(){
  // 路径处理
  var pathArr = ["ruleBtn","ruleBg","screenBg","specialBgT","specialBgM","specialBgB","rightsBg","rightsBg1","priceBtn","newsBg","cover","hotLeft","hotRight","hotLeft2","ad","ad1","ad2","btn","btn1","btn2","adBg","iconCat","stickyBtn","mark","navigation"]
  var originalJson = gamePageJson( JSON.parse( json ) )


  
  document.title = originalJson[0].extend.title

  $("#openRule").on("click",function() {
    $("#ruleMask").fadeIn()
    return false
  })
  $("#ruleMask").on("click",function() {
    $("#ruleMask").fadeOut()
  })
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 300) {
        $('.stickyBtn').fadeIn(600);
    } else {  
        $('.stickyBtn').fadeOut(600);
    }
  })

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
        "line-height": 2*style.lineHeight/46.875 + "rem",
        "fontSize": 2*style.fontSize/46.875 + "rem",
        "color": style.color,
        "background": style.background
      })
    })
  }
  var getHot = function( $dom, type, arr ) {
    if( type == 0) {
      $dom.css( {"background-image":'url("'+ arr[0] +'")' } )
      $dom.removeClass("styleR")
      $dom.find(".adstyle").removeClass("styleL")
    }else {
      $dom.css( {"background-image":'url("'+ arr[1] +'")' } )
      $dom.addClass("styleR")
      $dom.find(".adstyle").addClass("styleL")
    }
  }
  // 解析
  $(".screenBg").attr("src", originalJson[0].screenBg.src.path)
  cssBg( $(".ruleBtn"), originalJson[0].ruleBtn.src.path )
  cssBg( $(".ruleBg"), originalJson[0].ruleBg.src.path )
  cssBg( $(".specialBgT"), originalJson[0].specialBgT.src.path )
  cssBg( $(".specialBgM"), originalJson[0].specialBgM.src.path )
  cssBg( $(".specialBgB"), originalJson[0].specialBgB.src.path )
  $(".specialBgM .priceBtn").each(function(index,dom){
    cssBg( $(dom), originalJson[0].priceBtn.src.path1 ,  originalJson[0].priceBtn.custom.moduleBgType, originalJson[0].priceBtn.custom.btnColor)
  })
  $(".specialBgM .priceBg").each(function(index,dom){
    cssBg( $(dom), originalJson[0].priceBtn.src.path ,  originalJson[0].priceBtn.custom.moduleBgType, originalJson[0].priceBtn.custom.color)
  })
  if( originalJson[0].priceBtn.custom.num == 0 ){
    $(".priceBtnWrap").each(function(index, dom){
        $(dom).hide()
    })
    $(".priceBtnWrap").eq(0).show()
  }
  fillWord( $(".ruleBg .h3"), [originalJson[0].h3.content0], originalJson[0].h3.custom.style) 
  fillWord( $(".ruleBg .rule"), [originalJson[0].rule.content0], originalJson[0].rule.custom.style) 
  fillWord( $(".specialBgM .h1"), [originalJson[0].h1.content0], originalJson[0].h1.custom.style)
  fillWord( $(".specialBgM .h2"), [originalJson[0].h2.content0], originalJson[0].h2.custom.style)
  fillWord( $(".specialBgM .mark"), [originalJson[0].mark.content0, originalJson[0].mark.content1], originalJson[0].mark.custom.style)
  fillWord( $(".specialBgM .title"), [originalJson[0].title.content0, originalJson[0].title.content1], originalJson[0].title.custom.style)
  fillWord( $(".specialBgM .subTitle"), [originalJson[0].subTitle.content0, originalJson[0].subTitle.content1], originalJson[0].subTitle.custom.style)
  fillWord( $(".specialBgM .rob.do"), [originalJson[0].rob.content0, originalJson[0].rob.content1], originalJson[0].rob.custom.style)
  if( originalJson[0].rightsBg.custom.num == 0 ) {
    $(".specialBgM .rightsBg").hide()
    $(".specialBgM .rightsBg1").show()
    cssBg(  $(".specialBgM .rightsBg1"), originalJson[0].rightsBg1.src.path ,  originalJson[0].rightsBg1.custom.moduleBgType, originalJson[0].rightsBg1.custom.color)
  }else if( originalJson[0].rightsBg.custom.num == 1 ){ 
    $(".specialBgM .rightsBg1").hide()
    $(".specialBgM .rightsBg").show().each(function(index,dom){
      cssBg( $(dom), originalJson[0].rightsBg.src.path ,  originalJson[0].rightsBg.custom.moduleBgType, originalJson[0].rightsBg.custom.color)
    })
  }
  fillWord( $(".specialBgM .rightsMark"), [originalJson[0].rightsMark.content0, originalJson[0].rightsMark.content1], originalJson[0].rightsMark.custom.style)
  fillWord( $(".specialBgM .rightsTitle"), [originalJson[0].rightsTitle.content0, originalJson[0].rightsTitle.content1], originalJson[0].rightsTitle.custom.style)
  fillWord( $(".specialBgM .rightsSubTitle"), [originalJson[0].rightsSubTitle.content0, originalJson[0].rightsSubTitle.content1], originalJson[0].rightsSubTitle.custom.style)
  fillWord( $(".specialBgM .rightsRob.do"), [originalJson[0].rightsRob.content0, originalJson[0].rightsRob.content1], originalJson[0].rightsRob.custom.style)
  fillWord( $(".specialBgM .rights1Mark"), [originalJson[0].rights1Mark.content0, originalJson[0].rights1Mark.content1], originalJson[0].rights1Mark.custom.style)
  fillWord( $(".specialBgM .rights1Title"), [originalJson[0].rights1Title.content0, originalJson[0].rights1Title.content1], originalJson[0].rights1Title.custom.style)
  fillWord( $(".specialBgM .rights1SubTitle"), [originalJson[0].rights1SubTitle.content0, originalJson[0].rights1SubTitle.content1], originalJson[0].rights1SubTitle.custom.style)
  fillWord( $(".specialBgM .rights1Rob.do"), [originalJson[0].rights1Rob.content0, originalJson[0].rights1Rob.content1], originalJson[0].rights1Rob.custom.style)

  cssBg( $(".newsBg"), originalJson[1].newsBg.src.path ,  originalJson[1].newsBg.custom.moduleBgType, originalJson[1].newsBg.custom.color)
  cssBg( $(".news .cover"), originalJson[1].cover.src.path )
  fillWord( $(".news .h1"), [originalJson[1].h1.content0], originalJson[1].h1.custom.style )
  fillWord( $(".news .tip"), [originalJson[1].tip.content0], originalJson[1].tip.custom.style )

  getHot( $(".hot .hotLeft"), originalJson[2].hotLeft.custom.moduleBgType, [originalJson[2].hotLeft.src.path, originalJson[2].hotLeft.src.path1] )
  getHot( $(".hot .hotRight"), originalJson[2].hotRight.custom.moduleBgType, [originalJson[2].hotRight.src.path, originalJson[2].hotRight.src.path1] )
  getHot( $(".hot .hotLeft2"), originalJson[2].hotLeft2.custom.moduleBgType, [originalJson[2].hotLeft2.src.path, originalJson[2].hotLeft2.src.path1] )
  getHot( $(".hot .ad"), originalJson[2].hotLeft.custom.moduleBgType, [originalJson[2].ad.src.path, originalJson[2].ad.src.path] )
  getHot( $(".hot .ad1"), originalJson[2].hotRight.custom.moduleBgType, [originalJson[2].ad1.src.path, originalJson[2].ad1.src.path] )
  getHot( $(".hot .ad2"), originalJson[2].hotLeft2.custom.moduleBgType, [originalJson[2].ad2.src.path, originalJson[2].ad2.src.path] )

  fillWord( $(".hot .h1"), [originalJson[2].h1.content0], originalJson[2].h1.custom.style)
  fillWord( $(".hot .hotLeft .title"), [originalJson[2].title.content0], originalJson[2].title.custom.style)
  fillWord( $(".hot .hotRight .title1"), [originalJson[2].title1.content0], originalJson[2].title1.custom.style)
  fillWord( $(".hot .hotLeft2 .title2"), [originalJson[2].title2.content0], originalJson[2].title2.custom.style)
  fillWord( $(".hot .hotLeft .subTitle"), [originalJson[2].subTitle.content0], originalJson[2].subTitle.custom.style)
  fillWord( $(".hot .hotRight .subTitle1"), [originalJson[2].subTitle1.content0], originalJson[2].subTitle1.custom.style)
  fillWord( $(".hot .hotLeft2 .subTitle2"), [originalJson[2].subTitle2.content0], originalJson[2].subTitle2.custom.style)
  fillWord( $(".hot .hotLeft .mark"), [originalJson[2].mark.content0], originalJson[2].mark.custom.style)
  fillWord( $(".hot .hotRight .mark1"), [originalJson[2].mark1.content0], originalJson[2].mark1.custom.style)
  fillWord( $(".hot .hotLeft2 .mark2"), [originalJson[2].mark2.content0], originalJson[2].mark2.custom.style)
  fillWord( $(".hot .hotLeft .btn .do"), [originalJson[2].btn.content0], originalJson[2].btn.custom.style)
  fillWord( $(".hot .hotRight .btn1"), [originalJson[2].btn1.content0], originalJson[2].btn1.custom.style)
  fillWord( $(".hot .hotLeft2 .btn2"), [originalJson[2].btn2.content0], originalJson[2].btn2.custom.style)
  if( originalJson[2].btn.custom.moduleBgType == 1 ){
    cssBg( $(".hot .hotLeft .btn"), originalJson[2].btn.src.path )
  }else {
    var type = originalJson[2].btn.custom.type
    $(".hot .hotLeft .btn").addClass("style"+( Number(type) + 1)).css({
      "border-width":2*originalJson[2].btn.custom.style.borderWidth/46.875+"rem",
      "background": ( type == 3 || type == 4 || type == 5 ) ? "none" : originalJson[2].btn.custom.style.background,
      "border-color": originalJson[2].btn.custom.style.background
    })
  }

  if( originalJson[2].btn1.custom.moduleBgType == 1 ){
    cssBg( $(".hot .hotRight .btn1"), originalJson[2].btn1.src.path )
  }else {
    var type = originalJson[2].btn1.custom.type
    $(".hot .hotRight .btn1").addClass("style"+( Number(type) + 1)).css({
      "border-width":2*originalJson[2].btn1.custom.style.borderWidth/46.875+"rem",
      "background":( type == 3 || type == 4 || type == 5 ) ? "none" : originalJson[2].btn1.custom.style.background,
      "border-color": originalJson[2].btn1.custom.style.background
    })
  }

  if( originalJson[2].btn2.custom.moduleBgType == 1 ){
    cssBg( $(".hot .hotLeft2 .btn2"), originalJson[2].btn2.src.path )
  }else {
    var type = originalJson[2].btn2.custom.type
    $(".hot .hotLeft2 .btn2").addClass("style"+( Number(type) + 1)).css({
      "border-width":2*originalJson[2].btn2.custom.style.borderWidth/46.875+"rem",
      "background":( type == 3 || type == 4 || type == 5 ) ? "none" : originalJson[2].btn2.custom.style.background,
      "border-color": originalJson[2].btn2.custom.style.background
    })
  }

  cssBg( $(".adBg"), originalJson[3].adBg.src.path ,  originalJson[3].adBg.custom.moduleBgType, originalJson[3].adBg.custom.color)
  cssBg( $(".ad .iconCat"), originalJson[3].iconCat.src.path )
  fillWord( $(".ad .mark"), [originalJson[3].mark.content0], originalJson[3].mark.custom.style)

  fillWord( $(".stickyBtn .mark"), [originalJson[4].mark.content0], originalJson[4].mark.custom.style)
  if( originalJson[4].mark.custom.moduleBgType == 1 ){
    cssBg( $(".stickyBtn"), originalJson[4].mark.src.path )
  }else {
    $(".stickyBtn .mark").css({ "background": "none"})
    var type = originalJson[4].mark.custom.type
    $(".stickyBtn").addClass("style"+( Number(type) + 1)).css({
      "border-width":2*originalJson[4].mark.custom.style.borderWidth/46.875+"rem",
      "background":( type == 3 || type == 4 || type == 5 ) ? "none" : originalJson[4].mark.custom.style.background,
      "border-color": originalJson[4].mark.custom.style.background
    })
  }

  fillWord( $(".navigation .mark"), [originalJson[5].navigation.content0], originalJson[5].navigation.custom.style)
  if( originalJson[5].navigation.custom.moduleBgType == 1 ){
    cssBg( $(".navigation"), originalJson[5].navigation.src.path )
  }else {
    var type = originalJson[5].navigation.custom.type
    $(".navigation .mark").css({ "background": "none"})
    $(".navigation").addClass("style"+( Number(type) + 1)).css({
      "border-width":2*originalJson[5].navigation.custom.style.borderWidth/46.875+"rem",
      "background":( type == 3 || type == 4 || type == 5 ) ? "none" : originalJson[5].navigation.custom.style.background,
      "border-color": originalJson[5].navigation.custom.style.background
    })
  }

  // 跳转
  var first = true
  var jump = function( sel , way , link, name, Num, NumOut) {
    $(sel).each(function(index, dom){
      $(dom).on("click",function( event ){
        dom.setAttribute("way", way)
        dom.setAttribute("url", link)
        dom.setAttribute("widgetName", name)
        dom.setAttribute("moduleName", "模板组件")
        dom.setAttribute("widgetNo", Num),
        dom.setAttribute("widgetNoForOut", NumOut)
        pageLog.onClickLog( event, dom )
      })
    })
  }
  var regJump = function() {
    jump( ".priceBtn", originalJson[0].priceBtn.custom.way, originalJson[0].priceBtn.custom.link,  originalJson[0].priceBtn.custom.name, "ZJY02000N", "ZJZ0200N")
    jump( ".rightsBg", originalJson[0].rightsBg.custom.way, originalJson[0].rightsBg.custom.link,  originalJson[0].rightsBg.custom.name, "ZJY02001N", "ZJZ0201N")
    jump( ".rightsBg1", originalJson[0].rightsBg1.custom.way, originalJson[0].rightsBg1.custom.link,  originalJson[0].rightsBg1.custom.name, "ZJY02002N", "ZJZ0202N")
    jump( ".cover", originalJson[1].cover.custom.way, originalJson[1].cover.custom.link, originalJson[1].cover.custom.name, "ZJY02003N", "ZJZ0203N" )
    jump( ".btn", originalJson[2].btn.custom.way, originalJson[2].btn.custom.link, originalJson[2].btn.custom.name, "ZJY02004N", "ZJZ0204N")
    jump( ".btn1", originalJson[2].btn1.custom.way, originalJson[2].btn1.custom.link, originalJson[2].btn1.custom.name, "ZJY02005N", "ZJZ0205N")
    jump( ".btn2", originalJson[2].btn2.custom.way, originalJson[2].btn2.custom.link, originalJson[2].btn2.custom.name, "ZJY02006N", "ZJZ0206N")
    jump( ".stickyBtn .mark", originalJson[4].mark.custom.way, originalJson[4].mark.custom.link, originalJson[4].mark.custom.name, "ZJY02007N", "ZJZ0207N")
    jump( ".navigation .mark", originalJson[5].navigation.custom.way, originalJson[5].navigation.custom.link,  originalJson[5].navigation.custom.name, "ZJY02008N", "ZJZ0208N")
    
    
    // 状态
    if( originalJson[0].rightsBg.custom.status0 == 1 ){
      fillWord( $(".specialBgM .rightsRob.do").eq(0), [originalJson[0].rightsRob1.content0, originalJson[0].rightsRob1.content1], originalJson[0].rightsRob1.custom.style)
      $(".specialBgM .rightsBg").eq(0).off("click").on("click",function(){
        return
      })
    }
    if( originalJson[0].rightsBg.custom.status1 == 1 ){
      fillWord( $(".specialBgM .rightsRob.do").eq(1), [originalJson[0].rightsRob1.content0, originalJson[0].rightsRob1.content1], originalJson[0].rightsRob1.custom.style)
      $(".specialBgM .rightsBg").eq(1).off("click").on("click",function(){
        return
      })
    }
    if( originalJson[0].rightsBg1.custom.status0 == 1 ){
      fillWord( $(".specialBgM .rights1Rob.do"), [originalJson[0].rightsRob1.content0, originalJson[0].rightsRob1.content1], originalJson[0].rightsRob1.custom.style)
      $(".specialBgM .rightsBg1").off("click").on("click",function(){
        return
      })
    }

    if( originalJson[0].priceBtn.custom.status0 == 1 ){
      fillWord( $(".specialBgM .priceBtn .rob").eq(0), [originalJson[0].rob1.content0, originalJson[0].rob1.content1], originalJson[0].rob1.custom.style)
      cssBg( $(".specialBgM .priceBtn").eq(0), originalJson[0].priceBtn.src.path2 ,  originalJson[0].priceBtn.custom.moduleBgType, originalJson[0].priceBtn.custom.btnColor )
      $(".specialBgM .priceBtn").eq(0).off("click").on("click",function(){
        return
      })
    }
    if( originalJson[0].priceBtn.custom.status1 == 1 ){
      fillWord( $(".specialBgM .priceBtn .rob").eq(1), [originalJson[0].rob1.content0, originalJson[0].rob1.content1], originalJson[0].rob1.custom.style)
      cssBg( $(".specialBgM .priceBtn").eq(1), originalJson[0].priceBtn.src.path2 ,  originalJson[0].priceBtn.custom.moduleBgType, originalJson[0].priceBtn.custom.btnColor )
      $(".specialBgM .priceBtn").eq(1).off("click").on("click",function(){
        return
      })
    }
  }
  
  // 缓存
  if( localStorage.getItem("filmGuide") == 1){
    $(".share").hide()
    $(".do").removeClass("doHide")
    regJump();
  }else {
    $(".share").each(function(index,dom){
      $(dom).on("click",function(){
        localStorage.setItem("filmGuide","1");
        $(".shareMask").fadeIn()
      })
    })
    $(".shareMask").on("click",function(){
      $(".shareMask").fadeOut()
      $(".share").hide()
      $(".do").removeClass("doHide")
      regJump();
    })
  }

// 路径替换
function replaceResPath(path) {
  return path
      .replace(/\*_resRoot\*/g, staticResUrl)
      .replace(/\*_qiniuResRoot\*/g, qiniuResUrl)
}
function gamePageJson( gamePageJson ) {
  for( var i = 0; i < gamePageJson.length; i++ ) {
      var tpl = gamePageJson[i]
      for( var key in tpl ) {
          if ( pathArr.indexOf(key) != -1){
              for ( var j = 0; j < 3; j++ ){
                  if( gamePageJson[i][key]['src'] && gamePageJson[i][key]['src']['path' + (j == 0 ? '' : j)] ){
                      gamePageJson[i][key]['src']['path' + (j == 0 ? '' : j)] = replaceResPath( tpl[key]['src']['path' + (j == 0 ? '' : j)] )
                  }
              }
          }
      }
  }
  return gamePageJson
}

})()