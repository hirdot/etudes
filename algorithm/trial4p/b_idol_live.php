<?php
list($n, $m) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
while(1)
{
    // ��O����(���0�l or �J��0��)
    if($n==0 || $m==0) break;
    // ���C�u���̑��v���
    list($minus_live, $plus_live)=[[],[]];
    for($i=0; $i<$m; $i++)
    {
arage        $args = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
        $benefit = array_sum($args);
        if($benefit < 0) {
            $minus_live[] = $benefit;
        } else {
            $plus_live[] = $benefit;
        }
    }
    // ��O����(���v�̗������݂Ȃ�)
    if(count($plus_live)==0) break;

    // �ő嗘�v
    echo array_sum($plus_live);
    exit;
}
// ��O����
echo 0;
exit;
