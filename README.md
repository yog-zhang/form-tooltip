# form-tooltip概述

form-tooltip是用来作为表单元素，比如input、textarea的悬浮提示框。
当你在input输入框输入无效的文本时，需要一个提示框进行提示，
或者当input输入框不能为空，用作为空校验提示等，这些都是它作用的地方

## 使用

### 下载安装
1. 下载node包<br>
`npm install form-tooltip --save`
在需要使用的代码中导入该插件
`import FormTooltip from './form-tooltip.js'`

2. 或全局引入 <br>
`<script src='./form-tooltip.js'></script>`

### 创建提示框组件对象

 `let formTooltip = new FormTooltip(id, options, cssTextObj)`

 说明:<br>
 id: 必选项，绑定的input输入框的id选择器名称，如下面的'input'<br>
 options: 必选项，是一个对象，用于配置提示框的一些选项，每一个选项除了value都非必选，都有一个默认值。value字段是必填项。详情如下：<br>
 ```
    {
        value: '输入文本无效',       //提示框文本
        mode: 1,                    //模式，支持两种模式，可选值为0、1,0代表提示框有边框而没有背景色，1代表提示框有背景色而没有边框
        trianglePosition: '10%',    //设置提示小三角在提示框上的水平位置，位置时从右往左开始
        triangleHeight: '8px',      //设置提示小三角垂直高度
        triangleSize: '1px',        //设置提示小三角边框宽度
        direction: 'bottom',        //设置提示框在表单元素的上下位置，可选值'top'、'bottom','top'表示提示框在表单元素上方
        borderColor: 'blue'         //设置提示框边框颜色（包括文本框和小三角边框），只对mode=0有效 
    }

```
cssTextObj: 是一个json对象，设置提示框的类样式，反映在HTML中就是下面的类'form-tooltip-0'，
其中类名后面的'0'表示该提示框实例化的序号，即是第几个实例化的提示框。该参数为非必选项，不传此参数会有默认值替代<br>

事例如下：<br>
```
let formTooltip = new FormTooltip('input', 
    {
        value: '输入文本无效！', 
        mode: 1, 
        trianglePosition: '10%',
        triangleHeight: '8px',
        triangleSize: '1px',
        direction: 'bottom',
        // 只对mode=0时有效
        borderColor: '#888'
    }, 
    {
        'width': '100px',
        'height': '30px',
        'line-height': '30px',
        'text-align': 'center',
        'border': '1px solid black',
        'background-color': '#888',
        'font-size': '12px',
        'position': 'absolute',
        'left': '20px',
        'top': '31px',
        'border-radius': '4px 4px'
        
    })

```
渲染如下：

```
    <input type="text" id="input"> //表单元素要自己写，不是提示框组件渲染出来的
    <div class="form-tooltip-common form-tooltip-0">
        <span class="form-tooltip-text">输入文本无效！</span>
        <div class="form-tooltip-triangle-0">
            ::before
        </div>
    </div>
```
备注：可以看到提示框div元素有两个类选择器，第一个类选择器名字是固定的，所有的下拉框实例共同的类选择器都是'form-tooltip-common'，
所以可以通过这个类选择器对所有的下拉框设置共同的样式。第二个类选择器是根据该下拉框是第几个被创建的实例，
如'form-tooltip-0'则表示是第一个被创建的下拉框实例，所以后面是索引'0',前面部分的名字是固定的；
<br>

### 设置提示框文本值

`formTooltip.setValue(text)` <br>

例如：`formTooltip.setValue('输入的文本无效')`

### 设置提示框显示隐藏

`formTooltip.setShow(showFlag)` <br>

说明：<br>
showFlag: Boolean类型的值，为true表示显示提示框，为false表示隐藏提示框。<br>
例如：`formTooltip.setShow(true)`

### 获取提示框显示隐藏标志

`formTooltip.isShow()` <br>

返回值是一个Boolean值，为true表示提示框处于显示状态，为false表示提示框处于隐藏状态

### 获取提示框的一些配置选项

`formTooltip.getOptions()` <br>
返回值是一个对象，如下：<br>
```
    {
        id: 绑定的form表单id选择器
        options: 创建提示框对象时，传入的options参数，即构造函数的第二个参数
        cssTextObj: 创建提示框对象时，传入的cssTextObj参数，即构造函数的第三个参数
        showFlag: 提示框的显示隐藏状态标志
        formNode: 绑定的表单元素节点
        tooltipNode: 实例化的提示框元素节点
    }
```
