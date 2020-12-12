(function(){
r="";
for(y=-21; ++y<20; r+="\n"){
    for(x=-41; ++x<40;) r+=x*x+y*y*4<900?"*":"-"
}
return r
})()
