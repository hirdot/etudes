<?php
// �p�b�T�[�̃`�[���ƁA�ԍ����擾
list($team_name, $passer_num) = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
// �`�[�����̑I��ʒu���擾
$team_members=[[],[]];
foreach(["A","B"] as $t)
{
	$team_members[$t] = explode(" ", str_replace(PHP_EOL, "", fgets(STDIN)));
}
// �p�b�T�[�̈ʒu���擾
$passer_x = $team_members[$team_name][$passer_num-1];

// �I�t�T�C�h����
$offside=[];
if($team_name == "A")
{
	foreach($team_members["A"] as $i=>$x)
	{
		// �G�w�ɂ��Ȃ������o�[�͖���
		if($x <= 55) continue;
		// �p�b�T�[������ɂ��郁���o�[�͖���
		if($x <= $passer_x) continue;
		// �G�`�[������Q�Ԗڂ̑I����A�`�[�����̑I��͖���
		sort($team_members["B"]);
		if($x <= $team_members["B"][9]) continue;

		// �I�t�T�C�h�ΏۑI��
		$offside[] = $i+1;
	}
} else {
	foreach($team_members["B"] as $i=>$x)
	{
		// �G�w�ɂ��Ȃ������o�[�͖���
		if(55 <= $x) continue;
		// �p�b�T�[������ɂ��郁���o�[�͖���
		if($passer_x <= $x) continue;
		// �G�`�[������Q�Ԗڂ̑I����A�`�[�����̑I��͖���
		sort($team_members["A"]);
		if($team_members["A"][1] <= $x) continue;

		// �I�t�T�C�h�ΏۑI��
		$offside[] = $i+1;
	}	
}

sort($offside);
$result = (count($offside)==0 ? "None" : implode(PHP_EOL, $offside));
echo $result;

