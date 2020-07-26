$(function () {
    /************************************************
      SCROLL
    *************************************************/
    var moveTop = 0;
    var h = $("body").outerHeight() * 6;
    var ss = $("section").eq(5).offset().top;
    $("section").on("mousewheel DOMMouseScroll", function (e) {
        var event = e.originalEvent;
        var d = 0;
        if (event.detail > 0) {
            //파이어폭스
            d = event.detail * -40;
        } else {
            //크롬, 익스
            d = event.wheelDelta;
        }
        //만약에 마우스를 아래로 내리면
        if (d < 0) {
            if (h > moveTop) {
                moveTop = $(this).next().offset().top;
                if (ss <= moveTop) {
                    $(".quick").css("display", "none");
                } else {
                    $(".quick").css("display", "block");
                }
            }
        } else {
            if (moveTop >= $("section").eq(0).height()) {
                moveTop = $(this).prev().offset().top;
                if (ss >= moveTop) {
                    $(".quick").css("display", "block");
                }
            }
        }
        //body,html moveTop위치로 스르륵 animate되면서 scrollTop으로 이동
        $("html,body").stop().animate({
            scrollTop: moveTop + "px"
        }, 800);
        $(".quickMenu>li").removeClass("active");
    });
    //scrollBtn
    var conT = $("section").eq(1).offset().top;
    $(".scrollBtn").click(function (e) {
        e.preventDefault();
        $("html,body").stop().animate({
            scrollTop: conT
        }, 1000);
    });
    //top
    $(".top").click(function (e) {
        e.preventDefault();
        $("html,body").stop().animate({
            scrollTop: 0
        }, 1000);
    });

    /************************************************
      section 바로가기
    *************************************************/
    var posY = new Array();
    for (i = 0; i < 5; i++) {
        posY[i] = $("section").eq(i).offset().top;
    }
    //클릭하면 해당하는 위치로 이동 (스크롤 위치가)
    $(".quickMenu>li").click(function (e) {
        e.preventDefault();
        var qNum = $(this).index();
        $("html,body").stop().animate({
            scrollTop: posY[qNum]
        }, 1000);
        $(this).addClass("active").siblings().removeClass("active");
    });


    /************************************************
      메인메뉴 hover - 서브메뉴 fadeIn/fadeOut
    *************************************************/
    $("#nav>li").mouseenter(function () {
        $(this).children(".sub").stop().fadeIn(500);
        $(this).siblings().children(".sub").stop().fadeOut(500);
    });
    $("#nav>li").mouseleave(function () {
        $(this).children(".sub").stop().fadeOut(500);
    });

    /************************************************
      메인배너 
    *************************************************/
    var sNum = 0;
    var cBtn = $(".listBtn>li");
    var obj = $(".banner>li").clone();
    $(".banner").append(obj);
    //cBtn 클릭하여 배너 이동
    cBtn.on("click", function (e) {
        e.preventDefault();
        //선택된 버튼이 몇번째 인지 체크
        sNum = $(this).index();
        moveBanner();
        cBtn.eq(sNum).prevAll().addClass("active");
    });
    //배너가 움직이는 함수
    function moveBanner() {
        $(".banner").stop().animate({
            "margin-left": -sNum * 100 + "%"
        }, 1000);
        //선택된 버튼 색상 바꾸기
        if (sNum == 4) {
            cBtn.eq(0).addClass("active").siblings().removeClass("active");
        }
        cBtn.eq(sNum).addClass("active").nextAll().removeClass("active");
    }
    //right 버튼 클릭하면 배너가 한개씩 왼쪽으로 이동
    $(".bArrowR").on("click", function (e) {
        e.preventDefault();
        if (sNum == 4) {
            sNum = 0;
            $(".banner").css("margin-left", 0);
        }
        sNum++;
        moveBanner();
    });
    //left 버튼을 클릭하면 배너가 한개씩 오른쪽으로 이동
    $(".bArrowL").on("click", function (e) {
        e.preventDefault();
        if (sNum == 0) {
            sNum = 4;
            $(".banner").css("margin-left", -sNum * 100 + "%");
        }
        sNum--;
        moveBanner();
        cBtn.eq(sNum).prevAll().addClass("active");
    });
    //4초마다 배너가 왼쪽으로 한개씩 이동
    var time = setInterval(function () {
        $(".bArrowR").trigger("click");
    }, 5000);

    /************************************************
      제철메뉴 hover - 메뉴설명 나타남
    *************************************************/
    //enter
    $(".menu>li").mouseenter(function () {
        $(this).children(".menuHover").stop().animate({
            "top": 0
        }, 500);
        $(this).siblings().children(".menuHover").css("top", 360 + "px");
    });
    //leave
    $(".menu>li").mouseleave(function () {
        $(this).children(".menuHover").stop().animate({
            "top": 360 + "px"
        }, 500);
    });

    /************************************************
      제휴혜택 - 상품권 탭메뉴
    *************************************************/
    $(".tabTitle>li").click(function (e) {
        e.preventDefault();
        var bTab = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".tabCont>ul").eq(bTab).css("display", "block").siblings().css("display", "none");
    });

    /************************************************
      매장 검색 click - 팝업 뜨기
    *************************************************/
    $(".sSearch").on("click", function (e) {
        e.preventDefault();
        $(".searchPop").css("display", "block");
    });
    $(".closeBtn").on("click", function (e) {
        e.preventDefault();
        $(".searchPop").css("display", "none");
    });

    /************************************************
      운영매장 - 도/시 선택
    *************************************************/
    $(".sBox>a").on("click", function (e) {
        e.preventDefault();
        $(".select").stop().slideToggle(300);
    });
    $(".select>li").on("click", function (e) {
        e.preventDefault();
        var selected = $(this).text();
        $(".sBox>a").text(selected);
        $(".select").slideUp(300);
    });

    /************************************************
      계열사 
    *************************************************/
    var cNum = 0;
    var com = $(".company>li").clone();
    $(".company").append(com);
    setInterval(function () {
        if (cNum == 10) {
            cNum = 0;
            $(".company").css("margin-left", 0);
        }
        cNum++;
        $(".company").stop().animate({
            "margin-left": -cNum * 160 + "px"
        }, 300);
    }, 3000);

    /************************************************
      moblie menu
    *************************************************/
    $(".mHam").on("click", function (e) {
        e.preventDefault();
        $(".mNavWrap").stop().animate({
            "left": 0
        }, 600);
    });
    $(".navClose").on("click", function (e) {
        e.preventDefault();
        $(".mNavWrap").stop().animate({
            "left": "-100%"
        }, 600);
    });

    $(".mNav>li").click(function (e) {
        e.preventDefault();
        $(this).children(".sub").stop().slideToggle(400);
        $(this).siblings().children(".sub").stop().slideUp(400);

        $(this).toggleClass("active");
        $(this).siblings().removeClass("active");
    });

    /************************************************
      moblie 제휴혜택
    *************************************************/
    $(".beneList>li").click(function (e) {
        e.preventDefault();
        var bNum = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".sec4 .center>div").eq(bNum).stop().fadeIn(500).siblings().stop().fadeOut(500);
    });


    /************************************************
      window resize
    *************************************************/
    $(window).resize(function () {
        var h = $("body").outerHeight() * 6;
        var ss = $("section").eq(5).offset().top;
        $("section").on("mousewheel DOMMouseScroll", function (e) {
            var event = e.originalEvent;
            var d = 0;
            if (event.detail > 0) {
                //파이어폭스
                d = event.detail * -40;
            } else {
                //크롬, 익스
                d = event.wheelDelta;
            }
            if (d < 0) {
                if (h > moveTop) {
                    moveTop = $(this).next().offset().top;
                    if (ss <= moveTop) {
                        $(".quick").css("display", "none");
                    } else {
                        $(".quick").css("display", "block");
                    }
                }
            } else {
                if (moveTop >= $("section").eq(0).height()) {
                    moveTop = $(this).prev().offset().top;
                    if (ss >= moveTop) {
                        $(".quick").css("display", "block");
                    }
                }
            }
            //body,html moveTop위치로 스르륵 animate되면서 scrollTop으로 이동
            $("html,body").stop().animate({
                scrollTop: moveTop + "px"
            }, 800);
            $(".quickMenu>li").removeClass("active");
        });

        //scrollBtn
        var conT = $("section").eq(1).offset().top;
        $(".scrollBtn").click(function (e) {
            e.preventDefault();
            $("html,body").stop().animate({
                scrollTop: conT
            }, 1000);
        });
    });
});
