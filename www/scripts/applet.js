var AppletJS = {

    browserFamily: null,
    browserName: null,
    
    attributes: null,
    parameters: null,
    
    minimumJavaVersion: null,
    fallbackContent: null,
    callbackFunction: null,

	checkVersion: function(pattern) {
		return deployJava.versionCheck(pattern);
	},
	
	loadApplet: function(attributes, parameters, minimumJavaVersion, fallbackContent, callbackFunction) {
		if (attributes != null) {
			AppletJS.attributes = attributes;
		}
		if (parameters != null) {
			AppletJS.parameters = parameters;
		}
		if (minimumVersion != null) {
			AppletJS.minumumJavaVersion = minimumJavaVersion;
		}
		if (fallbackContent != null) {
			AppletJS.fallbackContent = fallbackContent;
		}
		if (callbackFunction != null) {
			AppletJS.callbackFunction = callbackFunction;
		}
		
		var object = constructPluginObject();
		var body = document.document.getElementsByTagName('body')[0];
		body.appendChild(object);
	},
	
    detectBrowser: function() {
    	if (browserFamily == null) {
    		deployJava.getBrowser();
    	
    		AppletJS.browserFamily = deployJava.browserName;
    		AppletJS.browserName = deployJava.browserName2;
    	}
    	
    	return AppletJS.browserFamily;
    },

    constructAttribute: function(name, value) {
	return ' '+name+'="'+value+'"'; 
    }, 

    constructParameter: function(name, value) { 
	return '\n\t<param name="'+name+'" value="'+value+'" />'; 
    },

    constructPluginObject: function() {
	// both IE and non_ID, using IE concealing tags
	var html = '';
		
	html += '\n<!--[if IE]>';
	html += AppletJS.constructObject(true);
	html += '\n<![endif]-->';
		
	html += '\n<!--[if !IE]> -->';
	html += AppletJS.constructObject(false);
	html += '\n<!--<![endif]-->';
		
	return html;
    },

    constructObject: function(msieQuirks) {
	var html = '\n<object';

	if (msieQuirks) {
	    /*
	     * Creates the opening object tag for IE using classid and codebase 
	     * attributes. If these attributes are not set, AppletJS will 
	     * request that the applet be run with the latest installed JRE, or 
	     * JDK 1.6, whichever is higher. For more information, see:
	     * http://download.oracle.com/javase/6/docs/technotes/guides/plugin/developer_guide/using_tags.html#object
	     */

	    // Use specified or latest installed JRE:
	    html += AppletJS.constructAttribute('classid', 
	        (AppletJS.attributes.classid || 
		    'clsid:8AD9C840-044E-11D1-B3E9-00805F499D93'));
			
	    // Use specified or latest installed JRE:
	    html += AppletJS.constructAttribute('codebase', 
		(AppletJS.attributes.codebase || 
		    'http://java.sun.com/update/1.6.0/jinstall-6u29-windows-i586.cab#Version=1,6,0,29')); 
	} else {
	    /*
	     * Creates the opening object tag for standards-compliant browsers.
	     * Requests the minimum JRE version specified with 'minimum'.
	     */
	    html += AppletJS.constructAttribute('type',
		'application/x-java-applet;version=' + 
		    (AppletJS.minimumVersion || '1.6.0')); 
	}
		
	if(AppletJS.attributes.width || AppletJS.attributes.height) {
	    html += AppletJS.constructAttribute('width', AppletJS.attributes.width);
	    html += AppletJS.constructAttribute('height', AppletJS.attributes.height);
	}

	if(AppletJS.attributes.id) {
	    // make applet JS-scriptable from page.
	    // i.e. where id=myAppletObjectID: document.myAppletObjectID.myPublicFunction();
	    html += AppletJS.constructAttribute('id', AppletJS.attributes.id);
	}
		
	html += '>';
		
	for(key in AppletJS.attributes) {
	    if(key != 'width' && key != 'height' && key != 'id') {
		html += AppletJS.constructParameter(key, AppletJS.attributes[key]);
	    }
	}
	for(key in AppletJS.parameters) {
	    html += AppletJS.constructParameter(key, AppletJS.parameters[key]);
	}
		
	html += '\n\t'+ (fallback || 
	    'This content requires <a href="http://java.com">Java</a>.');

	html += '\n</object>';

	return html;
    },

    // IE or non_IE based on isIE
    html: function(attributes, params, minimumVersion, fallbackContent) {
	return appletjs.either_html(attributes, params, minimumVersion, fallbackContent, appletjs.isIE()); 
    },
	

	// inserts correct tag-set directly into the element identified by 'elementID'
    into_div: function(html, div_ID) {
	document.getElementById(div_ID).innerHTML = html;
    },
}
