﻿/*
*
* Copyright (c) 2010 Justin Dearing (zippy1981@gmail.com)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
* Version 1.0.0
*
*/
(function($) {
/**
 * Wraps a jquery resultset in a collapsible panel.
 *
 * @name collapsiblePanel
 * @param panelId 
 * @param titleQuery The elements in ths jQuery are inserted into the title section of the collapsible panel.
 * @author Justin Dearing (http://zippy1981.dyndns.org)
 * @example $("#tableId").collapsiblePanel();
 *
 */
	//Attach this new method to jQuery
 	$.fn.extend({ 
 		
 		 		
		//pass the options variable to the function
 		collapsiblePanel: function(options) {


			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				panelId: null,
				titleQuery: null,
				collapsedImage: "panelCollapsed.png",
				expandedImage: "panelExpanded.png"
			}
				
			var options =  $.extend(defaults, options);

			var collapsePanel = function (panelDiv) {
    			panelDiv.find(">div.collapsiblePanelTitle").unbind("click");
	    		panelDiv.find(">div.collapsiblePanelContents").slideUp("slow");
	    		collapseTitle(panelDiv.find(">div.collapsiblePanelTitle"));
	    		panelDiv.find(">div.collapsiblePanelTitle").click(function () {
	    			expandPanel(panelDiv);
	    		});
	    	}
	    	
	    	var collapseTitle = function (panelTitle) {
	    		panelTitle.find(">img.collapseExpandToggle").attr("src", options.collapsedImage);
	    	}
    		
    		var expandPanel = function (panelDiv) {
    			panelDiv.find(">div.collapsiblePanelTitle").unbind("click");
	    		panelDiv.find(">div.collapsiblePanelContents").slideDown("slow");
	    		expandTitle(panelDiv.find(">div.collapsiblePanelTitle"));
	    		panelDiv.find(">div.collapsiblePanelTitle").click(function () {
	    			collapsePanel(panelDiv);
	    		});
	    	}
	    	
	    	var expandTitle = function (panelTitle) {
	    		panelTitle.find(">img.collapseExpandToggle").attr("src", options.expandedImage);
	    	}

    		return this.each(function() {
				var panelContents = $(this);
				panelContents.wrap($('<div class="collapsiblePanelContents"></div>'));
				panelContents = panelContents.parent();
				var titleDiv = 
					$('<div class="collapsiblePanelTitle"><img class="collapseExpandToggle" src="' + 
					options.expandedImage + 
					'" alt="" height="16" width="16"/></div>');
				titleDiv.append($(options.titleQuery).addClass("collapseTitleContents"));
				var panelDiv = $('<div class="collapsiblePanelOuter"></div>');
				if (options.panelId != null) { panelDiv[0].id = options.panelId; }
				
				// It seemed to be wrapping a copy of the div around the contents.
				// We need that copy for the event handling.
				panelDiv = panelContents.wrap(panelDiv).parent();
				
				titleDiv.insertBefore(panelContents);
				titleDiv.click(function () {
					collapsePanel(panelDiv);
				});
			
    		});
    	}
	});
	
})(jQuery);