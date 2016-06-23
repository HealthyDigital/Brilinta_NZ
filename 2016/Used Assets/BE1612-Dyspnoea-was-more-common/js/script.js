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
		section = localStorage.getItem('section'),
		guideline = localStorage.getItem('guideline');
	
	//append section class
	if(!$.isEmptyObject(section)){
		container.addClass(section);
	}
	if($.isEmptyObject(guideline)){
		guideline = "STEMI1625-treatment-in-guidelines";
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
				case"df":
					asset = "BE1613-Managing-dyspnoea";
				break;
				case"e":
					asset = "BE1602-efficacy-ACS-patients";
					id = "BE2016";
				break;
				case"c":
					asset = "BF1623-risk-of-recurrent-events-lesions";
					id = "BF2016";
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
					asset = guideline;
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
	navToSlide('anavekar', 'Anavekar2004', 'BRIREF');
	navToSlide('caggegi', 'Caggegi2011', 'BRIREF');
	navToSlide('donahoe', 'Donahoe2007', 'BRIREF');
	navToSlide('fox', 'Fox2006', 'BRIREF');
	navToSlide('held', 'Held2011', 'BRIREF');
	navToSlide('husted', 'Husted2012', 'BRIREF');
	navToSlide('lindholm', 'Lindholm2014', 'BRIREF');
	navToSlide('stone', 'Stone2011', 'BRIREF');
	navToSlide('james', 'James2010', 'BRIREF');
	navToSlide('gurbel', 'Gurbel2009', 'BRIREF');
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