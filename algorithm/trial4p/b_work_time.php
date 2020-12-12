<?php
    // 引数の取得
    list($a, $b, $c) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
    while(1)
    {
        $cnt = str_replace(PHP_EOL, "", fgets(STDIN));
        break;
    }
    // 電車に乗っていなければならない時刻(00:00からの経過分)
    // $b + $c : 電車に乗ってから会社までの所要時間(分)
    $x = (8*60+59) - ($b + $c);

    $t = 0;
    for($i=0; $i<$cnt; $i++)
    {
        // 引数の取得（電車の発車時刻）
        list($h, $m) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
        // 出発時刻の取得
    	if($h*60+$m > $x) continue;
        $t = ($h*60+$m) - $a;
    }
    $h = substr("0". floor($t / 60), -2);
    $m = substr("0". $t % 60, -2);
    echo sprintf("%s:%s", $h, $m);

