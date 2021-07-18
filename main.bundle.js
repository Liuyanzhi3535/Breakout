/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BehaviorSubject": () => (/* binding */ BehaviorSubject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subject */ "../node_modules/rxjs/dist/esm5/internal/Subject.js");


var BehaviorSubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__.Subject));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_NOTIFICATION": () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   "errorNotification": () => (/* binding */ errorNotification),
/* harmony export */   "nextNotification": () => (/* binding */ nextNotification),
/* harmony export */   "createNotification": () => (/* binding */ createNotification)
/* harmony export */ });
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!*************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "../node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "../node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return operations.length ? (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this) : this;
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) || (isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value));
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/ReplaySubject.js":
/*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/ReplaySubject.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReplaySubject": () => (/* binding */ ReplaySubject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Subject */ "../node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js");



var ReplaySubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__.dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_2__.Subject));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/Scheduler.js":
/*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Scheduler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scheduler": () => (/* binding */ Scheduler)
/* harmony export */ });
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js");

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__.dateTimestampProvider.now;
    return Scheduler;
}());



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/Subject.js":
/*!**********************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subject.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subject": () => (/* binding */ Subject),
/* harmony export */   "AnonymousSubject": () => (/* binding */ AnonymousSubject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/arrRemove */ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js");






var Subject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                var copy = _this.observers.slice();
                try {
                    for (var copy_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
                        var observer = copy_1_1.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        return hasError || isStopped
            ? _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION
            : (observers.push(subscriber), new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(function () { return (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(observers, subscriber); }));
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new _Observable__WEBPACK_IMPORTED_MODULE_5__.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(_Observable__WEBPACK_IMPORTED_MODULE_5__.Observable));

var AnonymousSubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!*************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subscriber": () => (/* binding */ Subscriber),
/* harmony export */   "SafeSubscriber": () => (/* binding */ SafeSubscriber),
/* harmony export */   "EMPTY_OBSERVER": () => (/* binding */ EMPTY_OBSERVER)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "../node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/reportUnhandledError */ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/noop */ "../node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

var SafeSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var next;
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            (next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete);
            var context_1;
            if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
            }
            else {
                context_1 = observerOrNext;
            }
            next = next === null || next === void 0 ? void 0 : next.bind(context_1);
            error = error === null || error === void 0 ? void 0 : error.bind(context_1);
            complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
        }
        _this.destination = {
            next: next ? wrapForErrorHandling(next, _this) : _util_noop__WEBPACK_IMPORTED_MODULE_5__.noop,
            error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler, _this),
            complete: complete ? wrapForErrorHandling(complete, _this) : _util_noop__WEBPACK_IMPORTED_MODULE_5__.noop,
        };
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function wrapForErrorHandling(handler, instance) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            handler.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        catch (err) {
            if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
                (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_6__.captureError)(err);
            }
            else {
                (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_7__.reportUnhandledError)(err);
            }
        }
    };
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
    onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_8__.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: _util_noop__WEBPACK_IMPORTED_MODULE_5__.noop,
    error: defaultErrorHandler,
    complete: _util_noop__WEBPACK_IMPORTED_MODULE_5__.noop,
};


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!***************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subscription": () => (/* binding */ Subscription),
/* harmony export */   "EMPTY_SUBSCRIPTION": () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   "isSubscription": () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe)));
}
function execTeardown(teardown) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/config.js":
/*!*********************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/config.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/concat.js":
/*!********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/concat.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concat": () => (/* binding */ concat)
/* harmony export */ });
/* harmony import */ var _operators_concatAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operators/concatAll */ "../node_modules/rxjs/dist/esm5/internal/operators/concatAll.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fromArray */ "../node_modules/rxjs/dist/esm5/internal/observable/fromArray.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/args */ "../node_modules/rxjs/dist/esm5/internal/util/args.js");



function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (0,_operators_concatAll__WEBPACK_IMPORTED_MODULE_0__.concatAll)()((0,_fromArray__WEBPACK_IMPORTED_MODULE_1__.internalFromArray)(args, (0,_util_args__WEBPACK_IMPORTED_MODULE_2__.popScheduler)(args)));
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/defer.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/defer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defer": () => (/* binding */ defer)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");


function defer(observableFactory) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        (0,_from__WEBPACK_IMPORTED_MODULE_1__.innerFrom)(observableFactory()).subscribe(subscriber);
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/empty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY": () => (/* binding */ EMPTY),
/* harmony export */   "empty": () => (/* binding */ empty)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");

var EMPTY = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/from.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/from.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "from": () => (/* binding */ from),
/* harmony export */   "innerFrom": () => (/* binding */ innerFrom),
/* harmony export */   "fromArrayLike": () => (/* binding */ fromArrayLike)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isArrayLike */ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isPromise */ "../node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduled/scheduled */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../util/reportUnhandledError */ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isInteropObservable */ "../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isAsyncIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/throwUnobservableError */ "../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");













function from(input, scheduler) {
    return scheduler ? (0,_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__.scheduled)(input, scheduler) : innerFrom(input);
}
function innerFrom(input) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable) {
        return input;
    }
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_2__.isInteropObservable)(input)) {
            return fromInteropObservable(input);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(input)) {
            return fromArrayLike(input);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_4__.isPromise)(input)) {
            return fromPromise(input);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_5__.isAsyncIterable)(input)) {
            return fromAsyncIterable(input);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_6__.isIterable)(input)) {
            return fromIterable(input);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_7__.isReadableStreamLike)(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_8__.createInvalidObservableTypeError)(input);
}
function fromInteropObservable(obj) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(function (subscriber) {
        var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_9__.observable]();
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_10__.isFunction)(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_11__.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_7__.readableStreamLikeToAsyncGenerator)(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function () {
        var value, e_2_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__asyncValues)(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/fromArray.js":
/*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/fromArray.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "internalFromArray": () => (/* binding */ internalFromArray)
/* harmony export */ });
/* harmony import */ var _scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduled/scheduleArray */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");


