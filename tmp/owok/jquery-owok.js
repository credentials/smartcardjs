/**
 * @fileOverview OWOK JQuery-Plugin
 * @author Neuland Multimedia
 * @requires jquery.js
 */


/**
 * OWOK Exception
 * @class
 * @return Exception
 */
var OWOKException = function(message, data)
{
    this.message = message;
    this.data = data;

    this.toString = function()
    {
        return this.message;
    };
};


/**
 * Singleton Klasse für das OWOK Browser Plugin.
 *
 * @example # OWOK initialisieren und Events registrieren
OWOKPlugin.run({
        LoginActionURL: OwokConfig.LoginActionURL,
        LogoutActionURL: OwokConfig.LogoutActionURL,
        ggggOwokPath: OwokConfig.OwokPath,
        ClientRequestScript :OwokConfig.ClientRequestScript
    });
 *
 * @example # Das OwokConfig Objekt kann dann außerhalb der JS Datei mit php ins html der Webseite geschrieben werden
var OwokConfig = {
    LoginActionURL: 'http://url.to/reinersct_owok/htdocs/login_exe.php',
    LogoutActionURL: 'http://url.to/reinersct_owok/htdocs/logout.php',
    OwokPath: 'http://url.to/reinersct_owok/htdocs/owok/',
};
 * @class
 */
