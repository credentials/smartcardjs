
function SignalHandler() {
	var debugMode = true;
	
	this.handle = function (signal) {
        log (signal, this.handle.caller);

        $(SignalHandler).trigger(signal.getEvent(), signal.getAttributes());
    }
	
    function log (signal, caller) {
        var message = "Signal: " + signal.getEvent() + " - called by " + caller;
        
        if (debugMode == true){
            if(window.console) {
                if (window.console.debug){
                    window.console.debug (message);
                } else if (window.console.log) {
                    window.console.log (message);
                }
            }
        }
    }
}
