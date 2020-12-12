<?php
    // 自分の得意な言語で
    // Let's チャレンジ！！
    $cnt = str_replace(PHP_EOL, "", fgets(STDIN));
    $m = 0;
    for($i=0; $i<$cnt; $i++)
    {
        list($t, $s, $p) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
        if($s < $t) $m += ($t - $s) * $p;
    }
    echo $m;

