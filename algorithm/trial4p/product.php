<?php
// 文字列数の取得
$cnt = str_replace(PHP_EOL, "", fgets(STDIN));

// IPアドレス毎に処理
for($i=0; $i<$cnt; $i++)
{
    $address = str_replace(PHP_EOL, "", fgets(STDIN));
    if(ip2long($address) === false) {
        $result[] = "False";
    } else {
        $result[] = "True";
    }
}
// 結果表示
echo implode(PHP_EOL, $result);

