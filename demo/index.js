// 首先需要通过npm install form-tooltip --save下载该组件
import FormTooltip from 'form-tooltip'
let formTooltip = new FormTooltip('input', 
{
    value: '输入文本无效！', 
    mode: 1, 
    trianglePosition: '10%',
    triangleHeight: '8px',
    triangleSize: '0.8px',
    direction: 'bottom',
    // 只对mode=0时有效
    borderColor: 'blue'
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

let formTooltip1 = new FormTooltip('input1', 
{
    value: '输入文本无效！', 
    mode: 1, 
    trianglePosition: '10%',
    triangleHeight: '8px',
    triangleSize: '0.8px',
    direction: 'top',
    // 只对mode=0时有效
    borderColor: 'blue'
}, 
{
    width: '100px',
    height: '30px',
    'line-height': '30px',
    'text-align': 'center',
    border: '1px solid black',
    'background-color': '#ddd',
    'font-size': '12px',
    position: 'absolute',
    left: '20px',
    top: '-38px',
    'border-radius': '4px 4px'
    
})

let formTooltip2 = new FormTooltip('textarea1', 
    {
        value: '输入不能为空！', 
        mode: 0, 
        trianglePosition: '10%',
        triangleHeight: '8px',
        triangleSize: '1px',
        direction: 'top',
        // 只对mode=0时有效
        borderColor: 'red'
    }, 
    // 第二个参数可以为null
    null
)

let formTooltip3 = new FormTooltip('textarea2', 
    {
        value: '输入格式不对！', 
        mode: 0, 
        trianglePosition: '10%',
        triangleHeight: '8px',
        triangleSize: '1px',
        direction: 'bottom',
        // 只对mode=0时有效
        borderColor: 'blue'
    }, 
    // 第二个参数可以为null
    null
)
let num = 0
document.querySelector('#button1').addEventListener('click', (e) => {showToggle(formTooltip)})
document.querySelector('#button2').addEventListener('click', (e) => {showToggle(formTooltip1)})
document.querySelector('#button3').addEventListener('click', (e) => {showToggle(formTooltip2)})
document.querySelector('#button4').addEventListener('click', (e) => {showToggle(formTooltip3)})

//动态设置提示框文本
document.querySelector('#button5').addEventListener('click', (e) => {
    formTooltip.setValue("请输入正确文本" + num++)
})

//切换提示框的显示隐藏
function showToggle(element){
    if(element.isShow()){
        element.setShow(false)
    } else {
        element.setShow(true)
    }
}
