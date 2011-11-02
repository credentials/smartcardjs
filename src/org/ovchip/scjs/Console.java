package org.ovchip.scjs;

import java.applet.Applet;

/**
 * Console to generate output messages up to a certain level.  
 */
public class Console {

    public static final int ERROR = 1;
    public static final int WARNING = 2;
    public static final int LOG = 4;
    public static final int DEBUG = 8;
    public static final int TRACE_APDU = 16;
    public static final int TRACE_CALL = 32;

    /**
     * The level of generated output by this applet.
     */
    private int outputLevel = ERROR | WARNING | LOG;
    
    /**
     * The parent (applet) of this Console.
     */
    private Applet applet;    

    /**
     * Construct a new Console and with the outputLevel from the parameters of
     * the parent.
     * 
     * @param parent the Applet which constructs this console. 
     */
    public Console(Applet parent) {
        applet = parent;
                
        // Set up the level of generated output
        String parameter = applet.getParameter("outputLevel");
        if (parameter != null) {
            outputLevel = Integer.parseInt(parameter);
        }
    }
    
    /**
     * Get the current level of generated output.
     *  
     * @return the current level of generated output.
     */
    public int getOutputLevel() {
        traceCall("getOutputLevel()");
        
        return outputLevel;
    }
    
    /**
     * Set a new level of generated output.
     * 
     * @param level the new level of generated output.
     */
    public void setOutputLevel(int level) {
        traceCall("setOutputLevel(" + level + ")");
        
        outputLevel = level;
    }
    
    /*************************************************************************
     *** Output functionality                                              ***
     *************************************************************************/
    
    /**
     * Output a basic log message.
     * 
     * @param message the new output to be processed.
     */
    public void log(String message) {
        if ((outputLevel & LOG) != 0) {
            applet.showStatus("[LOG] " + message);
        }
    }
    
    /**
     * Output a warning message.
     * 
     * @param message the new output to be processed.
     */
    public void warning(String message) {
        if ((outputLevel & WARNING) != 0) {
            applet.showStatus("[WARNING] " + message);
        }
    }

    /**
     * Output an error message.
     * 
     * @param message the new output to be processed.
     */
    public void error(String message) {
        if ((outputLevel & ERROR) != 0) {
            applet.showStatus("[ERROR] " + message);
        }
    }

    /**
     * Output a debug message.
     * 
     * @param message the new output to be processed.
     */
    public void debug(String message) {
        if ((outputLevel & DEBUG) != 0) {
            applet.showStatus("[DEBUG] " + message);
        }
    }

    /**
     * Output a APDU tracing message.
     * 
     * @param message the new output to be processed.
     */
    public void traceAPDU(String message) {
        if ((outputLevel & TRACE_APDU) != 0) {
            applet.showStatus("[APDU] " + message);
        }
    }
    
    /**
     * Output a function call tracing message.
     * 
     * @param message the new output to be processed.
     */
    public void traceCall(String message) {
        if ((outputLevel & TRACE_CALL) != 0) {
            applet.showStatus("[CALL] " + message);
        }
    }
}
