<?php
    // �����̎擾
    list($a, $b, $c) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
    while(1)
    {
        $cnt = str_replace(PHP_EOL, "", fgets(STDIN));
        break;
    }
    // �d�Ԃɏ���Ă��Ȃ���΂Ȃ�Ȃ�����(00:00����̌o�ߕ�)
    // $b + $c : �d�Ԃɏ���Ă����Ђ܂ł̏��v����(��)
    $x = (8*60+59) - ($b + $c);

    $t = 0;
    for($i=0; $i<$cnt; $i++)
    {
        // �����̎擾�i�d�Ԃ̔��Ԏ����j
        list($h, $m) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
        // �o�������̎擾
    	if($h*60+$m > $x) continue;
        $t = ($h*60+$m) - $a;
    }
    $h = substr("0". floor($t / 60), -2);
    $m = substr("0". $t % 60, -2);
    echo sprintf("%s:%s", $h, $m);

