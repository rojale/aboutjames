$(document).ready(function(){
	$('#contactbutton').click(
		function(){
			$('#contactbox').fadeIn(250);
		})
	$('#exitcontact').click(
		function(){
			$('#contactbox').fadeOut(250);
		})
	$('.piecelinks a').hover(function(){
		$(this).css('background-color','#3498dbe');
	},
	function(){
		$(this).css('background-color','#2980b9');
	})
})