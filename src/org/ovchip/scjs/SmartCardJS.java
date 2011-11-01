package org.ovchip.scjs;

import java.applet.Applet;
import java.security.AccessController;
import java.security.PrivilegedActionException;
import java.security.PrivilegedExceptionAction;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.smartcardio.ATR;
import javax.smartcardio.Card;
import javax.smartcardio.CardChannel;
import javax.smartcardio.CardException;
import javax.smartcardio.CardTerminal;
import javax.smartcardio.CardTerminals;
import javax.smartcardio.CommandAPDU;
import javax.smartcardio.ResponseAPDU;
import javax.smartcardio.TerminalFactory;

import netscape.javascript.JSException;
import netscape.javascript.JSObject;

public class SmartCardJS extends Applet {
   
    private static final long serialVersionUID = -4855017287165883462L;

    public static final int ERROR = 1;
    public static final int WARNING = 2;
    public static final int LOG = 4;
    public static final int DEBUG = 8;
    public static final int TRACE_APDU = 16;
    public static final int TRACE_CALL = 32;

    /**
     * 
     */
    private static int outputLevel = ERROR | WARNING | LOG;    
    
    /**
     * JavaScript object which will handle signals emitted by the applet.
     */
    private String jsSignalHandler = "signalHandler";
    
    /**
     * Java object which will handle signals emitted by the applet.
     */
    private SignalHandler javaSignalHandler = new SignalHandler();
    
    private ExecutorService executorService = Executors.newCachedThreadPool();
    
    // Return values for JavaScript calls
    boolean CardIsPresent;
    int NbReaders;
    String CardATR;
    String ApduRsp;
    String ReaderName;
    String ConnectResponse;

    // Class internals
    Card card;    
    CardPoller cardPoller;
    CardTerminal workingReader;
    Thread cardPollerThread = null;
    JSObject jso;

    public SmartCardJS() {
        String parameter;
        // Set up the level of generated output
        parameter = getParameter("outputLevel");
        if (parameter != null) {
            outputLevel = Integer.parseInt(parameter);
        }
        
        // Set up Java Script signal handling
        parameter = getParameter("jsSignalHandler");
        if (parameter != null) {
            jsSignalHandler = parameter;
        }
        
        emit(new Signal(this, "appletConstructed"));
    }

    public int getOutputLevel() {
        traceCall("getOutputLevel()");
        
        return outputLevel;
    }
    
    public void setOutputLevel(int level) {
        traceCall("setOutputLevel(" + level + ")");
        
        outputLevel = level;
    }
    
    public String getJSSignalHandler() {
        traceCall("getJSSignalHandler()");
        
        return jsSignalHandler;
    }
    
    public void setJSSignalHandler(String handler) {
        traceCall("setJSSignalHandler()");
        
        jsSignalHandler = handler;
    }
    
    public void init() {
        traceCall("init()");
        
        try {
            jso = JSObject.getWindow(this);
        } catch(JSException e) {
            e.printStackTrace();
        }
        
        emit(new Signal(this, "appletInitialised"));
    }

    public void start() {
        traceCall("start()");
        
        emit(new Signal(this, "appletStarted"));
    }
    
    public void stop() {
        traceCall("stop()");
        
        killThread();
        
        executorService.shutdown();
        
        emit(new Signal(this, "appletStopped"));
    }

    public void destroy() {
        traceCall("destroy()");
        
        emit(new Signal(this, "appletDestroyed"));    
    }
    
    public void emit(final Signal signal) {
        traceCall("emit(" + signal + ")");
        
        executorService.execute(new Runnable() {
            public void run() { 
                emitJava(signal);
            }
        });
        
        executorService.execute(new Runnable() {
            public void run() {
                emitJS(signal);
            }
        });
    }
    
    public void emitJava(Signal signal) {
        traceCall("emitJava(" + signal + ")");
        
        try {
            javaSignalHandler.handle(signal);
        } catch (Exception e) {
            warning("Failed to emit " + signal + " due to a JSException: " + e.getMessage());
        }
    }
    
