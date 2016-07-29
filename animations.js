$(document).ready(function(){
	$('#englink').hover(
		function(){
		$(this).stop().animate({'backgroundColor':'#3498db'},150);
	},
	function(){
		$(this).stop().animate({'backgroundColor':'#2c3e50'},150);
	})
	$('#codlink').hover(
		function(){
		$(this).stop().animate({'backgroundColor':'#2ecc71'},150);
	},
	function(){
		$(this).stop().animate({'backgroundColor':'#2c3e50'},150);
	})
	$('#liftlink').hover(
		function(){
		$(this).stop().animate({'backgroundColor':'#f39c12'},150);
	},
	function(){
		$(this).stop().animate({'backgroundColor':'#2c3e50'},150);
	})
	$('#engcontentwrapper').hover(
		function(){
			$('#engcloak').fadeTo(300,1);
			$('#engcontentwrapper h1').animate({'backgroundColor':'#3498db'},1000);
		})
	$('#codcontentwrapper').hover(
		function(){
			$('#codcloak').fadeTo(300,1);
			$('#codcontentwrapper h1').animate({'backgroundColor':'#2ecc71'},1000);
		})
	$('#liftcontentwrapper').hover(
		function(){
			$('#liftcloak').fadeTo(300,1);
			$('#liftcontentwrapper h1').animate({'backgroundColor':'#f39c12'},1000);
		})
})