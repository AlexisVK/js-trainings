// page init
jQuery(function(){
	initOpenClosePlugin();
});

// inin open close
function initOpenClosePlugin() {
	jQuery('.open-close').openClose({
		'animSpeed': 500,
		'activeClass': 'active',
		'slide': '.slide'
	});
}

/*
* Open close plugin
*/
;(function( $ ){ 
	$.fn.openClose = function( options ) {
		var settings = $.extend({
			'animSpeed': 400,
			'activeClass': 'active',
			'opener': '.opener',
			'slide': '.slide'
		}, options);

		return this.each(function(e) {
			var holder = $(this);
			var opener = holder.find(settings.opener).eq(0);
			var slide = holder.find(settings.slide).eq(0);
			var animated = false;

			initialState();
			opener.on('click', clickHandler);

			function initialState() {
				if ( holder.hasClass(settings.activeClass) ) {
					slide.slideDown(0);
				} else {
					slide.slideUp(0);
				}
			}

			function clickHandler(e) {
				e.preventDefault();
				if ( !animated ) {
					if ( holder.hasClass(settings.activeClass) ) {
						animated = true;
						slide.slideUp(settings.animSpeed, function() {
							holder.removeClass(settings.activeClass);
							animated = false;
						});
					} else {
						holder.addClass(settings.activeClass);
						animated = true;
						slide.slideDown(settings.animSpeed, function() {
							animated = false;
						});
					}
				}
			}
		});
	};
})( jQuery );