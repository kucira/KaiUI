// self.addEventListener('push', function(event) {
// 	console.log(event, 'berhasil');
//     // event.waitUntil(
//     //     registration.showNotification(event.data.json().title, {
//     //         body: event.data ? event.data.text() : 'no payload',
//     //         icon: 'icon.png'
//     //     })
//     // );
// });

self.__DEV__ = self.__DEV__ || 0;
"use strict";
Array.from || (Array.from = function(a) {
        if (a == null) throw new TypeError("Object is null or undefined");
        var b = arguments[1],
                c = arguments[2],
                d = this,
                e = Object(a),
                f = typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator",
                g = typeof b === "function",
                h = typeof e[f] === "function",
                i = 0,
                j, k;
        if (h) {
                j = typeof d === "function" ? new d() : [];
                var l = e[f](),
                        m;
                while (!(m = l.next()).done) k = m.value, g && (k = b.call(c, k, i)), j[i] = k, i += 1;
                j.length = i;
                return j
        }
        var n = e.length;
        (isNaN(n) || n < 0) && (n = 0);
        j = typeof d === "function" ? new d(n) : new Array(n);
        while (i < n) k = e[i], g && (k = b.call(c, k, i)), j[i] = k, i += 1;
        j.length = i;
        return j
});

"use strict";
(function(a) {
        function b(a, b) {
                if (this == null) throw new TypeError("Array.prototype.findIndex called on null or undefined");
                if (typeof a !== "function") throw new TypeError("predicate must be a function");
                var c = Object(this),
                        d = c.length >>> 0;
                for (var e = 0; e < d; e++)
                        if (a.call(b, c[e], e, c)) return e;
                return -1
        }
        Array.prototype.findIndex || (Array.prototype.findIndex = b);
        Array.prototype.find || (Array.prototype.find = function(c, d) {
                if (this == null) throw new TypeError("Array.prototype.find called on null or undefined");
                c = b.call(this, c, d);
                return c === -1 ? a : this[c]
        });
        Array.prototype.fill || (Array.prototype.fill = function(b) {
                if (this == null) throw new TypeError("Array.prototype.fill called on null or undefined");
                var c = Object(this),
                        d = c.length >>> 0,
                        e = arguments[1],
                        f = e >> 0,
                        g = f < 0 ? Math.max(d + f, 0) : Math.min(f, d),
                        h = arguments[2],
                        i = h === a ? d : h >> 0,
                        j = i < 0 ? Math.max(d + i, 0) : Math.min(i, d);
                while (g < j) c[g] = b, g++;
                return c
        })
})();


(function() {
        "use strict";
        var a = Array.prototype.indexOf;
        Array.prototype.includes || (Array.prototype.includes = function(d) {
                "use strict";
                if (d !== undefined && Array.isArray(this) && !Number.isNaN(d)) return a.apply(this, arguments) !== -1;
                var e = Object(this),
                        f = e.length ? b(e.length) : 0;
                if (f === 0) return !1;
                var g = arguments.length > 1 ? c(arguments[1]) : 0,
                        h = g < 0 ? Math.max(f + g, 0) : g,
                        i = Number.isNaN(d);
                while (h < f) {
                        var j = e[h];
                        if (j === d || i && Number.isNaN(j)) return !0;
                        h++
                }
                return !1
        });

        function b(a) {
                return Math.min(Math.max(c(a), 0), Number.MAX_SAFE_INTEGER)
        }

        function c(a) {
                a = Number(a);
                return Number.isFinite(a) && a !== 0 ? d(a) * Math.floor(Math.abs(a)) : a
        }

        function d(a) {
                return a >= 0 ? 1 : -1
        }
})();
var __p;
(function() {
        var a = {},
                b = function(a, b) {
                        if (!a && !b) return null;
                        var c = {};
                        typeof a !== "undefined" && (c.type = a);
                        typeof b !== "undefined" && (c.signature = b);
                        return c
                },
                c = function(a, c) {
                        return b(a && /^[A-Z]/.test(a) ? a : undefined, c && (c.params && c.params.length || c.returns) ? "function(" + (c.params ? c.params.map(function(a) {
                                return /\?/.test(a) ? "?" + a.replace("?", "") : a
                        }).join(",") : "") + ")" + (c.returns ? ":" + c.returns : "") : undefined)
                },
                d = function(a, b, c) {
                        return a
                },
                e = function(a, b, d) {
                        "sourcemeta" in __transform_includes && (a.__SMmeta = b);
                        if ("typechecks" in __transform_includes) {
                                b = c(b ? b.name : undefined, d);
                                b && __w(a, b)
                        }
                        return a
                },
                f = function(a, b, c) {
                        return c.apply(a, b)
                },
                g = function(a, b, c, d) {
                        d && d.params && __t.apply(a, d.params);
                        c = c.apply(a, b);
                        d && d.returns && __t([c, d.returns]);
                        return c
                },
                h = function(b, c, d, e, f) {
                        if (f) {
                                f.callId || (f.callId = f.module + ":" + (f.line || 0) + ":" + (f.column || 0));
                                e = f.callId;
                                a[e] = (a[e] || 0) + 1
                        }
                        return d.apply(b, c)
                };
        typeof __transform_includes === "undefined" ? (__annotator = d, __bodyWrapper = f) : (__annotator = e, "codeusage" in __transform_includes ? (__annotator = d, __bodyWrapper = h, __bodyWrapper.getCodeUsage = function() {
                return a
        }, __bodyWrapper.clearCodeUsage = function() {
                a = {}
        }) : "typechecks" in __transform_includes ? __bodyWrapper = g : __bodyWrapper = f)
})();
__t = function(a) {
        return a[0]
}, __w = function(a) {
        return a
};


