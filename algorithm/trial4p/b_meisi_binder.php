<?php
    // 引数の取得
    list($pkt, $m) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));

    $f = floor($m / $pkt);
    $f = ($m % $pkt == 0 ? $f : $f+1); // 何ファイル目か。

    $odd = $f%2; // ファイルの表?
    // ポケット番号(0 - ($pkt-1))
    $p = ($odd ? ($pkt -($f * $pkt -$m) -1) // 表側のポケット番号
               : ($f * $pkt -$m)) ; // 裏側のポケット番号

    // 処理対象のファイルを設定
    list($st, $en) = ($odd ? [$f, $f+1] : [$f-1, $f]);
    for($i=$st; $i<=$en; $i++)
    {
        if($i%2)
        {
            // 表
            $binder[$i] = range($pkt*($i-1)+1, $pkt*$i); // 1-3
        } else {
            // 裏
            $binder[$i] = range($pkt*$i, $pkt*($i-1)+1); // 6-4
        }
    }
    // 出力
    if($odd)
    {
        echo $binder[$f+1][$p];
    } else {
        echo $binder[$f-1][$p];
    }

