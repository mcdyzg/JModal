+(function($){
	'use strict';

	var JModal=function(ele,options){
		this.ele = ele;
		this.$ele = $(ele);
		this.options=options;
	}

	JModal.DEFAULTS={
		backdrop: false,
		animation: false
	}

	JModal.prototype.init=function(){
		if(this.$ele.data('target')) {
			this.target = $(this.$ele.data('target'));
			if(this.target.css('display') === 'block') {
				this.target.hide();
			}else {
				this.target.show();
				if(this.options.animation) {
					this.target.find('.JModal-backdrop').addClass('fadeIn')
				}
				if(this.options.backdrop === true) {
					this.showBackdrop();
					this.target.find('.JModal-backdrop').click(function(){
						this.target.hide();
					}.bind(this))
				}
			}
		}
	}

	JModal.prototype.show=function(){
		this.target.show();
	}

	JModal.prototype.hide=function(){
		this.target.hide();
	}

	JModal.prototype.showBackdrop=function(){
		this.target.find('.JModal-backdrop').css('display', 'block');
	}

	function Plugin(option) {
		return $(this).each(function(){
			var $this    =$(this)
			var data     =$this.data('JModal')
			var options  =$.extend({},JModal.DEFAULTS,option)
			if(!data) {
				$this.data('JModal',(data=new JModal(this,options)))
			}
			data.init()
		})
	}

	var old=$.fn.JModal

	$.fn.JModal             =Plugin
	$.fn.JModal.Constructor =JModal

	$.fn.JModal.noConflict =function(){
		$.fn.JModal=old
		return this
	}

	$(document).on('click','[data-toggle="JModal"]',function(e){
		var $this        =$(this)
		Plugin.call(this)
	})

})(jQuery)