(function(){
r="";
for(y=0; y<40; y++){
    for(x=0; x<80; x++){
        a=40-x; b=(20-y)*2; r+=(a*a+b*b<900)?"*":"-";
    }
    r+="\n";
}
return r;
})();
