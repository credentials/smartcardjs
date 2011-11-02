
function StatusCheck() {
	if (StatusCheck.instance !== undefined)
		return StatusCheck.instance;
	StatusCheck.instance = this;
	var a = this, b = null, d, e;
	this.prepareLogin = function() {
		a.showDialog();
		a.bindLoginEvents();
		a.resetOwok()
	};
	this.prepareCardAdd = function() {
		a.showDialog();
		a.bindAddCardEvents();
		a.resetOwok()
	};
	this.prepareCardDisconnect = function() {
		a.showDialog();
		a.bindDisconnectCardEvents();
		a.resetOwok()
	};
	this.showDialog = function() {
		b = new StatusCheckView;
		b.showDialog()
	};
	this.bindEventsWithCallback = function(l, m) {
//		OWOKPlugin.disableEvents();
		a.unbindLoginEvents();
		a.bindStatusEvents();
		d = l;
		e = m;
		this.unbindEventsWithCallback();
//		$(OWOKPlugin).bind("owokLightCardWasInserted", d);
//		$(OWOKPlugin).bind("owokSmartcardWasInserted", e)
	};
	this.unbindEventsWithCallback = function() {
//		$(OWOKPlugin).unbind("owokLightCardWasInserted", d);
//		$(OWOKPlugin).unbind("owokSmartcardWasInserted", e)
	};
	this.bindLoginEvents = function() {
//		OWOKPlugin.disableEvents();
		a.unbindLoginEvents();
		a.bindStatusEvents();
//		$(OWOKPlugin).bind("owokLightCardWasInserted",
//				a.executeLoginWithOwokLight);
//		$(OWOKPlugin).bind("owokSmartcardWasInserted", a.executeLoginWithOwok)
	};
	this.bindAddCardEvents = function() {
//		OWOKPlugin.disableEvents();
		a.unbindAddCardEvents();
		a.bindStatusEvents();
//		$(OWOKPlugin).bind("owokLightCardWasInserted",
//				a.executeAddCardOwokLight);
//		$(OWOKPlugin).bind("owokSmartcardWasInserted", a.executeAddCardOwok)
	};
	this.bindDisconnectCardEvents = function() {
//		OWOKPlugin.disableEvents();
		a.unbindDisconnectCardEvents();
		a.bindStatusEvents();
//		$(OWOKPlugin).bind("owokLightCardWasInserted",
//				a.executeDisconnectCardOwokLight);
//		$(OWOKPlugin).bind("owokSmartcardWasInserted",
//				a.executeDisconnectCardOwok)
	};
	this.unbindLoginEvents = function() {
//		$(OWOKPlugin).unbind("owokLightCardWasInserted",
//				a.executeLoginWithOwokLight);
//		$(OWOKPlugin)
//				.unbind("owokSmartcardWasInserted", a.executeLoginWithOwok)
	};
	this.unbindAddCardEvents = function() {
//		$(OWOKPlugin).unbind("owokLightCardWasInserted",
//				a.executeAddCardOwokLight);
//		$(OWOKPlugin).unbind("owokSmartcardWasInserted", a.executeAddCardOwok)
	};
	this.unbindDisconnectCardEvents = function() {
//		$(OWOKPlugin).unbind("owokLightCardWasInserted",
//				a.executeDisconnectCardOwokLight);
//		$(OWOKPlugin).unbind("owokSmartcardWasInserted",
//				a.executeDisconnectCardOwok)
	};
	this.bindStatusEvents = function() {
		a.unbindStatusEvents();
		$(StatusCheck).bind("closeButtonPressed", a.onClose);
//		$(OWOKPlugin).bind("owokOnReaderUnregistered owokOnReaderRegistered",
//				a.checkStatusCardReaderPresent);
//		$(OWOKPlugin).bind("owokNoPluginFound", a.showStatusPluginPresentFalse);
//		$(OWOKPlugin).bind("owokReady", a.showStatusPluginPresentTrue);
//		$(OWOKPlugin).bind("owokCardWasRemoved", a.loginCardRemoved);
//		$(OWOKPlugin).bind("owokCardAlreadyInUse", a.owokCardAlreadyInUse)
	};
	this.unbindStatusEvents = function() {
		$(StatusCheck).unbind("closeButtonPressed", a.onClose);
//		$(OWOKPlugin).unbind("owokOnReaderUnregistered owokOnReaderRegistered",
//				a.checkStatusCardReaderPresent);
//		$(OWOKPlugin).unbind("owokNoPluginFound",
//				a.showStatusPluginPresentFalse);
//		$(OWOKPlugin).unbind("owokReady", a.showStatusPluginPresentTrue);
//		$(OWOKPlugin).unbind("owokCardWasRemoved", a.loginCardRemoved);
//		$(OWOKPlugin).unbind("owokCardAlreadyInUse", a.owokCardAlreadyInUse)
	};
	this.resetOwok = function() {
		try {
//			OWOKPlugin.reset()
		} catch (l) {
			a.runOwokPlugin();
			return
		}
		a.restartOwokPlugin()
	};
	this.runOwokPlugin = function() {
//		OWOKPlugin.run({
//			LoginActionURL : OwokConfig.LoginActionURL,
//			LogoutActionURL : OwokConfig.LogoutActionURL,
//			OwokPath : OwokConfig.OwokPath,
//			ClientRequestScript : OwokConfig.ClientRequestScript,
//			debug : OwokConfig.Debug
//		})
	};
	this.restartOwokPlugin = function() {
//		OWOKPlugin.restart({})
	};
	this.executeSomethingWithOwokLight = function(l, m, p, v) {
		a.showStatusLoginCardPresentTrue();
//		if (v == OWOKPlugin.CARD_STATUS_FACTORY)
//			l.notInitalized();
//		else if (v == OWOKPlugin.CARD_STATUS_READY)
//			l.notRegistered();
//		else
//			v == OWOKPlugin.CARD_STATUS_INITIALIZED && l.ready()
	};
	this.executeLoginWithOwokLight = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareLogin()
		}, A = {};
		A.notInitalized = function() {
			a.showStatusLoginCardInitialisedFalse(true, y)
		};
		A.notRegistered = function() {
			a.closeDialog();
			account.showRegisterDialogOwokLight(y)
		};
		A.ready = function() {
			a.closeDialog();
//			OWOKPlugin.showModalLightLogin(v, y)
		};
		a.executeSomethingWithOwokLight(A, l, m, p, v)
	};
	var f = function() {
		(new AllyveEvents).raiseEvent("addCardCancelled")
	};
	this.executeAddCardOwokLight = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardAdd()
		}, A = {};
		A.notInitalized = function() {
			a.showStatusLoginCardInitialisedFalse(true, y)
		};
		A.notRegistered = function() {
			a.closeDialog();
			(new AddCardToAccount).showForm(y)
		};
		A.ready = function() {
			a.closeDialog();
			showAlertOk(allyve.mandant.msgCardAlreadyRegistered(), null, f)
		};
		a.executeSomethingWithOwokLight(A, l, m, p, v)
	};
	this.executeDisconnectCardOwokLight = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardDisconnect()
		}, A = {};
		A.notInitalized = function() {
			a.showStatusLoginCardInitialisedFalse(true, y)
		};
		A.notRegistered = function() {
			a.closeDialog();
			showAlertOk(allyve.mandant.msgCardNotInUse())
		};
		A.ready = function() {
			a.closeDialog();
			(new ConfirmCardDeactivation).showPinForm(y)
		};
		a.executeSomethingWithOwokLight(A, l, m, p, v)
	};
	this.executeSomethingWithOwok = function(l, m, p, v) {
//		if (v == OWOKPlugin.CARD_STATUS_FACTORY
//				|| v == OWOKPlugin.CARD_STATUS_READY) {
//			a.showStatusLoginCardPresentTrue();
//			l.notInitalized()
//		} else if (v == OWOKPlugin.CARD_STATUS_INITIALIZED) {
//			a.showStatusLoginCardPresentTrue();
//			a.showStatusLoginCardInitialisedTrue();
//			OWOKPlugin.getCardId();
//			var y = function(A, M) {
//				typeof M == "undefined" ? l.notRegistered() : l.ready();
//				$(OWOKPlugin).unbind("owokUserCardInfoReady", y)
//			};
//			$(OWOKPlugin).bind("owokUserCardInfoReady", y);
//			OWOKPlugin.getUserCardInfo(p)
//		}
	};
	this.executeLoginWithOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareLogin()
		}, A = {};
		A.notInitalized = function() {
			a.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			a.closeDialog();
			account.showRegisterDialogOwok(y)
		};
		A.ready = function() {
			a.closeDialog();
			auth.initAuthWithOwok(y)
		};
		a.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.executeDisconnectCardOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardDisconnect()
		}, A = {};
		A.notInitalized = function() {
			a.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			a.closeDialog();
			showAlertOk(allyve.mandant.msgCardNotInUse())
		};
		A.ready = function() {
			a.closeDialog();
			(new ConfirmCardDeactivation).showPinForm(y)
		};
		a.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.executeAddCardOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardAdd()
		}, A = {};
		A.notInitalized = function() {
			a.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			a.closeDialog();
			(new AddCardToAccount).showForm(y)
		};
		A.ready = function() {
			a.closeDialog();
			showAlertOk(allyve.mandant.msgCardAlreadyRegistered(), null, f)
		};
		a.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.loginCardRemoved = function() {
		a.showStatusLoginCardPresentFalse()
	};
	this.owokCardAlreadyInUse = function() {
		a.closeDialog();
		showAlertOk(allyve.mandant.msgCardPluginBlocked(), allyve.mandant
				.headerAchtung())
	};
	this.closeDialog = function() {
		b.close()
	};
	this.onClose = function() {
		a.unbindStatusEvents();
		a.unbindLoginEvents();
		a.unbindAddCardEvents();
		a.unbindDisconnectCardEvents();
		$(StatusCheck).trigger("owokStatusServiceClosed")
	};
	this.showStatusPluginPresentFalse = function() {
		$("#StatusCheck_1_true").hide();
		$("#StatusCheck_hint_1").show();
		$("#StatusCheck_after_1").hide()
	};
	this.showStatusPluginPresentTrue = function() {
		$("#StatusCheck_1_true").show();
		$("#StatusCheck_hint_1").hide();
		$("#StatusCheck_after_1").show();
		a.checkStatusCardReaderPresent()
	};
	this.checkStatusCardReaderPresent = function() {
//		OWOKPlugin.getReaderListArray().length > 0 ? a
//				.showStatusCardReaderPresentTrue() : a
//				.showStatusCardReaderPresentFalse()
	};
	this.showStatusCardReaderPresentFalse = function() {
		$("#StatusCheck_2_true").hide();
		$("#StatusCheck_hint_2").show();
		$("#StatusCheck_after_2").hide()
	};
	this.showStatusCardReaderPresentTrue = function() {
		$("#StatusCheck_2_true").show();
		$("#StatusCheck_hint_2").hide();
		$("#StatusCheck_after_2").show();
		$("#StatusCheck_3_true").show();
		$("#StatusCheck_hint_3").hide();
		$("#StatusCheck_after_3").show()
	};
	this.showStatusLoginCardPresentFalse = function() {
		$("#StatusCheck_4_true").hide();
		$("#StatusCheck_hint_4").show();
		$("#StatusCheck_after_4").hide()
	};
	this.showStatusLoginCardPresentTrue = function() {
		$("#StatusCheck_4_true").show();
		$("#StatusCheck_hint_4").hide();
		$("#StatusCheck_after_4").show()
	};
	this.showStatusLoginCardInitialisedFalse = function(l, m) {
		$("#StatusCheck_5_true").hide();
		$("#StatusCheck_hint_5").show();
		$("#StatusCheck_after_5").hide();
		a.closeDialog();
		(new RegisterWithOlps).show(l, m)
	};
	this.showStatusLoginCardInitialisedTrue = function() {
		$("#StatusCheck_hint_5").hide();
		$("#StatusCheck_5_true").show();
		$("#StatusCheck_after_5").hide()
	}
};
function StatusCheckView() {
	this.showDialog = function() {
		this.setWidth(430);
		this.showTemplate('\t<div class="modalHeader">Hinweis</div><div class="StatusCheck_description">Um diese Aktion mit der login<span class="kursiv">Card</span> ausf\u00fchren zu k\u00f6nnen,<br>m\u00fcssen folgende Bedingungen erf\u00fcllt sein:</div><div id="StatusCheckItems" class="StatusCheck_content"><div id="StatusCheck_1" class="StatusCheckItem"><span id="StatusCheck_1_false" class="StatusCheck_false"><img id="StatusCheck_1_true" class="StatusCheck_true" src="images/haken.png" /></span> Installiertes OWOK-Plugin</div><div id="StatusCheck_hint_1" class="StatusCheckHint"><a target="_blank" href="http://www.reiner-sct.com/cardlogin">Zum Plugin &nbsp; <img src="images/pfeil.png" /></a></div><div id="StatusCheck_after_1" class="StatusCheck_after"><div id="StatusCheck_2" class="StatusCheckItem"><span id="StatusCheck_2_false" class="StatusCheck_false"><img id="StatusCheck_2_true" class="StatusCheck_true" src="images/haken.png" /></span> Angeschlossener Kartenleser</div><div id="StatusCheck_hint_2" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/pfeil.png" /></a></div><div id="StatusCheck_after_2" class="StatusCheck_after"><div id="StatusCheck_3" class="StatusCheckItem"><span id="StatusCheck_3_false" class="StatusCheck_false"><img id="StatusCheck_3_true" class="StatusCheck_true" src="images/haken.png" /></span> Zugriff auf den Kartenleser</div><div id="StatusCheck_hint_3" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/pfeil.png" /></a></div><div id="StatusCheck_after_3" class="StatusCheck_after"><div id="StatusCheck_4" class="StatusCheckItem"><span id="StatusCheck_4_false" class="StatusCheck_false"><img id="StatusCheck_4_true" class="StatusCheck_true" src="images/haken.png" /></span> Aufgelegte login<span class="kursiv">Card</span></div><div id="StatusCheck_hint_4" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/pfeil.png" /></a></div><div id="StatusCheck_after_4" class="StatusCheck_after"><div id="StatusCheck_5" class="StatusCheckItem"><span id="StatusCheck_5_false" class="StatusCheck_false"><img id="StatusCheck_5_true" class="StatusCheck_true" src="images/haken.png" /></span> Initialisierte login<span class="kursiv">Card</span></div><div id="StatusCheck_hint_5" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/pfeil.png" /></a></div><div id="StatusCheck_after_5" class="StatusCheck_after"></div></div></div></div></div></div>')
	};
	this.onClose = function() {
		$(StatusCheck).trigger("closeButtonPressed")
	};
	this.loadButtons = function() {
	}
}
StatusCheckView.prototype = new SimpleDialog;
StatusCheckView.constructor = StatusCheckView;
