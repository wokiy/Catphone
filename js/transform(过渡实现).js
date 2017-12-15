(function(w){
	w.css=function(node,type,val){
		
		if(typeof node.transforms ==="undefined"){
				node.transforms={};
			}
			
			//两个参数是读取
			if(arguments.length==2){
				val = node.transforms[type];
				
				if(typeof val ==="undefined"){
					if(type=="scale"){
						val=1;
					}else if(type=="rotate"||type=="translateX"||type=="translateY"){
						val=0;
					}
				}
				
				return val;
				
			}else if(arguments.length>=3){
				//三个参数是设置
				var text="";
				node.transforms[type] = val;
				
				for(item in node.transforms){
					switch (item){
						case "translateX":
						case "translateY":
						case "translateZ":
							text+=item+"("+node.transforms[item]+"px)";
							break;
							
						case "rotate":
							text+=item+"("+node.transforms[item]+"deg)";
							break;
							
						case "scale":
							text+=item+"("+node.transforms[item]+")";
							break;
					}
				}
				
				node.style.transform = node.style.webkitTransform  =text;
			}
		
	}


	w.damu={};
	/*
	 * 橡皮筋效果
	 * 快速滑屏
	 * 防抖动
	 * 处理存值存址
	 * 
	 * */
	w.damu.drag=function(wrap){
			//拖拽区域
//			var wrap = document.querySelector("#wrap");
			//拖拽元素
//			var inner = document.querySelector("#inner");

			var inner = wrap.children[0];
			//开启3d硬件加速
			css(inner,"translateZ",0.001);
			
			//拖拽元素可以滑动的最大距离，可是在值上面是最小值
			var minY =  wrap.clientHeight -inner.offsetHeight;
			//元素一开始的位置
			var elementP = {x:0,y:0};
			//手指一开始的位置
			var startP =0;
			
			
			//上一次的时间
			var lastTime =0;
			//上一次的位置
			var lastPoint = 0;
			//时间差
			var timeVal = 1;
			//位置差
			var disVal = 0;
			
			//防抖动
			var isY = true;
			var isFirst=true;
			
			wrap.addEventListener("touchstart",function(ev){
				ev=ev||event;
				var touchC = ev.changedTouches[0];
				
				inner.style.transition="none";
				
				//同步手指和元素一开始的位置
				elementP={x:css(inner,"translateX"),y:css(inner,"translateY")};
				startP={clientX:touchC.clientX,clientY:touchC.clientY};
				
				//同步时间与位置信息
				lastTime = new Date().getTime();
				lastPoint = touchC.clientY;
				
				disVal=0;
				timeVal = 1;
				
				isY = true;
				isFirst=true;
			})
			wrap.addEventListener("touchmove",function(ev){
				if(!isY){
					return;
				}
				
				
				ev=ev||event;
				var touchC = ev.changedTouches[0];
				//手指的实时位置
				var nowP = touchC;
				var disX = nowP.clientX - startP.clientX;
				var disY = nowP.clientY - startP.clientY;
				
				//左边的留白
				var translateY = elementP.y+disY;
				
				
				//橡皮筋效果
				var scale =0;
				if(translateY>0){
//					scale = 1- translateY/document.documentElement.clientHeight;
					scale = document.documentElement.clientHeight/(document.documentElement.clientHeight+translateY);
					translateY=elementP.y+disY*scale;
				}else if(translateY<minY){
					var over = minY - translateY;
					scale = document.documentElement.clientHeight/(document.documentElement.clientHeight+over);
					translateY=elementP.y+disY*scale;
				}
				
				if(isFirst){
					isFirst=false;
					if(Math.abs(disX)>Math.abs(disY)){
						isY=false;
						return;
					}
				}
				
				
				css(inner,"translateY",translateY);
				
				//每一次touchmove时的时刻
				var nowTime = new Date().getTime();
				//每一次touchmove时的手指的位置
				var nowPoint = touchC.clientY;
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
				var target = css(inner,"translateY")+speed*200;
				console.log(target);
				
				var bsr ="";
				if(target>0){
					target=0;
					//控制回弹
					bsr ="cubic-bezier(.82,1.24,.75,1.26)";
				}else if(target<minY){
					target=minY;
					//控制回弹
					bsr ="cubic-bezier(.82,1.24,.75,1.26)";
				}
				inner.style.transition=time*10+"s "+bsr;
				css(inner,"translateY",target);
			})
		}

})(window)
