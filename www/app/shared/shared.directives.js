app.directive('scanButton', function () {
    return {
        templateUrl: 'app/shared/scanButton.html'
    };
});
app.directive('pageBlock', function () {
    return {
        templateUrl: 'app/shared/pageBlock.html'
    };
});
app.directive('helpCard', function () {
    return {
        templateUrl: 'app/shared/helpCard.html'
    };
});
app.directive('showFields', function () {
    return {
        templateUrl: 'app/shared/showFields.html'
    };
});
app.directive('pageBlockCheckbox', function () {
    return {
        templateUrl: 'app/shared/pageBlockCheckbox.html'
    };
});
app.directive('datePicker', function () {
    return {
        templateUrl: 'app/shared/datepicker.html'
    };
});
app.directive('submitButton', function () {
    return {
        templateUrl: 'app/shared/submitButton.html'
    };
});
app.directive('carPicture', function () {
    return {
        templateUrl: 'app/shared/carPicture.html'
    };
});
app.directive('testBlock', function () {
    return {
        templateUrl: 'app/shared/testBlock.html'
    };
});
app.directive('footer', function () {
    return {
        templateUrl: 'app/shared/footer.html'
    };
});
app.directive('carPicture2', function () {
    return {
        templateUrl: 'app/shared/carPicture2.html'
    };
});
app.directive("drawing", function () {
    return {
        restrict: "A"
        , link: function (scope, element) {
            var ctx = element[0].getContext('2d');
            // variable that decides if something should be drawn on mousemove
            var drawing = false;
            // the last coordinates before the current move
            var lastX;
            var lastY;
            element.bind('mousedown', function (event) {
                if (event.offsetX !== undefined) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                }
                else { // Firefox compatibility
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }
                // begins new line
                ctx.beginPath();
                drawing = true;
            });
            element.bind('mousemove', function (event) {
                if (drawing) {
                    // get current mouse position
                    if (event.offsetX !== undefined) {
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    }
                    else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }
                    draw(lastX, lastY, currentX, currentY);
                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }
            });
            element.bind('mouseup', function (event) {
                // stop drawing
                drawing = false;
            });
            // canvas reset
            function reset() {
                element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY) {
                // line from
                ctx.moveTo(lX, lY);
                // to
                ctx.lineTo(cX, cY);
                // color
                ctx.strokeStyle = "#4bf";
                // draw it
                ctx.stroke();
            }
        }
    };
});