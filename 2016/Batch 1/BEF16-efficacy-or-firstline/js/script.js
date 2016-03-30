// JavaScript Document
$( function(){
	//prevent iPad rubber band effect
	$(document).on('touchmove', function(e){ e.preventDefault(); });
	
	//global variables  
	var popup = $('.popup'),
		container = $('.container');
	
	//close popup
	popup.find('.close').on('tap', function(){
		popup.hide();
	});
	
	//remove animated CSS
	setTimeout( function(){ container.find('.animated').removeClass("bounceInDown"); }, 1000);
	
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
function navToSlide(btn, url){
	"use strict";
	$('.'+btn).on('tap', function(){
		//if(!popup.is(":visible") && !$('.'+btn).hasClass('disb') || btn === 'exa')
			document.location = 'veeva:gotoSlide('+url+'zip)';
	});
}