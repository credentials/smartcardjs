function StatusCheck() {
	if (StatusCheck.instance !== undefined) {
		return StatusCheck.instance;
	}
	StatusCheck.instance = this;
	
	var text = {
		title : 'Notice',
		description : 'In order to use your DEMO card, the following conditions must be met:',
		plugin_check : 'Java plug-in installed',
		plugin_hint : '<a target="_blank" href="http://www.java.com/getjava/" onclick="javascript:SmartCardJS.installJava();">Get Java &nbsp; <img src="images/arrow.png" /></a>',
		applet_check : 'Java applet loaded',
		applet_hint : '<a target="_blank" href="http://smartcardjs.org/faq">Help &amp; FAQ &nbsp; <img src="images/arrow.png" /></a>',
		reader_check : 'Card reader connected',
		reader_hint : '<a target="_blank" href="http://smartcardjs.org/faq">Help &amp; FAQ &nbsp; <img src="images/arrow.png" /></a>',
		card_check : 'Smart card present',
		card_hint : '<a target="_blank" href="http://smartcardjs.org/faq">Help &amp; FAQ &nbsp; <img src="images/arrow.png" /></a>',
		application_check : 'DEMO card detected',
		application_hint : '<a target="_blank" href="http://smartcardjs.org/faq">Help &amp; FAQ &nbsp; <img src="images/arrow.png" /></a>'
	};
	
	var self = this, dialog = null, callback;
	
	this.prepareLogin = function(user_text) {
		$.extend(text, user_text);
		self.showDialog();
		self.bindLoginEvents();
		self.resetApplet()
	};
	this.prepareCardAdd = function() {
		self.showDialog();
		self.bindAddCardEvents();
		self.resetApplet()
	};
	this.prepareCardDisconnect = function() {
		self.showDialog();
		self.bindDisconnectCardEvents();
		self.resetApplet()
	};
	this.showDialog = function() {
		dialog = new StatusCheckDialog;
		dialog.showDialog(text)
	};
	this.bindEventsWithCallback = function(l) {
		SmartCardJS.disableEvents();
		self.unbindLoginEvents();
		self.bindStatusEvents();
		callback = l;
		self.unbindEventsWithCallback();
		$(SmartCardJS).bind("owokSmartcardWasInserted", callback)
	};
	this.unbindEventsWithCallback = function() {
		$(SmartCardJS).unbind("owokSmartcardWasInserted", callback)
	};
	this.bindLoginEvents = function() {
		SmartCardJS.disableEvents();
		self.unbindLoginEvents();
		self.bindStatusEvents();
		$(SmartCardJS).bind("owokSmartcardWasInserted", self.executeLoginWithOwok)
	};
	this.bindAddCardEvents = function() {
		SmartCardJS.disableEvents();
		self.unbindAddCardEvents();
		self.bindStatusEvents();
		$(SmartCardJS).bind("owokSmartcardWasInserted", self.executeAddCardOwok)
	};
	this.bindDisconnectCardEvents = function() {
		SmartCardJS.disableEvents();
		self.unbindDisconnectCardEvents();
		self.bindStatusEvents();
		$(SmartCardJS).bind("owokSmartcardWasInserted",	self.executeDisconnectCardOwok)
	};
	this.unbindLoginEvents = function() {
		$(SmartCardJS).unbind("owokSmartcardWasInserted", self.executeLoginWithOwok)
	};
	this.unbindAddCardEvents = function() {
		$(SmartCardJS).unbind("owokSmartcardWasInserted", self.executeAddCardOwok)
	};
	this.unbindDisconnectCardEvents = function() {
		$(SmartCardJS).unbind("owokSmartcardWasInserted", self.executeDisconnectCardOwok)
	};
	this.bindStatusEvents = function() {
		self.unbindStatusEvents();
		$(StatusCheck).bind("closeButtonPressed", self.onClose);
		$(SmartCardJS).bind("pluginNotFound", self.showStatusPluginPresentFalse);
		$(SmartCardJS).bind("pluginFound", self.showStatusPluginPresentTrue);
		$(SmartCardJS).bind("appletReady", self.showStatusAppletPresentTrue);
		$(SmartCardJS).bind("readerRemoved readerAdded", self.checkStatusReaderPresent);
		$(SmartCardJS).bind("cardRemoved cardInserted", self.checkStatusCardPresent);
//		$(SmartCardJS).bind("cardRemoved", self.loginCardRemoved);
//		$(SmartCardJS).bind("owokCardAlreadyInUse", self.owokCardAlreadyInUse)
	};
	this.unbindStatusEvents = function() {
		$(StatusCheck).unbind("closeButtonPressed", self.onClose);
		$(SmartCardJS).unbind("pluginNotFound", self.showStatusPluginPresentFalse);
		$(SmartCardJS).unbind("pluginFound", self.showStatusPluginPresentTrue);
		$(SmartCardJS).unbind("appletReady", self.showStatusAppletPresentTrue);
		$(SmartCardJS).unbind("readerRemoved readerAdded", self.checkStatusReaderPresent);
		$(SmartCardJS).unbind("cardRemoved cardInserted", self.checkStatusCardPresent);
//		$(SmartCardJS).unbind("cardRemoved", self.loginCardRemoved);
//		$(SmartCardJS).unbind("owokCardAlreadyInUse", self.owokCardAlreadyInUse)
	};
	this.resetApplet = function() {
		try {
			SmartCardJS.reset()
		} catch (l) {
			self.runApplet();
			return
		}
		self.restartApplet()
	};
	this.runApplet = function() {
		SmartCardJS.run()
	};
	this.restartApplet = function() {
		SmartCardJS.restart({})
	};
	var f = function() {
		(new AllyveEvents).raiseEvent("addCardCancelled")
	};
	this.executeSomethingWithOwok = function(l, m, p, v) {
		if (v == SmartCardJS.CARD_STATUS_FACTORY
				|| v == SmartCardJS.CARD_STATUS_READY) {
			self.showStatusLoginCardPresentTrue();
			l.notInitalized()
		} else if (v == SmartCardJS.CARD_STATUS_INITIALIZED) {
			self.showStatusLoginCardPresentTrue();
			self.showStatusLoginCardInitialisedTrue();
			SmartCardJS.getCardId();
			var y = function(A, M) {
				typeof M == "undefined" ? l.notRegistered() : l.ready();
				$(SmartCardJS).unbind("owokUserCardInfoReady", y)
			};
			$(SmartCardJS).bind("owokUserCardInfoReady", y);
			SmartCardJS.getUserCardInfo(p)
		}
	};
	this.executeLoginWithOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareLogin()
		}, A = {};
		A.notInitalized = function() {
			self.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			self.closeDialog();
			account.showRegisterDialogOwok(y)
		};
		A.ready = function() {
			self.closeDialog();
			auth.initAuthWithOwok(y)
		};
		self.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.executeDisconnectCardOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardDisconnect()
		}, A = {};
		A.notInitalized = function() {
			self.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			self.closeDialog();
			showAlertOk(allyve.mandant.msgCardNotInUse())
		};
		A.ready = function() {
			self.closeDialog();
			(new ConfirmCardDeactivation).showPinForm(y)
		};
		self.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.executeAddCardOwok = function(l, m, p, v) {
		var y = function() {
			(new StatusCheck).prepareCardAdd()
		}, A = {};
		A.notInitalized = function() {
			self.showStatusLoginCardInitialisedFalse(false, y)
		};
		A.notRegistered = function() {
			self.closeDialog();
			(new AddCardToAccount).showForm(y)
		};
		A.ready = function() {
			self.closeDialog();
			showAlertOk(allyve.mandant.msgCardAlreadyRegistered(), null, f)
		};
		self.executeSomethingWithOwok(A, l, m, p, v)
	};
	this.loginCardRemoved = function() {
		self.showStatusCardPresentFalse()
	};
	this.owokCardAlreadyInUse = function() {
		self.closeDialog();
		showAlertOk(allyve.mandant.msgCardPluginBlocked(), allyve.mandant.headerAchtung())
	};
	this.closeDialog = function() {
		dialog.close()
	};
	this.onClose = function() {
		self.unbindStatusEvents();
		self.unbindLoginEvents();
		self.unbindAddCardEvents();
		self.unbindDisconnectCardEvents();
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
	};
	this.showStatusAppletPresentFalse = function() {
		$("#StatusCheck_2_true").hide();
		$("#StatusCheck_hint_2").show();
		$("#StatusCheck_after_2").hide()
	};
	this.showStatusAppletPresentTrue = function() {
		$("#StatusCheck_2_true").show();
		$("#StatusCheck_hint_2").hide();
		$("#StatusCheck_after_2").show();
		self.checkStatusReaderPresent()
	};
	this.checkStatusReaderPresent = function() {
		SmartCardJS.getReaderListArray().length > 0 ? 
				self.showStatusReaderPresentTrue() : 
				self.showStatusReaderPresentFalse()
	};
	this.checkStatusCardPresent = function() {
		SmartCardJS.getCardListArray().length > 0 ? 
				self.showStatusCardPresentTrue() : 
				self.showStatusCardPresentFalse()
	};
	this.showStatusReaderPresentFalse = function() {
		$("#StatusCheck_3_true").hide();
		$("#StatusCheck_hint_3").show();
		$("#StatusCheck_after_3").hide()
	};
	this.showStatusReaderPresentTrue = function() {
		$("#StatusCheck_3_true").show();
		$("#StatusCheck_hint_3").hide();
		$("#StatusCheck_after_3").show()
	};
	this.showStatusCardPresentFalse = function() {
		$("#StatusCheck_4_true").hide();
		$("#StatusCheck_hint_4").show();
		$("#StatusCheck_after_4").hide()
	};
	this.showStatusCardPresentTrue = function() {
		$("#StatusCheck_4_true").show();
		$("#StatusCheck_hint_4").hide();
		$("#StatusCheck_after_4").show()
	};
	this.showStatusKnownCardFalse = function() {
		$("#StatusCheck_5_true").hide();
		$("#StatusCheck_hint_5").show();
		$("#StatusCheck_after_5").hide();
	};
	this.showStatusKnownCardTrue = function() {
		$("#StatusCheck_hint_5").hide();
		$("#StatusCheck_5_true").show();
		$("#StatusCheck_after_5").hide()
	}
};
function StatusCheckDialog() {
	this.showDialog = function(text) {
		this.setWidth(430);
		var t = '<div class="modalHeader">' + text.title + '</div><div class="StatusCheck_description">' + text.description + '</div>';
		t += '<div id="StatusCheckItems" class="StatusCheck_content">';
		t += '<div id="StatusCheck_1" class="StatusCheckItem"><span id="StatusCheck_1_false" class="StatusCheck_false"><img id="StatusCheck_1_true" class="StatusCheck_true" src="images/check.png" /></span>' + text.plugin_check + '</div><div id="StatusCheck_hint_1" class="StatusCheckHint">' + text.plugin_hint + '</div><div id="StatusCheck_after_1" class="StatusCheck_after">';
		t += '<div id="StatusCheck_2" class="StatusCheckItem"><span id="StatusCheck_2_false" class="StatusCheck_false"><img id="StatusCheck_2_true" class="StatusCheck_true" src="images/check.png" /></span>' + text.applet_check + '</div><div id="StatusCheck_hint_2" class="StatusCheckHint">' + text.applet_hint + '</div><div id="StatusCheck_after_2" class="StatusCheck_after">';
		t += '<div id="StatusCheck_3" class="StatusCheckItem"><span id="StatusCheck_3_false" class="StatusCheck_false"><img	id="StatusCheck_3_true" class="StatusCheck_true" src="images/check.png" /></span>' + text.reader_check + '</div><div id="StatusCheck_hint_3" class="StatusCheckHint">' + text.reader_hint + '</div><div id="StatusCheck_after_3" class="StatusCheck_after">';
		t += '<div id="StatusCheck_4" class="StatusCheckItem"><span id="StatusCheck_4_false" class="StatusCheck_false"><img	id="StatusCheck_4_true" class="StatusCheck_true" src="images/check.png" /></span>' + text.card_check + '</div><div id="StatusCheck_hint_4" class="StatusCheckHint">' + text.card_hint + '</div><div id="StatusCheck_after_4" class="StatusCheck_after">';
		t += '<div id="StatusCheck_5" class="StatusCheckItem"><span id="StatusCheck_5_false" class="StatusCheck_false"><img	id="StatusCheck_5_true" class="StatusCheck_true" src="images/check.png" /></span>' + text.application_check + '</div><div id="StatusCheck_hint_5" class="StatusCheckHint">' + text.application_hint + '</div><div id="StatusCheck_after_5" class="StatusCheck_after">';
		t += '</div></div></div></div></div></div>';
		this.showTemplate(t);
	};
	this.onClose = function() {
		$(StatusCheck).trigger("closeButtonPressed")
	};
	this.loadButtons = function() {
	}
}
StatusCheckDialog.prototype = new SimpleDialog;
StatusCheckDialog.constructor = StatusCheckDialog;
