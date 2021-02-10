// 如果文件里面出现export 或者 import语句 ts会把当前文件认为一个模块，否则为全局
export {}
class Person {
  name: string;
  getName(): void {
    console.log(this.name);
  }
}

let p1 = new Person();
p1.name = 'devan';
p1.getName()

{
  // 属性存取器
  class User {
    // myName: string
    constructor(public myName: string) {
      // this.myName = myName
    }

    get name() {
      return this.myName
    }

    set name(value) {
      this.myName = value;
    }
  }

  let user = new User('Devan');
  user.name = 'dingxiaohuan'

  class Animal{
    // readonly只能在构造函数里面赋值
    public readonly name:string;
    constructor(name:string) {
      this.name = name;
    }
    changeName(name: string) {
      this.name = name
    }

  }
}


namespace a {
  class Animal {

  }
  
}

namespace b{
  class Animal {

  }
}
