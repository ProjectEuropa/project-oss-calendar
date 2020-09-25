# OSS Calendar
![OSS Calendar Logo](https://github.com/thinkingreed-inc/oss-calendar/blob/master/resources/nuxt/assets/img/logo.png?raw=true)  
OSS Calendarは企業で使うことを想定したオープンソースのカレンダーアプリです。

## Motivation
企業内のスケジューラーは使いづらい部分が多くあります。  
しかし、個人のGoogleカレンダーなどと連携させてしまうと情報管理が心配で、開発をしたくてもカレンダーアプリは費用が掛かりすぎてしまいます。

OSS Calendarは企業で使うことを想定したカレンダーアプリですので、以下のような機能を実現しています。
- チーム全員のスケジュールの可視化
- 素早いメンバーアサインの実現
- 通常のスケジューラーとしての利用

詳しくは公式サイトをご確認ください。  
[OSS Calendar](https://oss-calendar.com/)

## Features
- Laravel 6.x
- passport
- Vue + VueRouter + Vuex 
- vuetify

## 開発環境
Dockerを使って開発サーバーを建てる手順について説明します。
検証はMacOSのDocker for Macで行っていますので、Windowsの場合ところどころ違う可能性があります。

### バックエンドの準備
```sh
git clone https://github.com/ProjectEuropa/oss-calendar.git oss-calendar
cd oss-calendar
docker-compose build
docker-compose up -d
```
#### コンフィグを準備する
```bash
cp .env.example .env
```
* クライアントサーバとAPIサーバの.envファイルの設定例：  

```txt

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=osscalendar
DB_USERNAME=username
DB_PASSWORD=userpass

MAIL_DRIVER=smtp
MAIL_HOST=mailcatcher
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="シンキングリード"
```

#### Laravelのセットアップ
```bash
# Dockerコンテナにログインして、Composerで関連ファイルをInstallする
docker ps
docker exec -it [container_id] bash
# ここからコンテナ内
cd /var/www/html/
composer install
php artisan key:generate
php artisan optimize
php artisan migrate
php artisan db:seed
php artisan passport:install
```

#### 注意点
>* 既存のdockerimageとのポートの競合を回避する必要あります。  
>もし80番ポート等を使われている場合は、docker-compose.yml内のポートを修正してください。
>クライアントサーバは`npm run dev`で稼働し、APIサーバはDockerコンテナのNginx、php-fpmで稼働します
> * .env.sampleをコピーして.envファイルを作成する  
> * .envファイルにあるAPP_KEYを更新する
> * .env内部では半角スペースを使用できません。利用する場合はシングルクォーテーションでくくってください。
> * もし、開発時にLaravelのコードが反映されない場合、php artisan optimizeでキャッシュをクリアする

### フロントエンドの準備
ここではDockerではなく、クライアント側でnpmを実行手順を紹介する

* クライアントのコマンド実行例： 
```bash
npm install
npm run dev
```

表示されるURLにアクセスして、ログイン画面が表示され、「admin/admin」でログインできれば環境構築は完了です。

### 補足
APIサーバには設定ファイルがキャッシュ化されているため、設定変更した場合は、`php artisan optimize`コマンドを実行する。


* 同一サーバで稼働させる  
apacheのドキュメントルートをpublic/以下に設定し、稼働させる  
APIサーバには設定ファイルがキャッシュ化されているため、設定変更した場合は、`php artisan optimize`コマンドを実行する。

### Cronの設定
予定のメール通知を受け取るために、以下のスクリプトをcronに登録する
```sh
$ crontab -e
#以下の行を追加
#cd /var/www/html/ && php artisan command:reminder >> /dev/null 2>&1
```

#### 開発

api用のコントローラの作成
```bash
$ php artisan make:controller ApiController --api
```

自動補完対応
```bash
$ php artisan ide-helper:generate
$ php artisan ide-helper:model
```

## License
### GPLv3 Disclaimer
For the avoidance of doubt, except that if any license choice
other than GPL or LGPL is available it will apply instead,
Thinkingreed elects to use only the General Public License version 3
(GPLv3) at this time for any software where a choice of GPL
license versions is made available with the language indicating
that GPLv3 or any later version may be used, or where a choice
of which version of the GPL is applied is otherwise unspecified.

### OSS-Calendar FOSS License Exception
We want free and open source software applications under certain
licenses to be able to use specified GPL-licensed OSS-Calenar
despite the fact that not all such FOSS licenses are
compatible with version 3 of the GNU General Public License.
Therefore there are special exceptions to the terms and conditions
of the GPLv2 as applied to these client libraries, which are
identified and described in more detail in the FOSS License
Exception at
There are other conditions specified by Thinkingreed.
