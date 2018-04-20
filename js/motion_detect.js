
// if (window.DeviceMotionEvent) {
//     var index = 0;
//     window.addEventListener('devicemotion', function (event) {
//         if (index++ <= 10) {
//             return;
//         }
//         index = 0;
//         var acc = event.acceleration || {};
//         var rr = event.rotationRate || {};
//         var str = 'devicemotion :<br>';
//         str += 'acc x:' + (Math.round(parseFloat(acc.x) * 100) / 100) + '<br>';
//         str += 'acc y:' + (Math.round(parseFloat(acc.y) * 100) / 100) + '<br>';
//         str += 'acc z:' + (Math.round(parseFloat(acc.z) * 100) / 100) + '<br>';
        // str += 'rr alpha:' + rr.alpha + '<br>';
        // str += 'rr beta:' + rr.beta + '<br>';
        // str += 'rr gamma:' + rr.gamma + '<br>';
//         $('.motion-info').html(str);
//     }, true);
// }
// else {
//     $('.motion-info').html('DO NOT support DeviceMotionEvent');
// }

var RECORD_INTERVAL = 2;
var POS_INTERVAL = 800; // ms
var STILL_INTERVAL = 500; // ms
var ALPHA_ANGLE = 30; // degree
var BETA_ANGLE = 10; // degree

