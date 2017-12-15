window.LGP = {};
LGP.transitionEnd = function (dom,callback) {
    if(dom && typeof dom === 'object'){
        dom.addEventListener("webkitTransitionEnd",function () {
            callback && callback()
        });
        dom.addEventListener("transitionEnd",function () {
            callback && callback();
        })
    }
}