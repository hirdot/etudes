<?php
    // �����̎擾
    $cnt = str_replace(PHP_EOL, "", fgets(STDIN));

    $results=[];
    for($i=0; $i<$cnt; $i++)
    {
        // �������擾
        $nums = str_split(str_replace(PHP_EOL, "", fgets(STDIN)));
        foreach($nums as $k=>$num)
        {
            // �������Ȃ�2�{(10�𒴂���΁A�e�������Z)
            if($k!==0 && $k%2==1) continue;
            // 1���ڂ͏������Ȃ�
	    if($k == count($nums)-1) continue;

	    $num=$num*2;
            if($num>=10) $num = array_sum(str_split($num));
            $nums[$k] = $num;
        }
	$X = 10 - (array_sum($nums) % 10);
	$results[] = ($X==10 ? 0 : $X);
    }
    // �o��
    foreach($results as $r) echo $r.PHP_EOL;