(function() {
        if (Object.assign) return;
        var a = Object.prototype.hasOwnProperty,
                b;
        Object.keys && Object.keys.name !== "object_keys_polyfill" ? b = function(a, b) {
                var c = Object.keys(b);
                for (var d = 0; d < c.length; d++) a[c[d]] = b[c[d]]
        } : b = function(b, c) {
                for (var d in c) a.call(c, d) && (b[d] = c[d])
        };
        Object.assign = function(a, c) {
                if (a == null) throw new TypeError("Object.assign target cannot be null or undefined");
                var d = Object(a);
                for (var e = 1; e < arguments.length; e++) {
                        var f = arguments[e];
                        f != null && b(d, Object(f))
                }
                return d
        }
})();
(function(a, b) {
        var c = "keys",
                d = "values",
                e = "entries",
                f = function() {
                        var a = h(Array),
                                f;
                        a || (f = function() {
                                function a(a, b) {
                                        "use strict";
                                        this.$1 = a, this.$2 = b, this.$3 = 0
                                }
                                a.prototype.next = function() {
                                        "use strict";
                                        if (this.$1 == null) return {
                                                value: b,
                                                done: !0
                                        };
                                        var a = this.$1,
                                                f = this.$1.length,
                                                g = this.$3,
                                                h = this.$2;
                                        if (g >= f) {
                                                this.$1 = b;
                                                return {
                                                        value: b,
                                                        done: !0
                                                }
                                        }
                                        this.$3 = g + 1;
                                        if (h === c) return {
                                                value: g,
                                                done: !1
                                        };
                                        else if (h === d) return {
                                                value: a[g],
                                                done: !1
                                        };
                                        else if (h === e) return {
                                                value: [g, a[g]],
                                                done: !1
                                        }
                                };
                                a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                                        "use strict";
                                        return this
                                };
                                return a
                        }());
                        return {
                                keys: a ? function(a) {
                                        return a.keys()
                                } : function(a) {
                                        return new f(a, c)
                                },
                                values: a ? function(a) {
                                        return a.values()
                                } : function(a) {
                                        return new f(a, d)
                                },
                                entries: a ? function(a) {
                                        return a.entries()
                                } : function(a) {
                                        return new f(a, e)
                                }
                        }
                }(),
                g = function() {
                        var a = h(String),
                                c;
                        a || (c = function() {
                                function a(a) {
                                        "use strict";
                                        this.$1 = a, this.$2 = 0
                                }
                                a.prototype.next = function() {
                                        "use strict";
                                        if (this.$1 == null) return {
                                                value: b,
                                                done: !0
                                        };
                                        var a = this.$2,
                                                c = this.$1,
                                                d = c.length;
                                        if (a >= d) {
                                                this.$1 = b;
                                                return {
                                                        value: b,
                                                        done: !0
                                                }
                                        }
                                        var e = c.charCodeAt(a);
                                        if (e < 55296 || e > 56319 || a + 1 === d) e = c[a];
                                        else {
                                                d = c.charCodeAt(a + 1);
                                                d < 56320 || d > 57343 ? e = c[a] : e = c[a] + c[a + 1]
                                        }
                                        this.$2 = a + e.length;
                                        return {
                                                value: e,
                                                done: !1
                                        }
                                };
                                a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                                        "use strict";
                                        return this
                                };
                                return a
                        }());
                        return {
                                keys: function() {
                                        throw TypeError("Strings default iterator doesn't implement keys.")
                                },
                                values: a ? function(a) {
                                        return a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]()
                                } : function(a) {
                                        return new c(a)
                                },
                                entries: function() {
                                        throw TypeError("Strings default iterator doesn't implement entries.")
                                }
                        }
                }();

        function h(a) {
                return typeof a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] === "function" && typeof a.prototype.values === "function" && typeof a.prototype.keys === "function" && typeof a.prototype.entries === "function"
        }

        function i(a, b) {
                "use strict";
                this.$1 = a, this.$2 = b, this.$3 = Object.keys(a), this.$4 = 0
        }
        i.prototype.next = function() {
                "use strict";
                var a = this.$3.length,
                        f = this.$4,
                        g = this.$2,
                        h = this.$3[f];
                if (f >= a) {
                        this.$1 = b;
                        return {
                                value: b,
                                done: !0
                        }
                }
                this.$4 = f + 1;
                if (g === c) return {
                        value: h,
                        done: !1
                };
                else if (g === d) return {
                        value: this.$1[h],
                        done: !1
                };
                else if (g === e) return {
                        value: [h, this.$1[h]],
                        done: !1
                }
        };
        i.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                "use strict";
                return this
        };
        var j = {
                keys: function(a) {
                        return new i(a, c)
                },
                values: function(a) {
                        return new i(a, d)
                },
                entries: function(a) {
                        return new i(a, e)
                }
        };

        function k(a, b) {
                if (typeof a === "string") return g[b || d](a);
                else if (Array.isArray(a)) return f[b || d](a);
                else if (a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]) return a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
                else return j[b || e](a)
        }
        Object.assign(k, {
                KIND_KEYS: c,
                KIND_VALUES: d,
                KIND_ENTRIES: e,
                keys: function(a) {
                        return k(a, c)
                },
                values: function(a) {
                        return k(a, d)
                },
                entries: function(a) {
                        return k(a, e)
                },
                generic: j.entries
        });
        a.FB_enumerate = k
})(typeof global === "undefined" ? this : global);
(function(a, b) {
        var c = a.window || a;

        function d() {
                return "f" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
        }

        function e(a) {
                var b = a ? a.ownerDocument || a : document;
                b = b.defaultView || c;
                return !!(a && (typeof b.Node === "function" ? a instanceof b.Node : typeof a === "object" && typeof a.nodeType === "number" && typeof a.nodeName === "string"))
        }

        function f(a) {
                a = c[a];
                if (a == null) return !0;
                if (typeof c.Symbol !== "function") return !0;
                var b = a.prototype;
                return a == null || typeof a !== "function" || typeof b.clear !== "function" || new a().size !== 0 || typeof b.keys !== "function" || typeof b.forEach !== "function"
        }
        var g = a.FB_enumerate,
                h = function() {
                        if (!f("Map")) return c.Map;
                        var i = "key",
                                j = "value",
                                k = "key+value",
                                l = "$map_",
                                m, n = "IE_HASH_";

                        function a(a) {
                                "use strict";
                                if (!s(this)) throw new TypeError("Wrong map object type.");
                                r(this);
                                if (a != null) {
                                        a = g(a);
                                        var b;
                                        while (!(b = a.next()).done) {
                                                if (!s(b.value)) throw new TypeError("Expected iterable items to be pair objects.");
                                                this.set(b.value[0], b.value[1])
                                        }
                                }
                        }
                        a.prototype.clear = function() {
                                "use strict";
                                r(this)
                        };
                        a.prototype.has = function(a) {
                                "use strict";
                                a = p(this, a);
                                return !!(a != null && this._mapData[a])
                        };
                        a.prototype.set = function(a, b) {
                                "use strict";
                                var c = p(this, a);
                                c != null && this._mapData[c] ? this._mapData[c][1] = b : (c = this._mapData.push([a, b]) - 1, q(this, a, c), this.size += 1);
                                return this
                        };
                        a.prototype.get = function(a) {
                                "use strict";
                                a = p(this, a);
                                if (a == null) return b;
                                else return this._mapData[a][1]
                        };
                        a.prototype["delete"] = function(a) {
                                "use strict";
                                var c = p(this, a);
                                if (c != null && this._mapData[c]) {
                                        q(this, a, b);
                                        this._mapData[c] = b;
                                        this.size -= 1;
                                        return !0
                                } else return !1
                        };
                        a.prototype.entries = function() {
                                "use strict";
                                return new o(this, k)
                        };
                        a.prototype.keys = function() {
                                "use strict";
                                return new o(this, i)
                        };
                        a.prototype.values = function() {
                                "use strict";
                                return new o(this, j)
                        };
                        a.prototype.forEach = function(a, c) {
                                "use strict";
                                if (typeof a !== "function") throw new TypeError("Callback must be callable.");
                                a = a.bind(c || b);
                                c = this._mapData;
                                for (var d = 0; d < c.length; d++) {
                                        var e = c[d];
                                        e != null && a(e[1], e[0], this)
                                }
                        };
                        a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                                "use strict";
                                return this.entries()
                        };

                        function o(a, b) {
                                "use strict";
                                if (!(s(a) && a._mapData)) throw new TypeError("Object is not a map.");
                                if ([i, k, j].indexOf(b) === -1) throw new Error("Invalid iteration kind.");
                                this._map = a;
                                this._nextIndex = 0;
                                this._kind = b
                        }
                        o.prototype.next = function() {
                                "use strict";
                                if (!this instanceof a) throw new TypeError("Expected to be called on a MapIterator.");
                                var c = this._map,
                                        d = this._nextIndex,
                                        e = this._kind;
                                if (c == null) return t(b, !0);
                                c = c._mapData;
                                while (d < c.length) {
                                        var f = c[d];
                                        d += 1;
                                        this._nextIndex = d;
                                        if (f)
                                                if (e === i) return t(f[0], !1);
                                                else if (e === j) return t(f[1], !1);
                                        else if (e) return t(f, !1)
                                }
                                this._map = b;
                                return t(b, !0)
                        };
                        o.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                                "use strict";
                                return this
                        };

                        function p(a, c) {
                                if (s(c)) {
                                        var d = x(c);
                                        return d ? a._objectIndex[d] : b
                                } else {
                                        d = l + c;
                                        if (typeof c === "string") return a._stringIndex[d];
                                        else return a._otherIndex[d]
                                }
                        }

                        function q(a, b, c) {
                                var d = c == null;
                                if (s(b)) {
                                        var e = x(b);
                                        e || (e = y(b));
                                        d ? delete a._objectIndex[e] : a._objectIndex[e] = c
                                } else {
                                        e = l + b;
                                        typeof b === "string" ? d ? delete a._stringIndex[e] : a._stringIndex[e] = c : d ? delete a._otherIndex[e] : a._otherIndex[e] = c
                                }
                        }

                        function r(a) {
                                a._mapData = [], a._objectIndex = {}, a._stringIndex = {}, a._otherIndex = {}, a.size = 0
                        }

                        function s(a) {
                                return a != null && (typeof a === "object" || typeof a === "function")
                        }

                        function t(a, b) {
                                return {
                                        value: a,
                                        done: b
                                }
                        }
                        a.__isES5 = function() {
                                try {
                                        Object.defineProperty({}, "__.$#x", {});
                                        return !0
                                } catch (a) {
                                        return !1
                                }
                        }();

                        function u(b) {
                                if (!a.__isES5 || !Object.isExtensible) return !0;
                                else return Object.isExtensible(b)
                        }

                        function v(a) {
                                var b;
                                switch (a.nodeType) {
                                        case 1:
                                                b = a.uniqueID;
                                                break;
                                        case 9:
                                                b = a.documentElement.uniqueID;
                                                break;
                                        default:
                                                return null
                                }
                                if (b) return n + b;
                                else return null
                        }
                        var w = d();

                        function x(b) {
                                if (b[w]) return b[w];
                                else if (!a.__isES5 && b.propertyIsEnumerable && b.propertyIsEnumerable[w]) return b.propertyIsEnumerable[w];
                                else if (!a.__isES5 && e(b) && v(b)) return v(b);
                                else if (!a.__isES5 && b[w]) return b[w]
                        }
                        var y = function() {
                                var b = Object.prototype.propertyIsEnumerable,
                                        c = 0;
                                return function(d) {
                                        if (u(d)) {
                                                c += 1;
                                                if (a.__isES5) Object.defineProperty(d, w, {
                                                        enumerable: !1,
                                                        writable: !1,
                                                        configurable: !1,
                                                        value: c
                                                });
                                                else if (d.propertyIsEnumerable) d.propertyIsEnumerable = function() {
                                                        return b.apply(this, arguments)
                                                }, d.propertyIsEnumerable[w] = c;
                                                else if (e(d)) d[w] = c;
                                                else throw new Error("Unable to set a non-enumerable property on object.");
                                                return c
                                        } else throw new Error("Non-extensible objects are not allowed as keys.")
                                }
                        }();
                        return __annotator(a, {
                                name: "Map"
                        })
                }(),
                i = function() {
                        if (!f("Set")) return c.Set;

                        function a(a) {
                                "use strict";
                                if (this == null || typeof this !== "object" && typeof this !== "function") throw new TypeError("Wrong set object type.");
                                b(this);
                                if (a != null) {
                                        a = g(a);
                                        var c;
                                        while (!(c = a.next()).done) this.add(c.value)
                                }
                        }
                        a.prototype.add = function(a) {
                                "use strict";
                                this._map.set(a, a);
                                this.size = this._map.size;
                                return this
                        };
                        a.prototype.clear = function() {
                                "use strict";
                                b(this)
                        };
                        a.prototype["delete"] = function(a) {
                                "use strict";
                                a = this._map["delete"](a);
                                this.size = this._map.size;
                                return a
                        };
                        a.prototype.entries = function() {
                                "use strict";
                                return this._map.entries()
                        };
                        a.prototype.forEach = function(a) {
                                "use strict";
                                var b = arguments[1],
                                        c = this._map.keys(),
                                        d;
                                while (!(d = c.next()).done) a.call(b, d.value, d.value, this)
                        };
                        a.prototype.has = function(a) {
                                "use strict";
                                return this._map.has(a)
                        };
                        a.prototype.values = function() {
                                "use strict";
                                return this._map.values()
                        };
                        a.prototype.keys = function() {
                                "use strict";
                                return this.values()
                        };
                        a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                                "use strict";
                                return this.values()
                        };

                        function b(a) {
                                a._map = new h(), a.size = a._map.size
                        }
                        return __annotator(a, {
                                name: "Set"
                        })
                }();
        a.Map = h;
        a.Set = i
})(typeof global === "undefined" ? this : global);




