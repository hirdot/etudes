<?php
    // �����̓��ӂȌ����
    // Let's �`�������W�I�I
    $args = [];
    $cnt = fgets(STDIN);
    for($i=0; $i<$cnt; $i++)
    {
        $args[] = str_replace(PHP_EOL, "", fgets(STDIN));
    }
    $result = sprintf("Hello %s.", implode(",", $args));
    echo $result;

