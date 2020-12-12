<?php
    list($t, $n) = [rand(1, 30000), 30000];//explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));

    for($i=0; $i<$n; $i++) $points[] = (int)rand(0, 10000);
    $avg = (int)(array_sum($points) / $n);

    for($i=0; $i<$n-$t; $i++)
    {
        if($avg < $points[$i])
        {
            $sums[] = array_slice($points, $i-($t-1), $t);
            //$sums[] = array_sum(array_slice($points, $i-($t-1), $t));
            //$sums[] = array_sum(array_slice($points, $i, $t));
        }
    }
    
    //    echo $max;
    echo "fin...".PHP_EOL;
