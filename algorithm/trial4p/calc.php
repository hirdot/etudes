<?php
    // �����̓��ӂȌ����
    // Let's �`�������W�I�I
    $input_lines = str_replace(PHP_EOL, "", fgets(STDIN));
    $args = explode(" ", $input_lines);

    $result = $args[0];
    switch($args[1])
    {
        case "km":
            $result *= 1000;
        case "m":
            $result *= 100;
        case "cm":
            $result *= 10;
	    break;
    }
    echo $result;

