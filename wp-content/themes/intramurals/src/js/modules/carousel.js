var $ = require('jquery');
var slick = require('../vendor/jquery.slick.js');

module.exports = function() {
  $('.js-carousel').slick({
    adaptiveHeight: true,
    dots: false,
    centerMode: true,
    slidesToShow: 1,
    arrows: true,
    centerPadding: '0px',
    infinite: false,
    prevArrow: '<button type="button" class="tiny"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="tiny"><i class="fa fa-chevron-right"></i></button>'
  });
};