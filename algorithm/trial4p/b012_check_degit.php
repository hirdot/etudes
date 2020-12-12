<?php
    // ˆø”‚Ìæ“¾
    $cnt = str_replace(PHP_EOL, "", fgets(STDIN));

    $results=[];
    for($i=0; $i<$cnt; $i++)
    {
        // ”š‚ğæ“¾
        $nums = str_split(str_replace(PHP_EOL, "", fgets(STDIN)));
        foreach($nums as $k=>$num)
        {
            // ‹ô”Œ…‚È‚ç2”{(10‚ğ’´‚¦‚ê‚ÎAŠeŒ…‚ğ‰ÁZ)
            if($k!==0 && $k%2==1) continue;
            // 1Œ…–Ú‚Íˆ—‚µ‚È‚¢
	    if($k == count($nums)-1) continue;

	    $num=$num*2;
            if($num>=10) $num = array_sum(str_split($num));
            $nums[$k] = $num;
        }
	$X = 10 - (array_sum($nums) % 10);
	$results[] = ($X==10 ? 0 : $X);
    }
    // o—Í
    foreach($results as $r) echo $r.PHP_EOL;
