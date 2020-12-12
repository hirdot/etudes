<?php
function k2($a, $b, $d)
{
	if($d==0)
	{
		$x[] = -$b * 2 * $a;
	} else {
		$s = (int)((-$b - sqrt($d)) / (2 * $a));
		$s = ($s<0 ? 0 : $s);
		$e = (int)((-$b + sqrt($d)) / (2 * $a));
		$x = range($s, $e);
	}
	return $x;
}
$cnt = (int)fgets(STDIN);

// 判別式の準備
$a=1;
// ツリー位置の取得と、見える場合のｘ座標
for($i=0; $i<$cnt; $i++)
{
	list($p, $q, $r) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));

	$b = -2 * $p;
	$c = (-1 * pow($r,2)) + pow($p,2) + pow($q,2);
	$d = pow($b,2) -(4 * $a * $c); // 判別式　b^2-4ac
echo $i."_d=$d".PHP_EOL;
	if($d < 0) continue; // 解なし = 御堂筋から見えないツリー
	$tree_view_point[] = k2($a, $b, $d);
}

$points=[];
foreach($tree_view_point as $tree)
{
	foreach($tree as $x)
	{
		if(!array_key_exists($x, $points))
		{
			$points[$x] = 1;
			continue;
		}
		$points[$x] += 1;
	}
}
rsort($points);
$cnt = array_shift($points);
echo $cnt.PHP_EOL;
