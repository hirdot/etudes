<?php
    // 自分の得意な言語で
    // Let's チャレンジ！！
    $args = explode(" ", fgets(STDIN));
    $result = "";
    for($i = 0; $i < 10; $i++)
    {
        $add = $i*$args[1];
        $result[] = $args[0] + $add;
    }
    echo implode(" ", $result);

