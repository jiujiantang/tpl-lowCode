<template>
  <div class="app-container">
	 <div class="viewPageWrap">
        <div class="viewWrap">
            <!-- 预览 B! -->
            <div id="gamePreviewPage" class="game-preview-page">
                <!-- 中间的 路由 router-view 区域 -->
                <transition>
                    <router-view ></router-view>
                </transition>
            </div>
            <!-- 配置项 B! -->
            <div class="mx_configuration">
                <!-- 背景 B! -->
                <div class="controlP-BG_PAGE mx-controlP" :style="{ display: currControl == 'BG_PAGE' ? 'inline-block' :'none' }" >
                    <h1 class="mx-title mx-bottom-line">背景模块</h1>
                    <div class="mx_set_background_style">
                        <div class="control-group">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>风格选择<span class="help-inline"></span></h2>
                            <label class="radio inline"> 
                                <input type="radio" value="0" v-model="BG_PAGE.moduleBgType" @change="doModuleBgType" /><span class="inputText">系统预设</span><br>
                                <input type="radio" value="1" v-model="BG_PAGE.moduleBgType" @change="doModuleBgType" /><span class="inputText">自定义样式<span class="help-inline">（图片上传）</span></span>
                            </label>
                        </div>
                        <div class="control-group" v-show="!Number( BG_PAGE.moduleBgType )">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>背景颜色<span class="help-inline">（点击选中颜色）</span></h2>
                            <div class="controls">
                                <my-color-picker v-model="BG_PAGE.color"></my-color-picker>
                            </div>
                        </div>
                        <div class="control-group mx_upImg" v-show="!!Number( BG_PAGE.moduleBgType )">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>背景图片<span class="help-inline">（图片像素建议为：{{BG_PAGE.style.width}}px*{{BG_PAGE.style.height}}px）</span></h2>
                            <div class="">
                                <input type="text" class="mx_input_short" value="" v-model="BG_PAGE.path"/>
                                <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);"  @click="browse">浏览...</a>
                                <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" @click="submitUpload">上传</a>
                                <a href="javascript:;" class="vb cover-recovery" @click="zero">恢复默认</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 图片背景 B! -->
                <div class="controlP-BG_IMG mx-controlP" :style="{ display: currControl == 'BG_IMG' ? 'inline-block' :'none' }">
                    <h1 class="mx-title mx-bottom-line" >图片</h1>
                    <div v-if="BG_IMG.way != -1">
                        <div class="controls">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件名称<span class="help-inline"></span></h2>
                            <label class="radio inline"> 
                                <input type="text" v-model="BG_IMG.name"/><br>
                            </label>
                        </div>
                    </div>
                    
                    <div class="control-group mx_upImg" >
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>图片<span class="help-inline">（图片像素建议为：{{BG_IMG.style.width}}px*{{BG_IMG.style.height}}px）</span></h2>
                        <div class="">
                            <input type="text" class="mx_input_short" value="" v-model="BG_IMG.path"/>
                            <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                            <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" @click="submitUpload">上传</a>
                            <a href="javascript:;" class="vb cover-recovery" @click="zero">恢复默认</a>
                        </div>
                    </div>
                    <div v-if="BG_IMG.popup != -1">
                        <div class="controls">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>是否弹窗<span class="help-inline"></span></h2>
                            <label class="radio inline"> 
                                <input type="radio" value="0" v-model="BG_IMG.popup" checked="checked"/><span class="inputText">是</span><br>
                                <input type="radio" value="1" v-model="BG_IMG.popup" /><span class="inputText">否</span> 
                            </label>
                        </div>
                    </div>
                    <div v-if="BG_IMG.way != -1 && BG_IMG.popup != 0">
                        <div class="control-group">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>链接<span class="help-inline">（必须以http://或https://开始）</span></h2>
                            <div class="controls">
                                <input type="text" class="mx_input_short" value="输入链接" v-model="BG_IMG.link"/>
                            </div>
                        </div>
                        <div class="control-group">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>站外点击唤起方式<span class="help-inline"></span></h2>
                            <div class="controls">
                                <select name="awardType" class="span2" data-editable="false" v-model="BG_IMG.way" >
                                    <option value="0">点击唤起招商银行APP</option>
                                    <option value="1">点击仅跳转至链接</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="BG_IMG.animate != -1">
                        <my-animate v-model="BG_IMG.animate"></my-animate>
                    </div>
                    <div v-if="BG_IMG.hidden != -1">
                        <div class="controls">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>是否展示<span class="help-inline"></span></h2>
                            <label class="radio inline"> 
                                <input type="radio" value="0" v-model="BG_IMG.hidden" checked="checked"/><span class="inputText">是</span><br>
                                <input type="radio" value="1" v-model="BG_IMG.hidden" /><span class="inputText">否</span> 
                            </label>
                        </div>
                    </div>
                </div>
                <!-- 图片带链接 B! -->
                <div class="controlP-BG_IMG_href mx-controlP" :style="{ display: currControl == 'BG_IMG_href' ? 'inline-block' :'none' }">
                    <h1 class="mx-title mx-bottom-line" >图片</h1>
                    <div class="controls">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件名称<span class="help-inline"></span></h2>
                        <label class="radio inline"> 
                            <input type="text" v-model="BG_IMG_href.name"/><br>
                        </label>
                    </div>
                    <div class="control-group mx_upImg" >
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>图片<span class="help-inline">（图片像素建议为：{{BG_IMG_href.style.width}}px*{{BG_IMG_href.style.height}}px）</span></h2>
                        <div class="">
                            <input type="text" class="mx_input_short" value="" v-model="BG_IMG_href.path"/>
                            <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                            <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" @click="submitUpload">上传</a>
                            <a href="javascript:;" class="vb cover-recovery" @click="zero">恢复默认</a>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>链接<span class="help-inline">（必须以http://或https://开始）</span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" value="输入链接" v-model="BG_IMG_href.link"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>站外点击唤起方式<span class="help-inline"></span></h2>
                        <div class="controls">
                            <select name="awardType" class="span2" data-editable="false" v-model="BG_IMG_href.way" >
                                <option value="0">点击唤起招商银行APP</option>
                                <option value="1">点击仅跳转至链接</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- banner B! -->
                <div class="controlP-P_BANNER mx-controlP" :style="{ display: currControl == 'P_BANNER' ? 'inline-block' :'none' }">
                    <h1 class="mx-title mx-bottom-line" >轮播图</h1>
                    <div class="controls">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件名称<span class="help-inline"></span></h2>
                        <label class="radio inline"> 
                            <input type="text" v-model="P_BANNER.name"/><br>
                        </label>
                    </div>
                    <div class="control-group mx_upImg" >
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>图片一<span class="help-inline">（图片像素建议为：174px*143px）</span></h2>
                        <div class="">
                            <input type="text" class="mx_input_short" value="" v-model="P_BANNER.path"/>
                            <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                            <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" @click="submitUpload">上传</a>
                            <a href="javascript:;" class="vb cover-recovery" @click="zero">恢复默认</a>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>链接一<span class="help-inline">（必须以http://或https://开始）</span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" value="输入链接" v-model="P_BANNER.link"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>站外点击唤起方式<span class="help-inline"></span></h2>
                        <div class="controls">
                            <select name="awardType" class="span2" data-editable="false" v-model="P_BANNER.way" >
                                <option value="0">点击唤起招商银行APP</option>
                                <option value="1">点击仅跳转至链接</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group mx_upImg" >
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>图片二<span class="help-inline">（图片像素建议为：174px*143px）</span></h2>
                        <div class="">
                            <input type="text" class="mx_input_short" value="" v-model="P_BANNER.path1"/>
                            <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                            <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" data-id="1" @click="submitUpload">上传</a>
                            <a href="javascript:;" class="vb cover-recovery" data-id="1" @click="zero">恢复默认</a>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>链接二<span class="help-inline">（必须以http://或https://开始）</span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" value="输入链接" v-model="P_BANNER.link1"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>站外点击唤起方式<span class="help-inline"></span></h2>
                        <div class="controls">
                            <select name="awardType" class="span2" data-editable="false" v-model="P_BANNER.way1" >
                                <option value="0">点击唤起招商银行APP</option>
                                <option value="1">点击仅跳转至链接</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group mx_upImg" >
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>图片三<span class="help-inline">（图片像素建议为：174px*143px）</span></h2>
                        <div class="">
                            <input type="text" class="mx_input_short" value="" v-model="P_BANNER.path2"/>
                            <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                            <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" data-id="2" @click="submitUpload">上传</a>
                            <a href="javascript:;" class="vb cover-recovery"  data-id="2" @click="zero">恢复默认</a>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>链接三<span class="help-inline">（必须以http://或https://开始）</span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" value="输入链接" v-model="P_BANNER.link2"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>站外点击唤起方式<span class="help-inline"></span></h2>
                        <div class="controls">
                            <select name="awardType" class="span2" data-editable="false" v-model="P_BANNER.way3" >
                                <option value="0">点击唤起招商银行APP</option>
                                <option value="1">点击仅跳转至链接</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group mx_upImg" >
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>背景图片<span class="help-inline">（图片像素建议为：650px*228px）</span></h2>
                        <div class="">
                            <input type="text" class="mx_input_short" value="" v-model="P_BANNER.path3"/>
                            <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                            <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" data-id="3" @click="submitUpload">上传</a>
                            <a href="javascript:;" class="vb cover-recovery"  data-id="3" @click="zero">恢复默认</a>
                        </div>
                    </div>
                </div>
                <!-- 文本编辑 B! -->
                <div class="controlP-P_WORD mx-controlP" :style="{ display: currControl == 'P_WORD' ? 'inline-block' :'none' }" >
                    <h1 class="mx-title mx-bottom-line">文本编辑</h1>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件内容<span class="help-inline"></span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" v-model="P_WORD.content"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>字号<span class="help-inline">(px)</span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" v-model="P_WORD.fontSize"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>行间距<span class="help-inline">(px)</span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" v-model="P_WORD.height"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="fl">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>颜色<span class="help-inline">（点击选中颜色）</span></h2>
                            <div class="controls" id="textColorPicker">
                                <my-color-picker :defaultColor="P_WORD.defaultColor" v-model="P_WORD.color" ref="mychild"></my-color-picker>
                            </div>
                        </div>
                        <div class="fl">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>背景色<span class="help-inline">（点击选中颜色）</span></h2>
                            <div class="controls">
                                <my-color-picker :defaultColor="'none'"  v-model="P_WORD.background"></my-color-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 卡片模块设置 B！-->
                <div class="controlP-CARD_NORMAL mx-controlP" :style="{ display: currControl == 'CARD_NORMAL' ? 'inline-block' :'none' }" >
                    <h1 class="mx-title mx-bottom-line">卡片模块</h1>
                    <div class="controls">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件名称<span class="help-inline"></span></h2>
                        <label class="radio inline"> 
                            <input type="text" v-model="CARD_NORMAL.name"/><br>
                        </label>
                    </div>
                    <div class="controls">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件数量<span class="help-inline"></span></h2>
                        <label class="radio inline"> 
                            <input type="radio" value="2" v-model="CARD_NORMAL.num" /><span class="inputText">两个</span> <br>
                            <input type="radio" value="3" v-model="CARD_NORMAL.num" /><span class="inputText">三个</span> <br>
                            <input type="radio" value="4" v-model="CARD_NORMAL.num" /><span class="inputText">四个</span> <br>
                        </label>
                    </div>
                    <div class="controls">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件状态<span class="help-inline"></span></h2>
                        <label class="radio inline"> 
                            <input type="radio" value="0" v-model="CARD_NORMAL.status" checked="checked"/><span class="inputText">立即抢券</span><br>
                            <input type="radio" value="1" v-model="CARD_NORMAL.status" /><span class="inputText">已抢光</span> 
                        </label>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>风格选择<span class="help-inline"></span></h2>  
                        <label class="radio inline"> 
                            <input type="radio" value="0" v-model="CARD_NORMAL.moduleBgType" @change="doModuleBgType" checked="checked"/><span class="inputText">系统预设</span><br>
                            <input type="radio" value="1" v-model="CARD_NORMAL.moduleBgType" @change="doModuleBgType"/><span class="inputText">自定义样式（图片上传）</span>
                        </label>
                    </div>
                    <div class="control-group clearfix" v-show="CARD_NORMAL.moduleBgType == 0">
                        <div class="fl">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>组件颜色<span class="help-inline">（点击选中颜色）</span></h2>
                            <div class="controls">
                                <my-color-picker v-model="CARD_NORMAL.color"></my-color-picker>
                            </div>
                        </div>
                        <div class="fl" style="margin-left: 10px;" v-show="currEdit != 'rightsBg' && currEdit != 'rightsBg1'">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>按钮颜色<span class="help-inline">（点击选中颜色）</span></h2>
                            <div class="controls">
                                <my-color-picker v-model="CARD_NORMAL.btnColor"></my-color-picker>
                            </div>
                        </div>
                    </div>
                    <div class="control-group" v-show="CARD_NORMAL.moduleBgType == 1">
                        <div class="control-group mx_upImg" >
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>卡片图片<span class="help-inline">（图片像素建议为：{{CARD_NORMAL.style.width}}px*{{CARD_NORMAL.style.height}}px）</span></h2>
                            <div class="">
                                <input type="text" class="mx_input_short" value="" v-model="CARD_NORMAL.path"/>
                                <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                                <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" @click="submitUpload">上传</a>
                                <a href="javascript:;" class="vb cover-recovery" @click="zero">恢复默认</a>
                            </div>
                        </div>
                        <div class="control-group mx_upImg" v-show="currEdit != 'rightsBg' && currEdit != 'rightsBg1'">
                            <h2 class="mx-subtitle"><span class="mx-maroon">*</span>按钮图片<span class="help-inline">（图片像素建议为：{{CARD_NORMAL.style1.width}}px*{{CARD_NORMAL.style1.height}}px）</span></h2>
                            <div class="">
                                <input type="text" class="mx_input_short" value="" v-model="CARD_NORMAL.path1"/>
                                <a class="mx-btn mx-btn-NORMAL" href="javascript:void(0);" @click="browse">浏览...</a>
                                <a class="mx-btn mx-btn-FILLED" href="javascript:void(0);" data-id="1" @click="submitUpload">上传</a>
                                <a href="javascript:;" class="vb cover-recovery"  data-id="1" @click="zero">恢复默认</a>
                            </div>
                        </div>
                    </div>

                    <my-animate v-model="CARD_NORMAL.animate"></my-animate>

                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>链接<span class="help-inline">（必须以http://或https://开始）</span></h2>
                        <div class="controls">
                            <input type="text" class="mx_input_short" value="输入链接" v-model="CARD_NORMAL.link"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <h2 class="mx-subtitle"><span class="mx-maroon">*</span>站外点击唤起方式<span class="help-inline"></span></h2>
                        <div class="controls">
                            <select name="awardType" class="span2" data-editable="false" v-model="CARD_NORMAL.way" >
                                <option value="0">点击唤起招商银行APP</option>
                                <option value="1">点击仅跳转至链接</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="mx_bottomBar mx_bottomBarBig mx-top-line">
                    <div class="controls mx-center" :style="{'display' : currControl === 'none' ? 'none' : 'inline-block'}">
                        <a class="mx-btn mx-btn-NORMAL mx-btn-MIDDLE" href="javascript:void(0);" @click="cancel">取消</a>
                        <a class="mx-btn mx-btn-FILLED mx-btn-MIDDLE" href="javascript:void(0);" v-show = "edit" @click="determine">确定</a>
                    </div>
                </div>
            </div>
            <div class="pageBottom">
                <div class="wrap">
                    <div class="before mx-btn mx-btn-NORMAL mx-btn-MIDDLE" @click="before">上一步</div>
                    <div class="submit mx-btn mx-btn-FILLED mx-btn-MIDDLE" @click="temSubmit" v-show = "edit">保存</div>
                </div>
            </div>
            <!-- 工具 B! -->
            <div class="mx_tool">
                <!-- 文字转换工具 -->
                <li class="item" ><textIcon :icon="$util.path( $store.state.resPath, 'images/toolIcon01.png' )" :loadingPic="$util.path( $store.state.resPath, 'images/loading.gif' )" ></textIcon> </li>
            </div>
            <!-- 上传图片 B! -->
            <div class="pic">
                <el-upload
                    ref="upload"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    :data="resData"
                    :beforeUpload = "beforeUpload"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :on-progress="onProgress"
                    :on-change="onChange"
                    :limit="1"
                >
                <i class="el-icon-plus"></i>
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                </el-upload>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// 文字转换
import textIcon from './components/module/p_textIcon.vue'

