var OwokConfig = {
	LoginActionURL: 'api/auth/owoklogin/',
	LogoutActionURL: '/2/owok_demo/logout.php',
	ClientRequestScript: 'api/accounts/owok/osi/',
	AddCardActionUrl: 'api/accounts/owok/add_card/',
	EnableQuickLogin: '1',
	OwokPath: '',
	AutoLogout: '0',
	Debug: false
};

function displayMessage(value){
	if (value=="") {
		$('#messagebox').slideUp(500);
	} else {

		$('#messagebox').slideUp(500,function(){
			$('#messagebox').html("<div class=\"center\">"+value+"</div>");
		})
		.delay(1000)
		.slideDown(500, function() {
			$('#messagebox').html("<div class=\"center blink\">"+value+"</div>");
		});
	}
}

/**
 * @fileOverview Javascript für die OWOK Login Seite
 * @author Neuland Multimedia
 * @requires jquery.js
 * @requires jquery-owok.js
 */

$(document).ready(function() {

    //displayMessage('Zum Einloggen bitte OWOK-Karte in den Kartenleser einführen/auflegen.', OWOKMessageType.INFO);

//    $(OWOKPlugin).bind('owokReady owokSmartcardWasInserted owokCardWasRemoved owokOnReaderRegistered owokOnReaderUnregistered owokLightCardWasInserted', function() {
//        if (isUserLoggedIn(oAllyve)) {
//        	return;
//        }
//
//        var readerList = OWOKPlugin.getReaderListArray();
//        var output = "";
//        for (var i=0; i<readerList.length; i++) {
//            var isAktiv = (readerList[i] == OWOKPlugin.getConnectedReaderName());
//            output += "<div class='"+((isAktiv) ? "owok_active_reader_name" : "owok_inactive_reader_name" )+"'>"+readerList[i]+"</div>";
//        }
//        if (!output) {
//            displayMessage(allyve.mandant.insertReaderMessage(), OWOKMessageType.INFO);
//        } else {
//            displayMessage(allyve.mandant.insertCardMessage(), OWOKMessageType.INFO);
//        }
//        $(".reg_button").html(output);
//    });


//    $(OWOKPlugin).bind('owokSmartcardWasInserted', function(event, card_id, lifecycle) {
//    	if(new ConfirmCardDeactivation().isActive()) { return; };
//
//    	if (isUserLoggedIn(oAllyve)) {
//        	if ( isCardAlreadyInUse(lifecycle)) {
//            	var cardId= OWOKPlugin.getCardId();
//            	var owokUserCardInfoReady = function(event, cardInfoUserId){
//            		if(typeof(cardInfoUserId)=="undefined"){
//                		showMessageCardCanBeRegistered();
//                	} else {
//                		showMessageAlreadyInUse();
//                	}
//                	$(OWOKPlugin).unbind('owokUserCardInfoReady',owokUserCardInfoReady);
//            	};
//            	$(OWOKPlugin).bind('owokUserCardInfoReady',owokUserCardInfoReady);
//            	
//            	var userInfo = OWOKPlugin.getUserCardInfo(card_id);
//        		return;
//        	}
//    		if ( ! isCardRegisteredWithOlps(lifecycle)) {
//        		showPleaseRegisterWithOlps();
//        		return;
//        	}
//        	if ( isCardLocked(lifecycle)) {
//        		showMessageCardIsLocked();
//        		return;
//        	}
//        	if ( isCardRegistrable(lifecycle)) {
//        		showPleaseRegisterWithOlps();
//        		return;
//        	}
//
//        	return;
//        }
//
//
//        $('#owok_tab_owok_pin').trigger('click');
//
//        if (lifecycle == OWOKPlugin.CARD_STATUS_INITIALIZED)
//        {
//            displayMessage('OWOK Karte bereit.', OWOKMessageType.SUCCESS);
//            if (!OwokConfig.EnableQuickLogin || OwokConfig.EnableQuickLogin==0) {
//                $("#owok_card_login_form").show();
//            } else {
//            	var cardId= OWOKPlugin.getCardId();
//            	var owokUserCardInfoReady = function(event, cardInfoUserId){
//            		if(typeof(cardInfoUserId)=="undefined"){
//                		//Kein Benutzer an die Karte gebunden
//            			account.showRegisterDialogOwok();
//                	} else {
//                		//Benutzer an die Karte gebunden
//                    	auth.initAuthWithOwok();
//                		//OWOKPlugin.loginOwokCard(OwokConfig.AutoLogout);
//                	}
//                	$(OWOKPlugin).unbind('owokUserCardInfoReady',owokUserCardInfoReady);
//            	};
//            	$(OWOKPlugin).bind('owokUserCardInfoReady',owokUserCardInfoReady);
//            	var userInfo = OWOKPlugin.getUserCardInfo(card_id);
//        		return;
//            	OWOKPlugin.loginOwokCard(OwokConfig.AutoLogout);
//            }
//        } else if (lifecycle == OWOKPlugin.CARD_STATUS_FACTORY)
//        {
//    		showPleaseRegisterWithOlps();
//        } else if (lifecycle == OWOKPlugin.CARD_STATUS_READY)
//        {
//    		showPleaseRegisterWithOlps();
//        } else if (lifecycle == OWOKPlugin.CARD_STATUS_LOCKED)
//        {
//            displayMessage('Diese OWOK-Karte ist gesperrt! Bitte die Karte in der Benutzerverwaltung zurücksetzen.', OWOKMessageType.ERROR);
//        } else if (lifecycle == OWOKPlugin.CARD_STATUS_NO_CARD)
//        {
//            displayMessage('Keine OWOK Karte.', OWOKMessageType.ERROR);
//        }
//    });


//    $(OWOKPlugin).bind('owokLightCardWasInserted', function(event, card_id, lifecycle, remainingPinTrys) {
//    	if(new ConfirmCardDeactivation().isActive()) { return; };
//    	if (isUserLoggedIn(oAllyve)) {
//        	if ( isCardAlreadyInUse(lifecycle)) {
//        		showMessageAlreadyInUse();
//        		return;
//        	}
//    		if ( ! isCardRegisteredWithOlps(lifecycle)) {
//        		showPleaseRegisterWithOlps();
//        		return;
//        	}
//        	if ( isCardLocked(lifecycle)) {
//        		showMessageCardIsLocked();
//        		return;
//        	}
//        	if ( isCardRegistrable(lifecycle)) {
//        		showMessageCardCanBeRegistered();
//        		return;
//        	}
//        	return;
//        }
//
//
//        $('#owok_tab_owok_pin').trigger('click');
//
//		if (!OwokConfig.EnableQuickLogin || OwokConfig.EnableQuickLogin==0) {
//            return;
//        }
//
//        if (lifecycle == OWOKPlugin.CARD_STATUS_FACTORY) {
//        	showPleaseRegisterWithOlps();
//        } else if( lifecycle == OWOKPlugin.CARD_STATUS_READY) {
//            // Karte auf dem OLPS registriert, aber nicht für diese App.
//        	OWOKPlugin.createNewUser();
//        	//displayMessage('Karte bitte erst in der Benutzerverwaltung freischalten.', OWOKMessageType.HINT);
//
//        } else if (lifecycle == OWOKPlugin.CARD_STATUS_INITIALIZED) {
//            // Login Dialog zeigen
//        	OWOKPlugin.showModalLightLogin(remainingPinTrys);
//
//        } else if (lifecycle == OWOKPlugin.CARD_STATUS_LOCKED) {
//        	alert("Diese Karte ist gesperrt und kann nicht mehr verwendet werden.");
//            displayMessage('Diese Light Karte ist gesperrt und kann nicht mehr verwendet werden.', OWOKMessageType.ERROR);
//
//        } else {
//            displayMessage('Kann Light Karte nicht erkennen. Bitte versuchen Sie es erneut.', OWOKMessageType.ERROR);
//        }
//    });

//    $(OWOKPlugin).bind("owokCardAlreadyInUse", function() {
//		showAlertOk(allyve.mandant.msgCardPluginBlocked(), allyve.mandant.headerAchtung());
//	});

//    $(OWOKPlugin).bind('owokNoPluginFound', function(event) {
//        if (isUserLoggedIn(oAllyve)) {
//        	return;
//        }
//        displayMessage('Für Ihren Browser ist noch kein OWOK Plugin zur Kommunikation mit Ihrem Kartenlesegerät installiert.', OWOKMessageType.WARNING);
//    });


//    $(OWOKPlugin).bind('owokCardWasRemoved', function(event) {
//        var eventHandler = new AllyveEvents();
//        eventHandler.raiseEvent('owokCardWasRemoved');
//
//    	if (isUserLoggedIn(oAllyve)) {
//        	return;
//        }
//
//        modalDialog.hide();
//    	var pinDialog = new EnterCardPin();
//    	pinDialog.hide();
//    	//displayMessage('Zum Einloggen bitte OWOK-Karte in den Kartenleser einführen/auflegen.', OWOKMessageType.INFO);
//        $("#owok_light_pin").val('');
//        $("#owok_light_login_form").hide();
//        $("#owok_card_login_form").hide();
//    });


//    $(OWOKPlugin).bind('owokCardWasRemoved', function(event) {
//        //displayMessage('Zum Einloggen bitte Karte in den Leser stecken.', 'hint');
//    });


//    $(OWOKPlugin).bind('owokPinEntryStart', function(event) {
//        $(".login_btn").attr('disabled', 'disabled');
//        displayMessage('Bitte Geheimzahl eingeben.', OWOKMessageType.SUCCESS);
//    });


//    $(OWOKPlugin).bind('owokPinEntryCanceled', function(event, signedData, pinTriesLeft) {
//        if (isUserLoggedIn(oAllyve)) {
//        	return;
//        }
//
//        $(".login_btn").attr('disabled', '');
//        // User canceled manually
//        if(signedData == '64 01')
//            displayMessage("PIN-Eingabe abgebrochen.", "error");
//
//        // Timeout
//        if(signedData == '64 00')
//            displayMessage("Zeit für die PIN-Eingabe abgelaufen!", "error");
//
//        // Wrong PIN
//        if(signedData == '9d 13')
//            displayMessage("PIN falsch! Noch " + pinTriesLeft + " Versuche.", "error");
//    });



//    $(OWOKPlugin).bind('owokLightLoginFailed', function(event, errorcode) {
//        if (isUserLoggedIn(oAllyve)) {
//        	return;
//        }
//
//        if (errorcode <= -2000 && errorcode >= -2008) {
//            displayMessage("Falsche PIN! Noch "+(-2000-parseInt(errorcode,10))+" Versuche.", OWOKMessageType.ERROR);
//       } else if (errorcode == -3002 ) {
//            displayMessage("Keine PIN Fehlversuche mehr übrig! Dies Karte ist gesperrt!", OWOKMessageType.ERROR);
//       } else if (errorcode == -22 ) {
//            displayMessage("Diese Karte ist nicht registriert. Bitte zuerst normal einloggen und freischalten.", OWOKMessageType.ERROR);
//        } else {
//            displayMessage("Fehler bei Login mit OWOK Light Karte. "+errorcode, OWOKMessageType.ERROR);
//        }
//    });


    /**
     * OWOK Plugin starten
     * @param {array} config Konfigurationsparamenter
     */
//    OWOKPlugin.run({
//        LoginActionURL: OwokConfig.LoginActionURL,
//        LogoutActionURL: OwokConfig.LogoutActionURL,
//        OwokPath: OwokConfig.OwokPath,
//        ClientRequestScript :OwokConfig.ClientRequestScript,
//        debug : OwokConfig.Debug
//    });
//    OWOKPlugin.disableEvents();
});

