var MyLib;
(function (MyLib) {
    var List = (function () {
        function List(initLength) {
            var _this = this;
            if (initLength === void 0) { initLength = null; }
            this.currentIndex = 0;
            this.add = function (item) {
                if (_this.arr.length === _this.currentIndex) {
                    _this.growArray();
                }
                _this.arr[_this.currentIndex] = item;
                _this.currentIndex++;
            };
            this.addList = function (list) {
                var length = list.length;
                for (var i = 0; i < length; i++) {
                    _this.add(list.getAt(i));
                }
            };
            this.addArray = function (arr) {
                for (var _i = 0; _i < arr.length; _i++) {
                    var i = arr[_i];
                    _this.add(i);
                }
            };
            this.removeAt = function (index) {
                if (_this.currentIndex === 0) {
                    throw new Error("collection empty");
                }
                if (_this.isCorrectIndex(index) === false) {
                    throw new Error("wrong index");
                }
                _this.arr.splice(index, 1);
                _this.currentIndex--;
            };
            this.remove = function (obj, deleteAll) {
                if (deleteAll === void 0) { deleteAll = false; }
                // TODO change/optimize
                for (var n = 0; n < _this.arr.length; n++) {
                    if (_this.arr[n] === obj) {
                        _this.arr.splice(n, 1);
                        _this.currentIndex--;
                        if (deleteAll === false)
                            break;
                    }
                }
            };
            this.removeLast = function () {
                _this.removeAt(_this.currentIndex - 1);
            };
            this.removeFirst = function () {
                _this.removeAt(0);
            };
            this.where = function (fn) {
                var results = _this.arr.filter(fn);
                return results;
            };
            this.distinct = function (comparerFn) {
                if (comparerFn === void 0) { comparerFn = null; }
                var length = _this.currentIndex;
                var result = new Array();
                for (var i = 0; i < length; i++) {
                    var isNotDuplicate = result.every(function (obj) {
                        return obj !== _this.arr[i];
                    });
                    if (isNotDuplicate) {
                        result.push(_this.arr[i]);
                    }
                }
                return result;
            };
            this.single = function (fn) {
                var results = _this.arr.filter(fn);
                if (results.length > 1) {
                    throw new Error("list contains more than one element");
                }
                if (results.length === 0) {
                    throw new Error("Element not found");
                }
                return results[0];
            };
            this.first = function (fn) {
                var results = _this.arr.filter(fn);
                if (results.length === 0) {
                    throw new Error("Element not found");
                }
                return results[0];
            };
            this.firstOrDefault = function (fn) {
                var results = _this.arr.filter(fn);
                if (results.length === 0) {
                    return null;
                }
                return results[0];
            };
            this.singleOrDefault = function (fn) {
                var results = _this.arr.filter(fn);
                if (results.length > 1) {
                    throw new Error("list contains more than one element");
                }
                if (results.length === 1) {
                    return results[0];
                }
                return null;
            };
            this.groupBy = function () {
                var result = new List();
                var length = _this.currentIndex;
                for (var i = 0; i < length; i++) {
                }
            };
            this.toString = function () {
                return _this.arr.toString() + " currentIndex = " + _this.currentIndex;
            };
            this.isCorrectIndex = function (index) {
                if (index > _this.currentIndex - 1 || index < 0) {
                    return false;
                }
                return true;
            };
            this.growArray = function () {
                var newArr = Array(_this.arr.length * 2);
                //TODO optimize (undefined)
                for (var i = 0; i < _this.currentIndex; i++) {
                    newArr[i] = _this.arr[i];
                }
                _this.arr = newArr;
            };
            if (initLength != null) {
                var length = Math.pow(2, Math.ceil(Math.log(initLength) / Math.log(2)));
                this.arr = new Array(length);
            }
            else {
                this.arr = new Array(4);
            }
        }
        Object.defineProperty(List.prototype, "length", {
            get: function () {
                return this.currentIndex;
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.addRange = function (items) {
            if (items instanceof List) {
                this.addList(items);
            }
            else if (items instanceof Array) {
                this.addArray(items);
            }
            return this;
        };
        List.prototype.getAt = function (index) {
            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }
            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }
            return this.arr[index];
        };
        List.prototype.setAt = function (index, value) {
            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }
            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }
            return this.arr[index] = value;
        };
        return List;
    })();
    MyLib.List = List;
})(MyLib || (MyLib = {}));
/// <reference path="List.ts"/>
var MyLib;
(function (MyLib) {
    var list = new MyLib.List(10);
    list.add(4);
    list.add(8);
    list.add(6);
    console.log(list.addRange([45, 35, 153]));
})(MyLib || (MyLib = {}));
//# sourceMappingURL=app.js.map