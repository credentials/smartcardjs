package org.ovchip.scjs;

import java.applet.Applet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Console to generate output messages up to a certain level.  
 */
public class Console {

    /**
     * The default output filter that will be applied if the applet parameter 
     * is not specified.
     */
    protected static final String DEFAULT_OUTPUT_FILTER = 
            "FATAL|ERROR|WARNING|INFO";
    
    /**
     * The full output filter that will allow all output to be generated.
     */
    protected static final String FULL_OUTPUT_FILTER = 
            "FATAL|ERROR|WARNING|INFO|LOG|DEBUG|TRACE_APDU|TRACE_CALL";
    
    /**
     * The filter that will be applied to the generated output.
     */
    protected Set<String> outputFilter = new HashSet<String>();
    
    /**
     * The parent (applet) of this Console.
     */
    protected Applet applet;    

    /**
     * Construct a new Console. The output filter will be initialised based on 
     * the applet parameter, if available, otherwise it will get the default
     * value.
     * 
     * @param parent the Applet to which this Console belongs. 
     */
    public Console(Applet parent) {
        applet = parent;
                
        // Set up the level of generated output
        String filter = applet.getParameter("outputFilter");
        if (filter == null) {
            filter = DEFAULT_OUTPUT_FILTER;
        }
        setOutputFilter(filter);
    }
    
    /*************************************************************************
     *** Output filtering                                                  ***
     *************************************************************************/
    
    /**
     * Get the current filter that will be applied to generated output.
     *  
     * @return the current output filter.
     */
    public String getOutputFilter() {
        traceCall("getOutputFilter()");
        
        String filter = "";
        for (String level : outputFilter) {
            filter += "|" + level;
        }
        
        return filter.substring(1);
    }
    
    /**
     * Set a new filter that will be applied to the generated output.
     * 
     * @param filter the new output filter.
     */
    public void setOutputFilter(String filter) {
        traceCall("setOutputFilter(" + filter + ")");
        
        if (filter.toUpperCase().contains("ALL")) {
            filter = FULL_OUTPUT_FILTER;
        }
        
        outputFilter.clear();
        for (String level : filter.split("|")) {
            addOutputLevel(level);
        }
    }
    
    /**
     * Add a new output level to the current output filter.
     * 
     * @param level the new output level to be added to the filter.
     */
    public void addOutputLevel(String level) {
        traceCall("addOutputLevel(" + level + ")");

        outputFilter.add(level.trim().toUpperCase());
    }
    
    /**
     * Remove an output level from the current output filter.
     * 
     * @param level the output level to be removed from the filter.
     */
    public void removeOutputLevel(String level) {
        traceCall("removeOutputLevel(" + level + ")");

        outputFilter.remove(level.trim().toUpperCase());
    }
    
    /**
     * Generate the actual output.
     * 
     * @param level the output level of the message.
     * @param message the message for which output should be generated.
     */
    protected void output(String level, String message) {
        if (outputFilter.contains(level.trim().toUpperCase()) || 
                outputFilter.contains("ALL")) {
            String tag = String.format("%-8S", level.trim());
            String prefix = new SimpleDateFormat(
                    "'[" + tag + " 'HH:mm:ss'] '").format(new Date());
            
            for (String line : message.split("\n")) {
                if (applet != null) {
                    applet.showStatus(prefix + line);
                } else {
                    System.out.println(prefix + line);
                }
            }
        }
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
        output("LOG", message);
    }
    
    /**
     * Output an informative message.
     * 
     * @param message the new output to be processed.
     */
    public void info(String message) {
        output("INFO", message);
    }    

    /**
     * Output a warning message.
     * 
     * @param message the new output to be processed.
     */
    public void warning(String message) {
        output("WARNING", message);
    }

    /**
     * Output an error message.
     * 
     * @param message the new output to be processed.
     */
    public void error(String message) {
        output("ERROR", message);
    }
    
    /**
     * Output a fatal error message.
     * 
     * @param message the new output to be processed.
     */
    public void fatal(String message) {
        output("FATAL", message);
    }

    /**
     * Output a debug message.
     * 
     * @param message the new output to be processed.
     */
    public void debug(String message) {
        output("DEBUG", message);
    }

    /**
     * Output a APDU tracing message.
     * 
     * @param message the new output to be processed.
     */
    public void traceAPDU(String message) {
        output("TRACE_APDU", message);
    }
    
    /**
     * Output a function call tracing message.
     * 
     * @param message the new output to be processed.
     */
    public void traceCall(String message) {
        output("TRACE_CALL", message);
    }
}
