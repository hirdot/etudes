<?php
$search_ip = explode(".", str_replace(PHP_EOL, "", fgets(STDIN)));
while(1)
{
	$cnt = str_replace(PHP_EOL, "", fgets(STDIN));
	break;
}
$data=[];
for($i=0; $i<$cnt; $i++)
{
	$stdins = preg_replace("/[\"\[\]]/", "|", str_replace(PHP_EOL, "", fgets(STDIN)));
	list($ip, $time,,$file,,,,,) = explode("|", $stdins);

	$ip = explode(" ", $ip);
	$ip = $ip[0];
	$go_next=true;
	foreach(explode(".", $ip) as $k=>$_ip)
	{
		if($_ip==$search_ip[$k]) continue;
		if($search_ip[$k]=="*") continue;
		// 範囲指定でなければ、対象外
		if(substr($search_ip[$k], 0, 1) != "[")
		{
			$go_next=false;
			break;
		}
		// 指定範囲内の値でなければ、対象外
		$chk = explode("-", preg_replace("/[\[\]]/", "", $search_ip[$k]));
		if(!in_array($_ip, range($chk[0], $chk[1])))
		{
			$go_next=false;
			break;
		}
	}
	if(!$go_next) continue;

	$file = explode(" ", $file);
	$file = $file[1];
	$dt = new Datetime($time, new DateTimeZone('Asia/Tokyo'));
	$data[] = ["ip"=>$ip,"file"=>$file,"dt"=>$dt,"unixtime"=>$dt->format('U')];
}
$keys = array_column($data, "unixtime");
array_multisort($keys, SORT_ASC, $data);

foreach($data as $d)
{
	$dd = $d["dt"]->format("d/M/Y:H:i:s");
	echo sprintf("%s %s %s", $d["ip"], $dd, $d["file"]).PHP_EOL;
}