typeof window !== "undefined" && window.JSON && JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]' && (JSON.stringify = function(a) {
        var b = /\u2028/g,
                c = /\u2029/g;
        return function(d, e, f) {
                d = a.call(this, d, e, f);
                d && (-1 < d.indexOf("\u2028") && (d = d.replace(b, "\\u2028")), -1 < d.indexOf("\u2029") && (d = d.replace(c, "\\u2029")));
                return d
        }
}(JSON.stringify));


(function() {
        var a = Object.prototype.hasOwnProperty;
        Object.entries = function(b) {
                if (b == null) throw new TypeError("Object.entries called on non-object");
                var c = [];
                for (var d in b) a.call(b, d) && c.push([d, b[d]]);
                return c
        };
        Object.values = function(b) {
                if (b == null) throw new TypeError("Object.values called on non-object");
                var c = [];
                for (var d in b) a.call(b, d) && c.push(b[d]);
                return c
        }
})();


(function(a) {
        a.__m = function(a, b) {
                a.__SMmeta = b;
                return a
        }
})(this);
typeof String.fromCodePoint !== "function" && (String.fromCodePoint = function() {
        var a = [];
        for (var b = 0; b < arguments.length; b++) {
                var c = Number(b < 0 || arguments.length <= b ? undefined : arguments[b]);
                if (!isFinite(c) || Math.floor(c) != c || c < 0 || 1114111 < c) throw RangeError("Invalid code point " + c);
                c < 65536 ? a.push(String.fromCharCode(c)) : (c -= 65536, a.push(String.fromCharCode((c >> 10) + 55296), String.fromCharCode(c % 1024 + 56320)))
        }
        return a.join("")
});
String.prototype.startsWith || (String.prototype.startsWith = function(a) {
        "use strict";
        if (this == null) throw TypeError();
        var b = String(this),
                c = arguments.length > 1 ? Number(arguments[1]) || 0 : 0,
                d = Math.min(Math.max(c, 0), b.length);
        return b.indexOf(String(a), c) == d
}), String.prototype.endsWith || (String.prototype.endsWith = function(a) {
        "use strict";
        if (this == null) throw TypeError();
        var b = String(this),
                c = b.length,
                d = String(a),
                e = arguments.length > 1 ? Number(arguments[1]) || 0 : c,
                f = Math.min(Math.max(e, 0), c),
                g = f - d.length;
        return g < 0 ? !1 : b.lastIndexOf(d, g) == g
}), String.prototype.includes || (String.prototype.includes = function(a) {
        "use strict";
        if (this == null) throw TypeError();
        var b = String(this),
                c = arguments.length > 1 ? Number(arguments[1]) || 0 : 0;
        return b.indexOf(String(a), c) != -1
}), String.prototype.repeat || (String.prototype.repeat = function(a) {
        "use strict";
        if (this == null) throw TypeError();
        var b = String(this);
        a = Number(a) || 0;
        if (a < 0 || a === Infinity) throw RangeError();
        if (a === 1) return b;
        var c = "";
        while (a) a & 1 && (c += b), (a >>= 1) && (b += b);
        return c
}), String.prototype.codePointAt || (String.prototype.codePointAt = function(a) {
        "use strict";
        if (this == null) throw TypeError("Invalid context: " + this);
        var b = String(this),
                c = b.length;
        a = Number(a) || 0;
        if (a < 0 || c <= a) return undefined;
        var d = b.charCodeAt(a);
        if (55296 <= d && d <= 56319 && c > a + 1) {
                c = b.charCodeAt(a + 1);
                if (56320 <= c && c <= 57343) return (d - 55296) * 1024 + c - 56320 + 65536
        }
        return d
});
String.prototype.contains || (String.prototype.contains = String.prototype.includes);
String.prototype.padStart || (String.prototype.padStart = function(a, b) {
        a = a >> 0;
        b = String(b || " ");
        if (this.length > a) return String(this);
        else {
                a = a - this.length;
                a > b.length && (b += b.repeat(a / b.length));
                return b.slice(0, a) + String(this)
        }
}), String.prototype.padEnd || (String.prototype.padEnd = function(a, b) {
        a = a >> 0;
        b = String(b || " ");
        if (this.length > a) return String(this);
        else {
                a = a - this.length;
                a > b.length && (b += b.repeat(a / b.length));
                return String(this) + b.slice(0, a)
        }
});
String.prototype.trimLeft || (String.prototype.trimLeft = function() {
        return this.replace(/^\s+/, "")
}), String.prototype.trimRight || (String.prototype.trimRight = function() {
        return this.replace(/\s+$/, "")
});