var posQueue = [];
var actionQueue = [];
var index = 0;

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function (event) {
        if (index++ <= RECORD_INTERVAL) {
            return;
        }
        index = 0;

        var pos = {};
        pos.alpha = event.alpha;
        pos.beta = event.beta;
        pos.time = new Date().getTime();

        if (!posQueue.length) {
            posQueue.push(pos);
            return;
        }
        var alphaAction = {};
        var betaAction = {};
        var gesture = '';

        var firstPos = posQueue[0];
        if (pos.alpha >= 0 && pos.alpha < 90
            && firstPos.alpha >= 0 && firstPos.alpha < 90
            || pos.alpha > 270 && pos.alpha <= 360
            && firstPos.alpha > 270 && firstPos.alpha <= 360) {
            var delta = pos.alpha - firstPos.alpha;
            if (delta >= ALPHA_ANGLE) {
                alphaAction.type = 'LEFT';
                alphaAction.start = firstPos.time;
                alphaAction.end = pos.time;
            }
            else if (delta <= -ALPHA_ANGLE) {
                alphaAction.type = 'RIGHT';
                alphaAction.start = firstPos.time;
                alphaAction.end = pos.time;
            }
        }
        else if (pos.alpha >= 0 && pos.alpha < 90
            && firstPos.alpha > 270 && firstPos.alpha <= 360) {
                if (pos.alpha + (360 - firstPos.alpha) >= ALPHA_ANGLE) {
                    alphaAction.type = 'LEFT';
                    alphaAction.start = firstPos.time;
                    alphaAction.end = pos.time;
                }
        }
        else if (pos.alpha > 270 && pos.alpha <= 360
            && firstPos.alpha >= 0 && firstPos.alpha < 90) {
                if (firstPos.alpha + (360 - pos.alpha) >= ALPHA_ANGLE) {
                    alphaAction.type = 'RIGHT';
                    alphaAction.start = firstPos.time;
                    alphaAction.end = pos.time;
                }
        }

        if (pos.beta >= -180 && pos.beta <= -150
            && firstPos.beta >= -180 && firstPos.beta <= -150
            || pos.beta >= 0 && pos.beta <= 180
            && firstPos.beta >= 0 && firstPos.beta <= 180
            || pos.beta >= -30 && pos.beta < 0
            && firstPos.beta >= -30 && firstPos.beta < 0) {
            var delta = pos.beta - firstPos.beta;
            if (delta >= BETA_ANGLE) {
                betaAction.type = 'UP';
                betaAction.start = firstPos.time;
                betaAction.end = pos.time;
            }
            else if (delta <= -BETA_ANGLE) {
                betaAction.type = 'DOWN';
                betaAction.start = firstPos.time;
                betaAction.end = pos.time;
            }
        }
        else if (pos.beta >= -180 && pos.beta <= -150
            && firstPos.beta >= 0 && firstPos.beta <= 180) {
            if (180 + pos.beta + (180 - firstPos.beta) >= BETA_ANGLE) {
                betaAction.type = 'UP';
                betaAction.start = firstPos.time;
                betaAction.end = pos.time;
            }
        }
        else if (pos.beta >= 0 && pos.beta <= 180
            && firstPos.beta >= -180 && firstPos.beta <= -150) {
            if (180 + firstPos.beta + (180 - pos.beta) >= BETA_ANGLE) {
                betaAction.type = 'DOWN';
                betaAction.start = firstPos.time;
                betaAction.end = pos.time;
            }
        }
        else if (pos.beta >= -30 && pos.beta < 0
            && firstPos.beta >= 0 && firstPos.beta <= 180) {
            if (firstPos.beta - pos.beta >= BETA_ANGLE) {
                betaAction.type = 'DOWN';
                betaAction.start = firstPos.time;
                betaAction.end = pos.time;
            }
        }
        else if (pos.beta >= 0 && pos.beta <= 180
            && firstPos.beta >= -30 && firstPos.beta < 0) {
            if (pos.beta - firstPos.beta >= BETA_ANGLE) {
                betaAction.type = 'UP';
                betaAction.start = firstPos.time;
                betaAction.end = pos.time;
            }
        }

        // $('.rwd-page-content').html('alpha:' + pos.alpha + '<br>beta:' + pos.beta
        //     + '<br>alphaAction:' + alphaAction.type + '<br>betaAction:' + betaAction.type);
        // if (alphaAction.type && betaAction.type) {
        //     actionQueue = [];
        //     posQueue = [];
        // }
        // else 
        if (alphaAction.type) {
            var length = actionQueue.length;
            if (!length) {
                actionQueue.push(alphaAction);
            }
            else {
                var lastAction = actionQueue[length - 1];
                if (lastAction.type === alphaAction.type) {
                    lastAction.end = alphaAction.end;
                }
                else {
                    actionQueue.push(alphaAction);
                }
            }
            posQueue = [];
        }
        else if (betaAction.type) {
            var length = actionQueue.length;
            if (!length) {
                actionQueue.push(betaAction);
            }
            else {
                var lastAction = actionQueue[length - 1];
                if (lastAction.type === betaAction.type) {
                    lastAction.end = betaAction.end;
                }
                else {
                    actionQueue.push(betaAction);
                }
            }
            posQueue = [];
        }
        else {
            var length = actionQueue.length;
            if (length) {
                var lastAction = actionQueue[length - 1];
                if (pos.time - lastAction.end >= STILL_INTERVAL) {
                    // a gesture has finished
                    gesture = getGesture(actionQueue);
                    actionQueue = [];
                    posQueue = [];
                }
                else {
                    if (pos.time - firstPos.time >= POS_INTERVAL) {
                        posQueue.shift();
                    }
                    posQueue.push(pos);
                }
            }
            else {
                if (pos.time - firstPos.time >= POS_INTERVAL) {
                    posQueue.shift();
                }
                posQueue.push(pos);
            }
        }
        if (gesture) {
            alert(gesture);
            // $('.orientation-info').html(gesture);
        }
        else {
            setTimeout(function () {
                $('.orientation-info').html('');
            }, 2000);
        }
    });

    function getGesture (queue) {
        if (!queue || !queue.length) {
            return '';
        }
        if (queue.length === 1) {
            var action = queue[0];
            if (action.type === 'LEFT') {
                return 'LEFT SWIPE';
            }
            else if (action.type === 'RIGHT') {
                return 'RIGHT SWIPE';
            }
            else if (action.type === 'UP') {
                return 'UP';
            }
            else if (action.type === 'DOWN') {
                return 'DOWN';
            }
        }
        else if (queue.length === 2) {
            var actionOne = queue[0];
            var actionTwo = queue[1];
            if (actionOne.type === 'LEFT' && actionTwo.type == 'RIGHT') {
                return 'LEFT SHAKE';
            }
            else if (actionOne.type === 'RIGHT' && actionTwo.type == 'LEFT') {
                return 'RIGHT SHAKE';
            }
            else if (actionOne.type === 'UP' && actionTwo.type == 'DOWN') {
                return 'UP WAVE';
            }
            else if (actionOne.type === 'DOWN' && actionTwo.type == 'UP') {
                return 'DOWN WAVE';
            }
        }
        else if (queue.length >= 3) {
            var actionOne = queue[0];
            var actionTwo = queue[1];
            var actionThree = queue[2];
            if (actionOne.type === 'LEFT' && actionTwo.type == 'RIGHT'
                && actionThree.type === 'LEFT'
                || actionOne.type === 'RIGHT' && actionTwo.type == 'LEFT'
                && actionThree.type === 'RIGHT') {
                return 'SHAKING!';
            }
        }
        return '';
    }

}
else {
    $('.orientation-info').html('DO NOT support DeviceOrientationEvent');
}