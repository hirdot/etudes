# ansibles
各サービス開発用 ansible ファイル管理リポジトリ


## ruby-api

### How to use
```shell
cd ~/ansible 
ansible-playbook -i hosts pb_ruby-api.yml
```

### 注意
* ansible 実行直後は、rbenv などが見えない状態です。
  * ruby の install は完了しています。

* 再ログインすると、rbenv が見える状態になります。


## example.com

### spec
* apt
* git
* nvm
* nodejs
* yarn
* vue

### How to use
```shell
cd ~/ansible 
ansible-playbook -i hosts pb_example.com.yml
```

