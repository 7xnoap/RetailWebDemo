
var myScroll = new IScroll('#rwd-page-scroller', {
    mouseWheel: true,
    scrollbars: false
});

$('.gw-card').click(function () {
    var ele = $(this);
    $('.gw-card').removeClass('selected');
    ele.addClass('selected');
});

$(window).on('gesture-detected', function (event, gesture) {
    if (gesture === "LEFT SHAKE" || gesture === "LEFT SWIPE" ) {
        prev();
    }
    else if (gesture === "RIGHT SHAKE" || gesture === "RIGHT SWIPE" ) {
        next();
    }
    else if (gesture === "UP WAVE" || gesture === "UP" ) {
        window.history.go(-1);
    }
    else if (gesture === "DOWN WAVE" || gesture === "DOWN" ) {
    }
    else if (gesture === "SHAKING") {
        reload();
    }
});

var curIndex = 1;

function prev() {
    if (curIndex === 1) {
        return;
    }
    else {
        curIndex--;
        $('.gw-card').removeClass('selected');
        $('#card-' + curIndex).addClass('selected');
        var y = document.getElementById('card-' + curIndex).offsetTop - 30;
        if ($('#rwd-page-container').height() - y > $(window).height()) {
            myScroll.scrollTo(0, -y, 500, IScroll.utils.ease.quadratic);
        }
        else {
            var pos = $('#rwd-page-container').height() - $(window).height();
            myScroll.scrollTo(0, -pos, 500, IScroll.utils.ease.quadratic);
        }
    }
}

function next() {
    if (curIndex === 8) {
        return;
    }
    else {
        curIndex++;
        $('.gw-card').removeClass('selected');
        $('#card-' + curIndex).addClass('selected');
        var y = document.getElementById('card-' + curIndex).offsetTop - 30;
        if ($('#rwd-page-container').height() - y > $(window).height()) {
            myScroll.scrollTo(0, -y, 500, IScroll.utils.ease.quadratic);
        }
        else {
            var pos = $('#rwd-page-container').height() - $(window).height();
            myScroll.scrollTo(0, -pos, 500, IScroll.utils.ease.quadratic);
        }
    }
}

function reload() {
    myScroll.scrollTo(0, 100, 1000, IScroll.utils.ease.quadratic);
}