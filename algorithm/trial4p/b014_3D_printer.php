<?php
    // �����̎擾
    list($x, $y, $z) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));

    $faces = array_pad([], $z-1, []);
    // ����(z)��Loop
    for($i=0; $i<$z; $i++)
    {
        $face = array_fill_keys(range(0, $y-1), ".");
        // ���s(x)��Loop
        while(1)
        {
            // z�i�ځAx�ڂ̈������擾
            $stdin = str_replace(PHP_EOL, "", fgets(STDIN));
            // ��ؕ����Ȃ�A���i�̏���
            if($stdin === "--") break;
            
            // ����(#)������΁A�㏑��
            $tmp = str_split($stdin);
            foreach($tmp as $k=>$v)
            {
               if($v=="#") $face[$k]="#";
            }
        }
        $faces[$i] = implode("", $face);
    }
    krsort($faces);
    // �o��
    foreach($faces as $f) echo $f.PHP_EOL;

