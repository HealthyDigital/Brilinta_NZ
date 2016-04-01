// JavaScript Document
$( function(){
	//prevent iPad rubber band effect
	$(document).on('touchmove', function(e){ e.preventDefault(); });
	
	//global variables  
	var container = $('.container'),
		contents = $('.contents'),
		overlay = $('.overlay'),
		controls = $('.controls'),
		slide = contents.find("[data-slide]"),
		tablet = $('.tablet');
		
	
	//reference & notes 
	controls.on("tap", "li:not('.disabled')", function(){
		var $this = $(this),
			data = $this.attr('data-control'),
			prevIndex = controls.find('.active').index();
			
			overlay.removeClass('show r n');
			controls.find('li').removeClass('active');
			overlay.addClass(data);
			$this.addClass('active');
			
			switch(data){
				case"v":
				break;
				case"p":
				break;
				case"g":
				break;
				case"pi":
				break;
				case"r":
				case"n":
					overlay.show().addClass('animated slideInUp');
					if(overlay.is(':visible') && $this.index() === prevIndex ){
						controls.find('li').removeClass('active');
						overlay.addClass('animated slideOutDown').fadeOut();
					}
		
					overlay.find('.purple').length && data === 'n' ? overlay.css('background-position-y','-1430px') : overlay.css('background-position-y','-2286px');
				break;
			}
			removeAnimationClass();
	});
	//switch content
	$('.tablet').on('tap', 'li', function(){
		var $this = $(this),
			cl = $this.parents('.single').length ? 's1' : 's'+($this.index()+1);
			slide.hide();
			contents.removeClass("s1 s2 s3 s4 s5");
			contents.addClass(cl);
			contents.find("[data-slide='"+cl+"']").fadeIn();
			//console.log();		
	});
	
	contents.find("[data-slide]:not('[data-slide=s0]')").on('tap', function(){
		$(this).hide();
		contents.removeClass("s1 s2 s3 s4 s5");
		contents.find("[data-slide=s0]").fadeIn();
	});
	
	//console.log(slide.length);
	
	//remove animated CSS
	function removeAnimationClass(){
		setTimeout( function(){ 
			container.find('.animated')
				.removeClass("bounceInDown bounceInUp slideOutDown slideInUp"); 
		}, 900);
	}
	removeAnimationClass();
	
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