function owokSubmitOwokLogin() {
    var auto_logout = 0;
    if ($("#owok_auto_logout").attr('checked')) {
    	auto_logout = 1;
    }
    OWOKPlugin.loginOwokCard(auto_logout);
}

function isUserLoggedIn(oAllvye) {
	return oAllvye.isInitalized;
}

function isCardRegisteredWithOlps(lifecycle) {
	if (lifecycle == OWOKPlugin.CARD_STATUS_FACTORY) {
		return false;
	}
	return true;
}

function isCardLocked(lifecycle) {
	if (lifecycle == OWOKPlugin.CARD_STATUS_LOCKED) {
		return true;
	}
	return false;
}

function isCardRegistrable(lifecycle) {
	if (lifecycle == OWOKPlugin.CARD_STATUS_READY) {
		return true;
	}
	return false;
}

function isCardAlreadyInUse(lifecycle) {
	if (lifecycle == OWOKPlugin.CARD_STATUS_INITIALIZED) {
		return true;
	}
	return false;
}

function showPleaseRegisterWithOlps() {
	var registerWithOlps = new RegisterWithOlps();
	registerWithOlps.show();
}

function showMessageCardIsLocked() {
	//alert('Diese OWOK-Karte ist gesperrt! Bitte die Karte in der Benutzerverwaltung zurücksetzen.');
}

function showMessageCardCanBeRegistered() {
	//alert('Diese OWOK-Karte kann für Ihren Account freigeschaltet werden!');
	var addCartToAccount = new AddCardToAccount();
	addCartToAccount.showForm();
}

function showMessageAlreadyInUse() {
	//alert('Diese OWOK-Karte ist bereits in Gebrauch!');
}

function addCardToAccount() {
	OWOKPlugin.mcAddCardToUser();
}
