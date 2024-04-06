<template>
  <!-- 字体转换器 -->
  <div id="fontIcon" class="fontIcon">
    <img class="iconMig" :src="icon" @click="start">
    <div class="control">
      <h1 class="mx-title mx-bottom-line">文字转换图片</h1>
      <div class="mx_set">
        <div class="control-group">
          <h2 class="mx-subtitle"><span class="mx-maroon">*</span>文字<span class="help-inline"></span></h2>  
          <div class="controls quillControl">
            <quill-editor 
              v-model="content"
              ref="myQuillEditor"
              class="editer"
              :options="editorOption" 
              @ready="onEditorReady($event)"
              @blur="onEditorBlur($event)" 
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
            </quill-editor>
          </div>
        </div>
        <div class="control-group" >
            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>字体<span class="help-inline"></span></h2>
            <div class="controls">
              <select name="fontFamily" class="span2" v-model="font.fontFamily" @change="onFontFamilyChange($event)">
                <option value="HYShuYuanHeiJ" style="font-family: 'HYShuYuanHeiJ';">汉仪舒黑</option>
                <option value="Microsoft YaHei" style="font-family: 'Microsoft YaHei';">微软雅黑</option>
                <option value="SimHei" style="font-family: 'SimHei';">黑体</option>
                <option value="HYZhuZiMeiXinTiW" style="font-family: 'HYZhuZiMeiXinTiW';">汉仪铸字</option>
                <option value="ZaoZiGongFangFangHei-1" style="font-family: 'ZaoZiGongFangFangHei-1';">造字工坊</option>
              </select>
            </div>
        </div>
        <div class="controls">
          <h2 class="mx-subtitle"><span class="mx-maroon">*</span>模式<span class="help-inline"></span></h2>
          <label class="radio inline"> 
              <input type="radio" value="0" v-model="modelType" @change="raidoChange()"/><span class="inputText">模式一（文本）</span> <br>
              <input type="radio" value="1" v-model="modelType" @change="raidoChange()"/><span class="inputText">模式二（标题）</span> <br>
          </label>
      </div>
        <div class="control-group">
            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>图片尺寸<span class="help-inline">（建议尺寸：{{modelType == 0 ? 750 : mark_size.width}}px*{{mark_size.height}}px）</span></h2>
            <div class="controls">
              <label class="radio inline"> 
                  <input type="text" class="mx_input_short" v-model="size.width"/><span class="x">X</span><input type="text" class="mx_input_short" v-model="size.height"/>
              </label>
            </div>
        </div>
        <div class="control-group" >
            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>字体颜色<span class="help-inline"></span></h2>
            <div class="controls">
              <my-color-picker :defaultColor="'#000'" v-model="font.color"></my-color-picker>
            </div>
        </div>
        <div class="control-group" >
            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>背景颜色<span class="help-inline"></span></h2>
            <div class="controls">
              <my-color-picker :defaultColor="'none'" v-model="font.background"></my-color-picker>
            </div>
        </div>
      </div>
      <div class="mx_bottomBar mx_bottomBarBig mx-top-line">
        <div class="controls mx-center">
            <a class="mx-btn mx-btn-NORMAL mx-btn-MIDDLE" href="javascript:void(0);" @click="preview">预览</a>
            <a class="mx-btn mx-btn-FILLED mx-btn-MIDDLE" id="downTextIcon" href="javascript:void(0);" @click="startGame">开始转换</a>
        </div>
      </div>
      <canvas id="mx_textIconCanvas" class="hide"></canvas>
      <div class="preview" id="textIconPreview"> 
        <div class="loadingWrap" v-show="loading">
          <img class="loadingImg" :src="loadingPic">
        </div>
        <img id="mx_textIconPreImg" class="postImg" src=""/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// 富文本
import { quillEditor } from "vue-quill-editor";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 取色器
import colorPicker from '../colorPicker.vue'
Vue.component('my-color-picker', colorPicker)

