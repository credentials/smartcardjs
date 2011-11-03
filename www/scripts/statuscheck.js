function StatusCheck() {
	if (StatusCheck.instance !== undefined) {
		return StatusCheck.instance;
	}
	StatusCheck.instance = this;
	var view = null, d, e;
	this.prepareLogin = function() {
		this.showDialog();
		this.bindLoginEvents();
		this.resetApplet()
	};
	this.prepareCardAdd = function() {
		this.showDialog();
		this.bindAddCardEvents();
		this.resetApplet()
	};
	this.prepareCardDisconnect = function() {
		this.showDialog();
		this.bindDisconnectCardEvents();
		this.resetApplet()
	};
	this.showDialog = function() {
		view = new StatusCheckView;
		view.showDialog()
	};
	this.bindEventsWithCallback = function(l, m) {
//		SmartCardJS.disableEvents();
		this.unbindLoginEvents();
		this.bindStatusEvents();
		d = l;
		e = m;
		this.unbindEventsWithCallback();
//		$(SmartCardJS).bind("owokLightCardWasInserted", d);
//		$(SmartCardJS).bind("owokSmartcardWasInserted", e)
	};
	this.unbindEventsWithCallback = function() {
//		$(SmartCardJS).unbind("owokLightCardWasInserted", d);
//		$(SmartCardJS).unbind("owokSmartcardWasInserted", e)
	};
	this.bindLoginEvents = function() {
//		SmartCardJS.disableEvents();
		this.unbindLoginEvents();
		this.bindStatusEvents();
//		$(SmartCardJS).bind("owokLightCardWasInserted",
//				this.executeLoginWithOwokLight);
//		$(SmartCardJS).bind("owokSmartcardWasInserted", this.executeLoginWithOwok)
	};
	this.bindAddCardEvents = function() {
//		SmartCardJS.disableEvents();
		this.unbindAddCardEvents();
		this.bindStatusEvents();
//		$(SmartCardJS).bind("owokLightCardWasInserted",
//				this.executeAddCardOwokLight);
//		$(SmartCardJS).bind("owokSmartcardWasInserted", this.executeAddCardOwok)
	};
	this.bindDisconnectCardEvents = function() {
//		SmartCardJS.disableEvents();
		this.unbindDisconnectCardEvents();
		this.bindStatusEvents();
//		$(SmartCardJS).bind("owokLightCardWasInserted",
//				this.executeDisconnectCardOwokLight);
//		$(SmartCardJS).bind("owokSmartcardWasInserted",
//				this.executeDisconnectCardOwok)
	};
	this.unbindLoginEvents = function() {
//		$(SmartCardJS).unbind("owokLightCardWasInserted",
//				this.executeLoginWithOwokLight);
//		$(SmartCardJS)
//				.unbind("owokSmartcardWasInserted", this.executeLoginWithOwok)
	};
	this.unbindAddCardEvents = function() {
//		$(SmartCardJS).unbind("owokLightCardWasInserted",
//				this.executeAddCardOwokLight);
//		$(SmartCardJS).unbind("owokSmartcardWasInserted", this.executeAddCardOwok)
	};
	this.unbindDisconnectCardEvents = function() {
//		$(SmartCardJS).unbind("owokLightCardWasInserted",
//				this.executeDisconnectCardOwokLight);
//		$(SmartCardJS).unbind("owokSmartcardWasInserted",
//				this.executeDisconnectCardOwok)
	};
	this.bindStatusEvents = function() {
		this.unbindStatusEvents();
		$(StatusCheck).bind("closeButtonPressed", this.onClose);
//		$(SmartCardJS).bind("owokOnReaderUnregistered owokOnReaderRegistered",
//				this.checkStatusCardReaderPresent);
//		$(SmartCardJS).bind("owokNoPluginFound", this.showStatusPluginPresentFalse);
//		$(SmartCardJS).bind("owokReady", this.showStatusPluginPresentTrue);
//		$(SmartCardJS).bind("owokCardWasRemoved", this.loginCardRemoved);
//		$(SmartCardJS).bind("owokCardAlreadyInUse", this.owokCardAlreadyInUse)
	};
	this.unbindStatusEvents = function() {
		$(StatusCheck).unbind("closeButtonPressed", this.onClose);
//		$(SmartCardJS).unbind("owokOnReaderUnregistered owokOnReaderRegistered",
//				this.checkStatusCardReaderPresent);
//		$(SmartCardJS).unbind("owokNoPluginFound",
//				this.showStatusPluginPresentFalse);
//		$(SmartCardJS).unbind("owokReady", this.showStatusPluginPresentTrue);
//		$(SmartCardJS).unbind("owokCardWasRemoved", this.loginCardRemoved);
//		$(SmartCardJS).unbind("owokCardAlreadyInUse", this.owokCardAlreadyInUse)
	};
	this.resetApplet = function() {
		try {
//			SmartCardJS.reset()
		} catch (l) {
			this.runApplet();
			return
		}
		this.restartApplet()
	};
	this.runApplet = function() {
		SmartCardJS.run()
//		SmartCardJS.run({
//			LoginActionURL : OwokConfig.LoginActionURL,
//			LogoutActionURL : OwokConfig.LogoutActionURL,
//			OwokPath : OwokConfig.OwokPath,
//			ClientRequestScript : OwokConfig.ClientRequestScript,
//			debug : OwokConfig.Debug
//		})
	};
	this.restartApplet = function() {
//		SmartCardJS.restart({})
	};
	this.executeSomethingWithOwokLight = function(l, m, p, v) {
		this.showStatusLoginCardPresentTrue();
//		if (v == SmartCardJS.CARD_STATUS_FACTORY)
//			l.notInitalized();
//		else if (v == SmartCardJS.CARD_STATUS_READY)
//			l.notRegistered();
//		else
//			v == SmartCardJS.CARD_STATUS_INITIALIZED && l.ready()
	};
	this.executeLoginWithOwokLight = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareLogin()
		}, A = {};
		A.notInitalized = function() {
			this.showStatusLoginCardInitialisedFalse(true, y)
		};
		A.notRegistered = function() {
			this.closeDialog();
			account.showRegisterDialogOwokLight(y)
		};
		A.ready = function() {
			this.closeDialog();
//			SmartCardJS.showModalLightLogin(v, y)
		};
		this.executeSomethingWithOwokLight(A, l, m, p, v)
	};
	var f = function() {
		(new AllyveEvents).raiseEvent("addCardCancelled")
	};
	this.executeAddCardOwokLight = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardAdd()
		}, A = {};
		A.notInitalized = function() {
			this.showStatusLoginCardInitialisedFalse(true, y)
		};
		A.notRegistered = function() {
			this.closeDialog();
			(new AddCardToAccount).showForm(y)
		};
		A.ready = function() {
			this.closeDialog();
			showAlertOk(allyve.mandant.msgCardAlreadyRegistered(), null, f)
		};
		this.executeSomethingWithOwokLight(A, l, m, p, v)
	};
	this.executeDisconnectCardOwokLight = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardDisconnect()
		}, A = {};
		A.notInitalized = function() {
			this.showStatusLoginCardInitialisedFalse(true, y)
		};
		A.notRegistered = function() {
			this.closeDialog();
			showAlertOk(allyve.mandant.msgCardNotInUse())
		};
		A.ready = function() {
			this.closeDialog();
			(new ConfirmCardDeactivation).showPinForm(y)
		};
		this.executeSomethingWithOwokLight(A, l, m, p, v)
	};
	this.executeSomethingWithOwok = function(l, m, p, v) {
//		if (v == SmartCardJS.CARD_STATUS_FACTORY
//				|| v == SmartCardJS.CARD_STATUS_READY) {
//			this.showStatusLoginCardPresentTrue();
//			l.notInitalized()
//		} else if (v == SmartCardJS.CARD_STATUS_INITIALIZED) {
//			this.showStatusLoginCardPresentTrue();
//			this.showStatusLoginCardInitialisedTrue();
//			SmartCardJS.getCardId();
//			var y = function(A, M) {
//				typeof M == "undefined" ? l.notRegistered() : l.ready();
//				$(SmartCardJS).unbind("owokUserCardInfoReady", y)
//			};
//			$(SmartCardJS).bind("owokUserCardInfoReady", y);
//			SmartCardJS.getUserCardInfo(p)
//		}
	};
	this.executeLoginWithOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareLogin()
		}, A = {};
		A.notInitalized = function() {
			this.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			this.closeDialog();
			account.showRegisterDialogOwok(y)
		};
		A.ready = function() {
			this.closeDialog();
			auth.initAuthWithOwok(y)
		};
		this.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.executeDisconnectCardOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardDisconnect()
		}, A = {};
		A.notInitalized = function() {
			this.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			this.closeDialog();
			showAlertOk(allyve.mandant.msgCardNotInUse())
		};
		A.ready = function() {
			this.closeDialog();
			(new ConfirmCardDeactivation).showPinForm(y)
		};
		this.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.executeAddCardOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardAdd()
		}, A = {};
		A.notInitalized = function() {
			this.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			this.closeDialog();
			(new AddCardToAccount).showForm(y)
		};
		A.ready = function() {
			this.closeDialog();
			showAlertOk(allyve.mandant.msgCardAlreadyRegistered(), null, f)
		};
		this.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.loginCardRemoved = function() {
		this.showStatusLoginCardPresentFalse()
	};
	this.owokCardAlreadyInUse = function() {
		this.closeDialog();
		showAlertOk(allyve.mandant.msgCardPluginBlocked(), allyve.mandant
				.headerAchtung())
	};
	this.closeDialog = function() {
		view.close()
	};
	this.onClose = function() {
		this.unbindStatusEvents();
		this.unbindLoginEvents();
		this.unbindAddCardEvents();
		this.unbindDisconnectCardEvents();
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
		this.checkStatusCardReaderPresent()
	};
	this.checkStatusCardReaderPresent = function() {
//		SmartCardJS.getReaderListArray().length > 0 ? a
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
		this.closeDialog();
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
		this.showTemplate('\t<div class="modalHeader">Hinweis</div><div class="StatusCheck_description">Um diese Aktion mit der login<span class="kursiv">Card</span> ausf\u00fchren zu k\u00f6nnen,<br>m\u00fcssen folgende Bedingungen erf\u00fcllt sein:</div><div id="StatusCheckItems" class="StatusCheck_content"><div id="StatusCheck_1" class="StatusCheckItem"><span id="StatusCheck_1_false" class="StatusCheck_false"><img id="StatusCheck_1_true" class="StatusCheck_true" src="images/check.png" /></span> Installiertes OWOK-Plugin</div><div id="StatusCheck_hint_1" class="StatusCheckHint"><a target="_blank" href="http://www.reiner-sct.com/cardlogin">Zum Plugin &nbsp; <img src="images/arrow.png" /></a></div><div id="StatusCheck_after_1" class="StatusCheck_after"><div id="StatusCheck_2" class="StatusCheckItem"><span id="StatusCheck_2_false" class="StatusCheck_false"><img id="StatusCheck_2_true" class="StatusCheck_true" src="images/check.png" /></span> Angeschlossener Kartenleser</div><div id="StatusCheck_hint_2" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/arrow.png" /></a></div><div id="StatusCheck_after_2" class="StatusCheck_after"><div id="StatusCheck_3" class="StatusCheckItem"><span id="StatusCheck_3_false" class="StatusCheck_false"><img id="StatusCheck_3_true" class="StatusCheck_true" src="images/check.png" /></span> Zugriff auf den Kartenleser</div><div id="StatusCheck_hint_3" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/arrow.png" /></a></div><div id="StatusCheck_after_3" class="StatusCheck_after"><div id="StatusCheck_4" class="StatusCheckItem"><span id="StatusCheck_4_false" class="StatusCheck_false"><img id="StatusCheck_4_true" class="StatusCheck_true" src="images/check.png" /></span> Aufgelegte login<span class="kursiv">Card</span></div><div id="StatusCheck_hint_4" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/arrow.png" /></a></div><div id="StatusCheck_after_4" class="StatusCheck_after"><div id="StatusCheck_5" class="StatusCheckItem"><span id="StatusCheck_5_false" class="StatusCheck_false"><img id="StatusCheck_5_true" class="StatusCheck_true" src="images/check.png" /></span> Initialisierte login<span class="kursiv">Card</span></div><div id="StatusCheck_hint_5" class="StatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="images/arrow.png" /></a></div><div id="StatusCheck_after_5" class="StatusCheck_after"></div></div></div></div></div></div>')
	};
	this.onClose = function() {
		$(StatusCheck).trigger("closeButtonPressed")
	};
	this.loadButtons = function() {
	}
}
StatusCheckView.prototype = new SimpleDialog;
StatusCheckView.constructor = StatusCheckView;
