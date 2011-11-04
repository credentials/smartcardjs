function SimpleDialog() {
	var self = this;
	this.width = 870;
	this.folder = "dialogs/";
	this.position = "center";
	this.dialogClass = "simpleDialog simpleDialogAlignTop";
	this.historyList = [];
	this.show = function(file) {
		this.loadContent(file);
		this.addToHistory(file);
		this.renderDialog();
		this.bindLinks()
	};
	this.loadContent = function(file) {
		$("#simpleDialogContent").load(this.folder + file + ".html")
	};
	this.showTemplate = function(content) {
		$("#simpleDialogContent").html(content);
		this.renderDialog()
	};
	this.renderDialog = function() {
		$(".ui-widget-overlay").height(0);
		$("#simpleDialog").dialog({
			modal : true,
			resizable : false,
			position : this.position,
			width : this.width,
			buttons : this.loadButtons(),
			dialogClass : this.dialogClass,
			close : function(d, e) { self.onClose(d, e) },
			open : function(d, e) {	self.onOpen(d, e) },
			focus : function(d, e) { self.onFocus(d, e) }
		});
		window.setTimeout(function() { self.adjustOverlaySize() }, 100)
	};
	this.adjustOverlaySize = function() {
		$(document).height() > $(".ui-widget-overlay").height()
				&& $(".ui-widget-overlay").height($(document).height())
	};
	this.addToHistory = function(b) {
		if (this.historyList.length < 1) {
			this.historyList.push(b);
		} else {
			this.historyList[this.historyList.length - 1] != b
					&& this.historyList.push(b)
		}
	};
	this.removeLastFromHistory = function() { this.historyList.pop() };
	this.getPreviousFromHistory = function() {
		return this.historyList.length < 2 ? ""
				: this.historyList[this.historyList.length - 2]
	};
	this.clearHistory = function() { this.historyList = [] };
	this.goBack = function() {
		var b = this.getPreviousFromHistory();
		if ("" != b) {
			this.removeLastFromHistory();
			this.show(b)
		}
	};
	this.loadButtonsOk = function() {
		return { 
			Ok : function() { $(this).dialog("close") } 
		}
	};
	this.loadButtonsOkBack = function() {
		return {
			Ok : function() { $(this).dialog("close") },
			"Back" : function() { simpleDialog.goBack() }
		}
	};
	this.loadButtons = function() {
		return this.historyList.length < 2 ? this.loadButtonsOk() : 
			this.loadButtonsOkBack()
	};
	this.setWidth = function(width) { this.width = width };
	this.setPosition = function(position) { this.position = position };
	this.setDialogClass = function(dialogClass) { this.dialogClass = dialogClass };
	this.onOpen = function() { };
	this.onFocus = function() { };
	this.onClose = function() {	this.clearHistory() };
	this.bindLinks = function() {
		$("#simpleDialog").unbind("click");
		$("#simpleDialog").bind("click", function(b) {
			b = b.target.id;
			if (self.isChildLink(b)) {
				b = b.match(/(.*)_link/);
				this.show(b[1]);
				return false
			}
			if (self.isFunctionLink(b)) {
				b = b.match(/(.*)_internal/);
				$(this).dialog("close");
				window[b[1]]();
				return false
			}
		})
	};
	this.isChildLink = function(b) {
		if (!b) return false;
		if (b.indexOf("_link") > 0)	return true;
		return false
	};
	this.isFunctionLink = function(b) {
		if (!b) return false;
		if (b.indexOf("_internal") > 0)	return true;
		return false
	};
	this.close = function() { $("#simpleDialog").dialog("close") }
}
var simpleDialog = new SimpleDialog;
