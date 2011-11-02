(function(a, b) {
	function d(h, k, o) {
		if (o === b && h.nodeType === 1) {
			o = h.getAttribute("data-" + k);
			if (typeof o === "string") {
				try {
					o = o === "true" ? true : o === "false" ? false
							: o === "null" ? null : !g.isNaN(o) ? parseFloat(o)
									: z.test(o) ? g.parseJSON(o) : o
				} catch (q) {
				}
				g.data(h, k, o)
			} else
				o = b
		}
		return o
	}
	function e() {
		return false
	}
	function f() {
		return true
	}
	function l(h, k, o) {
		o[0].type = h;
		return g.event.handle.apply(k, o)
	}
	function m(h) {
		var k, o, q, w, E, L, K, P, da, W, fa, ia = [];
		w = [];
		E = g.data(this, this.nodeType ? "events" : "__events__");
		if (typeof E === "function")
			E = E.events;
		if (!(h.liveFired === this || !E || !E.live || h.button
				&& h.type === "click")) {
			if (h.namespace)
				fa = RegExp("(^|\\.)"
						+ h.namespace.split(".").join("\\.(?:.*\\.)?")
						+ "(\\.|$)");
			h.liveFired = this;
			var xa = E.live.slice(0);
			for (K = 0; K < xa.length; K++) {
				E = xa[K];
				E.origType.replace(ka, "") === h.type ? w.push(E.selector) : xa
						.splice(K--, 1)
			}
			w = g(h.target).closest(w, h.currentTarget);
			P = 0;
			for (da = w.length; P < da; P++) {
				W = w[P];
				for (K = 0; K < xa.length; K++) {
					E = xa[K];
					if (W.selector === E.selector
							&& (!fa || fa.test(E.namespace))) {
						L = W.elem;
						q = null;
						if (E.preType === "mouseenter"
								|| E.preType === "mouseleave") {
							h.type = E.preType;
							q = g(h.relatedTarget).closest(E.selector)[0]
						}
						if (!q || q !== L)
							ia.push({
								elem : L,
								handleObj : E,
								level : W.level
							})
					}
				}
			}
			P = 0;
			for (da = ia.length; P < da; P++) {
				w = ia[P];
				if (o && w.level > o)
					break;
				h.currentTarget = w.elem;
				h.data = w.handleObj.data;
				h.handleObj = w.handleObj;
				fa = w.handleObj.origHandler.apply(w.elem, arguments);
				if (fa === false || h.isPropagationStopped()) {
					o = w.level;
					if (fa === false)
						k = false;
					if (h.isImmediatePropagationStopped())
						break
				}
			}
			return k
		}
	}
	function p(h, k) {
		return (h && h !== "*" ? h + "." : "")
				+ k.replace(Wa, "`").replace(ob, "&")
	}
	function v(h, k, o) {
		if (g.isFunction(k))
			return g.grep(h, function(w, E) {
				return !!k.call(w, E, w) === o
			});
		else if (k.nodeType)
			return g.grep(h, function(w) {
				return w === k === o
			});
		else if (typeof k === "string") {
			var q = g.grep(h, function(w) {
				return w.nodeType === 1
			});
			if (Ga.test(k))
				return g.filter(k, q, !o);
			else
				k = g.filter(k, q)
		}
		return g.grep(h, function(w) {
			return g.inArray(w, k) >= 0 === o
		})
	}
	function y(h, k) {
		var o = 0;
		k.each(function() {
			if (this.nodeName === (h[o] && h[o].nodeName)) {
				var q = g.data(h[o++]), w = g.data(this, q);
				if (q = q && q.events) {
					delete w.handle;
					w.events = {};
					for ( var E in q)
						for ( var L in q[E])
							g.event.add(this, E, q[E][L], q[E][L].data)
				}
			}
		})
	}
	function A(h, k) {
		k.src ? g.ajax({
			url : k.src,
			async : false,
			dataType : "script"
		}) : g.globalEval(k.text || k.textContent || k.innerHTML || "");
		k.parentNode && k.parentNode.removeChild(k)
	}
	function M(h, k, o) {
		var q = k === "width" ? h.offsetWidth : h.offsetHeight;
		if (o === "border")
			return q;
		g.each(k === "width" ? gb : hb, function() {
			o || (q -= parseFloat(g.css(h, "padding" + this)) || 0);
			if (o === "margin")
				q += parseFloat(g.css(h, "margin" + this)) || 0;
			else
				q -= parseFloat(g.css(h, "border" + this + "Width")) || 0
		});
		return q
	}
	function D(h, k, o, q) {
		if (g.isArray(k) && k.length)
			g.each(k, function(w, E) {
				o || vb.test(h) ? q(h, E) : D(h + "["
						+ (typeof E === "object" || g.isArray(E) ? w : "")
						+ "]", E, o, q)
			});
		else if (!o && k != null && typeof k === "object")
			g.isEmptyObject(k) ? q(h, "") : g.each(k, function(w, E) {
				D(h + "[" + w + "]", E, o, q)
			});
		else
			q(h, k)
	}
	function s(h, k) {
		var o = {};
		g.each(bb.concat.apply([], bb.slice(0, k)), function() {
			o[this] = h
		});
		return o
	}
	function u(h) {
		if (!ga[h]) {
			var k = g("<" + h + ">").appendTo("body"), o = k.css("display");
			k.remove();
			if (o === "none" || o === "")
				o = "block";
			ga[h] = o
		}
		return ga[h]
	}
	function B(h) {
		return g.isWindow(h) ? h : h.nodeType === 9 ? h.defaultView
				|| h.parentWindow : false
	}
	var F = a.document, g = function() {
		function h() {
			if (!k.isReady) {
				try {
					F.documentElement.doScroll("left")
				} catch (J) {
					setTimeout(h, 1);
					return
				}
				k.ready()
			}
		}
		var k = function(J, U) {
			return new k.fn.init(J, U)
		}, o = a.jQuery, q = a.$, w, E = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, L = /\S/, K = /^\s+/, P = /\s+$/, da = /\W/, W = /\d/, fa = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, ia = /^[\],:{}\s]*$/, xa = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, ba = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, wa = /(?:^|:|,)(?:\s*\[)+/g, Ka = /(webkit)[ \/]([\w.]+)/, x = /(opera)(?:.*version)?[ \/]([\w.]+)/, H = /(msie) ([\w.]+)/, O = /(mozilla)(?:.*? rv:([\w.]+))?/, Q = navigator.userAgent, S = false, T = [], ca, ea = Object.prototype.toString, na = Object.prototype.hasOwnProperty, Ia = Array.prototype.push, La = Array.prototype.slice, Ma = String.prototype.trim, ma = Array.prototype.indexOf, ib = {};
		k.fn = k.prototype = {
			init : function(J, U) {
				var aa, ha, ta;
				if (!J)
					return this;
				if (J.nodeType) {
					this.context = this[0] = J;
					this.length = 1;
					return this
				}
				if (J === "body" && !U && F.body) {
					this.context = F;
					this[0] = F.body;
					this.selector = "body";
					this.length = 1;
					return this
				}
				if (typeof J === "string")
					if ((aa = E.exec(J)) && (aa[1] || !U))
						if (aa[1]) {
							ta = U ? U.ownerDocument || U : F;
							if (ha = fa.exec(J))
								if (k.isPlainObject(U)) {
									J = [ F.createElement(ha[1]) ];
									k.fn.attr.call(J, U, true)
								} else
									J = [ ta.createElement(ha[1]) ];
							else {
								ha = k.buildFragment([ aa[1] ], [ ta ]);
								J = (ha.cacheable ? ha.fragment.cloneNode(true)
										: ha.fragment).childNodes
							}
							return k.merge(this, J)
						} else {
							if ((ha = F.getElementById(aa[2])) && ha.parentNode) {
								if (ha.id !== aa[2])
									return w.find(J);
								this.length = 1;
								this[0] = ha
							}
							this.context = F;
							this.selector = J;
							return this
						}
					else if (!U && !da.test(J)) {
						this.selector = J;
						this.context = F;
						J = F.getElementsByTagName(J);
						return k.merge(this, J)
					} else
						return !U || U.jquery ? (U || w).find(J) : k(U).find(J);
				else if (k.isFunction(J))
					return w.ready(J);
				if (J.selector !== b) {
					this.selector = J.selector;
					this.context = J.context
				}
				return k.makeArray(J, this)
			},
			selector : "",
			jquery : "1.4.4",
			length : 0,
			size : function() {
				return this.length
			},
			toArray : function() {
				return La.call(this, 0)
			},
			get : function(J) {
				return J == null ? this.toArray() : J < 0 ? this.slice(J)[0]
						: this[J]
			},
			pushStack : function(J, U, aa) {
				var ha = k();
				k.isArray(J) ? Ia.apply(ha, J) : k.merge(ha, J);
				ha.prevObject = this;
				ha.context = this.context;
				if (U === "find")
					ha.selector = this.selector + (this.selector ? " " : "")
							+ aa;
				else if (U)
					ha.selector = this.selector + "." + U + "(" + aa + ")";
				return ha
			},
			each : function(J, U) {
				return k.each(this, J, U)
			},
			ready : function(J) {
				k.bindReady();
				if (k.isReady)
					J.call(F, k);
				else
					T && T.push(J);
				return this
			},
			eq : function(J) {
				return J === -1 ? this.slice(J) : this.slice(J, +J + 1)
			},
			first : function() {
				return this.eq(0)
			},
			last : function() {
				return this.eq(-1)
			},
			slice : function() {
				return this.pushStack(La.apply(this, arguments), "slice", La
						.call(arguments).join(","))
			},
			map : function(J) {
				return this.pushStack(k.map(this, function(U, aa) {
					return J.call(U, aa, U)
				}))
			},
			end : function() {
				return this.prevObject || k(null)
			},
			push : Ia,
			sort : [].sort,
			splice : [].splice
		};
		k.fn.init.prototype = k.fn;
		k.extend = k.fn.extend = function() {
			var J, U, aa, ha, ta, oa = arguments[0] || {}, Ea = 1, Na = arguments.length, Bb = false;
			if (typeof oa === "boolean") {
				Bb = oa;
				oa = arguments[1] || {};
				Ea = 2
			}
			if (typeof oa !== "object" && !k.isFunction(oa))
				oa = {};
			if (Na === Ea) {
				oa = this;
				--Ea
			}
			for (; Ea < Na; Ea++)
				if ((J = arguments[Ea]) != null)
					for (U in J) {
						aa = oa[U];
						ha = J[U];
						if (oa !== ha)
							if (Bb
									&& ha
									&& (k.isPlainObject(ha) || (ta = k
											.isArray(ha)))) {
								if (ta) {
									ta = false;
									aa = aa && k.isArray(aa) ? aa : []
								} else
									aa = aa && k.isPlainObject(aa) ? aa : {};
								oa[U] = k.extend(Bb, aa, ha)
							} else if (ha !== b)
								oa[U] = ha
					}
			return oa
		};
		k
				.extend({
					noConflict : function(J) {
						a.$ = q;
						if (J)
							a.jQuery = o;
						return k
					},
					isReady : false,
					readyWait : 1,
					ready : function(J) {
						J === true && k.readyWait--;
						if (!k.readyWait || J !== true && !k.isReady) {
							if (!F.body)
								return setTimeout(k.ready, 1);
							k.isReady = true;
							if (!(J !== true && --k.readyWait > 0))
								if (T) {
									var U = 0, aa = T;
									for (T = null; J = aa[U++];)
										J.call(F, k);
									k.fn.trigger
											&& k(F).trigger("ready").unbind(
													"ready")
								}
						}
					},
					bindReady : function() {
						if (!S) {
							S = true;
							if (F.readyState === "complete")
								return setTimeout(k.ready, 1);
							if (F.addEventListener) {
								F.addEventListener("DOMContentLoaded", ca,
										false);
								a.addEventListener("load", k.ready, false)
							} else if (F.attachEvent) {
								F.attachEvent("onreadystatechange", ca);
								a.attachEvent("onload", k.ready);
								var J = false;
								try {
									J = a.frameElement == null
								} catch (U) {
								}
								F.documentElement.doScroll && J && h()
							}
						}
					},
					isFunction : function(J) {
						return k.type(J) === "function"
					},
					isArray : Array.isArray || function(J) {
						return k.type(J) === "array"
					},
					isWindow : function(J) {
						return J && typeof J === "object" && "setInterval" in J
					},
					isNaN : function(J) {
						return J == null || !W.test(J) || isNaN(J)
					},
					type : function(J) {
						return J == null ? String(J) : ib[ea.call(J)]
								|| "object"
					},
					isPlainObject : function(J) {
						if (!J || k.type(J) !== "object" || J.nodeType
								|| k.isWindow(J))
							return false;
						if (J.constructor
								&& !na.call(J, "constructor")
								&& !na.call(J.constructor.prototype,
										"isPrototypeOf"))
							return false;
						for ( var U in J)
							;
						return U === b || na.call(J, U)
					},
					isEmptyObject : function(J) {
						for ( var U in J)
							return false;
						return true
					},
					error : function(J) {
						throw J;
					},
					parseJSON : function(J) {
						if (typeof J !== "string" || !J)
							return null;
						J = k.trim(J);
						if (ia.test(J.replace(xa, "@").replace(ba, "]")
								.replace(wa, "")))
							return a.JSON && a.JSON.parse ? a.JSON.parse(J)
									: (new Function("return " + J))();
						else
							k.error("Invalid JSON: " + J)
					},
					noop : function() {
					},
					globalEval : function(J) {
						if (J && L.test(J)) {
							var U = F.getElementsByTagName("head")[0]
									|| F.documentElement, aa = F
									.createElement("script");
							aa.type = "text/javascript";
							if (k.support.scriptEval)
								aa.appendChild(F.createTextNode(J));
							else
								aa.text = J;
							U.insertBefore(aa, U.firstChild);
							U.removeChild(aa)
						}
					},
					nodeName : function(J, U) {
						return J.nodeName
								&& J.nodeName.toUpperCase() === U.toUpperCase()
					},
					each : function(J, U, aa) {
						var ha, ta = 0, oa = J.length, Ea = oa === b
								|| k.isFunction(J);
						if (aa)
							if (Ea)
								for (ha in J) {
									if (U.apply(J[ha], aa) === false)
										break
								}
							else
								for (; ta < oa;) {
									if (U.apply(J[ta++], aa) === false)
										break
								}
						else if (Ea)
							for (ha in J) {
								if (U.call(J[ha], ha, J[ha]) === false)
									break
							}
						else
							for (aa = J[0]; ta < oa
									&& U.call(aa, ta, aa) !== false; aa = J[++ta])
								;
						return J
					},
					trim : Ma ? function(J) {
						return J == null ? "" : Ma.call(J)
					} : function(J) {
						return J == null ? "" : J.toString().replace(K, "")
								.replace(P, "")
					},
					makeArray : function(J, U) {
						U = U || [];
						if (J != null) {
							var aa = k.type(J);
							J.length == null || aa === "string"
									|| aa === "function" || aa === "regexp"
									|| k.isWindow(J) ? Ia.call(U, J) : k.merge(
									U, J)
						}
						return U
					},
					inArray : function(J, U) {
						if (U.indexOf)
							return U.indexOf(J);
						for ( var aa = 0, ha = U.length; aa < ha; aa++)
							if (U[aa] === J)
								return aa;
						return -1
					},
					merge : function(J, U) {
						var aa = J.length, ha = 0;
						if (typeof U.length === "number")
							for ( var ta = U.length; ha < ta; ha++)
								J[aa++] = U[ha];
						else
							for (; U[ha] !== b;)
								J[aa++] = U[ha++];
						J.length = aa;
						return J
					},
					grep : function(J, U, aa) {
						var ha = [], ta;
						aa = !!aa;
						for ( var oa = 0, Ea = J.length; oa < Ea; oa++) {
							ta = !!U(J[oa], oa);
							aa !== ta && ha.push(J[oa])
						}
						return ha
					},
					map : function(J, U, aa) {
						for ( var ha = [], ta, oa = 0, Ea = J.length; oa < Ea; oa++) {
							ta = U(J[oa], oa, aa);
							if (ta != null)
								ha[ha.length] = ta
						}
						return ha.concat.apply([], ha)
					},
					guid : 1,
					proxy : function(J, U, aa) {
						if (arguments.length === 2)
							if (typeof U === "string") {
								aa = J;
								J = aa[U];
								U = b
							} else if (U && !k.isFunction(U)) {
								aa = U;
								U = b
							}
						if (!U && J)
							U = function() {
								return J.apply(aa || this, arguments)
							};
						if (J)
							U.guid = J.guid = J.guid || U.guid || k.guid++;
						return U
					},
					access : function(J, U, aa, ha, ta, oa) {
						var Ea = J.length;
						if (typeof U === "object") {
							for ( var Na in U)
								k.access(J, Na, U[Na], ha, ta, aa);
							return J
						}
						if (aa !== b) {
							ha = !oa && ha && k.isFunction(aa);
							for (Na = 0; Na < Ea; Na++)
								ta(J[Na], U, ha ? aa.call(J[Na], Na, ta(J[Na],
										U)) : aa, oa);
							return J
						}
						return Ea ? ta(J[0], U) : b
					},
					now : function() {
						return (new Date).getTime()
					},
					uaMatch : function(J) {
						J = J.toLowerCase();
						J = Ka.exec(J) || x.exec(J) || H.exec(J)
								|| J.indexOf("compatible") < 0 && O.exec(J)
								|| [];
						return {
							browser : J[1] || "",
							version : J[2] || "0"
						}
					},
					browser : {}
				});
		k.each("Boolean Number String Function Array Date RegExp Object"
				.split(" "), function(J, U) {
			ib["[object " + U + "]"] = U.toLowerCase()
		});
		Q = k.uaMatch(Q);
		if (Q.browser) {
			k.browser[Q.browser] = true;
			k.browser.version = Q.version
		}
		if (k.browser.webkit)
			k.browser.safari = true;
		if (ma)
			k.inArray = function(J, U) {
				return ma.call(U, J)
			};
		if (!/\s/.test("\u00a0")) {
			K = /^[\s\xA0]+/;
			P = /[\s\xA0]+$/
		}
		w = k(F);
		if (F.addEventListener)
			ca = function() {
				F.removeEventListener("DOMContentLoaded", ca, false);
				k.ready()
			};
		else if (F.attachEvent)
			ca = function() {
				if (F.readyState === "complete") {
					F.detachEvent("onreadystatechange", ca);
					k.ready()
				}
			};
		return a.jQuery = a.$ = k
	}();
	(function() {
		g.support = {};
		var h = F.documentElement, k = F.createElement("script"), o = F
				.createElement("div"), q = "script" + g.now();
		o.style.display = "none";
		o.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
		var w = o.getElementsByTagName("*"), E = o.getElementsByTagName("a")[0], L = F
				.createElement("select"), K = L.appendChild(F
				.createElement("option"));
		if (!(!w || !w.length || !E)) {
			g.support = {
				leadingWhitespace : o.firstChild.nodeType === 3,
				tbody : !o.getElementsByTagName("tbody").length,
				htmlSerialize : !!o.getElementsByTagName("link").length,
				style : /red/.test(E.getAttribute("style")),
				hrefNormalized : E.getAttribute("href") === "/a",
				opacity : /^0.55$/.test(E.style.opacity),
				cssFloat : !!E.style.cssFloat,
				checkOn : o.getElementsByTagName("input")[0].value === "on",
				optSelected : K.selected,
				deleteExpando : true,
				optDisabled : false,
				checkClone : false,
				scriptEval : false,
				noCloneEvent : true,
				boxModel : null,
				inlineBlockNeedsLayout : false,
				shrinkWrapBlocks : false,
				reliableHiddenOffsets : true
			};
			L.disabled = true;
			g.support.optDisabled = !K.disabled;
			k.type = "text/javascript";
			try {
				k.appendChild(F.createTextNode("window." + q + "=1;"))
			} catch (P) {
			}
			h.insertBefore(k, h.firstChild);
			if (a[q]) {
				g.support.scriptEval = true;
				delete a[q]
			}
			try {
				delete k.test
			} catch (da) {
				g.support.deleteExpando = false
			}
			h.removeChild(k);
			if (o.attachEvent && o.fireEvent) {
				o.attachEvent("onclick", function W() {
					g.support.noCloneEvent = false;
					o.detachEvent("onclick", W)
				});
				o.cloneNode(true).fireEvent("onclick")
			}
			o = F.createElement("div");
			o.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
			h = F.createDocumentFragment();
			h.appendChild(o.firstChild);
			g.support.checkClone = h.cloneNode(true).cloneNode(true).lastChild.checked;
			g(function() {
				var W = F.createElement("div");
				W.style.width = W.style.paddingLeft = "1px";
				F.body.appendChild(W);
				g.boxModel = g.support.boxModel = W.offsetWidth === 2;
				if ("zoom" in W.style) {
					W.style.display = "inline";
					W.style.zoom = 1;
					g.support.inlineBlockNeedsLayout = W.offsetWidth === 2;
					W.style.display = "";
					W.innerHTML = "<div style='width:4px;'></div>";
					g.support.shrinkWrapBlocks = W.offsetWidth !== 2
				}
				W.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
				var fa = W.getElementsByTagName("td");
				g.support.reliableHiddenOffsets = fa[0].offsetHeight === 0;
				fa[0].style.display = "";
				fa[1].style.display = "none";
				g.support.reliableHiddenOffsets = g.support.reliableHiddenOffsets
						&& fa[0].offsetHeight === 0;
				W.innerHTML = "";
				F.body.removeChild(W).style.display = "none"
			});
			h = function(W) {
				var fa = F.createElement("div");
				W = "on" + W;
				var ia = W in fa;
				if (!ia) {
					fa.setAttribute(W, "return;");
					ia = typeof fa[W] === "function"
				}
				return ia
			};
			g.support.submitBubbles = h("submit");
			g.support.changeBubbles = h("change");
			h = k = o = w = E = null
		}
	})();
	var r = {}, z = /^(?:\{.*\}|\[.*\])$/;
	g
			.extend({
				cache : {},
				uuid : 0,
				expando : "jQuery" + g.now(),
				noData : {
					embed : true,
					object : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
					applet : true
				},
				data : function(h, k, o) {
					if (g.acceptData(h)) {
						h = h == a ? r : h;
						var q = h.nodeType, w = q ? h[g.expando] : null, E = g.cache;
						if (!(q && !w && typeof k === "string" && o === b)) {
							if (q)
								w || (h[g.expando] = w = ++g.uuid);
							else
								E = h;
							if (typeof k === "object")
								if (q)
									E[w] = g.extend(E[w], k);
								else
									g.extend(E, k);
							else if (q && !E[w])
								E[w] = {};
							h = q ? E[w] : E;
							if (o !== b)
								h[k] = o;
							return typeof k === "string" ? h[k] : h
						}
					}
				},
				removeData : function(h, k) {
					if (g.acceptData(h)) {
						h = h == a ? r : h;
						var o = h.nodeType, q = o ? h[g.expando] : h, w = g.cache, E = o ? w[q]
								: q;
						if (k) {
							if (E) {
								delete E[k];
								o && g.isEmptyObject(E) && g.removeData(h)
							}
						} else if (o && g.support.deleteExpando)
							delete h[g.expando];
						else if (h.removeAttribute)
							h.removeAttribute(g.expando);
						else if (o)
							delete w[q];
						else
							for ( var L in h)
								delete h[L]
					}
				},
				acceptData : function(h) {
					if (h.nodeName) {
						var k = g.noData[h.nodeName.toLowerCase()];
						if (k)
							return !(k === true || h.getAttribute("classid") !== k)
					}
					return true
				}
			});
	g.fn.extend({
		data : function(h, k) {
			var o = null;
			if (typeof h === "undefined") {
				if (this.length) {
					var q = this[0].attributes, w;
					o = g.data(this[0]);
					for ( var E = 0, L = q.length; E < L; E++) {
						w = q[E].name;
						if (w.indexOf("data-") === 0) {
							w = w.substr(5);
							d(this[0], w, o[w])
						}
					}
				}
				return o
			} else if (typeof h === "object")
				return this.each(function() {
					g.data(this, h)
				});
			var K = h.split(".");
			K[1] = K[1] ? "." + K[1] : "";
			if (k === b) {
				o = this.triggerHandler("getData" + K[1] + "!", [ K[0] ]);
				if (o === b && this.length) {
					o = g.data(this[0], h);
					o = d(this[0], h, o)
				}
				return o === b && K[1] ? this.data(K[0]) : o
			} else
				return this.each(function() {
					var P = g(this), da = [ K[0], k ];
					P.triggerHandler("setData" + K[1] + "!", da);
					g.data(this, h, k);
					P.triggerHandler("changeData" + K[1] + "!", da)
				})
		},
		removeData : function(h) {
			return this.each(function() {
				g.removeData(this, h)
			})
		}
	});
	g.extend({
		queue : function(h, k, o) {
			if (h) {
				k = (k || "fx") + "queue";
				var q = g.data(h, k);
				if (!o)
					return q || [];
				if (!q || g.isArray(o))
					q = g.data(h, k, g.makeArray(o));
				else
					q.push(o);
				return q
			}
		},
		dequeue : function(h, k) {
			k = k || "fx";
			var o = g.queue(h, k), q = o.shift();
			if (q === "inprogress")
				q = o.shift();
			if (q) {
				k === "fx" && o.unshift("inprogress");
				q.call(h, function() {
					g.dequeue(h, k)
				})
			}
		}
	});
	g.fn.extend({
		queue : function(h, k) {
			if (typeof h !== "string") {
				k = h;
				h = "fx"
			}
			if (k === b)
				return g.queue(this[0], h);
			return this.each(function() {
				var o = g.queue(this, h, k);
				h === "fx" && o[0] !== "inprogress" && g.dequeue(this, h)
			})
		},
		dequeue : function(h) {
			return this.each(function() {
				g.dequeue(this, h)
			})
		},
		delay : function(h, k) {
			h = g.fx ? g.fx.speeds[h] || h : h;
			k = k || "fx";
			return this.queue(k, function() {
				var o = this;
				setTimeout(function() {
					g.dequeue(o, k)
				}, h)
			})
		},
		clearQueue : function(h) {
			return this.queue(h || "fx", [])
		}
	});
	var n = /[\n\t]/g, G = /\s+/, I = /\r/g, N = /^(?:href|src|style)$/, V = /^(?:button|input)$/i, X = /^(?:button|input|object|select|textarea)$/i, Z = /^a(?:rea)?$/i, sa = /^(?:radio|checkbox)$/i;
	g.props = {
		"for" : "htmlFor",
		"class" : "className",
		readonly : "readOnly",
		maxlength : "maxLength",
		cellspacing : "cellSpacing",
		rowspan : "rowSpan",
		colspan : "colSpan",
		tabindex : "tabIndex",
		usemap : "useMap",
		frameborder : "frameBorder"
	};
	g.fn
			.extend({
				attr : function(h, k) {
					return g.access(this, h, k, true, g.attr)
				},
				removeAttr : function(h) {
					return this.each(function() {
						g.attr(this, h, "");
						this.nodeType === 1 && this.removeAttribute(h)
					})
				},
				addClass : function(h) {
					if (g.isFunction(h))
						return this.each(function(da) {
							var W = g(this);
							W.addClass(h.call(this, da, W.attr("class")))
						});
					if (h && typeof h === "string")
						for ( var k = (h || "").split(G), o = 0, q = this.length; o < q; o++) {
							var w = this[o];
							if (w.nodeType === 1)
								if (w.className) {
									for ( var E = " " + w.className + " ", L = w.className, K = 0, P = k.length; K < P; K++)
										if (E.indexOf(" " + k[K] + " ") < 0)
											L += " " + k[K];
									w.className = g.trim(L)
								} else
									w.className = h
						}
					return this
				},
				removeClass : function(h) {
					if (g.isFunction(h))
						return this.each(function(P) {
							var da = g(this);
							da.removeClass(h.call(this, P, da.attr("class")))
						});
					if (h && typeof h === "string" || h === b)
						for ( var k = (h || "").split(G), o = 0, q = this.length; o < q; o++) {
							var w = this[o];
							if (w.nodeType === 1 && w.className)
								if (h) {
									for ( var E = (" " + w.className + " ")
											.replace(n, " "), L = 0, K = k.length; L < K; L++)
										E = E.replace(" " + k[L] + " ", " ");
									w.className = g.trim(E)
								} else
									w.className = ""
						}
					return this
				},
				toggleClass : function(h, k) {
					var o = typeof h, q = typeof k === "boolean";
					if (g.isFunction(h))
						return this.each(function(w) {
							var E = g(this);
							E.toggleClass(h.call(this, w, E.attr("class"), k),
									k)
						});
					return this.each(function() {
						if (o === "string")
							for ( var w, E = 0, L = g(this), K = k, P = h
									.split(G); w = P[E++];) {
								K = q ? K : !L.hasClass(w);
								L[K ? "addClass" : "removeClass"](w)
							}
						else if (o === "undefined" || o === "boolean") {
							this.className
									&& g.data(this, "__className__",
											this.className);
							this.className = this.className || h === false ? ""
									: g.data(this, "__className__") || ""
						}
					})
				},
				hasClass : function(h) {
					h = " " + h + " ";
					for ( var k = 0, o = this.length; k < o; k++)
						if ((" " + this[k].className + " ").replace(n, " ")
								.indexOf(h) > -1)
							return true;
					return false
				},
				val : function(h) {
					if (!arguments.length) {
						var k = this[0];
						if (k) {
							if (g.nodeName(k, "option")) {
								var o = k.attributes.value;
								return !o || o.specified ? k.value : k.text
							}
							if (g.nodeName(k, "select")) {
								var q = k.selectedIndex;
								o = [];
								var w = k.options;
								k = k.type === "select-one";
								if (q < 0)
									return null;
								var E = k ? q : 0;
								for (q = k ? q + 1 : w.length; E < q; E++) {
									var L = w[E];
									if (L.selected
											&& (g.support.optDisabled ? !L.disabled
													: L
															.getAttribute("disabled") === null)
											&& (!L.parentNode.disabled || !g
													.nodeName(L.parentNode,
															"optgroup"))) {
										h = g(L).val();
										if (k)
											return h;
										o.push(h)
									}
								}
								return o
							}
							if (sa.test(k.type) && !g.support.checkOn)
								return k.getAttribute("value") === null ? "on"
										: k.value;
							return (k.value || "").replace(I, "")
						}
						return b
					}
					var K = g.isFunction(h);
					return this.each(function(P) {
						var da = g(this), W = h;
						if (this.nodeType === 1) {
							if (K)
								W = h.call(this, P, da.val());
							if (W == null)
								W = "";
							else if (typeof W === "number")
								W += "";
							else if (g.isArray(W))
								W = g.map(W, function(ia) {
									return ia == null ? "" : ia + ""
								});
							if (g.isArray(W) && sa.test(this.type))
								this.checked = g.inArray(da.val(), W) >= 0;
							else if (g.nodeName(this, "select")) {
								var fa = g.makeArray(W);
								g("option", this).each(
										function() {
											this.selected = g.inArray(g(this)
													.val(), fa) >= 0
										});
								if (!fa.length)
									this.selectedIndex = -1
							} else
								this.value = W
						}
					})
				}
			});
	g
			.extend({
				attrFn : {
					val : true,
					css : true,
					html : true,
					text : true,
					data : true,
					width : true,
					height : true,
					offset : true
				},
				attr : function(h, k, o, q) {
					if (!h || h.nodeType === 3 || h.nodeType === 8)
						return b;
					if (q && k in g.attrFn)
						return g(h)[k](o);
					q = h.nodeType !== 1 || !g.isXMLDoc(h);
					var w = o !== b;
					k = q && g.props[k] || k;
					var E = N.test(k);
					if ((k in h || h[k] !== b) && q && !E) {
						if (w) {
							k === "type"
									&& V.test(h.nodeName)
									&& h.parentNode
									&& g
											.error("type property can't be changed");
							if (o === null)
								h.nodeType === 1 && h.removeAttribute(k);
							else
								h[k] = o
						}
						if (g.nodeName(h, "form") && h.getAttributeNode(k))
							return h.getAttributeNode(k).nodeValue;
						if (k === "tabIndex")
							return (k = h.getAttributeNode("tabIndex"))
									&& k.specified ? k.value : X
									.test(h.nodeName)
									|| Z.test(h.nodeName) && h.href ? 0 : b;
						return h[k]
					}
					if (!g.support.style && q && k === "style") {
						if (w)
							h.style.cssText = "" + o;
						return h.style.cssText
					}
					w && h.setAttribute(k, "" + o);
					if (!h.attributes[k] && h.hasAttribute
							&& !h.hasAttribute(k))
						return b;
					h = !g.support.hrefNormalized && q && E ? h.getAttribute(k,
							2) : h.getAttribute(k);
					return h === null ? b : h
				}
			});
	var ka = /\.(.*)$/, Ca = /^(?:textarea|input|select)$/i, Wa = /\./g, ob = / /g, pb = /[^\w\s.|`]/g, pa = function(
			h) {
		return h.replace(pb, "\\$&")
	}, Fa = {
		focusin : 0,
		focusout : 0
	};
	g.event = {
		add : function(h, k, o, q) {
			if (!(h.nodeType === 3 || h.nodeType === 8)) {
				if (g.isWindow(h) && h !== a && !h.frameElement)
					h = a;
				if (o === false)
					o = e;
				else if (!o)
					return;
				var w, E;
				if (o.handler) {
					w = o;
					o = w.handler
				}
				if (!o.guid)
					o.guid = g.guid++;
				if (E = g.data(h)) {
					var L = h.nodeType ? "events" : "__events__", K = E[L], P = E.handle;
					if (typeof K === "function") {
						P = K.handle;
						K = K.events
					} else if (!K) {
						h.nodeType || (E[L] = E = function() {
						});
						E.events = K = {}
					}
					if (!P)
						E.handle = P = function() {
							return typeof g !== "undefined"
									&& !g.event.triggered ? g.event.handle
									.apply(P.elem, arguments) : b
						};
					P.elem = h;
					k = k.split(" ");
					for ( var da = 0, W; L = k[da++];) {
						E = w ? g.extend({}, w) : {
							handler : o,
							data : q
						};
						if (L.indexOf(".") > -1) {
							W = L.split(".");
							L = W.shift();
							E.namespace = W.slice(0).sort().join(".")
						} else {
							W = [];
							E.namespace = ""
						}
						E.type = L;
						if (!E.guid)
							E.guid = o.guid;
						var fa = K[L], ia = g.event.special[L] || {};
						if (!fa) {
							fa = K[L] = [];
							if (!ia.setup
									|| ia.setup.call(h, q, W, P) === false)
								if (h.addEventListener)
									h.addEventListener(L, P, false);
								else
									h.attachEvent && h.attachEvent("on" + L, P)
						}
						if (ia.add) {
							ia.add.call(h, E);
							if (!E.handler.guid)
								E.handler.guid = o.guid
						}
						fa.push(E);
						g.event.global[L] = true
					}
					h = null
				}
			}
		},
		global : {},
		remove : function(h, k, o, q) {
			if (!(h.nodeType === 3 || h.nodeType === 8)) {
				if (o === false)
					o = e;
				var w, E, L = 0, K, P, da, W, fa, ia, xa = h.nodeType ? "events"
						: "__events__", ba = g.data(h), wa = ba && ba[xa];
				if (ba && wa) {
					if (typeof wa === "function") {
						ba = wa;
						wa = wa.events
					}
					if (k && k.type) {
						o = k.handler;
						k = k.type
					}
					if (!k || typeof k === "string" && k.charAt(0) === ".") {
						k = k || "";
						for (w in wa)
							g.event.remove(h, w + k)
					} else {
						for (k = k.split(" "); w = k[L++];) {
							W = w;
							K = w.indexOf(".") < 0;
							P = [];
							if (!K) {
								P = w.split(".");
								w = P.shift();
								da = RegExp("(^|\\.)"
										+ g.map(P.slice(0).sort(), pa).join(
												"\\.(?:.*\\.)?") + "(\\.|$)")
							}
							if (fa = wa[w])
								if (o) {
									W = g.event.special[w] || {};
									for (E = q || 0; E < fa.length; E++) {
										ia = fa[E];
										if (o.guid === ia.guid) {
											if (K || da.test(ia.namespace)) {
												q == null && fa.splice(E--, 1);
												W.remove
														&& W.remove.call(h, ia)
											}
											if (q != null)
												break
										}
									}
									if (fa.length === 0 || q != null
											&& fa.length === 1) {
										if (!W.teardown
												|| W.teardown.call(h, P) === false)
											g.removeEvent(h, w, ba.handle);
										delete wa[w]
									}
								} else
									for (E = 0; E < fa.length; E++) {
										ia = fa[E];
										if (K || da.test(ia.namespace)) {
											g.event.remove(h, W, ia.handler, E);
											fa.splice(E--, 1)
										}
									}
						}
						if (g.isEmptyObject(wa)) {
							if (k = ba.handle)
								k.elem = null;
							delete ba.events;
							delete ba.handle;
							if (typeof ba === "function")
								g.removeData(h, xa);
							else
								g.isEmptyObject(ba) && g.removeData(h)
						}
					}
				}
			}
		},
		trigger : function(h, k, o, q) {
			var w = h.type || h;
			if (!q) {
				h = typeof h === "object" ? h[g.expando] ? h : g.extend(g
						.Event(w), h) : g.Event(w);
				if (w.indexOf("!") >= 0) {
					h.type = w = w.slice(0, -1);
					h.exclusive = true
				}
				if (!o) {
					h.stopPropagation();
					g.event.global[w]
							&& g.each(g.cache, function() {
								this.events
										&& this.events[w]
										&& g.event.trigger(h, k,
												this.handle.elem)
							})
				}
				if (!o || o.nodeType === 3 || o.nodeType === 8)
					return b;
				h.result = b;
				h.target = o;
				k = g.makeArray(k);
				k.unshift(h)
			}
			h.currentTarget = o;
			(q = o.nodeType ? g.data(o, "handle")
					: (g.data(o, "__events__") || {}).handle)
					&& q.apply(o, k);
			q = o.parentNode || o.ownerDocument;
			try {
				if (!(o && o.nodeName && g.noData[o.nodeName.toLowerCase()]))
					if (o["on" + w] && o["on" + w].apply(o, k) === false) {
						h.result = false;
						h.preventDefault()
					}
			} catch (E) {
			}
			if (!h.isPropagationStopped() && q)
				g.event.trigger(h, k, q, true);
			else if (!h.isDefaultPrevented()) {
				var L;
				q = h.target;
				var K = w.replace(ka, ""), P = g.nodeName(q, "a")
						&& K === "click", da = g.event.special[K] || {};
				if ((!da._default || da._default.call(o, h) === false)
						&& !P
						&& !(q && q.nodeName && g.noData[q.nodeName
								.toLowerCase()])) {
					try {
						if (q[K]) {
							if (L = q["on" + K])
								q["on" + K] = null;
							g.event.triggered = true;
							q[K]()
						}
					} catch (W) {
					}
					if (L)
						q["on" + K] = L;
					g.event.triggered = false
				}
			}
		},
		handle : function(h) {
			var k, o, q, w;
			o = [];
			var E = g.makeArray(arguments);
			h = E[0] = g.event.fix(h || a.event);
			h.currentTarget = this;
			k = h.type.indexOf(".") < 0 && !h.exclusive;
			if (!k) {
				q = h.type.split(".");
				h.type = q.shift();
				o = q.slice(0).sort();
				q = RegExp("(^|\\.)" + o.join("\\.(?:.*\\.)?") + "(\\.|$)")
			}
			h.namespace = h.namespace || o.join(".");
			w = g.data(this, this.nodeType ? "events" : "__events__");
			if (typeof w === "function")
				w = w.events;
			o = (w || {})[h.type];
			if (w && o) {
				o = o.slice(0);
				w = 0;
				for ( var L = o.length; w < L; w++) {
					var K = o[w];
					if (k || q.test(K.namespace)) {
						h.handler = K.handler;
						h.data = K.data;
						h.handleObj = K;
						K = K.handler.apply(this, E);
						if (K !== b) {
							h.result = K;
							if (K === false) {
								h.preventDefault();
								h.stopPropagation()
							}
						}
						if (h.isImmediatePropagationStopped())
							break
					}
				}
			}
			return h.result
		},
		props : "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which"
				.split(" "),
		fix : function(h) {
			if (h[g.expando])
				return h;
			var k = h;
			h = g.Event(k);
			for ( var o = this.props.length, q; o;) {
				q = this.props[--o];
				h[q] = k[q]
			}
			if (!h.target)
				h.target = h.srcElement || F;
			if (h.target.nodeType === 3)
				h.target = h.target.parentNode;
			if (!h.relatedTarget && h.fromElement)
				h.relatedTarget = h.fromElement === h.target ? h.toElement
						: h.fromElement;
			if (h.pageX == null && h.clientX != null) {
				k = F.documentElement;
				o = F.body;
				h.pageX = h.clientX
						+ (k && k.scrollLeft || o && o.scrollLeft || 0)
						- (k && k.clientLeft || o && o.clientLeft || 0);
				h.pageY = h.clientY
						+ (k && k.scrollTop || o && o.scrollTop || 0)
						- (k && k.clientTop || o && o.clientTop || 0)
			}
			if (h.which == null && (h.charCode != null || h.keyCode != null))
				h.which = h.charCode != null ? h.charCode : h.keyCode;
			if (!h.metaKey && h.ctrlKey)
				h.metaKey = h.ctrlKey;
			if (!h.which && h.button !== b)
				h.which = h.button & 1 ? 1 : h.button & 2 ? 3
						: h.button & 4 ? 2 : 0;
			return h
		},
		guid : 1E8,
		proxy : g.proxy,
		special : {
			ready : {
				setup : g.bindReady,
				teardown : g.noop
			},
			live : {
				add : function(h) {
					g.event.add(this, p(h.origType, h.selector), g.extend({},
							h, {
								handler : m,
								guid : h.handler.guid
							}))
				},
				remove : function(h) {
					g.event.remove(this, p(h.origType, h.selector), h)
				}
			},
			beforeunload : {
				setup : function(h, k, o) {
					if (g.isWindow(this))
						this.onbeforeunload = o
				},
				teardown : function(h, k) {
					if (this.onbeforeunload === k)
						this.onbeforeunload = null
				}
			}
		}
	};
	g.removeEvent = F.removeEventListener ? function(h, k, o) {
		h.removeEventListener && h.removeEventListener(k, o, false)
	} : function(h, k, o) {
		h.detachEvent && h.detachEvent("on" + k, o)
	};
	g.Event = function(h) {
		if (!this.preventDefault)
			return new g.Event(h);
		if (h && h.type) {
			this.originalEvent = h;
			this.type = h.type
		} else
			this.type = h;
		this.timeStamp = g.now();
		this[g.expando] = true
	};
	g.Event.prototype = {
		preventDefault : function() {
			this.isDefaultPrevented = f;
			var h = this.originalEvent;
			if (h)
				if (h.preventDefault)
					h.preventDefault();
				else
					h.returnValue = false
		},
		stopPropagation : function() {
			this.isPropagationStopped = f;
			var h = this.originalEvent;
			if (h) {
				h.stopPropagation && h.stopPropagation();
				h.cancelBubble = true
			}
		},
		stopImmediatePropagation : function() {
			this.isImmediatePropagationStopped = f;
			this.stopPropagation()
		},
		isDefaultPrevented : e,
		isPropagationStopped : e,
		isImmediatePropagationStopped : e
	};
	var Xa = function(h) {
		var k = h.relatedTarget;
		try {
			for (; k && k !== this;)
				k = k.parentNode;
			if (k !== this) {
				h.type = h.data;
				g.event.handle.apply(this, arguments)
			}
		} catch (o) {
		}
	}, Sa = function(h) {
		h.type = h.data;
		g.event.handle.apply(this, arguments)
	};
	g.each({
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	}, function(h, k) {
		g.event.special[h] = {
			setup : function(o) {
				g.event.add(this, k, o && o.selector ? Sa : Xa, h)
			},
			teardown : function(o) {
				g.event.remove(this, k, o && o.selector ? Sa : Xa)
			}
		}
	});
	if (!g.support.submitBubbles)
		g.event.special.submit = {
			setup : function() {
				if (this.nodeName.toLowerCase() !== "form") {
					g.event.add(this, "click.specialSubmit", function(h) {
						var k = h.target, o = k.type;
						if ((o === "submit" || o === "image")
								&& g(k).closest("form").length) {
							h.liveFired = b;
							return l("submit", this, arguments)
						}
					});
					g.event.add(this, "keypress.specialSubmit", function(h) {
						var k = h.target, o = k.type;
						if ((o === "text" || o === "password")
								&& g(k).closest("form").length
								&& h.keyCode === 13) {
							h.liveFired = b;
							return l("submit", this, arguments)
						}
					})
				} else
					return false
			},
			teardown : function() {
				g.event.remove(this, ".specialSubmit")
			}
		};
	if (!g.support.changeBubbles) {
		var Da, zb = function(h) {
			var k = h.type, o = h.value;
			if (k === "radio" || k === "checkbox")
				o = h.checked;
			else if (k === "select-multiple")
				o = h.selectedIndex > -1 ? g.map(h.options, function(q) {
					return q.selected
				}).join("-") : "";
			else if (h.nodeName.toLowerCase() === "select")
				o = h.selectedIndex;
			return o
		}, jb = function(h, k) {
			var o = h.target, q, w;
			if (!(!Ca.test(o.nodeName) || o.readOnly)) {
				q = g.data(o, "_change_data");
				w = zb(o);
				if (h.type !== "focusout" || o.type !== "radio")
					g.data(o, "_change_data", w);
				if (!(q === b || w === q))
					if (q != null || w) {
						h.type = "change";
						h.liveFired = b;
						return g.event.trigger(h, k, o)
					}
			}
		};
		g.event.special.change = {
			filters : {
				focusout : jb,
				beforedeactivate : jb,
				click : function(h) {
					var k = h.target, o = k.type;
					if (o === "radio" || o === "checkbox"
							|| k.nodeName.toLowerCase() === "select")
						return jb.call(this, h)
				},
				keydown : function(h) {
					var k = h.target, o = k.type;
					if (h.keyCode === 13
							&& k.nodeName.toLowerCase() !== "textarea"
							|| h.keyCode === 32
							&& (o === "checkbox" || o === "radio")
							|| o === "select-multiple")
						return jb.call(this, h)
				},
				beforeactivate : function(h) {
					h = h.target;
					g.data(h, "_change_data", zb(h))
				}
			},
			setup : function() {
				if (this.type === "file")
					return false;
				for ( var h in Da)
					g.event.add(this, h + ".specialChange", Da[h]);
				return Ca.test(this.nodeName)
			},
			teardown : function() {
				g.event.remove(this, ".specialChange");
				return Ca.test(this.nodeName)
			}
		};
		Da = g.event.special.change.filters;
		Da.focus = Da.beforeactivate
	}
	F.addEventListener && g.each({
		focus : "focusin",
		blur : "focusout"
	}, function(h, k) {
		function o(q) {
			q = g.event.fix(q);
			q.type = k;
			return g.event.trigger(q, null, q.target)
		}
		g.event.special[k] = {
			setup : function() {
				Fa[k]++ === 0 && F.addEventListener(h, o, true)
			},
			teardown : function() {
				--Fa[k] === 0 && F.removeEventListener(h, o, true)
			}
		}
	});
	g.each([ "bind", "one" ], function(h, k) {
		g.fn[k] = function(o, q, w) {
			if (typeof o === "object") {
				for ( var E in o)
					this[k](E, q, o[E], w);
				return this
			}
			if (g.isFunction(q) || q === false) {
				w = q;
				q = b
			}
			var L = k === "one" ? g.proxy(w, function(P) {
				g(this).unbind(P, L);
				return w.apply(this, arguments)
			}) : w;
			if (o === "unload" && k !== "one")
				this.one(o, q, w);
			else {
				E = 0;
				for ( var K = this.length; E < K; E++)
					g.event.add(this[E], o, L, q)
			}
			return this
		}
	});
	g.fn.extend({
		unbind : function(h, k) {
			if (typeof h === "object" && !h.preventDefault)
				for ( var o in h)
					this.unbind(o, h[o]);
			else {
				o = 0;
				for ( var q = this.length; o < q; o++)
					g.event.remove(this[o], h, k)
			}
			return this
		},
		delegate : function(h, k, o, q) {
			return this.live(k, o, q, h)
		},
		undelegate : function(h, k, o) {
			return arguments.length === 0 ? this.unbind("live") : this.die(k,
					null, o, h)
		},
		trigger : function(h, k) {
			return this.each(function() {
				g.event.trigger(h, k, this)
			})
		},
		triggerHandler : function(h, k) {
			if (this[0]) {
				h = g.Event(h);
				h.preventDefault();
				h.stopPropagation();
				g.event.trigger(h, k, this[0]);
				return h.result
			}
		},
		toggle : function(h) {
			for ( var k = arguments, o = 1; o < k.length;)
				g.proxy(h, k[o++]);
			return this.click(g.proxy(h, function(q) {
				var w = (g.data(this, "lastToggle" + h.guid) || 0) % o;
				g.data(this, "lastToggle" + h.guid, w + 1);
				q.preventDefault();
				return k[w].apply(this, arguments) || false
			}))
		},
		hover : function(h, k) {
			return this.mouseenter(h).mouseleave(k || h)
		}
	});
	var wb = {
		focus : "focusin",
		blur : "focusout",
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	};
	g.each([ "live", "die" ], function(h, k) {
		g.fn[k] = function(o, q, w, E) {
			var L, K = 0, P, da, W = E || this.selector;
			E = E ? this : g(this.context);
			if (typeof o === "object" && !o.preventDefault) {
				for (L in o)
					E[k](L, q, o[L], W);
				return this
			}
			if (g.isFunction(q)) {
				w = q;
				q = b
			}
			for (o = (o || "").split(" "); (L = o[K++]) != null;) {
				P = ka.exec(L);
				da = "";
				if (P) {
					da = P[0];
					L = L.replace(ka, "")
				}
				if (L === "hover")
					o.push("mouseenter" + da, "mouseleave" + da);
				else {
					P = L;
					if (L === "focus" || L === "blur") {
						o.push(wb[L] + da);
						L += da
					} else
						L = (wb[L] || L) + da;
					if (k === "live") {
						da = 0;
						for ( var fa = E.length; da < fa; da++)
							g.event.add(E[da], "live." + p(L, W), {
								data : q,
								selector : W,
								handler : w,
								origType : L,
								origHandler : w,
								preType : P
							})
					} else
						E.unbind("live." + p(L, W), w)
				}
			}
			return this
		}
	});
	g
			.each(
					"blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error"
							.split(" "), function(h, k) {
						g.fn[k] = function(o, q) {
							if (q == null) {
								q = o;
								o = null
							}
							return arguments.length > 0 ? this.bind(k, o, q)
									: this.trigger(k)
						};
						if (g.attrFn)
							g.attrFn[k] = true
					});
	a.attachEvent && !a.addEventListener && g(a).bind("unload", function() {
		for ( var h in g.cache)
			if (g.cache[h].handle)
				try {
					g.event.remove(g.cache[h].handle.elem)
				} catch (k) {
				}
	});
	(function() {
		function h(x, H, O, Q, S, T) {
			S = 0;
			for ( var ca = Q.length; S < ca; S++) {
				var ea = Q[S];
				if (ea) {
					var na = false;
					for (ea = ea[x]; ea;) {
						if (ea.sizcache === O) {
							na = Q[ea.sizset];
							break
						}
						if (ea.nodeType === 1 && !T) {
							ea.sizcache = O;
							ea.sizset = S
						}
						if (ea.nodeName.toLowerCase() === H) {
							na = ea;
							break
						}
						ea = ea[x]
					}
					Q[S] = na
				}
			}
		}
		function k(x, H, O, Q, S, T) {
			S = 0;
			for ( var ca = Q.length; S < ca; S++) {
				var ea = Q[S];
				if (ea) {
					var na = false;
					for (ea = ea[x]; ea;) {
						if (ea.sizcache === O) {
							na = Q[ea.sizset];
							break
						}
						if (ea.nodeType === 1) {
							if (!T) {
								ea.sizcache = O;
								ea.sizset = S
							}
							if (typeof H !== "string") {
								if (ea === H) {
									na = true;
									break
								}
							} else if (K.filter(H, [ ea ]).length > 0) {
								na = ea;
								break
							}
						}
						ea = ea[x]
					}
					Q[S] = na
				}
			}
		}
		var o = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, q = 0, w = Object.prototype.toString, E = false, L = true;
		[ 0, 0 ].sort(function() {
			L = false;
			return 0
		});
		var K = function(x, H, O, Q) {
			O = O || [];
			var S = H = H || F;
			if (H.nodeType !== 1 && H.nodeType !== 9)
				return [];
			if (!x || typeof x !== "string")
				return O;
			var T, ca, ea, na, Ia, La = true, Ma = K.isXML(H), ma = [], ib = x;
			do {
				o.exec("");
				if (T = o.exec(ib)) {
					ib = T[3];
					ma.push(T[1]);
					if (T[2]) {
						na = T[3];
						break
					}
				}
			} while (T);
			if (ma.length > 1 && da.exec(x))
				if (ma.length === 2 && P.relative[ma[0]])
					ca = Ka(ma[0] + ma[1], H);
				else
					for (ca = P.relative[ma[0]] ? [ H ] : K(ma.shift(), H); ma.length;) {
						x = ma.shift();
						if (P.relative[x])
							x += ma.shift();
						ca = Ka(x, ca)
					}
			else {
				if (!Q && ma.length > 1 && H.nodeType === 9 && !Ma
						&& P.match.ID.test(ma[0])
						&& !P.match.ID.test(ma[ma.length - 1])) {
					T = K.find(ma.shift(), H, Ma);
					H = T.expr ? K.filter(T.expr, T.set)[0] : T.set[0]
				}
				if (H) {
					T = Q ? {
						expr : ma.pop(),
						set : ia(Q)
					} : K.find(ma.pop(),
							ma.length === 1 && (ma[0] === "~" || ma[0] === "+")
									&& H.parentNode ? H.parentNode : H, Ma);
					ca = T.expr ? K.filter(T.expr, T.set) : T.set;
					if (ma.length > 0)
						ea = ia(ca);
					else
						La = false;
					for (; ma.length;) {
						T = Ia = ma.pop();
						if (P.relative[Ia])
							T = ma.pop();
						else
							Ia = "";
						if (T == null)
							T = H;
						P.relative[Ia](ea, T, Ma)
					}
				} else
					ea = []
			}
			ea || (ea = ca);
			ea || K.error(Ia || x);
			if (w.call(ea) === "[object Array]")
				if (La)
					if (H && H.nodeType === 1)
						for (x = 0; ea[x] != null; x++) {
							if (ea[x]
									&& (ea[x] === true || ea[x].nodeType === 1
											&& K.contains(H, ea[x])))
								O.push(ca[x])
						}
					else
						for (x = 0; ea[x] != null; x++)
							ea[x] && ea[x].nodeType === 1 && O.push(ca[x]);
				else
					O.push.apply(O, ea);
			else
				ia(ea, O);
			if (na) {
				K(na, S, O, Q);
				K.uniqueSort(O)
			}
			return O
		};
		K.uniqueSort = function(x) {
			if (ba) {
				E = L;
				x.sort(ba);
				if (E)
					for ( var H = 1; H < x.length; H++)
						x[H] === x[H - 1] && x.splice(H--, 1)
			}
			return x
		};
		K.matches = function(x, H) {
			return K(x, null, null, H)
		};
		K.matchesSelector = function(x, H) {
			return K(H, null, null, [ x ]).length > 0
		};
		K.find = function(x, H, O) {
			var Q;
			if (!x)
				return [];
			for ( var S = 0, T = P.order.length; S < T; S++) {
				var ca, ea = P.order[S];
				if (ca = P.leftMatch[ea].exec(x)) {
					var na = ca[1];
					ca.splice(1, 1);
					if (na.substr(na.length - 1) !== "\\") {
						ca[1] = (ca[1] || "").replace(/\\/g, "");
						Q = P.find[ea](ca, H, O);
						if (Q != null) {
							x = x.replace(P.match[ea], "");
							break
						}
					}
				}
			}
			Q || (Q = H.getElementsByTagName("*"));
			return {
				set : Q,
				expr : x
			}
		};
		K.filter = function(x, H, O, Q) {
			for ( var S, T, ca = x, ea = [], na = H, Ia = H && H[0]
					&& K.isXML(H[0]); x && H.length;) {
				for ( var La in P.filter)
					if ((S = P.leftMatch[La].exec(x)) != null && S[2]) {
						var Ma, ma, ib = P.filter[La];
						ma = S[1];
						T = false;
						S.splice(1, 1);
						if (ma.substr(ma.length - 1) !== "\\") {
							if (na === ea)
								ea = [];
							if (P.preFilter[La])
								if (S = P.preFilter[La](S, na, O, ea, Q, Ia)) {
									if (S === true)
										continue
								} else
									T = Ma = true;
							if (S)
								for ( var J = 0; (ma = na[J]) != null; J++)
									if (ma) {
										Ma = ib(ma, S, J, na);
										var U = Q ^ !!Ma;
										if (O && Ma != null)
											if (U)
												T = true;
											else
												na[J] = false;
										else if (U) {
											ea.push(ma);
											T = true
										}
									}
							if (Ma !== b) {
								O || (na = ea);
								x = x.replace(P.match[La], "");
								if (!T)
									return [];
								break
							}
						}
					}
				if (x === ca)
					if (T == null)
						K.error(x);
					else
						break;
				ca = x
			}
			return na
		};
		K.error = function(x) {
			throw "Syntax error, unrecognized expression: " + x;
		};
		var P = K.selectors = {
			order : [ "ID", "NAME", "TAG" ],
			match : {
				ID : /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				CLASS : /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				NAME : /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
				ATTR : /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
				TAG : /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
				CHILD : /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
				POS : /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
				PSEUDO : /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
			},
			leftMatch : {},
			attrMap : {
				"class" : "className",
				"for" : "htmlFor"
			},
			attrHandle : {
				href : function(x) {
					return x.getAttribute("href")
				}
			},
			relative : {
				"+" : function(x, H) {
					var O = typeof H === "string", Q = O && !/\W/.test(H);
					O = O && !Q;
					if (Q)
						H = H.toLowerCase();
					Q = 0;
					for ( var S = x.length, T; Q < S; Q++)
						if (T = x[Q]) {
							for (; (T = T.previousSibling) && T.nodeType !== 1;)
								;
							x[Q] = O || T && T.nodeName.toLowerCase() === H ? T || false
									: T === H
						}
					O && K.filter(H, x, true)
				},
				">" : function(x, H) {
					var O, Q = typeof H === "string", S = 0, T = x.length;
					if (Q && !/\W/.test(H))
						for (H = H.toLowerCase(); S < T; S++) {
							if (O = x[S]) {
								O = O.parentNode;
								x[S] = O.nodeName.toLowerCase() === H ? O
										: false
							}
						}
					else {
						for (; S < T; S++)
							if (O = x[S])
								x[S] = Q ? O.parentNode : O.parentNode === H;
						Q && K.filter(H, x, true)
					}
				},
				"" : function(x, H, O) {
					var Q, S = q++, T = k;
					if (typeof H === "string" && !/\W/.test(H)) {
						Q = H = H.toLowerCase();
						T = h
					}
					T("parentNode", H, S, x, Q, O)
				},
				"~" : function(x, H, O) {
					var Q, S = q++, T = k;
					if (typeof H === "string" && !/\W/.test(H)) {
						Q = H = H.toLowerCase();
						T = h
					}
					T("previousSibling", H, S, x, Q, O)
				}
			},
			find : {
				ID : function(x, H, O) {
					if (typeof H.getElementById !== "undefined" && !O)
						return (x = H.getElementById(x[1])) && x.parentNode ? [ x ]
								: []
				},
				NAME : function(x, H) {
					if (typeof H.getElementsByName !== "undefined") {
						var O = [];
						H = H.getElementsByName(x[1]);
						for ( var Q = 0, S = H.length; Q < S; Q++)
							H[Q].getAttribute("name") === x[1] && O.push(H[Q]);
						return O.length === 0 ? null : O
					}
				},
				TAG : function(x, H) {
					return H.getElementsByTagName(x[1])
				}
			},
			preFilter : {
				CLASS : function(x, H, O, Q, S, T) {
					x = " " + x[1].replace(/\\/g, "") + " ";
					if (T)
						return x;
					T = 0;
					for ( var ca; (ca = H[T]) != null; T++)
						if (ca)
							if (S
									^ (ca.className && (" " + ca.className + " ")
											.replace(/[\t\n]/g, " ").indexOf(x) >= 0))
								O || Q.push(ca);
							else if (O)
								H[T] = false;
					return false
				},
				ID : function(x) {
					return x[1].replace(/\\/g, "")
				},
				TAG : function(x) {
					return x[1].toLowerCase()
				},
				CHILD : function(x) {
					if (x[1] === "nth") {
						var H = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(x[2] === "even"
								&& "2n" || x[2] === "odd" && "2n+1"
								|| !/\D/.test(x[2]) && "0n+" + x[2] || x[2]);
						x[2] = H[1] + (H[2] || 1) - 0;
						x[3] = H[3] - 0
					}
					x[0] = q++;
					return x
				},
				ATTR : function(x, H, O, Q, S, T) {
					H = x[1].replace(/\\/g, "");
					if (!T && P.attrMap[H])
						x[1] = P.attrMap[H];
					if (x[2] === "~=")
						x[4] = " " + x[4] + " ";
					return x
				},
				PSEUDO : function(x, H, O, Q, S) {
					if (x[1] === "not")
						if ((o.exec(x[3]) || "").length > 1 || /^\w/.test(x[3]))
							x[3] = K(x[3], null, null, H);
						else {
							x = K.filter(x[3], H, O, true ^ S);
							O || Q.push.apply(Q, x);
							return false
						}
					else if (P.match.POS.test(x[0]) || P.match.CHILD.test(x[0]))
						return true;
					return x
				},
				POS : function(x) {
					x.unshift(true);
					return x
				}
			},
			filters : {
				enabled : function(x) {
					return x.disabled === false && x.type !== "hidden"
				},
				disabled : function(x) {
					return x.disabled === true
				},
				checked : function(x) {
					return x.checked === true
				},
				selected : function(x) {
					return x.selected === true
				},
				parent : function(x) {
					return !!x.firstChild
				},
				empty : function(x) {
					return !x.firstChild
				},
				has : function(x, H, O) {
					return !!K(O[3], x).length
				},
				header : function(x) {
					return /h\d/i.test(x.nodeName)
				},
				text : function(x) {
					return "text" === x.type
				},
				radio : function(x) {
					return "radio" === x.type
				},
				checkbox : function(x) {
					return "checkbox" === x.type
				},
				file : function(x) {
					return "file" === x.type
				},
				password : function(x) {
					return "password" === x.type
				},
				submit : function(x) {
					return "submit" === x.type
				},
				image : function(x) {
					return "image" === x.type
				},
				reset : function(x) {
					return "reset" === x.type
				},
				button : function(x) {
					return "button" === x.type
							|| x.nodeName.toLowerCase() === "button"
				},
				input : function(x) {
					return /input|select|textarea|button/i.test(x.nodeName)
				}
			},
			setFilters : {
				first : function(x, H) {
					return H === 0
				},
				last : function(x, H, O, Q) {
					return H === Q.length - 1
				},
				even : function(x, H) {
					return H % 2 === 0
				},
				odd : function(x, H) {
					return H % 2 === 1
				},
				lt : function(x, H, O) {
					return H < O[3] - 0
				},
				gt : function(x, H, O) {
					return H > O[3] - 0
				},
				nth : function(x, H, O) {
					return O[3] - 0 === H
				},
				eq : function(x, H, O) {
					return O[3] - 0 === H
				}
			},
			filter : {
				PSEUDO : function(x, H, O, Q) {
					var S = H[1], T = P.filters[S];
					if (T)
						return T(x, O, H, Q);
					else if (S === "contains")
						return (x.textContent || x.innerText
								|| K.getText([ x ]) || "").indexOf(H[3]) >= 0;
					else if (S === "not") {
						H = H[3];
						O = 0;
						for (Q = H.length; O < Q; O++)
							if (H[O] === x)
								return false;
						return true
					} else
						K.error("Syntax error, unrecognized expression: " + S)
				},
				CHILD : function(x, H) {
					var O = H[1], Q = x;
					switch (O) {
					case "only":
					case "first":
						for (; Q = Q.previousSibling;)
							if (Q.nodeType === 1)
								return false;
						if (O === "first")
							return true;
						Q = x;
					case "last":
						for (; Q = Q.nextSibling;)
							if (Q.nodeType === 1)
								return false;
						return true;
					case "nth":
						O = H[2];
						var S = H[3];
						if (O === 1 && S === 0)
							return true;
						H = H[0];
						var T = x.parentNode;
						if (T && (T.sizcache !== H || !x.nodeIndex)) {
							var ca = 0;
							for (Q = T.firstChild; Q; Q = Q.nextSibling)
								if (Q.nodeType === 1)
									Q.nodeIndex = ++ca;
							T.sizcache = H
						}
						Q = x.nodeIndex - S;
						return O === 0 ? Q === 0 : Q % O === 0 && Q / O >= 0
					}
				},
				ID : function(x, H) {
					return x.nodeType === 1 && x.getAttribute("id") === H
				},
				TAG : function(x, H) {
					return H === "*" && x.nodeType === 1
							|| x.nodeName.toLowerCase() === H
				},
				CLASS : function(x, H) {
					return (" " + (x.className || x.getAttribute("class")) + " ")
							.indexOf(H) > -1
				},
				ATTR : function(x, H) {
					var O = H[1];
					O = P.attrHandle[O] ? P.attrHandle[O](x)
							: x[O] != null ? x[O] : x.getAttribute(O);
					x = O + "";
					var Q = H[2];
					H = H[4];
					return O == null ? Q === "!="
							: Q === "=" ? x === H
									: Q === "*=" ? x.indexOf(H) >= 0
											: Q === "~=" ? (" " + x + " ")
													.indexOf(H) >= 0
													: !H ? x && O !== false
															: Q === "!=" ? x !== H
																	: Q === "^=" ? x
																			.indexOf(H) === 0
																			: Q === "$=" ? x
																					.substr(x.length
																							- H.length) === H
																					: Q === "|=" ? x === H
																							|| x
																									.substr(
																											0,
																											H.length + 1) === H
																									+ "-"
																							: false
				},
				POS : function(x, H, O, Q) {
					var S = P.setFilters[H[2]];
					if (S)
						return S(x, O, H, Q)
				}
			}
		}, da = P.match.POS, W = function(x, H) {
			return "\\" + (H - 0 + 1)
		}, fa;
		for (fa in P.match) {
			P.match[fa] = RegExp(P.match[fa].source
					+ /(?![^\[]*\])(?![^\(]*\))/.source);
			P.leftMatch[fa] = RegExp(/(^(?:.|\r|\n)*?)/.source
					+ P.match[fa].source.replace(/\\(\d+)/g, W))
		}
		var ia = function(x, H) {
			x = Array.prototype.slice.call(x, 0);
			if (H) {
				H.push.apply(H, x);
				return H
			}
			return x
		};
		try {
			Array.prototype.slice.call(F.documentElement.childNodes, 0)
		} catch (xa) {
			ia = function(x, H) {
				var O = 0;
				H = H || [];
				if (w.call(x) === "[object Array]")
					Array.prototype.push.apply(H, x);
				else if (typeof x.length === "number")
					for ( var Q = x.length; O < Q; O++)
						H.push(x[O]);
				else
					for (; x[O]; O++)
						H.push(x[O]);
				return H
			}
		}
		var ba, wa;
		if (F.documentElement.compareDocumentPosition)
			ba = function(x, H) {
				if (x === H) {
					E = true;
					return 0
				}
				if (!x.compareDocumentPosition || !H.compareDocumentPosition)
					return x.compareDocumentPosition ? -1 : 1;
				return x.compareDocumentPosition(H) & 4 ? -1 : 1
			};
		else {
			ba = function(x, H) {
				var O, Q, S = [], T = [];
				O = x.parentNode;
				Q = H.parentNode;
				var ca = O;
				if (x === H) {
					E = true;
					return 0
				} else if (O === Q)
					return wa(x, H);
				else if (O) {
					if (!Q)
						return 1
				} else
					return -1;
				for (; ca;) {
					S.unshift(ca);
					ca = ca.parentNode
				}
				for (ca = Q; ca;) {
					T.unshift(ca);
					ca = ca.parentNode
				}
				O = S.length;
				Q = T.length;
				for (ca = 0; ca < O && ca < Q; ca++)
					if (S[ca] !== T[ca])
						return wa(S[ca], T[ca]);
				return ca === O ? wa(x, T[ca], -1) : wa(S[ca], H, 1)
			};
			wa = function(x, H, O) {
				if (x === H)
					return O;
				for (x = x.nextSibling; x;) {
					if (x === H)
						return -1;
					x = x.nextSibling
				}
				return 1
			}
		}
		K.getText = function(x) {
			for ( var H = "", O, Q = 0; x[Q]; Q++) {
				O = x[Q];
				if (O.nodeType === 3 || O.nodeType === 4)
					H += O.nodeValue;
				else if (O.nodeType !== 8)
					H += K.getText(O.childNodes)
			}
			return H
		};
		(function() {
			var x = F.createElement("div"), H = "script" + (new Date).getTime(), O = F.documentElement;
			x.innerHTML = "<a name='" + H + "'/>";
			O.insertBefore(x, O.firstChild);
			if (F.getElementById(H)) {
				P.find.ID = function(Q, S, T) {
					if (typeof S.getElementById !== "undefined" && !T)
						return (S = S.getElementById(Q[1])) ? S.id === Q[1]
								|| typeof S.getAttributeNode !== "undefined"
								&& S.getAttributeNode("id").nodeValue === Q[1] ? [ S ]
								: b
								: []
				};
				P.filter.ID = function(Q, S) {
					var T = typeof Q.getAttributeNode !== "undefined"
							&& Q.getAttributeNode("id");
					return Q.nodeType === 1 && T && T.nodeValue === S
				}
			}
			O.removeChild(x);
			O = x = null
		})();
		(function() {
			var x = F.createElement("div");
			x.appendChild(F.createComment(""));
			if (x.getElementsByTagName("*").length > 0)
				P.find.TAG = function(H, O) {
					O = O.getElementsByTagName(H[1]);
					if (H[1] === "*") {
						H = [];
						for ( var Q = 0; O[Q]; Q++)
							O[Q].nodeType === 1 && H.push(O[Q]);
						O = H
					}
					return O
				};
			x.innerHTML = "<a href='#'></a>";
			if (x.firstChild
					&& typeof x.firstChild.getAttribute !== "undefined"
					&& x.firstChild.getAttribute("href") !== "#")
				P.attrHandle.href = function(H) {
					return H.getAttribute("href", 2)
				};
			x = null
		})();
		F.querySelectorAll
				&& function() {
					var x = K, H = F.createElement("div");
					H.innerHTML = "<p class='TEST'></p>";
					if (!(H.querySelectorAll && H.querySelectorAll(".TEST").length === 0)) {
						K = function(Q, S, T, ca) {
							S = S || F;
							Q = Q.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
							if (!ca && !K.isXML(S))
								if (S.nodeType === 9)
									try {
										return ia(S.querySelectorAll(Q), T)
									} catch (ea) {
									}
								else if (S.nodeType === 1
										&& S.nodeName.toLowerCase() !== "object") {
									var na = S.getAttribute("id"), Ia = na
											|| "__sizzle__";
									na || S.setAttribute("id", Ia);
									try {
										return ia(S.querySelectorAll("#" + Ia
												+ " " + Q), T)
									} catch (La) {
									} finally {
										na || S.removeAttribute("id")
									}
								}
							return x(Q, S, T, ca)
						};
						for ( var O in x)
							K[O] = x[O];
						H = null
					}
				}();
		(function() {
			var x = F.documentElement, H = x.matchesSelector
					|| x.mozMatchesSelector || x.webkitMatchesSelector
					|| x.msMatchesSelector, O = false;
			try {
				H.call(F.documentElement, "[test!='']:sizzle")
			} catch (Q) {
				O = true
			}
			if (H)
				K.matchesSelector = function(S, T) {
					T = T.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!K.isXML(S))
						try {
							if (O || !P.match.PSEUDO.test(T) && !/!=/.test(T))
								return H.call(S, T)
						} catch (ca) {
						}
					return K(T, null, null, [ S ]).length > 0
				}
		})();
		(function() {
			var x = F.createElement("div");
			x.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if (!(!x.getElementsByClassName || x.getElementsByClassName("e").length === 0)) {
				x.lastChild.className = "e";
				if (x.getElementsByClassName("e").length !== 1) {
					P.order.splice(1, 0, "CLASS");
					P.find.CLASS = function(H, O, Q) {
						if (typeof O.getElementsByClassName !== "undefined"
								&& !Q)
							return O.getElementsByClassName(H[1])
					};
					x = null
				}
			}
		})();
		K.contains = F.documentElement.contains ? function(x, H) {
			return x !== H && (x.contains ? x.contains(H) : true)
		} : F.documentElement.compareDocumentPosition ? function(x, H) {
			return !!(x.compareDocumentPosition(H) & 16)
		} : function() {
			return false
		};
		K.isXML = function(x) {
			return (x = (x ? x.ownerDocument || x : 0).documentElement) ? x.nodeName !== "HTML"
					: false
		};
		var Ka = function(x, H) {
			for ( var O = [], Q = "", S = H.nodeType ? [ H ] : H; H = P.match.PSEUDO
					.exec(x);) {
				Q += H[0];
				x = x.replace(P.match.PSEUDO, "")
			}
			x = P.relative[x] ? x + "*" : x;
			H = 0;
			for ( var T = S.length; H < T; H++)
				K(x, S[H], O);
			return K.filter(Q, O)
		};
		g.find = K;
		g.expr = K.selectors;
		g.expr[":"] = g.expr.filters;
		g.unique = K.uniqueSort;
		g.text = K.getText;
		g.isXMLDoc = K.isXML;
		g.contains = K.contains
	})();
	var ja = /Until$/, kb = /^(?:parents|prevUntil|prevAll)/, qa = /,/, Ga = /^.[^:#\[\.,]*$/, Aa = Array.prototype.slice, ua = g.expr.match.POS;
	g.fn
			.extend({
				find : function(h) {
					for ( var k = this.pushStack("", "find", h), o = 0, q = 0, w = this.length; q < w; q++) {
						o = k.length;
						g.find(h, this[q], k);
						if (q > 0)
							for ( var E = o; E < k.length; E++)
								for ( var L = 0; L < o; L++)
									if (k[L] === k[E]) {
										k.splice(E--, 1);
										break
									}
					}
					return k
				},
				has : function(h) {
					var k = g(h);
					return this.filter(function() {
						for ( var o = 0, q = k.length; o < q; o++)
							if (g.contains(this, k[o]))
								return true
					})
				},
				not : function(h) {
					return this.pushStack(v(this, h, false), "not", h)
				},
				filter : function(h) {
					return this.pushStack(v(this, h, true), "filter", h)
				},
				is : function(h) {
					return !!h && g.filter(h, this).length > 0
				},
				closest : function(h, k) {
					var o = [], q, w, E = this[0];
					if (g.isArray(h)) {
						var L, K = {}, P = 1;
						if (E && h.length) {
							q = 0;
							for (w = h.length; q < w; q++) {
								L = h[q];
								K[L]
										|| (K[L] = g.expr.match.POS.test(L) ? g(
												L, k || this.context)
												: L)
							}
							for (; E && E.ownerDocument && E !== k;) {
								for (L in K) {
									q = K[L];
									if (q.jquery ? q.index(E) > -1 : g(E).is(q))
										o.push({
											selector : L,
											elem : E,
											level : P
										})
								}
								E = E.parentNode;
								P++
							}
						}
						return o
					}
					L = ua.test(h) ? g(h, k || this.context) : null;
					q = 0;
					for (w = this.length; q < w; q++)
						for (E = this[q]; E;)
							if (L ? L.index(E) > -1 : g.find.matchesSelector(E,
									h)) {
								o.push(E);
								break
							} else {
								E = E.parentNode;
								if (!E || !E.ownerDocument || E === k)
									break
							}
					o = o.length > 1 ? g.unique(o) : o;
					return this.pushStack(o, "closest", h)
				},
				index : function(h) {
					if (!h || typeof h === "string")
						return g.inArray(this[0], h ? g(h) : this.parent()
								.children());
					return g.inArray(h.jquery ? h[0] : h, this)
				},
				add : function(h, k) {
					h = typeof h === "string" ? g(h, k || this.context) : g
							.makeArray(h);
					k = g.merge(this.get(), h);
					return this.pushStack(!h[0] || !h[0].parentNode
							|| h[0].parentNode.nodeType === 11 || !k[0]
							|| !k[0].parentNode
							|| k[0].parentNode.nodeType === 11 ? k : g
							.unique(k))
				},
				andSelf : function() {
					return this.add(this.prevObject)
				}
			});
	g.each({
		parent : function(h) {
			return (h = h.parentNode) && h.nodeType !== 11 ? h : null
		},
		parents : function(h) {
			return g.dir(h, "parentNode")
		},
		parentsUntil : function(h, k, o) {
			return g.dir(h, "parentNode", o)
		},
		next : function(h) {
			return g.nth(h, 2, "nextSibling")
		},
		prev : function(h) {
			return g.nth(h, 2, "previousSibling")
		},
		nextAll : function(h) {
			return g.dir(h, "nextSibling")
		},
		prevAll : function(h) {
			return g.dir(h, "previousSibling")
		},
		nextUntil : function(h, k, o) {
			return g.dir(h, "nextSibling", o)
		},
		prevUntil : function(h, k, o) {
			return g.dir(h, "previousSibling", o)
		},
		siblings : function(h) {
			return g.sibling(h.parentNode.firstChild, h)
		},
		children : function(h) {
			return g.sibling(h.firstChild)
		},
		contents : function(h) {
			return g.nodeName(h, "iframe") ? h.contentDocument
					|| h.contentWindow.document : g.makeArray(h.childNodes)
		}
	}, function(h, k) {
		g.fn[h] = function(o, q) {
			var w = g.map(this, k, o);
			ja.test(h) || (q = o);
			if (q && typeof q === "string")
				w = g.filter(q, w);
			w = this.length > 1 ? g.unique(w) : w;
			if ((this.length > 1 || qa.test(q)) && kb.test(h))
				w = w.reverse();
			return this.pushStack(w, h, Aa.call(arguments).join(","))
		}
	});
	g.extend({
		filter : function(h, k, o) {
			if (o)
				h = ":not(" + h + ")";
			return k.length === 1 ? g.find.matchesSelector(k[0], h) ? [ k[0] ]
					: [] : g.find.matches(h, k)
		},
		dir : function(h, k, o) {
			var q = [];
			for (h = h[k]; h && h.nodeType !== 9
					&& (o === b || h.nodeType !== 1 || !g(h).is(o));) {
				h.nodeType === 1 && q.push(h);
				h = h[k]
			}
			return q
		},
		nth : function(h, k, o) {
			k = k || 1;
			for ( var q = 0; h; h = h[o])
				if (h.nodeType === 1 && ++q === k)
					break;
			return h
		},
		sibling : function(h, k) {
			for ( var o = []; h; h = h.nextSibling)
				h.nodeType === 1 && h !== k && o.push(h);
			return o
		}
	});
	var cb = / jQuery\d+="(?:\d+|null)"/g, Ja = /^\s+/, qb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, lb = /<([\w:]+)/, Oa = /<tbody/i, Pa = /<|&#?\w+;/, Ha = /<(?:script|object|embed|option|style)/i, Ta = /checked\s*(?:[^=]|=\s*.checked.)/i, ya = /\=([^="'>\s]+\/)>/g, va = {
		option : [ 1, "<select multiple='multiple'>", "</select>" ],
		legend : [ 1, "<fieldset>", "</fieldset>" ],
		thead : [ 1, "<table>", "</table>" ],
		tr : [ 2, "<table><tbody>", "</tbody></table>" ],
		td : [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col : [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area : [ 1, "<map>", "</map>" ],
		_default : [ 0, "", "" ]
	};
	va.optgroup = va.option;
	va.tbody = va.tfoot = va.colgroup = va.caption = va.thead;
	va.th = va.td;
	if (!g.support.htmlSerialize)
		va._default = [ 1, "div<div>", "</div>" ];
	g.fn
			.extend({
				text : function(h) {
					if (g.isFunction(h))
						return this.each(function(k) {
							var o = g(this);
							o.text(h.call(this, k, o.text()))
						});
					if (typeof h !== "object" && h !== b)
						return this.empty().append(
								(this[0] && this[0].ownerDocument || F)
										.createTextNode(h));
					return g.text(this)
				},
				wrapAll : function(h) {
					if (g.isFunction(h))
						return this.each(function(o) {
							g(this).wrapAll(h.call(this, o))
						});
					if (this[0]) {
						var k = g(h, this[0].ownerDocument).eq(0).clone(true);
						this[0].parentNode && k.insertBefore(this[0]);
						k.map(
								function() {
									for ( var o = this; o.firstChild
											&& o.firstChild.nodeType === 1;)
										o = o.firstChild;
									return o
								}).append(this)
					}
					return this
				},
				wrapInner : function(h) {
					if (g.isFunction(h))
						return this.each(function(k) {
							g(this).wrapInner(h.call(this, k))
						});
					return this.each(function() {
						var k = g(this), o = k.contents();
						o.length ? o.wrapAll(h) : k.append(h)
					})
				},
				wrap : function(h) {
					return this.each(function() {
						g(this).wrapAll(h)
					})
				},
				unwrap : function() {
					return this.parent().each(
							function() {
								g.nodeName(this, "body")
										|| g(this).replaceWith(this.childNodes)
							}).end()
				},
				append : function() {
					return this.domManip(arguments, true, function(h) {
						this.nodeType === 1 && this.appendChild(h)
					})
				},
				prepend : function() {
					return this.domManip(arguments, true, function(h) {
						this.nodeType === 1
								&& this.insertBefore(h, this.firstChild)
					})
				},
				before : function() {
					if (this[0] && this[0].parentNode)
						return this.domManip(arguments, false, function(k) {
							this.parentNode.insertBefore(k, this)
						});
					else if (arguments.length) {
						var h = g(arguments[0]);
						h.push.apply(h, this.toArray());
						return this.pushStack(h, "before", arguments)
					}
				},
				after : function() {
					if (this[0] && this[0].parentNode)
						return this.domManip(arguments, false, function(k) {
							this.parentNode.insertBefore(k, this.nextSibling)
						});
					else if (arguments.length) {
						var h = this.pushStack(this, "after", arguments);
						h.push.apply(h, g(arguments[0]).toArray());
						return h
					}
				},
				remove : function(h, k) {
					for ( var o = 0, q; (q = this[o]) != null; o++)
						if (!h || g.filter(h, [ q ]).length) {
							if (!k && q.nodeType === 1) {
								g.cleanData(q.getElementsByTagName("*"));
								g.cleanData([ q ])
							}
							q.parentNode && q.parentNode.removeChild(q)
						}
					return this
				},
				empty : function() {
					for ( var h = 0, k; (k = this[h]) != null; h++)
						for (k.nodeType === 1
								&& g.cleanData(k.getElementsByTagName("*")); k.firstChild;)
							k.removeChild(k.firstChild);
					return this
				},
				clone : function(h) {
					var k = this.map(function() {
						if (!g.support.noCloneEvent && !g.isXMLDoc(this)) {
							var o = this.outerHTML, q = this.ownerDocument;
							if (!o) {
								o = q.createElement("div");
								o.appendChild(this.cloneNode(true));
								o = o.innerHTML
							}
							return g.clean([ o.replace(cb, "").replace(ya,
									'="$1">').replace(Ja, "") ], q)[0]
						} else
							return this.cloneNode(true)
					});
					if (h === true) {
						y(this, k);
						y(this.find("*"), k.find("*"))
					}
					return k
				},
				html : function(h) {
					if (h === b)
						return this[0] && this[0].nodeType === 1 ? this[0].innerHTML
								.replace(cb, "")
								: null;
					else if (typeof h === "string" && !Ha.test(h)
							&& (g.support.leadingWhitespace || !Ja.test(h))
							&& !va[(lb.exec(h) || [ "", "" ])[1].toLowerCase()]) {
						h = h.replace(qb, "<$1></$2>");
						try {
							for ( var k = 0, o = this.length; k < o; k++)
								if (this[k].nodeType === 1) {
									g.cleanData(this[k]
											.getElementsByTagName("*"));
									this[k].innerHTML = h
								}
						} catch (q) {
							this.empty().append(h)
						}
					} else
						g.isFunction(h) ? this.each(function(w) {
							var E = g(this);
							E.html(h.call(this, w, E.html()))
						}) : this.empty().append(h);
					return this
				},
				replaceWith : function(h) {
					if (this[0] && this[0].parentNode) {
						if (g.isFunction(h))
							return this.each(function(k) {
								var o = g(this), q = o.html();
								o.replaceWith(h.call(this, k, q))
							});
						if (typeof h !== "string")
							h = g(h).detach();
						return this.each(function() {
							var k = this.nextSibling, o = this.parentNode;
							g(this).remove();
							k ? g(k).before(h) : g(o).append(h)
						})
					} else
						return this.pushStack(g(g.isFunction(h) ? h() : h),
								"replaceWith", h)
				},
				detach : function(h) {
					return this.remove(h, true)
				},
				domManip : function(h, k, o) {
					var q, w, E, L = h[0], K = [];
					if (!g.support.checkClone && arguments.length === 3
							&& typeof L === "string" && Ta.test(L))
						return this.each(function() {
							g(this).domManip(h, k, o, true)
						});
					if (g.isFunction(L))
						return this.each(function(da) {
							var W = g(this);
							h[0] = L.call(this, da, k ? W.html() : b);
							W.domManip(h, k, o)
						});
					if (this[0]) {
						q = L && L.parentNode;
						q = g.support.parentNode && q && q.nodeType === 11
								&& q.childNodes.length === this.length ? {
							fragment : q
						} : g.buildFragment(h, this, K);
						E = q.fragment;
						if (w = E.childNodes.length === 1 ? (E = E.firstChild)
								: E.firstChild) {
							k = k && g.nodeName(w, "tr");
							w = 0;
							for ( var P = this.length; w < P; w++)
								o
										.call(
												k ? g
														.nodeName(this[w],
																"table") ? this[w]
														.getElementsByTagName("tbody")[0]
														|| this[w]
																.appendChild(this[w].ownerDocument
																		.createElement("tbody"))
														: this[w]
														: this[w], w > 0
														|| q.cacheable
														|| this.length > 1 ? E
														.cloneNode(true) : E)
						}
						K.length && g.each(K, A)
					}
					return this
				}
			});
	g.buildFragment = function(h, k, o) {
		var q, w, E;
		k = k && k[0] ? k[0].ownerDocument || k[0] : F;
		if (h.length === 1 && typeof h[0] === "string" && h[0].length < 512
				&& k === F && !Ha.test(h[0])
				&& (g.support.checkClone || !Ta.test(h[0]))) {
			w = true;
			if (E = g.fragments[h[0]])
				if (E !== 1)
					q = E
		}
		if (!q) {
			q = k.createDocumentFragment();
			g.clean(h, k, q, o)
		}
		if (w)
			g.fragments[h[0]] = E ? q : 1;
		return {
			fragment : q,
			cacheable : w
		}
	};
	g.fragments = {};
	g.each({
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function(h, k) {
		g.fn[h] = function(o) {
			var q = [];
			o = g(o);
			var w = this.length === 1 && this[0].parentNode;
			if (w && w.nodeType === 11 && w.childNodes.length === 1
					&& o.length === 1) {
				o[k](this[0]);
				return this
			} else {
				w = 0;
				for ( var E = o.length; w < E; w++) {
					var L = (w > 0 ? this.clone(true) : this).get();
					g(o[w])[k](L);
					q = q.concat(L)
				}
				return this.pushStack(q, h, o.selector)
			}
		}
	});
	g
			.extend({
				clean : function(h, k, o, q) {
					k = k || F;
					if (typeof k.createElement === "undefined")
						k = k.ownerDocument || k[0] && k[0].ownerDocument || F;
					for ( var w = [], E = 0, L; (L = h[E]) != null; E++) {
						if (typeof L === "number")
							L += "";
						if (L) {
							if (typeof L === "string" && !Pa.test(L))
								L = k.createTextNode(L);
							else if (typeof L === "string") {
								L = L.replace(qb, "<$1></$2>");
								var K = (lb.exec(L) || [ "", "" ])[1]
										.toLowerCase(), P = va[K]
										|| va._default, da = P[0], W = k
										.createElement("div");
								for (W.innerHTML = P[1] + L + P[2]; da--;)
									W = W.lastChild;
								if (!g.support.tbody) {
									da = Oa.test(L);
									K = K === "table" && !da ? W.firstChild
											&& W.firstChild.childNodes
											: P[1] === "<table>" && !da ? W.childNodes
													: [];
									for (P = K.length - 1; P >= 0; --P)
										g.nodeName(K[P], "tbody")
												&& !K[P].childNodes.length
												&& K[P].parentNode
														.removeChild(K[P])
								}
								!g.support.leadingWhitespace
										&& Ja.test(L)
										&& W.insertBefore(k.createTextNode(Ja
												.exec(L)[0]), W.firstChild);
								L = W.childNodes
							}
							if (L.nodeType)
								w.push(L);
							else
								w = g.merge(w, L)
						}
					}
					if (o)
						for (E = 0; w[E]; E++)
							if (q
									&& g.nodeName(w[E], "script")
									&& (!w[E].type || w[E].type.toLowerCase() === "text/javascript"))
								q.push(w[E].parentNode ? w[E].parentNode
										.removeChild(w[E]) : w[E]);
							else {
								w[E].nodeType === 1
										&& w.splice
												.apply(
														w,
														[ E + 1, 0 ]
																.concat(g
																		.makeArray(w[E]
																				.getElementsByTagName("script"))));
								o.appendChild(w[E])
							}
					return w
				},
				cleanData : function(h) {
					for ( var k, o, q = g.cache, w = g.event.special, E = g.support.deleteExpando, L = 0, K; (K = h[L]) != null; L++)
						if (!(K.nodeName && g.noData[K.nodeName.toLowerCase()]))
							if (o = K[g.expando]) {
								if ((k = q[o]) && k.events)
									for ( var P in k.events)
										w[P] ? g.event.remove(K, P) : g
												.removeEvent(K, P, k.handle);
								if (E)
									delete K[g.expando];
								else
									K.removeAttribute
											&& K.removeAttribute(g.expando);
								delete q[o]
							}
				}
			});
	var Ya = /alpha\([^)]*\)/i, za = /opacity=([^)]*)/, xb = /-([a-z])/ig, Ua = /([A-Z])/g, rb = /^-?\d+(?:px)?$/i, eb = /^-?\d/, Za = {
		position : "absolute",
		visibility : "hidden",
		display : "block"
	}, gb = [ "Left", "Right" ], hb = [ "Top", "Bottom" ], db, Qa, Ra, $a = function(
			h, k) {
		return k.toUpperCase()
	};
	g.fn.css = function(h, k) {
		if (arguments.length === 2 && k === b)
			return this;
		return g.access(this, h, k, true, function(o, q, w) {
			return w !== b ? g.style(o, q, w) : g.css(o, q)
		})
	};
	g.extend({
		cssHooks : {
			opacity : {
				get : function(h, k) {
					if (k) {
						h = db(h, "opacity", "opacity");
						return h === "" ? "1" : h
					} else
						return h.style.opacity
				}
			}
		},
		cssNumber : {
			zIndex : true,
			fontWeight : true,
			opacity : true,
			zoom : true,
			lineHeight : true
		},
		cssProps : {
			"float" : g.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style : function(h, k, o, q) {
			if (!(!h || h.nodeType === 3 || h.nodeType === 8 || !h.style)) {
				var w, E = g.camelCase(k), L = h.style, K = g.cssHooks[E];
				k = g.cssProps[E] || E;
				if (o !== b) {
					if (!(typeof o === "number" && isNaN(o) || o == null)) {
						if (typeof o === "number" && !g.cssNumber[E])
							o += "px";
						if (!K || !("set" in K) || (o = K.set(h, o)) !== b)
							try {
								L[k] = o
							} catch (P) {
							}
					}
				} else {
					if (K && "get" in K && (w = K.get(h, false, q)) !== b)
						return w;
					return L[k]
				}
			}
		},
		css : function(h, k, o) {
			var q, w = g.camelCase(k), E = g.cssHooks[w];
			k = g.cssProps[w] || w;
			if (E && "get" in E && (q = E.get(h, true, o)) !== b)
				return q;
			else if (db)
				return db(h, k, w)
		},
		swap : function(h, k, o) {
			var q = {}, w;
			for (w in k) {
				q[w] = h.style[w];
				h.style[w] = k[w]
			}
			o.call(h);
			for (w in k)
				h.style[w] = q[w]
		},
		camelCase : function(h) {
			return h.replace(xb, $a)
		}
	});
	g.curCSS = g.css;
	g.each([ "height", "width" ], function(h, k) {
		g.cssHooks[k] = {
			get : function(o, q, w) {
				var E;
				if (q) {
					if (o.offsetWidth !== 0)
						E = M(o, k, w);
					else
						g.swap(o, Za, function() {
							E = M(o, k, w)
						});
					if (E <= 0) {
						E = db(o, k, k);
						if (E === "0px" && Ra)
							E = Ra(o, k, k);
						if (E != null)
							return E === "" || E === "auto" ? "0px" : E
					}
					if (E < 0 || E == null) {
						E = o.style[k];
						return E === "" || E === "auto" ? "0px" : E
					}
					return typeof E === "string" ? E : E + "px"
				}
			},
			set : function(o, q) {
				if (rb.test(q)) {
					q = parseFloat(q);
					if (q >= 0)
						return q + "px"
				} else
					return q
			}
		}
	});
	if (!g.support.opacity)
		g.cssHooks.opacity = {
			get : function(h, k) {
				return za.test((k && h.currentStyle ? h.currentStyle.filter
						: h.style.filter)
						|| "") ? parseFloat(RegExp.$1) / 100 + "" : k ? "1"
						: ""
			},
			set : function(h, k) {
				h = h.style;
				h.zoom = 1;
				k = g.isNaN(k) ? "" : "alpha(opacity=" + k * 100 + ")";
				var o = h.filter || "";
				h.filter = Ya.test(o) ? o.replace(Ya, k) : h.filter + " " + k
			}
		};
	if (F.defaultView && F.defaultView.getComputedStyle)
		Qa = function(h, k, o) {
			var q;
			o = o.replace(Ua, "-$1").toLowerCase();
			if (!(k = h.ownerDocument.defaultView))
				return b;
			if (k = k.getComputedStyle(h, null)) {
				q = k.getPropertyValue(o);
				if (q === "" && !g.contains(h.ownerDocument.documentElement, h))
					q = g.style(h, o)
			}
			return q
		};
	if (F.documentElement.currentStyle)
		Ra = function(h, k) {
			var o, q, w = h.currentStyle && h.currentStyle[k], E = h.style;
			if (!rb.test(w) && eb.test(w)) {
				o = E.left;
				q = h.runtimeStyle.left;
				h.runtimeStyle.left = h.currentStyle.left;
				E.left = k === "fontSize" ? "1em" : w || 0;
				w = E.pixelLeft + "px";
				E.left = o;
				h.runtimeStyle.left = q
			}
			return w === "" ? "auto" : w
		};
	db = Qa || Ra;
	if (g.expr && g.expr.filters) {
		g.expr.filters.hidden = function(h) {
			var k = h.offsetHeight;
			return h.offsetWidth === 0 && k === 0
					|| !g.support.reliableHiddenOffsets
					&& (h.style.display || g.css(h, "display")) === "none"
		};
		g.expr.filters.visible = function(h) {
			return !g.expr.filters.hidden(h)
		}
	}
	var mb = g.now(), nb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, sb = /^(?:select|textarea)/i, Ab = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, ab = /^(?:GET|HEAD)$/, vb = /\[\]$/, Va = /\=\?(&|$)/, fb = /\?/, tb = /([?&])_=[^&]*/, ub = /^(\w+:)?\/\/([^\/?#]+)/, yb = /%20/g, R = /#.*$/, Y = g.fn.load;
	g.fn.extend({
		load : function(h, k, o) {
			if (typeof h !== "string" && Y)
				return Y.apply(this, arguments);
			else if (!this.length)
				return this;
			var q = h.indexOf(" ");
			if (q >= 0) {
				var w = h.slice(q, h.length);
				h = h.slice(0, q)
			}
			q = "GET";
			if (k)
				if (g.isFunction(k)) {
					o = k;
					k = null
				} else if (typeof k === "object") {
					k = g.param(k, g.ajaxSettings.traditional);
					q = "POST"
				}
			var E = this;
			g.ajax({
				url : h,
				type : q,
				dataType : "html",
				data : k,
				complete : function(L, K) {
					if (K === "success" || K === "notmodified")
						E.html(w ? g("<div>").append(
								L.responseText.replace(nb, "")).find(w)
								: L.responseText);
					o && E.each(o, [ L.responseText, K, L ])
				}
			});
			return this
		},
		serialize : function() {
			return g.param(this.serializeArray())
		},
		serializeArray : function() {
			return this.map(function() {
				return this.elements ? g.makeArray(this.elements) : this
			})
					.filter(
							function() {
								return this.name
										&& !this.disabled
										&& (this.checked
												|| sb.test(this.nodeName) || Ab
												.test(this.type))
							}).map(
							function(h, k) {
								h = g(this).val();
								return h == null ? null : g.isArray(h) ? g.map(
										h, function(o) {
											return {
												name : k.name,
												value : o
											}
										}) : {
									name : k.name,
									value : h
								}
							}).get()
		}
	});
	g.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend"
			.split(" "), function(h, k) {
		g.fn[k] = function(o) {
			return this.bind(k, o)
		}
	});
	g
			.extend({
				get : function(h, k, o, q) {
					if (g.isFunction(k)) {
						q = q || o;
						o = k;
						k = null
					}
					return g.ajax({
						type : "GET",
						url : h,
						data : k,
						success : o,
						dataType : q
					})
				},
				getScript : function(h, k) {
					return g.get(h, null, k, "script")
				},
				getJSON : function(h, k, o) {
					return g.get(h, k, o, "json")
				},
				post : function(h, k, o, q) {
					if (g.isFunction(k)) {
						q = q || o;
						o = k;
						k = {}
					}
					return g.ajax({
						type : "POST",
						url : h,
						data : k,
						success : o,
						dataType : q
					})
				},
				ajaxSetup : function(h) {
					g.extend(g.ajaxSettings, h)
				},
				ajaxSettings : {
					url : location.href,
					global : true,
					type : "GET",
					contentType : "application/x-www-form-urlencoded",
					processData : true,
					async : true,
					xhr : function() {
						return new a.XMLHttpRequest
					},
					accepts : {
						xml : "application/xml, text/xml",
						html : "text/html",
						script : "text/javascript, application/javascript",
						json : "application/json, text/javascript",
						text : "text/plain",
						_default : "*/*"
					}
				},
				ajax : function(h) {
					var k = g.extend(true, {}, g.ajaxSettings, h), o, q, w, E = k.type
							.toUpperCase(), L = ab.test(E);
					k.url = k.url.replace(R, "");
					k.context = h && h.context != null ? h.context : k;
					if (k.data && k.processData && typeof k.data !== "string")
						k.data = g.param(k.data, k.traditional);
					if (k.dataType === "jsonp") {
						if (E === "GET")
							Va.test(k.url)
									|| (k.url += (fb.test(k.url) ? "&" : "?")
											+ (k.jsonp || "callback") + "=?");
						else if (!k.data || !Va.test(k.data))
							k.data = (k.data ? k.data + "&" : "")
									+ (k.jsonp || "callback") + "=?";
						k.dataType = "json"
					}
					if (k.dataType === "json"
							&& (k.data && Va.test(k.data) || Va.test(k.url))) {
						o = k.jsonpCallback || "jsonp" + mb++;
						if (k.data)
							k.data = (k.data + "").replace(Va, "=" + o + "$1");
						k.url = k.url.replace(Va, "=" + o + "$1");
						k.dataType = "script";
						var K = a[o];
						a[o] = function(Q) {
							if (g.isFunction(K))
								K(Q);
							else {
								a[o] = b;
								try {
									delete a[o]
								} catch (S) {
								}
							}
							w = Q;
							g.handleSuccess(k, ba, q, w);
							g.handleComplete(k, ba, q, w);
							W && W.removeChild(fa)
						}
					}
					if (k.dataType === "script" && k.cache === null)
						k.cache = false;
					if (k.cache === false && L) {
						var P = g.now(), da = k.url.replace(tb, "$1_=" + P);
						k.url = da
								+ (da === k.url ? (fb.test(k.url) ? "&" : "?")
										+ "_=" + P : "")
					}
					if (k.data && L)
						k.url += (fb.test(k.url) ? "&" : "?") + k.data;
					k.global && g.active++ === 0
							&& g.event.trigger("ajaxStart");
					P = (P = ub.exec(k.url))
							&& (P[1]
									&& P[1].toLowerCase() !== location.protocol || P[2]
									.toLowerCase() !== location.host);
					if (k.dataType === "script" && E === "GET" && P) {
						var W = F.getElementsByTagName("head")[0]
								|| F.documentElement, fa = F
								.createElement("script");
						if (k.scriptCharset)
							fa.charset = k.scriptCharset;
						fa.src = k.url;
						if (!o) {
							var ia = false;
							fa.onload = fa.onreadystatechange = function() {
								if (!ia
										&& (!this.readyState
												|| this.readyState === "loaded" || this.readyState === "complete")) {
									ia = true;
									g.handleSuccess(k, ba, q, w);
									g.handleComplete(k, ba, q, w);
									fa.onload = fa.onreadystatechange = null;
									W && fa.parentNode && W.removeChild(fa)
								}
							}
						}
						W.insertBefore(fa, W.firstChild);
						return b
					}
					var xa = false, ba = k.xhr();
					if (ba) {
						k.username ? ba.open(E, k.url, k.async, k.username,
								k.password) : ba.open(E, k.url, k.async);
						try {
							if (k.data != null && !L || h && h.contentType)
								ba.setRequestHeader("Content-Type",
										k.contentType);
							if (k.ifModified) {
								g.lastModified[k.url]
										&& ba.setRequestHeader(
												"If-Modified-Since",
												g.lastModified[k.url]);
								g.etag[k.url]
										&& ba.setRequestHeader("If-None-Match",
												g.etag[k.url])
							}
							P
									|| ba.setRequestHeader("X-Requested-With",
											"XMLHttpRequest");
							ba
									.setRequestHeader(
											"Accept",
											k.dataType && k.accepts[k.dataType] ? k.accepts[k.dataType]
													+ ", */*; q=0.01"
													: k.accepts._default)
						} catch (wa) {
						}
						if (k.beforeSend
								&& k.beforeSend.call(k.context, ba, k) === false) {
							k.global && g.active-- === 1
									&& g.event.trigger("ajaxStop");
							ba.abort();
							return false
						}
						k.global && g.triggerGlobal(k, "ajaxSend", [ ba, k ]);
						var Ka = ba.onreadystatechange = function(Q) {
							if (!ba || ba.readyState === 0 || Q === "abort") {
								xa || g.handleComplete(k, ba, q, w);
								xa = true;
								if (ba)
									ba.onreadystatechange = g.noop
							} else if (!xa && ba
									&& (ba.readyState === 4 || Q === "timeout")) {
								xa = true;
								ba.onreadystatechange = g.noop;
								q = Q === "timeout" ? "timeout"
										: !g.httpSuccess(ba) ? "error"
												: k.ifModified
														&& g.httpNotModified(
																ba, k.url) ? "notmodified"
														: "success";
								var S;
								if (q === "success")
									try {
										w = g.httpData(ba, k.dataType, k)
									} catch (T) {
										q = "parsererror";
										S = T
									}
								if (q === "success" || q === "notmodified")
									o || g.handleSuccess(k, ba, q, w);
								else
									g.handleError(k, ba, q, S);
								o || g.handleComplete(k, ba, q, w);
								Q === "timeout" && ba.abort();
								if (k.async)
									ba = null
							}
						};
						try {
							var x = ba.abort;
							ba.abort = function() {
								ba && Function.prototype.call.call(x, ba);
								Ka("abort")
							}
						} catch (H) {
						}
						k.async && k.timeout > 0 && setTimeout(function() {
							ba && !xa && Ka("timeout")
						}, k.timeout);
						try {
							ba.send(L || k.data == null ? null : k.data)
						} catch (O) {
							g.handleError(k, ba, null, O);
							g.handleComplete(k, ba, q, w)
						}
						k.async || Ka();
						return ba
					}
				},
				param : function(h, k) {
					var o = [], q = function(E, L) {
						L = g.isFunction(L) ? L() : L;
						o[o.length] = encodeURIComponent(E) + "="
								+ encodeURIComponent(L)
					};
					if (k === b)
						k = g.ajaxSettings.traditional;
					if (g.isArray(h) || h.jquery)
						g.each(h, function() {
							q(this.name, this.value)
						});
					else
						for ( var w in h)
							D(w, h[w], k, q);
					return o.join("&").replace(yb, "+")
				}
			});
	g.extend({
		active : 0,
		lastModified : {},
		etag : {},
		handleError : function(h, k, o, q) {
			h.error && h.error.call(h.context, k, o, q);
			h.global && g.triggerGlobal(h, "ajaxError", [ k, h, q ])
		},
		handleSuccess : function(h, k, o, q) {
			h.success && h.success.call(h.context, q, o, k);
			h.global && g.triggerGlobal(h, "ajaxSuccess", [ k, h ])
		},
		handleComplete : function(h, k, o) {
			h.complete && h.complete.call(h.context, k, o);
			h.global && g.triggerGlobal(h, "ajaxComplete", [ k, h ]);
			h.global && g.active-- === 1 && g.event.trigger("ajaxStop")
		},
		triggerGlobal : function(h, k, o) {
			(h.context && h.context.url == null ? g(h.context) : g.event)
					.trigger(k, o)
		},
		httpSuccess : function(h) {
			try {
				return !h.status && location.protocol === "file:"
						|| h.status >= 200 && h.status < 300
						|| h.status === 304 || h.status === 1223
			} catch (k) {
			}
			return false
		},
		httpNotModified : function(h, k) {
			var o = h.getResponseHeader("Last-Modified"), q = h
					.getResponseHeader("Etag");
			if (o)
				g.lastModified[k] = o;
			if (q)
				g.etag[k] = q;
			return h.status === 304
		},
		httpData : function(h, k, o) {
			var q = h.getResponseHeader("content-type") || "", w = k === "xml"
					|| !k && q.indexOf("xml") >= 0;
			h = w ? h.responseXML : h.responseText;
			w && h.documentElement.nodeName === "parsererror"
					&& g.error("parsererror");
			if (o && o.dataFilter)
				h = o.dataFilter(h, k);
			if (typeof h === "string")
				if (k === "json" || !k && q.indexOf("json") >= 0)
					h = g.parseJSON(h);
				else if (k === "script" || !k && q.indexOf("javascript") >= 0)
					g.globalEval(h);
			return h
		}
	});
	if (a.ActiveXObject)
		g.ajaxSettings.xhr = function() {
			if (a.location.protocol !== "file:")
				try {
					return new a.XMLHttpRequest
				} catch (h) {
				}
			try {
				return new a.ActiveXObject("Microsoft.XMLHTTP")
			} catch (k) {
			}
		};
	g.support.ajax = !!g.ajaxSettings.xhr();
	var ga = {}, la = /^(?:toggle|show|hide)$/, ra = /^([+\-]=)?([\d+.\-]+)(.*)$/, Ba, bb = [
			[ "height", "marginTop", "marginBottom", "paddingTop",
					"paddingBottom" ],
			[ "width", "marginLeft", "marginRight", "paddingLeft",
					"paddingRight" ], [ "opacity" ] ];
	g.fn.extend({
		show : function(h, k, o) {
			if (h || h === 0)
				return this.animate(s("show", 3), h, k, o);
			else {
				o = 0;
				for ( var q = this.length; o < q; o++) {
					h = this[o];
					k = h.style.display;
					if (!g.data(h, "olddisplay") && k === "none")
						k = h.style.display = "";
					k === "" && g.css(h, "display") === "none"
							&& g.data(h, "olddisplay", u(h.nodeName))
				}
				for (o = 0; o < q; o++) {
					h = this[o];
					k = h.style.display;
					if (k === "" || k === "none")
						h.style.display = g.data(h, "olddisplay") || ""
				}
				return this
			}
		},
		hide : function(h, k, o) {
			if (h || h === 0)
				return this.animate(s("hide", 3), h, k, o);
			else {
				h = 0;
				for (k = this.length; h < k; h++) {
					o = g.css(this[h], "display");
					o !== "none" && g.data(this[h], "olddisplay", o)
				}
				for (h = 0; h < k; h++)
					this[h].style.display = "none";
				return this
			}
		},
		_toggle : g.fn.toggle,
		toggle : function(h, k, o) {
			var q = typeof h === "boolean";
			if (g.isFunction(h) && g.isFunction(k))
				this._toggle.apply(this, arguments);
			else
				h == null || q ? this.each(function() {
					var w = q ? h : g(this).is(":hidden");
					g(this)[w ? "show" : "hide"]()
				}) : this.animate(s("toggle", 3), h, k, o);
			return this
		},
		fadeTo : function(h, k, o, q) {
			return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({
						opacity : k
					}, h, o, q)
		},
		animate : function(h, k, o, q) {
			var w = g.speed(k, o, q);
			if (g.isEmptyObject(h))
				return this.each(w.complete);
			return this[w.queue === false ? "each" : "queue"](function() {
				var E = g.extend({}, w), L, K = this.nodeType === 1, P = K
						&& g(this).is(":hidden"), da = this;
				for (L in h) {
					var W = g.camelCase(L);
					if (L !== W) {
						h[W] = h[L];
						delete h[L];
						L = W
					}
					if (h[L] === "hide" && P || h[L] === "show" && !P)
						return E.complete.call(this);
					if (K && (L === "height" || L === "width")) {
						E.overflow = [ this.style.overflow,
								this.style.overflowX, this.style.overflowY ];
						if (g.css(this, "display") === "inline"
								&& g.css(this, "float") === "none")
							if (g.support.inlineBlockNeedsLayout)
								if (u(this.nodeName) === "inline")
									this.style.display = "inline-block";
								else {
									this.style.display = "inline";
									this.style.zoom = 1
								}
							else
								this.style.display = "inline-block"
					}
					if (g.isArray(h[L])) {
						(E.specialEasing = E.specialEasing || {})[L] = h[L][1];
						h[L] = h[L][0]
					}
				}
				if (E.overflow != null)
					this.style.overflow = "hidden";
				E.curAnim = g.extend({}, h);
				g.each(h, function(fa, ia) {
					var xa = new g.fx(da, E, fa);
					if (la.test(ia))
						xa[ia === "toggle" ? P ? "show" : "hide" : ia](h);
					else {
						var ba = ra.exec(ia), wa = xa.cur() || 0;
						if (ba) {
							ia = parseFloat(ba[2]);
							var Ka = ba[3] || "px";
							if (Ka !== "px") {
								g.style(da, fa, (ia || 1) + Ka);
								wa = (ia || 1) / xa.cur() * wa;
								g.style(da, fa, wa + Ka)
							}
							if (ba[1])
								ia = (ba[1] === "-=" ? -1 : 1) * ia + wa;
							xa.custom(wa, ia, Ka)
						} else
							xa.custom(wa, ia, "")
					}
				});
				return true
			})
		},
		stop : function(h, k) {
			var o = g.timers;
			h && this.queue([]);
			this.each(function() {
				for ( var q = o.length - 1; q >= 0; q--)
					if (o[q].elem === this) {
						k && o[q](true);
						o.splice(q, 1)
					}
			});
			k || this.dequeue();
			return this
		}
	});
	g.each({
		slideDown : s("show", 1),
		slideUp : s("hide", 1),
		slideToggle : s("toggle", 1),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		},
		fadeToggle : {
			opacity : "toggle"
		}
	}, function(h, k) {
		g.fn[h] = function(o, q, w) {
			return this.animate(k, o, q, w)
		}
	});
	g
			.extend({
				speed : function(h, k, o) {
					var q = h && typeof h === "object" ? g.extend({}, h) : {
						complete : o || !o && k || g.isFunction(h) && h,
						duration : h,
						easing : o && k || k && !g.isFunction(k) && k
					};
					q.duration = g.fx.off ? 0
							: typeof q.duration === "number" ? q.duration
									: q.duration in g.fx.speeds ? g.fx.speeds[q.duration]
											: g.fx.speeds._default;
					q.old = q.complete;
					q.complete = function() {
						q.queue !== false && g(this).dequeue();
						g.isFunction(q.old) && q.old.call(this)
					};
					return q
				},
				easing : {
					linear : function(h, k, o, q) {
						return o + q * h
					},
					swing : function(h, k, o, q) {
						return (-Math.cos(h * Math.PI) / 2 + 0.5) * q + o
					}
				},
				timers : [],
				fx : function(h, k, o) {
					this.options = k;
					this.elem = h;
					this.prop = o;
					if (!k.orig)
						k.orig = {}
				}
			});
	g.fx.prototype = {
		update : function() {
			this.options.step
					&& this.options.step.call(this.elem, this.now, this);
			(g.fx.step[this.prop] || g.fx.step._default)(this)
		},
		cur : function() {
			if (this.elem[this.prop] != null
					&& (!this.elem.style || this.elem.style[this.prop] == null))
				return this.elem[this.prop];
			var h = parseFloat(g.css(this.elem, this.prop));
			return h && h > -10000 ? h : 0
		},
		custom : function(h, k, o) {
			function q(L) {
				return w.step(L)
			}
			var w = this, E = g.fx;
			this.startTime = g.now();
			this.start = h;
			this.end = k;
			this.unit = o || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;
			q.elem = this.elem;
			if (q() && g.timers.push(q) && !Ba)
				Ba = setInterval(E.tick, E.interval)
		},
		show : function() {
			this.options.orig[this.prop] = g.style(this.elem, this.prop);
			this.options.show = true;
			this.custom(
					this.prop === "width" || this.prop === "height" ? 1 : 0,
					this.cur());
			g(this.elem).show()
		},
		hide : function() {
			this.options.orig[this.prop] = g.style(this.elem, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0)
		},
		step : function(h) {
			var k = g.now(), o = true;
			if (h || k >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				this.options.curAnim[this.prop] = true;
				for ( var q in this.options.curAnim)
					if (this.options.curAnim[q] !== true)
						o = false;
				if (o) {
					if (this.options.overflow != null
							&& !g.support.shrinkWrapBlocks) {
						var w = this.elem, E = this.options;
						g.each([ "", "X", "Y" ], function(K, P) {
							w.style["overflow" + P] = E.overflow[K]
						})
					}
					this.options.hide && g(this.elem).hide();
					if (this.options.hide || this.options.show)
						for ( var L in this.options.curAnim)
							g.style(this.elem, L, this.options.orig[L]);
					this.options.complete.call(this.elem)
				}
				return false
			} else {
				h = k - this.startTime;
				this.state = h / this.options.duration;
				k = this.options.easing
						|| (g.easing.swing ? "swing" : "linear");
				this.pos = g.easing[this.options.specialEasing
						&& this.options.specialEasing[this.prop] || k](
						this.state, h, 0, 1, this.options.duration);
				this.now = this.start + (this.end - this.start) * this.pos;
				this.update()
			}
			return true
		}
	};
	g.extend(g.fx,
			{
				tick : function() {
					for ( var h = g.timers, k = 0; k < h.length; k++)
						h[k]() || h.splice(k--, 1);
					h.length || g.fx.stop()
				},
				interval : 13,
				stop : function() {
					clearInterval(Ba);
					Ba = null
				},
				speeds : {
					slow : 600,
					fast : 200,
					_default : 400
				},
				step : {
					opacity : function(h) {
						g.style(h.elem, "opacity", h.now)
					},
					_default : function(h) {
						if (h.elem.style && h.elem.style[h.prop] != null)
							h.elem.style[h.prop] = (h.prop === "width"
									|| h.prop === "height" ? Math.max(0, h.now)
									: h.now)
									+ h.unit;
						else
							h.elem[h.prop] = h.now
					}
				}
			});
	if (g.expr && g.expr.filters)
		g.expr.filters.animated = function(h) {
			return g.grep(g.timers, function(k) {
				return h === k.elem
			}).length
		};
	var Cb = /^t(?:able|d|h)$/i, Db = /^(?:body|html)$/i;
	g.fn.offset = "getBoundingClientRect" in F.documentElement ? function(h) {
		var k = this[0], o;
		if (h)
			return this.each(function(L) {
				g.offset.setOffset(this, h, L)
			});
		if (!k || !k.ownerDocument)
			return null;
		if (k === k.ownerDocument.body)
			return g.offset.bodyOffset(k);
		try {
			o = k.getBoundingClientRect()
		} catch (q) {
		}
		var w = k.ownerDocument, E = w.documentElement;
		if (!o || !g.contains(E, k))
			return o || {
				top : 0,
				left : 0
			};
		k = w.body;
		w = B(w);
		return {
			top : o.top
					+ (w.pageYOffset || g.support.boxModel && E.scrollTop || k.scrollTop)
					- (E.clientTop || k.clientTop || 0),
			left : o.left
					+ (w.pageXOffset || g.support.boxModel && E.scrollLeft || k.scrollLeft)
					- (E.clientLeft || k.clientLeft || 0)
		}
	}
			: function(h) {
				var k = this[0];
				if (h)
					return this.each(function(da) {
						g.offset.setOffset(this, h, da)
					});
				if (!k || !k.ownerDocument)
					return null;
				if (k === k.ownerDocument.body)
					return g.offset.bodyOffset(k);
				g.offset.initialize();
				var o, q = k.offsetParent, w = k.ownerDocument, E = w.documentElement, L = w.body;
				o = (w = w.defaultView) ? w.getComputedStyle(k, null)
						: k.currentStyle;
				for ( var K = k.offsetTop, P = k.offsetLeft; (k = k.parentNode)
						&& k !== L && k !== E;) {
					if (g.offset.supportsFixedPosition
							&& o.position === "fixed")
						break;
					o = w ? w.getComputedStyle(k, null) : k.currentStyle;
					K -= k.scrollTop;
					P -= k.scrollLeft;
					if (k === q) {
						K += k.offsetTop;
						P += k.offsetLeft;
						if (g.offset.doesNotAddBorder
								&& !(g.offset.doesAddBorderForTableAndCells && Cb
										.test(k.nodeName))) {
							K += parseFloat(o.borderTopWidth) || 0;
							P += parseFloat(o.borderLeftWidth) || 0
						}
						q = k.offsetParent
					}
					if (g.offset.subtractsBorderForOverflowNotVisible
							&& o.overflow !== "visible") {
						K += parseFloat(o.borderTopWidth) || 0;
						P += parseFloat(o.borderLeftWidth) || 0
					}
					o = o
				}
				if (o.position === "relative" || o.position === "static") {
					K += L.offsetTop;
					P += L.offsetLeft
				}
				if (g.offset.supportsFixedPosition && o.position === "fixed") {
					K += Math.max(E.scrollTop, L.scrollTop);
					P += Math.max(E.scrollLeft, L.scrollLeft)
				}
				return {
					top : K,
					left : P
				}
			};
	g.offset = {
		initialize : function() {
			var h = F.body, k = F.createElement("div"), o, q, w, E = parseFloat(g
					.css(h, "marginTop")) || 0;
			g.extend(k.style, {
				position : "absolute",
				top : 0,
				left : 0,
				margin : 0,
				border : 0,
				width : "1px",
				height : "1px",
				visibility : "hidden"
			});
			k.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
			h.insertBefore(k, h.firstChild);
			o = k.firstChild;
			q = o.firstChild;
			w = o.nextSibling.firstChild.firstChild;
			this.doesNotAddBorder = q.offsetTop !== 5;
			this.doesAddBorderForTableAndCells = w.offsetTop === 5;
			q.style.position = "fixed";
			q.style.top = "20px";
			this.supportsFixedPosition = q.offsetTop === 20
					|| q.offsetTop === 15;
			q.style.position = q.style.top = "";
			o.style.overflow = "hidden";
			o.style.position = "relative";
			this.subtractsBorderForOverflowNotVisible = q.offsetTop === -5;
			this.doesNotIncludeMarginInBodyOffset = h.offsetTop !== E;
			h.removeChild(k);
			g.offset.initialize = g.noop
		},
		bodyOffset : function(h) {
			var k = h.offsetTop, o = h.offsetLeft;
			g.offset.initialize();
			if (g.offset.doesNotIncludeMarginInBodyOffset) {
				k += parseFloat(g.css(h, "marginTop")) || 0;
				o += parseFloat(g.css(h, "marginLeft")) || 0
			}
			return {
				top : k,
				left : o
			}
		},
		setOffset : function(h, k, o) {
			var q = g.css(h, "position");
			if (q === "static")
				h.style.position = "relative";
			var w = g(h), E = w.offset(), L = g.css(h, "top"), K = g.css(h,
					"left"), P = q === "absolute"
					&& g.inArray("auto", [ L, K ]) > -1;
			q = {};
			var da = {};
			if (P)
				da = w.position();
			L = P ? da.top : parseInt(L, 10) || 0;
			K = P ? da.left : parseInt(K, 10) || 0;
			if (g.isFunction(k))
				k = k.call(h, o, E);
			if (k.top != null)
				q.top = k.top - E.top + L;
			if (k.left != null)
				q.left = k.left - E.left + K;
			"using" in k ? k.using.call(h, q) : w.css(q)
		}
	};
	g.fn.extend({
		position : function() {
			if (!this[0])
				return null;
			var h = this[0], k = this.offsetParent(), o = this.offset(), q = Db
					.test(k[0].nodeName) ? {
				top : 0,
				left : 0
			} : k.offset();
			o.top -= parseFloat(g.css(h, "marginTop")) || 0;
			o.left -= parseFloat(g.css(h, "marginLeft")) || 0;
			q.top += parseFloat(g.css(k[0], "borderTopWidth")) || 0;
			q.left += parseFloat(g.css(k[0], "borderLeftWidth")) || 0;
			return {
				top : o.top - q.top,
				left : o.left - q.left
			}
		},
		offsetParent : function() {
			return this.map(function() {
				for ( var h = this.offsetParent || F.body; h
						&& !Db.test(h.nodeName)
						&& g.css(h, "position") === "static";)
					h = h.offsetParent;
				return h
			})
		}
	});
	g.each([ "Left", "Top" ], function(h, k) {
		var o = "scroll" + k;
		g.fn[o] = function(q) {
			var w = this[0], E;
			if (!w)
				return null;
			return q !== b ? this.each(function() {
				if (E = B(this))
					E.scrollTo(!h ? q : g(E).scrollLeft(), h ? q : g(E)
							.scrollTop());
				else
					this[o] = q
			}) : (E = B(w)) ? "pageXOffset" in E ? E[h ? "pageYOffset"
					: "pageXOffset"] : g.support.boxModel
					&& E.document.documentElement[o] || E.document.body[o]
					: w[o]
		}
	});
	g.each([ "Height", "Width" ], function(h, k) {
		var o = k.toLowerCase();
		g.fn["inner" + k] = function() {
			return this[0] ? parseFloat(g.css(this[0], o, "padding")) : null
		};
		g.fn["outer" + k] = function(q) {
			return this[0] ? parseFloat(g.css(this[0], o, q ? "margin"
					: "border")) : null
		};
		g.fn[o] = function(q) {
			var w = this[0];
			if (!w)
				return q == null ? null : this;
			if (g.isFunction(q))
				return this.each(function(L) {
					var K = g(this);
					K[o](q.call(this, L, K[o]()))
				});
			if (g.isWindow(w))
				return w.document.compatMode === "CSS1Compat"
						&& w.document.documentElement["client" + k]
						|| w.document.body["client" + k];
			else if (w.nodeType === 9)
				return Math.max(w.documentElement["client" + k],
						w.body["scroll" + k], w.documentElement["scroll" + k],
						w.body["offset" + k], w.documentElement["offset" + k]);
			else if (q === b) {
				w = g.css(w, o);
				var E = parseFloat(w);
				return g.isNaN(E) ? w : E
			} else
				return this.css(o, typeof q === "string" ? q : q + "px")
		}
	})
})(window);
(function(a, b) {
	function d(e) {
		return !a(e).parents().andSelf().filter(
				function() {
					return a.curCSS(this, "visibility") === "hidden"
							|| a.expr.filters.hidden(this)
				}).length
	}
	a.ui = a.ui || {};
	if (!a.ui.version) {
		a.extend(a.ui, {
			version : "1.8.7",
			keyCode : {
				ALT : 18,
				BACKSPACE : 8,
				CAPS_LOCK : 20,
				COMMA : 188,
				COMMAND : 91,
				COMMAND_LEFT : 91,
				COMMAND_RIGHT : 93,
				CONTROL : 17,
				DELETE : 46,
				DOWN : 40,
				END : 35,
				ENTER : 13,
				ESCAPE : 27,
				HOME : 36,
				INSERT : 45,
				LEFT : 37,
				MENU : 93,
				NUMPAD_ADD : 107,
				NUMPAD_DECIMAL : 110,
				NUMPAD_DIVIDE : 111,
				NUMPAD_ENTER : 108,
				NUMPAD_MULTIPLY : 106,
				NUMPAD_SUBTRACT : 109,
				PAGE_DOWN : 34,
				PAGE_UP : 33,
				PERIOD : 190,
				RIGHT : 39,
				SHIFT : 16,
				SPACE : 32,
				TAB : 9,
				UP : 38,
				WINDOWS : 91
			}
		});
		a.fn
				.extend({
					_focus : a.fn.focus,
					focus : function(e, f) {
						return typeof e === "number" ? this.each(function() {
							var l = this;
							setTimeout(function() {
								a(l).focus();
								f && f.call(l)
							}, e)
						}) : this._focus.apply(this, arguments)
					},
					scrollParent : function() {
						var e;
						e = a.browser.msie
								&& /(static|relative)/.test(this
										.css("position"))
								|| /absolute/.test(this.css("position")) ? this
								.parents()
								.filter(
										function() {
											return /(relative|absolute|fixed)/
													.test(a.curCSS(this,
															"position", 1))
													&& /(auto|scroll)/
															.test(a.curCSS(
																	this,
																	"overflow",
																	1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-y",
																					1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-x",
																					1))
										}).eq(0)
								: this
										.parents()
										.filter(
												function() {
													return /(auto|scroll)/
															.test(a.curCSS(
																	this,
																	"overflow",
																	1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-y",
																					1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-x",
																					1))
												}).eq(0);
						return /fixed/.test(this.css("position")) || !e.length ? a(document)
								: e
					},
					zIndex : function(e) {
						if (e !== b)
							return this.css("zIndex", e);
						if (this.length) {
							e = a(this[0]);
							for ( var f; e.length && e[0] !== document;) {
								f = e.css("position");
								if (f === "absolute" || f === "relative"
										|| f === "fixed") {
									f = parseInt(e.css("zIndex"), 10);
									if (!isNaN(f) && f !== 0)
										return f
								}
								e = e.parent()
							}
						}
						return 0
					},
					disableSelection : function() {
						return this.bind((a.support.selectstart ? "selectstart"
								: "mousedown")
								+ ".ui-disableSelection", function(e) {
							e.preventDefault()
						})
					},
					enableSelection : function() {
						return this.unbind(".ui-disableSelection")
					}
				});
		a.each([ "Width", "Height" ],
				function(e, f) {
					function l(y, A, M, D) {
						a.each(m,
								function() {
									A -= parseFloat(a.curCSS(y, "padding"
											+ this, true)) || 0;
									if (M)
										A -= parseFloat(a.curCSS(y, "border"
												+ this + "Width", true)) || 0;
									if (D)
										A -= parseFloat(a.curCSS(y, "margin"
												+ this, true)) || 0
								});
						return A
					}
					var m = f === "Width" ? [ "Left", "Right" ] : [ "Top",
							"Bottom" ], p = f.toLowerCase(), v = {
						innerWidth : a.fn.innerWidth,
						innerHeight : a.fn.innerHeight,
						outerWidth : a.fn.outerWidth,
						outerHeight : a.fn.outerHeight
					};
					a.fn["inner" + f] = function(y) {
						if (y === b)
							return v["inner" + f].call(this);
						return this.each(function() {
							a(this).css(p, l(this, y) + "px")
						})
					};
					a.fn["outer" + f] = function(y, A) {
						if (typeof y !== "number")
							return v["outer" + f].call(this, y);
						return this.each(function() {
							a(this).css(p, l(this, y, true, A) + "px")
						})
					}
				});
		a
				.extend(
						a.expr[":"],
						{
							data : function(e, f, l) {
								return !!a.data(e, l[3])
							},
							focusable : function(e) {
								var f = e.nodeName.toLowerCase(), l = a.attr(e,
										"tabindex");
								if ("area" === f) {
									f = e.parentNode;
									l = f.name;
									if (!e.href
											|| !l
											|| f.nodeName.toLowerCase() !== "map")
										return false;
									e = a("img[usemap=#" + l + "]")[0];
									return !!e && d(e)
								}
								return (/input|select|textarea|button|object/
										.test(f) ? !e.disabled
										: "a" == f ? e.href || !isNaN(l)
												: !isNaN(l))
										&& d(e)
							},
							tabbable : function(e) {
								var f = a.attr(e, "tabindex");
								return (isNaN(f) || f >= 0)
										&& a(e).is(":focusable")
							}
						});
		a(function() {
			var e = document.body, f = e.appendChild(f = document
					.createElement("div"));
			a.extend(f.style, {
				minHeight : "100px",
				height : "auto",
				padding : 0,
				borderWidth : 0
			});
			a.support.minHeight = f.offsetHeight === 100;
			a.support.selectstart = "onselectstart" in f;
			e.removeChild(f).style.display = "none"
		});
		a.extend(a.ui, {
			plugin : {
				add : function(e, f, l) {
					e = a.ui[e].prototype;
					for ( var m in l) {
						e.plugins[m] = e.plugins[m] || [];
						e.plugins[m].push([ f, l[m] ])
					}
				},
				call : function(e, f, l) {
					if ((f = e.plugins[f]) && e.element[0].parentNode)
						for ( var m = 0; m < f.length; m++)
							e.options[f[m][0]] && f[m][1].apply(e.element, l)
				}
			},
			contains : function(e, f) {
				return document.compareDocumentPosition ? e
						.compareDocumentPosition(f) & 16 : e !== f
						&& e.contains(f)
			},
			hasScroll : function(e, f) {
				if (a(e).css("overflow") === "hidden")
					return false;
				f = f && f === "left" ? "scrollLeft" : "scrollTop";
				var l = false;
				if (e[f] > 0)
					return true;
				e[f] = 1;
				l = e[f] > 0;
				e[f] = 0;
				return l
			},
			isOverAxis : function(e, f, l) {
				return e > f && e < f + l
			},
			isOver : function(e, f, l, m, p, v) {
				return a.ui.isOverAxis(e, l, p) && a.ui.isOverAxis(f, m, v)
			}
		})
	}
})(jQuery);
(function(a, b) {
	if (a.cleanData) {
		var d = a.cleanData;
		a.cleanData = function(f) {
			for ( var l = 0, m; (m = f[l]) != null; l++)
				a(m).triggerHandler("remove");
			d(f)
		}
	} else {
		var e = a.fn.remove;
		a.fn.remove = function(f, l) {
			return this.each(function() {
				if (!l)
					if (!f || a.filter(f, [ this ]).length)
						a("*", this).add([ this ]).each(function() {
							a(this).triggerHandler("remove")
						});
				return e.call(a(this), f, l)
			})
		}
	}
	a.widget = function(f, l, m) {
		var p = f.split(".")[0], v;
		f = f.split(".")[1];
		v = p + "-" + f;
		if (!m) {
			m = l;
			l = a.Widget
		}
		a.expr[":"][v] = function(y) {
			return !!a.data(y, f)
		};
		a[p] = a[p] || {};
		a[p][f] = function(y, A) {
			arguments.length && this._createWidget(y, A)
		};
		l = new l;
		l.options = a.extend(true, {}, l.options);
		a[p][f].prototype = a.extend(true, l, {
			namespace : p,
			widgetName : f,
			widgetEventPrefix : a[p][f].prototype.widgetEventPrefix || f,
			widgetBaseClass : v
		}, m);
		a.widget.bridge(f, a[p][f])
	};
	a.widget.bridge = function(f, l) {
		a.fn[f] = function(m) {
			var p = typeof m === "string", v = Array.prototype.slice.call(
					arguments, 1), y = this;
			m = !p && v.length ? a.extend.apply(null, [ true, m ].concat(v))
					: m;
			if (p && m.charAt(0) === "_")
				return y;
			p ? this.each(function() {
				var A = a.data(this, f), M = A && a.isFunction(A[m]) ? A[m]
						.apply(A, v) : A;
				if (M !== A && M !== b) {
					y = M;
					return false
				}
			}) : this.each(function() {
				var A = a.data(this, f);
				A ? A.option(m || {})._init() : a.data(this, f, new l(m, this))
			});
			return y
		}
	};
	a.Widget = function(f, l) {
		arguments.length && this._createWidget(f, l)
	};
	a.Widget.prototype = {
		widgetName : "widget",
		widgetEventPrefix : "",
		options : {
			disabled : false
		},
		_createWidget : function(f, l) {
			a.data(l, this.widgetName, this);
			this.element = a(l);
			this.options = a.extend(true, {}, this.options, this
					._getCreateOptions(), f);
			var m = this;
			this.element.bind("remove." + this.widgetName, function() {
				m.destroy()
			});
			this._create();
			this._trigger("create");
			this._init()
		},
		_getCreateOptions : function() {
			return a.metadata
					&& a.metadata.get(this.element[0])[this.widgetName]
		},
		_create : function() {
		},
		_init : function() {
		},
		destroy : function() {
			this.element.unbind("." + this.widgetName).removeData(
					this.widgetName);
			this.widget().unbind("." + this.widgetName).removeAttr(
					"aria-disabled").removeClass(
					this.widgetBaseClass + "-disabled ui-state-disabled")
		},
		widget : function() {
			return this.element
		},
		option : function(f, l) {
			var m = f;
			if (arguments.length === 0)
				return a.extend({}, this.options);
			if (typeof f === "string") {
				if (l === b)
					return this.options[f];
				m = {};
				m[f] = l
			}
			this._setOptions(m);
			return this
		},
		_setOptions : function(f) {
			var l = this;
			a.each(f, function(m, p) {
				l._setOption(m, p)
			});
			return this
		},
		_setOption : function(f, l) {
			this.options[f] = l;
			if (f === "disabled")
				this.widget()[l ? "addClass" : "removeClass"](
						this.widgetBaseClass + "-disabled ui-state-disabled")
						.attr("aria-disabled", l);
			return this
		},
		enable : function() {
			return this._setOption("disabled", false)
		},
		disable : function() {
			return this._setOption("disabled", true)
		},
		_trigger : function(f, l, m) {
			var p = this.options[f];
			l = a.Event(l);
			l.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix
					+ f).toLowerCase();
			m = m || {};
			if (l.originalEvent) {
				f = a.event.props.length;
				for ( var v; f;) {
					v = a.event.props[--f];
					l[v] = l.originalEvent[v]
				}
			}
			this.element.trigger(l, m);
			return !(a.isFunction(p) && p.call(this.element[0], l, m) === false || l
					.isDefaultPrevented())
		}
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.mouse",
					{
						options : {
							cancel : ":input,option",
							distance : 1,
							delay : 0
						},
						_mouseInit : function() {
							var b = this;
							this.element
									.bind("mousedown." + this.widgetName,
											function(d) {
												return b._mouseDown(d)
											})
									.bind(
											"click." + this.widgetName,
											function(d) {
												if (true === a
														.data(
																d.target,
																b.widgetName
																		+ ".preventClickEvent")) {
													a
															.removeData(
																	d.target,
																	b.widgetName
																			+ ".preventClickEvent");
													d
															.stopImmediatePropagation();
													return false
												}
											});
							this.started = false
						},
						_mouseDestroy : function() {
							this.element.unbind("." + this.widgetName)
						},
						_mouseDown : function(b) {
							b.originalEvent = b.originalEvent || {};
							if (!b.originalEvent.mouseHandled) {
								this._mouseStarted && this._mouseUp(b);
								this._mouseDownEvent = b;
								var d = this, e = b.which == 1, f = typeof this.options.cancel == "string" ? a(
										b.target).parents().add(b.target)
										.filter(this.options.cancel).length
										: false;
								if (!e || f || !this._mouseCapture(b))
									return true;
								this.mouseDelayMet = !this.options.delay;
								if (!this.mouseDelayMet)
									this._mouseDelayTimer = setTimeout(
											function() {
												d.mouseDelayMet = true
											}, this.options.delay);
								if (this._mouseDistanceMet(b)
										&& this._mouseDelayMet(b)) {
									this._mouseStarted = this._mouseStart(b) !== false;
									if (!this._mouseStarted) {
										b.preventDefault();
										return true
									}
								}
								this._mouseMoveDelegate = function(l) {
									return d._mouseMove(l)
								};
								this._mouseUpDelegate = function(l) {
									return d._mouseUp(l)
								};
								a(document).bind(
										"mousemove." + this.widgetName,
										this._mouseMoveDelegate).bind(
										"mouseup." + this.widgetName,
										this._mouseUpDelegate);
								b.preventDefault();
								return b.originalEvent.mouseHandled = true
							}
						},
						_mouseMove : function(b) {
							if (a.browser.msie && !(document.documentMode >= 9)
									&& !b.button)
								return this._mouseUp(b);
							if (this._mouseStarted) {
								this._mouseDrag(b);
								return b.preventDefault()
							}
							if (this._mouseDistanceMet(b)
									&& this._mouseDelayMet(b))
								(this._mouseStarted = this._mouseStart(
										this._mouseDownEvent, b) !== false) ? this
										._mouseDrag(b)
										: this._mouseUp(b);
							return !this._mouseStarted
						},
						_mouseUp : function(b) {
							a(document).unbind("mousemove." + this.widgetName,
									this._mouseMoveDelegate).unbind(
									"mouseup." + this.widgetName,
									this._mouseUpDelegate);
							if (this._mouseStarted) {
								this._mouseStarted = false;
								b.target == this._mouseDownEvent.target
										&& a.data(b.target, this.widgetName
												+ ".preventClickEvent", true);
								this._mouseStop(b)
							}
							return false
						},
						_mouseDistanceMet : function(b) {
							return Math.max(Math.abs(this._mouseDownEvent.pageX
									- b.pageX), Math
									.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance
						},
						_mouseDelayMet : function() {
							return this.mouseDelayMet
						},
						_mouseStart : function() {
						},
						_mouseDrag : function() {
						},
						_mouseStop : function() {
						},
						_mouseCapture : function() {
							return true
						}
					})
})(jQuery);
(function(a) {
	a.ui = a.ui || {};
	var b = /left|center|right/, d = /top|center|bottom/, e = a.fn.position, f = a.fn.offset;
	a.fn.position = function(l) {
		if (!l || !l.of)
			return e.apply(this, arguments);
		l = a.extend({}, l);
		var m = a(l.of), p = m[0], v = (l.collision || "flip").split(" "), y = l.offset ? l.offset
				.split(" ")
				: [ 0, 0 ], A, M, D;
		if (p.nodeType === 9) {
			A = m.width();
			M = m.height();
			D = {
				top : 0,
				left : 0
			}
		} else if (p.setTimeout) {
			A = m.width();
			M = m.height();
			D = {
				top : m.scrollTop(),
				left : m.scrollLeft()
			}
		} else if (p.preventDefault) {
			l.at = "left top";
			A = M = 0;
			D = {
				top : l.of.pageY,
				left : l.of.pageX
			}
		} else {
			A = m.outerWidth();
			M = m.outerHeight();
			D = m.offset()
		}
		a.each([ "my", "at" ], function() {
			var s = (l[this] || "").split(" ");
			if (s.length === 1)
				s = b.test(s[0]) ? s.concat([ "center" ])
						: d.test(s[0]) ? [ "center" ].concat(s) : [ "center",
								"center" ];
			s[0] = b.test(s[0]) ? s[0] : "center";
			s[1] = d.test(s[1]) ? s[1] : "center";
			l[this] = s
		});
		if (v.length === 1)
			v[1] = v[0];
		y[0] = parseInt(y[0], 10) || 0;
		if (y.length === 1)
			y[1] = y[0];
		y[1] = parseInt(y[1], 10) || 0;
		if (l.at[0] === "right")
			D.left += A;
		else if (l.at[0] === "center")
			D.left += A / 2;
		if (l.at[1] === "bottom")
			D.top += M;
		else if (l.at[1] === "center")
			D.top += M / 2;
		D.left += y[0];
		D.top += y[1];
		return this
				.each(function() {
					var s = a(this), u = s.outerWidth(), B = s.outerHeight(), F = parseInt(a
							.curCSS(this, "marginLeft", true)) || 0, g = parseInt(a
							.curCSS(this, "marginTop", true)) || 0, r = u + F
							+ parseInt(a.curCSS(this, "marginRight", true))
							|| 0, z = B + g
							+ parseInt(a.curCSS(this, "marginBottom", true))
							|| 0, n = a.extend({}, D), G;
					if (l.my[0] === "right")
						n.left -= u;
					else if (l.my[0] === "center")
						n.left -= u / 2;
					if (l.my[1] === "bottom")
						n.top -= B;
					else if (l.my[1] === "center")
						n.top -= B / 2;
					n.left = Math.round(n.left);
					n.top = Math.round(n.top);
					G = {
						left : n.left - F,
						top : n.top - g
					};
					a.each([ "left", "top" ], function(I, N) {
						a.ui.position[v[I]] && a.ui.position[v[I]][N](n, {
							targetWidth : A,
							targetHeight : M,
							elemWidth : u,
							elemHeight : B,
							collisionPosition : G,
							collisionWidth : r,
							collisionHeight : z,
							offset : y,
							my : l.my,
							at : l.at
						})
					});
					a.fn.bgiframe && s.bgiframe();
					s.offset(a.extend(n, {
						using : l.using
					}))
				})
	};
	a.ui.position = {
		fit : {
			left : function(l, m) {
				var p = a(window);
				p = m.collisionPosition.left + m.collisionWidth - p.width()
						- p.scrollLeft();
				l.left = p > 0 ? l.left - p : Math.max(l.left
						- m.collisionPosition.left, l.left)
			},
			top : function(l, m) {
				var p = a(window);
				p = m.collisionPosition.top + m.collisionHeight - p.height()
						- p.scrollTop();
				l.top = p > 0 ? l.top - p : Math.max(l.top
						- m.collisionPosition.top, l.top)
			}
		},
		flip : {
			left : function(l, m) {
				if (m.at[0] !== "center") {
					var p = a(window);
					p = m.collisionPosition.left + m.collisionWidth - p.width()
							- p.scrollLeft();
					var v = m.my[0] === "left" ? -m.elemWidth
							: m.my[0] === "right" ? m.elemWidth : 0, y = m.at[0] === "left" ? m.targetWidth
							: -m.targetWidth, A = -2 * m.offset[0];
					l.left += m.collisionPosition.left < 0 ? v + y + A
							: p > 0 ? v + y + A : 0
				}
			},
			top : function(l, m) {
				if (m.at[1] !== "center") {
					var p = a(window);
					p = m.collisionPosition.top + m.collisionHeight
							- p.height() - p.scrollTop();
					var v = m.my[1] === "top" ? -m.elemHeight
							: m.my[1] === "bottom" ? m.elemHeight : 0, y = m.at[1] === "top" ? m.targetHeight
							: -m.targetHeight, A = -2 * m.offset[1];
					l.top += m.collisionPosition.top < 0 ? v + y + A
							: p > 0 ? v + y + A : 0
				}
			}
		}
	};
	if (!a.offset.setOffset) {
		a.offset.setOffset = function(l, m) {
			if (/static/.test(a.curCSS(l, "position")))
				l.style.position = "relative";
			var p = a(l), v = p.offset(), y = parseInt(
					a.curCSS(l, "top", true), 10) || 0, A = parseInt(a.curCSS(
					l, "left", true), 10) || 0;
			v = {
				top : m.top - v.top + y,
				left : m.left - v.left + A
			};
			"using" in m ? m.using.call(l, v) : p.css(v)
		};
		a.fn.offset = function(l) {
			var m = this[0];
			if (!m || !m.ownerDocument)
				return null;
			if (l)
				return this.each(function() {
					a.offset.setOffset(this, l)
				});
			return f.call(this)
		}
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.sortable",
					a.ui.mouse,
					{
						widgetEventPrefix : "sort",
						options : {
							appendTo : "parent",
							axis : false,
							connectWith : false,
							containment : false,
							cursor : "auto",
							cursorAt : false,
							dropOnEmpty : true,
							forcePlaceholderSize : false,
							forceHelperSize : false,
							grid : false,
							handle : false,
							helper : "original",
							items : "> *",
							opacity : false,
							placeholder : false,
							revert : false,
							scroll : true,
							scrollSensitivity : 20,
							scrollSpeed : 20,
							scope : "default",
							tolerance : "intersect",
							zIndex : 1E3
						},
						_create : function() {
							this.containerCache = {};
							this.element.addClass("ui-sortable");
							this.refresh();
							this.floating = this.items.length ? /left|right/
									.test(this.items[0].item.css("float"))
									: false;
							this.offset = this.element.offset();
							this._mouseInit()
						},
						destroy : function() {
							this.element.removeClass(
									"ui-sortable ui-sortable-disabled")
									.removeData("sortable").unbind(".sortable");
							this._mouseDestroy();
							for ( var b = this.items.length - 1; b >= 0; b--)
								this.items[b].item.removeData("sortable-item");
							return this
						},
						_setOption : function(b, d) {
							if (b === "disabled") {
								this.options[b] = d;
								this.widget()[d ? "addClass" : "removeClass"]
										("ui-sortable-disabled")
							} else
								a.Widget.prototype._setOption.apply(this,
										arguments)
						},
						_mouseCapture : function(b, d) {
							if (this.reverting)
								return false;
							if (this.options.disabled
									|| this.options.type == "static")
								return false;
							this._refreshItems(b);
							var e = null, f = this;
							a(b.target).parents().each(function() {
								if (a.data(this, "sortable-item") == f) {
									e = a(this);
									return false
								}
							});
							if (a.data(b.target, "sortable-item") == f)
								e = a(b.target);
							if (!e)
								return false;
							if (this.options.handle && !d) {
								var l = false;
								a(this.options.handle, e).find("*").andSelf()
										.each(function() {
											if (this == b.target)
												l = true
										});
								if (!l)
									return false
							}
							this.currentItem = e;
							this._removeCurrentsFromItems();
							return true
						},
						_mouseStart : function(b, d, e) {
							d = this.options;
							var f = this;
							this.currentContainer = this;
							this.refreshPositions();
							this.helper = this._createHelper(b);
							this._cacheHelperProportions();
							this._cacheMargins();
							this.scrollParent = this.helper.scrollParent();
							this.offset = this.currentItem.offset();
							this.offset = {
								top : this.offset.top - this.margins.top,
								left : this.offset.left - this.margins.left
							};
							this.helper.css("position", "absolute");
							this.cssPosition = this.helper.css("position");
							a.extend(this.offset, {
								click : {
									left : b.pageX - this.offset.left,
									top : b.pageY - this.offset.top
								},
								parent : this._getParentOffset(),
								relative : this._getRelativeOffset()
							});
							this.originalPosition = this._generatePosition(b);
							this.originalPageX = b.pageX;
							this.originalPageY = b.pageY;
							d.cursorAt
									&& this._adjustOffsetFromHelper(d.cursorAt);
							this.domPosition = {
								prev : this.currentItem.prev()[0],
								parent : this.currentItem.parent()[0]
							};
							this.helper[0] != this.currentItem[0]
									&& this.currentItem.hide();
							this._createPlaceholder();
							d.containment && this._setContainment();
							if (d.cursor) {
								if (a("body").css("cursor"))
									this._storedCursor = a("body")
											.css("cursor");
								a("body").css("cursor", d.cursor)
							}
							if (d.opacity) {
								if (this.helper.css("opacity"))
									this._storedOpacity = this.helper
											.css("opacity");
								this.helper.css("opacity", d.opacity)
							}
							if (d.zIndex) {
								if (this.helper.css("zIndex"))
									this._storedZIndex = this.helper
											.css("zIndex");
								this.helper.css("zIndex", d.zIndex)
							}
							if (this.scrollParent[0] != document
									&& this.scrollParent[0].tagName != "HTML")
								this.overflowOffset = this.scrollParent
										.offset();
							this._trigger("start", b, this._uiHash());
							this._preserveHelperProportions
									|| this._cacheHelperProportions();
							if (!e)
								for (e = this.containers.length - 1; e >= 0; e--)
									this.containers[e]._trigger("activate", b,
											f._uiHash(this));
							if (a.ui.ddmanager)
								a.ui.ddmanager.current = this;
							a.ui.ddmanager && !d.dropBehaviour
									&& a.ui.ddmanager.prepareOffsets(this, b);
							this.dragging = true;
							this.helper.addClass("ui-sortable-helper");
							this._mouseDrag(b);
							return true
						},
						_mouseDrag : function(b) {
							this.position = this._generatePosition(b);
							this.positionAbs = this
									._convertPositionTo("absolute");
							if (!this.lastPositionAbs)
								this.lastPositionAbs = this.positionAbs;
							if (this.options.scroll) {
								var d = this.options, e = false;
								if (this.scrollParent[0] != document
										&& this.scrollParent[0].tagName != "HTML") {
									if (this.overflowOffset.top
											+ this.scrollParent[0].offsetHeight
											- b.pageY < d.scrollSensitivity)
										this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop
												+ d.scrollSpeed;
									else if (b.pageY - this.overflowOffset.top < d.scrollSensitivity)
										this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop
												- d.scrollSpeed;
									if (this.overflowOffset.left
											+ this.scrollParent[0].offsetWidth
											- b.pageX < d.scrollSensitivity)
										this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft
												+ d.scrollSpeed;
									else if (b.pageX - this.overflowOffset.left < d.scrollSensitivity)
										this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft
												- d.scrollSpeed
								} else {
									if (b.pageY - a(document).scrollTop() < d.scrollSensitivity)
										e = a(document).scrollTop(
												a(document).scrollTop()
														- d.scrollSpeed);
									else if (a(window).height()
											- (b.pageY - a(document)
													.scrollTop()) < d.scrollSensitivity)
										e = a(document).scrollTop(
												a(document).scrollTop()
														+ d.scrollSpeed);
									if (b.pageX - a(document).scrollLeft() < d.scrollSensitivity)
										e = a(document).scrollLeft(
												a(document).scrollLeft()
														- d.scrollSpeed);
									else if (a(window).width()
											- (b.pageX - a(document)
													.scrollLeft()) < d.scrollSensitivity)
										e = a(document).scrollLeft(
												a(document).scrollLeft()
														+ d.scrollSpeed)
								}
								e !== false
										&& a.ui.ddmanager
										&& !d.dropBehaviour
										&& a.ui.ddmanager.prepareOffsets(this,
												b)
							}
							this.positionAbs = this
									._convertPositionTo("absolute");
							if (!this.options.axis || this.options.axis != "y")
								this.helper[0].style.left = this.position.left
										+ "px";
							if (!this.options.axis || this.options.axis != "x")
								this.helper[0].style.top = this.position.top
										+ "px";
							for (d = this.items.length - 1; d >= 0; d--) {
								e = this.items[d];
								var f = e.item[0], l = this
										._intersectsWithPointer(e);
								if (l)
									if (f != this.currentItem[0]
											&& this.placeholder[l == 1 ? "next"
													: "prev"]()[0] != f
											&& !a.ui.contains(
													this.placeholder[0], f)
											&& (this.options.type == "semi-dynamic" ? !a.ui
													.contains(this.element[0],
															f)
													: true)) {
										this.direction = l == 1 ? "down" : "up";
										if (this.options.tolerance == "pointer"
												|| this._intersectsWithSides(e))
											this._rearrange(b, e);
										else
											break;
										this._trigger("change", b, this
												._uiHash());
										break
									}
							}
							this._contactContainers(b);
							a.ui.ddmanager && a.ui.ddmanager.drag(this, b);
							this._trigger("sort", b, this._uiHash());
							this.lastPositionAbs = this.positionAbs;
							return false
						},
						_mouseStop : function(b, d) {
							if (b) {
								a.ui.ddmanager && !this.options.dropBehaviour
										&& a.ui.ddmanager.drop(this, b);
								if (this.options.revert) {
									var e = this;
									d = e.placeholder.offset();
									e.reverting = true;
									a(this.helper)
											.animate(
													{
														left : d.left
																- this.offset.parent.left
																- e.margins.left
																+ (this.offsetParent[0] == document.body ? 0
																		: this.offsetParent[0].scrollLeft),
														top : d.top
																- this.offset.parent.top
																- e.margins.top
																+ (this.offsetParent[0] == document.body ? 0
																		: this.offsetParent[0].scrollTop)
													},
													parseInt(
															this.options.revert,
															10) || 500,
													function() {
														e._clear(b)
													})
								} else
									this._clear(b, d);
								return false
							}
						},
						cancel : function() {
							var b = this;
							if (this.dragging) {
								this._mouseUp();
								this.options.helper == "original" ? this.currentItem
										.css(this._storedCSS).removeClass(
												"ui-sortable-helper")
										: this.currentItem.show();
								for ( var d = this.containers.length - 1; d >= 0; d--) {
									this.containers[d]._trigger("deactivate",
											null, b._uiHash(this));
									if (this.containers[d].containerCache.over) {
										this.containers[d]._trigger("out",
												null, b._uiHash(this));
										this.containers[d].containerCache.over = 0
									}
								}
							}
							this.placeholder[0].parentNode
									&& this.placeholder[0].parentNode
											.removeChild(this.placeholder[0]);
							this.options.helper != "original" && this.helper
									&& this.helper[0].parentNode
									&& this.helper.remove();
							a.extend(this, {
								helper : null,
								dragging : false,
								reverting : false,
								_noFinalSort : null
							});
							this.domPosition.prev ? a(this.domPosition.prev)
									.after(this.currentItem) : a(
									this.domPosition.parent).prepend(
									this.currentItem);
							return this
						},
						serialize : function(b) {
							var d = this._getItemsAsjQuery(b && b.connected), e = [];
							b = b || {};
							a(d)
									.each(
											function() {
												var f = (a(b.item || this)
														.attr(
																b.attribute
																		|| "id") || "")
														.match(b.expression || /(.+)[-=_](.+)/);
												if (f)
													e
															.push((b.key || f[1]
																	+ "[]")
																	+ "="
																	+ (b.key
																			&& b.expression ? f[1]
																			: f[2]))
											});
							!e.length && b.key && e.push(b.key + "=");
							return e.join("&")
						},
						toArray : function(b) {
							var d = this._getItemsAsjQuery(b && b.connected), e = [];
							b = b || {};
							d.each(function() {
								e.push(a(b.item || this).attr(
										b.attribute || "id")
										|| "")
							});
							return e
						},
						_intersectsWith : function(b) {
							var d = this.positionAbs.left, e = d
									+ this.helperProportions.width, f = this.positionAbs.top, l = f
									+ this.helperProportions.height, m = b.left, p = m
									+ b.width, v = b.top, y = v + b.height, A = this.offset.click.top, M = this.offset.click.left;
							A = f + A > v && f + A < y && d + M > m
									&& d + M < p;
							return this.options.tolerance == "pointer"
									|| this.options.forcePointerForContainers
									|| this.options.tolerance != "pointer"
									&& this.helperProportions[this.floating ? "width"
											: "height"] > b[this.floating ? "width"
											: "height"] ? A
									: m < d + this.helperProportions.width / 2
											&& e - this.helperProportions.width
													/ 2 < p
											&& v < f
													+ this.helperProportions.height
													/ 2
											&& l
													- this.helperProportions.height
													/ 2 < y
						},
						_intersectsWithPointer : function(b) {
							var d = a.ui.isOverAxis(this.positionAbs.top
									+ this.offset.click.top, b.top, b.height);
							b = a.ui.isOverAxis(this.positionAbs.left
									+ this.offset.click.left, b.left, b.width);
							d = d && b;
							b = this._getDragVerticalDirection();
							var e = this._getDragHorizontalDirection();
							if (!d)
								return false;
							return this.floating ? e && e == "right"
									|| b == "down" ? 2 : 1 : b
									&& (b == "down" ? 2 : 1)
						},
						_intersectsWithSides : function(b) {
							var d = a.ui.isOverAxis(this.positionAbs.top
									+ this.offset.click.top, b.top + b.height
									/ 2, b.height);
							b = a.ui.isOverAxis(this.positionAbs.left
									+ this.offset.click.left, b.left + b.width
									/ 2, b.width);
							var e = this._getDragVerticalDirection(), f = this
									._getDragHorizontalDirection();
							return this.floating && f ? f == "right" && b
									|| f == "left" && !b : e
									&& (e == "down" && d || e == "up" && !d)
						},
						_getDragVerticalDirection : function() {
							var b = this.positionAbs.top
									- this.lastPositionAbs.top;
							return b != 0 && (b > 0 ? "down" : "up")
						},
						_getDragHorizontalDirection : function() {
							var b = this.positionAbs.left
									- this.lastPositionAbs.left;
							return b != 0 && (b > 0 ? "right" : "left")
						},
						refresh : function(b) {
							this._refreshItems(b);
							this.refreshPositions();
							return this
						},
						_connectWith : function() {
							var b = this.options;
							return b.connectWith.constructor == String ? [ b.connectWith ]
									: b.connectWith
						},
						_getItemsAsjQuery : function(b) {
							var d = [], e = [], f = this._connectWith();
							if (f && b)
								for (b = f.length - 1; b >= 0; b--)
									for ( var l = a(f[b]), m = l.length - 1; m >= 0; m--) {
										var p = a.data(l[m], "sortable");
										if (p && p != this
												&& !p.options.disabled)
											e
													.push([
															a
																	.isFunction(p.options.items) ? p.options.items
																	.call(p.element)
																	: a(
																			p.options.items,
																			p.element)
																			.not(
																					".ui-sortable-helper")
																			.not(
																					".ui-sortable-placeholder"),
															p ])
									}
							e
									.push([
											a.isFunction(this.options.items) ? this.options.items
													.call(this.element, null, {
														options : this.options,
														item : this.currentItem
													})
													: a(this.options.items,
															this.element)
															.not(
																	".ui-sortable-helper")
															.not(
																	".ui-sortable-placeholder"),
											this ]);
							for (b = e.length - 1; b >= 0; b--)
								e[b][0].each(function() {
									d.push(this)
								});
							return a(d)
						},
						_removeCurrentsFromItems : function() {
							for ( var b = this.currentItem
									.find(":data(sortable-item)"), d = 0; d < this.items.length; d++)
								for ( var e = 0; e < b.length; e++)
									b[e] == this.items[d].item[0]
											&& this.items.splice(d, 1)
						},
						_refreshItems : function(b) {
							this.items = [];
							this.containers = [ this ];
							var d = this.items, e = [ [
									a.isFunction(this.options.items) ? this.options.items
											.call(this.element[0], b, {
												item : this.currentItem
											})
											: a(this.options.items,
													this.element), this ] ], f = this
									._connectWith();
							if (f)
								for ( var l = f.length - 1; l >= 0; l--)
									for ( var m = a(f[l]), p = m.length - 1; p >= 0; p--) {
										var v = a.data(m[p], "sortable");
										if (v && v != this
												&& !v.options.disabled) {
											e
													.push([
															a
																	.isFunction(v.options.items) ? v.options.items
																	.call(
																			v.element[0],
																			b,
																			{
																				item : this.currentItem
																			})
																	: a(
																			v.options.items,
																			v.element),
															v ]);
											this.containers.push(v)
										}
									}
							for (l = e.length - 1; l >= 0; l--) {
								b = e[l][1];
								f = e[l][0];
								p = 0;
								for (m = f.length; p < m; p++) {
									v = a(f[p]);
									v.data("sortable-item", b);
									d.push({
										item : v,
										instance : b,
										width : 0,
										height : 0,
										left : 0,
										top : 0
									})
								}
							}
						},
						refreshPositions : function(b) {
							if (this.offsetParent && this.helper)
								this.offset.parent = this._getParentOffset();
							for ( var d = this.items.length - 1; d >= 0; d--) {
								var e = this.items[d], f = this.options.toleranceElement ? a(
										this.options.toleranceElement, e.item)
										: e.item;
								if (!b) {
									e.width = f.outerWidth();
									e.height = f.outerHeight()
								}
								f = f.offset();
								e.left = f.left;
								e.top = f.top
							}
							if (this.options.custom
									&& this.options.custom.refreshContainers)
								this.options.custom.refreshContainers
										.call(this);
							else
								for (d = this.containers.length - 1; d >= 0; d--) {
									f = this.containers[d].element.offset();
									this.containers[d].containerCache.left = f.left;
									this.containers[d].containerCache.top = f.top;
									this.containers[d].containerCache.width = this.containers[d].element
											.outerWidth();
									this.containers[d].containerCache.height = this.containers[d].element
											.outerHeight()
								}
							return this
						},
						_createPlaceholder : function(b) {
							var d = b || this, e = d.options;
							if (!e.placeholder
									|| e.placeholder.constructor == String) {
								var f = e.placeholder;
								e.placeholder = {
									element : function() {
										var l = a(
												document
														.createElement(d.currentItem[0].nodeName))
												.addClass(
														f
																|| d.currentItem[0].className
																+ " ui-sortable-placeholder")
												.removeClass(
														"ui-sortable-helper")[0];
										if (!f)
											l.style.visibility = "hidden";
										return l
									},
									update : function(l, m) {
										if (!(f && !e.forcePlaceholderSize)) {
											m.height()
													|| m
															.height(d.currentItem
																	.innerHeight()
																	- parseInt(
																			d.currentItem
																					.css("paddingTop") || 0,
																			10)
																	- parseInt(
																			d.currentItem
																					.css("paddingBottom") || 0,
																			10));
											m.width()
													|| m
															.width(d.currentItem
																	.innerWidth()
																	- parseInt(
																			d.currentItem
																					.css("paddingLeft") || 0,
																			10)
																	- parseInt(
																			d.currentItem
																					.css("paddingRight") || 0,
																			10))
										}
									}
								}
							}
							d.placeholder = a(e.placeholder.element.call(
									d.element, d.currentItem));
							d.currentItem.after(d.placeholder);
							e.placeholder.update(d, d.placeholder)
						},
						_contactContainers : function(b) {
							for ( var d = null, e = null, f = this.containers.length - 1; f >= 0; f--)
								if (!a.ui.contains(this.currentItem[0],
										this.containers[f].element[0]))
									if (this
											._intersectsWith(this.containers[f].containerCache)) {
										if (!(d && a.ui.contains(
												this.containers[f].element[0],
												d.element[0]))) {
											d = this.containers[f];
											e = f
										}
									} else if (this.containers[f].containerCache.over) {
										this.containers[f]._trigger("out", b,
												this._uiHash(this));
										this.containers[f].containerCache.over = 0
									}
							if (d)
								if (this.containers.length === 1) {
									this.containers[e]._trigger("over", b, this
											._uiHash(this));
									this.containers[e].containerCache.over = 1
								} else if (this.currentContainer != this.containers[e]) {
									d = 1E4;
									f = null;
									for ( var l = this.positionAbs[this.containers[e].floating ? "left"
											: "top"], m = this.items.length - 1; m >= 0; m--)
										if (a.ui.contains(
												this.containers[e].element[0],
												this.items[m].item[0])) {
											var p = this.items[m][this.containers[e].floating ? "left"
													: "top"];
											if (Math.abs(p - l) < d) {
												d = Math.abs(p - l);
												f = this.items[m]
											}
										}
									if (f || this.options.dropOnEmpty) {
										this.currentContainer = this.containers[e];
										f ? this._rearrange(b, f, null, true)
												: this
														._rearrange(
																b,
																null,
																this.containers[e].element,
																true);
										this._trigger("change", b, this
												._uiHash());
										this.containers[e]._trigger("change",
												b, this._uiHash(this));
										this.options.placeholder.update(
												this.currentContainer,
												this.placeholder);
										this.containers[e]._trigger("over", b,
												this._uiHash(this));
										this.containers[e].containerCache.over = 1
									}
								}
						},
						_createHelper : function(b) {
							var d = this.options;
							b = a.isFunction(d.helper) ? a(d.helper.apply(
									this.element[0], [ b, this.currentItem ]))
									: d.helper == "clone" ? this.currentItem
											.clone() : this.currentItem;
							b.parents("body").length
									|| a(d.appendTo != "parent" ? d.appendTo
											: this.currentItem[0].parentNode)[0]
											.appendChild(b[0]);
							if (b[0] == this.currentItem[0])
								this._storedCSS = {
									width : this.currentItem[0].style.width,
									height : this.currentItem[0].style.height,
									position : this.currentItem.css("position"),
									top : this.currentItem.css("top"),
									left : this.currentItem.css("left")
								};
							if (b[0].style.width == "" || d.forceHelperSize)
								b.width(this.currentItem.width());
							if (b[0].style.height == "" || d.forceHelperSize)
								b.height(this.currentItem.height());
							return b
						},
						_adjustOffsetFromHelper : function(b) {
							if (typeof b == "string")
								b = b.split(" ");
							if (a.isArray(b))
								b = {
									left : +b[0],
									top : +b[1] || 0
								};
							if ("left" in b)
								this.offset.click.left = b.left
										+ this.margins.left;
							if ("right" in b)
								this.offset.click.left = this.helperProportions.width
										- b.right + this.margins.left;
							if ("top" in b)
								this.offset.click.top = b.top
										+ this.margins.top;
							if ("bottom" in b)
								this.offset.click.top = this.helperProportions.height
										- b.bottom + this.margins.top
						},
						_getParentOffset : function() {
							this.offsetParent = this.helper.offsetParent();
							var b = this.offsetParent.offset();
							if (this.cssPosition == "absolute"
									&& this.scrollParent[0] != document
									&& a.ui.contains(this.scrollParent[0],
											this.offsetParent[0])) {
								b.left += this.scrollParent.scrollLeft();
								b.top += this.scrollParent.scrollTop()
							}
							if (this.offsetParent[0] == document.body
									|| this.offsetParent[0].tagName
									&& this.offsetParent[0].tagName
											.toLowerCase() == "html"
									&& a.browser.msie)
								b = {
									top : 0,
									left : 0
								};
							return {
								top : b.top
										+ (parseInt(this.offsetParent
												.css("borderTopWidth"), 10) || 0),
								left : b.left
										+ (parseInt(this.offsetParent
												.css("borderLeftWidth"), 10) || 0)
							}
						},
						_getRelativeOffset : function() {
							if (this.cssPosition == "relative") {
								var b = this.currentItem.position();
								return {
									top : b.top
											- (parseInt(this.helper.css("top"),
													10) || 0)
											+ this.scrollParent.scrollTop(),
									left : b.left
											- (parseInt(
													this.helper.css("left"), 10) || 0)
											+ this.scrollParent.scrollLeft()
								}
							} else
								return {
									top : 0,
									left : 0
								}
						},
						_cacheMargins : function() {
							this.margins = {
								left : parseInt(this.currentItem
										.css("marginLeft"), 10) || 0,
								top : parseInt(this.currentItem
										.css("marginTop"), 10) || 0
							}
						},
						_cacheHelperProportions : function() {
							this.helperProportions = {
								width : this.helper.outerWidth(),
								height : this.helper.outerHeight()
							}
						},
						_setContainment : function() {
							var b = this.options;
							if (b.containment == "parent")
								b.containment = this.helper[0].parentNode;
							if (b.containment == "document"
									|| b.containment == "window")
								this.containment = [
										0 - this.offset.relative.left
												- this.offset.parent.left,
										0 - this.offset.relative.top
												- this.offset.parent.top,
										a(
												b.containment == "document" ? document
														: window).width()
												- this.helperProportions.width
												- this.margins.left,
										(a(
												b.containment == "document" ? document
														: window).height() || document.body.parentNode.scrollHeight)
												- this.helperProportions.height
												- this.margins.top ];
							if (!/^(document|window|parent)$/
									.test(b.containment)) {
								var d = a(b.containment)[0];
								b = a(b.containment).offset();
								var e = a(d).css("overflow") != "hidden";
								this.containment = [
										b.left
												+ (parseInt(a(d).css(
														"borderLeftWidth"), 10) || 0)
												+ (parseInt(a(d).css(
														"paddingLeft"), 10) || 0)
												- this.margins.left,
										b.top
												+ (parseInt(a(d).css(
														"borderTopWidth"), 10) || 0)
												+ (parseInt(a(d).css(
														"paddingTop"), 10) || 0)
												- this.margins.top,
										b.left
												+ (e ? Math.max(d.scrollWidth,
														d.offsetWidth)
														: d.offsetWidth)
												- (parseInt(a(d).css(
														"borderLeftWidth"), 10) || 0)
												- (parseInt(a(d).css(
														"paddingRight"), 10) || 0)
												- this.helperProportions.width
												- this.margins.left,
										b.top
												+ (e ? Math.max(d.scrollHeight,
														d.offsetHeight)
														: d.offsetHeight)
												- (parseInt(a(d).css(
														"borderTopWidth"), 10) || 0)
												- (parseInt(a(d).css(
														"paddingBottom"), 10) || 0)
												- this.helperProportions.height
												- this.margins.top ]
							}
						},
						_convertPositionTo : function(b, d) {
							if (!d)
								d = this.position;
							b = b == "absolute" ? 1 : -1;
							var e = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, f = /(html|body)/i
									.test(e[0].tagName);
							return {
								top : d.top
										+ this.offset.relative.top
										* b
										+ this.offset.parent.top
										* b
										- (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: (this.cssPosition == "fixed" ? -this.scrollParent
														.scrollTop()
														: f ? 0 : e.scrollTop())
														* b),
								left : d.left
										+ this.offset.relative.left
										* b
										+ this.offset.parent.left
										* b
										- (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: (this.cssPosition == "fixed" ? -this.scrollParent
														.scrollLeft()
														: f ? 0 : e
																.scrollLeft())
														* b)
							}
						},
						_generatePosition : function(b) {
							var d = this.options, e = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, f = /(html|body)/i
									.test(e[0].tagName);
							if (this.cssPosition == "relative"
									&& !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0]))
								this.offset.relative = this
										._getRelativeOffset();
							var l = b.pageX, m = b.pageY;
							if (this.originalPosition) {
								if (this.containment) {
									if (b.pageX - this.offset.click.left < this.containment[0])
										l = this.containment[0]
												+ this.offset.click.left;
									if (b.pageY - this.offset.click.top < this.containment[1])
										m = this.containment[1]
												+ this.offset.click.top;
									if (b.pageX - this.offset.click.left > this.containment[2])
										l = this.containment[2]
												+ this.offset.click.left;
									if (b.pageY - this.offset.click.top > this.containment[3])
										m = this.containment[3]
												+ this.offset.click.top
								}
								if (d.grid) {
									m = this.originalPageY
											+ Math
													.round((m - this.originalPageY)
															/ d.grid[1])
											* d.grid[1];
									m = this.containment ? !(m
											- this.offset.click.top < this.containment[1] || m
											- this.offset.click.top > this.containment[3]) ? m
											: !(m - this.offset.click.top < this.containment[1]) ? m
													- d.grid[1]
													: m + d.grid[1]
											: m;
									l = this.originalPageX
											+ Math
													.round((l - this.originalPageX)
															/ d.grid[0])
											* d.grid[0];
									l = this.containment ? !(l
											- this.offset.click.left < this.containment[0] || l
											- this.offset.click.left > this.containment[2]) ? l
											: !(l - this.offset.click.left < this.containment[0]) ? l
													- d.grid[0]
													: l + d.grid[0]
											: l
								}
							}
							return {
								top : m
										- this.offset.click.top
										- this.offset.relative.top
										- this.offset.parent.top
										+ (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: this.cssPosition == "fixed" ? -this.scrollParent
														.scrollTop()
														: f ? 0 : e.scrollTop()),
								left : l
										- this.offset.click.left
										- this.offset.relative.left
										- this.offset.parent.left
										+ (a.browser.safari
												&& this.cssPosition == "fixed" ? 0
												: this.cssPosition == "fixed" ? -this.scrollParent
														.scrollLeft()
														: f ? 0 : e
																.scrollLeft())
							}
						},
						_rearrange : function(b, d, e, f) {
							e ? e[0].appendChild(this.placeholder[0])
									: d.item[0].parentNode
											.insertBefore(
													this.placeholder[0],
													this.direction == "down" ? d.item[0]
															: d.item[0].nextSibling);
							this.counter = this.counter ? ++this.counter : 1;
							var l = this, m = this.counter;
							window.setTimeout(function() {
								m == l.counter && l.refreshPositions(!f)
							}, 0)
						},
						_clear : function(b, d) {
							this.reverting = false;
							var e = [];
							!this._noFinalSort
									&& this.currentItem[0].parentNode
									&& this.placeholder
											.before(this.currentItem);
							this._noFinalSort = null;
							if (this.helper[0] == this.currentItem[0]) {
								for ( var f in this._storedCSS)
									if (this._storedCSS[f] == "auto"
											|| this._storedCSS[f] == "static")
										this._storedCSS[f] = "";
								this.currentItem.css(this._storedCSS)
										.removeClass("ui-sortable-helper")
							} else
								this.currentItem.show();
							this.fromOutside
									&& !d
									&& e.push(function(l) {
										this._trigger("receive", l, this
												._uiHash(this.fromOutside))
									});
							if ((this.fromOutside
									|| this.domPosition.prev != this.currentItem
											.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem
									.parent()[0])
									&& !d)
								e.push(function(l) {
									this._trigger("update", l, this._uiHash())
								});
							if (!a.ui.contains(this.element[0],
									this.currentItem[0])) {
								d || e.push(function(l) {
									this._trigger("remove", l, this._uiHash())
								});
								for (f = this.containers.length - 1; f >= 0; f--)
									if (a.ui.contains(
											this.containers[f].element[0],
											this.currentItem[0])
											&& !d) {
										e.push(function(l) {
											return function(m) {
												l._trigger("receive", m, this
														._uiHash(this))
											}
										}.call(this, this.containers[f]));
										e.push(function(l) {
											return function(m) {
												l._trigger("update", m, this
														._uiHash(this))
											}
										}.call(this, this.containers[f]))
									}
							}
							for (f = this.containers.length - 1; f >= 0; f--) {
								d
										|| e.push(function(l) {
											return function(m) {
												l._trigger("deactivate", m,
														this._uiHash(this))
											}
										}.call(this, this.containers[f]));
								if (this.containers[f].containerCache.over) {
									e.push(function(l) {
										return function(m) {
											l._trigger("out", m, this
													._uiHash(this))
										}
									}.call(this, this.containers[f]));
									this.containers[f].containerCache.over = 0
								}
							}
							this._storedCursor
									&& a("body").css("cursor",
											this._storedCursor);
							this._storedOpacity
									&& this.helper.css("opacity",
											this._storedOpacity);
							if (this._storedZIndex)
								this.helper.css("zIndex",
										this._storedZIndex == "auto" ? ""
												: this._storedZIndex);
							this.dragging = false;
							if (this.cancelHelperRemoval) {
								if (!d) {
									this._trigger("beforeStop", b, this
											._uiHash());
									for (f = 0; f < e.length; f++)
										e[f].call(this, b);
									this._trigger("stop", b, this._uiHash())
								}
								return false
							}
							d || this._trigger("beforeStop", b, this._uiHash());
							this.placeholder[0].parentNode
									.removeChild(this.placeholder[0]);
							this.helper[0] != this.currentItem[0]
									&& this.helper.remove();
							this.helper = null;
							if (!d) {
								for (f = 0; f < e.length; f++)
									e[f].call(this, b);
								this._trigger("stop", b, this._uiHash())
							}
							this.fromOutside = false;
							return true
						},
						_trigger : function() {
							a.Widget.prototype._trigger.apply(this, arguments) === false
									&& this.cancel()
						},
						_uiHash : function(b) {
							var d = b || this;
							return {
								helper : d.helper,
								placeholder : d.placeholder || a([]),
								position : d.position,
								originalPosition : d.originalPosition,
								offset : d.positionAbs,
								item : d.currentItem,
								sender : b ? b.element : null
							}
						}
					});
	a.extend(a.ui.sortable, {
		version : "1.8.7"
	})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.autocomplete",
					{
						options : {
							appendTo : "body",
							delay : 300,
							minLength : 1,
							position : {
								my : "left top",
								at : "left bottom",
								collision : "none"
							},
							source : null
						},
						_create : function() {
							var b = this, d = this.element[0].ownerDocument, e;
							this.element
									.addClass("ui-autocomplete-input")
									.attr("autocomplete", "off")
									.attr({
										role : "textbox",
										"aria-autocomplete" : "list",
										"aria-haspopup" : "true"
									})
									.bind(
											"keydown.autocomplete",
											function(f) {
												if (!(b.options.disabled || b.element
														.attr("readonly"))) {
													e = false;
													var l = a.ui.keyCode;
													switch (f.keyCode) {
													case l.PAGE_UP:
														b._move("previousPage",
																f);
														break;
													case l.PAGE_DOWN:
														b._move("nextPage", f);
														break;
													case l.UP:
														b._move("previous", f);
														f.preventDefault();
														break;
													case l.DOWN:
														b._move("next", f);
														f.preventDefault();
														break;
													case l.ENTER:
													case l.NUMPAD_ENTER:
														if (b.menu.active) {
															e = true;
															f.preventDefault()
														}
													case l.TAB:
														if (!b.menu.active)
															return;
														b.menu.select(f);
														break;
													case l.ESCAPE:
														b.element.val(b.term);
														b.close(f);
														break;
													default:
														clearTimeout(b.searching);
														b.searching = setTimeout(
																function() {
																	if (b.term != b.element
																			.val()) {
																		b.selectedItem = null;
																		b
																				.search(
																						null,
																						f)
																	}
																},
																b.options.delay);
														break
													}
												}
											}).bind("keypress.autocomplete",
											function(f) {
												if (e) {
													e = false;
													f.preventDefault()
												}
											}).bind(
											"focus.autocomplete",
											function() {
												if (!b.options.disabled) {
													b.selectedItem = null;
													b.previous = b.element
															.val()
												}
											}).bind(
											"blur.autocomplete",
											function(f) {
												if (!b.options.disabled) {
													clearTimeout(b.searching);
													b.closing = setTimeout(
															function() {
																b.close(f);
																b._change(f)
															}, 150)
												}
											});
							this._initSource();
							this.response = function() {
								return b._response.apply(b, arguments)
							};
							this.menu = a("<ul></ul>")
									.addClass("ui-autocomplete")
									.appendTo(
											a(this.options.appendTo || "body",
													d)[0])
									.mousedown(
											function(f) {
												var l = b.menu.element[0];
												a(f.target).closest(
														".ui-menu-item").length
														|| setTimeout(
																function() {
																	a(document)
																			.one(
																					"mousedown",
																					function(
																							m) {
																						m.target !== b.element[0]
																								&& m.target !== l
																								&& !a.ui
																										.contains(
																												l,
																												m.target)
																								&& b
																										.close()
																					})
																}, 1);
												setTimeout(function() {
													clearTimeout(b.closing)
												}, 13)
											})
									.menu(
											{
												focus : function(f, l) {
													l = l.item
															.data("item.autocomplete");
													false !== b._trigger(
															"focus", f, {
																item : l
															})
															&& /^key/
																	.test(f.originalEvent.type)
															&& b.element
																	.val(l.value)
												},
												selected : function(f, l) {
													var m = l.item
															.data("item.autocomplete"), p = b.previous;
													if (b.element[0] !== d.activeElement) {
														b.element.focus();
														b.previous = p;
														setTimeout(function() {
															b.previous = p;
															b.selectedItem = m
														}, 1)
													}
													false !== b._trigger(
															"select", f, {
																item : m
															})
															&& b.element
																	.val(m.value);
													b.term = b.element.val();
													b.close(f);
													b.selectedItem = m
												},
												blur : function() {
													b.menu.element
															.is(":visible")
															&& b.element.val() !== b.term
															&& b.element
																	.val(b.term)
												}
											})
									.zIndex(this.element.zIndex() + 1).css({
										top : 0,
										left : 0
									}).hide().data("menu");
							a.fn.bgiframe && this.menu.element.bgiframe()
						},
						destroy : function() {
							this.element.removeClass("ui-autocomplete-input")
									.removeAttr("autocomplete").removeAttr(
											"role").removeAttr(
											"aria-autocomplete").removeAttr(
											"aria-haspopup");
							this.menu.element.remove();
							a.Widget.prototype.destroy.call(this)
						},
						_setOption : function(b, d) {
							a.Widget.prototype._setOption
									.apply(this, arguments);
							b === "source" && this._initSource();
							if (b === "appendTo")
								this.menu.element.appendTo(a(d || "body",
										this.element[0].ownerDocument)[0])
						},
						_initSource : function() {
							var b = this, d, e;
							if (a.isArray(this.options.source)) {
								d = this.options.source;
								this.source = function(f, l) {
									l(a.ui.autocomplete.filter(d, f.term))
								}
							} else if (typeof this.options.source === "string") {
								e = this.options.source;
								this.source = function(f, l) {
									b.xhr && b.xhr.abort();
									b.xhr = a.ajax({
										url : e,
										data : f,
										dataType : "json",
										success : function(m, p, v) {
											v === b.xhr && l(m);
											b.xhr = null
										},
										error : function(m) {
											m === b.xhr && l([]);
											b.xhr = null
										}
									})
								}
							} else
								this.source = this.options.source
						},
						search : function(b, d) {
							b = b != null ? b : this.element.val();
							this.term = this.element.val();
							if (b.length < this.options.minLength)
								return this.close(d);
							clearTimeout(this.closing);
							if (this._trigger("search", d) !== false)
								return this._search(b)
						},
						_search : function(b) {
							this.element.addClass("ui-autocomplete-loading");
							this.source({
								term : b
							}, this.response)
						},
						_response : function(b) {
							if (b && b.length) {
								b = this._normalize(b);
								this._suggest(b);
								this._trigger("open")
							} else
								this.close();
							this.element.removeClass("ui-autocomplete-loading")
						},
						close : function(b) {
							clearTimeout(this.closing);
							if (this.menu.element.is(":visible")) {
								this.menu.element.hide();
								this.menu.deactivate();
								this._trigger("close", b)
							}
						},
						_change : function(b) {
							this.previous !== this.element.val()
									&& this._trigger("change", b, {
										item : this.selectedItem
									})
						},
						_normalize : function(b) {
							if (b.length && b[0].label && b[0].value)
								return b;
							return a.map(b, function(d) {
								if (typeof d === "string")
									return {
										label : d,
										value : d
									};
								return a.extend({
									label : d.label || d.value,
									value : d.value || d.label
								}, d)
							})
						},
						_suggest : function(b) {
							var d = this.menu.element.empty().zIndex(
									this.element.zIndex() + 1);
							this._renderMenu(d, b);
							this.menu.deactivate();
							this.menu.refresh();
							d.show();
							this._resizeMenu();
							d.position(a.extend({
								of : this.element
							}, this.options.position))
						},
						_resizeMenu : function() {
							var b = this.menu.element;
							b.outerWidth(Math.max(b.width("").outerWidth(),
									this.element.outerWidth()))
						},
						_renderMenu : function(b, d) {
							var e = this;
							a.each(d, function(f, l) {
								e._renderItem(b, l)
							})
						},
						_renderItem : function(b, d) {
							return a("<li></li>").data("item.autocomplete", d)
									.append(a("<a></a>").text(d.label))
									.appendTo(b)
						},
						_move : function(b, d) {
							if (this.menu.element.is(":visible"))
								if (this.menu.first() && /^previous/.test(b)
										|| this.menu.last() && /^next/.test(b)) {
									this.element.val(this.term);
									this.menu.deactivate()
								} else
									this.menu[b](d);
							else
								this.search(null, d)
						},
						widget : function() {
							return this.menu.element
						}
					});
	a.extend(a.ui.autocomplete, {
		escapeRegex : function(b) {
			return b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
		},
		filter : function(b, d) {
			var e = new RegExp(a.ui.autocomplete.escapeRegex(d), "i");
			return a.grep(b, function(f) {
				return e.test(f.label || f.value || f)
			})
		}
	})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.menu",
					{
						_create : function() {
							var b = this;
							this.element
									.addClass(
											"ui-menu ui-widget ui-widget-content ui-corner-all")
									.attr(
											{
												role : "listbox",
												"aria-activedescendant" : "ui-active-menuitem"
											})
									.click(
											function(d) {
												if (a(d.target).closest(
														".ui-menu-item a").length) {
													d.preventDefault();
													b.select(d)
												}
											});
							this.refresh()
						},
						refresh : function() {
							var b = this;
							this.element.children(
									"li:not(.ui-menu-item):has(a)").addClass(
									"ui-menu-item").attr("role", "menuitem")
									.children("a").addClass("ui-corner-all")
									.attr("tabindex", -1).mouseenter(
											function(d) {
												b.activate(d, a(this).parent())
											}).mouseleave(function() {
										b.deactivate()
									})
						},
						activate : function(b, d) {
							this.deactivate();
							if (this.hasScroll()) {
								var e = d.offset().top
										- this.element.offset().top, f = this.element
										.attr("scrollTop"), l = this.element
										.height();
								if (e < 0)
									this.element.attr("scrollTop", f + e);
								else
									e >= l
											&& this.element.attr("scrollTop", f
													+ e - l + d.height())
							}
							this.active = d.eq(0).children("a").addClass(
									"ui-state-hover").attr("id",
									"ui-active-menuitem").end();
							this._trigger("focus", b, {
								item : d
							})
						},
						deactivate : function() {
							if (this.active) {
								this.active.children("a").removeClass(
										"ui-state-hover").removeAttr("id");
								this._trigger("blur");
								this.active = null
							}
						},
						next : function(b) {
							this.move("next", ".ui-menu-item:first", b)
						},
						previous : function(b) {
							this.move("prev", ".ui-menu-item:last", b)
						},
						first : function() {
							return this.active
									&& !this.active.prevAll(".ui-menu-item").length
						},
						last : function() {
							return this.active
									&& !this.active.nextAll(".ui-menu-item").length
						},
						move : function(b, d, e) {
							if (this.active) {
								b = this.active[b + "All"](".ui-menu-item").eq(
										0);
								b.length ? this.activate(e, b) : this.activate(
										e, this.element.children(d))
							} else
								this.activate(e, this.element.children(d))
						},
						nextPage : function(b) {
							if (this.hasScroll())
								if (!this.active || this.last())
									this.activate(b, this.element
											.children(".ui-menu-item:first"));
								else {
									var d = this.active.offset().top, e = this.element
											.height(), f = this.element
											.children(".ui-menu-item")
											.filter(
													function() {
														var l = a(this)
																.offset().top
																- d
																- e
																+ a(this)
																		.height();
														return l < 10
																&& l > -10
													});
									f.length
											|| (f = this.element
													.children(".ui-menu-item:last"));
									this.activate(b, f)
								}
							else
								this.activate(b, this.element.children(
										".ui-menu-item").filter(
										!this.active || this.last() ? ":first"
												: ":last"))
						},
						previousPage : function(b) {
							if (this.hasScroll())
								if (!this.active || this.first())
									this.activate(b, this.element
											.children(".ui-menu-item:last"));
								else {
									var d = this.active.offset().top, e = this.element
											.height();
									result = this.element.children(
											".ui-menu-item").filter(
											function() {
												var f = a(this).offset().top
														- d + e
														- a(this).height();
												return f < 10 && f > -10
											});
									result.length
											|| (result = this.element
													.children(".ui-menu-item:first"));
									this.activate(b, result)
								}
							else
								this.activate(b, this.element.children(
										".ui-menu-item").filter(
										!this.active || this.first() ? ":last"
												: ":first"))
						},
						hasScroll : function() {
							return this.element.height() < this.element
									.attr("scrollHeight")
						},
						select : function(b) {
							this._trigger("selected", b, {
								item : this.active
							})
						}
					})
})(jQuery);
(function(a) {
	var b, d = function(f) {
		a(":ui-button", f.target.form).each(function() {
			var l = a(this).data("button");
			setTimeout(function() {
				l.refresh()
			}, 1)
		})
	}, e = function(f) {
		var l = f.name, m = f.form, p = a([]);
		if (l)
			p = m ? a(m).find("[name='" + l + "']") : a("[name='" + l + "']",
					f.ownerDocument).filter(function() {
				return !this.form
			});
		return p
	};
	a
			.widget(
					"ui.button",
					{
						options : {
							disabled : null,
							text : true,
							label : null,
							icons : {
								primary : null,
								secondary : null
							}
						},
						_create : function() {
							this.element.closest("form").unbind("reset.button")
									.bind("reset.button", d);
							if (typeof this.options.disabled !== "boolean")
								this.options.disabled = this.element
										.attr("disabled");
							this._determineButtonType();
							this.hasTitle = !!this.buttonElement.attr("title");
							var f = this, l = this.options, m = this.type === "checkbox"
									|| this.type === "radio", p = "ui-state-hover"
									+ (!m ? " ui-state-active" : "");
							if (l.label === null)
								l.label = this.buttonElement.html();
							if (this.element.is(":disabled"))
								l.disabled = true;
							this.buttonElement
									.addClass(
											"ui-button ui-widget ui-state-default ui-corner-all")
									.attr("role", "button")
									.bind(
											"mouseenter.button",
											function() {
												if (!l.disabled) {
													a(this).addClass(
															"ui-state-hover");
													this === b
															&& a(this)
																	.addClass(
																			"ui-state-active")
												}
											}).bind(
											"mouseleave.button",
											function() {
												l.disabled
														|| a(this).removeClass(
																p)
											}).bind("focus.button", function() {
										a(this).addClass("ui-state-focus")
									}).bind("blur.button", function() {
										a(this).removeClass("ui-state-focus")
									});
							m && this.element.bind("change.button", function() {
								f.refresh()
							});
							if (this.type === "checkbox")
								this.buttonElement.bind("click.button",
										function() {
											if (l.disabled)
												return false;
											a(this).toggleClass(
													"ui-state-active");
											f.buttonElement.attr(
													"aria-pressed",
													f.element[0].checked)
										});
							else if (this.type === "radio")
								this.buttonElement
										.bind(
												"click.button",
												function() {
													if (l.disabled)
														return false;
													a(this).addClass(
															"ui-state-active");
													f.buttonElement.attr(
															"aria-pressed",
															true);
													var v = f.element[0];
													e(v)
															.not(v)
															.map(
																	function() {
																		return a(
																				this)
																				.button(
																						"widget")[0]
																	})
															.removeClass(
																	"ui-state-active")
															.attr(
																	"aria-pressed",
																	false)
												});
							else {
								this.buttonElement
										.bind(
												"mousedown.button",
												function() {
													if (l.disabled)
														return false;
													a(this).addClass(
															"ui-state-active");
													b = this;
													a(document).one("mouseup",
															function() {
																b = null
															})
												})
										.bind(
												"mouseup.button",
												function() {
													if (l.disabled)
														return false;
													a(this).removeClass(
															"ui-state-active")
												})
										.bind(
												"keydown.button",
												function(v) {
													if (l.disabled)
														return false;
													if (v.keyCode == a.ui.keyCode.SPACE
															|| v.keyCode == a.ui.keyCode.ENTER)
														a(this)
																.addClass(
																		"ui-state-active")
												}).bind(
												"keyup.button",
												function() {
													a(this).removeClass(
															"ui-state-active")
												});
								this.buttonElement.is("a")
										&& this.buttonElement
												.keyup(function(v) {
													v.keyCode === a.ui.keyCode.SPACE
															&& a(this).click()
												})
							}
							this._setOption("disabled", l.disabled)
						},
						_determineButtonType : function() {
							this.type = this.element.is(":checkbox") ? "checkbox"
									: this.element.is(":radio") ? "radio"
											: this.element.is("input") ? "input"
													: "button";
							if (this.type === "checkbox"
									|| this.type === "radio") {
								this.buttonElement = this.element.parents()
										.last().find(
												"label[for="
														+ this.element
																.attr("id")
														+ "]");
								this.element
										.addClass("ui-helper-hidden-accessible");
								var f = this.element.is(":checked");
								f
										&& this.buttonElement
												.addClass("ui-state-active");
								this.buttonElement.attr("aria-pressed", f)
							} else
								this.buttonElement = this.element
						},
						widget : function() {
							return this.buttonElement
						},
						destroy : function() {
							this.element
									.removeClass("ui-helper-hidden-accessible");
							this.buttonElement
									.removeClass(
											"ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only")
									.removeAttr("role").removeAttr(
											"aria-pressed").html(
											this.buttonElement.find(
													".ui-button-text").html());
							this.hasTitle
									|| this.buttonElement.removeAttr("title");
							a.Widget.prototype.destroy.call(this)
						},
						_setOption : function(f, l) {
							a.Widget.prototype._setOption
									.apply(this, arguments);
							if (f === "disabled")
								l ? this.element.attr("disabled", true)
										: this.element.removeAttr("disabled");
							this._resetButton()
						},
						refresh : function() {
							var f = this.element.is(":disabled");
							f !== this.options.disabled
									&& this._setOption("disabled", f);
							if (this.type === "radio")
								e(this.element[0])
										.each(
												function() {
													a(this).is(":checked") ? a(
															this)
															.button("widget")
															.addClass(
																	"ui-state-active")
															.attr(
																	"aria-pressed",
																	true)
															: a(this)
																	.button(
																			"widget")
																	.removeClass(
																			"ui-state-active")
																	.attr(
																			"aria-pressed",
																			false)
												});
							else if (this.type === "checkbox")
								this.element.is(":checked") ? this.buttonElement
										.addClass("ui-state-active").attr(
												"aria-pressed", true)
										: this.buttonElement.removeClass(
												"ui-state-active").attr(
												"aria-pressed", false)
						},
						_resetButton : function() {
							if (this.type === "input")
								this.options.label
										&& this.element.val(this.options.label);
							else {
								var f = this.buttonElement
										.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"), l = a(
										"<span></span>").addClass(
										"ui-button-text").html(
										this.options.label).appendTo(f.empty())
										.text(), m = this.options.icons, p = m.primary
										&& m.secondary;
								if (m.primary || m.secondary) {
									f.addClass("ui-button-text-icon"
											+ (p ? "s" : m.primary ? "-primary"
													: "-secondary"));
									m.primary
											&& f
													.prepend("<span class='ui-button-icon-primary ui-icon "
															+ m.primary
															+ "'></span>");
									m.secondary
											&& f
													.append("<span class='ui-button-icon-secondary ui-icon "
															+ m.secondary
															+ "'></span>");
									if (!this.options.text) {
										f
												.addClass(
														p ? "ui-button-icons-only"
																: "ui-button-icon-only")
												.removeClass(
														"ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
										this.hasTitle || f.attr("title", l)
									}
								} else
									f.addClass("ui-button-text-only")
							}
						}
					});
	a
			.widget(
					"ui.buttonset",
					{
						options : {
							items : ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
						},
						_create : function() {
							this.element.addClass("ui-buttonset")
						},
						_init : function() {
							this.refresh()
						},
						_setOption : function(f, l) {
							f === "disabled"
									&& this.buttons.button("option", f, l);
							a.Widget.prototype._setOption
									.apply(this, arguments)
						},
						refresh : function() {
							this.buttons = this.element
									.find(this.options.items)
									.filter(":ui-button")
									.button("refresh")
									.end()
									.not(":ui-button")
									.button()
									.end()
									.map(function() {
										return a(this).button("widget")[0]
									})
									.removeClass(
											"ui-corner-all ui-corner-left ui-corner-right")
									.filter(":first")
									.addClass("ui-corner-left").end().filter(
											":last")
									.addClass("ui-corner-right").end().end()
						},
						destroy : function() {
							this.element.removeClass("ui-buttonset");
							this.buttons.map(function() {
								return a(this).button("widget")[0]
							}).removeClass("ui-corner-left ui-corner-right")
									.end().button("destroy");
							a.Widget.prototype.destroy.call(this)
						}
					})
})(jQuery);
(function(a, b) {
	var d = {
		buttons : true,
		height : true,
		maxHeight : true,
		maxWidth : true,
		minHeight : true,
		minWidth : true,
		width : true
	}, e = {
		maxHeight : true,
		maxWidth : true,
		minHeight : true,
		minWidth : true
	};
	a
			.widget(
					"ui.dialog",
					{
						options : {
							autoOpen : true,
							buttons : {},
							closeOnEscape : true,
							closeText : "close",
							dialogClass : "",
							draggable : true,
							hide : null,
							height : "auto",
							maxHeight : false,
							maxWidth : false,
							minHeight : 150,
							minWidth : 150,
							modal : false,
							position : {
								my : "center",
								at : "center",
								collision : "fit",
								using : function(f) {
									var l = a(this).css(f).offset().top;
									l < 0 && a(this).css("top", f.top - l)
								}
							},
							resizable : true,
							show : null,
							stack : true,
							title : "",
							width : 300,
							zIndex : 1E3
						},
						_create : function() {
							this.originalTitle = this.element.attr("title");
							if (typeof this.originalTitle !== "string")
								this.originalTitle = "";
							this.options.title = this.options.title
									|| this.originalTitle;
							var f = this, l = f.options, m = l.title
									|| "&#160;", p = a.ui.dialog
									.getTitleId(f.element), v = (f.uiDialog = a("<div></div>"))
									.appendTo(document.body)
									.hide()
									.addClass(
											"ui-dialog ui-widget ui-widget-content ui-corner-all "
													+ l.dialogClass)
									.css({
										zIndex : l.zIndex
									})
									.attr("tabIndex", -1)
									.css("outline", 0)
									.keydown(
											function(M) {
												if (l.closeOnEscape
														&& M.keyCode
														&& M.keyCode === a.ui.keyCode.ESCAPE) {
													f.close(M);
													M.preventDefault()
												}
											}).attr({
										role : "dialog",
										"aria-labelledby" : p
									}).mousedown(function(M) {
										f.moveToTop(false, M)
									});
							f.element.show().removeAttr("title").addClass(
									"ui-dialog-content ui-widget-content")
									.appendTo(v);
							var y = (f.uiDialogTitlebar = a("<div></div>"))
									.addClass(
											"ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")
									.prependTo(v), A = a('<a href="#"></a>')
									.addClass(
											"ui-dialog-titlebar-close ui-corner-all")
									.attr("role", "button").hover(function() {
										A.addClass("ui-state-hover")
									}, function() {
										A.removeClass("ui-state-hover")
									}).focus(function() {
										A.addClass("ui-state-focus")
									}).blur(function() {
										A.removeClass("ui-state-focus")
									}).click(function(M) {
										f.close(M);
										return false
									}).appendTo(y);
							(f.uiDialogTitlebarCloseText = a("<span></span>"))
									.addClass("ui-icon ui-icon-closethick")
									.text(l.closeText).appendTo(A);
							a("<span></span>").addClass("ui-dialog-title")
									.attr("id", p).html(m).prependTo(y);
							if (a.isFunction(l.beforeclose)
									&& !a.isFunction(l.beforeClose))
								l.beforeClose = l.beforeclose;
							y.find("*").add(y).disableSelection();
							l.draggable && a.fn.draggable && f._makeDraggable();
							l.resizable && a.fn.resizable && f._makeResizable();
							f._createButtons(l.buttons);
							f._isOpen = false;
							a.fn.bgiframe && v.bgiframe()
						},
						_init : function() {
							this.options.autoOpen && this.open()
						},
						destroy : function() {
							var f = this;
							f.overlay && f.overlay.destroy();
							f.uiDialog.hide();
							f.element
									.unbind(".dialog")
									.removeData("dialog")
									.removeClass(
											"ui-dialog-content ui-widget-content")
									.hide().appendTo("body");
							f.uiDialog.remove();
							f.originalTitle
									&& f.element.attr("title", f.originalTitle);
							return f
						},
						widget : function() {
							return this.uiDialog
						},
						close : function(f) {
							var l = this, m, p;
							if (false !== l._trigger("beforeClose", f)) {
								l.overlay && l.overlay.destroy();
								l.uiDialog.unbind("keypress.ui-dialog");
								l._isOpen = false;
								if (l.options.hide)
									l.uiDialog.hide(l.options.hide, function() {
										l._trigger("close", f)
									});
								else {
									l.uiDialog.hide();
									l._trigger("close", f)
								}
								a.ui.dialog.overlay.resize();
								if (l.options.modal) {
									m = 0;
									a(".ui-dialog").each(function() {
										if (this !== l.uiDialog[0]) {
											p = a(this).css("z-index");
											isNaN(p) || (m = Math.max(m, p))
										}
									});
									a.ui.dialog.maxZ = m
								}
								return l
							}
						},
						isOpen : function() {
							return this._isOpen
						},
						moveToTop : function(f, l) {
							var m = this, p = m.options;
							if (p.modal && !f || !p.stack && !p.modal)
								return m._trigger("focus", l);
							if (p.zIndex > a.ui.dialog.maxZ)
								a.ui.dialog.maxZ = p.zIndex;
							if (m.overlay) {
								a.ui.dialog.maxZ += 1;
								m.overlay.$el
										.css(
												"z-index",
												a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)
							}
							f = {
								scrollTop : m.element.attr("scrollTop"),
								scrollLeft : m.element.attr("scrollLeft")
							};
							a.ui.dialog.maxZ += 1;
							m.uiDialog.css("z-index", a.ui.dialog.maxZ);
							m.element.attr(f);
							m._trigger("focus", l);
							return m
						},
						open : function() {
							if (!this._isOpen) {
								var f = this, l = f.options, m = f.uiDialog;
								f.overlay = l.modal ? new a.ui.dialog.overlay(f)
										: null;
								f._size();
								f._position(l.position);
								m.show(l.show);
								f.moveToTop(true);
								l.modal
										&& m
												.bind(
														"keypress.ui-dialog",
														function(p) {
															if (p.keyCode === a.ui.keyCode.TAB) {
																var v = a(
																		":tabbable",
																		this), y = v
																		.filter(":first");
																v = v
																		.filter(":last");
																if (p.target === v[0]
																		&& !p.shiftKey) {
																	y.focus(1);
																	return false
																} else if (p.target === y[0]
																		&& p.shiftKey) {
																	v.focus(1);
																	return false
																}
															}
														});
								a(
										f.element
												.find(":tabbable")
												.get()
												.concat(
														m
																.find(
																		".ui-dialog-buttonpane :tabbable")
																.get()
																.concat(m.get())))
										.eq(0).focus();
								f._isOpen = true;
								f._trigger("open");
								return f
							}
						},
						_createButtons : function(f) {
							var l = this, m = false, p = a("<div></div>")
									.addClass(
											"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), v = a(
									"<div></div>").addClass(
									"ui-dialog-buttonset").appendTo(p);
							l.uiDialog.find(".ui-dialog-buttonpane").remove();
							typeof f === "object" && f !== null
									&& a.each(f, function() {
										return !(m = true)
									});
							if (m) {
								a.each(f, function(y, A) {
									A = a.isFunction(A) ? {
										click : A,
										text : y
									} : A;
									y = a('<button type="button"></button>')
											.attr(A, true).unbind("click")
											.click(
													function() {
														A.click.apply(
																l.element[0],
																arguments)
													}).appendTo(v);
									a.fn.button && y.button()
								});
								p.appendTo(l.uiDialog)
							}
						},
						_makeDraggable : function() {
							function f(y) {
								return {
									position : y.position,
									offset : y.offset
								}
							}
							var l = this, m = l.options, p = a(document), v;
							l.uiDialog
									.draggable({
										cancel : ".ui-dialog-content, .ui-dialog-titlebar-close",
										handle : ".ui-dialog-titlebar",
										containment : "document",
										start : function(y, A) {
											v = m.height === "auto" ? "auto"
													: a(this).height();
											a(this)
													.height(a(this).height())
													.addClass(
															"ui-dialog-dragging");
											l._trigger("dragStart", y, f(A))
										},
										drag : function(y, A) {
											l._trigger("drag", y, f(A))
										},
										stop : function(y, A) {
											m.position = [
													A.position.left
															- p.scrollLeft(),
													A.position.top
															- p.scrollTop() ];
											a(this).removeClass(
													"ui-dialog-dragging")
													.height(v);
											l._trigger("dragStop", y, f(A));
											a.ui.dialog.overlay.resize()
										}
									})
						},
						_makeResizable : function(f) {
							function l(y) {
								return {
									originalPosition : y.originalPosition,
									originalSize : y.originalSize,
									position : y.position,
									size : y.size
								}
							}
							f = f === b ? this.options.resizable : f;
							var m = this, p = m.options, v = m.uiDialog
									.css("position");
							f = typeof f === "string" ? f
									: "n,e,s,w,se,sw,ne,nw";
							m.uiDialog.resizable({
								cancel : ".ui-dialog-content",
								containment : "document",
								alsoResize : m.element,
								maxWidth : p.maxWidth,
								maxHeight : p.maxHeight,
								minWidth : p.minWidth,
								minHeight : m._minHeight(),
								handles : f,
								start : function(y, A) {
									a(this).addClass("ui-dialog-resizing");
									m._trigger("resizeStart", y, l(A))
								},
								resize : function(y, A) {
									m._trigger("resize", y, l(A))
								},
								stop : function(y, A) {
									a(this).removeClass("ui-dialog-resizing");
									p.height = a(this).height();
									p.width = a(this).width();
									m._trigger("resizeStop", y, l(A));
									a.ui.dialog.overlay.resize()
								}
							}).css("position", v).find(".ui-resizable-se")
									.addClass(
											"ui-icon ui-icon-grip-diagonal-se")
						},
						_minHeight : function() {
							var f = this.options;
							return f.height === "auto" ? f.minHeight : Math
									.min(f.minHeight, f.height)
						},
						_position : function(f) {
							var l = [], m = [ 0, 0 ], p;
							if (f) {
								if (typeof f === "string"
										|| typeof f === "object" && "0" in f) {
									l = f.split ? f.split(" ") : [ f[0], f[1] ];
									if (l.length === 1)
										l[1] = l[0];
									a.each([ "left", "top" ], function(v, y) {
										if (+l[v] === l[v]) {
											m[v] = l[v];
											l[v] = y
										}
									});
									f = {
										my : l.join(" "),
										at : l.join(" "),
										offset : m.join(" ")
									}
								}
								f = a.extend({},
										a.ui.dialog.prototype.options.position,
										f)
							} else
								f = a.ui.dialog.prototype.options.position;
							(p = this.uiDialog.is(":visible"))
									|| this.uiDialog.show();
							this.uiDialog.css({
								top : 0,
								left : 0
							}).position(a.extend({
								of : window
							}, f));
							p || this.uiDialog.hide()
						},
						_setOptions : function(f) {
							var l = this, m = {}, p = false;
							a.each(f, function(v, y) {
								l._setOption(v, y);
								if (v in d)
									p = true;
								if (v in e)
									m[v] = y
							});
							p && this._size();
							this.uiDialog.is(":data(resizable)")
									&& this.uiDialog.resizable("option", m)
						},
						_setOption : function(f, l) {
							var m = this, p = m.uiDialog;
							switch (f) {
							case "beforeclose":
								f = "beforeClose";
								break;
							case "buttons":
								m._createButtons(l);
								break;
							case "closeText":
								m.uiDialogTitlebarCloseText.text("" + l);
								break;
							case "dialogClass":
								p.removeClass(m.options.dialogClass).addClass(
										"ui-dialog ui-widget ui-widget-content ui-corner-all "
												+ l);
								break;
							case "disabled":
								l ? p.addClass("ui-dialog-disabled") : p
										.removeClass("ui-dialog-disabled");
								break;
							case "draggable":
								var v = p.is(":data(draggable)");
								v && !l && p.draggable("destroy");
								!v && l && m._makeDraggable();
								break;
							case "position":
								m._position(l);
								break;
							case "resizable":
								(v = p.is(":data(resizable)")) && !l
										&& p.resizable("destroy");
								v && typeof l === "string"
										&& p.resizable("option", "handles", l);
								!v && l !== false && m._makeResizable(l);
								break;
							case "title":
								a(".ui-dialog-title", m.uiDialogTitlebar).html(
										"" + (l || "&#160;"));
								break
							}
							a.Widget.prototype._setOption.apply(m, arguments)
						},
						_size : function() {
							var f = this.options, l, m, p = this.uiDialog
									.is(":visible");
							this.element.show().css({
								width : "auto",
								minHeight : 0,
								height : 0
							});
							if (f.minWidth > f.width)
								f.width = f.minWidth;
							l = this.uiDialog.css({
								height : "auto",
								width : f.width
							}).height();
							m = Math.max(0, f.minHeight - l);
							if (f.height === "auto")
								if (a.support.minHeight)
									this.element.css({
										minHeight : m,
										height : "auto"
									});
								else {
									this.uiDialog.show();
									f = this.element.css("height", "auto")
											.height();
									p || this.uiDialog.hide();
									this.element.height(Math.max(f, m))
								}
							else
								this.element.height(Math.max(f.height - l, 0));
							this.uiDialog.is(":data(resizable)")
									&& this.uiDialog.resizable("option",
											"minHeight", this._minHeight())
						}
					});
	a.extend(a.ui.dialog, {
		version : "1.8.7",
		uuid : 0,
		maxZ : 0,
		getTitleId : function(f) {
			f = f.attr("id");
			if (!f) {
				this.uuid += 1;
				f = this.uuid
			}
			return "ui-dialog-title-" + f
		},
		overlay : function(f) {
			this.$el = a.ui.dialog.overlay.create(f)
		}
	});
	a
			.extend(
					a.ui.dialog.overlay,
					{
						instances : [],
						oldInstances : [],
						maxZ : 0,
						events : a.map(
								"focus,mousedown,mouseup,keydown,keypress,click"
										.split(","), function(f) {
									return f + ".dialog-overlay"
								}).join(" "),
						create : function(f) {
							if (this.instances.length === 0) {
								setTimeout(
										function() {
											a.ui.dialog.overlay.instances.length
													&& a(document)
															.bind(
																	a.ui.dialog.overlay.events,
																	function(m) {
																		if (a(
																				m.target)
																				.zIndex() < a.ui.dialog.overlay.maxZ)
																			return false
																	})
										}, 1);
								a(document)
										.bind(
												"keydown.dialog-overlay",
												function(m) {
													if (f.options.closeOnEscape
															&& m.keyCode
															&& m.keyCode === a.ui.keyCode.ESCAPE) {
														f.close(m);
														m.preventDefault()
													}
												});
								a(window).bind("resize.dialog-overlay",
										a.ui.dialog.overlay.resize)
							}
							var l = (this.oldInstances.pop() || a("<div></div>")
									.addClass("ui-widget-overlay")).appendTo(
									document.body).css({
								width : this.width(),
								height : this.height()
							});
							a.fn.bgiframe && l.bgiframe();
							this.instances.push(l);
							return l
						},
						destroy : function(f) {
							var l = a.inArray(f, this.instances);
							l != -1
									&& this.oldInstances.push(this.instances
											.splice(l, 1)[0]);
							this.instances.length === 0
									&& a([ document, window ]).unbind(
											".dialog-overlay");
							f.remove();
							var m = 0;
							a.each(this.instances, function() {
								m = Math.max(m, this.css("z-index"))
							});
							this.maxZ = m
						},
						height : function() {
							var f, l;
							if (a.browser.msie && a.browser.version < 7) {
								f = Math.max(
										document.documentElement.scrollHeight,
										document.body.scrollHeight);
								l = Math.max(
										document.documentElement.offsetHeight,
										document.body.offsetHeight);
								return f < l ? a(window).height() + "px" : f
										+ "px"
							} else
								return a(document).height() + "px"
						},
						width : function() {
							var f, l;
							if (a.browser.msie && a.browser.version < 7) {
								f = Math.max(
										document.documentElement.scrollWidth,
										document.body.scrollWidth);
								l = Math.max(
										document.documentElement.offsetWidth,
										document.body.offsetWidth);
								return f < l ? a(window).width() + "px" : f
										+ "px"
							} else
								return a(document).width() + "px"
						},
						resize : function() {
							var f = a([]);
							a.each(a.ui.dialog.overlay.instances, function() {
								f = f.add(this)
							});
							f.css({
								width : 0,
								height : 0
							}).css({
								width : a.ui.dialog.overlay.width(),
								height : a.ui.dialog.overlay.height()
							})
						}
					});
	a.extend(a.ui.dialog.overlay.prototype, {
		destroy : function() {
			a.ui.dialog.overlay.destroy(this.$el)
		}
	})
})(jQuery);
(function(a, b) {
	function d() {
		return ++f
	}
	function e() {
		return ++l
	}
	var f = 0, l = 0;
	a
			.widget(
					"ui.tabs",
					{
						options : {
							add : null,
							ajaxOptions : null,
							cache : false,
							cookie : null,
							collapsible : false,
							disable : null,
							disabled : [],
							enable : null,
							event : "click",
							fx : null,
							idPrefix : "ui-tabs-",
							load : null,
							panelTemplate : "<div></div>",
							remove : null,
							select : null,
							show : null,
							spinner : "<em>Loading&#8230;</em>",
							tabTemplate : "<li><a href='#{href}'><span>#{label}</span></a></li>"
						},
						_create : function() {
							this._tabify(true)
						},
						_setOption : function(m, p) {
							if (m == "selected")
								this.options.collapsible
										&& p == this.options.selected
										|| this.select(p);
							else {
								this.options[m] = p;
								this._tabify()
							}
						},
						_tabId : function(m) {
							return m.title
									&& m.title.replace(/\s/g, "_").replace(
											/[^\w\u00c0-\uFFFF-]/g, "")
									|| this.options.idPrefix + d()
						},
						_sanitizeSelector : function(m) {
							return m.replace(/:/g, "\\:")
						},
						_cookie : function() {
							var m = this.cookie
									|| (this.cookie = this.options.cookie.name
											|| "ui-tabs-" + e());
							return a.cookie.apply(null, [ m ].concat(a
									.makeArray(arguments)))
						},
						_ui : function(m, p) {
							return {
								tab : m,
								panel : p,
								index : this.anchors.index(m)
							}
						},
						_cleanup : function() {
							this.lis.filter(".ui-state-processing")
									.removeClass("ui-state-processing").find(
											"span:data(label.tabs)").each(
											function() {
												var m = a(this);
												m.html(m.data("label.tabs"))
														.removeData(
																"label.tabs")
											})
						},
						_tabify : function(m) {
							function p(r, z) {
								r.css("display", "");
								!a.support.opacity && z.opacity
										&& r[0].style.removeAttribute("filter")
							}
							var v = this, y = this.options, A = /^#.+/;
							this.list = this.element.find("ol,ul").eq(0);
							this.lis = a(" > li:has(a[href])", this.list);
							this.anchors = this.lis.map(function() {
								return a("a", this)[0]
							});
							this.panels = a([]);
							this.anchors
									.each(function(r, z) {
										var n = a(z).attr("href"), G = n
												.split("#")[0], I;
										if (G
												&& (G === location.toString()
														.split("#")[0] || (I = a("base")[0])
														&& G === I.href)) {
											n = z.hash;
											z.href = n
										}
										if (A.test(n))
											v.panels = v.panels
													.add(v.element
															.find(v
																	._sanitizeSelector(n)));
										else if (n && n !== "#") {
											a.data(z, "href.tabs", n);
											a.data(z, "load.tabs", n.replace(
													/#.*$/, ""));
											n = v._tabId(z);
											z.href = "#" + n;
											z = v.element.find("#" + n);
											if (!z.length) {
												z = a(y.panelTemplate)
														.attr("id", n)
														.addClass(
																"ui-tabs-panel ui-widget-content ui-corner-bottom")
														.insertAfter(
																v.panels[r - 1]
																		|| v.list);
												z.data("destroy.tabs", true)
											}
											v.panels = v.panels.add(z)
										} else
											y.disabled.push(r)
									});
							if (m) {
								this.element
										.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
								this.list
										.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
								this.lis
										.addClass("ui-state-default ui-corner-top");
								this.panels
										.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
								if (y.selected === b) {
									location.hash
											&& this.anchors
													.each(function(r, z) {
														if (z.hash == location.hash) {
															y.selected = r;
															return false
														}
													});
									if (typeof y.selected !== "number"
											&& y.cookie)
										y.selected = parseInt(v._cookie(), 10);
									if (typeof y.selected !== "number"
											&& this.lis
													.filter(".ui-tabs-selected").length)
										y.selected = this.lis.index(this.lis
												.filter(".ui-tabs-selected"));
									y.selected = y.selected
											|| (this.lis.length ? 0 : -1)
								} else if (y.selected === null)
									y.selected = -1;
								y.selected = y.selected >= 0
										&& this.anchors[y.selected]
										|| y.selected < 0 ? y.selected : 0;
								y.disabled = a.unique(
										y.disabled.concat(a.map(this.lis
												.filter(".ui-state-disabled"),
												function(r) {
													return v.lis.index(r)
												}))).sort();
								a.inArray(y.selected, y.disabled) != -1
										&& y.disabled.splice(a.inArray(
												y.selected, y.disabled), 1);
								this.panels.addClass("ui-tabs-hide");
								this.lis
										.removeClass("ui-tabs-selected ui-state-active");
								if (y.selected >= 0 && this.anchors.length) {
									v.element
											.find(
													v
															._sanitizeSelector(v.anchors[y.selected].hash))
											.removeClass("ui-tabs-hide");
									this.lis.eq(y.selected).addClass(
											"ui-tabs-selected ui-state-active");
									v.element
											.queue(
													"tabs",
													function() {
														v
																._trigger(
																		"show",
																		null,
																		v
																				._ui(
																						v.anchors[y.selected],
																						v.element
																								.find(v
																										._sanitizeSelector(v.anchors[y.selected].hash))))
													});
									this.load(y.selected)
								}
								a(window).bind("unload", function() {
									v.lis.add(v.anchors).unbind(".tabs");
									v.lis = v.anchors = v.panels = null
								})
							} else
								y.selected = this.lis.index(this.lis
										.filter(".ui-tabs-selected"));
							this.element[y.collapsible ? "addClass"
									: "removeClass"]("ui-tabs-collapsible");
							y.cookie && this._cookie(y.selected, y.cookie);
							m = 0;
							for ( var M; M = this.lis[m]; m++)
								a(M)[a.inArray(m, y.disabled) != -1
										&& !a(M).hasClass("ui-tabs-selected") ? "addClass"
										: "removeClass"]("ui-state-disabled");
							y.cache === false
									&& this.anchors.removeData("cache.tabs");
							this.lis.add(this.anchors).unbind(".tabs");
							if (y.event !== "mouseover") {
								var D = function(r, z) {
									z.is(":not(.ui-state-disabled)")
											&& z.addClass("ui-state-" + r)
								}, s = function(r, z) {
									z.removeClass("ui-state-" + r)
								};
								this.lis.bind("mouseover.tabs", function() {
									D("hover", a(this))
								});
								this.lis.bind("mouseout.tabs", function() {
									s("hover", a(this))
								});
								this.anchors.bind("focus.tabs", function() {
									D("focus", a(this).closest("li"))
								});
								this.anchors.bind("blur.tabs", function() {
									s("focus", a(this).closest("li"))
								})
							}
							var u, B;
							if (y.fx)
								if (a.isArray(y.fx)) {
									u = y.fx[0];
									B = y.fx[1]
								} else
									u = B = y.fx;
							var F = B ? function(r, z) {
								a(r).closest("li").addClass(
										"ui-tabs-selected ui-state-active");
								z.hide().removeClass("ui-tabs-hide").animate(
										B,
										B.duration || "normal",
										function() {
											p(z, B);
											v._trigger("show", null, v._ui(r,
													z[0]))
										})
							} : function(r, z) {
								a(r).closest("li").addClass(
										"ui-tabs-selected ui-state-active");
								z.removeClass("ui-tabs-hide");
								v._trigger("show", null, v._ui(r, z[0]))
							}, g = u ? function(r, z) {
								z
										.animate(
												u,
												u.duration || "normal",
												function() {
													v.lis
															.removeClass("ui-tabs-selected ui-state-active");
													z.addClass("ui-tabs-hide");
													p(z, u);
													v.element.dequeue("tabs")
												})
							}
									: function(r, z) {
										v.lis
												.removeClass("ui-tabs-selected ui-state-active");
										z.addClass("ui-tabs-hide");
										v.element.dequeue("tabs")
									};
							this.anchors
									.bind(
											y.event + ".tabs",
											function() {
												var r = this, z = a(r).closest(
														"li"), n = v.panels
														.filter(":not(.ui-tabs-hide)"), G = v.element
														.find(v
																._sanitizeSelector(r.hash));
												if (z
														.hasClass("ui-tabs-selected")
														&& !y.collapsible
														|| z
																.hasClass("ui-state-disabled")
														|| z
																.hasClass("ui-state-processing")
														|| v.panels
																.filter(":animated").length
														|| v._trigger("select",
																null, v._ui(
																		this,
																		G[0])) === false) {
													this.blur();
													return false
												}
												y.selected = v.anchors
														.index(this);
												v.abort();
												if (y.collapsible)
													if (z
															.hasClass("ui-tabs-selected")) {
														y.selected = -1;
														y.cookie
																&& v
																		._cookie(
																				y.selected,
																				y.cookie);
														v.element.queue("tabs",
																function() {
																	g(r, n)
																}).dequeue(
																"tabs");
														this.blur();
														return false
													} else if (!n.length) {
														y.cookie
																&& v
																		._cookie(
																				y.selected,
																				y.cookie);
														v.element.queue("tabs",
																function() {
																	F(r, G)
																});
														v.load(v.anchors
																.index(this));
														this.blur();
														return false
													}
												y.cookie
														&& v._cookie(
																y.selected,
																y.cookie);
												if (G.length) {
													n.length
															&& v.element.queue(
																	"tabs",
																	function() {
																		g(r, n)
																	});
													v.element.queue("tabs",
															function() {
																F(r, G)
															});
													v.load(v.anchors
															.index(this))
												} else
													throw "jQuery UI Tabs: Mismatching fragment identifier.";
												a.browser.msie && this.blur()
											});
							this.anchors.bind("click.tabs", function() {
								return false
							})
						},
						_getIndex : function(m) {
							if (typeof m == "string")
								m = this.anchors.index(this.anchors
										.filter("[href$=" + m + "]"));
							return m
						},
						destroy : function() {
							var m = this.options;
							this.abort();
							this.element
									.unbind(".tabs")
									.removeClass(
											"ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible")
									.removeData("tabs");
							this.list
									.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
							this.anchors.each(function() {
								var p = a.data(this, "href.tabs");
								if (p)
									this.href = p;
								var v = a(this).unbind(".tabs");
								a.each([ "href", "load", "cache" ], function(y,
										A) {
									v.removeData(A + ".tabs")
								})
							});
							this.lis
									.unbind(".tabs")
									.add(this.panels)
									.each(
											function() {
												a.data(this, "destroy.tabs") ? a(
														this).remove()
														: a(this)
																.removeClass(
																		"ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
											});
							m.cookie && this._cookie(null, m.cookie);
							return this
						},
						add : function(m, p, v) {
							if (v === b)
								v = this.anchors.length;
							var y = this, A = this.options;
							p = a(A.tabTemplate.replace(/#\{href\}/g, m)
									.replace(/#\{label\}/g, p));
							m = !m.indexOf("#") ? m.replace("#", "") : this
									._tabId(a("a", p)[0]);
							p.addClass("ui-state-default ui-corner-top").data(
									"destroy.tabs", true);
							var M = y.element.find("#" + m);
							M.length
									|| (M = a(A.panelTemplate).attr("id", m)
											.data("destroy.tabs", true));
							M
									.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
							if (v >= this.lis.length) {
								p.appendTo(this.list);
								M.appendTo(this.list[0].parentNode)
							} else {
								p.insertBefore(this.lis[v]);
								M.insertBefore(this.panels[v])
							}
							A.disabled = a.map(A.disabled, function(D) {
								return D >= v ? ++D : D
							});
							this._tabify();
							if (this.anchors.length == 1) {
								A.selected = 0;
								p.addClass("ui-tabs-selected ui-state-active");
								M.removeClass("ui-tabs-hide");
								this.element.queue("tabs", function() {
									y._trigger("show", null, y._ui(
											y.anchors[0], y.panels[0]))
								});
								this.load(0)
							}
							this._trigger("add", null, this._ui(
									this.anchors[v], this.panels[v]));
							return this
						},
						remove : function(m) {
							m = this._getIndex(m);
							var p = this.options, v = this.lis.eq(m).remove(), y = this.panels
									.eq(m).remove();
							if (v.hasClass("ui-tabs-selected")
									&& this.anchors.length > 1)
								this
										.select(m
												+ (m + 1 < this.anchors.length ? 1
														: -1));
							p.disabled = a.map(a.grep(p.disabled, function(A) {
								return A != m
							}), function(A) {
								return A >= m ? --A : A
							});
							this._tabify();
							this._trigger("remove", null, this._ui(
									v.find("a")[0], y[0]));
							return this
						},
						enable : function(m) {
							m = this._getIndex(m);
							var p = this.options;
							if (a.inArray(m, p.disabled) != -1) {
								this.lis.eq(m).removeClass("ui-state-disabled");
								p.disabled = a.grep(p.disabled, function(v) {
									return v != m
								});
								this._trigger("enable", null, this._ui(
										this.anchors[m], this.panels[m]));
								return this
							}
						},
						disable : function(m) {
							m = this._getIndex(m);
							var p = this.options;
							if (m != p.selected) {
								this.lis.eq(m).addClass("ui-state-disabled");
								p.disabled.push(m);
								p.disabled.sort();
								this._trigger("disable", null, this._ui(
										this.anchors[m], this.panels[m]))
							}
							return this
						},
						select : function(m) {
							m = this._getIndex(m);
							if (m == -1)
								if (this.options.collapsible
										&& this.options.selected != -1)
									m = this.options.selected;
								else
									return this;
							this.anchors.eq(m).trigger(
									this.options.event + ".tabs");
							return this
						},
						load : function(m) {
							m = this._getIndex(m);
							var p = this, v = this.options, y = this.anchors
									.eq(m)[0], A = a.data(y, "load.tabs");
							this.abort();
							if (!A || this.element.queue("tabs").length !== 0
									&& a.data(y, "cache.tabs"))
								this.element.dequeue("tabs");
							else {
								this.lis.eq(m).addClass("ui-state-processing");
								if (v.spinner) {
									var M = a("span", y);
									M.data("label.tabs", M.html()).html(
											v.spinner)
								}
								this.xhr = a.ajax(a.extend({}, v.ajaxOptions, {
									url : A,
									success : function(D, s) {
										p.element.find(
												p._sanitizeSelector(y.hash))
												.html(D);
										p._cleanup();
										v.cache
												&& a
														.data(y, "cache.tabs",
																true);
										p._trigger("load", null, p._ui(
												p.anchors[m], p.panels[m]));
										try {
											v.ajaxOptions.success(D, s)
										} catch (u) {
										}
									},
									error : function(D, s) {
										p._cleanup();
										p._trigger("load", null, p._ui(
												p.anchors[m], p.panels[m]));
										try {
											v.ajaxOptions.error(D, s, m, y)
										} catch (u) {
										}
									}
								}));
								p.element.dequeue("tabs");
								return this
							}
						},
						abort : function() {
							this.element.queue([]);
							this.panels.stop(false, true);
							this.element.queue("tabs", this.element.queue(
									"tabs").splice(-2, 2));
							if (this.xhr) {
								this.xhr.abort();
								delete this.xhr
							}
							this._cleanup();
							return this
						},
						url : function(m, p) {
							this.anchors.eq(m).removeData("cache.tabs").data(
									"load.tabs", p);
							return this
						},
						length : function() {
							return this.anchors.length
						}
					});
	a.extend(a.ui.tabs, {
		version : "1.8.7"
	});
	a.extend(a.ui.tabs.prototype, {
		rotation : null,
		rotate : function(m, p) {
			var v = this, y = this.options, A = v._rotate
					|| (v._rotate = function(M) {
						clearTimeout(v.rotation);
						v.rotation = setTimeout(function() {
							var D = y.selected;
							v.select(++D < v.anchors.length ? D : 0)
						}, m);
						M && M.stopPropagation()
					});
			p = v._unrotate || (v._unrotate = !p ? function(M) {
				M.clientX && v.rotate(null)
			} : function() {
				t = y.selected;
				A()
			});
			if (m) {
				this.element.bind("tabsshow", A);
				this.anchors.bind(y.event + ".tabs", p);
				A()
			} else {
				clearTimeout(v.rotation);
				this.element.unbind("tabsshow", A);
				this.anchors.unbind(y.event + ".tabs", p);
				delete this._rotate;
				delete this._unrotate
			}
			return this
		}
	})
})(jQuery);
jQuery.effects
		|| function(a, b) {
			function d(D) {
				var s;
				if (D && D.constructor == Array && D.length == 3)
					return D;
				if (s = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/
						.exec(D))
					return [ parseInt(s[1], 10), parseInt(s[2], 10),
							parseInt(s[3], 10) ];
				if (s = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/
						.exec(D))
					return [ parseFloat(s[1]) * 2.55, parseFloat(s[2]) * 2.55,
							parseFloat(s[3]) * 2.55 ];
				if (s = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/
						.exec(D))
					return [ parseInt(s[1], 16), parseInt(s[2], 16),
							parseInt(s[3], 16) ];
				if (s = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(D))
					return [ parseInt(s[1] + s[1], 16),
							parseInt(s[2] + s[2], 16),
							parseInt(s[3] + s[3], 16) ];
				if (/rgba\(0, 0, 0, 0\)/.exec(D))
					return y.transparent;
				return y[a.trim(D).toLowerCase()]
			}
			function e(D, s) {
				var u;
				do {
					u = a.curCSS(D, s);
					if (u != "" && u != "transparent" || a.nodeName(D, "body"))
						break;
					s = "backgroundColor"
				} while (D = D.parentNode);
				return d(u)
			}
			function f() {
				var D = document.defaultView ? document.defaultView
						.getComputedStyle(this, null) : this.currentStyle, s = {}, u, B;
				if (D && D.length && D[0] && D[D[0]])
					for ( var F = D.length; F--;) {
						u = D[F];
						if (typeof D[u] == "string") {
							B = u.replace(/\-(\w)/g, function(g, r) {
								return r.toUpperCase()
							});
							s[B] = D[u]
						}
					}
				else
					for (u in D)
						if (typeof D[u] === "string")
							s[u] = D[u];
				return s
			}
			function l(D) {
				var s, u;
				for (s in D) {
					u = D[s];
					if (u == null || a.isFunction(u) || s in M
							|| /scrollbar/.test(s) || !/color/i.test(s)
							&& isNaN(parseFloat(u)))
						delete D[s]
				}
				return D
			}
			function m(D, s) {
				var u = {
					_ : 0
				}, B;
				for (B in s)
					if (D[B] != s[B])
						u[B] = s[B];
				return u
			}
			function p(D, s, u, B) {
				if (typeof D == "object") {
					B = s;
					u = null;
					s = D;
					D = s.effect
				}
				if (a.isFunction(s)) {
					B = s;
					u = null;
					s = {}
				}
				if (typeof s == "number" || a.fx.speeds[s]) {
					B = u;
					u = s;
					s = {}
				}
				if (a.isFunction(u)) {
					B = u;
					u = null
				}
				s = s || {};
				u = u || s.duration;
				u = a.fx.off ? 0 : typeof u == "number" ? u
						: u in a.fx.speeds ? a.fx.speeds[u]
								: a.fx.speeds._default;
				B = B || s.complete;
				return [ D, s, u, B ]
			}
			function v(D) {
				if (!D || typeof D === "number" || a.fx.speeds[D])
					return true;
				if (typeof D === "string" && !a.effects[D])
					return true;
				return false
			}
			a.effects = {};
			a.each([ "backgroundColor", "borderBottomColor", "borderLeftColor",
					"borderRightColor", "borderTopColor", "borderColor",
					"color", "outlineColor" ], function(D, s) {
				a.fx.step[s] = function(u) {
					if (!u.colorInit) {
						u.start = e(u.elem, s);
						u.end = d(u.end);
						u.colorInit = true
					}
					u.elem.style[s] = "rgb("
							+ Math.max(Math.min(
									parseInt(u.pos * (u.end[0] - u.start[0])
											+ u.start[0], 10), 255), 0)
							+ ","
							+ Math.max(Math.min(
									parseInt(u.pos * (u.end[1] - u.start[1])
											+ u.start[1], 10), 255), 0)
							+ ","
							+ Math.max(Math.min(
									parseInt(u.pos * (u.end[2] - u.start[2])
											+ u.start[2], 10), 255), 0) + ")"
				}
			});
			var y = {
				aqua : [ 0, 255, 255 ],
				azure : [ 240, 255, 255 ],
				beige : [ 245, 245, 220 ],
				black : [ 0, 0, 0 ],
				blue : [ 0, 0, 255 ],
				brown : [ 165, 42, 42 ],
				cyan : [ 0, 255, 255 ],
				darkblue : [ 0, 0, 139 ],
				darkcyan : [ 0, 139, 139 ],
				darkgrey : [ 169, 169, 169 ],
				darkgreen : [ 0, 100, 0 ],
				darkkhaki : [ 189, 183, 107 ],
				darkmagenta : [ 139, 0, 139 ],
				darkolivegreen : [ 85, 107, 47 ],
				darkorange : [ 255, 140, 0 ],
				darkorchid : [ 153, 50, 204 ],
				darkred : [ 139, 0, 0 ],
				darksalmon : [ 233, 150, 122 ],
				darkviolet : [ 148, 0, 211 ],
				fuchsia : [ 255, 0, 255 ],
				gold : [ 255, 215, 0 ],
				green : [ 0, 128, 0 ],
				indigo : [ 75, 0, 130 ],
				khaki : [ 240, 230, 140 ],
				lightblue : [ 173, 216, 230 ],
				lightcyan : [ 224, 255, 255 ],
				lightgreen : [ 144, 238, 144 ],
				lightgrey : [ 211, 211, 211 ],
				lightpink : [ 255, 182, 193 ],
				lightyellow : [ 255, 255, 224 ],
				lime : [ 0, 255, 0 ],
				magenta : [ 255, 0, 255 ],
				maroon : [ 128, 0, 0 ],
				navy : [ 0, 0, 128 ],
				olive : [ 128, 128, 0 ],
				orange : [ 255, 165, 0 ],
				pink : [ 255, 192, 203 ],
				purple : [ 128, 0, 128 ],
				violet : [ 128, 0, 128 ],
				red : [ 255, 0, 0 ],
				silver : [ 192, 192, 192 ],
				white : [ 255, 255, 255 ],
				yellow : [ 255, 255, 0 ],
				transparent : [ 255, 255, 255 ]
			}, A = [ "add", "remove", "toggle" ], M = {
				border : 1,
				borderBottom : 1,
				borderColor : 1,
				borderLeft : 1,
				borderRight : 1,
				borderTop : 1,
				borderWidth : 1,
				margin : 1,
				padding : 1
			};
			a.effects.animateClass = function(D, s, u, B) {
				if (a.isFunction(u)) {
					B = u;
					u = null
				}
				return this.each(function() {
					a.queue(this, "fx", function() {
						var F = a(this), g = F.attr("style") || " ", r = l(f
								.call(this)), z, n = F.attr("className");
						a.each(A, function(G, I) {
							D[I] && F[I + "Class"](D[I])
						});
						z = l(f.call(this));
						F.attr("className", n);
						F.animate(m(r, z), s, u, function() {
							a.each(A, function(G, I) {
								D[I] && F[I + "Class"](D[I])
							});
							if (typeof F.attr("style") == "object") {
								F.attr("style").cssText = "";
								F.attr("style").cssText = g
							} else
								F.attr("style", g);
							B && B.apply(this, arguments)
						});
						r = a.queue(this);
						z = r.splice(r.length - 1, 1)[0];
						r.splice(1, 0, z);
						a.dequeue(this)
					})
				})
			};
			a.fn
					.extend({
						_addClass : a.fn.addClass,
						addClass : function(D, s, u, B) {
							return s ? a.effects.animateClass.apply(this, [ {
								add : D
							}, s, u, B ]) : this._addClass(D)
						},
						_removeClass : a.fn.removeClass,
						removeClass : function(D, s, u, B) {
							return s ? a.effects.animateClass.apply(this, [ {
								remove : D
							}, s, u, B ]) : this._removeClass(D)
						},
						_toggleClass : a.fn.toggleClass,
						toggleClass : function(D, s, u, B, F) {
							return typeof s == "boolean" || s === b ? u ? a.effects.animateClass
									.apply(this, [ s ? {
										add : D
									} : {
										remove : D
									}, u, B, F ])
									: this._toggleClass(D, s)
									: a.effects.animateClass.apply(this, [ {
										toggle : D
									}, s, u, B ])
						},
						switchClass : function(D, s, u, B, F) {
							return a.effects.animateClass.apply(this, [ {
								add : s,
								remove : D
							}, u, B, F ])
						}
					});
			a.extend(a.effects, {
				version : "1.8.7",
				save : function(D, s) {
					for ( var u = 0; u < s.length; u++)
						s[u] !== null
								&& D.data("ec.storage." + s[u],
										D[0].style[s[u]])
				},
				restore : function(D, s) {
					for ( var u = 0; u < s.length; u++)
						s[u] !== null
								&& D.css(s[u], D.data("ec.storage." + s[u]))
				},
				setMode : function(D, s) {
					if (s == "toggle")
						s = D.is(":hidden") ? "show" : "hide";
					return s
				},
				getBaseline : function(D, s) {
					var u;
					switch (D[0]) {
					case "top":
						u = 0;
						break;
					case "middle":
						u = 0.5;
						break;
					case "bottom":
						u = 1;
						break;
					default:
						u = D[0] / s.height
					}
					switch (D[1]) {
					case "left":
						D = 0;
						break;
					case "center":
						D = 0.5;
						break;
					case "right":
						D = 1;
						break;
					default:
						D = D[1] / s.width
					}
					return {
						x : D,
						y : u
					}
				},
				createWrapper : function(D) {
					if (D.parent().is(".ui-effects-wrapper"))
						return D.parent();
					var s = {
						width : D.outerWidth(true),
						height : D.outerHeight(true),
						"float" : D.css("float")
					}, u = a("<div></div>").addClass("ui-effects-wrapper").css(
							{
								fontSize : "100%",
								background : "transparent",
								border : "none",
								margin : 0,
								padding : 0
							});
					D.wrap(u);
					u = D.parent();
					if (D.css("position") == "static") {
						u.css({
							position : "relative"
						});
						D.css({
							position : "relative"
						})
					} else {
						a.extend(s, {
							position : D.css("position"),
							zIndex : D.css("z-index")
						});
						a.each([ "top", "left", "bottom", "right" ], function(
								B, F) {
							s[F] = D.css(F);
							if (isNaN(parseInt(s[F], 10)))
								s[F] = "auto"
						});
						D.css({
							position : "relative",
							top : 0,
							left : 0
						})
					}
					return u.css(s).show()
				},
				removeWrapper : function(D) {
					if (D.parent().is(".ui-effects-wrapper"))
						return D.parent().replaceWith(D);
					return D
				},
				setTransition : function(D, s, u, B) {
					B = B || {};
					a.each(s, function(F, g) {
						unit = D.cssUnit(g);
						if (unit[0] > 0)
							B[g] = unit[0] * u + unit[1]
					});
					return B
				}
			});
			a.fn.extend({
				effect : function(D) {
					var s = p.apply(this, arguments), u = {
						options : s[1],
						duration : s[2],
						callback : s[3]
					};
					s = u.options.mode;
					var B = a.effects[D];
					if (a.fx.off || !B)
						return s ? this[s](u.duration, u.callback) : this
								.each(function() {
									u.callback && u.callback.call(this)
								});
					return B.call(this, u)
				},
				_show : a.fn.show,
				show : function(D) {
					if (v(D))
						return this._show.apply(this, arguments);
					else {
						var s = p.apply(this, arguments);
						s[1].mode = "show";
						return this.effect.apply(this, s)
					}
				},
				_hide : a.fn.hide,
				hide : function(D) {
					if (v(D))
						return this._hide.apply(this, arguments);
					else {
						var s = p.apply(this, arguments);
						s[1].mode = "hide";
						return this.effect.apply(this, s)
					}
				},
				__toggle : a.fn.toggle,
				toggle : function(D) {
					if (v(D) || typeof D === "boolean" || a.isFunction(D))
						return this.__toggle.apply(this, arguments);
					else {
						var s = p.apply(this, arguments);
						s[1].mode = "toggle";
						return this.effect.apply(this, s)
					}
				},
				cssUnit : function(D) {
					var s = this.css(D), u = [];
					a.each([ "em", "px", "%", "pt" ], function(B, F) {
						if (s.indexOf(F) > 0)
							u = [ parseFloat(s), F ]
					});
					return u
				}
			});
			a.easing.jswing = a.easing.swing;
			a
					.extend(
							a.easing,
							{
								def : "easeOutQuad",
								swing : function(D, s, u, B, F) {
									return a.easing[a.easing.def]
											(D, s, u, B, F)
								},
								easeInQuad : function(D, s, u, B, F) {
									return B * (s /= F) * s + u
								},
								easeOutQuad : function(D, s, u, B, F) {
									return -B * (s /= F) * (s - 2) + u
								},
								easeInOutQuad : function(D, s, u, B, F) {
									if ((s /= F / 2) < 1)
										return B / 2 * s * s + u;
									return -B / 2 * (--s * (s - 2) - 1) + u
								},
								easeInCubic : function(D, s, u, B, F) {
									return B * (s /= F) * s * s + u
								},
								easeOutCubic : function(D, s, u, B, F) {
									return B * ((s = s / F - 1) * s * s + 1)
											+ u
								},
								easeInOutCubic : function(D, s, u, B, F) {
									if ((s /= F / 2) < 1)
										return B / 2 * s * s * s + u;
									return B / 2 * ((s -= 2) * s * s + 2) + u
								},
								easeInQuart : function(D, s, u, B, F) {
									return B * (s /= F) * s * s * s + u
								},
								easeOutQuart : function(D, s, u, B, F) {
									return -B
											* ((s = s / F - 1) * s * s * s - 1)
											+ u
								},
								easeInOutQuart : function(D, s, u, B, F) {
									if ((s /= F / 2) < 1)
										return B / 2 * s * s * s * s + u;
									return -B / 2 * ((s -= 2) * s * s * s - 2)
											+ u
								},
								easeInQuint : function(D, s, u, B, F) {
									return B * (s /= F) * s * s * s * s + u
								},
								easeOutQuint : function(D, s, u, B, F) {
									return B
											* ((s = s / F - 1) * s * s * s * s + 1)
											+ u
								},
								easeInOutQuint : function(D, s, u, B, F) {
									if ((s /= F / 2) < 1)
										return B / 2 * s * s * s * s * s + u;
									return B / 2
											* ((s -= 2) * s * s * s * s + 2)
											+ u
								},
								easeInSine : function(D, s, u, B, F) {
									return -B * Math.cos(s / F * (Math.PI / 2))
											+ B + u
								},
								easeOutSine : function(D, s, u, B, F) {
									return B * Math.sin(s / F * (Math.PI / 2))
											+ u
								},
								easeInOutSine : function(D, s, u, B, F) {
									return -B / 2
											* (Math.cos(Math.PI * s / F) - 1)
											+ u
								},
								easeInExpo : function(D, s, u, B, F) {
									return s == 0 ? u : B
											* Math.pow(2, 10 * (s / F - 1)) + u
								},
								easeOutExpo : function(D, s, u, B, F) {
									return s == F ? u + B : B
											* (-Math.pow(2, -10 * s / F) + 1)
											+ u
								},
								easeInOutExpo : function(D, s, u, B, F) {
									if (s == 0)
										return u;
									if (s == F)
										return u + B;
									if ((s /= F / 2) < 1)
										return B / 2
												* Math.pow(2, 10 * (s - 1)) + u;
									return B / 2
											* (-Math.pow(2, -10 * --s) + 2) + u
								},
								easeInCirc : function(D, s, u, B, F) {
									return -B
											* (Math.sqrt(1 - (s /= F) * s) - 1)
											+ u
								},
								easeOutCirc : function(D, s, u, B, F) {
									return B
											* Math
													.sqrt(1 - (s = s / F - 1)
															* s) + u
								},
								easeInOutCirc : function(D, s, u, B, F) {
									if ((s /= F / 2) < 1)
										return -B / 2
												* (Math.sqrt(1 - s * s) - 1)
												+ u;
									return B / 2
											* (Math.sqrt(1 - (s -= 2) * s) + 1)
											+ u
								},
								easeInElastic : function(D, s, u, B, F) {
									var g = 0, r = B;
									if (s == 0)
										return u;
									if ((s /= F) == 1)
										return u + B;
									g || (g = F * 0.3);
									if (r < Math.abs(B)) {
										r = B;
										D = g / 4
									} else
										D = g / (2 * Math.PI)
												* Math.asin(B / r);
									return -(r * Math.pow(2, 10 * (s -= 1)) * Math
											.sin((s * F - D) * 2 * Math.PI / g))
											+ u
								},
								easeOutElastic : function(D, s, u, B, F) {
									var g = 0, r = B;
									if (s == 0)
										return u;
									if ((s /= F) == 1)
										return u + B;
									g || (g = F * 0.3);
									if (r < Math.abs(B)) {
										r = B;
										D = g / 4
									} else
										D = g / (2 * Math.PI)
												* Math.asin(B / r);
									return r
											* Math.pow(2, -10 * s)
											* Math.sin((s * F - D) * 2
													* Math.PI / g) + B + u
								},
								easeInOutElastic : function(D, s, u, B, F) {
									var g = 0, r = B;
									if (s == 0)
										return u;
									if ((s /= F / 2) == 2)
										return u + B;
									g || (g = F * 0.3 * 1.5);
									if (r < Math.abs(B)) {
										r = B;
										D = g / 4
									} else
										D = g / (2 * Math.PI)
												* Math.asin(B / r);
									if (s < 1)
										return -0.5
												* r
												* Math.pow(2, 10 * (s -= 1))
												* Math.sin((s * F - D) * 2
														* Math.PI / g) + u;
									return r
											* Math.pow(2, -10 * (s -= 1))
											* Math.sin((s * F - D) * 2
													* Math.PI / g) * 0.5 + B
											+ u
								},
								easeInBack : function(D, s, u, B, F, g) {
									if (g == b)
										g = 1.70158;
									return B * (s /= F) * s * ((g + 1) * s - g)
											+ u
								},
								easeOutBack : function(D, s, u, B, F, g) {
									if (g == b)
										g = 1.70158;
									return B
											* ((s = s / F - 1) * s
													* ((g + 1) * s + g) + 1)
											+ u
								},
								easeInOutBack : function(D, s, u, B, F, g) {
									if (g == b)
										g = 1.70158;
									if ((s /= F / 2) < 1)
										return B / 2 * s * s
												* (((g *= 1.525) + 1) * s - g)
												+ u;
									return B
											/ 2
											* ((s -= 2)
													* s
													* (((g *= 1.525) + 1) * s + g) + 2)
											+ u
								},
								easeInBounce : function(D, s, u, B, F) {
									return B
											- a.easing.easeOutBounce(D, F - s,
													0, B, F) + u
								},
								easeOutBounce : function(D, s, u, B, F) {
									return (s /= F) < 1 / 2.75 ? B * 7.5625 * s
											* s + u
											: s < 2 / 2.75 ? B
													* (7.5625
															* (s -= 1.5 / 2.75)
															* s + 0.75) + u
													: s < 2.5 / 2.75 ? B
															* (7.5625
																	* (s -= 2.25 / 2.75)
																	* s + 0.9375)
															+ u
															: B
																	* (7.5625
																			* (s -= 2.625 / 2.75)
																			* s + 0.984375)
																	+ u
								},
								easeInOutBounce : function(D, s, u, B, F) {
									if (s < F / 2)
										return a.easing.easeInBounce(D, s * 2,
												0, B, F)
												* 0.5 + u;
									return a.easing.easeOutBounce(D, s * 2 - F,
											0, B, F)
											* 0.5 + B * 0.5 + u
								}
							})
		}(jQuery);
(function(a) {
	a.effects.drop = function(b) {
		return this
				.queue(function() {
					var d = a(this), e = [ "position", "top", "left", "opacity" ], f = a.effects
							.setMode(d, b.options.mode || "hide"), l = b.options.direction
							|| "left";
					a.effects.save(d, e);
					d.show();
					a.effects.createWrapper(d);
					var m = l == "up" || l == "down" ? "top" : "left";
					l = l == "up" || l == "left" ? "pos" : "neg";
					var p = b.options.distance || (m == "top" ? d.outerHeight({
						margin : true
					}) / 2 : d.outerWidth({
						margin : true
					}) / 2);
					if (f == "show")
						d.css("opacity", 0).css(m, l == "pos" ? -p : p);
					var v = {
						opacity : f == "show" ? 1 : 0
					};
					v[m] = (f == "show" ? l == "pos" ? "+=" : "-="
							: l == "pos" ? "-=" : "+=")
							+ p;
					d.animate(v, {
						queue : false,
						duration : b.duration,
						easing : b.options.easing,
						complete : function() {
							f == "hide" && d.hide();
							a.effects.restore(d, e);
							a.effects.removeWrapper(d);
							b.callback && b.callback.apply(this, arguments);
							d.dequeue()
						}
					})
				})
	}
})(jQuery);
(function(a) {
	a.effects.slide = function(b) {
		return this
				.queue(function() {
					var d = a(this), e = [ "position", "top", "left" ], f = a.effects
							.setMode(d, b.options.mode || "show"), l = b.options.direction
							|| "left";
					a.effects.save(d, e);
					d.show();
					a.effects.createWrapper(d).css({
						overflow : "hidden"
					});
					var m = l == "up" || l == "down" ? "top" : "left";
					l = l == "up" || l == "left" ? "pos" : "neg";
					var p = b.options.distance || (m == "top" ? d.outerHeight({
						margin : true
					}) : d.outerWidth({
						margin : true
					}));
					if (f == "show")
						d.css(m, l == "pos" ? isNaN(p) ? "-" + p : -p : p);
					var v = {};
					v[m] = (f == "show" ? l == "pos" ? "+=" : "-="
							: l == "pos" ? "-=" : "+=")
							+ p;
					d.animate(v, {
						queue : false,
						duration : b.duration,
						easing : b.options.easing,
						complete : function() {
							f == "hide" && d.hide();
							a.effects.restore(d, e);
							a.effects.removeWrapper(d);
							b.callback && b.callback.apply(this, arguments);
							d.dequeue()
						}
					})
				})
	}
})(jQuery);
(function(a) {
	a.toJSON = function(e) {
		if (typeof JSON == "object" && JSON.stringify)
			return JSON.stringify(e);
		var f = typeof e;
		if (e === null)
			return "null";
		if (f != "undefined") {
			if (f == "number" || f == "boolean")
				return e + "";
			if (f == "string")
				return a.quoteString(e);
			if (f == "object") {
				if (typeof e.toJSON == "function")
					return a.toJSON(e.toJSON());
				if (e.constructor === Date) {
					var l = e.getUTCMonth() + 1;
					if (l < 10)
						l = "0" + l;
					var m = e.getUTCDate();
					if (m < 10)
						m = "0" + m;
					f = e.getUTCFullYear();
					var p = e.getUTCHours();
					if (p < 10)
						p = "0" + p;
					var v = e.getUTCMinutes();
					if (v < 10)
						v = "0" + v;
					var y = e.getUTCSeconds();
					if (y < 10)
						y = "0" + y;
					e = e.getUTCMilliseconds();
					if (e < 100)
						e = "0" + e;
					if (e < 10)
						e = "0" + e;
					return '"' + f + "-" + l + "-" + m + "T" + p + ":" + v
							+ ":" + y + "." + e + 'Z"'
				}
				if (e.constructor === Array) {
					l = [];
					for (m = 0; m < e.length; m++)
						l.push(a.toJSON(e[m]) || "null");
					return "[" + l.join(",") + "]"
				}
				l = [];
				for (m in e) {
					f = typeof m;
					if (f == "number")
						f = '"' + m + '"';
					else if (f == "string")
						f = a.quoteString(m);
					else
						continue;
					if (typeof e[m] != "function") {
						p = a.toJSON(e[m]);
						l.push(f + ":" + p)
					}
				}
				return "{" + l.join(", ") + "}"
			}
		}
	};
	a.evalJSON = function(e) {
		if (typeof JSON == "object" && JSON.parse)
			return JSON.parse(e);
		return eval("(" + e + ")")
	};
	a.secureEvalJSON = function(e) {
		if (typeof JSON == "object" && JSON.parse)
			return JSON.parse(e);
		var f = e;
		f = f.replace(/\\["\\\/bfnrtu]/g, "@");
		f = f
				.replace(
						/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
						"]");
		f = f.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
		if (/^[\],:{}\s]*$/.test(f))
			return eval("(" + e + ")");
		else
			throw new SyntaxError("Error parsing JSON, source is not valid.");
	};
	a.quoteString = function(e) {
		if (e.match(b))
			return '"'
					+ e.replace(b, function(f) {
						var l = d[f];
						if (typeof l === "string")
							return l;
						l = f.charCodeAt();
						return "\\u00" + Math.floor(l / 16).toString(16)
								+ (l % 16).toString(16)
					}) + '"';
		return '"' + e + '"'
	};
	var b = /["\\\x00-\x1f\x7f-\x9f]/g, d = {
		"\u0008" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\u000c" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}
})(jQuery);
(function(a) {
	a
			.extend(
					a.fn,
					{
						validate : function(b) {
							if (this.length) {
								var d = a.data(this[0], "validator");
								if (d)
									return d;
								d = new a.validator(b, this[0]);
								a.data(this[0], "validator", d);
								if (d.settings.onsubmit) {
									this.find("input, button")
											.filter(".cancel").click(
													function() {
														d.cancelSubmit = true
													});
									d.settings.submitHandler
											&& this.find("input, button")
													.filter(":submit")
													.click(function() {
														d.submitButton = this
													});
									this
											.submit(function(e) {
												function f() {
													if (d.settings.submitHandler) {
														if (d.submitButton)
															var l = a(
																	"<input type='hidden'/>")
																	.attr(
																			"name",
																			d.submitButton.name)
																	.val(
																			d.submitButton.value)
																	.appendTo(
																			d.currentForm);
														d.settings.submitHandler
																.call(
																		d,
																		d.currentForm);
														d.submitButton
																&& l.remove();
														return false
													}
													return true
												}
												d.settings.debug
														&& e.preventDefault();
												if (d.cancelSubmit) {
													d.cancelSubmit = false;
													return f()
												}
												if (d.form()) {
													if (d.pendingRequest) {
														d.formSubmitted = true;
														return false
													}
													return f()
												} else {
													d.focusInvalid();
													return false
												}
											})
								}
								return d
							} else
								b
										&& b.debug
										&& window.console
										&& console
												.warn("nothing selected, can't validate, returning nothing")
						},
						valid : function() {
							if (a(this[0]).is("form"))
								return this.validate().form();
							else {
								var b = true, d = a(this[0].form).validate();
								this.each(function() {
									b &= d.element(this)
								});
								return b
							}
						},
						removeAttrs : function(b) {
							var d = {}, e = this;
							a.each(b.split(/\s/), function(f, l) {
								d[l] = e.attr(l);
								e.removeAttr(l)
							});
							return d
						},
						rules : function(b, d) {
							var e = this[0];
							if (b) {
								var f = a.data(e.form, "validator").settings, l = f.rules, m = a.validator
										.staticRules(e);
								switch (b) {
								case "add":
									a.extend(m, a.validator.normalizeRule(d));
									l[e.name] = m;
									if (d.messages)
										f.messages[e.name] = a.extend(
												f.messages[e.name], d.messages);
									break;
								case "remove":
									if (!d) {
										delete l[e.name];
										return m
									}
									var p = {};
									a.each(d.split(/\s/), function(v, y) {
										p[y] = m[y];
										delete m[y]
									});
									return p
								}
							}
							b = a.validator.normalizeRules(a.extend({},
									a.validator.metadataRules(e), a.validator
											.classRules(e), a.validator
											.attributeRules(e), a.validator
											.staticRules(e)), e);
							if (b.required) {
								d = b.required;
								delete b.required;
								b = a.extend({
									required : d
								}, b)
							}
							return b
						}
					});
	a.extend(a.expr[":"], {
		blank : function(b) {
			return !a.trim("" + b.value)
		},
		filled : function(b) {
			return !!a.trim("" + b.value)
		},
		unchecked : function(b) {
			return !b.checked
		}
	});
	a.validator = function(b, d) {
		this.settings = a.extend(true, {}, a.validator.defaults, b);
		this.currentForm = d;
		this.init()
	};
	a.validator.format = function(b, d) {
		if (arguments.length == 1)
			return function() {
				var e = a.makeArray(arguments);
				e.unshift(b);
				return a.validator.format.apply(this, e)
			};
		if (arguments.length > 2 && d.constructor != Array)
			d = a.makeArray(arguments).slice(1);
		if (d.constructor != Array)
			d = [ d ];
		a.each(d, function(e, f) {
			b = b.replace(new RegExp("\\{" + e + "\\}", "g"), f)
		});
		return b
	};
	a
			.extend(
					a.validator,
					{
						defaults : {
							messages : {},
							groups : {},
							rules : {},
							errorClass : "error",
							validClass : "valid",
							errorElement : "label",
							focusInvalid : true,
							errorContainer : a([]),
							errorLabelContainer : a([]),
							onsubmit : true,
							ignore : [],
							ignoreTitle : false,
							onfocusin : function(b) {
								this.lastActive = b;
								if (this.settings.focusCleanup
										&& !this.blockFocusCleanup) {
									this.settings.unhighlight
											&& this.settings.unhighlight.call(
													this, b,
													this.settings.errorClass,
													this.settings.validClass);
									this.errorsFor(b).hide()
								}
							},
							onfocusout : function(b) {
								if (!this.checkable(b)
										&& (b.name in this.submitted || !this
												.optional(b)))
									this.element(b)
							},
							onkeyup : function(b) {
								if (b.name in this.submitted
										|| b == this.lastElement)
									this.element(b)
							},
							onclick : function(b) {
								if (b.name in this.submitted)
									this.element(b);
								else
									b.parentNode.name in this.submitted
											&& this.element(b.parentNode)
							},
							highlight : function(b, d, e) {
								a(b).addClass(d).removeClass(e)
							},
							unhighlight : function(b, d, e) {
								a(b).removeClass(d).addClass(e)
							}
						},
						setDefaults : function(b) {
							a.extend(a.validator.defaults, b)
						},
						messages : {
							required : "This field is required.",
							remote : "Please fix this field.",
							email : "Please enter a valid email address.",
							url : "Please enter a valid URL.",
							date : "Please enter a valid date.",
							dateISO : "Please enter a valid date (ISO).",
							number : "Please enter a valid number.",
							digits : "Please enter only digits.",
							creditcard : "Please enter a valid credit card number.",
							equalTo : "Please enter the same value again.",
							accept : "Please enter a value with a valid extension.",
							maxlength : a.validator
									.format("Please enter no more than {0} characters."),
							minlength : a.validator
									.format("Please enter at least {0} characters."),
							rangelength : a.validator
									.format("Please enter a value between {0} and {1} characters long."),
							range : a.validator
									.format("Please enter a value between {0} and {1}."),
							max : a.validator
									.format("Please enter a value less than or equal to {0}."),
							min : a.validator
									.format("Please enter a value greater than or equal to {0}.")
						},
						autoCreateRanges : false,
						prototype : {
							init : function() {
								function b(f) {
									var l = a.data(this[0].form, "validator");
									f = "on" + f.type.replace(/^validate/, "");
									l.settings[f]
											&& l.settings[f].call(l, this[0])
								}
								this.labelContainer = a(this.settings.errorLabelContainer);
								this.errorContext = this.labelContainer.length
										&& this.labelContainer
										|| a(this.currentForm);
								this.containers = a(
										this.settings.errorContainer).add(
										this.settings.errorLabelContainer);
								this.submitted = {};
								this.valueCache = {};
								this.pendingRequest = 0;
								this.pending = {};
								this.invalid = {};
								this.reset();
								var d = this.groups = {};
								a.each(this.settings.groups, function(f, l) {
									a.each(l.split(/\s/), function(m, p) {
										d[p] = f
									})
								});
								var e = this.settings.rules;
								a.each(e, function(f, l) {
									e[f] = a.validator.normalizeRule(l)
								});
								a(this.currentForm)
										.validateDelegate(
												":text, :password, :file, select, textarea",
												"focusin focusout keyup", b)
										.validateDelegate(
												":radio, :checkbox, select, option",
												"click", b);
								this.settings.invalidHandler
										&& a(this.currentForm).bind(
												"invalid-form.validate",
												this.settings.invalidHandler)
							},
							form : function() {
								this.checkForm();
								a.extend(this.submitted, this.errorMap);
								this.invalid = a.extend({}, this.errorMap);
								this.valid()
										|| a(this.currentForm).triggerHandler(
												"invalid-form", [ this ]);
								this.showErrors();
								return this.valid()
							},
							checkForm : function() {
								this.prepareForm();
								for ( var b = 0, d = this.currentElements = this
										.elements(); d[b]; b++)
									this.check(d[b]);
								return this.valid()
							},
							element : function(b) {
								this.lastElement = b = this.clean(b);
								this.prepareElement(b);
								this.currentElements = a(b);
								var d = this.check(b);
								if (d)
									delete this.invalid[b.name];
								else
									this.invalid[b.name] = true;
								if (!this.numberOfInvalids())
									this.toHide = this.toHide
											.add(this.containers);
								this.showErrors();
								return d
							},
							showErrors : function(b) {
								if (b) {
									a.extend(this.errorMap, b);
									this.errorList = [];
									for ( var d in b)
										this.errorList.push({
											message : b[d],
											element : this.findByName(d)[0]
										});
									this.successList = a.grep(this.successList,
											function(e) {
												return !(e.name in b)
											})
								}
								this.settings.showErrors ? this.settings.showErrors
										.call(this, this.errorMap,
												this.errorList)
										: this.defaultShowErrors()
							},
							resetForm : function() {
								a.fn.resetForm
										&& a(this.currentForm).resetForm();
								this.submitted = {};
								this.prepareForm();
								this.hideErrors();
								this.elements().removeClass(
										this.settings.errorClass)
							},
							numberOfInvalids : function() {
								return this.objectLength(this.invalid)
							},
							objectLength : function(b) {
								var d = 0;
								for ( var e in b)
									d++;
								return d
							},
							hideErrors : function() {
								this.addWrapper(this.toHide).hide()
							},
							valid : function() {
								return this.size() == 0
							},
							size : function() {
								return this.errorList.length
							},
							focusInvalid : function() {
								if (this.settings.focusInvalid)
									try {
										a(
												this.findLastActive()
														|| this.errorList.length
														&& this.errorList[0].element
														|| []).filter(
												":visible").focus().trigger(
												"focusin")
									} catch (b) {
									}
							},
							findLastActive : function() {
								var b = this.lastActive;
								return b && a.grep(this.errorList, function(d) {
									return d.element.name == b.name
								}).length == 1 && b
							},
							elements : function() {
								var b = this, d = {};
								return a([])
										.add(this.currentForm.elements)
										.filter(":input")
										.not(
												":submit, :reset, :image, [disabled]")
										.not(this.settings.ignore)
										.filter(
												function() {
													!this.name
															&& b.settings.debug
															&& window.console
															&& console
																	.error(
																			"%o has no name assigned",
																			this);
													if (this.name in d
															|| !b
																	.objectLength(a(
																			this)
																			.rules()))
														return false;
													return d[this.name] = true
												})
							},
							clean : function(b) {
								return a(b)[0]
							},
							errors : function() {
								return a(this.settings.errorElement + "."
										+ this.settings.errorClass,
										this.errorContext)
							},
							reset : function() {
								this.successList = [];
								this.errorList = [];
								this.errorMap = {};
								this.toShow = a([]);
								this.toHide = a([]);
								this.currentElements = a([])
							},
							prepareForm : function() {
								this.reset();
								this.toHide = this.errors()
										.add(this.containers)
							},
							prepareElement : function(b) {
								this.reset();
								this.toHide = this.errorsFor(b)
							},
							check : function(b) {
								b = this.clean(b);
								if (this.checkable(b))
									b = this.findByName(b.name)[0];
								var d = a(b).rules(), e = false;
								for (method in d) {
									var f = {
										method : method,
										parameters : d[method]
									};
									try {
										var l = a.validator.methods[method]
												.call(this, b.value.replace(
														/\r/g, ""), b,
														f.parameters);
										if (l == "dependency-mismatch")
											e = true;
										else {
											e = false;
											if (l == "pending") {
												this.toHide = this.toHide
														.not(this.errorsFor(b));
												return
											}
											if (!l) {
												this.formatAndAdd(b, f);
												return false
											}
										}
									} catch (m) {
										this.settings.debug
												&& window.console
												&& console
														.log(
																"exception occured when checking element "
																		+ b.id
																		+ ", check the '"
																		+ f.method
																		+ "' method",
																m);
										throw m;
									}
								}
								if (!e) {
									this.objectLength(d)
											&& this.successList.push(b);
									return true
								}
							},
							customMetaMessage : function(b, d) {
								if (a.metadata)
									return (b = this.settings.meta ? a(b)
											.metadata()[this.settings.meta]
											: a(b).metadata())
											&& b.messages && b.messages[d]
							},
							customMessage : function(b, d) {
								return (b = this.settings.messages[b])
										&& (b.constructor == String ? b : b[d])
							},
							findDefined : function() {
								for ( var b = 0; b < arguments.length; b++)
									if (arguments[b] !== undefined)
										return arguments[b]
							},
							defaultMessage : function(b, d) {
								return this.findDefined(this.customMessage(
										b.name, d), this
										.customMetaMessage(b, d),
										!this.settings.ignoreTitle && b.title
												|| undefined,
										a.validator.messages[d],
										"<strong>Warning: No message defined for "
												+ b.name + "</strong>")
							},
							formatAndAdd : function(b, d) {
								var e = this.defaultMessage(b, d.method), f = /\$?\{(\d+)\}/g;
								if (typeof e == "function")
									e = e.call(this, d.parameters, b);
								else if (f.test(e))
									e = jQuery.format(e.replace(f, "{$1}"),
											d.parameters);
								this.errorList.push({
									message : e,
									element : b
								});
								this.errorMap[b.name] = e;
								this.submitted[b.name] = e
							},
							addWrapper : function(b) {
								if (this.settings.wrapper)
									b = b.add(b.parent(this.settings.wrapper));
								return b
							},
							defaultShowErrors : function() {
								for ( var b = 0; this.errorList[b]; b++) {
									var d = this.errorList[b];
									this.settings.highlight
											&& this.settings.highlight.call(
													this, d.element,
													this.settings.errorClass,
													this.settings.validClass);
									this.showLabel(d.element, d.message)
								}
								if (this.errorList.length)
									this.toShow = this.toShow
											.add(this.containers);
								if (this.settings.success)
									for (b = 0; this.successList[b]; b++)
										this.showLabel(this.successList[b]);
								if (this.settings.unhighlight) {
									b = 0;
									for (d = this.validElements(); d[b]; b++)
										this.settings.unhighlight.call(this,
												d[b], this.settings.errorClass,
												this.settings.validClass)
								}
								this.toHide = this.toHide.not(this.toShow);
								this.hideErrors();
								this.addWrapper(this.toShow).show()
							},
							validElements : function() {
								return this.currentElements.not(this
										.invalidElements())
							},
							invalidElements : function() {
								return a(this.errorList).map(function() {
									return this.element
								})
							},
							showLabel : function(b, d) {
								var e = this.errorsFor(b);
								if (e.length) {
									e.removeClass().addClass(
											this.settings.errorClass);
									e.attr("generated") && e.html(d)
								} else {
									e = a(
											"<" + this.settings.errorElement
													+ "/>").attr({
										"for" : this.idOrName(b),
										generated : true
									}).addClass(this.settings.errorClass).html(
											d || "");
									if (this.settings.wrapper)
										e = e.hide().show().wrap(
												"<" + this.settings.wrapper
														+ "/>").parent();
									this.labelContainer.append(e).length
											|| (this.settings.errorPlacement ? this.settings
													.errorPlacement(e, a(b))
													: e.insertAfter(b))
								}
								if (!d && this.settings.success) {
									e.text("");
									typeof this.settings.success == "string" ? e
											.addClass(this.settings.success)
											: this.settings.success(e)
								}
								this.toShow = this.toShow.add(e)
							},
							errorsFor : function(b) {
								var d = this.idOrName(b);
								return this.errors().filter(function() {
									return a(this).attr("for") == d
								})
							},
							idOrName : function(b) {
								return this.groups[b.name]
										|| (this.checkable(b) ? b.name : b.id
												|| b.name)
							},
							checkable : function(b) {
								return /radio|checkbox/i.test(b.type)
							},
							findByName : function(b) {
								var d = this.currentForm;
								return a(document.getElementsByName(b)).map(
										function(e, f) {
											return f.form == d && f.name == b
													&& f || null
										})
							},
							getLength : function(b, d) {
								switch (d.nodeName.toLowerCase()) {
								case "select":
									return a("option:selected", d).length;
								case "input":
									if (this.checkable(d))
										return this.findByName(d.name).filter(
												":checked").length
								}
								return b.length
							},
							depend : function(b, d) {
								return this.dependTypes[typeof b] ? this.dependTypes[typeof b]
										(b, d)
										: true
							},
							dependTypes : {
								"boolean" : function(b) {
									return b
								},
								string : function(b, d) {
									return !!a(b, d.form).length
								},
								"function" : function(b, d) {
									return b(d)
								}
							},
							optional : function(b) {
								return !a.validator.methods.required.call(this,
										a.trim(b.value), b)
										&& "dependency-mismatch"
							},
							startRequest : function(b) {
								if (!this.pending[b.name]) {
									this.pendingRequest++;
									this.pending[b.name] = true
								}
							},
							stopRequest : function(b, d) {
								this.pendingRequest--;
								if (this.pendingRequest < 0)
									this.pendingRequest = 0;
								delete this.pending[b.name];
								if (d && this.pendingRequest == 0
										&& this.formSubmitted && this.form()) {
									a(this.currentForm).submit();
									this.formSubmitted = false
								} else if (!d && this.pendingRequest == 0
										&& this.formSubmitted) {
									a(this.currentForm).triggerHandler(
											"invalid-form", [ this ]);
									this.formSubmitted = false
								}
							},
							previousValue : function(b) {
								return a.data(b, "previousValue")
										|| a.data(b, "previousValue", {
											old : null,
											valid : true,
											message : this.defaultMessage(b,
													"remote")
										})
							}
						},
						classRuleSettings : {
							required : {
								required : true
							},
							email : {
								email : true
							},
							url : {
								url : true
							},
							date : {
								date : true
							},
							dateISO : {
								dateISO : true
							},
							dateDE : {
								dateDE : true
							},
							number : {
								number : true
							},
							numberDE : {
								numberDE : true
							},
							digits : {
								digits : true
							},
							creditcard : {
								creditcard : true
							}
						},
						addClassRules : function(b, d) {
							b.constructor == String ? (this.classRuleSettings[b] = d)
									: a.extend(this.classRuleSettings, b)
						},
						classRules : function(b) {
							var d = {};
							(b = a(b).attr("class"))
									&& a
											.each(
													b.split(" "),
													function() {
														this in a.validator.classRuleSettings
																&& a
																		.extend(
																				d,
																				a.validator.classRuleSettings[this])
													});
							return d
						},
						attributeRules : function(b) {
							var d = {};
							b = a(b);
							for (method in a.validator.methods) {
								var e = b.attr(method);
								if (e)
									d[method] = e
							}
							d.maxlength
									&& /-1|2147483647|524288/.test(d.maxlength)
									&& delete d.maxlength;
							return d
						},
						metadataRules : function(b) {
							if (!a.metadata)
								return {};
							var d = a.data(b.form, "validator").settings.meta;
							return d ? a(b).metadata()[d] : a(b).metadata()
						},
						staticRules : function(b) {
							var d = {}, e = a.data(b.form, "validator");
							if (e.settings.rules)
								d = a.validator
										.normalizeRule(e.settings.rules[b.name])
										|| {};
							return d
						},
						normalizeRules : function(b, d) {
							a.each(b, function(e, f) {
								if (f === false)
									delete b[e];
								else if (f.param || f.depends) {
									var l = true;
									switch (typeof f.depends) {
									case "string":
										l = !!a(f.depends, d.form).length;
										break;
									case "function":
										l = f.depends.call(d, d);
										break
									}
									if (l)
										b[e] = f.param !== undefined ? f.param
												: true;
									else
										delete b[e]
								}
							});
							a.each(b, function(e, f) {
								b[e] = a.isFunction(f) ? f(d) : f
							});
							a.each([ "minlength", "maxlength", "min", "max" ],
									function() {
										if (b[this])
											b[this] = Number(b[this])
									});
							a.each([ "rangelength", "range" ], function() {
								if (b[this])
									b[this] = [ Number(b[this][0]),
											Number(b[this][1]) ]
							});
							if (a.validator.autoCreateRanges) {
								if (b.min && b.max) {
									b.range = [ b.min, b.max ];
									delete b.min;
									delete b.max
								}
								if (b.minlength && b.maxlength) {
									b.rangelength = [ b.minlength, b.maxlength ];
									delete b.minlength;
									delete b.maxlength
								}
							}
							b.messages && delete b.messages;
							return b
						},
						normalizeRule : function(b) {
							if (typeof b == "string") {
								var d = {};
								a.each(b.split(/\s/), function() {
									d[this] = true
								});
								b = d
							}
							return b
						},
						addMethod : function(b, d, e) {
							a.validator.methods[b] = d;
							a.validator.messages[b] = e != undefined ? e
									: a.validator.messages[b];
							d.length < 3
									&& a.validator.addClassRules(b, a.validator
											.normalizeRule(b))
						},
						methods : {
							required : function(b, d, e) {
								if (!this.depend(e, d))
									return "dependency-mismatch";
								switch (d.nodeName.toLowerCase()) {
								case "select":
									return (b = a(d).val()) && b.length > 0;
								case "input":
									if (this.checkable(d))
										return this.getLength(b, d) > 0;
								default:
									return a.trim(b).length > 0
								}
							},
							remote : function(b, d, e) {
								if (this.optional(d))
									return "dependency-mismatch";
								var f = this.previousValue(d);
								this.settings.messages[d.name]
										|| (this.settings.messages[d.name] = {});
								f.originalMessage = this.settings.messages[d.name].remote;
								this.settings.messages[d.name].remote = f.message;
								e = typeof e == "string" && {
									url : e
								} || e;
								if (f.old !== b) {
									f.old = b;
									var l = this;
									this.startRequest(d);
									var m = {};
									m[d.name] = b;
									a
											.ajax(a
													.extend(
															true,
															{
																url : e,
																mode : "abort",
																port : "validate"
																		+ d.name,
																dataType : "json",
																data : m,
																success : function(
																		p) {
																	l.settings.messages[d.name].remote = f.originalMessage;
																	var v = p === true;
																	if (v) {
																		var y = l.formSubmitted;
																		l
																				.prepareElement(d);
																		l.formSubmitted = y;
																		l.successList
																				.push(d);
																		l
																				.showErrors()
																	} else {
																		y = {};
																		p = f.message = p
																				|| l
																						.defaultMessage(
																								d,
																								"remote");
																		y[d.name] = a
																				.isFunction(p) ? p(b)
																				: p;
																		l
																				.showErrors(y)
																	}
																	f.valid = v;
																	l
																			.stopRequest(
																					d,
																					v)
																}
															}, e));
									return "pending"
								} else if (this.pending[d.name])
									return "pending";
								return f.valid
							},
							minlength : function(b, d, e) {
								return this.optional(d)
										|| this.getLength(a.trim(b), d) >= e
							},
							maxlength : function(b, d, e) {
								return this.optional(d)
										|| this.getLength(a.trim(b), d) <= e
							},
							rangelength : function(b, d, e) {
								b = this.getLength(a.trim(b), d);
								return this.optional(d) || b >= e[0]
										&& b <= e[1]
							},
							min : function(b, d, e) {
								return this.optional(d) || b >= e
							},
							max : function(b, d, e) {
								return this.optional(d) || b <= e
							},
							range : function(b, d, e) {
								return this.optional(d) || b >= e[0]
										&& b <= e[1]
							},
							email : function(b, d) {
								return this.optional(d)
										|| /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
												.test(b)
							},
							url : function(b, d) {
								return this.optional(d)
										|| /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
												.test(b)
							},
							date : function(b, d) {
								return this.optional(d)
										|| !/Invalid|NaN/.test(new Date(b))
							},
							dateISO : function(b, d) {
								return this.optional(d)
										|| /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/
												.test(b)
							},
							number : function(b, d) {
								return this.optional(d)
										|| /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
												.test(b)
							},
							digits : function(b, d) {
								return this.optional(d) || /^\d+$/.test(b)
							},
							creditcard : function(b, d) {
								if (this.optional(d))
									return "dependency-mismatch";
								if (/[^0-9-]+/.test(b))
									return false;
								var e = d = 0, f = false;
								b = b.replace(/\D/g, "");
								for ( var l = b.length - 1; l >= 0; l--) {
									e = b.charAt(l);
									e = parseInt(e, 10);
									if (f)
										if ((e *= 2) > 9)
											e -= 9;
									d += e;
									f = !f
								}
								return d % 10 == 0
							},
							accept : function(b, d, e) {
								e = typeof e == "string" ? e.replace(/,/g, "|")
										: "png|jpe?g|gif";
								return this.optional(d)
										|| b.match(new RegExp(".(" + e + ")$",
												"i"))
							},
							equalTo : function(b, d, e) {
								e = a(e).unbind(".validate-equalTo").bind(
										"blur.validate-equalTo", function() {
											a(d).valid()
										});
								return b == e.val()
							}
						}
					});
	a.format = a.validator.format
})(jQuery);
(function(a) {
	var b = a.ajax, d = {};
	a.ajax = function(e) {
		e = a.extend(e, a.extend({}, a.ajaxSettings, e));
		var f = e.port;
		if (e.mode == "abort") {
			d[f] && d[f].abort();
			return d[f] = b.apply(this, arguments)
		}
		return b.apply(this, arguments)
	}
})(jQuery);
(function(a) {
	!jQuery.event.special.focusin && !jQuery.event.special.focusout
			&& document.addEventListener && a.each({
				focus : "focusin",
				blur : "focusout"
			}, function(b, d) {
				function e(f) {
					f = a.event.fix(f);
					f.type = d;
					return a.event.handle.call(this, f)
				}
				a.event.special[d] = {
					setup : function() {
						this.addEventListener(b, e, true)
					},
					teardown : function() {
						this.removeEventListener(b, e, true)
					},
					handler : function(f) {
						arguments[0] = a.event.fix(f);
						arguments[0].type = d;
						return a.event.handle.apply(this, arguments)
					}
				}
			});
	a.extend(a.fn, {
		validateDelegate : function(b, d, e) {
			return this.bind(d, function(f) {
				var l = a(f.target);
				if (l.is(b))
					return e.apply(l, arguments)
			})
		}
	})
})(jQuery);
(function(a) {
	function b(e) {
		var f = e || window.event, l = [].slice.call(arguments, 1), m = 0, p = 0, v = 0;
		e = a.event.fix(f);
		e.type = "mousewheel";
		if (e.wheelDelta)
			m = e.wheelDelta / 120;
		if (e.detail)
			m = -e.detail / 3;
		v = m;
		if (f.axis !== undefined && f.axis === f.HORIZONTAL_AXIS) {
			v = 0;
			p = -1 * m
		}
		if (f.wheelDeltaY !== undefined)
			v = f.wheelDeltaY / 120;
		if (f.wheelDeltaX !== undefined)
			p = -1 * f.wheelDeltaX / 120;
		l.unshift(e, m, p, v);
		return a.event.handle.apply(this, l)
	}
	var d = [ "DOMMouseScroll", "mousewheel" ];
	a.event.special.mousewheel = {
		setup : function() {
			if (this.addEventListener)
				for ( var e = d.length; e;)
					this.addEventListener(d[--e], b, false);
			else
				this.onmousewheel = b
		},
		teardown : function() {
			if (this.removeEventListener)
				for ( var e = d.length; e;)
					this.removeEventListener(d[--e], b, false);
			else
				this.onmousewheel = null
		}
	};
	a.fn.extend({
		mousewheel : function(e) {
			return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
		},
		unmousewheel : function(e) {
			return this.unbind("mousewheel", e)
		}
	})
})(jQuery);
(function(a, b, d) {
	a.fn.jScrollPane = function(e) {
		function f(m, p) {
			function v(R) {
				var Y, ga, la;
				ja = R;
				if (qa == d) {
					m.css({
						overflow : "hidden",
						padding : 0
					});
					Ga = m.innerWidth() + ab;
					Aa = m.innerHeight();
					m.width(Ga);
					qa = a('<div class="jspPane" />').wrap(
							a('<div class="jspContainer" />').css({
								width : Ga + "px",
								height : Aa + "px"
							}));
					m.wrapInner(qa.parent());
					ua = m.find(">.jspContainer");
					qa = ua.find(">.jspPane");
					qa.css("padding", Ab)
				} else {
					m.css("width", null);
					if (R = m.outerWidth() + ab != Ga || m.outerHeight() != Aa) {
						Ga = m.innerWidth() + ab;
						Aa = m.innerHeight();
						ua.css({
							width : Ga + "px",
							height : Aa + "px"
						})
					}
					vb = qa.innerWidth();
					if (!R && qa.outerWidth() == cb && qa.outerHeight() == Ja) {
						if (Pa || Oa) {
							qa.css("width", vb + "px");
							m.css("width", vb + ab + "px")
						}
						return
					}
					qa.css("width", null);
					m.css("width", Ga + "px");
					ua.find(">.jspVerticalBar,>.jspHorizontalBar").remove()
							.end()
				}
				R = qa.clone().css("position", "absolute");
				Y = a('<div style="width:1px; position: relative;" />').append(
						R);
				a("body").append(Y);
				cb = Math.max(qa.outerWidth(), R.outerWidth());
				Y.remove();
				Ja = qa.outerHeight();
				qb = cb / Ga;
				lb = Ja / Aa;
				Oa = lb > 1;
				if ((Pa = qb > 1) || Oa) {
					m.addClass("jspScrollable");
					if (R = ja.maintainPosition && (ya || za)) {
						ga = Ca();
						la = Wa()
					}
					y();
					M();
					s();
					if (R) {
						sa(ga);
						Z(la)
					}
					Fa();
					ob();
					ja.enableKeyboardNavigation && Sa();
					ja.clickOnTrack && g();
					zb();
					ja.hijackInternalLinks && wb()
				} else {
					m.removeClass("jspScrollable");
					qa.css({
						top : 0,
						width : ua.width() - ab
					});
					pb();
					Xa();
					Da();
					r();
					jb()
				}
				if (ja.autoReinitialise && !sb)
					sb = setInterval(function() {
						v(ja)
					}, ja.autoReinitialiseDelay);
				else
					!ja.autoReinitialise && sb && clearInterval(sb);
				m.trigger("jsp-initialised", [ Pa || Oa ])
			}
			function y() {
				if (Oa) {
					ua
							.append(a('<div class="jspVerticalBar" />')
									.append(
											a('<div class="jspCap jspCapTop" />'),
											a('<div class="jspTrack" />')
													.append(
															a(
																	'<div class="jspDrag" />')
																	.append(
																			a('<div class="jspDragTop" />'),
																			a('<div class="jspDragBottom" />'))),
											a('<div class="jspCap jspCapBottom" />')));
					xb = ua.find(">.jspVerticalBar");
					Ua = xb.find(">.jspTrack");
					Ha = Ua.find(">.jspDrag");
					if (ja.showArrows) {
						gb = a('<a class="jspArrow jspArrowUp" />').bind(
								"mousedown.jsp", B(0, -1))
								.bind("click.jsp", pa);
						hb = a('<a class="jspArrow jspArrowDown" />').bind(
								"mousedown.jsp", B(0, 1)).bind("click.jsp", pa);
						if (ja.arrowScrollOnHover) {
							gb.bind("mouseover.jsp", B(0, -1, gb));
							hb.bind("mouseover.jsp", B(0, 1, hb))
						}
						u(Ua, ja.verticalArrowPositions, gb, hb)
					}
					eb = Aa;
					ua
							.find(
									">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow")
							.each(function() {
								eb -= a(this).outerHeight()
							});
					Ha.hover(function() {
						Ha.addClass("jspHover")
					}, function() {
						Ha.removeClass("jspHover")
					}).bind(
							"mousedown.jsp",
							function(R) {
								a("html").bind("dragstart.jsp selectstart.jsp",
										function() {
											return false
										});
								Ha.addClass("jspActive");
								var Y = R.pageY - Ha.position().top;
								a("html").bind("mousemove.jsp", function(ga) {
									n(ga.pageY - Y, false)
								}).bind("mouseup.jsp mouseleave.jsp", z);
								return false
							});
					A()
				}
			}
			function A() {
				Ua.height(eb + "px");
				ya = 0;
				rb = ja.verticalGutter + Ua.outerWidth();
				qa.width(Ga - rb - ab);
				xb.position().left == 0 && qa.css("margin-left", rb + "px")
			}
			function M() {
				if (Pa) {
					ua
							.append(a('<div class="jspHorizontalBar" />')
									.append(
											a('<div class="jspCap jspCapLeft" />'),
											a('<div class="jspTrack" />')
													.append(
															a(
																	'<div class="jspDrag" />')
																	.append(
																			a('<div class="jspDragLeft" />'),
																			a('<div class="jspDragRight" />'))),
											a('<div class="jspCap jspCapRight" />')));
					db = ua.find(">.jspHorizontalBar");
					Qa = db.find(">.jspTrack");
					va = Qa.find(">.jspDrag");
					if (ja.showArrows) {
						mb = a('<a class="jspArrow jspArrowLeft" />').bind(
								"mousedown.jsp", B(-1, 0))
								.bind("click.jsp", pa);
						nb = a('<a class="jspArrow jspArrowRight" />').bind(
								"mousedown.jsp", B(1, 0)).bind("click.jsp", pa);
						if (ja.arrowScrollOnHover) {
							mb.bind("mouseover.jsp", B(-1, 0, mb));
							nb.bind("mouseover.jsp", B(1, 0, nb))
						}
						u(Qa, ja.horizontalArrowPositions, mb, nb)
					}
					va.hover(function() {
						va.addClass("jspHover")
					}, function() {
						va.removeClass("jspHover")
					}).bind(
							"mousedown.jsp",
							function(R) {
								a("html").bind("dragstart.jsp selectstart.jsp",
										function() {
											return false
										});
								va.addClass("jspActive");
								var Y = R.pageX - va.position().left;
								a("html").bind("mousemove.jsp", function(ga) {
									I(ga.pageX - Y, false)
								}).bind("mouseup.jsp mouseleave.jsp", z);
								return false
							});
					Ra = ua.innerWidth();
					D()
				}
			}
			function D() {
				ua
						.find(
								">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow")
						.each(function() {
							Ra -= a(this).outerWidth()
						});
				Qa.width(Ra + "px");
				za = 0
			}
			function s() {
				if (Pa && Oa) {
					var R = Qa.outerHeight(), Y = Ua.outerWidth();
					eb -= R;
					a(db).find(">.jspCap:visible,>.jspArrow").each(function() {
						Ra += a(this).outerWidth()
					});
					Ra -= Y;
					Aa -= Y;
					Ga -= R;
					Qa.parent().append(
							a('<div class="jspCorner" />').css("width",
									R + "px"));
					A();
					D()
				}
				Pa && qa.width(ua.outerWidth() - ab + "px");
				Ja = qa.outerHeight();
				lb = Ja / Aa;
				if (Pa) {
					$a = 1 / qb * Ra;
					if ($a > ja.horizontalDragMaxWidth)
						$a = ja.horizontalDragMaxWidth;
					else if ($a < ja.horizontalDragMinWidth)
						$a = ja.horizontalDragMinWidth;
					va.width($a + "px");
					Ya = Ra - $a;
					N(za)
				}
				if (Oa) {
					Za = 1 / lb * eb;
					if (Za > ja.verticalDragMaxHeight)
						Za = ja.verticalDragMaxHeight;
					else if (Za < ja.verticalDragMinHeight)
						Za = ja.verticalDragMinHeight;
					Ha.height(Za + "px");
					Ta = eb - Za;
					G(ya)
				}
			}
			function u(R, Y, ga, la) {
				var ra = "before", Ba = "after";
				if (Y == "os")
					Y = /Mac/.test(navigator.platform) ? "after" : "split";
				if (Y == ra)
					Ba = Y;
				else if (Y == Ba) {
					ra = Y;
					Y = ga;
					ga = la;
					la = Y
				}
				R[ra](ga)[Ba](la)
			}
			function B(R, Y, ga) {
				return function() {
					F(R, Y, this, ga);
					this.blur();
					return false
				}
			}
			function F(R, Y, ga, la) {
				ga = a(ga).addClass("jspActive");
				var ra, Ba = function() {
					R != 0 && I(za + R * ja.arrowButtonSpeed, false);
					Y != 0 && n(ya + Y * ja.arrowButtonSpeed, false)
				}, bb = setInterval(Ba, ja.arrowRepeatFreq);
				Ba();
				ra = la == d ? "mouseup.jsp" : "mouseout.jsp";
				la = la || a("html");
				la.bind(ra, function() {
					ga.removeClass("jspActive");
					clearInterval(bb);
					la.unbind(ra)
				})
			}
			function g() {
				r();
				Oa
						&& Ua.bind("mousedown.jsp", function(R) {
							if (R.originalTarget == d
									|| R.originalTarget == R.currentTarget) {
								var Y = a(this), ga = setInterval(function() {
									var ra = Y.offset();
									ra = R.pageY - ra.top;
									if (ya + Za < ra)
										n(ya + ja.trackClickSpeed);
									else
										ra < ya ? n(ya - ja.trackClickSpeed)
												: la()
								}, ja.trackClickRepeatFreq), la = function() {
									ga && clearInterval(ga);
									ga = null;
									a(document).unbind("mouseup.jsp", la)
								};
								a(document).bind("mouseup.jsp", la);
								return false
							}
						});
				Pa
						&& Qa.bind("mousedown.jsp", function(R) {
							if (R.originalTarget == d
									|| R.originalTarget == R.currentTarget) {
								var Y = a(this), ga = setInterval(function() {
									var ra = Y.offset();
									ra = R.pageX - ra.left;
									if (za + $a < ra)
										I(za + ja.trackClickSpeed);
									else
										ra < za ? I(za - ja.trackClickSpeed)
												: la()
								}, ja.trackClickRepeatFreq), la = function() {
									ga && clearInterval(ga);
									ga = null;
									a(document).unbind("mouseup.jsp", la)
								};
								a(document).bind("mouseup.jsp", la);
								return false
							}
						})
			}
			function r() {
				Qa && Qa.unbind("mousedown.jsp");
				Ua && Ua.unbind("mousedown.jsp")
			}
			function z() {
				a("html")
						.unbind(
								"dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
				Ha && Ha.removeClass("jspActive");
				va && va.removeClass("jspActive")
			}
			function n(R, Y) {
				if (Oa) {
					if (R < 0)
						R = 0;
					else if (R > Ta)
						R = Ta;
					if (Y == d)
						Y = ja.animateScroll;
					if (Y)
						kb.animate(Ha, "top", R, G);
					else {
						Ha.css("top", R);
						G(R)
					}
				}
			}
			function G(R) {
				if (R == d)
					R = Ha.position().top;
				ua.scrollTop(0);
				ya = R;
				var Y = ya == 0, ga = ya == Ta;
				R = -(R / Ta) * (Ja - Aa);
				if (Va != Y || tb != ga) {
					Va = Y;
					tb = ga;
					m.trigger("jsp-arrow-change", [ Va, tb, fb, ub ])
				}
				V(Y, ga);
				qa.css("top", R);
				m.trigger("jsp-scroll-y", [ -R, Y, ga ])
			}
			function I(R, Y) {
				if (Pa) {
					if (R < 0)
						R = 0;
					else if (R > Ya)
						R = Ya;
					if (Y == d)
						Y = ja.animateScroll;
					if (Y)
						kb.animate(va, "left", R, N);
					else {
						va.css("left", R);
						N(R)
					}
				}
			}
			function N(R) {
				if (R == d)
					R = va.position().left;
				ua.scrollTop(0);
				za = R;
				var Y = za == 0, ga = za == Ya;
				R = -(R / Ya) * (cb - Ga);
				if (fb != Y || ub != ga) {
					fb = Y;
					ub = ga;
					m.trigger("jsp-arrow-change", [ Va, tb, fb, ub ])
				}
				X(Y, ga);
				isNaN(R) || qa.css("left", R);
				m.trigger("jsp-scroll-x", [ -R, Y, ga ])
			}
			function V(R, Y) {
				if (ja.showArrows) {
					gb[R ? "addClass" : "removeClass"]("jspDisabled");
					hb[Y ? "addClass" : "removeClass"]("jspDisabled")
				}
			}
			function X(R, Y) {
				if (ja.showArrows) {
					mb[R ? "addClass" : "removeClass"]("jspDisabled");
					nb[Y ? "addClass" : "removeClass"]("jspDisabled")
				}
			}
			function Z(R, Y) {
				n(R / (Ja - Aa) * Ta, Y)
			}
			function sa(R, Y) {
				I(R / (cb - Ga) * Ya, Y)
			}
			function ka(R, Y, ga) {
				var la, ra = 0, Ba, bb;
				try {
					la = a(R)
				} catch (Cb) {
					return
				}
				R = la.outerHeight();
				for (ua.scrollTop(0); !la.is(".jspPane");) {
					ra += la.position().top;
					la = la.offsetParent();
					if (/^body|html$/i.test(la[0].nodeName))
						return
				}
				la = Wa();
				Ba = la + Aa;
				if (ra < la || Y)
					bb = ra - ja.verticalGutter;
				else if (ra + R > Ba)
					bb = ra - Aa + R + ja.verticalGutter;
				bb && Z(bb, ga)
			}
			function Ca() {
				return -qa.position().left
			}
			function Wa() {
				return -qa.position().top
			}
			function ob() {
				ua.unbind(yb).bind(yb, function(R, Y, ga, la) {
					R = za;
					Y = ya;
					I(za + ga * ja.mouseWheelSpeed, false);
					n(ya - la * ja.mouseWheelSpeed, false);
					return R == za && Y == ya
				})
			}
			function pb() {
				ua.unbind(yb)
			}
			function pa() {
				return false
			}
			function Fa() {
				qa.unbind("focusin.jsp").bind("focusin.jsp", function(R) {
					R.target !== qa[0] && ka(R.target, false)
				})
			}
			function Xa() {
				qa.unbind("focusin.jsp")
			}
			function Sa() {
				var R, Y;
				m.attr("tabindex", 0).unbind("keydown.jsp").bind("keydown.jsp",
						function(ga) {
							if (ga.target === m[0]) {
								var la = za, ra = ya, Ba = R ? 2 : 16;
								switch (ga.keyCode) {
								case 40:
									n(ya + Ba, false);
									break;
								case 38:
									n(ya - Ba, false);
									break;
								case 34:
								case 32:
									Z(Wa() + Math.max(32, Aa) - 16);
									break;
								case 33:
									Z(Wa() - Aa + 16);
									break;
								case 35:
									Z(Ja - Aa);
									break;
								case 36:
									Z(0);
									break;
								case 39:
									I(za + Ba, false);
									break;
								case 37:
									I(za - Ba, false);
									break
								}
								if (!(la == za && ra == ya)) {
									R = true;
									clearTimeout(Y);
									Y = setTimeout(function() {
										R = false
									}, 260);
									return false
								}
							}
						});
				if (ja.hideFocus) {
					m.css("outline", "none");
					"hideFocus" in ua[0] && m.attr("hideFocus", true)
				} else {
					m.css("outline", "");
					"hideFocus" in ua[0] && m.attr("hideFocus", false)
				}
			}
			function Da() {
				m.attr("tabindex", "-1").removeAttr("tabindex").unbind(
						"keydown.jsp")
			}
			function zb() {
				if (location.hash && location.hash.length > 1) {
					var R, Y;
					try {
						R = a(location.hash)
					} catch (ga) {
						return
					}
					if (R.length && qa.find(R))
						if (ua.scrollTop() == 0)
							Y = setInterval(function() {
								if (ua.scrollTop() > 0) {
									ka(location.hash, true);
									a(document).scrollTop(ua.position().top);
									clearInterval(Y)
								}
							}, 50);
						else {
							ka(location.hash, true);
							a(document).scrollTop(ua.position().top)
						}
				}
			}
			function jb() {
				a("a.jspHijack").unbind("click.jsp-hijack").removeClass(
						"jspHijack")
			}
			function wb() {
				jb();
				a("a[href^=#]")
						.addClass("jspHijack")
						.bind(
								"click.jsp-hijack",
								function() {
									var R = this.href.split("#");
									if (R.length > 1) {
										R = R[1];
										if (R.length > 0
												&& qa.find("#" + R).length > 0) {
											ka("#" + R, true);
											return false
										}
									}
								})
			}
			var ja, kb = this, qa, Ga, Aa, ua, cb, Ja, qb, lb, Oa, Pa, Ha, Ta, ya, va, Ya, za, xb, Ua, rb, eb, Za, gb, hb, db, Qa, Ra, $a, mb, nb, sb, Ab, ab, vb, Va = true, fb = true, tb = false, ub = false, yb = a.fn.mwheelIntent ? "mwheelIntent.jsp"
					: "mousewheel.jsp";
			Ab = m.css("paddingTop") + " " + m.css("paddingRight") + " "
					+ m.css("paddingBottom") + " " + m.css("paddingLeft");
			ab = (parseInt(m.css("paddingLeft")) || 0)
					+ (parseInt(m.css("paddingRight")) || 0);
			v(p);
			a.extend(kb, {
				reinitialise : function(R) {
					R = a.extend({}, R, ja);
					v(R)
				},
				scrollToElement : function(R, Y, ga) {
					ka(R, Y, ga)
				},
				scrollTo : function(R, Y, ga) {
					sa(R, ga);
					Z(Y, ga)
				},
				scrollToX : function(R, Y) {
					sa(R, Y)
				},
				scrollToY : function(R, Y) {
					Z(R, Y)
				},
				scrollBy : function(R, Y, ga) {
					kb.scrollByX(R, ga);
					kb.scrollByY(Y, ga)
				},
				scrollByX : function(R, Y) {
					R = (Ca() + R) / (cb - Ga);
					I(R * Ya, Y)
				},
				scrollByY : function(R, Y) {
					R = (Wa() + R) / (Ja - Aa);
					n(R * Ta, Y)
				},
				animate : function(R, Y, ga, la) {
					var ra = {};
					ra[Y] = ga;
					R.animate(ra, {
						duration : ja.animateDuration,
						ease : ja.animateEase,
						queue : false,
						step : la
					})
				},
				getContentPositionX : function() {
					return Ca()
				},
				getContentPositionY : function() {
					return Wa()
				},
				getIsScrollableH : function() {
					return Pa
				},
				getIsScrollableV : function() {
					return Oa
				},
				getContentPane : function() {
					return qa
				},
				scrollToBottom : function(R) {
					n(Ta, R)
				},
				hijackInternalLinks : function() {
					wb()
				}
			})
		}
		e = a.extend({}, a.fn.jScrollPane.defaults, e);
		var l;
		this.each(function() {
			var m = a(this), p = m.data("jsp");
			if (p)
				p.reinitialise(e);
			else {
				p = new f(m, e);
				m.data("jsp", p)
			}
			l = l ? l.add(m) : m
		});
		return l
	};
	a.fn.jScrollPane.defaults = {
		showArrows : false,
		maintainPosition : true,
		clickOnTrack : true,
		autoReinitialise : false,
		autoReinitialiseDelay : 500,
		verticalDragMinHeight : 0,
		verticalDragMaxHeight : 99999,
		horizontalDragMinWidth : 0,
		horizontalDragMaxWidth : 99999,
		animateScroll : false,
		animateDuration : 300,
		animateEase : "linear",
		hijackInternalLinks : false,
		verticalGutter : 4,
		horizontalGutter : 4,
		mouseWheelSpeed : 10,
		arrowButtonSpeed : 10,
		arrowRepeatFreq : 100,
		arrowScrollOnHover : false,
		trackClickSpeed : 30,
		trackClickRepeatFreq : 100,
		verticalArrowPositions : "split",
		horizontalArrowPositions : "split",
		enableKeyboardNavigation : true,
		hideFocus : false
	}
})(jQuery, this);
(function(a) {
	function b(g, r, z) {
		var n = this;
		n.id = z;
		n.options = r;
		n.status = {
			animated : false,
			rendered : false,
			disabled : false,
			focused : false
		};
		n.elements = {
			target : g.addClass(n.options.style.classes.target),
			tooltip : null,
			wrapper : null,
			content : null,
			contentWrapper : null,
			title : null,
			button : null,
			tip : null,
			bgiframe : null
		};
		n.cache = {
			mouse : {},
			position : {},
			toggle : 0
		};
		n.timers = {};
		a
				.extend(
						n,
						n.options.api,
						{
							show : function(G) {
								function I() {
									n.options.position.type !== "static"
											&& n.focus();
									n.onShow.call(n, G);
									a.browser.msie
											&& n.elements.tooltip.get(0).style
													.removeAttribute("filter")
								}
								var N;
								if (!n.status.rendered)
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"show");
								if (n.elements.tooltip.css("display") !== "none")
									return n;
								n.elements.tooltip.stop(true, false);
								if (n.beforeShow.call(n, G) === false)
									return n;
								n.cache.toggle = 1;
								n.options.position.type !== "static"
										&& n
												.updatePosition(
														G,
														n.options.show.effect.length > 0);
								if (typeof n.options.show.solo == "object")
									N = a(n.options.show.solo);
								else if (n.options.show.solo === true)
									N = a("div.qtip").not(n.elements.tooltip);
								N
										&& N
												.each(function() {
													a(this).qtip("api").status.rendered === true
															&& a(this).qtip(
																	"api")
																	.hide()
												});
								if (typeof n.options.show.effect.type == "function") {
									n.options.show.effect.type.call(
											n.elements.tooltip,
											n.options.show.effect.length);
									n.elements.tooltip.queue(function() {
										I();
										a(this).dequeue()
									})
								} else {
									switch (n.options.show.effect.type
											.toLowerCase()) {
									case "fade":
										n.elements.tooltip
												.fadeIn(
														n.options.show.effect.length,
														I);
										break;
									case "slide":
										n.elements.tooltip
												.slideDown(
														n.options.show.effect.length,
														function() {
															I();
															n.options.position.type !== "static"
																	&& n
																			.updatePosition(
																					G,
																					true)
														});
										break;
									case "grow":
										n.elements.tooltip
												.show(
														n.options.show.effect.length,
														I);
										break;
									default:
										n.elements.tooltip.show(null, I);
										break
									}
									n.elements.tooltip
											.addClass(n.options.style.classes.active)
								}
								return a.fn.qtip.log.error
										.call(
												n,
												1,
												a.fn.qtip.constants.EVENT_SHOWN,
												"show")
							},
							hide : function(G) {
								function I() {
									n.onHide.call(n, G)
								}
								if (n.status.rendered) {
									if (n.elements.tooltip.css("display") === "none")
										return n
								} else
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"hide");
								clearTimeout(n.timers.show);
								n.elements.tooltip.stop(true, false);
								if (n.beforeHide.call(n, G) === false)
									return n;
								n.cache.toggle = 0;
								if (typeof n.options.hide.effect.type == "function") {
									n.options.hide.effect.type.call(
											n.elements.tooltip,
											n.options.hide.effect.length);
									n.elements.tooltip.queue(function() {
										I();
										a(this).dequeue()
									})
								} else {
									switch (n.options.hide.effect.type
											.toLowerCase()) {
									case "fade":
										n.elements.tooltip
												.fadeOut(
														n.options.hide.effect.length,
														I);
										break;
									case "slide":
										n.elements.tooltip
												.slideUp(
														n.options.hide.effect.length,
														I);
										break;
									case "grow":
										n.elements.tooltip
												.hide(
														n.options.hide.effect.length,
														I);
										break;
									default:
										n.elements.tooltip.hide(null, I);
										break
									}
									n.elements.tooltip
											.removeClass(n.options.style.classes.active)
								}
								return a.fn.qtip.log.error.call(n, 1,
										a.fn.qtip.constants.EVENT_HIDDEN,
										"hide")
							},
							updatePosition : function(G, I) {
								var N, V, X, Z, sa, ka, Ca;
								if (n.status.rendered) {
									if (n.options.position.type == "static")
										return a.fn.qtip.log.error
												.call(
														n,
														1,
														a.fn.qtip.constants.CANNOT_POSITION_STATIC,
														"updatePosition")
								} else
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"updatePosition");
								V = {
									position : {
										left : 0,
										top : 0
									},
									dimensions : {
										height : 0,
										width : 0
									},
									corner : n.options.position.corner.target
								};
								X = {
									position : n.getPosition(),
									dimensions : n.getDimensions(),
									corner : n.options.position.corner.tooltip
								};
								if (n.options.position.target !== "mouse") {
									if (n.options.position.target.get(0).nodeName
											.toLowerCase() == "area") {
										Z = n.options.position.target.attr(
												"coords").split(",");
										for (N = 0; N < Z.length; N++)
											Z[N] = parseInt(Z[N]);
										N = n.options.position.target.parent(
												"map").attr("name");
										sa = a('img[usemap="#' + N + '"]:first')
												.offset();
										V.position = {
											left : Math.floor(sa.left + Z[0]),
											top : Math.floor(sa.top + Z[1])
										};
										switch (n.options.position.target.attr(
												"shape").toLowerCase()) {
										case "rect":
											V.dimensions = {
												width : Math.ceil(Math.abs(Z[2]
														- Z[0])),
												height : Math.ceil(Math
														.abs(Z[3] - Z[1]))
											};
											break;
										case "circle":
											V.dimensions = {
												width : Z[2] + 1,
												height : Z[2] + 1
											};
											break;
										case "poly":
											V.dimensions = {
												width : Z[0],
												height : Z[1]
											};
											for (N = 0; N < Z.length; N++)
												if (N % 2 == 0) {
													if (Z[N] > V.dimensions.width)
														V.dimensions.width = Z[N];
													if (Z[N] < Z[0])
														V.position.left = Math
																.floor(sa.left
																		+ Z[N])
												} else {
													if (Z[N] > V.dimensions.height)
														V.dimensions.height = Z[N];
													if (Z[N] < Z[1])
														V.position.top = Math
																.floor(sa.top
																		+ Z[N])
												}
											V.dimensions.width -= V.position.left
													- sa.left;
											V.dimensions.height -= V.position.top
													- sa.top;
											break;
										default:
											return a.fn.qtip.log.error
													.call(
															n,
															4,
															a.fn.qtip.constants.INVALID_AREA_SHAPE,
															"updatePosition")
										}
										V.dimensions.width -= 2;
										V.dimensions.height -= 2
									} else if (n.options.position.target
											.add(document.body).length === 1) {
										V.position = {
											left : a(document).scrollLeft(),
											top : a(document).scrollTop()
										};
										V.dimensions = {
											height : a(window).height(),
											width : a(window).width()
										}
									} else {
										V.position = typeof n.options.position.target
												.attr("qtip") !== "undefined" ? n.options.position.target
												.qtip("api").cache.position
												: n.options.position.target
														.offset();
										V.dimensions = {
											height : n.options.position.target
													.outerHeight(),
											width : n.options.position.target
													.outerWidth()
										}
									}
									ka = a.extend({}, V.position);
									if (V.corner.search(/right/i) !== -1)
										ka.left += V.dimensions.width;
									if (V.corner.search(/bottom/i) !== -1)
										ka.top += V.dimensions.height;
									if (V.corner
											.search(/((top|bottom)Middle)|center/) !== -1)
										ka.left += V.dimensions.width / 2;
									if (V.corner
											.search(/((left|right)Middle)|center/) !== -1)
										ka.top += V.dimensions.height / 2
								} else {
									V.position = ka = {
										left : n.cache.mouse.x,
										top : n.cache.mouse.y
									};
									V.dimensions = {
										height : 1,
										width : 1
									}
								}
								if (X.corner.search(/right/i) !== -1)
									ka.left -= X.dimensions.width;
								if (X.corner.search(/bottom/i) !== -1)
									ka.top -= X.dimensions.height;
								if (X.corner
										.search(/((top|bottom)Middle)|center/) !== -1)
									ka.left -= X.dimensions.width / 2;
								if (X.corner
										.search(/((left|right)Middle)|center/) !== -1)
									ka.top -= X.dimensions.height / 2;
								Z = a.browser.msie ? 1 : 0;
								a.browser.msie
										&& parseInt(a.browser.version.charAt(0));
								if (n.options.style.border.radius > 0) {
									if (X.corner.search(/Left/) !== -1)
										ka.left -= n.options.style.border.radius;
									else if (X.corner.search(/Right/) !== -1)
										ka.left += n.options.style.border.radius;
									if (X.corner.search(/Top/) !== -1)
										ka.top -= n.options.style.border.radius;
									else if (X.corner.search(/Bottom/) !== -1)
										ka.top += n.options.style.border.radius
								}
								if (Z) {
									if (X.corner.search(/top/) !== -1)
										ka.top -= Z;
									else if (X.corner.search(/bottom/) !== -1)
										ka.top += Z;
									if (X.corner.search(/left/) !== -1)
										ka.left -= Z;
									else if (X.corner.search(/right/) !== -1)
										ka.left += Z;
									if (X.corner
											.search(/leftMiddle|rightMiddle/) !== -1)
										ka.top -= 1
								}
								if (n.options.position.adjust.screen === true)
									ka = A.call(n, ka, V, X);
								if (n.options.position.target === "mouse"
										&& n.options.position.adjust.mouse === true) {
									V = n.options.position.adjust.screen === true
											&& n.elements.tip ? n.elements.tip
											.attr("rel")
											: n.options.position.corner.tooltip;
									ka.left += V.search(/right/i) !== -1 ? -6
											: 6;
									ka.top += V.search(/bottom/i) !== -1 ? -6
											: 6
								}
								!n.elements.bgiframe
										&& a.browser.msie
										&& parseInt(a.browser.version.charAt(0)) == 6
										&& a("select, object")
												.each(
														function() {
															Ca = a(this)
																	.offset();
															Ca.bottom = Ca.top
																	+ a(this)
																			.height();
															Ca.right = Ca.left
																	+ a(this)
																			.width();
															ka.top
																	+ X.dimensions.height >= Ca.top
																	&& ka.left
																			+ X.dimensions.width >= Ca.left
																	&& F
																			.call(n)
														});
								ka.left += n.options.position.adjust.x;
								ka.top += n.options.position.adjust.y;
								V = n.getPosition();
								if (ka.left != V.left || ka.top != V.top) {
									V = n.beforePositionUpdate.call(n, G);
									if (V === false)
										return n;
									n.cache.position = ka;
									if (I === true) {
										n.status.animated = true;
										n.elements.tooltip.animate(ka, 200,
												"swing", function() {
													n.status.animated = false
												})
									} else
										n.elements.tooltip.css(ka);
									n.onPositionUpdate.call(n, G);
									typeof G !== "undefined"
											&& G.type
											&& G.type !== "mousemove"
											&& a.fn.qtip.log.error
													.call(
															n,
															1,
															a.fn.qtip.constants.EVENT_POSITION_UPDATED,
															"updatePosition")
								}
								return n
							},
							updateWidth : function(G) {
								var I;
								if (n.status.rendered) {
									if (G && typeof G !== "number")
										return a.fn.qtip.log.error
												.call(
														n,
														2,
														"newWidth must be of type number",
														"updateWidth")
								} else
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"updateWidth");
								I = n.elements.contentWrapper.siblings().add(
										n.elements.tip).add(n.elements.button);
								if (!G)
									if (typeof n.options.style.width.value == "number")
										G = n.options.style.width.value;
									else {
										n.elements.tooltip.css({
											width : "auto"
										});
										I.hide();
										a.browser.msie
												&& n.elements.wrapper
														.add(
																n.elements.contentWrapper
																		.children())
														.css({
															zoom : "normal"
														});
										G = n.getDimensions().width + 1;
										if (!n.options.style.width.value) {
											if (G > n.options.style.width.max)
												G = n.options.style.width.max;
											if (G < n.options.style.width.min)
												G = n.options.style.width.min
										}
									}
								if (G % 2 !== 0)
									G -= 1;
								n.elements.tooltip.width(G);
								I.show();
								n.options.style.border.radius
										&& n.elements.tooltip
												.find(".qtip-betweenCorners")
												.each(
														function() {
															a(this)
																	.width(
																			G
																					- n.options.style.border.radius
																					* 2)
														});
								if (a.browser.msie) {
									n.elements.wrapper.add(
											n.elements.contentWrapper
													.children()).css({
										zoom : "1"
									});
									n.elements.wrapper.width(G);
									n.elements.bgiframe
											&& n.elements.bgiframe
													.width(G)
													.height(
															n.getDimensions.height)
								}
								return a.fn.qtip.log.error
										.call(
												n,
												1,
												a.fn.qtip.constants.EVENT_WIDTH_UPDATED,
												"updateWidth")
							},
							updateStyle : function(G) {
								var I, N, V, X;
								if (n.status.rendered) {
									if (typeof G !== "string"
											|| !a.fn.qtip.styles[G])
										return a.fn.qtip.log.error
												.call(
														n,
														2,
														a.fn.qtip.constants.STYLE_NOT_DEFINED,
														"updateStyle")
								} else
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"updateStyle");
								n.options.style = s.call(n,
										a.fn.qtip.styles[G],
										n.options.user.style);
								n.elements.content.css(M(n.options.style));
								n.options.content.title.text !== false
										&& n.elements.title.css(M(
												n.options.style.title, true));
								n.elements.contentWrapper.css({
									borderColor : n.options.style.border.color
								});
								if (n.options.style.tip.corner !== false)
									if (a("<canvas>").get(0).getContext) {
										G = n.elements.tooltip
												.find(".qtip-tip canvas:first");
										N = G.get(0).getContext("2d");
										N.clearRect(0, 0, 300, 300);
										V = G.parent("div[rel]:first").attr(
												"rel");
										X = u(V,
												n.options.style.tip.size.width,
												n.options.style.tip.size.height);
										m
												.call(
														n,
														G,
														X,
														n.options.style.tip.color
																|| n.options.style.border.color)
									} else if (a.browser.msie) {
										G = n.elements.tooltip
												.find('.qtip-tip [nodeName="shape"]');
										G
												.attr(
														"fillcolor",
														n.options.style.tip.color
																|| n.options.style.border.color)
									}
								if (n.options.style.border.radius > 0) {
									n.elements.tooltip
											.find(".qtip-betweenCorners")
											.css(
													{
														backgroundColor : n.options.style.border.color
													});
									if (a("<canvas>").get(0).getContext) {
										I = B(n.options.style.border.radius);
										n.elements.tooltip
												.find(".qtip-wrapper canvas")
												.each(
														function() {
															N = a(this)
																	.get(0)
																	.getContext(
																			"2d");
															N.clearRect(0, 0,
																	300, 300);
															V = a(this)
																	.parent(
																			"div[rel]:first")
																	.attr("rel");
															f
																	.call(
																			n,
																			a(this),
																			I[V],
																			n.options.style.border.radius,
																			n.options.style.border.color)
														})
									} else
										a.browser.msie
												&& n.elements.tooltip
														.find(
																'.qtip-wrapper [nodeName="arc"]')
														.each(
																function() {
																	a(this)
																			.attr(
																					"fillcolor",
																					n.options.style.border.color)
																})
								}
								return a.fn.qtip.log.error
										.call(
												n,
												1,
												a.fn.qtip.constants.EVENT_STYLE_UPDATED,
												"updateStyle")
							},
							updateContent : function(G, I) {
								function N() {
									n.updateWidth();
									if (I !== false) {
										n.options.position.type !== "static"
												&& n
														.updatePosition(
																n.elements.tooltip
																		.is(":visible"),
																true);
										n.options.style.tip.corner !== false
												&& p.call(n)
									}
								}
								var V, X, Z;
								if (n.status.rendered) {
									if (!G)
										return a.fn.qtip.log.error
												.call(
														n,
														2,
														a.fn.qtip.constants.NO_CONTENT_PROVIDED,
														"updateContent")
								} else
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"updateContent");
								V = n.beforeContentUpdate.call(n, G);
								if (typeof V == "string")
									G = V;
								else if (V === false)
									return;
								a.browser.msie
										&& n.elements.contentWrapper.children()
												.css({
													zoom : "normal"
												});
								G.jquery && G.length > 0 ? G.clone(true)
										.appendTo(n.elements.content).show()
										: n.elements.content.html(G);
								X = n.elements.content
										.find("img[complete=false]");
								if (X.length > 0) {
									Z = 0;
									X.each(function() {
										a(
												'<img src="'
														+ a(this).attr("src")
														+ '" />').load(
												function() {
													++Z == X.length && N()
												})
									})
								} else
									N();
								n.onContentUpdate.call(n);
								return a.fn.qtip.log.error
										.call(
												n,
												1,
												a.fn.qtip.constants.EVENT_CONTENT_UPDATED,
												"loadContent")
							},
							loadContent : function(G, I, N) {
								function V(X) {
									n.onContentLoad.call(n);
									a.fn.qtip.log.error
											.call(
													n,
													1,
													a.fn.qtip.constants.EVENT_CONTENT_LOADED,
													"loadContent");
									n.updateContent(X)
								}
								if (!n.status.rendered)
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"loadContent");
								if (n.beforeContentLoad.call(n) === false)
									return n;
								N == "post" ? a.post(G, I, V) : a.get(G, I, V);
								return n
							},
							updateTitle : function(G) {
								if (n.status.rendered) {
									if (!G)
										return a.fn.qtip.log.error
												.call(
														n,
														2,
														a.fn.qtip.constants.NO_CONTENT_PROVIDED,
														"updateTitle")
								} else
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"updateTitle");
								returned = n.beforeTitleUpdate.call(n);
								if (returned === false)
									return n;
								if (n.elements.button)
									n.elements.button = n.elements.button
											.clone(true);
								n.elements.title.html(G);
								n.elements.button
										&& n.elements.title
												.prepend(n.elements.button);
								n.onTitleUpdate.call(n);
								return a.fn.qtip.log.error
										.call(
												n,
												1,
												a.fn.qtip.constants.EVENT_TITLE_UPDATED,
												"updateTitle")
							},
							focus : function(G) {
								var I, N, V;
								if (n.status.rendered) {
									if (n.options.position.type == "static")
										return a.fn.qtip.log.error
												.call(
														n,
														1,
														a.fn.qtip.constants.CANNOT_FOCUS_STATIC,
														"focus")
								} else
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"focus");
								I = parseInt(n.elements.tooltip.css("z-index"));
								N = 6E3 + a("div.qtip[qtip]").length - 1;
								if (!n.status.focused && I !== N) {
									I = n.beforeFocus.call(n, G);
									if (I === false)
										return n;
									a("div.qtip[qtip]")
											.not(n.elements.tooltip)
											.each(
													function() {
														if (a(this).qtip("api").status.rendered === true) {
															V = parseInt(a(this)
																	.css(
																			"z-index"));
															typeof V == "number"
																	&& V > -1
																	&& a(this)
																			.css(
																					{
																						zIndex : parseInt(a(
																								this)
																								.css(
																										"z-index")) - 1
																					});
															a(this).qtip("api").status.focused = false
														}
													});
									n.elements.tooltip.css({
										zIndex : N
									});
									n.status.focused = true;
									n.onFocus.call(n, G);
									a.fn.qtip.log.error.call(n, 1,
											a.fn.qtip.constants.EVENT_FOCUSED,
											"focus")
								}
								return n
							},
							disable : function(G) {
								if (!n.status.rendered)
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"disable");
								if (G)
									if (n.status.disabled)
										a.fn.qtip.log.error
												.call(
														n,
														1,
														a.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED,
														"disable");
									else {
										n.status.disabled = true;
										a.fn.qtip.log.error
												.call(
														n,
														1,
														a.fn.qtip.constants.EVENT_DISABLED,
														"disable")
									}
								else if (n.status.disabled) {
									n.status.disabled = false;
									a.fn.qtip.log.error.call(n, 1,
											a.fn.qtip.constants.EVENT_ENABLED,
											"disable")
								} else
									a.fn.qtip.log.error
											.call(
													n,
													1,
													a.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED,
													"disable");
								return n
							},
							destroy : function() {
								var G, I;
								if (n.beforeDestroy.call(n) === false)
									return n;
								if (n.status.rendered) {
									n.options.show.when.target.unbind(
											"mousemove.qtip", n.updatePosition);
									n.options.show.when.target.unbind(
											"mouseout.qtip", n.hide);
									n.options.show.when.target
											.unbind(n.options.show.when.event
													+ ".qtip");
									n.options.hide.when.target
											.unbind(n.options.hide.when.event
													+ ".qtip");
									n.elements.tooltip
											.unbind(n.options.hide.when.event
													+ ".qtip");
									n.elements.tooltip.unbind("mouseover.qtip",
											n.focus);
									n.elements.tooltip.remove()
								} else
									n.options.show.when.target
											.unbind(n.options.show.when.event
													+ ".qtip-create");
								if (typeof n.elements.target.data("qtip") == "object") {
									I = n.elements.target.data("qtip").interfaces;
									if (typeof I == "object" && I.length > 0)
										for (G = 0; G < I.length - 1; G++)
											I[G].id == n.id && I.splice(G, 1)
								}
								delete a.fn.qtip.interfaces[n.id];
								if (typeof I == "object" && I.length > 0)
									n.elements.target.data("qtip").current = I.length - 1;
								else
									n.elements.target.removeData("qtip");
								n.onDestroy.call(n);
								a.fn.qtip.log.error.call(n, 1,
										a.fn.qtip.constants.EVENT_DESTROYED,
										"destroy");
								return n.elements.target
							},
							getPosition : function() {
								var G, I;
								if (!n.status.rendered)
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"getPosition");
								(G = n.elements.tooltip.css("display") !== "none" ? false
										: true)
										&& n.elements.tooltip.css({
											visiblity : "hidden"
										}).show();
								I = n.elements.tooltip.offset();
								G && n.elements.tooltip.css({
									visiblity : "visible"
								}).hide();
								return I
							},
							getDimensions : function() {
								var G, I;
								if (!n.status.rendered)
									return a.fn.qtip.log.error
											.call(
													n,
													2,
													a.fn.qtip.constants.TOOLTIP_NOT_RENDERED,
													"getDimensions");
								(G = !n.elements.tooltip.is(":visible") ? true
										: false)
										&& n.elements.tooltip.css({
											visiblity : "hidden"
										}).show();
								I = {
									height : n.elements.tooltip.outerHeight(),
									width : n.elements.tooltip.outerWidth()
								};
								G && n.elements.tooltip.css({
									visiblity : "visible"
								}).hide();
								return I
							}
						})
	}
	function d() {
		var g, r, z, n;
		g = this;
		g.beforeRender.call(g);
		g.status.rendered = true;
		g.elements.tooltip = '<div qtip="'
				+ g.id
				+ '" class="qtip '
				+ (g.options.style.classes.tooltip || g.options.style)
				+ '"style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;position:'
				+ g.options.position.type
				+ ';">  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">    <div class="qtip-contentWrapper" style="overflow:hidden;">       <div class="qtip-content '
				+ g.options.style.classes.content
				+ '"></div></div></div></div>';
		g.elements.tooltip = a(g.elements.tooltip);
		g.elements.tooltip.appendTo(g.options.position.container);
		g.elements.tooltip.data("qtip", {
			current : 0,
			interfaces : [ g ]
		});
		g.elements.wrapper = g.elements.tooltip.children("div:first");
		g.elements.contentWrapper = g.elements.wrapper.children("div:first")
				.css({
					background : g.options.style.background
				});
		g.elements.content = g.elements.contentWrapper.children("div:first")
				.css(M(g.options.style));
		a.browser.msie && g.elements.wrapper.add(g.elements.content).css({
			zoom : 1
		});
		g.options.hide.when.event == "unfocus"
				&& g.elements.tooltip.attr("unfocus", true);
		typeof g.options.style.width.value == "number" && g.updateWidth();
		if (a("<canvas>").get(0).getContext || a.browser.msie) {
			g.options.style.border.radius > 0 ? e.call(g)
					: g.elements.contentWrapper.css({
						border : g.options.style.border.width + "px solid "
								+ g.options.style.border.color
					});
			g.options.style.tip.corner !== false && l.call(g)
		} else {
			g.elements.contentWrapper.css({
				border : g.options.style.border.width + "px solid "
						+ g.options.style.border.color
			});
			g.options.style.border.radius = 0;
			g.options.style.tip.corner = false;
			a.fn.qtip.log.error.call(g, 2,
					a.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED, "render")
		}
		if (typeof g.options.content.text == "string"
				&& g.options.content.text.length > 0
				|| g.options.content.text.jquery
				&& g.options.content.text.length > 0)
			r = g.options.content.text;
		else if (typeof g.elements.target.attr("title") == "string"
				&& g.elements.target.attr("title").length > 0) {
			r = g.elements.target.attr("title").replace("\\n", "<br />");
			g.elements.target.attr("title", "")
		} else if (typeof g.elements.target.attr("alt") == "string"
				&& g.elements.target.attr("alt").length > 0) {
			r = g.elements.target.attr("alt").replace("\\n", "<br />");
			g.elements.target.attr("alt", "")
		} else {
			r = " ";
			a.fn.qtip.log.error.call(g, 1,
					a.fn.qtip.constants.NO_VALID_CONTENT, "render")
		}
		g.options.content.title.text !== false && v.call(g);
		g.updateContent(r);
		y.call(g);
		g.options.show.ready === true && g.show();
		if (g.options.content.url !== false) {
			r = g.options.content.url;
			z = g.options.content.data;
			n = g.options.content.method || "get";
			g.loadContent(r, z, n)
		}
		g.onRender.call(g);
		a.fn.qtip.log.error.call(g, 1, a.fn.qtip.constants.EVENT_RENDERED,
				"render")
	}
	function e() {
		var g, r, z, n, G, I, N, V, X;
		g = this;
		g.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove();
		z = g.options.style.border.width;
		n = g.options.style.border.radius;
		G = g.options.style.border.color || g.options.style.tip.color;
		I = B(n);
		N = {};
		for (r in I) {
			N[r] = '<div rel="' + r + '" style="'
					+ (r.search(/Left/) !== -1 ? "left" : "right")
					+ ":0; position:absolute; height:" + n + "px; width:" + n
					+ 'px; overflow:hidden; line-height:0.1px; font-size:1px">';
			if (a("<canvas>").get(0).getContext)
				N[r] += '<canvas height="' + n + '" width="' + n
						+ '" style="vertical-align: top"></canvas>';
			else if (a.browser.msie) {
				V = n * 2 + 3;
				N[r] += '<v:arc stroked="false" fillcolor="'
						+ G
						+ '" startangle="'
						+ I[r][0]
						+ '" endangle="'
						+ I[r][1]
						+ '" style="width:'
						+ V
						+ "px; height:"
						+ V
						+ "px; margin-top:"
						+ (r.search(/bottom/) !== -1 ? -2 : -1)
						+ "px; margin-left:"
						+ (r.search(/Right/) !== -1 ? I[r][2] - 3.5 : -1)
						+ 'px; vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'
			}
			N[r] += "</div>"
		}
		r = g.getDimensions().width - Math.max(z, n) * 2;
		r = '<div class="qtip-betweenCorners" style="height:' + n
				+ "px; width:" + r + "px; overflow:hidden; background-color:"
				+ G + '; line-height:0.1px; font-size:1px;">';
		g.elements.wrapper
				.prepend('<div class="qtip-borderTop" dir="ltr" style="height:'
						+ n + "px; margin-left:" + n
						+ 'px; line-height:0.1px; font-size:1px; padding:0;">'
						+ N.topLeft + N.topRight + r);
		g.elements.wrapper
				.append('<div class="qtip-borderBottom" dir="ltr" style="height:'
						+ n
						+ "px; margin-left:"
						+ n
						+ 'px; line-height:0.1px; font-size:1px; padding:0;">'
						+ N.bottomLeft + N.bottomRight + r);
		if (a("<canvas>").get(0).getContext)
			g.elements.wrapper.find("canvas").each(function() {
				X = I[a(this).parent("[rel]:first").attr("rel")];
				f.call(g, a(this), X, n, G)
			});
		else
			a.browser.msie
					&& g.elements.tooltip
							.append('<v:image style="behavior:url(#default#VML);"></v:image>');
		N = Math.max(n, n + (z - n));
		z = Math.max(z - n, 0);
		g.elements.contentWrapper.css({
			border : "0px solid " + G,
			borderWidth : z + "px " + N + "px"
		})
	}
	function f(g, r, z, n) {
		g = g.get(0).getContext("2d");
		g.fillStyle = n;
		g.beginPath();
		g.arc(r[0], r[1], z, 0, Math.PI * 2, false);
		g.fill()
	}
	function l(g) {
		var r, z, n, G, I;
		r = this;
		r.elements.tip !== null && r.elements.tip.remove();
		z = r.options.style.tip.color || r.options.style.border.color;
		if (r.options.style.tip.corner !== false) {
			if (!g)
				g = r.options.style.tip.corner;
			n = u(g, r.options.style.tip.size.width,
					r.options.style.tip.size.height);
			r.elements.tip = '<div class="' + r.options.style.classes.tip
					+ '" dir="ltr" rel="' + g
					+ '" style="position:absolute; height:'
					+ r.options.style.tip.size.height + "px; width:"
					+ r.options.style.tip.size.width
					+ 'px; margin:0 auto; line-height:0.1px; font-size:1px;">';
			if (a("<canvas>").get(0).getContext)
				r.elements.tip += '<canvas height="'
						+ r.options.style.tip.size.height + '" width="'
						+ r.options.style.tip.size.width + '"></canvas>';
			else if (a.browser.msie) {
				G = r.options.style.tip.size.width + ","
						+ r.options.style.tip.size.height;
				I = "m" + n[0][0] + "," + n[0][1];
				I += " l" + n[1][0] + "," + n[1][1];
				I += " " + n[2][0] + "," + n[2][1];
				I += " xe";
				r.elements.tip += '<v:shape fillcolor="'
						+ z
						+ '" stroked="false" filled="true" path="'
						+ I
						+ '" coordsize="'
						+ G
						+ '" style="width:'
						+ r.options.style.tip.size.width
						+ "px; height:"
						+ r.options.style.tip.size.height
						+ "px; line-height:0.1px; display:inline-block; behavior:url(#default#VML); vertical-align:"
						+ (g.search(/top/) !== -1 ? "bottom" : "top")
						+ '"></v:shape>';
				r.elements.tip += '<v:image style="behavior:url(#default#VML);"></v:image>';
				r.elements.contentWrapper.css("position", "relative")
			}
			r.elements.tooltip.prepend(r.elements.tip + "</div>");
			r.elements.tip = r.elements.tooltip.find(
					"." + r.options.style.classes.tip).eq(0);
			a("<canvas>").get(0).getContext
					&& m.call(r, r.elements.tip.find("canvas:first"), n, z);
			g.search(/top/) !== -1 && a.browser.msie
					&& parseInt(a.browser.version.charAt(0)) === 6
					&& r.elements.tip.css({
						marginTop : -4
					});
			p.call(r, g)
		}
	}
	function m(g, r, z) {
		g = g.get(0).getContext("2d");
		g.fillStyle = z;
		g.beginPath();
		g.moveTo(r[0][0], r[0][1]);
		g.lineTo(r[1][0], r[1][1]);
		g.lineTo(r[2][0], r[2][1]);
		g.fill()
	}
	function p(g) {
		var r, z;
		r = this;
		if (!(r.options.style.tip.corner === false || !r.elements.tip)) {
			g || (g = r.elements.tip.attr("rel"));
			z = positionAdjust = a.browser.msie ? 1 : 0;
			r.elements.tip.css(g.match(/left|right|top|bottom/)[0], 0);
			if (g.search(/top|bottom/) !== -1) {
				if (a.browser.msie)
					positionAdjust = parseInt(a.browser.version.charAt(0)) === 6 ? g
							.search(/top/) !== -1 ? -3 : 1
							: g.search(/top/) !== -1 ? 1 : 2;
				if (g.search(/Middle/) !== -1)
					r.elements.tip.css({
						left : "50%",
						marginLeft : -(r.options.style.tip.size.width / 2)
					});
				else if (g.search(/Left/) !== -1)
					r.elements.tip.css({
						left : r.options.style.border.radius - z
					});
				else
					g.search(/Right/) !== -1 && r.elements.tip.css({
						right : r.options.style.border.radius + z
					});
				g.search(/top/) !== -1 ? r.elements.tip.css({
					top : -positionAdjust
				}) : r.elements.tip.css({
					bottom : positionAdjust
				})
			} else if (g.search(/left|right/) !== -1) {
				if (a.browser.msie)
					positionAdjust = parseInt(a.browser.version.charAt(0)) === 6 ? 1
							: g.search(/left/) !== -1 ? 1 : 2;
				if (g.search(/Middle/) !== -1)
					r.elements.tip.css({
						top : "50%",
						marginTop : -(r.options.style.tip.size.height / 2)
					});
				else if (g.search(/Top/) !== -1)
					r.elements.tip.css({
						top : r.options.style.border.radius - z
					});
				else
					g.search(/Bottom/) !== -1 && r.elements.tip.css({
						bottom : r.options.style.border.radius + z
					});
				g.search(/left/) !== -1 ? r.elements.tip.css({
					left : -positionAdjust
				}) : r.elements.tip.css({
					right : positionAdjust
				})
			}
			g = "padding-" + g.match(/left|right|top|bottom/)[0];
			z = r.options.style.tip.size[g.search(/left|right/) !== -1 ? "width"
					: "height"];
			r.elements.tooltip.css("padding", 0);
			r.elements.tooltip.css(g, z);
			if (a.browser.msie && parseInt(a.browser.version.charAt(0)) == 6) {
				g = parseInt(r.elements.tip.css("margin-top")) || 0;
				g += parseInt(r.elements.content.css("margin-top")) || 0;
				r.elements.tip.css({
					marginTop : g
				})
			}
		}
	}
	function v() {
		var g = this;
		g.elements.title !== null && g.elements.title.remove();
		g.elements.title = a(
				'<div class="' + g.options.style.classes.title + '">').css(
				M(g.options.style.title, true)).css({
			zoom : a.browser.msie ? 1 : 0
		}).prependTo(g.elements.contentWrapper);
		g.options.content.title.text
				&& g.updateTitle.call(g, g.options.content.title.text);
		if (g.options.content.title.button !== false
				&& typeof g.options.content.title.button == "string")
			g.elements.button = a(
					'<a class="' + g.options.style.classes.button
							+ '" style="float:right; position: relative"></a>')
					.css(M(g.options.style.button, true)).html(
							g.options.content.title.button).prependTo(
							g.elements.title).click(function(r) {
						g.status.disabled || g.hide(r)
					})
	}
	function y() {
		function g(V) {
			if (z.status.disabled !== true) {
				if (z.options.hide.when.event == "inactive") {
					a(I).each(function() {
						G.bind(this + ".qtip-inactive", N);
						z.elements.content.bind(this + ".qtip-inactive", N)
					});
					N()
				}
				clearTimeout(z.timers.show);
				clearTimeout(z.timers.hide);
				z.timers.show = setTimeout(function() {
					z.show(V)
				}, z.options.show.delay)
			}
		}
		function r(V) {
			if (z.status.disabled !== true) {
				if (z.options.hide.fixed === true
						&& z.options.hide.when.event
								.search(/mouse(out|leave)/i) !== -1
						&& a(V.relatedTarget).parents("div.qtip[qtip]").length > 0) {
					V.stopPropagation();
					V.preventDefault();
					clearTimeout(z.timers.hide);
					return false
				}
				clearTimeout(z.timers.show);
				clearTimeout(z.timers.hide);
				z.elements.tooltip.stop(true, true);
				z.timers.hide = setTimeout(function() {
					z.hide(V)
				}, z.options.hide.delay)
			}
		}
		var z, n, G, I;
		z = this;
		n = z.options.show.when.target;
		G = z.options.hide.when.target;
		if (z.options.hide.fixed)
			G = G.add(z.elements.tooltip);
		if (z.options.hide.when.event == "inactive") {
			I = [ "click", "dblclick", "mousedown", "mouseup", "mousemove",
					"mouseout", "mouseenter", "mouseleave", "mouseover" ];
			function N(V) {
				if (z.status.disabled !== true) {
					clearTimeout(z.timers.inactive);
					z.timers.inactive = setTimeout(function() {
						a(I).each(function() {
							G.unbind(this + ".qtip-inactive");
							z.elements.content.unbind(this + ".qtip-inactive")
						});
						z.hide(V)
					}, z.options.hide.delay)
				}
			}
		} else
			z.options.hide.fixed === true
					&& z.elements.tooltip.bind("mouseover.qtip", function() {
						z.status.disabled !== true
								&& clearTimeout(z.timers.hide)
					});
		if (z.options.show.when.target.add(z.options.hide.when.target).length === 1
				&& z.options.show.when.event == z.options.hide.when.event
				&& z.options.hide.when.event !== "inactive"
				|| z.options.hide.when.event == "unfocus") {
			z.cache.toggle = 0;
			n.bind(z.options.show.when.event + ".qtip", function(V) {
				z.cache.toggle == 0 ? g(V) : r(V)
			})
		} else {
			n.bind(z.options.show.when.event + ".qtip", g);
			z.options.hide.when.event !== "inactive"
					&& G.bind(z.options.hide.when.event + ".qtip", r)
		}
		z.options.position.type.search(/(fixed|absolute)/) !== -1
				&& z.elements.tooltip.bind("mouseover.qtip", z.focus);
		z.options.position.target === "mouse"
				&& z.options.position.type !== "static"
				&& n.bind("mousemove.qtip", function(V) {
					z.cache.mouse = {
						x : V.pageX,
						y : V.pageY
					};
					z.status.disabled === false
							&& z.options.position.adjust.mouse === true
							&& z.options.position.type !== "static"
							&& z.elements.tooltip.css("display") !== "none"
							&& z.updatePosition(V)
				})
	}
	function A(g, r, z) {
		var n, G, I, N;
		n = this;
		if (z.corner == "center")
			return r.position;
		G = a.extend({}, g);
		N = {
			x : false,
			y : false
		};
		I = {
			left : G.left < a.fn.qtip.cache.screen.scroll.left,
			right : G.left + z.dimensions.width + 2 >= a.fn.qtip.cache.screen.width
					+ a.fn.qtip.cache.screen.scroll.left,
			top : G.top < a.fn.qtip.cache.screen.scroll.top,
			bottom : G.top + z.dimensions.height + 2 >= a.fn.qtip.cache.screen.height
					+ a.fn.qtip.cache.screen.scroll.top
		};
		I = {
			left : I.left
					&& (z.corner.search(/right/i) != -1 || z.corner
							.search(/right/i) == -1
							&& !I.right),
			right : I.right
					&& (z.corner.search(/left/i) != -1 || z.corner
							.search(/left/i) == -1
							&& !I.left),
			top : I.top && z.corner.search(/top/i) == -1,
			bottom : I.bottom && z.corner.search(/bottom/i) == -1
		};
		if (I.left) {
			G.left = n.options.position.target !== "mouse" ? r.position.left
					+ r.dimensions.width : n.cache.mouse.x;
			N.x = "Left"
		} else if (I.right) {
			G.left = n.options.position.target !== "mouse" ? r.position.left
					- z.dimensions.width : n.cache.mouse.x - z.dimensions.width;
			N.x = "Right"
		}
		if (I.top) {
			G.top = n.options.position.target !== "mouse" ? r.position.top
					+ r.dimensions.height : n.cache.mouse.y;
			N.y = "top"
		} else if (I.bottom) {
			G.top = n.options.position.target !== "mouse" ? r.position.top
					- z.dimensions.height : n.cache.mouse.y
					- z.dimensions.height;
			N.y = "bottom"
		}
		if (G.left < 0) {
			G.left = g.left;
			N.x = false
		}
		if (G.top < 0) {
			G.top = g.top;
			N.y = false
		}
		if (n.options.style.tip.corner !== false) {
			G.corner = new String(z.corner);
			if (N.x !== false)
				G.corner = G.corner.replace(/Left|Right|Middle/, N.x);
			if (N.y !== false)
				G.corner = G.corner.replace(/top|bottom/, N.y);
			G.corner !== n.elements.tip.attr("rel") && l.call(n, G.corner)
		}
		return G
	}
	function M(g, r) {
		var z;
		g = a.extend(true, {}, g);
		for (z in g)
			if (r === true && z.search(/(tip|classes)/i) !== -1)
				delete g[z];
			else
				!r && z.search(/(width|border|tip|title|classes|user)/i) !== -1
						&& delete g[z];
		return g
	}
	function D(g) {
		if (typeof g.tip !== "object")
			g.tip = {
				corner : g.tip
			};
		if (typeof g.tip.size !== "object")
			g.tip.size = {
				width : g.tip.size,
				height : g.tip.size
			};
		if (typeof g.border !== "object")
			g.border = {
				width : g.border
			};
		if (typeof g.width !== "object")
			g.width = {
				value : g.width
			};
		if (typeof g.width.max == "string")
			g.width.max = parseInt(g.width.max.replace(/([0-9]+)/i, "$1"));
		if (typeof g.width.min == "string")
			g.width.min = parseInt(g.width.min.replace(/([0-9]+)/i, "$1"));
		if (typeof g.tip.size.x == "number") {
			g.tip.size.width = g.tip.size.x;
			delete g.tip.size.x
		}
		if (typeof g.tip.size.y == "number") {
			g.tip.size.height = g.tip.size.y;
			delete g.tip.size.y
		}
		return g
	}
	function s() {
		var g, r, z;
		g = this;
		z = [ true, {} ];
		for (r = 0; r < arguments.length; r++)
			z.push(arguments[r]);
		for (r = [ a.extend.apply(a, z) ]; typeof r[0].name == "string";)
			r.unshift(D(a.fn.qtip.styles[r[0].name]));
		r.unshift(true, {
			classes : {
				tooltip : "qtip-" + (arguments[0].name || "defaults")
			}
		}, a.fn.qtip.styles.defaults);
		r = a.extend.apply(a, r);
		z = a.browser.msie ? 1 : 0;
		r.tip.size.width += z;
		r.tip.size.height += z;
		if (r.tip.size.width % 2 > 0)
			r.tip.size.width += 1;
		if (r.tip.size.height % 2 > 0)
			r.tip.size.height += 1;
		if (r.tip.corner === true)
			r.tip.corner = g.options.position.corner.tooltip === "center" ? false
					: g.options.position.corner.tooltip;
		return r
	}
	function u(g, r, z) {
		r = {
			bottomRight : [ [ 0, 0 ], [ r, z ], [ r, 0 ] ],
			bottomLeft : [ [ 0, 0 ], [ r, 0 ], [ 0, z ] ],
			topRight : [ [ 0, z ], [ r, 0 ], [ r, z ] ],
			topLeft : [ [ 0, 0 ], [ 0, z ], [ r, z ] ],
			topMiddle : [ [ 0, z ], [ r / 2, 0 ], [ r, z ] ],
			bottomMiddle : [ [ 0, 0 ], [ r, 0 ], [ r / 2, z ] ],
			rightMiddle : [ [ 0, 0 ], [ r, z / 2 ], [ 0, z ] ],
			leftMiddle : [ [ r, 0 ], [ r, z ], [ 0, z / 2 ] ]
		};
		r.leftTop = r.bottomRight;
		r.rightTop = r.bottomLeft;
		r.leftBottom = r.topRight;
		r.rightBottom = r.topLeft;
		return r[g]
	}
	function B(g) {
		var r;
		if (a("<canvas>").get(0).getContext)
			r = {
				topLeft : [ g, g ],
				topRight : [ 0, g ],
				bottomLeft : [ g, 0 ],
				bottomRight : [ 0, 0 ]
			};
		else if (a.browser.msie)
			r = {
				topLeft : [ -90, 90, 0 ],
				topRight : [ -90, 90, -g ],
				bottomLeft : [ 90, 270, 0 ],
				bottomRight : [ 90, 270, -g ]
			};
		return r
	}
	function F() {
		var g, r;
		g = this;
		r = g.getDimensions();
		g.elements.bgiframe = g.elements.wrapper
				.prepend(
						'<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:'
								+ r.height + "px; width:" + r.width + 'px" />')
				.children(".qtip-bgiframe:first")
	}
	a.fn.qtip = function(g, r) {
		var z, n, G, I, N, V, X, Z;
		if (typeof g == "string") {
			typeof a(this).data("qtip") !== "object"
					&& a.fn.qtip.log.error.call(self, 1,
							a.fn.qtip.constants.NO_TOOLTIP_PRESENT, false);
			if (g == "api")
				return a(this).data("qtip").interfaces[a(this).data("qtip").current];
			else if (g == "interfaces")
				return a(this).data("qtip").interfaces
		} else {
			g || (g = {});
			if (typeof g.content !== "object" || g.content.jquery
					&& g.content.length > 0)
				g.content = {
					text : g.content
				};
			if (typeof g.content.title !== "object")
				g.content.title = {
					text : g.content.title
				};
			if (typeof g.position !== "object")
				g.position = {
					corner : g.position
				};
			if (typeof g.position.corner !== "object")
				g.position.corner = {
					target : g.position.corner,
					tooltip : g.position.corner
				};
			if (typeof g.show !== "object")
				g.show = {
					when : g.show
				};
			if (typeof g.show.when !== "object")
				g.show.when = {
					event : g.show.when
				};
			if (typeof g.show.effect !== "object")
				g.show.effect = {
					type : g.show.effect
				};
			if (typeof g.hide !== "object")
				g.hide = {
					when : g.hide
				};
			if (typeof g.hide.when !== "object")
				g.hide.when = {
					event : g.hide.when
				};
			if (typeof g.hide.effect !== "object")
				g.hide.effect = {
					type : g.hide.effect
				};
			if (typeof g.style !== "object")
				g.style = {
					name : g.style
				};
			g.style = D(g.style);
			I = a.extend(true, {}, a.fn.qtip.defaults, g);
			I.style = s.call({
				options : I
			}, I.style);
			I.user = a.extend(true, {}, g)
		}
		return a(this).each(
				function() {
					if (typeof g == "string") {
						V = g.toLowerCase();
						G = a(this).qtip("interfaces");
						if (typeof G == "object")
							if (r === true && V == "destroy")
								for (; G.length > 0;)
									G[G.length - 1].destroy();
							else {
								if (r !== true)
									G = [ a(this).qtip("api") ];
								for (z = 0; z < G.length; z++)
									if (V == "destroy")
										G[z].destroy();
									else if (G[z].status.rendered === true)
										if (V == "show")
											G[z].show();
										else if (V == "hide")
											G[z].hide();
										else if (V == "focus")
											G[z].focus();
										else if (V == "disable")
											G[z].disable(true);
										else
											V == "enable"
													&& G[z].disable(false)
							}
					} else {
						X = a.extend(true, {}, I);
						X.hide.effect.length = I.hide.effect.length;
						X.show.effect.length = I.show.effect.length;
						if (X.position.container === false)
							X.position.container = a(document.body);
						if (X.position.target === false)
							X.position.target = a(this);
						if (X.show.when.target === false)
							X.show.when.target = a(this);
						if (X.hide.when.target === false)
							X.hide.when.target = a(this);
						n = a.fn.qtip.interfaces.length;
						for (z = 0; z < n; z++)
							if (typeof a.fn.qtip.interfaces[z] == "undefined") {
								n = z;
								break
							}
						N = new b(a(this), X, n);
						a.fn.qtip.interfaces[n] = N;
						if (typeof a(this).data("qtip") === "object"
								&& a(this).data("qtip")) {
							if (typeof a(this).attr("qtip") === "undefined")
								a(this).data("qtip").current = a(this).data(
										"qtip").interfaces.length;
							a(this).data("qtip").interfaces.push(N)
						} else
							a(this).data("qtip", {
								current : 0,
								interfaces : [ N ]
							});
						if (X.content.prerender === false
								&& X.show.when.event !== false
								&& X.show.ready !== true)
							X.show.when.target.bind(X.show.when.event
									+ ".qtip-" + n + "-create", {
								qtip : n
							}, function(sa) {
								Z = a.fn.qtip.interfaces[sa.data.qtip];
								Z.options.show.when.target
										.unbind(Z.options.show.when.event
												+ ".qtip-" + sa.data.qtip
												+ "-create");
								Z.cache.mouse = {
									x : sa.pageX,
									y : sa.pageY
								};
								d.call(Z);
								Z.options.show.when.target
										.trigger(Z.options.show.when.event)
							});
						else {
							N.cache.mouse = {
								x : X.show.when.target.offset().left,
								y : X.show.when.target.offset().top
							};
							d.call(N)
						}
					}
				})
	};
	a(document)
			.ready(
					function() {
						a.fn.qtip.cache = {
							screen : {
								scroll : {
									left : a(window).scrollLeft(),
									top : a(window).scrollTop()
								},
								width : a(window).width(),
								height : a(window).height()
							}
						};
						var g;
						a(window)
								.bind(
										"resize scroll",
										function(r) {
											clearTimeout(g);
											g = setTimeout(
													function() {
														if (r.type === "scroll")
															a.fn.qtip.cache.screen.scroll = {
																left : a(window)
																		.scrollLeft(),
																top : a(window)
																		.scrollTop()
															};
														else {
															a.fn.qtip.cache.screen.width = a(
																	window)
																	.width();
															a.fn.qtip.cache.screen.height = a(
																	window)
																	.height()
														}
														for (i = 0; i < a.fn.qtip.interfaces.length; i++) {
															var z = a.fn.qtip.interfaces[i];
															if (z.status.rendered === true
																	&& (z.options.position.type !== "static"
																			|| z.options.position.adjust.scroll
																			&& r.type === "scroll" || z.options.position.adjust.resize
																			&& r.type === "resize"))
																z
																		.updatePosition(
																				r,
																				true)
														}
													}, 100)
										});
						a(document)
								.bind(
										"mousedown.qtip",
										function(r) {
											a(r.target).parents("div.qtip").length === 0
													&& a(".qtip[unfocus]")
															.each(
																	function() {
																		var z = a(
																				this)
																				.qtip(
																						"api");
																		a(this)
																				.is(
																						":visible")
																				&& !z.status.disabled
																				&& a(
																						r.target)
																						.add(
																								z.elements.target).length > 1
																				&& z
																						.hide(r)
																	})
										})
					});
	a.fn.qtip.interfaces = [];
	a.fn.qtip.log = {
		error : function() {
			return this
		}
	};
	a.fn.qtip.constants = {};
	a.fn.qtip.defaults = {
		content : {
			prerender : false,
			text : false,
			url : false,
			data : null,
			title : {
				text : false,
				button : false
			}
		},
		position : {
			target : false,
			corner : {
				target : "bottomRight",
				tooltip : "topLeft"
			},
			adjust : {
				x : 0,
				y : 0,
				mouse : true,
				screen : false,
				scroll : true,
				resize : true
			},
			type : "absolute",
			container : false
		},
		show : {
			when : {
				target : false,
				event : "mouseover"
			},
			effect : {
				type : "fade",
				length : 100
			},
			delay : 140,
			solo : false,
			ready : false
		},
		hide : {
			when : {
				target : false,
				event : "mouseout"
			},
			effect : {
				type : "fade",
				length : 100
			},
			delay : 0,
			fixed : false
		},
		api : {
			beforeRender : function() {
			},
			onRender : function() {
			},
			beforePositionUpdate : function() {
			},
			onPositionUpdate : function() {
			},
			beforeShow : function() {
			},
			onShow : function() {
			},
			beforeHide : function() {
			},
			onHide : function() {
			},
			beforeContentUpdate : function() {
			},
			onContentUpdate : function() {
			},
			beforeContentLoad : function() {
			},
			onContentLoad : function() {
			},
			beforeTitleUpdate : function() {
			},
			onTitleUpdate : function() {
			},
			beforeDestroy : function() {
			},
			onDestroy : function() {
			},
			beforeFocus : function() {
			},
			onFocus : function() {
			}
		}
	};
	a.fn.qtip.styles = {
		defaults : {
			background : "white",
			color : "#111",
			overflow : "hidden",
			textAlign : "left",
			width : {
				min : 0,
				max : 250
			},
			padding : "5px 9px",
			border : {
				width : 1,
				radius : 0,
				color : "#d3d3d3"
			},
			tip : {
				corner : false,
				color : false,
				size : {
					width : 13,
					height : 13
				},
				opacity : 1
			},
			title : {
				background : "#e1e1e1",
				fontWeight : "bold",
				padding : "7px 12px"
			},
			button : {
				cursor : "pointer"
			},
			classes : {
				target : "",
				tip : "qtip-tip",
				title : "qtip-title",
				button : "qtip-button",
				content : "qtip-content",
				active : "qtip-active"
			}
		},
		cream : {
			border : {
				width : 3,
				radius : 0,
				color : "#F9E98E"
			},
			title : {
				background : "#F0DE7D",
				color : "#A27D35"
			},
			background : "#FBF7AA",
			color : "#A27D35",
			classes : {
				tooltip : "qtip-cream"
			}
		},
		light : {
			border : {
				width : 3,
				radius : 0,
				color : "#E2E2E2"
			},
			title : {
				background : "#f1f1f1",
				color : "#454545"
			},
			background : "white",
			color : "#454545",
			classes : {
				tooltip : "qtip-light"
			}
		},
		dark : {
			border : {
				width : 3,
				radius : 0,
				color : "#303030"
			},
			title : {
				background : "#404040",
				color : "#f3f3f3"
			},
			background : "#505050",
			color : "#f3f3f3",
			classes : {
				tooltip : "qtip-dark"
			}
		},
		red : {
			border : {
				width : 3,
				radius : 0,
				color : "#CE6F6F"
			},
			title : {
				background : "#f28279",
				color : "#9C2F2F"
			},
			background : "#F79992",
			color : "#9C2F2F",
			classes : {
				tooltip : "qtip-red"
			}
		},
		green : {
			border : {
				width : 3,
				radius : 0,
				color : "#A9DB66"
			},
			title : {
				background : "#b9db8c",
				color : "#58792E"
			},
			background : "#CDE6AC",
			color : "#58792E",
			classes : {
				tooltip : "qtip-green"
			}
		},
		blue : {
			border : {
				width : 3,
				radius : 0,
				color : "#ADD9ED"
			},
			title : {
				background : "#D0E9F5",
				color : "#5E99BD"
			},
			background : "#E5F6FE",
			color : "#4D9FBF",
			classes : {
				tooltip : "qtip-blue"
			}
		}
	}
})(jQuery);
var soy = soy || {};
(function() {
	var a = navigator.userAgent, b = a.indexOf("Opera") == 0;
	soy.IS_OPERA_ = b;
	soy.IS_IE_ = !b && a.indexOf("MSIE") != -1;
	soy.IS_WEBKIT_ = !b && a.indexOf("WebKit") != -1
})();
soy.StringBuilder = function(a) {
	this.buffer_ = soy.IS_IE_ ? [] : "";
	a != null && this.append.apply(this, arguments)
};
soy.StringBuilder.prototype.bufferLength_ = 0;
soy.StringBuilder.prototype.append = function(a, b) {
	if (soy.IS_IE_)
		if (b == null)
			this.buffer_[this.bufferLength_++] = a;
		else {
			this.buffer_.push.apply(this.buffer_, arguments);
			this.bufferLength_ = this.buffer_.length
		}
	else {
		this.buffer_ += a;
		if (b != null)
			for ( var d = 1; d < arguments.length; d++)
				this.buffer_ += arguments[d]
	}
	return this
};
soy.StringBuilder.prototype.clear = function() {
	if (soy.IS_IE_)
		this.bufferLength_ = this.buffer_.length = 0;
	else
		this.buffer_ = ""
};
soy.StringBuilder.prototype.toString = function() {
	if (soy.IS_IE_) {
		var a = this.buffer_.join("");
		this.clear();
		a && this.append(a);
		return a
	} else
		return this.buffer_
};
soy.renderElement = function(a, b, d) {
	a.innerHTML = b(d)
};
soy.renderAsFragment = function(a, b) {
	var d = document.createElement("div");
	d.innerHTML = a(b);
	if (d.childNodes.length == 1)
		return d.firstChild;
	else {
		for (a = document.createDocumentFragment(); d.firstChild;)
			a.appendChild(d.firstChild);
		return a
	}
};
soy.$$augmentData = function(a, b) {
	function d() {
	}
	d.prototype = a;
	a = new d;
	for ( var e in b)
		a[e] = b[e];
	return a
};
soy.$$escapeHtml = function(a) {
	a = String(a);
	if (!soy.$$EscapeHtmlRe_.ALL_SPECIAL_CHARS.test(a))
		return a;
	if (a.indexOf("&") != -1)
		a = a.replace(soy.$$EscapeHtmlRe_.AMP, "&amp;");
	if (a.indexOf("<") != -1)
		a = a.replace(soy.$$EscapeHtmlRe_.LT, "&lt;");
	if (a.indexOf(">") != -1)
		a = a.replace(soy.$$EscapeHtmlRe_.GT, "&gt;");
	if (a.indexOf('"') != -1)
		a = a.replace(soy.$$EscapeHtmlRe_.QUOT, "&quot;");
	return a
};
soy.$$EscapeHtmlRe_ = {
	ALL_SPECIAL_CHARS : /[&<>\"]/,
	AMP : /&/g,
	LT : /</g,
	GT : />/g,
	QUOT : /\"/g
};
soy.$$escapeJs = function(a) {
	a = String(a);
	for ( var b = [], d = 0; d < a.length; d++)
		b[d] = soy.$$escapeChar(a.charAt(d));
	return b.join("")
};
soy.$$escapeChar = function(a) {
	if (a in soy.$$escapeCharJs_)
		return soy.$$escapeCharJs_[a];
	var b = a, d = a.charCodeAt(0);
	if (d > 31 && d < 127)
		b = a;
	else {
		if (d < 256) {
			b = "\\x";
			if (d < 16 || d > 256)
				b += "0"
		} else {
			b = "\\u";
			if (d < 4096)
				b += "0"
		}
		b += d.toString(16).toUpperCase()
	}
	return soy.$$escapeCharJs_[a] = b
};
soy.$$escapeCharJs_ = {
	"\u0008" : "\\b",
	"\u000c" : "\\f",
	"\n" : "\\n",
	"\r" : "\\r",
	"\t" : "\\t",
	"\u000b" : "\\x0B",
	'"' : '\\"',
	"'" : "\\'",
	"\\" : "\\\\"
};
soy.$$escapeUri = function(a) {
	a = String(a);
	return soy.$$ENCODE_URI_REGEXP_.test(a) ? a : encodeURIComponent(a)
};
soy.$$ENCODE_URI_REGEXP_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
soy.$$insertWordBreaks = function(a, b) {
	a = String(a);
	for ( var d = [], e = 0, f = false, l = false, m = 0, p = 0, v = 0, y = a.length; v < y; ++v) {
		var A = a.charCodeAt(v);
		if (m >= b && A != soy.$$CharCode_.SPACE) {
			d[e++] = a.substring(p, v);
			p = v;
			d[e++] = soy.WORD_BREAK_;
			m = 0
		}
		if (f) {
			if (A == soy.$$CharCode_.GREATER_THAN)
				f = false
		} else if (l)
			switch (A) {
			case soy.$$CharCode_.SEMI_COLON:
				l = false;
				++m;
				break;
			case soy.$$CharCode_.LESS_THAN:
				l = false;
				f = true;
				break;
			case soy.$$CharCode_.SPACE:
				l = false;
				m = 0;
				break
			}
		else
			switch (A) {
			case soy.$$CharCode_.LESS_THAN:
				f = true;
				break;
			case soy.$$CharCode_.AMPERSAND:
				l = true;
				break;
			case soy.$$CharCode_.SPACE:
				m = 0;
				break;
			default:
				++m;
				break
			}
	}
	d[e++] = a.substring(p);
	return d.join("")
};
soy.$$CharCode_ = {
	SPACE : 32,
	AMPERSAND : 38,
	SEMI_COLON : 59,
	LESS_THAN : 60,
	GREATER_THAN : 62
};
soy.WORD_BREAK_ = soy.IS_WEBKIT_ ? "<wbr></wbr>" : soy.IS_OPERA_ ? "&shy;"
		: "<wbr>";
soy.$$changeNewlineToBr = function(a) {
	a = String(a);
	if (!soy.$$CHANGE_NEWLINE_TO_BR_RE_.test(a))
		return a;
	return a.replace(/(\r\n|\r|\n)/g, "<br>")
};
soy.$$CHANGE_NEWLINE_TO_BR_RE_ = /[\r\n]/;
soy.$$bidiTextDir = function(a, b) {
	a = soy.$$bidiStripHtmlIfNecessary_(a, b);
	if (!a)
		return 0;
	return soy.$$bidiDetectRtlDirectionality_(a) ? -1 : 1
};
soy.$$bidiDirAttr = function(a, b, d) {
	b = soy.$$bidiTextDir(b, d);
	if (b != a)
		return b < 0 ? "dir=rtl" : b > 0 ? "dir=ltr" : "";
	return ""
};
soy.$$bidiMarkAfter = function(a, b, d) {
	var e = soy.$$bidiTextDir(b, d);
	return soy.$$bidiMarkAfterKnownDir(a, e, b, d)
};
soy.$$bidiMarkAfterKnownDir = function(a, b, d, e) {
	return a > 0 && (b < 0 || soy.$$bidiIsRtlExitText_(d, e)) ? "\u200e"
			: a < 0 && (b > 0 || soy.$$bidiIsLtrExitText_(d, e)) ? "\u200f"
					: ""
};
soy.$$bidiStripHtmlIfNecessary_ = function(a, b) {
	return b ? a.replace(soy.$$BIDI_HTML_SKIP_RE_, " ") : a
};
soy.$$BIDI_HTML_SKIP_RE_ = /<[^>]*>|&[^;]+;/g;
soy.$$bidiSpanWrap = function(a, b) {
	b = String(b);
	var d = soy.$$bidiTextDir(b, true), e = soy.$$bidiMarkAfterKnownDir(a, d,
			b, true);
	if (d > 0 && a <= 0)
		b = "<span dir=ltr>" + b + "</span>";
	else if (d < 0 && a >= 0)
		b = "<span dir=rtl>" + b + "</span>";
	return b + e
};
soy.$$bidiUnicodeWrap = function(a, b) {
	b = String(b);
	var d = soy.$$bidiTextDir(b, true), e = soy.$$bidiMarkAfterKnownDir(a, d,
			b, true);
	if (d > 0 && a <= 0)
		b = "\u202a" + b + "\u202c";
	else if (d < 0 && a >= 0)
		b = "\u202b" + b + "\u202c";
	return b + e
};
soy.$$bidiLtrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff";
soy.$$bidiNeutralChars_ = "\u0000- !-@[-`{-\u00bf\u00d7\u00f7\u02b9-\u02ff\u2000-\u2bff";
soy.$$bidiRtlChars_ = "\u0591-\u07ff\ufb1d-\ufdfd\ufe70-\ufefc";
soy.$$bidiRtlDirCheckRe_ = new RegExp("^[^" + soy.$$bidiLtrChars_ + "]*["
		+ soy.$$bidiRtlChars_ + "]");
soy.$$bidiNeutralDirCheckRe_ = new RegExp("^[" + soy.$$bidiNeutralChars_
		+ "]*$|^http://");
soy.$$bidiIsRtlText_ = function(a) {
	return soy.$$bidiRtlDirCheckRe_.test(a)
};
soy.$$bidiIsNeutralText_ = function(a) {
	return soy.$$bidiNeutralDirCheckRe_.test(a)
};
soy.$$bidiRtlDetectionThreshold_ = 0.4;
soy.$$bidiRtlWordRatio_ = function(a) {
	var b = 0, d = 0;
	a = a.split(" ");
	for ( var e = 0; e < a.length; e++)
		if (soy.$$bidiIsRtlText_(a[e])) {
			b++;
			d++
		} else
			soy.$$bidiIsNeutralText_(a[e]) || d++;
	return d == 0 ? 0 : b / d
};
soy.$$bidiDetectRtlDirectionality_ = function(a) {
	return soy.$$bidiRtlWordRatio_(a) > soy.$$bidiRtlDetectionThreshold_
};
soy.$$bidiLtrExitDirCheckRe_ = new RegExp("[" + soy.$$bidiLtrChars_ + "][^"
		+ soy.$$bidiRtlChars_ + "]*$");
soy.$$bidiRtlExitDirCheckRe_ = new RegExp("[" + soy.$$bidiRtlChars_ + "][^"
		+ soy.$$bidiLtrChars_ + "]*$");
soy.$$bidiIsLtrExitText_ = function(a, b) {
	a = soy.$$bidiStripHtmlIfNecessary_(a, b);
	return soy.$$bidiLtrExitDirCheckRe_.test(a)
};
soy.$$bidiIsRtlExitText_ = function(a, b) {
	a = soy.$$bidiStripHtmlIfNecessary_(a, b);
	return soy.$$bidiRtlExitDirCheckRe_.test(a)
};
(function(a) {
	var b = function(u, B) {
		return u << B | u >>> 32 - B
	}, d = function(u, B) {
		var F, g, r, z;
		r = u & 2147483648;
		z = B & 2147483648;
		F = u & 1073741824;
		g = B & 1073741824;
		u = (u & 1073741823) + (B & 1073741823);
		if (F & g)
			return u ^ 2147483648 ^ r ^ z;
		return F | g ? u & 1073741824 ? u ^ 3221225472 ^ r ^ z : u ^ 1073741824
				^ r ^ z : u ^ r ^ z
	}, e = function(u, B, F) {
		return u & B | ~u & F
	}, f = function(u, B, F) {
		return u & F | B & ~F
	}, l = function(u, B, F) {
		return u ^ B ^ F
	}, m = function(u, B, F) {
		return B ^ (u | ~F)
	}, p = function(u, B, F, g, r, z, n) {
		u = d(u, d(d(e(B, F, g), r), n));
		return d(b(u, z), B)
	}, v = function(u, B, F, g, r, z, n) {
		u = d(u, d(d(f(B, F, g), r), n));
		return d(b(u, z), B)
	}, y = function(u, B, F, g, r, z, n) {
		u = d(u, d(d(l(B, F, g), r), n));
		return d(b(u, z), B)
	}, A = function(u, B, F, g, r, z, n) {
		u = d(u, d(d(m(B, F, g), r), n));
		return d(b(u, z), B)
	}, M = function(u) {
		var B, F = u.length;
		B = F + 8;
		for ( var g = ((B - B % 64) / 64 + 1) * 16, r = Array(g - 1), z = 0, n = 0; n < F;) {
			B = (n - n % 4) / 4;
			z = n % 4 * 8;
			r[B] |= u.charCodeAt(n) << z;
			n++
		}
		B = (n - n % 4) / 4;
		z = n % 4 * 8;
		r[B] |= 128 << z;
		r[g - 2] = F << 3;
		r[g - 1] = F >>> 29;
		return r
	}, D = function(u) {
		var B = "", F = "", g;
		for (g = 0; g <= 3; g++) {
			F = u >>> g * 8 & 255;
			F = "0" + F.toString(16);
			B += F.substr(F.length - 2, 2)
		}
		return B
	}, s = function(u) {
		u = u.replace(/\x0d\x0a/g, "\n");
		for ( var B = "", F = 0; F < u.length; F++) {
			var g = u.charCodeAt(F);
			if (g < 128)
				B += String.fromCharCode(g);
			else {
				if (g > 127 && g < 2048)
					B += String.fromCharCode(g >> 6 | 192);
				else {
					B += String.fromCharCode(g >> 12 | 224);
					B += String.fromCharCode(g >> 6 & 63 | 128)
				}
				B += String.fromCharCode(g & 63 | 128)
			}
		}
		return B
	};
	a.extend({
		md5 : function(u) {
			var B = Array(), F, g, r, z, n, G, I, N;
			u = s(u);
			B = M(u);
			n = 1732584193;
			G = 4023233417;
			I = 2562383102;
			N = 271733878;
			for (u = 0; u < B.length; u += 16) {
				F = n;
				g = G;
				r = I;
				z = N;
				n = p(n, G, I, N, B[u + 0], 7, 3614090360);
				N = p(N, n, G, I, B[u + 1], 12, 3905402710);
				I = p(I, N, n, G, B[u + 2], 17, 606105819);
				G = p(G, I, N, n, B[u + 3], 22, 3250441966);
				n = p(n, G, I, N, B[u + 4], 7, 4118548399);
				N = p(N, n, G, I, B[u + 5], 12, 1200080426);
				I = p(I, N, n, G, B[u + 6], 17, 2821735955);
				G = p(G, I, N, n, B[u + 7], 22, 4249261313);
				n = p(n, G, I, N, B[u + 8], 7, 1770035416);
				N = p(N, n, G, I, B[u + 9], 12, 2336552879);
				I = p(I, N, n, G, B[u + 10], 17, 4294925233);
				G = p(G, I, N, n, B[u + 11], 22, 2304563134);
				n = p(n, G, I, N, B[u + 12], 7, 1804603682);
				N = p(N, n, G, I, B[u + 13], 12, 4254626195);
				I = p(I, N, n, G, B[u + 14], 17, 2792965006);
				G = p(G, I, N, n, B[u + 15], 22, 1236535329);
				n = v(n, G, I, N, B[u + 1], 5, 4129170786);
				N = v(N, n, G, I, B[u + 6], 9, 3225465664);
				I = v(I, N, n, G, B[u + 11], 14, 643717713);
				G = v(G, I, N, n, B[u + 0], 20, 3921069994);
				n = v(n, G, I, N, B[u + 5], 5, 3593408605);
				N = v(N, n, G, I, B[u + 10], 9, 38016083);
				I = v(I, N, n, G, B[u + 15], 14, 3634488961);
				G = v(G, I, N, n, B[u + 4], 20, 3889429448);
				n = v(n, G, I, N, B[u + 9], 5, 568446438);
				N = v(N, n, G, I, B[u + 14], 9, 3275163606);
				I = v(I, N, n, G, B[u + 3], 14, 4107603335);
				G = v(G, I, N, n, B[u + 8], 20, 1163531501);
				n = v(n, G, I, N, B[u + 13], 5, 2850285829);
				N = v(N, n, G, I, B[u + 2], 9, 4243563512);
				I = v(I, N, n, G, B[u + 7], 14, 1735328473);
				G = v(G, I, N, n, B[u + 12], 20, 2368359562);
				n = y(n, G, I, N, B[u + 5], 4, 4294588738);
				N = y(N, n, G, I, B[u + 8], 11, 2272392833);
				I = y(I, N, n, G, B[u + 11], 16, 1839030562);
				G = y(G, I, N, n, B[u + 14], 23, 4259657740);
				n = y(n, G, I, N, B[u + 1], 4, 2763975236);
				N = y(N, n, G, I, B[u + 4], 11, 1272893353);
				I = y(I, N, n, G, B[u + 7], 16, 4139469664);
				G = y(G, I, N, n, B[u + 10], 23, 3200236656);
				n = y(n, G, I, N, B[u + 13], 4, 681279174);
				N = y(N, n, G, I, B[u + 0], 11, 3936430074);
				I = y(I, N, n, G, B[u + 3], 16, 3572445317);
				G = y(G, I, N, n, B[u + 6], 23, 76029189);
				n = y(n, G, I, N, B[u + 9], 4, 3654602809);
				N = y(N, n, G, I, B[u + 12], 11, 3873151461);
				I = y(I, N, n, G, B[u + 15], 16, 530742520);
				G = y(G, I, N, n, B[u + 2], 23, 3299628645);
				n = A(n, G, I, N, B[u + 0], 6, 4096336452);
				N = A(N, n, G, I, B[u + 7], 10, 1126891415);
				I = A(I, N, n, G, B[u + 14], 15, 2878612391);
				G = A(G, I, N, n, B[u + 5], 21, 4237533241);
				n = A(n, G, I, N, B[u + 12], 6, 1700485571);
				N = A(N, n, G, I, B[u + 3], 10, 2399980690);
				I = A(I, N, n, G, B[u + 10], 15, 4293915773);
				G = A(G, I, N, n, B[u + 1], 21, 2240044497);
				n = A(n, G, I, N, B[u + 8], 6, 1873313359);
				N = A(N, n, G, I, B[u + 15], 10, 4264355552);
				I = A(I, N, n, G, B[u + 6], 15, 2734768916);
				G = A(G, I, N, n, B[u + 13], 21, 1309151649);
				n = A(n, G, I, N, B[u + 4], 6, 4149444226);
				N = A(N, n, G, I, B[u + 11], 10, 3174756917);
				I = A(I, N, n, G, B[u + 2], 15, 718787259);
				G = A(G, I, N, n, B[u + 9], 21, 3951481745);
				n = d(n, F);
				G = d(G, g);
				I = d(I, r);
				N = d(N, z)
			}
			return (D(n) + D(G) + D(I) + D(N)).toLowerCase()
		}
	})
})(jQuery);
if (typeof allyve == "undefined")
	var allyve = {};
if (typeof allyve.widgets == "undefined")
	allyve.widgets = {};
allyve.widgets.renderHeadline = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("\t<div><h1>AUTO-LOGIN-BEREICH</h1></div>");
	if (!b)
		return a.toString()
};
allyve.widgets.renderWidget = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="widget_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" class="widget ',
					soy.$$escapeHtml(a.widgetInfo.name),
					'_widget" widgetType="',
					soy.$$escapeHtml(a.widgetInfo.name),
					'"><div class="widget_header ui-state-default"><div class="widget_header_icon_delete" onclick="deleteWidget(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					')"><img src="/img/allyve/4-widgets/schliessen-x.png" title="Auto-Login l\u00f6schen" /></div>',
					a.widgetInfo.typ != 3 && a.widgetInfo.typ != 902
							&& a.widgetInfo.isConfigurable == 1 ? '<div class="widget_header_icon_config" onclick="showConfig('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ')"><img src="/img/allyve/4-widgets/konfig-zahnrad.png" title="Auto-Login konfigurieren" /></div>'
							: "",
					a.widgetInfo.isShowLoginHint ? '<div class="widget_header_nologin">kein Login</div>'
							: "",
					'<div class="widget_header_title ',
					soy
							.$$escapeHtml(a.widgetInfo.isShowLoginHint ? "widget_header_title_short"
									: ""),
					' ellipsis">',
					a.widgetInfo.typ != 4 && a.widgetInfo.typ != 3
							&& a.widgetInfo.typ != 902 ? a.widgetInfo.description
							+ (a.widgetData.widgetTitle ? " - " : "")
							: "",
					a.widgetData.widgetTitle ? a.widgetData.widgetTitle : "",
					'</div></div><div class="widget_content" id="widget_content_',
					soy.$$escapeHtml(a.widgetData.uniqueId), '">');
	a.widgetData.valueMap.warning ? allyve.widgets.renderWarning(a, d)
			: allyve.mandant.widgetSwitch(a, d);
	d.append("</div></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.widgetSwitch = function(a, b) {
	var d = b || new soy.StringBuilder;
	switch (a.widgetInfo.typ) {
	case 4:
	case 3:
	case 902:
		switch (a.widgetInfo.name) {
		case "Computerbilddownload":
			allyve.widgets.renderComputerbilddownloadContent(a, d);
			break;
		default:
			a.widgetInfo.id == 105 ? allyve.widgets.renderTvmovieContent(a, d)
					: allyve.widgets.renderRssContent(a, d)
		}
		break;
	default:
		switch (a.widgetInfo.name) {
		case "Amazon":
			allyve.widgets.renderAmazonContent(a, d);
			break;
		case "Bahnbonus":
			allyve.widgets.renderBahnbonusContent(a, d);
			break;
		case "Brands4friends":
			allyve.widgets.renderB4FriendsContent(a, d);
			break;
		case "Ebaybuyer":
			allyve.widgets.renderEbayBuyer(a, d);
			break;
		case "Facebook":
			allyve.widgets.renderFacebookContent(a, d);
			break;
		case "Hiogi":
			allyve.widgets.renderHiogiContent(a, d);
			break;
		case "Lastfm":
			allyve.widgets.renderLastfmContent(a, d);
			break;
		case "Lesezeichen":
			allyve.widgets.renderLesezeichenContent(a, d);
			break;
		case "Lokalisten":
			allyve.widgets.renderLokalistenContent(a, d);
			break;
		case "Einsundeins":
		case "Aolmail":
		case "Yahoomail":
		case "Hotmail":
		case "Freenet":
		case "Webdemail":
		case "Tonlinemail":
			allyve.widgets.renderMailContent(a, d);
			break;
		case "Notepad":
			allyve.widgets.renderNotepadContent(a, d);
			break;
		case "Otto":
		case "Neckermann":
		case "Esprit":
		case "Magicprice":
		case "Limango":
		case "Guut":
		case "Baur":
		case "Dressforless":
		case "Hagebau":
		case "Iamwalking":
		case "Conrad":
		case "Tchibo":
		case "Herrenausstatter":
		case "Cunda":
		case "Beautynet":
		case "Smatch":
		case "Medionshopping":
			allyve.widgets.renderShoppingContent(a, d);
			break;
		case "Pricesearching":
			allyve.widgets.renderPricesearchingContent(a, d);
			break;
		case "Searching":
			allyve.widgets.renderSearching(a, d);
			break;
		case "Support":
			allyve.widgets.renderSupportContent(a, d);
			break;
		case "Teleboerse":
			allyve.widgets.renderTeleboerseContent(a, d);
			break;
		case "Ticketonline":
			allyve.widgets.renderTicketonlineContent(a, d);
			break;
		case "Twitter":
			allyve.widgets.renderTwitterContent(a, d);
			break;
		case "Wetter":
			allyve.widgets.renderWeatherContent(a, d);
			break;
		case "Xing":
			allyve.widgets.renderXingContent(a, d);
			break;
		case "Zitat":
			allyve.widgets.renderZitatContent(a, d);
			break;
		case "Leo":
			allyve.widgets.renderLeoContent(a, d);
			break;
		default:
			allyve.widgets.renderStandardContent(a, d)
		}
	}
	if (!b)
		return d.toString()
};
allyve.widgets.renderWarning = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">',
					soy.$$escapeHtml(a.widgetData.valueMap.warning), "</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderStandardContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">');
	if (a.widgetInfo.view != null)
		if (a.widgetData.values.length > 0) {
			for ( var e = 0; e < 4; e++)
				d
						.append(a.widgetInfo.view[e] != null ? (a.widgetData.values[e] != null ? '<div class="widget_content_label ellipsis" id="label_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="tr-0">'
								+ (a.widgetData.valueMap["label_" + e] != null ? soy
										.$$escapeHtml(a.widgetData.valueMap["label_"
												+ e])
										: soy
												.$$escapeHtml(a.widgetInfo.view[e].value.content))
								+ '</div><div id="value_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="widget_content_value widget_content_value_fixed tr-1 ellipsis blueLink" '
								+ (a.widgetData.urls[e] != null ? 'onclick="oDeeplinkService.execute('
										+ soy
												.$$escapeHtml(a.widgetData.uniqueId)
										+ ",'"
										+ soy
												.$$escapeHtml(a.widgetData.urls[e])
										+ "')\""
										: 'onclick="oDeeplinkService.execute('
												+ soy
														.$$escapeHtml(a.widgetData.uniqueId)
												+ ",'"
												+ soy
														.$$escapeHtml(a.widgetData.homeUrl)
												+ "')\"")
								+ ">"
								+ a.widgetData.values[e] + "</div>"
								: "")
								+ '<div class="clear"></div>'
								: "");
			d
					.append(a.widgetInfo.df ? '<div class="widget_content_label ellipsis blueLink" id="value_4_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" onclick="oDeeplinkService.execute('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'"
							+ soy.$$escapeHtml(a.widgetInfo.df.field)
							+ "')\">"
							+ soy.$$escapeHtml(a.widgetInfo.df.label)
							+ "</div>"
							: "")
		} else
			d
					.append("Aktuell liegen leider keine Daten vor, die angezeigt werden k\u00f6nnen bzw. diese Auto-Login kann aktuell keine Daten anzeigen.");
	a.widgetInfo.hasSearchView == true
			&& allyve.widgets.renderSearchFormContent(a, d);
	a.widgetInfo.hasStatusView == true
			&& allyve.widgets.renderStatusContent(a, d);
	d
			.append(
					'</div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderB4FriendsContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">');
	if (a.widgetInfo.view != null)
		if (a.widgetData.values.length > 0)
			for ( var e = 0; e < 3; e++)
				d
						.append(a.widgetInfo.view[e] != null ? (a.widgetData.values[e] != null ? (e == 0 ? '<div class="widget_content_label ellipsis" id="label_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="tr-0">'
								+ (a.widgetData.valueMap["label_" + e] != null ? soy
										.$$escapeHtml(a.widgetData.valueMap["label_"
												+ e])
										: soy
												.$$escapeHtml(a.widgetInfo.view[e].value.content))
								+ "</div>"
								: "")
								+ '<div id="value_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="widget_content_value blueLink widget_content_value_fixed tr-1 ellipsis" onclick="oDeeplinkService.execute('
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ ",'"
								+ soy.$$escapeHtml(a.widgetData.homeUrl)
								+ '\')" title="'
								+ soy.$$escapeHtml(a.widgetData.values[e])
								+ '">' + a.widgetData.values[e] + "</div>"
								: "")
								+ '<div class="clear"></div>'
								: "");
		else
			d
					.append("Aktuell liegen leider keine Daten vor, die angezeigt werden k\u00f6nnen bzw. diese Auto-Login kann aktuell keine Daten anzeigen.");
	d
			.append(
					'</div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderBahnbonusContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner"><div><div class="floatingContent"><div class="blueLink" id="label_0_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\'); return false;" href="javascript:void(0);">Mein bahn.bonus</div><div class="blueLink" id="label_3_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'linkSearch\'); return false;" href="javascript:void(0);">Verbindungen suchen</div></div></div><div class="clear"></div></div>');
	if (!b)
		return d.toString()
};
allyve.widgets.renderLokalistenContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">');
	if (a.widgetInfo.view != null)
		if (a.widgetData.values.length > 0)
			for ( var e = 0; e < 2; e++)
				d
						.append(a.widgetInfo.view[e] != null ? (a.widgetData.values[e] != null ? '<div class="widget_content_label ellipsis" id="label_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="tr-0">'
								+ (a.widgetData.valueMap["label_" + e] != null ? soy
										.$$escapeHtml(a.widgetData.valueMap["label_"
												+ e])
										: soy
												.$$escapeHtml(a.widgetInfo.view[e].value.content))
								+ '</div><div id="value_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="widget_content_value widget_content_value_fixed tr-1 ellipsis blueLink" onclick="oDeeplinkService.execute('
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ ",'"
								+ soy.$$escapeHtml(a.widgetData.urls[e])
								+ "')\">" + a.widgetData.values[e] + "</div>"
								: "")
								+ '<div class="clear"></div>'
								: "");
		else
			d
					.append("Aktuell liegen leider keine Daten vor, die angezeigt werden k\u00f6nnen bzw. diese Auto-Login kann aktuell keine Daten anzeigen.");
	d
			.append(
					'</div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderMailContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">');
	if (a.widgetInfo.view != null) {
		for ( var e = 0; e < 3; e++)
			d
					.append(
							a.widgetData.values[e] != null ? '<div class="widget_content_label ellipsis tr-0" id="label_'
									+ soy.$$escapeHtml(e)
									+ "_"
									+ soy.$$escapeHtml(a.widgetData.uniqueId)
									+ '" >'
									+ soy
											.$$escapeHtml(a.widgetInfo.view[e].value.content)
									+ '</div><div class="widget_content_value widget_content_value_fixed tr-1 ellipsis blueLink" id="value_'
									+ soy.$$escapeHtml(e)
									+ "_"
									+ soy.$$escapeHtml(a.widgetData.uniqueId)
									+ '" onclick="oDeeplinkService.execute('
									+ soy.$$escapeHtml(a.widgetData.uniqueId)
									+ ",'"
									+ (a.widgetData.urls[e] ? soy
											.$$escapeHtml(a.widgetData.urls[e])
											: soy
													.$$escapeHtml(a.widgetData.homeUrl))
									+ '\')" title="'
									+ soy.$$escapeHtml(a.widgetData.values[e])
									+ '">' + a.widgetData.values[e] + "</div>"
									: "", '<div class="clear"></div>');
		d
				.append(a.widgetInfo.df ? '<div class="widget_content_label ellipsis blueLink" id="value_4_'
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ '" onclick="oDeeplinkService.execute('
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ ",'"
						+ soy.$$escapeHtml(a.widgetInfo.df.field)
						+ "')\">"
						+ soy.$$escapeHtml(a.widgetInfo.df.label) + "</div>"
						: "")
	}
	d
			.append(
					'</div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderTwitterContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner"><div class="widget_content_label tr-0" id="label_0_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" >',
					soy.$$escapeHtml(a.widgetInfo.view[0].value.content),
					'</div><div class="widget_content_value tr-1"><a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.urls[0]),
					'\')" class="blueLink">',
					soy.$$escapeHtml(a.widgetData.values[0]),
					'</a> / <a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId), ",'", soy
							.$$escapeHtml(a.widgetData.urls[3]),
					'\')" class="blueLink">', soy
							.$$escapeHtml(a.widgetData.values[3]),
					'</a></div><div class="clear"></div>');
	for ( var e = 1; e < 3; e++)
		d
				.append(
						'<div class="widget_content_label" id="label_',
						soy.$$escapeHtml(e),
						"_",
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" class="tr-0">',
						soy.$$escapeHtml(a.widgetInfo.view[e].value.content),
						'</div><div class="widget_content_value widget_content_value_fixed tr-1 ellipsis blueLink" id="value_',
						soy.$$escapeHtml(e),
						"_",
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'"',
						a.widgetData.urls[e] != null ? 'onclick="oDeeplinkService.execute('
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ ",'"
								+ soy.$$escapeHtml(a.widgetData.urls[e])
								+ "')\""
								: "",
						e == 2 ? 'title="'
								+ soy
										.$$escapeHtml(a.widgetData.valueMap.tweet_0)
								+ " +++ "
								+ soy
										.$$escapeHtml(a.widgetData.valueMap.tweet_1)
								+ " +++ "
								+ soy
										.$$escapeHtml(a.widgetData.valueMap.tweet_2)
								+ '"'
								: "", ">",
						a.widgetData.values[e] != null ? a.widgetData.values[e]
								: "", e == 2 ? "..." : "",
						'</div><div class="clear"></div>');
	d
			.append(
					'<div class="widget_input_form"><form id="twitter_form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" action="/"><input type="text" id="twitter_msg_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" name="msg" value="What are you doing" class="searchInput" maxlength="140"  onfocus="clearInput(this)"  onblur="restoreInput(this);"/><div class="widget_button" onclick="$(\'#twitter_form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'\').submit();">Update</div></form></div></div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderFacebookContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner"><div class="widget_content_label tr-0" id="label_0_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" >',
					soy.$$escapeHtml(a.widgetInfo.view[0].value.content),
					"/",
					soy.$$escapeHtml(a.widgetInfo.view[1].value.content),
					'</div><div class="widget_content_value tr-1"><a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.urls[0]),
					'\')" class="blueLink">',
					soy.$$escapeHtml(a.widgetData.values[0]),
					'</a> / <a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.urls[1]),
					'\')"class="blueLink">',
					soy.$$escapeHtml(a.widgetData.values[1]),
					'</a></div><div class="clear"></div><div class="widget_content_label tr-0" id="label_2_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" >',
					soy.$$escapeHtml(a.widgetInfo.view[2].value.content),
					'</div><div class="widget_content_value tr-1"><a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.urls[2]),
					'\')" class="blueLink">',
					soy.$$escapeHtml(a.widgetData.values[2]),
					'</a></div><div class="clear"></div>',
					a.widgetData.values[3] != null ? '<div class="widget_content_value widget_content_value_fixed_wide ellipsis blueLink" id="value_3_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" onclick="oDeeplinkService.execute('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'"
							+ soy.$$escapeHtml(a.widgetData.urls[3])
							+ '\')" title="'
							+ soy.$$escapeHtml(a.widgetData.valueMap.dfTipText)
							+ '">'
							+ a.widgetData.values[3]
							+ '</div><div class="clear"></div>'
							: "",
					'<div class="widget_input_form"><form id="facebook_update_form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" action="/"><input type="text" id="fb_status_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" name="msg" value="',
					soy.$$escapeHtml(a.widgetInfo.view[3].value.content),
					'" class="searchInput" onfocus="clearInput(this)" onblur="restoreInput(this);"/><div class="widget_button" onclick="$(\'#facebook_update_form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'\').submit();">Teilen</div></form></div></div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>",
					a.widgetData.values[0] == "kein Zugriff"
							|| a.widgetData.values[3] == null ? '<div class="fbMigrationNotification">Das Facebook-Widget ben\u00f6tigt Deine Best\u00e4tigung, damit es weiterhin Deine Daten anzeigen kann.<br><ol><li>Klicke das "Widget konfigurieren"-Symbol.</li><li>Klicke im neuen Dialog anschlie\u00dfend auf den "Fertigstellen"-Button um Deine Best\u00e4tigung abzugeben.</li></ol></div>'
							: "");
	if (!b)
		return d.toString()
};
allyve.widgets.renderXingContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">');
	if (a.widgetInfo.view != null) {
		for ( var e = 0; e < 4; e++)
			d
					.append(a.widgetInfo.view[e] != null ? '<div class="widget_content_label ellipsis" id="label_'
							+ soy.$$escapeHtml(e)
							+ "_"
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" class="tr-0">'
							+ soy
									.$$escapeHtml(a.widgetInfo.view[e].value.content)
							+ '</div><div class="widget_content_value ellipsis blueLink" id="value_'
							+ soy.$$escapeHtml(e)
							+ "_"
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" onclick="oDeeplinkService.execute('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'"
							+ soy.$$escapeHtml(a.widgetData.urls[e])
							+ "')\">"
							+ (a.widgetData.values[e] != null ? a.widgetData.values[e]
									: "") + '</div><div class="clear"></div>'
							: "");
		d
				.append(a.widgetInfo.df ? '<div class="widget_content_label ellipsis blueLink" id="value_4_'
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ '" onclick="oDeeplinkService.execute('
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ ",'"
						+ soy.$$escapeHtml(a.widgetInfo.df.field)
						+ "')\">"
						+ soy.$$escapeHtml(a.widgetInfo.df.label) + "</div>"
						: "")
	}
	d
			.append(
					'<div class="widget_input_form"><form class="xing_search_form" id="form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_search" action="/" onsubmit="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'search\');return false;"><input class="searchInput" name="search" type="text" value="Name, Firma, o. \u00e4." onfocus="clearInput(this)" onblur="restoreInput(this);"><div class="widget_button" onclick="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'search\')">Suchen</div></form></div></div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderAmazonContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">');
	if (a.widgetInfo.view) {
		d
				.append(
						'<div class="widget_content_label" id="label_0_',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" class="tr-0">',
						soy.$$escapeHtml(a.widgetInfo.view[0].value.content),
						'</div><div class="widget_content_value blueLink" id="value_0_',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'"  onclick="oDeeplinkService.execute(',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						",'",
						soy.$$escapeHtml(a.widgetData.urls[0]),
						"')\">",
						a.widgetData.values[0] != null ? a.widgetData.values[0]
								: "",
						'</div><div class="clear"></div><div class="widget_content_label" id="label_1_',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" class="tr-0">',
						soy.$$escapeHtml(a.widgetInfo.view[1].value.content),
						'</div><div id="value_1_', soy
								.$$escapeHtml(a.widgetData.uniqueId),
						'" class="widget_content_value widget_content_value_fixed tr-1">');
		for ( var e = 1; e < 3; e++)
			d
					.append(a.widgetData.values[e] != null ? '<div class="widget_content_value_fixed ellipsis blueLink" id="value_'
							+ soy.$$escapeHtml(e)
							+ "_"
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '"  onclick="oDeeplinkService.execute('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'"
							+ soy.$$escapeHtml(a.widgetData.urls[e])
							+ '\')" title="'
							+ soy.$$escapeHtml(a.widgetData.values[e])
							+ '">'
							+ a.widgetData.values[e] + "</div>"
							: "");
		d
				.append(
						'</div><div class="clear"></div><div class="widget_input_form"><form class="amazon_search_form" id="form_',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'_search" action="/" onsubmit="oDeeplinkService.executeSearch(',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						',\'search\');return false;"><input class="searchInput" name="search" type="text" value="Suchbegriff" onfocus="clearInput(this)" onblur="restoreInput(this);"><div class="widget_button" onclick="oDeeplinkService.executeSearch(',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						",'search')\">Suchen</div></form></div>")
	} else
		d.append("Fehler: Kein g\u00fcltiger View!");
	d
			.append(
					'</div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderWeatherContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("\t");
	for ( var e = 0; e < 4; e++)
		d
				.append(
						'<div class="weather_content"><ul><li id="day_',
						soy.$$escapeHtml(e),
						"_",
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" class="wetter_li">',
						soy.$$escapeHtml(a.widgetData.valueMap["day_" + e]),
						'</li><li id="bild_',
						soy.$$escapeHtml(e),
						"_",
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" class="wetter_li" ><img src="img/weather/small/',
						soy.$$escapeHtml(a.widgetData.valueMap["bild_" + e]),
						'.jpg" border=\'0\' /></li><li class="wetter_li bold fontLarge"><span id="high_',
						soy.$$escapeHtml(e), "_", soy
								.$$escapeHtml(a.widgetData.uniqueId), '">',
						soy.$$escapeHtml(a.widgetData.valueMap["high_" + e]),
						'</span> &#176;C</li><li class="wetter_li fontSmall">',
						e == 0 ? "Aktuell" : '<span id="low_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '">'
								+ soy.$$escapeHtml(a.widgetData.valueMap["low_"
										+ e]) + "</span> &#176;C",
						"</li></ul></div>");
	d
			.append(
					'<div class="clear"></div><div class="infoLastUpdated infoLastUpdatedSlim">Letztes Update: ',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					'</div><div class="weatherFooter" ><a href="http://www.weather.com" target="blank" title="www.weather.com">www.weather.com</a></div>');
	if (!b)
		return d.toString()
};
allyve.widgets.renderRssContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					a.widgetInfo.typ != 4 ? '<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/'
							+ soy.$$escapeHtml(a.widgetInfo.iconName)
							+ ");background-position: -"
							+ soy.$$escapeHtml(a.widgetInfo.iconOffset)
							+ 'px 0px; cursor: pointer;" onclick="oDeeplinkService.execute('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'urlRss/"
							+ soy.$$escapeHtml(a.widgetData.homeUrl)
							+ "')\"></div>"
							: "", '<div class="widget_content_inner', soy
							.$$escapeHtml(a.widgetInfo.typ),
					'"><div class="rss-scroll-pane',
					a.widgetInfo.typ == 4 ? "-wide" : "", '" >');
	allyve.widgets.renderRssData(a, d);
	d
			.append(
					'</div></div><div class="clear"></div>',
					a.widgetInfo.typ != 4 ? '<div class="infoLastUpdated">Letztes Update:<br />'
							+ soy
									.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp)
							+ "</div>"
							: '<div class="infoLastUpdated infoLastUpdatedSlim">Letztes Update: '
									+ soy
											.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp)
									+ "</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderRssData = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append('\t<ul class="rss-content" id="rss-list-', soy
			.$$escapeHtml(a.widgetData.uniqueId), '">');
	for ( var e = 0; e < 25; e++)
		d
				.append(a.widgetData.valueMap["rssentry#" + e + "#title"] ? '<li class="rss-item blackLink" title="'
						+ (a.widgetData.valueMap["rssentry#" + e + "#desc"] ? soy
								.$$escapeHtml(a.widgetData.valueMap["rssentry#"
										+ e + "#desc"])
								: soy
										.$$escapeHtml(a.widgetData.valueMap["rssentry#"
												+ e + "#title"]))
						+ '" onclick="oDeeplinkService.execute('
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ ",'urlRss/"
						+ soy.$$escapeUri(a.widgetData.valueMap["rssentry#" + e
								+ "#url"])
						+ "')\">"
						+ (a.widgetInfo.name == "Witz" ? a.widgetData.valueMap["rssentry#1#desc"]
								: a.widgetData.valueMap["rssentry#" + e
										+ "#title"]) + "</li>"
						: "");
	d.append("</ul>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderTvmovieContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urlRss/",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')"></div><div class="widget_content_inner3"><div id="widgetTab_',
					soy.$$escapeHtml(a.widgetData.uniqueId), "_", soy
							.$$escapeHtml(a.widgetInfo.name),
					'" class="widgetTabsTv"><ul><li><a href="#tab_', soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'_2201">jetzt im TV</a></li><li><a href="#tab_', soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'_2204">20:15 Uhr</a></li><li><a href="#tab_', soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'_2203">22:00 Uhr</a></li></ul><div id="tab_', soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'_2201"></div><div id="tab_', soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'_2204"></div><div id="tab_', soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'_2203"></div></div><div class="rss-scroll-pane" >');
	allyve.widgets.renderRssData(a, d);
	d
			.append(
					'</div></div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderShoppingContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'urls/home\');"></div><div class="widget_content_inner"><div class="widget_content_image" id="image_0_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'"><a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId), ",'",
					a.widgetData.valueMap.productLink_0, "');\">");
	switch (a.widgetInfo.name) {
	case "Magicprice":
	case "Guut":
	case "Medionshopping":
		d
				.append(
						'<img class="product_image" border="0" width="80" height="50" src="',
						soy.$$escapeHtml(a.widgetData.valueMap.image1Url_0),
						'">');
		break;
	default:
		d
				.append(
						'<img class="product_image" border="0" height="50" src="/img/allyve/be_cron/',
						soy.$$escapeHtml(a.widgetData.valueMap.image1Url_0),
						'">')
	}
	d
			.append(
					'</a></div><div class="widget_content_inner5"><div><div id="value_0_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" ><a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					a.widgetData.valueMap.productLink_0,
					'\');" class="blueLink ellipsis">',
					a.widgetData.valueMap.productName_0 != null ? a.widgetData.valueMap.manufacturer_0 != null ? a.widgetData.valueMap.manufacturer_0
							+ "<br>" + a.widgetData.valueMap.productName_0
							: a.widgetData.valueMap.productName_0
							: "",
					"</a></div>",
					a.widgetData.valueMap.productPriceOld_0 != null ? '<div class="product_description ellipsis"><div class="widget_content_label" id="label_1_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '">'
							+ soy
									.$$escapeHtml(a.widgetInfo.view[1].value.content)
							+ ' <span class="product_price_old">'
							+ a.widgetData.valueMap.productPriceOld_0
							+ "</span></div></div>"
							: a.widgetData.valueMap.shortDescription_0 != null ? '<div class="product_description ellipsis"  title="'
									+ soy
											.$$escapeHtml(a.widgetData.valueMap.shortDescription_0)
									+ '">'
									+ a.widgetData.valueMap.shortDescription_0
									+ "</div>"
									: "",
					'<div class="clear"></div><div class="pruduct_price">');
	if (a.widgetData.valueMap.productPrice_0 != null)
		switch (a.widgetInfo.name) {
		case "Esprit":
		case "Tchibo":
			d
					.append(
							'<div class="widget_content_label esprit_product_price" id="label_2_',
							soy.$$escapeHtml(a.widgetData.uniqueId), '">',
							a.widgetInfo.view[2].value.content,
							' <span class="esprit_product_price">',
							a.widgetData.valueMap.productPrice_0,
							"</span></div>");
			break;
		default:
			d
					.append(
							'<div class="widget_content_label product_price" id="label_2_',
							soy.$$escapeHtml(a.widgetData.uniqueId), '">',
							a.widgetInfo.view[2].value.content,
							' <span class="R product_price">',
							a.widgetData.valueMap.productPrice_0,
							"</span></div>")
		}
	else
		a.widgetData.valueMap.category_0 != null
				&& d.append('<div id="value_2_', soy
						.$$escapeHtml(a.widgetData.uniqueId),
						'" class="R product_price">',
						a.widgetData.valueMap.category_0, "</div>");
	d
			.append('</div><div class="clear"></div></div></div><div class="clear widget_content_inner_searchMargin"></div>');
	switch (a.widgetInfo.name) {
	case "Esprit":
	case "Baur":
	case "Otto":
	case "Neckermann":
	case "Hagebau":
	case "Iamwalking":
	case "Conrad":
	case "Tchibo":
	case "Cunda":
	case "Beautynet":
	case "Smatch":
		allyve.widgets.renderSearchContainer(a, d);
		break
	}
	d.append("</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderSearchContainer = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="clear"></div><div class="search_form spacer"><form id="form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_search" method="get" class="frmSearch" action="" onsubmit="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'search');return false;\"><input id=\"searchInput_",
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" class="searchInput nopad_nomarg" type="text" value="Produktsuche" onfocus="clearInput(this)" onblur="restoreInput(this);"><div id="btnSearch_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" class="search_buttons nopad_nomarg widget_button" onclick="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'search');return false;\">Suchen</div></form></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderEbayBuyer = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/logo')\" style=\"background-image:url(/img/allyve/3-logostripe/",
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner"><div id="widgetTab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" class="widgetTabs"><ul><li><a href="#tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_0">K\u00e4ufe anzeigen</a></li><li><a href="#tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_1">Verk\u00e4ufe anzeigen</a></li></ul><div class="kaufen" id="tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId), '_0">');
	for ( var e = 0; e < 4; e += 2) {
		d
				.append(
						'<div class="widget_content_label" id="label_',
						soy.$$escapeHtml(e),
						"_",
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" class="tr-0">',
						soy.$$escapeHtml(a.widgetInfo.view[e].value.content),
						"/",
						soy
								.$$escapeHtml(a.widgetInfo.view[e + 1].value.content),
						'</div><div class="widget_content_value blueLink" id="value_',
						soy.$$escapeHtml(e), "_", soy
								.$$escapeHtml(a.widgetData.uniqueId),
						'" class="tr-1">');
		switch (e) {
		case 0:
			d.append('<span id="value_', soy.$$escapeHtml(e), "_", soy
					.$$escapeHtml(a.widgetData.uniqueId),
					'" class="blueLink" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/watching')\">",
					soy.$$escapeHtml(a.widgetData.valueMap.watchListCount),
					'</span>/<span id="value_', soy.$$escapeHtml(e + 1), "_",
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" class="blueLink" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/watching')\">", soy
							.$$escapeHtml(a.widgetData.valueMap.biddingCount),
					"</span>");
			break;
		case 2:
			d.append('<span id="value_', soy.$$escapeHtml(e), "_", soy
					.$$escapeHtml(a.widgetData.uniqueId),
					'" class="blueLink" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/buying')\">", soy
							.$$escapeHtml(a.widgetData.valueMap.overBidCount),
					'</span>/<span id="value_', soy.$$escapeHtml(e), "_", soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'" class="blueLink" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/buying')\">", soy
							.$$escapeHtml(a.widgetData.valueMap.wonCount),
					"</span>");
			break
		}
		d.append('</div><div class="clear"></div>')
	}
	d.append('</div><div class="verkaufen" id="tab_', soy
			.$$escapeHtml(a.widgetData.uniqueId), '_1">');
	for (e = 4; e < 8; e += 2) {
		d
				.append(
						'<div class="widget_content_label" id="label_',
						soy.$$escapeHtml(e),
						"_",
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" class="tr-0">',
						soy.$$escapeHtml(a.widgetInfo.view[e].value.content),
						"/",
						soy
								.$$escapeHtml(a.widgetInfo.view[e + 1].value.content),
						'</div><div class="widget_content_value" id="value_',
						soy.$$escapeHtml(e), "_", soy
								.$$escapeHtml(a.widgetData.uniqueId),
						'" class="tr-1">');
		switch (e) {
		case 4:
			d
					.append(
							'<span id="value_',
							soy.$$escapeHtml(e),
							"_",
							soy.$$escapeHtml(a.widgetData.uniqueId),
							'" class="blueLink" onclick="oDeeplinkService.execute(',
							soy.$$escapeHtml(a.widgetData.uniqueId),
							",'urls/selling')\">",
							soy
									.$$escapeHtml(a.widgetData.valueMap.auctionBidCount),
							'</span>/<span id="value_',
							soy.$$escapeHtml(e),
							"_",
							soy.$$escapeHtml(a.widgetData.uniqueId),
							'" class="blueLink" onclick="oDeeplinkService.execute(',
							soy.$$escapeHtml(a.widgetData.uniqueId),
							",'urls/selling')\">",
							soy
									.$$escapeHtml(a.widgetData.valueMap.auctionSellingCount),
							"</span>");
			break;
		case 6:
			d.append('<span id="value_', soy.$$escapeHtml(e), "_", soy
					.$$escapeHtml(a.widgetData.uniqueId),
					'" class="blueLink" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/selling')\">",
					soy.$$escapeHtml(a.widgetData.valueMap.auctionUnsoldCount),
					'</span>/<span id="value_', soy.$$escapeHtml(e), "_", soy
							.$$escapeHtml(a.widgetData.uniqueId),
					'" class="blueLink" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/selling')\">",
					soy.$$escapeHtml(a.widgetData.valueMap.auctionSoldCount),
					"</span>");
			break
		}
		d.append('</div><div class="clear"></div>')
	}
	d
			.append(
					'</div></div><div class="ebay_search_form"><input type="text" id="ebay_search_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" name="search" class="searchInput ebay_search_input" value="Suchbegriff" /><div class="widget_button"><a href="/" class="widget_button_link" id="ebay_search_a_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" target="_blank">Suchen</a></div></div></div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderSearching = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="widgetTab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					"_",
					soy.$$escapeHtml(a.widgetInfo.name),
					'" class="widgetTabs"><ul>',
					a.widgetData.valueMap.gelbe_seiten ? '<li><a href="#tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_gelbe_seiten">Gelbe Seiten</a></li>' : "",
					a.widgetData.valueMap.dbahn ? '<li><a href="#tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_dbahn">Deutsche Bahn</a></li>' : "",
					a.widgetData.valueMap.google_maps ? '<li><a href="#tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_google_maps">Google Maps</a></li>' : "",
					a.widgetData.valueMap.google_route ? '<li><a href="#tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_google_route">Google Route</a></li>' : "",
					a.widgetData.valueMap.das_telefonbuch ? '<li><a href="#tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_das_telefonbuch">Das Telefonbuch</a></li>'
							: "",
					a.widgetData.valueMap.expedia ? '<li><a href="#tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_expedia">Expedia</a></li>' : "",
					"</ul>",
					a.widgetData.valueMap.gelbe_seiten ? '<div id="tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_gelbe_seiten"><form class="search_form" id="form_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_gelbeseiten" action=""><div class="search_inputs"><input class="search_input_long" name="term" type="text" value="Was: Stichwort, Name, Telefon" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_long" name="place" type="text" value="Wo: Ort, PLZ, Stadtteil, Strasse" onfocus="clearInput(this)" onblur="restoreInput(this);"></div><div class="search_buttons"><div class="widget_button" onclick="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'gelbeseiten')\">Suchen</div></div></form></div>"
							: "",
					a.widgetData.valueMap.dbahn ? '<div id="tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_dbahn"><form class="search_form" id="form_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_diebahn" action="" onsubmit="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ',\'diebahn\');return false"><div class="search_inputs"><input class="search_input_short_left" name="from" type="text" value="Von" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_short_right" name="to" type="text" value="Nach" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_short_left dynamicDate" name="date" type="text" id="dieBahnDate_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" value="Datum" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_short_right dynamicTime" name="time" type="text" id="dieBahnTime_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" value="Uhrzeit" onfocus="clearInput(this)" onblur="restoreInput(this);"></div><div class="search_buttons"><div class="widget_button" onclick="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'diebahn')\">Suchen</div></div></form></div>"
							: "",
					a.widgetData.valueMap.google_maps ? '<div id="tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_google_maps"><form class="search_form" id="form_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_googlemaps" action="" onsubmit="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ',\'googlemaps\');return false;"><div class="search_inputs"><input class="search_input_long" name="place" type="text" value="Ort" onfocus="clearInput(this)" onblur="restoreInput(this);"></div><div class="search_buttons"><div class="widget_button" onclick="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'googlemaps')\">Suchen</div></div></form></div>"
							: "",
					a.widgetData.valueMap.google_route ? '<div id="tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_google_route"><form class="search_form" id="form_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_googleroute" action="" onsubmit="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ',\'googleroute\');return false;"><div class="search_inputs"><input class="search_input_long" name="start" type="text" value="Start" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_long" name="target" type="text" value="Ziel" onfocus="clearInput(this)" onblur="restoreInput(this);"></div><div class="search_buttons"><div class="widget_button" onclick="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'googleroute')\">Suchen</div></div></form></div>"
							: "",
					a.widgetData.valueMap.das_telefonbuch ? '<div id="tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_das_telefonbuch"><form class="search_form" id="form_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_dastelefonbuch" action="" onsubmit="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ',\'dastelefonbuch\');return false;"><div class="search_inputs"><input class="search_input_long" name="name" type="text" value="Name" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_long" name="place" type="text" value="ORT, Begriff oder Telefonnummer" onfocus="clearInput(this)" onblur="restoreInput(this);"></div><div class="search_buttons"><div class="widget_button" onclick="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'dastelefonbuch')\">Suchen</div></div></form></div>"
							: "",
					a.widgetData.valueMap.expedia ? '<div id="tab_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_expedia"><form class="search_form" id="form_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '_expedia" action="" onsubmit="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ',\'expedia\');return false;"><div class="search_inputs"><input class="search_input_short_left" name="departure" type="text" value="Abflugort" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_short_right" name="destination" type="text" value="Zielort" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_short_left" name="outward_time" type="text" value="Hinflug (tt.mm.jjjj)" onfocus="clearInput(this)" onblur="restoreInput(this);"><input class="search_input_short_right" name="return_time" type="text" value="R\u00fcckflug (tt.mm.jjjj)" onfocus="clearInput(this)" onblur="restoreInput(this);"></div><div class="search_buttons"><div class="widget_button" onclick="oDeeplinkService.executeSearch('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'expedia')\">Suchen</div></div></form></div>"
							: "", '</div><div class="clear"></div>');
	if (!b)
		return d.toString()
};
allyve.widgets.renderPricesearchingContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="widgetTab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					"_",
					soy.$$escapeHtml(a.widgetInfo.name),
					'" class="widgetTabs"><ul><li><a href="#tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_shopping">shopping.com</a></li><li><a href="#tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_guenstiger">guenstiger.de</a></li><li><a href="#tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_idealo">idealo</a></li><li><a href="#tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_geizkragen">geizkragen</a></li></ul><div id="tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_shopping"></div><div id="tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_guenstiger"></div><div id="tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_idealo"></div><div id="tab_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_geizkragen"></div></div><div class="clear"></div><div class="widget_content_inner_wide floatingContainer"><div class="widget_input_form"><form id="form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_pricesearch" action="/" onsubmit="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'shopping\');return false;"><input class="searchInput" name="search" type="text" value="Suchbegriff" onfocus="clearInput(this)" onblur="restoreInput(this);"><input type="hidden" name="searchengine" id="form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_searchengine" value="shopping"><div class="widget_button" onclick="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'pricesearch')\">Suchen</div></form></div></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderSupportContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widget_content_inner">Fragen? Du erreichst uns unter <a href="mailto:');
	allyve.mandant.supportMailAddress(null, d);
	d.append('">support@mein-cockpit.de</a></div>');
	if (!b)
		return d.toString()
};
allyve.widgets.renderTeleboerseContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append('\t<table class="stock_table"><colgroup><col class="stock_col_0"><col class="stock_col_1"><col class="stock_col_2"><col class="stock_col_3"></colgroup><thead><tr><th class="label_column ellipsis">Bezeichnung</th><th class="value_column">Akt. Kurs</th><th class="value_column">Diff.</th><th class="value_column">Zeit</th></tr></thead><tbody>');
	for ( var e = 0; e < 4; e++)
		d
				.append(a.widgetData.valueMap["name_" + e] ? '<tr><td><div class="blueLink ellipsis" style="width:110px;" onclick="oDeeplinkService.execute('
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ ",'urls/basket/"
						+ soy.$$escapeHtml(a.widgetData.valueMap["isin_" + e])
						+ "')\">"
						+ soy.$$escapeHtml(a.widgetData.valueMap["name_" + e])
						+ '</div></td><td class="value_column">'
						+ soy.$$escapeHtml(a.widgetData.values[e])
						+ '</td><td class="value_column '
						+ soy.$$escapeHtml(a.widgetData.valueMap["difference_"
								+ e] < "0" ? "neg_value" : "pos_value")
						+ '">'
						+ soy.$$escapeHtml(a.widgetData.valueMap["difference_"
								+ e])
						+ '</td><td class="value_column">'
						+ soy.$$escapeHtml(a.widgetData.valueMap["time_" + e])
						+ "</td></tr>"
						: "");
	d.append("</tbody></table>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderLesezeichenContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widget_content_inner"><div class="floatContainer">');
	for ( var e = 0; e < 8; e++)
		d
				.append(a.widgetData.valueMap["book" + e] ? '<div class="bookmark_item"><img width="16" height="16" class="bookmark_item_icon" src="/img/allyve/lesezeichen/external/'
						+ soy.$$escapeHtml(a.widgetData.valueMap["book_icon"
								+ e])
						+ '"><div class="bookmark_item_text ellipsis blueLink" onclick="oDeeplinkService.execute('
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ ",'urlRss/"
						+ soy.$$escapeUri(a.widgetData.valueMap["book" + e])
						+ '\')" title="'
						+ soy.$$escapeHtml(a.widgetData.valueMap["book" + e
								+ "_display"])
						+ '">'
						+ soy.$$escapeHtml(a.widgetData.valueMap["book" + e
								+ "_display"]) + "</div></div>"
						: "");
	d.append("</div></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderNotepadContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widget_content_inner">',
					a.widgetData.valueMap[a.widgetData.uniqueId + "_notepad"] ? soy
							.$$escapeHtml(a.widgetData.valueMap[a.widgetData.uniqueId
									+ "_notepad"])
							: "", a.widgetData.valueMap.notepad ? soy
							.$$escapeHtml(a.widgetData.valueMap.notepad) : "",
					"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderLastfmContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner"><div><div class="width50Percent floatingContent"><div class="blueLink" id="label_2_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'urls/inbox\'); return false;" href="javascript:void(0);">Postfach</div><div class="blueLink" id="label_0_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'urls/friendrequests\'); return false;" href="javascript:void(0);">Freundschaftsanfragen</div></div><div class="width50Percent floatingContentRight"><div class="floatingContentRight blueLink" id="value_0_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'urls/inboxcompose\'); return false;" href="javascript:void(0);">Nachricht verfassen</div><div class="floatingContentRight blueLink" id="value_1_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urls/profile/profile/",
					soy.$$escapeHtml(a.widgetData.valueMap.username),
					'\'); return false;" href="javascript:void(0);">Mein Profil</div></div></div><div class="clear spacer"></div>');
	allyve.widgets.renderSearchFormWithDropDownContent(a, d);
	d.append("</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderZitatContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.valueMap.productLink_0),
					'\')" style="background-image:url(/img/allyve/be_cron/',
					soy.$$escapeHtml(a.widgetData.valueMap.image1Url_0),
					'); cursor: pointer;"></div><div class="widget_content_inner"><div class="zitat_main textLink ellipsis_multiline" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.valueMap.productLink_0),
					'\')" title="',
					soy.$$escapeHtml(a.widgetData.valueMap.shortDescription_0),
					" (",
					soy.$$escapeHtml(a.widgetData.valueMap.productName_0),
					')">',
					soy.$$escapeHtml(a.widgetData.valueMap.shortDescription_0),
					'</div><div class="zitat_sub blueLink ellipsis" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId), ",'", soy
							.$$escapeHtml(a.widgetData.valueMap.productLink_0),
					'\')" title="',
					soy.$$escapeHtml(a.widgetData.valueMap.shortDescription_0),
					" (",
					soy.$$escapeHtml(a.widgetData.valueMap.productName_0),
					')">', soy
							.$$escapeHtml(a.widgetData.valueMap.productName_0),
					"</div></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderStatusContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("\t\t<div>");
	if ("status" == a.widgetInfo.statusView.type) {
		d.append('<form id="widgetStatusForm_', soy
				.$$escapeHtml(a.widgetData.uniqueId),
				'" name="widgetStatusForm_', soy
						.$$escapeHtml(a.widgetData.uniqueId),
				'" method="get" action="" >');
		for ( var e = a.widgetInfo.statusView.content, f = e.length, l = 0; l < f; l++) {
			var m = e[l];
			d
					.append(m.name && m.value ? '<input class="searchInput" name="'
							+ soy.$$escapeHtml(m.value.name)
							+ '" value="'
							+ soy.$$escapeHtml(m.value.val)
							+ '" id="'
							+ soy.$$escapeHtml(m.value.name)
							+ "_"
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" onfocus="clearInput(this)"  onblur="restoreInput(this);" /><div class="widget_button" onclick="oDeeplinkService.executeWidgetAction('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'"
							+ soy.$$escapeHtml(a.widgetInfo.statusView.url)
							+ "', 'widgetStatusForm_"
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '\'); return false;">Update</div><input type="hidden" value="'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" name="unique"/>'
							: "")
		}
	}
	d.append("</form></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderSearchFormContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("\t\t");
	if ("Linkedin" == a.widgetInfo.name) {
		d.append('<div class="spacer">');
		allyve.widgets.renderSearchFormWithDropDownContent(a, d);
		d.append("</div>")
	} else
		d
				.append(
						'<div class="widget_input_form"><form class="standard_search_form" id="form_',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'_search" action="/" onsubmit="oDeeplinkService.executeSearch(',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						',\'search\');return false;"><input class="searchInput" name="search" type="text" value="Suchbegriff" onfocus="clearInput(this)" onblur="restoreInput(this);"><div class="widget_button" onclick="oDeeplinkService.executeSearch(',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						",'search')\">Suchen</div></form></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderSearchFormWithDropDownContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t\t<div><form id="widgetSearchForm_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" method="get" action="" onsubmit="oDeeplinkService.executeWidgetSearchForm(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetInfo.searchView.url),
					'\'); return false;"><div class="widget_button" onclick="oDeeplinkService.executeWidgetSearchForm(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetInfo.searchView.url),
					'\'); return false;">Suchen</div><select name="',
					soy
							.$$escapeHtml(a.widgetInfo.searchView.content[1].value.name),
					'" id="',
					soy
							.$$escapeHtml(a.widgetInfo.searchView.content[1].value.name),
					"_", soy.$$escapeHtml(a.widgetData.uniqueId),
					'" class="widgetselect" >');
	for ( var e = a.widgetInfo.searchView.content[1].value.item, f = e.length, l = 0; l < f; l++) {
		var m = e[l];
		d.append('<option value="', soy.$$escapeHtml(m.val), '">', soy
				.$$escapeHtml(m.value), "</option>")
	}
	d
			.append(
					'</select><input class="searchInput" name="',
					soy
							.$$escapeHtml(a.widgetInfo.searchView.content[3].value.name),
					'" value="',
					soy
							.$$escapeHtml(a.widgetInfo.searchView.content[3].value.val),
					'" id="',
					soy
							.$$escapeHtml(a.widgetInfo.searchView.content[3].value.name),
					"_",
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" /><input type="hidden" value="urlSearch" name="deeplink" /><input type="hidden" value="',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" name="unique"/></form></div>');
	if (!b)
		return d.toString()
};
allyve.widgets.renderLeoContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner"><div class="widget_input_form"><form class="standard_search_form" id="form_',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'_search" action="/" onsubmit="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'search');return false;\"><div><select id=\"leoSelector_",
					soy.$$escapeHtml(a.widgetData.uniqueId),
					'" name="language" class="leoSelect"><option value="ende" ',
					a.widgetData.valueMap.language == "ende" ? 'selected="selected"'
							: "",
					'>Deutsch &lt; &gt; Englisch</option><option value="frde" ',
					a.widgetData.valueMap.language == "frde" ? 'selected="selected"'
							: "",
					'>Deutsch &lt; &gt; Franz\u00f6sisch</option><option value="esde" ',
					a.widgetData.valueMap.language == "esde" ? 'selected="selected"'
							: "",
					'>Deutsch &lt; &gt; Spanisch</option><option value="itde" ',
					a.widgetData.valueMap.language == "itde" ? 'selected="selected"'
							: "",
					'>Deutsch &lt; &gt; Italienisch</option></select></div><div class="spacer"><input class="searchInput" name="search" type="text" value="Suchbegriff" onfocus="clearInput(this)" onblur="restoreInput(this);"><div class="widget_button" onclick="oDeeplinkService.executeSearch(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'search')\">Suchen</div></div></form></div></div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderComputerbilddownloadContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId), ",'urlRss/", soy
							.$$escapeHtml(a.widgetData.homeUrl),
					'\')"></div><div class="widget_content_inner', soy
							.$$escapeHtml(a.widgetInfo.typ),
					'"><div class="" ><p>Die neusten Downloads:</p><ul class="rss-content spacer">');
	for ( var e = 1; e < 3; e++)
		d
				.append(a.widgetData.valueMap["rssentry#" + e + "#title"] ? '<li class="rss-item blackLink" title="'
						+ (a.widgetData.valueMap["rssentry#" + e + "#desc"] ? soy
								.$$escapeHtml(a.widgetData.valueMap["rssentry#"
										+ e + "#desc"])
								: soy
										.$$escapeHtml(a.widgetData.valueMap["rssentry#"
												+ e + "#title"]))
						+ '" onclick="oDeeplinkService.execute('
						+ soy.$$escapeHtml(a.widgetData.uniqueId)
						+ ",'urlRss/"
						+ soy.$$escapeUri(a.widgetData.valueMap["rssentry#" + e
								+ "#url"])
						+ "')\">"
						+ (a.widgetInfo.name == "Witz" ? a.widgetData.valueMap["rssentry#1#desc"]
								: a.widgetData.valueMap["rssentry#" + e
										+ "#title"]) + "</li>"
						: "");
	d.append("</ul></div><div>");
	allyve.widgets.renderSearchFormContent(a, d);
	d.append('</div></div><div class="infoLastUpdated">Letztes Update:<br />',
			soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
			"</div>");
	if (!b)
		return d.toString()
};
allyve.widgets.renderTicketonlineContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					',\'urls/home\')"></div><div class="widget_content_inner"><div>');
	for ( var e = 0; e < 3; e++)
		d
				.append(
						'<div id="value_',
						soy.$$escapeHtml(e),
						"_",
						soy.$$escapeHtml(a.widgetData.uniqueId),
						'" ><a href="javascript:void(0);" onclick="oDeeplinkService.execute(',
						soy.$$escapeHtml(a.widgetData.uniqueId),
						",'urlRss/",
						a.widgetData.valueMap["productLink_" + e],
						'\');" class="blueLink ellipsis">',
						a.widgetData.valueMap["productName_" + e] != null ? a.widgetData.valueMap["productName_"
								+ e]
								: "", "</a></div>");
	d.append('<div class="clear"></div><div>');
	allyve.widgets.renderSearchFormContent(a, d);
	d.append('</div></div><div class="clear"></div>');
	if (!b)
		return d.toString()
};
allyve.widgets.renderHiogiContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widget_content_icon" onclick="oDeeplinkService.execute(',
					soy.$$escapeHtml(a.widgetData.uniqueId),
					",'urlDyn/",
					soy.$$escapeHtml(a.widgetData.homeUrl),
					'\')" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -", soy
							.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px; cursor: pointer;"></div><div class="widget_content_inner">');
	if (a.widgetInfo.view != null)
		if (a.widgetData.values.length > 0) {
			for ( var e = 0; e < 4; e++)
				d
						.append(a.widgetInfo.view[e] != null ? (a.widgetData.values[e] != null ? '<div class="widget_content_label ellipsis" id="label_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="tr-0">'
								+ (a.widgetData.valueMap["label_" + e] != null ? soy
										.$$escapeHtml(a.widgetData.valueMap["label_"
												+ e])
										: soy
												.$$escapeHtml(a.widgetInfo.view[e].value.content))
								+ '</div><div id="value_'
								+ soy.$$escapeHtml(e)
								+ "_"
								+ soy.$$escapeHtml(a.widgetData.uniqueId)
								+ '" class="widget_content_value widget_content_value_fixed tr-1 ellipsis blueLink" '
								+ (a.widgetData.urls[e] != null ? 'onclick="oDeeplinkService.execute('
										+ soy
												.$$escapeHtml(a.widgetData.uniqueId)
										+ ",'urlDyn/"
										+ soy
												.$$escapeHtml(a.widgetData.urls[e])
										+ "')\""
										: 'onclick="oDeeplinkService.execute('
												+ soy
														.$$escapeHtml(a.widgetData.uniqueId)
												+ ",'urlDyn/"
												+ soy
														.$$escapeHtml(a.widgetData.homeUrl)
												+ "')\"")
								+ ">"
								+ a.widgetData.values[e] + "</div>"
								: "")
								+ '<div class="clear"></div>'
								: "");
			d
					.append(a.widgetInfo.df ? '<div class="widget_content_label ellipsis blueLink" id="value_4_'
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ '" onclick="oDeeplinkService.execute('
							+ soy.$$escapeHtml(a.widgetData.uniqueId)
							+ ",'urlDyn/"
							+ soy.$$escapeHtml(a.widgetInfo.df.field)
							+ "')\">"
							+ soy.$$escapeHtml(a.widgetInfo.df.label)
							+ "</div>"
							: "")
		} else
			d
					.append("Aktuell liegen leider keine Daten vor, die angezeigt werden k\u00f6nnen bzw. diese Auto-Login kann aktuell keine Daten anzeigen.");
	a.widgetInfo.hasSearchView == true
			&& allyve.widgets.renderSearchFormContent(a, d);
	a.widgetInfo.hasStatusView == true
			&& allyve.widgets.renderStatusContent(a, d);
	d
			.append(
					'</div><div class="clear"></div><div class="infoLastUpdated">Letztes Update:<br />',
					soy.$$escapeHtml(a.widgetData.valueMap.lastUpdateTimestamp),
					"</div>");
	if (!b)
		return d.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.config == "undefined")
	allyve.config = {};
allyve.config.renderConfigDlg = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="configlayer_content"><div class="sec-block"><img class="sec-image" src="/img/allyve/8-header-body-footer/2-body/logo-tuev.gif" /><img class="sec-image" src="/img/allyve/8-header-body-footer/2-body/logo-mcafee.gif" /></div><div class="modalHeader">Erstelle jetzt Deinen pers\u00f6nlichen Auto-Login f\u00fcr ',
					a.widgetInfo.description,
					'</div><div class="config_dialog_caption">Einfach unten Deine Daten eingeben. So hast Du in Zukunft alles im Blick &mdash; mit einem Klick.<br/>Fragen? Du erreichst uns unter <a href="mailto:');
	allyve.mandant.supportMailAddress(null, d);
	d
			.append(
					'">support@mein-cockpit.de</a></div><div class="clear" ></div><input type="hidden" name="wid" id="wid" value="',
					soy.$$escapeHtml(a.widgetInfo.id),
					'">',
					a.dialog.data.replaceId ? '<input type="hidden" id="replaceId" name="replaceId" value="'
							+ soy.$$escapeHtml(a.dialog.data.replaceId)
							+ '" />'
							: "",
					'<div id="configContent" class="floatContainer"><div id="widgetConfiguration"><div id="widgetConfigurationBorder"><div id="widgetConfigurationContent"><div id="widgetConfigHeader">Auto-Login einrichten</div><div id="widgetConfigInputs">');
	switch (a.widgetInfo.name) {
	case "Ebaybuyer":
		allyve.config.renderEbaybuyerConfig(a, d);
		break;
	case "Esprit":
	case "Smatch":
		allyve.config.renderEspritSmatchConfig(a, d);
		break;
	case "Magicprice":
		allyve.config.renderMagicPriceConfig(a, d);
		break;
	case "Notepad":
		allyve.config.renderNotepadConfig(a, d);
		break;
	case "Xing":
	case "Twitter":
	case "Hiogi":
	case "Facebook":
		allyve.config.renderOAuthConfig(a, d);
		break;
	case "Lesezeichen":
		allyve.config.renderBookmarksConfig(a, d);
		break;
	case "Searching":
		allyve.config.renderSearchingConfig(a, d);
		break;
	case "Teleboerse":
		allyve.config.renderTeleboerseConfig(a, d);
		break;
	case "Wetter":
		allyve.config.renderWetterConfig(a, d);
		break;
	default:
		allyve.config.renderStandardConfig(a, d)
	}
	d
			.append(
					'</div><div class="modal_dialog_error">',
					a.dialog.data.error ? soy.$$escapeHtml(a.dialog.data.error)
							: "",
					'</div><div id="widgetConfigurationActions" style="',
					a.dialog.data.hasOwnButtons ? "display:none;" : "",
					'"><div class="orange_button modal_dialog_buttons" id="modal_dialog_buttons_yes">Fertigstellen</div><div class="modal_dialog_wait" style="display:none"><img width="24" height="24" border="0" alt="" src="img/loader.gif" /></div></div></div></div></div><div id="widgetPreview"><div id="widgetPreviewHeader" class="previewHeader">Vorschau:</div><div id="widgetPreviewImageText">So sieht ein eingerichteter ',
					soy.$$escapeHtml(a.widgetInfo.description),
					'-Auto-Login aus:</div><div id="widgetPreviewImage"><img alt="" src="/img/allyve/4-widgets/1-vorschau/allyve-widget-',
					soy.$$escapeHtml(a.widgetInfo.name_lc),
					'.gif"></div>',
					a.widgetInfo.configTeaser ? '<div id="widgetConfigTeaser">'
							+ (a.widgetInfo.configTeaser.headline ? '<div class="previewHeader">'
									+ (a.widgetInfo.configTeaserheadlineLink ? '<a href="'
											+ soy
													.$$escapeHtml(a.widgetInfo.configTeaserheadlineLink)
											+ '" target="_blank">'
											: "")
									+ soy
											.$$escapeHtml(a.widgetInfo.configTeaser.headline)
									+ (a.widgetInfo.configTeaserheadlineLink ? "</a>"
											: "") + "</div>"
									: "")
							+ (a.widgetInfo.configTeaser.body ? '<div class="teaserBody">'
									+ soy
											.$$escapeHtml(a.widgetInfo.configTeaser.body)
									+ "</div>"
									: "")
							+ (a.widgetInfo.configTeaser.buttonLink ? '<div class="grey_button modal_dialog_buttons" id="partner_register_button" ><a href="'
									+ soy
											.$$escapeHtml(a.widgetInfo.configTeaser.buttonLink)
									+ '" target="_blank">Jetzt kostenlos anmelden!</a></div>'
									: "") + "</div>"
							: "", "</div></div></div>");
	if (!b)
		return d.toString()
};
allyve.config.renderDeleteDlg = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					"\t<div>Achtung, willst Du den ",
					soy.$$escapeHtml(a.widgetInfo.description),
					'-Auto-Login wirklich l\u00f6schen?</div><div><button onclick="widgetsetup.remove(',
					soy.$$escapeHtml(a.uniqueId),
					');modalDialog.hide();">Ja</button><button onclick="modalDialog.hide()">Nein</button></div>');
	if (!b)
		return d.toString()
};
allyve.config.renderStandardConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Gib hier Deine Zugangsdaten ein:</div></div><div class="clear" ></div><div class="widgetConfigInput"><table>');
	for ( var e = a.widgetInfo.clabels, f = e.length, l = 0; l < f; l++) {
		var m = e[l];
		switch (l) {
		case 0:
			d
					.append(
							'<tr><td><label for="config_input_',
							soy.$$escapeHtml(l),
							'">',
							soy.$$escapeHtml(m.caption != null ? m.caption
									: m.content),
							'</label></td><td><input class="config_input modal_dialog_input_first required" id="config_input_',
							soy.$$escapeHtml(l), '" name="',
							soy.$$escapeHtml(m.fieldname != null ? m.fieldname
									: "uid"), '" type="', soy
									.$$escapeHtml(m.type != null ? m.type
											: "text"), '" value="',
							a.dialog.data.uid ? soy
									.$$escapeHtml(a.dialog.data.uid) : "",
							'" /></td></tr>');
			break;
		case 1:
			d
					.append(
							'<tr><td><label for="config_input_',
							soy.$$escapeHtml(l),
							'">',
							soy.$$escapeHtml(m.caption != null ? m.caption
									: m.content),
							'</label></td><td><input class="config_input" id="config_input_',
							soy.$$escapeHtml(l), '" name="',
							soy.$$escapeHtml(m.fieldname != null ? m.fieldname
									: "pwd"), '" type="', soy
									.$$escapeHtml(m.type != null ? m.type
											: "password"),
							'" value="" /></td></tr>');
			break;
		default:
			d
					.append(
							'<tr><td><label for="config_input_',
							soy.$$escapeHtml(l),
							'">',
							soy.$$escapeHtml(m.caption != null ? m.caption
									: m.content),
							'</label></td><td><input class="config_input" id="config_input_',
							soy.$$escapeHtml(l), '" name="', soy
									.$$escapeHtml(m.fieldname), '" type="', soy
									.$$escapeHtml(m.type != null ? m.type
											: "text"),
							'" value="" /></td></tr>')
		}
	}
	d.append("</table></div>");
	if (!b)
		return d.toString()
};
allyve.config.renderBookmarksConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Gib hier Deine Zugangsdaten ein:</div></div><div class="clear" ></div><div class="widgetConfigInput"><table>');
	for ( var e = a.widgetInfo.clabels, f = e.length, l = 0; l < f; l++) {
		var m = e[l];
		d
				.append(
						'<tr><td><label for="config_input_',
						soy.$$escapeHtml(l),
						'">',
						soy.$$escapeHtml(m.caption != null ? m.caption
								: m.content),
						'</label></td><td><input class="config_input" id="config_input_',
						soy.$$escapeHtml(l),
						'" name="',
						soy.$$escapeHtml(m.fieldname),
						'" type="',
						soy.$$escapeHtml(m.type),
						'" value="',
						soy
								.$$escapeHtml(a.dialog.data
										&& a.dialog.data.valueMap
										&& a.dialog.data.valueMap["book" + l] ? a.dialog.data.valueMap["book"
										+ l]
										: ""), '" /></td></tr>')
	}
	d.append("</table></div>");
	if (!b)
		return d.toString()
};
allyve.config.renderNotepadConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Gib hier Deine Notizen ein:</div></div><div class="clear" ></div><div class="widgetConfigInput"><textarea name="notepad" id="notepad" class="notepad_input_field">',
					a.dialog.data && a.dialog.data.valueMap ? soy
							.$$escapeHtml(a.dialog.data.valueMap.notepad) : "",
					"</textarea></div>");
	if (!b)
		return d.toString()
};
allyve.config.renderMagicPriceConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">M\u00f6chtest Du Produkte f\u00fcr M\u00e4nner oder Frauen angezeigt bekommen?</div></div><div class="clear" ></div><div class="widgetConfigInput"><div><input type="radio" name="gender" value="female" checked="checked"/>&nbsp;<span>Produkte f&#252;r Frauen</span><br /><input type="radio" name="gender" value="male"/>&nbsp;<span>Produkte f&#252;r M&#228;nner</span></div><div class="configDesc">Wenn Du einen Account bei Magic-Price hast, gib hier bitte Deine Zugangsdaten ein.</div><input id="config_uid" name="uid" type="text" ><input id="config_pwd" name="pwd" type="password" ><div class="configDesc">Wenn Du keinen Account bei Magic-Price hast, kannst Du die Felder einfach leer lassen und direkt hier klicken:</div></div>');
	if (!b)
		return d.toString()
};
allyve.config.renderEspritSmatchConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Welche Produkte m\u00f6chtest Du angezeigt bekommen?</div></div><div class="clear" ></div><div class="widgetConfigInput"><div><input type="radio" name="gender" value="female" checked="checked"/>&nbsp;<span>Produkte f&#252;r Frauen</span><br /><input type="radio" name="gender" value="male"/>&nbsp;<span>Produkte f&#252;r M&#228;nner</span><br /><input type="radio" name="gender" value="both"/>&nbsp;<span>alle Produkte</span></div></div>');
	if (!b)
		return d.toString()
};
allyve.config.renderSearchingConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Bitte w\u00e4hle Deine Suchmaschinen:</div></div><div class="clear" ></div><div class="widgetConfigInput"><div class="config_radio_list">',
					a.dialog.data.replaceId ? "" : "",
					'<div class="search_radio_item"><input id="gelbe_seiten" type="checkbox" value="1" name="gelbe_seiten"> Gelbe Seiten</div><div class="search_radio_item"><input id="dbahn" type="checkbox" value="1" name="dbahn"> Deutsche Bahn</div><div class="search_radio_item"><input id="google_maps" type="checkbox" value="1" name="google_maps"> Google Maps</div><div class="search_radio_item"><input id="google_route" type="checkbox" value="1" name="google_route"> Google Route</div><div class="search_radio_item"><input id="das_telefonbuch" type="checkbox" value="1" name="das_telefonbuch"> Das Telefonbuch</div><div class="search_radio_item"><input id="expedia" type="checkbox" value="1" name="expedia"> Expedia</div></div></div>');
	if (!b)
		return d.toString()
};
allyve.config.renderEbaybuyerConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Unser Partner ebay ben\u00f6tigt Deine Erlaubnis, damit der ebay-Auto-Login bei mein-cockpit.de freigeschaltet werden kann. Gib hierf\u00fcr bitte zun\u00e4chst Deinen Benutzernamen an:</div></div><div class="clear" ></div><div class="widgetConfigInput"><div class="floatContainer"><label for="config_uid" class="formlabel">',
					soy.$$escapeHtml(a.widgetInfo.clabels.c0),
					'</label><div class="floatinput"><input class="config_input modal_dialog_input_first required" id="config_uid" name="uid" type="text" value="',
					a.dialog.data.uid ? soy.$$escapeHtml(a.dialog.data.uid)
							: "",
					'"></div></div><div class="clear" ></div><div class="configDesc">Klicke dann unten auf "Weiter". Logge Dich bei ebay ein und klicke dort auf "I&nbsp;agree".</div></div>');
	if (!b)
		return d.toString()
};
allyve.config.renderFacebookConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Unser Partner facebook ben\u00f6tigt Deine Erlaubnis, damit der facebook-Auto-Login bei mein-cockpit.de freigeschaltet werden kann.</div></div><div class="clear" ></div><div class="widgetConfigInput"><script type="text/javascript">if(typeof FB != "undefined") delete FB;<\/script><script type="text/javascript" src="https://ssl.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php/de_DE"><\/script><input name="fb_session_key" id="fb_session_key" value="" type="hidden"><input name="fb_user_secret" id="fb_user_secret" value="" type="hidden"><input name="fb_user_id"     id="fb_user_id"     value="" type="hidden"><div id="fb_permission">&nbsp;</div><div id="fb_error" style="display:none">error</div><div id="fb_retry" style="display:none">retry</div><div id="fb_config_buttons" ><div id="fb_start"><div class="orange_button" onclick="startFbConfig()">Connect</div></div><div id="fb_wait" style="display:none"><img width="24" height="24" border="0" alt="" src="img/loader.gif" /></div></div><div id="fb_ok" style="display:none">Fertigstellen</div></div>');
	if (!b)
		return d.toString()
};
allyve.config.renderOAuthConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div><div class="widgetConfigSpecialInfo">Unser Partner ',
					soy.$$escapeHtml(a.widgetInfo.description),
					" ben\u00f6tigt Deine Erlaubnis, damit der ",
					soy.$$escapeHtml(a.widgetInfo.description),
					'-Auto-Login bei mein-cockpit.de freigeschaltet werden kann.</div><div id="removeWidgetAfterIncompleteSetup" style="display:none"></div></div>');
	if (!b)
		return d.toString()
};
allyve.config.userSettings = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="settings_description"> Hier kannst Du Einstellungen zu Deiner mein-cockpit.de Startseite \u00e4ndern.<br/>Fragen? Du erreichst uns unter <a href="mailto:');
	allyve.mandant.supportMailAddress(null, a);
	a
			.append('">support@mein-cockpit.de</a></div><div id="usersettingsItems" class="settings_content"><ul class="userSettingsList"><li id="account_change_email">Benutzername \u00e4ndern</li><li id="account_change_password">Passwort \u00e4ndern</li><li id="account_change_newsletter">Newsletter abonnieren</li><li id="account_delete">Mein Benutzerkonto l\u00f6schen</li></ul></div>');
	if (!b)
		return a.toString()
};
allyve.config.changePassword = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="settings_description"><div>Hier kannst Du Dein mein-cockpit-Passwort \u00e4ndern f\u00fcr<br/>Deine pers\u00f6nliche mein-cockpit.de Startseite.<br/></div><div class="spacer">Fragen? Du erreichst uns unter support@mein-cockpit.de<br/><br/></div>Um Dein Passwort zu \u00e4ndern, trage bitte in die folgenden Felder Dein altes und neues Passwort ein.</div><div class="settings_content"><form id="changePasswordForm" action="#" method="post"><fieldset><div class="formlabel">Dein altes Passwort</div><input type="password" class="text form_input_text required" id="changePasswordForm_password_old" name="password_old" value="" /><span id="password_old_error" class="error" style="display: none;"></span><div class="clear"></div><div class="formlabel">Dein neues Passwort</div><input type="password" class="text form_input_text required" id="changePasswordForm_password" name="password" value="" /><div class="clear"></div><div class="formlabel">Dein neues Passwort (Wiederholung)</div><input type="password" class="text form_input_text required" id="changePasswordForm_password_rep" name="password_rep" value="" /><div class="clear"></div></fieldset><div id="changePasswordError" class="error" style="display: none;">Kennwort konnte nicht ge\u00e4ndert werden.</div></form></div>');
	if (!b)
		return a.toString()
};
allyve.config.newsletterSettings = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="settings_description">Bestelle hier den mein-cockpit.de Newsletter um immer aktuell \u00fcber die neuesten Verbesserungen informiert zu sein.<br/>Fragen? Du erreichst uns unter support@mein-cockpit.de</div><div class="spacer"><div id="newsletterFormQuestion">Ja, ich m\u00f6chte immer aktuell informiert sein und wissen, wenn mein-cockpit.de f\u00fcr mich erweitert und verbessert wird.</div><div id="newsletterFormContent"><form id="newsletterForm" action="#" method="post"><fieldset><div><label for="newsletter1"><input type="radio" id="newsletter1" name="newsletter" value="true" />Ja, informiert mich!</label></div><div class="clear"></div><div><label for="newsletter2"><input type="radio" id="newsletter2" name="newsletter" value="false" checked="checked"/>Nein, kein Interesse</label></div><div class="clear"></div></fieldset></form></div></div>');
	if (!b)
		return a.toString()
};
allyve.config.changeEmail = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="settings_description">Hier kannst Du Deinen Benutzernamen, der bei mein-cockpit.de aus der E-Mail-Adresse besteht, \u00e4ndern.<br/>Fragen? Du erreichst uns unter support@mein-cockpit.de</div><div class="settings_content"><form id="changeEmailForm" action="#" method="post"><fieldset><div class="formlabel">Passwort:</div><input type="password" class="text form_input_text required" id="changeEmailForm_password" name="password" value="" minlength="6" /><div class="clear"></div><div class="formlabel">Deine neue E-Mail-Adresse:</div><input type="text" class="text form_input_text required email" id="changeEmailForm_username" name="username" value="" /><div class="clear"></div><div class="formlabel">Deine neue E-Mail-Adresse (Wiederholung):</div><input type="text" class="text form_input_text required email" id="changeEmailForm_username_rep" name="username_rep" value="" /></fieldset><div id="changeEmailError" class="error" style="display: none;">E-Mail-Adresse konnte nicht ge\u00e4ndert werden.</div></form></div>');
	if (!b)
		return a.toString()
};
allyve.config.changeEmailSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div>Benutzername \u00e4ndern - nur noch 1 Schritt</div><div class="settings_content">mein-cockpit.de hat Dir eine Best\u00e4tigungs-E-Mail geschickt. Vermutlich liegt diese E-Mail bereits in Deinem Posteingang.<br><b>Um \u00c4nderungen Deines Benutzernamens abzuschlie\u00dfen, klicke bitte auf den Link in der E-Mail.</b><br><br>Falls Du die E-Mail nicht in Deinem Posteingang findest, schaue bitte nach, ob sie f\u00e4lschlicherweise im Spamordner gelandet ist.<br><br>Dein Team von mein-cockpit.de</div>');
	if (!b)
		return a.toString()
};
allyve.config.deleteAccount = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="settings_description"><div>Hier kannst Du Dein mein-cockpit.de Benutzerkonto l\u00f6schen. Bitte lies dazu den folgenden Hinweistext!</div><div class="warning">Wenn Du Dein Benutzerkonto l\u00f6schst, werden alle Deine Eintr\u00e4ge in mein-cockpit.de unwiederbringlich gel\u00f6scht. Dein Benutzerkonto kann nicht wiederhergestellt werden.</div></div><div class="settings_content"><form id="deleteAccountForm" action="#" method="post"><fieldset><div class="formlabel">Passwort:</div><input type="password" class="text" id="password" name="password" value="" /><div class="clear"></div></fieldset><div id="account_error" class="error" style="display: none;">Der Account konnte nicht gel\u00f6scht werden.</div></form></div>');
	if (!b)
		return a.toString()
};
allyve.config.registerUser = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div id="registerDialogContent"><div class="sec-block"><img class="sec-image" src="/img/allyve/8-header-body-footer/2-body/logo-tuev.gif" /><img class="sec-image" src="/img/allyve/8-header-body-footer/2-body/logo-mcafee.gif" /></div><div class="modalHeader">Registriere Dich: Kostenlos und sicher</div><div id="registerDialogFormContent"><form id="registrationDialogForm" action="#" method="post"><div id="registerDialogFormLeft" class="registerDialogSegment"><div class="clear"></div><div class="form_reg_field"><label for="email_dialog"><span class="formlabel">E-Mail</span><br/></label><input type="text" class="text required email" id="email_dialog" name="username" value="" tabindex="21" autocomplete="off" /></div><div id="reg_error_dialog" class="error indented"> </div><div class="form_reg_field"><label for="email_rep_dialog"><span class="formlabel">E-Mail (Wiederholung)</span><br/></label><input type="text" class="text required email" id="email_rep_dialog" name="username_rep" value="" tabindex="22" autocomplete="off" /></div><div class="form_reg_field"><label for="reg_password_dialog"><span class="formlabel">Passwort</span><br/></label><input type="password" id="reg_password_dialog" class="text required" name="password" value="" tabindex="23" autocomplete="off" /></div><div class="form_reg_field"><label for="reg_password_rep_dialog"><span class="formlabel">Passwort (Wiederholung)</span><br/></label><input type="password" id="reg_password_rep_dialog" class="text required" name="password_rep" value="" tabindex="24" autocomplete="off"/></div><div class="spacer"></div><div class="bold">Passwortst\u00e4rke</div><div id="rdsContainer"><div id="registerDialogStrength"></div></div></div><div id="registerDialogFormRight" class="registerDialogSegment"><div class="clear"></div><div><label for="newsletter_dialog"><input type="checkbox" name="newsletter" id="newsletter_dialog" tabindex="24"><span class="formlabel2">Newsletter abonnieren</span></label></div><div class="spacer"><input type="checkbox" name="agb_confirmed" id="agb_confirmed_dialog" tabindex="25" class="required"><label for="agb_confirmed_dialog"><span class="formlabel2">Ich akzeptiere die <span class="underline"><a href="/?showdialog=agb" onclick="return popup(\'agb\', \'/static/agb.html\');" target="_blank">AGB</a></span> und die <span class="underline"><a href="/?showdialog=datenschutz" onclick="return popup(\'datenschutz\', \'/static/datenschutz.html\');"target="_blank">Datenschutzbestimmungen</a></span> der allyve GmbH & Co. KG</span></label></div><div id="registerDialogFormActions"><div class="orange_button" id="registerDialogFormRegister">Registrierung abschlie\u00dfen und mein-cockpit.de nutzen</div><div class="spacer"></div><div class="grey_button" id="registerDialogFormCancel">Abbrechen</div></div></div></form></div><div class="clear"></div></div>');
	if (!b)
		return a.toString()
};
allyve.config.showLoginError = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("\tAnmeldung fehlgeschlagen, bitte \u00fcberpr\u00fcfen Deine Zugangsdaten ");
	if (!b)
		return a.toString()
};
allyve.config.renderWetterConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="widgetConfigInputHeader configDesc"><div class="widget_content_icon" style="background-image:url(/img/allyve/3-logostripe/',
					soy.$$escapeHtml(a.widgetInfo.iconName),
					");background-position: -",
					soy.$$escapeHtml(a.widgetInfo.iconOffset),
					'px 0px;"></div></div><div><p>Bitte gib einen Ort ein:</p><input type="text" id="wetter_location" name="wetter_location" onkeyup="{oAllyve.getWidgets().showWeatherLocations(\'wetter_location\',\'weatherList\',event.keyCode)};"/><span id="weatherAutocompleteWait" class="autocompleteWait" style="display:none;"><img height="24" border="0" width="24" src="img/loader.gif" alt=""></span><span id="weatherList"></span></div>');
	if (!b)
		return d.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.modaldialog == "undefined")
	allyve.modaldialog = {};
allyve.modaldialog.renderDialog = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("\t");
	switch (a.dialog.id) {
	case "ok":
		allyve.modaldialog.dialogOk(a, d);
		break;
	case "yesno":
		allyve.modaldialog.dialogYesNo(a, d);
		break;
	case "config":
		allyve.modaldialog.dialogConfig(a, d);
		break;
	default:
		allyve.modaldialog.dialogYesNo(a, d)
	}
	if (!b)
		return d.toString()
};
allyve.modaldialog.dialogYesNo = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append('\t<div class="modalHeader">', soy.$$escapeHtml(a.dialog.title),
			"</div>",
			a.dialog.data.caption ? '<div class="modal_dialog_caption">'
					+ soy.$$escapeHtml(a.dialog.data.caption) + "</div>" : "",
			a.dialog.data.text ? '<div class="modal_dialog_text">'
					+ soy.$$escapeHtml(a.dialog.data.text) + "</div>" : "",
			a.dialog.data.html ? '<div class="modal_dialog_text">'
					+ a.dialog.data.html + "</div>" : "");
	if (a.dialog.data.hiddenfields) {
		d.append("<div>");
		for ( var e = a.dialog.data.hiddenfields, f = e.length, l = 0; l < f; l++) {
			var m = e[l];
			d.append('<input type="hidden" id="', soy.$$escapeHtml(m.id),
					'" value="', soy.$$escapeHtml(m.value), '" />')
		}
		d.append("</div>")
	}
	d
			.append(
					'<div class="modal_dialog_actionbar full_width"><div class="modal_dialog_buttons"><div class="grey_button" id="modal_dialog_buttons_no" onclick="modalDialog.wait();',
					a.dialog.data.noFunction ? soy
							.$$escapeHtml(a.dialog.data.noFunction)
							+ ";" : "", 'modalDialog.hide()">');
	if (a.type)
		switch (a.type) {
		case 1:
			d.append("Nein");
			break;
		case 2:
			d.append("Abbrechen");
			break;
		default:
			d.append("Nein")
		}
	else
		d.append("Nein");
	d
			.append(
					'</div><div class="orange_button" id="modal_dialog_buttons_yes" onclick="',
					a.dialog.data.wait ? "modalDialog.wait();" : "",
					a.dialog.data.yesFunction ? soy
							.$$escapeHtml(a.dialog.data.yesFunction)
							+ ";" : "",
					a.dialog.data.close ? "modalDialog.hide();" : "", '">');
	if (a.type)
		switch (a.type) {
		case 1:
			d.append("Ja");
			break;
		case 2:
			d.append("OK");
			break;
		default:
			d.append("Ja")
		}
	else
		d.append("Ja");
	d
			.append('</div></div><div class="modal_dialog_wait" style="display:none"><img width="24" height="24" border="0" alt="" src="img/loader.gif" /></div></div>');
	if (!b)
		return d.toString()
};
allyve.modaldialog.dialogOk = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append('\t<div class="modalHeader">', soy.$$escapeHtml(a.dialog.title),
			"</div>",
			a.dialog.data.caption ? '<div class="modal_dialog_caption">'
					+ soy.$$escapeHtml(a.dialog.data.caption) + "</div>" : "",
			a.dialog.data.text ? '<div class="modal_dialog_text">'
					+ soy.$$escapeHtml(a.dialog.data.text) + "</div>" : "",
			a.dialog.data.html ? '<div class="modal_dialog_text">'
					+ a.dialog.data.html + "</div>" : "");
	if (a.dialog.data.hiddenfields) {
		d.append("<div>");
		for ( var e = a.dialog.data.hiddenfields, f = e.length, l = 0; l < f; l++) {
			var m = e[l];
			d.append('<input type="hidden" id="', soy.$$escapeHtml(m.id),
					'" value="', soy.$$escapeHtml(m.value), '" />')
		}
		d.append("</div>")
	}
	d
			.append(
					a.dialog.data.staticFile ? '<div id="modal_file_content" style="height: '
							+ soy.$$escapeHtml(a.dialog.height - 150)
							+ 'px;overflow: none;"> </div><script type="text/javascript">$("#modal_file_content").load("/static/'
							+ soy.$$escapeHtml(a.dialog.data.staticFile)
							+ '.html", "", reinitModalScrollPane);<\/script>'
							: "",
					a.type == null || a.type && a.type == 1 ? '<div class="modal_dialog_actionbar"><div class="modal_dialog_buttons"><div class="grey_button" id="modal_dialog_buttons_ok" onclick="modalDialog.wait();'
							+ (a.dialog.data.okFunction ? soy
									.$$escapeHtml(a.dialog.data.okFunction)
									+ ";" : "")
							+ (a.dialog.data.close ? "modalDialog.hide();" : "")
							+ '">'
							+ (a.dialog.data.okCaption ? soy
									.$$escapeHtml(a.dialog.data.okCaption)
									: "OK")
							+ '</div></div><div class="modal_dialog_wait" style="display:none"><img width="24" height="24" border="0" alt="" src="img/loader.gif" /></div></div>'
							: "");
	if (!b)
		return d.toString()
};
allyve.modaldialog.dialogConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					"\t",
					a.dialog.data.caption ? '<div class="modal_dialog_caption">'
							+ soy.$$escapeHtml(a.dialog.data.caption)
							+ "</div>"
							: "",
					a.dialog.data.text ? '<div class="modal_dialog_text">'
							+ soy.$$escapeHtml(a.dialog.data.text) + "</div>"
							: "",
					a.dialog.data.content ? '<div class="modal_dialog_text">'
							+ a.dialog.data.content + "</div>" : "",
					a.dialog.data.replaceId ? '<input type="hidden" id="replaceId" name="replaceId" value="'
							+ soy.$$escapeHtml(a.dialog.data.replaceId)
							+ '" />'
							: "");
	if (a.dialog.data.hiddenfields) {
		d.append("<div>");
		for ( var e = a.dialog.data.hiddenfields, f = e.length, l = 0; l < f; l++) {
			var m = e[l];
			d.append('<input type="hidden" id="', soy.$$escapeHtml(m.id),
					'" name="', soy.$$escapeHtml(m.id), '" value="', soy
							.$$escapeHtml(m.value), '" />')
		}
		d.append("</div>")
	}
	d
			.append(
					'<div class="modal_dialog_error">',
					a.dialog.data.error ? soy.$$escapeHtml(a.dialog.data.error)
							: "",
					'</div><div class="modal_dialog_actionbar"><div class="modal_dialog_buttons"><div class="button" onclick="modalDialog.wait();',
					a.dialog.data.okFunction ? soy
							.$$escapeHtml(a.dialog.data.okFunction)
							+ ";" : "",
					'">ok</div></div><div class="modal_dialog_wait" style="display:none"><img width="24" height="24" border="0" alt="" src="img/loader.gif" /></div></div>');
	if (!b)
		return d.toString()
};
allyve.modaldialog.showPasswordRequest = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="modalHeader">Gleich bist Du wieder online</div><div class="modal_dialog_text">Gib einfach Deine E-Mailadresse unten ein. Wir senden Dir umgehend eine E-Mail mit einem Aktivierungslink. Dann kannst Du mein-cockpit.de wieder uneingeschr\u00e4nkt nutzen.</div><form id="showPasswordRequest_form" onsubmit="return false;" action=""><div style="overflow: hidden"><label for="showPasswordRequest_form_email"><span class="formlabel">E-Mail Adresse:&nbsp;</span><input type="text" id="showPasswordRequest_form_email" class="text required email" name="username" value="" autocomplete="off"/></label></div><div class="modal_dialog_actionbar"><div class="modal_dialog_buttons"><div class="grey_button" onclick="$(\'#showPasswordRequest_form\').submit()">Senden</div></div><div class="modal_dialog_wait" style="display:none"><img width="24" height="24" border="0" alt="" src="img/loader.gif" /></div></div></form>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.askForNewPassword = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="modalHeader">Neues mein-cockpit-Passwort vergeben</div><div class="modal_dialog_text">Achtung: Mit dem Zur\u00fccksetzen Deines Passworts musst Du auch alle Deine pers\u00f6nlichen Auto-Logins wieder neu einrichten.<br/>In mein-cockpit.de werden Deine Auto-Login Passw\u00f6rter aus Sicherheitsgr\u00fcnden stets mit Deinem mein-cockpit-Passwort verschl\u00fcsselt. Deshalb kann mein-cockpit.de die Auto-Login-Passw\u00f6rter ohne Dein mein-cockpit-Passwort nicht wieder herstellen.</div><form id="setNewPassword_form" onsubmit="return false;" action=""><div style="overflow: hidden"><div><label for="askForNewPassword_form_password"><span class="formlabel">Neues mein-cockpit-Passwort:</span></label></div><div><input type="password" id="askForNewPassword_form_password" class="text required" name="password" value="" autocomplete="off"/></div><div class="spacer"><label for="askForNewPassword_form_password_rep"><span class="formlabel">Neues mein-cockpit-Passwort Wiederholung:</span></label></div><div><input type="password" id="askForNewPassword_form_password_rep" class="text required" name="password_rep" value="" autocomplete="off"/></div></div><div class="modal_dialog_actionbar"><div class="modal_dialog_buttons"><div class="button" onclick="$(\'#setNewPassword_form\').submit()">Speichern</div></div><div class="modal_dialog_wait" style="display:none"><img width="24" height="24" border="0" alt="" src="img/loader.gif" /></div></div></form>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.registerSuccessDialog = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="floatContainer"><div class="floatingContent"><img src="/img/allyve/7-layer/1-basics/bestaetigung-haken.gif"></div><div class="floatingContent register_success_textblock"><div class="spacer_large"></div><div class="modalHeader">Nur noch Deine E-Mail best\u00e4tigen und Du kannst loslegen!</div><div class="modal_dialog_text">Du erh\u00e4lst in K\u00fcrze eine E-Mail mit Deinem Aktivierungslink. Mit einem Klick auf den Link schlie\u00dft Du die Registrierung vollst\u00e4ndig ab und kannst dann sofort Deine neue Startseite nutzen.</div><div class="spacer_large"></div><div class="modal_dialog_buttons"><div class="grey_button" id="modal_dialog_buttons_ok">OK</div></div></div></div>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.activationSuccessDialog = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="floatContainer"><div class="floatingContent register_success_textblock"><div class="spacer_large"></div><div class="modalHeader">Herzlich willkommen auf mein-cockpit.de!</div><div class="modal_dialog_text">Dein Benutzerkonto wurde erfolgreich aktiviert! Logge Dich nun ein (entweder per Personalausweis + PIN, loginCard + PIN oder Benutzername + Passwort) und dann:<br/>Viel Spa\u00df auf mein-cockpit.de!</div><div class="spacer_large"></div><div class="modal_dialog_buttons"><div class="grey_button" id="modal_dialog_buttons_ok">OK</div></div></div><div class="floatingContentRight"><img src="/img/allyve/7-layer/1-basics/willkommen-mann.gif"></div></div>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.activationFailedDialog = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="floatContainer"><div class="floatingContent register_success_textblock"><div class="spacer_large"></div><div class="modalHeader">Fehler bei der Aktivierung</div><div class="modal_dialog_text">Die Aktivierung konnte nicht durchgef\u00fchrt werden. Bitte versuche es erneut.<br/>Falls Du den Aktivierungslink schon einmal erfolgreich ausgef\u00fchrt hast, bist Du bereits aktiviert. Viel Spa\u00df auf mein-cockpit.de!</div><div class="spacer_large"></div><div class="modal_dialog_buttons"><div class="grey_button" id="modal_dialog_buttons_ok">OK</div></div></div><div class="floatingContentRight"><img src="/img/allyve/7-layer/1-basics/fehler-kreuz.gif"></div></div>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.noLoginHint = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div>Dieser Anbieter unterst\u00fctzt noch nicht den automatischen mein-cockpit.de-Login. Wir arbeiten daran.</div><div class="spacer">Unser Vorschlag f\u00fcr die Zwischenzeit: <a href="http://blog.allyve.com/der-allyve-tipp-zur-verlinkung-in-deinen-account/" target="_blank">Hier geht es zum mein-cockpit-Tipp f\u00fcr eine Verlinkung in Dein Benutzerkonto</a>.</div>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.activationHint = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('<div class="modalHeader">Achtung</div><div class="modal_dialog_text">Bevor Du mein-cockpit.de nutzen kannst, musst Du Deine E-Mailadresse best\u00e4tigen. Klicke hierzu den Link in deiner Registrierungsemail.\nSolltest Du diese nicht mehr besitzen, kannst Du sie hier direkt neu anfordern.</div><div><label for="resendActivationEmailField"><span class="formlabel">E-Mail Adresse:</span></label></div><div><input type="text" id="resendActivationEmailField" class="text required floatingContent" name="requestemail" value="" autocomplete="off" /><div class="grey_button small_button floatingContent" id="btnResendActivationEmail" onclick="account.resendActivationMail($(\'#resendActivationEmailField\').val());">Anfordern</div></div>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.alertBoxContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append(a.title != null ? '<div class="modalHeader">' + a.title + "</div>"
			: "", '<div class="modal_dialog_text">', a.message, "</div>");
	if (!b)
		return d.toString()
};
allyve.modaldialog.lpPreviewContent = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div>Auf mein-cockpit.de kannst Du Dir bequem und sicher Deine pers\u00f6nliche Internet-Startseite einrichten. So beh\u00e4lst Du stets alle Deine Lieblingsdienste im Blick - mit einem Klick. Denn Du siehst sofort, was bei Deinen Lieblingsdiensten hinter den Kulissen passiert (z.B. neue E-Mails, neue Kontaktanfragen, Status Deiner Bestellung im Online-Shop, etc.). F\u00fcr Web-Dienste, die unsere Auto-Login-Technik noch nicht unterst\u00fctzen, kannst Du Dir zus\u00e4tzlich einen "Account" (inkl. Zugangsdaten) oder ein "Lesezeichen" speichern.</div><div class="previewImage"><img src="/img/allyve/7-layer/1-basics/vorschau-allyve.gif"></div>');
	if (!b)
		return a.toString()
};
allyve.modaldialog.lpPreviewHeader = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Vorschau mein-cockpit.de");
	if (!b)
		return a.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.i18n == "undefined")
	allyve.i18n = {};
allyve.i18n.maintenanceHeader = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Wartungsarbeiten");
	if (!b)
		return a.toString()
};
allyve.i18n.maintenanceMessage = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Das Backend ist tempor\u00e4r nicht erreichbar. Bitte versuche es zu einem sp\u00e4teren Zeitpunkt erneut.");
	if (!b)
		return a.toString()
};
allyve.i18n.deleteWidget_caption = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Achtung!");
	if (!b)
		return a.toString()
};
allyve.i18n.deleteWidget_text = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("M\u00f6chtest Du den ", a.data[0],
			"-Auto-Login wirklich l\u00f6schen?");
	if (!b)
		return d.toString()
};
allyve.i18n.configWidget_badCred = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Bitte \u00fcberpr\u00fcfe Deine Zugangsdaten!");
	if (!b)
		return a.toString()
};
allyve.i18n.msgStatusUpdateSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Status erfolgreich aktualisiert.");
	if (!b)
		return a.toString()
};
allyve.i18n.msgStatusUpdateFailed = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("\t", a.errorMsg ? "Fehler beim Aktualisieren des Status: "
			+ soy.$$escapeHtml(a.errorMsg)
			: "Fehler beim Aktualisieren des Status.");
	if (!b)
		return d.toString()
};
allyve.i18n.titleAGB = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("AGB des mein-cockpit.de Portals");
	if (!b)
		return a.toString()
};
allyve.i18n.titleImpressum = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Impressum");
	if (!b)
		return a.toString()
};
allyve.i18n.titleDatenschutz = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Datenschutzbestimmungen des mein-cockpit.de-Portals");
	if (!b)
		return a.toString()
};
allyve.i18n.titleUserSettings = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Einstellungen \u00e4ndern");
	if (!b)
		return a.toString()
};
allyve.i18n.titleChangePassword = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort \u00e4ndern");
	if (!b)
		return a.toString()
};
allyve.i18n.changePasswordSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort erfolgreich ge\u00e4ndert.");
	if (!b)
		return a.toString()
};
allyve.i18n.titleChangeNewsletter = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Newsletter abonnieren oder abbestellen");
	if (!b)
		return a.toString()
};
allyve.i18n.titleChangeEmail = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Benutzername \u00e4ndern");
	if (!b)
		return a.toString()
};
allyve.i18n.changeEmailSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Der Benutzername wurde erfolgreich ge\u00e4ndert.");
	if (!b)
		return a.toString()
};
allyve.i18n.changeEmailError = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Der Benutzername konnte nicht ge\u00e4ndert werden. Bitte versuche es zu einem sp\u00e4teren Zeitpunkt erneut.");
	if (!b)
		return a.toString()
};
allyve.i18n.saveSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Deine \u00c4nderungen wurden gespeichert!");
	if (!b)
		return a.toString()
};
allyve.i18n.saveError = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Beim Speichern ist ein Fehler aufgetreten.");
	if (!b)
		return a.toString()
};
allyve.i18n.titleDeleteAccount = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Benutzerkonto l\u00f6schen");
	if (!b)
		return a.toString()
};
allyve.i18n.deleteAccountSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Benutzerkonto erfolgreich gel\u00f6scht");
	if (!b)
		return a.toString()
};
allyve.i18n.checkPassword = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Bitte \u00fcberpr\u00fcfe Dein Kennwort");
	if (!b)
		return a.toString()
};
allyve.i18n.titleRegister = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Registriere Dich: Kostenlos und sicher");
	if (!b)
		return a.toString()
};
allyve.i18n.registerSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Nur noch Deine E-Mail best\u00e4tigen und Du kannst loslegen!");
	if (!b)
		return a.toString()
};
allyve.i18n.registerError = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Es ist ein Fehler bei der Registrierung aufgetreten. Bitte \u00fcberpr\u00fcfe Deine Eingaben.");
	if (!b)
		return a.toString()
};
allyve.i18n.titleError = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Fehler");
	if (!b)
		return a.toString()
};
allyve.i18n.commonError = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Es ist ein Fehler aufgetreten");
	if (!b)
		return a.toString()
};
allyve.i18n.widgetDeleteError = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Das Widget konnte nicht gel\u00f6scht werden.");
	if (!b)
		return a.toString()
};
allyve.i18n.titleHint = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Hinweis");
	if (!b)
		return a.toString()
};
allyve.i18n.cancel = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Abbrechen");
	if (!b)
		return a.toString()
};
allyve.i18n.cancelled = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Vorgang abgebrochen.");
	if (!b)
		return a.toString()
};
allyve.i18n.pwdStrong = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Stark");
	if (!b)
		return a.toString()
};
allyve.i18n.pwdMedium = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Mittel");
	if (!b)
		return a.toString()
};
allyve.i18n.pwdWeak = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Schwach");
	if (!b)
		return a.toString()
};
allyve.i18n.labelCatalogSearch = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Suche nach:");
	if (!b)
		return a.toString()
};
allyve.i18n.catalogFoundOneAction = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('(Dr\u00fccke "Enter" zum Hinzuf\u00fcgen):');
	if (!b)
		return a.toString()
};
allyve.i18n.twitterStatusUpdate = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Twitter Statusupdate");
	if (!b)
		return a.toString()
};
allyve.i18n.myspaceStatusUpdate = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Myspace Statusupdate");
	if (!b)
		return a.toString()
};
allyve.i18n.facebookStatusUpdate = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Facebook Statusupdate");
	if (!b)
		return a.toString()
};
allyve.i18n.statusUpdate = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Statusupdate");
	if (!b)
		return a.toString()
};
allyve.i18n.titleHelpAndContact = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Hilfe & Kontakt");
	if (!b)
		return a.toString()
};
allyve.i18n.titleNotFound = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Seite/Funktion nicht gefunden");
	if (!b)
		return a.toString()
};
allyve.i18n.tooltipCatalogEnabled = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Auto-Login Katalog anzeigen");
	if (!b)
		return a.toString()
};
allyve.i18n.tooltipCatalogDisabled = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Du hast die maximale Anzahl von 50 Auto-Logins \u00fcberschritten. Bevor du einen neuen Auto-Login einrichten kannst, musst du bestehende Auto-Logins l\u00f6schen.");
	if (!b)
		return a.toString()
};
allyve.i18n.sammelStatusUpdateHead = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Dein Statusupdate war...");
	if (!b)
		return a.toString()
};
allyve.i18n.sammelStatusFatal = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Ein undefinierter Fehler ist aufgetreten. Bitte Seite neu laden.");
	if (!b)
		return a.toString()
};
allyve.i18n.sammelStatusServiceError = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('<span class="error">nicht erfolgreich</span>');
	if (!b)
		return a.toString()
};
allyve.i18n.sammelStatusServiceOk = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('<span class="ok">erfolgreich</span>');
	if (!b)
		return a.toString()
};
allyve.i18n.sammelStatusServiceUnavailable = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('<div>...nicht erfolgreich, da Du kein Soziales Netzwerk ausgew\u00e4hlt hast.</div><div class="spacer">Um Deinen Status in ausgew\u00e4hlten Netzwerken aktualisieren zu k\u00f6nnen, musst Du Folgendes tun:</div><div class="spacer"><ol><li>Richte Dir die dazugeh\u00f6rigen Widgets aus unserem Katalog ein.</li><li>W\u00e4hle die Netzwerke aus, indem Du auf die jeweiligen Logos unterhalb des Eingabefelds klickst.</li><li>Schreibe Deinen Status in das Eingabefeld und klicke auf \u201ePosten\u201c.</li></ol></div>');
	if (!b)
		return a.toString()
};
allyve.i18n.sammelStatusServiceNoText = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("...nicht erfolgreich, denn Du hast keinen Text eingegeben.");
	if (!b)
		return a.toString()
};
allyve.i18n.deleteBookmark_title = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Lesezeichen l\u00f6schen?");
	if (!b)
		return a.toString()
};
allyve.i18n.deleteBookmark_text = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("M\u00f6chtest Du das Lesezeichen wirklich l\u00f6schen?");
	if (!b)
		return a.toString()
};
allyve.i18n.deleteKeyring_title = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Account l\u00f6schen?");
	if (!b)
		return a.toString()
};
allyve.i18n.deleteKeyring_text = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("M\u00f6chtest Du den Account wirklich l\u00f6schen?");
	if (!b)
		return a.toString()
};
allyve.i18n.btnLabelSave = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Speichern");
	if (!b)
		return a.toString()
};
allyve.i18n.confirmationTitle = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Best\u00e4tigung");
	if (!b)
		return a.toString()
};
allyve.i18n.resendActivationMailSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('<div class="modalHeader">E-Mail wurde versendet</div><div class="modal_dialog_text">mein-cockpit.de hat Dir erneut eine Best\u00e4tigungs-E-Mail geschickt. Vermutlich liegt diese E-Mail bereits in Deinem Posteingang. Um Deine Registrierung abzuschlie\u00dfen, klicke bitte auf den Link in der E-Mail. Solltest Du die E-Mail nicht in Deinem Posteingang finden, schaue bitte nach, ob sie f\u00e4lschlicherweise im Spam-Ordner gelandet ist.</div>');
	if (!b)
		return a.toString()
};
allyve.i18n.resendActivationMailFail = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('<div class="modalHeader">Fehler</div><div class="modal_dialog_text">Aktivierungsmail konnte nicht verschickt werden.</div>');
	if (!b)
		return a.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.config == "undefined")
	allyve.config = {};
allyve.config.renderTeleboerseConfig = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					"\t",
					soy.$$escapeHtml(a.widgetInfo.name),
					'<div class="teleboerseConfig"><div class="teleboerseSelectHead"><div class="floatingContent teleboerseIndizes">Indizes:</div><div>Aktien:</div></div><div class="clear"></div>');
	for ( var e = 0; e < 4; e++) {
		d
				.append(
						'<div id="div_select_Teleboerse_baskets_',
						soy.$$escapeHtml(e),
						'" class="widgetConfigInput"><select  class="floatinput w90 mr10" id="select_Teleboerse_baskets_',
						soy.$$escapeHtml(e),
						'" name="share_indizes_',
						soy.$$escapeHtml(e),
						'" onchange="var stocks = oAllyve.getWidgets().getStocksInBasket(this.value); $(\'#select_Teleboerse_stocks_',
						soy.$$escapeHtml(e),
						'\').html(oAllyve.getWidgets().createOptionsFromList(stocks));"><option value=""></option>');
		for ( var f = a.widgetInfo.stockBaskets, l = f.length, m = 0; m < l; m++) {
			var p = f[m];
			d.append('<option value="', soy.$$escapeHtml(p.name), '">', soy
					.$$escapeHtml(p.value), "</option>")
		}
		d
				.append(
						'</select></div><div id="div_select_Teleboerse_stocks_',
						soy.$$escapeHtml(e),
						'" class="widgetConfigInput"><select  class="w90 h" id="select_Teleboerse_stocks_',
						soy.$$escapeHtml(e),
						'" name="shares_',
						soy.$$escapeHtml(e),
						'" onclick=""><option value=""></option></select></div><div class="clear"></div>')
	}
	d.append("</div>");
	if (!b)
		return d.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.mandant == "undefined")
	allyve.mandant = {};
allyve.mandant.supportMailAddress = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("support@mein-cockpit.de");
	if (!b)
		return a.toString()
};
allyve.mandant.renderConfigDlg = function(a, b) {
	var d = b || new soy.StringBuilder;
	allyve.config.renderConfigDlg(a, d);
	if (!b)
		return d.toString()
};
allyve.mandant.renderWidget = function(a, b) {
	var d = b || new soy.StringBuilder;
	allyve.widgets.renderWidget(a, d);
	if (!b)
		return d.toString()
};
allyve.mandant.widgetSwitch = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("\t");
	a.widgetInfo.typ == 9999 ? allyve.mandant.renderDummyWidget(a, d)
			: allyve.widgets.widgetSwitch(a, d);
	if (!b)
		return d.toString()
};
allyve.mandant.enterPinDialog = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="enterPinDialogContent"><div class="modalHeader">PIN-Eingabe</div><div id="virtKeyboardContainer"></div><div class="modal_dialog_text">Bitte gib hier die PIN Deiner login<span class="kursiv">Card</span> ein um fortzufahren. Du kannst Sie manuell per Computertastatur oder durch Klicken der entsprechenden Zahlen eingeben.</div><form id="enterPinForm" action="#" method="post"><div class="cardPinField"><label for="pin_field"><span class="formlabel">PIN</span><br/></label><div class="input_error_wrapper"><input type="password" class="number required" id="pin_field" name="pin" value="" tabindex="21" autocomplete="off" maxlength="6"/></div></div>',
					a.remainingPinTrys ? a.remainingPinTrys < 8 ? '<p class="error">Die eingebene PIN ist nicht korrekt.</p><span class="error">Verbleibende Versuche: '
							+ soy.$$escapeHtml(a.remainingPinTrys)
							+ "</span><br/>"
							: ""
							: "", "</form></div>");
	if (!b)
		return d.toString()
};
allyve.mandant.enterPinFail = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="modalHeader">Fehler</div><div class="modal_dialog_text">Beim Verarbeiten Deiner PIN-Eingabe ist ein Fehler aufgetreten.</div>');
	if (!b)
		return a.toString()
};
allyve.mandant.confirmCardDeactivationForm = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div id="enterPinDialogContent"><div class="modalHeader">PIN-Eingabe</div><img id="imgCardReader" src="img/allyve/7-layer/1-basics/pinneingabe-motiv.gif" /><div class="modal_dialog_text">Bitte gib Deine Pin ein, damit wir Deine login<span class="kursiv">Card</span> zur\u00fccksetzen k\u00f6nnen.</div><form id="enterPinForm" action="#" method="post"><div class="cardPinField"><div id="confirmCardDeactivationForm_giveCard"><div class="formlabel" style="color:red;">Bitte lege Deine Karte auf den Kartenleser.</div><div class="clear"></div></div><div id="confirmCardDeactivationForm_watchReader" style="display:none;"><div class="formlabel">Bitte best\u00e4tige diesen Dialog mit "OK" und folge den Anweisungen Deines Kartenlesers.</div><div class="modal_dialog_text" id="confirmCardDeactivationForm_watchReader_triesLeft_text"><br />Du hast noch <span id="confirmCardDeactivationForm_watchReader_triesLeft">10</span> Versuche, um die richtige Pin einzugeben!</div><div class="clear"></div></div><div id="confirmCardDeactivationForm_lightPin" style="display:none;"><label for="pin_field"><span class="formlabel">PIN:</span><br/></label><input type="password" class="number required" id="confirmCardDeactivationForm_lightPin_field" name="pin" value="" tabindex="21" autocomplete="off" maxlength="6"/><br/><div class="clear"></div></div></div></form></div>');
	if (!b)
		return a.toString()
};
allyve.mandant.cardDeactivationCardRemoved = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('<div class="modalHeader">Hinweis</div><div class="modal_dialog_text">Die login<span class="kursiv">Card</span> wurde entfernt. Zum Deaktivieren der Karte muss diese aufliegen. Bitte starte den Vorgang erneut.</div>');
	if (!b)
		return a.toString()
};
allyve.mandant.renderDummyWidget = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="dummy_content" onclick="catalog.showCatalog();" style="background-image:url(/img/allyve/4-widgets/',
					soy.$$escapeHtml(a.widgetInfo.iconName), ');"></div>');
	if (!b)
		return d.toString()
};
allyve.mandant.insertReaderMessage = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('Bitte Kartenleser f\u00fcr login<span class="kursiv">Card</span> anschlie\u00dfen.');
	if (!b)
		return a.toString()
};
allyve.mandant.insertCardMessage = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('Zum Registrieren bzw. Einloggen bitte login<span class="kursiv">Card</span> auf den Kartenleser auflegen.');
	if (!b)
		return a.toString()
};
allyve.mandant.registerTooltip = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('Registriere Dich einfach und sicher per REINER SCT Leseger\u00e4t cyber<span class="kursiv">Jack</span> sowie login<span class="kursiv">Card</span>');
	if (!b)
		return a.toString()
};
allyve.mandant.msgCardNotInUse = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('Diese login<span class="kursiv">Card</span> ist bisher keinem Benutzer zugeordnet.');
	if (!b)
		return a.toString()
};
allyve.mandant.changePassword = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="settings_description"><div>Hier kannst Du Dein mein-cockpit.de-Passwort \u00e4ndern</div><div class="spacer">Fragen? Du erreichst uns unter support@mein-cockpit.com<br/><br/></div>Um Dein Passwort zu \u00e4ndern, mu\u00dft Du Dich mit Deiner Karte authentifizieren. Trage bitte in die folgenden Felder Dein neues Passwort ein.</div><div class="settings_content"><form id="changePasswordForm" action="#" method="post"><fieldset><div class="formlabel">Dein neues Passwort</div><input type="password" class="text form_input_text required" id="changePasswordForm_password" name="password" value="" /><div class="clear"></div><div class="formlabel">Dein neues Passwort (Wiederholung)</div><input type="password" class="text form_input_text required" id="changePasswordForm_password_rep" name="password_rep" value="" /><div class="clear"></div><div id="changePasswordForm_giveCard"><div class="formlabel" style="color:red;">Bitte lege Deine Karte auf den Kartenleser.</div><div class="clear"></div></div><div id="changePasswordForm_watchReader" style="display:none;"><div class="formlabel">Bitte folge den Anweisungen Deines Kartenlesers.</div><div class="clear"></div></div><div id="changePasswordForm_lightPin" style="display:none;"><div class="formlabel">Deine Karten PIN-Nummer</div><input type="password" class="text form_input_text required" id="changePasswordForm_pin" name="pin" value="" maxlength="6" /><span id="changePasswordForm_pinError" class="error" style="display: none;">Bitte PIN \u00fcberpr\u00fcfen.</span><div class="clear"></div></div></fieldset><div id="changePasswordError" class="error" style="display: none;">Kennwort konnte nicht ge\u00e4ndert werden.</div></form></div>');
	if (!b)
		return a.toString()
};
allyve.mandant.activationHint = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'<div class="modalHeader">Achtung</div><div class="modal_dialog_text">Um mein-cockpit.de nutzen zu k\u00f6nnen, musst Du Deine E-Mailadresse best\u00e4tigen. Klicke hierzu auf den Link in deiner Registrierungsemail. Solltest Du die Registrierungsemail nicht mehr besitzen, kannst Du sie hier erneut anfordern.</div><div class="clear"></div><table><tr><td colspan="2"><label for="resendActivationEmailField"><span class="formlabel">E-Mail Adresse:</span></label></td></tr><tr><td class="leftColumnWithPaddingRight"><input type="text" id="resendActivationEmailField" class="text required" name="requestemail" value="',
					soy.$$escapeHtml(a.email),
					'" autocomplete="off" disabled="disabled"/></td><td><div class="grey_button small_button_fixed" id="btnResendActivationEmail" onclick="account.resendActivationMail($(\'#resendActivationEmailField\').val());">Anfordern</div></td></tr><tr><td><div class="modal_dialog_text"></div></td></tr><tr><td class="leftColumnWithPaddingRight"><div class="bold">Kartenverkn\u00fcpfung aufheben:</div><div>Du hast Deine E-Mailadresse bei der Registrierung falsch eingegeben? Kein Problem. Hier kannst Du die Verkn\u00fcpfung der Karte mit Deinem Benutzerkonto wieder aufheben, indem Du den entsprechenden Button klickst (Karte muss auf dem Kartenleseger\u00e4t aufgelegt sein). Danach kannst Du Dich mit der gleichen Karte erneut registrieren.</div></td><td><div class="grey_button small_button_fixed" id="btnDisconnectNpa" >nPA</div><div class="spacer"></div><div class="grey_button small_button_fixed" id="btnDisconnectLoginCard" >login<span class="kursiv">Card</span></div></td></tr></table>');
	if (!b)
		return d.toString()
};
allyve.mandant.npaDeactivationStart = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Die Verkn\u00fcpfung Deines neuen Personalausweises (nPA) mit Deinem Benutzeraccount wird jetzt unter Nutzung der AusweisApp gel\u00f6scht. Du kannst den nPA sp\u00e4ter jederzeit wieder mit Deinem Account verkn\u00fcpfen.");
	if (!b)
		return a.toString()
};
allyve.mandant.npaDeactivationSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Die Verkn\u00fcpfung  der  Karte mit Deinem Account wurde aufgehoben. Du kannst Dich nun mit Deiner Karte neu bei meincockpit.de registrieren.");
	if (!b)
		return a.toString()
};
allyve.mandant.addCardToAccount = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div id="dialogAddCardToAccount"><div class="modalHeader">Loginkarte verkn\u00fcpfen</div><div class="modal_dialog_text">Du hast eine unbekannte Karte auf das Leseger\u00e4t gelegt. Willst Du diese Deinem mein-cockpit.de Benutzerkonto hinzuf\u00fcgen, dann gib bitte Dein Passwort ein. Um den Vorgang abschlie\u00dfen zu k\u00f6nnen, muss die login<span class="kursiv">Card</span> aufgelegt bleiben.</div><form id="addCardToAccountForm" action="#" method="post"><fieldset><div class="formlabel">Passwort</div><input type="password" class="text form_input_text required" id="addCardToAccountForm_password" name="password" value="" /><span id="pleaseCheckPassword" class="error" style="display: none;">Bitte \u00fcberpr\u00fcfe Dein Kennwort</span></fieldset><div id="addCardToAccountError" class="error" style="display: none;">Karte konnte nicht hinzugef\u00fcgt werden.</div></form></div>');
	if (!b)
		return a.toString()
};
allyve.mandant.confirmWithPassword = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="dialogConfirmWithPassword"><div class="modalHeader">',
					soy.$$escapeHtml(a.title),
					'</div><div class="modal_dialog_text">',
					soy.$$escapeHtml(a.description),
					'</div><form id="confirmWithPasswordForm" action="#" method="post"><fieldset><div class="formlabel">',
					soy.$$escapeHtml(a.label),
					'</div><input type="password" class="text form_input_text required" id="confirmWithPasswordForm_password" name="password" value="" /><span id="pleaseCheckPassword" class="error" style="display: none;">Bitte \u00fcberpr\u00fcfe Dein Kennwort</span></fieldset><div id="confirmWithPasswordError" class="error" style="display: none;"></div></form></div>');
	if (!b)
		return d.toString()
};
allyve.mandant.removeLogincardTitle = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Logincard-Verkn\u00fcpfung aufheben");
	if (!b)
		return a.toString()
};
allyve.mandant.removeLogincardDescription = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Gib Dein Passwort ein, um die Verkn\u00fcpfung der loginCard mit Deinem Account wieder aufzuheben.");
	if (!b)
		return a.toString()
};
allyve.mandant.removeLogincardLabel = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort:");
	if (!b)
		return a.toString()
};
allyve.mandant.removeLogincardSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Die Verkn\u00fcpfung der loginCard mit Deinem Account wurde erfolgreich aufgehoben.");
	if (!b)
		return a.toString()
};
allyve.mandant.removeEidTitle = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("nPA-Verkn\u00fcpfung aufheben");
	if (!b)
		return a.toString()
};
allyve.mandant.removeEidDescription = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Gib Dein Passwort ein, um die Verkn\u00fcpfung des neuen Personalausweis mit Deinem Account wieder aufzuheben.");
	if (!b)
		return a.toString()
};
allyve.mandant.removeEidSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Die Verkn\u00fcpfung des neuen Personalausweis mit Deinem Account wurde erfolgreich aufgehoben.");
	if (!b)
		return a.toString()
};
allyve.mandant.addCardToAccountSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="modalHeader">Logincard wurde verkn\u00fcpft</div><div class="modal_dialog_text">Die aufgelegte Karte wurde erfolgreich mit Deinem Benutzerkonto bei mein-cockpit.de verkn\u00fcpft. Diese Karte kannst Du ab sofort auch zur Authentifizierung bei mein-cockpit.de verwenden.</div>');
	if (!b)
		return a.toString()
};
allyve.mandant.addCardToAccountFail = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="modalHeader">Logincard wurde nicht verkn\u00fcpft</div><div class="modal_dialog_text">Beim Verkn\u00fcpfen der login<span class="kursiv">Card</span> mit Deinem Account ist ein Fehler aufgetreten.</div>');
	if (!b)
		return a.toString()
};
allyve.mandant.deleteFromCardSuccess = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('Die login<span class="kursiv">Card</span> wurde von dem Benutzerkonto gel\u00f6st. Du kannst Dich jetzt mit der Karte erneut registrieren.');
	if (!b)
		return a.toString()
};
allyve.mandant.deleteFromCardFail = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('Beim L\u00f6sen der login<span class="kursiv">Card</span> von dem  Account trat ein Fehler auf.');
	if (!b)
		return a.toString()
};
allyve.mandant.registerWithOlps = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="modalHeader">Bitte LoginCard initialisieren</div><div class="floatingContentRight" id="olps"><img src="/img/allyve/7-layer/1-basics/initialisierung-motiv.gif" /></div><div class="modal_dialog_text">Um mein-cockpit.de mit dieser login<span class="kursiv">Card</span> nutzen zu k\u00f6nnen, musst Du diese zun\u00e4chst auf den Seiten des Karten- und Leseger\u00e4teherstellers ReinerSCT initialisieren (klicke hierzu einfach "Karte initialisieren" und folge den Anweisungen auf dem Bildschirm). Danach kannst Du Dich sicher und bequem per Karte bei mein-cockpit.de registrieren.</div>');
	if (!b)
		return a.toString()
};
allyve.mandant.headerAchtung = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Bitte beachten Sie");
	if (!b)
		return a.toString()
};
allyve.mandant.msgCardPluginBlocked = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('Ihre login<span class="kursiv">Card</span> wird gerade von einer anderen Anwendung verwendet. Bitte schlie\u00dfen Sie alle anderen Anwendungen und Browserfenster, die ebenfalls den Chipkartenleser benutzen.');
	if (!b)
		return a.toString()
};
allyve.mandant.msgCardAlreadyRegistered = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Diese Karte ist bereits an einen Benutzer gebunden und kann nicht hinzugef\u00fcgt werden.");
	if (!b)
		return a.toString()
};
allyve.mandant.msgCardNotRegistered = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append("Diese Karte ist bisher an keinen Benutzer gebunden und kann daher noch nicht verwendet werden.");
	if (!b)
		return a.toString()
};
allyve.mandant.loginCardMoreInfos = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('<h2 class="title">WIE REGISTRIERE ICH MICH BEI MEIN-COCKPIT.DE</h2><div id="loginCardMoreInfo" class="modaltext"><p class="subHeader" id="loginCardMoreInfoHeader">Da wir auf das Thema Sicherheit allergr\u00f6\u00dften Wert legen, kannst Du Dich bei mein-cockpit.de ausschlie\u00dflich per Smartcard registrieren. Dazu ben\u00f6tigst Du ein geeignetes Kartenleseger\u00e4t und entweder den neuen Personalausweis (nPA) oder die login<span class="kursiv">Card</span> von ReinerSCT.</p><div id="loginCardMoreInfoPerso" class="marginTopDefault floatingContent defaultBorderTop"><img id="imgloginCardInfoPerso" src="/img/allyve/7-layer/1-basics/12-mehr-infos/card-perso.gif" alt="" class="floatingContent" /><p class="bold marginTopDefault">REGISTRIERUNG MITTELS NEUEM PERSONALAUSWEIS (NPA)</p><p class="marginTopDefault">Seit dem 1. November 2010 gibt es den neuen Personalausweis der Bundesrepublik Deutschland. Seine Online-Funktionen erm\u00f6glichen allen B\u00fcrgern die sichere und schnelle Anmeldung zu verschiedenen Webdiensten. Auch mein-cockpit.de erlaubt Dir ab sofort, Dich mit dem neuen Personalausweis zu registrieren. Aktuelle Informationen und FAQs findest Du <a target="_blank" href="http://blog.allyve.com/faq/">in unserem Blog</a>.</p><div id="loginCardMoreInfoPerso2" class="marginTopDefault floatingContent defaultBorderTopLight"><div id="loginCardMorePersoLogo" class="loginCardMoreInfoColumn loginCardMoreInfoLeftColumn floatingContent marginTopDefault"><p>Den neuen Personalausweis (nPA) erh\u00e4ltst Du in den deutschen Einwohnermelde\u00e4mtern.</p><a href="http://www.personalausweisportal.de/" target="_blank"><img class="marginTopDefault" src="/img/allyve/7-layer/1-basics/12-mehr-infos/logo-npa.gif" /></a></div><div id="loginCardMoreInfoPersoText" class="loginCardMoreInfoColumn floatingContent marginTopDefault"><p>Voraussetzungen f\u00fcr die Nutzung des nPA:</p><ul><li>Besitz des neuen Personalausweises</li><li>Online-Funktion freigeschaltet</li><li>AusweisApp installiert und gestartet</li><li>Aufgelegter Ausweis</li><li>Initialisierte Karte (mit 6-stelliger PIN)</li></ul></div></div><div class="clear"></div><p class="marginTopDefault highlight cardInfoIndented">Achtung: Der Browser Firefox 4 wird aktuell von der AusweisApp des Bundesamtes f\u00fcr Sicherheit und Informationstechnik (BSI) noch nicht unterst\u00fctzt.</p></div><div class="clear"></div><div id="loginCardMoreInfo1" class="marginTopDefault defaultBorderTop"><img id="imgloginCardInfo" src="/img/allyve/7-layer/1-basics/12-mehr-infos/card-rainer.gif" alt="" class="floatingContent"/><p class="bold marginTopDefault">REGISTRIERUNG MITTELS LOGIN<span class="kursiv">CARD</span></p><p class="marginTopDefault">Die login<span class="kursiv">Card</span>, basierend auf der OWOK-Technologie von REINER SCT, wurde mit der COMPUTER BILD DVD-Ausgabe vom 04. Dezember 2010 ausgeliefert und erm\u00f6glicht die Nutzung von mein-cockpit.de und weiteren Webdiensten ohne Eingabe von Benutzerdaten. Aktuelle Informationen und FAQs findest Du <a target="_blank" href="http://blog.allyve.com/faq/">in unserem Blog</a>.</p><div id="loginCardMoreInfo2" class="marginTopDefault floatingContent defaultBorderTopLight"><div id="loginCardMoreReinerSCT" class="loginCardMoreInfoColumn loginCardMoreInfoLeftColumn floatingContent marginTopDefault"><p>Die login<span class="kursiv">Card</span> kannst Du im Online-Shop von ReinerSCT bestellen.</p><a href="https://www.chipkartenleser-shop.de/shop/npa/#" target="_blank"><img src="/img/allyve/7-layer/1-basics/12-mehr-infos/logo-rainer.gif" /></a></div><div id="loginCardMoreInfoCobi" class="loginCardMoreInfoColumn floatingContent marginTopDefault"><p>Voraussetzungen f\u00fcr die Nutzung der loginCard:</p><ul><li>Installiertes OWOK-Plugin</li><li>Angeschlossner Kartenleser</li><li>Zugriff auf den Kartenleser</li><li>Aufgelegte login<span class="kursiv">Card</span></li><li>Initialisierte Karte</li></ul></div></div><div class="clear"></div><p class="marginTopDefault highlight cardInfoIndented">Achtung: Nutzer der neuen Browserversionen Firefox 4 und Internet Explorer 9 m\u00fcssen sich die neueste Version des OWOK-Plugins installieren. <a href="http://www.reiner-sct.com/plugins" target="owokDownload">(Zum Download)</a></p></div></div>');
	if (!b)
		return a.toString()
};
allyve.mandant.userConfigDialog = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append('\t<div class="modalHeader">Mein Benutzerkonto</div><div class="settings_description">Hier kannst Du Deine Benutzereinstellungen \u00e4ndern und die mit Deinem Account verkn\u00fcpften Karten verwalten.<br>Fragen? Du erreichst uns unter <a href="mailto:');
	allyve.mandant.supportMailAddress(null, d);
	d
			.append(
					'">support@mein-cockpit.de</a></div><div id="usersettingsItems" class="settings_content"><ul class="userSettingsList">',
					!a.hasEid ? '<li id="account_change_password">Passwort \u00e4ndern (mit altem Passwort)</li>'
							: '<li id="account_change_password_npa">Passwort \u00e4ndern (mit neuem Personalausweis)</li>',
					!a.hasEid && a.cardList && a.cardList.length > 0 ? '<li id="account_change_password_owok">Passwort \u00e4ndern (mit login<span class="kursiv">Card</span>)</li>'
							: "",
					'<li id="account_change_email">Benutzername \u00e4ndern</li><li id="account_change_newsletter">Newsletter abonnieren</li><li id="account_delete">Mein Benutzerkonto l\u00f6schen</li></ul></div>');
	if (a.cardList) {
		d
				.append(
						'<div class="bold">Verkn\u00fcpfte Karten',
						a.cardList.length == 2 ? '<a href="http://blog.allyve.com/faq/wie-sehe-ich-welche-logincard-aufgelegt-ist" target="cardFaq"><img src="/img/allyve/7-layer/1-basics/fragezeichen.png" class="helpIconInline" /></a>'
								: "",
						'</div><div>Hier siehst Du die aktuell mit Deinem Benutzerkonto verkn\u00fcpften Karten, mit denen Du Dich bei mein-cockpit.de einloggen kannst. Du kannst Kartenverkn\u00fcpfungen wieder aufheben oder neue Karten (login<span class="kursiv">Card</span>, neuer Personalausweis nPA) mit Deinem Benutzerkonto verkn\u00fcpfen.<br>(Hinweis: Du kannst bis zu zwei Karten - davon max. einen Personalausweis - verkn\u00fcpfen.)</div><div id="cardListContainer">');
		for ( var e = a.cardList, f = e.length, l = 0; l < f; l++)
			allyve.mandant.cardListItem({
				isEid : false,
				cardId : e[l]
			}, d);
		a.hasEid && allyve.mandant.cardListItem({
			isEid : true
		}, d);
		d
				.append(
						a.cardList.length == 0 && !a.hasEid ? '<div class="red modal_dialog_text">ACHTUNG: Deinem Account ist aktuell keine Karte zugeordnet. Solltest Du Dein Kennwort vergessen, besteht keine M\u00f6glichkeit Dein Kennwort zur\u00fcckzusetzen, und Dein Account kann nicht mehr verwendet werden. Deine gespeicherten Daten w\u00e4ren dann unwiderruflich verloren.</div>'
								: "",
						'</div><div id="cardAddButtons">',
						a.cardList.length < 2 && !a.hasEid || a.hasEid
								&& a.cardList.length < 1 ? '<div id="addOwokButton" class="addCardButton">+ login<span class="kursiv">Card</span> verkn\u00fcpfen</div>'
								: "",
						a.cardList.length < 2 && !a.hasEid ? '<div id="addNpaButton" class="addCardButton">+ nPA verkn\u00fcpfen</div>'
								: "", '<div class="clear"></div></div>')
	} else
		d
				.append('<div class="red modal_dialog_text">Zu diesem Account gibt es keinen Benutzer auf dem Kartenserver, daher stehen keine Kartenmanagementfunktionen zur Verf\u00fcgung.</div>');
	if (!b)
		return d.toString()
};
allyve.mandant.cardListItem = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="cardListItem" id="',
					soy.$$escapeHtml(a.isEid ? "eidCardButton"
							: "owokCardButton_" + a.cardId),
					'"><div class="cardTitle">',
					a.isEid ? "Personalausweis (nPA)"
							: 'login<span class="kursiv">Card</span>',
					'</div><div class="cardPresentIndicator">(aufgelegt)</div><div class="removeCardButton">Verkn\u00fcpfung aufheben</div><div class="clear"></div></div>');
	if (!b)
		return d.toString()
};
allyve.mandant.owokStatusCheck = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="modalHeader">Hinweis</div><div class="owokStatusCheck_description">Um diese Aktion mit der login<span class="kursiv">Card</span> ausf\u00fchren zu k\u00f6nnen,<br>m\u00fcssen folgende Bedingungen erf\u00fcllt sein:</div><div id="owokStatusCheckItems" class="owokStatusCheck_content"><div id="owokStatusCheck_1" class="owokStatusCheckItem"><span id="owokStatusCheck_1_false" class="owokStatusCheck_false"><img id="owokStatusCheck_1_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Installiertes OWOK-Plugin</div><div id="owokStatusCheck_hint_1" class="owokStatusCheckHint"><a target="_blank" href="http://www.reiner-sct.com/cardlogin">Zum Plugin &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_1" class="owokStatusCheck_after"><div id="owokStatusCheck_2" class="owokStatusCheckItem"><span id="owokStatusCheck_2_false" class="owokStatusCheck_false"><img id="owokStatusCheck_2_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Angeschlossener Kartenleser</div><div id="owokStatusCheck_hint_2" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_2" class="owokStatusCheck_after"><div id="owokStatusCheck_3" class="owokStatusCheckItem"><span id="owokStatusCheck_3_false" class="owokStatusCheck_false"><img id="owokStatusCheck_3_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Zugriff auf den Kartenleser</div><div id="owokStatusCheck_hint_3" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_3" class="owokStatusCheck_after"><div id="owokStatusCheck_4" class="owokStatusCheckItem"><span id="owokStatusCheck_4_false" class="owokStatusCheck_false"><img id="owokStatusCheck_4_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Aufgelegte login<span class="kursiv">Card</span></div><div id="owokStatusCheck_hint_4" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_4" class="owokStatusCheck_after"><div id="owokStatusCheck_5" class="owokStatusCheckItem"><span id="owokStatusCheck_5_false" class="owokStatusCheck_false"><img id="owokStatusCheck_5_true" class="owokStatusCheck_true" src="/img/allyve/7-layer/1-basics/haken.png" /></span> Initialisierte login<span class="kursiv">Card</span></div><div id="owokStatusCheck_hint_5" class="owokStatusCheckHint"><a target="_blank" href="http://blog.allyve.com/faq">Hilfe & FAQ &nbsp; <img src="/img/allyve/7-layer/1-basics/pfeil.png" /></a></div><div id="owokStatusCheck_after_5" class="owokStatusCheck_after"></div></div></div></div></div></div>');
	if (!b)
		return a.toString()
};
allyve.mandant.titleChangePasswordStandard = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort \u00e4ndern (mit altem Passwort)");
	if (!b)
		return a.toString()
};
allyve.mandant.titleChangePasswordOwok = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort \u00e4ndern (mit loginCard)");
	if (!b)
		return a.toString()
};
allyve.mandant.titleChangePasswordNpa = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort \u00e4ndern (mit nPA)");
	if (!b)
		return a.toString()
};
allyve.mandant.changePasswordGenericForm = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append('<div class="settings_description"><p class="modal_dialog_text">Hier kannst Du Dein Passwort f\u00fcr mein-cockpit.de \u00e4ndern.Fragen? Du erreichst uns unter <a href="mailto:');
	allyve.mandant.supportMailAddress(null, d);
	d
			.append(
					'">support@mein-cockpit.de</a></p>',
					a.showOldPassword ? '<p class="modal_dialog_text">Um Dein Passwort zu \u00e4ndern, trage bitte in die folgenden Felder Dein altes und neues Passwort ein.</p>'
							: '<p class="modal_dialog_text">Gib bitte zur \u00c4nderung Deines Passworts zweimal Dein neues Passwort ein. Deine Karte muss dazu auf dem Kartenleser aufliegen, und Du musst Dich mittels PIN-Eingabe identifizieren.</p>',
					'</div><div class="settings_content"><form id="changePasswordForm" action="#" method="post"><fieldset>',
					a.showOldPassword ? '<div class="formlabel">Dein altes Passwort</div><input type="password" class="text form_input_text required" id="changePasswordForm_password_old" name="password_old" value="" /><span id="password_old_error" class="error" style="display: none;"></span><div class="clear"></div>'
							: "",
					'<div class="formlabel">Dein neues Passwort</div><input type="password" class="text form_input_text required" id="changePasswordForm_password" name="password" value="" /><div class="clear"></div><div class="formlabel">Dein neues Passwort (Wiederholung)</div><input type="password" class="text form_input_text required" id="changePasswordForm_password_rep" name="password_rep" value="" /><div class="clear"></div></fieldset><div id="changePasswordError" class="error" style="display: none;">Kennwort konnte nicht ge\u00e4ndert werden.</div></form></div>');
	if (!b)
		return d.toString()
};
allyve.mandant.changePasswordStandard = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('\t<div class="modalHeader">');
	allyve.mandant.titleChangePasswordStandard(null, a);
	a.append("</div>");
	allyve.mandant.changePasswordGenericForm({
		showOldPassword : true
	}, a);
	if (!b)
		return a.toString()
};
allyve.mandant.changePasswordOwok = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('\t<div class="modalHeader">');
	allyve.mandant.titleChangePasswordOwok(null, a);
	a.append("</div>");
	allyve.mandant.changePasswordGenericForm({
		showOldPassword : false
	}, a);
	if (!b)
		return a.toString()
};
allyve.mandant.changePasswordNpa = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('\t<div class="modalHeader">');
	allyve.mandant.titleChangePasswordNpa(null, a);
	a.append("</div>");
	allyve.mandant.changePasswordGenericForm({
		showOldPassword : false
	}, a);
	if (!b)
		return a.toString()
};
allyve.mandant.watchCardReader = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Bitte beachte den Hinweis des Kartenlesers.");
	if (!b)
		return a.toString()
};
allyve.mandant.msgPinWrongLastTime = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					"Die zuletzt eingegebene PIN ist nicht korrekt.<br />Dir verbleiben noch ",
					soy.$$escapeHtml(a.pinTriesLeft), " Versuche.");
	if (!b)
		return d.toString()
};
allyve.mandant.msgWrongPin = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("Die von Dir eingegebene PIN war nicht korrekt. Du hast noch ",
			soy.$$escapeHtml(a.pinTriesLeft),
			" verbleibende Versuche. Bitte versuche es erneut.");
	if (!b)
		return d.toString()
};
allyve.mandant.owokPinEntryCanceled = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Die PIN-Eingabe wurde abgebrochen. Bitte versuche es erneut.");
	if (!b)
		return a.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.portlet == "undefined")
	allyve.portlet = {};
allyve.portlet.showMultiStatusUpdate = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="statusInput"><textarea rows="2" id="sammelStatusMsg" onclick="clearInput(this);" onblur="restoreInput(this);">Was machst Du gerade?</textarea></div><div class="serviceRow"><div id="serviceIcons" class="serviceIcons"><div id="statusServiceIcon_0" class="statusServiceIcon" style="background-position: 0px -40px;" title="Facebook"></div><div id="statusServiceIcon_1" class="statusServiceIcon" style="background-position: -20px -40px;" title="Twitter"></div><div id="statusServiceIcon_2" class="statusServiceIcon" style="background-position: -40px -40px;" title="Myspace"></div><div id="statusServiceIcon_3" class="statusServiceIcon" style="background-position: -60px -40px;" title="StudiVZ"></div><div id="statusServiceIcon_4" class="statusServiceIcon" style="background-position: -80px -40px;" title="Sch\u00fclerVZ"></div><div id="statusServiceIcon_5" class="statusServiceIcon" style="background-position: -100px -40px;"  title="MeinVZ"></div></div><div id="sammelStatusUpdating" class="sammelStatusUpdating" style="display: none;"></div><div id="sammelStatusSendButton" class="postButton grey_button small_button floatingContentRight">Posten</div><div id="sammelStatusHelpButton" class="helpButton grey_button small_button floatingContentRight">?</div></div>');
	if (!b)
		return a.toString()
};
allyve.portlet.renderServiceIcon = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append('\t<div id="statusServiceIcon_', soy.$$escapeHtml(a.serviceId),
			'" class="statusServiceIcon" style="background-position: -', soy
					.$$escapeHtml(a.serviceId * 20), "px -", soy
					.$$escapeHtml(a.state * 20), 'px;"></div>');
	if (!b)
		return d.toString()
};
allyve.portlet.getSammelStatusHelpTitle = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("\tDas Sammelstatusupdate");
	if (!b)
		return a.toString()
};
allyve.portlet.renderSammelStatusHelp = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div class="headerAbsatz">Fragen? Lies die Antworten auf die h\u00e4ufigsten Fragen der allyve-Nutzer in <a href="http://blog.allyve.com/faq/" target="_blank">Hilfe &amp; FAQ</a> oder <a href="mailto:');
	allyve.mandant.supportMailAddress(null, a);
	a
			.append('">kontaktiere uns</a>.</div><h3>Die Funktion</h3><div class="floatContainer"><div class="absatz">Nutze unser Sammelstatusupdate und Du erreichst mit einem Klick alle Deine Freunde auf MySpace, StudiVZ, MeinVZ und Sch\u00fclerVZ. Um deinen Status in den ausgew\u00e4hlten Netzwerken aktualisieren zu k\u00f6nnen, musst Du Dir den dazugeh\u00f6rigen Auto-Login aus unserem Katalog einrichten.</div><div class="image"><img src="/img/allyve/7-layer/1-basics/statusupdate-description-1.gif" /></div></div><div class="clear"></div><h3>Schritt 1: Netzwerke ausw\u00e4hlen</h3><div class="floatContainer"><div class="absatz">Mit welchen Netzwerken m\u00f6chtest Du Deinen aktuellen Status teilen? Klicke auf die Logos der jeweiligen Netzwerke und w\u00e4hle Dir so die Passenden aus.</div><div class="image"><img src="/img/allyve/7-layer/1-basics/statusupdate-description-2.gif" /></div></div><div class="clear"></div><h3>Schritt 2: Status schreiben</h3><div class="floatContainer"><div class="absatz">Schreibe Deinen Status in das Eingabefeld.</div><div class="image"><img src="/img/allyve/7-layer/1-basics/statusupdate-description-3.gif" /></div></div><div class="clear"></div><h3>Schritt 3: Status teilen</h3><div class="floatContainer"><div class="absatz">Klicke auf den "Posten"-Button und Dein Status wird automatisch aktualisiert.</div><div class="image"><img src="/img/allyve/7-layer/1-basics/statusupdate-description-4.gif" /></div></div><div class="clear"></div>');
	if (!b)
		return a.toString()
};
allyve.portlet.addServiceTitle = function(a, b) {
	var d = b || new soy.StringBuilder;
	d.append("\t", soy.$$escapeHtml(a.serviceName),
			" ist noch nicht eingerichtet");
	if (!b)
		return d.toString()
};
allyve.portlet.addServiceContent = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					"\tUm das Sammelstatusupdate f\u00fcr ",
					soy.$$escapeHtml(a.serviceName),
					" nutzen zu k\u00f6nnen, musst Du Dir erst das zugeh\u00f6rige Widget einrichten. Willst Du Dir das ",
					soy.$$escapeHtml(a.serviceName),
					"-Widget jetzt einrichten?");
	if (!b)
		return d.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.bookmarkmanager == "undefined")
	allyve.bookmarkmanager = {};
allyve.bookmarkmanager.renderBookmarks = function(a, b) {
	a = b || new soy.StringBuilder;
	if (!b)
		return a.toString()
};
allyve.bookmarkmanager.renderHeadline = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("\t<div><h1>LESEZEICHENMANAGER</h1></div>");
	if (!b)
		return a.toString()
};
allyve.bookmarkmanager.renderBookmark = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="',
					soy.$$escapeHtml(a.bookmark.id),
					'" class="widget_header ui-state-default bookmarkManagerItem"><div class="bookmarkManagerIconDefault"><img class="favicon" id="',
					soy.$$escapeHtml(a.bookmark.id),
					'_favicon" src="/img/allyve/1-buttons/button-lesez-klein.gif" /></div><div id="',
					soy.$$escapeHtml(a.bookmark.id),
					'_bookmarkManagerLabel" class="bookmarkManagerLabel">',
					soy.$$escapeHtml(a.bookmark.label),
					'</div><div class="bookmarkManagerDragHandle"></div><div id="',
					soy.$$escapeHtml(a.bookmark.id),
					'_bookmarkManagerDeleteButton" class="bookmarkManagerDeleteButton" title="Lesezeichen l\u00f6schen"></div><div id="',
					soy.$$escapeHtml(a.bookmark.id),
					'_bookmarkManagerConfigButton" class="bookmarkManagerConfigButton" title="Lesezeichen bearbeiten"></div></div>');
	if (!b)
		return d.toString()
};
allyve.bookmarkmanager.renderAddBookmark = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div id="addBookmark" class="widget_header ui-state-default addBookmarkManagerItem"><div class="bookmarkManagerIconAdd"></div><div class="bookmarkManagerLabel">Lesezeichen hinzuf\u00fcgen</div></div>');
	if (!b)
		return a.toString()
};
allyve.bookmarkmanager.editBookmarkTitle = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Lesezeichen hinzuf\u00fcgen/bearbeiten");
	if (!b)
		return a.toString()
};
allyve.bookmarkmanager.renderBookmarkEdit = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="modalHeader" id="bookmarkEditTitle">',
					soy.$$escapeHtml(a.title),
					'</div><div class="dialogContent"><form id="itemEditForm" action="#" method="post"><div class="bookmarkFormField"><label for="url_field"><span class="formlabel">Internetadresse (URL)</span><br/></label><input type="text" class="text required" id="url_field" name="url" value="',
					soy.$$escapeHtml(a.url != null ? a.url : ""),
					'" tabindex="21" autocomplete="off" /></div><div class="bookmarkFormField"><label for="name_field"><span class="formlabel">Name</span><br/></label><input type="text" id="name_field" class="text required" name="url_name" value="',
					soy.$$escapeHtml(a.name != null ? a.name : ""),
					'" tabindex="22" autocomplete="off" /></div></form></div>');
	if (!b)
		return d.toString()
};
allyve.bookmarkmanager.renderDeleteBookmark = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('\t<div class="modalHeader" id="deleteBookmarkTitle">');
	allyve.i18n.deleteBookmark_title(null, a);
	a.append('</div><div class="dialogContent">');
	allyve.i18n.deleteBookmark_text(null, a);
	a.append("</div>");
	if (!b)
		return a.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.keyringmanager == "undefined")
	allyve.keyringmanager = {};
allyve.keyringmanager.renderKeyrings = function(a, b) {
	a = b || new soy.StringBuilder;
	if (!b)
		return a.toString()
};
allyve.keyringmanager.renderHeadline = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("\t<div><h1>ACCOUNTMANAGER</h1></div>");
	if (!b)
		return a.toString()
};
allyve.keyringmanager.renderKeyring = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div id="',
					soy.$$escapeHtml(a.keyring.id),
					'"  class="widget_header ui-state-default keyringManagerItem" ><div class="keyringManagerIconDefault"><img class="favicon" id="',
					soy.$$escapeHtml(a.keyring.id),
					'_favicon" src="/img/allyve/1-buttons/button-lesez-klein.gif" /></div><div id="',
					soy.$$escapeHtml(a.keyring.id),
					'_keyringManagerLabel" class="keyringManagerLabel">',
					soy.$$escapeHtml(a.keyring.label),
					'</div><div class="keyringManagerDragHandle"></div><div id="',
					soy.$$escapeHtml(a.keyring.id),
					'_keyringManagerDeleteButton" class="keyringManagerDeleteButton" title="Account l\u00f6schen"></div><div id="',
					soy.$$escapeHtml(a.keyring.id),
					'_keyringManagerConfigButton" class="keyringManagerConfigButton" title="Eintrag bearbeiten"></div></div>');
	if (!b)
		return d.toString()
};
allyve.keyringmanager.renderAddKeyring = function(a, b) {
	a = b || new soy.StringBuilder;
	a
			.append('\t<div id="addKeyring" class="widget_header ui-state-default addKeyringManagerItem"><div class="keyringManagerIconAdd"></div><div class="keyringManagerLabel">Account hinzuf\u00fcgen</div></div>');
	if (!b)
		return a.toString()
};
allyve.keyringmanager.editKeyitemTitle = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Account hinzuf\u00fcgen/bearbeiten");
	if (!b)
		return a.toString()
};
allyve.keyringmanager.showKeyitemTitle = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Account");
	if (!b)
		return a.toString()
};
allyve.keyringmanager.renderKeyitemEdit = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="modalHeader" id="keyitemEditTitle">',
					soy.$$escapeHtml(a.title),
					'</div><div class="dialogContent"><form id="itemEditForm" action="#" method="post"><div class="keyitemFormField"><label for="url_field"><span class="formlabel">Internetadresse (URL)</span><br/></label><input type="text" class="text required" id="url_field" name="url" value="',
					soy.$$escapeHtml(a.url != null ? a.url : ""),
					'" tabindex="21" autocomplete="off" /></div><div class="keyitemFormField"><label for="name_field"><span class="formlabel">Name</span><br/></label><input type="text" id="name_field" class="text required" name="url_name" value="',
					soy.$$escapeHtml(a.name != null ? a.name : ""),
					'" tabindex="22" autocomplete="off" /></div><div class="upcase bold marginTopMedium trenner">Optional</div><div class="keyitemFormField"><label for="username_field"><span class="formlabel">Benutzername</span><br/></label><input type="text" id="username_field" class="text" name="username" value="',
					soy.$$escapeHtml(a.username != null ? a.username : ""),
					'" tabindex="23" autocomplete="off" /></div><div class="keyitemFormField"><label for="password_field"><span class="formlabel">Passwort</span><br/></label><input type="text" id="password_field" class="text" name="password" value="',
					soy.$$escapeHtml(a.password != null ? a.password : ""),
					'" tabindex="24" autocomplete="off" /></div></form></div>');
	if (!b)
		return d.toString()
};
allyve.keyringmanager.renderKeyitemShow = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<div class="modalHeader" id="keyitemEditTitle">',
					soy.$$escapeHtml(a.title),
					": ",
					soy.$$escapeHtml(a.name),
					'</div><div class="dialogContent"><div class="keyitemFormField"><label for="url_field"><span class="formlabel">Internetadresse (URL)</span><br/></label><input type="text" class="text" id="url_field" name="url" value="',
					soy.$$escapeHtml(a.url),
					'" tabindex="21" readonly="readonly" /></div><div class="keyitemFormField"><label for="name_field"><span class="formlabel">Name</span><br/></label><input type="text" id="name_field" class="text" name="url_name" value="',
					soy.$$escapeHtml(a.name),
					'" tabindex="22" readonly="readonly" /></div><div class="upcase bold marginTopMedium trenner">Optional</div><div class="keyitemFormField"><label for="username_field"><span class="formlabel">Benutzername</span><br/></label><input type="text" id="username_field" class="text" name="username" value="',
					soy.$$escapeHtml(a.username != null ? a.username : ""),
					'" tabindex="23" readonly="readonly" /></div><div class="keyitemFormField"><label for="password_field"><span class="formlabel">Passwort</span><br/></label><input type="password" id="password_field" class="text floatingContent" name="password" value="',
					soy.$$escapeHtml(a.password != null ? a.password : ""),
					'" tabindex="24" readonly="readonly" /><input type="text" style="display: none;" id="password_field_text" class="text floatingContent" name="password" value="',
					soy.$$escapeHtml(a.password != null ? a.password : ""),
					'" tabindex="24" readonly="readonly" /><div id="togglePasswordButton" class="grey_button small_button floatingContentRight">Passwort zeigen</div></div></div>');
	if (!b)
		return d.toString()
};
allyve.keyringmanager.btnShowPassword = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort zeigen");
	if (!b)
		return a.toString()
};
allyve.keyringmanager.btnHidePassword = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append("Passwort verbergen");
	if (!b)
		return a.toString()
};
allyve.keyringmanager.renderDeleteKeyring = function(a, b) {
	a = b || new soy.StringBuilder;
	a.append('\t<div class="modalHeader" id="deleteKeyringTitle">');
	allyve.i18n.deleteKeyring_title(null, a);
	a.append('</div><div class="dialogContent">');
	allyve.i18n.deleteKeyring_text(null, a);
	a.append("</div>");
	if (!b)
		return a.toString()
};
if (typeof allyve == "undefined")
	allyve = {};
if (typeof allyve.infomessages == "undefined")
	allyve.infomessages = {};
allyve.infomessages.renderSystemMessage = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<img id="systemMessageImg" src="img/allyve/1-buttons/button-news.gif" class="floatingContent" /><p id="systemMessageTitle">',
					a.messageItem.title, '</p><p id="systemMessageText">',
					a.messageItem.description, "</p>");
	if (!b)
		return d.toString()
};
allyve.infomessages.renderGoodToKnow = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<img id="goodToKnowImg" src="img/allyve/1-buttons/button-gut-zu-wissen.gif" class="floatingContent" /><p id="goodToKnowTitle">',
					a.messageItem.title, '</p><p id="goodToKnowText">',
					a.messageItem.description, "</p>");
	if (!b)
		return d.toString()
};
allyve.infomessages.renderHoliday = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<img id="holidayImg" src="img/allyve/1-buttons/button-feiertag.gif" class="floatingContent" /><p id="holidayTitle">',
					a.messageItem.title, '</p><p id="holidayText">',
					a.messageItem.description, "</p>");
	if (!b)
		return d.toString()
};
allyve.infomessages.renderGreeting = function(a, b) {
	var d = b || new soy.StringBuilder;
	d
			.append(
					'\t<img id="greetingImg" src="img/allyve/1-buttons/button-begruessung.gif" class="floatingContent" /><p id="greetingTitle">',
					a.messageItem.title, '</p><p id="greetingText">',
					a.messageItem.description, "</p>");
	if (!b)
		return d.toString()
};
var debug = false;
function C() {
	this.l = function(a) {
		debug && typeof console != "undefined" && console.log(a)
	};
	this.l("Logging is enabled...")
}
var c = new C;
function initBreakwater() {
	$(document).ajaxSend(beforeRequest);
	$(document).ajaxError(standardErrorHandler)
}
function beforeRequest(a, b, d) {
	a = getCookie("BREAKWATER");
	a != null && b.setRequestHeader("BREAKWATER", a)
}
function standardErrorHandler(a, b, d) {
	switch (b.status) {
	case 401:
		break;
	case 500:
	case 502:
	case 504:
		showAlertOk(allyve.i18n.maintenanceMessage(), allyve.i18n
				.maintenanceHeader(), function() {
			location.reload()
		});
		break
	}
};
function initSearch() {
	googleSearch();
	bingSearch();
	amazonSearch();
	ebaySearch();
	wikipediaSearch()
}
function googleSearch() {
	var a = escape($("#search_query").val());
	a = a.replace(/\+/g, "%2B");
	$("#google_search").attr("href", "/search?q=" + a)
}
function bingSearch() {
	var a = encodeURI($("#search_query").val());
	a = a.replace(/\+/g, "%2B");
	$("#bing_search").attr("href", "http://www.bing.com/search?q=" + a)
}
function amazonSearch() {
	var a = escape($("#search_query").val());
	a = a.replace(/\+/g, "%2B");
	a = a.replace(/\%u20AC/g, "EUR");
	$("#amazon_search")
			.attr(
					"href",
					"http://www.amazon.de/gp/search?keywords="
							+ a
							+ "&tag=alleinseiimmd-21&index=blended&linkCode=ur2&camp=1638&creative=6742")
}
function ebaySearch() {
	var a = escape($("#search_query").val());
	a = a.replace(/\+/g, "%2B");
	a = a.replace(/\%u20AC/g, "EUR");
	$("#ebay_search")
			.attr(
					"href",
					"http://rover.ebay.com/rover/1/707-53477-19255-0/1?icep_ff3=9&pub=5574854054&toolid=10001&campid=5336390817&customid=&icep_uq="
							+ a
							+ "&icep_sellerId=&icep_ex_kw=&icep_sortBy=12&icep_catId=&icep_minPrice=&icep_maxPrice=&ipn=psmain&icep_vectorid=229487&kwid=902099&mtid=824&kw=lg")
}
function wikipediaSearch() {
	var a = escape($("#search_query").val());
	a = a.replace(/\+/g, "%2B");
	$("#wikipedia_search").attr("href",
			"http://de.wikipedia.org/wiki/Spezial:Suche?search=" + a)
}
function googleSearchViaEnter(a) {
	if (13 == a.keyCode)
		if ($("#google_search").length > 0) {
			googleSearch();
			window.open($("#google_search").attr("href"), "_blank")
		} else if ($("#bing_search").length > 0) {
			bingSearch();
			window.open($("#bing_search").attr("href"), "_blank")
		}
};
function processParams() {
	var a = getUrlVars();
	a.activate && account.activate(a.activate);
	if (a.newpassword)
		account.askForNewPassword(a.newpassword);
	else if (a.newusername)
		account.setNewUsername(a.newusername);
	else if (a.showdialog)
		switch (a.showdialog) {
		case "datenschutz":
			showDatenschutzDialog();
			break;
		case "agb":
			showAgbDialog();
			break;
		case "impressum":
			showImpressumDialog();
			break;
		default:
			showNotFoundDialog()
		}
}
function getUrlVars() {
	var a = [], b;
	b = checkAndFixUrl(window.location.href);
	for ( var d = b.slice(b.indexOf("?") + 1).split("&"), e = 0; e < d.length; e++) {
		b = d[e].split("=");
		a[b[0]] = b[1]
	}
	return a
}
function checkAndFixUrl(a) {
	var b = a.indexOf("?"), d = a.lastIndexOf("?");
	if (b != d)
		a = a.substring(0, b + 1) + a.substring(b + 1).replace("?", "&");
	return a
}
function resetLocation() {
	window.location.href = window.location.protocol + "//"
			+ window.location.host
}
function clearInput(a) {
	if (a.defaultValue == a.value)
		a.value = ""
}
function restoreInput(a) {
	if (a.value == "")
		if (a.defaultValue && a.defaultValue != "")
			a.value = a.defaultValue
}
function shorten(a) {
	return shortenWithLength(a, 14)
}
function shortenWithLength(a, b) {
	if (a && a.length > b)
		return a.substring(0, b) + "&#8230;";
	return a
}
function stripHTML(a) {
	if (a != null) {
		a = a.replace(/&(lt|gt);/g, function(b, d) {
			return d == "lt" ? "<" : ">"
		});
		return a.replace(/<(.|\n)*?>/g, "")
	} else
		return null
}
function getPlainText(a) {
	if (a != null) {
		a = a.replace(/&(lt|gt);/g, function(b, d) {
			return d == "lt" ? "<" : ">"
		});
		return a.replace(/<\/?[^>]+(>|$)/g, "")
	} else
		return null
}
function getCookie(a) {
	var b = null;
	if (document.cookie && document.cookie != "")
		for ( var d = document.cookie.split(";"), e = 0; e < d.length; e++) {
			var f = $.trim(d[e]);
			if (f.substring(0, a.length + 1) == a + "=") {
				b = decodeURIComponent(f.substring(a.length + 1));
				break
			}
		}
	return b
}
function deleteCookie(a) {
	document.cookie = a + "=1;expires=" + (new Date).toGMTString() + ";;"
}
function setCookie(a, b, d) {
	var e = new Date;
	d = e.getTime() + d * 60 * 60 * 1E3;
	e.setTime(d);
	document.cookie = a + "=" + b + "; expires=" + e.toGMTString() + ";"
}
function isUrl(a) {
	return /^(gopher|news|nntp|telnet|http|ftp|https|ftps|sftp):\/\// .test(a)
}
(function(a) {
	a.fn.ellipsis = function(b) {
		var d = document.documentElement.style;
		return "textOverflow" in d || "OTextOverflow" in d ? this
				: this
						.each(function() {
							var e = a(this);
							if (e.css("overflow") == "hidden") {
								var f = e.html();
								e.width();
								var l = a(this.cloneNode(true)).hide().css({
									position : "absolute",
									width : "auto",
									overflow : "visible",
									"max-width" : "inherit"
								});
								e.after(l);
								for ( var m = f; m.length > 0
										&& l.width() > e.width();) {
									m = m.substr(0, m.length - 1);
									l.html(m + "...")
								}
								e.html(l.html());
								l.remove();
								if (b == true) {
									var p = e.width();
									setInterval(function() {
										if (e.width() != p) {
											p = e.width();
											e.html(f);
											e.ellipsis()
										}
									}, 200)
								}
							}
						})
	}
})(jQuery);
function attachTooltip(a, b) {
	$(a).qtip({
		content : b,
		style : {
			tip : true
		},
		position : {
			target : "mouse",
			adjust : {
				screen : true
			}
		}
	})
}
function eliminateDuplicates(a) {
	var b = [];
	for (i = 0; i < a.length; i++) {
		var d = a[i], e = false;
		for (j = 0; j < b.lenth; j++)
			if (d == b[j]) {
				e = true;
				break
			}
		e || b.push(d)
	}
	return b
}
function isOValueGreater(a, b) {
	return a.value > b.value
}
function cutString(a, b) {
	if (a.length <= b + 1)
		return a;
	a = a.substr(0, b);
	a = a.substr(0, a.lastIndexOf(" "));
	a += "&#133;";
	return a
}
var htmlUmlaute = {
	"&auml;" : "\u00e4",
	"&Auml;" : "\u00c4",
	"&ouml;" : "\u00f6",
	"&Ouml;" : "\u00d6",
	"&uuml;" : "\u00fc",
	"&Uuml;" : "\u00dc",
	"&szlig;" : "\u00df",
	"&quot;" : '"'
};
function replaceUmlauts(a) {
	if (a)
		return a.replace(
				/(&auml;|&Auml;|&ouml;|&Ouml;|&uuml;|&Uuml;|&szlig;|&quot;)/g,
				function(b) {
					return htmlUmlaute[b]
				});
	return a
};
function AllyveEventsBase() {
	this.eventNames = {};
	this.AFTER_WIDGET_ADD = "afterWidgetAdd";
	this.AFTER_WIDGET_DELETE = "afterWidgetDelete";
	this.MULTI_STATUS_CHANGE = "multiStatusChange";
	this.FIRST_STATUS_WIDGET_ADDED = "firstStatusWidgetAdded";
	this.NO_MORE_STATUS_WIDGET_AVAILABLE = "noMoreStatusWidgetAvailable";
	this.passToJquery = false;
	this.registerEvent = function(a) {
		this.isRegistered(a) || (this.eventNames[a] = [])
	};
	this.deregisterEvent = function(a) {
		this.isRegistered(a) && delete this.eventNames[a]
	};
	this.subscribe = function(a, b) {
		this.isRegistered(a) || this.registerEvent(a);
		this.addCallbackToEvent(a, b)
	};
	this.unsubscribe = function(a, b) {
		if (!this.isRegistered(a))
			return false;
		return this.removeCallbackFromEvent(a, b)
	};
	this.isRegistered = function(a) {
		if (this.eventNames[a])
			return true;
		return false
	};
	this.addCallbackToEvent = function(a, b) {
		this.eventNames[a].push(b);
		this.passToJquery && $(document).bind("allyve." + a, b);
		return true
	};
	this.removeCallbackFromEvent = function(a, b) {
		try {
			for ( var d = this.getNumberOfCallbacksForEvent(a); d > 0;) {
				if (this.eventNames[a][d - 1].toString() == b.toString()) {
					this.eventNames[a].splice(d - 1, 1);
					break
				}
				d--
			}
			this.passToJquery && $(document).unbind("allyve." + a);
			return true
		} catch (e) {
			return false
		}
	};
	this.getNumberOfCallbacksForEvent = function(a) {
		if (!this.isRegistered(a))
			return 0;
		return this.eventNames[a].length
	};
	this.raiseEvent = function(a, b) {
		if (!this.isRegistered(a))
			return false;
		try {
			for (i in this.eventNames[a])
				this.eventNames[a][i](b, a)
		} catch (d) {
			return false
		}
	};
	this.registerEvent(this.AFTER_WIDGET_ADD);
	this.registerEvent(this.AFTER_WIDGET_DELETE);
	this.registerEvent(this.MULTI_STATUS_CHANGE);
	this.registerEvent(this.FIRST_STATUS_WIDGET_ADDED);
	this.registerEvent(this.NO_MORE_STATUS_WIDGET_AVAILABLE)
};
function AllyveEvents() {
	if (AllyveEvents.instance !== undefined)
		return AllyveEvents.instance;
	AllyveEvents.instance = this
}
AllyveEvents.prototype = new AllyveEventsBase;
AllyveEvents.constructor = AllyveEvents;
function ApiBase() {
	this.callJsonDataApi = function(a) {
		a.callDataType = "json";
		return this.callApi(a)
	};
	this.callXmlDataApi = function(a) {
		a.callDataType = "xml";
		return this.callApi(a)
	};
	this.callTextDataApi = function(a) {
		a.callDataType = "text";
		return this.callApi(a)
	};
	this.callApi = function(a) {
		var b = true;
		a instanceof ApiParams && $.ajax({
			type : a.callType,
			url : a.callUrl,
			data : a.callData,
			dataType : a.callDataType,
			async : a.isAsync,
			cache : a.isCached,
			contentType : a.contentType,
			success : function(d) {
				a.successCallback && a.successCallback(d, a.callbackData)
			},
			error : function(d, e, f) {
				a.errorCallback && a.errorCallback(d, e, f);
				b = false
			}
		});
		return b
	}
}
function ApiParams(a, b, d, e, f, l, m, p, v, y) {
	this.callUrl = a;
	this.callType = b;
	this.callData = d;
	this.callDataType = e;
	this.successCallback = f;
	this.errorCallback = l;
	this.isAsync = m;
	this.callbackData = p;
	this.contentType = v ? v : "application/x-www-form-urlencoded";
	this.METHOD = {
		POST : "POST",
		GET : "GET",
		DELETE : "DELETE",
		PUT : "PUT"
	};
	this.isCached = y ? y : true
};
function AuthApiBase() {
	var a = this;
	this.setDefaultParams = function(b) {
		b = new ApiParams(b);
		b.callType = b.METHOD.POST;
		b.isAsync = false;
		return b
	};
	this.login = function(b, d, e) {
		var f = this.setDefaultParams("/api/auth/login");
		f.callData = b;
		a.callText(f, d, e)
	};
	this.logout = function(b, d) {
		var e = this.setDefaultParams("/api/auth/logout");
		a.callText(e, b, d)
	};
	this.callJson = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callJsonDataApi(b)
	};
	this.callText = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callTextDataApi(b)
	}
}
AuthApiBase.prototype = new ApiBase;
AuthApiBase.constructor = AuthApiBase;
function AuthApi() {
	if (AuthApi.instance !== undefined)
		return AuthApi.instance;
	AuthApi.instance = this
}
AuthApi.prototype = new AuthApiBase;
AuthApi.constructor = AuthApi;
function AccountsApiBase() {
	var a = this;
	this.setDefaultParams = function(b) {
		b = new ApiParams(b);
		b.callType = b.METHOD.POST;
		b.isAsync = false;
		return b
	};
	this.create = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/create/");
		f.callData = b;
		a.callJson(f, d, e)
	};
	this.activate = function(b, d, e, f) {
		b = this.setDefaultParams("/api/accounts/activation/" + b);
		b.callData = d;
		a.callJson(b, e, f)
	};
	this.changePassword = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/password/");
		f.callData = b;
		a.callText(f, d, e)
	};
	this.deleteAccount = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/delete/");
		f.callData = b;
		a.callText(f, d, e)
	};
	this.changeEmail = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/email/");
		f.callData = b;
		a.callText(f, d, e)
	};
	this.resendActivationMail = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/activation/email/again");
		f.callData = b;
		a.callJson(f, d, e)
	};
	this.activateEmail = function(b, d, e, f) {
		b = this.setDefaultParams("/api/accounts/activation/email/" + b);
		b.callData = d;
		a.callText(b, e, f)
	};
	this.changeNewsletter = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/newsletter/");
		f.callData = b;
		a.callText(f, d, e)
	};
	this.passwordForgotten = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/password/forgotten/");
		f.callData = b;
		a.callJson(f, d, e)
	};
	this.newPassword = function(b, d, e, f) {
		b = this.setDefaultParams("/api/accounts/password/new/" + b);
		b.callData = d;
		a.callJson(b, e, f)
	};
	this.newUsername = function(b, d, e) {
		b = this.setDefaultParams("/api/accounts/activation/email/" + b);
		a.callJson(b, d, e)
	};
	this.getAccount = function(b, d, e) {
		b = this.setDefaultParams("/api/accounts/" + b);
		b.callType = b.METHOD.GET;
		b.isCached = false;
		a.callJson(b, d, e)
	};
	this.callJson = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callJsonDataApi(b)
	};
	this.callText = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callTextDataApi(b)
	}
}
AccountsApiBase.prototype = new ApiBase;
AccountsApiBase.constructor = AccountsApiBase;
function AccountsApi() {
	var a = this;
	if (AccountsApi.instance !== undefined)
		return AccountsApi.instance;
	AccountsApi.instance = this;
	this.deleteAccount = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/owok/delete");
		f.callData = b;
		a.callText(f, d, e)
	};
	this.changePassword = function(b, d, e) {
		var f = this.setDefaultParams("/api/accounts/owok/password");
		f.callData = b;
		a.callText(f, d, e)
	}
}
AccountsApi.prototype = new AccountsApiBase;
AccountsApi.constructor = AccountsApi;
function ActionsApiBase() {
	this.postSammelStatus = function(a, b, d) {
		this.callJsonAction(0, "statusupdate_status", a, b, d, true)
	};
	this.postTwitterStatus = function(a, b, d, e) {
		this.callJsonAction(a, "twitter_status", b, d, e, true)
	};
	this.postMyspaceStatus = function(a, b, d, e) {
		this.callJsonAction(a, "myspace_status", b, d, e, true)
	};
	this.postFacebookStatus = function(a, b, d, e) {
		this.callJsonAction(a, "facebook_status", b, d, e, true)
	};
	this.getStockBasketNames = function(a, b) {
		this
				.callXmlAction(0, "teleboerse_basketNamesAction", null, a, b,
						false)
	};
	this.getStocksInBasket = function(a, b, d) {
		this.callXmlAction(0, "teleboerse_stockNamesAction", a, b, d, false)
	};
	this.getWeatherLocations = function(a, b, d) {
		this.callXmlAction(0, "weather_locations", a, b, d, false)
	};
	this.callJsonAction = function(a, b, d, e, f, l, m) {
		this.callJsonDataApi(new ApiParams("/api/widgets/actions/" + a + "/"
				+ b, "POST", d, null, e, f, l, m))
	};
	this.callXmlAction = function(a, b, d, e, f, l, m) {
		this.callXmlDataApi(new ApiParams(
				"/api/widgets/actions/" + a + "/" + b, "POST", d, null, e, f,
				l, m))
	}
}
ActionsApiBase.prototype = new ApiBase;
ActionsApiBase.constructor = ActionsApiBase;
function ActionsApi() {
	if (ActionsApi.instance !== undefined)
		return ActionsApi.instance;
	ActionsApi.instance = this
}
ActionsApi.prototype = new ActionsApiBase;
ActionsApi.constructor = ActionsApi;
function SettingsApiBase() {
	var a = this;
	this.urlBase = "/api/settings/";
	this.getSettings = function(b, d) {
		var e = this.setDefaultParams(this.urlBase);
		e.callType = e.METHOD.GET;
		a.callJson(e, b, d)
	};
	this.saveSettings = function(b, d, e) {
		var f = this.setDefaultParams(this.urlBase + "single");
		f.callType = f.METHOD.POST;
		f.callData = $.toJSON(b);
		f.contentType = "application/json";
		a.callText(f, d, e)
	};
	this.setDefaultParams = function(b) {
		b = new ApiParams(b);
		b.isCached = false;
		b.isAsync = false;
		return b
	};
	this.callJson = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callJsonDataApi(b)
	};
	this.callText = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callTextDataApi(b)
	}
}
SettingsApiBase.prototype = new ApiBase;
SettingsApiBase.constructor = SettingsApiBase;
function SettingsApi() {
	if (SettingsApi.instance !== undefined)
		return SettingsApi.instance;
	SettingsApi.instance = this
}
SettingsApi.prototype = new SettingsApiBase;
SettingsApi.constructor = SettingsApi;
function SettingsCryptApiBase() {
	this.urlBase = "/api/settingscrypted/"
}
SettingsCryptApiBase.prototype = new SettingsApiBase;
SettingsCryptApiBase.constructor = SettingsCryptApiBase;
function SettingsCryptApi() {
	if (SettingsCryptApi.instance !== undefined)
		return SettingsCryptApi.instance;
	SettingsCryptApi.instance = this
}
SettingsCryptApi.prototype = new SettingsCryptApiBase;
SettingsCryptApi.constructor = SettingsCryptApi;
function WidgetsDataApiBase() {
	var a = this;
	this.getData = function(b, d) {
		var e = this.setDefaultParams("/api/widgets/data/");
		e.callType = e.METHOD.GET;
		a.callJson(e, b, d)
	};
	this.getUpdatedData = function(b, d) {
		var e = this.setDefaultParams("/api/widgets/data/updated");
		e.isAsync = true;
		e.callType = e.METHOD.GET;
		a.callJson(e, b, d)
	};
	this.getRecentlyUpdatedData = function(b, d) {
		var e = this.setDefaultParams("/api/widgets/data/updated/recent");
		e.isAsync = true;
		e.callType = e.METHOD.GET;
		a.callJson(e, b, d)
	};
	this.setDefaultParams = function(b) {
		b = new ApiParams(b);
		b.callType = b.METHOD.POST;
		b.isAsync = false;
		b.cacheRequest = false;
		b.isCached = false;
		return b
	};
	this.callJson = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callJsonDataApi(b)
	};
	this.callText = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callTextDataApi(b)
	}
}
WidgetsDataApiBase.prototype = new ApiBase;
WidgetsDataApiBase.constructor = WidgetsDataApiBase;
function WidgetsDataApi() {
	if (WidgetsDataApi.instance !== undefined)
		return WidgetsDataApi.instance;
	WidgetsDataApi.instance = this
}
WidgetsDataApi.prototype = new WidgetsDataApiBase;
WidgetsDataApi.constructor = WidgetsDataApi;
function WidgetsInfosApiBase() {
	var a = this;
	this.getInfos = function(b, d) {
		var e = this.setDefaultParams("/api/widgets/infos/");
		a.callJson(e, b, d)
	};
	this.setDefaultParams = function(b) {
		b = new ApiParams(b);
		b.callType = b.METHOD.GET;
		b.isAsync = false;
		return b
	};
	this.callJson = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callJsonDataApi(b)
	}
}
WidgetsInfosApiBase.prototype = new ApiBase;
WidgetsInfosApiBase.constructor = WidgetsInfosApiBase;
function WidgetsInfosApi() {
	if (WidgetsInfosApi.instance !== undefined)
		return WidgetsInfosApi.instance;
	WidgetsInfosApi.instance = this
}
WidgetsInfosApi.prototype = new WidgetsInfosApiBase;
WidgetsInfosApi.constructor = WidgetsInfosApi;
function WidgetsSetupApiBase() {
	this.remove = function(a, b, d) {
		a = this.setDefaultParams("/api/widgets/setups/" + a);
		a.callType = a.METHOD.DELETE;
		return this.callText(a, b, d)
	};
	this.save = function(a, b, d, e) {
		a = this.setDefaultParams("/api/widgets/setups/" + a);
		a.callData = b;
		a.successCallback = d;
		a.errorCallback = e;
		return this.callApi(a)
	};
	this.setDefaultParams = function(a) {
		a = new ApiParams(a);
		a.callType = a.METHOD.POST;
		a.isAsync = false;
		a.cacheRequest = false;
		return a
	};
	this.callJson = function(a, b, d) {
		a.successCallback = b;
		a.errorCallback = d;
		return this.callJsonDataApi(a)
	};
	this.callText = function(a, b, d) {
		a.successCallback = b;
		a.errorCallback = d;
		return this.callTextDataApi(a)
	}
}
WidgetsSetupApiBase.prototype = new ApiBase;
WidgetsSetupApiBase.constructor = WidgetsSetupApiBase;
function WidgetsSetupApi() {
	if (WidgetsSetupApi.instance !== undefined)
		return WidgetsSetupApi.instance;
	WidgetsSetupApi.instance = this
}
WidgetsSetupApi.prototype = new WidgetsSetupApiBase;
WidgetsSetupApi.constructor = WidgetsSetupApi;
function FaviconsApiBase() {
	function a() {
		var b = new ApiParams;
		b.callType = "POST";
		b.isAsync = true;
		b.contentType = "application/json";
		return b
	}
	this.urlGet = "/api/favicon/get";
	this.urlRequest = "/api/favicon/request";
	this.getFavicons = function(b, d, e, f) {
		var l = new a(b);
		l.callData = b;
		l.callbackData = d;
		l.successCallback = e;
		l.errorCallback = f;
		l.callUrl = this.urlGet;
		this.callJsonDataApi(l)
	};
	this.requestFavicons = function(b, d, e, f) {
		var l = new a;
		l.callData = b;
		l.callbackData = d;
		l.successCallback = e;
		l.errorCallback = f;
		l.callUrl = this.urlRequest;
		this.callJsonDataApi(l)
	}
}
FaviconsApiBase.prototype = new ApiBase;
FaviconsApiBase.constructor = FaviconsApiBase;
function FaviconsApi() {
	if (FaviconsApi.instance !== undefined)
		return FaviconsApi.instance;
	FaviconsApi.instance = this
}
FaviconsApi.prototype = new FaviconsApiBase;
FaviconsApi.constructor = FaviconsApi;
function InfoMessagesApiBase() {
	var a = this;
	this.getGreeting = function(b, d) {
		var e = this.setDefaultParams("/api/infomessages/greeting/");
		a.callJson(e, b, d)
	};
	this.getCurrentMessage = function(b, d) {
		var e = this.setDefaultParams("/api/infomessages/active/");
		a.callJson(e, b, d)
	};
	this.setDefaultParams = function(b) {
		b = new ApiParams(b);
		b.callType = b.METHOD.GET;
		b.isCached = false;
		b.isAsync = false;
		return b
	};
	this.callJson = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callJsonDataApi(b)
	}
}
InfoMessagesApiBase.prototype = new ApiBase;
InfoMessagesApiBase.constructor = InfoMessagesApiBase;
function InfoMessagesApi() {
	if (InfoMessagesApi.instance !== undefined)
		return InfoMessagesApi.instance;
	InfoMessagesApi.instance = this
}
InfoMessagesApi.prototype = new InfoMessagesApiBase;
InfoMessagesApi.constructor = InfoMessagesApi;
function CardApi() {
	var a = this;
	this.getCardList = function(b, d) {
		var e = new ApiParams("/api/accounts/owok/list_cards");
		e.callType = e.METHOD.GET;
		e.isAsync = false;
		e.isCached = false;
		a.callJson(e, b, d)
	};
	this.deleteCard = function(b, d, e) {
		var f = new ApiParams("/api/accounts/owok/delete_card");
		f.callType = f.METHOD.DELETE;
		f.isAsync = false;
		f.callData = b;
		f.callDataType = "application/json";
		a.callText(f, d, e)
	};
	this.prepareAddEidCard = function(b, d) {
		var e = new ApiParams("/api/eid/prepareadd");
		e.callType = e.METHOD.POST;
		e.isAsync = false;
		a.callText(e, b, d)
	};
	this.prepareChPasswd = function(b, d, e) {
		var f = new ApiParams("/api/eid/prepare_chpasswd");
		f.callType = f.METHOD.POST;
		f.callData = b;
		f.callDataType = "application/json";
		f.isAsync = false;
		a.callText(f, d, e)
	};
	this.deleteEidCard = function(b, d, e) {
		var f = new ApiParams("/api/eid/deletecard");
		f.callType = f.METHOD.DELETE;
		f.isAsync = false;
		f.callData = b;
		f.callDataType = "application/json";
		a.callText(f, d, e)
	};
	this.revalidateWithPin = function(b, d, e) {
		var f = new ApiParams("/api/auth/owokuac");
		f.callType = f.METHOD.POST;
		f.isAsync = false;
		f.callData = b;
		f.callDataType = "application/json";
		a.callJson(f, d, e)
	};
	this.callJson = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callJsonDataApi(b)
	};
	this.callText = function(b, d, e) {
		b.successCallback = d;
		b.errorCallback = e;
		this.callTextDataApi(b)
	}
}
CardApi.prototype = new ApiBase;
CardApi.constructor = CardApi;
function UserSettingsBase() {
	var a = this;
	this.settings = Array();
	this.lastError = "";
	this.uid = null;
	this.init = function() {
		this.loadSettings()
	};
	this.loadSettings = function() {
		var b = null;
		(new SettingsApi).getSettings(function(d) {
			b = d.settings;
			a.uid = d.userId
		}, function(d, e) {
			a.lastError = "settings load failed. " + e
		});
		b && $.each(b, function(d, e) {
			if (e)
				a.settings[e.name] = e.value
		})
	};
	this.get = function(b) {
		if (a.settings[b])
			return a.settings[b];
		return null
	};
	this.set = function(b, d) {
		a.settings[b] = d;
		(new SettingsApi).saveSettings({
			name : b,
			value : d
		}, a.onSetSuccess, a.onSetError)
	};
	this.onSetSuccess = function() {
	};
	this.onSetError = function(b, d) {
		a.lastError = "settings save failed. " + d
	}
};
function UserSettings() {
	if (UserSettings.instance !== undefined)
		return UserSettings.instance;
	UserSettings.instance = this;
	this.init()
}
UserSettings.prototype = new UserSettingsBase;
UserSettings.constructor = UserSettings;
function UserSettingsCryptBase() {
	var a = this;
	this.loadSettings = function() {
		var b = null;
		(new SettingsCryptApi).getSettings(function(d) {
			b = d.settings;
			a.uid = d.userId
		}, function(d, e) {
			a.lastError = "settings load failed. " + e
		});
		$.each(b, function(d, e) {
			if (e)
				a.settings[e.name] = e.value
		})
	};
	this.get = function(b) {
		if (a.settings[b])
			try {
				if (typeof a.settings[b] == "string")
					return $.parseJSON(a.settings[b]);
				return a.settings[b]
			} catch (d) {
				return a.settings[b]
			}
		return null
	};
	this.set = function(b, d) {
		a.settings[b] = d;
		(new SettingsCryptApi).saveSettings({
			name : b,
			value : $.toJSON(d)
		}, a.onSetSuccess, a.onSetError)
	}
}
UserSettingsCryptBase.prototype = new UserSettingsBase;
UserSettingsCryptBase.constructor = UserSettingsCryptBase;
function UserSettingsCrypt() {
	if (UserSettingsCrypt.instance !== undefined)
		return UserSettingsCrypt.instance;
	UserSettingsCrypt.instance = this;
	this.init()
}
UserSettingsCrypt.prototype = new UserSettingsCryptBase;
UserSettingsCrypt.constructor = UserSettingsCrypt;
function AccountBase() {
	var a = this;
	this.accountInfo = null;
	this.messagePassword = {
		minlength : jQuery.format("Mindestens {0} Zeichen"),
		required : jQuery.format("Bitte ausf\u00fcllen.")
	};
	this.messagePasswordRepeat = {
		minlength : jQuery.format("Mindestens {0} Zeichen"),
		required : jQuery.format("Bitte ausf\u00fcllen."),
		equalTo : jQuery.format("Falsch wiederholt.")
	};
	this.messageAgb = {
		required : jQuery.format("Bitte lesen und best\u00e4tigen. ")
	};
	this.messageAgbConfirmed = {
		required : jQuery
				.format("Bitte Akzeptiere die AGB und Datenschutzbestimmungen. ")
	};
	this.messageUsername = {
		required : jQuery.format("Bitte ausf\u00fcllen."),
		email : jQuery.format("Keine g\u00fcltige E-Mail-Adresse.")
	};
	this.messageUsernameRepeat = {
		equalTo : jQuery.format("E-Mail-Adressen sind nicht gleich"),
		required : jQuery.format("Bitte ausf\u00fcllen."),
		email : jQuery.format("Keine g\u00fcltige E-Mail-Adresse.")
	};
	this.messageEmail = {
		email : jQuery.format("Keine g\u00fcltige E-Mail-Adresse."),
		required : jQuery.format("Bitte ausf\u00fcllen.")
	};
	$("#registrationForm").validate({
		rules : {
			password : {
				required : true,
				minlength : 6
			},
			password_rep : {
				required : true,
				minlength : 6,
				equalTo : "#reg_password"
			}
		},
		messages : {
			password : this.messagePassword,
			password_rep : this.messagePasswordRepeat,
			username : this.messageUsername,
			agb : this.messageAgb
		},
		submitHandler : function(b) {
			a.register($(b).serialize());
			return false
		}
	});
	this.register = function(b) {
		(new AccountsApi).create(b, a.onRegisterSuccess, a.onRegisterError)
	};
	this.onRegisterSuccess = function() {
		a.showRegisterSuccessDialog()
	};
	this.onRegisterError = function() {
		a.showRegisterSuccessDialog()
	};
	$("#accountConfig").click(function() {
		account.showAccountConfig();
		return false
	});
	$("#aRegister").click(function() {
		account.showRegisterDialog();
		return false
	});
	this.showAccountConfig = function() {
		var b = {};
		b.id = "ok";
		b.title = allyve.i18n.titleUserSettings();
		b.data = {};
		b.data.html = allyve.config.userSettings();
		b.data.okCaption = allyve.i18n.cancel();
		b.data.close = true;
		modalDialog.show(b, null, "catalogDialog");
		$("#account_change_email").click(function() {
			account.showChangeEmail();
			return false
		});
		$("#account_change_password").click(function() {
			account.showChangePassword();
			return false
		});
		$("#account_change_newsletter").click(function() {
			account.showChangeNewsLetter();
			return false
		});
		$("#account_delete").click(function() {
			account.showDeleteAccount();
			return false
		})
	};
	this.activate = function(b) {
		(new AccountsApi).activate(b, "", a.onActivateSuccess,
				a.onActivateError)
	};
	this.onActivateSuccess = function() {
		a.showActivationSuccessDialog()
	};
	this.onActivateError = function() {
		a.showActivationFailedDialog()
	};
	this.resendActivationMail = function(b) {
		(new AccountsApi).resendActivationMail({
			username : b
		}, a.onResendActivationMailSuccess, a.onResendActivationMailError)
	};
	this.onResendActivationMailSuccess = function() {
		showAlertOk(allyve.i18n.resendActivationMailSuccess())
	};
	this.onResendActivationMailError = function() {
		showAlertOk(allyve.i18n.resendActivationMailFail())
	};
	this.showResendActivationResult = function(b) {
		var d = new AlertDialog;
		d.setButtons({
			OK : function() {
				$(this).dialog("close")
			}
		});
		d.show(b)
	};
	this.showChangeEmail = function() {
		var b = this, d = {};
		d.id = "yesno";
		d.title = allyve.i18n.titleChangeEmail();
		d.data = {};
		d.data.html = allyve.config.changeEmail();
		d.data.close = false;
		d.data.wait = false;
		d.data.yesFunction = '$("#changeEmailForm").submit();';
		modalDialog.show(d, 2);
		$("#changeEmailForm").validate({
			rules : {
				username_rep : {
					equalTo : "#changeEmailForm_username"
				}
			},
			messages : {
				password : this.messagePassword,
				username : this.messageUsername,
				username_rep : this.messageUsernameRepeat
			},
			submitHandler : function() {
				$("#changeEmailError").hide();
				b.changeEmail($("#changeEmailForm").serialize())
			}
		})
	};
	this.changeEmail = function(b) {
		(new AccountsApi).changeEmail(b, a.onChangeEmailSuccess,
				a.onChangeEmailError)
	};
	this.onChangeEmailSuccess = function() {
		modalDialog.showAlertBox(allyve.i18n.titleChangeEmail(), allyve.config
				.changeEmailSuccess(), "html")
	};
	this.onChangeEmailError = function() {
		$("#changeEmailError").show()
	};
	this.activateEmail = function(b) {
		(new AccountsApi).activateEmail(b, "", a.onActivateEmailSuccess,
				a.onActivateEmailError)
	};
	this.onActivateEmailSuccess = function() {
		alert("Your new email has been activated. You can now login with the new email.");
		window.location = "/"
	};
	this.onActivateEmailError = function() {
		alert("The activation of yout new email has failed.");
		window.location = "/"
	};
	this.showChangePassword = function() {
		var b = this, d = this.createDefaultDialog(allyve.i18n
				.titleChangePassword(), allyve.config.changePassword(),
				'$("#changePasswordForm").submit();');
		modalDialog.show(d, 2);
		$("#changePasswordForm").validate({
			rules : {
				password : {
					minlength : 6
				},
				password_rep : {
					equalTo : "#changePasswordForm_password"
				}
			},
			messages : {
				password : this.messagePassword,
				password_rep : this.messagePasswordRepeat
			},
			submitHandler : function() {
				$("#password_old_error").hide();
				$("#changePasswordError").hide();
				b.changePassword($("#changePasswordForm").serialize());
				return false
			}
		})
	};
	this.changePassword = function(b) {
		(new AccountsApi).changePassword(b, a.onChangePasswordSuccess,
				a.onChangePasswordError)
	};
	this.onChangePasswordSuccess = function() {
		modalDialog.showAlertBox(allyve.i18n.titleChangePassword(), allyve.i18n
				.changePasswordSuccess())
	};
	this.onChangePasswordError = function(b) {
		if (b.responseText == "Please check your password.") {
			$("#password_old_error").text(allyve.i18n.checkPassword());
			$("#password_old_error").show()
		}
		$("#changePasswordError").show()
	};
	this.showChangeNewsLetter = function() {
		var b = this, d = {};
		d.id = "yesno";
		d.title = allyve.i18n.titleChangeNewsletter();
		d.data = {};
		d.data.html = allyve.config.newsletterSettings();
		d.data.close = false;
		d.data.wait = false;
		d.data.yesFunction = '$("#newsletterForm").submit();';
		modalDialog.show(d, 2);
		$("#newsletterForm").submit(function() {
			b.changeNewsletter($("#newsletterForm").serialize());
			return false
		})
	};
	this.changeNewsletter = function(b) {
		(new AccountsApi).changeNewsletter(b, a.onChangeNewsletterSuccess,
				a.onChangeNewsletterError)
	};
	this.onChangeNewsletterSuccess = function() {
		modalDialog.showAlertBox(allyve.i18n.titleChangeNewsletter(),
				allyve.i18n.saveSuccess())
	};
	this.onChangeNewsletterError = function() {
		modalDialog.showAlertBox(allyve.i18n.titleChangeNewsletter(),
				allyve.i18n.saveError())
	};
	this.showDeleteAccount = function() {
		var b = this, d = {};
		d.id = "yesno";
		d.title = allyve.i18n.titleDeleteAccount();
		d.data = {};
		d.data.html = allyve.config.deleteAccount();
		d.data.close = false;
		d.data.wait = false;
		d.data.yesFunction = '$("#deleteAccountForm").submit();';
		modalDialog.show(d, 2);
		$("#deleteAccountForm").submit(function() {
			$("#account_error").hide();
			b.deleteAccount($("#deleteAccountForm").serialize());
			return false
		})
	};
	this.deleteAccount = function(b) {
		(new AccountsApi).deleteAccount(b, a.onDeleteAccountSuccess,
				a.onDeleteAccountError)
	};
	this.onDeleteAccountSuccess = function() {
		modalDialog.showAlertBox(allyve.i18n.titleDeleteAccount(), allyve.i18n
				.deleteAccountSuccess(), "text", "window.location.reload();")
	};
	this.onDeleteAccountError = function(b) {
		b.responseText.indexOf("Please check your password.") > 0 ? $(
				"#account_error").text(allyve.i18n.checkPassword()) : $(
				"#account_error").text(allyve.i18n.commonError());
		$("#account_error").show()
	};
	this.showPasswordRequest = function() {
		modalDialog.showTemplate(allyve.modaldialog.showPasswordRequest(), 480);
		$("#showPasswordRequest_form").validate({
			rules : {},
			messages : {
				email : this.messageEmail
			},
			submitHandler : function(b) {
				modalDialog.wait();
				a.forgotPassword($(b).serialize())
			}
		});
		return false
	};
	this.forgotPassword = function(b) {
		(new AccountsApi).passwordForgotten(b, a.onForgotPasswordSuccess,
				a.onForgotPasswordError)
	};
	this.onForgotPasswordSuccess = function() {
		modalDialog.finished("Wurde versendet")
	};
	this.onForgotPasswordError = function() {
		modalDialog.finished("Wurde nicht versendet")
	};
	this.showRegisterDialog = function() {
		var b = this;
		modalDialog.showRegisterDialog();
		$("#registerDialogFormRegister").click(function() {
			$("#registrationDialogForm").submit()
		});
		$("#registerDialogFormCancel").click(function() {
			modalDialog.hide()
		});
		$("#reg_password_dialog").keyup(function() {
			account.getPasswordStrength(this, $("#registerDialogStrength"))
		});
		$("#registrationDialogForm").validate({
			rules : {
				password : {
					required : true,
					minlength : 6
				},
				password_rep : {
					required : true,
					minlength : 6,
					equalTo : "#reg_password_dialog"
				},
				username_rep : {
					equalTo : "#email_dialog"
				}
			},
			messages : {
				password : this.messagePassword,
				password_rep : this.messagePasswordRepeat,
				username : this.messageUsername,
				username_rep : this.messageUsernameRepeat,
				agb_confirmed : this.messageAgbConfirmed
			},
			submitHandler : function(d) {
				b.register($(d).serialize());
				return false
			}
		})
	};
	this.showRegisterSuccessDialog = function() {
		modalDialog.showTemplate(allyve.modaldialog.registerSuccessDialog(),
				800);
		$("#modal_dialog_buttons_ok").click(function() {
			window.location.reload()
		})
	};
	this.showActivationSuccessDialog = function() {
		modalDialog.showTemplate(allyve.modaldialog.activationSuccessDialog(),
				690);
		$("#modal_dialog_buttons_ok").click(function() {
			resetLocation()
		})
	};
	this.showActivationFailedDialog = function() {
		modalDialog.showTemplate(allyve.modaldialog.activationFailedDialog(),
				690);
		$("#modal_dialog_buttons_ok").click(function() {
			resetLocation()
		})
	};
	this.askForNewPassword = function(b) {
		var d = this;
		modalDialog.showTemplate(allyve.modaldialog.askForNewPassword({
			secToken : b
		}), 500);
		$("#setNewPassword_form").validate({
			rules : {
				password : {
					minlength : 6
				},
				password_rep : {
					equalTo : "#askForNewPassword_form_password"
				}
			},
			messages : {
				password : this.messagePassword,
				password_rep : this.messagePasswordRepeat
			},
			submitHandler : function(e) {
				d.newPassword($(e).serialize(), b)
			}
		});
		return false
	};
	this.newPassword = function(b, d) {
		(new AccountsApi).newPassword(d, b, a.onNewPasswordSuccess,
				a.onNewPasswordError)
	};
	this.onNewPasswordSuccess = function() {
		modalDialog.finished("Kennwort ge\u00e4ndert")
	};
	this.onNewPasswordError = function() {
		modalDialog.finished("Kennwort nicht ge\u00e4ndert")
	};
	this.setNewUsername = function(b) {
		(new AccountsApi).newUsername(b, a.onNewUsernameSuccess,
				a.onNewUsernameError)
	};
	this.onNewUsernameSuccess = function() {
		modalDialog.showAlertBox(allyve.i18n.titleChangeEmail(), allyve.i18n
				.changeEmailSuccess(), "text", "resetLocation();")
	};
	this.onNewUsernameError = function() {
		modalDialog.showAlertBox(allyve.i18n.titleChangeEmail(), allyve.i18n
				.changeEmailError(), "text", "resetLocation();")
	};
	this.getAccount = function(b) {
		a.accountInfo
				|| (new AccountsApi).getAccount(b, a.onGetAccountSuccess,
						a.onGetAccountError);
		return a.accountInfo
	};
	this.onGetAccountSuccess = function(b) {
		a.accountInfo = b
	};
	this.onGetAccountError = function() {
		c.l("get account info failed")
	};
	this.getPasswordStrength = function(b, d) {
		var e = new RegExp(
				"^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"), f = new RegExp(
				"^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
				"g");
		if (e.test(b.value)) {
			d.text(allyve.i18n.pwdStrong());
			d.css("background-color", "green")
		} else if (f.test(b.value)) {
			d.text(allyve.i18n.pwdMedium());
			d.css("background-color", "orange")
		} else {
			d.text(allyve.i18n.pwdWeak());
			d.css("background-color", "red")
		}
	};
	this.createDefaultDialog = function(b, d, e) {
		var f = {};
		f.id = "yesno";
		f.title = b;
		f.data = {};
		f.data.html = d;
		f.data.close = false;
		f.data.wait = false;
		f.data.yesFunction = e;
		return f
	}
};
function Account() {
	this.urlChangePassword = "/api/accounts/owok/password";
	this.urlDeleteAccount = "/api/accounts/owok/delete";
	this.urlOwokUnregister = "/api/auth/owokunregister";
	var a = this, b = null, d = {
		required : jQuery.format("Bitte ausf\u00fcllen."),
		rangelength : jQuery.format("Die Pin muss 6 Stellen lang sein."),
		number : jQuery.format("Es sind nur Zahlen zul\u00e4ssig.")
	};
	this.showRegisterDialogOwokLight = function(e) {
		this.initCardEvents(e);
		modalDialog.showRegisterDialog();
		$("#registerDialogFormRegister").click(function() {
			$("#registrationDialogForm").submit()
		});
		$("#registerDialogFormCancel").click(function() {
			modalDialog.hide()
		});
		$("#reg_password_dialog").keyup(function() {
			account.getPasswordStrength(this, $("#registerDialogStrength"))
		});
		$("#registrationDialogForm")
				.validate(
						{
							rules : {
								password : {
									required : true,
									minlength : 6
								},
								password_rep : {
									required : true,
									minlength : 6,
									equalTo : "#reg_password_dialog"
								},
								username_rep : {
									equalTo : "#email_dialog"
								}
							},
							messages : {
								password : this.messagePassword,
								password_rep : this.messagePasswordRepeat,
								username : this.messageUsername,
								username_rep : this.messageUsernameRepeat,
								agb_confirmed : this.messageAgbConfirmed
							},
							submitHandler : function(f) {
								var l = OWOKPlugin.getLightCardId();
								if (l == "")
									return false;
								$("#form_lightCardId").remove();
								$(f)
										.append(
												'<input id="form_lightCardId" type="hidden" name="cardId" value="11 02 FF 00 12 07 '
														+ l + ' " />');
								$(f).serialize();
								$.ajax({
									type : "POST",
									data : $(f).serialize(),
									url : "/api/accounts/owok/create/",
									dataType : "json",
									async : false,
									success : function() {
										a.showRegisterSuccessDialog()
									},
									error : function() {
										a.showRegisterSuccessDialog()
									}
								});
								return false
							}
						})
	};
	this.showRegisterDialogOwok = function(e) {
		this.initCardEvents(e);
		var f = this;
		e = {};
		e.id = "yesno";
		e.title = "";
		e.data = {};
		modalDialog.showRegisterDialog();
		$("#registerDialogFormRegister").click(function() {
			$("#registrationDialogForm").submit()
		});
		$("#registerDialogFormCancel").click(function() {
			modalDialog.hide()
		});
		$("#reg_password_dialog").keyup(function() {
			account.getPasswordStrength(this, $("#registerDialogStrength"))
		});
		$("#registrationDialogForm")
				.validate(
						{
							rules : {
								password : {
									required : true,
									minlength : 6
								},
								password_rep : {
									required : true,
									minlength : 6,
									equalTo : "#reg_password_dialog"
								},
								username_rep : {
									equalTo : "#email_dialog"
								}
							},
							messages : {
								password : this.messagePassword,
								password_rep : this.messagePasswordRepeat,
								username : this.messageUsername,
								username_rep : this.messageUsernameRepeat,
								agb_confirmed : this.messageAgbConfirmed
							},
							submitHandler : function(l) {
								var m = OWOKPlugin.getCardVersion(), p = OWOKPlugin
										.getCardId(), v = OWOKPlugin
										.getAKeyPup();
								if (p == "")
									return false;
								$("#form_cardData").remove();
								$(l).append(
										'<input id="form_cardData" type="hidden" name="cardId" value="'
												+ m + " 12 08 " + p + " " + v
												+ '" />');
								$(l)
										.append(
												'<input id="reg_smartcard" type="hidden" name="regPathSmartcard" value="1" />');
								$(l).serialize();
								$.ajax({
									type : "POST",
									data : $(l).serialize(),
									url : "/api/accounts/owok/create/",
									dataType : "json",
									async : false,
									success : function() {
										f.showRegisterSuccessDialog()
									},
									error : function() {
										f.showRegisterSuccessDialog()
									}
								});
								return false
							}
						})
	};
	this.showRegisterDialogEid = function() {
		var e = this, f = {};
		f.id = "yesno";
		f.title = "";
		f.data = {};
		modalDialog.showRegisterDialog();
		$("#registerDialogFormRegister").click(function() {
			$("#registrationDialogForm").submit()
		});
		$("#registerDialogFormCancel").click(function() {
			modalDialog.hide()
		});
		$("#reg_password_dialog").keyup(function() {
			account.getPasswordStrength(this, $("#registerDialogStrength"))
		});
		$("#registrationDialogForm").validate({
			rules : {
				password : {
					required : true,
					minlength : 6
				},
				password_rep : {
					required : true,
					minlength : 6,
					equalTo : "#reg_password_dialog"
				},
				username_rep : {
					equalTo : "#email_dialog"
				}
			},
			messages : {
				password : this.messagePassword,
				password_rep : this.messagePasswordRepeat,
				username : this.messageUsername,
				username_rep : this.messageUsernameRepeat,
				agb_confirmed : this.messageAgbConfirmed
			},
			submitHandler : function(l) {
				$(l).serialize();
				$.ajax({
					type : "POST",
					data : $(l).serialize(),
					url : "/api/eid/create/",
					dataType : "json",
					async : false,
					success : function() {
						e.showRegisterSuccessDialog()
					},
					error : function() {
						e.showRegisterSuccessDialog()
					}
				});
				return false
			}
		})
	};
	this.changePassword = function(e) {
		var f = this;
		(new AccountsApi).changePassword(e, f.onChangePasswordSuccess,
				f.onChangePasswordError)
	};
	this.showChangePasswordOwok = function() {
		var e = this, f = this.createDefaultDialog(allyve.i18n
				.titleChangePassword(), allyve.mandant.changePassword(),
				'$("#changePasswordForm").submit();');
		f.data.closeFunction = function() {
			e.closeChangePassword()
		};
		modalDialog.show(f, 2);
		var l = function() {
		};
		this.changePassword_lightCardInserted = function() {
			$("#changePasswordForm_giveCard").hide();
			$("#changePasswordForm_watchReader").hide();
			$("#changePasswordForm_pin").attr("value", "");
			$("#changePasswordForm_lightPin").show();
			l = function() {
				OWOKPlugin
						.prepareLoginLight($("#changePasswordForm_pin").val())
			}
		};
		this.changePassword_owokCardInserted = function() {
			$("#changePasswordForm_giveCard").hide();
			$("#changePasswordForm_lightPin").hide();
			$("#changePasswordForm_watchReader").show();
			$("#changePasswordForm_pin").attr("value", "000000");
			l = function() {
				OWOKPlugin.prepareLoginOwokCard(0)
			}
		};
		this.changePassword_cardRemoved = function() {
			$("#changePasswordForm_watchReader").hide();
			$("#changePasswordForm_lightPin").hide();
			$("#changePasswordForm_giveCard").show();
			l = function() {
			}
		};
		if (OWOKPlugin.getCardId() != "")
			this.changePassword_owokCardInserted();
		else
			OWOKPlugin.getLightCardId() != ""
					&& this.changePassword_lightCardInserted();
		$(OWOKPlugin).bind("owokLightCardWasInserted",
				this.changePassword_lightCardInserted);
		$(OWOKPlugin).bind("owokSmartcardWasInserted",
				this.changePassword_owokCardInserted);
		$(OWOKPlugin).bind("owokCardWasRemoved",
				this.changePassword_cardRemoved);
		$("#changePasswordForm").validate({
			rules : {
				password : {
					minlength : 6
				},
				password_rep : {
					equalTo : "#changePasswordForm_password"
				},
				pin : {
					required : true,
					rangelength : [ 6, 6 ],
					number : true,
					owokLightCardAvailable : true
				}
			},
			messages : {
				password : this.messagePassword,
				password_rep : this.messagePasswordRepeat,
				pin : d
			},
			submitHandler : function() {
				$(document).unbind("meincockpit.prepareLightLogin");
				$(document).unbind("meincockpit.prepareOwokCardLogin");
				$(document).bind("meincockpit.prepareLightLogin", {
					formData : $("#changePasswordForm").serialize()
				}, function(m, p, v, y) {
					account.submitPasswordChangeLight(m, p, v, y)
				});
				$(document).bind("meincockpit.prepareOwokCardLogin", {
					formData : $("#changePasswordForm").serialize()
				}, function(m, p, v) {
					account.submitPasswordChangeOwok(m, p, v)
				});
				l();
				return false
			}
		})
	};
	this.closeChangePassword = function() {
		$(OWOKPlugin).unbind("owokLightCardWasInserted",
				this.changePassword_lightCardInserted);
		$(OWOKPlugin).unbind("owokSmartcardWasInserted",
				this.changePassword_owokCardInserted);
		$(OWOKPlugin).unbind("owokCardWasRemoved",
				this.changePassword_cardRemoved)
	};
	this.submitPasswordChangeOwok = function(e, f, l) {
		$("#password_old_error").hide();
		$("#changePasswordError").hide();
		$.ajax({
			type : "POST",
			data : $("#changePasswordForm").serialize()
					+ "&param[owok_login_data]=" + f
					+ "&param[owok_nocard_logout]=" + l,
			url : this.urlChangePassword,
			dataType : "text",
			async : false,
			success : function() {
				modalDialog.showAlertBox(allyve.i18n.titleChangePassword(),
						allyve.i18n.changePasswordSuccess())
			},
			error : function(m) {
				if (m.responseText == "Please check your password.") {
					$("#password_old_error").text(allyve.i18n.checkPassword());
					$("#password_old_error").show()
				}
				403 == m.status && $("#changePasswordForm_pinError").show();
				$("#changePasswordError").show()
			}
		});
		return false
	};
	this.submitPasswordChangeLight = function(e, f, l) {
		$("#password_old_error").hide();
		$("#changePasswordError").hide();
		$.ajax({
			type : "POST",
			data : $("#changePasswordForm").serialize() + "&param[owok_sid]="
					+ f + "&param[owok_rsp_step_2]=" + l,
			url : this.urlChangePassword,
			dataType : "text",
			async : false,
			success : function() {
				modalDialog.showAlertBox(allyve.i18n.titleChangePassword(),
						allyve.i18n.changePasswordSuccess())
			},
			error : function(m) {
				if (m.responseText == "Please check your password.") {
					$("#password_old_error").text(allyve.i18n.checkPassword());
					$("#password_old_error").show()
				}
				403 == m.status && $("#changePasswordForm_pinError").show();
				$("#changePasswordError").show()
			}
		});
		return false
	};
	this.prepareOwokUnregister = function(e) {
		$(document).unbind("meincockpit.prepareLightLogin");
		$(document).bind("meincockpit.prepareLightLogin", {
			formData : {
				its : "magic"
			}
		}, function(f, l, m, p) {
			account.owokLightUnregister(f, l, m, p)
		});
		OWOKPlugin.prepareLoginLight(e);
		return false
	};
	this.owokLightUnregister = function(e, f, l) {
		$(document).unbind("meincockpit.prepareLightLogin");
		$.ajax({
			type : "POST",
			data : "param[owok_sid]=" + f + "&param[owok_rsp_step_2]=" + l,
			url : this.urlOwokUnregister,
			dataType : "text",
			async : false,
			success : function() {
				showAlertOk(allyve.mandant.deleteFromCardSuccess())
			},
			error : function() {
				showAlertOk(allyve.mandant.deleteFromCardFail(), allyve.i18n
						.titleError())
			}
		});
		return false
	};
	this.owokUnregister = function(e, f) {
		$(document).unbind("meincockpit.prepareLightLogin");
		$.ajax({
			type : "POST",
			data : "param[owok_login_data]=" + f,
			url : this.urlOwokUnregister,
			dataType : "text",
			async : false,
			success : function() {
				showAlertOk(allyve.mandant.deleteFromCardSuccess())
			},
			error : function() {
				showAlertOk(allyve.mandant.deleteFromCardSuccess(), allyve.i18n
						.titleError())
			}
		});
		return false
	};
	this.initCardEvents = function(e) {
		$(OWOKPlugin).unbind("owokCardWasRemoved", a.cardWasRemoved);
		$(OWOKPlugin).bind("owokCardWasRemoved", a.cardWasRemoved);
		OWOKPlugin.enableEvents();
		b = e
	};
	this.cardWasRemoved = function() {
		modalDialog.hide();
		if (typeof b == "function") {
			b();
			b = null
		}
	};
	this.registerDialogClosed = function() {
		OWOKPlugin.disableEvents();
		$(OWOKPlugin).unbind("owokCardWasRemoved", a.cardWasRemoved)
	}
}
Account.prototype = new AccountBase;
Account.constructor = Account;
var account = new Account;
function AuthBase() {
	var a = this, b = null, d = new AllyveEvents;
	this.messagePassword = {
		minlength : jQuery.format("Mindestens {0} Zeichen"),
		required : jQuery.format("Bitte ausf\u00fcllen.")
	};
	this.messageUsername = {
		required : jQuery.format("Bitte ausf\u00fcllen."),
		email : jQuery.format("Keine g\u00fcltige E-Mail-Adresse.")
	};
	$("#logout").click(function() {
		auth.logout();
		return false
	});
	this.setCallback = function(e) {
		b = e
	};
	this.check = function() {
		if (document.cookie
				&& document.cookie.indexOf("allyveRememberMe=") != -1) {
			var e = getCookie("allyveRememberMe");
			setCookie("ark", e, 8760);
			deleteCookie("allyveRememberMe")
		}
		var f = false;
		(new SettingsApi).getSettings(function() {
			f = true
		}, function() {
			f = false
		});
		if (f)
			if (b()) {
				this.hideLoginbox();
				a.raisePageRefreshedEvent(true);
				return
			}
		if (document)
			if (document.cookie && document.cookie.indexOf("ark=") != -1) {
				setCookie("ark", getCookie("ark"), 8760);
				this.loginWithRememberMeKey()
			} else
				this.showLoginbox()
	};
	this.onLoginError = function(e) {
		switch (e.status) {
		case 412:
			(new ActivationHintDialog).show();
			break;
		case 403:
			a.showLoginbox();
			break
		}
		$("#login_error_1").text("Login fehlgeschlagen");
		$("#login_error_1").show()
	};
	this.onLoginSuccess = function() {
		a.loginSuccess()
	};
	this.login = function() {
		var e = this;
		(new AuthApi).login($("#loginForm").serialize(), e.onLoginSuccess,
				e.onLoginError)
	};
	this.raiseAfterLoginEvent = function(e) {
		d.registerEvent("afterLoginSuccess");
		d.raiseEvent("afterLoginSuccess", e)
	};
	this.raisePageRefreshedEvent = function(e) {
		d.registerEvent("pageRefreshed");
		d.raiseEvent("pageRefreshed", e)
	};
	this.logout = function() {
		(new AuthApi).logout(a.onLogoutSuccess)
	};
	this.onLogoutSuccess = function() {
		window.location.reload()
	};
	this.loginWithRememberMeKey = function() {
		(new AuthApi).login("a=b", a.onLoginSuccess, a.onLoginError)
	};
	this.loginSuccess = function() {
		a.raiseAfterLoginEvent();
		this.hideLoginbox();
		typeof b == "function" && b()
	};
	this.showLoginbox = function() {
		var e = this;
		$("#loginForm").validate({
			messages : {
				password : this.messagePassword,
				username : this.messageUsername
			},
			submitHandler : function() {
				e.login()
			}
		});
		$("#actionbar").hide();
		$("#loginBox").show();
		$("#startseite").show();
		$("#slogan").show();
		$("#infoContainer").show();
		$("#logoScrollerContainer").show();
		$(".lp_teaser").show();
		$(".lp_teaser_a").show();
		bindStripeScrollButtons()
	};
	this.hideLoginbox = function() {
		$("#username").value = "";
		$("#password").value = "";
		$("#loginBox").hide();
		$("#slogan").hide();
		$("#actionbar").show();
		$("#startseite").hide();
		$("#infoContainer").hide();
		$("#logoScrollerContainer").hide();
		$(".lp_teaser").hide();
		$(".lp_teaser_a").hide()
	}
};
function Auth() {
	var a = this;
	this.onLoginError = function(b) {
		switch (b.status) {
		case 412:
			(new ActivationHintController).showDialog(b.responseText);
			break
		}
		$("#login_error_1").text("Login fehlgeschlagen");
		$("#login_error_1").show()
	};
	this.authWithOwokLight = function(b, d) {
		$.ajax({
			type : "POST",
			url : d,
			data : {
				methodName : "OsiLoginWithOwokLight",
				param : b
			},
			dataType : "json",
			error : function(e) {
				switch (e.status) {
				case 412:
					(new ActivationHintController).showDialog(e.responseText);
					break
				}
			},
			success : function(e) {
				if (e[0] == "ok")
					auth.loginSuccess();
				else {
					var f = parseInt(e[0]);
					if (typeof parseInt(e[0]) == "number")
						if (f > -2008 && f < -2000)
							showAlertAbbrechenWeiter(allyve.mandant
									.msgWrongPin({
										pinTriesLeft : f * -1 - 2E3
									}), allyve.i18n.titleHint(), function() {
								$(this).dialog("close")
							}, function() {
								(new OwokStatusCheck).prepareLogin()
							});
						else
							f == -2000 && console.log("gesperrt")
				}
			}
		})
	};
	this.authWithOwok = function(b, d) {
		$(OWOKPlugin).unbind("owokWrongPin", a.owokWrongPin);
		$("div#simpleDialog.ui-dialog-content").dialog("close");
		$.ajax({
			type : "POST",
			url : d,
			data : {
				methodName : "OsiLoginWithOwok",
				param : b
			},
			dataType : "json",
			error : function(e) {
				switch (e.status) {
				case 412:
					e.responseText == "NO_USER_FOUND" ? account
							.showRegisterDialogOwok()
							: (new ActivationHintController)
									.showDialog(e.responseText);
					break
				}
			},
			success : function(e) {
				e[0] == "ok" ? auth.loginSuccess() : location.reload(true)
			}
		})
	};
	this.initAuthWithOwok = function() {
		a.bindCardEvents();
		var b = OWOKPlugin.getPinTriesLeft();
		if (b < 10)
			showAlertOk(allyve.mandant.msgPinWrongLastTime({
				pinTriesLeft : b
			}), allyve.i18n.titleHint(), function() {
				$(this).dialog("close");
				showAlertOk(allyve.mandant.watchCardReader(), allyve.i18n
						.titleHint(), function() {
					$(this).dialog("close")
				});
				OWOKPlugin.loginOwokCard(OwokConfig.AutoLogout)
			});
		else {
			showAlertOk(allyve.mandant.watchCardReader(), allyve.i18n
					.titleHint(), function() {
				$(this).dialog("close")
			});
			OWOKPlugin.loginOwokCard(OwokConfig.AutoLogout)
		}
	};
	this.owokWrongPin = function(b, d, e) {
		a.unbindCardEvents();
		showAlertAbbrechenWeiter(allyve.mandant.msgWrongPin({
			pinTriesLeft : e
		}), allyve.i18n.titleHint(), function() {
			$(this).dialog("close")
		}, function() {
			(new OwokStatusCheck).prepareLogin()
		})
	};
	this.owokPinEntryCanceled = function() {
		a.unbindCardEvents();
		$("div#simpleDialog.ui-dialog-content").dialog("close");
		showAlertAbbrechenWeiter(allyve.mandant.owokPinEntryCanceled(),
				allyve.i18n.titleHint(), function() {
					$(this).dialog("close")
				}, function() {
					(new OwokStatusCheck).prepareLogin()
				})
	};
	this.unbindCardEvents = function() {
		$(OWOKPlugin).unbind("owokWrongPin", a.owokWrongPin);
		$(OWOKPlugin).unbind("owokPinEntryCanceled", a.owokPinEntryCanceled)
	};
	this.bindCardEvents = function() {
		a.unbindCardEvents();
		$(OWOKPlugin).bind("owokWrongPin", a.owokWrongPin);
		$(OWOKPlugin).bind("owokPinEntryCanceled", a.owokPinEntryCanceled)
	}
}
Auth.prototype = new AuthBase;
Auth.constructor = Auth;
function Widgetinfos() {
	var a = this;
	this.widgetInfos = null;
	this.getInfos = function(b) {
		this.check();
		for ( var d = 0; d < this.widgetInfos.length; d++) {
			var e = this.widgetInfos[d];
			if (e.properties.id == b)
				return e
		}
		c.l("no widget infos for #" + b);
		return null
	};
	this.getWidgetinfoByNumber = function(b) {
		this.check();
		return this.widgetInfos[b]
	};
	this.getWidgetinfoByWidgetId = function(b) {
		this.check();
		return this.getInfos(b)
	};
	this.numberOfWidgetsInWidgetinfos = function() {
		this.check();
		return this.widgetInfos.length
	};
	this.getDescription = function(b) {
		this.check();
		return this.getInfos(b).properties.description
	};
	this.getWidgetName = function(b) {
		this.check();
		return this.getInfos(b).properties.name
	};
	this.getKeyword = function(b) {
		this.check();
		return this.getInfos(b).properties.description
	};
	this.check = function() {
		if (!this.widgetInfos) {
			var b = this;
			if (typeof static_widget_info != "undefined") {
				var d = [];
				$.each(static_widget_info.widget, function(e, f) {
					e = new Widgetinfo(f);
					d.push(e)
				});
				b.widgetInfos = d
			} else
				(new WidgetsInfosApi).getInfos(this.onGetInfosSuccess,
						this.onGetInfosError)
		}
	};
	this.onGetInfosSuccess = function(b) {
		b.widget.sort(a.compareWidgetInfoDescription);
		var d = [];
		$.each(b.widget, function(e, f) {
			e = new Widgetinfo(f);
			d.push(e)
		});
		a.widgetInfos = d
	};
	this.onGetInfosError = function(b, d) {
		c.l("could not get widget infos: " + d)
	};
	this.compareWidgetInfoDescription = function(b, d) {
		b = b.description ? b.description.toLowerCase() : "";
		d = d.description ? d.description.toLowerCase() : "";
		return b > d ? 1 : b < d ? -1 : 0
	}
};
function Widgetinfo(a) {
	this.mappedView = null;
	this.properties = {};
	this.getData = function() {
		return a
	};
	this.getId = function() {
		return a.id
	};
	this.getDescription = function() {
		return a.description
	};
	this.getKeywords = function() {
		return a.description.toLowerCase()
	};
	this.getIconName = function() {
		return a.icon ? a.icon.value : null
	};
	this.getIconNamePlain = function() {
		return a.icon ? a.icon.value.substr(0, a.icon.value.indexOf("."))
				: null
	};
	this.getIconOffset = function() {
		return a.icon ? a.icon.offset : 0
	};
	this.getName = function() {
		return a.name
	};
	this.getTyp = function() {
		return a.typ
	};
	this.getView = function() {
		return a.view == null ? null : a.view.content
	};
	this.isConfigurable = function() {
		if (a.configurable == 1)
			return true;
		return false
	};
	this.needsToBeConfigured = function() {
		if (a.typ == 3 || a.typ == 902 || a.id == 10074)
			return false;
		return true
	};
	this.getIcon = function() {
		var e = document.createElement("div");
		e.id = "widget_icon_" + this.getId();
		e.className = "catalog_icon icon_" + this.getIconNamePlain();
		e.style.backgroundPosition = -this.getIconOffset() + "px 0";
		return e
	};
	this.isInCategory = function(e) {
		if (a.categories)
			for ( var f = 0; f < a.categories.category.length; f++) {
				var l = a.categories.category[f];
				if (l.mainView == 1 && l.id == e)
					return true
			}
		return false
	};
	this.getSettingForKey = function(e) {
		if (!this.mappedView)
			if (a.view) {
				var f = a.view.content;
				this.mappedView = {};
				for (line in f) {
					var l = f[line].value.id, m = f[line].value;
					if (m)
						this.mappedView[l] = m
				}
			} else
				return;
		return this.mappedView[e]
	};
	this.getValueFromObject = function(e) {
		if (!e)
			return null;
		return e.content
	};
	this.isShowLoginHint = function() {
		return (a.features & 2) == 0 && a.features > 0 && a.typ != 3
				&& a.typ != 4
	};
	this.getSearchView = function() {
		return this.getSubpartView("search")
	};
	this.getStatusView = function() {
		return this.getSubpartView("status")
	};
	this.getSubpartView = function(e) {
		var f = this.getView();
		if (f)
			for ( var l in f) {
				var m = f[l];
				if (m.value)
					if (e == m.value.type)
						return m.value
			}
	};
	this.properties.id = this.getId();
	this.properties.isConfigurable = this.isConfigurable();
	this.properties.description = this.getDescription();
	var b = this.getValueFromObject(this.getSettingForKey("dfLabel"));
	if (b) {
		var d = {};
		d.label = b;
		d.field = this.getValueFromObject(this.getSettingForKey("dfField"));
		d.method = this.getValueFromObject(this.getSettingForKey("dfMethod"));
		this.properties.df = d
	}
	for (b = 0; b < 10; b++)
		if (d = this.getSettingForKey("c" + b)) {
			if (!this.properties.clabels)
				this.properties.clabels = [];
			this.properties.clabels.push(d)
		} else
			break;
	if (this.getData().configTeaser)
		this.properties.configTeaser = this.getData().configTeaser;
	this.properties.icon = this.getIcon();
	this.properties.iconName = this.getIconName();
	this.properties.iconNamePlain = this.getIconNamePlain();
	this.properties.iconOffset = this.getIconOffset();
	this.properties.name = this.getName();
	this.properties.name_lc = this.properties.name.toLowerCase();
	this.properties.typ = this.getTyp();
	this.properties.isShowLoginHint = this.isShowLoginHint();
	this.properties.view = this.getView();
	this.properties.searchView = this.getSearchView();
	this.properties.searchView ? (this.properties.hasSearchView = true)
			: (this.properties.hasSearchView = false);
	this.properties.statusView = this.getStatusView();
	this.properties.statusView ? (this.properties.hasStatusView = true)
			: (this.properties.hasStatusView = false)
};
function WidgetSetup() {
	this.add = function(a, b) {
		b || (b = {});
		var d = oAllyve.widgetInfos.getWidgetinfoByWidgetId(a);
		this.isWidgetWithConfig(d) ? this.showWidgetConfig(a, b, d) : this
				.addWidgetWithoutConfig(a)
	};
	this.reconfig = function(a) {
		var b = {};
		b.wid = oAllyve.oWidgets.widgetData[a].widgetId;
		b.replaceId = a;
		b.valueMap = oAllyve.oWidgets.widgetData[a].valueMap;
		a = oAllyve.widgetInfos.getWidgetinfoByWidgetId(b.wid);
		this.showWidgetConfig(b.wid, b, a)
	};
	this.showWidgetConfig = function(a, b, d) {
		if (10071 == a)
			d.properties.stockBaskets = oAllyve.getWidgets().getStockBaskets();
		modalDialog.showConfigDialog(a, b, d)
	};
	this.addWidgetWithoutConfig = function(a) {
		var b = {};
		b.wid = a;
		if (105 == a) {
			b.feed = 2201;
			b.rssstyle = 0
		} else if (10074 == a)
			b.location = "Campus";
		this.handleResult(this.save(b), a)
	};
	this.isWidgetWithConfig = function(a) {
		return a.needsToBeConfigured() && a.isConfigurable() ? true : false
	};
	this.alterWidgetConfigFacebook = function() {
		$("#modal_dialog_buttons_ok").hide();
		$("#fb_start").show()
	};
	this.setup = function(a) {
		var b = null, d = this.getConfigValues();
		switch (Number(a)) {
		case 10040:
			this.setupHiogi(d);
			break;
		case 8:
			this.setupXing(1, d);
			break;
		case 67:
			this.setupEbaybuyer(1, d);
			break;
		case 10021:
		case 19:
			this.setupOAuth(d);
			break;
		default:
			b = this.save(d);
			this.handleResult(b, d)
		}
	};
	this.getConfigValues = function() {
		var a = {};
		$("input", "#modalDialog").each(function() {
			var b = $(this).context;
			switch (b.type) {
			case "checkbox":
			case "radio":
				if (b.checked)
					a[b.name] = b.value;
				break;
			default:
				a[b.name] = b.value;
				break
			}
		});
		$("select", "#modalDialog").each(function() {
			var b = $(this).context;
			a[b.name] = b.value
		});
		$("textarea", "#modalDialog").each(function() {
			var b = $(this).context;
			a[b.name] = b.value
		});
		return a
	};
	this.save = function(a, b) {
		var d = null, e = null;
		if (a.replaceId) {
			e = a.replaceId;
			delete a.replaceId
		}
		b || (b = "");
		(new WidgetsSetupApi).save(b, a, function(f) {
			d = f
		}, function() {
			c.l("API Fehler")
		});
		if (e)
			d.replaceId = e;
		d.widgetId = a.wid;
		return d
	};
	this.handleResult = function(a, b) {
		if (a.values && a.values[0] && a.values[0].name == "error") {
			this.remove(a.id);
			b.error = allyve.i18n.configWidget_badCred();
			if (a.replaceId)
				b.replaceId = a.replaceId;
			modalDialog.hide();
			this.add(b.wid, b);
			return false
		} else {
			modalDialog.hide();
			oAllyve.addWidget(a);
			return true
		}
	};
	this.remove = function(a) {
		var b = false;
		return b = (new WidgetsSetupApi).remove(a, false, this.onRemoveError)
	};
	this.onRemoveError = function() {
		modalDialog.showAlertBox(allyve.i18n.titleError(), allyve.i18n
				.widgetDeleteError())
	};
	this.setupEbaybuyer = function(a, b) {
		b || (b = {});
		if (a == 1) {
			b.uid = $("#config_uid").attr("value");
			b.secretId = $.md5("" + Math.floor(Math.random() * 1E5));
			var d = "https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&runame=Allyve-Allyve256-9f3f--ahzwa&sid="
					+ b.secretId;
			modalDialog.showWaitForEbaybuyerDialog(b);
			window.open(d)
		}
		if (a == 2) {
			b.wid = $("#modal_wid").attr("value");
			b.uid = $("#modal_uid").attr("value");
			b.secretId = $("#modal_secretid").attr("value");
			b.replaceId = $("#replaceId").attr("value");
			b.callId = 1;
			a = this.save(b);
			if (a.values[0].name == "error") {
				modalDialog.hide();
				this.remove(a.id);
				if (a.replaceId)
					b.replaceId = a.replaceId;
				this.add(67, b)
			} else {
				var e = Array();
				$.each(a.values, function(f, l) {
					e[l.name] = l.value
				});
				d = a.id;
				delete b;
				b = {};
				b.wid = $("#modal_wid").attr("value");
				b.uid = $("#modal_uid").attr("value");
				b.userToken = e.userToken;
				if (a.replaceId)
					b.replaceId = a.replaceId;
				a = this.save(b, d);
				if (a.values[0].name == "error") {
					modalDialog.hide();
					this.remove(a.id);
					this.add(67, b)
				} else {
					oAllyve.addWidget(a);
					modalDialog.hide()
				}
			}
		}
	};
	this.setupXing = function(a, b) {
		b || (b = {});
		if (a == 1) {
			b.callId = 0;
			a = this.save(b);
			var d = Array();
			$.each(a.values, function(e, f) {
				d[f.name] = f.value
			});
			a = a.id;
			$("#removeWidgetAfterIncompleteSetup").attr("uniqueId", a);
			a = "https://www.xing.com/xws/oauth/authorize?oauth_token="
					+ d.oauth_token
					+ "&oauth_callback=https%3A%2F%2Fwww.allyve.com%2Fcallback.html%3FcallId%3D"
					+ d.callId
					+ "%26unique%3D"
					+ a
					+ "%26token%3D"
					+ d.oauth_token
					+ "%26provider%3Dxing&oauth_signature_method=PLAINTEXT&oauth_signature=ignored&oauth_timestamp="
					+ (new Date).getTime() + "&oauth_nonce=" + d.callId;
			window.open(a)
		}
	};
	this.finishXing = function(a) {
		var b = Array();
		$.each(a.values, function(e, f) {
			b[f.name] = f.value
		});
		a = a.id;
		var d;
		(new WidgetsSetupApi).save(a, "user_id=" + b.user_id
				+ "&wid=8&&oauth_token=" + b.oauth_token, function(e) {
			d = e
		}, function() {
			alert("failed")
		});
		$("#removeWidgetAfterIncompleteSetup").attr("uniqueId", "0");
		oAllyve.addWidget(d);
		modalDialog.hide()
	};
	this.setupOAuth = function(a) {
		a || (a = {});
		var b = null;
		if (a.replaceId)
			b = a.replaceId;
		a.callId = 1;
		a = this.save(a);
		if (b)
			a.replaceId = b;
		var d = Array();
		$.each(a.values, function(e, f) {
			d[f.name] = f.value
		});
		b = a.id;
		$("#removeWidgetAfterIncompleteSetup").attr("uniqueId", b);
		window.open(d.requrl, "authwindow",
				"menubar=0,resizable=1,width=1000,height=600,scrollbars=yes")
	};
	this.finishOauth = function(a) {
		$("#removeWidgetAfterIncompleteSetup").attr("uniqueId", "0");
		a.replaceId && delete configValues.replaceId;
		oAllyve.addWidget(a);
		modalDialog.hide()
	};
	this.setupHiogi = function() {
		var a = $.md5("" + Math.floor(Math.random() * 1E5));
		window
				.open("http://www.hiogi.de/applications/appLogin/?app_id=b17b35f58d5c669e32d5&request_id="
						+ a)
	};
	this.finishSetupHiogi = function(a) {
		$("#removeWidgetAfterIncompleteSetup").attr("uniqueId", "0");
		oAllyve.addWidget(a);
		modalDialog.hide()
	}
};
function getCatalogCategories() {
	var a = {};
	a[1] = "E-Mail";
	a[4] = "Soziale Netzwerke";
	a[3] = "Bonusprogramme";
	a[2] = "Flirtportale";
	a[8] = "Shopping";
	a[101] = "Tools";
	a.stdCategory = "category_1";
	return a
};
function Catalog(a) {
	function b() {
		$("#catalog_content").jScrollPane({
			hideFocus : true
		})
	}
	var d = this;
	this.lastFound = this.found = 0;
	this.isRendered = false;
	this.infoservice = a;
	this.widgetinfos = this.infoservice.widgetInfos;
	$("#catalog_launcher").show();
	$("#catalog_close_button").click(function() {
		$("#catalog").dialog("close")
	});
	d = this;
	$(document).keydown(function(e) {
		if (e.which == 17)
			isCtrl = true;
		if (e.which == 16)
			isShift = true;
		if (e.which == 75 && isShift && isCtrl) {
			$("#catalog_launcher .modalInput").click();
			return false
		}
	});
	$("#catalog_search_input_field").click(function(e) {
		$("#catalog_search_input_field").select()
	});
	$("#catalog_search_input_field").keyup(function(e) {
		catalog.searchKeyword($("#catalog_search_input_field").attr("value"));
		catalog.checkEnterWidgetSearch(e)
	});
	this.render = function() {
		var e = this;
		if (this.isRendered)
			this.searchKeyword("");
		else {
			var f = this.getCategories();
			$.each(f,
					function(l, m) {
						var p = document.createElement("div");
						p.id = "category_" + l;
						p.className = "catalog_category";
						p.onclick = function() {
							catalog.showCategory(this.id);
							b()
						};
						p.innerHTML = m;
						$("#catalog_content").append(p);
						for (p = m = 0; p < e.infoservice
								.numberOfWidgetsInWidgetinfos(); p++) {
							var v = e.infoservice.getWidgetinfoByNumber(p);
							if (v.isInCategory(l)) {
								m++;
								var y = document.createElement("div");
								y.id = "widget_" + l + "_" + v.getId();
								y.setAttribute("wid", v.getId());
								y.setAttribute("keywords", v.getKeywords());
								y.setAttribute("category", "category_" + l);
								y.className = "catalog_icon_container";
								y.onclick = function() {
									catalog.addWidget(this.getAttribute("wid"))
								};
								$("#catalog_content").append(y);
								$("#widget_" + l + "_" + v.getId()).append(
										v.getIcon());
								y = document.createElement("div");
								y.id = "widget_caption_" + v.getId();
								y.className = "catalog_icon_caption";
								y.innerHTML = v.getDescription();
								$("#widget_" + l + "_" + v.getId()).append(y)
							}
						}
						if (m > 0) {
							l = document.createElement("div");
							l.style.clear = "both";
							$("#catalog_content").append(l)
						} else
							$("#category_" + l).remove()
					});
			this.isRendered = true
		}
	};
	this.getCategories = function() {
		return getCatalogCategories()
	};
	this.searchKeyword = function(e) {
		e = e.toLowerCase();
		$(".catalog_icon_container:not([keywords*=" + e + "])").hide();
		e = $(".catalog_icon_container[keywords*=" + e + "]");
		e.show();
		this.found = e.length;
		if (1 == this.found) {
			$("#cat_search_info").text(allyve.i18n.catalogFoundOneAction());
			this.lastFound = e.attr("wid")
		} else
			$("#cat_search_info").text(allyve.i18n.labelCatalogSearch());
		b()
	};
	this.showCategory = function(e) {
		$(".catalog_icon_container:not([category=" + e + "])").hide();
		$(".catalog_icon_container[category=" + e + "]").show();
		this.found = 0
	};
	this.checkEnterWidgetSearch = function(e) {
		if ((document.layers ? e.which : e.keyCode) == 13)
			this.found == 1 && this.addWidget(this.lastFound);
		return false
	};
	this.addWidget = function(e) {
		var f = new WidgetSetup;
		$("#catalog").dialog("close");
		f.add(e)
	};
	this.showCatalog = function() {
		var e = 693;
		if ($(document).width() < e)
			e = $(document).width();
		catalog.render();
		$("#catalog").dialog({
			modal : true,
			width : e,
			dialogClass : "catalogDialog",
			open : function(f, l) {
				$("#catalog_search_input_field")[0].value = "";
				$("#catalog_search_input_field").focus()
			}
		});
		catalog.showCategory(this.getCategories().stdCategory);
		b()
	}
};
function SammelStatusViewBase() {
	var a = this, b, d;
	new AllyveEvents;
	this.init = function(e, f) {
		b = e;
		d = f
	};
	this.showMessages = function(e) {
		e = a.createMessage(e);
		a.showAlertBox(e)
	};
	this.createMessage = function(e) {
		if (b && d && e && e.value) {
			var f = "";
			$.each(e.value, function(l, m) {
				if (isNaN(m.name)) {
					if (m.name != "OK")
						return allyve.i18n.sammelStatusFatal()
				} else {
					l = m.value;
					m = d[m.name];
					var p = b.getWidgetinfoByWidgetId(m.getWidgetId())
							.getDescription();
					f += p + ": " + m.widgetTitle + " ... ";
					f += l == "ok" ? allyve.i18n.sammelStatusServiceOk()
							: allyve.i18n.sammelStatusServiceError();
					f += "<br />"
				}
			});
			return f
		} else
			return allyve.i18n.sammelStatusFatal()
	};
	this.showAlertBox = function(e) {
		(new ModalDialog).showAlertBox(allyve.i18n.sammelStatusUpdateHead(), e,
				"html")
	};
	this.sammelStatusSetUpdating = function(e) {
		if (e) {
			$("#sammelStatusSendButton").hide();
			$("#sammelStatusUpdating").show()
		} else {
			$("#sammelStatusSendButton").show();
			$("#sammelStatusUpdating").hide()
		}
	};
	this.getIconId = function(e) {
		return "#statusServiceIcon_" + e
	};
	this.setIconToActive = function(e) {
		var f = this.getIconId(e);
		$(f).css("background-position", -20 * e + "px 0px")
	};
	this.setIconToInActive = function(e) {
		var f = this.getIconId(e);
		$(f).css("background-position", -20 * e + "px -20px")
	};
	this.setIconToUnavailable = function(e) {
		var f = this.getIconId(e);
		$(f).css("background-position", -20 * e + "px -40px")
	};
	this.hide = function() {
		$("#statusUpdateBlock").hide()
	};
	this.unHide = function() {
		$("#statusUpdateBlock").show()
	};
	this.showHelpDialog = function() {
		var e = new ModalDialog, f = e.createDialogOk(allyve.portlet
				.getSammelStatusHelpTitle());
		f.data.html = allyve.portlet.renderSammelStatusHelp();
		e.showWithSize(f, 700, "auto", null, "sammelStatusHelpDialog")
	}
};
function SammelStatusView() {
}
SammelStatusView.prototype = new SammelStatusViewBase;
SammelStatusView.constructor = SammelStatusView;
function Renderer(a) {
	function b() {
		var r = function() {
			try {
				var z = new Date;
				$(".dynamicDate").val(d(z));
				$(".dynamicTime").val(e(z))
			} catch (n) {
			}
		};
		window.setTimeout(r, 2E3);
		window.setTimeout(r, 15E3);
		window.setInterval(r, 3E5)
	}
	function d(r) {
		return r.getDate() + "." + (r.getMonth() + 1) + "." + r.getFullYear()
	}
	function e(r) {
		var z = r.getMinutes();
		if (z < 10)
			z = "0" + z;
		return r.getHours() + ":" + z
	}
	function f(r) {
		v(r);
		y(r);
		A(r);
		M(r);
		D(r);
		s(r);
		u(r);
		B(r)
	}
	function l(r) {
		var z = allyve.i18n.msgStatusUpdateSuccess();
		$.each(r, function(n, G) {
			if (G[0].name == "ERROR")
				z = allyve.i18n.msgStatusUpdateFailed({
					errorMsg : G[0].value
				})
		});
		m(z)
	}
	function m(r) {
		modalDialog.showAlertBox(allyve.i18n.statusUpdate(), r)
	}
	function p(r) {
		m(allyve.i18n.msgStatusUpdateFailed({
			errorMsg : r
		}))
	}
	function v(r) {
		$("#twitter_form_" + r).submit(
				function() {
					(new ActionsApi).postTwitterStatus(r, $(
							"#twitter_form_" + r).serialize(), l, p);
					return false
				})
	}
	function y(r) {
		$("#myspace_update_form_" + r).submit(
				function() {
					(new ActionsApi).postMyspaceStatus(r, $(
							"#myspace_update_form_" + r).serialize(), l, p);
					return false
				})
	}
	function A(r) {
		$("#facebook_update_form_" + r).submit(
				function() {
					(new ActionsApi).postFacebookStatus(r, $(
							"#facebook_update_form_" + r).serialize(), l, p);
					return false
				})
	}
	function M(r) {
		$("#ebay_search_a_" + r)
				.mouseover(
						function() {
							var z = $("#ebay_search_" + r).val();
							$("#ebay_search_a_" + r)
									.attr(
											"href",
											"http://rover.ebay.com/rover/1/707-53477-19255-0/1?icep_ff3=9&pub=5574854054&toolid=10001&campid=5336390817&customid=&icep_uq="
													+ z
													+ "&icep_sellerId=&icep_ex_kw=&icep_sortBy=12&icep_catId=&icep_minPrice=&icep_maxPrice=&ipn=psmain&icep_vectorid=229487&kwid=902099&mtid=824&kw=lg")
						})
	}
	function D(r) {
		$("#widget_content_" + r + " input.searchInput")
				.click(
						function() {
							var z = $("#widget_content_" + r
									+ " input.searchInput").context.activeElement.defaultValue;
							if ($("#widget_content_" + r + " input.searchInput")
									.val() == z)
								$("#widget_content_" + r + " input.searchInput")
										.val("");
							else {
								$("#widget_content_" + r + " input.searchInput")
										.focus();
								$("#widget_content_" + r + " input.searchInput")
										.select()
							}
						})
	}
	function s(r) {
		$("#widget_" + r + " .widget_header_nologin").click(
				function() {
					modalDialog.showAlertBox(allyve.i18n.titleHint(),
							allyve.modaldialog.noLoginHint(), "html")
				})
	}
	function u(r) {
		$("#mensaSelector_" + r).change(function() {
			var z = $("#mensaSelector_" + r + " option:selected");
			oAllyve.selectMensaLocation(z.val(), r, 10074)
		})
	}
	function B(r) {
		$("#leoSelector_" + r).change(function() {
			var z = $("#leoSelector_" + r + " option:selected");
			oAllyve.selectLeoLanguage(z.val(), r, 10080)
		})
	}
	var F = this;
	this.widgetinfos = a;
	var g = null;
	F = this;
	b();
	this.renderSingle = function(r) {
		var z = this.widgetinfos.getWidgetinfoByWidgetId(r.getWidgetId());
		if (z) {
			$("#widget_container").append(allyve.mandant.renderWidget({
				widgetData : r,
				widgetInfo : z.properties
			}));
			f(r.uniqueId)
		}
	};
	this.updateSingle = function(r) {
		this.removeTooltips(r.getUniqueId());
		var z = this.widgetinfos.getWidgetinfoByWidgetId(r.getWidgetId());
		if (z) {
			$("#widget_" + r.getUniqueId()).replaceWith(
					allyve.mandant.renderWidget({
						widgetData : r,
						widgetInfo : z.properties
					}));
			f(r.uniqueId)
		}
	};
	this.replaceSingle = function(r, z) {
		var n = this.widgetinfos.getWidgetinfoByWidgetId(z.getWidgetId());
		if (n) {
			$("#widget_" + r).replaceWith(allyve.mandant.renderWidget({
				widgetData : z,
				widgetInfo : n.properties
			}));
			f(z.uniqueId);
			this.attachScrollPanes()
		}
	};
	this.replaceRssContent = function(r) {
		var z = this.widgetinfos.getWidgetinfoByWidgetId(r.getWidgetId());
		if (z) {
			$("#rss-list-" + r.uniqueId).replaceWith(
					allyve.widgets.renderRssData({
						widgetData : r,
						widgetInfo : z.properties
					}));
			this.attachScrollPanes();
			this.applyToolTips(r.uniqueId)
		}
	};
	this.remove = function(r) {
		$("#widget_" + r).remove()
	};
	this.attachScrollPanes = function() {
		$(".rss-scroll-pane").jScrollPane({
			hideFocus : true
		});
		$(".scroll-pane").jScrollPane({
			hideFocus : true
		});
		$(".rss-scroll-pane-wide").jScrollPane({
			hideFocus : true
		})
	};
	this.applyUiTweaks = function() {
		this.attachScrollPanes();
		this.attachTabs();
		$(".ellipsis").ellipsis()
	};
	this.applyToolTips = function(r) {
		var z = "*[title]";
		if (r)
			z = "#widget_content_" + r + " *[title]";
		$(z).each(function() {
			var n = $(this);
			if (n.data)
				n.data("qtip") || n.qtip({
					style : {
						tip : true
					},
					position : {
						target : "mouse",
						adjust : {
							screen : true
						}
					},
					show : {
						delay : 600
					}
				})
		})
	};
	this.setTooltipText = function(r, z) {
		r = $(r);
		this.removeTooltip(r);
		r.qtip({
			content : z,
			style : {
				tip : true
			},
			position : {
				target : "mouse",
				adjust : {
					screen : true
				}
			}
		})
	};
	this.removeTooltips = function(r) {
		var z = this;
		$("#widget_content_" + r).find("*").each(function() {
			var n = $(this);
			z.removeTooltip(n)
		})
	};
	this.removeTooltip = function(r) {
		r.data && r.data("qtip") && r.qtip("destroy")
	};
	this.attachTabs = function() {
		$(".widgetTabs").tabs({
			select : function(r, z) {
				r = z.panel.id.split("_");
				z = -1;
				for ( var n in r)
					if (!isNaN(r[n])) {
						z = new Number(r[n]);
						break
					}
				$("#form_" + z + "_searchengine").val(r[r.length - 1])
			}
		})
	};
	this.setTvTabs = function(r) {
		var z = r.valueMap.feedUrl;
		if (z) {
			var n = -1;
			if (z.indexOf("tvjetzt.xml") > 0)
				n = 0;
			else if (z.indexOf("2015.xml") > 0)
				n = 1;
			else if (z.indexOf("2200.xml") > 0)
				n = 2;
			n >= 0 && $("#widget_" + r.uniqueId + " .widgetTabsTv").tabs({
				selected : n,
				select : function(G, I) {
					G = I.panel.id.split("_");
					oAllyve.setRssMultiFeed(G[2], G[1], 105)
				}
			})
		}
	};
	this.setWidgetDatas = function(r) {
		g = r
	};
	this.renderSammelStatusPortlet = function() {
		$("#statusUpdateBlock").html(allyve.portlet.showMultiStatusUpdate())
	};
	this.attachSammelStatusClickHandler = function(r) {
		$("#sammelStatusSendButton").click(function() {
			var z = new MultiStatusUpdate;
			z.init(r);
			z.postStatus($("#sammelStatusMsg").val())
		});
		$("#serviceIcons div").each(function() {
			$(this).unbind();
			$(this).bind("click", function() {
				var z = $(this).get(0).id;
				z = Number(z.substring(18));
				var n = new AllyveEvents;
				n.raiseEvent(n.MULTI_STATUS_CHANGE, {
					serviceId : z
				})
			})
		});
		$("#sammelStatusHelpButton").click(function() {
			(new SammelStatusView).showHelpDialog()
		})
	}
};
function ModalDialog() {
	this.showConfigDialog = function(a, b, d) {
		var e = {};
		e.id = "config";
		e.title = d.getDescription();
		e.data = b;
		e.data.wait = true;
		e.data.hasOwnButtons = false;
		try {
			$("#modalDialog_content").html(allyve.mandant.renderConfigDlg({
				widgetInfo : d.properties,
				dialog : e
			}));
			$("#modalDialog")
					.dialog(
							{
								close : function() {
									Number($(
											"#removeWidgetAfterIncompleteSetup")
											.attr("uniqueId")) > 0
											&& widgetsetup
													.remove($(
															"#removeWidgetAfterIncompleteSetup")
															.attr("uniqueId"));
									if (window.location.pathname != "/"
											&& window.location.pathname != "/index_npa.html"
											|| window.location.href
													.indexOf("?") >= 0)
										window.location = "/"
								},
								modal : true,
								height : "auto",
								width : 730,
								position : "center",
								dialogClass : "allyveModal"
							});
			$("#modal_dialog_buttons_yes").click(function() {
				modalDialog.wait();
				widgetsetup.setup(a)
			});
			$("#widgetConfigInputs").keypress(function(l) {
				13 == l.keyCode && $("#modal_dialog_buttons_yes").click()
			});
			$(".modal_dialog_input_first").focus()
		} catch (f) {
			c.l(f);
			modalDialog
					.showAlertBox(
							"Konfiguration nicht m\u00f6glich",
							"Dieses Widget kann aktuell nicht konfiguriert werden. Wir bem\u00fchen uns, dies schnellstm\u00f6glich zu \u00e4ndern")
		}
	};
	this.showWaitForEbaybuyerDialog = function(a) {
		var b = {};
		b.id = "ok";
		b.title = "Best\u00e4tigung";
		b.data = {};
		b.data.caption = "Hast Du Die Erlaubins erteilt?";
		b.data.text = "";
		b.data.hiddenfields = [];
		b.data.hiddenfields[0] = {};
		b.data.hiddenfields[0].id = "modal_wid";
		b.data.hiddenfields[0].value = a.wid;
		b.data.hiddenfields[1] = {};
		b.data.hiddenfields[1].id = "modal_uid";
		b.data.hiddenfields[1].value = a.uid;
		b.data.hiddenfields[2] = {};
		b.data.hiddenfields[2].id = "modal_secretid";
		b.data.hiddenfields[2].value = a.secretId;
		if (a.replaceId) {
			b.data.hiddenfields[3] = {};
			b.data.hiddenfields[3].id = "replaceId";
			b.data.hiddenfields[3].value = a.replaceId
		}
		b.data.okFunction = "widgetsetup.setupEbaybuyer(2)";
		b.data.wait = true;
		b.data.close = false;
		this.show(b)
	};
	this.showStaticContentOk = function(a, b, d) {
		b = this.createDialogOk(b);
		b.data.staticFile = a;
		a = $(window).width() * 0.7;
		var e = $(window).height() * 0.7;
		b.width = a;
		b.height = e;
		this.showWithSize(b, a, e, null, d)
	};
	this.showStaticContent = function(a, b, d, e) {
		b = this.createDialogOk(b);
		b.data.staticFile = a;
		a = $(window).width() * 0.7;
		b.width = a;
		b.height = e;
		this.showWithSize(b, a, e, null, d)
	};
	this.showAlertBox = function(a, b, d, e) {
		a = this.createDialogOk(a);
		if (d && d == "html")
			a.data.html = b;
		else
			a.data.text = b;
		if (e)
			a.data.okFunction = e;
		this.showWithSize(a, 400, "auto")
	};
	this.createDialogOk = function(a) {
		return this.createDialog("ok", a)
	};
	this.createDialog = function(a, b) {
		var d = {};
		d.id = a;
		d.title = b;
		d.data = {};
		d.data.close = true;
		return d
	};
	this.show = function(a, b, d) {
		this.showWithSize(a, 400, "auto", b, d)
	};
	this.showRegisterDialog = function() {
		$("#modalDialog_content").html(allyve.config.registerUser());
		$("#modalDialog").dialog(
				{
					close : function() {
						typeof account.registerDialogClosed == "function"
								&& account.registerDialogClosed();
						if (window.location.pathname != "/"
								|| window.location.href.indexOf("?") >= 0)
							window.location = "/"
					},
					modal : true,
					height : "auto",
					width : 674,
					position : "center",
					dialogClass : "registerDlgModal"
				})
	};
	this.showWithSize = function(a, b, d, e, f) {
		if (typeof f == "undefined")
			f = "allyveModal";
		$("#modalDialog_content").html(allyve.modaldialog.renderDialog({
			dialog : a,
			type : e
		}));
		$("#modalDialog").dialog(
				{
					close : function() {
						typeof a.data.closeFunction == "function"
								&& a.data.closeFunction()
					},
					modal : true,
					width : b,
					height : d,
					position : "center",
					dialogClass : f
				})
	};
	this.showWithMaxSize = function(a, b, d) {
		if (typeof d == "undefined")
			d = "allyveModal";
		$("#modalDialog_content").html(allyve.modaldialog.renderDialog({
			dialog : a
		}));
		$("#modalDialog").dialog(
				{
					close : function() {
						typeof a.data.closeFunction == "function"
								&& a.data.closeFunction()
					},
					modal : true,
					maxWidth : b,
					position : "center",
					dialogClass : d
				})
	};
	this.showTemplate = function(a, b) {
		$("#modalDialog_content").html(a);
		$("#modalDialog").dialog(
				{
					close : function() {
						if (window.location.pathname != "/"
								|| window.location.href.indexOf("?") >= 0)
							window.location = "/"
					},
					modal : true,
					height : "auto",
					position : "center",
					width : b,
					dialogClass : "allyveModal"
				})
	};
	this.wait = function() {
		$(".modal_dialog_buttons").hide();
		$(".modal_dialog_wait").show()
	};
	this.unwait = function() {
		$(".modal_dialog_wait").hide();
		$(".modal_dialog_buttons").show()
	};
	this.finished = function(a) {
		closebutton = "<div>"
				+ a
				+ '</div><div class="modal_dialog_actionbar" ><div class="button" onclick="modalDialog.hide()">ok</div>';
		$("#modalDialog_content").html(closebutton)
	};
	this.hide = function() {
		$("#modalDialog").dialog("close")
	}
}
var modalDialog = new ModalDialog;
function SimpleDialog() {
	var a = this;
	this.width = 870;
	this.folder = "/static/";
	this.position = "center";
	this.dialogClass = "simpleDialog simpleDialogAlignTop";
	this.historyList = [];
	this.show = function(b) {
		this.loadContent(b);
		this.addToHistory(b);
		this.renderDialog();
		this.bindLinks()
	};
	this.loadContent = function(b) {
		$("#simpleDialogContent").load(
				this.folder + b + ".html?_=" + ALLYVE_VERSION)
	};
	this.showTemplate = function(b) {
		$("#simpleDialogContent").html(b);
		this.renderDialog()
	};
	this.renderDialog = function() {
		var b = this;
		$(".ui-widget-overlay").height(0);
		$("#simpleDialog").dialog({
			modal : true,
			position : this.position,
			width : this.width,
			buttons : this.loadButtons(),
			dialogClass : this.dialogClass,
			close : function(d, e) {
				b.onClose(d, e)
			},
			open : function(d, e) {
				b.onOpen(d, e)
			},
			focus : function(d, e) {
				b.onFocus(d, e)
			}
		});
		window.setTimeout(function() {
			a.adjustOverlaySize()
		}, 100)
	};
	this.adjustOverlaySize = function() {
		$(document).height() > $(".ui-widget-overlay").height()
				&& $(".ui-widget-overlay").height($(document).height())
	};
	this.addToHistory = function(b) {
		if (this.historyList.length < 1)
			this.historyList.push(b);
		else
			this.historyList[this.historyList.length - 1] != b
					&& this.historyList.push(b)
	};
	this.removeLastFromHistory = function() {
		this.historyList.pop()
	};
	this.getPreviousFromHistory = function() {
		return this.historyList.length < 2 ? ""
				: this.historyList[this.historyList.length - 2]
	};
	this.clearHistory = function() {
		this.historyList = []
	};
	this.goBack = function() {
		var b = this.getPreviousFromHistory();
		if ("" != b) {
			this.removeLastFromHistory();
			this.show(b)
		}
	};
	this.loadButtonsOk = function() {
		return {
			Ok : function() {
				$(this).dialog("close")
			}
		}
	};
	this.loadButtonsOkBack = function() {
		return {
			Ok : function() {
				$(this).dialog("close")
			},
			"Zur\u00fcck" : function() {
				simpleDialog.goBack()
			}
		}
	};
	this.loadButtons = function() {
		return this.historyList.length < 2 ? a.loadButtonsOk() : a
				.loadButtonsOkBack()
	};
	this.setWidth = function(b) {
		this.width = b
	};
	this.setPosition = function(b) {
		this.position = b
	};
	this.setDialogClass = function(b) {
		this.dialogClass = b
	};
	this.onOpen = function() {
	};
	this.onFocus = function() {
	};
	this.onClose = function() {
		a.clearHistory()
	};
	this.bindLinks = function() {
		$("#simpleDialog").unbind("click");
		$("#simpleDialog").bind("click", function(b) {
			b = b.target.id;
			if (a.isChildLink(b)) {
				b = b.match(/(.*)_link/);
				a.show(b[1]);
				return false
			}
			if (a.isFunctionLink(b)) {
				b = b.match(/(.*)_internal/);
				$(this).dialog("close");
				window[b[1]]();
				return false
			}
		})
	};
	this.isChildLink = function(b) {
		if (!b)
			return false;
		if (b.indexOf("_link") > 0)
			return true;
		return false
	};
	this.isFunctionLink = function(b) {
		if (!b)
			return false;
		if (b.indexOf("_internal") > 0)
			return true;
		return false
	};
	this.close = function() {
		$("#simpleDialog").dialog("close")
	}
}
var simpleDialog = new SimpleDialog;
function AlertDialogBase() {
	this.dialogClass = "simpleDialog";
	this.buttons = {
		Ja : function() {
			$(this).dialog("close")
		},
		Nein : function() {
			$(this).dialog("close")
		}
	};
	this.dialogTypes = {
		TYPE_OK : {
			OK : function() {
				$(this).dialog("close")
			}
		},
		TYPE_YES_NO : {
			Ja : function() {
				$(this).dialog("close")
			},
			Nein : function() {
				$(this).dialog("close")
			}
		}
	};
	this.sizes = {
		TYP_1 : 270,
		TYP_2 : 430,
		TYP_3 : 730
	};
	this.setButtons = function(a) {
		this.buttons = a
	};
	this.show = function(a, b) {
		var d = this;
		b = !b ? this.sizes.TYP_2 : b;
		$("#simpleDialogContent").html(a);
		$("#simpleDialog").dialog({
			modal : true,
			buttons : d.buttons,
			dialogClass : d.dialogClass,
			width : b,
			position : "center",
			height : "auto"
		})
	};
	this.close = function() {
		$("#" + this.dialogClass).dialog("close")
	}
}
AlertDialogBase.prototype = new SimpleDialog;
AlertDialogBase.constructor = AlertDialogBase;
function AlertDialog() {
}
AlertDialog.prototype = new AlertDialogBase;
AlertDialog.constructor = AlertDialog;
function PinConfirmationService() {
	function a() {
		s.subscribe("pinSubmitted", N);
		s.subscribe("enterPinCancelClicked", V);
		$(EnterPinForm).bind("pinFormClose", X)
	}
	function b() {
		s.unsubscribe("pinSubmitted", N);
		$(EnterPinForm).unbind("pinFormClose", X)
	}
	function d() {
		l();
		OWOKPlugin.loginOwokCard(OwokConfig.AutoLogout, true)
	}
	function e() {
		$(OWOKPlugin).bind("owokLightPinCheckSuccess", Z);
		$(OWOKPlugin).bind("owokLightLoginFailed", sa)
	}
	function f() {
		$(OWOKPlugin).unbind("owokLightPinCheckSuccess", Z);
		$(OWOKPlugin).unbind("owokLightLoginFailed", sa)
	}
	function l() {
		$(OWOKPlugin).bind("owokPinEntrySuccess", Ca);
		$(OWOKPlugin).bind("owokPinEntryCanceled", G);
		$(OWOKPlugin).bind("owokWrongPin", n)
	}
	function m() {
		$(OWOKPlugin).unbind("owokPinEntrySuccess", Ca);
		$(OWOKPlugin).unbind("owokPinEntryCanceled", G);
		$(OWOKPlugin).unbind("owokWrongPin", n)
	}
	var p = null, v = null, y = null, A = null, M = null, D = null, s = new AllyveEvents, u = this;
	this.setCallbacks = function(pa, Fa, Xa, Sa) {
		p = pa;
		v = Fa;
		A = Xa;
		y = Sa
	};
	this.execute = function() {
		if (!p || !v || !A || !y)
			throw "Callback functions not properly set.";
		if (!M) {
			M = new OwokStatusCheck;
			$(OwokStatusCheck).bind("owokStatusServiceClosed", B)
		}
		M.showDialog();
		M.bindEventsWithCallback(F, g);
		M.resetOwok();
		$(OWOKPlugin).bind("owokCardWasRemoved", r)
	};
	this.shutdown = function() {
		OWOKPlugin.disableEvents();
		b();
		m();
		f();
		$(OWOKPlugin).unbind("owokCardWasRemoved", r);
		if (M) {
			M.closeDialog();
			M.unbindStatusEvents();
			M.unbindLoginEvents();
			M.unbindAddCardEvents();
			M.unbindDisconnectCardEvents();
			M.unbindEventsWithCallback();
			delete M
		}
		if (D) {
			D.close();
			delete D
		}
	};
	var B = function() {
		u.shutdown()
	}, F = function(pa, Fa, Xa, Sa) {
		var Da = {};
		Da.notInitalized = function() {
			M.showStatusLoginCardInitialisedFalse(true, r)
		};
		Da.notRegistered = z;
		Da.ready = function() {
			I(Sa)
		};
		M.executeSomethingWithOwokLight(Da, pa, Fa, Xa, Sa)
	}, g = function(pa, Fa, Xa, Sa) {
		var Da = {};
		Da.notInitalized = function() {
			self.showStatusLoginCardInitialisedFalse(false, r)
		};
		Da.notRegistered = z;
		Da.ready = ka;
		M.executeSomethingWithOwok(Da, pa, Fa, Xa, Sa)
	}, r = function() {
		b();
		D && D.close();
		M.showDialog();
		M.bindEventsWithCallback(F, g);
		M.resetOwok()
	}, z = function() {
		u.shutdown();
		A()
	}, n = function() {
		y()
	}, G = function() {
		showAlertOk(allyve.i18n.cancelled(), allyve.i18n.titleHint(), Wa)
	}, I = function(pa) {
		D || (D = new EnterPinForm);
		b();
		a();
		D.showDialog(pa)
	}, N = function(pa) {
		b();
		e();
		OWOKPlugin.loginLight(pa, OwokConfig.AutoLogout, true)
	}, V = function() {
		v()
	}, X = function() {
		u.shutdown()
	}, Z = function(pa, Fa) {
		f();
		pa = {
			methodName : "OsiLoginWithOwokLight",
			param : Fa
		};
		(new CardApi).revalidateWithPin(pa, ob, pb)
	}, sa = function(pa, Fa) {
		u.shutdown();
		y(Fa)
	}, ka = function() {
		var pa = OWOKPlugin.getPinTriesLeft();
		pa < 10 ? showAlertOk(
				"Die zuletzt eingegebene PIN war nicht richtig.<br />Du hast noch "
						+ pa + " weitere Versuche.",
				"Login mit der OWOK-Karte", d) : d()
	}, Ca = function(pa, Fa) {
		m();
		pa = {
			methodName : "OsiLoginWithOwok",
			param : Fa
		};
		(new CardApi).revalidateWithPin(pa, ob, pb)
	}, Wa = function() {
		u.shutdown();
		v()
	}, ob = function(pa) {
		u.shutdown();
		p(pa)
	}, pb = function(pa) {
		u.shutdown();
		y(pa.responseText)
	}
}
PinConfirmationService.constructor = PinConfirmationService;
function AccountConfigDialog() {
	function a() {
		b.registerEvent("accChangeEmailClicked");
		b.registerEvent("accChangePasswordClicked");
		b.registerEvent("accChangePasswordOwokClicked");
		b.registerEvent("accChangePasswordNpaClicked");
		b.registerEvent("accChangeNewsletterClicked");
		b.registerEvent("accDeleteClicked");
		b.registerEvent("addOwokCardButtonClicked");
		b.registerEvent("addNpaButtonClicked");
		$("#account_change_email").click(function() {
			b.raiseEvent("accChangeEmailClicked");
			return false
		});
		$("#account_change_password").click(function() {
			b.raiseEvent("accChangePasswordClicked");
			return false
		});
		$("#account_change_password_owok").click(function() {
			b.raiseEvent("accChangePasswordOwokClicked");
			return false
		});
		$("#account_change_password_npa").click(function() {
			b.raiseEvent("accChangePasswordNpaClicked");
			return false
		});
		$("#account_change_newsletter").click(function() {
			b.raiseEvent("accChangeNewsletterClicked");
			return false
		});
		$("#account_delete").click(function() {
			b.raiseEvent("accDeleteClicked");
			return false
		});
		$(".removeCardButton").click(
				function() {
					b.raiseEvent("removeCardButtonClicked", $(this).parent()
							.attr("id"))
				});
		$("#addOwokButton").click(function() {
			b.raiseEvent("addOwokCardButtonClicked")
		});
		$("#addNpaButton").click(function() {
			b.raiseEvent("addNpaButtonClicked")
		})
	}
	var b = new AllyveEvents;
	this.showDialog = function(d, e) {
		this.setWidth(430);
		if (!(e instanceof Array))
			if (e != null)
				throw "type violation! cardList must be an Array";
		this.showTemplate(allyve.mandant.userConfigDialog({
			hasEid : d,
			cardList : e
		}));
		a()
	};
	this.onClose = function() {
		b.registerEvent("accManagerClosed");
		b.raiseEvent("accManagerClosed")
	}
}
AccountConfigDialog.prototype = new SimpleDialog;
AccountConfigDialog.constructor = AccountConfigDialog;
function AccountConfigManager() {
	function a(X) {
		if (X) {
			v = [];
			y = false;
			for ( var Z = 0; Z < X.length; Z++) {
				var sa = X[Z];
				if (sa == "eid")
					y = true;
				else
					v.push(sa.replace(/ /g, "_"))
			}
		} else
			v = null
	}
	function b() {
		if (v && v.length == 2) {
			if (!l) {
				l = new CardDetectionService;
				l.activate()
			}
			m.subscribe("weHaveANewCard", M);
			m.subscribe("weHaveNoCard", D)
		}
	}
	function d() {
		l && l.deactivate();
		m.unsubscribe("weHaveANewCard", M);
		m.unsubscribe("weHaveNoCard", D)
	}
	function e() {
		m.subscribe("accManagerClosed", n);
		m.subscribe("accChangeEmailClicked", s);
		m.subscribe("accChangePasswordClicked", u);
		m.subscribe("accChangePasswordOwokClicked", B);
		m.subscribe("accChangePasswordNpaClicked", g);
		m.subscribe("accChangeNewsletterClicked", r);
		m.subscribe("accDeleteClicked", z);
		m.subscribe("removeCardButtonClicked", G);
		m.subscribe("addOwokCardButtonClicked", I);
		m.subscribe("addNpaButtonClicked", V);
		m.subscribe("addLoginCardSuccess", N);
		m.subscribe("addCardCancelled", N)
	}
	function f() {
		m.unsubscribe("accManagerClosed", n);
		m.unsubscribe("accChangeEmailClicked", s);
		m.unsubscribe("accChangePasswordClicked", u);
		m.unsubscribe("accChangePasswordOwokClicked", B);
		m.unsubscribe("accChangePasswordNpaClicked", g);
		m.unsubscribe("accChangeNewsletterClicked", r);
		m.unsubscribe("accDeleteClicked", z);
		m.unsubscribe("removeCardButtonClicked", G);
		m.unsubscribe("addOwokCardButtonClicked", I);
		m.unsubscribe("addNpaButtonClicked", V);
		m.unsubscribe("addLoginCardSuccess", N);
		m.unsubscribe("addCardCancelled", N)
	}
	var l = null, m = new AllyveEvents, p = null, v = null, y = false, A = this;
	this.showDialog = function(X) {
		f();
		a(X);
		if (p == null)
			p = new AccountConfigDialog;
		p.showDialog(y, v);
		e();
		b()
	};
	this.getCardList = function() {
		var X = null;
		(new CardApi).getCardList(function(Z) {
			X = Z.cardList
		}, function(Z, sa) {
			throw "getCardList failed. " + sa;
		});
		return X
	};
	this.close = function() {
		p != null && p.close();
		d()
	};
	var M = function(X) {
		X = "owokCardButton_" + X.toUpperCase().replace(/ /g, "_");
		$("#" + X + " .cardPresentIndicator").show()
	}, D = function() {
		$(".cardPresentIndicator").hide()
	}, s = function() {
		d();
		p.close();
		account.showChangeEmail();
		return false
	}, u = function() {
		d();
		p.close();
		m.subscribe("passwordChangeFinished", F);
		(new ChangePasswordStandard).showDialog();
		return false
	}, B = function() {
		d();
		p.close();
		m.subscribe("passwordChangeFinished", F);
		(new ChangePasswordOwok).showDialog();
		return false
	}, F = function() {
		m.unsubscribe("passwordChangeFinished", F);
		try {
			var X = A.getCardList();
			A.showDialog(X)
		} catch (Z) {
			A.showDialog(null)
		}
	}, g = function() {
		d();
		p.close();
		m.subscribe("passwordChangeFinished", F);
		(new ChangePasswordNpa).showDialog();
		return false
	}, r = function() {
		d();
		p.close();
		account.showChangeNewsLetter();
		return false
	}, z = function() {
		d();
		account.showDeleteAccount();
		return false
	}, n = function() {
		d();
		f()
	}, G = function(X) {
		var Z = new RemoveOwokCard;
		X = X.replace("owokCardButton_", "").replace(/_/g, " ");
		Z.showForm(X)
	}, I = function() {
		(new OwokStatusCheck).prepareCardAdd()
	}, N = function() {
		OWOKPlugin.disableEvents();
		var X = A.getCardList();
		A.showDialog(X)
	}, V = function() {
		var X = null;
		(new CardApi).prepareAddEidCard(function(Z) {
			X = Z
		}, function(Z, sa) {
			throw "Could not prepare eid session: " + sa;
		});
		window.open("/api/eid/initadd/?at=" + X, "eIdConnect",
				"menubar=0,resizable=1,width=650,height=470")
	}
}
AccountConfigManager.constructor = AccountConfigManager;
function CardDetectionService() {
	function a() {
		$(OWOKPlugin).bind("owokLightCardWasInserted", e);
		$(OWOKPlugin).bind("owokSmartcardWasInserted", e);
		$(OWOKPlugin).bind("owokCardWasRemoved", f)
	}
	function b() {
		$(OWOKPlugin).unbind("owokLightCardWasInserted", e);
		$(OWOKPlugin).unbind("owokSmartcardWasInserted", e);
		$(OWOKPlugin).unbind("owokCardWasRemoved", f)
	}
	var d = new AllyveEvents;
	this.activate = function() {
		b();
		(new OwokStatusCheck).resetOwok();
		a()
	};
	this.deactivate = function() {
		b();
		OWOKPlugin.disableEvents()
	};
	var e = function(l, m) {
		d.registerEvent("weHaveANewCard");
		d.raiseEvent("weHaveANewCard", m)
	}, f = function() {
		d.registerEvent("weHaveNoCard");
		d.raiseEvent("weHaveNoCard")
	}
}
CardDetectionService.constructor = CardDetectionService;
function RemoveOwokCard() {
	function a() {
		showAccountConfigDialog()
	}
	function b() {
		l.close();
		var D = "", s = "";
		if (p == m) {
			D = allyve.mandant.removeEidTitle();
			s = allyve.mandant.removeEidSuccess()
		} else {
			D = allyve.mandant.removeLogincardTitle();
			s = allyve.mandant.removeLogincardSuccess()
		}
		showAlertOk(s, D, a)
	}
	function d(D) {
		if (D)
			if (403 == D.status)
				l.showVerifyPassword();
			else {
				l.close();
				showAlertOk(allyve.mandant.deleteFromCardFail(), allyve.mandant
						.removeLogincardTitle(), a)
			}
	}
	function e() {
		v.subscribe("passwordConfirmationSubmitted", y);
		v.subscribe("passwordConfirmationCancelled", M);
		v.subscribe("confirmWithPasswordFormClosed", A)
	}
	function f() {
		v.unsubscribe("passwordConfirmationSubmitted", y);
		v.unsubscribe("passwordConfirmationCancelled", M);
		v.unsubscribe("confirmWithPasswordFormClosed", A)
	}
	var l = null, m = "eidCardButton", p = null, v = new AllyveEvents;
	this.showForm = function(D) {
		p = D;
		f();
		l = new PasswordConfirmationForm;
		var s = D = "", u = allyve.mandant.removeLogincardLabel();
		if (p == m) {
			D = allyve.mandant.removeEidTitle();
			s = allyve.mandant.removeEidDescription()
		} else {
			D = allyve.mandant.removeLogincardTitle();
			s = allyve.mandant.removeLogincardDescription()
		}
		l.showDialog(D, s, u);
		e()
	};
	this.hide = function() {
		l && l.close()
	};
	var y = function(D) {
		var s = {};
		s.cardId = p;
		s.password = D;
		D = new CardApi;
		p == m ? D.deleteEidCard(s, b, d) : D.deleteCard(s, b, d)
	}, A = function() {
		f()
	}, M = function() {
		l.close();
		showAccountConfigDialog()
	}
}
RemoveOwokCard.constructor = RemoveOwokCard;
function ChangePasswordNpa() {
	function a() {
		d.subscribe("changePasswordFormClosed", p);
		d.subscribe("passwordChangeSubmitted", l);
		d.subscribe("passwordChangeCancelClicked", m)
	}
	function b() {
		d.unsubscribe("accManagerClosed", p);
		d.unsubscribe("passwordChangeSubmitted", l);
		d.unsubscribe("passwordChangeCancelClicked", m)
	}
	var d = new AllyveEvents, e = null;
	this.showDialog = function() {
		b();
		if (e == null)
			e = new ChangePasswordCardForm;
		e.showDialog(true);
		a()
	};
	this.close = function() {
		e != null && e.close()
	};
	var f = function() {
		d.registerEvent("passwordChangeFinished");
		d.raiseEvent("passwordChangeFinished")
	}, l = function(v) {
		e.close();
		var y = null;
		(new CardApi).prepareChPasswd(v, function(A) {
			y = A
		}, function(A, M) {
			throw "Could not prepare eid session: " + M;
		});
		window.open("/api/eid/init_chpasswd/?at=" + y, "eIdConnect",
				"menubar=0,resizable=1,width=650,height=470");
		return false
	}, m = function() {
		e.close();
		f()
	}, p = function() {
		b()
	}
}
ChangePasswordNpa.constructor = ChangePasswordNpa;
function ChangePasswordOwok() {
	function a() {
		f.close();
		var F = new PinConfirmationService;
		F.setCallbacks(A, D, s, M);
		F.execute()
	}
	function b() {
		e.subscribe("changePasswordFormClosed", B);
		e.subscribe("passwordChangeSubmitted", y);
		e.subscribe("passwordChangeCancelClicked", u)
	}
	function d() {
		e.unsubscribe("accManagerClosed", B);
		e.unsubscribe("passwordChangeSubmitted", y);
		e.unsubscribe("passwordChangeCancelClicked", u)
	}
	var e = new AllyveEvents, f = null, l = null;
	this.showDialog = function() {
		d();
		if (f == null)
			f = new ChangePasswordCardForm;
		f.showDialog(false);
		b()
	};
	this.close = function() {
		f != null && f.close()
	};
	var m = function() {
		e.registerEvent("passwordChangeFinished");
		e.raiseEvent("passwordChangeFinished")
	}, p = function() {
		f.close();
		showAlertOk(allyve.i18n.changePasswordSuccess(), allyve.mandant
				.titleChangePasswordOwok(), m)
	}, v = function() {
		f.showError(allyve.i18n.checkPassword())
	}, y = function(F) {
		l = F;
		f.close();
		a();
		return false
	}, A = function(F) {
		if (l)
			(new AccountsApi).changePassword(l + "&uactoken=" + F, p, v);
		else
			throw "could not get new password.";
	}, M = function() {
		showAlertOk(allyve.mandant.enterPinFail(), null, a)
	}, D = function() {
		m()
	}, s = function() {
		showAlertOk(allyve.mandant.msgCardNotRegistered(), allyve.i18n
				.titleHint(), m)
	}, u = function() {
		f.close();
		m()
	}, B = function() {
		d()
	}
}
ChangePasswordOwok.constructor = ChangePasswordOwok;
function ChangePasswordCardForm() {
	var a = this, b = {
		minlength : jQuery.format("Mindestens {0} Zeichen"),
		required : jQuery.format("Bitte ausf\u00fcllen.")
	}, d = {
		minlength : jQuery.format("Mindestens {0} Zeichen"),
		required : jQuery.format("Bitte ausf\u00fcllen."),
		equalTo : jQuery.format("Falsch wiederholt.")
	}, e = new AllyveEvents;
	this.showDialog = function(f) {
		this.setDialogClass("simpleDialog ");
		this.setWidth(430);
		var l = "";
		l = f ? allyve.mandant.changePasswordNpa() : allyve.mandant
				.changePasswordOwok();
		this.showTemplate(l);
		$("#changePasswordForm").validate({
			rules : {
				password : {
					minlength : 6
				},
				password_rep : {
					equalTo : "#changePasswordForm_password"
				}
			},
			messages : {
				password : b,
				password_rep : d
			},
			submitHandler : function() {
				a.finishDialog();
				return false
			}
		});
		$("#changePasswordForm_password").focus()
	};
	this.loadButtons = function() {
		return a.loadButtonsOk()
	};
	this.loadButtonsOk = function() {
		var f = this;
		return {
			OK : function() {
				f.okClicked()
			},
			Abbrechen : function() {
				f.cancelClicked()
			}
		}
	};
	this.okClicked = function() {
		this.hideError();
		this.hideVerifyPassword();
		$("#changePasswordForm").submit()
	};
	this.cancelClicked = function() {
		e.registerEvent("passwordChangeCancelClicked");
		e.raiseEvent("passwordChangeCancelClicked")
	};
	this.finishDialog = function() {
		var f = $("#changePasswordForm").serialize();
		e.registerEvent("passwordChangeSubmitted");
		e.raiseEvent("passwordChangeSubmitted", f)
	};
	this.showError = function() {
		$("#password_old_error").show()
	};
	this.hideError = function() {
		$("#password_old_error").hide()
	};
	this.showVerifyPassword = function() {
		$("#pleaseCheckPassword").show()
	};
	this.onClose = function() {
		e.registerEvent("changePasswordFormClosed");
		e.raiseEvent("changePasswordFormClosed")
	};
	this.hideVerifyPassword = function() {
		$("#changePasswordError").hide()
	}
}
ChangePasswordCardForm.prototype = new SimpleDialog;
ChangePasswordCardForm.constructor = ChangePasswordCardForm;
function PasswordConfirmationForm() {
	var a = new AllyveEvents;
	this.showDialog = function(b, d, e) {
		var f = this;
		this.setDialogClass("simpleDialog ");
		this.setWidth(430);
		this.showTemplate(allyve.mandant.confirmWithPassword({
			title : b,
			description : d,
			label : e
		}));
		$("#confirmWithPasswordForm").validate({
			rules : {
				password : {
					required : true
				}
			},
			messages : {
				password : {
					required : jQuery.format("Bitte ausf\u00fcllen.")
				}
			},
			submitHandler : function() {
				f.finishDialog();
				return false
			}
		});
		$("#confirmWithPasswordForm_password").focus()
	};
	this.loadButtons = function() {
		return this.loadButtonsOk()
	};
	this.loadButtonsOk = function() {
		var b = this;
		return {
			OK : function() {
				b.okClicked()
			},
			Abbrechen : function() {
				b.cancelClicked()
			}
		}
	};
	this.okClicked = function() {
		this.hideError();
		this.hideVerifyPassword();
		$("#confirmWithPasswordForm").submit()
	};
	this.cancelClicked = function() {
		a.registerEvent("passwordConfirmationCancelled");
		a.raiseEvent("passwordConfirmationCancelled")
	};
	this.finishDialog = function() {
		var b = $("#confirmWithPasswordForm_password").val();
		a.registerEvent("passwordConfirmationSubmitted");
		a.raiseEvent("passwordConfirmationSubmitted", b)
	};
	this.showError = function(b) {
		$("#confirmWithPasswordError").text(b);
		$("#confirmWithPasswordError").show()
	};
	this.hideError = function() {
		$("#confirmWithPasswordError").hide()
	};
	this.showVerifyPassword = function() {
		$("#pleaseCheckPassword").show()
	};
	this.onClose = function() {
		a.registerEvent("confirmWithPasswordFormClosed");
		a.raiseEvent("confirmWithPasswordFormClosed")
	};
	this.hideVerifyPassword = function() {
		$("#pleaseCheckPassword").hide()
	}
}
PasswordConfirmationForm.prototype = new SimpleDialog;
PasswordConfirmationForm.constructor = PasswordConfirmationForm;
function ChangePasswordStandard() {
	function a() {
		d.subscribe("changePasswordFormClosed", y);
		d.subscribe("passwordChangeSubmitted", p);
		d.subscribe("passwordChangeCancelClicked", v)
	}
	function b() {
		d.unsubscribe("accManagerClosed", y);
		d.unsubscribe("passwordChangeSubmitted", p);
		d.unsubscribe("passwordChangeCancelClicked", v)
	}
	var d = new AllyveEvents, e = null;
	this.showDialog = function() {
		b();
		if (e == null)
			e = new ChangePasswordStandardForm;
		e.showDialog();
		a()
	};
	this.close = function() {
		e != null && e.close()
	};
	var f = function() {
		d.registerEvent("passwordChangeFinished");
		d.raiseEvent("passwordChangeFinished")
	}, l = function() {
		e.close();
		showAlertOk(allyve.i18n.changePasswordSuccess(), allyve.mandant
				.titleChangePasswordStandard(), f)
	}, m = function() {
		e.showError(allyve.i18n.checkPassword())
	}, p = function(A) {
		(new AccountsApi).changePassword(A, l, m);
		return false
	}, v = function() {
		e.close();
		f()
	}, y = function() {
		b()
	}
}
ChangePasswordStandard.constructor = ChangePasswordStandard;
function ChangePasswordStandardForm() {
	var a = {
		minlength : jQuery.format("Mindestens {0} Zeichen"),
		required : jQuery.format("Bitte ausf\u00fcllen.")
	}, b = {
		minlength : jQuery.format("Mindestens {0} Zeichen"),
		required : jQuery.format("Bitte ausf\u00fcllen."),
		equalTo : jQuery.format("Falsch wiederholt.")
	}, d = new AllyveEvents;
	this.showDialog = function() {
		var e = this;
		this.setDialogClass("simpleDialog ");
		this.setWidth(430);
		this.showTemplate(allyve.mandant.changePasswordStandard());
		$("#changePasswordForm").validate({
			rules : {
				password : {
					minlength : 6
				},
				password_rep : {
					equalTo : "#changePasswordForm_password"
				}
			},
			messages : {
				password : a,
				password_rep : b
			},
			submitHandler : function() {
				e.finishDialog();
				return false
			}
		});
		$("#changePasswordForm_password_old").focus()
	};
	this.loadButtons = function() {
		return this.loadButtonsOk()
	};
	this.loadButtonsOk = function() {
		var e = this;
		return {
			OK : function() {
				e.okClicked()
			},
			Abbrechen : function() {
				e.cancelClicked()
			}
		}
	};
	this.okClicked = function() {
		this.hideError();
		this.hideVerifyPassword();
		$("#changePasswordForm").submit()
	};
	this.cancelClicked = function() {
		d.registerEvent("passwordChangeCancelClicked");
		d.raiseEvent("passwordChangeCancelClicked")
	};
	this.finishDialog = function() {
		var e = $("#changePasswordForm").serialize();
		d.registerEvent("passwordChangeSubmitted");
		d.raiseEvent("passwordChangeSubmitted", e)
	};
	this.showError = function() {
		$("#password_old_error").show()
	};
	this.hideError = function() {
		$("#password_old_error").hide()
	};
	this.showVerifyPassword = function() {
		$("#pleaseCheckPassword").show()
	};
	this.onClose = function() {
		d.registerEvent("changePasswordFormClosed");
		d.raiseEvent("changePasswordFormClosed")
	};
	this.hideVerifyPassword = function() {
		$("#changePasswordError").hide()
	}
}
ChangePasswordStandardForm.prototype = new SimpleDialog;
ChangePasswordStandardForm.constructor = ChangePasswordStandardForm;
function MultiStatusUpdateBase() {
	var a = this;
	this.states = {
		STATE_ENABLED : 0,
		STATE_DISABLED : 1,
		STATE_UNAVAILABLE : 2
	};
	this.activeServiceIdsForBackend = {
		c0 : 0,
		c1 : 0,
		c2 : 0,
		c3 : 0,
		c4 : 0,
		c5 : 0
	};
	this.services = {
		Facebook : {
			serviceId : 0,
			configId : "c1",
			state : this.states.STATE_UNAVAILABLE
		},
		Twitter : {
			serviceId : 1,
			configId : "c0",
			state : this.states.STATE_UNAVAILABLE
		},
		Myspace : {
			serviceId : 2,
			configId : "c2",
			state : this.states.STATE_UNAVAILABLE
		},
		Studivz : {
			serviceId : 3,
			configId : "c3",
			state : this.states.STATE_UNAVAILABLE
		},
		Schuelervz : {
			serviceId : 4,
			configId : "c4",
			state : this.states.STATE_UNAVAILABLE
		},
		Meinvz : {
			serviceId : 5,
			configId : "c5",
			state : this.states.STATE_UNAVAILABLE
		}
	};
	var b = {};
	b[0] = 19;
	b[1] = 10021;
	b[2] = 26;
	b[3] = 10060;
	b[4] = 10061;
	b[5] = 10062;
	this.setting = this.settings = null;
	var d = new AllyveEvents, e = new SammelStatusView, f = new ActionsApi, l = {}, m = false;
	this.init = function(p) {
		e.init(p.widgetInfos, p.widgetData)
	};
	this.initEventSubscribers = function() {
		d.subscribe(d.AFTER_WIDGET_ADD, function(p, v) {
			a.reactToEventAdd(p, v)
		});
		d.subscribe(d.AFTER_WIDGET_DELETE, function(p, v) {
			a.reactToEventDelete(p, v)
		});
		d.subscribe(d.MULTI_STATUS_CHANGE, function(p, v) {
			a.reactToEventStatusChangeByUserAction(p, v)
		})
	};
	this.getServiceStateByServiceId = function(p) {
		for (serviceName in this.services)
			if (p === this.services[serviceName].serviceId)
				return this.services[serviceName].state
	};
	this.getServiceNameByServiceId = function(p) {
		for (serviceName in this.services)
			if (p === this.services[serviceName].serviceId)
				return serviceName;
		return ""
	};
	this.loadSettings = function() {
		this.settings = new UserSettings;
		this.setting = $.evalJSON(a.settings.get("MultiStatus"))
	};
	this.reactToEventAdd = function(p) {
		if (!this.isNotValidEventData(p)) {
			this.settings || this.loadSettings();
			if (!this.setting)
				this.setting = {};
			if (!m) {
				m = true;
				d.raiseEvent(d.FIRST_STATUS_WIDGET_ADDED, p.widgetName)
			}
			this.countWidgetAdd(p.widgetName);
			if (this.isInvalidSetting(p.widgetName))
				this.setting[p.widgetName] = this.setDefaultState();
			this.setStateOfServiceId(p.widgetName, this.setting[p.widgetName]);
			this.setIconToState(a.services[p.widgetName].serviceId,
					this.setting[p.widgetName])
		}
	};
	this.isInvalidSetting = function(p) {
		if (typeof this.setting[p] === "undefined" || this.setting[p].NaN
				|| this.states.STATE_UNAVAILABLE === this.setting[p]
				&& l[p] > 0)
			return true;
		return false
	};
	this.setDefaultState = function() {
		return this.states.STATE_ENABLED
	};
	this.countWidgetAdd = function(p) {
		if (l[p])
			l[p]++;
		else
			l[p] = 1;
		return l[p]
	};
	this.countWidgetDelete = function(p) {
		if (l[p] && l[p] > 0)
			l[p]--;
		else
			l[p] = 0;
		return l[p]
	};
	this.reactToEventDelete = function(p) {
		if (!this.isNotValidEventData(p))
			if (!(this.countWidgetDelete(p.widgetName) > 0)) {
				this.setIconToUnavailable(a.services[p.widgetName].serviceId);
				this.setServiceIdToUnavailable(p.widgetName);
				if (!this.anyStatusWidgetsLeft()) {
					d.raiseEvent(d.NO_MORE_STATUS_WIDGET_AVAILABLE, "ALL_GONE");
					m = false
				}
			}
	};
	this.anyStatusWidgetsLeft = function() {
		if (0 < this
				.getNumberOfServicesNotHavingState(this.states.STATE_UNAVAILABLE))
			return true;
		return false
	};
	this.isNotValidEventData = function(p) {
		if (!p || !p.widgetName)
			return true;
		if (this.services[p.widgetName]
				&& this.services[p.widgetName].serviceId >= 0)
			return false;
		return true
	};
	this.setStateOfServiceId = function(p, v) {
		switch (v) {
		case this.states.STATE_ENABLED:
			this.setServiceIdToActive(p);
			break;
		case this.states.STATE_DISABLED:
			this.setServiceIdToInActive(p);
			break;
		case this.states.STATE_UNAVAILABLE:
		default:
			this.setServiceIdToUnavailable(p)
		}
	};
	this.getNumberOfServicesWithState = function(p) {
		var v = 0;
		for (serviceName in this.services)
			p == this.services[serviceName].state && v++;
		return v
	};
	this.getNumberOfServicesNotHavingState = function(p) {
		var v = 0;
		for (serviceName in this.services)
			p != this.services[serviceName].state && v++;
		return v
	};
	this.setServiceIdToActive = function(p) {
		this.activeServiceIdsForBackend[this.services[p].configId] = 1;
		this.services[p].state = this.states.STATE_ENABLED
	};
	this.setServiceIdToInActive = function(p) {
		this.activeServiceIdsForBackend[this.services[p].configId] = 0;
		this.services[p].state = this.states.STATE_DISABLED
	};
	this.setServiceIdToUnavailable = function(p) {
		this.activeServiceIdsForBackend[this.services[p].configId] = 0;
		this.services[p].state = this.states.STATE_UNAVAILABLE
	};
	this.setIconToState = function(p, v) {
		switch (Number(v)) {
		case this.states.STATE_ENABLED:
			this.setIconToActive(p);
			break;
		case this.states.STATE_DISABLED:
			this.setIconToInActive(p);
			break;
		case this.states.STATE_UNAVAILABLE:
		default:
			this.setIconToUnavailable(p)
		}
	};
	this.setIconToActive = function(p) {
		e.setIconToActive(p)
	};
	this.setIconToInActive = function(p) {
		e.setIconToInActive(p)
	};
	this.setIconToUnavailable = function(p) {
		e.setIconToUnavailable(p)
	};
	this.getActiveServices = function() {
		return this.activeServiceIdsForBackend
	};
	this.postStatus = function(p) {
		if (!p || "" === p) {
			e.showAlertBox(allyve.i18n.sammelStatusServiceNoText());
			return false
		}
		var v = {}, y = 0;
		for ( var A in this.activeServiceIdsForBackend)
			if (this.activeServiceIdsForBackend[A] > 0) {
				v[A] = this.activeServiceIdsForBackend[A];
				y++
			}
		if (y < 1)
			e.showAlertBox(allyve.i18n.sammelStatusServiceUnavailable());
		else {
			v.msg = p;
			e.sammelStatusSetUpdating(true);
			f.postSammelStatus(v, a.onFinishPostingSuccess,
					a.onFinishPostingError)
		}
	};
	this.onFinishPostingSuccess = function(p) {
		a.onFinishPostingCommon(p)
	};
	this.onFinishPostingError = function(p, v) {
		a.onFinishPostingCommon(v)
	};
	this.onFinishPostingCommon = function(p) {
		e.sammelStatusSetUpdating(false);
		e.showMessages(p)
	};
	this.saveSettings = function() {
		var p = {};
		for (serviceName in this.services)
			p[serviceName] = this.services[serviceName].state;
		this.settings.set("MultiStatus", $.toJSON(p))
	};
	this.reactToEventStatusChangeByUserAction = function(p) {
		if (p.serviceId.NaN || p.serviceId < 0)
			return false;
		var v = this.getServiceNameByServiceId(p.serviceId);
		switch (this.services[v].state) {
		case this.states.STATE_DISABLED:
			this.setServiceIdToActive(v);
			this.setIconToActive(p.serviceId);
			break;
		case this.states.STATE_ENABLED:
			this.setServiceIdToInActive(v);
			this.setIconToInActive(p.serviceId);
			break;
		case this.states.STATE_UNAVAILABLE:
			showAlertYesNo(allyve.portlet.addServiceContent({
				serviceName : v
			}), allyve.portlet.addServiceTitle({
				serviceName : v
			}), function() {
				$(this).dialog("close");
				a.callWidgetSetup(p.serviceId)
			}, function() {
				$(this).dialog("close")
			});
			break;
		default:
			return
		}
		this.saveSettings()
	};
	this.callWidgetSetup = function(p) {
		(new WidgetSetup).add(b[p])
	};
	this.initEventSubscribers()
};
function MultiStatusUpdate() {
	if (MultiStatusUpdate.instance !== undefined)
		return MultiStatusUpdate.instance;
	MultiStatusUpdate.instance = this
}
MultiStatusUpdate.prototype = new MultiStatusUpdateBase;
MultiStatusUpdate.constructor = MultiStatusUpdate;
function FaviconManagerBase() {
	var a = this;
	this.lastError = "";
	this.init = function() {
	};
	this.getFaviconsForAllBookmarks = function(b) {
		var d = [];
		$.each(b, function() {
			var e = {};
			e.url = this.url;
			e.id = this.id;
			d.push(e)
		});
		a.getFavicons(d)
	};
	this.getFavicons = function(b) {
		if (!($.browser.msie == true && parseInt($.browser.version) < 8)) {
			var d = $.toJSON({
				data : b
			});
			(new FaviconsApi).getFavicons(d, b, this.successCallback,
					this.errorCallback)
		}
	};
	this.requestFavicons = function(b) {
		if (!($.browser.msie == true && parseInt($.browser.version) < 8))
			if (b.length != 0) {
				var d = $.toJSON({
					data : b
				});
				(new FaviconsApi).requestFavicons(d, b, this.requestSuccess,
						this.errorCallback)
			}
	};
	this.requestSuccess = function(b) {
		$.each(b.data, function() {
			this.base64Data != null
					&& $("#" + this.id + "_favicon").attr("src",
							"data:image/x-icon;base64," + this.base64Data)
		})
	};
	this.requestError = function(b, d) {
		a.lastError = "request favicon failed: " + d
	};
	this.successCallback = function(b, d) {
		var e = [];
		$.each(b.data, function() {
			if (this.base64Data != null)
				this.base64Data != ""
						&& $("#" + this.id + "_favicon").attr("src",
								"data:image/x-icon;base64," + this.base64Data);
			else {
				var f = this.id;
				$.each(d, function() {
					if (this.id == f) {
						var l = {};
						l.url = this.url;
						l.id = this.id;
						e.push(l)
					}
				})
			}
		});
		a.requestFavicons(e)
	};
	this.errorCallback = function() {
		a.lastError = "request favicon failed"
	}
};
function FaviconManager() {
	if (FaviconManager.instance !== undefined)
		return FaviconManager.instance;
	FaviconManager.instance = this
}
FaviconManager.prototype = new FaviconManagerBase;
FaviconManager.constructor = FaviconManager;
function ItemManagerConfigViewBase() {
	this.eventHandler = new AllyveEvents;
	this.item = null;
	this.showAddDialog = function(a) {
		this.item = null;
		this.showDialog(a)
	};
	this.showEditDialog = function(a, b) {
		this.item = b;
		this.showDialog(a, this.item)
	};
	this.showDialog = function() {
	};
	this.loadButtons = function() {
		return this.loadButtonsOk()
	};
	this.loadButtonsOk = function() {
		var a = this;
		return {
			Speichern : function() {
				a.okClicked()
			}
		}
	};
	this.okClicked = function() {
		$("#itemEditForm").submit()
	};
	this.finishDialog = function() {
	}
}
ItemManagerConfigViewBase.prototype = new SimpleDialog;
ItemManagerConfigViewBase.constructor = ItemManagerConfigViewBase;
function BookmarkManagerBase() {
	var a = this, b = [], d = new AllyveEvents;
	d.subscribe("afterApplicationInit", function(e, f) {
		a.renderBookmarks(e, f)
	});
	d.subscribe("showBookmarkCreate", function() {
		a.showAddBookmark()
	});
	d.subscribe("showBookmarkEdit", function(e) {
		a.showEditBookmark(e)
	});
	d.subscribe("addBookmarkFinished", function(e) {
		a.handleAddBookmarkFinished(e)
	});
	d.subscribe("editBookmarkFinished", function(e) {
		a.handleEditBookmarkFinished(e)
	});
	d.subscribe("deleteBookmark", function(e) {
		a.reactToBookmarkItemDelete(e)
	});
	d.subscribe("saveBookmarkOrder", function(e) {
		a.saveBookmarkOrder(e)
	});
	this.createBookmark = function(e, f) {
		var l = {};
		l.id = this.createGuid();
		l.url = "";
		if (typeof e == "string")
			l.url = e;
		l.label = "";
		if (typeof f == "string")
			l.label = f;
		return l
	};
	this.addBookmark = function(e) {
		if (!this.isValidBookmark(e))
			return false;
		if (null == b)
			b = [];
		b.push(e);
		return true
	};
	this.createAndAdd = function(e, f) {
		return this.addBookmark(this.createBookmark(e, f))
	};
	this.isValidBookmark = function(e) {
		if (!e.id || "" == e.url || "" == e.label)
			return false;
		return true
	};
	this.isValidBookmarkData = function(e, f) {
		if ("" == e || "" == f)
			return false;
		return true
	};
	this.replaceBookmark = function(e) {
		if (!this.isValidBookmark(e))
			return false;
		var f = this.getIndexOfBookmarkById(e.id);
		b.splice(f, 1, e);
		return b
	};
	this.deleteBookmark = function(e) {
		return this.deleteBookmarkById(e.id)
	};
	this.deleteBookmarkById = function(e) {
		e = this.getIndexOfBookmarkById(e);
		if (e >= 0) {
			b.splice(e, 1);
			return true
		}
		return false
	};
	this.getIndexOfBookmarkById = function(e) {
		for ( var f in b)
			if (e == b[f].id)
				return f;
		return -1
	};
	this.getBookmarkById = function(e) {
		e = this.getIndexOfBookmarkById(e);
		if (e >= 0)
			return b[e];
		return null
	};
	this.S4 = function() {
		return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
	};
	this.createGuid = function() {
		return "x" + this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4()
				+ "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()
	};
	this.getBookmarks = function() {
		if (null === b || b.length < 1)
			this.loadBookmarks();
		return b
	};
	this.loadBookmarks = function() {
		var e = (new UserSettingsCrypt).get("bookmarkManager");
		if (null !== e)
			b = e
	};
	this.saveBookmarks = function() {
		(new UserSettingsCrypt).set("bookmarkManager", b)
	};
	this.renderBookmarks = function() {
		(new BookmarkManagerView).show(this.getBookmarks());
		(new FaviconManager).getFaviconsForAllBookmarks(this.getBookmarks())
	};
	this.showAddBookmark = function() {
		(new BookmarkManagerConfigView).showAddDialog(allyve.bookmarkmanager
				.editBookmarkTitle())
	};
	this.showEditBookmark = function(e) {
		e = this.getBookmarkById(e);
		(new BookmarkManagerConfigView).showEditDialog(allyve.bookmarkmanager
				.editBookmarkTitle(), e)
	};
	this.handleAddBookmarkFinished = function(e) {
		this.createAndAdd(e.url, e.label);
		this.saveBookmarks();
		this.renderBookmarks()
	};
	this.handleEditBookmarkFinished = function(e) {
		this.replaceBookmark(e);
		this.saveBookmarks();
		this.renderBookmarks()
	};
	this.reactToBookmarkItemDelete = function(e) {
		this.deleteBookmarkById(e);
		this.saveBookmarks();
		this.renderBookmarks()
	};
	this.saveBookmarkOrder = function() {
		var e = a.getOrderFromLayout("bookmarkManagerItem");
		a.reOrderBookmarks(e);
		a.saveBookmarks()
	};
	this.getOrderFromLayout = function(e) {
		return $.map($("." + e), function(f) {
			return f.id
		})
	};
	this.reOrderBookmarks = function(e) {
		var f = [];
		$.each(e, function() {
			var l = this;
			$.each(b, function() {
				this.id == l && f.push(this)
			})
		});
		b = f
	}
};
function BookmarkManager() {
	if (BookmarkManager.instance !== undefined)
		return BookmarkManager.instance;
	BookmarkManager.instance = this
}
BookmarkManager.prototype = new BookmarkManagerBase;
BookmarkManager.constructor = BookmarkManager;
function BookmarkManagerViewBase() {
	var a = this, b = new AllyveEvents;
	this.renderBookmarks = function(d, e) {
		$("#" + d).html("");
		$("#" + d).append(allyve.bookmarkmanager.renderHeadline());
		$("#" + d).append('<div id="' + d + '_content"></div>');
		for (index in e) {
			$("#" + d + "_content").append(
					allyve.bookmarkmanager.renderBookmark({
						bookmark : e[index]
					}));
			this.attachClickHandlers(e[index].id, e[index].url)
		}
		$("#" + d).append(allyve.bookmarkmanager.renderAddBookmark());
		$("#addBookmark").click(function() {
			b.registerEvent("showBookmarkCreate");
			b.raiseEvent("showBookmarkCreate", null)
		});
		b.registerEvent("deleteBookmark");
		$("#" + d + "_content").sortable({
			handle : ".bookmarkManagerDragHandle",
			stop : function() {
				b.registerEvent("saveBookmarkOrder");
				b.raiseEvent("saveBookmarkOrder", null)
			}
		})
	};
	this.attachClickHandlers = function(d, e) {
		a.attachClickHandlerOpenUrl(d, e);
		a.attachClickHandlerDelete(d, e);
		a.attachClickHandlerEdit(d)
	};
	this.attachClickHandlerOpenUrl = function(d, e) {
		$("#" + d + "_bookmarkManagerIcon, #" + d + "_bookmarkManagerLabel")
				.click(
						function() {
							a.isUrl(e) ? window.open(e, "_blank") : window
									.open("http://" + e, "_blank")
						})
	};
	this.attachClickHandlerDelete = function(d) {
		$("#" + d + "_bookmarkManagerDeleteButton").click(function() {
			a.deleteDialog(d)
		})
	};
	this.attachClickHandlerEdit = function(d) {
		$("#" + d + "_bookmarkManagerConfigButton").click(function() {
			b.raiseEvent("showBookmarkEdit", d)
		})
	};
	this.deleteDialog = function(d) {
		alertDialog = new AlertDialog;
		alertDialog.buttons.Ja = function() {
			b.raiseEvent("deleteBookmark", d);
			$(this).dialog("close")
		};
		alertDialog.show(allyve.bookmarkmanager.renderDeleteBookmark())
	};
	this.isUrl = function(d) {
		return /^(gopher|news|nntp|telnet|http|ftp|https|ftps|sftp):\/\//
				.test(d)
	};
	this.show = function(d) {
		this.renderBookmarks("bookmarkManager", d);
		$("#rightColumn").show()
	}
};
function BookmarkManagerView() {
	if (BookmarkManagerView.instance !== undefined)
		return BookmarkManagerView.instance;
	BookmarkManagerView.instance = this
}
BookmarkManagerView.prototype = new BookmarkManagerViewBase;
BookmarkManagerView.constructor = BookmarkManagerView;
function BookmarkManagerConfigViewBase() {
	this.showDialog = function(a, b) {
		var d = this, e = b ? b.url : "";
		b = b ? b.label : "";
		this.setDialogClass("simpleDialog bookmarkManagerConfigDialog");
		this.setWidth(430);
		this.showTemplate(allyve.bookmarkmanager.renderBookmarkEdit({
			title : a,
			url : e,
			name : b
		}));
		$("#url_field").focus();
		$("#itemEditForm").validate({
			rules : {
				url : {
					required : true
				},
				url_name : {
					required : true
				}
			},
			messages : {
				url : {
					required : jQuery.format("Bitte ausf\u00fcllen.")
				},
				url_name : {
					required : jQuery.format("Bitte ausf\u00fcllen.")
				}
			},
			submitHandler : function() {
				d.finishDialog();
				$("#simpleDialog").dialog("close");
				return false
			}
		})
	};
	this.finishDialog = function() {
		var a = {};
		a.url = $("#url_field").val();
		a.label = $("#name_field").val();
		if (this.item) {
			a.id = this.item.id;
			this.eventHandler.registerEvent("editBookmarkFinished");
			this.eventHandler.raiseEvent("editBookmarkFinished", a)
		} else {
			this.eventHandler.registerEvent("addBookmarkFinished");
			this.eventHandler.raiseEvent("addBookmarkFinished", a)
		}
	}
}
BookmarkManagerConfigViewBase.prototype = new ItemManagerConfigViewBase;
BookmarkManagerConfigViewBase.constructor = BookmarkManagerConfigViewBase;
function BookmarkManagerConfigView() {
}
BookmarkManagerConfigView.prototype = new BookmarkManagerConfigViewBase;
BookmarkManagerConfigView.constructor = BookmarkManagerConfigView;
function VirtualKeyboardView() {
	function a(y, A) {
		var M = new soy.StringBuilder;
		M.append("\t");
		M.append('<div id="' + m + y + '" class="virtualKeyboardButton">' + A
				+ "</div>");
		return M.toString()
	}
	function b(y) {
		var A = new soy.StringBuilder;
		A.append("\t");
		A.append('<div id="' + y + '" class="virtualKeyboardButton"></div>');
		return A.toString()
	}
	function d() {
		for ( var y = [], A = 0; A < 10; A++)
			y.push(A);
		for (A = []; y.length > 0;) {
			var M = Math.floor(Math.random() * y.length);
			A.push(y[M]);
			y.splice(M, 1)
		}
		return A
	}
	function e(y, A, M) {
		$("#" + (m + A)).click(function() {
			var D = $(y).val(), s = $(y).attr("maxlength");
			if (D.length < s) {
				D = D + M;
				$(y).val(D)
			}
		})
	}
	function f(y) {
		$("#" + p).click(function() {
			$(y).val("")
		})
	}
	function l(y) {
		$("#" + v).click(function() {
			var A = $(y).val();
			A = A.substr(0, A.length - 1);
			$(y).val(A)
		})
	}
	var m = "vkb_", p = m + "deleteAll", v = m + "deleteOne";
	this.render = function(y, A) {
		for ( var M = d(), D = new soy.StringBuilder, s = 0; s < 10; s++) {
			s == 9 && D.append(b(p));
			D.append(a(s, M[s]))
		}
		D.append(b(v));
		y.html(D.toString());
		for (y = 0; y < 10; y++)
			e(A, y, M[y]);
		f(A);
		l(A)
	}
};
function KeyringManagerBase() {
	var a = this, b = [], d = new AllyveEvents;
	d.subscribe("afterApplicationInit", function(e, f) {
		a.renderKeyrings(e, f)
	});
	d.subscribe("showKeyitemCreate", function() {
		a.showAddKeyitem()
	});
	d.subscribe("showKeyitemEdit", function(e) {
		a.showEditKeyitem(e)
	});
	d.subscribe("showKeyitem", function(e) {
		a.showKeyitem(e)
	});
	d.subscribe("addKeyitemFinished", function(e) {
		a.handleAddKeyitemFinished(e)
	});
	d.subscribe("editKeyitemFinished", function(e) {
		a.handleEditKeyitemFinished(e)
	});
	d.subscribe("deleteKeyring", function(e) {
		a.reactToKeyringItemDelete(e)
	});
	d.subscribe("saveKeyitemOrder", function(e) {
		a.saveKeyitemOrder(e)
	});
	this.createKeyring = function(e, f, l, m) {
		var p = {};
		p.id = this.createGuid();
		p.url = "";
		if (typeof e == "string")
			p.url = e;
		p.label = "";
		if (typeof f == "string")
			p.label = f;
		p.username = "";
		if (typeof l == "string")
			p.username = l;
		p.password = "";
		if (typeof m == "string")
			p.password = m;
		return p
	};
	this.addKeyring = function(e) {
		if (!this.isValidKeyring(e))
			return false;
		if (null == b)
			b = [];
		b.push(e);
		return true
	};
	this.createAndAdd = function(e, f, l, m) {
		return this.addKeyring(this.createKeyring(e, f, l, m))
	};
	this.isValidKeyring = function(e) {
		if (!e.id || "" == e.url || "" == e.label)
			return false;
		return true
	};
	this.isValidKeyringData = function(e, f) {
		if ("" == e || "" == f)
			return false;
		return true
	};
	this.replaceKeyring = function(e) {
		if (!this.isValidKeyring(e))
			return false;
		var f = this.getIndexOfKeyringById(e.id);
		b.splice(f, 1, e);
		return b
	};
	this.deleteKeyring = function(e) {
		return this.deleteKeyringById(e.id)
	};
	this.deleteKeyringById = function(e) {
		e = this.getIndexOfKeyringById(e);
		if (e >= 0) {
			b.splice(e, 1);
			return true
		}
		return false
	};
	this.getIndexOfKeyringById = function(e) {
		for ( var f in b)
			if (e == b[f].id)
				return f;
		return -1
	};
	this.getKeyringById = function(e) {
		e = this.getIndexOfKeyringById(e);
		if (e >= 0)
			return b[e];
		return null
	};
	this.S4 = function() {
		return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
	};
	this.createGuid = function() {
		return "z" + this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4()
				+ "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()
	};
	this.getKeyrings = function() {
		if (null === b || b.length < 1)
			this.loadKeyrings();
		return b
	};
	this.loadKeyrings = function() {
		var e = (new UserSettingsCrypt).get("keyringManager");
		if (null !== e)
			b = e
	};
	this.saveKeyrings = function() {
		(new UserSettingsCrypt).set("keyringManager", b)
	};
	this.renderKeyrings = function() {
		(new KeyringManagerView).show(this.getKeyrings());
		(new FaviconManager).getFaviconsForAllBookmarks(this.getKeyrings())
	};
	this.showAddKeyitem = function() {
		(new KeyringManagerConfigView).showAddDialog(allyve.keyringmanager
				.editKeyitemTitle())
	};
	this.showEditKeyitem = function(e) {
		e = this.getKeyringById(e);
		(new KeyringManagerConfigView).showEditDialog(allyve.keyringmanager
				.editKeyitemTitle(), e)
	};
	this.showKeyitem = function(e) {
		e = this.getKeyringById(e);
		(new KeyringItemView).showItemDialog(allyve.keyringmanager
				.showKeyitemTitle(), e)
	};
	this.handleAddKeyitemFinished = function(e) {
		this.createAndAdd(e.url, e.label, e.username, e.password);
		this.saveKeyrings();
		this.renderKeyrings()
	};
	this.handleEditKeyitemFinished = function(e) {
		this.replaceKeyring(e);
		this.saveKeyrings();
		this.renderKeyrings()
	};
	this.reactToKeyringItemDelete = function(e) {
		this.deleteKeyringById(e);
		this.saveKeyrings();
		this.renderKeyrings()
	};
	this.saveKeyitemOrder = function() {
		var e = a.getOrderFromLayout("keyringManagerItem");
		a.reOrderKeyitems(e);
		a.saveKeyrings()
	};
	this.getOrderFromLayout = function(e) {
		return $.map($("." + e), function(f) {
			return f.id
		})
	};
	this.reOrderKeyitems = function(e) {
		var f = [];
		$.each(e, function() {
			var l = this;
			$.each(b, function() {
				this.id == l && f.push(this)
			})
		});
		b = f
	}
};
function KeyringManager() {
	if (KeyringManager.instance !== undefined)
		return KeyringManager.instance;
	KeyringManager.instance = this
}
KeyringManager.prototype = new KeyringManagerBase;
KeyringManager.constructor = KeyringManager;
function KeyringManagerViewBase() {
	var a = this, b = new AllyveEvents;
	$("#widget_container").prepend(allyve.widgets.renderHeadline());
	this.renderKeyrings = function(d, e) {
		$("#" + d).html("");
		$("#" + d).append(allyve.keyringmanager.renderHeadline());
		$("#" + d).append('<div id="' + d + '_content"></div>');
		for (index in e) {
			$("#" + d + "_content").append(
					allyve.keyringmanager.renderKeyring({
						keyring : e[index]
					}));
			this.attachClickHandlers(e[index].id, e[index].url)
		}
		$("#" + d).append(allyve.keyringmanager.renderAddKeyring());
		$("#addKeyring").click(function() {
			b.registerEvent("showKeyitemCreate");
			b.raiseEvent("showKeyitemCreate", null)
		});
		b.registerEvent("deleteKeyring");
		$("#" + d + "_content").sortable({
			handle : ".keyringManagerDragHandle",
			stop : function() {
				b.registerEvent("saveKeyitemOrder");
				b.raiseEvent("saveKeyitemOrder", null)
			}
		})
	};
	this.attachClickHandlers = function(d, e) {
		a.attachClickHandlerOpenUrl(d, e);
		a.attachClickHandlerDelete(d, e);
		a.attachClickHandlerEdit(d)
	};
	this.attachClickHandlerOpenUrl = function(d) {
		$("#" + d + "_keyringManagerIcon, #" + d + "_keyringManagerLabel")
				.click(function() {
					b.registerEvent("showKeyitem");
					b.raiseEvent("showKeyitem", d)
				})
	};
	this.attachClickHandlerDelete = function(d) {
		$("#" + d + "_keyringManagerDeleteButton").click(function() {
			a.deleteDialog(d)
		})
	};
	this.attachClickHandlerEdit = function(d) {
		$("#" + d + "_keyringManagerConfigButton").click(function() {
			b.raiseEvent("showKeyitemEdit", d)
		})
	};
	this.deleteDialog = function(d) {
		alertDialog = new AlertDialog;
		alertDialog.buttons.Ja = function() {
			b.raiseEvent("deleteKeyring", d);
			$(this).dialog("close")
		};
		alertDialog.show(allyve.keyringmanager.renderDeleteKeyring())
	};
	this.isUrl = function(d) {
		return /^(gopher|news|nntp|telnet|http|ftp|https|ftps|sftp):\/\//
				.test(d)
	};
	this.show = function(d) {
		this.renderKeyrings("keyringManager", d);
		$("#rightColumn").show()
	}
};
function KeyringManagerView() {
}
KeyringManagerView.prototype = new KeyringManagerViewBase;
KeyringManagerView.constructor = KeyringManagerView;
function KeyringManagerConfigViewBase() {
	this.showDialog = function(a, b) {
		var d = this, e = b ? b.url : "", f = b ? b.label : "", l = b ? b.username
				: "";
		b = b ? b.password : "";
		this.setDialogClass("simpleDialog keyringManagerConfigDialog");
		this.setWidth(430);
		this.showTemplate(allyve.keyringmanager.renderKeyitemEdit({
			title : a,
			url : e,
			name : f,
			username : l,
			password : b
		}));
		$("#url_field").focus();
		$("#itemEditForm").validate({
			rules : {
				url : {
					required : true
				},
				url_name : {
					required : true
				}
			},
			messages : {
				url : {
					required : jQuery.format("Bitte ausf\u00fcllen.")
				},
				url_name : {
					required : jQuery.format("Bitte ausf\u00fcllen.")
				}
			},
			submitHandler : function() {
				d.finishDialog();
				$("#simpleDialog").dialog("close");
				return false
			}
		})
	};
	this.finishDialog = function() {
		var a = {};
		a.url = $("#url_field").val();
		a.label = $("#name_field").val();
		a.username = $("#username_field").val();
		a.password = $("#password_field").val();
		if (this.item) {
			a.id = this.item.id;
			this.eventHandler.registerEvent("editKeyitemFinished");
			this.eventHandler.raiseEvent("editKeyitemFinished", a)
		} else {
			this.eventHandler.registerEvent("addKeyitemFinished");
			this.eventHandler.raiseEvent("addKeyitemFinished", a)
		}
	}
}
KeyringManagerConfigViewBase.prototype = new ItemManagerConfigViewBase;
KeyringManagerConfigViewBase.constructor = KeyringManagerConfigViewBase;
function KeyringManagerConfigView() {
}
KeyringManagerConfigView.prototype = new KeyringManagerConfigViewBase;
KeyringManagerConfigView.constructor = KeyringManagerConfigView;
function KeyringItemViewBase() {
	var a = this, b = false;
	this.showItemDialog = function(d, e) {
		keyitem = e;
		this.showDialog(d, keyitem.url, keyitem.label, keyitem.username,
				keyitem.password)
	};
	this.showDialog = function(d, e, f, l, m) {
		this.setDialogClass("simpleDialog keyringManagerConfigDialog");
		this.setWidth(480);
		this.showTemplate(allyve.keyringmanager.renderKeyitemShow({
			title : d,
			url : e,
			name : f,
			username : l,
			password : m
		}));
		$("#togglePasswordButton").click(function() {
			a.togglePassword()
		})
	};
	this.loadButtonsOk = function() {
		return {
			"Weiter zur Seite" : function() {
				a.okClicked()
			}
		}
	};
	this.okClicked = function() {
		isUrl(keyitem.url) ? window.open(keyitem.url, "_blank") : window.open(
				"http://" + keyitem.url, "_blank");
		$("#simpleDialog").dialog("close")
	};
	this.togglePassword = function() {
		if (b = !b) {
			$("#password_field").hide();
			$("#password_field_text").show();
			$("#password_field_text").select();
			$("#togglePasswordButton").text(
					allyve.keyringmanager.btnHidePassword())
		} else {
			$("#password_field").show();
			$("#password_field_text").hide();
			$("#togglePasswordButton").text(
					allyve.keyringmanager.btnShowPassword())
		}
	}
}
KeyringItemViewBase.prototype = new KeyringManagerConfigViewBase;
KeyringItemViewBase.constructor = KeyringItemViewBase;
function KeyringItemView() {
}
KeyringItemView.prototype = new KeyringItemViewBase;
KeyringItemView.constructor = KeyringItemView;
function EnterPinForm() {
	this.eventHandler = new AllyveEvents;
	this.item = null;
	this.showDialog = function(a) {
		var b = this;
		this.setDialogClass("alertBox");
		this.setWidth(430);
		this.showTemplate(allyve.mandant.enterPinDialog({
			remainingPinTrys : a
		}));
		(new VirtualKeyboardView).render($("#virtKeyboardContainer"),
				$("#pin_field"));
		$("#enterPinForm")
				.validate(
						{
							rules : {
								pin : {
									required : true,
									rangelength : [ 6, 6 ],
									number : true
								}
							},
							messages : {
								pin : {
									required : jQuery
											.format("Bitte ausf\u00fcllen."),
									rangelength : jQuery
											.format("Die Pin muss 6 Stellen lang sein."),
									number : jQuery
											.format("Es sind nur Zahlen zul\u00e4ssig.")
								}
							},
							submitHandler : function() {
								b.finishDialog();
								return false
							}
						});
		$("#pin_field").focus()
	};
	this.onClose = function() {
		$(EnterPinForm).trigger("pinFormClose")
	};
	this.loadButtons = function() {
		return this.loadButtonsOk()
	};
	this.loadButtonsOk = function() {
		var a = this;
		return {
			OK : function() {
				a.okClicked()
			},
			Abbrechen : function() {
				a.cancelClicked()
			}
		}
	};
	this.okClicked = function() {
		$("#enterPinForm").submit()
	};
	this.cancelClicked = function() {
		this.eventHandler.registerEvent("enterPinCancelClicked");
		this.eventHandler.raiseEvent("enterPinCancelClicked")
	};
	this.finishDialog = function() {
		var a = $("#pin_field").val();
		this.eventHandler.registerEvent("pinSubmitted");
		this.eventHandler.raiseEvent("pinSubmitted", a)
	}
}
EnterPinForm.prototype = new SimpleDialog;
EnterPinForm.constructor = EnterPinForm;
function EnterCardPin() {
	if (EnterCardPin.instance !== undefined)
		return EnterCardPin.instance;
	EnterCardPin.instance = this;
	var a = this, b = null, d = null, e = new AllyveEvents, f = function(l, m) {
		a.callLogin(l)
	};
	this.showPinForm = function(l, m) {
		e.subscribe("pinSubmitted", f);
		e.subscribe("enterPinCancelClicked", a.cancelCallback);
		$(EnterPinForm).bind("pinFormClose", a.hide);
		this.initCardEvents(m);
		b = new EnterPinForm;
		b.showDialog(l)
	};
	this.callLogin = function(l) {
		b.close();
		e.unsubscribe("pinSubmitted", f);
		e.unsubscribe("enterPinCancelClicked", a.hide);
		OWOKPlugin.loginLight(l, OwokConfig.AutoLogout)
	};
	this.initCardEvents = function(l) {
		$(OWOKPlugin).unbind("owokCardWasRemoved", a.cardWasRemoved);
		$(OWOKPlugin).bind("owokCardWasRemoved", a.cardWasRemoved);
		d = l
	};
	this.cardWasRemoved = function() {
		OWOKPlugin.disableEvents();
		a.hide();
		if (typeof d == "function") {
			d();
			d = null
		}
	};
	this.hide = function() {
		OWOKPlugin.disableEvents();
		$(OWOKPlugin).unbind("owokCardWasRemoved", a.cardWasRemoved);
		$(EnterPinForm).unbind("pinFormClose", a.hide);
		e.unsubscribe("pinSubmitted", function(l, m) {
			a.callLogin(l)
		})
	};
	this.cancelCallback = function() {
		b.close();
		a.hide()
	}
};
function ActivationHintDialogBase() {
	var a = this;
	this.dialogClass = "alertBox";
	this.buttons = {
		OK : function() {
			$(this).dialog("close")
		}
	};
	this.setButtons = function(b) {
		this.buttons = b
	};
	this.show = function() {
		$("#simpleDialogContent").html(allyve.modaldialog.activationHint());
		$("#simpleDialog").dialog({
			modal : true,
			buttons : a.buttons,
			dialogClass : a.dialogClass,
			width : 400,
			position : "center",
			height : "auto"
		})
	}
}
ActivationHintDialogBase.prototype = new SimpleDialog;
ActivationHintDialogBase.constructor = ActivationHintDialogBase;
function ActivationHintDialog() {
	function a() {
		b.registerEvent("btnDisconnectNpaClicked");
		b.registerEvent("btnDisconnectLoginCardClicked");
		$("#btnDisconnectNpa").click(function() {
			b.raiseEvent("btnDisconnectNpaClicked");
			return false
		});
		$("#btnDisconnectLoginCard").click(function() {
			b.raiseEvent("btnDisconnectLoginCardClicked");
			return false
		})
	}
	var b = new AllyveEvents;
	this.showDialog = function(d) {
		this.setWidth(430);
		this.showTemplate(allyve.mandant.activationHint({
			email : d
		}));
		a()
	};
	this.onClose = function() {
		b.registerEvent("activationHintDialogClosed");
		b.raiseEvent("activationHintDialogClosed")
	}
}
ActivationHintDialog.prototype = new ActivationHintDialogBase;
ActivationHintDialog.constructor = ActivationHintDialog;
function ActivationHintController() {
	function a() {
		d.subscribe("activationHintDialogClosed", p);
		d.subscribe("btnDisconnectNpaClicked", f);
		d.subscribe("btnDisconnectLoginCardClicked", m)
	}
	function b() {
		d.unsubscribe("activationHintDialogClosed", p);
		d.unsubscribe("btnDisconnectNpaClicked", f);
		d.unsubscribe("btnDisconnectLoginCardClicked", m)
	}
	var d = new AllyveEvents, e = null;
	this.showDialog = function(v) {
		b();
		if (e == null)
			e = new ActivationHintDialog;
		e.showDialog(v);
		a()
	};
	this.close = function() {
		e != null && e.close()
	};
	var f = function() {
		e.close();
		showAlertOk(allyve.mandant.npaDeactivationStart(), allyve.i18n
				.titleHint(), l)
	}, l = function() {
		$(this).dialog("close");
		window.open("/api/eid/init_disconnectcard", "eIdConnect",
				"menubar=0,resizable=1,width=650,height=470")
	}, m = function() {
		e.close();
		(new OwokStatusCheck).prepareCardDisconnect()
	}, p = function() {
		b()
	}
}
ActivationHintController.prototype = new ActivationHintController;
ActivationHintController.constructor = ActivationHintController;
function AddCardToAccountForm() {
	var a = new AllyveEvents;
	a.registerEvent("addCardToAccountSubmitted");
	this.item = null;
	this.showDialog = function() {
		var b = this;
		this.setDialogClass("simpleDialog ");
		this.setWidth(430);
		this.showTemplate(allyve.mandant.addCardToAccount());
		$("#addCardToAccountForm").validate({
			rules : {
				password : {
					required : true
				}
			},
			messages : {
				password : {
					required : jQuery.format("Bitte ausf\u00fcllen.")
				}
			},
			submitHandler : function() {
				b.finishDialog();
				return false
			}
		});
		$("#addCardToAccountForm_password").focus()
	};
	this.onClose = function() {
	};
	this.loadButtons = function() {
		var b = this;
		return {
			OK : function() {
				b.okClicked()
			},
			Abbrechen : function() {
				b.cancelClicked()
			}
		}
	};
	this.okClicked = function() {
		this.hideError();
		this.hideVerifyPassword();
		$("#addCardToAccountForm").submit()
	};
	this.cancelClicked = function() {
		a.registerEvent("addCardCancelClicked");
		a.raiseEvent("addCardCancelClicked")
	};
	this.finishDialog = function() {
		var b = $("#addCardToAccountForm_password").val();
		a.raiseEvent("addCardToAccountSubmitted", b)
	};
	this.showError = function() {
		$("#addCardToAccountError").show()
	};
	this.hideError = function() {
		$("#addCardToAccountError").hide()
	};
	this.showVerifyPassword = function() {
		$("#pleaseCheckPassword").show()
	};
	this.hideVerifyPassword = function() {
		$("#pleaseCheckPassword").hide()
	}
}
AddCardToAccountForm.prototype = new SimpleDialog;
AddCardToAccountForm.constructor = AddCardToAccountForm;
function AddCardToAccount() {
	if (AddCardToAccount.instance !== undefined)
		return AddCardToAccount.instance;
	AddCardToAccount.instance = this;
	var a = this, b = null, d = new AllyveEvents;
	d.subscribe("addCardToAccountSubmitted", function(f) {
		a.callAddCardToAccount(f)
	});
	d.subscribe("addCardToAccountOk", function(f) {
		a.addCardToAccountOk(f)
	});
	d.subscribe("addCardToAccountFail", function(f) {
		a.addCardToAccountFail(f)
	});
	d.subscribe("owokCardWasRemoved", function() {
		a.hide()
	});
	d.subscribe("addCardCancelClicked", function() {
		e()
	});
	this.showForm = function() {
		b = new AddCardToAccountForm;
		b.showDialog()
	};
	this.callAddCardToAccount = function(f) {
		OWOKPlugin.mcAddCardToUser(f)
	};
	this.hide = function() {
		b && b.close()
	};
	var e = function() {
		a.hide();
		d.registerEvent("addLoginCardSuccess");
		d.raiseEvent("addLoginCardSuccess")
	};
	this.addCardToAccountOk = function() {
		this.hide();
		showAlertOk(allyve.mandant.addCardToAccountSuccess(), null, e)
	};
	this.addCardToAccountFail = function(f) {
		if (f && f.responseText)
			403 == f.status ? b.showVerifyPassword() : b.showError();
		else {
			this.hide();
			showAlertOk(allyve.mandant.addCardToAccountFail(), null, e)
		}
	}
};
function ConfirmCardDeactivationForm() {
	var a = this;
	this.eventHandler = new AllyveEvents;
	this.item = null;
	this.showDialog = function() {
		var b = this;
		this.setDialogClass("alertBox");
		this.setWidth(430);
		$("#simpleDialogContent").html(
				allyve.mandant.confirmCardDeactivationForm());
		this.renderDialog();
		$("#enterPinForm")
				.validate(
						{
							rules : {
								pin : {
									required : true,
									rangelength : [ 6, 6 ],
									number : true,
									owokLightCardAvailable : true
								}
							},
							messages : {
								pin : {
									required : jQuery
											.format("Bitte ausf\u00fcllen."),
									rangelength : jQuery
											.format("Die Pin muss 6 Stellen lang sein."),
									number : jQuery
											.format("Es sind nur Zahlen zul\u00e4ssig.")
								}
							},
							submitHandler : function() {
								b.finishDialog();
								return false
							}
						});
		$("#pin_field").focus()
	};
	this.loadButtons = function() {
		return this.loadButtonsOk()
	};
	this.loadButtonsOk = function() {
		var b = this;
		return {
			OK : function() {
				b.okClicked()
			}
		}
	};
	this.okClicked = function() {
		$("#enterPinForm").submit()
	};
	this.onClose = function() {
		this.eventHandler.registerEvent("confirmDelete.closeDialog");
		this.eventHandler.raiseEvent("confirmDelete.closeDialog");
		a.clearHistory()
	};
	this.finishDialog = function() {
		var b = $("#pin_field").val();
		this.eventHandler.registerEvent("confirmDelete.pinSubmitted");
		this.eventHandler.raiseEvent("confirmDelete.pinSubmitted", b)
	};
	this.renderDialog = function() {
		$(".ui-widget-overlay").height(0);
		$("#simpleDialog").dialog({
			modal : true,
			position : this.position,
			width : this.width,
			buttons : this.loadButtons(),
			dialogClass : this.dialogClass,
			close : function(b, d) {
				a.onClose(b, d)
			},
			open : function(b, d) {
				a.onOpen(b, d)
			},
			focus : function(b, d) {
				a.onFocus(b, d)
			}
		});
		window.setTimeout(function() {
			a.adjustOverlaySize()
		}, 100)
	}
}
ConfirmCardDeactivationForm.prototype = new SimpleDialog;
ConfirmCardDeactivationForm.constructor = ConfirmCardDeactivationForm;
function ConfirmCardDeactivation() {
	if (ConfirmCardDeactivation.instance !== undefined)
		return ConfirmCardDeactivation.instance;
	ConfirmCardDeactivation.instance = this;
	var a = this, b = null, d = false, e = new AllyveEvents;
	this.unregister = function() {
	};
	this.showPinForm = function() {
		var f = this;
		d = true;
		e.subscribe("confirmDelete.pinSubmitted", function(l) {
			f.callSuccess(l)
		});
		e.subscribe("confirmDelete.closeDialog", function(l) {
			f.hidePinForm(l)
		});
		b = new ConfirmCardDeactivationForm;
		b.showDialog();
		this.confirmCardDeactivation_lightCardInserted = function() {
			$("#confirmCardDeactivationForm_giveCard").hide();
			$("#confirmCardDeactivationForm_watchReader").hide();
			$("#confirmCardDeactivationForm_lightPin_field").attr("value", "");
			$("#confirmCardDeactivationForm_lightPin").show();
			f.unregister = function() {
				OWOKPlugin.prepareLoginLight($(
						"#confirmCardDeactivationForm_lightPin_field").val())
			}
		};
		this.confirmCardDeactivation_owokCardInserted = function() {
			$("#confirmCardDeactivationForm_giveCard").hide();
			$("#confirmCardDeactivationForm_lightPin").hide();
			$("#confirmCardDeactivationForm_watchReader").show();
			$("#confirmCardDeactivationForm_watchReader_triesLeft").text(
					OWOKPlugin.getPinTriesLeft());
			$("#confirmCardDeactivationForm_lightPin_field").attr("value",
					"000000");
			f.unregister = function() {
				OWOKPlugin.prepareLoginOwokCard()
			}
		};
		this.confirmCardDeactivation_cardRemoved = function() {
			OWOKPlugin.disableEvents();
			f.hide();
			f.unregister = function() {
			};
			showAlertOk(allyve.mandant.cardDeactivationCardRemoved())
		};
		if (OWOKPlugin.getCardId() != "")
			this.confirmCardDeactivation_owokCardInserted();
		else
			OWOKPlugin.getLightCardId() != "" ? this
					.confirmCardDeactivation_lightCardInserted() : this
					.confirmCardDeactivation_cardRemoved();
		$(OWOKPlugin).bind("owokLightCardWasInserted",
				this.confirmCardDeactivation_lightCardInserted);
		$(OWOKPlugin).bind("owokSmartcardWasInserted",
				this.confirmCardDeactivation_owokCardInserted);
		$(OWOKPlugin).bind("owokCardWasRemoved",
				this.confirmCardDeactivation_cardRemoved)
	};
	this.callSuccess = function() {
		$(document).unbind("meincockpit.prepareLightLogin");
		$(document).unbind("meincockpit.prepareOwokCardLogin");
		var f = new Account;
		$(document).bind("meincockpit.prepareLightLogin", function(l, m, p) {
			f.owokLightUnregister(l, m, p)
		});
		$(document)
				.bind(
						"meincockpit.prepareOwokCardLogin",
						function(l, m, p) {
							if (m == -1) {
								$(
										"#confirmCardDeactivationForm_watchReader_triesLeft")
										.text(p);
								$(
										"#confirmCardDeactivationForm_watchReader_triesLeft_text")
										.css("color", "red")
							} else
								f.owokUnregister(l, m)
						});
		this.unregister()
	};
	this.isActive = function() {
		return d
	};
	this.hidePinForm = function() {
		d = false;
		$(OWOKPlugin).unbind("owokLightCardWasInserted",
				this.confirmCardDeactivation_lightCardInserted);
		$(OWOKPlugin).unbind("owokSmartcardWasInserted",
				this.confirmCardDeactivation_owokCardInserted);
		$(OWOKPlugin).unbind("owokCardWasRemoved",
				this.confirmCardDeactivation_cardRemoved)
	};
	this.hide = function() {
		e.unsubscribe("confirmDelete.pinSubmitted", function(f) {
			a.callSuccess(f)
		});
		e.subscribe("confirmDelete.closeDialog", function(f) {
			a.hidePinForm(f)
		});
		b && b.close()
	}
};
function RegisterWithOlpsDialog() {
	var a = this, b = new AllyveEvents;
	this.dialogClass = "alertBox";
	this.buttons = {
		Fertig : function() {
			b.raiseEvent("registerWithOlpsDone")
		},
		"Karte initialisieren" : function() {
			b.raiseEvent("registerWithOlpsSubmit")
		}
	};
	this.setButtons = function(d) {
		this.buttons = d
	};
	this.show = function() {
		$("#simpleDialogContent").html(allyve.mandant.registerWithOlps());
		$("#simpleDialog").dialog({
			modal : true,
			buttons : a.buttons,
			dialogClass : a.dialogClass,
			width : 500,
			position : "center",
			height : "auto",
			close : function() {
				b.raiseEvent("registerWithOlpsClose")
			}
		})
	}
}
RegisterWithOlpsDialog.prototype = new SimpleDialog;
RegisterWithOlpsDialog.constructor = RegisterWithOlpsDialog;
function RegisterWithOlps() {
	if (RegisterWithOlps.instance !== undefined)
		return RegisterWithOlps.instance;
	RegisterWithOlps.instance = this;
	var a = this, b = null, d = null, e = "", f = "http://www.reiner-sct.com/cardlogin", l = "http://www.reiner-sct.com/cardlogin";
	if ("meincockpit,test,testapp1,testapp2".indexOf(global_serverName) >= 0) {
		l = "http://dev.reiner-sct.com/demos/olcms";
		f = "http://www.reiner-sct.com/cardlogin"
	}
	var m = new AllyveEvents;
	m.subscribe("registerWithOlpsSubmit", function(p) {
		a.callRegisterWithOlps(p)
	});
	m.subscribe("registerWithOlpsDone", function(p) {
		a.callRegisterWithOlpsDone(p)
	});
	m.subscribe("registerWithOlpsClose", function(p) {
		a.callRegisterWithOlpsClose(p)
	});
	this.show = function(p, v) {
		e = p == true ? l : f;
		$(OWOKPlugin).unbind("owokCardWasRemoved", a.callRegisterWithOlpsDone);
		$(OWOKPlugin).bind("owokCardWasRemoved", a.callRegisterWithOlpsDone);
		OWOKPlugin.enableEvents();
		b = new RegisterWithOlpsDialog;
		d = v;
		b.show()
	};
	this.callRegisterWithOlps = function() {
		OWOKPlugin.disableEvents();
		OWOKPlugin.disConnectCard(OWOKPlugin.getConnectedReaderName());
		OWOKPlugin.reset();
		window
				.open(e, "securewindow",
						"toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=1020,height=850");
		return false
	};
	this.callRegisterWithOlpsDone = function() {
		OWOKPlugin.disableEvents();
		a.hide();
		typeof d == "function" && d()
	};
	this.callRegisterWithOlpsClose = function() {
		OWOKPlugin.disableEvents();
		$(OWOKPlugin).unbind("owokCardWasRemoved", a.callRegisterWithOlpsDone)
	};
	this.hide = function() {
		b && b.close()
	}
};
function LoginCardMoreInfo() {
	var a = this;
	new AllyveEvents;
	this.dialogClass = "simpleDialog";
	this.buttons = {
		Ok : function() {
			$(this).dialog("close")
		}
	};
	this.setButtons = function(b) {
		this.buttons = b
	};
	this.show = function() {
		$("#simpleDialogContent").html(allyve.mandant.loginCardMoreInfos());
		$("#simpleDialog").dialog({
			modal : true,
			buttons : a.buttons,
			dialogClass : a.dialogClass,
			width : 870,
			position : "center",
			height : "auto"
		})
	}
}
LoginCardMoreInfo.prototype = new SimpleDialog;
LoginCardMoreInfo.constructor = LoginCardMoreInfo;
jQuery.validator.addMethod("owokLightCardAvailable", function() {
	if (OWOKPlugin.getCardStatus() == OWOKPlugin.CARD_STATUS_NO_CARD)
		return false;
	return true
}, "Bitte legen Sie Ihre Karte ein");
function WidgetData() {
	function a(f) {
		if (f == null || isNaN(f))
			return f;
		return f.replace(".", ",")
	}
	function b(f, l) {
		var m = l;
		if (d(l))
			l = e(l);
		switch (f) {
		case 10019:
			productLink = "urls/home";
			break;
		case 10044:
			productLink = "urlAff/" + l;
			break;
		case 10043:
			productLink = "urls/prodlink/" + l;
			break;
		case 10045:
			productLink = l;
			break;
		case 10050:
			f = m.indexOf("page=");
			productLink = "urlRss/"
					+ (encodeURIComponent(m.slice(0, f + 5)) + encodeURIComponent(encodeURIComponent(m
							.slice(f + 5))));
			break;
		default:
			productLink = "urlRss/" + l
		}
		return productLink
	}
	function d(f) {
		if (!f)
			return false;
		if (0 == f.indexOf("http"))
			return true;
		return false
	}
	function e(f) {
		if (!f)
			return "";
		return encodeURIComponent(f)
	}
	this.uid = this.widgetId = this.uniqueId = this.data = null;
	this.init = function(f) {
		this.initData(f);
		this.initValues()
	};
	this.initData = function(f) {
		this.data = f;
		this.uniqueId = f.id;
		this.widgetId = f.widgetId
	};
	this.initValues = function() {
		this.urls = Array();
		this.values = Array();
		this.tips = Array();
		this.valueMap = Array();
		this.widgetTitle = null;
		this.mapValues()
	};
	this.getUniqueId = function() {
		return this.uniqueId
	};
	this.getWidgetId = function() {
		return this.widgetId
	};
	this.buildUrls = function() {
	};
	this.mapValues = function() {
		var f = this;
		f.homeUrl = "urlHome";
		f.data.values
				&& $
						.each(
								f.data.values,
								function(l, m) {
									l = m.name;
									m = m.value;
									var p = null;
									if (l.indexOf("homepage") == 0)
										f.homeUrl = m;
									else if (l.indexOf("Home") > 0)
										f.homeUrl = l;
									else if (l.indexOf("url_") == 0) {
										p = [ Number(l.substring(l.length,
												l.length - 1)) ];
										if (isNaN(p))
											f.urls["url_" + l.substring(4)] = l;
										else if (m)
											f.urls[p] = m.indexOf("urls/") == 0 ? m
													: l
									} else if (l.indexOf("value_") == 0) {
										p = [ Number(l.substring(l.length,
												l.length - 1)) ];
										f.values[p] = m
									} else if (l.indexOf("tip_") == 0) {
										p = [ Number(l.substring(l.length,
												l.length - 1)) ];
										f.tips[p] = m
									} else if (l == "name" || l == "location"
											|| l == "feedName") {
										f.widgetTitle = m;
										f.uid = m
									} else if (l == "productPriceOld_0"
											|| l == "productPrice_0")
										f.valueMap[l] = a(m);
									else if (l == "productLink_0")
										f.valueMap[l] = m != null ? b(f
												.getWidgetId(), m, f.valueMap)
												: f.valueMap.productId_0 != null ? b(
														f.getWidgetId(),
														f.valueMap.productId_0)
														: b(f.getWidgetId(), "");
									else if (l.indexOf("rssentry#") == 0
											&& l.indexOf("#desc") > 0)
										f.valueMap[l] = shortenWithLength(
												stripHTML(m), 500);
									else if (l.indexOf("book") == 0) {
										f.valueMap[l] = m;
										m = m
												.replace(
														/^(gopher|news|nntp|telnet|http|ftp|https|ftps|sftp):\/\//,
														"");
										m = m.replace(/^(www\.)/, "");
										f.valueMap[l + "_display"] = m
									} else
										f.valueMap[l] = replaceUmlauts(m)
								})
	}
};
function Widgets(a, b, d) {
	var e = this, f = 0;
	this.widgetData = Array();
	this.settings = a;
	this.widgetOrder = Array();
	this.renderer = b;
	this.widgetInfos = d;
	var l = new AllyveEvents;
	this.init = function() {
		(new WidgetsDataApi).getData(m, p)
	};
	var m = function(A) {
		e.buildWidgetDatas(A.widgets)
	}, p = function(A, M) {
		c.l("could not get widget data: " + M)
	};
	this.refresh = function(A) {
		var M = new WidgetsDataApi;
		A ? M.getUpdatedData(v, y) : M.getRecentlyUpdatedData(v, y)
	};
	var v = function(A) {
		A && e.refreshWidgetDatas(A.widgets)
	}, y = function(A, M) {
		c.l("could not get updated widget data: " + M);
		window.location.reload()
	};
	this.getWidgetDataForUniqeId = function(A) {
		return this.widgetData[A]
	};
	this.buildWidgetDatas = function(A) {
		$.each(A, function(M, D) {
			e.addWidget(D)
		});
		this.initWidgetOrder();
		$.each(e.widgetOrder, function(M, D) {
			if (widget = e.widgetData[D]) {
				e.renderer.renderSingle(widget);
				e.renderer.setTvTabs(widget)
			} else
				c.l("Fehler in 'widgetorder', zuviel: " + D)
		})
	};
	this.initWidgetOrder = function() {
		var A = false;
		this.getWidgetOrder();
		$.each(e.widgetData, function(M, D) {
			if (D)
				if (e.indexOf(e.widgetOrder, D.uniqueId) == -1) {
					e.widgetOrder.push(D.uniqueId);
					A = true
				}
		});
		A && e.saveWidgetOrder(true)
	};
	this.indexOf = function(A, M) {
		for (index in A)
			if (A[index] == M)
				return index;
		return -1
	};
	this.getWidgetOrder = function() {
		var A = this.settings.get("widget_order");
		if (A)
			e.widgetOrder = A.split(",")
	};
	this.saveWidgetOrder = function(A) {
		if (!A) {
			e.widgetOrder = $.map($(".widget"), function(M) {
				return M.id.substring(7)
			});
			e.widgetOrder = eliminateDuplicates(e.widgetOrder)
		}
		a.set("widget_order", e.widgetOrder.join(","))
	};
	this.addWidget = function(A) {
		var M = new WidgetData;
		M.init(A);
		e.widgetData[M.getUniqueId()] = M;
		if (A = e.widgetInfos.getWidgetinfoByWidgetId(M.widgetId)) {
			f++;
			this.checkWidgetCount();
			l.raiseEvent(l.AFTER_WIDGET_ADD, {
				uniqueId : M.uniqueId,
				widgetId : M.widgetId,
				widgetName : A.getName()
			});
			return M
		} else
			return null
	};
	this.deleteWidget = function(A) {
		if (widgetsetup.remove(A)) {
			this.renderer.remove(A);
			var M = this.getWidgetDataForUniqeId(A), D = this.widgetInfos
					.getWidgetName(M.widgetId);
			delete this.widgetData[A];
			this.saveWidgetOrder();
			f--;
			l.raiseEvent(l.AFTER_WIDGET_DELETE, {
				uniqueId : A,
				widgetId : M.widgetId,
				widgetName : D
			});
			this.checkWidgetCount()
		}
	};
	this.insertWidget = function(A) {
		if (A.replaceId)
			this.replaceWidget(A);
		else {
			var M = this, D = M.addWidget(A);
			M.renderer.renderSingle(D);
			M.renderer.applyUiTweaks();
			M.renderer.setTvTabs(D);
			M.saveWidgetOrder();
			$("#widget_container").attr("last_uniqueid", A.id)
		}
	};
	this.replaceWidget = function(A) {
		var M = A.replaceId;
		delete A.replaceId;
		delete e.widgetData[M];
		A = e.addWidget(A);
		e.renderer.replaceSingle(M, A);
		widgetsetup.remove(M);
		e.renderer.applyUiTweaks();
		e.renderer.setTvTabs(A);
		e.saveWidgetOrder()
	};
	this.refreshWidgetDatas = function(A) {
		if (A) {
			var M = this;
			$.each(A, function(D, s) {
				M.updateWidget(s)
			});
			M.renderer.applyUiTweaks()
		}
	};
	this.updateWidget = function(A) {
		var M = e.widgetData[A.id];
		if (typeof M != "undefined") {
			M.init(A);
			e.renderer.updateSingle(M);
			e.renderer.setTvTabs(M)
		}
	};
	this.getWidgetCount = function() {
		return f
	};
	this.checkWidgetCount = function() {
		f >= 50 ? oAllyve.disableCatalogButton() : oAllyve
				.enableCatalogButton()
	};
	this.getStockBaskets = function() {
		if (oAllyve.readFromCache("basketNamesList"))
			return oAllyve.readFromCache("basketNamesList");
		var A = null;
		(new ActionsApi).getStockBasketNames(function(M) {
			var D = [];
			$(M).find("value").each(function() {
				var s = {};
				s.name = $(this).attr("name");
				s.value = $(this).text();
				D.push(s)
			});
			A = D
		}, function(M, D) {
			c.l("could not get Teleboerse baskets. " + D)
		});
		A.sort(isOValueGreater);
		oAllyve.writeToCache("basketNamesList", A);
		return A
	};
	this.getStocksInBasket = function(A) {
		if (!(!A || "" == A)) {
			if (oAllyve.readFromCache(A))
				return oAllyve.readFromCache(A);
			var M = null, D = null;
			(new ActionsApi).getStocksInBasket({
				parentIndex : A
			}, function(s) {
				var u = [], B = [];
				$(s).find("value").each(function() {
					var F = {};
					F.name = $(this).attr("name");
					F.value = $(this).text();
					F.name != A ? u.push(F) : B.push(F)
				});
				M = u;
				D = B
			}, function(s, u) {
				c.l("could not get Teleboerse stocks. " + u)
			});
			M.sort(isOValueGreater);
			M = D.concat(M);
			oAllyve.writeToCache(A, M);
			return M
		}
	};
	this.createOptionsFromList = function(A) {
		var M = "<option></option>";
		if (!A)
			return M;
		for ( var D = A.length, s = 0; s < D; s++)
			M += '<option name="' + A[s].name + '" id="' + A[s].name
					+ '" value="' + A[s].name + '">' + A[s].value + "</option>";
		return M
	};
	this.createUlFromList = function(A) {
		var M = "<ul><li></li></ul>";
		if (!A)
			return M;
		var D = A.length;
		M = '<ul id="autocomplete">';
		for ( var s = 0; s < D; s++)
			M += "<li onclick=\"$('#wetter_location').val($(this).text());$('#autocomplete').hide();\" name=\""
					+ A[s].name
					+ '" id="'
					+ A[s].name
					+ '">'
					+ A[s].value
					+ "</li>";
		M += "</ul>";
		return M
	};
	this.getWeatherLocations = function(A) {
		var M = null;
		(new ActionsApi).getWeatherLocations({
			city_or_zip : A
		}, function(s) {
			var u = [];
			$(s).find("value").each(function() {
				var B = {};
				B.name = $(this).attr("name");
				B.value = $(this).text();
				u.push(B)
			});
			M = u
		}, function(s) {
			c.l("Fehler beim Laden der Geolocations: " + s)
		});
		if (M)
			var D = this.createUlFromList(M);
		return D
	};
	this.showWeatherLocations = function(A, M, D) {
		if (D < 46 || D > 90)
			$("#weatherAutocompleteWait").hide();
		else if ($("#" + A).val().length < 4) {
			$("#" + M).hide();
			$("#weatherAutocompleteWait").hide()
		} else {
			$("#weatherAutocompleteWait").show();
			A = this.getWeatherLocations($("#" + A).val());
			$("#weatherAutocompleteWait").hide();
			$("#" + M).show();
			$("#" + M).html(A)
		}
	};
	this.init()
};
var ALLYVE_VERSION = "1_5_0_0";
$(".agb_link").click(function() {
	simpleDialog.show("agb");
	return false
});
$(".impressum_link").click(function() {
	simpleDialog.show("impressum");
	return false
});
$(".datenschutz_link").click(function() {
	simpleDialog.show("datenschutz");
	return false
});
$(".helpAndContact_link").click(function() {
	simpleDialog.show("helpAndContact");
	return false
});
$(".notFound_link").click(function() {
	simpleDialog.show("notFound");
	return false
});
$(".infoAndService_link").click(function() {
	simpleDialog.show("infoAndService");
	return false
});
$(".wieFunktionierts_link").click(function() {
	simpleDialog.show("wieFunktionierts");
	return false
});
$(".lpPreview_link").click(function() {
	showPreviewDialog();
	return false
});
$(".targetSecurity").click(function() {
	simpleDialog.show("sicherheitsgarantie");
	return false
});
showAccountConfigDialog = function() {
	account.showAccountConfig();
	return false
};
showDatenschutzDialog = function() {
	simpleDialog.show("datenschutz")
};
showAgbDialog = function() {
	simpleDialog.show("agb")
};
showImpressumDialog = function() {
	simpleDialog.show("impressum")
};
showNotFoundDialog = function() {
	simpleDialog.show("notFound")
};
function showAlertOk(a, b, d, e) {
	var f = new AlertDialog;
	d ? f.setButtons({
		OK : d
	}) : f.setButtons(f.dialogTypes.TYPE_OK);
	f.dialogClass = "alertBox";
	f.show(allyve.modaldialog.alertBoxContent({
		title : b,
		message : a
	}), e);
	return f
}
function showAlertYesNo(a, b, d, e, f) {
	var l = new AlertDialog;
	l.setButtons({
		Ja : d,
		Nein : e
	});
	l.dialogClass = "alertBox";
	l.show(allyve.modaldialog.alertBoxContent({
		title : b,
		message : a
	}), f)
}
function showAlertAbbrechenWeiter(a, b, d, e, f) {
	var l = new AlertDialog;
	l.setButtons({
		Weiter : e,
		Abbrechen : d
	});
	l.dialogClass = "alertBox";
	l.show(allyve.modaldialog.alertBoxContent({
		title : b,
		message : a
	}), f)
}
function alertNotImplemented() {
	alert("Noch nicht implementiert")
}
function popup(a, b) {
	window
			.open(b, a,
					"toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=1020,height=850");
	return false
}
function showPreviewDialog() {
	var a = new AlertDialog;
	a.setButtons(a.dialogTypes.TYPE_OK);
	a.dialogClass = "alertBox";
	a.show(allyve.modaldialog.alertBoxContent({
		title : allyve.modaldialog.lpPreviewHeader(),
		message : allyve.modaldialog.lpPreviewContent()
	}), 727)
};
var globalAccountConfigManager = null, globalActivationHint = null;
$(".showAccountConfigDialog_link").click(function() {
	showAccountConfigDialog();
	return false
});
showAccountConfigDialog = function() {
	if (globalAccountConfigManager != null) {
		globalAccountConfigManager.close();
		delete globalAccountConfigManager
	}
	globalAccountConfigManager = new AccountConfigManager;
	try {
		var a = globalAccountConfigManager.getCardList();
		globalAccountConfigManager.showDialog(a)
	} catch (b) {
		globalAccountConfigManager.showDialog(null)
	}
	return false
};
showActivationHintDialog = function(a) {
	globalActivationHint != null && delete globalActivationHint;
	globalActivationHintDialog = new ActivationHintController;
	globalActivationHintDialog.showDialog(a)
};
showNpaDeactivationSuccess = function() {
	showAlertOk(allyve.mandant.npaDeactivationSuccess(), allyve.i18n
			.confirmationTitle())
};
showPasswordChangeNpaSuccess = function() {
	showAlertOk(allyve.i18n.changePasswordSuccess(), allyve.mandant
			.titleChangePasswordNpa(), showAccountConfigDialog)
};
$(".helpAndContact_link").unbind("click");
$(".helpAndContact_link").click(function() {
	simpleDialog.show("wieFunktionierts");
	return false
});
attachTooltip(".reg_content", allyve.mandant.registerTooltip());
$(".sicherheitsgarantie_link").unbind("click");
$(".sicherheitsgarantie_link").click(function() {
	simpleDialog.show("sicherheitsgarantie");
	return false
});
function resetCard() {
	(new ConfirmCardDeactivation).showPinForm()
}
$(".loginCardMoreInfo_link").unbind("click");
$(".loginCardMoreInfo_link").click(function() {
	return showLoginCardMoreInfoDialog()
});
function showLoginCardMoreInfoDialog() {
	(new LoginCardMoreInfo).show();
	return false
};
$(window).resize(function() {
	resizeWidgetArea();
	scaleActionbar()
});
function initViewUtils() {
	var a = new AllyveEvents;
	a.subscribe(a.AFTER_WIDGET_ADD, function() {
		resizeWidgetArea()
	});
	a.subscribe(a.AFTER_WIDGET_DELETE, function() {
		resizeWidgetArea()
	});
	a.subscribe("afterApplicationInit", function() {
		resizeWidgetArea()
	});
	a.subscribe("afterApplicationInit", function() {
		scaleActionbar()
	})
}
initViewUtils();
var scaleActionbar = function() {
	if (oAllyve.isInitalized) {
		var a = $("#actionbar").outerWidth(true);
		a < 945 ? $("#recommendationBlock").hide() : $("#recommendationBlock")
				.show();
		if (a < 514) {
			$("#catalogButtonText").hide();
			$("#catalog_launcher").width(60)
		} else {
			$("#catalogButtonText").show();
			$("#catalog_launcher").width(220)
		}
	}
}, resizeWidgetArea = function() {
	if (oAllyve.isInitalized) {
		var a = $("#rightColumn").outerWidth(true), b = $("#widgetArea")
				.width(), d = $(".widget").outerWidth(true);
		if (null === d && oAllyve.oWidgets.getWidgetCount() > 0)
			d = 312;
		a = Math.floor((b - a) / d);
		if (oAllyve.oWidgets.getWidgetCount() < a)
			a = oAllyve.oWidgets.getWidgetCount();
		a = a * d;
		a >= d && $("#widget_container").width(a)
	}
};
function Allyve() {
	var a = true;
	this.isInitalized = false;
	this.oWidgets = null;
	this.widgetInfos = new Widgetinfos;
	this.accountInfo = this.settings = null;
	this.renderer = new Renderer(this.widgetInfos);
	this.oCache = null;
	var b = new AllyveEvents;
	this.init = function() {
		var d = this;
		if (!d.isInitalized) {
			d.settings = new UserSettings;
			d.renderer.renderSammelStatusPortlet();
			d.oWidgets = new Widgets(d.settings, d.renderer, d.widgetInfos);
			d.renderer.attachSammelStatusClickHandler(d.oWidgets);
			d.accountInfo = account.getAccount(d.settings.uid);
			attachTooltip("#logout", d.accountInfo.username + " abmelden.");
			d.isInitalized = true;
			d.oCache = {}
		}
		return true
	};
	this.raiseAfterInitEvent = function(d) {
		b.registerEvent("afterApplicationInit");
		b.raiseEvent("afterApplicationInit", d)
	};
	this.readFromCache = function(d) {
		if (d)
			if (this.oCache[d])
				return this.oCache[d]
	};
	this.writeToCache = function(d, e) {
		this.oCache[d] = e
	};
	this.getWidgets = function() {
		return this.oWidgets
	};
	this.addWidget = function(d) {
		this.oWidgets.insertWidget(d)
	};
	this.deleteWidget = function(d) {
		this.oWidgets.deleteWidget(d)
	};
	this.getSetting = function(d) {
		return this.settings.get(d)
	};
	this.setSetting = function(d, e) {
		return this.settings.set(d, e)
	};
	this.saveWidgetOrder = function() {
		this.oWidgets.saveWidgetOrder()
	};
	this.refresh = function(d) {
		a && this.oWidgets.refresh(d)
	};
	this.applyUiTweaks = function() {
		this.renderer.applyUiTweaks()
	};
	this.enableCatalogButton = function() {
		if (catalog) {
			$("#catLaunchButton").unbind("click");
			$("#catLaunchButton").click(function() {
				catalog.showCatalog()
			});
			this.renderer.setTooltipText("#catLaunchButton", allyve.i18n
					.tooltipCatalogEnabled());
			$("#catLaunchButton").attr("src",
					"img/allyve/1-buttons/button-katalog.gif")
		}
	};
	this.disableCatalogButton = function() {
		$("#catLaunchButton").unbind("click");
		this.renderer.setTooltipText("#catLaunchButton", allyve.i18n
				.tooltipCatalogDisabled());
		$("#catLaunchButton").attr("src",
				"img/allyve/1-buttons/button-katalog-neg.gif")
	};
	this.setRssMultiFeed = function(d, e, f) {
		var l = {};
		l.wid = f;
		l.feed = d;
		l.rssstyle = 0;
		d = widgetsetup.save(l, e);
		e = new WidgetData;
		e.init(d);
		this.renderer.replaceRssContent(e)
	};
	this.selectMensaLocation = function(d, e, f) {
		var l = {};
		l.wid = f;
		l.location = d;
		this.replaceWidgetConfig(l, e)
	};
	this.selectLeoLanguage = function(d, e, f) {
		var l = {};
		l.wid = f;
		l.language = d;
		this.replaceWidgetConfig(l, e)
	};
	this.replaceWidgetConfig = function(d, e) {
		d = widgetsetup.save(d, e);
		var f = new WidgetData;
		f.init(d);
		this.renderer.replaceSingle(e, f)
	};
	this.enableUpdate = function() {
		a = true
	};
	this.disableUpdate = function() {
		a = false
	}
}
var isCtrl = false, isShift = false, widgetsetup = new WidgetSetup, catalog = null, oAllyve = new Allyve;
function authCheck(a) {
	auth = new Auth;
	auth.setCallback(a);
	auth.check()
}
function callback() {
	var a = getUrlVars(), b = a.provider;
	if (b)
		try {
			window[b + "_callback"](a)
		} catch (d) {
		}
	self.close()
}
function xing_callback(a) {
	a = callSetupStep2("callId=" + a.callId + "&wid=8&oauth_token=" + a.token,
			a.unique);
	opener.widgetsetup.finishXing(a)
}
function twitter_callback(a) {
	a = callSetupStep2("callId=2&oauth_token=" + a.oauth_token
			+ "&wid=10021&oauth_verifier=" + a.oauth_verifier, a.unique);
	opener.widgetsetup.finishOauth(a)
}
function facebook_callback(a) {
	a = callSetupStep2("callId=2&oauth_token=" + a.code + "&wid=19", a.unique);
	opener.widgetsetup.finishOauth(a)
}
function hiogi_callback(a) {
	a = callSetupStep2("app_token=" + a.app_token + "&wid=10040");
	opener.widgetsetup.finishSetupHiogi(a)
}
function callSetupStep2(a, b) {
	var d = null;
	$.ajax({
		type : "POST",
		url : "/api/widgets/setups/" + (b ? b : ""),
		contentType : "application/x-www-form-urlencoded",
		data : a,
		async : false,
		success : function(e) {
			d = e
		},
		error : function(e, f, l) {
		}
	});
	return d
}
function init() {
	oAllyve.init();
	if (!oAllyve.init()) {
		c.l("init failed");
		return false
	}
	catalog = new Catalog(oAllyve.widgetInfos);
	$("#header_brand_logo").hide();
	$("#header_brand_logo_loggedin").show();
	$("#slogan").hide();
	$("#actionbar").show();
	$("#searchbox").show();
	$("#widget_container").show().sortable({
		handle : ".widget_header_title",
		start : function(a, b) {
			oAllyve.disableUpdate()
		},
		stop : function(a, b) {
			oAllyve.saveWidgetOrder();
			oAllyve.enableUpdate()
		}
	});
	oAllyve.applyUiTweaks();
	oAllyve.oWidgets.checkWidgetCount();
	startPeriodicUpdate();
	$("#iconBox").show();
	initKeyHandler();
	initConfigLayerLocation();
	oAllyve.raiseAfterInitEvent(self);
	return true
}
function initKeyHandler() {
	$(document).keyup(function(a) {
		if (a.which == 17)
			isCtrl = false;
		if (a.which == 16)
			isShift = false
	});
	$(document).keydown(function(a) {
		if (a.which == 17)
			isCtrl = true;
		if (a.which == 16)
			isShift = true;
		if (a.which == 76 && isShift && isCtrl) {
			$("#search_query")[0].focus();
			return false
		}
	})
}
function initConfigLayerLocation() {
	var a = get_url_param("wid");
	a != "" && widgetsetup.add(a)
}
function get_url_param(a) {
	a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	a = (new RegExp("[\\?&]" + a + "=([^&#]*)")).exec(window.location.href);
	return a == null ? "" : a[1]
}
function hideDialog() {
	$("#container").hide();
	$("#container").html("")
}
function startPeriodicUpdate() {
	window.setTimeout("oAllyve.refresh(false)", 1E4);
	window.setTimeout("oAllyve.refresh(false)", 2E4);
	window.setInterval("oAllyve.refresh(true)", 6E4)
}
function deleteWidget(a) {
	var b = oAllyve.widgetInfos.getWidgetinfoByWidgetId(oAllyve.oWidgets
			.getWidgetDataForUniqeId(a).getWidgetId());
	showAlertYesNo(allyve.i18n.deleteWidget_text({
		data : new Array(b.getDescription())
	}), allyve.i18n.deleteWidget_caption(), function() {
		oAllyve.deleteWidget(a);
		$(this).dialog("close")
	}, function() {
		$(this).dialog("close")
	})
}
function showConfig(a) {
	widgetsetup.reconfig(a)
}
function initIndicator() {
	$("#update_indicator").ajaxStart(function() {
		$(this).show()
	}).ajaxStop(function() {
		window.setTimeout("hideIndicator()", 2E3)
	})
}
function hideIndicator() {
	$("#update_indicator").hide()
}
function bindISLinks() {
	$("#infoServiceStart").unbind("click");
	$("#infoServiceStart").bind("click", function(a) {
		a = a.target.id;
		if (self.isChildLink(a)) {
			a = a.match(/(.*)_link/);
			var b = new SimpleDialog;
			b.setWidth(870);
			b.show(a[1]);
			return false
		}
		if (self.isFunctionLink(a)) {
			a = a.match(/(.*)_internal/);
			window[a[1]]();
			$(this).dialog("close");
			return false
		}
	})
}
function isChildLink(a) {
	if (!a)
		return false;
	if (a.indexOf("_link") > 0)
		return true;
	return false
}
function isFunctionLink(a) {
	if (!a)
		return false;
	if (a.indexOf("_internal") > 0)
		return true;
	return false
}
function bindStripeScrollButtons() {
	var a = $("#logoScroller");
	a.jScrollPane({
		animateScroll : true,
		hideFocus : true
	});
	var b = a.data("jsp");
	$("#logoScrollLeft").click(function() {
		b.scrollByX(-838)
	});
	$("#logoScrollRight").click(function() {
		b.scrollByX(838)
	});
	a = $("#certScroller");
	a.jScrollPane({
		animateScroll : true,
		hideFocus : true
	});
	var d = a.data("jsp");
	$("#certScrollLeft").click(function() {
		d.scrollByX(-838)
	});
	$("#certScrollRight").click(function() {
		d.scrollByX(838)
	})
};
function InfoMessagesServiceBase() {
	var a = this, b = new AllyveEvents, d = null, e = "";
	this.init = function() {
		b.subscribe("afterApplicationInit", function() {
			a.startPolling()
		});
		b.subscribe("afterLoginSuccess", function() {
			a.showGreeting()
		});
		b.subscribe("pageRefreshed", function(f) {
			f && a.showStandardMessage()
		});
		$("#goodToKnow").click(function() {
			a.showFull()
		})
	};
	this.getCurrentTextMessage = function() {
		var f;
		(new InfoMessagesApi).getCurrentMessage(function(l) {
			f = l
		}, function() {
			f = null
		});
		return e = f
	};
	this.getCurrentGreetingMessage = function() {
		var f;
		(new InfoMessagesApi).getGreeting(function(l) {
			f = l
		}, function() {
			f = null
		});
		return e = f
	};
	this.startPolling = function() {
		d = window.setInterval(a.showStandardMessage, 6E5)
	};
	this.showGreeting = function() {
		var f = a.getCurrentGreetingMessage();
		a.renderMessage(f)
	};
	this.showStandardMessage = function() {
		var f = a.getCurrentTextMessage();
		a.renderMessage(f)
	};
	this.renderMessage = function(f) {
		if (f != null) {
			var l = {};
			l.type = f.type;
			l.title = f.title;
			l.description = f.description;
			if (l.type == "text_message") {
				l.description = cutString(l.description, 130);
				$("#goodToKnow").html(allyve.infomessages.renderGoodToKnow({
					messageItem : l
				}))
			} else if (l.type == "greeting") {
				l.description = cutString(l.description, 130);
				$("#goodToKnow").html(allyve.infomessages.renderGreeting({
					messageItem : l
				}))
			} else if (l.type == "holiday")
				$("#goodToKnow").html(allyve.infomessages.renderHoliday({
					messageItem : l
				}));
			else
				l.type == "system_message"
						&& $("#goodToKnow").html(
								allyve.infomessages.renderSystemMessage({
									messageItem : l
								}))
		}
	};
	this.showFull = function() {
		var f = e;
		showAlertOk(f.description, f.title)
	}
};
function InfoMessagesService() {
	if (InfoMessagesService.instance !== undefined)
		return InfoMessagesService.instance;
	InfoMessagesService.instance = this
}
InfoMessagesService.prototype = new InfoMessagesServiceBase;
InfoMessagesService.constructor = InfoMessagesService;
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
		this.showTemplate(allyve.mandant.owokStatusCheck())
	};
	this.onClose = function() {
		$(OwokStatusCheck).trigger("closeButtonPressed")
	};
	this.loadButtons = function() {
	}
}
OwokStatusCheckView.prototype = new SimpleDialog;
OwokStatusCheckView.constructor = OwokStatusCheckView;
