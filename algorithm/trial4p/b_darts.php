<?php
function el($v){ echo $v.PHP_EOL; }

//list($o_y, $s, $theta) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
list($o_y, $s, $theta) = [10, 10, 10];
while(1)
{
//	list($x, $y, $mato) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
	list($x, $y, $mato) = [10, 10, 10];
	break;
}
$p_y = $o_y
     + ($x * tan(deg2rad($theta)))
     - ((9.8 * pow($x, 2))
       / (2 * pow($s, 2) * pow(cos(deg2rad($theta)), 2))
       );

if($p_y < $y-($mato/2) || $y+($mato/2) < $p_y)
{
    echo "Miss";
} else {
    echo "Hit " . round(abs($y - $p_y), 1);
}

el("o_y=$o_y");
el("xtan_theta=".($x * tan($theta)));
el("gx2=".(9.8 * pow($x, 2)));
el("2s2=".(2 * pow($s, 2)));
el("cos2_theta=".pow(cos($theta), 2));
el("y=$y");
