function somme(a,b){
    return a+b
}
alert("La somme est de : " + somme(5,5))

function max(a,b){
    if(a>b)
        return a
    else
        return b
}
alert("Function max : "+max(15,10))

function sommeV2(){
    console.log(arguments)
    a=0
    for (var i = 0; i < arguments.length;i++) {
        a=a+arguments[i]
    }
    return a
}
alert("La Somme V2 est de : "+sommeV2(5,10,15,10))

function maxV2(){
    console.log(arguments)
    a=0
    for (var i = 0; i < arguments.length;i++) 
    {
    if(a < arguments[i])
        a = arguments[i]
    else
        a = a 
    }
    return a
}
alert("Function max V2 : " +maxV2(15,10,30,40))