export default {
    data() {
        return {
            dark: false,
            edit: true,
            currControl: 'BG_IMG',
            currEdit: 'screenBg',
            currIndex: 0,
            currText: 0,
            currStatusId: 0,
            upControlId: '',
            BG_PAGE: {
                moduleBgType: '1',
                color: "#000",
                path: "",
                style: {}
            },
            BG_IMG: {
                path: "",
                animate: "-1",
                hidden: 0,
                way: 0,
                link:  "http://m.cmbchina.com",
                name: "",
                popup: 0,
                style: {}
            },
            BG_IMG_href:  {
                path: "",
                link:  "http://m.cmbchina.com",
                way: 0,
                name: "底部banner",
                style: {}
            },
            P_BANNER:  {
                name: "轮播图",
                path: "",
                link:  "http://m.cmbchina.com",
                path1: "",
                link1:  "http://m.cmbchina.com",
                path2: "",
                link2:  "http://m.cmbchina.com",
                path3: "",
                link3:  "http://m.cmbchina.com",
                way: 0,
                way1: 0,
                way2: 0
            },
            P_WORD: {
                defaultColor: "#000",
                content: "笔笔享立减",
                color: "#FEDFC0",
                background: "none",
                height: "24",
                lineHeight: "24",
                fontSize: "14"
            },
            CARD_NORMAL: {
                name: "用户特权",
                num: 1,
                moduleBgType: '1',
                color: "#000",
                btnColor: "#000",
                link: "http://m.cmbchina.com",
                way: 1,
                path: "",
                path1: "",
                status: 0,
                animate: "-1",
                style: {},
                style1: {}
            },
            resData: {// TODO 图片上传参数
                imgtype: "2",
                filename: "pic" + (new Date() - new Date(1970,1,1)),
                tplRelativePath: ""
            },
            url: "http://newgametest.weijuju.com/Mpage/PicUpload_1573460781472/"// TODO 图片上传域名
        };
    },
    components: {
        textIcon
    },
    created() {
        //初始化
        this.$util.test_modifyResPath(this);// TODO
        var $this = this;
        window.addEventListener("message", function(messageEvt){
            try{
                if(messageEvt.data === "" || messageEvt.data === undefined || messageEvt.data === null){
                    return false;
                }
                $this.submit(JSON.parse(messageEvt.data));
                $this.$store.commit("modifyResPath", window.parent.document.getElementById("resPath").value);
                $this.$store.commit("modifyStatus", $this.getStatus("opr") !== "1");
                $this.resData.tplRelativePath = $this.$store.state.resPath;
            }
            catch(e){}
        })
    },
    methods: {
        getStatus: function(name){
            var url = "?" + window.parent.location.href.split("?")[1];
            return  decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || "";
        },
        beforeUpload: function(file){
            var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)

            // 背景长图上传文件大小限制1M，其他图片限制500K，动图限制2M
            if(testmsg == 'gif'){
                if( (file.size / 1024 / 1024) > 2 ) {
                    alert('上传文件大小不能超过 2MB')
                    return false
                }
            }else{
                if( this.currEdit == "mainBg" ) {
                    if( (file.size / 1024 / 1024) > 1  ) {
                        alert('上传文件大小不能超过 1MB')
                        return false
                    }
                }else {
                    if( (file.size / 1024) > 500  ) {
                        alert('上传文件大小不能超过 500KB')
                        return false
                    }
                }
            }
        },
        // 图片上传
        onSuccess:function(res){
            this.$refs.upload.clearFiles()
            this.randomName()
            this.$util.test_uploadSuccess(this, res)// TODO
            /*if(res.Status == 0 ) {
                alert("图片上传成功！点击'确定'可以在左边预览哦~")
                this[ this.currControl ][ "path" + this.upControlId ] = res.RelativePath
            }else {
                alert(res.Msg)
            }*/
        },
        onError:function(res){
            this.$refs.upload.clearFiles()
            console.log( res )
        },
        before:function(){//取消
            window.parent.document.getElementById("frameCancel").click();
        },
        temSubmit:function(){//保存
            this.$util.test_save(this)// TODO
            /*window.parent.document.getElementById("dataJson").value = JSON.stringify(this.$store.state.originalJson);//json数据
            window.parent.document.getElementById("dataImg").value = JSON.stringify(this.getImgList());
            window.parent.document.getElementById("frameSave").click();*/
        },
        getImgList: function(){
            // path数组
            var arr = []
            for( var i = 0; i < this.$store.state.originalJson.length; i++ ) {
                var tpl = this.$store.state.originalJson[i]
                for( var key in tpl ) {
                    for ( var j = 0; j <= 3; j++ ){
                        if(this.$store.state.originalJson[i][key]['src'] && this.$store.state.originalJson[i][key]['src']['path' + (j == 0 ? '' : j)] ){
                            arr.push(this.$store.state.originalJson[i][key]['src']['path' + (j == 0 ? '' : j)] )
                        }
                    }
                }
            }
            arr.push("images/icon.png")
            return arr;
        },
        onChange:function(file, fileList){
            if( !file.response ){
                alert("成功选中图片：" + file.name + "，快点击'上传'吧!")
            }
        },
        randomName() {
            var key = new Date().getTime() + Math.round(Math.random() * 100000) + '.jpg'
            var url = key
            this.resData.filename =  url
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        onProgress(res) {
            console.log( res )
        },
        browse:function(){
            console.log($(".pic div.el-upload.el-upload--text span").length)
            $(".pic div.el-upload.el-upload--text span").trigger("click")
        },
        submitUpload(e) {
            if( $(e.target).attr("data-id") ){
                this.upControlId = $(e.target).attr("data-id")
            }else{
                this.upControlId = ''
            }      
            this.$refs.upload.submit();
        },
        zero( e ) {
            if( $(e.target).attr("data-id") ){
                this.upControlId = $(e.target).attr("data-id")
            }else{
                this.upControlId = ''
            }
            this[ this.currControl ][ "path" + this.upControlId ] = this.$store.state.staticJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path" + this.upControlId ]
        },
        submit( originalJson ) {
            this.$store.commit('modifyOriginalJson', originalJson)
        },
        doModuleBgType() {
            if( this.BG_PAGE.moduleBgType === "0" ){
                console.log( "0" )
            }else if( this.BG_PAGE.moduleBgType === "1" ){
                console.log( "1" )
            }
        },
        findControlP( type ) {
            this.currControl = type
        },
        findJsonIndex( index ) {
            this.currIndex = index
        },
        findComponents( name ) {
            this.currEdit = name
        },
        finddefaultColor( defaultColor ) {
            this.P_WORD.defaultColor = defaultColor
        },
        findContentId( contentId ) {
            this.currText = contentId
        },
        findStatusId( statusId ) {
            this.currStatusId = statusId
        },
        check( e ){
            this.NAVIGATION.type = $(e.target).attr("data-type")
            $(".navigationType li").css({"border":"none"})
            $(e.target).parent("li").css({"border":"dashed #999 1px"})
        },
        cancel() {
            this.currControl = "none"
        },
        determine() {
            this.builtJson()
            this.cancel()
        },
        powerFrom( arr ) {
            // 结构： this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path" ] = this[ this.currControl ][ "path" ]
            var len = arr.length
            if(len <= 1){
                console.log("error: powerFrom")
            }
            var property = arr[len-1]
            var templ = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ]
            for(var i = 0; i < len-1; i++){
                templ = templ[arr[i]]
            }
            templ[ property ] = this[ this.currControl ][ property ]
        },
        powerTo( arr ) {
            var len = arr.length
            if(len <= 1){
                console.log("error: powerTo")
            }
            var property = arr[len-1]
            var templ = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ]
            for(var i = 0; i < len-1; i++){
                templ = templ[arr[i]]
            }
            this[ this.currControl ][ property ] = templ[ property ]
        },
        builtJson() {
            var cacheLinks =  this.$store.state.originalJson[0].extend.cacheLinks
            /**
             * 结构
             * if( this.currControl == "BG_PAGE" ) {
             *  this.powerFrom(["src", "path"])
             *  this.powerFrom(["custom", "moduleBgType"])
             * }
             */
            for (var i = 0; i < cacheLinks.length; i++) {
                var element = cacheLinks[i];
                if( element.control == this.currControl ){
                    for(var j = 0; j < element.path.length; j++){
                        this.powerFrom(element.path[j])
                    }
                }
            }
            if( this.currControl == "P_WORD" ){
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "content"+this.currText ] = this[ this.currControl ][ "content" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "color" ] = this[ this.currControl ][ "color" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "height" ] = this[ this.currControl ][ "height" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "lineHeight" ] = this[ this.currControl ][ "height" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "fontSize" ] = this[ this.currControl ][ "fontSize" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "background" ] = this[ this.currControl ][ "background" ]
            }
            if( this.currControl == "CARD_NORMAL" ){
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "animate" ] = this[ this.currControl ][ "animate" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "name" ] = this[ this.currControl ][ "name" ]
    
                // 券1的num为模块的num
                this.$store.state.originalJson[ Number( this.currIndex ) ][ "coupon1" ][ "custom" ][ "num" ] = this[ this.currControl ][ "num" ]
         
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "status" ] = this[ this.currControl ][ "status" ]

                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path" ] = this[ this.currControl ][ "path" ]
                if( this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path1" ] ) this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path1" ] = this[ this.currControl ][ "path1" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "moduleBgType" ] = this[ this.currControl ][ "moduleBgType" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "color" ] = this[ this.currControl ][ "color" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "btnColor" ] = this[ this.currControl ][ "btnColor" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "link" ] = this[ this.currControl ][ "link" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "way" ] = this[ this.currControl ][ "way" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ] = this[ this.currControl ][ "style" ]
                this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style1" ] = this[ this.currControl ][ "style1" ]
            }
        },
        builtReverse() {
            var cacheLinks =  this.$store.state.originalJson[0].extend.cacheLinks
            for (var i = 0; i < cacheLinks.length; i++) {
                var element = cacheLinks[i];
                if( element.control == this.currControl ){
                    for(var j = 0; j < element.path.length; j++){
                        this.powerTo(element.path[j])
                    }
                }
            }
            if( this.currControl == "P_WORD" ){
                this[ this.currControl ][ "content" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "content"+this.currText ]
                this[ this.currControl ][ "color" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "color" ]
                this[ this.currControl ][ "height" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "lineHeight" ]
                this[ this.currControl ][ "fontSize" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "fontSize" ]
                this[ this.currControl ][ "background" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ][ "background" ]
            }
            if( this.currControl == "CARD_NORMAL" ){
                this[ this.currControl ][ "animate" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "animate" ]
                this[ this.currControl ][ "name" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "name" ]

                // 券1的num为模块的num
                this[ this.currControl ][ "num" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ "coupon1" ][ "custom" ][ "num" ]

                this[ this.currControl ][ "status" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "status" ]

                this[ this.currControl ][ "path" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path" ]
                if( this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path1" ] )  this[ this.currControl ][ "path1" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "src" ][ "path1" ]
                this[ this.currControl ][ "moduleBgType" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "moduleBgType" ]
                this[ this.currControl ][ "color" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "color" ]
                this[ this.currControl ][ "btnColor" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "btnColor" ]
                this[ this.currControl ][ "link" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "link" ]
                this[ this.currControl ][ "way" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "way" ]
                this[ this.currControl ][ "style" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style" ]
                this[ this.currControl ][ "style1" ] = this.$store.state.originalJson[ Number( this.currIndex ) ][ this.currEdit ][ "custom" ][ "style1" ]
            }
        }
    },
    mounted() {
        var that = this
        var $editTarget = $(".editTarget")
        var html = '<div class="drap-resize_main" style="top: 0px; left: 0px; width: 100%; height: 100%; z-index: 0; transform: rotate(0deg); box-sizing: border-box;"></div>'
        $editTarget.append( html )
        $editTarget.each(function(index, dom){
            (function(){
                $(dom).on("click",function(e){
                    $(".mx_configuration").show()
                    $('.drap-resize_main').removeClass('active')
                    $(dom).find('.drap-resize_main:last').addClass('active')
                    var type = $(dom).attr('data-type')// 控制面板类型
                    var name = $(dom).attr('data-name')// 组件名字
                    var index = $(dom).attr('data-index')// 数据对应json数组的索引
                    var defaultColor = $(dom).attr('data-defaultColor')// 字体默认颜色
                    var contentId = $(dom).attr('data-contentId')// 文本索引
                    var statusId = $(dom).attr('data-statusId')// 按钮索引 值表示状态
                    console.info("type：" + type + "; index:" + index + "; name：" + name + "; defaultColor:" + defaultColor + "; contentId:" + contentId + "; statusId:" + statusId )
                    that.findControlP( type )
                    that.findJsonIndex( index )
                    that.findComponents( name )
                    that.findContentId( contentId )
                    that.findStatusId( statusId ) 
                    // 
                    if ( defaultColor ) {
                        that.finddefaultColor( defaultColor )
                        setTimeout( function(){
                            that.$refs.mychild.handleDefaultColor()
                        }, 0 )
                    }
                    // 回填
                    that.builtReverse()
                    
                    return false;
                })
            })(dom);
        })

        if( !this.$store.state.status ){
            var $inputs =  $(".mx_configuration input, .mx_configuration select"),
            $btns = $(".mx_configuration a")
            $inputs.each(function(){
                $(this).attr("disabled", "disabled")
            })
            $btns.each(function(){
                $(this).addClass("hide")
            })
        }
        
        var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            $("#gamePreviewPage").css("marginLeft",(clientWidth/2 - 375) + "px")
            $(".mx_configuration").css("left",(clientWidth/2 + 18) + "px")
            $(".mx-controlP").css("max-height", docEl.clientHeight - 133 + "px")
        };
        if (!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        recalc();
    }
};
</script>

<style lang="scss" scoped>
input:disabled, select:disabled {color: #848484 !important; background-color: #eee !important;}
.hide {display: none !important;}
input, select {border-width: 1px;color: #858585;border: 1px solid #cccccc;padding: 10px 25px 10px 10px;vertical-align: top;}
select {height: 40px;}
.inputText {height: 23px;line-height: 23px;}
.vb {font-size: 13px;color: #01b3fd;height: 40px;line-height: 40px;vertical-align: top;}
.vb:hover {color: #005580;text-decoration: underline;}
.pic {bottom: 0;position: fixed;right: 0;background: #fff;border: 1px solid black;display: none;}
.fl {float: left;}
.app-container {overflow-x: hidden;height: 3000px;}
.game-preview-page {width: 375px;height: auto;overflow: hidden;border: 1px solid black;float: left;margin: 0 auto;}
.mx_configuration {width: 458px;position: fixed;left: 377px;top: 0;overflow: hidden;color: #565656;display: none;}
.viewWrap {width: 1550px;height:  812px;
.game {width: 810px;height: auto;margin: 0 auto;position: relative;}}
body {background: #ebf1f1;font-family: "Microsoft YaHei","微软雅黑",Arial,"宋体";}
a {text-decoration:none;   }
.mx_bottomBarBig {width: 450px;background: #fff;margin-top: -8px;position: relative;}
.mx_configuration .component-IMG {width: 400px;   height: auto;background: #fff;}
.mx-controlP {width: 420px;max-height: 600px;background: #fff;overflow-x: hidden;overflow-y: scroll;padding: 0px 15px 20px;}
.mx-controlP::-webkit-scrollbar {width: 5px;background-color:#c1c1c1;}
.mx-controlP::-webkit-scrollbar-track{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);background-color:#f1f1f1;    }
.mx-controlP::-webkit-scrollbar-thumb{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);box-shadow: inset 0 0 6px rgba(0,0,0,.3);  background-color:#c1c1c1;} 
.mx-title {font-size: 18px;font-weight: 600;color: #565656;height: 48px;line-height: 48px;}
.mx-subtitle {font-size: 14px;font-weight: normal;color: #565656;height: 40px !important;line-height: 40px !important;}
.help-inline {padding-left: 5px;color: #999;font-size: 13px;display: inline-block;font-weight: 300;}
.mx-maroon {color: #d20000;padding-left: 2px;font-family: "宋体";}
select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] {padding: 7px 6px;font-family: "微软雅黑",Arial,"宋体";font-size: 12px;color: #000;border-radius: 3px;}
textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] {border-width: 1px;color: #858585;background-color: #fff;border-color: #d5d5d5;-webkit-box-shadow: none;-moz-box-shadow: none;box-shadow: none;-webkit-transition-duration: .1s;-moz-transition-duration: .1s;-o-transition-duration: .1s;transition-duration: .1s;border: 1px solid #cccccc;} 
input[type="radio"] {background-color: initial;cursor: default;-webkit-appearance: radio;box-sizing: border-box;margin: 5px;padding: initial;border: initial;vertical-align: top;}
input {-webkit-writing-mode: horizontal-tb !important;writing-mode: horizontal-tb !important;text-rendering: auto;color: initial;letter-spacing: normal;word-spacing: normal;text-transform: none;text-indent: 0px;text-shadow: none;display: inline-block;text-align: start;-webkit-appearance: textfield;background-color: white;-webkit-rtl-ordering: logical;cursor: text;margin: 0em;font: 400 13.3333px Arial;padding: 1px 0px;border-width: 2px;border-style: inset;border-color: initial;border-image: initial;}
label.radio {vertical-align: top;font-size: 12px;font-weight: normal;color: #565656;display: inline-block;height: auto;}
input[type="text"] {width: 356px;height: 38px;line-height: 38px;padding: 0px 6px !important;}
.mx_upImg .mx_input_short, .controlP-BG_PAGE input[type="text"] {width: 190px !important;height: 38px;line-height: 38px;padding: 0px 6px !important;}
.mx_upImg .mx-btn {height: 38px;line-height: 38px;width: 48px;vertical-align: top;font-size: 14px;font-weight: normal;}
.control-group, .controlP-CARD_NORMAL .controls {margin: 5px 0px !important;h2 {height: 38px;line-height: 38px;}}
.controls {display: block;height: auto;h2 {height: 38px;line-height: 38px;}}
.mx-btn {display: inline-block;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);background-image: none;border: 1px solid #cccccc;box-shadow: none;-webkit-transition: all ease .15s;-moz-transition: all ease .15s;-o-transition: all ease .15s;transition: all ease .15s;cursor: pointer;vertical-align: middle;margin: 0;position: relative;line-height: 40px;font-size: 16px;width: 118px;height: 38px;border-radius: 4px;-webkit-border-radius: 4px;text-align: center;}
.mx-btn-NORMAL {color: #333;vertical-align: bottom;}
.mx-btn-FILLED {color: #fff;background: rgba(0, 125, 113, 1);vertical-align: bottom;}
.mx-btn-MIDDLE {width: 118px;}
.mx-center {text-align: center;padding: 15px;display: block;margin-left: 64px;}
.mx-bottom-line {border-bottom: #cccccc solid 1px;}
.mx-top-line {border-top: #cccccc solid 1px;}
.mx_bottomBar .mx-btn {border: rgba(0, 125, 113, 1) solid 1px;}
.navigationType {width: 432px;height: 80px;
li {width: 125px;height: 40px;float: left;text-align: center;box-sizing: border-box;
.btn {width: 100px;height: 32px;margin: 0 auto;margin-top: 4px;box-sizing: border-box;}
.style1 {background: #858585;}
.style2 {border-radius: 10px;-webkit-border-radius: 10px;background: #858585;}
.style3 {border-radius: 20px;-webkit-border-radius: 20px;background: #858585;}
.style4 {border: dashed #858585 2px;}
.style5 {border-radius: 10px;-webkit-border-radius: 10px;border: solid #858585 2px;}
.style6 {border-radius: 20px;-webkit-border-radius: 20px;border: dotted #858585 2px;}}}
.pageBottom {width: 100%;height: 50px;position: fixed;background: #fff;bottom: 0;left: 0;z-index: 999;.wrap {width: 350px;margin: 5px auto;}}
.clearfix::after,.clearfix::before{content: ".";line-height: 0;height: 0;display: block;visibility: hidden;clear: both;}
.mx_tool { width: 100px; height: auto; position: fixed; top: 0; right: 0; z-index: 9;} 
.mx_tool li {width: 100%; height: auto; float: left;}
</style>