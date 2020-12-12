(function(){// 012 で表現する。js の仕様からtrue=1,false=0に変換される。
r="";
s=256;
for(y=x=h=48;y+h;x+h||(x=h,y-=2,r+="\n")){
d=x*x--+y*y; r+=(d<s*4)+(d<s);
}
return r;
})();
