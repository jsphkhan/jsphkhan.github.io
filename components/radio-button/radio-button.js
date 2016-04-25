//global level objects
//can go to a framework level
var yo = yo || {};

(function(scope) {
	//PRIVATE Properties
	var _className = null;
	var _setUpRadioButton = function() {
		if ($('.' + _className + ' input').length) {
		    $('.' + _className).each(function(){ 
		        $(this).removeClass('r_on');
		    });
		    $('.' + _className + ' input:checked').each(function(){ 
		        $(this).parent('label').addClass('r_on');
		    });
		};
	}
	//Publicly available scoped to Application level global object
	var RadioButton = function(className) {  //className is the class name without the . (DOT)
		_className = className;
		var radioButton = $('.' + _className);
		radioButton.click(function(){
        	_setUpRadioButton();
    	});
		_setUpRadioButton();
	}

	scope.RadioButton = RadioButton;
})(yo);