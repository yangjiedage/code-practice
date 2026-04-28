function isArray(arr: unknown): boolean {
  return Array.isArray(arr);
}

interface People{
  name: string;
  age: number;
  height: number;
  weight: number;
}


type MyExclude<T, U> = T extends U ? never : T;
type aaa = MyExclude<keyof People, 'weight'>;

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}

type jj<T, U extends keyof any> = {
  [P in Exclude<keyof T, U>]: T[P];
}

type zzzRe<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type bbb = MyPick<People, 'age'>

