// JavaScript Document
$( function(){
	//prevent iPad rubber band effect
	$(document).on('touchmove', function(e){ e.preventDefault(); });
	
	//global variables  
	var container = $('.container'),
		overlay = $('.overlay'),
		controls = $('.controls');
	
	//reference & notes 
	controls.on("tap", "li:not('.disabled')", function(){
		var $this = $(this),
			data = $this.attr('data-control');
			overlay.addClass(data);
			$this.toggleClass('active');
			switch(data){
				case"v":
				break;
				case"p":
				break;
				case"g":
				break;
				case"n":
					if(!overlay.is(':visible')){
						overlay.show().addClass('animated slideInUp');
					}else{
						overlay.addClass('animated slideOutDown').fadeOut();
					}
				break;
				case"pi":
				break;
				case"r":
				console.log(overlay.is(':visible'));
					if(!overlay.is(':visible')){
						overlay.show().addClass('animated slideInUp');
					}else{
						overlay.addClass('animated slideOutDown').fadeOut();
					}
				break;
			}
			removeAnimationClass();
			
	})
	
	//remove animated CSS
	function removeAnimationClass(){
		setTimeout( function(){ container.find('.animated').removeClass("bounceInDown bounceInUp slideOutDown slideInUp"); }, 1000);
	}
	removeAnimationClass()
	
	//reference, study & briefcase buttons
	/*controls.not('.b').each(function() {
		var $this = $(this);
			$this.on('tap', function(){
				
             
			});
    });*/
	
	
	//go to briefcase
	//navToSlide('controls > .b','CHSR-Briefcase-Section.zip');
	
	//Double tap to menu slide
	$('.contents').on('doubleTap', function(){
		document.location = 'veeva:gotoSlide(Brilinta-efficacy-or-firstline.zip)';
	});

});

//go to slide
function navToSlide(btn, asset){
	"use strict";
	$('.'+btn).on('tap', function(){
		//if(!popup.is(":visible") && !$('.'+btn).hasClass('disb') || btn === 'exa')
			document.location = 'veeva:gotoSlide('+asset+'zip)';
	});
}