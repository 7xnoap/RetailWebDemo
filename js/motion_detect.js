
if (window.DeviceMotionEvent) {
    var index = 0;
    $(window).on('devicemotion', function (event) {
        if (index++ <= 10) {
            return;
        }
        index = 0;
        var acc = event.accelerationIncludingGravity;
        var rr = event.rotationRate;
        var str = 'devicemotion:<br>';
        str += 'acc x:' + acc.x + '<br>';
        str += 'acc y:' + acc.y + '<br>';
        str += 'acc z:' + acc.z + '<br>';
        str += 'rr alpha:' + rr.alpha + '<br>';
        str += 'rr beta:' + rr.beta + '<br>';
        str += 'rr gamma:' + rr.gamma + '<br>';
        str += 'interval:' + event.interval + '<br>';
        $('.motion-info').html(str);
    });
}
else {
    $('.motion-info').html('DO NOT support DeviceMotionEvent');
}

if (window.DeviceOrientationEvent) {
    var index = 0;
    $(window).on('deviceorientation', function (event) {
        if (index++ <= 10) {
            return;
        }
        index = 0;
        var str = 'deviceorientation:<br>';
        str += 'absolute:' + event.absolute + '<br>';
        str += 'alpha:' + event.alpha + '<br>';
        str += 'beta:' + event.beta + '<br>';
        str += 'gamma:' + event.gamma + '<br>';
        $('.orientation-info').html(str);
    });
}
else {
    $('.orientation-info').html('DO NOT support DeviceOrientationEvent');
}