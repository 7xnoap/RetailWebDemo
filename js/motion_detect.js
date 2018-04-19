
if (window.DeviceMotionEvent) {
    var index = 0;
    window.addEventListener('devicemotion', function (event) {
        if (index++ <= 100) {
            return;
        }
        index = 0;
        var acc = event.accelerationIncludingGravity || {};
        // var rr = event.rotationRate || {};
        var str = 'devicemotion:<br>';
        // str += 'acc x:' + acc.x + '<br>';
        // str += 'acc y:' + acc.y + '<br>';
        // str += 'acc z:' + acc.z + '<br>';
        // str += 'rr alpha:' + rr.alpha + '<br>';
        // str += 'rr beta:' + rr.beta + '<br>';
        // str += 'rr gamma:' + rr.gamma + '<br>';
        // str += 'interval:' + event.interval + '<br>';
        $('.motion-info').html(str);
    }, true);
}
else {
    $('.motion-info').html('DO NOT support DeviceMotionEvent');
}

// if (window.DeviceOrientationEvent) {
//     var index = 0;
//     window.addEventListener('deviceorientation', function (event) {
//         if (index++ <= 10) {
//             return;
//         }
//         index = 0;
//         var str = 'deviceorientation :<br>';
//         str += 'alpha:' + event.alpha + '<br>';
//         str += 'beta:' + event.beta + '<br>';
//         str += 'gamma:' + event.gamma + '<br>';
//         $('.orientation-info').html(str);
//     }, false);
// }
// else {
//     $('.orientation-info').html('DO NOT support DeviceOrientationEvent');
// }