function internalFromArray(input, scheduler) {
    return scheduler ? (0,_scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_0__.scheduleArray)(input, scheduler) : (0,_from__WEBPACK_IMPORTED_MODULE_1__.fromArrayLike)(input);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":
/*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromEvent": () => (/* binding */ fromEvent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operators/mergeMap */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isArrayLike */ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/mapOneOrManyArgs */ "../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fromArray */ "../node_modules/rxjs/dist/esm5/internal/observable/fromArray.js");







var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.mapOneOrManyArgs)(resultSelector));
    }
    var _a = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(target)) {
            return (0,_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(function (subTarget) { return fromEvent(subTarget, eventName, options); })((0,_fromArray__WEBPACK_IMPORTED_MODULE_5__.internalFromArray)(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_6__.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.on) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.off);
}
function isEventTarget(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addEventListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeEventListener);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/interval.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/interval.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interval": () => (/* binding */ interval)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "../node_modules/rxjs/dist/esm5/internal/scheduler/async.js");
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer */ "../node_modules/rxjs/dist/esm5/internal/observable/timer.js");


function interval(period, scheduler) {
    if (period === void 0) { period = 0; }
    if (scheduler === void 0) { scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler; }
    if (period < 0) {
        period = 0;
    }
    return (0,_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(period, period, scheduler);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/merge.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/merge.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "merge": () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var _operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../operators/mergeAll */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fromArray */ "../node_modules/rxjs/dist/esm5/internal/observable/fromArray.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty */ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "../node_modules/rxjs/dist/esm5/internal/util/args.js");





function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(args);
    var concurrent = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popNumber)(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            _empty__WEBPACK_IMPORTED_MODULE_1__.EMPTY
        : sources.length === 1
            ?
                (0,_from__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(sources[0])
            :
                (0,_operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__.mergeAll)(concurrent)((0,_fromArray__WEBPACK_IMPORTED_MODULE_4__.internalFromArray)(sources, scheduler));
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/of.js":
/*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/of.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "of": () => (/* binding */ of)
/* harmony export */ });
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fromArray */ "../node_modules/rxjs/dist/esm5/internal/observable/fromArray.js");
/* harmony import */ var _scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduled/scheduleArray */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "../node_modules/rxjs/dist/esm5/internal/util/args.js");



function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(args);
    return scheduler ? (0,_scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_1__.scheduleArray)(args, scheduler) : (0,_fromArray__WEBPACK_IMPORTED_MODULE_2__.internalFromArray)(args);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/observable/timer.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/timer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "../node_modules/rxjs/dist/esm5/internal/scheduler/async.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isScheduler */ "../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js");
/* harmony import */ var _util_isDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isDate */ "../node_modules/rxjs/dist/esm5/internal/util/isDate.js");




function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if ((0,_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__.isScheduler)(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_2__.Observable(function (subscriber) {
        var due = (0,_util_isDate__WEBPACK_IMPORTED_MODULE_3__.isValidDate)(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OperatorSubscriber": () => (/* binding */ OperatorSubscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js");


var OperatorSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        var closed = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    };
    return OperatorSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/concatAll.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/concatAll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatAll": () => (/* binding */ concatAll)
/* harmony export */ });
/* harmony import */ var _mergeAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeAll */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js");

function concatAll() {
    return (0,_mergeAll__WEBPACK_IMPORTED_MODULE_0__.mergeAll)(1);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js":
/*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultIfEmpty": () => (/* binding */ defaultIfEmpty)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function defaultIfEmpty(defaultValue) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filter": () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function filter(predicate, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/first.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/first.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "first": () => (/* binding */ first)
/* harmony export */ });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/EmptyError */ "../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter */ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var _take__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./take */ "../node_modules/rxjs/dist/esm5/internal/operators/take.js");
/* harmony import */ var _defaultIfEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultIfEmpty */ "../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js");
/* harmony import */ var _throwIfEmpty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./throwIfEmpty */ "../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/identity */ "../node_modules/rxjs/dist/esm5/internal/util/identity.js");






function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? (0,_filter__WEBPACK_IMPORTED_MODULE_0__.filter)(function (v, i) { return predicate(v, i, source); }) : _util_identity__WEBPACK_IMPORTED_MODULE_1__.identity, (0,_take__WEBPACK_IMPORTED_MODULE_2__.take)(1), hasDefaultValue ? (0,_defaultIfEmpty__WEBPACK_IMPORTED_MODULE_3__.defaultIfEmpty)(defaultValue) : (0,_throwIfEmpty__WEBPACK_IMPORTED_MODULE_4__.throwIfEmpty)(function () { return new _util_EmptyError__WEBPACK_IMPORTED_MODULE_5__.EmptyError(); }));
    };
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/map.js":
/*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map": () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function map(project, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/mapTo.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mapTo.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapTo": () => (/* binding */ mapTo)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js");

function mapTo(value) {
    return (0,_map__WEBPACK_IMPORTED_MODULE_0__.map)(function () { return value; });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/merge.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/merge.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "merge": () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _util_argsOrArgArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/argsOrArgArray */ "../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js");
/* harmony import */ var _observable_fromArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../observable/fromArray */ "../node_modules/rxjs/dist/esm5/internal/observable/fromArray.js");
/* harmony import */ var _mergeAll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mergeAll */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "../node_modules/rxjs/dist/esm5/internal/util/args.js");






function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(args);
    var concurrent = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popNumber)(args, Infinity);
    args = (0,_util_argsOrArgArray__WEBPACK_IMPORTED_MODULE_1__.argsOrArgArray)(args);
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_2__.operate)(function (source, subscriber) {
        (0,_mergeAll__WEBPACK_IMPORTED_MODULE_3__.mergeAll)(concurrent)((0,_observable_fromArray__WEBPACK_IMPORTED_MODULE_4__.internalFromArray)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)([source], (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__read)(args)), scheduler)).subscribe(subscriber);
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js":
/*!*********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeAll": () => (/* binding */ mergeAll)
/* harmony export */ });
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeMap */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/identity */ "../node_modules/rxjs/dist/esm5/internal/util/identity.js");


