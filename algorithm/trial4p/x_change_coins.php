<?php
function count_coins($change, $arr, $coins)
{
  if($change==0) return $coins;

  $coin= array_shift($arr);
  $num = (int)($change/$coin);
  $coins[$coin]=$num;
  return count_coins($change-($num*$coin), $arr, $coins);
}
$change = (int)fgets(STDIN);
$coin_nums = count_coins($change, [500,100,50,10,5,1], []);
foreach($coin_nums as $k=>$v) echo("$k : $v".PHP_EOL);

