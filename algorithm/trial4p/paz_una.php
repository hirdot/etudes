<?php
    list($t, $n) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
    $points=[];
    $t = $t-1;
    for($i=0; $i<$n; $i++)
    {
    	$points[] = str_replace(PHP_EOL, "", fgets(STDIN));
    	if($i<$t) continue;
    	// $points配列からt個分抜出して合計を取得
    	$tmp = array_intersect_key($points, array_fill_keys(range($i-$t, $i+$t),0));
    	$sum_points[$i-$t] = array_sum($tmp);
    }

    echo max($sum_points);

