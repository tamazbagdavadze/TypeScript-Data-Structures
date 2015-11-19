/// <reference path="List.ts"/>

module MyLib {


    var list = new List<number>(10);

    list.add(4);
    list.add(8);
    list.add(6);


   


    console.log(list.addRange([45,35,153]));
    

}