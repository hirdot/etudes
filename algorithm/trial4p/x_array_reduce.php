<?php
function el($v){ echo $v.PHP_EOL; }
function plus($a, $b){
	el("a=$a, b=$b");
	return $a+$b;
}
$arr = range((int)fgets(STDIN), (int)fgets(STDIN));
print_r($arr);
$c = array_reduce($arr, "plus");
el($c);
