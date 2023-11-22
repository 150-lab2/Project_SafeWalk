let v:string = 'dasdasdsa'

v = 5

type Test = '1' | '2'

let g: Test = '2'

interface Test2 {
    name: string;
    last: string;
}

let n: Partial<Test2> = {
    name: '1111',
}

interface Test3 extends Test2 {
    middle: string
}