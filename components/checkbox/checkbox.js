//global level objects
//can go to a framework level
var yo = yo || {};

//self invoking function defines the module pattern inside it
(function(scope, $) {

    //validate the arguments passed
     function _validateArgs(args) {

        $(args.elem).each(function(index, elem) {
            if ($(elem).get(0).nodeName.toLowerCase() != "input" && $(elem).attr("type") != "checkbox") {
                return false;
            }
        });
        return true;

    }
	
	//create HTML structure
     function _createHtmlStructure(name, elem, targetConfig) {
		
        var checkBoxDiv = $("<div class=\"customCheckBox large-12 small-12 medium-12 " + targetConfig.checkBoxClass + "\" tabindex=\"0\" role=\"checkBox\" data-value=\""+elem.val()+"\" data-name=\""+name+"\"></div>");
        return checkBoxDiv;

    }

    //create and append html structure
    function  _createAndAppendWidget(name, elemArr, targetConfig) {
		var customCheckBox, customCheckBoxArr = [];
		
		for(i in elemArr){
			customCheckBox = _createHtmlStructure(name, elemArr[i], targetConfig);
			elemArr[i].after(customCheckBox.get(0).outerHTML);
			elemArr[i].attr("aria-hidden","true")
			customCheckBoxArr.push(elemArr[i].next());
		}
        
        return customCheckBoxArr;
    }
	
	//get the checkbox status
	function getCheckBoxStatus(checkbox) {
        // We need to access the native widget for the given custom widget
        // In our example, that native widget is a sibling of the custom widget
        var nativeWidget = checkbox.prev();

        return nativeWidget.attr('checked');
    };
	
	//update the checkboxstatus
	function updateValue(checkbox, checkBoxStatus, targetConfig) {
        // We need to get the native widget for the given custom widget
        // In our example, that native widget is a sibling of the custom widget
        var nativeWidget = checkbox.prev();

		// We make sure the chosen option is selected
        checkbox.attr('aria-checked', checkBoxStatus);

        // We set the selected index to the index of our choice
        nativeWidget.attr('checked', checkBoxStatus);

        // And we highlight the corresponding option of our custom widget
        addStatusClass(checkbox, checkBoxStatus, targetConfig);
    };
	
	// add corresponding class based on the status
	 function addStatusClass(checkbox, checkBoxStatus, targetConfig){
		
		if(checkBoxStatus){
			checkbox.addClass(targetConfig.onClass).removeClass(targetConfig.offClass);
		}else{
			checkbox.removeClass(targetConfig.onClass).addClass(targetConfig.offClass);
		}
	
	}

	// bind event on the custom checkbox elements
    function _bindEventHandlers(CustomElemArr, targetConfig) {

		for(i in CustomElemArr){
		
			(function(checkbox){
			
				var checkBoxStatus = getCheckBoxStatus(checkbox);

				// We make our custom widget focusable
				checkbox.attr("tabIndex", 0);

				checkbox.prev().attr("tabIndex", -1);

				// We make sure that the default selected value is correctly displayed
				updateValue(checkbox, checkBoxStatus, targetConfig);
				
				//assign click and keyup events
				checkbox.on('click keyup', function(event) {
					if (event.which === 13 || event.type === "click") {
						updateValue(checkbox, !getCheckBoxStatus(checkbox), targetConfig);
					   
					}
				});
			
			}(CustomElemArr[i]));
		
		}
		
	}
	
	// inner Constructor function
    function CustomCheckBox(name, elemArr, targetConfig) {

        this.checkBoxName = name;
        this.elemArr = elemArr;
		this.config = targetConfig;
		this.CustomElemArr = _createAndAppendWidget(this.checkBoxName, this.elemArr, targetConfig);
        _bindEventHandlers(this.CustomElemArr, targetConfig);
		console.log(this)
        return this;

    }

    //constructor function
    function CheckBox(config) {
	
		var defaultConfig = {
			checkBoxClass: "",
			elem : ".customCheckBox",
			onClass : "on",
			offClass : "off"
		},
		targetConfig = {},
		checkBoxArray = [];

        $.extend(true, targetConfig, defaultConfig, config);

        _init = function() {

            var targetElems = $(targetConfig.elem);
			
			var checkBoxStore = {};

            if (!_validateArgs(config)) {
                throw new Error("InAppropriate Tag reference passed");
            }

            $("body").addClass("widget");

            if (targetElems.length) {

                targetElems.each(function(index, elem) {

					if(checkBoxStore[$(elem).attr("name")]){
						checkBoxStore[$(elem).attr("name")].push($(elem))
					} else {
						checkBoxStore[$(elem).attr("name")] = [$(elem)];
					}
                    
				});
            }
			
			for (name in checkBoxStore){
				checkBoxArray.push(new CustomCheckBox(name, checkBoxStore[name], targetConfig));
			}
        }

        _init();

		return checkBoxArray;
		
	}
	
	scope.CheckBox = CheckBox;
	
}(yo, $))