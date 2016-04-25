//global level objects
//can go to a framework level
var yo = yo || {};

//self invoking function defines the module pattern inside it
(function(scope) {
	function checkLength(str) {
		return (typeof str === 'string' && str.length > 0);
	}
	//template for the pop up
	var _generatePopupTemplate = function(mainTitle, subTitle, bodyMessage) {
		var htmlArr = [];
		
		if(checkLength(mainTitle)) {
			htmlArr.push("<h4 role='heading' class='yodlee-modal-popup-main-title' tabindex='0'>" + mainTitle + "</h4>");
		}
		if(checkLength(subTitle)) {
			htmlArr.push("<h4 role='heading' class='yodlee-modal-popup-sub-title'>" + subTitle + "</h4>");
		}
		if(checkLength(bodyMessage)) {
			htmlArr.push("<div class='yodlee-modal-popup-body-message'>" + bodyMessage + "</div>");
		}
		htmlArr.push("<a href='#' role='button' aria-label='close dialog' class='yodlee-modal-popup-close-button'>X</a>");
		return htmlArr.join('');
	}

	var _generatePopupButtons = function(buttonsArr, buttonLayout) {
		//To-Do: loop through the list of buttons and add them accordingly
		var isLastButton = "";
		if(buttonsArr.length === 1) {
			isLastButton = "handle-overflow";
		}
		var container = $("<div class='yodlee-modal-popup-btn-group " + isLastButton + "'></div>");
		
		for(var i = 0; i < buttonsArr.length; i++) {
			var buttonObj = buttonsArr[i];
			if(checkLength(buttonObj.title)) {
				if(i === buttonsArr.length - 1 && buttonsArr.length > 1) {
					isLastButton = "last-button";
				}
				if(buttonsArr.length === 1) {
					isLastButton = "move-right";
				}
				var btn = $("<a href='#' role='button' class='yodlee-modal-popup-btn " + buttonObj.type + " " + buttonLayout + " " + isLastButton + "' aria-label='" + buttonObj.title + "'>" + buttonObj.title + "</a>").on('click', buttonObj.callBack);
				container.append(btn);
			}
		}
		return container;
	}

	//validate the arguments passed.
	var _validateArgs = function(args) {
		//check for the arguments passed
		//check if JQuery exists
		if(typeof window.jQuery === 'undefined') {
			alert('PopUp Component needs jQuery');
			return false;
		}
		if(!args.buttons || args.buttons.constructor !== Array || args.buttons.length === 0) {
			alert('Illegal Arguments Passed to PopUp Component');
			return false;
		}
		return true;
	}

	var _calculatePosition = function(modalWindowElement, w, h) {
		modalWindowElement.css("left", (($(window).innerWidth() - w) / 2));
	    modalWindowElement.css("top", (($(window).innerHeight() - h) / 2));
	}

	//constructor function
	var PopUp = function(args) {
		if(_validateArgs(args)) {
			this.isShowing = false;
			this.mainTitle = args.mainTitle || '';
			this.subTitle = args.subTitle || '';
			this.bodyMessage = args.bodyMessage || ''; //can be HTML or simple text
			this.mountTo = args.mountTo;
			this.width = args.width;
			this.height = args.height;
			this.modal = args.modal;
			//buttons
			this.buttons = args.buttons;
			this.buttonLayout = args.buttonLayout;
			//close callback
			this.closeCallback = args.closeCallback;
		} else {
			alert('Wrong Parameters for Pop Up Component');
			return;
		}

	}

	PopUp.prototype.show = function(target) {
		var that = this;
		that.target = $(target);
		if(!this.isShowing) {
			this.overlayElement = $("<div class='yodlee-modal-popup-modal-overlay'></div>");//document.createElement("div");
		    //this.overlayElement.className = 'modalOverlay';
		    this.modalWindowElement = $("<div class='yodlee-modal-popup-modal-window' role='dialog'></div>");//document.createElement("div");
		    //this.modalWindowElement.className = 'modalWindow';
		    this.modalWindowContent = $("<div class='yodlee-modal-popup-modal-content'></div>");//document.createElement("div");
		    //this.modalWindowContent.className = 'modal-popup-content';


		    //position modal window element
		    this.modalWindowElement.css("width", this.width);
		    //this.modalWindowElement.css("height", this.height);
		    //this.modalWindowElement.style.width = this.width + "px";
		    //this.modalWindowElement.style.height = this.height + "px";
		    _calculatePosition(this.modalWindowElement, that.width, that.height);
		    //add childs
		    this.modalWindowContent.append(_generatePopupTemplate(this.mainTitle, this.subTitle, this.bodyMessage));
		    this.modalWindowContent.append(_generatePopupButtons(this.buttons, this.buttonLayout));//this.button1,this.button2
		    
		    this.modalWindowElement.append("<div class='ada-offscreen'>Pop up started</div>");
		    this.modalWindowElement.append(this.modalWindowContent);
		    this.modalWindowElement.append("<div class='ada-offscreen'>Pop up end</div>");

		    //add the modal overlay background if params allow it
		    if(this.modal) {
		    	$('body').append(this.overlayElement);
		    	this.overlayElement.css('opacity', '0.35');
			}
			//add the modal window
		    $(this.mountTo).append(this.modalWindowElement);

		    //add click to close button
		    $(".yodlee-modal-popup-close-button").on('click', function() {   //attr('tabindex','1')
		    	if(that.closeCallback && typeof that.closeCallback === 'function') {
		    		that.closeCallback();
		    	} else {
		    		that.hide(); //fallback to default behavior
		    	}
		    });
		    $(".yodlee-modal-popup-btn.last-button").on("keydown", function(e) {
    	        var evt = e || window.event;
                var keyCode = evt.which || evt.keyCode;
                if(keyCode === 9) { // TAB pressed
                    if(evt.preventDefault) {
                    	evt.preventDefault();
                    } else {
                		evt.returnValue = false;
                	}
                    $(".yodlee-modal-popup-main-title").focus();
                }
		    });

		    $('.yodlee-modal-popup-main-title').focus();
		    //listen to resize event to center align the pop up
		    $(window).on('resize', function() {
				_calculatePosition(that.modalWindowElement, that.width, that.height);
			});
			this.isShowing = true;
		}
	}
	PopUp.prototype.hide = function(target) {
		if(this.isShowing) {
			$(window).off('resize'); //kill the resize event to release back memory hold
	    	if(this.modal) {
	        	this.overlayElement.remove();
	        	this.overlayElement = null; //to release back the memory hold by the DOM ref
	    	}
	        this.modalWindowElement.remove();
	        this.modalWindowContent = null; //to release back the memory hold by the DOM ref
	        this.modalWindowElement = null; //to release back the memory hold by the DOM ref
			this.isShowing = false;

			//shift focus to where it started from
			//console.log(this.target);
			this.target.focus();
		}
	}

	//Exposed Public API
	scope.PopUp = PopUp;
})(yo);