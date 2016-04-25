//global level objects
//can go to a framework level
var yo = yo || {};

(function(scope) {
	//PRIVATE Properties
	var _className = null;
	var _setUpRadioButton = function(currentTarget) {
		if ($('.' + _className + ' input').length) {
		   	var name = $(currentTarget).find('input').attr('name');

		    $('.' + _className + ' input[name="' + name + '"]').each(function(){
		    	$(this).removeAttr("checked");
		        $(this).parent('.' + _className).removeClass('r_on');
		    });

		    if(currentTarget) {
		    	$(currentTarget).find('input').attr("checked", "checked").trigger('change');
		    	$(currentTarget).addClass('r_on');

		    } else {
		    	$('.' + _className + ' input:checked').parent('.' + _className).addClass('r_on');
		    }


		};
	}
	//Publicly available scoped to Application level global object
	var RadioButton = function(className) {  //className is the class name without the . (DOT)
		_className = className;
		var radioButton = $('.' + _className);
		//console.log(radioButton);
		// radioButton.on('click', 'label', function(event) {
		// 	alert('clicked');
		// 	//console.log(event.currentTarget);
  //       	_setUpRadioButton(event.currentTarget)
		// });
		radioButton.on('click', function(event){
			//alert('clicked');
			//console.log(event.currentTarget);
			// event.preventDefault();
			// event.stopPropagation();
        	_setUpRadioButton(event.currentTarget);

    	});
		radioButton.on('keydown', function(event){
			if(event.keyCode == 13) {
	            _setUpRadioButton(event.currentTarget);
	        }
    	});
		_setUpRadioButton();
	}

	scope.RadioButton = RadioButton;
})(yo);