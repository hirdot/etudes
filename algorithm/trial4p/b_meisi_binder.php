<?php
    // �����̎擾
    list($pkt, $m) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));

    $f = floor($m / $pkt);
    $f = ($m % $pkt == 0 ? $f : $f+1); // ���t�@�C���ڂ��B

    $odd = $f%2; // �t�@�C���̕\?
    // �|�P�b�g�ԍ�(0 - ($pkt-1))
    $p = ($odd ? ($pkt -($f * $pkt -$m) -1) // �\���̃|�P�b�g�ԍ�
               : ($f * $pkt -$m)) ; // �����̃|�P�b�g�ԍ�

    // �����Ώۂ̃t�@�C����ݒ�
    list($st, $en) = ($odd ? [$f, $f+1] : [$f-1, $f]);
    for($i=$st; $i<=$en; $i++)
    {
        if($i%2)
        {
            // �\
            $binder[$i] = range($pkt*($i-1)+1, $pkt*$i); // 1-3
        } else {
            // ��
            $binder[$i] = range($pkt*$i, $pkt*($i-1)+1); // 6-4
        }
    }
    // �o��
    if($odd)
    {
        echo $binder[$f+1][$p];
    } else {
        echo $binder[$f-1][$p];
    }