(function(a) {
        a = a.babelHelpers = {};
        var b = Object.prototype.hasOwnProperty;
        a.inherits = function(a, b) {
                Object.assign(a, b);
                a.prototype = Object.create(b && b.prototype);
                a.prototype.constructor = a;
                a.__superConstructor__ = b;
                return b
        };
        a._extends = Object.assign;
        a["extends"] = a._extends;
        a.construct = function(a, b) {
                return new(Function.prototype.bind.apply(a, [null].concat(b)))()
        };
        a.objectWithoutProperties = function(a, c) {
                var d = {};
                for (var e in a) {
                        if (!b.call(a, e) || c.indexOf(e) >= 0) continue;
                        d[e] = a[e]
                }
                return d
        };
        a.taggedTemplateLiteralLoose = function(a, b) {
                b || (b = a.slice(0));
                a.raw = b;
                return a
        };
        a.bind = Function.prototype.bind
})(typeof global === "undefined" ? self : global);
var require, __d;
(function(a) {
        var b = {},
                c = {},
                d = ["global", "require", "requireDynamic", "requireLazy", "module", "exports"];
        require = function(d, e) {
                if (Object.prototype.hasOwnProperty.call(c, d)) return c[d];
                if (!Object.prototype.hasOwnProperty.call(b, d)) {
                        if (e) return null;
                        throw new Error("Module " + d + " has not been defined")
                }
                e = b[d];
                var f = e.deps,
                        g = e.factory.length,
                        h, i = [];
                for (var j = 0; j < g; j++) {
                        switch (f[j]) {
                                case "module":
                                        h = e;
                                        break;
                                case "exports":
                                        h = e.exports;
                                        break;
                                case "global":
                                        h = a;
                                        break;
                                case "require":
                                        h = require;
                                        break;
                                case "requireDynamic":
                                        h = null;
                                        break;
                                case "requireLazy":
                                        h = null;
                                        break;
                                default:
                                        h = require.call(null, f[j])
                        }
                        i.push(h)
                }
                e.factory.apply(a, i);
                c[d] = e.exports;
                return e.exports
        };
        __d = function(a, e, f, g) {
                typeof f === "function" ? (b[a] = {
                        factory: f,
                        deps: d.concat(e),
                        exports: {}
                }, g === 3 && require.call(null, a)) : c[a] = f
        }
})(this);

