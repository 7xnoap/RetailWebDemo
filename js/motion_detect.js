
if (window.DeviceMotionEvent) {
    var index = 0;
    window.addEventListener('devicemotion', function (event) {
        if (index++ <= 10) {
            return;
        }
        index = 0;
        var str = '';
        for (var key in event) {
            if (event.hasOwnProperty(key)) {
                str += key + ':' + event[key];
                str += '<br>';
            }
        }
        $('.motion-info').html(str);
    }, false);
}
else {
    $('.motion-info').html('DO NOT support DeviceMotionEvent');
}

if (window.DeviceOrientationEvent) {
    var index = 0;
    window.addEventListener('deviceorientation', function (event) {
        if (index++ <= 10) {
            return;
        }
        index = 0;
        var str = '';
        for (var key in event) {
            if (event.hasOwnProperty(key)) {
                str += key + ':' + event[key];
                str += '<br>';
            }
        }
        $('.orientation-info').html(str);
    });
}
else {
    $('.orientation-info').html('DO NOT support DeviceOrientationEvent');
}