    public void emitJS(Signal signal) {
        traceCall("emitJS(" + signal + ")");
        
        try {
            ((JSObject) jso.getMember(jsSignalHandler)).call("handle", new Object[]{signal});
        } catch (JSException e) {
            warning("Failed to emit " + signal + " due to a JSException: " + e.getMessage());
        }
    }
        
    public void killThread() {
        if(cardPollerThread != null && cardPollerThread.isAlive()) {
            Thread t = cardPollerThread;
            cardPollerThread = null;
            t.interrupt();
        }
    }
    
    public void cardPresent() {
        jso.call("RefreshCardState", new String[0]);
        killThread();
        
        try {
            cardPoller = new CardPoller(workingReader, CardPoller.POLL_FOR_ABSENT);
            cardPollerThread = new Thread(cardPoller);
            cardPollerThread.start();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void cardAbsent() {
        jso.call("RefreshCardState", new String[0]);
        killThread();
        
        try {
            cardPoller = new CardPoller(workingReader, CardPoller.POLL_FOR_PRESENT);
            cardPollerThread = new Thread(cardPoller);
            cardPollerThread.start();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
    public boolean IsCardPresent() {
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    try {
                        CardIsPresent = workingReader.isCardPresent();
                    } catch(CardException e) {
                        e.printStackTrace();
                    }
                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return CardIsPresent;
    }

    public String SetReader(String newName) {
        final String NewReaderName = newName;
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    TerminalFactory factory = TerminalFactory.getDefault();
                    CardTerminals terminalList = factory.terminals();
                    workingReader = terminalList.getTerminal(NewReaderName);

                    try {
                        if(workingReader.isCardPresent()) {
                             cardPresent();
                        } else {
                                cardAbsent();
                        }
                    } catch(CardException e1) {
                        e1.printStackTrace();
                    }

                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return workingReader.getName();
    }

    public void Disconnect(boolean reset) {
        final boolean ResetChoice = reset;
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    try {
                        card.disconnect(ResetChoice);
                    } catch(CardException e) {
                        e.printStackTrace();
                    }
                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
    }

    public String TransmitString(String ApduIn) {
        final String ApduCmd = ApduIn;
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    CardChannel comm = card.getBasicChannel();
                    CommandAPDU getData = new CommandAPDU(SmartCardJS.hexStringToByteArray(ApduCmd));
                    try {
                        ResponseAPDU resp = comm.transmit(getData);
                        ApduRsp = SmartCardJS.byteArrayToHexString(resp.getBytes());
                    } catch(CardException e) {
                        e.printStackTrace();
                        ApduRsp = (new StringBuilder("Exception ")).append(e.getMessage()).toString();
                    }
                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return ApduRsp;
    }

    public String TransmitArray(byte ApduIn[]) {
        final byte ApduCmd[] = ApduIn;
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    CardChannel comm = card.getBasicChannel();
                    CommandAPDU getData = new CommandAPDU(ApduCmd);
                    try {
                        ResponseAPDU resp = comm.transmit(getData);
                        ApduRsp = SmartCardJS.byteArrayToHexString(resp.getBytes());
                    } catch(CardException e) {
                        e.printStackTrace();
                        ApduRsp = (new StringBuilder("Exception ")).append(e.getMessage()).toString();
                    }
                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return ApduRsp;
    }

    public int GetReaderCount() {
        NbReaders = 0;
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    try {
                        TerminalFactory factory = TerminalFactory.getDefault();
                        CardTerminals terminalList = factory.terminals();
                        NbReaders = terminalList.list().size();
                    } catch(CardException e) {
                        e.printStackTrace();
                    }
                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return NbReaders;
    }

    public String GetReaderName(int readerIndex) {
        final int Index = readerIndex;
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    try {
                        TerminalFactory factory = TerminalFactory.getDefault();
                        CardTerminals terminalList = factory.terminals();
                        ReaderName = ((CardTerminal)terminalList.list().get(Index)).getName();
                    } catch(CardException e) {
                        e.printStackTrace();
                    }
                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return ReaderName;
    }

    public String GetATR() {
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Boolean>() {
                public Boolean run() {
                    try {
                        Card card = workingReader.connect("*");
                        ATR atr = card.getATR();
                        CardATR = SmartCardJS.byteArrayToHexString(atr.getBytes());
                    } catch(CardException e) {
                        e.printStackTrace();
                    }
                    return Boolean.valueOf(true);
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return CardATR;
    }

    public String Connect(String protocol) {
        final String Protocol_str = protocol;
        try {
            AccessController.doPrivileged(new PrivilegedExceptionAction<Integer>() {
                public Integer run() {
                    try {
                        card = workingReader.connect(Protocol_str);
                        if(card != null)
                            ConnectResponse = "";
                    } catch(CardException e) {
                        e.printStackTrace();
                        try {
                            if(workingReader.isCardPresent()) {
                                ConnectResponse = "Cannot connect card, try with another protocol";
                            } else {
                                ConnectResponse = "Put a card in the terminal before connecting";
                            }
                        } catch(CardException e1) {
                            e1.printStackTrace();
                        }
                    }
                    return null;
                }
            });
        } catch(PrivilegedActionException e) {
            e.printStackTrace();
        }
        return ConnectResponse;
    }

    static String byteArrayToHexString(byte bArray[]) {
        StringBuffer buffer = new StringBuffer();
        for(int i = 0; i < bArray.length; i++) {
            buffer.append(String.format(" %02X", bArray[i]));
        }
        return buffer.toString().toUpperCase();
    }

    public static byte[] hexStringToByteArray(String s) {
        s = s.replace(" ", "");
        int len = s.length();
        byte data[] = new byte[len / 2];
        for(int i = 0; i < len; i += 2) {
            data[i / 2] = (byte)((Character.digit(s.charAt(i), 16) << 4) + 
                    Character.digit(s.charAt(i + 1), 16));
        }

        return data;
    }

    class CardPoller implements Runnable {
        
        public static final boolean POLL_FOR_PRESENT = false;
        public static final boolean POLL_FOR_ABSENT = true;
        private static final long POLL_INTERVAL = 250;
        
        CardTerminal terminal;
        boolean pollType = POLL_FOR_PRESENT;
        long pollInterval = POLL_INTERVAL;

        public CardPoller(CardTerminal reader, boolean type, long interval) {
            terminal = reader;
            pollType = type;
            pollInterval = interval;
        }

        public CardPoller(CardTerminal reader, boolean type) {
            terminal = reader;
            pollType = type;
        }

        public void run() {
            try {
//                while(pollType ^ terminal.isCardPresent()) {
//                    Thread.sleep(pollInterval);
//                }
                if (pollType == POLL_FOR_PRESENT) {
                    terminal.waitForCardPresent(0L);
                } else { // pollType == POLL_FOR_ABSENT
                    terminal.waitForCardAbsent(0L);
                }
                
                if (pollType == POLL_FOR_PRESENT) {
                    executorService.execute(new Runnable() {
                        public void run() {
                            cardPresent();
                        }
                    });
                } else { // pollType == POLL_FOR_ABSENT
                    executorService.execute(new Runnable() {
                        public void run() {
                            cardAbsent();
                        }
                    });
                }
            } catch(CardException ce) { 
            }
        }
    }

    /*
     * Output functionality
     */
    
    public void log(String message) {
        if ((outputLevel & LOG) != 0) {
            showStatus("[LOG] " + message);
        }
    }
    
    public void warning(String message) {
        if ((outputLevel & WARNING) != 0) {
            showStatus("[WARNING] " + message);
        }
    }

    public void error(String message) {
        if ((outputLevel & ERROR) != 0) {
            showStatus("[ERROR] " + message);
        }
    }

    public void debug(String message) {
        if ((outputLevel & DEBUG) != 0) {
            showStatus("[DEBUG] " + message);
        }
    }

    public void traceAPDU(String message) {
        if ((outputLevel & TRACE_APDU) != 0) {
            showStatus("[APDU] " + message);
        }
    }
    
    public void traceCall(String message) {
        if ((outputLevel & TRACE_CALL) != 0) {
            showStatus("[CALL] " + message);
        }
    }
}