function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return (0,_mergeMap__WEBPACK_IMPORTED_MODULE_0__.mergeMap)(_util_identity__WEBPACK_IMPORTED_MODULE_1__.identity, concurrent);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":
/*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInternals": () => (/* binding */ mergeInternals)
/* harmony export */ });
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        (0,_observable_from__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(project(value, index++)).subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        innerSubScheduler ? subscriber.add(innerSubScheduler.schedule(function () { return doInnerSub(bufferedValue); })) : doInnerSub(bufferedValue);
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
    };
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":
/*!*********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeMap": () => (/* binding */ mergeMap)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _mergeInternals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeInternals */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");





function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(resultSelector)) {
        return mergeMap(function (a, i) { return (0,_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (b, ii) { return resultSelector(a, b, i, ii); })((0,_observable_from__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_3__.operate)(function (source, subscriber) { return (0,_mergeInternals__WEBPACK_IMPORTED_MODULE_4__.mergeInternals)(source, subscriber, project, concurrent); });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeWith": () => (/* binding */ mergeWith)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./merge */ "../node_modules/rxjs/dist/esm5/internal/operators/merge.js");


function mergeWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return _merge__WEBPACK_IMPORTED_MODULE_0__.merge.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__read)(otherSources)));
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/scan.js":
/*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/scan.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scan": () => (/* binding */ scan)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _scanInternals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scanInternals */ "../node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js");


function scan(accumulator, seed) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)((0,_scanInternals__WEBPACK_IMPORTED_MODULE_1__.scanInternals)(accumulator, seed, arguments.length >= 2, true));
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js":
/*!**************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scanInternals": () => (/* binding */ scanInternals)
/* harmony export */ });
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");

function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return function (source, subscriber) {
        var hasState = hasSeed;
        var state = seed;
        var index = 0;
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_0__.OperatorSubscriber(subscriber, function (value) {
            var i = index++;
            state = hasState
                ?
                    accumulator(state, value, i)
                :
                    ((hasState = true), value);
            emitOnNext && subscriber.next(state);
        }, emitBeforeComplete &&
            (function () {
                hasState && subscriber.next(state);
                subscriber.complete();
            })));
    };
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/share.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/share.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "share": () => (/* binding */ share)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observable/from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _operators_take__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../operators/take */ "../node_modules/rxjs/dist/esm5/internal/operators/take.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subject */ "../node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");






function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection = null;
        var resetConnection = null;
        var subject = null;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = null;
        };
        var reset = function () {
            cancelReset();
            connection = subject = null;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection) {
                connection = new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                (0,_observable_from__WEBPACK_IMPORTED_MODULE_3__.from)(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return null;
    }
    if (on === false) {
        return null;
    }
    return on.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__read)(args))).pipe((0,_operators_take__WEBPACK_IMPORTED_MODULE_5__.take)(1))
        .subscribe(function () { return reset(); });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js":
/*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shareReplay": () => (/* binding */ shareReplay)
/* harmony export */ });
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReplaySubject */ "../node_modules/rxjs/dist/esm5/internal/ReplaySubject.js");
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./share */ "../node_modules/rxjs/dist/esm5/internal/operators/share.js");


function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a, _b;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        bufferSize = (_a = configOrBufferSize.bufferSize) !== null && _a !== void 0 ? _a : Infinity;
        windowTime = (_b = configOrBufferSize.windowTime) !== null && _b !== void 0 ? _b : Infinity;
        refCount = !!configOrBufferSize.refCount;
        scheduler = configOrBufferSize.scheduler;
    }
    else {
        bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
    }
    return (0,_share__WEBPACK_IMPORTED_MODULE_0__.share)({
        connector: function () { return new _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(bufferSize, windowTime, scheduler); },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/startWith.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/startWith.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startWith": () => (/* binding */ startWith)
/* harmony export */ });
/* harmony import */ var _observable_concat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/concat */ "../node_modules/rxjs/dist/esm5/internal/observable/concat.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "../node_modules/rxjs/dist/esm5/internal/util/args.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");



function startWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(values);
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
        (scheduler ? (0,_observable_concat__WEBPACK_IMPORTED_MODULE_2__.concat)(values, source, scheduler) : (0,_observable_concat__WEBPACK_IMPORTED_MODULE_2__.concat)(values, source)).subscribe(subscriber);
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "switchMap": () => (/* binding */ switchMap)
/* harmony export */ });
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function switchMap(project, resultSelector) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            (0,_observable_from__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(value, outerIndex)).subscribe((innerSubscriber = new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/take.js":
/*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/take.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "take": () => (/* binding */ take)
/* harmony export */ });
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/empty */ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function take(count) {
    return count <= 0
        ?
            function () { return _observable_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY; }
        : (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
            var seen = 0;
            source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.OperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function takeWhile(predicate, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (value) {
            var result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
        }));
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js":
/*!*************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "throwIfEmpty": () => (/* binding */ throwIfEmpty)
/* harmony export */ });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/EmptyError */ "../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
function defaultErrorFactory() {
    return new _util_EmptyError__WEBPACK_IMPORTED_MODULE_2__.EmptyError();
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/timeInterval.js":
/*!*************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/timeInterval.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeInterval": () => (/* binding */ timeInterval),
/* harmony export */   "TimeInterval": () => (/* binding */ TimeInterval)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "../node_modules/rxjs/dist/esm5/internal/scheduler/async.js");
/* harmony import */ var _scan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scan */ "../node_modules/rxjs/dist/esm5/internal/operators/scan.js");
/* harmony import */ var _observable_defer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observable/defer */ "../node_modules/rxjs/dist/esm5/internal/observable/defer.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js");




