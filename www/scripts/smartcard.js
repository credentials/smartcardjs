/**
 * @fileOverview SmartCardJS jQuery-plugin
 * @author Pim Vullers
 * @required deployJava.js
 * @requires jquery.js
 */

/**
 * Singleton class for the SmartCardJS Applet.
 *
 * @class
 */
var SmartCardJS = (function() {

    /**
     * Antwort auf die Funktion getUserCardList
     * @event
     * @name SmartCardJS#owokUserCardListReady
     * @param {String} cardlist
     */

    /**
     * Eine Karte wurde aus einem Kartenleser entfernt
     * @event
     * @name SmartCardJS#owokCardWasRemoved
     */

    /**
     * Informationen über die Karte
     * @event
     * @name SmartCardJS#owokUserCardInfoReady
     * @param {JSON} card_data card_data.user_id und card_data.card_info, card_info ist wiederum ein JSON Objekt mit weiteren Daten
     */

    /**
     * Karte wurde erfolgreich zurückgesetzt
     * @event
     * @name SmartCardJS#owokCardWasReseted
     */

    /**
     * PIN Eingabe über Kartenleser abgebrochen
     * @event
     * @name SmartCardJS#owokPinCanceled
     * @param {String} errorcode Grund des Abbruchs
     */

    /**
     * Eine Karte wurde erfolgreich registriert
     * @event
     * @name SmartCardJS#owokCardRegisterSuccess
     */

    /**
     * Fehler beim Registrieren der Karte
     * @event
     * @name SmartCardJS#owokCardRegisterFail
     * @param {String} errorcode
     */

    /**
     * Eine Karte wurde erfolgreich gelöscht
     * @event
     * @name SmartCardJS#owokCardDeleteSuccess
     */

    /**
     * Fehler beim Löschen der Karte
     * @event
     * @name SmartCardJS#owokCardDeleteFail
     * @param {String} errorcode
     */

    /**
     * Bei Beginn der PIN Eingabe
     * @event
     * @name SmartCardJS#owokPinEntryStart
     */

    /**
     * Login über Light Card ist fehlgeschalgen
     * @event
     * @name SmartCardJS#owokLightLoginFailed
     * @param {String} errorcode
     */

    /**
     * Eine Light Card wurde in einen Kartenleser gesteckt
     * @event
     * @name SmartCardJS#owokLightCardWasInserted
     */

    /**
     * Optionsparameter, können von außerhalb gesetzt werden.
     */
    var options = {
        minimumVersion: '1.6',
        scjsPath: '',
        outputFilter: 'ALL',
        debug: true
    };


    /**
     * Das SCJS Card Plugin Object für die Kommunikation mit der Karte
     */
    var applet = $('<object></object>');

    var unsafe_pin = '';

    var secure_ctl = 0;

    var is_card_ready = false;   // gibt an ob die Karte noch im Leser steckt


    /**
     * Der Leser, in dem die Karte steckt, mit der über connectCard eine Verbindung aufgebaut wurde.
     */
    var connectedReaderName = '';


    /**
     * Schreibt Debug Ausgaben in die Browser Console, wenn Debug Modus aktiv
     */
    function log(message){
        if(options.debug==true) {
            if(window.console) {
                if (window.console.debug)
                    window.console.debug(message);
                else if (window.console.log) {
                    window.console.log(message);
                }
            }
        }
    }


    /**
     * Utility Funktionen kommen hier rein!
     * @class SmartCardJS#utils
     */
    var utils = {

        /**
         * Leifert einen Teil eine Hex-Strings zurück
         * @param {hexstring} hexStr
         * @param {string} startPos
         * @param {string} len
         * @return {string} subHexStr
         * @function
         */
        stripBytes: function(hexStr, startPos, len) {
            return hexStr.substring(startPos*3, startPos*3+len*3-1);
        },


        /**
         * Ein Byte aus einem Hex-String holen
         * @param {hexstring} hexStr
         * @param {int} idx Das idx-ste Byte
         * @return {hexstring} Wert an Stelle idx
         * @function
         */
        getByte: function(hexStr, idx) {
            return hexStr.substring(idx*3, idx*3+2);
        },

        /**
         * Ein Byte aus einem Hex-String holen
         * @param {hexstring} hexStr
         * @param {int} idx Das idx-ste Byte
         * @return {int} Wert an Stelle idx
         * @function
         */
        getByteAsInt: function(hexStr, idx) {
            var hex = this.getByte(hexStr, idx);
            return parseInt(hex, 16);
        },

        /**
         * Hängt ein Byte an einen Hex-String an
         * @param {hexstring} hexStr
         * @param {int} byteToAdd
         * @return {hexstring}
         * @function
         */
        addByte: function(hexStr, byteToAdd) {
            var byteToAdd = byteToAdd.toString(16);
            if (byteToAdd.length == 1)
                byteToAdd = "0" + byteToAdd;
            return hexStr +" "+ byteToAdd;
        },

        /**
         * Gibt die Länge eines Hex-Strings zurück
         * @param {hexstring} cmd
         * @param {int} offset Ab dem wievielten Byte gezählt werden soll
         * @return {byte} cmdLen Als Hex Wert
         * @function
         */
        getHexCommandLength: function(cmd, offset) {
            if (!offset) offset = 0;
            var cmdLen = ((cmd.length+1)/3) + offset;
            cmdLen = cmdLen.toString(16);
            if (cmdLen.length==1) cmdLen = '0'+cmdLen;
            return cmdLen;
        },

        /**
         * Erstellt ein APDU Command
         * @param {hexstring} cmd
         * @param {hexstring} data
         * @return {hexstring} tlv
         * @function
         */
        getApduCommand: function(cmd, data) {
            var lc = utils.getHexCommandLength(data);
            return cmd + " " + lc + " " + data;
        },

        /**
         * Perform Verification Command für PIN-Eingabe.
         * Wenn der Kartenleser keine sichere PIN-Eingabe unterstützt
         * wird hier ein js prompt für eine unsichere Eingabe aufgerufen.
         * @param {hexstring} tlv
         * @return {hexstring} pvCommand
         * @function
         */
        performVerification: function(tlv) {
            var cmdLen = utils.getHexCommandLength(tlv, 4);
            var valueLen = utils.getHexCommandLength(tlv, 2);
            var cmd = "20 18 01 00 " + cmdLen + " 52 " + valueLen + " 01 08 " + tlv;
            // prüft, ob der Leser sichere PIN Eingabe unterstützt
            var ctl = utils.getPcScFeatureCtrlCode(SmartCardJS.FEATURE_MCT_READER_DIRECT);
            if (ctl==0) {
                alert("Noch nicht verfügbar.");
                return;
            }else {
                return applet.SendIOCTL(ctl, 1, cmd);
            }

            // prüft, ob der Leser sichere PIN Eingabe unterstützt
//            var ctl = utils.getPcScFeatureCtrlCode(SmartCardJS.FEATURE_MCT_READER_DIRECT);
//            if (ctl==0) {
                // Der Kartenleser unterstützt keine sichere PIN Eingabe

//                var mypin = prompt("Bitte Geheimzahl eingeben.", "");
//                if (!mypin || mypin.length==0) {
//                    return '64 01'; // PIN Eingabe abgebrochen
//                }
//                mypin = utils.convertStringToHexPin(mypin, '60', '10');
//                cmd = tlv.replace(SmartCardJS.PIN_PLACEHOLDER, mypin);
//                return applet.SendToCard(cmd);

//            } else {
//                // sichere PIN Eingabe mit Kartenleser
//                return applet.SendIOCTL(ctl, 1, cmd);
//            }
        },


        /**
         * @param {string} ASCII-String
         * @return {hexstring} str
         * @function
         */
        convertStringToHex: function(str) {
            var res = '';
            for (var i=0; i<str.length; i++) {
                res = utils.addByte(res, str.charCodeAt(i));
            }
            return res;
        },


        /**
         * Die Ausführung des Skripts für ein paar Millisekunden unterdrücken
         * @param {int} ms Zeit in Millisekunden
         * @function
         */
        sleep: function(ms) {
            var start = new Date().getTime();
            while (new Date() < start + ms) {}
            return 0;
        },


        /**
         * Wandelt eine PIN in ASCII Format in eine Hex PIN um.
         * Ist die PIN kürzer als die maximale Länge wird mit '00' aufgefüllt
         * @param {string} ASCII-String
         * @param {string} pinTypHex
         * @param {string} pinLenHex
         * @return {hexstring} PIN als Hexstring
         * @function
         */
        convertStringToHexPin: function(str, pinTypHex, pinLenHex) {
            var res = ''+pinTypHex+' '+pinLenHex;
            var pinLen = parseInt(pinLenHex, 16);
            for (var i=0; i<pinLen; i++) {
                if (i < str.length) {
                    res = utils.addByte(res, str.charCodeAt(i));
                } else {
                    res += ' 00'; // den Rest mit Nullen auffüllen
                }
            }
            return res;
        },

        /**
         * PC/SC Feature Control Code
         * @param {hexstring} featureId
         * @return {int} ctl Control Code
         * @function
         */
        getPcScFeatureCtrlCode: function(featureId) {
            //return 0;
            var ctl = 0;
            var features = applet.SendIOCTL(3400, 0, "");
            //log('getPcScFeatureCtrlCode <'+features+'>');
            if (!features || features.length < 6) {
                return ctl;
            }
            for (var i=0; i<features.length; i=i+(6*3)) {
                var t = features.substring(i, i+2);
                var len = features.substring(i+3, i+5); // müsste immer 4 sein
                len = parseInt(len, 16);
                var v = features.substring(i+6, i+6+len*3); // die 4 Bytes
                if (t == featureId) {
                    // nach int32 konvertieren
                    // in umgekehrter Reihenfolge, little-endian zu big-endian
                    for (var s=len-1; s>=0; s--) {
                        // das Byte an stelle s als int mal 2 hoch 0 8 16 24
                        ctl += utils.getByteAsInt(v, s) * Math.pow(2, 8*(len-1-s));
                    }
                }
            }
            secure_ctl = ctl;
            return ctl;
        }


    };


    var _self = {

        PIN_PLACEHOLDER: "60 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
        PIN_NEW_PLACEHOLDER: "61 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
        SW_OK: "90 00",
        LIGHT_CARD_VERSION: "FF 00",
        SELECT_OCA_COMMAND: "00 A4 04 00 08 27 60 00 12 1F 00 00 01",
        FEATURE_MCT_READER_DIRECT: "08",
        DEFAULT_AKEY_INFO: "08 00",

        CARD_STATUS_NO_CARD: -1,
        CARD_STATUS_READY: 0,
        CARD_STATUS_INITIALIZED: 1,
        CARD_STATUS_LOCKED: 2,
        CARD_STATUS_FACTORY: 3,

        CARD_NO_DESC_STRING: "Unknown",

        CARD_CONNECT_TIMEOUT_MS: 3000,

        /**
         * Das SCJS Object auf der Seite einbinden
         * und die Events registrieren.
         * @name run
         * @member SmartCardJS
         * @function
         */
        run: function(user_options) {
        	// Merge the provided options with the defaults
            $.extend(options, user_options);
            
            // Create applet HTML and include in the document
            if($("#SmartCardJS").length==0) {
            	// Check whether there is a Java plugin available
            	if (AppletJS.checkVersion(options.minimumVersion)) {
            		$(SmartCardJS).trigger('pluginFound');
            		
                    var html_plugin_element = this.createHTMLPluginObject();
                    $('body').append( html_plugin_element );
                    applet = $("#SmartCardJS")[0];
                    
                    // Check whether the applet has properly loaded
                    if (SmartCardJS.open()) {
                        SmartCardJS.enableEvents();
                        SmartCardJS.bindEvents();
                        $(SmartCardJS).trigger('appletReady');
                    } else {
                        $(SmartCardJS).trigger('appletNotFound');
                    }
            	} else {
            		SmartCardJS.forceBrowserToProvidePlugin();
                    $(SmartCardJS).trigger('pluginNotFound');            		
            	}
            }
        },
        
        restart: function() {
        	if (SmartCardJS.open()) {
                SmartCardJS.enableEvents();
                $(SmartCardJS).trigger('appletReady');
            }
        },

        
        /**
         * Dispatch an incoming signal to the event handling mechanism
         * 
         * @name dispatch
         * @member SmartCardJS
         * @function
         */
        dispatch: function(signal) {
            $(SmartCardJS).trigger(signal.getEvent(), signal.getAttributes());
        },

        /**
         * Enable the event handling mechanism
         * 
         * @name enableEvents
         * @member SmartCardJS
         * @function
         */
        enableEvents: function() {
            if (typeof applet.run != 'undefined')
                return applet.enableSignals('SmartCardJS');
        },


        /**
         * Disable the event handling mechanism
         * 
         * @name disableEvents
         * @member SmartCardJS
         * @function
         */
        disableEvents: function() {
            if (typeof applet.run != 'undefined')
                return applet.disableSignals();
        },


        /**
         * Registriert die SCJS Events mit den entsprechenden Funktionen
         * @name bindEvents
         * @member SmartCardJS
         * @function
         */
        bindEvents: function() {
            // Reader Events
        	$(SmartCardJS).bind("terminalAdded", function(data) { $(SmartCardJS).trigger("readerAdded", data) });
        	$(SmartCardJS).bind("terminalRemoved", function(data) { $(SmartCardJS).trigger("readerRemoved", data) });
            //this.bindSCJSEvent("OnReaderAdded", function(data) {SmartCardJS.registerCardReader(data);} );
            //this.bindSCJSEvent("OnReaderRemoved", function(data) {SmartCardJS.unregisterCardReader(data);} );
            // Card Events
        	//$(SmartCardJS).bind("cardInserted")
            this.bindSCJSEvent("OnCardReady", function(data) {SmartCardJS.onCardReady(data);} );
            this.bindSCJSEvent("OnCardInuse", function(data) {SmartCardJS.onCardInuse(data);} );
            this.bindSCJSEvent("OnCardUnused", function(data) {SmartCardJS.onCardUnused(data);} );
            this.bindSCJSEvent("OnCardRemoved", function(data) {SmartCardJS.onCardRemoved(data);} );
            this.bindSCJSEvent("OnCardError", function(data) {SmartCardJS.onCardError(data);} );
        },


        /**
         * Bildet ein Event an das SCJS Object
         * @name bindSCJSEvent
         * @member SmartCardJS
         * @param type Name des Events
         * @param eventHandle Callback Funktion
         * @function
         */
        bindSCJSEvent: function(type, eventHandle) {
            $(applet).each(function(index, elem) {
            	if ( elem.attachEvent ) { // Finde heraus, ob es sich um einen IE handelt, der diese Methode unterstützt,
            		elem.attachEvent( type, eventHandle ); // wenn ja binde Event
            	} else { // ansonsten binde mit der default methode
            		elem[type] = eventHandle;
            	}
            });
            return this;
        },

        createHTMLPluginObject: function() {
            var attributes = {
                id : "SmartCardJS",
                code :"org.ovchip.scjs.SmartCardJS",
                width : 1,
                height : 1
            };
            var parameters = {
                jnlp_href : "smartcardjs.jnlp",
                outputFilter : options.outputFilter
            };
            var startApplet = '<' + 'applet ';
            var params = '';
            var endApplet = '<' + '/' + 'applet' + '>';
            var addCodeAttribute = true;

            for (var attribute in attributes) {
                startApplet += (' ' +attribute+ '="' +attributes[attribute] + '"');
                if (attribute == 'code' || attribute == 'java_code') {
                    addCodeAttribute = false;
                }
            }
        
            if (parameters != 'undefined' && parameters != null) {
                var codebaseParam = false;
                for (var parameter in parameters) {
                    if (parameter == 'codebase_lookup') {
                        codebaseParam = true;
                    }
                    // Originally, parameter 'object' was used for serialized 
                    // applets, later, to avoid confusion with object tag in IE
                    // the 'java_object' was added.  Plugin supports both.
                    if (parameter == 'object' || parameter == 'java_object') {
                        addCodeAttribute = false;
                    }
                    params += '<param name="' + parameter + '" value="' + 
                        parameters[parameter] + '"/>';
                }
                if (!codebaseParam) {
                    params += '<param name="codebase_lookup" value="false"/>';
                }
            }

            if (addCodeAttribute) {
                startApplet += (' code="dummy"');
            }
            startApplet += '>';

            return startApplet + '\n' + params + '\n' + endApplet;
        },
        
        installJava: function() {
        	deployJava.returnPage = document.location;
        	deployJava.installLatestJRE();
        	deployJava.refresh();
            location.href = document.location;
            SmartCardJS.run();
        },
        
        forceBrowserToProvidePlugin: function() {
            var isLinux = false;
            var isMac = false;
            var isWin = false;
            var isMsie = false;
            var isMoz = false;
            var isFirefox = false;
            var isSafari = false;
            $.getScript( options.scjsPath + "scripts/lib/jquery-browser.min.js",
                function () {
                    isLinux = $.browserExtended.linux();
                    isMac = $.browserExtended.mac();
                    isWin = $.browserExtended.win();
                    isMsie = $.browserExtended.msie();
                    isMoz = $.browserExtended.mozilla();
                    isFirefox = $.browserExtended.firefox();
                    isSafari = $.browserExtended.safari();

                    if (isLinux) {
                        // only manual install is possible, so we cannot force

                    } else if (isMac) {
                        // Apple supplies their own version of Java, so we cannot force

                    } else { // Windows                    	
                    	// FIXME: TODO: check what the correct locations are for windows.
                        if (isMsie) {
                            //location.href = options.OwokPath + 'plugins/rsct_owok_ie-2002.exe';

                        } else if (isFirefox) {
                            try {
                                if ( InstallTrigger.enabled() ) {
                                    InstallTrigger.startSoftwareUpdate(options.OwokPath + options.PluginFilenameWinNpapi );
                                }
                            } catch (e){
                                location.href = options.OwokPath + options.PluginFilenameWinNpapi;
                            }
                            //options.OwokPath + options.PluginFilenameWinNpapi
                            //InstallTrigger.install(xpWFc6LnXUi);

                        } else {
                            //location.href = options.OwokPath + 'plugins/rsct_owok_npapi_windows-2002.exe';
                        }
                    }
            });
        },

        /**
         * Feuert ein owokOnReaderRegistered Event, dass ein Kartenleser angeschlossen wurde
         * @name registerCardReader
         * @member SmartCardJS
         * @function
         */
        registerCardReader: function(readerName) {
            $(this).trigger('owokOnReaderRegistered', [readerName]); // fire Event
        },


        /**
         * Feuert ein owokOnReaderUnregistered Event
         * @name unregisterCardReader
         * @member SmartCardJS
         * @function
         */
        unregisterCardReader: function(readerName) {
            $(this).trigger('owokOnReaderUnregistered', [readerName]); // fire Event
        },

        /**
         * Wird aufgerufen, wenn eine Karte in einen Kartenleser gesteckt wird.
         * Initialisiert die Kommunikation mit der Karte und stellt fest,
         * ob es sich um eine Smart Card oder Light Card handelt
         * @name onCardReady
         * @member SmartCardJS
         * @param readerName
         * @function
         */
        onCardReady: function(readerName) {
            // connect to card
            log('Connecting Card '+readerName);
            is_card_ready = true;

            var rsp = SmartCardJS.connectCardEx(readerName, 1, 3); // ShareMode 1 = Exklusice Verbindung; PreferredProtocol=3 ist t=0 | t=1

            if (rsp!=0) {
            	if ( applet.GetLastErrorCode() == -2146435061 ) {
                    $(SmartCardJS).trigger("owokAlertMessage", [SmartCardJS.getErrorText(applet.GetLastErrorCode())]);
                    $(SmartCardJS).trigger("owokCardAlreadyInUse", []);
                    return;
                }
            }

            if (!SmartCardJS.selectOCA()) {
                // kein OCA? Dann ist es vielleicht eine Light Card
                if (SmartCardJS.isOwokLightCard()) {
                    // SCJS Light Karte gefunden
                    SmartCardJS.disConnectCardEx(readerName, 1);
                    rsp = SmartCardJS.connectCardEx(readerName, 1, 3);
                    if (rsp!=0) {
                        $(SmartCardJS).trigger("owokAlertMessage", ["Bitte Karte neu legen."]);
                        return;
                    }
                    setTimeout(function() {
                        log('Light Card in '+readerName);
                        SmartCardJS.insertLightCard();
                    }, 100);
                } else {
                    // Ganz falsche Karte
                    $(SmartCardJS).trigger('owokSmartcardWasInserted', ['', SmartCardJS.CARD_STATUS_NO_CARD]);
                }
                return;
            }
            this.insertSmartcard();

        },


        /**
         * Wird vom OnCardInuse Event aufgerufen
         * @name onCardInuse
         * @member SmartCardJS
         * @param readerName
         * @function
         */
        onCardInuse: function(readerName) {
            log('OnCardInuse');
            //$(SmartCardJS).trigger("owokCardAlreadyInUse", []);
        },

        /**
         * Wird vom OnCardUnused Event aufgerufen
         * @name onCardUnused
         * @member SmartCardJS
         * @param readerName
         * @function
         */
        onCardUnused: function(readerName) {
            log('OnCardUnused');
        },

        /**
         * Wird vom OnCardRemoved Event aufgerufen
         * @name onCardRemoved
         * @member SmartCardJS
         * @param readerName
         * @function
         */
        onCardRemoved: function(readerName) {
            log('OnCardRemoved');
            is_card_ready = false;
            if ($.modal) $.modal.close();
            if (this.disConnectCardEx(readerName, 1)==0) {
                $(this).trigger("owokCardWasRemoved");
            }
            $(document).trigger('meincockpit.owokCardWasRemoved');
        },

        /**
         * Wird aufgerufen, wenn der Kartenleser ein Fehlerevent meldet.
         * Schreibt den Fehlertext in die Debug Console
         * @name onCardError
         * @member SmartCardJS
         * @param readerName
         * @function
         */
        onCardError: function(readerName) {
            log("Karte in "+readerName+" meldet Fehler: "+this.getErrorText(this.getLastErrorCode()));
        },


        /**
         * Öffnet die Verbindung zur Karte
         * @name open
         * @return {boolean} success
         * @member SmartCardJS
         * @function
         */
        open: function() {
            try {
                if (typeof applet.run != 'undefined')
                    return applet.run();
            } catch (e) {
                return false;
            }
            return false;
        },



        /**
         * Die  Funktion  stellt  eine  Verbindung  mit  der  Karte  mittels  der  PC/SC  Funktion
         * SCardConnect her.
         * @param {int} readerName Der Name des Lesers, in dem die Karte steckt.
         * @param {int} shareMode
         * @return {int} Status der Karte
         * @name connectCard
         * @member SmartCardJS
         * @function
         */
        connectCard: function(readerName, shareMode) {
            var response;

            // Für die alte Version des Plugins
            // Den Connect mehrmals versuchen, weil es sein kann, dass zB Windows 7 die Karte blockt

            var i = 0;
            while ( (response = applet.ConnectCard(readerName, shareMode)) != 0 && i < 15 && is_card_ready) {
                utils.sleep(200);
                log('try connect card '+i+' '+response);
                i++;
            }
            log('ConnectCard '+i+' '+response);

            if (response == 0) {
                connectedReaderName = readerName;
            } else {
                // Hier blockt meistens eine andere App die exklusive Verbindung zur Karte
                alert( SmartCardJS.getErrorText(applet.GetLastErrorCode()) );
            }

            return response;
        },


        /**
         * Die  Funktion  stellt  eine  Verbindung  mit  der  Karte  mittels  der  PC/SC  Funktion
         * SCardConnect her. Es  kann  im  Gegensatz  zu  ConnectCard  zusätzlich  das  gewünschte Protokoll gesetzt werden.
         * @param {string} readerName Der Name des Lesers in dem die Karte steckt.
         * @param {int} shareMode
         * @param {int} preferredProtocols
         * @return {int} Status der Karte
         * @name connectCardEx
         * @member SmartCardJS
         * @function
         */
        connectCardEx: function(readerName, shareMode, preferredProtocols) {
            var response;

            // Für die alte Version des Plugins
            // Den Connect mehrmals versuchen, weil es sein kann, dass zB Windows 7 die Karte blockt
            if ( applet.GetVersion(0) == '2.0.0.0' ) {

                var i = 0;
                while ( (response = applet.ConnectCardEx(readerName, shareMode, preferredProtocols)) != 0 && i < 15 && is_card_ready) {
                    utils.sleep(200);
                    log('try connect card ex '+i+' '+response);
                    i++;
                }
                log('ConnectCardEx '+i+' '+response);


            } else {
                // ab Version 2.0.0.1
                response = applet.ConnectCardEx(readerName, shareMode, preferredProtocols, SmartCardJS.CARD_CONNECT_TIMEOUT_MS);
            }

            if (response == 0) {
                connectedReaderName = readerName;
            } else {
                // Hier blockt meistens eine andere App die exklusive Verbindung zur Karte
                // showAlertOk( SmartCardJS.getErrorText(applet.GetLastErrorCode()) );
            }

            return response;
        },


        /**
         * Um eine der nachfolgen Funktionen nutzen zu können, muss zuerst das OCA selektiert werden.
         * Dies erfolgt über das ISO 7816-4 konforme Kommando SELECT by AID.
         * @return Ist das OCA auf der Karte geladen, so wird SW_OK zurückgeliefert.
         * @name selectOCA
         * @member SmartCardJS
         * @function
         */
        selectOCA: function() {
            var response = applet.SendToCard(this.SELECT_OCA_COMMAND);
            return this.checkResponse(response);
        },


        /**
         * Holt den aktuellen LifeCycle-Status einer SCJS Smartcard
         * @example Status:
         *         -1: keine Karte vorhanden
         *         0: ready
         *         1: initialized
         *         2: locked
         * @return {int} Status
         * @name getCardLifeCycle
         * @member SmartCardJS
         * @function
         */
        getCardLifeCycle: function() {
            var response = applet.SendToCard("B2 10 01 02 00").toUpperCase();

            if (response == "10 01 00 90 00")
                return this.CARD_STATUS_READY;

            if (response == "10 01 01 90 00")
                return this.CARD_STATUS_INITIALIZED;

            if (response == "10 01 FF 90 00")
                return this.CARD_STATUS_LOCKED;

            return this.CARD_STATUS_NO_CARD;
        },


        /**
         * Gibt den Namen der aktuell aktiven Kartenlesers zurück,
         * also der Leser, in dem die Karte steckt, von der aktuell
         * gelesen wird.
         * @return {string} connectedReaderName
         * @name getConnectedReaderName
         * @member SmartCardJS
         * @function
         */
        getConnectedReaderName: function() {
            return connectedReaderName;
        },


        /**
         * Die Funktion liefert eine Liste aller angeschlossenen Kartenleser.
         * @return {string} Die Funktion liefert alle angeschlossenen Leser als String. Die einzelnen Lesernamen sind durch eine CR/LF (#13#10) getrennt.
         * @name getReaderList
         * @member SmartCardJS
         * @function
         */
        getReaderList: function() {
            return applet.getReaderList();
        },


        /**
         * Eine Liste aller angeschlossenen Kartenleser als Array
         * @return {array} Kartenlesernamen
         * @name getReaderListArray
         * @member SmartCardJS
         * @function
         */
        getReaderListArray: function() {
            var readerList = this.getReaderList();

            if(readerList.length < 1)
                return new Array();

            var readerListArray = readerList.split('\n');
            return readerListArray;
        },

        /**
         * Die Funktion liefert eine Liste aller angeschlossenen Kartenleser.
         * @return {string} Die Funktion liefert alle angeschlossenen Leser als String. Die einzelnen Lesernamen sind durch eine CR/LF (#13#10) getrennt.
         * @name getReaderList
         * @member SmartCardJS
         * @function
         */
        getCardList: function() {
            return applet.getCardList();
        },


        /**
         * Eine Liste aller angeschlossenen Kartenleser als Array
         * @return {array} Kartenlesernamen
         * @name getReaderListArray
         * @member SmartCardJS
         * @function
         */
        getCardListArray: function() {
            var cardList = this.getCardList();

            if(cardList.length < 1)
                return new Array();

            var cardListArray = cardList.split('\n');
            return cardListArray;
        },


        /**
         * Wenn Auto Logout aktiv ist, wird hier an die Logout Seite der Client App weitergeleitet
         * @name logout
         * @member SmartCardJS
         * @function
         */
        logout: function() {
            if (options.AutoLogout == 1) {
                location.href = options.LogoutActionURL;
            }
        },


        /**
         * Startet den Login mit einer SCJS Smartcard.
         * Erstellt eine Session auf dem OAS...
         * Login mit Smartcard Schritt 2: Session ID mit PIN über den Kartenleser verschlüsseln
         * und an den Server senden
         * @name loginOwokCard
         * @member SmartCardJS
         * @function
         */
        loginOwokCard: function(auto_logout, isGenericCall) {
            // nur initialisierte Karten dürfen sich einloggen
            if(this.getCardLifeCycle() != this.CARD_STATUS_INITIALIZED)
                return;

            $(SmartCardJS).trigger('owokPinEntryStart', []);

            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': 'OsiSessionCreate', 'param': {}},
               dataType: "json",
               error: function() {log("Anwendungsfehler in "+options.OwokPath+options.ClientRequestScript+"!");},
               success: function( response )
               {
                    // Schritt 2
                    log(response);
                    //response = $.parseJSON(response);
                    var sid = response.SID;

                    var ctl = utils.getPcScFeatureCtrlCode(SmartCardJS.FEATURE_MCT_READER_DIRECT);

                    if (ctl==0) {
                        // Unsichere Pin Eingabe
                        SmartCardJS.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_entry.php", "20%",
                            "javascript:SmartCardJS.signDataModal('"+auto_logout+"', '"+sid+"')", isGenericCall);
                    } else {
                        // Sichere Pin Eingabe über Kartenleser
                        var signedData = SmartCardJS.signData(sid);  // hier starten die PIN Eingabe über den Leser
                        log('signed data <'+signedData+'>');
                        SmartCardJS.loginOwokCardStep2(auto_logout, signedData, isGenericCall);
                    }

               }
            });
        },

        signDataModal: function(auto_logout, data_to_sign, isGenericCall) {
            var pin = $("#owok_pin").val();
            pin = utils.convertStringToHexPin(pin, "60", "10");

            var cmd = "00 20 30 00";
            var data = pin + " 40 " + utils.getHexCommandLength(data_to_sign) + " " + data_to_sign;
            cmd = utils.getApduCommand(cmd, data);

            var signedData = applet.SendToCard(cmd);

            if(signedData == '64 01' // User canceled manually
            || signedData == '64 a1'
            || signedData == '64 00' // Timeout
            || signedData == '9d 17' // Karte gesperrt
            || signedData == '9d 13') // Wrong PIN
            {
               var error = SCJSError.getErrorMessage(signedData);
               $("#owok_modal_pin_error").html(error.message);
            } else {
                if (signedData.toUpperCase() == "9D A0") {
                    signedData = SmartCardJS.getExtendedResponse();
                }
                SmartCardJS.loginOwokCardStep2(auto_logout, signedData, isGenericCall);
            }
        },


        loginOwokCardStep2: function(auto_logout, signedData, isGenericCall) {
        	if(signedData == '64 01' // User canceled manually
            || signedData == '64 a1'
            || signedData == '64 00') // Timeout
            {
                $(SmartCardJS).trigger('owokPinEntryCanceled', [signedData, SmartCardJS.getPinTriesLeft()]);
                return;
            }
        	if(signedData == '9d 17' // Karte gesperrt
            || signedData == '9d 13') { // Wrong PIN
                $(SmartCardJS).trigger('owokWrongPin', [signedData, SmartCardJS.getPinTriesLeft()]);
                return;
        	}
        	
            //var nocard_logout = $('input[name=owok_nocard_logout]').attr('checked')
            var data = {'owok_login_data': signedData, 'owok_nocard_logout': auto_logout};
            if (!isGenericCall) {
            	auth.authWithOwok (data, options.LoginActionURL);
            }
            else {            	
            	$(SmartCardJS).trigger('owokPinEntrySuccess', data);
            }
        },

        
        /**
         * Startet einen Login Prozess mit einer Owok Card, aber loggt nicht ein.
         * @param {bool} auto_logout
         * @name prepareLoginOwokCard
         * @member SmartCardJS
         * @function
         */
        prepareLoginOwokCard: function() {
            // nur initialisierte Karten dürfen sich einloggen
            if(this.getCardLifeCycle() != this.CARD_STATUS_INITIALIZED)
                return;

            $(SmartCardJS).trigger('owokPinEntryStart', []);

            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': 'OsiSessionCreate', 'param': {}},
               dataType: "json",
               error: function() {log("Anwendungsfehler in "+options.OwokPath+options.ClientRequestScript+"!");},
               success: function( response )
               {
                    // Schritt 2
                    log(response);
                    //response = $.parseJSON(response);
                    var sid = response.SID;

                    var ctl = utils.getPcScFeatureCtrlCode(SmartCardJS.FEATURE_MCT_READER_DIRECT);

                    if (ctl==0) {
                        // Unsichere Pin Eingabe
                        //SmartCardJS.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_entry.php", "20%",
                        //    "javascript:SmartCardJS.signDataModal('"+auto_logout+"', '"+sid+"')");
                    } else {
                        // Sichere Pin Eingabe über Kartenleser
                        var signedData = SmartCardJS.signData(sid);  // hier starten die PIN Eingabe über den Leser
                        log('signed data <'+signedData+'>');
                        SmartCardJS.prepareLoginOwokCardStep2(signedData);
                    }

               }
            });
        },
        

        prepareLoginOwokCardStep2: function( signedData ) {
            if(signedData == '64 01' // User canceled manually
            || signedData == '64 a1'
            || signedData == '64 00' // Timeout
            || signedData == '9d 17' // Karte gesperrt
            || signedData == '9d 13') // Wrong PIN
            {
                $(document).trigger('meincockpit.prepareOwokCardLogin',[-1, SmartCardJS.getPinTriesLeft()]);
                return;
            }

            //var nocard_logout = $('input[name=owok_nocard_logout]').attr('checked')
            //var data = {'owok_login_data': signedData, 'owok_nocard_logout': auto_logout};
            $(document).trigger('meincockpit.prepareOwokCardLogin',[signedData, SmartCardJS.getPinTriesLeft()]);
        },



        /**
         * Die Funktion signiert (verschlüsselt mit USERKEYPriv) die übergebenen Daten.
         * Sendet ein Perform Verification Command an die Karte, das löst eine PIN Eingabe am Leser aus.
         * @param {hexstring} data_to_sign
         * @return {hexstring} response Die verschlüsselten Daten
         * @name signData
         * @member SmartCardJS
         * @function
         */
        signData: function(data_to_sign) {
            var cmd = "00 20 30 00";
            var data = this.PIN_PLACEHOLDER + " 40 " + utils.getHexCommandLength(data_to_sign) + " " + data_to_sign;
            cmd = utils.getApduCommand(cmd, data);

            var response = utils.performVerification(cmd);

            if (response.toUpperCase() == "9D A0") {
                response = SmartCardJS.getExtendedResponse();
            }

            if (response.length>5)
                response = response.substring(0, response.length-6);

            return response;
        },



        /**
         * Stellt fest ob es sich um eine Light Card handelt
         * @name isOwokLightCard
         * @member SmartCardJS
         * @function
         */
        isOwokLightCard: function() {
            return this.getLightCardId().length == 20;
        },


        /**
         * Startet einen Login Prozess mit einer Light Card
         * @param {string} light_pin
         * @param {bool} auto_logout
         * @name loginLight
         * @member SmartCardJS
         * @function
         */
        loginLight: function(light_pin, auto_logout, isGeneric) {
            var card_id = this.getLightCardId();

            // Schritt 1: Session beim OAS eröffnen
            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': 'OsiSessionCreate', 'param': {}},
               dataType: "json",
               error: function(error) {log("Anwendungsfehler in "+options.OwokPath+options.ClientRequestScript+"!");},
               success: function(response)
               {
                    // Schritt 2
                    var sid = response.SID;

                    var sss = applet.SendToCard("90 5A 00 00 03 00 83 80 00");
                    var key_id = sid.charAt(sid.length - 1); //Die letzte Ziffer der Session ID, liegt immer zwischen 0 und D
                    var r1 = applet.SendToCard("90 AA 00 00 01 0"+key_id+" 00");
                    
                    // Schritt 3
                    $.ajax({
                       type: "POST",
                       url: options.OwokPath + options.ClientRequestScript,
                       data: {methodName: "OsiOwokLightProcess", param: {'sid': sid, 'card_id': card_id, 'light_pin': light_pin, 'rsp': r1}},
                       dataType: "json",
                       error: function(error) {log("Fehler bei OAS Request!");},
                       success: function(response)
                       {
                            if (response.APDU_STEP_2)
                                response = response.APDU_STEP_2;

                            // Ein gültiger ByteString beginnt immer mit AF an.
                            if (response.substring(0, 5) != '90 AF') {
                                $(SmartCardJS).trigger('owokLightLoginFailed', [response]);
                                return;
                            }

                            // Schritt 4
                            var r2 = applet.SendToCard(response);

                            // Eine Antwort mit weniger als 2 Byte ist ein Fehler
                            if (r2.length < 5) {
                                log("LOGIN nicht erfoglreich");
                                $(SmartCardJS).trigger('owokLightLoginFailed', [r2]);
                                return;
                            }

                            // Schritt 5: Die Login Daten an den Client posten, der ruft dann auf dem OAS OsiOwokLightLogin auf
                            var data = {'owok_rsp_step_2': r2, 'owok_nocard_logout': auto_logout, 'owok_sid': sid};
                            if (!isGeneric) {
                            	auth.authWithOwokLight (data, options.LoginActionURL);
                            }
                            else {
                            	$(SmartCardJS).trigger('owokLightPinCheckSuccess', data);
                            }
                       }
                     });
                }
             });
        },

        /**
         * Startet einen Login Prozess mit einer Light Card, aber loggt nicht ein.
         * @param {string} light_pin
         * @param {bool} auto_logout
         * @name loginLight
         * @member SmartCardJS
         * @function
         */
        prepareLoginLight: function(light_pin) {
        	var card_id = this.getLightCardId();

            // Schritt 1: Session beim OAS eröffnen
            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': 'OsiSessionCreate', 'param': {}},
               dataType: "json",
               error: function(error) {log("Anwendungsfehler in "+options.OwokPath+options.ClientRequestScript+"!");},
               success: function(response)
               {
                    // Schritt 2
                    var sid = response.SID;

                    var sss = applet.SendToCard("90 5A 00 00 03 00 83 80 00");
                    var key_id = sid.charAt(sid.length - 1); //Die letzte Ziffer der Session ID, liegt immer zwischen 0 und D
                    var r1 = applet.SendToCard("90 AA 00 00 01 0"+key_id+" 00");

                    // Schritt 3
                    $.ajax({
                       type: "POST",
                       url: options.OwokPath + options.ClientRequestScript,
                       data: {methodName: "OsiOwokLightProcess", param: {'sid': sid, 'card_id': card_id, 'light_pin': light_pin, 'rsp': r1}},
                       dataType: "json",
                       error: function(error) {log("Fehler bei OAS Request!");},
                       success: function(response)
                       {
                            if (response.APDU_STEP_2)
                                response = response.APDU_STEP_2;

                            // Ein gültiger ByteString beginnt immer mit AF an.
                            if (response.substring(0, 5) != '90 AF') {
                                $(SmartCardJS).trigger('owokLightLoginFailed', [response]);
                                return;
                            }

                            // Schritt 4
                            var r2 = applet.SendToCard(response);

                            // Eine Antwort mit weniger als 2 Byte ist ein Fehler
                            if (r2.length < 5) {
                                log("LOGIN nicht erfoglreich");
                                $(SmartCardJS).trigger('owokLightLoginFailed', [r2]);
                                return;
                            }

                            // Schritt 5: Die Login Daten per Event mitteilen
                            // var data = {'owok_rsp_step_2': r2, 'owok_nocard_logout': auto_logout, 'owok_sid': sid};
                            $(document).trigger('meincockpit.prepareLightLogin',[sid, r2]);
                       }
                     });
                }
             });
        },

        /**
         * Wird aufgerufen wenn eine Smartcard in der Kartenleser gesteckt wurde.
         * Feuert ein owokSmartcardWasInserted Event mit ID der Karte und Lifecycle Status
         * @name insertSmartcard
         * @member SmartCardJS
         * @function
         */
        insertSmartcard: function() {
            log("Check Smartcard");
            var lifecycle = this.getCardLifeCycle();
            var card_id = this.getCardId();

            var sysinfo = SmartCardJS.sysInfo();
            if (utils.getByteAsInt(sysinfo, 1) != 2) {
                lifecycle = SmartCardJS.CARD_STATUS_NO_CARD;
            } else {
//                var infoByte2 = utils.getByte(sysinfo, 3);
//                if ( infoByte2.substring(0,1) != "0") {
//                    lifecycle = SmartCardJS.CARD_STATUS_NO_CARD;
//                    alert("Kontaktlose SCJS Karten werden in dieser Version noch nicht unterstützt!");
//                }
            }


            $(this).trigger('owokSmartcardWasInserted', [card_id, lifecycle]);
        },


        /**
         * Wird aufgerufen wenn eine Smartcard in der Kartenleser gesteckt wurde.
         * Feuert ein owokLightCardWasInserted Event mit ID der Karte und Lifecycle Status
         * @name insertLightCard
         * @member SmartCardJS
         * @function
         */
        insertLightCard: function() {
            log("Check Light Card");
            var card_id = SmartCardJS.getLightCardId();
            displayMessage('');
            // Zuerst eine OAS Session starten
            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': 'OsiSessionCreate', 'param': {}},
               dataType: "json",
               error: function () {log("Anwendungsfehler in "+options.OwokPath+options.ClientRequestScript+"!");},
               success: function(response)
               {
                    //response = $.parseJSON(response);
                    var sid = response.SID;
                    var sss = applet.SendToCard("90 5A 00 00 03 00 83 80 00");
                    var key_id = sid.charAt(sid.length - 1); //Die letzte Ziffer der Session ID, liegt immer zwischen 0 und D
                    var r1 = applet.SendToCard("90 AA 00 00 01 0"+key_id+" 00");
                    
                    if (r1.length<=2) {
                        $(SmartCardJS).trigger("owokAlertMessage", ["Kann Light Karte nicht erkennen."]);
                        $(SmartCardJS).trigger("owokLightCardWasInserted", ["", SmartCardJS.CARD_STATUS_NO_CARD]);
                        return;
                    }

                    $.ajax({
                       type: "POST",
                       url: options.OwokPath + options.ClientRequestScript,
                       data: {'methodName': "OsiOwokLightProcess", 'param': {'sid': sid, 'card_id': card_id, 'light_pin': '', 'rsp': r1}},
                       dataType: "json",
                       error: function () {log("Anwendungsfehler in "+options.OwokPath+options.ClientRequestScript+"!");},
                       success: function(response)
                       {
                            if (response == -200) {
                                $(SmartCardJS).trigger('owokLightCardWasInserted', [card_id, SmartCardJS.CARD_STATUS_READY]);
                                return;
                            }

                            if (response.APDU_STEP_2)
                                response = response.APDU_STEP_2;

                            if (response.substring(0, 5) != '90 AF') {
                                $(SmartCardJS).trigger('owokLightCardWasInserted', [card_id, SmartCardJS.CARD_STATUS_NO_CARD]);
                                return;
                            }

                            var r2 = applet.SendToCard( response );

                            if (r2.length < 5) {
                                $(SmartCardJS).trigger("owokAlertMessage", ["Fehler! Kann Light Card nicht erkennen (rsp2 '"+r2+"')"]);
                                $(SmartCardJS).trigger('owokLightCardWasInserted', [card_id, SmartCardJS.CARD_STATUS_NO_CARD]);
                                return;
                            }

                            $.ajax({
                               type: "POST",
                               url: options.OwokPath + options.ClientRequestScript,
                               data: {'methodName': "OsiOwokLightCheckCard", 'param': {'sid': sid, 'rsp2': r2}},
                               dataType: "json",
                               success: function(response){
                                   if (response.CID) {
                                        SmartCardJS.isLightCardActive();
                                 	   //$(document).trigger('meincockpit.cardlogin',[sid, r2]);
                                   }
                                   else
                                        $(SmartCardJS).trigger("owokAlertMessage", [ "Kann SCJS Light Karte nicht erkennen." ]);
                               }
                             });
                             return;
                       }
                     });
               }
             });
