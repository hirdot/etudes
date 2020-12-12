<?php
    $words = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
    $count = array_fill_keys($words, 0);
    foreach($words as $w)
    {
        $count[$w]+=1;
    }
    foreach($count as $k=>$v)
    {
        echo sprintf("%s %d" . PHP_EOL, $k, $v);
    }