var OWOKPlugin = (function() {

    /**
     * Antwort auf die Funktion getUserCardList
     * @event
     * @name OWOKPlugin#owokUserCardListReady
     * @param {String} cardlist
     */

    /**
     * Eine Karte wurde aus einem Kartenleser entfernt
     * @event
     * @name OWOKPlugin#owokCardWasRemoved
     */

    /**
     * Informationen über die Karte
     * @event
     * @name OWOKPlugin#owokUserCardInfoReady
     * @param {JSON} card_data card_data.user_id und card_data.card_info, card_info ist wiederum ein JSON Objekt mit weiteren Daten
     */

    /**
     * Karte wurde erfolgreich zurückgesetzt
     * @event
     * @name OWOKPlugin#owokCardWasReseted
     */

    /**
     * PIN Eingabe über Kartenleser abgebrochen
     * @event
     * @name OWOKPlugin#owokPinCanceled
     * @param {String} errorcode Grund des Abbruchs
     */

    /**
     * Eine Karte wurde erfolgreich registriert
     * @event
     * @name OWOKPlugin#owokCardRegisterSuccess
     */

    /**
     * Fehler beim Registrieren der Karte
     * @event
     * @name OWOKPlugin#owokCardRegisterFail
     * @param {String} errorcode
     */

    /**
     * Eine Karte wurde erfolgreich gelöscht
     * @event
     * @name OWOKPlugin#owokCardDeleteSuccess
     */

    /**
     * Fehler beim Löschen der Karte
     * @event
     * @name OWOKPlugin#owokCardDeleteFail
     * @param {String} errorcode
     */

    /**
     * Bei Beginn der PIN Eingabe
     * @event
     * @name OWOKPlugin#owokPinEntryStart
     */

    /**
     * Login über Light Card ist fehlgeschalgen
     * @event
     * @name OWOKPlugin#owokLightLoginFailed
     * @param {String} errorcode
     */

    /**
     * Eine Light Card wurde in einen Kartenleser gesteckt
     * @event
     * @name OWOKPlugin#owokLightCardWasInserted
     */

    /**
     * Optionsparameter, können von außerhalb gesetzt werden.
     */
    var options = {
        LoginActionURL: '',
        LogoutActionURL: '',
        OwokPath: 'dddddddddddddddd',
        ClientRequestScript: 'foas_request.php',

        PluginFilenameMSIE: 'plugins/rsct_owok_ie-2002.cab',
        PluginFilenameMSIEocx: 'plugins/rsct_owok_ie-2002.ocx',
        PluginFilenameWinNpapi: 'plugins/rsct_owok_npapi_windows-2002.xpi',
        PluginFilenameMacNpapi: 'plugins/rsct_owok_npapi_macos-2002.xpi',
        PluginFilenameLinuxNpapi: 'plugins/rsct_owok_npapi_linux-2002.xpi',

        AutoLogout: 1,
        debug: true
    };


    /**
     * Das OWOK Card Plugin Object für die Kommunikation mit der Karte
     */
    var oca = $('<object></object>');

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
     * @class OWOKPlugin#utils
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
        stripBytes: function(hexStr, startPos, len)
        {
            return hexStr.substring(startPos*3, startPos*3+len*3-1);
        },


        /**
         * Ein Byte aus einem Hex-String holen
         * @param {hexstring} hexStr
         * @param {int} idx Das idx-ste Byte
         * @return {hexstring} Wert an Stelle idx
         * @function
         */
        getByte: function(hexStr, idx)
        {
            var hex = hexStr.substring(idx*3, idx*3+2);
            return hex;
        },

        /**
         * Ein Byte aus einem Hex-String holen
         * @param {hexstring} hexStr
         * @param {int} idx Das idx-ste Byte
         * @return {int} Wert an Stelle idx
         * @function
         */
        getByteAsInt: function(hexStr, idx)
        {
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
        addByte: function(hexStr, byteToAdd)
        {
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
            var ctl = utils.getPcScFeatureCtrlCode(OWOKPlugin.FEATURE_MCT_READER_DIRECT);
            if (ctl==0) {
                alert("Noch nicht verfügbar.");
                return;
            }else {
                return oca.SendIOCTL(ctl, 1, cmd);
            }

            // prüft, ob der Leser sichere PIN Eingabe unterstützt
//            var ctl = utils.getPcScFeatureCtrlCode(OWOKPlugin.FEATURE_MCT_READER_DIRECT);
//            if (ctl==0) {
                // Der Kartenleser unterstützt keine sichere PIN Eingabe

//                var mypin = prompt("Bitte Geheimzahl eingeben.", "");
//                if (!mypin || mypin.length==0) {
//                    return '64 01'; // PIN Eingabe abgebrochen
//                }
//                mypin = utils.convertStringToHexPin(mypin, '60', '10');
//                cmd = tlv.replace(OWOKPlugin.PIN_PLACEHOLDER, mypin);
//                return oca.SendToCard(cmd);

//            } else {
//                // sichere PIN Eingabe mit Kartenleser
//                return oca.SendIOCTL(ctl, 1, cmd);
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
            var features = oca.SendIOCTL(3400, 0, "");
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

        CARD_NO_DESC_STRING: "Unbenannt",

        CARD_CONNECT_TIMEOUT_MS: 3000,

        VERSION: "V 0.1.5",


        /**
         * Das OWOK Object auf der Seite einbinden
         * und die Events registrieren.
         * @name run
         * @member OWOKPlugin
         * @function
         */
        run: function(user_options)
        {
            // Optionen einstellen
            $.extend(options, user_options);
            // create Plugin HTML and append to body
            if($("#OwokPluginObject").length==0) {
                var html_plugin_element = this.createHTMLPluginObject();
                $('body').append( html_plugin_element );
                oca = $("#OwokPluginObject")[0];
                if (OWOKPlugin.open()) {
                    OWOKPlugin.enableEvents();
                    OWOKPlugin.bindEvents();
                    $(OWOKPlugin).trigger('owokReady', []);
                } else {
                    OWOKPlugin.forceBrowserToProvidePlugin();
                    $(OWOKPlugin).trigger('owokNoPluginFound', []);
                    return;
                }
                $("#OWOK>.version").each( function (i, o) {$(o).html( OWOKPlugin.VERSION +'&nbsp;&nbsp;PV '+ oca.GetVersion(0) );} );
            	
            }
        },
        
        restart: function()
        {
        	if (OWOKPlugin.open()) {
                OWOKPlugin.enableEvents();
                $(OWOKPlugin).trigger('owokReady', []);
            }            	
        
        },

        /**
         * Die Funktion aktiviert das Eventhandling
         * @name enableEvents
         * @member OWOKPlugin
         * @function
         */
        enableEvents: function() {
            if (typeof oca.Open != 'undefined')
                return oca.EnableEvents('OwokPluginObject');
        },


        /**
         * Die Funktion deaktiviert das Eventhandling
         * @name disableEvents
         * @member OWOKPlugin
         * @function
         */
        disableEvents: function() {
            if (typeof oca.Open != 'undefined')
                return oca.DisableEvents();
        },


        /**
         * Registriert die OWOK Events mit den entsprechenden Funktionen
         * @name bindEvents
         * @member OWOKPlugin
         * @function
         */
        bindEvents: function()
        {
            // Reader Events
            this.bindOWOKEvent("OnReaderAdded", function(data) {OWOKPlugin.registerCardReader(data);} );
            this.bindOWOKEvent("OnReaderRemoved", function(data) {OWOKPlugin.unregisterCardReader(data);} );
            // Card Events
            this.bindOWOKEvent("OnCardReady", function(data) {OWOKPlugin.onCardReady(data);} );
            this.bindOWOKEvent("OnCardInuse", function(data) {OWOKPlugin.onCardInuse(data);} );
            this.bindOWOKEvent("OnCardUnused", function(data) {OWOKPlugin.onCardUnused(data);} );
            this.bindOWOKEvent("OnCardRemoved", function(data) {OWOKPlugin.onCardRemoved(data);} );
            this.bindOWOKEvent("OnCardError", function(data) {OWOKPlugin.onCardError(data);} );
        },


        /**
         * Bildet ein Event an das OWOK Object
         * @name bindOWOKEvent
         * @member OWOKPlugin
         * @param type Name des Events
         * @param eventHandle Callback Funktion
         * @function
         */
        bindOWOKEvent: function(type, eventHandle)
        {
            $(oca).each(function(index, elem) {
            	if ( elem.attachEvent ) { // Finde heraus, ob es sich um einen IE handelt, der diese Methode unterstützt,
            		elem.attachEvent( type, eventHandle ); // wenn ja binde Event
            	} else { // ansonsten binde mit der default methode
            		elem[type] = eventHandle;
            	}
            });
            return this;
        },


        /**
         * Erstellt das OWOK Object HTML-Tag.
         * Output: <object type="application/chipcard_plugin_20" id="OwokPluginObject" width="1px" height="1px" codebase="http://url.to/rsct_owok_npapi_windows-2000.xpi"></object>
         * @name createHTMLPluginObject
         * @member OWOKPlugin
         * @function
         */
        createHTMLPluginObject: function () {
        	var plugin = '<object type="application/chipcard_plugin_20" '+
                'id="OwokPluginObject" '+
                'width="1px" '+
                'height="1px" ';

            if ($.browser.msie) {
                //plugin += 'CLASSID="CLSID:503F5F92-794F-4273-824E-A3EDF65BFAA4" ';
                plugin += 'codeBase = "' + options.OwokPath + options.PluginFilenameMSIE + '" ';

            }else {
                plugin += 'codeBase = "' + options.OwokPath + options.PluginFilenameWinNpapi + '" ';
                $.getScript( options.OwokPath + "js/jquery.jqbrowser.js",
                    function () {
                		if ( $.browserExtended.linux() ) {
                            plugin += 'codeBase = "' + options.OwokPath + options.PluginFilenameLinuxNpapi + '" ';
                        } else if ( $.browserExtended.mac() ) {
                            plugin += 'codeBase = "' + options.OwokPath + 'plugins/rsct_owok_npapi_macos-20.plugin" ';
                        }
                    });
            }
            plugin += ' ></object>';

//            if ($.browser.mozilla) {
//                var pluginInstalled = false;
//                for (var i = 0; i < navigator.plugins.length; i++) {
//                    if (navigator.plugins[i].name == 'OWOK') {
//                        if ( InstallTrigger.enabled() ) {
//                            InstallTrigger.startSoftwareUpdate(options.OwokPath + options.PluginFilenameWinNpapi );
//                            return 'foo';
//                        }
//                    }
//                }
//            }

            return plugin;

//            var plugin = $('<object type="application/chipcard_plugin_20" ></object>');
//            plugin.attr('id', 'OwokPluginObject');
//            //plugin.attr('classid', 'clsid:166B1BCA-3F9C-11CF-8075-444553540000');
//            plugin.attr('width', '1px');
//            plugin.attr('height', '1px');
//
//            if ($.browser.msie) {
//                plugin.attr('codebase', options.OwokPath + options.PluginFilenameMSIE);
//
//            }else {
//                plugin.attr('codebase', options.OwokPath + options.PluginFilenameWinNpapi);
//                $.getScript( options.OwokPath + "js/jquery.jqbrowser.js",
//                    function () {
//                        if ( $.browser.linux() ) {
//                            plugin.attr('codebase', options.OwokPath + options.PluginFilenameLinuxNpapi);
//                        } else if ( $.browser.mac() ) {
//                            //plugin.attr('codebase', options.OwokPath + options.PluginFilenameMacNpapi);plugins/rsct_owok_npapi_macos-2002-10-6.pkg
//                            plugin.attr('codebase', options.OwokPath + 'plugins/rsct_owok_npapi_macos-20.plugin');
//                        }
//                    });
//            }
//
//            return plugin;
        },


        forceBrowserToProvidePlugin: function()
        {
            var isLinux = false;
            var isMac = false;
            var isWin = false;
            var isMsie = false;
            var isMoz = false;
            var isFirefox = false;
            var isSafari = false;
            $.getScript( options.OwokPath + "js/jquery.jqbrowser.js",
                function () {
                    isLinux = $.browserExtended.linux();
                    isMac = $.browserExtended.mac();
                    isWin = $.browserExtended.win();
                    isMsie = $.browserExtended.msie();
                    isMoz = $.browserExtended.mozilla();
                    isFirefox = $.browserExtended.firefox();
                    isSafari = $.browserExtended.safari();

                    if (isLinux) {
                        // für Linux
                        location.href = options.OwokPath + options.PluginFilenameLinuxNpapi;

                    } else if (isMac) {
                        // für Mac
                        if (isMsie) {
                            //location.href = options.OwokPath + 'plugins/rsct_owok_ie-2002.exe';

                        } else if (isMoz) {
                            try {
                                if ( InstallTrigger.enabled() ) {
                                    InstallTrigger.startSoftwareUpdate(options.OwokPath + options.PluginFilenameWinNpapi );
                                }
                            } catch (e) {
                                location.href = options.OwokPath + options.PluginFilenameMacNpapi;
                            }

                        } else {
                            if ( navigator.appVersion.match(/Mac OS X 10_5/i) )
                                location.href = options.OwokPath + 'plugins/rsct_owok_npapi_macos-2002-10-5.pkg';
                            else
                                location.href = options.OwokPath + 'plugins/rsct_owok_npapi_macos-2002-10-6.pkg';
                        }

                    } else {
                        // Windows
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
         * @member OWOKPlugin
         * @function
         */
        registerCardReader: function(readerName)
        {
            $(this).trigger('owokOnReaderRegistered', [readerName]); // fire Event
        },


        /**
         * Feuert ein owokOnReaderUnregistered Event
         * @name unregisterCardReader
         * @member OWOKPlugin
         * @function
         */
        unregisterCardReader: function(readerName)
        {
            $(this).trigger('owokOnReaderUnregistered', [readerName]); // fire Event
        },

        /**
         * Wird aufgerufen, wenn eine Karte in einen Kartenleser gesteckt wird.
         * Initialisiert die Kommunikation mit der Karte und stellt fest,
         * ob es sich um eine Smart Card oder Light Card handelt
         * @name onCardReady
         * @member OWOKPlugin
         * @param readerName
         * @function
         */
        onCardReady: function(readerName)
        {
            // connect to card
            log('Connecting Card '+readerName);
            is_card_ready = true;

            var rsp = OWOKPlugin.connectCardEx(readerName, 1, 3); // ShareMode 1 = Exklusice Verbindung; PreferredProtocol=3 ist t=0 | t=1

            if (rsp!=0) {
            	if ( oca.GetLastErrorCode() == -2146435061 ) {
                    $(OWOKPlugin).trigger("owokAlertMessage", [OWOKPlugin.getErrorText(oca.GetLastErrorCode())]);
                    $(OWOKPlugin).trigger("owokCardAlreadyInUse", []);
                    return;
                }
            }

            if (!OWOKPlugin.selectOCA()) {
                // kein OCA? Dann ist es vielleicht eine Light Card
                if (OWOKPlugin.isOwokLightCard()) {
                    // OWOK Light Karte gefunden
                    OWOKPlugin.disConnectCardEx(readerName, 1);
                    rsp = OWOKPlugin.connectCardEx(readerName, 1, 3);
                    if (rsp!=0) {
                        $(OWOKPlugin).trigger("owokAlertMessage", ["Bitte Karte neu legen."]);
                        return;
                    }
                    setTimeout(function() {
                        log('Light Card in '+readerName);
                        OWOKPlugin.insertLightCard();
                    }, 100);
                } else {
                    // Ganz falsche Karte
                    $(OWOKPlugin).trigger('owokSmartcardWasInserted', ['', OWOKPlugin.CARD_STATUS_NO_CARD]);
                }
                return;
            }
            this.insertSmartcard();

        },


        /**
         * Wird vom OnCardInuse Event aufgerufen
         * @name onCardInuse
         * @member OWOKPlugin
         * @param readerName
         * @function
         */
        onCardInuse: function(readerName)
        {
            log('OnCardInuse');
            //$(OWOKPlugin).trigger("owokCardAlreadyInUse", []);
        },

        /**
         * Wird vom OnCardUnused Event aufgerufen
         * @name onCardUnused
         * @member OWOKPlugin
         * @param readerName
         * @function
         */
        onCardUnused: function(readerName)
        {
            log('OnCardUnused');
        },

        /**
         * Wird vom OnCardRemoved Event aufgerufen
         * @name onCardRemoved
         * @member OWOKPlugin
         * @param readerName
         * @function
         */
        onCardRemoved: function(readerName)
        {
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
         * @member OWOKPlugin
         * @param readerName
         * @function
         */
        onCardError: function(readerName)
        {
            log("Karte in "+readerName+" meldet Fehler: "+this.getErrorText(this.getLastErrorCode()));
        },


        /**
         * Öffnet die Verbindung zur Karte
         * @name open
         * @return {boolean} success
         * @member OWOKPlugin
         * @function
         */
        open: function()
        {
            try {
                if (typeof oca.Open != 'undefined')
                    return oca.Open('OwokPluginObject') == 0;
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
         * @member OWOKPlugin
         * @function
         */
        connectCard: function(readerName, shareMode)
        {
            var response;

            // Für die alte Version des Plugins
            // Den Connect mehrmals versuchen, weil es sein kann, dass zB Windows 7 die Karte blockt

            var i = 0;
            while ( (response = oca.ConnectCard(readerName, shareMode)) != 0 && i < 15 && is_card_ready) {
                utils.sleep(200);
                log('try connect card '+i+' '+response);
                i++;
            }
            log('ConnectCard '+i+' '+response);

            if (response == 0) {
                connectedReaderName = readerName;
            } else {
                // Hier blockt meistens eine andere App die exklusive Verbindung zur Karte
                alert( OWOKPlugin.getErrorText(oca.GetLastErrorCode()) );
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
         * @member OWOKPlugin
         * @function
         */
        connectCardEx: function(readerName, shareMode, preferredProtocols)
        {
            var response;

            // Für die alte Version des Plugins
            // Den Connect mehrmals versuchen, weil es sein kann, dass zB Windows 7 die Karte blockt
            if ( oca.GetVersion(0) == '2.0.0.0' ) {

                var i = 0;
                while ( (response = oca.ConnectCardEx(readerName, shareMode, preferredProtocols)) != 0 && i < 15 && is_card_ready) {
                    utils.sleep(200);
                    log('try connect card ex '+i+' '+response);
                    i++;
                }
                log('ConnectCardEx '+i+' '+response);


            } else {
                // ab Version 2.0.0.1
                response = oca.ConnectCardEx(readerName, shareMode, preferredProtocols, OWOKPlugin.CARD_CONNECT_TIMEOUT_MS);
            }

            if (response == 0) {
                connectedReaderName = readerName;
            } else {
                // Hier blockt meistens eine andere App die exklusive Verbindung zur Karte
                // showAlertOk( OWOKPlugin.getErrorText(oca.GetLastErrorCode()) );
            }

            return response;
        },


        /**
         * Um eine der nachfolgen Funktionen nutzen zu können, muss zuerst das OCA selektiert werden.
         * Dies erfolgt über das ISO 7816-4 konforme Kommando SELECT by AID.
         * @return Ist das OCA auf der Karte geladen, so wird SW_OK zurückgeliefert.
         * @name selectOCA
         * @member OWOKPlugin
         * @function
         */
        selectOCA: function()
        {
            var response = oca.SendToCard(this.SELECT_OCA_COMMAND);
            return this.checkResponse(response);
        },


        /**
         * Holt den aktuellen LifeCycle-Status einer OWOK Smartcard
         * @example Status:
         *         -1: keine Karte vorhanden
         *         0: ready
         *         1: initialized
         *         2: locked
         * @return {int} Status
         * @name getCardLifeCycle
         * @member OWOKPlugin
         * @function
         */
        getCardLifeCycle: function()
        {
            var response = oca.SendToCard("B2 10 01 02 00").toUpperCase();

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
         * @member OWOKPlugin
         * @function
         */
        getConnectedReaderName: function()
        {
            return connectedReaderName;
        },


        /**
         * Die Funktion liefert eine Liste aller angeschlossenen Kartenleser.
         * @return {string} Die Funktion liefert alle angeschlossenen Leser als String. Die einzelnen Lesernamen sind durch eine CR/LF (#13#10) getrennt.
         * @name getReaderList
         * @member OWOKPlugin
         * @function
         */
        getReaderList: function()
        {
            return oca.GetReaderList();
        },


        /**
         * Eine Liste aller angeschlossenen Kartenleser als Array
         * @return {array} Kartenlesernamen
         * @name getReaderListArray
         * @member OWOKPlugin
         * @function
         */
        getReaderListArray: function()
        {
            var readerList = this.getReaderList();

            if(readerList.length < 1)
                return new Array();

            var readerListArray = readerList.split('\r\n');
            return readerListArray;
        },


        /**
         * Wenn Auto Logout aktiv ist, wird hier an die Logout Seite der Client App weitergeleitet
         * @name logout
         * @member OWOKPlugin
         * @function
         */
        logout: function()
        {
            if (options.AutoLogout == 1) {
                location.href = options.LogoutActionURL;
            }
        },


        /**
         * Startet den Login mit einer OWOK Smartcard.
         * Erstellt eine Session auf dem OAS...
         * Login mit Smartcard Schritt 2: Session ID mit PIN über den Kartenleser verschlüsseln
         * und an den Server senden
         * @name loginOwokCard
         * @member OWOKPlugin
         * @function
         */
        loginOwokCard: function(auto_logout, isGenericCall)
        {
            // nur initialisierte Karten dürfen sich einloggen
            if(this.getCardLifeCycle() != this.CARD_STATUS_INITIALIZED)
                return;

            $(OWOKPlugin).trigger('owokPinEntryStart', []);

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

                    var ctl = utils.getPcScFeatureCtrlCode(OWOKPlugin.FEATURE_MCT_READER_DIRECT);

                    if (ctl==0) {
                        // Unsichere Pin Eingabe
                        OWOKPlugin.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_entry.php", "20%",
                            "javascript:OWOKPlugin.signDataModal('"+auto_logout+"', '"+sid+"')", isGenericCall);
                    } else {
                        // Sichere Pin Eingabe über Kartenleser
                        var signedData = OWOKPlugin.signData(sid);  // hier starten die PIN Eingabe über den Leser
                        log('signed data <'+signedData+'>');
                        OWOKPlugin.loginOwokCardStep2(auto_logout, signedData, isGenericCall);
                    }

               }
            });
        },

        signDataModal: function(auto_logout, data_to_sign, isGenericCall)
        {
            var pin = $("#owok_pin").val();
            pin = utils.convertStringToHexPin(pin, "60", "10");

            var cmd = "00 20 30 00";
            var data = pin + " 40 " + utils.getHexCommandLength(data_to_sign) + " " + data_to_sign;
            cmd = utils.getApduCommand(cmd, data);

            var signedData = oca.SendToCard(cmd);

            if(signedData == '64 01' // User canceled manually
            || signedData == '64 a1'
            || signedData == '64 00' // Timeout
            || signedData == '9d 17' // Karte gesperrt
            || signedData == '9d 13') // Wrong PIN
            {
               var error = OWOKError.getErrorMessage(signedData);
               $("#owok_modal_pin_error").html(error.message);
            } else {
                if (signedData.toUpperCase() == "9D A0") {
                    signedData = OWOKPlugin.getExtendedResponse();
                }
                OWOKPlugin.loginOwokCardStep2(auto_logout, signedData, isGenericCall);
            }
        },


        loginOwokCardStep2: function(auto_logout, signedData, isGenericCall)
        {
        	if(signedData == '64 01' // User canceled manually
            || signedData == '64 a1'
            || signedData == '64 00') // Timeout
            {
                $(OWOKPlugin).trigger('owokPinEntryCanceled', [signedData, OWOKPlugin.getPinTriesLeft()]);
                return;
            }
        	if(signedData == '9d 17' // Karte gesperrt
            || signedData == '9d 13') { // Wrong PIN
                $(OWOKPlugin).trigger('owokWrongPin', [signedData, OWOKPlugin.getPinTriesLeft()]);
                return;
        	}
        	
            //var nocard_logout = $('input[name=owok_nocard_logout]').attr('checked')
            var data = {'owok_login_data': signedData, 'owok_nocard_logout': auto_logout};
            if (!isGenericCall) {
            	auth.authWithOwok (data, options.LoginActionURL);
            }
            else {            	
            	$(OWOKPlugin).trigger('owokPinEntrySuccess', data);
            }
        },

        
        /**
         * Startet einen Login Prozess mit einer Owok Card, aber loggt nicht ein.
         * @param {bool} auto_logout
         * @name prepareLoginOwokCard
         * @member OWOKPlugin
         * @function
         */
        prepareLoginOwokCard: function()
        {
            // nur initialisierte Karten dürfen sich einloggen
            if(this.getCardLifeCycle() != this.CARD_STATUS_INITIALIZED)
                return;

            $(OWOKPlugin).trigger('owokPinEntryStart', []);

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

                    var ctl = utils.getPcScFeatureCtrlCode(OWOKPlugin.FEATURE_MCT_READER_DIRECT);

                    if (ctl==0) {
                        // Unsichere Pin Eingabe
                        //OWOKPlugin.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_entry.php", "20%",
                        //    "javascript:OWOKPlugin.signDataModal('"+auto_logout+"', '"+sid+"')");
                    } else {
                        // Sichere Pin Eingabe über Kartenleser
                        var signedData = OWOKPlugin.signData(sid);  // hier starten die PIN Eingabe über den Leser
                        log('signed data <'+signedData+'>');
                        OWOKPlugin.prepareLoginOwokCardStep2(signedData);
                    }

               }
            });
        },
        

        prepareLoginOwokCardStep2: function( signedData )
        {
            if(signedData == '64 01' // User canceled manually
            || signedData == '64 a1'
            || signedData == '64 00' // Timeout
            || signedData == '9d 17' // Karte gesperrt
            || signedData == '9d 13') // Wrong PIN
            {
                $(document).trigger('meincockpit.prepareOwokCardLogin',[-1, OWOKPlugin.getPinTriesLeft()]);
                return;
            }

            //var nocard_logout = $('input[name=owok_nocard_logout]').attr('checked')
            //var data = {'owok_login_data': signedData, 'owok_nocard_logout': auto_logout};
            $(document).trigger('meincockpit.prepareOwokCardLogin',[signedData, OWOKPlugin.getPinTriesLeft()]);
        },



        /**
         * Die Funktion signiert (verschlüsselt mit USERKEYPriv) die übergebenen Daten.
         * Sendet ein Perform Verification Command an die Karte, das löst eine PIN Eingabe am Leser aus.
         * @param {hexstring} data_to_sign
         * @return {hexstring} response Die verschlüsselten Daten
         * @name signData
         * @member OWOKPlugin
         * @function
         */
        signData: function(data_to_sign)
        {
            var cmd = "00 20 30 00";
            var data = this.PIN_PLACEHOLDER + " 40 " + utils.getHexCommandLength(data_to_sign) + " " + data_to_sign;
            cmd = utils.getApduCommand(cmd, data);

            var response = utils.performVerification(cmd);

            if (response.toUpperCase() == "9D A0") {
                response = OWOKPlugin.getExtendedResponse();
            }

            if (response.length>5)
                response = response.substring(0, response.length-6);

            return response;
        },



        /**
         * Stellt fest ob es sich um eine Light Card handelt
         * @name isOwokLightCard
         * @member OWOKPlugin
         * @function
         */
        isOwokLightCard: function()
        {
            return this.getLightCardId().length == 20;
        },


        /**
         * Startet einen Login Prozess mit einer Light Card
         * @param {string} light_pin
         * @param {bool} auto_logout
         * @name loginLight
         * @member OWOKPlugin
         * @function
         */
        loginLight: function(light_pin, auto_logout, isGeneric)
        {
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

                    var sss = oca.SendToCard("90 5A 00 00 03 00 83 80 00");
                    var key_id = sid.charAt(sid.length - 1); //Die letzte Ziffer der Session ID, liegt immer zwischen 0 und D
                    var r1 = oca.SendToCard("90 AA 00 00 01 0"+key_id+" 00");
                    
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
                                $(OWOKPlugin).trigger('owokLightLoginFailed', [response]);
                                return;
                            }

                            // Schritt 4
                            var r2 = oca.SendToCard(response);

                            // Eine Antwort mit weniger als 2 Byte ist ein Fehler
                            if (r2.length < 5) {
                                log("LOGIN nicht erfoglreich");
                                $(OWOKPlugin).trigger('owokLightLoginFailed', [r2]);
                                return;
                            }

                            // Schritt 5: Die Login Daten an den Client posten, der ruft dann auf dem OAS OsiOwokLightLogin auf
                            var data = {'owok_rsp_step_2': r2, 'owok_nocard_logout': auto_logout, 'owok_sid': sid};
                            if (!isGeneric) {
                            	auth.authWithOwokLight (data, options.LoginActionURL);
                            }
                            else {
                            	$(OWOKPlugin).trigger('owokLightPinCheckSuccess', data);
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
         * @member OWOKPlugin
         * @function
         */
        prepareLoginLight: function(light_pin)
        {
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

                    var sss = oca.SendToCard("90 5A 00 00 03 00 83 80 00");
                    var key_id = sid.charAt(sid.length - 1); //Die letzte Ziffer der Session ID, liegt immer zwischen 0 und D
                    var r1 = oca.SendToCard("90 AA 00 00 01 0"+key_id+" 00");

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
                                $(OWOKPlugin).trigger('owokLightLoginFailed', [response]);
                                return;
                            }

                            // Schritt 4
                            var r2 = oca.SendToCard(response);

                            // Eine Antwort mit weniger als 2 Byte ist ein Fehler
                            if (r2.length < 5) {
                                log("LOGIN nicht erfoglreich");
                                $(OWOKPlugin).trigger('owokLightLoginFailed', [r2]);
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
         * @member OWOKPlugin
         * @function
         */
        insertSmartcard: function()
        {
            log("Check Smartcard");
            var lifecycle = this.getCardLifeCycle();
            var card_id = this.getCardId();

            var sysinfo = OWOKPlugin.sysInfo();
            if (utils.getByteAsInt(sysinfo, 1) != 2) {
                lifecycle = OWOKPlugin.CARD_STATUS_NO_CARD;
            } else {
//                var infoByte2 = utils.getByte(sysinfo, 3);
//                if ( infoByte2.substring(0,1) != "0") {
//                    lifecycle = OWOKPlugin.CARD_STATUS_NO_CARD;
//                    alert("Kontaktlose OWOK Karten werden in dieser Version noch nicht unterstützt!");
//                }
            }


            $(this).trigger('owokSmartcardWasInserted', [card_id, lifecycle]);
        },


        /**
         * Wird aufgerufen wenn eine Smartcard in der Kartenleser gesteckt wurde.
         * Feuert ein owokLightCardWasInserted Event mit ID der Karte und Lifecycle Status
         * @name insertLightCard
         * @member OWOKPlugin
         * @function
         */
        insertLightCard: function()
        {
            log("Check Light Card");
            var card_id = OWOKPlugin.getLightCardId();
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
                    var sss = oca.SendToCard("90 5A 00 00 03 00 83 80 00");
                    var key_id = sid.charAt(sid.length - 1); //Die letzte Ziffer der Session ID, liegt immer zwischen 0 und D
                    var r1 = oca.SendToCard("90 AA 00 00 01 0"+key_id+" 00");
                    
                    if (r1.length<=2) {
                        $(OWOKPlugin).trigger("owokAlertMessage", ["Kann Light Karte nicht erkennen."]);
                        $(OWOKPlugin).trigger("owokLightCardWasInserted", ["", OWOKPlugin.CARD_STATUS_NO_CARD]);
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
                                $(OWOKPlugin).trigger('owokLightCardWasInserted', [card_id, OWOKPlugin.CARD_STATUS_READY]);
                                return;
                            }

                            if (response.APDU_STEP_2)
                                response = response.APDU_STEP_2;

                            if (response.substring(0, 5) != '90 AF') {
                                $(OWOKPlugin).trigger('owokLightCardWasInserted', [card_id, OWOKPlugin.CARD_STATUS_NO_CARD]);
                                return;
                            }

                            var r2 = oca.SendToCard( response );

                            if (r2.length < 5) {
                                $(OWOKPlugin).trigger("owokAlertMessage", ["Fehler! Kann Light Card nicht erkennen (rsp2 '"+r2+"')"]);
                                $(OWOKPlugin).trigger('owokLightCardWasInserted', [card_id, OWOKPlugin.CARD_STATUS_NO_CARD]);
                                return;
                            }

                            $.ajax({
                               type: "POST",
                               url: options.OwokPath + options.ClientRequestScript,
                               data: {'methodName': "OsiOwokLightCheckCard", 'param': {'sid': sid, 'rsp2': r2}},
                               dataType: "json",
                               success: function(response){
                                   if (response.CID) {
                                        OWOKPlugin.isLightCardActive();
                                 	   //$(document).trigger('meincockpit.cardlogin',[sid, r2]);
                                   }
                                   else
                                        $(OWOKPlugin).trigger("owokAlertMessage", [ "Kann OWOK Light Karte nicht erkennen." ]);
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
         * @member OWOKPlugin
         * @function
         */
        isLightCardActive: function()
        {
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
                       $(OWOKPlugin).trigger('owokLightCardWasInserted', [card_id, OWOKPlugin.CARD_STATUS_FACTORY]);

                   } else if (!card_data.USER_ID && card_data.CARD_INFO && card_data.CARD_INFO.length>0) {
//                       log("Light Karte ist auf dem OLPS registriert, aber noch nicht für die Anwendung aktiviert.");
                       $(OWOKPlugin).trigger('owokLightCardWasInserted', [card_id, OWOKPlugin.CARD_STATUS_READY,utils.getByteAsInt( card_data.CARD_INFO, 16 )]);

                   } else {

                	   if ( utils.getByteAsInt( card_data.CARD_INFO, 16 ) == 0) {
                           log("Light Karte ist gesperrt.");
                           $(OWOKPlugin).trigger('owokLightCardWasInserted', [card_id, OWOKPlugin.CARD_STATUS_LOCKED]);

                       } else {
                    	   log("Light Karte aktiv.");
                           $(OWOKPlugin).trigger('owokLightCardWasInserted', [card_id, OWOKPlugin.CARD_STATUS_INITIALIZED,utils.getByteAsInt( card_data.CARD_INFO, 16 )]);
                       }
                   }
               }
             });
         },


        /**
         * Bezeichnung einer Smartcard setzen
         * @param {string} desc Bezeichnung der Karte als ASCII String
         * @name setCardDesc
         * @member OWOKPlugin
         * @function
         */
        setCardDesc: function(desc)
        {
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
         * @member OWOKPlugin
         * @function
         */
        auth: function()
        {
            var cmd = "00 20 00 00";
            cmd = utils.getApduCommand(cmd, this.PIN_PLACEHOLDER);
            return this.checkResponse( utils.performVerification(cmd) );
        },


        /**
         * Ändern der User Pin. Wenn der Kartenleser nur unsichere PIN Eingabe unterstütz
         * wird automatisch changePinUnsafe() aufgerufen.
         * @name changePin
         * @member OWOKPlugin
         * @function
         */
        changePin: function()
        {
            log("changePin");
            $(OWOKPlugin).trigger('owokPinEntryStart', []);
            var response;

            // Den Kartenleser fragen, ob er sichere PIN Eingabe unterstützt
            var ctl = utils.getPcScFeatureCtrlCode(OWOKPlugin.FEATURE_MCT_READER_DIRECT);

            if (ctl==0) {
                // Der Kartenleser unterstützt keine sichere PIN Eingabe
                //alert("Noch nicht verfügbar.");
                OWOKPlugin.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_change.php", "20%",
                    "javascript:OWOKPlugin.changePinModal()");
            } else {
                // Sicheres Ändern der PIN über die Kartenleser Tastatur direkt
                var cmd = "20 19 01 00 2E 52 2C 01 08 1A 00 24 00 00 24 " + this.PIN_PLACEHOLDER + " " + this.PIN_NEW_PLACEHOLDER;
                response = oca.SendIOCTL(ctl, 1, cmd);
                OWOKPlugin.changePin2(response);
            }
        },


        /**
         * Ändern der User Pin für Kartenleser, die keine sichere PIN Eingabe unterstützen.
         * Wird von changePin() aufgerufen.
         * @name changePinUnsafe
         * @member OWOKPlugin
         * @return {hexstring} response Antwort des Kartenlesers
         * @function
         */
        changePinModal: function()
        {
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
                //cmd = cmd.replace(OWOKPlugin.PIN_PLACEHOLDER, mypin);
                //cmd = cmd.replace(OWOKPlugin.PIN_NEW_PLACEHOLDER, newpin);
                response = oca.SendToCard(cmd);
            }

            if ($.modal) $.modal.close();
            OWOKPlugin.changePin2( response );
        },

        changePin2: function(response)
        {
            log("changePin response <"+response+">");
            if (response == this.SW_OK) {
                $(OWOKPlugin).trigger('owokCardPinChangeSuccess', []);
            } else {
                $(OWOKPlugin).trigger('owokCardPinChangeFail', [response, OWOKPlugin.getPinTriesLeft()]);
            }

            //return this.checkResponse(response);
        },



        /**
         * Holt sich eine CSV Liste mit allen Karten des eingeloggten Users von OAS
         * und feuert dann ein owokUserCardListReady Event mit der Liste als Parameter
         * @name getUserCardList
         * @member OWOKPlugin
         * @function
         */
        getUserCardList: function()
        {
            $.ajax({
                type: "POST",
                url: options.OwokPath + options.ClientRequestScript,
                data: {'methodName': "OsiCardList", 'param': {'user_id': null}}, // wird später gesetzt
                success: function(response){
                    log("UserCardList "+response+"");
                    response = $.parseJSON(response);
                    var cardlist = response.CID_LIST;
                    $(OWOKPlugin).trigger('owokUserCardListReady', [cardlist]);
                }
            });
         },


        /**
         * Frägt den OAS nach Informationen über eine Karte.
         * Feuert ein owokUserCardInfoReady Event.
         * @see owokUserCardInfoReady
         * @param card_id
         * @name getUserCardInfo
         * @member OWOKPlugin
         * @function
         */
        getUserCardInfo: function(card_id)
        {
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
                        if (OWOKPlugin.isOwokLightCard()) {
                            cur_pin_tries = utils.getByteAsInt(card_info, 16);
                            if (isNaN(cur_pin_tries)) cur_pin_tries = undefined;
                        } else {
                            cur_pin_tries = OWOKPlugin.getPinTriesLeft();
                        }

                        info = '{"card_version": "'+version+'", "card_id": "'+card_id+'", '+
                            '"pin_info": {"cur_pin_tries": "'+cur_pin_tries+'"}, '+
                            '"login_ok_count": "'+card_data.LOGIN_OK_COUNT+'", "login_fail_count": "'+card_data.LOGIN_FAIL_COUNT+'", "register_time": "'+card_data.REGISTER_TIME+'", "last_check": "'+card_data.LAST_CHECK+'" }';

                    }
                    var ret = '{"user_id": "'+card_data.USER_ID+'", "card_info": '+info+' }';
                    log("UserCardInfo <"+ret+">");

                    $(OWOKPlugin).trigger('owokUserCardInfoReady', card_data.USER_ID);
                }
            });
         },


        /**
         * Setzt die Karte, die sich aktuell im Kartenleser befindet, zurück und
         * löscht die Kartendaten auf dem OAS
         * @see owokPinCanceled
         * @see owokCardWasReseted
         * @name deleteCard
         * @member OWOKPlugin
         * @function
         */
        deleteCard: function()
        {

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

            OWOKPlugin.deleteCard2();

        },

        deleteCard2: function()
        {
            var card_id;
            var resetResponse = this.SW_OK;

            if (this.isOwokLightCard()) {
                card_id = OWOKPlugin.getLightCardId();

            } else {

                card_id = this.getCardId();

                var status = this.getCardLifeCycle();
                if (status==1) {
                    var ctl = utils.getPcScFeatureCtrlCode(OWOKPlugin.FEATURE_MCT_READER_DIRECT);
                    if (ctl==0) {
                        // Unsichere Pin Eingabe
                        unsafe_pin = $("#owok_pin").val();
                        if (!unsafe_pin) {
                            if (!$.modal) {
                                unsafe_pin = '';
                            }

                            OWOKPlugin.showModalPinEntry(OwokConfig.OwokPath+"content/owok_pin_entry.php", "20%",
                                "javascript:OWOKPlugin.deleteCard2()");
                            return;
                        }
                        unsafe_pin = utils.convertStringToHexPin(unsafe_pin, "60", "10");
                    }
                }

                resetResponse = this.resetCard(); // evtl PIN Eingabe über Kartenleser

            }


            if (resetResponse != this.SW_OK) {
                $(OWOKPlugin).trigger('owokPinCanceled', [resetResponse]);
                return;
            }

            // Dem OAS sagen, dass er die Karte löschen soll
            $.ajax({
               type: "POST",
               url: options.OwokPath + options.ClientRequestScript,
               data: {'methodName': "OsiCardDelete", 'param': {'card_id': card_id}},
               success: function(response){
                 if (response==0) {
                    $(OWOKPlugin).trigger('owokCardWasReseted');
                 }else {
                    $(OWOKPlugin).trigger('owokPinCanceled', [response]);
                 }
               }
             });
        },

          /**
         * Rücksetzen der Karte in den Lifecycle Status READY.
         * Bei Initialisierter Karte startet eine PIN Eingabe.
         * Eine gelockter Karte wird einfach so zurückgesetzt
         * @name resetCard
         * @member OWOKPlugin
         * @function
         */
        resetCard: function()
        {
            var status = this.getCardLifeCycle();

            if (status==1) {
                // status inizialisiert
                var cmd = "00 20 25 00";
                if (unsafe_pin && secure_ctl==0) {
                    if ($.modal) $.modal.close();
                    cmd = utils.getApduCommand(cmd, unsafe_pin);
                    unsafe_pin = '';
                    return oca.SendToCard(cmd);
                } else {
                    cmd = utils.getApduCommand(cmd, this.PIN_PLACEHOLDER);
                    return utils.performVerification(cmd);
                }
            } else {
                // status locked
                cmd = "00 20 25 00 00";
                return oca.SendToCard(cmd);
            }
        },


        /**
         * Zeigt ein Modal Window für die Light PIN Eingabe auf der Seite an
         * @name showModalLightLogin
         * @param contentUrl Url zum Inhalt des Modal Window, eine html/php Datei
         * @member OWOKPlugin
         * @function
         */
         showModalLightLogin: function (remainingPinTrys,callbackOnCardRemove)
         {
        	 var enterPin = new EnterCardPin();
        	 enterPin.showPinForm(remainingPinTrys,callbackOnCardRemove);
         },


        /**
         * Zeigt ein Modal Window für PIN Eingabe
         * @name showModalPinEntry
         * @param contentUrl Url zum Inhalt des Modal Window, eine html/php Datei
         * @member OWOKPlugin
         * @function
         */
         showModalPinEntry: function (contentUrl, offsetTop, callbackFunc)
         {
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
         * @member OWOKPlugin
         * @function
         */
        addCardToUser: function()
        {
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
                       $(OWOKPlugin).trigger('owokCardRegisterSuccess');
                   }else {
                       $(OWOKPlugin).trigger('owokCardRegisterFail', [response]);
                   }
               }
             });
        },

        /**
         * Registriert die Karte, die im Leser steckt, für den gerade eingeloggten User.
         * @name mcAddCardToUser
         * @member OWOKPlugin
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
	               	   $(OWOKPlugin).trigger('owokCardRegisterSuccess');
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
         * @member OWOKPlugin
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
                       $(OWOKPlugin).trigger('owokUserDeleteSuccess');
                   }else {
                       $(OWOKPlugin).trigger('owokUserDeleteFail', [response]);
                   }
               }
             });
        },

        /**
         * Die Funktion initialisiert die Smartcard und setzt sie in den Lifecycle Status initialized
         * @param {hexstring} key_len Key Länge
         * @param {ascii string} desc Bezeichnung der Karte
         * @name initialize
         * @member OWOKPlugin
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
                response = oca.SendToCard(cmd);
            } else {
                response = utils.performVerification(cmd);
            }
            unsafe_pin = '';

            if (response.toUpperCase() == "9D A0") {
                response = OWOKPlugin.getExtendedResponse();
            }

            return response;
        },


        /**
         * Nachdem AW_DATA_AVAIL (9d a0) von der Karte zurückgegeben wurde, kann man mit dieser Funktion die komplette extended Antwort-Response anfragen.
         * Liest  die  Antwortdaten  einer  OCA  Funktion  in  Blöcken  von  kleiner gleich  255  Byte  wenn  diese SW_DATA_AVAIL zurückgegeben hat.
         * @name getExtendedResponse
         * @member OWOKPlugin
         * @function
         */
        getExtendedResponse: function()
        {
            var d0 = OWOKPlugin.getResponse(0);
            var d1 = OWOKPlugin.getResponse(1);

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
         * @member OWOKPlugin
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
                                   $(OWOKPlugin).trigger('owokCardDeleteSuccess');
                               } else {
                                   $(OWOKPlugin).trigger('owokCardDeleteFail', [response]);
                               }
                           }
                         });
                   } else {
                       log("Fehler. Die Karte ist nicht dem User zugeordnet.");
                       $(OWOKPlugin).trigger('owokCardDeleteFail', [response]);
                   }
               }
            });
        },


        /**
         * Liest die Antwortdaten einer OCA Funktion in Blöcken von kleiner gleich 255 Byte, wenn diese SW_DATA_AVAIL zurückgegeben hat.
         * @return {hexstring} response
         * @name getResponse
         * @member OWOKPlugin
         * @function
         */
        getResponse: function( blocknummer )
        {
            cmd = "B2 40 00 00 00";
            if (blocknummer==1)
                cmd = "B2 40 00 01 00";
            return oca.SendToCard(cmd);
        },

        /**
         * Die Versionsnummer der Karte
         * @return {hexstring} version
         * @name getCardVersion
         * @member OWOKPlugin
         * @function
         */
        getCardVersion: function()
        {
            var response = oca.SendToCard("B2 10 01 01 00");
            return response.substring(0, response.length-6);
        },

        /**
         * Maximale Anzahl an möglichen PIN Fehlversuchen
         * @return {int} pinTries
         * @name getPinTriesMax
         * @member OWOKPlugin
         * @function
         */
        getPinTriesMax: function()
        {
            var response = oca.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 2).toString();
        },

        /**
         * Aktuelle Anzahl an noch möglichen PIN Fehlversuchen
         * @return {int} pinTries
         * @name getPinTriesLeft
         * @member OWOKPlugin
         * @function
         */
        getPinTriesLeft: function()
        {
            var response = oca.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 3).toString();
        },

        /**
         * Minimale Länge einer Smartcard PIN
         * @return {int} pinLength
         * @name getPinMinLength
         * @member OWOKPlugin
         * @function
         */
        getPinMinLength: function()
        {
            var response = oca.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 4).toString();
        },

        /**
         * Maximale Länge einer Smartcard PIN
         * @return {int} pinLength
         * @name getPinMaxLength
         * @member OWOKPlugin
         * @function
         */
        getPinMaxLength: function()
        {
            var response = oca.SendToCard("B2 10 01 04 00");
            return utils.getByteAsInt(response, 5).toString();
        },

        /**
         * Die Karten ID einer Smartcard
         * @return {hexstring} card_id
         * @name getCardId
         * @member OWOKPlugin
         * @function
         */
        getCardId: function()
        {
        	var response = oca.SendToCard("B2 10 00 08 00");
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
            return oca.SendToCard("14 04 10 00 04 10");
        },

        /**
         * Der Länge des asymetrischen Schlüssels
         * @return {hexstring} aKeyPup
         * @name getAKeyPup
         * @member OWOKPlugin
         * @function
         */
        getAKeyInfo: function()
        {
            var response = oca.SendToCard("B2 10 00 20 00");

            return response.substring(5, response.length-6);
        },

        /**
         * Der öffentliche Teil des asymetrischen Schlüssels
         * @return {hexstring} aKeyPup
         * @name getAKeyPup
         * @member OWOKPlugin
         * @function
         */
        getAKeyPup: function()
        {
            var response = oca.SendToCard("B2 10 00 40 00");

            if (response.toUpperCase() == "9D A0") {
                response = OWOKPlugin.getExtendedResponse();
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
         * @member OWOKPlugin
         * @function
         */
        getCardDescription: function()
        {
            var desc = "";
            var data = oca.SendToCard("B2 10 00 10 00");

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
         * @member OWOKPlugin
         * @function
         */
        disConnectCard: function(readerName)
        {
            var response = -1;
            if (readerName == connectedReaderName || !connectedReaderName) {
                response = oca.DisConnectCard();
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
         * @member OWOKPlugin
         * @function
         */
        disConnectCardEx: function(readerName, disposition)
        {
            var response = -1;
            if (readerName == connectedReaderName || !connectedReaderName) {
                response = oca.DisConnectCardEx(disposition);
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
         * @member OWOKPlugin
         * @function
         */
        getLastErrorCode: function()
        {
            return oca.GetLastErrorCode();
        },

        /**
         * Die Funktion liefert eine textuelle Beschreibung eines übergebenen Statuscode bzw. Fehlercodes zurück.
         * @param {int} errorCode
         * @return {int} status Wurde noch keine PC/SC Funktion aufgerufen, so ist 0 zurückzugeben.
         * @name getErrorText
         * @member OWOKPlugin
         * @function
         */
        getErrorText: function(errorCode)
        {
            var error = oca.GetErrorText(errorCode);
            return error;
        },

        /**
         * Ermittelt den aktuellen Status mittels SCardGetStatusChange.
         * @return {int} eventState Die Funktion liefert den Wert aus dwEventState des SCARD_READERSTATE im Erfolgsfall und 0xFFFFFFFF im Fehlerfall zurück. Der Fehlercode kann dann über die Funktion GetLastErrorCode ermittelt werden.
         * @name getCardStatus
         * @member OWOKPlugin
         * @function
         */
        getCardStatus: function()
        {
            return oca.GetCardStatus(connectedReaderName);
        },

        /**
         * Setzt das Plugin  in den  Initial-Zustand zurück.Ein noch verbundener Leser wird automatisch mit SCARD_RESET_CARD disconnected.
         * @return {status} Status oder Fehlercode
         * @name reset
         * @member OWOKPlugin
         * @function
         */
        reset: function()
        {
            return oca.Reset();
        },

        /**
         * Sendet einen Befehl an die Karte
         * @param {hexstring} cmd
         * @return {int} response
         * @name sendToCard
         * @member OWOKPlugin
         * @function
         */
        sendToCard: function(cmd)
        {
            return oca.SendToCard(cmd);
        },


        /**
         *
         * @return {hexstring} aKeySupported
         * @name getCardAKeySupported
         * @member OWOKPlugin
         * @function
         */
        getCardAKeySupported: function()
        {
            var response = oca.SendToCard("B2 10 01 08 00");
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
         * @member OWOKPlugin
         * @function
         */
        getLightCardId: function()
        {
            var response = oca.SendToCard("FF CA 00 00 00");
            var card_id = utils.stripBytes(response, 0, 7);
            return card_id;
        },


        /**
         * Eine Light Card ID ist 7 Byte lang
         * @return {hexstring} card_id
         * @name getLightCardId
         * @member OWOKPlugin
         * @function
         */
        sysInfo: function()
        {
            var response = oca.SendToCard("B2 10 A0 40 00");
            log("Sys Info <"+response+">");
            return response;
        },


        /**
         *
         * @param {hexstring} version
         * @return {boolean} isLightVersion
         * @name isLightCardVersion
         * @member OWOKPlugin
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
         * @member OWOKPlugin
         * @function
         */
        getCardATR: function(readerName)
        {
            return oca.GetCardATR(readerName);
        },



        /**
         * Prüft die Antwort von der Karte sw1sw2.
         * Feuert ein owokAlertMessage Event mit entsprechender Fehlermeldung
         * @param {hexstring} response
         * @return {boolean} success true bei korrekter Antwort, sonst false
         * @name checkResponse
         * @member OWOKPlugin
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
var OWOKError = (function(errorcode)
{
    var _self = {

        /**
         * Gibt zu einem Fehlercode eine lesbare Fehlermeldung und den Typ des Fehlers zurück.
         * Errorcodes gibt es bei Fehlerevents, wenn zum Beispiel eine Kartenregistrierung fehlschlägt.
         * @example var error = OWOKError.getErrorMessage(errorcode);
         * if (error.type == OWOKMessageType.WARNING) {
         *    ...
         * }
         * alert(error.message);
         * @see OWOKMessageType
         * @name getErrorMessage
         * @param {mixed} errorcode
         * @return {Object} message Fehlermeldung, type OWOKMessageType
         * @member OWOKError
         * @function
         */
        getErrorMessage: function(errorcode)
        {
            if (parseInt(errorcode, 10) < 0)
                errorcode = parseInt(errorcode, 10);
            var msg = "";
            var type = OWOKMessageType.ERROR; // Fehlertyp ist immer Error, außer es wird weiter unten was anderes gesetzt

            if (errorcode <= -2001 && errorcode >= -2008) {
                msg = "Falsche PIN! Noch "+(-2000-errorcode)+" Versuche.";

            } else {

                switch(errorcode) {
                    case '64 01':msg = "PIN-Eingabe abgebrochen.";type = OWOKMessageType.WARNING;break;
                    case '64 a1':msg = "PIN-Eingabe abgebrochen.";type = OWOKMessageType.WARNING;break;
                    case '64 02':msg = "Neue PIN Nummern stimmen nicht überein!";break;
                    case '64 00':msg = "Zeit für die PIN-Eingabe abgelaufen!";break;
                    case '9d 05':msg = "Ungültiger Lifecycle!";break;
                    case '9d 07':msg = "Ungültige Kartenbeschreibung!";break;
                    case '9d 13':msg = "PIN falsch!";break;
                    case '9d 14':msg = "Interner Fehler!";break;
                    case '9d 16':msg = "Akey Info ungültig!";break;
                    case '9d 17':msg = "Die Karte ist gesperrt!";break;
                    case '9d 18':msg = "PIN muss mindestens " + OWOKPlugin.getPinMinLength() +" und nicht mehr als "+ OWOKPlugin.getPinMaxLength() + " Zeichen lang sein!";type = OWOKMessageType.ERROR;break;
                    case '9d 19':msg = "Keine PIN!";break;
                    case '9d 1a':msg = "No Auth!";break;
                    case '9d 1f':msg = "Not Allowed!";break;
                    case '9d 21':msg = "Not Supported!";break;
                    case 0:msg =  "Kein Fehler";type = OWOKMessageType.SUCCESS;break;
                    case -1000:msg =  "Keine Session!";break;
                    case -1005:msg =  "Session ungültig";break;
                    case -1011:msg =  "Keine User ID zugewiesen.";break;
                    case -1013:msg =  "Diese Karte ist nicht registriert. Bitte Karte zuerst freischalten.";type = OWOKMessageType.INFO;break;
                    case -1014:msg =  "Fehler beim Authentifizieren der OWOK Light Karte.";break;
                    case -1016:msg =  "Diese OWOK Karte wird bereits verwendet.";break;
                    case -200:msg = "Bitte die Light Karte zuerst auf dem OWOK Light Card Management Server freischalten!";type = OWOKMessageType.INFO;break;
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
var OWOKMessageType = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning'
};
