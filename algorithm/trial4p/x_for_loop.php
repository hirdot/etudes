<?php
function el($v){echo($v.PHP_EOL);}
// 模範解答
for($r=$i=0;$i<=99;$r+=++$i);
el($r);
// 1〜100にするには、どうしても長くなる。
for($s=0,$i=1;$i<=100;$s+=$i++);
el($s);
