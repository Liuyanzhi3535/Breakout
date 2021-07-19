/*! For license information please see main.bundle.js.LICENSE.txt */
(()=>{"use strict";var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])})(n,e)};function n(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function e(t,n){var e,r,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=n.call(t,u)}catch(t){o=[6,t],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function r(t){var n="function"==typeof Symbol&&Symbol.iterator,e=n&&t[n],r=0;if(e)return e.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function i(t,n){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var r,i,o=e.call(t),u=[];try{for(;(void 0===n||n-- >0)&&!(r=o.next()).done;)u.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(e=o.return)&&e.call(o)}finally{if(i)throw i.error}}return u}function o(t,n){for(var e=0,r=n.length,i=t.length;e<r;e++,i++)t[i]=n[e];return t}function u(t){return this instanceof u?(this.v=t,this):new u(t)}function s(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,i=e.apply(t,n||[]),o=[];return r={},s("next"),s("throw"),s("return"),r[Symbol.asyncIterator]=function(){return this},r;function s(t){i[t]&&(r[t]=function(n){return new Promise((function(e,r){o.push([t,n,e,r])>1||c(t,n)}))})}function c(t,n){try{(e=i[t](n)).value instanceof u?Promise.resolve(e.value.v).then(a,l):f(o[0][2],e)}catch(t){f(o[0][3],t)}var e}function a(t){c("next",t)}function l(t){c("throw",t)}function f(t,n){t(n),o.shift(),o.length&&c(o[0][0],o[0][1])}}function c(t){return"function"==typeof t}function a(t){var n=t((function(t){Error.call(t),t.stack=(new Error).stack}));return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}Object.create,Object.create;var l=a((function(t){return function(n){t(this),this.message=n?n.length+" errors occurred during unsubscription:\n"+n.map((function(t,n){return n+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=n}}));function f(t,n){if(t){var e=t.indexOf(n);0<=e&&t.splice(e,1)}}var h=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}return t.prototype.unsubscribe=function(){var t,n,e,u,s;if(!this.closed){this.closed=!0;var a=this._parentage;if(a)if(this._parentage=null,Array.isArray(a))try{for(var f=r(a),h=f.next();!h.done;h=f.next())h.value.remove(this)}catch(n){t={error:n}}finally{try{h&&!h.done&&(n=f.return)&&n.call(f)}finally{if(t)throw t.error}}else a.remove(this);var d=this.initialTeardown;if(c(d))try{d()}catch(t){s=t instanceof l?t.errors:[t]}var p=this._teardowns;if(p){this._teardowns=null;try{for(var y=r(p),b=y.next();!b.done;b=y.next()){var w=b.value;try{v(w)}catch(t){s=null!=s?s:[],t instanceof l?s=o(o([],i(s)),i(t.errors)):s.push(t)}}}catch(t){e={error:t}}finally{try{b&&!b.done&&(u=y.return)&&u.call(y)}finally{if(e)throw e.error}}}if(s)throw new l(s)}},t.prototype.add=function(n){var e;if(n&&n!==this)if(this.closed)v(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._teardowns=null!==(e=this._teardowns)&&void 0!==e?e:[]).push(n)}},t.prototype._hasParent=function(t){var n=this._parentage;return n===t||Array.isArray(n)&&n.includes(t)},t.prototype._addParent=function(t){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t},t.prototype._removeParent=function(t){var n=this._parentage;n===t?this._parentage=null:Array.isArray(n)&&f(n,t)},t.prototype.remove=function(n){var e=this._teardowns;e&&f(e,n),n instanceof t&&n._removeParent(this)},t.EMPTY=((n=new t).closed=!0,n),t;var n}(),d=h.EMPTY;function p(t){return t instanceof h||t&&"closed"in t&&c(t.remove)&&c(t.add)&&c(t.unsubscribe)}function v(t){c(t)?t():t.unsubscribe()}var y=null,b=null,w=void 0,m=!1,g=!1,x={setTimeout:function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=x.delegate;return((null==e?void 0:e.setTimeout)||setTimeout).apply(void 0,o([],i(t)))},clearTimeout:function(t){var n=x.delegate;return((null==n?void 0:n.clearTimeout)||clearTimeout)(t)},delegate:void 0};function _(t){x.setTimeout((function(){if(!y)throw t;y(t)}))}function S(){}var E=T("C",void 0,void 0);function T(t,n,e){return{kind:t,value:n,error:e}}var A=null;function I(t){if(m){var n=!A;if(n&&(A={errorThrown:!1,error:null}),t(),n){var e=A,r=e.errorThrown,i=e.error;if(A=null,r)throw i}}else t()}function P(t){m&&A&&(A.errorThrown=!0,A.error=t)}var k=function(t){function e(n){var e=t.call(this)||this;return e.isStopped=!1,n?(e.destination=n,p(n)&&n.add(e)):e.destination=j,e}return n(e,t),e.create=function(t,n,e){return new R(t,n,e)},e.prototype.next=function(t){this.isStopped?C(function(t){return T("N",t,void 0)}(t),this):this._next(t)},e.prototype.error=function(t){this.isStopped?C(T("E",void 0,t),this):(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped?C(E,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(h),R=function(t){function e(n,e,r){var i,o=t.call(this)||this;if(c(n))i=n;else if(n){var u;i=n.next,e=n.error,r=n.complete,o&&g?(u=Object.create(n)).unsubscribe=function(){return o.unsubscribe()}:u=n,i=null==i?void 0:i.bind(u),e=null==e?void 0:e.bind(u),r=null==r?void 0:r.bind(u)}return o.destination={next:i?F(i):S,error:F(null!=e?e:O),complete:r?F(r):S},o}return n(e,t),e}(k);function F(t,n){return function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];try{t.apply(void 0,o([],i(n)))}catch(t){m?P(t):_(t)}}}function O(t){throw t}function C(t,n){var e=b;e&&x.setTimeout((function(){return e(t,n)}))}var j={closed:!0,next:S,error:O,complete:S},q="function"==typeof Symbol&&Symbol.observable||"@@observable";function L(t){return t}function z(t){return 0===t.length?L:1===t.length?t[0]:function(n){return t.reduce((function(t,n){return n(t)}),n)}}var M=function(){function t(t){t&&(this._subscribe=t)}return t.prototype.lift=function(n){var e=new t;return e.source=this,e.operator=n,e},t.prototype.subscribe=function(t,n,e){var r,i=this,o=(r=t)&&r instanceof k||function(t){return t&&c(t.next)&&c(t.error)&&c(t.complete)}(r)&&p(r)?t:new R(t,n,e);return I((function(){var t=i,n=t.operator,e=t.source;o.add(n?n.call(o,e):e?i._subscribe(o):i._trySubscribe(o))})),o},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(n){t.error(n)}},t.prototype.forEach=function(t,n){var e=this;return new(n=Y(n))((function(n,r){var i;i=e.subscribe((function(n){try{t(n)}catch(t){r(t),null==i||i.unsubscribe()}}),r,n)}))},t.prototype._subscribe=function(t){var n;return null===(n=this.source)||void 0===n?void 0:n.subscribe(t)},t.prototype[q]=function(){return this},t.prototype.pipe=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return t.length?z(t)(this):this},t.prototype.toPromise=function(t){var n=this;return new(t=Y(t))((function(t,e){var r;n.subscribe((function(t){return r=t}),(function(t){return e(t)}),(function(){return t(r)}))}))},t.create=function(n){return new t(n)},t}();function Y(t){var n;return null!==(n=null!=t?t:w)&&void 0!==n?n:Promise}function B(t){return function(n){if(function(t){return c(null==t?void 0:t.lift)}(n))return n.lift((function(n){try{return t(n,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}var U=function(t){function e(n,e,r,i,o){var u=t.call(this,n)||this;return u.onFinalize=o,u._next=e?function(t){try{e(t)}catch(t){n.error(t)}}:t.prototype._next,u._error=i?function(t){try{i(t)}catch(t){n.error(t)}finally{this.unsubscribe()}}:t.prototype._error,u._complete=r?function(){try{r()}catch(t){n.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,u}return n(e,t),e.prototype.unsubscribe=function(){var n,e=this.closed;t.prototype.unsubscribe.call(this),!e&&(null===(n=this.onFinalize)||void 0===n||n.call(this))},e}(k);function W(t,n){return B((function(e,r){var i=0;e.subscribe(new U(r,(function(e){r.next(t.call(n,e,i++))})))}))}var V=function(t){return t&&"number"==typeof t.length&&"function"!=typeof t};function D(t){return c(null==t?void 0:t.then)}function N(t,n){return new M((function(e){var r=0;return n.schedule((function(){r===t.length?e.complete():(e.next(t[r++]),e.closed||this.schedule())}))}))}var G="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function X(t){return c(t[q])}function Z(t){return c(null==t?void 0:t[G])}function $(t){return Symbol.asyncIterator&&c(null==t?void 0:t[Symbol.asyncIterator])}function H(t){return new TypeError("You provided "+(null!==t&&"object"==typeof t?"an invalid object":"'"+t+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function J(t){return s(this,arguments,(function(){var n,r,i;return e(this,(function(e){switch(e.label){case 0:n=t.getReader(),e.label=1;case 1:e.trys.push([1,,9,10]),e.label=2;case 2:return[4,u(n.read())];case 3:return r=e.sent(),i=r.value,r.done?[4,u(void 0)]:[3,5];case 4:return[2,e.sent()];case 5:return[4,u(i)];case 6:return[4,e.sent()];case 7:return e.sent(),[3,2];case 8:return[3,10];case 9:return n.releaseLock(),[7];case 10:return[2]}}))}))}function K(t){return c(null==t?void 0:t.getReader)}function Q(t){if(t instanceof M)return t;if(null!=t){if(X(t))return i=t,new M((function(t){var n=i[q]();if(c(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(V(t))return tt(t);if(D(t))return e=t,new M((function(t){e.then((function(n){t.closed||(t.next(n),t.complete())}),(function(n){return t.error(n)})).then(null,_)}));if($(t))return nt(t);if(Z(t))return n=t,new M((function(t){var e,i;try{for(var o=r(n),u=o.next();!u.done;u=o.next()){var s=u.value;if(t.next(s),t.closed)return}}catch(t){e={error:t}}finally{try{u&&!u.done&&(i=o.return)&&i.call(o)}finally{if(e)throw e.error}}t.complete()}));if(K(t))return nt(J(t))}var n,e,i;throw H(t)}function tt(t){return new M((function(n){for(var e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()}))}function nt(t){return new M((function(n){(function(t,n){var i,o,u,s,c,a,l,f;return c=this,a=void 0,f=function(){var c,a;return e(this,(function(e){switch(e.label){case 0:e.trys.push([0,5,6,11]),i=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,e=t[Symbol.asyncIterator];return e?e.call(t):(t=r(t),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(e){n[e]=t[e]&&function(n){return new Promise((function(r,i){!function(t,n,e,r){Promise.resolve(r).then((function(n){t({value:n,done:e})}),n)}(r,i,(n=t[e](n)).done,n.value)}))}}}(t),e.label=1;case 1:return[4,i.next()];case 2:if((o=e.sent()).done)return[3,4];if(c=o.value,n.next(c),n.closed)return[2];e.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=e.sent(),u={error:a},[3,11];case 6:return e.trys.push([6,,9,10]),o&&!o.done&&(s=i.return)?[4,s.call(i)]:[3,8];case 7:e.sent(),e.label=8;case 8:return[3,10];case 9:if(u)throw u.error;return[7];case 10:return[7];case 11:return n.complete(),[2]}}))},new((l=void 0)||(l=Promise))((function(t,n){function e(t){try{i(f.next(t))}catch(t){n(t)}}function r(t){try{i(f.throw(t))}catch(t){n(t)}}function i(n){var i;n.done?t(n.value):(i=n.value,i instanceof l?i:new l((function(t){t(i)}))).then(e,r)}i((f=f.apply(c,a||[])).next())}))})(t,n).catch((function(t){return n.error(t)}))}))}function et(t,n,e){return void 0===e&&(e=1/0),c(n)?et((function(e,r){return W((function(t,i){return n(e,t,r,i)}))(Q(t(e,r)))}),e):("number"==typeof n&&(e=n),B((function(n,r){return function(t,n,e,r,i,o,u,s){var c=[],a=0,l=0,f=!1,h=function(){!f||c.length||a||n.complete()},d=function(t){return a<r?p(t):c.push(t)},p=function(t){a++;var i=!1;Q(e(t,l++)).subscribe(new U(n,(function(t){n.next(t)}),(function(){i=!0}),void 0,(function(){if(i)try{a--;for(;c.length&&a<r;)t=void 0,t=c.shift(),p(t);h()}catch(t){n.error(t)}var t})))};return t.subscribe(new U(n,d,(function(){f=!0,h()}))),function(){}}(n,r,t,e)})))}var rt=Array.isArray;function it(t,n){return n?N(t,n):tt(t)}var ot=["addListener","removeListener"],ut=["addEventListener","removeEventListener"],st=["on","off"];function ct(t,n,e,r){if(c(e)&&(r=e,e=void 0),r)return ct(t,n,e).pipe((u=r,W((function(t){return function(t,n){return rt(n)?t.apply(void 0,o([],i(n))):t(n)}(u,t)}))));var u,s=i(function(t){return c(t.addEventListener)&&c(t.removeEventListener)}(t)?ut.map((function(r){return function(i){return t[r](n,i,e)}})):function(t){return c(t.addListener)&&c(t.removeListener)}(t)?ot.map(at(t,n)):function(t){return c(t.on)&&c(t.off)}(t)?st.map(at(t,n)):[],2),a=s[0],l=s[1];if(!a&&V(t))return et((function(t){return ct(t,n,e)}))(it(t));if(!a)throw new TypeError("Invalid event target");return new M((function(t){var n=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return t.next(1<n.length?n:n[0])};return a(n),function(){return l(n)}}))}function at(t,n){return function(e){return function(r){return t[e](n,r)}}}function lt(t,n){return B((function(e,r){var i=0;e.subscribe(new U(r,(function(e){return t.call(n,e,i++)&&r.next(e)})))}))}function ft(t){return W((function(){return t}))}function ht(t){return void 0===t&&(t=1/0),et(L,t)}var dt=new M((function(t){return t.complete()}));function pt(t){return t&&c(t.schedule)}function vt(t){return t[t.length-1]}function yt(t){return c(vt(t))?t.pop():void 0}function bt(t){return pt(vt(t))?t.pop():void 0}function wt(t,n){return"number"==typeof vt(t)?t.pop():n}function mt(){return ht(1)}function gt(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return mt()(it(t,bt(t)))}function xt(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=bt(t);return B((function(n,r){(e?gt(t,n,e):gt(t,n)).subscribe(r)}))}function _t(t){return t<=0?function(){return dt}:B((function(n,e){var r=0;n.subscribe(new U(e,(function(n){++r<=t&&(e.next(n),t<=r&&e.complete())})))}))}var St=a((function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),Et=function(t){function e(){var n=t.call(this)||this;return n.closed=!1,n.observers=[],n.isStopped=!1,n.hasError=!1,n.thrownError=null,n}return n(e,t),e.prototype.lift=function(t){var n=new Tt(this,this);return n.operator=t,n},e.prototype._throwIfClosed=function(){if(this.closed)throw new St},e.prototype.next=function(t){var n=this;I((function(){var e,i;if(n._throwIfClosed(),!n.isStopped){var o=n.observers.slice();try{for(var u=r(o),s=u.next();!s.done;s=u.next())s.value.next(t)}catch(t){e={error:t}}finally{try{s&&!s.done&&(i=u.return)&&i.call(u)}finally{if(e)throw e.error}}}}))},e.prototype.error=function(t){var n=this;I((function(){if(n._throwIfClosed(),!n.isStopped){n.hasError=n.isStopped=!0,n.thrownError=t;for(var e=n.observers;e.length;)e.shift().error(t)}}))},e.prototype.complete=function(){var t=this;I((function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var n=t.observers;n.length;)n.shift().complete()}}))},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return(null===(t=this.observers)||void 0===t?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(n){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,n)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var n=this,e=n.hasError,r=n.isStopped,i=n.observers;return e||r?d:(i.push(t),new h((function(){return f(i,t)})))},e.prototype._checkFinalizedStatuses=function(t){var n=this,e=n.hasError,r=n.thrownError,i=n.isStopped;e?t.error(r):i&&t.complete()},e.prototype.asObservable=function(){var t=new M;return t.source=this,t},e.create=function(t,n){return new Tt(t,n)},e}(M),Tt=function(t){function e(n,e){var r=t.call(this)||this;return r.destination=n,r.source=e,r}return n(e,t),e.prototype.next=function(t){var n,e;null===(e=null===(n=this.destination)||void 0===n?void 0:n.next)||void 0===e||e.call(n,t)},e.prototype.error=function(t){var n,e;null===(e=null===(n=this.destination)||void 0===n?void 0:n.error)||void 0===e||e.call(n,t)},e.prototype.complete=function(){var t,n;null===(n=null===(t=this.destination)||void 0===t?void 0:t.complete)||void 0===n||n.call(t)},e.prototype._subscribe=function(t){var n,e;return null!==(e=null===(n=this.source)||void 0===n?void 0:n.subscribe(t))&&void 0!==e?e:d},e}(Et);function At(t){void 0===t&&(t={});var n=t.connector,e=void 0===n?function(){return new Et}:n,r=t.resetOnError,i=void 0===r||r,o=t.resetOnComplete,u=void 0===o||o,s=t.resetOnRefCountZero,c=void 0===s||s;return function(t){var n=null,r=null,o=null,s=0,a=!1,l=!1,f=function(){null==r||r.unsubscribe(),r=null},h=function(){f(),n=o=null,a=l=!1},d=function(){var t=n;h(),null==t||t.unsubscribe()};return B((function(t,p){s++,l||a||f();var v,y=o=null!=o?o:e();p.add((function(){0!=--s||l||a||(r=It(d,c))})),y.subscribe(p),n||(n=new R({next:function(t){return y.next(t)},error:function(t){l=!0,f(),r=It(h,i,t),y.error(t)},complete:function(){a=!0,f(),r=It(h,u),y.complete()}}),(v=t,Q(v)).subscribe(n))}))(t)}}function It(t,n){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];return!0===n?(t(),null):!1===n?null:n.apply(void 0,o([],i(e))).pipe(_t(1)).subscribe((function(){return t()}))}var Pt=Array.isArray;function kt(t){return 1===t.length&&Pt(t[0])?t[0]:t}function Rt(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=bt(t),r=wt(t,1/0);return t=kt(t),B((function(n,u){ht(r)(it(o([n],i(t)),e)).subscribe(u)}))}function Ft(t,n){return B((function(e,r){var i=null,o=0,u=!1,s=function(){return u&&!i&&r.complete()};e.subscribe(new U(r,(function(e){null==i||i.unsubscribe();var u=0,c=o++;Q(t(e,c)).subscribe(i=new U(r,(function(t){return r.next(n?n(e,t,c,u++):t)}),(function(){i=null,s()})))}),(function(){u=!0,s()})))}))}var Ot=function(t){function e(n,e){return t.call(this)||this}return n(e,t),e.prototype.schedule=function(t,n){return void 0===n&&(n=0),this},e}(h),Ct={setInterval:function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=Ct.delegate;return((null==e?void 0:e.setInterval)||setInterval).apply(void 0,o([],i(t)))},clearInterval:function(t){var n=Ct.delegate;return((null==n?void 0:n.clearInterval)||clearInterval)(t)},delegate:void 0},jt=function(t){function e(n,e){var r=t.call(this,n,e)||this;return r.scheduler=n,r.work=e,r.pending=!1,r}return n(e,t),e.prototype.schedule=function(t,n){if(void 0===n&&(n=0),this.closed)return this;this.state=t;var e=this.id,r=this.scheduler;return null!=e&&(this.id=this.recycleAsyncId(r,e,n)),this.pending=!0,this.delay=n,this.id=this.id||this.requestAsyncId(r,this.id,n),this},e.prototype.requestAsyncId=function(t,n,e){return void 0===e&&(e=0),Ct.setInterval(t.flush.bind(t,this),e)},e.prototype.recycleAsyncId=function(t,n,e){if(void 0===e&&(e=0),null!=e&&this.delay===e&&!1===this.pending)return n;Ct.clearInterval(n)},e.prototype.execute=function(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var e=this._execute(t,n);if(e)return e;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,n){var e,r=!1;try{this.work(t)}catch(t){r=!0,e=!!t&&t||new Error(t)}if(r)return this.unsubscribe(),e},e.prototype.unsubscribe=function(){if(!this.closed){var n=this.id,e=this.scheduler,r=e.actions;this.work=this.state=this.scheduler=null,this.pending=!1,f(r,this),null!=n&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,t.prototype.unsubscribe.call(this)}},e}(Ot),qt={now:function(){return(qt.delegate||Date).now()},delegate:void 0},Lt=function(){function t(n,e){void 0===e&&(e=t.now),this.schedulerActionCtor=n,this.now=e}return t.prototype.schedule=function(t,n,e){return void 0===n&&(n=0),new this.schedulerActionCtor(this,t).schedule(e,n)},t.now=qt.now,t}(),zt=function(t){function e(n,e){void 0===e&&(e=Lt.now);var r=t.call(this,n,e)||this;return r.actions=[],r._active=!1,r._scheduled=void 0,r}return n(e,t),e.prototype.flush=function(t){var n=this.actions;if(this._active)n.push(t);else{var e;this._active=!0;do{if(e=t.execute(t.state,t.delay))break}while(t=n.shift());if(this._active=!1,e){for(;t=n.shift();)t.unsubscribe();throw e}}},e}(Lt),Mt=new zt(jt),Yt=Mt;var Bt={schedule:function(t){var n=requestAnimationFrame,e=cancelAnimationFrame,r=Bt.delegate;r&&(n=r.requestAnimationFrame,e=r.cancelAnimationFrame);var i=n((function(n){e=void 0,t(n)}));return new h((function(){return null==e?void 0:e(i)}))},requestAnimationFrame:function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=Bt.delegate;return((null==e?void 0:e.requestAnimationFrame)||requestAnimationFrame).apply(void 0,o([],i(t)))},cancelAnimationFrame:function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=Bt.delegate;return((null==e?void 0:e.cancelAnimationFrame)||cancelAnimationFrame).apply(void 0,o([],i(t)))},delegate:void 0},Ut=function(t){function e(n,e){var r=t.call(this,n,e)||this;return r.scheduler=n,r.work=e,r}return n(e,t),e.prototype.requestAsyncId=function(n,e,r){return void 0===r&&(r=0),null!==r&&r>0?t.prototype.requestAsyncId.call(this,n,e,r):(n.actions.push(this),n._scheduled||(n._scheduled=Bt.requestAnimationFrame((function(){return n.flush(void 0)}))))},e.prototype.recycleAsyncId=function(n,e,r){if(void 0===r&&(r=0),null!=r&&r>0||null==r&&this.delay>0)return t.prototype.recycleAsyncId.call(this,n,e,r);0===n.actions.length&&(Bt.cancelAnimationFrame(e),n._scheduled=void 0)},e}(jt),Wt=new(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.flush=function(t){this._active=!0,this._scheduled=void 0;var n,e=this.actions,r=-1;t=t||e.shift();var i=e.length;do{if(n=t.execute(t.state,t.delay))break}while(++r<i&&(t=e.shift()));if(this._active=!1,n){for(;++r<i&&(t=e.shift());)t.unsubscribe();throw n}},e}(zt))(Ut);function Vt(t,n,e,r,i){return function(o,u){var s=e,c=n,a=0;o.subscribe(new U(u,(function(n){var e=a++;c=s?t(c,n,e):(s=!0,n),r&&u.next(c)}),i&&function(){s&&u.next(c),u.complete()}))}}function Dt(t,n){return B(Vt(t,n,arguments.length>=2,!0))}var Nt=function(t,n){this.value=t,this.interval=n};function Gt(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=bt(t);return e?N(t,e):it(t)}function Xt(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=yt(t);return B((function(n,r){for(var u=t.length,s=new Array(u),c=t.map((function(){return!1})),a=!1,l=function(n){Q(t[n]).subscribe(new U(r,(function(t){s[n]=t,a||c[n]||(c[n]=!0,(a=c.every(L))&&(c=null))}),S))},f=0;f<u;f++)l(f);n.subscribe(new U(r,(function(t){if(a){var n=o([t],i(s));r.next(e?e.apply(void 0,o([],i(n))):n)}})))}))}var Zt=function(t){function e(n,e,r){void 0===n&&(n=1/0),void 0===e&&(e=1/0),void 0===r&&(r=qt);var i=t.call(this)||this;return i._bufferSize=n,i._windowTime=e,i._timestampProvider=r,i._buffer=[],i._infiniteTimeWindow=!0,i._infiniteTimeWindow=e===1/0,i._bufferSize=Math.max(1,n),i._windowTime=Math.max(1,e),i}return n(e,t),e.prototype.next=function(n){var e=this,r=e.isStopped,i=e._buffer,o=e._infiniteTimeWindow,u=e._timestampProvider,s=e._windowTime;r||(i.push(n),!o&&i.push(u.now()+s)),this._trimBuffer(),t.prototype.next.call(this,n)},e.prototype._subscribe=function(t){this._throwIfClosed(),this._trimBuffer();for(var n=this._innerSubscribe(t),e=this._infiniteTimeWindow,r=this._buffer.slice(),i=0;i<r.length&&!t.closed;i+=e?1:2)t.next(r[i]);return this._checkFinalizedStatuses(t),n},e.prototype._trimBuffer=function(){var t=this,n=t._bufferSize,e=t._timestampProvider,r=t._buffer,i=t._infiniteTimeWindow,o=(i?1:2)*n;if(n<1/0&&o<r.length&&r.splice(0,r.length-o),!i){for(var u=e.now(),s=0,c=1;c<r.length&&r[c]<=u;c+=2)s=c;s&&r.splice(0,s+1)}},e}(Et);function $t(t,n,e){var r,i,o,u=!1;return t&&"object"==typeof t?(o=null!==(r=t.bufferSize)&&void 0!==r?r:1/0,n=null!==(i=t.windowTime)&&void 0!==i?i:1/0,u=!!t.refCount,e=t.scheduler):o=null!=t?t:1/0,At({connector:function(){return new Zt(o,n,e)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:u})}var Ht=function(t){function e(n){var e=t.call(this)||this;return e._value=n,e}return n(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(n){var e=t.prototype._subscribe.call(this,n);return!e.closed&&n.next(this._value),e},e.prototype.getValue=function(){var t=this,n=t.hasError,e=t.thrownError,r=t._value;if(n)throw e;return this._throwIfClosed(),r},e.prototype.next=function(n){t.prototype.next.call(this,this._value=n)},e}(Et),Jt=a((function(t){return function(){t(this),this.name="EmptyError",this.message="no elements in sequence"}}));function Kt(t){return B((function(n,e){var r=!1;n.subscribe(new U(e,(function(t){r=!0,e.next(t)}),(function(){r||e.next(t),e.complete()})))}))}function Qt(t){return void 0===t&&(t=tn),B((function(n,e){var r=!1;n.subscribe(new U(e,(function(t){r=!0,e.next(t)}),(function(){return r?e.complete():e.error(t())})))}))}function tn(){return new Jt}function nn(t,n,e,r){this.x=t||0,this.y=n||0,this.radius=e||12,this.color=r||"#6699FF",this.scaleX=1,this.scaleY=1}function en(t,n,e,r,i,o){this.x=t||0,this.y=n||0,this.width=e,this.height=r,this.color=i||"#6699FF",this.borderRadius=o||0}function rn(t){t.translate(this.x,this.y),t.moveTo(-this.width/2,-this.height/2),t.lineTo(this.width/2,-this.height/2),t.lineTo(this.width/2,this.height/2),t.lineTo(-this.width/2,this.height/2)}function on(t){t.translate(this.x,this.y),t.moveTo(-this.width/2+this.borderRadius,-this.height/2),t.lineTo(this.width/2-this.borderRadius,-this.height/2),t.arcTo(this.width/2,-this.height/2,this.width/2,-this.height/2+this.borderRadius,this.borderRadius),t.lineTo(this.width/2,this.height/2-this.borderRadius),t.arcTo(this.width/2,this.height/2,this.width/2-this.borderRadius,this.height/2,this.borderRadius),t.lineTo(-this.width/2+this.borderRadius,this.height/2),t.arcTo(-this.width/2,this.height/2,-this.width/2,-this.height/2+this.borderRadius,this.borderRadius),t.lineTo(-this.width/2,-this.height/2+this.borderRadius),t.arcTo(-this.width/2,-this.height/2,-this.width/2+this.borderRadius,-this.height/2,this.borderRadius)}nn.prototype={stroke:function(t){t.save(),t.scale(this.scaleX,this.scaleY),t.strokeStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,360*Math.PI/180,!1),t.closePath(),t.stroke(),t.restore()},fill:function(t){t.save(),t.translate(this.x,this.y),t.fillStyle=this.color,t.beginPath(),t.arc(0,0,this.radius,0,360*Math.PI/180,!1),t.closePath(),t.fill(),t.restore()},getRect:function(){return{x:this.x-this.radius,y:this.y-this.radius,width:2*this.radius,height:2*this.radius}}},en.prototype={stroke:function(t){t.save(),t.strokeStyle=this.color,t.beginPath(),this.borderRadius>0?on.bind(this)(t):rn.bind(this)(t),t.closePath(),t.stroke(),t.restore()},fill:function(t){t.save(),t.fillStyle=this.color,t.beginPath(),this.borderRadius>0?on.bind(this)(t):rn.bind(this)(t),t.closePath(),t.fill(),t.restore()}};const un=480,sn=320,cn=Math.ceil(1e3/60),an="#FFC947",ln={x:240,y:160,radius:7,color:an},fn="#EFEFEF",hn=new Map;hn.set("ArrowLeft",-1),hn.set("ArrowRight",1);const dn=[240,303.2],pn={x:dn[0],y:dn[1],width:100,height:12,color:fn,borderRadius:5},vn="rgba(255, 255, 255, 0.7)";function yn(t){t.fillStyle="#0A1931",t.fillRect(0,0,un,sn)}function bn(t,n,e,r,i,o,u="center",s="middle"){t.fillStyle=i,t.font=`bold ${o}px sans-serif`;let c=e,a=r;t.textAlign=u,t.textBaseline=s,t.fillText(n,c,a)}function wn(){let t=456/7,n=[];for(let e=0;e<5;e++)for(let r=0;r<7;r++)n.push({x:r*(t+3)+t/2+3,y:23*e+10+3+20,width:t,height:20,color:"#185ADB"});return n}let mn=function(){const t=document.createElement("canvas");return t.width=un,t.height=sn,t}(),gn=mn.getContext("2d");document.body.appendChild(mn);const xn=ct(document,"keydown"),_n=ct(document,"keyup"),Sn=xn.pipe(lt((t=>"r"===t.key)),ft("RESET")),En=xn.pipe(lt((t=>"Enter"===t.key)),ft("START")),Tn=xn.pipe(lt((t=>" "===t.key)),ft("PAUSE")),An=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var e=bt(t),r=wt(t,1/0),i=t;return i.length?1===i.length?Q(i[0]):ht(r)(it(i,e)):dt}(xn,_n).pipe(W((t=>"keyup"===t.type&&hn.has(t.key)?0:hn.get(t.key))),lt((t=>null!=t)),xt(0),At()),In=En.pipe(function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return Rt.apply(void 0,o([],i(t)))}(Tn,Sn),Ft((t=>{switch(t){case"START":return(n=cn,e=Wt,void 0===n&&(n=0),void 0===e&&(e=Mt),n<0&&(n=0),function(t,n,e){void 0===t&&(t=0),void 0===e&&(e=Yt);var r=-1;return null!=n&&(pt(n)?e=n:r=n),new M((function(n){var i,o=(i=t)instanceof Date&&!isNaN(i)?+t-e.now():t;o<0&&(o=0);var u=0;return e.schedule((function(){n.closed||(n.next(u++),0<=r?this.schedule(void 0,r):n.complete())}),o)}))}(n,n,e)).pipe(function(t){return void 0===t&&(t=Yt),function(n){return e=function(){return n.pipe(Dt((function(n,e){var r=n.current;return{value:e,current:t.now(),last:r}}),{current:t.now(),value:void 0,last:void 0}),W((function(t){var n=t.current,e=t.last,r=t.value;return new Nt(r,n-e)})))},new M((function(t){Q(e()).subscribe(t)}));var e}}(),W((t=>t.interval/1e3)));case"PAUSE":return dt;case"RESET":return Gt(0)}var n,e})),At()),Pn=Gt("start").pipe(W((()=>In)),Ft((function(t){const n=t.pipe(Xt(An),Dt(((t,[n,e])=>{let r=t.x+240*+e*+n;return r=function(t,n){return t-n.width/2<-5||t+n.width/2>485}(r,t)?t.x:r,{...t,x:r}}),pn),xt(pn),$t(1)),e=new Ht(120),r=new Ht(120),i=t.pipe(Xt(n,e,r),Dt((([t,n],[i,o,u,s])=>{let c=t.x+u*i,a=t.y+s*i;if(function(t){return t.x>un-t.radius}(t)&&(c=un-t.radius,e.next(-u)),function(t){return t.x<t.radius}(t)&&(c=t.radius,e.next(-u)),function(t,n){return t.y>n.y-n.height/2-t.radius&&t.x<n.x+n.width/2&&t.x>n.x-n.width/2}(t,o)){a=o.y-o.height/2-t.radius,r.next(-s);const c=(n.x-o.x)/i;e.next(u-.08*c)}return function(t){return t.y<t.radius}(t)&&(a=t.radius,r.next(-s)),[{...t,x:c,y:a},o]}),[ln,pn]),xt([ln,pn]),W((([t])=>t)),$t(1)),o=new Et,u=i.pipe(Dt(((t,n)=>{let e=[];return t.forEach(((t,i)=>{if(function(t,n){return n.y<t.y+t.height/2+n.radius&&n.y>t.y-t.height/2-n.radius&&n.x<t.x+t.width/2+n.radius&&n.x>t.x-t.width/2-n.radius}(t,n)){o.next();const t=r.getValue();r.next(-t)}else e.push(t)})),e}),wn()),xt(wn()),$t(1)),s=o.pipe(ft(1),Dt(((t,n)=>t+10*n),0),xt(0));return t.pipe(Xt(n,i,u,s))})),(kn=([t,n,e,r])=>!function(t){return t.y>sn-t.radius}(e)&&0!==t&&r.length>0,void 0===Rn&&(Rn=!1),B((function(t,n){t.subscribe(new U(n,(function(t){var e=kn(t);(e||Rn)&&n.next(t),!e&&n.complete()})))}))));var kn,Rn;const Fn={next:([t,n,e,r,i])=>{gn.clearRect(0,0,un,sn),yn(gn),function(t,n){new en(n.x,n.y,n.width,n.height,fn,5).fill(t)}(gn,n),function(t,n){new nn(n.x,n.y,n.radius,an).fill(t)}(gn,e),function(t,n){n.forEach((n=>function(t,n){new en(n.x,n.y,n.width,n.height,n.color).fill(t)}(t,n)))}(gn,r),function(t,n){bn(t,n.toString(),240,12,"#EFEFEF",15)}(gn,i)},complete:()=>{!function(t){t.fillStyle=vn,t.fillRect(0,0,un,sn),bn(t,"GAME OVER!",240,160,"black",25)}(gn),En.pipe(function(t,n){var e=arguments.length>=2;return function(r){return r.pipe(t?lt((function(n,e){return t(n,e,r)})):L,_t(1),e?Kt(n):Qt((function(){return new Jt})))}}()).subscribe(On)}};function On(){gn.clearRect(0,0,un,sn),Pn.subscribe(Fn),yn(gn),function(t){t.fillStyle=vn,t.fillRect(0,0,un,sn),bn(t,"Press [enter]",240,160,"black",25)}(gn)}On()})();
//# sourceMappingURL=main.bundle.js.map