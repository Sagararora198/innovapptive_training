// class Vehical{
//     constructor(wheels,name){
//         this.wheels = wheels
//         this.name = name
//     }
//     getter(){
//         console.log("This vehical has " + this.wheels +" number of wheels");
//     }
// }

// let VehicalArray = [new Vehical(2,"bycycle"),new Vehical(2,"bike"),new Vehical(3,"tricycle"),new Vehical(4,"car")]
// for (const i of VehicalArray) {
//     i.getter();
    
// }

let randomObject = {
    "data":123,
    "condition": true,
    "output":undefined,
    "option":null,
    "value":NaN,
    "callable": "yes",
    "func":()=>{
        return 23
    },
    sum(a,b){
        return a+b;
    },
    

}
// for (const i in randomObject) {
    
//         const element = randomObject[i];
//         console.log(element);
        
//     }

// console.log(randomObject.func());
// console.log(randomObject.sum(1,2));
for (const i in randomObject.keys) {
    
        console.log(i);
        console.log(randomObject[i]);

        
    }

