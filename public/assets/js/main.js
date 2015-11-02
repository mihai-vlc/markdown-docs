$(function () {

	$('.nav-folder').on('click', function (e) {
		e.preventDefault();

		$(this).parent().children('.nav-list').slideToggle();
	});


}());
