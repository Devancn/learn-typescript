var married = false;
var age = 10;
var first_name = 'devan';
var array = [1, 2, 3];
var array2 = [4, 5, 6];
// 元素类型tuple 数量和类型已知的数组
var user = ['devan', 27];
// 枚举类型
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
console.log(Gender.BOY, Gender[1]);
console.log(Gender.GIRL, Gender[0]);
var myColor = [0 /* RED */, 1 /* YELLOW */, 2 /* BLUE */];
// 任意类型 any
// 如果变量定义为any类型，就跟普通js一样，不进行类检查
{
    var root = document.getElementById('root');
    root.style.color = 'red';
}
{
    var element = document.getElementById('root');
    // ! 非空断言
    element.style.color = 'green';
}
{
    // null undefined 是其它类型的子类型
    // 如果strictNullChecks的值为true,则不能把null,undefined赋值给其它类型
    var x = void 0;
    x = 1;
    x = undefined;
    var y = void 0;
    y = 2;
    y = undefined;
    y = null;
}
{
    /**
     *  never 代表不会出现的值
     * 1. 函数永远没有返回值
     */
    function error(message) {
        throw new Error('报错');
        console.log('ok');
    }
    function loop() {
        while (true) {
        }
        console.log('ok');
    }
}
{
    function fn(x) {
        if (typeof x === 'number') {
            console.log(x);
        }
        else if (typeof x === 'string') {
            console.log(x);
        }
        else {
            console.log(x); // never
        }
    }
}
{
    // void 与 never
    // void 代表没有任何类型
    // 如果一个函数没有返回值则是void类型
    // 如果函数返回never类型，则函数无法正常执行
    function greeting() {
        return undefined;
    }
}
{
    // Symbol
    var s1 = Symbol('key');
    var s2 = Symbol('ke');
    // console.log(s1 === s2)
}
{
    // 类型推导
    var uname = void 0;
    uname = 1;
    uname = 'devan';
    var uname2 = 'huan';
    uname2 = 2;
}
{
    // 包装对象 wrapper object
    // 原型类型 对象类型
    var name_1 = 'devan';
    // 内部自动包装成对象类型
    console.log(name_1.toUpperCase());
}
{
    // 联合类型
    var name_2;
    console.log(name_2.toString());
    name_2 = 2;
    console.log(name_2.toFixed(2));
}
{
    // 类型断言
    var name_3;
    console.log(name_3.toFixed());
    console.log(name_3.length);
    // 双重断言
    console.log(name_3);
}
{
    // 字面量类型
    var up = 'Up';
    var down = 'down';
    var right = 1;
    // 可实现枚举的效果
    function move(direction) { }
    move('Down');
}
{
    var p1 = {
        name: 'devan',
        age: 27
    };
}
{
    var t1 = '3';
    var t2 = true;
}
{
    function hello(name) {
        console.log('hello', name);
    }
    hello('zhufeng');
    var getName = function (firstName, lastName) {
        return firstName + lastName;
    };
}
{
    function print(name, age) {
        console.log(name, age);
    }
    print('devan', 27);
    function sum() {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        return numbers.reduce(function (val, item) { return val + item; }, 0);
    }
    console.log(sum(1, 2, 3));
}
{
    // 函数的重载
    var obj_1 = {};
    function attr(val) {
        if (typeof val === 'string') {
            obj_1.name = val;
        }
        else if (typeof val === 'number') {
            obj_1.age = val;
        }
    }
    attr('devan');
    attr(27);
    function add(a, b) {
    }
    add('a', 'b');
    add(1, 1);
}