export default {
  props: {
    // 入口图标
    icon: {
      type: String,
      required: true
    },
    // loading图标
    loadingPic: {
      type: String,
      required: true
    }
  },
  data () {
      return {
        modelType: 0,
        content: null,
        editorOption: {
          placeholder: '回车分段,工具栏效果按段生效,在此输入文字...',
          modules:{
            toolbar:[
              ['bold', 'underline', 'strike', {'list':'bullet'}, { 'align': [] }],
            ]
          }
        },
        // 面板打开状态
        openStatus: false,
        // 文字
        txtArr: [],
        specialArr: [],
        isAutoLine: false,// 是否自动换行过
        // 字体
        font: {
          contents: [],
          fontFamily: 'Microsoft YaHei',
          fontSize: '28',
          lineHeight: '34',
          boldFontSize: '30',
          color: '#000',
          background: 'none'
        },
        // 尺寸
        size: {
          width: 750,
          height: 50
        },
        mark_size: {
          width: 750,
          height: 50
        },
        staticHeight: 50,
        listFlag: false,
        // 锁
        lock: false,
        // 图片
        _canvas:{},
        _ctx:{},
        preImg: '',
        loading: true,
        // 测试
        isDebug: true
      }
  },
  components: {
    quillEditor
  },
  computed: {
  },
  methods: {
    $(selector) {
      return document.querySelector(selector)
    },
    $$(selector) {
      return document.querySelectorAll(selector)
    },
    markSize() {
      var that = this
      if(this.font.contents){
        if(!this._canvas || !this._ctx){
          this._canvas = document.getElementById("mx_textIconCanvas"),
          this._ctx = this._canvas.getContext("2d")
        }
        this.txtArr =  this.formate(this.font.contents.ops)
        var max = 0
        var boldNum = 0
        var textNum = 0
        this.listFlag = false
        if(!this.txtArr){
          return
        }
        for(var i=0; i<this.txtArr.length; i++){
          var element = this.txtArr[i]
          if(element.attributes.bold){
            this._ctx.font = (parseInt(this.font.fontSize) + 2 ) + "px " + this.font.fontFamily
          }else {
            this._ctx.font = this.font.fontSize + "px " + this.font.fontFamily
          }
          var elementW = this._ctx.measureText(element.insert).width
          if(element.insert != '^' && elementW > max){
            max = elementW
          }
          // 自动换行
          var tplArr = that.autoLine(element.insert, this._ctx)
          if(element.insert != '^' && element.attributes.bold){
            if(tplArr.length > 0){
              for(var j=0; j<tplArr.length; j++){
                boldNum++
              }
            }else {
              boldNum++
            }
          }else {
            if(tplArr.length > 0){
              for(var j=0; j<tplArr.length; j++){
                textNum++
              }
            }else {
              textNum++
            }
          }
          if(element.insert != '^' && element.attributes.list){
            this.listFlag = true
          }
        }
        if(this.modelType == 1){
          textNum = this.txtArr.length
        }

        // this.mark_size.width = Math.ceil(max)
        this.mark_size.height = this.font.lineHeight * textNum + (parseInt(this.font.lineHeight) + 2) * boldNum
        // this.size.width = Math.ceil(max) + (this.listFlag?10:0)
        this.size.height = this.font.lineHeight * textNum + (parseInt(this.font.lineHeight) + 2) * boldNum
        this.staticHeight = this.font.lineHeight * textNum + (parseInt(this.font.lineHeight) + 2) * boldNum
        this.mark_size.width = this.modelType == 0 ? 750 : Math.ceil(max)
        this.size.width = this.modelType == 0 ? 750 : Math.ceil(max)
      }else {
        this.isDebug && console.log('[err]markSize')
      }
    },
    onFontFamilyChange(){
      if(!this.check()){
        return
      }
      this.markSize()
    },
    onEditorBlur() {
      this.markSize()
      this.isDebug && console.log(4)
    },
    onEditorFocus() {
      this.$(".ql-container .ql-editor").setAttribute("data-placeholder", '')
      this.isDebug && console.log(3)
    },
    onEditorChange({html,text,quill}) {
      this.isDebug && console.log(2)
      this.font.contents = quill.getContents()
      this.markSize()
      this.isDebug && console.log(quill.getContents())

    },
    raidoChange(){
      this.markSize()
    },
    onEditorReady(editor) {
      this.isDebug && console.log(1)
    },
    start: function(e){
      var dom = e.target
      if(!this.lock){
        this.$("#fontIcon .control").style.display = 'block'
        this.lock = true
      }else{
        this.$("#fontIcon .control").style.display = 'none'
        this.lock = false
      }
      
    },
    preview: function(){
      if(!this.check()){
        return
      }
      var that = this,
      imgUrls = []
      this.$('#textIconPreview').style.display = 'block'
      that.$("#fontIcon .preview").scrollTop = 0
      setTimeout(function(){
        that.$('#textIconPreview').style.display = 'none'
        that.$("#fontIcon .preview").scrollTop = 0
      },3000)
      this.loading = true
      this.initDrawImg({
        imgUrls: imgUrls,
        font: that.font,
        size: that.size,
        type: 'preview'
      })
    },
    startGame: function(){  
      if(!this.check()){
        return
      }
      var that = this,
      imgUrls = []
      this.initDrawImg({
        imgUrls: imgUrls,
        font: that.font,
        size: that.size,
        type: 'download'
      })
    },
    /**
     * 合成
     */
    initDrawImg: function(mParams){
      var that = this,
      canvas = document.getElementById("mx_textIconCanvas"),
      ctx = canvas.getContext("2d"),
      qlEditorW = 293,
      fontSize = 1,
      width = mParams.size.width,
      height = mParams.size.height,
      staticC = 0,
      imgUrls = mParams.imgUrls
      canvas.width = width
      canvas.height = height

      if(imgUrls.length > 0){
        var imgList = new Array(imgUrls.length)
        var imgNum = imgList.length
        var imgLoadNum = 0
        for (var i = 0; i < imgList.length; i++) {
          imgList[i] = new Image()
          if (imgList.length - 1 != i) {
            imgList[i].crossOrigin = "Anonymous"
          }
          imgList[i].onload = function() {
            imgLoadNum++;
            if (imgNum == imgLoadNum) {
              drawCanvas(canvas, width, height, ctx, fontSize, imgList, mParams, staticC)
            }
          };
          imgList[i].src = imgUrls[i]
        }
      }else {
        drawCanvas(canvas, width, height, ctx, fontSize, imgUrls, mParams, staticC)
      }
      
      function drawCanvas(canvas, width, height, ctx, fontSize, imgList, mParams, staticC){
        // 背景
        if(imgList.length > 0){
          ctx.drawImage(imgList[0], 0, 0, width, height);
        }
        if(mParams.font.background != 'none'){
          ctx.save()
          ctx.fillStyle = mParams.font.background
          ctx.fillRect(0,0,width,height)
          ctx.restore()
        }

        // 文字
        that.txtArr =  that.formate(that.font.contents.ops, ctx, staticC)
        
        ctx.fillStyle = mParams.font.color
        var x = 0,
        y = 0,
        x0 = 0,
        x1 = width,
        c = 5,
        ox = 0,
        r = 2
        that.mark_size.height = height > that.staticHeight ? (height - that.staticHeight)/2 : 0

        for(var i = 0; i < that.txtArr.length; i++){
          var element = that.txtArr[i]
          var list = element.attributes.list
          var maxWidth = 0

          var bold = element.attributes.bold
          if(bold){
            ctx.font = (bold?'normal 900 ':'') + that.font.boldFontSize * fontSize + 'px ' + mParams.font.fontFamily
          }else {
            ctx.font = (bold?'normal 900 ':'') + mParams.font.fontSize * fontSize + 'px ' + mParams.font.fontFamily
          }
          maxWidth = ctx.measureText(element.insert).width
          if(element.insert != '^'){
            ctx.save()
            // align
            if(element.attributes.align == 'center'){
              ctx.textAlign='center'
              x = width/2
              x0 = width > maxWidth ? (width - maxWidth)/2 : 0
              x1 = width > maxWidth ? maxWidth + (width - maxWidth)/2 + c : width
              ox = x0 - r
            }else if(element.attributes.align == 'right'){
              ctx.textAlign='right'
              x =  width - staticC
              x0 = width > maxWidth ? width - staticC : 0
              x1 = width > maxWidth ? width - maxWidth: 0
              ox = x1 - r
            }else {
              ctx.textAlign='left'
              x = staticC
              x0 = staticC
              x1 = width > maxWidth ? maxWidth + staticC : width
              ox = r
              if(list){
                x = 2*r
                x0 = x
                x1 = x1 + 2*r
              }
            }
            ctx.textBaseline="middle"
            // bold canvas里面很多字体没有加粗
            if(bold){
              that.mark_size.height = that.mark_size.height + (parseInt(that.font.lineHeight) + 2) * fontSize
              ctx.fillText(element.insert, x * fontSize, (that.mark_size.height - (parseInt(that.font.lineHeight) + 2)/2)  * fontSize)
            }else{
              that.mark_size.height = that.mark_size.height + that.font.lineHeight * fontSize
              ctx.fillText(element.insert, x * fontSize, (that.mark_size.height - that.font.lineHeight/2) * fontSize)
            }
            // TODO strike
            // var strike = element.attributes.strike
            // if(strike){
            //   ctx.save()
            //   ctx.moveTo (x0,that.mark_size.height - (mParams.font.lineHeight * fontSize)/2)
            //   ctx.lineTo (x1,that.mark_size.height - (mParams.font.lineHeight * fontSize)/2)
            //   ctx.lineWidth = 1;
            //   ctx.strokeStyle = mParams.font.color
            //   ctx.stroke()
            //   ctx.restore()
            // }
            // underline
            var underline = element.attributes.underline
            if(underline){
              ctx.save()
              ctx.moveTo (x0,that.mark_size.height)
              ctx.lineTo (x1,that.mark_size.height)
              ctx.lineWidth = 1;
              ctx.strokeStyle = mParams.font.color
              ctx.stroke()
              ctx.restore()
            }

            ctx.restore()
          }else {
            that.mark_size.height = that.mark_size.height + mParams.font.lineHeight * fontSize
          }
          // list
          if(list){
            ctx.save()
            ctx.beginPath();
            ctx.arc(ox,that.mark_size.height - (mParams.font.lineHeight * fontSize)/2 + r,r,0,2*Math.PI);
            ctx.fill()
            ctx.restore()
          }
        }

        // 特殊效果 B！
        var lineNum = that.txtArr.length,
        lineWidth = that.getLineWidth(that.txtArr),
        targetX = 0
        for(var j = 0; j < that.specialArr.length; j++){
          var element = that.specialArr[j],
          start = element.start,
          end = element.end,
          startLine = start <= 0 ? 1 : (start/lineWidth == 1 ? 2 : Math.ceil(start/lineWidth)),
          startX = startLine <= 1 ? start : (start - (startLine-1)*lineWidth),
          endLine = end <= lineWidth ? 1 : Math.ceil(end/lineWidth),
          endX = end - (endLine-1)*lineWidth
          // strike
          if(element.strike){
            ctx.save()
            if(startLine == endLine){
              // 同一行
              var x0 = startX % lineWidth, y0 = (startLine - 0.5) * mParams.font.lineHeight, x1 = end % lineWidth
              ctx.moveTo(x0, y0)
              ctx.lineTo(x1, y0)
            }else {
              // 不止一行
              // 起始行(行尾结束)
              var x0 = startX, y0 = (((startLine - 1) < 0 ? 0 : (startLine - 1)) + .5)*mParams.font.lineHeight
              ctx.moveTo(x0, y0)
              ctx.lineTo(lineWidth, y0)
              // 中间行
              var num = endLine - startLine - 1
              if(num == 0){
                // 如果中间行为0

              }else {
                // 如果中间行不为0
                for(var k = 1; k <= num; k++){
                  y0 = (((startLine + k) < 0 ? 0 : (startLine + k)) - 0.5)*mParams.font.lineHeight
                  ctx.moveTo(0, y0)
                  ctx.lineTo(lineWidth, y0)
                }
              }
              // 结束行
              y0 = (endLine - .5)*mParams.font.lineHeight
              x0 = 0
              var x1 = end - (endLine - 1) * lineWidth
              ctx.moveTo(x0, y0)
              ctx.lineTo(x1, y0)
            }
            ctx.stroke()
            ctx.restore()
          }
        }
        // 特殊效果 E!

        if( height > that.staticHeight ){
           that.mark_size.height = that.mark_size.height - (height - that.staticHeight)/2
        }

        /**
         * tips:如果传入的类型非“image/png”，但是返回的值以“data:image/png”开头，那么该传入的类型是不支持的
         */
        setTimeout(function() {
          var image = new Image()
          var imgUrl = canvas.toDataURL("image/png")
          image.src = imgUrl
          image.onload = function() {
            if(mParams.type == 'preview'){
              that.$("#mx_textIconPreImg").setAttribute("src", imgUrl)
              that.preImg = imgUrl
              if(image.width < 379){
                that.$("#fontIcon .preview").style.left = -image.width-5 + 'px'
              }else {
                that.$("#fontIcon .preview").style.left = '-385px'
              }
              that.$('.loadingWrap').style.height = that.$('#textIconPreview').style.height + 'px'
              
              that.loading = false
            }else {
              that.download(imgUrl)
            }
          }
        }, 500)
      }
    },
    /**
     * 自动换行
     */
    autoLine: function(insert,ctx,staticC){
      var that = this
      var insertArr = insert.split(""),c = 10
      var tplStr = ''
      var tplLength = 0
      var tplTextArr = []
      var c = staticC ? staticC : 0
      that.isAutoLine = false
      for(var j =0; j < insertArr.length; j++){
        tplStr += insertArr[j]
        tplLength += ctx.measureText(insertArr[j]).width
        if(tplLength > (that.size.width-2*c)){
          tplTextArr.push(tplStr.substr(0, tplStr.length - 1))
          tplStr = insertArr[j]
          tplLength = ctx.measureText(insertArr[j]).width
          that.isAutoLine = true
        }else if(tplLength == (that.size.width-2*c)){
          tplTextArr.push(tplStr)
          tplStr = ''
          tplLength = 0
          that.isAutoLine = true
        }
      }
      var strNum = 0
      for(var i = 0; i < tplTextArr.length; i++){
        strNum += tplTextArr[i].length
      }
      tplTextArr.push(insert.substring(strNum,insert.length))
      return tplTextArr
    },
    // 构建数组
    getSpecialElement: function(element, preElement, currLen, lineWidth){
      var start = currLen

      this._ctx.save()

      if(element.attributes && element.attributes.bold){
        this._ctx.font = (parseInt(this.font.fontSize) + 2 ) + "px " + this.font.fontFamily
      }else {
        this._ctx.font = this.font.fontSize + "px " + this.font.fontFamily
      }
      if(element.insert == "^"){
        if( (preElement && preElement.insert == "^") || (preElement == undefined) ){
          // 处理空行
          currLen += lineWidth
        }else{
          // 处理换行
          currLen += lineWidth - ( currLen % lineWidth )
        }
      }else {
        currLen = currLen + this._ctx.measureText(element.insert).width
      }

      this._ctx.restore()

      return {
        'currLen': currLen,
        'start': start,
        'end': element.attributes?currLen:0,// 0 表示非特殊
        'bold': element.attributes && element.attributes.bold,
        'underline': element.attributes && element.attributes.underline,
        'strike': element.attributes && element.attributes.strike,
        'list': element.attributes && element.attributes.list,
        'align': element.attributes && element.attributes.align
      }
    },
    formate: function(arr, ctx, staticC){
      var type = 1

      if(type == 1){
        if(!arr){
         this.isDebug && console.log('[err]formate-arr不存在')
         return
        }
        var that = this,
        textArr = [],
        groupArr = [],
        lineBreak = false

        this.isDebug && console.log("```原始数组");this.isDebug && console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          var element = arr[i]
          var reg = new RegExp(/\n/g);
          if( element.insert ){
            var flag = reg.test(element.insert)
            if( flag && element.insert.length == 1 && i > 0){
              textArr.push({
                'insert': '^',
                'attributes': element.attributes ? element.attributes : ''
              })
            }else if(flag && (element.insert.length > 1) ){
              var splitInsert = element.insert.replace(/\n/g, '^'),
              splitArr = splitInsert.split(''),
              splitStr = ''
              for(var j=0; j <splitArr.length; j++){
                if(splitArr[j]){
                  if(splitArr[j] != '^'){
                    if(j < splitArr.length -1){
                      splitStr += splitArr[j]
                    }else {
                      textArr.push({
                        'insert': splitStr,
                        'attributes': element.attributes ? element.attributes : ''
                      })
                      splitStr = ''
                    }
                  }else {
                    if((j <= 0 || splitArr[j-1] != '^') && splitStr){
                      textArr.push({
                        'insert': splitStr,
                        'attributes': element.attributes ? element.attributes : ''
                      })
                      splitStr = ''
                    }
                    textArr.push({
                      'insert': '^',
                      'attributes': element.attributes ? element.attributes : ''
                    })
                  }
                }
              }
            }else {
              textArr.push({
                'insert': element.insert,
                'attributes': element.attributes ? element.attributes : ''
              })
            }
          }else{
            this.isDebug && console.log('[err]insert不存在')
          }
        }

        this.isDebug && console.log('```第一次转化后的数组')
        this.isDebug && console.log(textArr)

        var txtArr = [],
        insertArr =[]
        that.specialArr = []
        for(var i=0; i<textArr.length; i++){
          var element = textArr[i],
          preElement = textArr[i-1]

          if(element.insert === '^'){
            if(i>0){
              var list = element.attributes.list ? element.attributes.list : false,
              align = element.attributes.align ? element.attributes.align : false,
              txt
              if(preElement.insert != "^"){
                txt = {
                  'insert': insertArr,
                  'attributes': {
                    'bold': false,
                    'underline': false,
                    'strike': false,
                    'list': list,
                    'align': align
                  }
                }
                insertArr = []
              }else {
                txt = {
                  'insert': "^",
                  'attributes': {
                    'bold': false,
                    'underline': false,
                    'strike': false,
                    'list': false,
                    'align': false
                  }
                }
              }
            }else{
              txt = {
                'insert': "^",
                'attributes': {
                  'bold': false,
                  'underline': false,
                  'strike': false,
                  'list': false,
                  'align': false
                }
              }
            }
            txtArr.push(txt)
          }else{
            var bold = element.attributes && element.attributes.bold ? element.attributes.bold : false,
            underline = element.attributes && element.attributes.underline ? element.attributes.underline : false,
            strike = element.attributes && element.attributes.strike ? element.attributes.strike : false
            var insert = {
              'insert': element.insert,
              'attributes': {
                'bold': bold,
                'underline': underline,
                'strike': strike,
                'list': false,
                'align': false
              }
            }
            insertArr.push(insert)
          }
        }
        this.isDebug && console.log('```第二次转化后的数组')
        this.isDebug && console.log(txtArr)

        // 新尝试 B!
        // 拆分、分行（已经分段、insert里面的数据格式是数组、段里面要分行）
        var lineArr = []
        for(var i = 0; i < txtArr.length; i++){
          var element = txtArr[i]
          var inserts = element.insert
          var insertStr = ''
          var insertLength = 0
          var insertAttributes = insert.attributes
          var markStart = 0// 行内标记开始的位置
          var markEnd = 0// 行内标记结束的位置
          var lineTextArr = []

          if(inserts == '^') {
            return
          }
          for(var j = 0; j < inserts.length; j++){
            var insert = inserts[j].insert

            try {
              var insertArr = insert.split("")
            } catch (error) {
              debugger
            }
            for(var k = 0; k < insertArr.length; k++){
              insertStr += insertArr[k]// 字符

              this._ctx.save()
              if(element.attributes && element.attributes.bold){
                this._ctx.font = (parseInt(this.font.fontSize) + 2 ) + "px " + this.font.fontFamily
              }else {
                this._ctx.font = this.font.fontSize + "px " + this.font.fontFamily
              }
              insertLength += this._ctx.measureText(insertArr[k]).width// 长度
              this._ctx.restore()

              // 特殊效果
              if(insertAttributes){
                
              }

              // 分行
              if(insertLength > this.size.width){
                lineTextArr.push(insertStr.substr(0, insertStr.length - 1))

                insertStr = insertArr[k]
                insertLength = this._ctx.measureText(insertArr[k]).width
              }else if(insertLength == this.size.width){
                lineTextArr.push(insertStr)

                insertStr = ''
                insertLength = 0
              }else{
                
              }
            }
          }
          // 该段最后一行
          var currentLen = 0
          for(var l = 0; l < lineTextArr.length; l++){
            currentLen += lineTextArr[l].length
          }
          lineTextArr.push(insert.substring(currentLen, insert.length))
          lineArr = lineArr.concat(lineTextArr)
        }
        this.isDebug && console.log('```分行数组')
        this.isDebug && console.log(lineArr)
        // 新尝试 E!

        var formateArr = []
        for(var j=0; j<txtArr.length; j++){
          var element = txtArr[j],
          tpl = {},
          txtStr = '',
          bold = false,
          strike = false,
          underline = false,
          list = element.attributes.list,
          align = element.attributes.align

          if(element.insert != "^"){
            for(var k=0; k<element.insert.length; k++){
              var item = element.insert[k]
              txtStr = txtStr + item.insert
              if(item.attributes.bold){
                bold = true
              }
              if(item.attributes.strike){
                strike = true
              }
              if(item.attributes.underline){
                underline = true
              }
            }

            tpl = {
              'insert': txtStr,
              'attributes': {
                'bold': bold,
                'strike': strike,
                'underline': underline,
                'list': list,
                'align': align
              }
            }
          }else {
            tpl = element
          }
          formateArr.push(tpl)
        }
        this.isDebug && console.log('```第三次转化后的数组')
        this.isDebug && console.log(formateArr)

        // 自动换行
        var autoLineArr = []
        if(that.modelType == 0){
          if(ctx){
            for (var k = 0; k < formateArr.length; k++) {
              var element = formateArr[k];
              if(element.attributes.bold){
                ctx.font = (element.attributes.bold?'normal 900 ':'') + that.font.boldFontSize + 'px ' + that.font.fontFamily
              }else {
                ctx.font = (element.attributes.bold?'normal 900 ':'') + that.font.fontSize + 'px ' + that.font.fontFamily
              }
              var tplArr = that.autoLine(element.insert, ctx, staticC)
              if(tplArr.length > 0){
                for(var l=0; l<tplArr.length; l++){
                  var tplAutoLine = {
                    'insert': tplArr[l],
                    'attributes': {
                      'bold': element.attributes.bold,
                      'strike':  element.attributes.strike,
                      'underline':  element.attributes.underline,
                      'list':  l == 0 ? element.attributes.list : false,
                      'align':  element.attributes.align
                    }
                  }
                  autoLineArr.push(tplAutoLine)
                }
              }else {
                autoLineArr.push(element)
              }
            }
          }else {
            autoLineArr = formateArr
          }
        }else{
          autoLineArr = formateArr
        }
        
        // 特殊效果（版本1：只能实现左对齐下的效果）not do
        var currLen = 0
        var lineWidth = that.getLineWidth(autoLineArr)
        for(var i=0; i<textArr.length; i++){
          var element = textArr[i],
          preElement = i > 0 ? textArr[i-1] : undefined

          var specialTpl = that.getSpecialElement(element, preElement, currLen, lineWidth)
          if(specialTpl.end != 0){
            that.specialArr.push(specialTpl)
          }
          currLen = specialTpl.currLen
        }

        this.isDebug && console.log('```第四次转化后的数组')
        this.isDebug && console.log(autoLineArr)
        this.isDebug && console.log('```特殊标记数组')
        this.isDebug && console.log(that.specialArr)
        return autoLineArr
      }else if(type == 2){
        if(!arr){
         this.isDebug && console.log('[err]formate-arr不存在')
         return
        }
        var that = this,
        textArr = [],
        groupArr = [],
        lineBreak = false

        this.isDebug && console.log("```原始数组");this.isDebug && console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          var element = arr[i]
          var reg = new RegExp(/\n/g);
          if( element.insert ){
            var flag = reg.test(element.insert)
            if( flag && element.insert.length == 1 && i > 0){
              textArr.push({
                'insert': '^',
                'attributes': element.attributes ? element.attributes : ''
              })
            }else if(flag && (element.insert.length > 1) ){
              var splitInsert = element.insert.replace(/\n/g, '^'),
              splitArr = splitInsert.split(''),
              splitStr = ''
              for(var j=0; j <splitArr.length; j++){
                if(splitArr[j]){
                  if(splitArr[j] != '^'){
                    if(j < splitArr.length -1){
                      splitStr += splitArr[j]
                    }else {
                      textArr.push({
                        'insert': splitStr,
                        'attributes': element.attributes ? element.attributes : ''
                      })
                      splitStr = ''
                    }
                  }else {
                    if((j <= 0 || splitArr[j-1] != '^') && splitStr){
                      textArr.push({
                        'insert': splitStr,
                        'attributes': element.attributes ? element.attributes : ''
                      })
                      splitStr = ''
                    }
                    textArr.push({
                      'insert': '^',
                      'attributes': element.attributes ? element.attributes : ''
                    })
                  }
                }
              }
            }else {
              textArr.push({
                'insert': element.insert,
                'attributes': element.attributes ? element.attributes : ''
              })
            }
          }else{
            this.isDebug && console.log('[err]insert不存在')
          }
        }
        this.isDebug && console.log('```第一次转化后的数组')
        this.isDebug && console.log(textArr)

        var txtArr = [],
        insertArr =[]
        that.specialArr = []
        for(var i=0; i<textArr.length; i++){
          var element = textArr[i],
          preElement = textArr[i-1]

          if(element.insert === '^'){
            if(i>0){
              var list = element.attributes.list ? element.attributes.list : false,
              align = element.attributes.align ? element.attributes.align : false,
              txt
              if(preElement.insert != "^"){
                txt = {
                  'insert': insertArr,
                  'attributes': {
                    'bold': false,
                    'underline': false,
                    'strike': false,
                    'list': list,
                    'align': align
                  }
                }
                insertArr = []
              }else {
                txt = {
                  'insert': "^",
                  'attributes': {
                    'bold': false,
                    'underline': false,
                    'strike': false,
                    'list': false,
                    'align': false
                  }
                }
              }
            }else{
              txt = {
                'insert': "^",
                'attributes': {
                  'bold': false,
                  'underline': false,
                  'strike': false,
                  'list': false,
                  'align': false
                }
              }
            }
            txtArr.push(txt)
          }else{
            var bold = element.attributes && element.attributes.bold ? element.attributes.bold : false,
            underline = element.attributes && element.attributes.underline ? element.attributes.underline : false,
            strike = element.attributes && element.attributes.strike ? element.attributes.strike : false
            var insert = {
              'insert': element.insert,
              'attributes': {
                'bold': bold,
                'underline': underline,
                'strike': strike,
                'list': false,
                'align': false
              }
            }
            insertArr.push(insert)
          }
        }
        this.isDebug && console.log('```第二次转化后的数组')
        this.isDebug && console.log(txtArr)

        // 拆分、分行（已经分段、insert里面的数据格式是数组、段里面要分行）
        var lineArr = []
        for(var i = 0; i < txtArr.length; i++){
          var element = txtArr[i]
          var inserts = element.insert
          var insertStr = ''
          var insertLength = 0
          var insertAttributes = insert.attributes
          var markStart = 0// 行内标记开始的位置
          var markEnd = 0// 行内标记结束的位置
          var lineTextArr = []

          if(inserts == '^') {
            return
          }
          for(var j = 0; j < inserts.length; j++){
            var insert = inserts[j].insert

            try {
              var insertArr = insert.split("")
            } catch (error) {
              debugger
            }
            for(var k = 0; k < insertArr.length; k++){
              insertStr += insertArr[k]// 字符

              this._ctx.save()
              if(element.attributes && element.attributes.bold){
                this._ctx.font = (parseInt(this.font.fontSize) + 2 ) + "px " + this.font.fontFamily
              }else {
                this._ctx.font = this.font.fontSize + "px " + this.font.fontFamily
              }
              insertLength += this._ctx.measureText(insertArr[k]).width// 长度
              this._ctx.restore()

              // 特殊效果
              if(insertAttributes){
                
              }

              // 分行
              if(insertLength > this.size.width){
                lineTextArr.push(insertStr.substr(0, insertStr.length - 1))

                insertStr = insertArr[k]
                insertLength = this._ctx.measureText(insertArr[k]).width
              }else if(insertLength == this.size.width){
                lineTextArr.push(insertStr)

                insertStr = ''
                insertLength = 0
              }else{
                
              }
            }
          }
          // 该段最后一行
          var currentLen = 0
          for(var l = 0; l < lineTextArr.length; l++){
            currentLen += lineTextArr[l].length
          }
          lineTextArr.push(insert.substring(currentLen, insert.length))
          lineArr = lineArr.concat(lineTextArr)
        }
        this.isDebug && console.log('```分行数组')
        this.isDebug && console.log(lineArr)

        var formateArr = []
        for(var j=0; j<txtArr.length; j++){
          var element = txtArr[j],
          tpl = {},
          txtStr = '',
          bold = false,
          strike = false,
          underline = false,
          list = element.attributes.list,
          align = element.attributes.align

          if(element.insert != "^"){
            for(var k=0; k<element.insert.length; k++){
              var item = element.insert[k]
              txtStr = txtStr + item.insert
              if(item.attributes.bold){
                bold = true
              }
              if(item.attributes.strike){
                strike = true
              }
              if(item.attributes.underline){
                underline = true
              }
            }

            tpl = {
              'insert': txtStr,
              'attributes': {
                'bold': bold,
                'strike': strike,
                'underline': underline,
                'list': list,
                'align': align
              }
            }
          }else {
            tpl = element
          }
          formateArr.push(tpl)
        }
        this.isDebug && console.log('```第三次转化后的数组')
        this.isDebug && console.log(formateArr)

        // 自动换行
        var autoLineArr = []
        if(that.modelType == 0){
          if(ctx){
            for (var k = 0; k < formateArr.length; k++) {
              var element = formateArr[k];
              if(element.attributes.bold){
                ctx.font = (element.attributes.bold?'normal 900 ':'') + that.font.boldFontSize + 'px ' + that.font.fontFamily
              }else {
                ctx.font = (element.attributes.bold?'normal 900 ':'') + that.font.fontSize + 'px ' + that.font.fontFamily
              }
              var tplArr = that.autoLine(element.insert, ctx, staticC)
              if(tplArr.length > 0){
                for(var l=0; l<tplArr.length; l++){
                  var tplAutoLine = {
                    'insert': tplArr[l],
                    'attributes': {
                      'bold': element.attributes.bold,
                      'strike':  element.attributes.strike,
                      'underline':  element.attributes.underline,
                      'list':  l == 0 ? element.attributes.list : false,
                      'align':  element.attributes.align
                    }
                  }
                  autoLineArr.push(tplAutoLine)
                }
              }else {
                autoLineArr.push(element)
              }
            }
          }else {
            autoLineArr = formateArr
          }
        }else{
          autoLineArr = formateArr
        }
        
        // 特殊效果（版本1：只能实现左对齐下的效果）not do
        var currLen = 0
        var lineWidth = that.getLineWidth(autoLineArr)
        for(var i=0; i<textArr.length; i++){
          var element = textArr[i],
          preElement = i > 0 ? textArr[i-1] : undefined

          var specialTpl = that.getSpecialElement(element, preElement, currLen, lineWidth)
          if(specialTpl.end != 0){
            that.specialArr.push(specialTpl)
          }
          currLen = specialTpl.currLen
        }

        this.isDebug && console.log('```第四次转化后的数组')
        this.isDebug && console.log(autoLineArr)
        this.isDebug && console.log('```特殊标记数组')
        this.isDebug && console.log(that.specialArr)
        return autoLineArr
      }
    },
    getLineWidth(arr) {
      var tplwidth = 0, lineWidth = 0
      for(var i = 0; i < arr.length; i++){
        var element = arr[i]
        this._ctx.save()
        if(element.attributes && element.attributes.bold){
          this._ctx.font = (parseInt(this.font.fontSize) + 2 ) + "px " + this.font.fontFamily
        }else {
          this._ctx.font = this.font.fontSize + "px " + this.font.fontFamily
        }
        tplwidth = this._ctx.measureText(element.insert).width
        this._ctx.restore()

        if(element.insert != "^"){
          if(tplwidth > lineWidth){
            lineWidth = tplwidth
          }
        }
      }
      if(this.isAutoLine){
        return lineWidth
      }else {
        return this.size.width
      }
    },
    /**
     * 下载
     */
    download: function(imgData){
      this.downloadFile('pic.png', imgData);
    },
    downloadFile: function(fileName, content) {
      let aLink = document.createElement('a');
      let blob = this.base64ToBlob(content); //new Blob([content]);

      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);

      // aLink.dispatchEvent(evt);
      aLink.click()
    },
    base64ToBlob: function(code) {
      let parts = code.split(';base64,');
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {type: contentType});
    },
    /**
     * 校验
     */
    check: function(){
      if(this.txtArr.length == 0){
        alert('文本不能为空~')
        return false
      }
      return true
    }
  },
  mounted () {
    // 大小
    var that = this
    var html = '<select class="ql-align" id="fontSizeSel" style="width:52.5px;vertical-align: top;margin: 3px 5px;">\
        <optgroup label="字体大小" style="color: #565656;font-weight: 300;"></optgroup>\
        <option value="12">12px</option>\
        <option value="14">14px</option>\
        <option value="16">16px</option>\
        <option value="18">18px</option>\
        <option value="20">20px</option>\
        <option value="22">22px</option>\
        <option value="24">24px</option>\
        <option value="26">26px</option>\
        <option value="28" selected="selected">28px</option>\
        <option value="36">36px</option>\
        <option value="48">48px</option>\
        <option value="72">72px</option>\
      </select>';
    this.$(".ql-toolbar .ql-formats").insertAdjacentHTML('beforeend', html)
    this.$(".ql-container .ql-editor").style.fontSize = '28px'
    this.$("#fontSizeSel").addEventListener('change', function(e){
      if(!that.check()){
        return
      }
      that.$(".ql-container .ql-editor").style.fontSize = this.value + 'px'
      that.$(".ql-container .ql-editor").style.lineHeight = parseInt(this.value) + parseInt(that.$("#lineHeightSel").value) + 'px'
      that.font.fontSize = this.value
      that.font.boldFontSize = parseInt(this.value)+2
      that.font.lineHeight = parseInt(this.value) + parseInt(that.$("#lineHeightSel").value)
      that.markSize()
    })
    // 行间距
    var html1 = '<select class="ql-align" id="lineHeightSel" style="width:44.5px;vertical-align: top;margin: 3px 5px;">\
        <optgroup label="行间距" style="color: #565656;font-weight: 300;"></optgroup>\
        <option value="1">1px</option>\
        <option value="2">2px</option>\
        <option value="3">3px</option>\
        <option value="4">4px</option>\
        <option value="5">5px</option>\
        <option value="6" selected="selected">6px</option>\
      </select>';
    this.$(".ql-toolbar .ql-formats").insertAdjacentHTML('beforeend', html1)
    this.$(".ql-container .ql-editor").style.lineHeight= (parseInt(that.font.fontSize) + 6) +"px";
    this.$("#lineHeightSel").addEventListener('change', function(e){
      if(!that.check()){
        return
      }
      that.$(".ql-container .ql-editor").style.lineHeight = (parseInt(that.font.fontSize) + parseInt(this.value)) + 'px'
      that.font.lineHeight = parseInt(that.font.fontSize) +  parseInt(this.value)
      that.markSize()
    }) 
    // 取色
    for (var i = 0; i < this.$$("#fontIcon .m-colorPicker .bd h3").length; i++) {
      var element = this.$$("#fontIcon .m-colorPicker .bd h3")[i];
      element.style.display = 'none'
    }
    this.$$("#fontIcon .m-colorPicker .bd h3")[2].style.display = 'block'
    this.$$("#fontIcon .m-colorPicker .bd h3")[5].style.display = 'block'
    for (var i = 0; i < this.$$("#fontIcon .m-colorPicker .bColor").length; i++) {
      var element = this.$$("#fontIcon .m-colorPicker .bColor")[i];
      element.style.display = 'none'
    }
    for (var i = 0; i < this.$$("#fontIcon .m-colorPicker .hd").length; i++) {
      var element = this.$$("#fontIcon .m-colorPicker .hd")[i];
      element.style.marginBottom = '10px'
    }
    // 倍数 缩小
    var $editor = this.$("#fontIcon .ql-editor")
    $editor.style.width = '780px'
    $editor.style.marginLeft = '-202px'
    $editor.style.transformOrigin = 'top'
    $editor.style.transform = 'scale(.5)'
    var $quillEditor = this.$("#fontIcon .quill-editor")
    $quillEditor.style.maxHeight = '200px'
    $quillEditor.style.overflowX = 'hidden'
    $quillEditor.style.maxHeight = '200px'
    var $qlToolbar = this.$("#fontIcon .ql-toolbar")
    $qlToolbar.style.position = "absolute"
    $qlToolbar.style.top = "-54px"
    $qlToolbar.style.width = "385px"

    // $qlToolbar.style.
    // $editor.style.height = 'calc(height/2)'
    // var ele = document.createElement('div')
    // le.className='ql-editor-wrap';
    // $editor.parentNode.replaceChild(ele, lable)
    // ele.appendChild($editor)
  }
}
</script>

