var yo = yo || {};

(function(scope) {
	console.log(scope);

	//Private encapsulated API
	function _renderComponent(msg, label, callBack) {
		var divEl = document.createElement('div');
		divEl.className = "sample-component";
		divEl.innerHTML = "<span>" + msg + "</span>";

		var buttonEl = document.createElement("button");
		buttonEl.innerHTML = label;

		if(typeof callBack === 'function' && callBack) {
			buttonEl.addEventListener('click', function() {
				callBack();
			}, false);
		} else {
			buttonEl.addEventListener('click', function() {
				alert('Default Event Handler');
			}, false);
		}

		divEl.appendChild(buttonEl);
		
	 	return divEl;
	}

	//Publicly available component constructor
	var SampleComponent = function(args) {
		//first validate for correct arguments
		if(!args.appendTo || !args.message || !args.buttonLabel || !args.callBack) {
			alert('Wrong Arguments Passed. Will Abort here!!');
			return;
		}
		this.appendTo = args.appendTo;
		this.message = args.message;
		this.buttonLabel = args.buttonLabel;
		this.callBack = args.callBack;
	}
	SampleComponent.prototype.show = function() {
		this.appendTo.appendChild(_renderComponent(this.message, this.buttonLabel, this.callBack));
	}
	SampleComponent.prototype.hide = function() {

	}

	scope.SampleComponent = SampleComponent;
})(yo);