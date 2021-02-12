export { }

// 抽象类不能被实例化
abstract class Animal {
  name: string;
  abstract speak(): void
}

// 多态 同一个方法不同的子类有不同的实现
class Cat extends Animal{
  speak(): void {
    console.log('喵喵喵');
  }
}

class Dog extends Animal{
  speak(): void{
    console.log('汪汪汪')
  }
}

/**
 * 重写(override) 子类覆盖父类同名方法
 * 重载(overload) 函数的重载
 */

 function double(val:string) 
 function double(val:number) 
 function double(val: any) {
   if(typeof val === 'number') {
    return val * 2;
   } else if(typeof val === 'string') {
     return val + val;
   }
 }

 double(2);
 double('a')
//  double(true)
// 继承和多态