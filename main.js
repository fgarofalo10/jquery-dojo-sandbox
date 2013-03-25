// Prevent conflicts between javascript frameworks
jQuery.noConflict();

// When browser is ready, load jQuery
jQuery(document).ready( function () {
  // Once jQuery and Dojo are ready. Start code. 
	
	// Initialize DoJo Functions
	dojo.addOnLoad(initDojo);
	
	// Initialize jQuery Functions
	initJQuery_mainfunctions();
	
	var jqueryui_show_speed = 400;
	
	function initJQuery_mainfunctions() { 
		console.log("TEST - initJQuery_mainfunctions()");
		
        setRightPanelTabs();
		setRightPanelToggles();
	}
	// ----------------------------------------------------------------------------------------------

    function setRightPanelToggles() {
		
		// Locate button
		jQuery("#btn_sample_locate").click(function(e) {
			
			if (typeof zoomToLatLon == "function") {
				zoomToLatLon(-116.539, 33.825);
			}
			
			e.preventDefault();
        });			
        
		// Accordions
        jQuery(".container_right_panel").on({
            click: function (e) {
                var elem_this = jQuery(this);
                console.log("TEST - accordion_toggle CLICKED");
                getTrigger_AccordionToggle(elem_this.parent(), "default");
                e.preventDefault();
            }
        }, ".accordion_toggle");

    }

    // ----------------------------------------------------------------------------------------------

    function getTrigger_AccordionToggle(toggle_item, action) {
        var elem_section_content_wrapper = toggle_item.next();
        var elem_section_content = elem_section_content_wrapper.find(".section_content");
        var elem_parent_accordion = elem_section_content_wrapper.parent();

        var isAccordionAnimating = false;
        var toggleAction = "";
        var bool_isAccordionOpen = false;
		
        if (action == "default") {
            if (elem_section_content.is(":visible") == true || elem_section_content.is(":not(:hidden)") == true) {
                toggleAction = "hide";
            }
            else {
                toggleAction = "show";
            }
        }
        else {
            toggleAction = action;
        }
        
		console.log("TEST: toggleAction "+ toggleAction);

        if (toggleAction == "hide") {
            console.log("TEST: getTrigger_AccordionToggle hide");
            isAccordionAnimating = true;
            //toggle_item.find("span").removeClass("toggle_arrow_down").addClass("toggle_arrow_up");
            
			elem_section_content.hide("slide", { direction: 'up' }, jqueryui_show_speed, function () { getAccordionToggleCallback_hide() });
        }
        else if (toggleAction == "show") {
            console.log("TEST: getTrigger_AccordionToggle show");
            isAccordionAnimating = true;
            //toggle_item.find("span").removeClass("toggle_arrow_up").addClass("toggle_arrow_down");

            elem_section_content_wrapper.show();

            elem_section_content.show("slide", { direction: 'up' }, jqueryui_show_speed, function () { getAccordionToggleCallback_show() });

        }
        else {
            // skip
            isAccordionAnimating = true;
        }
       
        function getAccordionToggleCallback_hide() {
            console.log("TEST: getAccordionToggleCallback_hide");
            isAccordionAnimating = false;
            //elem_section_content_wrapper.hide();
			
        }
        function getAccordionToggleCallback_show() {
            console.log("TEST: getAccordionToggleCallback_show");
            isAccordionAnimating = false;

        }
    }
	
    // ----------------------------------------------------------------------------------------------

    function setRightPanelTabs() {

        // Changed to "on" event listener since Port REsources tabs are dynamically created
        //jQuery(".tab.tab_header").click(function (e) {
        jQuery(".container_right_panel").on({
            click: function (e) {
                var elem_tab_header = jQuery(this);
                var elem_tab_container = elem_tab_header.parent().parent().attr("id");
                var elem_tab_header_id = elem_tab_header.attr("id");

				setRightPanelTabActive(elem_tab_container, elem_tab_header_id);  // local function

                e.preventDefault();
            }
        }, ".tab.tab_header");
    }
	
    //setRightPanelTabActive [Local]
    function setRightPanelTabActive (parent_container, element) {

        var elems_tab_headers = jQuery("#" + parent_container + " .tab.tab_header");
        var elems_tab_contents = jQuery("#" + parent_container + " .tab.tab_content");

        var elem_tab_content = jQuery("#" + parent_container + " .tab.tab_content." + element);

        // Tab Headers
        elems_tab_headers.removeClass("active");
        jQuery("#" + element).addClass("active");

        // Tab Contents
        elems_tab_contents.removeClass("active");
        elem_tab_content.addClass("active");
	}
});
