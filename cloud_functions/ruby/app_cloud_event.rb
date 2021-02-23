require "functions_framework"
require "google/cloud/storage"
require "base64"

# sample
# > access to cloud storage
#  >> 'ENV'でアクセス可能な環境変数はランタイム環境変数
# > format_csv
#  >> 改行コードなどをgsubで変換し、同名で上書き保存
FunctionsFramework.cloud_event "event_name" do |event|
  logger.info " > start!!"

  # ビルド環境変数は ENV['BUCKET_NAME'] では取得できない
  storage = Google::Cloud::Storage.new
  bucket  = storage.bucket ENV["BUCKET_NAME"]

  # csv ファイルのフォーマット調整処理
  bucket.files.each do |file|
    logger.info " _ file: #{file.name}"
    format_csv(bucket, file)
  end

  # csv ファイルのインポート処理
  # HI の一時テーブル作成
end

def format_csv(bucket, file)
  # ファイルを開き、内容をbufferに代入
  buffer = file.download.read

  # 改行コード、NULL、空文字
  buffer.gsub!(/\R/, "\n")
  buffer.gsub!(/\000/, "")
  buffer.gsub!(/\"\"/, "NULL")

  # ファイルを更新
  data = StringIO.new buffer
  bucket.create_file data, file.name
end
