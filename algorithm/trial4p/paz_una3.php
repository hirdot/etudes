<?php
fscanf(STDIN, "%d %d", $t, $n);
$m = array();
for($i = 0; $i < $n; $i++){
    fscanf(STDIN, "%d", $m[$i]);
}
$ans = array_sum(array_slice($m, 0, $t));
$tmp = $ans;
for($i = 0; $i < $n-$t; $i++){
    $tmp += $m[$t+$i];
    $tmp -= $m[$i];
    if($ans < $tmp)
        $ans = $tmp;
}
echo $ans;