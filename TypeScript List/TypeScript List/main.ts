/// <reference path="List.ts"/>

module MyLib {
    

    var l = new List<number>(10);


    for (let i = 0; i < 10; i++) {
        l.add(i*i);
    }

    l.add(11);

    l.setAt(0, 11);
    
    l.remove(81);
    l.remove(11,true); // remove all elements

    l.add(4);

    console.log(l.singleOrDefault((i)=>{return i === 456}));
    //console.log(l.single((i)=>{return i === 456}));
    


    console.log(l.toString());
    
}