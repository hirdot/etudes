<?php
    // �����̓��ӂȌ����
    // Let's �`�������W�I�I
    $args = explode(" ", fgets(STDIN));
    $result = "";
    for($i = 0; $i < 10; $i++)
    {
        $add = $i*$args[1];
        $result[] = $args[0] + $add;
    }
    echo implode(" ", $result);

