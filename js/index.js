window.onload = function () {
    banner();
 /*   listMove('recommend_img_list_1')
    listMove1('recommend_img_list_2')*/
}
function banner(){
    /*
     * 1.自动的滚动起来    （定时器，过渡）
     * 2.点随之滚动起来     （改变当前点元素的样式）
     * 3.图片滑动           （touch事件）
     * 4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）
     * 5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）
     * */
    /*获取到dom对象*/
    /*banner*/
    var banner = document.querySelector('.dm_banner');
    /*屏幕的宽度*/
    var w = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:first-child');/*querySelector只支持有效的css选择器*/
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');
    /*添加过渡*/
    var addTransition = function () {
        imageBox.style.webkitTransition = "all .2s";/*兼容*/
        imageBox.style.transition = "all .2s";
    };
    /*删除过渡*/
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";/*兼容*/
        imageBox.style.transition = "none";
    };
    /*改变位子*/
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
        imageBox.style.transform = "translateX("+translateX+"px)";
    };
    /*1.自动的滚动起来（定时器，过渡）*/
    var index = 1;
    var timer = setInterval(function(){
        /*箱子滚动*/
        index  ++ ;
        /*定位  过渡来做定位的  这样才有动画*/
        /*加过渡*/
        addTransition();
        /*改变位子*/
        setTranslateX(-index*w);

    },4000);

    /*绑定一个过渡结束事件*/
    LGP.transitionEnd(imageBox,function(){
        console.log('transitionEnd');
        if(index >= 5){
            index = 1;
            /*做定位*/
            /*加过渡*/
            removeTransition();
            /*改变位子*/
            setTranslateX(-index*w);
        }else if(index <= 0){
            index = 4;
            /*加过渡*/
            removeTransition();
            /*改变位子*/
            setTranslateX(-index*w);
        }
        /*index 1-8  索引范围*/
        /*point 0-7 */
        setPoint();
    });

    /*2.点随之滚动起来     （改变当前点元素的样式）*/
    var setPoint = function(){
        /*把所有点的样式清除*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
            /* points[i].classList.remove('now');*/
        }
        points[index-1].className = "current";
    }

    /*3.图片滑动 touch事件）*/
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;/*distanceX  值  正负*/

        /*算出当前图片盒子需要定位的位子*/
        console.log(distanceX);

        /*将要去做定位*/
        var currX = -index*w + distanceX;
        /*删除过渡*/
        removeTransition();
        /*改变位子*/
        setTranslateX(currX);
    });
    imageBox.addEventListener('touchend',function(e){

        /*当超过了一定的距离的时候 */
        if(isMove && (Math.abs(distanceX) > w/3)){
            /*5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）*/
            if(distanceX > 0){
                index --;/*向右滑  上一张*/
            }else{
                index ++;/*向左滑 下一张*/
            }
            addTransition();
            setTranslateX(-index * w);
        }
        /*当不超过一定的滑动距离的时候*/
        else {
            /*4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/
            addTransition();
            setTranslateX(-index * w);
        }

        /*重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*添加定时器*/
        clearInterval(timer);
        timer = setInterval(function(){
            /*箱子滚动*/
            index  ++ ;
            /*定位  过渡来做定位的  这样才有动画*/
            /*加过渡*/
            addTransition();
            /*改变位子*/
            setTranslateX(-index*w);
        },4000);
    });
}
function listMove(dom){
    var listBox = document.querySelector('.'+dom+'');
    var addTransition = function () {
        listBox.style.webkitTransition = "all .6s";/*兼容*/
        listBox.style.transition = "all .6s";
    };
    var setTranslateX = function(translateX){
        listBox.style.webkitTransform = "translateX("+translateX+"px)";
        listBox.style.transform = "translateX("+translateX+"px)";
    };
    var removeTransition = function () {
        listBox.style.webkitTransition = "none";/*兼容*/
        listBox.style.transition = "none";
    };
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    listBox.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    })
    listBox.addEventListener("touchmove",function (e) {
        moveX = e.touches[0].clientX
        distanceX = moveX -  startX
        var currX =distanceX;
        /*删除过渡*/
        removeTransition();
        /*改变位子*/
        setTranslateX(currX);
    })
    listBox.addEventListener("touchend", function (e) {
      if(distanceX < -166){
            distanceX = -166
        }else if(distanceX > 0){
            distanceX = 0
        }
        addTransition()
        setTranslateX(distanceX)
        startX = 0;
        moveX = 0;
        distanceX = 0;
    })
}
function listMove1(dom){
    var listBox = document.querySelector('.'+dom+'');
    var addTransition = function () {
        listBox.style.webkitTransition = "all .6s";/*兼容*/
        listBox.style.transition = "all .6s";
    };
    var setTranslateX = function(translateX){
        var a = translateX
        // listBox.style.transform = "translateX("+(a)+"px)";
        listBox.style.transform = "translateX("+translateX +"px)";
    };
    var removeTransition = function () {
        listBox.style.webkitTransition = "none";/*兼容*/
        listBox.style.transition = "none";
    };
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    listBox.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        console.log(startX)
    })
    listBox.addEventListener("touchmove",function (e) {

        moveX = e.touches[0].clientX
        distanceX = moveX -  startX
        /* removeTransition();
        setTranslateX(currX);*/
    })
    listBox.addEventListener("touchend", function () {
        if(distanceX < -560){
              distanceX = -560
          }else if(distanceX > 20){
              distanceX = 0
          }
        addTransition()
        setTranslateX(distanceX)
        console.log(distanceX)
        startX = 0
        moveX = 0
    })
}