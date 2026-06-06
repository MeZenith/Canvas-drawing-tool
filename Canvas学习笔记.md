# HTML Canvas标签学习笔记

## 属性

本标签有两个属性 width height
width设置宽度 height设置高度
代码示例

```html
<canvas width="500" height="500"></canvas>
```

设置高度为500像素 宽度为500像素

### 兼容性

由于***canvas***属于较新的标签 部分较旧的浏览器（如：IE）不支持此标签

我们可以使用内嵌 *div* 的方式来让内容展示出来 

```html
<canvas width="500" height="500">
    <div>求你换个浏览器</div>
</canvas>
```

### 画笔

有了画布之后我们可以使用画笔画画 在画画之前我们要先拿取上下文

```javascript
let canvas = document.getElementById("id");
let draw = canvas.getContent("2d");
```

如果拿不到 我们可使用 ***canvas.getContent***方法来判断该浏览器对***canvas***标签的兼容性

```javascript
let canvas = canvas.getElementById("id");
if(canvas.getContent()){
    
} else {
    
}
```

## 怎么画？

使用坐标系 从画布左上角延申 分为 X Y两个轴

新建笔画 使用beginPath()

```javascript
let canvas = document.getElementById("id");
let draw = canvas.getContent("2d");
//创建笔画
draw.beginPath();
//选择起点
draw.moveTo(100,100)
```

## 绘制三角形示例

```javascript
let canvas = document.getElementById('canvas');
let draw = canvas.getContext('2d');
//新家笔画
draw.beginPath();
//设置起点
draw.moveTo(100,100);
// 设置点
draw.lineTo(200,200);
draw.lineTo(300,200);
draw.lineTo(100,100);
//除自己画之外 还可以通过 draw.stroke() 对起点和重点进行闭合
//通过设置绘图点 设置之后代码会根据上一个点的位置 通过stroke连起来线
//填充图形
draw.fill();
//添加轮廓
draw.stroke();
```

## 绘制矩形示例

```javascript
    let canvas = document.getElementById('canvas');
let draw = canvas.getContext('2d');
//绘制矩形
draw.rect(0, 0, 200, 300);
//前两个属性指矩形的开始的坐标 后两个指宽高
draw.stroke();
```

写2行太多了 一行设置位置 一行添加描边
我们可以简写 同过 ***strokeRect()*** 一次性都设置了

```javascript
draw.strokeRect(0,0,100,100);
```

当然也可以同时设置描边和填充

```javascript
draw.fillRect(0,0,100,100);
```

还有一个操作 ***clearRect()*** 你可以理解为橡皮擦 可以擦除痕迹

```javascript
draw.clearRect(50,50,100,100)
```
## 画圆

同理我们也可以画圆 使用函数 **arc** 函数属性
>x, y, r, starAngle, andAngle, anticLockwise

>x y 设置圆心 r是半径 starAngle起始点 andAngle结束点 anticLockwise选择顺时针/逆时针 此函数可选

在开始之前我们需要先回顾初中数学老师教的知识点

如何计算弧度值公式 ***PI / 180 * 角度*** 由此可见想画半圆直接

```javascript
draw.arc(200, 200 ,80 ,0 ,Math.PI);
```

画一个完整的圆只需

```javascript
draw.arc(200, 200 ,80 ,0 ,Math.PI * 2);
```

## 设置文字

函数

```javascript
draw.fillText(text,x,y,[maxWidht])
draw.strokeText(text,x,y,[maxWidht])
//[maxWidht] 为可选参数 设置后 文字超出宽度 会被压缩
```

还可设置文字样式 基本都是css的属性小驼峰命名法

```javascript
//设置字体
draw.font = "50px system-ui"
//设置对齐方式
draw.textAlign = "center"
//设置对齐基线
draw.textBaseline = "top"
//设置文本方向
draw.direction = "inherit"
```

## 在画布添加图片

# 设置图片



```javascript
let img = new Image()
img.src = "图片URL"
```

设置好之后需通过***drawImage***方法来绘制图片

# drawImage属性讲解

```javascript
draw.drawImage(img,x,y,width,height)
```

# 实际使用
```javascript
    draw.drawImage(img, 0, 0, canvas.width, canvas.height);
```

# 错误处理

如果图片内存过大可能会出现 不加载出来 我们可以把绘制图片的代码写的更强壮
通过标签的 ***onload*** 监听方法 绘制 ***drawImage***

```javascript
let img = new Image();
img.onload = function (){
    draw.drawImage(img,0,0,100,100);
}
img.src = "url"
```
# 进阶玩法

如果我们只想展示图片的与部分 我们可以给 ***drawImage*** 添加更多的参数

```javascript
drawImage(img,sx,sy,sWidth,sHeight,dx,dy,dWidht,dHeight);
//sx,sy,sWidth,sHeight 是要剪裁的部分的位置 高宽
//dx,dy,dWidth,dHeight 是要绘制的地方的位置 高宽
``` 

