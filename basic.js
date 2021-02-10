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
    console.log(s1 === s2);
}
