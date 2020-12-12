<?php
// パッサーのチームと、番号を取得
list($team_name, $passer_num) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
// チーム毎の選手位置を取得
$team_members=[[],[]];
foreach(["A","B"] as $t)
{
	$team_members[$t] = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
}
// パッサーの位置を取得
$passer_x = $team_members[$team_name][$passer_num-1];

// オフサイド判定
$offside=[];
if($team_name == "A")
{
	foreach($team_members["A"] as $i=>$x)
	{
		// 敵陣にいないメンバーは無視
		if($x <= 55) continue;
		// パッサーより後方にいるメンバーは無視
		if($x <= $passer_x) continue;
		// 敵チーム後方２番目の選手より、チームよりの選手は無視
		sort($team_members["B"]);
		if($x <= $team_members["B"][9]) continue;

		// オフサイド対象選手
		$offside[] = $i+1;
	}
} else {
	foreach($team_members["B"] as $i=>$x)
	{
		// 敵陣にいないメンバーは無視
		if(55 <= $x) continue;
		// パッサーより後方にいるメンバーは無視
		if($passer_x <= $x) continue;
		// 敵チーム後方２番目の選手より、チームよりの選手は無視
		sort($team_members["A"]);
		if($team_members["A"][1] <= $x) continue;

		// オフサイド対象選手
		$offside[] = $i+1;
	}	
}

sort($offside);
$result = (count($offside)==0 ? "None" : implode(PHP_EOL, $offside));
echo $result;