function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.async; }
    return function (source) {
        return (0,_observable_defer__WEBPACK_IMPORTED_MODULE_1__.defer)(function () {
            return source.pipe((0,_scan__WEBPACK_IMPORTED_MODULE_2__.scan)(function (_a, value) {
                var current = _a.current;
                return ({ value: value, current: scheduler.now(), last: current });
            }, {
                current: scheduler.now(),
                value: undefined,
                last: undefined,
            }), (0,_map__WEBPACK_IMPORTED_MODULE_3__.map)(function (_a) {
                var current = _a.current, last = _a.last, value = _a.value;
                return new TimeInterval(value, current - last);
            }));
        });
    };
}
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js":
/*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withLatestFrom": () => (/* binding */ withLatestFrom)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/from */ "../node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/identity */ "../node_modules/rxjs/dist/esm5/internal/util/identity.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/noop */ "../node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ "../node_modules/rxjs/dist/esm5/internal/util/args.js");







function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var project = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popResultSelector)(inputs);
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function () { return false; });
        var ready = false;
        var _loop_1 = function (i) {
            (0,_observable_from__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(inputs[i]).subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__.OperatorSubscriber(subscriber, function (value) {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(_util_identity__WEBPACK_IMPORTED_MODULE_4__.identity)) && (hasValue = null);
                }
            }, _util_noop__WEBPACK_IMPORTED_MODULE_5__.noop));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        source.subscribe(new _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__.OperatorSubscriber(subscriber, function (value) {
            if (ready) {
                var values = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__spreadArray)([value], (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__read)(otherValues));
                subscriber.next(project ? project.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__read)(values))) : values);
            }
        }));
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js":
/*!**************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleArray": () => (/* binding */ scheduleArray)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");

function scheduleArray(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleAsyncIterable": () => (/* binding */ scheduleAsyncIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js");


function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription();
        sub.add(scheduler.schedule(function () {
            var iterator = input[Symbol.asyncIterator]();
            sub.add(scheduler.schedule(function () {
                var _this = this;
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                        _this.schedule();
                    }
                });
            }));
        }));
        return sub;
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleIterable": () => (/* binding */ scheduleIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_caughtSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/caughtSchedule */ "../node_modules/rxjs/dist/esm5/internal/util/caughtSchedule.js");




function scheduleIterable(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var iterator;
        subscriber.add(scheduler.schedule(function () {
            iterator = input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]();
            (0,_util_caughtSchedule__WEBPACK_IMPORTED_MODULE_2__.caughtSchedule)(subscriber, scheduler, function () {
                var _a = iterator.next(), value = _a.value, done = _a.done;
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                    this.schedule();
                }
            });
        }));
        return function () { return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleObservable": () => (/* binding */ scheduleObservable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js");



function scheduleObservable(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription();
        sub.add(scheduler.schedule(function () {
            var observable = input[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable]();
            sub.add(observable.subscribe({
                next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
            }));
        }));
        return sub;
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js":
/*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schedulePromise": () => (/* binding */ schedulePromise)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js");

function schedulePromise(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        return scheduler.schedule(function () {
            return input.then(function (value) {
                subscriber.add(scheduler.schedule(function () {
                    subscriber.next(value);
                    subscriber.add(scheduler.schedule(function () { return subscriber.complete(); }));
                }));
            }, function (err) {
                subscriber.add(scheduler.schedule(function () { return subscriber.error(err); }));
            });
        });
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleReadableStreamLike": () => (/* binding */ scheduleReadableStreamLike)
/* harmony export */ });
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");


function scheduleReadableStreamLike(input, scheduler) {
    return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__.scheduleAsyncIterable)((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__.readableStreamLikeToAsyncGenerator)(input), scheduler);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduled": () => (/* binding */ scheduled)
/* harmony export */ });
/* harmony import */ var _scheduleObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduleObservable */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js");
/* harmony import */ var _schedulePromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schedulePromise */ "../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js");
/* harmony import */ var _scheduleArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduleArray */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _scheduleIterable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scheduleIterable */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js");
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isInteropObservable */ "../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isPromise */ "../node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/isIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isAsyncIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../util/throwUnobservableError */ "../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scheduleReadableStreamLike */ "../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js");













function scheduled(input, scheduler) {
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__.isInteropObservable)(input)) {
            return (0,_scheduleObservable__WEBPACK_IMPORTED_MODULE_1__.scheduleObservable)(input, scheduler);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return (0,_scheduleArray__WEBPACK_IMPORTED_MODULE_3__.scheduleArray)(input, scheduler);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_4__.isPromise)(input)) {
            return (0,_schedulePromise__WEBPACK_IMPORTED_MODULE_5__.schedulePromise)(input, scheduler);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__.isAsyncIterable)(input)) {
            return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__.scheduleAsyncIterable)(input, scheduler);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_8__.isIterable)(input)) {
            return (0,_scheduleIterable__WEBPACK_IMPORTED_MODULE_9__.scheduleIterable)(input, scheduler);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__.isReadableStreamLike)(input)) {
            return (0,_scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__.scheduleReadableStreamLike)(input, scheduler);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__.createInvalidObservableTypeError)(input);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/Action.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/Action.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Action": () => (/* binding */ Action)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js");


var Action = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimationFrameAction": () => (/* binding */ AnimationFrameAction)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AsyncAction */ "../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js");
/* harmony import */ var _animationFrameProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animationFrameProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js");



var AnimationFrameAction = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = _animationFrameProvider__WEBPACK_IMPORTED_MODULE_1__.animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            _animationFrameProvider__WEBPACK_IMPORTED_MODULE_1__.animationFrameProvider.cancelAnimationFrame(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(_AsyncAction__WEBPACK_IMPORTED_MODULE_2__.AsyncAction));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js":
/*!************************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimationFrameScheduler": () => (/* binding */ AnimationFrameScheduler)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncScheduler */ "../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js");


var AnimationFrameScheduler = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this._active = true;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        action = action || actions.shift();
        var count = actions.length;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this._active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(_AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__.AsyncScheduler));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js":
