
//洗牌动画
function animation(){
			$('.all_poker').remove();
		    $ul = $('<ul />');
            $ul.attr('class', 'all_poker');
		// 生成牌背
		for(let i = 0; i < 54; i++){
			$li = $('<li />');    //生成一个li标签
			$li.attr('class','back back'+i).css({'top': -i + 'px'});  //生成li的属性名和css的属性
			$ul.append($li);   //插入all_poker  div里面
		}
		$('.mid_top').append($ul);

		// let mid_top = document.getElementById('mid_top').getElementsByTagName('ul')[0];

		// mid_top.onclick = function(){

			// $('.music_1').attr({autoplay:'autoplay'});
			$('.music_1').attr({src:'audio/sword.mp3',autoplay:'autoplay'});
			for(let i = 0; i < 54; i++){
				if(i < 27){
					// setTimeout(function(){},3000);
					for(let j = 0; j<27; j++){
						$('.back'+j).css({'animation':'run-three 9s linear '+ j/10 +'s 1'});
					}
				}else{
					for(let j = 27; j<54; j++){
						$('.back'+j).css({'animation':'run-three2 6s linear '+ j/10 +'s 1'});
					}
				}
			}
		// }
	}
	// effect_1();王炸
		function effect_1(){
			$('.mask').css({'display':'block'});
			$('.effect-1').css({'display':'block'});
			setTimeout(function(){
				$('.mask').css({'display':'none'});
				$('.effect-1').css({'display':'none'});
			},1200);
		}

	// effect_2();炸弹
		function effect_2(){
			$('.mask').css({'display':'block'});
			$('.effect-2').css({'display':'block'});
			setTimeout(function(){
				$('.mask').css({'display':'none'});
				$('.effect-1').css({'display':'none'});
			},1200);
		}
	// effect_3();飞机动画
		function effect_3(){
			$('.mask').css({'display':'block'});
			$('.effect-3').css({'display':'block'});
			setTimeout(function(){
				$('.mask').css({'display':'none'});
				$('.effect-1').css({'display':'none'});
			},1200);
		}
	// effect_4();输的动画
		function effect_4(){
			$('.mask').css({'display':'block','animation': 'effect-3 2s linear'});
			$('.lose').css({'display':'block'});
		}
	// effect_5();赢的动画
		function effect_5(){
			$('.mask').css({'display':'block','animation': 'effect-3 2s linear'});
			$('.win').css({'display':'block'});
		}



