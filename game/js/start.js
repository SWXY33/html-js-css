
function ChangeToArr(obj){
				var newArr=[];
				newArr.push(obj);
				console.log("把对象插入数组中：");
				console.log(newArr);
				console.log("(newArr[0].dawang="+newArr[0].dawang);
				return newArr;
			}
var liangzhu="";
function start(){

	setTimeout(function() { $("#start").remove(); });
	$(".ready").append("<button class='again'><a href='javascript:location.reload();'> 再来一局</a></button>");

	document.getElementById("operateB").style.visibility="visible";//显示亮主牌选择区
				/**洗牌原理：
				sort 是对数组进行排序
				工作原理：1.每次从数组里面挑选两个数 进行运算。2.如果传入的参数是0两个数位置不变。
				3.如果参数小于0就交换位置。4.如果参数大于0就不交换位置。5.接下来用刚才的较大数字跟下一个进行比较。这样循环进行排序。
				6.利用这一点使用了0.5 - Math.random 这个运算的结果要么是大于0,要么是小于0.这样要么交换位置，要么不交换位置。
				当然大于或者小于0是随机出现的。所以数组就被随机排序了。**/
				//洗牌
				fourCards.sort(function() {
				     return (0.5-Math.random());
				})
				var A=[],B=[],C=[],D=[];
				//发牌
				for(var j=0;j<216;j++){
					if(A.length==B.length&&C.length==D.length&&A.length==C.length){
						A.push(fourCards[j]);
					}
					else if(A.length>B.length&&B.length==C.length&&C.length==D.length){
						B.push(fourCards[j]);
					}
					else if(A.length==B.length&&B.length>C.length&&C.length==D.length){
						C.push(fourCards[j]);
					}
					else if(A.length==B.length&&B.length==C.length&&C.length>D.length){
						D.push(fourCards[j]);
					}
					
				}
			
            sortType(A,"heitao");
			sortType(B,"heitao");
			sortType(C,"heitao");
			sortType(D,"heitao");
			console.log("A排序后：");
			console.log(A);
			console.log("B排序后：");
			console.log(sortType(B,"heitao"));
			console.log("C排序后：");
			console.log(sortType(C,"heitao"));
			console.log("D排序后：");
			console.log(sortType(D,"heitao"));	
			function ShowPokers(){
				var selectA="#A",selectB="#B",selectC="#C",selectD="#D";
				ShowPoker(A,selectA);//往selectA即（id="A"）的元素中插入数组A
				ShowPoker(B,selectB);
				ShowPoker(C,selectC);
				ShowPoker(D,selectD);
				
			}
			ShowPokers();
			console.log("++++++++++++++"+B);
			//亮主
			console.log("此时B的手牌是图标形式："+B);
			var dawangNum=CountNum(ChangeArr(B),ChangeToArr(JSON.parse(ChangeArr(ChangeBeforeArr(B))))).dawang;//定义玩家B手牌中的大王张数
			console.log("此时B的手牌是拼音形式："+B);
			ChangeBeforeArr(B);//把手牌转换成图标形式
			console.log("此时B的手牌是图标形式："+B);
			var xiaowangNum=CountNum(ChangeArr(B),ChangeToArr(JSON.parse(ChangeArr(ChangeBeforeArr(B))))).xiaowang;//定义玩家B手牌中的小王张数
			ChangeBeforeArr(B);//把手牌转换成图标形式
			var heitao2Num=CountNum(ChangeArr(B),ChangeToArr(JSON.parse(ChangeArr(ChangeBeforeArr(B))))).heitao2;//定义玩家B手牌中的♠2张数
			ChangeBeforeArr(B);//把手牌转换成图标形式
			var hongtao2Num=CountNum(ChangeArr(B),ChangeToArr(JSON.parse(ChangeArr(ChangeBeforeArr(B))))).hongtao2;//定义玩家B手牌中的♥2张数
			ChangeBeforeArr(B);//把手牌转换成图标形式
			var meihua2Num=CountNum(ChangeArr(B),ChangeToArr(JSON.parse(ChangeArr(ChangeBeforeArr(B))))).meihua2;//定义玩家B手牌中的♣2张数
			ChangeBeforeArr(B);//把手牌转换成图标形式
			var fangkuai2Num=CountNum(ChangeArr(B),ChangeToArr(JSON.parse(ChangeArr(ChangeBeforeArr(B))))).fangkuai2;//定义玩家B手牌中的♦2张数
			ChangeBeforeArr(B);//把手牌转换成图标形式
			
			$('button[class^="zhu"]').css("color", "#ccc");//所有class="zhu"的button字体设置为灰色
			for(var x=0;x<54;x++){
			if(B[x]==newA[2]){document.getElementById("heitao").style.color="red";}
			else if(B[x]==newA[3]){document.getElementById("hongtao").style.color="red";}
			else if(B[x]==newA[4]){document.getElementById("meihua").style.color="red";}
			else if(B[x]==newA[5]){document.getElementById("fangkuai").style.color="red";}
			//如果获得四张大王或小王才有资格叫无主，几率比较小
			else if(dawangNum>1&&xiaowangNum>1){document.getElementById("dawang").style.color="red";}//dawangNum为玩家B获取大王的张数
			else if(xiaowangNum>1&&dawangNum<4){document.getElementById("xiaowang").style.color="red";}//xiaowangNum为玩家B获取小王的张数
			else if(xiaowangNum==1&&dawangNum==2){document.getElementById("xiaowang").style.color="red";document.getElementById("dawang").style.color="red";}}
		
		var num=[];
		function SortAgain(type){
			sortType(A,type);
			sortType(B,type);
			sortType(C,type);
			sortType(D,type);
			$('div[class^="poker"]').remove();
			ShowPokers();
			console.log("BBBBBBBBBBBBBBBBB"+B);
			document.getElementById("liangzhu").innerHTML=num;	
			$('button[class^="zhu"]').css("color", "#ccc");//所有class="zhu"的button字体设置为灰色
			$('button').attr("disabled", "disabled");//亮主后所有按钮不能再点，只能叫主一次
			$('button[class^="zhu"]').remove();
			setTimeout(function() { 
			 $("#operateB").append("<button class='operate1' id='hint' style='background-color:#55aaff'>提示</button>"+
			 "<button class='operate1' id='out'style='background-color:#00aa00' onclick='outB()'>出牌</button>"+
			 "<button class='operate1' id='pass' style='background-color:#d30b4b' onclick='Before()'>上轮</button>");}, 1000);
			//出牌
		
		}
		
		
		function ChoosePoker(){
			
			$('div[class^="A"]').children().click(function () {//当类名为A的子元素出现点击事件时
				var clicktimes;
						if($(this).attr('class')=="poker"){//如果点击的这个元素它的类名为poker
						clicktimes=1;//那么设置点击次数为1
					    $(this).removeClass("poker");//移除这个poker类名
					    $(this).addClass("active");//并且添加一个类名叫active
				}else if($(this).attr('class')=="active"){//如果点击的这个元素它的类名为active
						clicktimes=0;//那么设置点击次数为0
					    $(this).removeClass("active");//移除这个active的类名
					    $(this).addClass("poker");//同时添加一个类名叫poker
				}
			    });
			
			$('div[class^="B"]').children().click(function () {
				var clicktimes;
						if($(this).attr('class')=="poker"){
						clicktimes=1;
					    $(this).removeClass("poker");
					    $(this).addClass("active");
					
				}else if($(this).attr('class')=="active"){
						clicktimes=0;
					    $(this).removeClass("active");
					    $(this).addClass("poker");
				}
			    });
			
			
			
			
			$('div[class^="C"]').children().click(function () {
				var clicktimes;
						if($(this).attr('class')=="poker"){
						clicktimes=1;
					    $(this).removeClass("poker");
					    $(this).addClass("active");
					
				}else if($(this).attr('class')=="active"){
						clicktimes=0;
					    $(this).removeClass("active");
					    $(this).addClass("poker");
				}
			    });
				$('div[class^="D"]').children().click(function () {
					var clicktimes;
							if($(this).attr('class')=="poker"){
							clicktimes=1;
						    $(this).removeClass("poker");
						    $(this).addClass("active");
						
					}else if($(this).attr('class')=="active"){
							clicktimes=0;
						    $(this).removeClass("active");
						    $(this).addClass("poker");
					}
				    });
			
		}
		
		//遍历亮主的按钮
			$('button').each(function () {
			if ($(this).css('color') === 'rgb(255, 0, 0)'&&this.id=="heitao") {//判断黑桃2是否为亮红，亮红才可以叫主
			$(this).click(function(){
			liangzhu="heitao";
			for(var r=0;r<heitao2Num;r++){
			num.push("♠2");
			}
			var type="heitao";
			SortAgain(type);
			ChoosePoker();
			console.log("BBBBBBBBBBBBBBBBB111111111111111111"+B);
			
			});}
			else if($(this).css('color') === 'rgb(255, 0, 0)'&&this.id=="hongtao"){//判断红桃2是否为亮红，亮红才可以叫主
			$("#hongtao").click(function(){
			liangzhu="hongtao";
			for(var r=0;r<hongtao2Num;r++){
			num.push("♥2");
			}	
			var type="hongtao";
			SortAgain(type);
			ChoosePoker();
			$("#liangzhu").css("color","red");
			});}
			else if($(this).css('color') === 'rgb(255, 0, 0)'&&this.id=="meihua"){//判断梅花2是否为亮红，亮红才可以叫主
			$("#meihua").click(function(){
			liangzhu="meihua";
			for(var r=0;r<meihua2Num;r++){
			num.push("♣2");
			}
			var type="meihua";
			SortAgain(type);
			ChoosePoker();
			});}
			else if($(this).css('color') === 'rgb(255, 0, 0)'&&this.id=="fangkuai"){//判断方块2是否为亮红，亮红才可以叫主
			$("#fangkuai").click(function(){
			for(var r=0;r<fangkuai2Num;r++){
			liangzhu="fangkuai";
			num.push("♦2");
			}	
			var type="fangkuai";
			SortAgain(type);
			ChoosePoker();
			$("#liangzhu").css("color","red");
			});}
			else if($(this).css('color') === 'rgb(255, 0, 0)'&&this.id=="dawang"){//判断大王是否为亮红，亮红才可以叫主
			$("#dawang").click(function(){
			liangzhu="dawang";
			var type="dawang";
			SortAgain(type);
			ChoosePoker();
			$("#liangzhu").css("color","red");
			document.getElementById("liangzhu").innerHTML="♚♚♚♚";
			});}
			else if($(this).css('color') === 'rgb(255, 0, 0)'&&this.id=="xiaowang"){//判断小王是否为亮红，亮红才可以叫主
			liangzhu="xiaowang";
			$("#xiaowang").click(function(){
			var type="xiaowang";
			SortAgain(type);
			ChoosePoker();
			document.getElementById("liangzhu").innerHTML="♖♖♖♖";
			});}
			});
			
}