/*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncAction": () => (/* binding */ AsyncAction)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Action */ "../node_modules/rxjs/dist/esm5/internal/scheduler/Action.js");
/* harmony import */ var _intervalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intervalProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/arrRemove */ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var AsyncAction = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = (!!e && e) || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(_Action__WEBPACK_IMPORTED_MODULE_3__.Action));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js":
/*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncScheduler": () => (/* binding */ AsyncScheduler)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Scheduler */ "../node_modules/rxjs/dist/esm5/internal/Scheduler.js");


var AsyncScheduler = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = _Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(_Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler));



/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js":
/*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animationFrameScheduler": () => (/* binding */ animationFrameScheduler),
/* harmony export */   "animationFrame": () => (/* binding */ animationFrame)
/* harmony export */ });
/* harmony import */ var _AnimationFrameAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimationFrameAction */ "../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js");
/* harmony import */ var _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationFrameScheduler */ "../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js");


var animationFrameScheduler = new _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_0__.AnimationFrameScheduler(_AnimationFrameAction__WEBPACK_IMPORTED_MODULE_1__.AnimationFrameAction);
var animationFrame = animationFrameScheduler;


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animationFrameProvider": () => (/* binding */ animationFrameProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js");


var animationFrameProvider = {
    schedule: function (callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = animationFrameProvider.delegate;
        if (delegate) {
            request = delegate.requestAnimationFrame;
            cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function (timestamp) {
            cancel = undefined;
            callback(timestamp);
        });
        return new _Subscription__WEBPACK_IMPORTED_MODULE_0__.Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
    },
    requestAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__read)(args)));
    },
    cancelAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__read)(args)));
    },
    delegate: undefined,
};


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/async.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/async.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "asyncScheduler": () => (/* binding */ asyncScheduler),
/* harmony export */   "async": () => (/* binding */ async)
/* harmony export */ });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ "../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncScheduler */ "../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js");


var asyncScheduler = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__.AsyncScheduler(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.AsyncAction);
var async = asyncScheduler;


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateTimestampProvider": () => (/* binding */ dateTimestampProvider)
/* harmony export */ });
var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "intervalProvider": () => (/* binding */ intervalProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");

var intervalProvider = {
    setInterval: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearInterval: function (handle) {
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutProvider": () => (/* binding */ timeoutProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");

var timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSymbolIterator": () => (/* binding */ getSymbolIterator),
/* harmony export */   "iterator": () => (/* binding */ iterator)
/* harmony export */ });
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observable": () => (/* binding */ observable)
/* harmony export */ });
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmptyError": () => (/* binding */ EmptyError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var EmptyError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectUnsubscribedError": () => (/* binding */ ObjectUnsubscribedError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var ObjectUnsubscribedError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsubscriptionError": () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/args.js":
/*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/args.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popResultSelector": () => (/* binding */ popResultSelector),
/* harmony export */   "popScheduler": () => (/* binding */ popScheduler),
/* harmony export */   "popNumber": () => (/* binding */ popNumber)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isScheduler */ "../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js");


function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(last(args)) ? args.pop() : undefined;
}
function popScheduler(args) {
    return (0,_isScheduler__WEBPACK_IMPORTED_MODULE_1__.isScheduler)(last(args)) ? args.pop() : undefined;
}
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "argsOrArgArray": () => (/* binding */ argsOrArgArray)
/* harmony export */ });
var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrRemove": () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/caughtSchedule.js":
/*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/caughtSchedule.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "caughtSchedule": () => (/* binding */ caughtSchedule)
/* harmony export */ });
function caughtSchedule(subscriber, scheduler, execute, delay) {
    if (delay === void 0) { delay = 0; }
    var subscription = scheduler.schedule(function () {
        try {
            execute.call(this);
        }
        catch (err) {
            subscriber.error(err);
        }
    }, delay);
    subscriber.add(subscription);
    return subscription;
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createErrorClass": () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "errorContext": () => (/* binding */ errorContext),
/* harmony export */   "captureError": () => (/* binding */ captureError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "../node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
    return x;
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArrayLike": () => (/* binding */ isArrayLike)
/* harmony export */ });
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
/*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAsyncIterable": () => (/* binding */ isAsyncIterable)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isDate.js":
/*!**************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isDate.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidDate": () => (/* binding */ isValidDate)
/* harmony export */ });
function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
/*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInteropObservable": () => (/* binding */ isInteropObservable)
/* harmony export */ });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isInteropObservable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
/*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isIterable": () => (/* binding */ isIterable)
/* harmony export */ });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isIterable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input === null || input === void 0 ? void 0 : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
/*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPromise": () => (/* binding */ isPromise)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isPromise(value) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
/*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readableStreamLikeToAsyncGenerator": () => (/* binding */ readableStreamLikeToAsyncGenerator),
/* harmony export */   "isReadableStreamLike": () => (/* binding */ isReadableStreamLike)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function readableStreamLikeToAsyncGenerator(readableStream) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js":
/*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isScheduler": () => (/* binding */ isScheduler)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isScheduler(value) {
    return value && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value.schedule);
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/lift.js":
/*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasLift": () => (/* binding */ hasLift),
/* harmony export */   "operate": () => (/* binding */ operate)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function hasLift(source) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":
/*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapOneOrManyArgs": () => (/* binding */ mapOneOrManyArgs)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js");


var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return (0,_operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (args) { return callOrApply(fn, args); });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
function noop() { }


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "pipeFromArray": () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "../node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportUnhandledError": () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "../node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
    _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
        var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}


/***/ }),

/***/ "../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
/*!******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInvalidObservableTypeError": () => (/* binding */ createInvalidObservableTypeError)
/* harmony export */ });
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}


/***/ }),

/***/ "../node_modules/rxjs/node_modules/tslib/tslib.es6.js":
/*!************************************************************!*\
  !*** ../node_modules/rxjs/node_modules/tslib/tslib.es6.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./ball.js":
/*!*****************!*\
  !*** ./ball.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ball": () => (/* binding */ Ball)
/* harmony export */ });


function Ball(x, y, radius, color) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 12;
  this.color = color || "#6699FF";

  this.scaleX = 1;
  this.scaleY = 1;
}

