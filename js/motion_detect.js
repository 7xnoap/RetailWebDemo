
if (window.DeviceMotionEvent) {
    var speed = 25;    // 用来判定的加速度阈值，太大了则很难触发
    var x, y, z, lastX, lastY, lastZ;
    x = y = z = lastX = lastY = lastZ = 0;
    var index = 0;

    window.addEventListener('devicemotion', function (event) {
        if (index++ <= 10) {
            return;
        }
        index = 0;
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        // $('.motion-info').html('x:' + x + '<br>'
        //                     + 'y:' + y);
        var str = '';
        for (var key in event) {
            if (event.hasOwnProperty(key)) {
                str += 'key:' + event[key];
                str += '<br>';
            }
        }
        $('.motion-info').html(str);
        // if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是用户设备的加速度大于我们设置的阈值
        //     alert('摇了');
        // }
        lastX = x;
        lastY = y;
    }, false);
}
else {
    $('.motion-info').html('DO NOT support DeviceMotionEvent');
}

if (window.DeviceOrientationEvent) {
    $(window).on('deviceorientation', function (event) {
        var str = '';
        for (var key in event) {
            if (event.hasOwnProperty(key)) {
                str += 'key:' + event[key];
                str += '<br>';
            }
        }
        $('.motion-info').html(str);
        $('.orientation-info').html(str);
        // $('.orientation-info').html('alpha:' + event.alpha + '<br>'
        //                         + 'beta:' + event.beta + '<br>'
        //                         + 'gamma:' + event.gamma);
    });
}
else {
    $('.orientation-info').html('DO NOT support DeviceOrientationEvent');
}