
function FormTooltip(id, options, cssTextObj){
    if(typeof id !== 'string' || typeof options !== 'object'){
        console.error('输入参数格式不正确，请检查输入参数格式')
        return
    }
    this.id = id
    this.options = options
    this.cssTextObj = cssTextObj
    this.instanceSeq = 0
    this.showFlag = false
    this.init()
}

let tooltipProto = FormTooltip.prototype

tooltipProto.instanceCount = 0

tooltipProto.init = function(){
    let formNode = document.querySelector('#' + this.id)
    if(!formNode){
        console.error('id选择器的form表单不存在！')
        return
    }
    // 提示框方位未设置时，默认为'top'
    this.options.direction = this.options && this.options.direction ? this.options.direction : 'top'
    // 提示框模式未设置时，默认为0
    this.options.mode = this.options && this.options.mode ? this.options.mode : 0
    // 提示框边框颜色未设置时，默认为黑色
    this.options.borderColor = this.options && this.options.borderColor ? this.options.borderColor : 'black'
    // 提示框未设置三角在提示框元素水平位置时，默认为20%
    this.options.trianglePosition = this.options && this.options.trianglePosition ? this.options.trianglePosition : '20%'
    // 提示框未设置三角的高度时，默认为8px
    this.options.triangleHeight = this.options && this.options.triangleHeight ? this.options.triangleHeight : '8px'
    this.createTooltipNode(formNode)
}

/**
 * 创建提示框元素
 */
tooltipProto.createTooltipNode = function(formNode){
    this.instanceSeq = Object.getPrototypeOf(this).instanceCount++
    
    let tooltipNode = document.createElement('div')
    tooltipNode.setAttribute('class', 'form-tooltip-common form-tooltip-' + this.instanceSeq)
    tooltipNode.innerHTML = '<span class="form-tooltip-text">' + this.options.value +  '</span>'
    let tooltipTriangle = document.createElement('div')
    tooltipTriangle.setAttribute('class', 'form-tooltip-triangle-' + this.instanceSeq)
    tooltipNode.appendChild(tooltipTriangle)
    let styleNode = document.createElement('style')
    document.head.appendChild(styleNode)
    let tooltipStyleString = this.getCssRuleString('.form-tooltip-' + this.instanceSeq, this.cssTextObj, true)
    styleNode.sheet.insertRule(tooltipStyleString)

    // 根据设置的方位挂载提示框元素
    this.options.direction == 'top' ? formNode.parentNode.insertBefore(tooltipNode, formNode) : this.insertAfter(tooltipNode, formNode)

    // 设置三角样式规则
    if(this.options.mode == 0){
        let triangleAfterStyleString = this.getCssRuleString('.form-tooltip-triangle-' + this.instanceSeq + '::after', this.getTriangleStyleObj('after', tooltipNode))
        styleNode.sheet.insertRule(triangleAfterStyleString)
    }
    let triangleBeforeStyleString = this.getCssRuleString('.form-tooltip-triangle-' + this.instanceSeq + '::before', this.getTriangleStyleObj('before', tooltipNode))
    styleNode.sheet.insertRule(triangleBeforeStyleString)

    tooltipNode.setAttribute('style', 'display:none;')    
}

/**
 * 获得提示框三角元素样式对象（即:before和:after伪元素样式对象）
 * @type: 即::before、::after样式类型
 * @element: 传入的元素对象，即提示框元素
 */
tooltipProto.getTriangleStyleObj = function(type, element){
    if(type !== 'before' && type !== 'after'){
        console.error('getTriangleStyleObj方法传参有误')
        return
    }

    let height = element.offsetHeight - parseFloat(this.getStyleValueByName(element, 'border-width'))
    let trianglePosition = this.options.trianglePosition
    let borderColor = 'black'
    let triangleHeight = this.options.triangleHeight
    let triangleSize = 1

    if(this.options.mode == 0){
        borderColor = this.options.borderColor
        triangleSize = this.options && this.options.triangleSize ? parseFloat(this.options.triangleSize) : 1
    } else if(this.options.mode == 1){
        borderColor = this.getStyleValueByName(element, 'background-color')
        triangleSize = 0
    }
    
    let direction = this.options.direction
    
    let styleObj = {
        before: {
            'content': '\'\'',
            'width': '0',
            'height': '0',
            'position': 'absolute',
            'top': direction == 'top' ? height + 'px' : -(parseFloat(triangleHeight) * 2) + 'px',
            'right': trianglePosition,
            'border-style': 'solid',
            'border-width': triangleHeight,
            'border-color': this.getTriBorderColorString(borderColor, direction)
        },
        after: {
            'content': '\'\'',
            'width': '0',
            'height': '0',
            'position': 'absolute',
            'top': direction == 'top' ? (height - triangleSize) + 'px' : (triangleSize - parseFloat(triangleHeight) * 2)  + 'px',
            'right': trianglePosition,
            'border-style': 'solid',
            'border-width': triangleHeight,
            'border-color': this.getTriBorderColorString('white', direction)
        }
    }
    return styleObj[type]
}

