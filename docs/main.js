(function () {
    var container = document.getElementById('container');
    container.style.top = 0;

    var blocksCount = container.children.length;
    container.style.height =  blocksCount + '00%';
    for ( var i = 0; i < blocksCount; i++) {
        container.children[i].style.height =  100 / blocksCount + '%';
    }

    var activeStepCtrl = (function () {
        var activeStep = 0;
        container.firstElementChild.classList.toggle('active');

        var ctrl;
        return ctrl = {
            getActiveStep: function () {
                return activeStep;
            },
            setActiveStep: function (index) {
                if (index < 0 || index >= blocksCount) return;

                container.style.top = -index * 100 + '%';
                container.children[index].classList.toggle('active');
                container.children[activeStep].classList.toggle('active');
                activeStep = index;
                setIgnoreWheel();
            },
            up: function () {
                this.setActiveStep(activeStep - 1);
            },
            down: function () {
                this.setActiveStep(activeStep + 1);
            },
        }
    })();

    var ignoreWheel = false;

    function setIgnoreWheel() {
        ignoreWheel = true;
        setTimeout(function () {
            ignoreWheel = false;
        }, 1125);
    }

    function onWheel(event) {
        event.preventDefault();
        if (ignoreWheel) return;

        var delta = event.deltaY || -event.wheelDeltaY;
        if (delta > 0) {
            activeStepCtrl.down();
        } else {
            activeStepCtrl.up();
        }
    }

    addCallbackOnMousewheel(document, onWheel);
})();

// cross browser way
function addCallbackOnMousewheel(elem, callback) {
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.addEventListener("wheel", callback);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", callback);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", callback);
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", callback);
    }
}