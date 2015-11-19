module MyLib {
    export class List<T> {
        private arr: T[]; 
        private currentIndex = 0;

        get length() {
            return this.currentIndex;
        }

        constructor(initLength: number = null) {
            if (initLength != null) {
                var length = Math.pow(2, Math.ceil(Math.log(initLength) / Math.log(2)));
                this.arr = new Array<T>(length);
            } else {
                this.arr = new Array<T>(4);
            }
        }

        add = (item: T): void => {

            if (this.arr.length === this.currentIndex) {
                this.growArray();
            }

            this.arr[this.currentIndex] = item;
            this.currentIndex++;
        }
        
        addRange(items: List<T>) : List<T>;
        addRange(items: T[]) : List<T>;
        addRange(items): List<T>{
            
            if (items instanceof List) {
                this.addList(items as List<T>);
            }else if (items instanceof Array) {
                this.addArray(items as Array<T>);
            }

            return this;
        }

        private addList = (list: List<T>): void => {
            
            var length = list.length;

            for (let i = 0; i < length; i++) {
                this.add(list.getAt(i));
            }
        }

        private addArray = (arr: T[]) : void => {
            for (let i of arr) {
                this.add(i);
            }
        }

        removeAt = (index: number) => {
            
            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }

            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }
            
            this.arr.splice(index, 1);
            this.currentIndex--;
        }

        remove = (obj: T, deleteAll: boolean = false) => {
            // TODO change/optimize
            for (let n = 0; n < this.arr.length; n++) {
                if (this.arr[n] === obj) {
                    this.arr.splice(n, 1);
                    this.currentIndex--;
                    if (deleteAll === false)
                        break;
                }
            }
        }

        removeLast = () => {
            this.removeAt(this.currentIndex - 1);
        }

        removeFirst = () => {
            this.removeAt(0);
        }

        getAt(index: number) {

            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }

            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }

            return this.arr[index];
        }

        setAt(index: number, value: T) {

            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }

            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }

            return this.arr[index] = value;
        }

        where = (fn: IPredictorFn<T>): T[] => {
            var results = this.arr.filter(fn);
            return results;
        }

        distinct = (comparerFn:IComparer<T> = null): T[] => {

            var length = this.currentIndex;
            var result = new Array<T>();

            for (var i = 0; i < length; i++) {

                let isNotDuplicate = result.every((obj) => {
                     return obj !== this.arr[i];
                });

                if (isNotDuplicate) {
                    result.push(this.arr[i]);
                }
            }

            return result;
        }

        single = (fn: IPredictorFn<T>): T => {
            var results = this.arr.filter(fn);

            if (results.length > 1) {
                throw new Error("list contains more than one element");
            }

            if (results.length === 0) {
                throw new Error("Element not found");
            }

            return results[0];
        }

        first = (fn: IPredictorFn<T>): T => {
            var results = this.arr.filter(fn);
            
            if (results.length === 0) {
                throw new Error("Element not found");
            }

            return results[0];
        }

        firstOrDefault = (fn: IPredictorFn<T>):T => {
            var results = this.arr.filter(fn);

            if (results.length === 0) {
                return null;
            }

            return results[0];
        }

        singleOrDefault = (fn: IPredictorFn<T>): T => {

            var results = this.arr.filter(fn);

            if (results.length > 1) {
                throw new Error("list contains more than one element");
            }
            if (results.length === 1) {
                return results[0];
            }

            return null;
        }

        groupBy = () => {
            var result = new List<List<number>>();

            var length = this.currentIndex;

            for (let i = 0; i < length; i++) {
                
            }
        }

        toString = ():string => {
            return this.arr.toString() + " currentIndex = " + this.currentIndex;
        }

        private isCorrectIndex = (index: number): boolean => {
            if (index > this.currentIndex - 1 || index < 0) {
                return false;
            }
            return true;
        }

        private growArray = (): void => {
            var newArr = Array<T>(this.arr.length * 2);
            //TODO optimize (undefined)
            for (let i = 0; i < this.currentIndex; i++) {
                newArr[i] = this.arr[i];
            }

            this.arr = newArr;
        }

    }

    export interface IPredictorFn<T> {
        (item: T): boolean;
    }

    export interface IComparer<T> {
        (obj1: T, obj2: T): boolean
    }
}