<style lang="scss" scoped>
.quillControl{position: relative;margin-top:50px;}
input[type="radio"] {background-color: initial;cursor: default;-webkit-appearance: radio;box-sizing: border-box;margin: 5px;padding: initial;border: initial;vertical-align: top;}
label.radio {vertical-align: top;font-size: 12px;font-weight: normal;color: #565656;display: inline-block;height: auto;}
.inputText {height: 23px;line-height: 23px;}
#fontIcon .ql-container{height: calc(height/2);}
.transformOrigin {transform-origin: center,top;}
.hide {display: none;}
.mx_bottomBarBig {width: 419px;background: #fff;margin-top: -8px;position: relative;}
.mx-top-line {border-top: #cccccc solid 1px;}
.mx_bottomBar .mx-btn {border: rgba(0, 125, 113, 1) solid 1px;display:inline-block;border-radius: 4px;}
.mx-btn-MIDDLE {width: 118px; height: 40px; line-height: 40px;}
.mx-btn-NORMAL {color: #333;vertical-align: bottom;}
.mx-btn-FILLED {color: #fff;background: rgba(0, 125, 113, 1);vertical-align: bottom;}
.mx-btn-MIDDLE {width: 118px;}
.mx-center {text-align: center;padding: 15px;display: block;font-size:16px;}
input[type="text"],select {width: 290px;height: 38px;line-height: 38px;padding: 0px 6px;vertical-align: top;border: 1px solid #cccccc;border-radius: 3px;}
.mx_input_short {width: 72px !important;}
.preview{
  height: auto;
  width: auto;
  min-width: 200px;
  min-height: 50px;
  padding-right: 4px;
  max-width: 379px;
  max-height: 523px;
  background: #fff;
  position: absolute;
  top: -1px;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  overflow-y: scroll;
  overflow-x: hidden;
  border: #cccccc solid 1px;
  display: none;
  left: -200px;
}
.x {
  display: inline-block;
  font-size: 12px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  vertical-align: top;
}
.m-colorPicker .hd {
  margin-bottom: 10px !important;
}
.fontIcon {
  width: 100%;
  height: auto;
  position: relative;
  img {
    width: auto;
    height: auto;
    max-width: 375px;
    vertical-align: bottom;
  }
  .control {
    width:419px;
    height: auto;
    background: #fff;
    position: absolute;
    top: 39.2px;
    right: 100px;
    border: #cccccc solid 1px;
  }
}
.mx_set {
  padding: 0 15px 15px 15px;
  height: 392px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 390px;
}
.fontIcon .iconMig {
  width: 80px;
  height: auto;
}
#fontIcon .control {
  display: none;
}
#fontIcon .control .loadingImg {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 50%;
  margin-left: -20px;
}
.loadingWrap {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
}
.ql-editor::-webkit-input-placeholder {
    color: #fff;
   /* 字体大小直接写样式即可 */
    font-size: 28px;
}
.mx_set::-webkit-scrollbar {width: 5px;background-color:#c1c1c1;}
.mx_set::-webkit-scrollbar-track{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);background-color:#f1f1f1;}
.mx_set::-webkit-scrollbar-thumb{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);box-shadow: inset 0 0 6px rgba(0,0,0,.3);  background-color:#c1c1c1;} 
.preview::-webkit-scrollbar {width: 5px;background-color:#c1c1c1;}
.preview::-webkit-scrollbar-track{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);background-color:#f1f1f1;}
.preview::-webkit-scrollbar-thumb{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);box-shadow: inset 0 0 6px rgba(0,0,0,.3);  background-color:#c1c1c1;}
#fontIcon .quill-editor::-webkit-scrollbar {width: 5px;background-color:#c1c1c1;}
#fontIcon .quill-editor::-webkit-scrollbar-track{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);background-color:#f1f1f1;}
#fontIcon .quill-editor::-webkit-scrollbar-thumb{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);box-shadow: inset 0 0 6px rgba(0,0,0,.3);  background-color:#c1c1c1;}
.mx-title {padding-left: 15px;font-size: 18px;font-weight: 600;color: #565656;height: 48px;line-height: 48px;}
.mx-bottom-line {border-bottom: #cccccc solid 1px;}
.mx-subtitle {font-size: 14px;font-weight: normal;color: #565656;height: 40px !important;line-height: 40px !important;}
.controls {display: block;height: auto;h2 {height: 38px;line-height: 38px;}}
</style>
