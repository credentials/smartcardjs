package org.ovchip.scjs;

import java.util.EventObject;

/**
 * A Signal is constructed with a reference to the object, the "source", that
 * is logically deemed to be the object which emitted the Signal in question.
 * Furthermore the Signal carries information about the event that occurred and
 * any additional data that might be relevant.
 */
public class Signal extends EventObject {

    private static final long serialVersionUID = 372055270119817802L;

    /**
     * The event for which this Signal was emitted.
     */
    protected String event;
    
    /**
     * The additional data to go with this Signal.
     */
    protected Object[] attributes;
    
    /**
     * Constructs a Signal without any attributes.
     *
     * @param source The object which emitted the Signal.
     * @param event The event for which this Signal was emitted. 
     * @exception IllegalArgumentException if source is null or event is empty.
     */
    public Signal(Object source, String event) {
        super(source);
        
        if (event == null || event == "")
            throw new IllegalArgumentException("empty signal");

        this.event = event;
        this.attributes = new Object[0];
    }
    
    /**
     * Constructs a Signal with some attributes.
     *
     * @param source The object which emitted the Signal.
     * @param event The event for which this Signal was emitted.
     * @param attributes The additional data to go with this Signal. 
     * @exception IllegalArgumentException if source is null or event is empty.
     */
    public Signal(Object source, String event, Object[] attributes) {
        super(source);

        if (event == null || event == "")
            throw new IllegalArgumentException("empty signal");

        this.event = event;
        this.attributes = attributes;
    }
    
    /**
     * The event for which this Signal was emitted.
     * 
     * @return The event for which this Signal was emitted.
     */
    public String getEvent() {
        return event;
    }
    
    /**
     * The additional data to go with this Signal.
     *  
     * @return The additional data to go with this Signal.
     */
    public Object[] getAttributes() {
        return attributes;
    }
    
    /**
     * Returns a String representation of this Signal.
     *
     * @return a String representation of this Signal.
     */
    public String toString() {
        return getClass().getName() + "[source=" + source + 
                "; event=" + event +"; attributes=" + attributes + "]";
    }
}
