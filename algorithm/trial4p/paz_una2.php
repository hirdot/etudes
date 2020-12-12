<?php
    list($t, $n) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
    $points=[];
    $max=0;
    $t = $t-1;
    // $t-1個のデータを取得
    for($i=0; $i<$t; $i++)
    {
        $points["$i"] = (int)fgets(STDIN);
    }

    // 常に$t個のデータを保持
    for($i=$t; $i<$n; $i++){
        $points["$i"] = (int)fgets(STDIN);
        $max = max([$max, array_sum($points)]);
	    array_shift($points); // 先頭を捨てる
    }

    echo $max;
