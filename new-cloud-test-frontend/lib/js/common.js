function gotoTop(min_height) {
    $(".gotoTop").click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
    min_height ? min_height = min_height : min_height = 600;
    $(window).scroll(function () {
        var s = $(window).scrollTop();
        if (s > min_height) {
            $(".gotoTop").fadeIn(100);
        } else {
            $(".gotoTop").fadeOut(200);
        }
    });
}