//            alert("go5");
        },


        /**
         * Prüft, ob die Light Card für die Client Web-Anwendung freigeschaltet ist.
         * @name isLightCardActive
         * @member SmartCardJS
         * @function
         */
        isLightCardActive: function() {
            var card_id = this.getLightCardId();
            card_id = card_id.toUpperCase();
            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': 'OsiCardInfo', 'param': {'card_id': card_id}},
               dataType: "json",
               error: function () {log("Anwendungsfehler in "+options.OwokPath+options.ClientRequestScript+"!");},
               success: function(response){
                   var card_data = response;

                   if (!card_data.USER_ID && !card_data.CARD_INFO) {
                       log("Light Karte ist nicht auf dem OLPS registriert.");
// Hinweis PIN-Server
                       $(SmartCardJS).trigger('owokLightCardWasInserted', [card_id, SmartCardJS.CARD_STATUS_FACTORY]);

                   } else if (!card_data.USER_ID && card_data.CARD_INFO && card_data.CARD_INFO.length>0) {
//                       log("Light Karte ist auf dem OLPS registriert, aber noch nicht für die Anwendung aktiviert.");
                       $(SmartCardJS).trigger('owokLightCardWasInserted', [card_id, SmartCardJS.CARD_STATUS_READY,utils.getByteAsInt( card_data.CARD_INFO, 16 )]);

                   } else {

                	   if ( utils.getByteAsInt( card_data.CARD_INFO, 16 ) == 0) {
                           log("Light Karte ist gesperrt.");
                           $(SmartCardJS).trigger('owokLightCardWasInserted', [card_id, SmartCardJS.CARD_STATUS_LOCKED]);

                       } else {
                    	   log("Light Karte aktiv.");
                           $(SmartCardJS).trigger('owokLightCardWasInserted', [card_id, SmartCardJS.CARD_STATUS_INITIALIZED,utils.getByteAsInt( card_data.CARD_INFO, 16 )]);
                       }
                   }
               }
             });
         },


        /**
         * Bezeichnung einer Smartcard setzen
         * @param {string} desc Bezeichnung der Karte als ASCII String
         * @name setCardDesc
         * @member SmartCardJS
         * @function
         */
        setCardDesc: function(desc) {
            desc = $.trim(utils.convertStringToHex(desc));
            var cmd = "B2 20 00 00";
            var data = this.PIN_PLACEHOLDER + " 13 " + utils.getHexCommandLength(desc) + " " + desc;
            cmd = utils.getApduCommand(cmd, data);
            cmd = utils.performVerification(cmd);
            return this.checkResponse( cmd );
        },


        /**
         * Führt eine persistente Autorisierung gegenüber der Karte durch oder hebt die Autorisierung wieder auf.
         * @name auth
         * @member SmartCardJS
         * @function
         */
        auth: function() {
            var cmd = "00 20 00 00";
            cmd = utils.getApduCommand(cmd, this.PIN_PLACEHOLDER);
            return this.checkResponse( utils.performVerification(cmd) );
        },


        /**
         * Ändern der User Pin. Wenn der Kartenleser nur unsichere PIN Eingabe unterstütz
         * wird automatisch changePinUnsafe() aufgerufen.
         * @name changePin
         * @member SmartCardJS
         * @function
         */
        changePin: function() {
            log("changePin");
            $(SmartCardJS).trigger('owokPinEntryStart', []);
            var response;

            // Den Kartenleser fragen, ob er sichere PIN Eingabe unterstützt
            var ctl = utils.getPcScFeatureCtrlCode(SmartCardJS.FEATURE_MCT_READER_DIRECT);

            if (ctl==0) {
                // Der Kartenleser unterstützt keine sichere PIN Eingabe
                //alert("Noch nicht verfügbar.");
                SmartCardJS.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_change.php", "20%",
                    "javascript:SmartCardJS.changePinModal()");
            } else {
                // Sicheres Ändern der PIN über die Kartenleser Tastatur direkt
                var cmd = "20 19 01 00 2E 52 2C 01 08 1A 00 24 00 00 24 " + this.PIN_PLACEHOLDER + " " + this.PIN_NEW_PLACEHOLDER;
                response = applet.SendIOCTL(ctl, 1, cmd);
                SmartCardJS.changePin2(response);
            }
        },


        /**
         * Ändern der User Pin für Kartenleser, die keine sichere PIN Eingabe unterstützen.
         * Wird von changePin() aufgerufen.
         * @name changePinUnsafe
         * @member SmartCardJS
         * @return {hexstring} response Antwort des Kartenlesers
         * @function
         */
        changePinModal: function() {
            var response;
            var mypin = $("#owok_pin_old").val();
            var newpin = $("#owok_pin").val();
            var newpin2 = $("#owok_pin2").val();

            if (!mypin || mypin.length==0) {
                response = '64 01'; // PIN Eingabe abgebrochen

            } else if (!newpin || newpin.length==0) {
                response = '64 01'; // PIN Eingabe abgebrochen

            } else if (!newpin2 || newpin2.length==0) {
                response = '64 01'; // PIN Eingabe abgebrochen

            } else if (newpin != newpin2) {
                response = '64 02'; // PINs passen nicht zusammmen

            } else {
                mypin = utils.convertStringToHexPin(mypin, '60', '10');
                newpin = utils.convertStringToHexPin(newpin, '61', '10');
                var cmd = "00 24 00 00 24 " + mypin + " " + newpin;
                //cmd = cmd.replace(SmartCardJS.PIN_PLACEHOLDER, mypin);
                //cmd = cmd.replace(SmartCardJS.PIN_NEW_PLACEHOLDER, newpin);
                response = applet.SendToCard(cmd);
            }

            if ($.modal) $.modal.close();
            SmartCardJS.changePin2( response );
        },

        changePin2: function(response) {
            log("changePin response <"+response+">");
            if (response == this.SW_OK) {
                $(SmartCardJS).trigger('owokCardPinChangeSuccess', []);
            } else {
                $(SmartCardJS).trigger('owokCardPinChangeFail', [response, SmartCardJS.getPinTriesLeft()]);
            }

            //return this.checkResponse(response);
        },



        /**
         * Holt sich eine CSV Liste mit allen Karten des eingeloggten Users von OAS
         * und feuert dann ein owokUserCardListReady Event mit der Liste als Parameter
         * @name getUserCardList
         * @member SmartCardJS
         * @function
         */
        getUserCardList: function() {
            $.ajax({
                type: "POST",
                url: options.OwokPath + options.ClientRequestScript,
                data: {'methodName': "OsiCardList", 'param': {'user_id': null}}, // wird später gesetzt
                success: function(response){
                    log("UserCardList "+response+"");
                    response = $.parseJSON(response);
                    var cardlist = response.CID_LIST;
                    $(SmartCardJS).trigger('owokUserCardListReady', [cardlist]);
                }
            });
         },


        /**
         * Frägt den OAS nach Informationen über eine Karte.
         * Feuert ein owokUserCardInfoReady Event.
         * @see owokUserCardInfoReady
         * @param card_id
         * @name getUserCardInfo
         * @member SmartCardJS
         * @function
         */
        getUserCardInfo: function(card_id) {
            $.ajax({
                type: "POST",
                url: options.OwokPath + options.ClientRequestScript,
                data: {'methodName': "OsiCardInfo", 'param': {'card_id': card_id}},
                dataType: "json",
                success: function(card_data) {
                    log(card_data);

                    //card_data = $.parseJSON(card_data);

                    var info = "{}";

                    if (card_data.CARD_INFO) {
                        var card_info = card_data.CARD_INFO;

                        var vlen = utils.getByteAsInt(card_info, 1);
                        var version = utils.stripBytes(card_info, 2, vlen);
                        var clen = utils.getByteAsInt(card_info, 3+vlen);
                        card_id = utils.stripBytes(card_info, 4+vlen, clen);
                        card_id = card_id.toUpperCase();
                        var cur_pin_tries;
                        if (SmartCardJS.isOwokLightCard()) {
                            cur_pin_tries = utils.getByteAsInt(card_info, 16);
                            if (isNaN(cur_pin_tries)) cur_pin_tries = undefined;
                        } else {
                            cur_pin_tries = SmartCardJS.getPinTriesLeft();
                        }

                        info = '{"card_version": "'+version+'", "card_id": "'+card_id+'", '+
                            '"pin_info": {"cur_pin_tries": "'+cur_pin_tries+'"}, '+
                            '"login_ok_count": "'+card_data.LOGIN_OK_COUNT+'", "login_fail_count": "'+card_data.LOGIN_FAIL_COUNT+'", "register_time": "'+card_data.REGISTER_TIME+'", "last_check": "'+card_data.LAST_CHECK+'" }';

                    }
                    var ret = '{"user_id": "'+card_data.USER_ID+'", "card_info": '+info+' }';
                    log("UserCardInfo <"+ret+">");

                    $(SmartCardJS).trigger('owokUserCardInfoReady', card_data.USER_ID);
                }
            });
         },


        /**
         * Setzt die Karte, die sich aktuell im Kartenleser befindet, zurück und
         * löscht die Kartendaten auf dem OAS
         * @see owokPinCanceled
         * @see owokCardWasReseted
         * @name deleteCard
         * @member SmartCardJS
         * @function
         */
        deleteCard: function() {

            // Bei Light Karten nochmal nachfragen
            if (this.isOwokLightCard()) {

                if (!confirm("Diese Karte wirklich entfernen?")) {
                    return;
                }

                if (!confirm("Wollen Sie die Light Karte wirklich entfernen?"))
                    return;

            } else {

                if (!confirm("Achtung! Die Karte wird jetzt zurückgesetzt und ist damit für alle Applikationen nicht mehr gülitg. Sind Sie sich sicher?")) {
                    return;
                }
            }

            SmartCardJS.deleteCard2();

        },

        deleteCard2: function() {
            var card_id;
            var resetResponse = this.SW_OK;

            if (this.isOwokLightCard()) {
                card_id = SmartCardJS.getLightCardId();

            } else {

                card_id = this.getCardId();

                var status = this.getCardLifeCycle();
                if (status==1) {
                    var ctl = utils.getPcScFeatureCtrlCode(SmartCardJS.FEATURE_MCT_READER_DIRECT);
                    if (ctl==0) {
                        // Unsichere Pin Eingabe
                        unsafe_pin = $("#owok_pin").val();
                        if (!unsafe_pin) {
                            if (!$.modal) {
                                unsafe_pin = '';
                            }

                            SmartCardJS.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_entry.php", "20%",
                                "javascript:SmartCardJS.deleteCard2()");
                            return;
                        }
                        unsafe_pin = utils.convertStringToHexPin(unsafe_pin, "60", "10");
                    }
                }

                resetResponse = this.resetCard(); // evtl PIN Eingabe über Kartenleser

            }


            if (resetResponse != this.SW_OK) {
                $(SmartCardJS).trigger('owokPinCanceled', [resetResponse]);
                return;
            }

            // Dem OAS sagen, dass er die Karte löschen soll
            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': "OsiCardDelete", 'param': {'card_id': card_id}},
               success: function(response){
                 if (response==0) {
                    $(SmartCardJS).trigger('owokCardWasReseted');
                 }else {
                    $(SmartCardJS).trigger('owokPinCanceled', [response]);
                 }
               }
             });
        },

          /**
         * Rücksetzen der Karte in den Lifecycle Status READY.
         * Bei Initialisierter Karte startet eine PIN Eingabe.
         * Eine gelockter Karte wird einfach so zurückgesetzt
         * @name resetCard
         * @member SmartCardJS
         * @function
         */
        resetCard: function() {
            var status = this.getCardLifeCycle();

            if (status==1) {
                // status inizialisiert
                var cmd = "00 20 25 00";
                if (unsafe_pin && secure_ctl==0) {
                    if ($.modal) $.modal.close();
                    cmd = utils.getApduCommand(cmd, unsafe_pin);
                    unsafe_pin = '';
                    return applet.SendToCard(cmd);
                } else {
                    cmd = utils.getApduCommand(cmd, this.PIN_PLACEHOLDER);
                    return utils.performVerification(cmd);
                }
            } else {
                // status locked
                cmd = "00 20 25 00 00";
                return applet.SendToCard(cmd);
            }
        },


        /**
         * Zeigt ein Modal Window für die Light PIN Eingabe auf der Seite an
         * @name showModalLightLogin
         * @param contentUrl Url zum Inhalt des Modal Window, eine html/php Datei
         * @member SmartCardJS
         * @function
         */
         showModalLightLogin: function (remainingPinTrys,callbackOnCardRemove) {
        	 var enterPin = new EnterCardPin();
        	 enterPin.showPinForm(remainingPinTrys,callbackOnCardRemove);
         },


        /**
         * Zeigt ein Modal Window für PIN Eingabe
         * @name showModalPinEntry
         * @param contentUrl Url zum Inhalt des Modal Window, eine html/php Datei
         * @member SmartCardJS
         * @function
         */
         showModalPinEntry: function (contentUrl, offsetTop, callbackFunc) {
            $.getScript( options.OwokPath + "js/jquery.simplemodal-1.3.5.min.js",
                function () {
                    $.ajax({
                       type: "POST",
                       url: contentUrl+"?callback="+callbackFunc,
                       success: function(response){
                        if ($.modal) {
                                $.modal.close();
                                $.modal( response, {
                                   position: [offsetTop,],
                                   overlayId: 'owok-simplemodal-overlay',
                                   containerId: 'owok-simplemodal-container',
                                   dataId: 'owok-simplemodal-data',
                                   closeHTML: "<div class='close'></div>"
                                 });
                        }
                       }
                     });
                });
         },

        /**
         * Registriert die Karte, die im Leser steckt, für den gerade eingeloggten User.
         * @name addCardToUser
         * @member SmartCardJS
         * @function
         */
        addCardToUser: function() {
            var card_data = "";

            if (this.isOwokLightCard()) {

                card_data = "11 02 "+this.LIGHT_CARD_VERSION;
                card_data += " 12 07 "+this.getLightCardId();

            } else {

                card_data = this.getCardVersion();
                card_data += " 12 08 "+this.getCardId();
                card_data += " "+this.getAKeyPup();
            }

            log("AddCardToUser <"+card_data+">");

            $.ajax({
               type: "POST",
               //url: options.OwokPath + options.ClientRequestScript,
               url: options.OwokPath + options.AddCardActionUrl,
               data: {'methodName': "OsiCardAdd", 'param': {'user_id': '', 'card_data': card_data}}, // User ID wird hier nicht gesetzt
               success: function (response)
               {
                   response = $.parseJSON(response);

                   log("AddCardToUser response <"+response+">");
                   if (response == 0) {
                       $(SmartCardJS).trigger('owokCardRegisterSuccess');
                   }else {
                       $(SmartCardJS).trigger('owokCardRegisterFail', [response]);
                   }
               }
             });
        },

        /**
         * Registriert die Karte, die im Leser steckt, für den gerade eingeloggten User.
         * @name mcAddCardToUser
         * @member SmartCardJS
         * @function
         */
        mcAddCardToUser: function(password)
        {
        	var card_data = "";
        	var eventHandler = new AllyveEvents();
        	eventHandler.registerEvent("addCardToAccountOk");
        	eventHandler.registerEvent("addCardToAccountFail");

            if (this.isOwokLightCard()) {

                card_data = "11 02 "+this.LIGHT_CARD_VERSION;
                card_data += " 12 07 "+this.getLightCardId();

            } else {

                card_data = this.getCardVersion();
                card_data += " 12 08 "+this.getCardId();
                card_data += " "+this.getAKeyPup();
            }
            if (card_data.length < 10) {
            	eventHandler.raiseEvent("addCardToAccountFail", "no card present");
            }
            else {
	            log("AddCardToUser <"+card_data+">");
	
	            $.ajax({
	               type: "POST",
	               url: OwokConfig.AddCardActionUrl,
	               data: {'methodName': "OsiCardAdd", 'param': {'user_id': '', 'password': password, 'card_data': card_data}}, // User ID wird hier nicht gesetzt
	               dataType: "text",
	               success: function (response) {
	            	   eventHandler.raiseEvent("addCardToAccountOk", response);
	               	   $(SmartCardJS).trigger('owokCardRegisterSuccess');
	               },
	               error: function (response) {
	            	   eventHandler.raiseEvent("addCardToAccountFail", response);
	               }
	             });
            }
        },

        /**
         * Löscht einen User und all seine Karten
         * @name deleteUser
         * @param {ascii string} user_id Der Name des Users
         * @member SmartCardJS
         * @function
         */
        deleteUser: function( user_id )
        {
            log("Delete User <"+user_id+">");

            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': "OsiUserDelete", 'param': {'user_id': ''}}, // User ID wird hier nicht gesetzt
               success: function (response)
               {
                   response = $.parseJSON(response);
                   log("Delete User <"+response+">");
                   if (response == 0) {
                       $(SmartCardJS).trigger('owokUserDeleteSuccess');
                   }else {
                       $(SmartCardJS).trigger('owokUserDeleteFail', [response]);
                   }
               }
             });
        },

        /**
         * Die Funktion initialisiert die Smartcard und setzt sie in den Lifecycle Status initialized
         * @param {hexstring} key_len Key Länge
         * @param {ascii string} desc Bezeichnung der Karte
         * @name initialize
         * @member SmartCardJS
         * @function
         */
        initialize: function(key_len, desc)
        {
            var pin = this.PIN_PLACEHOLDER;

            if (unsafe_pin && secure_ctl==0) {
                if ($.modal) $.modal.close();
                pin = unsafe_pin;
            }

            var data = pin + " 30 03 01 " + key_len;

            // Eventuell optionale Kartenbeschreibung
            if (desc && desc.length > 0) {
                // optionale Kartenbeschreibung
                desc = $.trim(utils.convertStringToHex(desc));
                data += " 13 " + utils.getHexCommandLength(desc) + " " + desc;
            }

            // Kommando
            var cmd = "00 20 20 00";
            cmd = utils.getApduCommand(cmd, data);

            var response;
            if (unsafe_pin && secure_ctl==0) {
                response = applet.SendToCard(cmd);
            } else {
                response = utils.performVerification(cmd);
            }
            unsafe_pin = '';

            if (response.toUpperCase() == "9D A0") {
                response = SmartCardJS.getExtendedResponse();
            }

            return response;
        },


        /**
         * Nachdem AW_DATA_AVAIL (9d a0) von der Karte zurückgegeben wurde, kann man mit dieser Funktion die komplette extended Antwort-Response anfragen.
         * Liest  die  Antwortdaten  einer  OCA  Funktion  in  Blöcken  von  kleiner gleich  255  Byte  wenn  diese SW_DATA_AVAIL zurückgegeben hat.
         * @name getExtendedResponse
         * @member SmartCardJS
         * @function
         */
        getExtendedResponse: function()
        {
            var d0 = SmartCardJS.getResponse(0);
            var d1 = SmartCardJS.getResponse(1);

            if ( sw1sw2 = d0.substring(d0.length-5, d0.length) != "90 00" )
                return sw1sw2;

            if ( sw1sw2 = d1.substring(d1.length-5, d1.length) != "90 00" )
                return sw1sw2;

            d0 = d0.substring(0, d0.length-5);
            d1 = d1.substring(0, d1.length-5);

            var response = d0 + d1 + '90 00';
            return response;
        },

        /**
         * Entfernt eine Karte vom OAS
         * @see owokCardDeleteSuccess
         * @see owokCardDeleteFail
         * @param card_id
         * @name removeUserCard
         * @member SmartCardJS
         * @function
         */
        removeUserCard: function( card_id )
        {
            if (!confirm("Diese Karte wirklich entfernen?"))
                return;

            card_id = unescape(card_id);
            log("Karte von User entfernen.");
            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': "OsiCardList", 'param': {'user_id': ''}}, // User ID wird vom Server gesetzt
               error: function(error) {log("Fehler bei OAS Request!");},
               success: function (cardList)
               {
                   // Prüfen ob die card_id im cardList String vorkommt
                   if ((cardList+'').indexOf(card_id, 0) >= 0) {
                        $.ajax({
                           type: "POST",
                           url: options.OwokPath + options.ClientRequestScript,
                           data: {'methodName': "OsiCardDelete", 'param': {'card_id': card_id}},
                           error: function(error) {log("Fehler bei OAS Request!");},
                           success: function (response)
                           {
                               log("OsiCardDelete <"+response+">");
                               if (response == 0) {
                                   $(SmartCardJS).trigger('owokCardDeleteSuccess');
                               } else {
                                   $(SmartCardJS).trigger('owokCardDeleteFail', [response]);
                               }
                           }
                         });
                   } else {
                       log("Fehler. Die Karte ist nicht dem User zugeordnet.");
                       $(SmartCardJS).trigger('owokCardDeleteFail', [response]);
                   }
               }
            });
        },


        /**
         * Liest die Antwortdaten einer OCA Funktion in Blöcken von kleiner gleich 255 Byte, wenn diese SW_DATA_AVAIL zurückgegeben hat.
         * @return {hexstring} response
         * @name getResponse
         * @member SmartCardJS
         * @function
         */
        getResponse: function( blocknummer )
        {
            cmd = "B2 40 00 00 00";
            if (blocknummer==1)
                cmd = "B2 40 00 01 00";
            return applet.SendToCard(cmd);
        },

        /**
         * Die Versionsnummer der Karte
         * @return {hexstring} version
         * @name getCardVersion
         * @member SmartCardJS
         * @function
         */
        getCardVersion: function()
        {
            var response = applet.SendToCard("B2 10 01 01 00");
            return response.substring(0, response.length-6);
        },

        /**
         * Maximale Anzahl an möglichen PIN Fehlversuchen
         * @return {int} pinTries
         * @name getPinTriesMax
         * @member SmartCardJS
         * @function
         */
        getPinTriesMax: function()
        {
            var response = applet.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 2).toString();
        },

        /**
         * Aktuelle Anzahl an noch möglichen PIN Fehlversuchen
         * @return {int} pinTries
         * @name getPinTriesLeft
         * @member SmartCardJS
         * @function
         */
        getPinTriesLeft: function()
        {
            var response = applet.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 3).toString();
        },

        /**
         * Minimale Länge einer Smartcard PIN
         * @return {int} pinLength
         * @name getPinMinLength
         * @member SmartCardJS
         * @function
         */
        getPinMinLength: function()
        {
            var response = applet.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 4).toString();
        },

        /**
         * Maximale Länge einer Smartcard PIN
         * @return {int} pinLength
         * @name getPinMaxLength
         * @member SmartCardJS
         * @function
         */
        getPinMaxLength: function()
        {
            var response = applet.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 5).toString();
        },

        /**
         * Die Karten ID einer Smartcard
         * @return {hexstring} card_id
         * @name getCardId
         * @member SmartCardJS
         * @function
         */
        getCardId: function()
        {
        	var response = applet.SendToCard("B2 10 00 08 00");
            if (response.length<6)
                return '';
            var card_id = response.substring(6, response.length-6);
            return card_id;
        },

        mcGetCardData: function() {
        	var card_data = "";
        	if (this.isOwokLightCard()) {

                card_data = "11 02 "+this.LIGHT_CARD_VERSION;
                card_data += " 12 07 "+this.getLightCardId();

            } else {

                card_data = this.getCardVersion();
                card_data += " 12 08 "+this.getCardId();
                card_data += " "+this.getAKeyPup();
            }
        	return card_data;
        },

        setPinInfo: function()
        {
            return applet.SendToCard("14 04 10 00 04 10");
        },

        /**
         * Der Länge des asymetrischen Schlüssels
         * @return {hexstring} aKeyPup
         * @name getAKeyPup
         * @member SmartCardJS
         * @function
         */
        getAKeyInfo: function()
        {
            var response = applet.SendToCard("B2 10 00 20 00");

            return response.substring(5, response.length-6);
        },

        /**
         * Der öffentliche Teil des asymetrischen Schlüssels
         * @return {hexstring} aKeyPup
         * @name getAKeyPup
         * @member SmartCardJS
         * @function
         */
        getAKeyPup: function()
        {
            var response = applet.SendToCard("B2 10 00 40 00");

            if (response.toUpperCase() == "9D A0") {
                response = SmartCardJS.getExtendedResponse();
            }

            return response.substring(0, response.length-6);
//            var len = (data.length+1) / 3;
//            var sw1sw2 = utils.stripBytes(data, len-2, 2);
//            data = utils.stripBytes(data, 0, len-2); // SW1SW2 entfernen
//
//            var lenMod = utils.getByteAsInt(data, 7);
//            var rsaMod = utils.stripBytes(data, 8, lenMod);
//
//            var lenExp = utils.getByteAsInt(data, lenMod+9);
//            var rsaExp = utils.stripBytes(data, lenMod+10, lenExp);
//
//            return {'rsaMod': rsaMod, 'rsaExp': rsaExp};
        },

        /**
         * Gibt die Card Description einer Smartcard zurück, die mit setCardDescription gesetzt wurde.
         * @return {ascii string} desc
         * @name getCardDescription
         * @member SmartCardJS
         * @function
         */
        getCardDescription: function()
        {
            var desc = "";
            var data = applet.SendToCard("B2 10 00 10 00");

            // wenn falscher Lifecycle-Status, dann wert nicht abfragbar
            if (data.toUpperCase() == '9D 05')
                return this.CARD_NO_DESC_STRING;

            data = data.substring(6, data.length-5);
            // Die Bytes in einen String umwandeln
            for (var i=0; utils.getByteAsInt(data,i)>0; i++) {
                desc = desc + String.fromCharCode( utils.getByteAsInt(data, i) );
            }
            return desc;
        },


        /**
         * Die Funktion trennt eine mit der Funktion ConnectCard hergestellte Verbindung zu einer Karte.
         * @param {string} readerName Der Name des Lesers in dem die Karte steckt.
         * @return response
         * @name disConnectCard
         * @member SmartCardJS
         * @function
         */
        disConnectCard: function(readerName)
        {
            var response = -1;
            if (readerName == connectedReaderName || !connectedReaderName) {
                response = applet.DisConnectCard();
                if (response == 0) {
                    connectedReaderName = "";
                }
            }
            log( 'DisConnectCard <'+response+'>' );
            return response;
        },

        /**
         * Die Funktion  trennt eine mit der Funktion  ConnectCard hergestellte Verbindung zu
         * einer Karte.  Im Gegensatz zu DisConnectCard kann noch zusätzlich der Dispositionswert angegeben werden.
         * @param {string} readerName Der Name des Lesers in dem die Karte steckt.
         * @param {int} disposition
         * @name disConnectCardEx
         * @member SmartCardJS
         * @function
         */
        disConnectCardEx: function(readerName, disposition)
        {
            var response = -1;
            if (readerName == connectedReaderName || !connectedReaderName) {
                response = applet.DisConnectCardEx(disposition);
                if (response == 0) {
                    connectedReaderName = "";
                }
            }
            log( 'DisConnectCardEx <'+response+'>' );
            return response;
        },

        /**
         * Die Funktion liefert den Statuscode des letzen PC/SC Funktionsaufrufs zurück.
         * @return {int} status Wurde noch keine PC/SC Funktion aufgerufen, so ist 0 zurückzugeben.
         * @name getLastErrorCode
         * @member SmartCardJS
         * @function
         */
        getLastErrorCode: function()
        {
            return applet.GetLastErrorCode();
        },

        /**
         * Die Funktion liefert eine textuelle Beschreibung eines übergebenen Statuscode bzw. Fehlercodes zurück.
         * @param {int} errorCode
         * @return {int} status Wurde noch keine PC/SC Funktion aufgerufen, so ist 0 zurückzugeben.
         * @name getErrorText
         * @member SmartCardJS
         * @function
         */
        getErrorText: function(errorCode)
        {
            var error = applet.GetErrorText(errorCode);
            return error;
        },

        /**
         * Ermittelt den aktuellen Status mittels SCardGetStatusChange.
         * @return {int} eventState Die Funktion liefert den Wert aus dwEventState des SCARD_READERSTATE im Erfolgsfall und 0xFFFFFFFF im Fehlerfall zurück. Der Fehlercode kann dann über die Funktion GetLastErrorCode ermittelt werden.
         * @name getCardStatus
         * @member SmartCardJS
         * @function
         */
        getCardStatus: function()
        {
            return applet.GetCardStatus(connectedReaderName);
        },

        /**
         * Setzt das Plugin  in den  Initial-Zustand zurück.Ein noch verbundener Leser wird automatisch mit SCARD_RESET_CARD disconnected.
         * @return {status} Status oder Fehlercode
         * @name reset
         * @member SmartCardJS
         * @function
         */
        reset: function()
        {
            return applet.Reset();
        },

        /**
         * Sendet einen Befehl an die Karte
         * @param {hexstring} cmd
         * @return {int} response
         * @name sendToCard
         * @member SmartCardJS
         * @function
         */
        sendToCard: function(cmd)
        {
            return applet.SendToCard(cmd);
        },


        /**
         *
         * @return {hexstring} aKeySupported
         * @name getCardAKeySupported
         * @member SmartCardJS
         * @function
         */
        getCardAKeySupported: function()
        {
            var response = applet.SendToCard("B2 10 01 08 00");
            log("CardAKeySupported <"+utils.getByte(response, 0)+">");
            if (utils.getByte(response, 0)!='15')
                return response;
            var maxLen = utils.getByteAsInt(response, 1);
            log(maxLen);
            var i = 2;
            var akeys = new Array();
            while (i<maxLen) {
                var t = utils.getByte(response, i);
                var l = utils.getByteAsInt(response, i+1);
                var v = utils.stripBytes(response, i+2, l);
                log( "akey info <"+v+">" );
                akeys.push(v);
                i += l+2;
            }
            return akeys;
        },


        /**
         * Eine Light Card ID ist 7 Byte lang
         * @return {hexstring} card_id
         * @name getLightCardId
         * @member SmartCardJS
         * @function
         */
        getLightCardId: function()
        {
            var response = applet.SendToCard("FF CA 00 00 00");
            var card_id = utils.stripBytes(response, 0, 7);
            return card_id;
        },


        /**
         * Eine Light Card ID ist 7 Byte lang
         * @return {hexstring} card_id
         * @name getLightCardId
         * @member SmartCardJS
         * @function
         */
        sysInfo: function()
        {
            var response = applet.SendToCard("B2 10 A0 40 00");
            log("Sys Info <"+response+">");
            return response;
        },


        /**
         *
         * @param {hexstring} version
         * @return {boolean} isLightVersion
         * @name isLightCardVersion
         * @member SmartCardJS
         * @function
         */
        isLightCardVersion: function(version)
        {
            if (typeof version == 'string') version = version.toUpperCase();
            return version == this.LIGHT_CARD_VERSION;
        },

        /**
         * Die Funktion liefert den ATR (Answer to Reset) einer Chipkarte als HexString.
         * @param {string} readerName Der Name des Lesers, in dem die Karte eingeführt ist.
         * @return {hexstring} atr Ist keine Karte eingeführt, so wird ein String mit der Länge 0 zurückgeliefert.
         * @name getCardATR
         * @member SmartCardJS
         * @function
         */
        getCardATR: function(readerName)
        {
            return applet.GetCardATR(readerName);
        },



        /**
         * Prüft die Antwort von der Karte sw1sw2.
         * Feuert ein owokAlertMessage Event mit entsprechender Fehlermeldung
         * @param {hexstring} response
         * @return {boolean} success true bei korrekter Antwort, sonst false
         * @name checkResponse
         * @member SmartCardJS
         * @function
         */
        checkResponse: function(response) {
            var sw1sw2 = response.substring(response.length-5, response.length);
            if (sw1sw2 == this.SW_OK) {
                return true;
            } else {
                if (sw1sw2 == "9d 01") {
                    $(this).trigger("owokAlertMessage", ["SW_APP_DESC_ALREADY_EXIST"]);
                } else if (sw1sw2 == "9d 02") {
                    $(this).trigger("owokAlertMessage", ["SW_APP_ID_ALREADY_EXIST"]);
                } else if (sw1sw2 == "9d 03") {
                    $(this).trigger("owokAlertMessage", ["SW_DATA_WRONG_LEN"]);
                } else if (sw1sw2 == "9d 04") {
                    $(this).trigger("owokAlertMessage", ["SW_INCORRECT_KEY_DATA"]);
                } else if (sw1sw2 == "9d 05") {
                    $(this).trigger("owokAlertMessage", ["SW_INCORRECT_LIFE_CYCLE"]);
                } else if (sw1sw2 == "9d 06") {
                    $(this).trigger("owokAlertMessage", ["SW_INCORRECT_P1P2"]);
                } else if (sw1sw2 == "9d 07") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_CARD_DESCRIPTION"]);
                } else if (sw1sw2 == "9d 08") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_KEY_ATTRIB"]);
                } else if (sw1sw2 == "9d 09") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_KEY_IDX"]);
                } else if (sw1sw2 == "9d 0a") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_OTP_CHALLENGE"]);
                } else if (sw1sw2 == "9d 0b") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_OTP_CRYPTED_KEY"]);
                } else if (sw1sw2 == "9d 0c") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_PARAM_OAS_NAME"]);
                } else if (sw1sw2 == "9d 0d") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_PARAM_OAS_ID"]);
                } else if (sw1sw2 == "9d 0e") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_PARAM_OTP_KEY"]);
                } else if (sw1sw2 == "9d 0f") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_PARAM_OTP_KEY_ATTRIB"]);
                } else if (sw1sw2 == "9d 10") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_PARAM_PIN_DATA"]);
                } else if (sw1sw2 == "9d 11") {
                    $(this).trigger("owokAlertMessage", ["SW_NO_CHALLENGE"]);
                } else if (sw1sw2 == "9d 12") {
                    $(this).trigger("owokAlertMessage", ["SW_NO_OTP_KEY"]);
                } else if (sw1sw2 == "9d 13") {
                    $(this).trigger("owokAlertMessage", ["Falsche PIN!"]);
                } else if (sw1sw2 == "9d 14") {
                    $(this).trigger("owokAlertMessage", ["SW_INTERNAL_ERROR"]);
                } else if (sw1sw2 == "9d 15") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_PARAM_OTP_MASK"]);
                } else if (sw1sw2 == "9d 16") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_AKEY_INFO"]);
                } else if (sw1sw2 == "9d 17") {
                    $(this).trigger("owokAlertMessage", ["SW_CARD_LOCKED"]);
                } else if (sw1sw2 == "9d 18") {
                    $(this).trigger("owokAlertMessage", ["Ungültige PIN Länge!"]);
                } else if (sw1sw2 == "9d 19") {
                    $(this).trigger("owokAlertMessage", ["SW_NO_PIN"]);
                } else if (sw1sw2 == "9d 1a") {
                    $(this).trigger("owokAlertMessage", ["SW_NOT_AUTH"]);
                } else if (sw1sw2 == "9d 1b") {
                    $(this).trigger("owokAlertMessage", ["SW_DATA_MISSING"]);
                } else if (sw1sw2 == "9d 1c") {
                    $(this).trigger("owokAlertMessage", ["SW_NO_EXT_APDU"]);
                } else if (sw1sw2 == "9d 1d") {
                    $(this).trigger("owokAlertMessage", ["SW_NO_RESPONSE"]);
                } else if (sw1sw2 == "9d 1e") {
                    $(this).trigger("owokAlertMessage", ["SW_NO_MORE_OTP_KEYS"]);
                } else if (sw1sw2 == "9d 1f") {
                    $(this).trigger("owokAlertMessage", ["SW_NOT_ALLOWED"]);
                } else if (sw1sw2 == "9d 20") {
                    $(this).trigger("owokAlertMessage", ["SW_INV_CHALLANGE"]);
                } else if (response=="63 10") {
                    $(this).trigger("owokAlertMessage", ["Falsche PIN!"]);
                } else if (response=="64 01") {
                    $(this).trigger("owokAlertMessage", ["Abbruch der PIN Eingabe!"]);
                } else if (response=="64 02") {
                    $(this).trigger("owokAlertMessage", ["PINs passen nicht zusammen!"]);
                } else if (response=="64 00") {
                    $(this).trigger("owokAlertMessage", ["Timeout PIN Eingabe!"]);
                }
                return false;
            }
        }

    };

    // Das Objekt gibt sich selbst zurück, damit ist es singleton
    return _self;

})();




