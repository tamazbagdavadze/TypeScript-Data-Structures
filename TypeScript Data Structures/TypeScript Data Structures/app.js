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
                for (var i = 0; i < _this.arr.length; i++) {
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
    var l = new MyLib.List(10);
    for (var i = 0; i < 10; i++) {
        l.add(i * i);
    }
    l.add(11);
    l.setAt(0, 11);
    l.remove(81);
    l.remove(11, true); // remove all elements
    l.add(4);
    console.log(l.singleOrDefault(function (i) { return i === 456; }));
    //console.log(l.single((i)=>{return i === 456}));
    console.log(l.toString());
})(MyLib || (MyLib = {}));
//# sourceMappingURL=app.js.map