Ball.prototype = {
  stroke: function (ctx) {
    ctx.save();
    ctx.scale(this.scaleX, this.scaleY);
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  },
  fill: function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  getRect: function () {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  },
};


/***/ }),

/***/ "./box.js":
/*!****************!*\
  !*** ./box.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box)
/* harmony export */ });


function Box(x, y, width, height, color, borderRadius) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width;
  this.height = height;
  this.color = color || "#6699FF";
  this.borderRadius = borderRadius || 0;
}

Box.prototype = {
  stroke: function (ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();

    if (this.borderRadius > 0) {
      createRoundRect.bind(this)(ctx);
    } else {
      createRect.bind(this)(ctx);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  },
  fill: function (ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();

    if (this.borderRadius > 0) {
      createRoundRect.bind(this)(ctx);
    } else {
      createRect.bind(this)(ctx);
    }

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
};

function createRect(ctx) {
  ctx.translate(this.x, this.y);
  ctx.moveTo(-(this.width / 2), -(this.height / 2));
  ctx.lineTo(this.width / 2, -(this.height / 2));
  ctx.lineTo(this.width / 2, this.height / 2);
  ctx.lineTo(-(this.width / 2), this.height / 2);
}

function createRoundRect(ctx) {
  ctx.translate(this.x, this.y);

  ctx.moveTo(-(this.width / 2) + this.borderRadius, -(this.height / 2));

  ctx.lineTo(this.width / 2 - this.borderRadius, -(this.height / 2));
  ctx.arcTo(
    this.width / 2,
    -(this.height / 2),
    this.width / 2,
    -(this.height / 2) + this.borderRadius,
    this.borderRadius
  );

  ctx.lineTo(this.width / 2, this.height / 2 - this.borderRadius);
  ctx.arcTo(
    this.width / 2,
    this.height / 2,
    this.width / 2 - this.borderRadius,
    this.height / 2,
    this.borderRadius
  );

  ctx.lineTo(-this.width / 2 + this.borderRadius, this.height / 2);
  ctx.arcTo(
    -this.width / 2,
    this.height / 2,
    -this.width / 2,
    -this.height / 2 + this.borderRadius,
    this.borderRadius
  );

  ctx.lineTo(-this.width / 2, -this.height / 2 + this.borderRadius);
  ctx.arcTo(
    -this.width / 2,
    -this.height / 2,
    -this.width / 2 + this.borderRadius,
    -this.height / 2,
    this.borderRadius
  );
}


/***/ }),

/***/ "./canvas.js":
/*!*******************!*\
  !*** ./canvas.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCanvasEl": () => (/* binding */ createCanvasEl),
/* harmony export */   "renderIntro": () => (/* binding */ renderIntro),
/* harmony export */   "renderBackground": () => (/* binding */ renderBackground),
/* harmony export */   "renderGameOver": () => (/* binding */ renderGameOver),
/* harmony export */   "renderBall": () => (/* binding */ renderBall),
/* harmony export */   "renderPaddle": () => (/* binding */ renderPaddle),
/* harmony export */   "renderBricks": () => (/* binding */ renderBricks),
/* harmony export */   "renderScore": () => (/* binding */ renderScore)
/* harmony export */ });
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ "./ball.js");
/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./box */ "./box.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./constants.js");




// 顏色配置
const TEXT_BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.7)';
const BACKGROUND_COLOR = '#0A1931';

function createCanvasEl() {
  const canvas = document.createElement('canvas');
  canvas.width = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH;
  canvas.height = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT;
  return canvas;
}

function renderIntro(ctx) {
  ctx.fillStyle = TEXT_BACKGROUND_COLOR;
  ctx.fillRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT);

  let textX = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH / 2;
  let textY = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT / 2;
  drawText(ctx, 'Press [enter]', textX, textY, 'black', 25);
}

function renderBackground(ctx) {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT);
}

function renderGameOver(ctx) {
  ctx.fillStyle = TEXT_BACKGROUND_COLOR;
  ctx.fillRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT);

  let textX = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH / 2;
  let textY = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT / 2;

  drawText(ctx, 'GAME OVER!', textX, textY, 'black', 25);
}

function renderBall(ctx, ball) {
  const b = new _ball__WEBPACK_IMPORTED_MODULE_0__.Ball(ball.x, ball.y, ball.radius, _constants__WEBPACK_IMPORTED_MODULE_2__.BALL_COLOR);
  b.fill(ctx);
}

function renderPaddle(ctx, paddle) {
  const p = new _box__WEBPACK_IMPORTED_MODULE_1__.Box(paddle.x, paddle.y, paddle.width, paddle.height, _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_COLOR, _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_BORDER_RADIUS);
  p.fill(ctx);
}

function renderBricks(ctx, bricks) {
  bricks.forEach((brick) => renderBrick(ctx, brick));
}

function renderBrick(ctx, brick) {
  const b = new _box__WEBPACK_IMPORTED_MODULE_1__.Box(brick.x, brick.y, brick.width, brick.height, brick.color);
  b.fill(ctx);
}

function renderScore(ctx, score) {
  let textX = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH / 2;
  let textY = 12;

  drawText(ctx, score.toString(), textX, textY, '#EFEFEF', 15);
}

function drawText(ctx, text, x, y, fillStyle, fontSize, horizontalAlign = 'center', verticalAlign = 'middle') {
  ctx.fillStyle = fillStyle;
  ctx.font = `bold ${fontSize}px sans-serif`;

  let textX = x;
  let textY = y;

  ctx.textAlign = horizontalAlign;
  ctx.textBaseline = verticalAlign;

  ctx.fillText(text, textX, textY);
}


