$(function () {

	$('.nav-folder').on('click', function (e) {
		e.preventDefault();

        $(this).toggleClass('is-closed');
		$(this).parent().children('.nav-list').slideToggle();
	});

    $(document.links).filter(function() {
        return this.hostname != window.location.hostname;
    }).attr('target', '_blank');


}());
