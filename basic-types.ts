
/**
 * 介绍
 * 为了让程序有价值，我们需要能够处理最简单的数据单元：数字，字符串，结构体，布尔值等。TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用
 */


/**
 * 布尔值
 * 最基本的数据类型就是简单的true/false值，在Javascript和TypeScript里叫做 boolean(其它语言中也一样)
 */

{
  let isDone: boolean = false;
}


/**
 * 数字
 * 和JavaScript一样，TypeScript里的所有数字都是浮点数。这些浮点数的类型时 number。除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
 */

{
  let decLiteral: number = 6;
  let hexLiteral: number = 0xf00d;
  let binaryLiteral: number = 0b1010;
  let octalLiteral: number = 0o744;
}

/**
 * 字符串
 * JavaScript程序的应以想基本操作时处理网页或服务器端的文本数据。像其它语言一样，我们使用 string表示文本数据类型。和JavaScript一样，可以使用双引号（"）或单引号（"）表示字符串
 */
{

  let name: string = "bob";
  name = "smith"
}
/**
 * 数组
 * TypeScript像JavaScript一样可以操作数组元素。有两种方式定义数组。第一种，可以在元素类型后面街上 []， 可以由此类型组成的一个数组
 */

{
  let list: number[] = [1, 2, 3];
}
/**
 * 元组 Tuple
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为string 和 number 类型的元组
 */
{
  //  声明一个元组类型
  let x: [string, number]
  // 正确示范
  x = ['hello', 10]
  // 错误示范
  x = [10, 'hello']
}


/**
 * 枚举
 * enum 类型是对JavaScript标准数据类型的一个补充。像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字
 * 默认情况下，从0开始为元素编号。也可以手动指定成员的数值。例如可以改成从1开始编号
 * 或者全部都采用手动赋值 
 */
{
  enum Color { Red, Green, Blue }
  let c: Color = Color.Green

  enum Color2 { Red = 1, Green, Blue }

  let c2: Color2 = Color2.Green
}

/**
 * 有时候想要为那些编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如用户输入或第三方代码库。这种情况下不希望类型检查器对这些值进行检查而是直接让他们通过编译阶段编译阶段的检查。那么可以是使用 any 类型来标记这些标量
 */
{
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false;

  let prettySure: Object = 4;
}


/**
 * Void
 * 某种程度上来说, void 类型像是与 any 类型相反， 它表示没有任何类型。 当一个函数没有返回值时，通常会见到其返回值类型时 void，
 * 声明一个 void类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null
 */
{
  let unusable: void = undefined;
  unusable = 123 // ×
}

/**
 * Null和Undefined
 * TypeScript里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null。 和 void 相似，他们的本身的类型用处不是很大
 * 默认情况下 null 和 undefined 时有所类型的子类型，可以在tsconfig中设置 strictNullChecks 
 */

{
  let u: undefined = undefined;
  let n: null = null
}

/**
 * Never
 * never 类型表示的时那些用不存在的值的类型。
 * never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
 * never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给never类型，除了 never 本身之外。即使 any 也不可以赋值给 never
 */

{
  // 返回 never的函数必须存在无法达到的重点
  function error(message: string): never {
    throw new Error(message);
  }
  //  推断的返回值类型为never
  function fail() {
    return error("Something failed")
  }

  // 返回never的函数必修存在无法达到的终点
  function infiniteLoop(): never {
    while (true) { }
  }

}

/**
 * Object
 * object 表示非原始类型，也就是除 number, string, boolean, symbol, null 或 undefined 之外的类型
 */

declare function create(o: object | null): void;
create(null)

/**
 * 类型断言
 * 有时候会遇到这种情况，比TypeScript更了解某个值的详细信息。通常这会发生在清楚地知道一个尸体具有比它现有类型更确切的类型
 * 通过 类型断言 这种方式可以告诉表一起， “相信我，我知道自己子啊干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。
 */

{
  //  类型断言有两种形式。起义时“坚括号”语法：
  let someValue: any = "this is a string";
  let strLength: number = (<string>someValue).length
}
{
  // 另一个为 as 语法：
  let someValue: any = "this is a string";
  let strLength: number = (someValue as string).length;
}