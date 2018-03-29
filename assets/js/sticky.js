"use strict";

$( document ).ready(function() {

    let $stickyTopBar = $('.sticky-topBar');
    let $stickySideBar = $('.sticky-sideBar');
    let $stickyStopper = $('.sticky-stopper');

    if (!!$stickyTopBar.offset()) {

        let generalSidebarHeight = $stickyTopBar.innerHeight();
        let stickyTopTopBar = $stickyTopBar.offset().top;

        let stickOffset = 0;
        let stickyStopperPosition = $stickyStopper.offset().top;
        let stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
        let diff = stopPoint + stickOffset;

        $(window).scroll(function(){ // scroll event

            let windowTop = $(window).scrollTop(); // returns number

            if (stopPoint < windowTop) {

                $stickyTopBar.css({ position: 'absolute', top: diff });


            } else if (stickyTopTopBar < windowTop+stickOffset) {

                $stickyTopBar.css({ position: 'fixed', top: stickOffset });
                $stickySideBar.css({ position: 'fixed', top: stickOffset });


                $(".main-content").css("margin-top", "134px");

            } else {
                $stickyTopBar.css({position: 'absolute', top: 'initial'});
                $stickySideBar.css({position: 'absolute', top: 'initial'});
                $stickySideBar.css("margin-top", "136px");
                $(".main-content").css("margin-top", "134px");

                if (window.matchMedia("(min-width: 1199px)").matches) {
                    $stickySideBar.css("margin-top", "34px");
                }
            }
        });

    }
});

