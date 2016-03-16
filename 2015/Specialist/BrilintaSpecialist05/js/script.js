// JavaScript Document
$( function(){
	//prevent iPad rubber bank effect
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	
	//popup
	var popup = $('.popup');
	
	//more info btn
	$('.controls li').on('tap', function(){
		var li = $(this).attr('class');
		if(li === 'ref'){
			popup.fadeIn();
		}else if(li === 'pi'){
			document.location = 'veeva:gotoSlide(BrilintaSpecialist07.zip)';
		}
	})
	//close popup
	popup.find('.close').on('tap', function(){
		popup.hide();
	})
	
	//go to slide
	function navToSlide(btn, url){
		$('.'+btn).on('tap', function(){
			document.location = 'veeva:gotoSlide('+url+')';
		});
	}
	
	$('.contents').on('doubleTap', function(){
		document.location = 'veeva:gotoSlide(BrilintaSpecialist03.zip)';
	});
	
	
	
	

})