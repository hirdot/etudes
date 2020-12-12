<?php
    $cnt = (int)fgets(STDIN);
    for($i=0; $i<$cnt; $i++) $nums[] = (int)fgets(STDIN);
    sort($nums);
    
    foreach($nums as $n) echo $n.PHP_EOL;

