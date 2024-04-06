# 低代码

## 目录
```js
// -poster-maker 海报低代码编辑器
// -actPage-maker 活动页低代码编辑器
// -shop-maker 商城低代码编辑器
// -act-maker 活动低代码编辑器
```

## poster-maker
http://fabricjs.com/


## actPage-maker
实现步骤
```shell
npx create-react-app poster-maker
cd poster-maker
# 启动检查
yarn start
# craco简化webpack配置 craco-less使用less 修改package.json
yarn add antd @craco/craco craco-less
# 安装classnames,方便放多个样式
yarn add classnames
# 使用icanfont
# 安装取色插件
yarn add react-color
# 修改craco, 让@指向src
# 安装loadash, 实现深拷贝
yarn add loadash
```
1. 组件通信<App>
通过useRef的current保存canvas公用方法
通过useContext向子组件广播的canvas公用方法
2. 组件添加<left>
“侧边栏”通过Context获取canvas公用方法，调用canvas公用方法添加组件，并触发APP组件强制刷新的方法（订阅方法）
3. 组件拖拽<center>
Cmp改为类组件处理复杂状态，通过 e.dataTransfer 实现父子拖拽坐标通信，通过selectedCmpIndex索引标记选中组件
4. 组件伸缩<center>
Cmp组件选中框添加鼠标移动事件，移动距离更新为组件宽高
5. 添加图片组件<left>
封装文本和图片组件，并通过type属性区分图片和文本组件
6. 画布编辑<center><right>
修改背景颜色、背景图片、宽高，然后进行样式覆盖
7. 组件编辑<Cmp>
修改文字样式，值，样式覆盖
8. 组件旋转<Cmp>
Cmp组件添加旋转图标，添加旋转事件，获取移动坐标，并通过三角函数计算旋转角度，样式覆盖
9. 图形组件
实现圆形、矩形的空心、实心、圆角、颜色的色块，实现背景板的功能
10. 画布的缩放
通过transform-origin固定模拟器，通过transform进行缩放，组件移动的真实距离要根据缩放比例计算
11. 组件的拖拽
不同元素间通过drag事件的dataTransfer转递坐标信息
12. 清空、历史
记录100条canvas数据，通过下标取数据，历史只记录添加组件、画布更新、组件更新、鼠标拖动组件结束后的移动数据，回退后添加新的记录，之前回退那些记录会被新纪录覆盖
13. 组件复制、删除、上移一层、下移一层、置底、置顶
操作数组<push><slice>实现组件复制和删除，操作数组下标实现元素交换达成上、下移动
14. 其他
编辑组件的功能封装到EditLine组件中（线、点、旋转、子菜单）

基础知识
1. Hook(Hook是一种函数，允许您使用React特性而不编写类)
React提供了一些内置的Hook，例如useState、useEffect、useContext等

useRef: 在函数组件中保存和访问可变的值，同时不会触发组件重新渲染
useContext: Context跨组件通信(Context是一种用于在组件之间共享数据的方法，而不必通过组件树中逐层传递props)，Provider提供数据，Consumer使用数据(useContext是一个React Hook，用于在函数组件中访问Context。通过useContext，您可以轻松地从Context中获取共享的数据)
useEffect: 接收两个参数：一个函数和一个依赖数组（可选）。函数参数是用于执行副作用操作的函数，而依赖数组则用于指定在何时执行这个函数。<当组件每次渲染时，useEffect 中的函数都会被调用>，除非依赖数组中的值没有发生变化（如果指定了依赖数组的话）。如果没有传递依赖数组，那么每次组件渲染时都会执行这个函数。
useEffect 函数可以返回一个清理函数，用于清除副作用，比如取消订阅或清除定时器。<这个清理函数会在组件卸载时或者依赖项发生变化时执行>。如果 useEffect 中的副作用不需要清除，可以不返回任何内容。
useCallback: 是 React 提供的一个 Hook，用于在函数组件中缓存回调函数，以避免在每次渲染时创建新的回调函数实例.主要用于优化性能.

2. ...扩展运算符、Object.assign()、Array.prototype.map()的区别
...扩展运算符更适合在创建新对象或合并对象时使用，创建了一个新的数组/对象，不会改变原始数组/对象
Object.assign()更适合在需要在原对象上进行修改时使用，方法会改变原对象
map() 方法会按照原始数组元素顺序 <依次执行 callback 函数>，并将每次执行的结果作为新数组的对应元素，最终返回一个新数组，不会改变原始数组

3. const [, forceUpdate] = useReducer((x) => x + 1, 0);
这种方法的主要目的是在不使用 useState 或 useRef 的情况下，通过调用 forceUpdate 函数来强制更新组件，以便在需要时调用它来触发组件的重新渲染。


## shop-maker
```js
/**
 * 商城
 * 1. 数据模型
 * 2. 模拟器技术选型（div、iframe、canvas + 适配）
 * 3. 模拟器和编辑器的通信
 * 4. 跨模拟器和编辑器的拖拽
 * 5. 历史版本的回退
 * 6. 组件与平台的解耦
 * 7. app与平台的解耦
 */
```

## act-maker



