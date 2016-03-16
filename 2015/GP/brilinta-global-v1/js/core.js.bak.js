
var PresentationModule = ( function ($, window, undefined) {
    // collection of methods for the presentation

    var offCanvasDisplayedClass = 'menu-displayed';
    var noInteractionClass = 'no-interaction';
    var content = $('#content');
    var overlay = $('#overlay-container');
    var offCanvasMenu = $('#menu-container');
    var topLevelSections = $('#content .slides > section'); // top level slides
    var sectionStart = (offCanvasMenu.data('sectionStart')) ? offCanvasMenu.data('sectionStart') : 0; // where the section numbering should start
    var sdFolder = '1024x768/'; // standard def image folder

    function displayOffCanvas () {
        // display the off canvas menu
        content.addClass(offCanvasDisplayedClass);

        // show the no interaction overly -- slight opacity to prevent interaction with the current slide. To hide menu, user just touches the overlay
        overlay.addClass(noInteractionClass);
        overlay.fadeIn();
    };

    function hideOffCanvas () {
        // hide the off canvas menu
        content.removeClass(offCanvasDisplayedClass);

        // hide the no interaction overlay
        overlay.hide();
        overlay.removeClass(noInteractionClass);
        
        // reset the menu back to the top
        offCanvasMenu.scrollTop(0); 
    };

    function getHref (slideId) {
        // helper function that returns valid Reveal href for a given slide
        var firstDash = slideId.indexOf('-');
        var lastDash = slideId.lastIndexOf('-');
        var xIndex = slideId.substring(firstDash + 1, lastDash);
        var yIndex = slideId.substring(lastDash + 1);

        return ('#/' + xIndex + '/' + yIndex);
    };

    function getMenuLink (slideId, menuIndex) {
        // helper function that returns a complete menu link for a given slide. eg, <a class="menu-link" href="#/0/0"><img src="img/menu-0-0.png"></a>
        var firstDash = slideId.indexOf('-');
        var lastDash = slideId.lastIndexOf('-');
        var xIndex = slideId.substring(firstDash + 1, lastDash);
        var yIndex = slideId.substring(lastDash + 1);
        var filePrefix = slideId.substring(0, firstDash);

        return ('<a class="menu-link btn-goto" href="#/' + xIndex + '/' + yIndex + '"><span>' + menuIndex + '</span><img src="img/menu-' + filePrefix + '-' + xIndex + '-' + yIndex + '.png"></a>');
    };

    function isHighDensity () {
        // helper function to determine if device is high def (retina)
        return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
    };

    var pub = {

        init: function () {
            // initialise the presentation and event handlers

            // is retina?
            var whichFolder = (isHighDensity()) ? '' : sdFolder; 


            // set all the background images for the slides -- there's a slight hit doing this dynamically, but it's easier than punching out css styles for each slide...
            $('#content .swiper-slide').each(function (i) {
                var image = $(this).data('slide');
                var type = ($(this).data('type')) ? $(this).data('type') : 'png'; // if data-type not specified, then defaults to .png
                $(this).css('background-image', 'url("img/' + whichFolder + image + '.' + type + '")');
            });


            // create the pips for each slide
            topLevelSections.each(function (i) {
                
                var subsections = $(this).find('section .swiper-slide');

                // check if there's a sub section (ie, vertical slides)
                if (subsections.length > 0) {
                    // let's create pips!
                    var pipsHTML = '<ol class="pips-container">';

                    subsections.each(function (i) {
                        var href = getHref($(this).data('slide'));
                        pipsHTML += '<li><a class="btn-goto" href="' + href + '">&nbsp;</a></li>';
                    });

                    pipsHTML += '</ol>';

                    // append it to the slide
                    subsections.append(pipsHTML);
                }
            });


            // create the PI, ref, info, menu and "choose story" buttons
            $('#content div.swiper-slide').each(function (i) {
                // check if this slide doesn't require a PI button
                if (!$(this).data('noPi')) {
                    $(this).append('<a class="btn-show-overlay pi-link" data-slide="pi" href="#">&nbsp;</a>');    
                }

                // check if this slide doesn't require a ref button
                if (!$(this).data('noRef')) {
                    $(this).append('<a class="btn-show-overlay ref-link" href="#">&nbsp;</a>');
                }

                // check if this slide doesn't require an info button
                if (!$(this).data('noInfo')) {
                    $(this).append('<a class="btn-show-overlay info-link" data-slide="info" href="#">&nbsp;</a>');    
                }

                // check if this slide doesn't require a menu button
                if (!$(this).data('noMenu')) {
                    $(this).append('<a class="btn-show-menu" href="#">&nbsp;</a>');
                }

                // check if this slide doesn't require a "choose story" button
                if (!$(this).data('noChooseStory')) {
                    $(this).append('<a href="brilinta-global-v1.html#/1/0" class="choose-story-link btn-goto">&nbsp;</a>');
                }

            });


            // generate menu (off canvas) if required
            if (offCanvasMenu.data('generate')) {
                
                var appendMenuHtml = '';

                topLevelSections.each(function (i) {
                    
                    // append sub section title
                    var pageIndex = i + sectionStart;
                    appendMenuHtml += '<h2>Section ' + pageIndex + '.0</h2>';
                    
                    // check if there's a sub section (ie, vertical slides) then append those menu links
                    var subsections = $(this).find('section .swiper-slide');
                    if (subsections.length > 0) {
                        subsections.each(function (subIndex) {
                            appendMenuHtml += getMenuLink($(this).data('slide'), pageIndex + '.' + subIndex);
                        });
                    } else {
                        // this slide is a single top level with no subsection... append it
                        var thisSingleLevel = $(this).find('> .swiper-slide');
                        appendMenuHtml += getMenuLink(thisSingleLevel.data('slide'), pageIndex + '.0');
                    }
                });

                // append the menu to the container
                offCanvasMenu.append(appendMenuHtml);
            }


            // event handler for off canvas menu toggle
            $('#content .btn-show-menu').on('touchstart', function (e) {
                e.preventDefault();
                displayOffCanvas();
            });


            // event handler for off canvas menu links
            $('#menu-container .menu-link').on('tap', function (e) {
                hideOffCanvas();
            });


            // event handler for goto buttons -- could've relied on the browser to redirect but it's too slow (300ms)
            $('.btn-goto').on('tap', function (e) {
                e.preventDefault();
                var href = $(this).attr('href');
                window.location.href = href;
            });
 

            // event handler to populate and display overlay -- again, could've been done with a lot of css but dynamically loading a specific background image into the overlay is ok.
            $('#content .btn-show-overlay').on('touchstart', function (e) {
                e.preventDefault();

                var parentImage = $(this).parent('.swiper-slide').data('slide');
                var image = ($(this).data('slide')) ? $(this).data('slide') : parentImage + '-ref'; // if data-slide not specified for the overlay, it grabs the parent slide and appends '-ref'
                var type = ($(this).data('type')) ? $(this).data('type') : 'png'; // if data-type not specified, then defaults to .png
                var content = ($(this).data('content')) ? $(this).data('content') : false; // content to be inserted into the overlay

                overlay.css('background-image', 'url("img/' + whichFolder + image + '.' + type + '")');
                if (content) {
                    overlay.append(content);
                }
                overlay.fadeIn('fast');
            });


            // event handler to close the overlay
            overlay.on('touchstart', function (e) {
                // only close if the overlay is the target. This prevents the overlay from inadvertently closing if the user clicks on the video
                if (e.target == overlay[0]) {
                    overlay.fadeOut();
                    overlay.css('background-image', 'none'); // remove background image
                    overlay.html(''); // clear any content

                    // if menu displayed, hide it
                    if (content.hasClass(offCanvasDisplayedClass)) {
                        hideOffCanvas();
                    }
                }
            });

        }

    };

    return pub;

})(jQuery, window);