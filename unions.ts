// ts遇到 import 或者 export 会把当前文件识别为一个文件
export { }
/**
 * 交叉类型（Intersection Type）
 * 交叉类型是将多个类型合并为一个类型。可以把现有的多种类型叠加到一起成为一种类型，包含了所有类型的特性，如：
 * Person & Serializable & Loggable 同时是 Person 和 Serializable 和Loggable。就是说这个类型的对象同时拥有这三种类型的成员。 
 */
{
  function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<any>result)[id] = (<any>second)[id];
      }
    }
    return result;
  }

  class Person {
    constructor(public name: string) { }
  }

  interface Loggable {
    log(): void
  }

  class ConsoleLogger implements Loggable {
    log() { }
  }

  let jim = extend<Person, ConsoleLogger>(new Person("Jim"), new ConsoleLogger);
  let n = jim.name;
  jim.log();

  /**
   * 联合类型（Union Types）
   * 联合类型与交叉类型很有关联，但是使用上却完全不同，一个代码库希望传入 number 或 string 类型的参数。
   */

  function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`)
  }

  padLeft("Hello world", 4)

  /**
   * 上面代码存在一个问题，padding 参数的类型指定成了 any, 也就是说可以传入一个既不是 number 也不是 string 类型的参数，但是TypeScript却不报错，但是运行时报错
   */
}

{
  /**
 * 代替 any，可以使用 联合类型 作为 padding的参数
 */
  function padLeft2(value: string, padding: string | number) { }
  // 这样在非运行时就能检查到错误了
  let indentedString = padLeft2("Hello World", true)
}

{
  /**
   * 联合类型表示一个值可以是集中类型之一。我们用竖线（|）分隔每个类型， 所以 number | string | boolean 表示值可以是 number，string，或 boolean
   */
  // 如果一个值是联合类型，只能访问此联合类型的所有类型里共有的成员。
  interface Bird {
    fly();
    layEggs();
  }

  interface Fish {
    swim();
    layEggs()
  }

  function getSmallPet(): Fish | Bird {
    // ...
  }

  let pet = getSmallPet();
  pet.layEggs(); // okay
  pet.swim(); // errors

  /**
   * 这里的联合类型可能有点复杂，但是很容易就习惯了。如果一个值是类型A | B，我们能够 确定的是它包含了 A 和 B 中共有的成员。这个例子里， 我们不能确定一个 Bird | Fish 的联合类型变量是否有 fly 方法，如果变量在运行时是 Fish 类型，那么调用 pet.fly()就出错了。
   */
}

{
  /**
   * 类型保护与区分类型（Type Guards and Differentiating Types）
   * 联合类型适合于那些值可以为不同类型的情况。但想确切地了解是否为 Fish 时怎么办？ JavaScript 里常用来区分2个可能值得方法是检查成员是否存在。如之前提及的，只能访问联合类型中共同拥有的成员
   */

  {
    let pet = getSmallPet();
    //  每一个成员访问都会报错
    if (pet.swim) {
      pet.swim()
    } else if (pet.fly) {
      pet.fly()
    }
  }
  //  为了让这段代码工作，要使用类型断言：
  {
    interface Bird {
      fly();
      layEggs();
    }

    interface Fish {
      swim();
      layEggs()
    }

    let pet = getSmallPet();
    if ((<Fish>pet).swim) {
      (<Fish>pet).swim()
    } else {
      (<Bird>pet).fly();
    }
  }
}

{
  /**
   * 用户自定义的类型保护
   * 这里可以注意到我们不得不多次使用类型断言。假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet 的类型就好了
   */

  /**
   * TypeScript 里的 类型保护 机制让它成为了显示。类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
   * 
   */
  interface Bird {
    fly();
    layEggs();
  }

  interface Fish {
    swim();
    layEggs()
  }

  // 在这个例子里，pet is Fish 就是类型谓词。谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数里面的一个参数名
  // 每当使用一些变量调用 isFish时， TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型时兼容的
  function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
  }
  let pet = getSmallPet();
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

{
  /**
 * typeof 类型保护
 * 现在看看怎么使用联合类型书写 padLeft 代码。可以像下面这样利用类型断言来写：
 */
  function isNumber(x: any): x is number {
    return typeof x === 'number'
  }

  function isString(x: any): x is string {
    return typeof x === 'string'
  }

  function padLeft3(value: string, padding: string | number) {
    if (isNumber(padding)) {
      return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
      return padding + value;
    }
    throw new Error(`Expected string of number, got '${padding}'.`)
  }
}
{
  /**
   * 然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。幸运的是，现在不必将 typeof x === "number"抽象成一个函数，因为 TypeScript可以将它识别为了一个类型保护。也就是可以直接在代码里面检查类型了。
   */

  function padLeft4(value: string, padding: string | number) {
    /**
     * 这些 typeof 类型保护 只有两种形式能被识别： typeof v === "typename" 和 typeof v !== "typename",
     * "typename"必须是 "number","string","boolean"或"symbol"。但是TypeScript并不会阻止与其它字符串比较，语言不会把那些表达式识别为类型保护。
     */
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value
    }
    throw new Error(`Expected string of number, got '${padding}'.`)
  }
}
{
  /**
   * instanceof 类型保护
   * instanceof 类型保护是通过构造函数来细化类型的一种方式。比如，借鉴之前字符填充的例子
   */

  interface Padder {
    getPaddingString(): string;
  }

  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
    }
  }

  class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
      return this.value;
    }
  }

  function getRandomPadder() {
    return Math.random() < 0.5 ?
      new SpaceRepeatingPadder(4) :
      new StringPadder(" ")
  }

  // 类型为 SpaceRepeatingPadder | StringPadder
  let padder: Padder = getRandomPadder();
  if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为 'SpaceRepeatingPadder'
  }
  if (padder instanceof StringPadder) {
    padder; // 类型细化为 'StringPadder'
  }
  /**
   *  instanceof 的右侧要求是一个构造函数， TypeScript将细化为：
   * 1. 此构造函数的 prototype 属性的类型，如果它的类型不为 any的话
   * 2. 构造签名所返回的类型的联合 
   */
}

{
  /**
   * 可以为null的类型
   * TypeScript具有两种特殊的类型， null 和 undefined，他们分别有
   * 值 null 和 undefined，默认情况下，类型检查器 认为 null 和 undefined
   * 可以赋值给任何类型。 null 与 undefined 是所有其它类型的一个有效值。
   * 
   * 可以在配置文件中 tsconfig.json compilerOptions.strictNullChecks 配置为 true， 当
   * 声明一个变量时，不会自动地包含 null 和 undefined。
   */

  let s = "foo";
  //  错误示范， 'null'不能赋值给'string'
  s = null;
  //  可以使用联合类型明确包含 null，则可以赋值
  let sn: string | null = "bar";
  sn = null
  //  不能把 undefined 赋值给 联合类型 'string | null'
  sn = undefined
  /**
   * 按照 JavaScript 的语义， TypeScript 会把 null 和 undefined 区别对待。
   * string | null, string | undefined 和 string | undefined | null 是不同的类型
   */
}


{
  /**
   * 可选参数和可选属性
   * 如果在配置文件中配置了 strictNullChecks ，则函数的可选参数会被自动地加上 | undefined:
   */
  function f(x: number, y?: number) {
    // 这里的可选参数y 的类型 number 会和 undefined 成联合类型，默认不传递实参时，y的值是 undefined
    return x + (y || 0)
  }
  f(1, 2);
  f(1);
  f(1, undefined);
  f(1, null)

}

{
  /**
   * 可选属性也会有同样的处理：
   */

  class C {
    a: number;
    b?: number
  }

  let c = new C();
  c.a = 123;
  // undefined 不能赋值给 number类型的属性
  c.a = undefined
  c.b = 13;
  // 因为 b是可选的属性，可以理解成 它的类型和 undefined 成 联合类型，所以可以给b赋 undefined属性
  c.b = undefined // ok
  // 值 null 不能 赋值给联合类型 'number | undefined'
  c.b = null

  /**
   * 类型保护和类型断言
   * 由于可以为 null 的类型是通过联合类型实现，那么需要使用类型保护 去除 null, 这与 JavaScript 里写的代码一致
   */

}
{
  // 可以使用短路运算符去除 null
  function f1(sn: string | null): string {
    return sn || 'default'
  }

}

{
  /**
 * 如果编译器不能够去除 null 或 undefined， 可以使用类型断言手动去除。语法是添加！后缀：
 * identifier! 从标识符 identifier的类型里祛除了 null 和 undefined:
 */

  function broken(name: string | null): string {
    function postfix(epithet: string) {
      // 这里会提示name有可能是 null 的错误
      return name.charAt(0) + '. the' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
  }

  function fixed(name: string | null): string {
    function postfix(epithet: string) {
      // 这里可以在标识符 name后加 !，从标识符 name的类型里去除了 null
      return name!.charAt(0) + '. the ' + epithet
    }
    name = name || "Bob";
    return postfix("great");
  }
}

{
  /**
   * 类型别名
   * 类型别名会给一个类型起个新的名字。类型别名有时和接口很像，
   * 但是可以作用于原始值，联合类型，元祖以及其它任何需要手动写的类型
   */
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
      return n;
    } else {
      return n();
    }
  }

  /**
   * 小结：
   * 起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。给原始类型起别名通常没什么用，
   * 尽管可以做为文档的一种形式使用。
   * 同接口一样，类型别名也可以是泛型 - 可以添加类型参数并且别名声明的右侧传入
   */

  type Container<T> = { value: T };
  // 也可以使用类型别名来在属性里引用自己：
  type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
  }
  // 可以与交叉类型一起使用
  type LinkedList<T> = T & { next: LinkedList<T> };
  interface Person {
    name: string
  }

  let people: LinkedList<Person>;

  var s1 = people.name;
  var s1 = people.next.name;
  var s1 = people.next.next.name;
  var s1 = people.next.next.next.next.name;

  // 类型别名不能出现声明右侧的任何地方
}

{
  /**
   * 接口 vs 类型别名
   * 类型别名可以像接口一样，但有一些细微差别
   * 
   */
}
{
  /**
  * 区别一： 接口创建了一个新的名字， 可以在其它任何地方使用。类型别名并不创建新名字 - 比如，错误信息就不会使用别名
  */

  type Alias = { num: number };
  interface Interface {
    num: number;
  }

  declare function aliased(arg: Alias): Alias;
  declare function interfaced(arg: Interface): Interface

  /**
   * 还有一个重要区别的类型别名是不能被 extends 和 implements（自己也不能 extends 和 implements 其它类型）
   * 因为 软件中的对象应该对于扩展是开放的， 但是对于修改是封闭的。 应该尽量使用接口代替类型别名
   */
}
{
  /**
   * 可辨识联合
   * 可以合并单例类型，联合类型，类型保护和类型别名来创建一个叫做
   * 可识别联合的高级模式，它也称做 标签联合 或 代数数据类型。可辨识联合在函数式编程很有用处，具有三个要素：
   * 1. 具有普通的单例类型属性- 可识别的特征。
   * 2. 一个类型别名包含了那些类型的联合- 联合
   * 3. 此属性上的类型保护
   */
  //  首先声明将要联合的接口，每个接口都有 kind 属性但有不同的字符串字面量类型。 kind 属性称做 可辨识的特征 或 标签。其它
  // 的属性则特定于各个接口。目前各个接口间是没有联系的，
  interface Square {
    kind: "square";
    size: number
  }

  interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number
  }

  interface Circle {
    kind: "circle";
    radius: number
  }

  type Shape = Square | Rectangle | Circle;
  // 使用可辨识联合
  function area(s: Shape) {
    switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
    }
  }
}
{
  /**
   * 完整性检查
   * 当没有涵盖所有可辨识联合的变化时，想让编译器通知我们，有两种方式
   * 实现
   * 1. 配置文件中打开 strictNullChecks 并指定一个返回值类型
   */
  // function area(s: Shape): number 

  // 第二种方法使用 never 类型，编译器进行完整性检查
  function assertNever(x: never): never {
    throw new Error("Unexpected object:" + x)
  }

}

{
  /**
   * 多态的 this 类型
   * 多态 this 类型表示的是某个包含类或接口的 子类型。
   * 这被称做 f-bounded多态性。它能很容易的表现连贯接口的继承
   */
  class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
      return this.value;
    }
    public add(operand: number): this {
      this.value += operand;
      return this;
    }
    public multiply(operand: number): this {
      this.value *= operand;
      return this;
    }
  }
  /**
   * 由于这个类使用了 this 类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变
   */
  class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
      super(value)
    }
    public sin() {
      this.value = Math.sin(this.value);
      return this;
    }
  }

  /**
   * 如果没有 this 类型， ScientificCalculator 就不能在继承 BasicCalculator 的同时还保持接口的连贯性。
   * multiply 将返回 BasicCalculator，它并没有sin 方法。然后， 使用 this 类型，multiply会返回this,
   * 在这里就是 ScientificCalculator
   */
  let v = new ScientificCalculator(2)
    .multiply(5)
    .sin()
    .add(1)
    .currentValue();
}

{
  /**
   * 索引类型
   * 使用索引类型，编译器就能够检查使用了动态属性名的代码。例如，一个常见的 JavaScript 模式是从对象中选取属性的子集。
   * 下面是如何在 TypeScript里使用此函数，通过 索引类型查询 和 索引访问 操作符
   */

  function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
  }

  interface Person {
    name: string;
    age: number;
  }

  let person: Person = {
    name: 'Jarid',
    age: 35
  }

  /**
   * 编译器会检查 name 是否真的是 Person 的一个属性。本例还引入了几个新的类型操作符。首先是 keyof T，索引类型查询
   * 操作符。对于任何类型 T，keyof T 的结果为 T 上已知的公共属性名的联合
   */
  let strings: string[] = pluck(person, ['name'])
}

{
  /**
   * keyof Person 是完全可以与 'name' | 'age' 互相替换的。不同的是如果添加了其它的属性 到 Person，例如 address: string，
   * 那么 keyof Person 会自动变为 'name' | 'age' | 'address'。
   */
  let personProps: keyof Person; // 'name' | 'age'

  /**
   * 第二个操作符是 T[K]，索引访问操作符。在这里，类型语法反映了表达式语法。这意味着 person['name']具有类型 Person['name']
   * - 在例子里则为 string 类型。 然而，就像索引类型查询一样，可以在普通的上下文里使用 T[K]，这正是它的强大所在。主要确保类型
   * 变量 K extends keyof T就可以了，例如下面 getProperty函数的例子：
   */
  function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    // o[name] is of type T[K]
    return o[name]
  }
}

{
  /**
   * 索引类型和字符串索引签名
   * keyof 和 T[K] 与字符串索引签名进行交互。如果一个带有字符串索引签名的类型。那么 keyof T 会是 string。并且 T[string]为索引签名的类型
   */
  interface Map<T> {
    [key: string]: T;
  }
  let keys: keyof Map<number>; //string
  let value: Map<number>['foo']; // number
}
{
  /**
   * 映射类型
   * 一个常见的任务是将一个已知的类型每个属性都变为可选的：
   */
  interface PersonPartial {
    name?: string;
    age?: number
  }
}
{
  /**
   * 在 JavaScript里经常出现，TypeScript提供了从旧类型中创建新类型的一种方式- 映射类型。在映射类型里，新类型
   * 以相同的形式去转换旧类型里每个属性。例如，你可以令每个属性成为 readonly 类型或可选的。
   */
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  }
  type Partial<T> = {
    [P in keyof T]?: T[P];
  }
  // 使用
  type PersonPartial = Partial<Person>;
  type ReadonlyPerson = Readonly<Person>;

  /**
   * 最简单的映射类型和它的组成部分
   * 它的语法与索引签名的语法类型，内部使用了 for .. in。具有三个部分：
   * 1. 类型变量K，它会一次绑定到每个属性
   * 2. 字符串字面量联合的 keys，它包含了要迭代的属性名的几何。
   * 3. 属性的结果类型
   */
  type Keys = 'option1', 'option2';
  type Flags = { [K in Keys]: boolean }
  // 在这个简单的例子里， keys是硬编码的属性名列表并且属性类型永远是 boolean，因此这个映射类型等同于：
  type Flags = {
    option1: boolean;
    option2: boolean
  }
}
{
  /**
   * keyof 和 索引访问类型要做的事情会基于一些已存在的类型，且按照一定得方法转换字段。
   */
  type NullablePerson = { [P in keyof Person]: PermissionState[P] | null }
  type PartialPerson = { [P in keyof Person]?: Person[p] }
}

{
  /**
   * 在这些例子里，
   * 属性列表 keyof T 且结果是 T[P] 的变体。这是使用通用映射类型的一个好模板。因为这类转换是 同态 的，映射只作用域 T 的
   * 属性而没有其它的。 编译器知道在添加任何新属性之前可以拷贝所有存在的属性修饰符。 例如 Person.name 是只读的，那么 Partial<Person>.name 也将是只读的且为可选的
   */
  type Nullable<T> = { [P in keyof T]: T[P] | null };
  type Partial<T> = { [P in keyof T]?: T[P] }
}
{
  /**
   * 这个例子里， T[P] 被包装在 Proxy<T> 类里：
   */
  type Proxy<T> = {
    get(): T;
    set(value: T): void
  }

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
  }

  function proxify<T>(o: T): Proxify<T> { }
  let proxyProps = proxify(props)
}

{
  /**
   * Readonly，Partial 和 Pick 是同态的， 但 Record 不是。因为 Record 并不需要输入类型来拷贝属性，所以它不属于同态
   */
  type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
}

{
  /**
   * 由映射类型进行推断
   * 现在你了解了如何包装一个类型的属性，那么接下来就是如何拆包。其实也很容易：
   */
  function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
      result[k] = t[k].get();
    }
    return result;
  }
}

{
  /**
   * 预定义的条件类型
   * - Exclude<T,U> --从 T 中剔除可以赋值给 U 的类型。
   * - Extract<T,U> -- 提取 T 中可以赋值给 U 的类型。
   * - NonNullable<T> -- 从 T 中剔除 null 和 undefined。
   * - ReturnType<T> -- 获取函数返回值类型
   * - InstanceType<T> -- 获取构造函数类型的实例类型
   */

  type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"
  type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f"> // "a" | "c"
  type T02 = Exclude<string | number | (() => void), Function>; // string | number
  type T03 = Extract<string | number | (() => void), Function>; // () => void
  type T04 = NonNullable<string | number | undefined>; // string | number
  type T05 = NonNullable<(() => string) | string[] | null | undefined>; // (() => string) | string[]

  function f1(s: string) {
    return { a: 1, b: s }
  }

  class C {
    x = 0;
    y = 0;
  }

  type T10 = ReturnType<() => string>; // string
  type T11 = ReturnType<(s: string) => void>; // void
  type T12 = ReturnType<(<T>() => T)>; // {}
  type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>; // number[]
  type T14 = ReturnType<typeof f1>; // {a: number, b: string}
  type T15 = ReturnType<any>; // any
  type T16 = ReturnType<never>; // any
  type T17 = ReturnType<string>; // Error
  type T18 = ReturnType<Function>; // Error
}