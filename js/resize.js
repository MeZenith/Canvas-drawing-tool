const canvas = document.getElementById("canvas");
const draw = canvas.getContext("2d");
//获取拖动区域
const resizeHandle = document.getElementById("resize-handle");
//是否按下
let isResize = false;
//鼠标状态(绘画用)
let isMouseDown = false;
//定于调整画板大小的坐标
let ResizeArr = {
    x: 0,
    y: 0,
    w: 0,
    h: 0
}

/*//调整画板大小
function reviseCanvasSize(x,y){
    canvas.width = x;
    canvas.height = y;
}*/

//按下resizeHandle事件
resizeHandle.addEventListener("mousedown", function(e){
    //更新按下
    isResize = true;
    //记录当前信息
    ResizeArr.x = e.clientX;
    ResizeArr.y = e.clientY;
    ResizeArr.w = canvas.width;
    ResizeArr.h = canvas.height;
})

//移动resizeHandle事件
resizeHandle.addEventListener("mousemove", function(e){
    //没有按下
    if(!isResize){
        return 0;
    } else {
        isMouseDown = false;
    }
    //计算新尺寸
    /*
    公式：
     需要添加宽度 = 鼠标当前位置 - 鼠标原本的位置
     原本的宽度 + 需要添加的宽度 = 最终的新宽度
     高度同理
     */
    let newWidth = ResizeArr.w + (e.clientX - ResizeArr.x);
    let newHeight = ResizeArr.h + (e.clientY - ResizeArr.y);

    //不允许调太小
    newWidth <= 100 ? newWidth = 100: newWidth;
    newHeight <= 100 ? newHeight = 100: newHeight;

    //先保存 修改大小 不然会消失
    const imgData = canvas.toDataURL();
    //修改
    canvas.width = newWidth;
    canvas.height = newHeight;
    //然后恢复
    const img = new Image();
    img.src = imgData;
    //把图片重新添加到页面
    img.onload = function(){
        draw.drawImage(img, 0, 0);
    }
})

//鼠标离开事件
resizeHandle.addEventListener("mouseup", function(e){
    isResize = false;
})