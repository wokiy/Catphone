
window.onload = function () {
    drag('content_recommend','recommend_img_list_1');
    drag1('content_recommend2','recommend_img_list_2');
    drag1('test2','recommend_img_list_3');
    drag1('test3','recommend_img_list_4');
    drag1('test4','recommend_img_list_5');
}
function drag(dom,dom1){
    //拖拽区域
    var wrap = document.querySelector("."+dom+"");
    //拖拽元素
    var inner = document.querySelector("."+dom1+"");
    //开启3d硬件加速
    css(inner,"translateZ",0.001);
    //拖拽元素可以滑动的最大距离，可是在值上面是最小值
    var minX =  wrap.clientWidth -inner.offsetWidth;
    //元素一开始的位置
    var elementX = 0;
    //手指一开始的位置
    var startX =0;
    //上一次的时间
    var lastTime =0;
    //上一次的位置
    var lastPoint = 0;
    //时间差
    var timeVal = 1;
    //位置差
    var disVal = 0;

    wrap.addEventListener("touchstart",function(ev){
        ev=ev||event;
        var touchC = ev.changedTouches[0];

        inner.style.transition="none";

        //同步手指和元素一开始的位置
        elementX=css(inner,"translateX");
        startX=touchC.clientX;

        //同步时间与位置信息
        lastTime = new Date().getTime();
        lastPoint = touchC.clientX;

        disVal=0;
        timeVal = 1;
    })
    wrap.addEventListener("touchmove",function(ev){
        ev=ev||event;
        var touchC = ev.changedTouches[0];
        //手指的实时位置
        var nowX = touchC.clientX;
        var disX = nowX - startX;

        //左边的留白
        var translateX = elementX+disX;

        //橡皮筋效果
        var scale =0;
        if(translateX>0){
            //					scale = 1- translateX/document.documentElement.clientWidth;
            scale = document.documentElement.clientWidth/(document.documentElement.clientWidth+translateX);
            translateX=elementX+disX*scale;
        }else if(translateX<minX){
            var over = minX - translateX;
            scale = document.documentElement.clientWidth/(document.documentElement.clientWidth+over);
            translateX=elementX+disX*scale;
        }
        console.log(translateX)
        if (translateX <-566){
            css(inner,"translateX",-566);
        }else {
            css(inner,"translateX",translateX);
        }

        //每一次touchmove时的时刻
        var nowTime = new Date().getTime();
        //每一次touchmove时的手指的位置
        var nowPoint = touchC.clientX;
        //时间差
        timeVal=nowTime-lastTime;
        //位置差
        disVal = nowPoint-lastPoint;

        lastTime = nowTime;
        lastPoint= nowPoint;
    })
    wrap.addEventListener("touchend",function(){
        //这是最后一次touchmove的速度
        var speed = disVal/timeVal;
        var time =	Math.abs(speed*0.3);
        time=time<0.3?0.3:time;
        var target = css(inner,"translateX")+speed*200;
        console.log("过渡时间:"+time+" 时间差:"+timeVal+" 位置差:"+disVal+" 速度:"+speed+" 目标位置:"+target);

        var bsr ="";
        if(target>0){
            target=0;
            //控制回弹
            bsr ="cubic-bezier(.82,1.24,.75,1.26)";
        }else if(target<minX){
            target=minX;
            //控制回弹
            bsr ="cubic-bezier(.82,1.24,.75,1.26)";
        }
        inner.style.transition=time+"s "+bsr;
        if(target<-200){
            target=-166
        }
        css(inner,"translateX",target);
    })
}
function drag1(dom,dom1){
    //拖拽区域
    var wrap = document.querySelector("."+dom+"");
    //拖拽元素
    var inner = document.querySelector("."+dom1+"");
    //开启3d硬件加速
    css(inner,"translateZ",0.001);
    //拖拽元素可以滑动的最大距离，可是在值上面是最小值
    var minX =  wrap.clientWidth -inner.offsetWidth;
    //元素一开始的位置
    var elementX = 0;
    //手指一开始的位置
    var startX =0;
    //上一次的时间
    var lastTime =0;
    //上一次的位置
    var lastPoint = 0;
    //时间差
    var timeVal = 1;
    //位置差
    var disVal = 0;

    wrap.addEventListener("touchstart",function(ev){
        ev=ev||event;
        var touchC = ev.changedTouches[0];

        inner.style.transition="none";

        //同步手指和元素一开始的位置
        elementX=css(inner,"translateX");
        startX=touchC.clientX;

        //同步时间与位置信息
        lastTime = new Date().getTime();
        lastPoint = touchC.clientX;

        disVal=0;
        timeVal = 1;
    })
    wrap.addEventListener("touchmove",function(ev){
        ev=ev||event;
        var touchC = ev.changedTouches[0];
        //手指的实时位置
        var nowX = touchC.clientX;
        var disX = nowX - startX;

        //左边的留白
        var translateX = elementX+disX;

        //橡皮筋效果
        var scale =0;
        if(translateX>0){
            //					scale = 1- translateX/document.documentElement.clientWidth;
            scale = document.documentElement.clientWidth/(document.documentElement.clientWidth+translateX);
            translateX=elementX+disX*scale;
        }else if(translateX<minX){
            var over = minX - translateX;
            scale = document.documentElement.clientWidth/(document.documentElement.clientWidth+over);
            translateX=elementX+disX*scale;
        }
        console.log(translateX)
        if (translateX <-666){
            css(inner,"translateX",-666);
        }else {
            css(inner,"translateX",translateX);
        }

        //每一次touchmove时的时刻
        var nowTime = new Date().getTime();
        //每一次touchmove时的手指的位置
        var nowPoint = touchC.clientX;
        //时间差
        timeVal=nowTime-lastTime;
        //位置差
        disVal = nowPoint-lastPoint;

        lastTime = nowTime;
        lastPoint= nowPoint;
    })
    wrap.addEventListener("touchend",function(){
        //这是最后一次touchmove的速度
        var speed = disVal/timeVal;
        var time =	Math.abs(speed*0.3);
        time=time<0.3?0.3:time;
        var target = css(inner,"translateX")+speed*200;
        console.log("过渡时间:"+time+" 时间差:"+timeVal+" 位置差:"+disVal+" 速度:"+speed+" 目标位置:"+target);

        var bsr ="";
        if(target>0){
            target=0;
            //控制回弹
            bsr ="cubic-bezier(.82,1.24,.75,1.26)";
        }else if(target<minX){
            target=minX;
            //控制回弹
            bsr ="cubic-bezier(.82,1.24,.75,1.26)";
        }
        inner.style.transition=time+"s "+bsr;
        if(target<-660){
            target=-660
        }
        css(inner,"translateX",target);
    })
}