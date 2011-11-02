/**
 * Allgemeine Fehlermeldung
 * @event
 * @name OWOKEventManager#owokAlertMessage
 * @param {string} Fehlertext
 */

/**
 * Fehler: der Browser wird nicht unterstützt, dass Plugin kann daher nicht geladen werden
 * @event
 * @name OWOKEventManager#owokBrowserNotSupported
 * @param {string} Fehlertext 
 */

/** 
 * Eine andere Anwendung hat bereits exklusiven Zugriff auf die aufgelegte Karte
 * @event
 * @name OWOKEventManager#owokCardAlreadyInUse
 */

/**
 * Karte wurde erfolgreich initialisiert
 * @event
 * @name OWOKEventManager#owokCardInitialized
 * @param {hexstring} card_id
 */

/** 
 * Eine Karte wurde auf dem Chipkartenleser aufgelegt
 * @event
 * @param {hexstring} card_id
 * @param {int} lifecycle
 * @name OWOKEventManager#owokCardInserted
 */

/** 
 * Die Karte wurde gerade eben gesperrt. Falsche PIN Eingabe.
 * @event
 * @name OWOKEventManager#owokCardLocked
 */

/** 
 * Das Ändern der Kartenpin ist fehlgeschlagen
 * @event
 * @param {hexstring} errorcode
 * @param {integer} pinTriesLeft
 * @param {integer} pinMinLength
 * @param {integer} pinMaxLength
 * @name OWOKEventManager#owokCardPinChangeFail
 */

/** 
 * Die PIN wurde erfolgreich geändert
 * @event
 * @name OWOKEventManager#owokCardPinChangeSuccess
 */

/** 
 * Die Karte wurde erfolgreich zurückgesetzt
 * @event
 * @name OWOKEventManager#owokCardReseted
 * @param {hexstring} old_card_id alte Kartenid
 */

/** 
 * Eine Karte wurde aus einem Chipkartenleser entfernt
 * @event
 * @name OWOKEventManager#owokCardWasRemoved
 */

/**
 * Karte wurde erfolgreich zurückgesetzt
 * @event
 * @name OWOKEventManager#owokCardWasReseted
 */

/**
 * Lightkarte wurde erfolgreich registriert
 * @event
 * @name OWOKEventManager#owokLightCardRegistration
 */

/**
 * Der Login mit einer Lightkarte ist fehlgeschlagen
 * @event
 * @param {hexstring} Errorcode
 * @name OWOKEventManager#owokLightLoginFailed
 */

/** 
 * Fehler: das Plugin wurde nicht gefunden
 * @event
 * @name OWOKEventManager#owokNoPluginFound
 */

/** 
 * Fehler des OAS Servers, falsche URL eingestellt?
 * @event
 * @name OWOKEventManager#owokOASNotResolved 
 */

/** 
 * Die aufgelegte Karte steht nun zur Verfügung
 * @event
 * @name OWOKEventManager#owokOnCardReady
 * @param {string} Chipkartenlesername
 */

/** 
 * Ein Chipkartenleser wurde angeschlossen
 * @event
 * @name OWOKEventManager#owokOnReaderRegistered
 * @param {string} Chipkartenlesername
 */

/**
 * Ein Chipkartenleser wurde entfernt
 * @event
 * @name OWOKEventManager#owokOnReaderUnregistered
 * @param {string} Chipkartenlesername
 */

/** 
 * PIN Eingabe über Chipkartenleser abgebrochen
 * @event
 * @param {hexstring} errorcode
 * @param {integer} pinTriesLeft
 * @param {integer} pinMinLength
 * @param {integer} pinMaxLength
 * @name OWOKEventManager#owokPinEntryCanceled
 */

/** 
 * PIN Eingabe über den Chipkartenleser gestartet
 * @event
 * @name OWOKEventManager#owokPinEntryStart
 */

/**
 * Das OWOKPlugin wurde erfolgreich gestartet und es stehen jetzt alle Funktionalitäten zur Verfügung
 * @event
 * @name OWOKEventManager#owokReady
 */

/**
 * Otp Key wurde erfolgreich gelöscht
 * @event
 * @name OWOKEventManager#owokUserDeleteOtpKeySuccess
 */

/**
 * Otp Key wurde erfolgreich gesetzt
 * @event
 * @name OWOKEventManager#owokUserSetOtpKeySuccess
 */

/**
 * Sendet die OWOK Events raus
 * @class
 */
function OWOKEventManager ()
{
    /**
     * Debug Modus an/aus, wenn an wird jedes Event auf der Konsole ausgegeben
     * @type {boolean}
     * @private
     */
    var debugMode = false;

    // -------------------------------------------------
    // ------------ public methoden --------------------
    // -------------------------------------------------
    
    /**
     * triggert das Event!
     * @memberOf OWOKEventManager
     * @param {string} eventToSend Name des Events
     * @param {array} arg die Parameter des Events
     * @function
     * @public
     */
    this.sendEvent = function (eventToSend, arg){
        // log
        log (eventToSend, arg, this.sendEvent.caller);

        // send event
        $(OWOKEventManager).trigger (eventToSend, arg);
    }

    /**
     * Schaltet den Debugmodus an/aus
     * @param {boolean} _debugMode
     * @memberOf OWOKEventManager
     * @function
     * @public
     */
    this.setDebugMode = function (_debugMode)
    {
        debugMode = _debugMode;
    }

    /**
     * Gibt den aktuellen Debugmodus zurück
     * @return {boolean}
     * @memberOf OWOKEventManager
     * @function
     * @public
     */
    this.getDebugMode = function ()
    {
        return debugMode;
    }

    /**
     * Schreibt Debug Ausgaben in die Browser Console, wenn Debug Modus aktiv
     * @param {string} eventToSend das Event das verschickt wird
     * @param {string} arg die Parameter des Events das verschickt wird
     * @param {object} caller die Funktion die das sendEvent () aufgerufen hat (Traceback)
     * @memberOf OWOKEventManager
     * @function
     * @private
     */
    function log (eventToSend, arg, caller)
    {
        var message;

        message = "Event: " + eventToSend + " " + arg + " - called by " + caller;
        
        if (debugMode == true){
            if(window.console) {
                if (window.console.debug){
                    window.console.debug (message);
                }
                else if (window.console.log) {
                    window.console.log (message);
                }
            }
        }
    }
}
