<?php
    // 引数の取得
    $cnt = str_replace(PHP_EOL, "", fgets(STDIN));

    $results=[];
    for($i=0; $i<$cnt; $i++)
    {
        // 数字を取得
        $nums = str_split(str_replace(PHP_EOL, "", fgets(STDIN)));
        foreach($nums as $k=>$num)
        {
            // 偶数桁なら2倍(10を超えれば、各桁を加算)
            if($k!==0 && $k%2==1) continue;
            // 1桁目は処理しない
	    if($k == count($nums)-1) continue;

	    $num=$num*2;
            if($num>=10) $num = array_sum(str_split($num));
            $nums[$k] = $num;
        }
	$X = 10 - (array_sum($nums) % 10);
	$results[] = ($X==10 ? 0 : $X);
    }
    // 出力
    foreach($results as $r) echo $r.PHP_EOL;
