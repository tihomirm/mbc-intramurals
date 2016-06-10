var $ = require('jquery');
// Foundation Core
require('foundation-sites/js/foundation.core.js');
// Foundation Utilities
require('foundation-sites/js/foundation.util.box.js');
require('foundation-sites/js/foundation.util.keyboard.js');
require('foundation-sites/js/foundation.util.mediaQuery.js');
require('foundation-sites/js/foundation.util.motion.js');
require('foundation-sites/js/foundation.util.nest.js');
require('foundation-sites/js/foundation.util.timerAndImageLoader.js');
require('foundation-sites/js/foundation.util.touch.js');
require('foundation-sites/js/foundation.util.triggers.js');
// Foundation Plugins. Add or remove as needed for your site
require('foundation-sites/js/foundation.drilldown.js');
require('foundation-sites/js/foundation.dropdownMenu.js');
require('foundation-sites/js/foundation.responsiveMenu.js');
require('foundation-sites/js/foundation.offcanvas.js');
var prepInputs = require('./modules/prepinputs.js');
var socialShare = require('./modules/socialShare.js');
var carousel = require('./modules/carousel.js');

$(document).ready(function() {
    // Initialize Foundation
    $(document).foundation();

    // Prepare form inputs
    prepInputs();
    // Initialize social share functionality
    // Replace the empty string parameter with your Facebook ID
    socialShare('');

    // Initialize carousels
    carousel();

    // Initialize Plugins
    $('.magnific-trigger').magnificPopup({
        type:'inline'
    });

    $('.meerkat-cta').meerkat({
        background: 'rgb(21, 76, 102) repeat-x left top',
        height: '120px',
        width: '100%',
        position: 'bottom',
        close: '.close-meerkat',
        dontShowAgain: '.dont-show',
        animationIn: 'fade',
        animationSpeed: 500,
        opacity: 0.9
    });
});