<?php
    // 引数の取得
    list($x, $y, $z) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));

    $faces = array_pad([], $z-1, []);
    // 高さ(z)分Loop
    for($i=0; $i<$z; $i++)
    {
        $face = array_fill_keys(range(0, $y-1), ".");
        // 奥行(x)分Loop
        while(1)
        {
            // z段目、x目の引数を取得
            $stdin = str_replace(PHP_EOL, "", fgets(STDIN));
            // 区切文字なら、次段の処理
            if($stdin === "--") break;
            
            // 入力(#)があれば、上書き
            $tmp = str_split($stdin);
            foreach($tmp as $k=>$v)
            {
               if($v=="#") $face[$k]="#";
            }
        }
        $faces[$i] = implode("", $face);
    }
    krsort($faces);
    // 出力
    foreach($faces as $f) echo $f.PHP_EOL;