/**
 * Klasse zur Behandlung von Fehlern
 * @class
 */
var SCJSError = (function(errorcode)
{
    var _self = {

        /**
         * Gibt zu einem Fehlercode eine lesbare Fehlermeldung und den Typ des Fehlers zurück.
         * Errorcodes gibt es bei Fehlerevents, wenn zum Beispiel eine Kartenregistrierung fehlschlägt.
         * @example var error = SCJSError.getErrorMessage(errorcode);
         * if (error.type == SCJSMessageType.WARNING) {
         *    ...
         * }
         * alert(error.message);
         * @see SCJSMessageType
         * @name getErrorMessage
         * @param {mixed} errorcode
         * @return {Object} message Fehlermeldung, type SCJSMessageType
         * @member SCJSError
         * @function
         */
        getErrorMessage: function(errorcode)
        {
            if (parseInt(errorcode, 10) < 0)
                errorcode = parseInt(errorcode, 10);
            var msg = "";
            var type = SCJSMessageType.ERROR; // Fehlertyp ist immer Error, außer es wird weiter unten was anderes gesetzt

            if (errorcode <= -2001 && errorcode >= -2008) {
                msg = "Falsche PIN! Noch "+(-2000-errorcode)+" Versuche.";

            } else {

                switch(errorcode) {
                    case '64 01':msg = "PIN-Eingabe abgebrochen.";type = SCJSMessageType.WARNING;break;
                    case '64 a1':msg = "PIN-Eingabe abgebrochen.";type = SCJSMessageType.WARNING;break;
                    case '64 02':msg = "Neue PIN Nummern stimmen nicht überein!";break;
                    case '64 00':msg = "Zeit für die PIN-Eingabe abgelaufen!";break;
                    case '9d 05':msg = "Ungültiger Lifecycle!";break;
                    case '9d 07':msg = "Ungültige Kartenbeschreibung!";break;
                    case '9d 13':msg = "PIN falsch!";break;
                    case '9d 14':msg = "Interner Fehler!";break;
                    case '9d 16':msg = "Akey Info ungültig!";break;
                    case '9d 17':msg = "Die Karte ist gesperrt!";break;
                    case '9d 18':msg = "PIN muss mindestens " + SmartCardJS.getPinMinLength() +" und nicht mehr als "+ SmartCardJS.getPinMaxLength() + " Zeichen lang sein!";type = SCJSMessageType.ERROR;break;
                    case '9d 19':msg = "Keine PIN!";break;
                    case '9d 1a':msg = "No Auth!";break;
                    case '9d 1f':msg = "Not Allowed!";break;
                    case '9d 21':msg = "Not Supported!";break;
                    case 0:msg =  "Kein Fehler";type = SCJSMessageType.SUCCESS;break;
                    case -1000:msg =  "Keine Session!";break;
                    case -1005:msg =  "Session ungültig";break;
                    case -1011:msg =  "Keine User ID zugewiesen.";break;
                    case -1013:msg =  "Diese Karte ist nicht registriert. Bitte Karte zuerst freischalten.";type = SCJSMessageType.INFO;break;
                    case -1014:msg =  "Fehler beim Authentifizieren der SCJS Light Karte.";break;
                    case -1016:msg =  "Diese SCJS Karte wird bereits verwendet.";break;
                    case -200:msg = "Bitte die Light Karte zuerst auf dem SCJS Light Card Management Server freischalten!";type = SCJSMessageType.INFO;break;
                    case -2000:msg = "Falsche PIN! Karte ist jetzt gesperrt.";break;
                    case -3002:msg = "Keine PIN Fehlversuche mehr übrig! Dies Karte ist gesperrt!";break;
                    default:msg =  "Unbekannter Fehler "+errorcode;
                }
            }

            return {'message': msg, 'type': type};


        }

    };

    return _self;
})();



/**
 * @class
 */
var SCJSMessageType = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning'
};
