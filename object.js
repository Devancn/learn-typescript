"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    return Person;
}());
var p1 = new Person();
p1.name = 'devan';
p1.getName();
{
    // 属性存取器
    var User = /** @class */ (function () {
        // myName: string
        function User(myName) {
            this.myName = myName;
            // this.myName = myName
        }
        Object.defineProperty(User.prototype, "name", {
            get: function () {
                return this.myName;
            },
            set: function (value) {
                this.myName = value;
            },
            enumerable: false,
            configurable: true
        });
        return User;
    }());
    var user_1 = new User('Devan');
    user_1.name = 'dingxiaohuan';
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.changeName = function (name) {
            this.name = name;
        };
        return Animal;
    }());
}
var a;
(function (a) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
})(a || (a = {}));
var b;
(function (b) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
})(b || (b = {}));