/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CANVAS_WIDTH": () => (/* binding */ CANVAS_WIDTH),
/* harmony export */   "CANVAS_HEIGHT": () => (/* binding */ CANVAS_HEIGHT),
/* harmony export */   "FPS": () => (/* binding */ FPS),
/* harmony export */   "BALL_RADIUS": () => (/* binding */ BALL_RADIUS),
/* harmony export */   "BALL_COLOR": () => (/* binding */ BALL_COLOR),
/* harmony export */   "BALL_INIT": () => (/* binding */ BALL_INIT),
/* harmony export */   "BALL_SPEED_X": () => (/* binding */ BALL_SPEED_X),
/* harmony export */   "BALL_SPEED_Y": () => (/* binding */ BALL_SPEED_Y),
/* harmony export */   "PADDLE_WIDTH": () => (/* binding */ PADDLE_WIDTH),
/* harmony export */   "PADDLE_HEIGHT": () => (/* binding */ PADDLE_HEIGHT),
/* harmony export */   "PADDLE_SPEED": () => (/* binding */ PADDLE_SPEED),
/* harmony export */   "PADDLE_COLOR": () => (/* binding */ PADDLE_COLOR),
/* harmony export */   "PADDLE_BORDER_RADIUS": () => (/* binding */ PADDLE_BORDER_RADIUS),
/* harmony export */   "PADDLE_STEP_MAP": () => (/* binding */ PADDLE_STEP_MAP),
/* harmony export */   "PADDLE_INIT_POSTION": () => (/* binding */ PADDLE_INIT_POSTION),
/* harmony export */   "PADDLE_INIT": () => (/* binding */ PADDLE_INIT),
/* harmony export */   "BRICK_ROWS": () => (/* binding */ BRICK_ROWS),
/* harmony export */   "BRICK_COLUMNS": () => (/* binding */ BRICK_COLUMNS),
/* harmony export */   "BRICK_HEIGHT": () => (/* binding */ BRICK_HEIGHT),
/* harmony export */   "BRICK_GAP": () => (/* binding */ BRICK_GAP),
/* harmony export */   "BRICK_COLOR": () => (/* binding */ BRICK_COLOR),
/* harmony export */   "PRE_HIT_SCORE": () => (/* binding */ PRE_HIT_SCORE)
/* harmony export */ });
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;

const FPS = Math.ceil(1000 / 60);

// ball
const BALL_RADIUS = 7;
const BALL_COLOR = '#FFC947';
const BALL_INIT = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
  radius: BALL_RADIUS,
  color: BALL_COLOR,
};
const BALL_SPEED_X = 120;
const BALL_SPEED_Y = 120;

// paddle
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 12;
const PADDLE_SPEED = 240;
const PADDLE_COLOR = '#EFEFEF';
const PADDLE_BORDER_RADIUS = 5;
const PADDLE_STEP_MAP = new Map();
PADDLE_STEP_MAP.set('ArrowLeft', -1);
PADDLE_STEP_MAP.set('ArrowRight', 1);

const PADDLE_INIT_POSTION = [CANVAS_WIDTH / 2, CANVAS_HEIGHT - PADDLE_HEIGHT * 1.4];
const PADDLE_INIT = {
  x: PADDLE_INIT_POSTION[0],
  y: PADDLE_INIT_POSTION[1],
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  color: PADDLE_COLOR,
  borderRadius: PADDLE_BORDER_RADIUS,
};

// brick
const BRICK_ROWS = 5;
const BRICK_COLUMNS = 7;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 3;
const BRICK_COLOR = '#185ADB';

// score
const PRE_HIT_SCORE = 10;


/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isHitRightBoundary": () => (/* binding */ isHitRightBoundary),
/* harmony export */   "isHitLeftBoundary": () => (/* binding */ isHitLeftBoundary),
/* harmony export */   "isHitTopBoundary": () => (/* binding */ isHitTopBoundary),
/* harmony export */   "isHitBottomBoundary": () => (/* binding */ isHitBottomBoundary),
/* harmony export */   "isHitPaddle": () => (/* binding */ isHitPaddle),
/* harmony export */   "isPaddleHitBoundary": () => (/* binding */ isPaddleHitBoundary),
/* harmony export */   "createInitBricks": () => (/* binding */ createInitBricks),
/* harmony export */   "isHitBrick": () => (/* binding */ isHitBrick)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./constants.js");


// ball
function isHitRightBoundary(ball) {
  return ball.x > _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH - ball.radius;
}

function isHitLeftBoundary(ball) {
  return ball.x < ball.radius;
}

function isHitTopBoundary(ball) {
  return ball.y < ball.radius;
}

function isHitBottomBoundary(ball) {
  return ball.y > _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT - ball.radius;
}

function isHitPaddle(ball, paddle) {
  return (
    ball.y > paddle.y - paddle.height / 2 - ball.radius &&
    ball.x < paddle.x + paddle.width / 2 &&
    ball.x > paddle.x - paddle.width / 2
  );
}

// paddle
function isPaddleHitBoundary(updatedX, paddle) {
  return updatedX - paddle.width / 2 < 0 - 5 || updatedX + paddle.width / 2 > _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH + 5;
}
// brick
function createInitBricks() {
  let width = (_constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH - _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_GAP - _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_GAP * _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_COLUMNS) / _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_COLUMNS;
  let bricks = [];

  for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_ROWS; i++) {
    for (let j = 0; j < _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_COLUMNS; j++) {
      bricks.push({
        x: j * (width + _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_GAP) + width / 2 + _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_GAP,
        y: i * (_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT + _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_GAP) + _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT / 2 + _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_GAP + 20,
        width,
        height: _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT,
        color: _constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_COLOR,
      });
    }
  }

  return bricks;
}

function isHitBrick(brick, ball) {
  return (
    ball.y < brick.y + brick.height / 2 + ball.radius &&
    ball.y > brick.y - brick.height / 2 - ball.radius &&
    ball.x < brick.x + brick.width / 2 + ball.radius &&
    ball.x > brick.x - brick.width / 2 - ball.radius
  );
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./style.css");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/mapTo.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/merge.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/startWith.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/share.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/interval.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/timeInterval.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/of.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/scan.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/first.js");
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.js */ "./canvas.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./utils.js");








// 建立畫布
let canvas = (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.createCanvasEl)();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// 按鈕事件

const keydown$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(document, 'keydown');
const keyup$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(document, 'keyup');