(function(a) {
        var b = a.performance;
        b && b.setResourceTimingBufferSize && (b.setResourceTimingBufferSize(1e5), b.onresourcetimingbufferfull = function() {
                a.__isresourcetimingbufferfull = !0
        }, b.setResourceTimingBufferSize = function() {})
})(this);
__d("KaiosServiceWorker", [], (function(a, b, c, d, e, f) {
        "use strict";
        __p && __p();
        var g = "/img/icons/fb_logo128x128.png",
                h = "push_update_cache",
                i = "push_update_cache_key",
                j = "show_update_alert",
                k = "show_update_completed_alert";

        function l() {
                return self.clients.matchAll({
                        includeUncontrolled: !0,
                        type: "window"
                }).then(function(a) {
                        for (var b = 0; b < a.length; b++) {
                                var c = a[b];
                                if (new RegExp("app://m.facebook.com", "i").test(c.url) && c.focused) return c
                        }
                        return null
                })
        }
        self.addEventListener("push", function(event) {
                __p && __p();
                if (!event.data || !event.data.json) return;
                var a = event.data.json(),
                        b = g;
                if (a.ppu) try {
                        new URL(a.ppu), b = a.ppu
                } catch (a) {}
                var c = l().then(function(c) {
                        if (c) return;
                        return self.registration.showNotification(a.title ? a.title : "", {
                                actions: [{
                                        action: "close",
                                        title: "Dismiss"
                                }, {
                                        action: "open",
                                        title: "Open"
                                }],
                                body: a.message ? a.message : "",
                                icon: b,
                                tag: a.i ? a.i : a.t ? a.t : "n" + Date.now(),
                                dir: "auto",
                                data: {
                                        id: a.i ? a.i : a.t ? a.t : "",
                                        ndid: a.d ? a.d : "",
                                        notif_type: a.type ? a.type : "",
                                        timestamp: a.time ? a.time : event.timeStamp,
                                        uri: a.href ? a.href : "https://mail.google.com/mail/u/0/"
                                },
                                timestamp: a.time ? a.time : event.timeStamp,
                                renotify: !0,
                                requireInteraction: !0
                        })
                });
                event.waitUntil(c)
        });
        self.addEventListener("pushsubscriptionchange", function(event) {
                var a = g,
                        b = caches.open(h).then(function(a) {
                                return a.put(i, new Response())
                        }).then(function() {
                                return l()
                        }).then(function(b) {
                                if (b) {
                                        b.postMessage({
                                                msg: i
                                        });
                                        return
                                }
                                return self.registration.showNotification("App Update Available", {
                                        actions: [{
                                                action: "close",
                                                title: "Dismiss"
                                        }, {
                                                action: "open",
                                                title: "Update"
                                        }],
                                        body: "Update your app now to keep getting instant updates from friends.",
                                        icon: a,
                                        dir: "auto",
                                        renotify: !0,
                                        requireInteraction: !0
                                })
                        });
                event.waitUntil(b)
        });
        self.addEventListener("notificationclick", function(event) {
                var a = event.notification,
                        b = a.data && a.data.uri ? a.data.uri : "/";
                switch (event.action) {
                        case "close":
                                a.close();
                                break;
                        case "open":
                                event.waitUntil(self.clients.openApp({
                                        msg: JSON.stringify({
                                                uri: b
                                        })
                                }))
                }
        });
        self.addEventListener("message", function(event) {
                var a;
                switch (event.data) {
                        case j:
                                a = "Updating...";
                                break;
                        case k:
                                a = "Update complete"
                }
                event.waitUntil(self.registration.showNotification(a, {
                        requireInteraction: !1
                }))
        });
        e.exports = undefined
}), null);
__d("legacy:kaios-service-worker", ["KaiosServiceWorker"], (function(a, b, c, d, e, f) {
        a.KaiosServiceWorker = b("KaiosServiceWorker")
}), 3);