## 样式相关部分

# 颜色 

我们可通过 ***fillStyle*** and ***strokeStyle***

来设置填充/轮廓的颜色 支持调用系统颜色/16进制/rgb/rgba设置颜色

# 宽度

不仅仅可设置颜色 还可以设置设置 轮廓线的宽度 使用 ***lineWidth***

>默认值为1

修改轮廓线为2px

```javascript
draw.lineWidth = 2;
```

# 设置线段首尾的样式

或者通过 ***lineCaps*** 来设置

>共4个属性
> butt（默认）线段末端以方形结束，不加帽子
> round: 线段末尾以圆心结束，加了个圆帽子
> square：线段末尾以方形结束，加了个正方形帽子

```javascript
 draw.lineCap = "square";
//建议lineWidht设置长一些 不然看不出来
```

# 设置两条线结合的样式

通过 ***lineJoin*** 来设置

>三个属性
> round 通过填充一个额外的 圆心在相连部分末端的扇形 绘制拐角的形状 圆角的半径是线段的宽度
>bevel 在相连部分的末端填充一个额外的以三角形为底的区域 每个部分都有各自独立的矩形拐角
>miter(默认)通过延伸相连部分的外边缘 使其相交于一点 形成一个额外的菱形区域

```javascript
    draw.lineJoin = "bevel";
```

# 设置虚线

同过 ***setLineDash(segments)*** 来设置虚线

他接受一个数组
>[实现长度, 间隙长度]

```javascript
    draw.setLineDash([10,30])
```

## 状态存储与恢复

在我们设置完样式之后需要要改变又要重新设置 很麻烦我们可通过这两个函数存档和恢复

>即;
> save()
> restore();

这两个API ***save()*** 存档 ***restore()*** 恢复之前的状态

示例:

```javascript
draw.fillStyle = "black";
draw.lineCap = "butt";
//存档
draw.save();
//修改
draw.font = "16px";
//恢复之前的样式 并且把之前的存档删除
draw.restore();
```

>也可以多次存档 但是 ***restore()*** 只会恢复最近一次存档的状态

restore()只针对样式不会对绘制的东西进行改变

## 变形操作

# 修改坐标系原点

对于想修改画板坐标系原点 我们可以使用 ***transLate(x,y)*** 进行修改

```javascript
draw.transLate(100,100)
```

>仅缩修改坐标系原点 不对画板做操作

# 旋转坐标系

使用 ***rotate(angle)*** 进行修改

```javascript
draw.rotate(40);
```

>本操作仅进行旋转坐标系 不旋转画板

# 缩放坐标比例

使用 ***scale(size)***

```javascript
draw.scale(0.5);
```

>仅缩放坐标比例 不对画板做操作

## 画板dome

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #canvas{
            background-color: lightgray;
            border-radius: 10px;
            box-shadow: 2px 2px 2px 3px #a5a1a1;
        }
    </style>
</head>
<body>
<canvas id="canvas" width="500" height="500"></canvas>
<div class="buttom-btn">
    <button type="button" id="reset">重置</button>
    <button type="button" id="save">保存</button>
</div>
<script>
    //鼠标按下
    let isMouseDown = false;
    //旧的位置
    let oldPosition = {x: 0, y: 0};
    //获取id
    const canvas = document.getElementById('canvas');
    const draw = canvas.getContext('2d');
    const resetDraw = document.getElementById('reset');
    const save = document.getElementById('save');

    //封装绘画函数
    function drawLine(ox,oy,nx,ny){
        draw.beginPath();
        draw.lineTo(ox,oy);
        draw.lineTo(nx,ny);
        draw.stroke();
    }

    //橡皮擦
    function eraser(sx=0, sy=0,w = 1,h = 1){
        draw.clearRect(sx,sy,w,h);
    }

    //保存
    function  saveImg(u){
        const url =  canvas.toDataURL(u);
        const a = document.createElement('a');
        a.href = url;
        a.download = "画";
        a.target = '_blank';
        a.click();
    }

    //获取鼠标按下事件
    canvas.addEventListener("mousedown",function (e){
        let x =e.offsetX;
        let y =e.offsetY;
        oldPosition = {x: x, y: y};
        isMouseDown = true;
    })

    //获取鼠标的移动
    canvas.addEventListener("mousemove",function (e){

        let x =e.offsetX;
        let y =e.offsetY;
        let newPosition = {x: x, y: y};
        if(isMouseDown){
            drawLine(oldPosition.x,oldPosition.y,newPosition.x,newPosition.y);
            oldPosition = newPosition;
        }
    })

    //鼠标松开事件
    canvas.addEventListener("mouseup",function (e){
        isMouseDown = false;
    })

    // 重置
    resetDraw.addEventListener('click',function (e){
        eraser(0,0,canvas.width,canvas.height);
    })

    //保存
    save.addEventListener('click',function (e){
        saveImg("image/jpg");
    })
</script>
</body>
</html>
```