const reset$ = keydown$.pipe(
  (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)((e) => e.key === 'r'),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.mapTo)('RESET')
);
const start$ = keydown$.pipe(
  (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)((e) => e.key === 'Enter'),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.mapTo)('START')
);
const pause$ = keydown$.pipe(
  (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)((e) => e.key === ' '),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.mapTo)('PAUSE')
);
const paddleStep$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.merge)(keydown$, keyup$).pipe(
  (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)((e) => {
    if (e.type === 'keyup' && _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_STEP_MAP.has(e.key)) {
      return 0;
    }
    return _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_STEP_MAP.get(e.key);
  }),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)((step) => step !== null && step !== undefined),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.startWith)(0),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.share)()
);

// timer
const ticker$ = start$.pipe(
  (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.mergeWith)(pause$, reset$),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)((action) => {
    switch (action) {
      case 'START':
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.interval)(_constants__WEBPACK_IMPORTED_MODULE_2__.FPS, rxjs__WEBPACK_IMPORTED_MODULE_14__.animationFrameScheduler).pipe(
          (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.timeInterval)(),
          (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)((value) => value.interval / 1000)
        );
      case 'PAUSE':
        return rxjs__WEBPACK_IMPORTED_MODULE_16__.EMPTY;
      case 'RESET':
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.of)(0);
    }
  }),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.share)()
);

// game
function createGame(ticker$) {
  const paddle$ = ticker$.pipe(
    (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.withLatestFrom)(paddleStep$),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.scan)((paddle, [interval, step]) => {
      let updatedX = paddle.x + +step * _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_SPEED * +interval;
      updatedX = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.isPaddleHitBoundary)(updatedX, paddle) ? paddle.x : updatedX;

      return { ...paddle, x: updatedX };
    }, _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_INIT),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.startWith)(_constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_INIT),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.shareReplay)(1)
  );

  // ball

  const ballSpeedX$ = new rxjs__WEBPACK_IMPORTED_MODULE_21__.BehaviorSubject(_constants__WEBPACK_IMPORTED_MODULE_2__.BALL_SPEED_X);
  const ballSpeedY$ = new rxjs__WEBPACK_IMPORTED_MODULE_21__.BehaviorSubject(_constants__WEBPACK_IMPORTED_MODULE_2__.BALL_SPEED_Y);

  const ball$ = ticker$.pipe(
    (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.withLatestFrom)(paddle$, ballSpeedX$, ballSpeedY$),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.scan)(
      ([ball, previousPaddle], [interval, paddle, speedX, speedY]) => {
        let updatedX = ball.x + speedX * interval;
        let updatedY = ball.y + speedY * interval;

        if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isHitRightBoundary)(ball)) {
          updatedX = _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH - ball.radius;
          ballSpeedX$.next(-speedX);
        }

        if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isHitLeftBoundary)(ball)) {
          updatedX = ball.radius;
          ballSpeedX$.next(-speedX);
        }

        if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isHitPaddle)(ball, paddle)) {
          updatedY = paddle.y - paddle.height / 2 - ball.radius;
          ballSpeedY$.next(-speedY);

          const paddleSpeed = (previousPaddle.x - paddle.x) / interval;
          ballSpeedX$.next(speedX - paddleSpeed * 0.08);
        }

        if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isHitTopBoundary)(ball)) {
          updatedY = ball.radius;
          ballSpeedY$.next(-speedY);
        }

        return [{ ...ball, x: updatedX, y: updatedY }, paddle];
      },
      [_constants__WEBPACK_IMPORTED_MODULE_2__.BALL_INIT, _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_INIT]
    ),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.startWith)([_constants__WEBPACK_IMPORTED_MODULE_2__.BALL_INIT, _constants__WEBPACK_IMPORTED_MODULE_2__.PADDLE_INIT]),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(([ball]) => ball),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.shareReplay)(1)
  );

  // bricks
  const hitBrick$ = new rxjs__WEBPACK_IMPORTED_MODULE_22__.Subject();

  const bricks$ = ball$.pipe(
    (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.scan)((bricks, ball) => {
      let remainingBricks = [];

      bricks.forEach((brick, index) => {
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isHitBrick)(brick, ball)) {
          hitBrick$.next();

          const ballSpeedY = ballSpeedY$.getValue();
          ballSpeedY$.next(-ballSpeedY);
        } else {
          remainingBricks.push(brick);
        }
      });

      return remainingBricks;
    }, (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createInitBricks)()),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.startWith)((0,_utils__WEBPACK_IMPORTED_MODULE_3__.createInitBricks)()),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.shareReplay)(1)
  );

  // score
  const score$ = hitBrick$.pipe(
    (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.mapTo)(1),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.scan)((score, hit) => score + hit * _constants__WEBPACK_IMPORTED_MODULE_2__.PRE_HIT_SCORE, 0),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.startWith)(0)
  );

  // game state
  const gameState$ = ticker$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_18__.withLatestFrom)(paddle$, ball$, bricks$, score$));

  return gameState$;
}

const game$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.of)('start').pipe(
  (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(() => ticker$),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(createGame),
  (0,rxjs__WEBPACK_IMPORTED_MODULE_23__.takeWhile)(([interval, paddle, ball, bricks]) => !(0,_utils__WEBPACK_IMPORTED_MODULE_3__.isHitBottomBoundary)(ball) && interval !== 0 && bricks.length > 0)
);

const observer = {
  next: ([_, paddle, ball, bricks, score]) => {
    ctx.clearRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT);
    (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderBackground)(ctx);
    (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderPaddle)(ctx, paddle);
    (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderBall)(ctx, ball);
    (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderBricks)(ctx, bricks);
    (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderScore)(ctx, score);
  },
  complete: () => {
    (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderGameOver)(ctx);
    start$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_24__.first)()).subscribe(startGame);
  },
};

function startGame() {
  ctx.clearRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.CANVAS_HEIGHT);
  game$.subscribe(observer);
  (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderBackground)(ctx);
  (0,_canvas_js__WEBPACK_IMPORTED_MODULE_1__.renderIntro)(ctx);
}

startGame();

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map