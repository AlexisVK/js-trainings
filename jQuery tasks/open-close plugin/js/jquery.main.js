// page init
jQuery(function(){
	initOpenClosePlugin();
});

// inin open close
function initOpenClosePlugin() {
	jQuery('.open-close').openClose({
		'slideSpeed': 300
	});
}

/*
* Open close plugin
*/
;(function($){
	function OpenClose(options) {
		this.options = $.extend({
			opener: '.opener',
			slide: '.slide',
			activeClass: 'active',
			slideSpeed: 500,
			animated: false
		}, options);
		this.init();
	}

	OpenClose.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.initialState();
			}
		},
		findElements: function() {
			this.holder = $(this.options.holder);
			this.opener = this.holder.find(this.options.opener).eq(0);
			this.slide = this.holder.find(this.options.slide).eq(0);
		},
		attachEvents: function() {
			var self = this;
			this.clickHandler = function(e) {
				e.preventDefault();
				if (!self.options.animated) {
					if(!self.holder.hasClass(self.options.activeClass)) {
						self.showSlide();
					} else {
						self.hideSlide();
					}
				}
			};
			self.opener.bind('click', this.clickHandler);
		},
		initialState: function() {
			if (this.holder.hasClass(this.options.activeClass)) {
				this.slide.slideDown(0);
			} else {
				this.slide.slideUp(0);
			}
		},
		showSlide: function() {
			var self = this;
			self.options.animated = true;
			self.slide.slideDown(self.options.slideSpeed, function() {
				self.holder.addClass(self.options.activeClass);
				self.options.animated = false;
			});
		},
		hideSlide: function() {
			var self = this;
			self.options.animated = true;
			self.slide.slideUp(self.options.slideSpeed, function() {
				self.holder.removeClass(self.options.activeClass);
				self.options.animated = false;
			});
		},
		destroy: function() {
			this.opener.unbind('click', this.eventHandler);
			this.holder.removeClass(this.options.activeClass).removeData('openClose');
		}
	};

	// detect device type
	var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	// jquery plugin
	$.fn.openClose = function(opt){
		return this.each(function(){
			$(this).data('OpenClose', new OpenClose($.extend(opt,{holder:this})));
		});
	};
}(jQuery));