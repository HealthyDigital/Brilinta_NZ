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
		tablet = $('.tablet'),
		section = localStorage.getItem('section');
	
	//append section class
	if(!$.isEmptyObject(section)){
		container.addClass(section);
	}
		
	//reference & notes 
	controls.on("tap", "li:not('.disabled')", function(){
		var $this = $(this),
			data = $this.attr('data-control'),
			prevIndex = controls.find('.active').index(),
			asset,
			id = '';
			
			overlay.removeClass('show r n');
			controls.find('li').removeClass('active');
			overlay.addClass(data);
			$this.addClass('active');
			
			switch(data){
				case"e":
					asset = "BE1602-efficacy-ACS-patients";
					id = "BE2016";
				break;
				case"v":
					asset = "BE1611-Bleeding-the-evidence";
					id = "BE2016";
				break;
				case"p":
					asset = "BF1624-first-line-most-patient-groups";
					id = "BF2016";
				break;
				case"g":
					asset = "STEMI1625-treatment-in-guidelines";
					id = "BF2016";
				break;
				case"pi":
					asset = "BE1617-PI";
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
			if(data !== 'r' && data !== 'n'){
				id = id !== '' ? ', '+id+'' : '';
				document.location = 'veeva:gotoSlide('+asset+'.zip'+id+')';
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
	
	//navigation
	navToSlide('logo', 'OCM16100-resource-library');
	navToSlide('wallentin', 'Wallentin2009PlatoNE', 'BRIREF');
	navToSlide('b-links.plato', 'BEF1600-Plato-trial-design');
	
	//Double tap to menu slide
	$('.contents').on('doubleTap', function(){
		document.location = 'veeva:gotoSlide(BEF16-efficacy-or-firstline.zip, BEF2016)';
	});

});

//go to slide
function navToSlide(btn, asset, id){
	"use strict";
	$('.'+btn).on('tap', function(){
		id = id ? ', '+id+'' : '';
		document.location = 'veeva:gotoSlide('+asset+'.zip'+id+')';
	});
}