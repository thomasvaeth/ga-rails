// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
	// Full Page
	$('#fullpage').fullpage({
	  // Navigation
	  menu: '#menu',
	  lockAnchors: false,
	  anchors: ['first', 'second', 'third'],
	  navigation: true,
	  navigationPosition: 'right',
	  navigationTooltips: false,
	  showActiveTooltip: false,
	  slidesNavigation: true,
	  slidesNavPosition: 'bottom',

	  // Scrolling
	  css3: true,
	  scrollingSpeed: 700,
	  autoScrolling: true,
	  fitToSection: true,
	  fitToSectionDelay: 1000,
	  scrollBar: false,
	  easing: 'easeInOutCubic',
	  easingcss3: 'ease',
	  loopBottom: false,
	  loopTop: false,
	  loopHorizontal: true,
	  continuousVertical: false,
	  normalScrollElements: '#element1, .element2',
	  scrollOverflow: false,
	  touchSensitivity: 15,
	  normalScrollElementTouchThreshold: 5,

	  // Accessibility
	  keyboardScrolling: true,
	  animateAnchor: true,
	  recordHistory: true,

	  // Design
	  controlArrows: true,
	  verticalCentered: true,
	  resize : false,
	  sectionsColor : ['#000000', '#FFFFFF', '#FFFFFF'],
	  paddingTop: '0',
	  paddingBottom: '0',
	  fixedElements: '#header, .footer',
	  responsiveWidth: 0,
	  responsiveHeight: 0,

	  // Custom Selectors
	  sectionSelector: '.section',
	  slideSelector: '.slide',

	  // Events
	  onLeave: function(index, nextIndex, direction){},
	  afterLoad: function(anchorLink, index){},
	  afterRender: function(){},
	  afterResize: function(){},
	  afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
	  onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
	});
});