// JavaScript Document
$( function(){
	//prevent iPad rubber bank effect
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	
	//global variables 
	var popup = $('.popup');
	
	//close popup
	popup.find('.close').on('tap', function(){
		popup.hide();
	});
	
	//reference, study & briefcase buttons
	/*controls.not('.b').each(function() {
		var $this = $(this);
			$this.on('tap', function(){
				
             
			});
    });*/
	
	
	//go to briefcase
	navToSlide('controls > .b','CHSR-Briefcase-Section.zip');
	
	//Double tap to menu slide
	$('.contents').on('doubleTap', function(){
		document.location = 'veeva:gotoSlide(CHSR-Patients.zip)';
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