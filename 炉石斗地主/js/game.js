$(function () {
    let click = 0;	// 点击数
    // 1、生成扑克
    for (let i = 0; i < 54; i++) {
        $li = $('<li />');		// 通过JS生成一个JQ的HTML（DOM）对象
        $li.attr('class', 'back').css({'top': -i + 'px'});
        $('.all_poker').append($li);
    }
    // $('.start').on('click','start_game',function(){
    //     $('audio').attr({src:'../audio/click.mp3',autoplay:'autoplay'});
    // });
    // $('button').click(function(){
    //     $('.audio_button').attr({src:'audio/click.mp3',autoplay:'autoplay'});
    // });
    start_go();
    function start_go(){
        $('.start_game').click(function() {
            // $('.audio_click').attr('src','../audio/click.mp3');
            $('.audio_click').attr({src:'audio/begin.mp3',autoplay:'autoplay'});
            $('.audio_bg').remove();
            $('.start1').css({'animation': 'go-1 1s linear 1'});
            $('.start2').css({'animation': 'go-2 1s linear 1'});
            $('.start_game').css({'animation': 'go-3 1s linear 1'});
            setTimeout(function(){
                $('.start').css({'display':'none'});
            },1000);
        });
    }
     

    // 初始化扑克数据
    let all_poker = [];
    // all_poker[[1, 0], [1, 1], [1, 2], [1, 3]];
    // poker = {number:1, color: 0};
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < 4; j++) {
            all_poker.push({number: i, color: j});
        }
    }
    all_poker.push({number: 14, color: 0});
    all_poker.push({number: 14, color: 1});
    // console.log(all_poker);

    // 生成玩家的数据
    let play_1 = {poker: [], role: 0, score: 10000};
    let play_2 = {poker: [], role: 0, score: 10000};
    let play_3 = {poker: [], role: 0, score: 10000};

    let play = [
        {poker: [], role: 0, score: 10000},
        {poker: [], role: 0, score: 10000},
        {poker: [], role: 0, score: 10000}
    ];

    // 设置一个变量为对象，用于保存游戏里的数据
    let game = {'present': '-1'};

    // 设置一个变量对象，用于保存游戏中玩家选择牌的数据
    let select_poker = {
        'type': 0,
        'max': 0,
        'list': []
    };
    // 设置一个变量对象，用于保存游戏中桌面上牌的数据
    let desktop = {
        'type': 0,
        'max': 0,
        'list': []
    };
    // 2、绑定洗牌与发牌的方法
    // $('.all_poker li').click(function(){
    $('.mid_top').on('click', '.all_poker li', function () {
        if (click == 0) {
            clearPoker();		// 调用洗牌方法
            click++;
        }
    });

    // 定义洗牌的方法
    function clearPoker() {
        // 对扑克数据进行排序的打乱
        for (let i = 0; i < 3; i++) {
            all_poker.sort(function (x, y) {
                return Math.random() - 0.5;
            });
        }

        // 2.0 先保存原组代码（对象）
        let $all_poker = $('.all_poker');

        // 2.1 删除原牌组
        $('.all_poker').remove();

        animation();


        // 2.4 变回原样
        setTimeout(function () {
            // 2.4.1 先把三个临时牌组删除
            $('.all_poker').remove();
            // 2.4.2 把原牌组放回页面中
            $('.mid_top').html($all_poker);
            $audio = $('<audio />');
            $audio.attr('class', 'audio_bg');
            $('body').append($audio);
            $('.audio_bg').attr({src:'audio/bg.mp3',autoplay:'autoplay'});
            deal();
        }, 12000);
        // setTimeout(function () {
            
        // }, );//洗牌完成后自动发牌
    }

    // 定义发牌方法
    function deal(num) {
        num = num || 0;		// 给参数设置默认值
        // console.log(num);
        // 发牌给左边玩家
        $('.all_poker li:last').animate({'left': '-500px', 'top': '200px'}, 20);
        // 从总牌堆把最后一张牌发给玩家1
        play_1.poker.push(all_poker.pop());
        setTimeout(function () {
            $('.all_poker li:last').remove();
            // 把玩家得到的牌生成到对应的位置上，并且进行调整xyt
            poker_html = makePoker(play_1.poker[play_1.poker.length - 1]);		// 调用生成牌面的方法
            $('.play_1').append(poker_html);
            $('.play_1 li:last').css({'left': num * 36 + 'px'});
        }, 25);

        // 发牌给中间玩家
        setTimeout(function () {
            // 从总牌堆把最后一张牌发给玩家2
            play_2.poker.push(all_poker.pop());
            $('.all_poker li:last').animate({'top': '500px'}, 20);
            setTimeout(function () {
                $('.all_poker li:last').remove();

                // 把玩家得到的牌生成到对应的位置上，并且进行调整
                poker_html = makePoker(play_2.poker[play_2.poker.length - 1]);		// 调用生成牌面的方法
                $('.play_2').append(poker_html);
                $('.play_2 li:last').css({'left': num * 36 + 'px'});
                $('.play_2').css({'left': -num * 18 + 'px'});
            }, 25);
        }, 30);

        // 发牌给右边玩家
        setTimeout(function () {
            // 从总牌堆把最后一张牌发给玩家3
            play_3.poker.push(all_poker.pop());
            $('.all_poker li:last').animate({'left': '500px', 'top': '200px'}, 20);
            setTimeout(function () {
                $('.all_poker li:last').remove();

                // 把玩家得到的牌生成到对应的位置上，并且进行调整xyt
                poker_html = makePoker(play_3.poker[play_3.poker.length - 1]);		// 调用生成牌面的方法
                $('.play_3').append(poker_html);
                $('.play_3 li:last').css({'left': num * 35 + 'px'});
                // num++;
                if (++num < 17) {
                    deal(num);	//  通过自调函数重新执行下一轮的发牌
                } else {
                    setTimeout(function () {
                        // 发牌步骤已经完成。现在需要把玩家手上的牌进行排序
                        $('.play_2 li').css({'background': "url('./images/14.png') -87px -225px"});
                    }, 1000);
                    setTimeout(function () {
                        // 对各玩家手牌数据进行排序
                        $('.play_2 li').remove();
                        play_2.poker = pokerSort(play_2.poker);
                        for (let i = 0; i < play_2.poker.length; i++) {
                            poker_html = makePoker(play_2.poker[i]);
                            $('.play_2').append(poker_html);
                            $('.play_2 li:last').css({'left': i * 36 + 'px'});
                            $('.play_2').css({'left': -i * 18 + 'px'});
                        }
                        $('.play_1 li').remove();
                        play_1.poker = pokerSort(play_1.poker);
                        for (let i = 0; i < play_1.poker.length; i++) {
                            poker_html = makePoker(play_1.poker[i]);
                            $('.play_1').append(poker_html);
                            $('.play_1 li:last').css({'left': i * 36 + 'px'});
                            // $('.play_1').css({'left': -i*9+'px'});
                        }
                        $('.play_3 li').remove();
                        play_3.poker = pokerSort(play_3.poker);
                        for (let i = 0; i < play_3.poker.length; i++) {
                            poker_html = makePoker(play_3.poker[i]);
                            $('.play_3').append(poker_html);
                            $('.play_3 li:last').css({'left': i * 35 + 'px'});
                            // $('.play_2').css({'left': -i*9+'px'});
                        }

                        // 执行抢地主的方法
                        getLandlord();
                    }, 2000);
                }
            }, 25);
        }, 60);
    }

    // 生成牌面代码（对象）的方法
    function makePoker(poker_data) {
        // console.log(poker_data);
        let color_arr = [
            [-17, -228],
            [-17, -6],
            [-160, -6],
            [-160, -228]
        ];
        let x = 0;
        let y = 0;
        if (poker_data.number < 14) {
            x = color_arr[poker_data.color][0];
            y = color_arr[poker_data.color][1];
        } else {
            if (poker_data.color == 0) {
                x = -160;
                y = -6;
            } else {
                x = -17;
                y = -6;
            }
        }
        let html = '<li data-poker="' + poker_data.number + '_' + poker_data.color + '" style="width: 125px; height: 175px; background: url(./images/' + poker_data.number + '.png) ' + x + 'px ' + y + 'px;"></li>';
        return html;
    }

    // 扑克数组进行排序的方法
    function pokerSort(poker_list) {

        // let arr = [1,23,541,21,551,2542];
        // [{number:1, color:1},{number:2, color:0}]
        poker_list.sort(function (x, y) {
            if (x.number == y.number) {
                return x.color - y.color;
            } else {
                return x.number - y.number;
            }
        });
        return poker_list;
    }

    // 定义抢地主方法
    function getLandlord(start, number) {
        // 随机从其中一位玩家开始抢地主
        // let start = Math.round(Math.random()*(2+1) + (0-0.5));
        // start = start||Math.round(Math.random()*(2+1) + (0-0.5));		// 给抢地主的玩家索引一个默认值
        if (start == undefined) {
            start = Math.round(Math.random() * (2 + 1) + (0 - 0.5));
        }

        //start = 1;
        number = number || 1;
        // console.log(start);
        $('.play_btn').hide();
        $('.play_btn').eq(start).show();
        $('.interval').hide();
        $('.interval').eq(start).show();

        let time = 10;
        let timer = setInterval(function () {
            time--;
            if (time == 0) {
                clearInterval(timer);
                $('.play_btn:eq(' + start + ') .cancel').click();
            }
            document.getElementsByClassName('interval')[start].innerHTML = time;
            document.getElementsByClassName('interval')[start].innerHTML = time;
            document.getElementsByClassName('interval')[start].innerHTML = time;


        }, 1000);


        // clearInterval(timer);
        // timer = setInterval(function(){

        // },1000);


        $('.play_btn:eq(' + start + ') .get').click(function () {
            $('.audio_button').attr({src:'audio/click.mp3',autoplay:'autoplay'});
            $('.audio_dizhu').attr({src:'audio/dizhu2.mp3',autoplay:'autoplay'});

            // alert('抢地主');
            $('.interval').hide();
            clearInterval(timer);


            // 给玩家分配角色
            switch (start) {
                case 0:
                    play_1.role = 1;
                    // 给对应玩家分配地主牌
                    play_1.poker = play_1.poker.concat(all_poker);
                    $('.left .roles .owner').show();
                    $('.mid_end .roles .farmer').show();
                    $('.right .roles .farmer').show();
                    getLandlordPoker(0);
                    $('.pass').hide();
                    break;
                case 1:
                    play_2.role = 1;
                    play_2.poker = play_2.poker.concat(all_poker);
                    console.log(play_2);
                    $('.mid_end .roles .owner').show();
                    $('.left .roles .farmer').show();
                    $('.right .roles .farmer').show();
                    getLandlordPoker(1);
                    $('.pass').hide();
                    break;
                case 2:
                    play_3.role = 1;
                    play_3.poker = play_3.poker.concat(all_poker);
                    $('.right .roles .owner').show();
                    $('.left .roles .farmer').show();
                    $('.mid_end .roles .farmer').show();
                    getLandlordPoker(2);
                    $('.pass').hide();
                    break;
            }
            // play[start].role = 1;
        });

        $('.play_btn:eq(' + start + ') .cancel').click(function () {
            $('.audio_button').attr({src:'audio/click.mp3',autoplay:'autoplay'});
            $('.audio_dizhu2').attr({src:'audio/dizhu.mp3',autoplay:'autoplay'});

            // alert('不抢');
            clearInterval(timer);
            start = (++start > 2) ? 0 : start;
            if (++number > 3) {
                
                $('.end').show();//xyt0314
                $('.end .more').click(function(){            //点击再来一句刷新当前野蛮
                    window.location.reload();
                });
                $('.end .leave').click(function(){           //点击离开页面
                    window.close();
                });
                $('.text2').show('fast');
                $('.text2').html('流局');
                setTimeout(function(){$('.text2').hide('slow');},1500);

            } else {
                getLandlord(start, number);
            }
        });
    }

    // 定义获取地主牌的方法
    function getLandlordPoker(play_index) {
        // 删除原来地主牌牌背
        $('.all_poker li').remove();
        // 把所有的玩家按钮隐藏
        $('.play_btn').css({'display': 'none'});
        // 生成地主牌牌面的方法
        for (let i = 0; i < 3; i++) {
            poker_html = makePoker(all_poker[i]);
            $('.all_poker').append(poker_html);
            $('.play').eq(play_index).append(poker_html);

            // 玩家2为地主
            if (play_index == 1) {
                $('.play:eq(1) li:last').css({'left': (i + 1) * 36 + 288 + 'px'});
                $('.play:eq(1)').css({'left': -(i + 1) * 54 - 144 + 'px'});

                // 等0.5秒后对地主手牌再进行一次排序
                setTimeout(function () {
                    $('.play:eq(1) li').css({'background': "url('./images/14.png') -87px -225px"});
                }, 500);
                setTimeout(function () {
                    $('.play_2 li').remove();
                    play_2.poker = pokerSort(play_2.poker);
                    for (let i = 0; i < play_2.poker.length; i++) {
                        poker_html = makePoker(play_2.poker[i]);
                        $('.play_2').append(poker_html);
                        $('.play_2 li:last').css({'left': i * 36 + 'px'});
                        $('.play_2').css({'left': -i * 18 + 'px'});
                    }
                }, 700);
            }
            //玩家1为地主
            else if (play_index == 0) {
                $('.play:eq(0) li:last').css({'left': (i + 1) * 36 + 288 + 'px'});
                // $('.play:eq(0)').css({'left':-(i+1)*18-144+'px'});

                // 等0.5秒后对地主手牌再进行一次排序
                setTimeout(function () {
                    $('.play:eq(0) li').css({'background': "url('./images/14.png') -87px -225px"});
                }, 500);
                setTimeout(function () {
                    $('.play_1 li').remove();
                    play_1.poker = pokerSort(play_1.poker);
                    for (let i = 0; i < play_1.poker.length; i++) {
                        poker_html = makePoker(play_1.poker[i]);
                        $('.play_1').append(poker_html);
                        $('.play_1 li:last').css({'left': i * 36 + 'px'});
                        // $('.play_1').css({'left': -i*9+'px'});
                    }
                }, 700);
            }
            else if (play_index == 2) {
                $('.play:eq(2) li:last').css({'left': (i + 1) * 36 + 288 + 'px'});
                // $('.play:eq(0)').css({'left':-(i+1)*18-144+'px'});

                // 等0.5秒后对地主手牌再进行一次排序
                setTimeout(function () {
                    $('.play:eq(2) li').css({'background': "url('./images/14.png') -87px -225px"});
                }, 500);
                setTimeout(function () {
                    $('.play_3 li').remove();
                    play_3.poker = pokerSort(play_3.poker);
                    for (let i = 0; i < play_3.poker.length; i++) {
                        poker_html = makePoker(play_3.poker[i]);
                        $('.play_3').append(poker_html);
                        $('.play_3 li:last').css({'left': i * 36 + 'px'});
                        // $('.play_1').css({'left': -i*9+'px'});
                    }
                }, 700);
            }
        }

        // 地主牌移动的动画
        $('.all_poker li').eq(0).animate({'left': '-200px'}, 500).animate({'top': '-50px'}, 500);
        $('.all_poker li').eq(1).animate({'left': '200px'}, 500).animate({'top': '-50px'}, 500);
        $('.all_poker li').eq(2).animate({'left': '0px'}, 500).animate({'top': '-50px'}, 500);

        game.present = play_index;
        // 调用开始游戏的方法
        setTimeout(function () {
            startGame(0);
        }, 1000);
    }

    // 开始游戏的方法
    function startGame(cancel_num) {
        // 1、确定谁是当前出牌的玩家
        $('.play_btn2').hide();
        $('.play_btn2').eq(game.present).show();
        $('.interval').hide();
        $('.interval').eq(game.present).show();

        // 2、调用绑定出牌事件的方法
        presentClick(cancel_num);
    }

    // 点击选择牌的方法
    function presentClick(cancel_num) {
        let time = 20;
        let timer2 = setInterval(function () {
            time--;
            if (time == 0) {
                clearInterval(timer2);
                $('.play_btn2').eq(game.present).find('.pass').click();   
            }
            document.getElementsByClassName('interval')[game.present].innerHTML = time;
        }, 1000);
          // 提示功能     0313
        $('.play_btn2').eq(game.present).off('click', '.hint');
        $('.play_btn2').eq(game.present).on('click','.hint',function(){            
                $('.audio_button').attr({src:'audio/click.mp3',autoplay:'autoplay'});
            // desktop.max
                // cancel_num = 1;
                if(desktop.length == 0){
                        desktop.max =0;
                    }
                switch(desktop.type){
                    // 桌面牌型为单张

                    case 1:
                        switch(game.present){
                        case 0:
                        for(let i =0;i<play_1.poker.length;i++){
                            if(play_1.poker[i].number>desktop.max){
                                let poker = {'number': play_1.poker[i].number, 'color': play_1.poker[i].color};
                                $('.play_1 li').eq(i).addClass('select');
                                select_poker.list.push(poker);
                                console.log(select_poker);
                                // $('.play_out').click();
                                break;
                            }
                            // else if(play_1.poker[play_1.poker.length-1].number<desktop.max){
                            //     $('.pass').eq(0).click();
                            //     break;
                            // }   
                            }
                        break;
                        case 1:
                            for(let i =0;i<play_2.poker.length;i++){
                                if(play_2.poker[i].number>desktop.max){
                                    let poker = {'number': play_2.poker[i].number, 'color': play_2.poker[i].color};
                                    $('.play_2 li').eq(i).addClass('select');
                                    select_poker.list.push(poker);
                                    console.log(select_poker);
                                    break;
                                }
                            // else if(play_2.poker[play_2.poker.length-1].number<desktop.max){
                            //     $('.pass').eq(1).click();
                            //     break;
                            // }
                            }
                        break;
                        case 2:
                        for(let i =0;i<play_3.poker.length;i++){
                            if(play_3.poker[i].number>desktop.max){
                                let poker = {'number': play_3.poker[i].number, 'color': play_3.poker[i].color};
                                $('.play_3 li').eq(i).addClass('select');
                                select_poker.list.push(poker);
                                // console.log(select_poker);
                                // $('.play_out').click();

                                break;
                                }
                            // else if(play_3.poker[play_3.poker.length-1].number<desktop.max){
                            //     $('.pass').eq(2).click();
                            //     break;
                            //     }
                            }
                        break;
                    }
                    break;
                    // 桌面牌型为对子
                    case 2:
                        switch(game.present){
                            case 0:
                                for(let i=0;i<play_1.poker.length;i++){
                                if(play_1.poker[i].number == play_1.poker[i+1].number&&play_1.poker[i].number>desktop.max){
                                let poker = {'number': play_1.poker[i].number, 'color': play_1.poker[i].color};
                                let poker1 = {'number': play_1.poker[i+1].number, 'color': play_1.poker[i+1].color};
                                $('.play_1 li').eq(i).addClass('select');
                                $('.play_1 li').eq(i+1).addClass('select');
                                select_poker.list.push(poker);
                                select_poker.list.push(poker1);
                                console.log(select_poker);
                                break;
                                }
                            }
                            break;
                            case 1:
                                for(let i=0;i<play_2.poker.length;i++){
                                if(play_2.poker[i].number == play_2.poker[i+1].number&&play_2.poker[i].number>desktop.max){
                                    let poker = {'number': play_2.poker[i].number, 'color': play_2.poker[i].color};
                                    let poker1 = {'number': play_2.poker[i+1].number, 'color': play_2.poker[i+1].color};
                                    $('.play_2 li').eq(i).addClass('select');
                                    $('.play_2 li').eq(i+1).addClass('select');
                                    select_poker.list.push(poker);
                                    select_poker.list.push(poker1);
                                    console.log(1);
                                    break;
                                }
                            }
                            break;
                            case 2:
                                for(let i=0;i<play_3.poker.length;i++){
                                if(play_3.poker[i].number == play_3.poker[i+1].number&&play_3.poker[i].number>desktop.max){
                                let poker = {'number': play_3.poker[i].number, 'color': play_3.poker[i].color};
                                let poker1 = {'number': play_3.poker[i+1].number, 'color': play_3.poker[i+1].color};
                                $('.play_3 li').eq(i).addClass('select');
                                $('.play_3 li').eq(i+1).addClass('select');
                                select_poker.list.push(poker);
                                select_poker.list.push(poker1);
                                console.log(select_poker);
                                break;
                                }
                            }
                            break;
                        }
                        break;
                    // 桌面牌型为三张
                    case 3:
                        switch(game.present){
                            case 0:
                                for(let i=0;i<play_1.poker.length;i++){
                                if(play_1.poker[i].number == play_1.poker[i+2].number&&play_1.poker[i].number>desktop.max){
                                let poker = {'number': play_1.poker[i].number, 'color': play_1.poker[i].color};
                                let poker1 = {'number': play_1.poker[i+1].number, 'color': play_1.poker[i+1].color};
                                let poker2 = {'number': play_1.poker[i+2].number, 'color': play_1.poker[i+2].color};
                                $('.play_1 li').eq(i+2).addClass('select');
                                $('.play_1 li').eq(i).addClass('select');
                                $('.play_1 li').eq(i+1).addClass('select');
                                select_poker.list.push(poker);
                                select_poker.list.push(poker1);
                                select_poker.list.push(poker2);
                                break;
                                }
                            }
                            break;
                            case 1:
                                for(let i=0;i<play_2.poker.length;i++){
                                if(play_2.poker[i].number == play_2.poker[i+2].number&&play_2.poker[i].number>desktop.max){
                                    let poker = {'number': play_2.poker[i].number, 'color': play_2.poker[i].color};
                                    let poker1 = {'number': play_2.poker[i+1].number, 'color': play_2.poker[i+1].color};
                                    let poker2 = {'number': play_2.poker[i+2].number, 'color': play_2.poker[i+2].color};
                                    $('.play_2 li').eq(i).addClass('select');
                                    $('.play_2 li').eq(i+1).addClass('select');
                                    $('.play_2 li').eq(i+2).addClass('select');
                                    select_poker.list.push(poker);
                                    select_poker.list.push(poker1);
                                    select_poker.list.push(poker2);
                                    break;
                                }
                            }
                            break;
                            case 2:
                                for(let i=0;i<play_3.poker.length;i++){
                                if(play_3.poker[i].number == play_3.poker[i+2].number&&play_3.poker[i].number>desktop.max){
                                let poker = {'number': play_3.poker[i].number, 'color': play_3.poker[i].color};
                                let poker1 = {'number': play_3.poker[i+1].number, 'color': play_3.poker[i+1].color};
                                let poker2 = {'number': play_3.poker[i+2].number, 'color': play_3.poker[i+2].color};
                                $('.play_3 li').eq(i).addClass('select');
                                $('.play_3 li').eq(i+1).addClass('select');
                                $('.play_3 li').eq(i+2).addClass('select');
                                select_poker.list.push(poker);
                                select_poker.list.push(poker1);
                                select_poker.list.push(poker2);
                                break;
                                }
                            }
                            break;
                        }
                    break;

                }
                            
        });

        //$('.play_btn2').eq(game.present).on('click', '.li', function () {
        $('.play').eq(game.present).on('click', 'li', function () {
            $('.audio_select').attr({src:'audio/select.mp3',autoplay:'autoplay'});
            // 得到选择到的牌的数据信息
            let str = $(this).attr('data-poker');
            let arr = str.split('_');
            let poker = {'number': arr[0], 'color': arr[1]};


            // 通过样式来判断需要选择牌还是取消选择
            if ($(this).attr('class') == 'select') {
                $(this).removeClass('select');
                // 遍历数组得到当前数据一致元素的下标
                for (let i = 0; i < select_poker.list.length; i++) {
                    /*
                     由于在对象的概念点两个完全相同的对象，也是不同一个对象。
                     所以直接使用比较运算等  == 或者 === 来进行对比的话，得到的结果永远为false.
                     也就是说不我们不能直接使用对象跟对象进行相同的比较
                     */
                    // if(select_poker.list[i] == poker){
                    if (select_poker.list[i].number == poker.number &&
                        select_poker.list[i].color == poker.color) {
                        select_poker.list.splice(i, 1);
                        break;	// 中断当前语句
                        // continue; // 本次语句不再执行，继续下一次语句的执行
                    }
                }
                console.log(select_poker.list);
            } else {
                $(this).addClass('select');
                select_poker.list.push(poker);
                console.log(select_poker);
            }
        });

        // 绑定出牌事件
        $('.play_btn2').eq(game.present).on('click', '.play_out', function () {
            $('.audio_button').attr({src:'audio/click.mp3',autoplay:'autoplay'});
            $('.pass').show();
            //$('.play_btn2').eq(game.present).find('.play_out').click(function () {
            // 出的牌是否为空
            if (select_poker.list.length == 0) {
                // $('.pass').hide();
                 $('.text11').eq(game.present).show('fast');
                setTimeout(function(){$('.text11').hide('slow');},1500);
            } else {
                // 判断选择的牌型是否正确
                /*
                 关于逻辑与跟逻辑或使用需要注意的点：
                 1、逻辑与前一个条件只要为假，后一个条件就不再执行。直接返回false
                 2、逻辑或前一个条件只要为真，后一个条件就不再执行。直接返回true
                 */
                if (checkPoker() && checkVS()) {
                    // 玩家手牌可以打掉桌面的牌的情况下数据流
                    // 1、把原玩家的手牌替换掉桌面的牌xyt
                    desktop.type = select_poker.type;
                    desktop.max = select_poker.max;
                    desktop.list = [];
                    for (let i = 0; i < select_poker.list.length; i++) {
                        desktop.list[i] = {};
                        desktop.list[i].number = select_poker.list[i].number;
                        desktop.list[i].color = select_poker.list[i].color;
                    }

                    // 在桌面对应的位置生成对应牌面xyt
                    $('.desktop_poker li').remove();
                    for (let i = 0; i < desktop.list.length; i++) {
                        let li = makePoker(desktop.list[i]);
                        $('.desktop_poker').append(li);
                        $('.desktop_poker li:last').css({'left': i * 35+ 'px'});
                        $('.desktop_poker').css({left: -i * 18 + 'px'});
                    }
                    // 删除玩家手牌数据中的对应打出去的牌的数据
                    switch (game.present) {
                        case 0:                         
                            removeArr(play_1,select_poker);
                            break;
                        case 1:                           
                            removeArr(play_2,select_poker);
                            break;
                        case 2:                          
                            removeArr(play_3,select_poker);
                            break;
                    }  
                    // 把对应玩家手牌现在的牌面更新0310xyt
                    $('.play li').remove('.select');
                    if (game.present == 0) {
                        $('.play_1 li').remove();
                        play_1.poker = pokerSort(play_1.poker);
                        for (let i = 0; i < play_1.poker.length; i++) {
                            poker_html = makePoker(play_1.poker[i]);
                            $('.play_1').append(poker_html);
                            $('.play_1 li:last').css({'left': i * 35 + 'px'});
                        }
                    } else if (game.present == 1) {
                        $('.play_2 li').remove();
                        play_2.poker = pokerSort(play_2.poker);
                        for (let i = 0; i < play_2.poker.length; i++) {
                            poker_html = makePoker(play_2.poker[i]);
                            $('.play_2').append(poker_html);
                            $('.play_2 li:last').css({'left': i * 36 + 'px'});
                            $('.play_2').css({'left': -i * 18 + 'px'});
                        }
                    } else if (game.present == 2) {
                        $('.play_3 li').remove();
                        play_3.poker = pokerSort(play_3.poker);
                        for (let i = 0; i < play_3.poker.length; i++) {
                            poker_html = makePoker(play_3.poker[i]);
                            $('.play_3').append(poker_html);
                            $('.play_3 li:last').css({'left': i * 35 + 'px'});
                            // $('.play_2').css({'left': -i*9+'px'});
                        }
                    }
                    // 2、清空玩家的手牌数据
                    select_poker.type = 0;
                    select_poker.max = 0;
                    select_poker.list = [];
                    console.log(desktop);
                    // 通过当前玩家手中牌的数量来判断该玩家是否已经赢了。
                    if (play_1.poker == 0) {
                        clearInterval(timer2);
                        if (play_1.role == 1) {
                        $('.text2').show('fast');
                        $('.text2').html('地主 胜利');
                        setTimeout(function(){$('.text2').hide('slow');},1500);
                        play_1.score =play_1.score + 200;
                        play_2.score = play_2.score - 100;
                        play_3.score = play_3.score - 100;
                        $('.end span').eq(0).append(play_1.score);
                        $('.end span').eq(1).append(play_2.score);
                        $('.end span').eq(2).append(play_3.score);
                        clearInterval(timer2);
                        } else {
                        $('.text2').show('fast');
                        $('.text2').html('农民 胜利');
                        setTimeout(function(){$('.text2').hide('slow');},1500);

                        }

                        $('.end').show();
                        $('.more').click(function(){            //点击再来一句刷新当前野蛮
                            window.location.reload();
                            console.log(1);
                        });
                        $('.leave').click(function(){           //点击离开页面
                            window.close();
                            console.log(2);
                        });
                        //window.location.reload();//胜利后刷新页面 xyt0312
                    }
                    if (play_2.poker == 0) {
                        clearInterval(timer2);
                        if (play_2.role == 1) {
                            $('.text2').show('fast');
                            $('.text2').html('地主 胜利');
                            setTimeout(function(){$('.text2').hide('slow');},1500);
                            play_2.score =play_2.score + 200;
                            play_1.score = play_1.score - 100;
                            play_3.score = play_3.score - 100;
                            $('.end span').eq(0).append(play_1.score);
                            $('.end span').eq(1).append(play_2.score);
                            $('.end span').eq(2).append(play_3.score);
                        } else {
                            $('.text2').show('fast');
                             $('.text2').html('农民 胜利');
                            setTimeout(function(){$('.text2').hide('slow');},1500);
                        }
                        $('.end').show();
                        $('.more').click(function(){            //点击再来一句刷新当前野蛮
                            location.reload();
                        });
                        $('.leave').click(function(){           //点击离开页面
                            window.close();
                        });
                        //window.location.reload();//胜利后刷新页面 xyt0312
                    }
                    if (play_3.poker == 0) {
                        clearInterval(timer2);
                        if (play_3.role == 1) {
                            $('.text2').show('fast');
                            $('.text2').html('地主 胜利');
                            setTimeout(function(){$('.text2').hide('slow');},1500);
                            play_3.score =play_3.score + 200;
                            play_1.score = play_1.score - 100;
                            play_2.score = play_2.score - 100;
                            $('.end span').eq(0).append(play_1.score);
                            $('.end span').eq(1).append(play_2.score);
                            $('.end span').eq(2).append(play_3.score);
                        } else {
                            $('.text2').show('fast');
                             $('.text2').html('农民 胜利');
                            setTimeout(function(){$('.text2').hide('slow');},1500);
                        }
                        $('.end').show();
                        $('.more').click(function(){            //点击再来一句刷新当前野蛮
                            location.reload();
                        });
                        $('.leave').click(function(){           //点击离开页面
                            window.close();
                        });
                        //window.location.reload();//胜利后刷新页面 xyt0312
                    }

                    // 把出牌权给下一个位玩家
                    game.present = (++game.present > 2) ? 0 : game.present;
                    // if(game.present == 0||game.present==2){
                    //     setTimeout(function(){
                    //        $('.play_btn2 .hint').eq(game.present).click();},1500);
                        
                    // }
                    clearInterval(timer2);


                    // 通过动画特效方法回传的时间来定义，下次玩家开始打牌的时间
                      time=animate();
                      //   setTimeout(function(){
                      //   startGame(cancel_num);
                      //   clearInterval();
                    
                    // $('.play_btn2').eq(game.present).off('click', '.pass');
                    
                     // },time);
                     //解除on绑定
                    $('.play').eq(game.present).off('click', 'li');
                    $('.play_btn2').eq(game.present).off('click', '.play_out');
                    $('.play_btn2').eq(game.present).off('click', '.hint');
                    startGame(0);
                    // clearInterval(timer2);


                } else {
                    $('.text1').eq(game.present).show('fast');
                    setTimeout(function(){$('.text1').hide('slow');},1500);
                    $('.play li').removeClass('select');//当出牌不符合规则时候，删除掉带有class='select'的li 0311xyt
                    select_poker.type = 0;
                    select_poker.max = 0;
                    select_poker.list = [];
                    $('.play').eq(game.present).off('click','li');
                    $('.play_btn2').eq(game.present).off('click', '.play_out');
                    clearInterval(timer2);
                    startGame(0);
                }
            }

        });


        // 绑定不出牌事件
        $('.play_btn2').eq(game.present).off('click', '.pass');
        //$('.play_btn2').eq(game.present).find('.pass').click(function () {
        $('.play_btn2').eq(game.present).on('click', '.pass', function () {
            $('.audio_button').attr({src:'audio/click.mp3',autoplay:'autoplay'});
            $('.audio_pass').attr({src:'audio/pass.mp3',autoplay:'autoplay'});
            $('.text').eq(game.present).show('fast');
            setTimeout(function(){$('.text').hide('slow');},1500);
            clearInterval(timer2);
            game.present = (++game.present > 2) ? 0 : game.present;
            cancel_num++;
            // 连续两人不出牌把桌面的牌清空
            if (cancel_num > 1) {
                desktop.type = 0;
                desktop.max = 0;
                desktop.list = [];
                $('.desktop_poker li').remove();
                $('.pass').hide();
                clearInterval(timer2);
            }
            select_poker.type = 0;
            select_poker.max = 0;
            select_poker.list = [];
            // $('.play_btn2').eq(game.present).off('click','.pass');
            $('.play').eq(game.present).off('click','li');
            $('.play_btn2').eq(game.present).off('click', '.play_out');
            startGame(cancel_num);
        });
    }

    //手牌删除干净！
    function removeArr(play1, select1){
        for(let i=0; i<play1.poker.length; i++){
            for(let j=0; j<select1.list.length;j++){
                if(play1.poker[i].number == select1.list[j].number &&
                    play1.poker[i].color == select1.list[j].color
                ){
                    play1.poker.splice(i,1);
                    select1.list.splice(j,1);
                    removeArr(play1,select1);
                }
            }
        }
        return ;
    }

    // 定义玩家出的牌与桌面牌对比的方法
    function checkVS() {


        if (select_poker.type == 0) {
            return false;
        } else if (desktop.type == 0 || select_poker.type == 110 || select_poker.type == 100 && desktop.type != 100) {
            return true;
        } else if (select_poker.type == desktop.type && select_poker.list.length == desktop.list.length) {
            // 判断单张中的大小王
            if (select_poker.list[0].number == 14 && desktop.list[0].number == 14) {
                if (select_poker.list[0].color > desktop.list[0].color) {
                    return true;
                } else {
                    return false;
                }
            }
            if (select_poker.max > desktop.max) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    // 定义检查牌型的方法
    function checkPoker() {
        // 1、先对玩家选择的牌进行重新排序
        select_poker.list = pokerSort(select_poker.list);

        /*
         牌型代码表
         1		单张
         2		对子
         3		三张
         4		三带一
         5		三带二
         6		顺子
         66		连对
         7		四带二
         8		二个三带一的飞机
         110		王炸
         */
        // 根据选择牌的数量来再进行判断牌型
        switch (select_poker.list.length) {
            // 一张牌
            case 1:
                select_poker.type = 1;							// 设置牌型为单张
                select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                console.log(select_poker.max);
                return true;
                break;
            // 两张牌
            case 2:
                if (select_poker.list[0].number == select_poker.list[1].number) {
                    if (select_poker.list[0].number == 14) {
                        select_poker.type = 110;						// 设置牌型为王炸
                        select_poker.max = 14; 							// 设置判断值为该牌的点数
                    } else {
                        select_poker.type = 2;							// 设置牌型为对子
                        select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    }
                    return true;
                }
                break;
            // 三张牌
            case 3:
                if (select_poker.list[0].number == select_poker.list[2].number) {
                    select_poker.type = 3;							// 设置牌型为三张
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            // 四张牌
            case 4:
                // 判断是否为炸弹
                if (select_poker.list[0].number == select_poker.list[3].number) {
                    select_poker.type = 100;							// 设置牌型为炸弹
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (select_poker.list[0].number == select_poker.list[2].number ||
                    select_poker.list[1].number == select_poker.list[3].number) {
                    select_poker.type = 4;							// 设置牌型为三带一
                    select_poker.max = select_poker.list[1].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                    /*
                     3334
                     3444
                     5559
                     3666
                     */
                }
                break;
            // 五张牌
            case 5:
                // console.log(1);
                // console.log(checkStraight());
                // 判断是否为顺子
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    // console.log(2);
                    return true;
                } else if (select_poker.list[0].number == select_poker.list[2].number &&   // 判断三带二的方法
                    select_poker.list[3].number == select_poker.list[4].number ||
                    select_poker.list[0].number == select_poker.list[1].number &&
                    select_poker.list[2].number == select_poker.list[4].number
                ) {
                    select_poker.type = 5;							// 设置牌型为三带二
                    select_poker.max = select_poker.list[2].number * 1; 	// 设置判断值为该牌的点数
                    // console.log(3);
                    return true;
                }
                break;
            // 六张牌
            case 6:
                // 判断是否为顺子
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (checkTwoPairs()) {
                    select_poker.type = 66;							// 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (select_poker.list[0].number == select_poker.list[3].number ||
                    select_poker.list[1].number == select_poker.list[4].number ||
                    select_poker.list[2].number == select_poker.list[5].number) {
                    /*
                     333345
                     344445
                     345555
                     */
                    select_poker.type = 7;							// 设置牌型为四带二
                    select_poker.max = select_poker.list[2].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                else if (setAirplane()) {
                    // select_poker.type = 3;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; // 设置判断值为该牌的点数
                    return true;
                }


                break;
            case 7:
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 8:
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (checkTwoPairs()) {
                    select_poker.type = 66;							// 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (setAirplane()) {
                    // select_poker.type = 4;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 9:
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (setAirplane()) {
                    select_poker.type = 3;							// 设置牌型为feiji
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 10:
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (checkTwoPairs()) {
                    select_poker.type = 66;                         // 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1;     // 设置判断值为该牌的点数
                    return true;
                } 
                else if (setAirplane()) {
                    // select_poker.type = 5;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 11:
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 12:
                if (checkStraight()) {
                    select_poker.type = 6;							// 设置牌型为顺子
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (checkTwoPairs()) {
                    select_poker.type = 66;							// 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (setAirplane()) {
                    // select_poker.type = 3;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; 	// 设置判断值为该牌的点数
                    return true;
                }

                break;
            case 13:
                alert('您选的牌不合规则');
                break;
            case 14:
                if (checkTwoPairs()) {
                    select_poker.type = 66;							// 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 15:
                if (setAirplane()) {
                    // select_poker.type = 8;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 16:
                if (checkTwoPairs()) {
                    select_poker.type = 66;							// 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1 * 1; 	// 设置判断值为该牌的点数
                    return true;
                } else if (setAirplane()) {
                    // select_poker.type = 8;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 17:
                alert('您选的牌不合规则');
                break;
            case 18:
                if (setAirplane()) {
                    // select_poker.type = 8;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; 	// 设置判断值为该牌的点数
                    return true;
                } else if (checkTwoPairs()) {
                    select_poker.type = 66;							// 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 19:
                alert('您选的牌不合规则');
                break;
            case 20:
                if (setAirplane()) {
                    // select_poker.type = 8;							// 设置牌型为feiji
                    // select_poker.max = select_poker.list[0].number; 	// 设置判断值为该牌的点数
                    return true;
                } else if (checkTwoPairs()) {
                    select_poker.type = 66;							// 设置牌型为连对
                    select_poker.max = select_poker.list[0].number * 1; 	// 设置判断值为该牌的点数
                    return true;
                }
                break;
            default:
                return false;
        }

        return false;
    }

    // 定义检查牌型为顺子的方法
    function checkStraight() {
        // 判断最大的值不能大于12
        if (select_poker.list[select_poker.list.length - 1].number > 12) {
            return false;
        }

        for (let i = 0; i < select_poker.list.length - 1; i++) {
            if (select_poker.list[i].number * 1 + 1 != select_poker.list[i + 1].number) {
                return false;
            }
        }
        $('.audio_shunzi').attr({src:'audio/shunzi.mp3',autoplay:'autoplay'});

        return true;
    }


    // 定义检查牌型为连对的方法
    function checkTwoPairs() {
        /*
         3344556677
         0123456789

         */
        // 判断最大的值不能大于12
        if (select_poker.list[select_poker.list.length - 1].number > 12) {
            return false;
        }

        // 单独判断最后两位的值是相等的
        if (select_poker.list[select_poker.list.length - 1].number != select_poker.list[select_poker.list.length - 2].number) {
            return false;
        }

        // 使用遍历方法来对牌型进行检查
        for (let i = 0; i < select_poker.list.length - 3; i += 2) {
            if (select_poker.list[i].number != select_poker.list[i + 1].number ||
                select_poker.list[i].number != select_poker.list[i + 2].number - 1) {
                return false;
            }
        }
        $('.audio_liandui').attr({src:'audio/feiji.mp3',autoplay:'autoplay'});

        return true;
    }

    // 检查牌型是否为飞机的方法
   function setAirplane(){
        // 通过牌数来判断可能的牌型可能
        switch(select_poker.list.length){
            case 6:
                if(select_poker.list[0].number == select_poker.list[2].number &&
                    select_poker.list[0].number == select_poker.list[3].number-1 &&
                    select_poker.list[3].number == select_poker.list[5].number
                ){
                    select_poker.type = 8;                              // 设置牌型为二个三的飞机
                    select_poker.max = select_poker.list[0].number*1;   // 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 8:
                /*
                 33344456
                 34445556
                 34555666
                 33334444
                 */
                if(select_poker.list[0].number == select_poker.list[2].number &&
                    select_poker.list[0].number == select_poker.list[3].number-1 &&
                    select_poker.list[3].number == select_poker.list[5].number ||
                    select_poker.list[1].number == select_poker.list[3].number &&
                    select_poker.list[1].number == select_poker.list[4].number-1 &&
                    select_poker.list[4].number == select_poker.list[6].number ||
                    select_poker.list[2].number == select_poker.list[4].number &&
                    select_poker.list[2].number == select_poker.list[5].number-1 &&
                    select_poker.list[5].number == select_poker.list[7].number
                ){
                    select_poker.type = 8;                              // 设置牌型为二个三带一的飞机
                    select_poker.max = select_poker.list[2].number*1;   // 设置判断值为该牌的点数
                    return true;
                }
                break;
            case 9:
                // 333444555
                if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                    return false;
                }
                for(let i=0; i<select_poker.list.length - 4; i+=3){
                    if( select_poker.list[i].number != select_poker.list[i+2].number ||
                        select_poker.list[i].number != select_poker.list[i+3].number-1
                    ){
                        return false;
                    }
                }
                select_poker.type = 8;                              // 设置牌型为三个不带东西的飞机
                select_poker.max = select_poker.list[0].number*1;   // 设置判断值为该牌的点数
                return true;
                break;
            case 10:

                //1:3334445566
                //2:3344455566
                //3:3344555666
                if(select_poker.list[0].number == select_poker.list[2].number &&
                    select_poker.list[0].number == select_poker.list[3].number-1 &&
                    select_poker.list[3].number == select_poker.list[5].number &&
                    select_poker.list[6].number == select_poker.list[7].number &&
                    select_poker.list[8].number == select_poker.list[9].number ||
                    select_poker.list[2].number == select_poker.list[4].number &&
                    select_poker.list[2].number == select_poker.list[5].number-1 &&
                    select_poker.list[5].number == select_poker.list[7].number &&
                    select_poker.list[0].number == select_poker.list[1].number &&
                    select_poker.list[8].number == select_poker.list[9].number )
                {
                    select_poker.type = 8;                  // 设置牌型为2个三代二类型为1,2,3的飞机
                    select_poker.max = select_poker.list[2].number*1*1;
                    return true;
                }else if(
                    select_poker.list[4].number == select_poker.list[6].number &&
                    select_poker.list[4].number == select_poker.list[7].number-1 &&
                    select_poker.list[7].number == select_poker.list[9].number &&
                    select_poker.list[0].number == select_poker.list[1].number &&
                    select_poker.list[2].number == select_poker.list[3].number){
                    select_poker.type = 8;                  // 设置牌型为2个三代二类型为4的飞机
                    select_poker.max = select_poker.list[4].number*1;
                    return true;
                }
                break;
            case 12:
                if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                    return false;
                }
                for(let i=0; i<select_poker.list.length - 4; i+=3){
                    if( select_poker.list[i].number != select_poker.list[i+2].number ||
                        select_poker.list[i].number != select_poker.list[i+3].number-1
                    ){
                        return false;
                    }
                }
                select_poker.type = 8;                              // 设置牌型为不带东西的飞机
                select_poker.max = select_poker.list[0].number*1;   // 设置判断值为该牌的点数
                return true;
                //345666777888
                //344455566678
                //345556667778
                //333444555678
                if( select_poker.list[3].number == select_poker.list[5].number&&
                    select_poker.list[3].number == select_poker.list[6].number-1&&
                    select_poker.list[3].number == select_poker.list[9].number-2&&
                    select_poker.list[6].number == select_poker.list[8].number&&
                    select_poker.list[9].number == select_poker.list[11].number||

                    select_poker.list[1].number == select_poker.list[3].number&&
                    select_poker.list[1].number == select_poker.list[4].number-1&&
                    select_poker.list[1].number == select_poker.list[7].number-2&&
                    select_poker.list[4].number == select_poker.list[6].number&&
                    select_poker.list[7].number == select_poker.list[9].number||

                    select_poker.list[2].number == select_poker.list[4].number&&
                    select_poker.list[2].number == select_poker.list[5].number-1&&
                    select_poker.list[2].number == select_poker.list[8].number-2&&
                    select_poker.list[5].number == select_poker.list[7].number&&
                    select_poker.list[8].number == select_poker.list[10].number){
                    select_poker.type = 8;                   //设置牌型为三个三带一
                    select_poker.max = select_poker.list[3].number*1;
                    return true;
                }else if(
                    select_poker.list[0].number == select_poker.list[2].number&&
                    select_poker.list[0].number == select_poker.list[3].number-1&&
                    select_poker.list[0].number == select_poker.list[6].number-2&&
                    select_poker.list[3].number == select_poker.list[5].number&&
                    select_poker.list[6].number == select_poker.list[8].number){
                    select_poker.type = 8;                   //设置牌型为三个三带一
                    select_poker.max = select_poker.list[0].number*1;
                    return true;
                }
                break;

            case 15:
                if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                    return false;
                }
                for(let i=0; i<select_poker.list.length - 4; i+=3){
                    if( select_poker.list[i].number != select_poker.list[i+2].number ||
                        select_poker.list[i].number != select_poker.list[i+3].number-1
                    ){
                        return false;
                    }
                }
                select_poker.type = 8;                              // 设置牌型为不带东西的飞机
                select_poker.max = select_poker.list[0].number*1;   // 设置判断值为该牌的点数
                return true;
                //334455 666777888      678     6
                //3344 555666777 88     456     6
                if( select_poker.list[6].number == select_poker.list[8].number&&
                    select_poker.list[6].number == select_poker.list[9].number-1&&
                    select_poker.list[6].number == select_poker.list[12].number-2&&
                    select_poker.list[9].number == select_poker.list[11].number&&
                    select_poker.list[12].number == select_poker.list[14].number&&
                    select_poker.list[0].number == select_poker.list[1].number&&
                    select_poker.list[2].number == select_poker.list[3].number&&
                    select_poker.list[4].number == select_poker.list[5].number||

                    select_poker.list[4].number == select_poker.list[6].number&&
                    select_poker.list[4].number == select_poker.list[7].number-1&&
                    select_poker.list[4].number == select_poker.list[10].number-2&&
                    select_poker.list[7].number == select_poker.list[9].number&&
                    select_poker.list[10].number == select_poker.list[12].number&&
                    select_poker.list[0].number == select_poker.list[1].number&&
                    select_poker.list[2].number == select_poker.list[3].number&&
                    select_poker.list[13].number == select_poker.list[14].number
                ){
                    select_poker.type == 8;         //类型为3个三代二
                    select_poker.max = select_poker.list[6].number*1;
                    return true;
                }
                //333444555 667788      012     2
                //33 444555666 7788     234     2
                else if(select_poker.list[0].number == select_poker.list[2].number&&
                    select_poker.list[0].number == select_poker.list[3].number-1&&
                    select_poker.list[0].number == select_poker.list[6].number-2&&
                    select_poker.list[3].number == select_poker.list[5].number&&
                    select_poker.list[6].number == select_poker.list[9].number&&
                    select_poker.list[9].number == select_poker.list[10].number&&
                    select_poker.list[11].number == select_poker.list[12].number&&
                    select_poker.list[13].number == select_poker.list[14].number||

                    select_poker.list[2].number == select_poker.list[4].number&&
                    select_poker.list[2].number == select_poker.list[5].number-1&&
                    select_poker.list[2].number == select_poker.list[8].number-2&&
                    select_poker.list[5].number == select_poker.list[7].number&&
                    select_poker.list[8].number == select_poker.list[10].number&&
                    select_poker.list[0].number == select_poker.list[1].number&&
                    select_poker.list[11].number == select_poker.list[12].number&&
                    select_poker.list[13].number == select_poker.list[14].number
                ){
                    select_poker.type == 8;         //类型为3个三代二
                    select_poker.max = select_poker.list[2].number*1;
                    return true;
                }
                break;

            case 16:
                //333444555666 78910        012
                //3 444555666777 8910       123
                //34 555666777888 910       234

                if(select_poker.list[0].number == select_poker.list[2].number&&
                    select_poker.list[0].number == select_poker.list[3].number-1&&
                    select_poker.list[0].number == select_poker.list[6].number-2&&
                    select_poker.list[0].number == select_poker.list[9].number-3&&
                    select_poker.list[3].number == select_poker.list[5].number&&
                    select_poker.list[6].number == select_poker.list[8].number&&
                    select_poker.list[9].number == select_poker.list[11].number||

                    select_poker.list[1].number == select_poker.list[3].number&&
                    select_poker.list[1].number == select_poker.list[4].number-1&&
                    select_poker.list[1].number == select_poker.list[7].number-2&&
                    select_poker.list[1].number == select_poker.list[10].number-3&&
                    select_poker.list[4].number == select_poker.list[6].number&&
                    select_poker.list[7].number == select_poker.list[9].number&&
                    select_poker.list[10].number == select_poker.list[12].number||

                    select_poker.list[2].number == select_poker.list[4].number&&
                    select_poker.list[2].number == select_poker.list[5].number-1&&
                    select_poker.list[2].number == select_poker.list[8].number-2&&
                    select_poker.list[2].number == select_poker.list[11].number-3&&
                    select_poker.list[4].number == select_poker.list[7].number&&
                    select_poker.list[7].number == select_poker.list[10].number&&
                    select_poker.list[11].number == select_poker.list[13].number
                ){
                    select_poker.type = 4;      //类型为四个三带一
                    select_poker.max = select_poker.list[2].number*1;
                    return true;
                }//345 666777888999 10      345
                //3456 777888999101010      456
                else if(select_poker.list[3].number == select_poker.list[5].number&&
                    select_poker.list[3].number == select_poker.list[6].number-1&&
                    select_poker.list[3].number == select_poker.list[9].number-2&&
                    select_poker.list[3].number == select_poker.list[12].number-3&&
                    select_poker.list[6].number == select_poker.list[8].number&&
                    select_poker.list[9].number == select_poker.list[11].number&&
                    select_poker.list[12].number == select_poker.list[14].number||

                    select_poker.list[4].number == select_poker.list[6].number&&
                    select_poker.list[4].number == select_poker.list[7].number-1&&
                    select_poker.list[4].number == select_poker.list[10].number-2&&
                    select_poker.list[4].number == select_poker.list[13].number-3&&
                    select_poker.list[7].number == select_poker.list[9].number&&
                    select_poker.list[10].number == select_poker.list[12].number&&
                    select_poker.list[13].number == select_poker.list[15].number){
                    select_poker.type = 4;      //类型为四个三带一
                    select_poker.max = select_poker.list[4].number*1;
                    return true;
                }
                break;

            case 18:
                //333444555666777888
                if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                    return false;
                }
                for(let i=0; i<select_poker.list.length - 4; i+=3){
                    if( select_poker.list[i].number != select_poker.list[i+2].number ||
                        select_poker.list[i].number != select_poker.list[i+3].number-1
                    ){
                        return false;
                    }
                }
                select_poker.type = 3;                              // 设置牌型为不带东西的飞机
                select_poker.max = select_poker.list[0].number*1;   // 设置判断值为该牌的点数
                return true;
                break;

            case 20:
                //

                break;

        }
    }

    //动画
    function animate() {
        switch (desktop.type) {
            case 110:
                // 王炸动画
                effect_1();
                $('.audio_wangzha').attr({src:'audio/wangzha.mp3',autoplay:'autoplay'});
                return 3000;
                break;
            case 100:
                // 炸弹动画
                effect_2();
                $('.audio_zhadan').attr({src:'audio/zhadan.mp3',autoplay:'autoplay'});

                return 2000;
                break;
            case 8:
                //飞机动画
                effect_3();
                 $('.audio_feiji').attr({src:'audio/feiji1.mp3',autoplay:'autoplay'});
                return 2000;
        }
    }
    /*
     牌型代码表
     1		单张
     2		对子
     3		三张
     4		三带一
     5		三带二
     6		顺子
     66		连对
     7		四带二
     8		二个三带一的飞机
     110		王炸
     */

});