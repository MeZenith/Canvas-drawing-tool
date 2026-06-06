//切换颜色按钮
const switchColorBtn = document.querySelectorAll(".color-card div");
// 两个保存按钮
const saveBtn = document.querySelectorAll(".save-btn button");
//图片保存方式
let imgUrl = ["jpeg", "png"];
//旧位置
let oldPosition = {x: 0, y: 0};
let colorArr = ["black", "red", "yellow", "green", "blue"];
let color = colorArr[0];


//切换颜色 优美的代码
for (let i = 0; i < switchColorBtn.length; i++) {
    console.log(switchColorBtn[i]);
    switchColorBtn[i].addEventListener("click", function () {
        color = colorArr[i];
        console.log(colorArr[i]);
    })
}


//绘制线函数
function drawLine(ox,oy,nx,ny){
    draw.beginPath();
    //起点
    draw.lineTo(ox,oy);
    //终点
    draw.lineTo(nx,ny);
    //设置颜色
    draw.strokeStyle = color;
    draw.stroke();
}

//导出图片
function saveImage(u){
    let url = canvas.toDataURL("image/" + u);
    let a = document.createElement("a");
    u === "jpeg" ? u = "jpg" : u = "png";
    a.download = "画." + u;
    a.href = url;
    a.click();

}

//鼠标按下事件
canvas.addEventListener("mousedown", function(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    oldPosition = {x: x, y: y};
    isMouseDown = true;
})

//鼠标移动事件
canvas.addEventListener("mousemove", function(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let newPosition = {x: x, y: y};
    //鼠标没按下
    if (isMouseDown) {
        isResize = false;
        drawLine(oldPosition.x, oldPosition.y, newPosition.x, newPosition.y);
        oldPosition = newPosition;
    }
})

//鼠标离开
canvas.addEventListener("mouseup", function(e) {
    isMouseDown = false;
})


//遍历保存按钮
for (let i = 0; i < saveBtn.length; i++) {
    saveBtn[i].addEventListener("click", function() {
        saveImage(imgUrl[i]);
    })
}

