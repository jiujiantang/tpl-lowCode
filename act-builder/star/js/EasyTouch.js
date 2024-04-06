!(function(w){w.easyTouch={touchstart:function(el,fn){el.addEventListener('touchstart',function(e){var e=e||event
    fn(e)})},touchend:function(el,fn){el.addEventListener('touchend',function(e){var e=e||event
    fn(e)})},touchmove:function(el,fn){el.addEventListener('touchmove',function(e){var e=e||event
    fn(e)})},touchcancel:function(el,fn){el.addEventListener('touchcancel',function(e){var e=e||event
    fn(e)})},touchstart:function(el,fn){el.addEventListener('touchStart',function(e){var e=e||event
    fn(e)})},tap:function(el,fn){var touchStartX,touchStartY,touchEndX,touchEndY
    el.addEventListener('touchstart',function(e){var e=e||event
    touchStartX=e.changedTouches[0].pageX
    touchStartY=e.changedTouches[0].pageY})
    el.addEventListener('touchend',function(e){var e=e||event
    touchEndX=e.changedTouches[0].pageX
    touchEndY=e.changedTouches[0].pageY
    if(Math.abs(touchEndX-touchStartX)<10&&Math.abs(touchEndY-touchStartY)<10){fn({target:e.target,type:'tap',touches:e.changedTouches,targetTouches:e.targetTouches})}})},hold:function(el,fn){var touchStartX,touchStartY,touchEndX,touchEndY,lTapTimer=null
    el.addEventListener('touchstart',function(e){if(lTapTimer){clearTimeout(lTapTimer)
    lTapTimer=null}
    touchStartX=e.changedTouches[0].pageX
    touchStartY=e.changedTouches[0].pageY
    lTapTimer=setTimeout(function(){fn({target:e.target,type:'hold',touches:e.changedTouches,targetTouches:e.targetTouches})},750)})
    el.addEventListener('touchmove',function(e){touchEndX=e.changedTouches[0].pageX
    touchEndY=e.changedTouches[0].pageY
    if(Math.abs(touchEndX-touchStartX)>=10||Math.abs(touchEndY-touchStartY)>=10){clearInterval(lTapTimer)}})
    el.addEventListener('touchend',function(e){if(lTapTimer){clearTimeout(lTapTimer)
    lTapTimer=null}})},swiperLeft:function(el,fn){var touchStartX,touchStartY,touchEndX,touchEndY
    el.addEventListener('touchstart',function(){var e=e||event
    touchStartX=e.changedTouches[0].pageX
    touchStartY=e.changedTouches[0].pageY})
    el.addEventListener('touchmove',function(e){var e=e||event
    touchEndX=e.changedTouches[0].pageX
    touchEndY=e.changedTouches[0].pageY
    if(touchEndX-touchStartX<0&&Math.abs(touchEndY-touchStartY)<5){fn({target:e.target,type:'swiperLeft',touches:e.changedTouches,targetTouches:e.targetTouches})}})},swiperRight:function(el,fn){var touchStartX,touchStartY,touchEndX,touchEndY
    el.addEventListener('touchstart',function(){var e=e||event
    touchStartX=e.changedTouches[0].pageX
    touchStartY=e.changedTouches[0].pageY})
    el.addEventListener('touchmove',function(e){var e=e||event
    touchEndX=e.changedTouches[0].pageX
    touchEndY=e.changedTouches[0].pageY
    if(touchEndX-touchStartX>0&&Math.abs(touchEndY-touchStartY)<5){fn({target:e.target,type:'swiperRight',touches:e.changedTouches,targetTouches:e.targetTouches})}})},swiperUp:function(el,fn){var touchStartX,touchStartY,touchEndX,touchEndY
    el.addEventListener('touchstart',function(){var e=e||event
    touchStartX=e.changedTouches[0].pageX
    touchStartY=e.changedTouches[0].pageY})
    el.addEventListener('touchmove',function(e){var e=e||event
    touchEndX=e.changedTouches[0].pageX
    touchEndY=e.changedTouches[0].pageY
    if(touchEndY-touchStartY<0&&Math.abs(touchEndX-touchStartX)<5){fn({target:e.target,type:'swiperUp',touches:e.changedTouches,targetTouches:e.targetTouches})}})},swiperDown:function(el,fn){var touchStartX,touchStartY,touchEndX,touchEndY
    el.addEventListener('touchstart',function(){var e=e||event
    touchStartX=e.changedTouches[0].pageX
    touchStartY=e.changedTouches[0].pageY})
    el.addEventListener('touchmove',function(e){var e=e||event
    touchEndX=e.changedTouches[0].pageX
    touchEndY=e.changedTouches[0].pageY
    if(touchEndY-touchStartY>0&&Math.abs(touchEndX-touchStartX)<5){fn({target:e.target,type:'swiperDown',touches:e.changedTouches,targetTouches:e.targetTouches})}})}}})(window)