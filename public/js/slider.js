function detectswipe(el, func) {
    swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = 20; //min x swipe for horizontal swipe
    var max_x = 40; //max x difference for vertical swipe
    var min_y = 40; //min y swipe for vertical swipe
    var max_y = 50; //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener(
        "touchstart",
        function (e) {
            var t = e.touches[0];
            swipe_det.sX = t.screenX;
            swipe_det.sY = t.screenY;
        },
        false
    );
    ele.addEventListener(
        "touchmove",
        function (e) {
            var t = e.touches[0];
            swipe_det.eX = t.screenX;
            swipe_det.eY = t.screenY;
        },
        false
    );
    ele.addEventListener(
        "touchend",
        function (e) {
            //horizontal detection
            if (
                (swipe_det.eX - min_x > swipe_det.sX ||
                    swipe_det.eX + min_x < swipe_det.sX) &&
                (swipe_det.eY < swipe_det.sY + max_y &&
                    swipe_det.sY > swipe_det.eY - max_y)
            ) {
                if (swipe_det.eX > swipe_det.sX) direc = "r";
                else direc = "l";
            }
            if (direc != "") {
                if (typeof func == "function") func(el, direc);
            }
            direc = "";
        },
        false
    );
}

function vlkSlider(sliderDiv, options) {
    var thisSlider = document.getElementById(sliderDiv),
        photoList,
        photo,
        autoCount = 0,
        autoCountBack = 0,
        stylePseudoElem,
        transitionTimeDelay = 300,
        transitionDurationTime = '.5s'

    var arrowLeft = '<div id="slider-arrow-left" class="slider-arrow-left">';
    arrowLeft += '<div class="slider-arrow-left-in"></div></div>';
    var arrowRight = '<div id="slider-arrow-right" class="slider-arrow-right">';
    arrowRight += '<div class="slider-arrow-right-in"></div></div>';
    var thisSlideStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "background-size": "cover",
        "background-position": "center",
        "background-color": "black",
        "border-top-left-radius": "10px",
        "border-top-right-radius": "10px"
    };

    var blurEffect = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "background-size": "cover",
        "background-position": "center",
        "background-color": "black",
        "-webkit-filter": "blur(20px)",
        filter: "blur(20px)"
    };

    var photoFakeStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        "background-size": "cover",
        "background-position": "center center",
        "-webkit-filter": "blur(0px)",
        filter: "blur(0px)",
        "-webkit-transition": "filter .8s",
        "-o-transition": "filter .8s",
        transition: "filter .8s",
    };

    var photoListStyle = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "background-size": "cover",
        "background-position": "center",
        "-webkit-transition": "0.4s",
        "-o-transition": "0.4s",
        transition: "0.4s"
    };

    stylePseudoElem = document.head.appendChild(document.createElement("style"));

    stylePseudoElem.innerHTML =
        ".slider-arrow-left { position: absolute;left: 10%;height: 100px;width: 60px;top: 50%;-webkit-transform: translateY(-50%);-ms-transform: translateY(-50%);transform: translateY(-50%);cursor: pointer;} ";

    stylePseudoElem.innerHTML +=
        ".slider-arrow-left-in:before {content: ''; position: absolute; top: 50%; left: 0px; transform: translateY(-50%) rotate(45deg); width: 10px; height: 10px; border-bottom: 2px solid white; border-left: 2px solid white;} ";

    stylePseudoElem.innerHTML +=
        ".slider-arrow-left-in {position: absolute;top: 50%;width: 60px;height: 2px;background-color: transparent;-webkit-transform: translateY(-50%);-ms-transform: translateY(-50%);transform: translateY(-50%);z-index: 50;pointer-events: none;} ";

    stylePseudoElem.innerHTML +=
        ".slider-arrow-right {position: absolute;right: 10%;height: 100px;width: 60px;top: 50%;-webkit-transform: translateY(-50%);-ms-transform: translateY(-50%);transform: translateY(-50%);cursor: pointer;} ";

    stylePseudoElem.innerHTML +=
        ".slider-arrow-right-in {position: absolute;top: 50%;width: 60px;height: 2px;background-color: transparent;-webkit-transform: translateY(-50%);-ms-transform: translateY(-50%);transform: translateY(-50%);pointer-events: none;}";

    stylePseudoElem.innerHTML +=
        ".slider-arrow-right-in:before {content: '';position: absolute;top: 50%;right: 0px;transform: translateY(-50%) rotate(-45deg);width: 10px;height: 10px;border-bottom: 2px solid white;border-right: 2px solid white;}";

    //place Arrow
    Object.assign(thisSlider.style, thisSlideStyle);
    thisSlider.innerHTML += arrowLeft;
    thisSlider.innerHTML += arrowRight;

    //define photoList div

    for (var i = 0; i < thisSlider.childNodes.length; i++) {
        if (thisSlider.childNodes[i].className == "slider-photo-list") {
            photoList = thisSlider.childNodes[i];
        }
    }

    Object.assign(photoList.style, photoListStyle);

    var arrowLeftEl = thisSlider.getElementsByClassName("slider-arrow-left"),
        arrowRightEl = thisSlider.getElementsByClassName("slider-arrow-right"),
        arrowRightElClick = 0,
        arrowLeftElClick = 0;
    if (arrowLeftElClick == 0) {
        arrowLeftEl[0].style.display = "none";
    }

    //define inital photo position

    photo = photoList.getElementsByClassName("slider-photo");
    var photoPosition = 0;

    if (photo.length == 1) {
        arrowRightEl[0].style.display = "none";
    }

    var thisSliderPhotoFake = document.createElement("div");
    thisSliderPhotoFake.classList += "slider-photo-fake";
    thisSlider.insertBefore(thisSliderPhotoFake, thisSlider.childNodes[0]);

    Object.assign(thisSliderPhotoFake.style, photoFakeStyle);

    for (var i = 0; i < photo.length; i++) {
        photo[i].style.left = photoPosition + "%";
        var scale = '1';
        if (i > 0) {
            scale = '0.5';
        }
        photoPosition += 100;
        Object.assign(photo[i].style, {
            position: "absolute",
            width: "100%",
            height: "100%",
            "transform": 'scale(' + scale + ')',
            "-webkit-transform": 'scale(' + scale + ')',
            "-ms-transform": 'scale(' + scale + ')',
            "background-size": "cover",
            "background-position": "center center",
            "transition": "left" + transitionDurationTime + ", -webkit-transform .4s .4s",
            "-webkit-transition": 'left' + transitionDurationTime + ',transform .5s 0.5s',
            "transition": "left" + transitionDurationTime + ",transform .4s .4s",
            "-o-transition": "left" + transitionDurationTime + ", transform .4s .4s",
            "transition": "left" + transitionDurationTime + ", transform .4s .4s, -webkit-transform " + transitionDurationTime
        });
    }

    function moveFw() {
        if (arrowRightElClick == photo.length - 1 || photo.length == 1) {
            return;
        }
        arrowRightEl[0].style.pointerEvents = "none";
        arrowRightElClick = arrowRightElClick + 1;
        arrowLeftElClick = arrowLeftElClick + 1;
        if (arrowRightElClick == photo.length - 1) {
            arrowRightEl[0].style.display = "none";
        } else {
            arrowRightEl[0].style.display = "block";
        }
        if (arrowLeftElClick != 0) {
            arrowLeftEl[0].style.display = "block";
        }
        for (var i = 0; i < photo.length; i++) {
            var thisPhoto = photo[i]
            var thisLeft = thisPhoto.style.left.replace("%", "");
            var changedLeft = thisLeft - 100;
            thisPhoto.style.left = changedLeft + '%';
            if (thisLeft == 100) {
                thisPhoto.style.transform = 'scale(1)';
                thisPhoto.style.webkitTransform = 'scale(1)';
                thisPhoto.style.msTransform = 'scale(1)';
            }
            if (thisLeft != 100) {
                thisPhoto.style.transform = 'scale(0.5)';
                thisPhoto.style.webkitTransform = 'scale(0.5)';
                thisPhoto.style.msTransform = 'scale(0.5)';
            }

            if (thisLeft == 0) {
                photo[i].style.opacity = "0";
                var currentBackground = photo[i].style.backgroundImage;
                thisSliderPhotoFake.style.backgroundImage = currentBackground;
                Object.assign(thisSliderPhotoFake.style, blurEffect);
                setTimeout(function () {
                    Object.assign(thisSliderPhotoFake.style, photoFakeStyle);
                    if (arrowRightElClick == photo.length - 1) {
                        arrowRightEl[0].style.pointerEvents = "none";
                    } else {
                        arrowRightEl[0].style.pointerEvents = "auto";
                    }
                    if (arrowLeftElClick != 0) {
                        arrowLeftEl[0].style.pointerEvents = "auto";
                    }
                }, 1000);
            } else {
                photo[i].style.opacity = "1";
            }
        }
    }

    function moveBack() {
        if (arrowLeftElClick == 0) {
            return;
        }
        arrowLeftEl[0].style.pointerEvents = "none";
        arrowRightElClick = arrowRightElClick - 1;
        arrowLeftElClick = arrowLeftElClick - 1;
        if (arrowLeftElClick == 0) {
            arrowLeftEl[0].style.display = "none";
        } else {
            arrowLeftEl[0].style.display = "block";
        }
        if (arrowRightElClick != photo.length - 1) {
            arrowRightEl[0].style.display = "block";
        }
        for (var i = 0; i < photo.length; i++) {
            var thisPhoto = photo[i];
            var thisLeft = photo[i].style.left.replace("%", "");
            var changedLeft = parseInt(thisLeft) + 100;
            photo[i].style.left = changedLeft + '%';
            if (thisLeft == -100) {
                thisPhoto.style.transform = 'scale(1)';
                thisPhoto.style.webkitTransform = 'scale(1)';
                thisPhoto.style.msTransform = 'scale(1)';
            }
            if (thisLeft != -100) {
                thisPhoto.style.transform = 'scale(0.5)';
                thisPhoto.style.webkitTransform = 'scale(0.5)';
                thisPhoto.style.msTransform = 'scale(0.5)';
            }
            if (thisLeft == 0) {
                photo[i].style.opacity = "0";
                var currentBackground = photo[i].style.backgroundImage;
                thisSliderPhotoFake.style.backgroundImage = currentBackground;
                Object.assign(thisSliderPhotoFake.style, blurEffect);
                setTimeout(function () {
                    Object.assign(thisSliderPhotoFake.style, photoFakeStyle);
                    if (arrowRightElClick == photo.length - 1) {
                        arrowRightEl[0].style.pointerEvents = "none";
                    } else {
                        arrowRightEl[0].style.pointerEvents = "auto";
                    }
                    if (arrowLeftElClick != 0) {
                        arrowLeftEl[0].style.pointerEvents = "auto";
                    }
                }, 1000);
            } else {
                photo[i].style.opacity = "1";
            }

        }
    }

    //define arrowRight function on click

    document.addEventListener("click", function (e) {
        if (e.target == arrowRightEl[0]) {
            moveFw();
        }
        //define arrowleft function on click

        if (e.target == arrowLeftEl[0]) {
            moveBack();
        }
    });

    function swipeChange(el, d) {
        if (d == "r") {
            moveBack();
        }
        if (d == "l") {
            moveFw();
        }
    }
    detectswipe(thisSlider.id, swipeChange);
}

document.addEventListener("DOMContentLoaded", function () {
    var sliders = document.getElementsByClassName('photo-slider');
    for (var i = 0; i < sliders.length; i++) {
        sliders[i].id = 'photo-slider-' + (i + 1)
        vlkSlider("photo-slider-" + (i + 1));
    }
});
