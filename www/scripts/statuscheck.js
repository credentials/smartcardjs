function OwokStatusCheck() {
	if (OwokStatusCheck.instance !== undefined)
		return OwokStatusCheck.instance;
	OwokStatusCheck.instance = this;
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
		b = new OwokStatusCheckView;
		b.showDialog()
	};
	this.bindEventsWithCallback = function(l, m) {
		OWOKPlugin.disableEvents();
		a.unbindLoginEvents();
		a.bindStatusEvents();
		d = l;
		e = m;
		this.unbindEventsWithCallback();
		$(OWOKPlugin).bind("owokLightCardWasInserted", d);
		$(OWOKPlugin).bind("owokSmartcardWasInserted", e)
	};
	this.unbindEventsWithCallback = function() {
		$(OWOKPlugin).unbind("owokLightCardWasInserted", d);
		$(OWOKPlugin).unbind("owokSmartcardWasInserted", e)
	};
	this.bindLoginEvents = function() {
		OWOKPlugin.disableEvents();
		a.unbindLoginEvents();
		a.bindStatusEvents();
		$(OWOKPlugin).bind("owokLightCardWasInserted",
				a.executeLoginWithOwokLight);
		$(OWOKPlugin).bind("owokSmartcardWasInserted", a.executeLoginWithOwok)
	};
	this.bindAddCardEvents = function() {
		OWOKPlugin.disableEvents();
		a.unbindAddCardEvents();
		a.bindStatusEvents();
		$(OWOKPlugin).bind("owokLightCardWasInserted",
				a.executeAddCardOwokLight);
		$(OWOKPlugin).bind("owokSmartcardWasInserted", a.executeAddCardOwok)
	};
	this.bindDisconnectCardEvents = function() {
		OWOKPlugin.disableEvents();
		a.unbindDisconnectCardEvents();
		a.bindStatusEvents();
		$(OWOKPlugin).bind("owokLightCardWasInserted",
				a.executeDisconnectCardOwokLight);
		$(OWOKPlugin).bind("owokSmartcardWasInserted",
				a.executeDisconnectCardOwok)
	};
	this.unbindLoginEvents = function() {
		$(OWOKPlugin).unbind("owokLightCardWasInserted",
				a.executeLoginWithOwokLight);
		$(OWOKPlugin)
				.unbind("owokSmartcardWasInserted", a.executeLoginWithOwok)
	};
	this.unbindAddCardEvents = function() {
		$(OWOKPlugin).unbind("owokLightCardWasInserted",
				a.executeAddCardOwokLight);
		$(OWOKPlugin).unbind("owokSmartcardWasInserted", a.executeAddCardOwok)
	};
	this.unbindDisconnectCardEvents = function() {
		$(OWOKPlugin).unbind("owokLightCardWasInserted",
				a.executeDisconnectCardOwokLight);
		$(OWOKPlugin).unbind("owokSmartcardWasInserted",
				a.executeDisconnectCardOwok)
	};
	this.bindStatusEvents = function() {
		a.unbindStatusEvents();
		$(OwokStatusCheck).bind("closeButtonPressed", a.onClose);
		$(OWOKPlugin).bind("owokOnReaderUnregistered owokOnReaderRegistered",
				a.checkStatusCardReaderPresent);
		$(OWOKPlugin).bind("owokNoPluginFound", a.showStatusPluginPresentFalse);
		$(OWOKPlugin).bind("owokReady", a.showStatusPluginPresentTrue);
		$(OWOKPlugin).bind("owokCardWasRemoved", a.loginCardRemoved);
		$(OWOKPlugin).bind("owokCardAlreadyInUse", a.owokCardAlreadyInUse)
	};
	this.unbindStatusEvents = function() {
		$(OwokStatusCheck).unbind("closeButtonPressed", a.onClose);
		$(OWOKPlugin).unbind("owokOnReaderUnregistered owokOnReaderRegistered",
				a.checkStatusCardReaderPresent);
		$(OWOKPlugin).unbind("owokNoPluginFound",
				a.showStatusPluginPresentFalse);
		$(OWOKPlugin).unbind("owokReady", a.showStatusPluginPresentTrue);
		$(OWOKPlugin).unbind("owokCardWasRemoved", a.loginCardRemoved);
		$(OWOKPlugin).unbind("owokCardAlreadyInUse", a.owokCardAlreadyInUse)
	};
	this.resetOwok = function() {
		try {
			OWOKPlugin.reset()
		} catch (l) {
			a.runOwokPlugin();
			return
		}
		a.restartOwokPlugin()
	};
	this.runOwokPlugin = function() {
		OWOKPlugin.run({
			LoginActionURL : OwokConfig.LoginActionURL,
			LogoutActionURL : OwokConfig.LogoutActionURL,
			OwokPath : OwokConfig.OwokPath,
			ClientRequestScript : OwokConfig.ClientRequestScript,
			debug : OwokConfig.Debug
		})
	};
	this.restartOwokPlugin = function() {
		OWOKPlugin.restart({})
	};
	this.executeSomethingWithOwokLight = function(l, m, p, v) {
		a.showStatusLoginCardPresentTrue();
		if (v == OWOKPlugin.CARD_STATUS_FACTORY)
			l.notInitalized();
		else if (v == OWOKPlugin.CARD_STATUS_READY)
			l.notRegistered();
		else
			v == OWOKPlugin.CARD_STATUS_INITIALIZED && l.ready()
	};
	this.executeLoginWithOwokLight = function(l, m, p, v) {
		var y = function() {
			(new OwokStatusCheck).prepareLogin()
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
			OWOKPlugin.showModalLightLogin(v, y)
		};
		a.executeSomethingWithOwokLight(A, l, m, p, v)
	};
	var f = function() {
		(new AllyveEvents).raiseEvent("addCardCancelled")
	};
	this.executeAddCardOwokLight = function(l, m, p, v) {
		var y = function() {
			(new OwokStatusCheck).prepareCardAdd()
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
			(new OwokStatusCheck).prepareCardDisconnect()
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
		if (v == OWOKPlugin.CARD_STATUS_FACTORY
				|| v == OWOKPlugin.CARD_STATUS_READY) {
			a.showStatusLoginCardPresentTrue();
			l.notInitalized()
		} else if (v == OWOKPlugin.CARD_STATUS_INITIALIZED) {
			a.showStatusLoginCardPresentTrue();
			a.showStatusLoginCardInitialisedTrue();
			OWOKPlugin.getCardId();
			var y = function(A, M) {
				typeof M == "undefined" ? l.notRegistered() : l.ready();
				$(OWOKPlugin).unbind("owokUserCardInfoReady", y)
			};
			$(OWOKPlugin).bind("owokUserCardInfoReady", y);
			OWOKPlugin.getUserCardInfo(p)
		}
	};
	this.executeLoginWithOwok = function(l, m, p, v) {
		var y = function() {
			(new OwokStatusCheck).prepareLogin()
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
			(new OwokStatusCheck).prepareCardDisconnect()
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
			(new OwokStatusCheck).prepareCardAdd()
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
		$(OwokStatusCheck).trigger("owokStatusServiceClosed")
	};
	this.showStatusPluginPresentFalse = function() {
		$("#owokStatusCheck_1_true").hide();
		$("#owokStatusCheck_hint_1").show();
		$("#owokStatusCheck_after_1").hide()
	};
	this.showStatusPluginPresentTrue = function() {
		$("#owokStatusCheck_1_true").show();
		$("#owokStatusCheck_hint_1").hide();
		$("#owokStatusCheck_after_1").show();
		a.checkStatusCardReaderPresent()
	};
	this.checkStatusCardReaderPresent = function() {
		OWOKPlugin.getReaderListArray().length > 0 ? a
				.showStatusCardReaderPresentTrue() : a
				.showStatusCardReaderPresentFalse()
	};
	this.showStatusCardReaderPresentFalse = function() {
		$("#owokStatusCheck_2_true").hide();
		$("#owokStatusCheck_hint_2").show();
		$("#owokStatusCheck_after_2").hide()
	};
	this.showStatusCardReaderPresentTrue = function() {
		$("#owokStatusCheck_2_true").show();
		$("#owokStatusCheck_hint_2").hide();
		$("#owokStatusCheck_after_2").show();
		$("#owokStatusCheck_3_true").show();
		$("#owokStatusCheck_hint_3").hide();
		$("#owokStatusCheck_after_3").show()
	};
	this.showStatusLoginCardPresentFalse = function() {
		$("#owokStatusCheck_4_true").hide();
		$("#owokStatusCheck_hint_4").show();
		$("#owokStatusCheck_after_4").hide()
	};
	this.showStatusLoginCardPresentTrue = function() {
		$("#owokStatusCheck_4_true").show();
		$("#owokStatusCheck_hint_4").hide();
		$("#owokStatusCheck_after_4").show()
	};
	this.showStatusLoginCardInitialisedFalse = function(l, m) {
		$("#owokStatusCheck_5_true").hide();
		$("#owokStatusCheck_hint_5").show();
		$("#owokStatusCheck_after_5").hide();
		a.closeDialog();
		(new RegisterWithOlps).show(l, m)
	};
	this.showStatusLoginCardInitialisedTrue = function() {
		$("#owokStatusCheck_hint_5").hide();
		$("#owokStatusCheck_5_true").show();
		$("#owokStatusCheck_after_5").hide()
	}
};
function OwokStatusCheckView() {
	this.showDialog = function() {
		this.setWidth(430);
		this.showTemplate('\t<div class="modalHeader">Hinweis</div><div class="owokStatusCheck_description">Um diese Aktion mit der login<span class="kursiv">Card</span> ausf\u00fchren zu k\u00f6nnen,<br>m\u00fcssen folgende Bedingungen erf\u00fcllt sein:</div><div id="owokStatusCheckItems" class="owokStatusCheck_content"><div id="owokStatusCheck_1" class="owokStatusCheckItem"><span id="owokStatusCheck_1_false" class="owokStatusCheck_false"><img id="owokStatusCheck_1_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Installiertes OWOK-Plugin</div><div id="owokStatusCheck_hint_1" class="owokStatusCheckHint"><a target="_blank" href="http://www.reiner-sct.com/cardlogin">Zum Plugin &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_1" class="owokStatusCheck_after"><div id="owokStatusCheck_2" class="owokStatusCheckItem"><span id="owokStatusCheck_2_false" class="owokStatusCheck_false"><img id="owokStatusCheck_2_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Angeschlossener Kartenleser</div><div id="owokStatusCheck_hint_2" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_2" class="owokStatusCheck_after"><div id="owokStatusCheck_3" class="owokStatusCheckItem"><span id="owokStatusCheck_3_false" class="owokStatusCheck_false"><img id="owokStatusCheck_3_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Zugriff auf den Kartenleser</div><div id="owokStatusCheck_hint_3" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_3" class="owokStatusCheck_after"><div id="owokStatusCheck_4" class="owokStatusCheckItem"><span id="owokStatusCheck_4_false" class="owokStatusCheck_false"><img id="owokStatusCheck_4_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Aufgelegte login<span class="kursiv">Card</span></div><div id="owokStatusCheck_hint_4" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_4" class="owokStatusCheck_after"><div id="owokStatusCheck_5" class="owokStatusCheckItem"><span id="owokStatusCheck_5_false" class="owokStatusCheck_false"><img id="owokStatusCheck_5_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Initialisierte login<span class="kursiv">Card</span></div><div id="owokStatusCheck_hint_5" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_5" class="owokStatusCheck_after"></div></div></div></div></div></div>')
	};
	this.onClose = function() {
		$(OwokStatusCheck).trigger("closeButtonPressed")
	};
	this.loadButtons = function() {
	}
}
OwokStatusCheckView.prototype = new SimpleDialog;
OwokStatusCheckView.constructor = OwokStatusCheckView;
