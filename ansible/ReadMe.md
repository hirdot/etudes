#Ansible お勉強

* Date:2018年9月11日

## 学びの手順について
* まず、手作業で、手順を確認する。
* その手順書を元に、Ansibleを作成する

## 変数について

### 基本的な考え方
基本的には、default（一番弱い指定場所）に記述しておいて  
書いても group_vars。


### 優先順位
[強] 

* extra vars
  * 実行時引数として与える値
* vars
  * play_book 内の vars. 
* register
  * 緊急時に使う感じ
* host_vars
  * 
* group_vars
  * ここも良く使う。
* roles/vars
  * 鹿倉さん的に使わない。
* roles>defaults/main.yml
  * 基本的に使う場所
  
[弱]

※優先順に、常に override していく。  
※鹿倉さん的には  
* roles/vars は使わない。
* vars はあんまり使わない（強すぎるから）
* 基本は defaults, group_vars


## group

なにを持って group とするのか。  
それを考えることも __構成管理__

## become
sudo するかどうかの指定。  
role 単位で指定できる。  
` - { role: nginx, become: yes} `


## step実行
` - { role: nginx, debugger: always} `
` ansible-playbook -i inventories/hosts playbook.yml --step `


鹿倉さん的には、
> 全体 become: yes でいいんじゃない。  
> 基本 sudo 必要な作業が多いから。  
> root じゃ困る部分があったら個別 become: no を設定する、っていう方針もありだと思う。

# 普段の使い方
* WSL に用意しておく
  * 新しい仮想環境を作成する際、WSL から ansible-playbook する

## 勉強の仕方
手でインストール  
状態確認（環境変数、プロダクトのstatus確認  
vagrant sahara を使うと、sandbox で遊べる！！  

複数のVMを立てて、手元から実行されることを確認する。