/**
 * 获得三角元素边框样式字符串
 * @borderColor:设置的边框颜色（只对mode=0有效）
 * @borderDirection:设置的边框方位，目前支持设置两种方位
 * 'top'代表提示框在绑定的表单上方
 * 'bottom'代表提示框在绑定的表单下方
 */
tooltipProto.getTriBorderColorString = function(borderColor, borderDirection){
    // 目前只支持form表单上、下两个方位的tooltip
    let borderColorString = {
        top: borderColor + ' transparent transparent transparent',
        bottom: 'transparent transparent ' + borderColor + ' transparent',
        // left: 'transparent transparent transparent ' + borderColor,
        // right: 'transparent ' + transparent + ' transpatent transparent'
    }

    return borderColorString[borderDirection]

}

/**
 * 获取元素的样式对应的值
 * @element:元素节点
 * @styleName:样式名称
 */
tooltipProto.getStyleValueByName = function(element, styleName){
    if(!element || !styleName){
        return
    }
    if(window.getComputedStyle){
        return window.getComputedStyle(element, null)[styleName]
    } else {
        return element.currentStyle[styleName]
    }
},
/**
 * 将json对象结构的样式对象解析成字符串
 * @param {*} styleTag :样式标签，比如'.form-tooltip-0'
 * @param {*} styleObj :样式对象，将样式写成json对象形式
 * @param {*} isParentNode ：是否为父节点，这里是指整个tooltip节点
 */
tooltipProto.getCssRuleString = function(styleTag, styleObj, isParentNode){
    let formNodeHight = this.getOptions().formNode.offsetHeight
    // 提示框节点的默认样式对象，当提示框的样式没有被设置时，使用默认样式
    let defaultStyleObj = {
        'width': '100px',
        'height': '30px',
        'line-height': '30px',
        'text-align': 'center',
        'border': '1px solid black',
        'border-radius': '5px 5px',
        'background-color': 'red',
        'font-size': '12px',
        'position': 'absolute',
        'left': '20px',
        'top': this.options.direction == 'top' ? (this.options.mode == 0 ? '-40px' : '-38px') : (formNodeHight + 8) + 'px'
    }
    let realStyleObj = null
    if((!styleObj || Object.keys(styleObj).length <= 0) && isParentNode){
        realStyleObj = defaultStyleObj
    } else {
        realStyleObj = styleObj
    }
    let cssRulesStringArr = []
    let isHasPositionStyle = false
    for(let key in realStyleObj){
        cssRulesStringArr.push(key + ':' + realStyleObj[key])
        // 判断tooltip提示框是否有设置'position'样式属性，并且值为'absolute'，如果没有的话要强制加上此属性，提示框默认脱离文档流的
        if(key && key.trim() && key.trim() === 'position'){
            realStyleObj['position'] === 'absolute' ? isHasPositionStyle = true : ''
        }
    }

    if(this.options.mode == 0 && isParentNode){
        cssRulesStringArr.push('background:none !important;')
        cssRulesStringArr.push('border-color: ' + this.options.borderColor + ' !important;')
    } else if(this.options.mode == 1 && isParentNode){
        cssRulesStringArr.push('border:none !important;')
    }

    if(!isHasPositionStyle && isParentNode){
        cssRulesStringArr.push('position: absolute')
    }

    let cssRulesString = styleTag + '{' + cssRulesStringArr.join(';') + '}'
    return cssRulesString
}

 tooltipProto.insertAfter = function(newNode, existNode){
     let parentNode = existNode.parentNode
     if(existNode.nextElementSibling){
         parentNode.insertBefore(newNode, existNode.nextElementSibling)
     } else {
         parentNode.appendChild(newNode)
     }
 }

 /**
 * 返回提示框的设置选项
 */
tooltipProto.getOptions = function(){
    return {
        id: this.id,
        options: this.options,
        cssTextObj: this.cssTextObj,
        showFlag: this.showFlag,
        formNode: document.querySelector('#' + this.id),
        tooltipNode: document.querySelector('.form-tooltip-' + this.instanceSeq)
    }
}

/**
 * 设置提示框显示或隐藏
 * @showFlag: 显示标志，为true显示提示框，否则隐藏
 */
tooltipProto.setShow = function(showFlag){
    if(typeof showFlag !== 'boolean') {
        console.error('setShow方法参数类型只能为boolean!')
        return
    }
    if(showFlag){
        this.getOptions().tooltipNode.style.display = 'block'
        this.showFlag = true
    } else {
        this.getOptions().tooltipNode.style.display = 'none'
        this.showFlag = false
    }
    
}

tooltipProto.setValue = function(text){
    this.getOptions().tooltipNode.querySelector('.form-tooltip-text').innerText = text
}

/**
 * 返回提示框的显示状态
 */
tooltipProto.isShow = function(){
    return this.showFlag
}

export default FormTooltip