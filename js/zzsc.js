$(function(){
$('#zzsc').html('<canvas id="canvas"></canvas>');
var WINDOW_WIDTH = 920;
		var WINDOW_HEIGHT = 400;
		var RADIUS = 7; //球半径
		var NUMBER_GAP = 10; //数字之间的间隙
		var u=0.65; //碰撞能量损耗系数
		var context; //Canvas绘制上下文
		var balls = []; //存储彩色的小球
		const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; //彩色小球的颜色
		var currentNums = []; //屏幕显示的8个字符
		var digit =
                [
                    [
                        [0,0,1,1,1,0,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,0,1,1,0],
                        [0,0,1,1,1,0,0]
                    ],//0
                    [
                        [0,0,0,1,1,0,0],
                        [0,1,1,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [1,1,1,1,1,1,1]
                    ],//1
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,1,1],
                        [1,1,1,1,1,1,1]
                    ],//2
                    [
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,1,0,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//3
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,0],
                        [0,0,1,1,1,1,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,1,1,0],
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,1]
                    ],//4
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,1,1,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//5
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//6
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0]
                    ],//7
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//8
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,1,1,0,0,0,0]
                    ],//9
                    [
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0]
                    ]//:
                ];

		function drawDatetime(cxt){
			var nums = [];

			context.fillStyle="#005eac"
			var date = new Date();
			var offsetX = 70, offsetY = 30;
			var hours = date.getHours();
			var num1 = Math.floor(hours/10);
			var num2 = hours%10;
			nums.push({num: num1});
			nums.push({num: num2});
			nums.push({num: 10}); //冒号
			var minutes = date.getMinutes();
			var num1 = Math.floor(minutes/10);
			var num
