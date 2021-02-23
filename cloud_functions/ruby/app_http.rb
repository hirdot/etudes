require "functions_framework"
require "google/cloud/storage"

# This function receives an HTTP request of type Rack::Request
# and interprets the body as JSON. It prints the contents of
# the "message" field, or "Hello World!" if there isn't one.
FunctionsFramework.http "format_csv" do |request|
  # ビルド環境変数は ENV['BUCKET_NAME']
  storage = Google::Cloud::Storage.new
  bucket  = storage.bucket ENV["BUCKET_NAME"]
  bucket.files.each do |file|
    logger.info " _ file: #{file.name}"
    exec(bucket, file)
    break
  end
end

def exec(bucket, file)
  # ファイルを開き、内容をbufferに代入
  buffer = file.download.read
  logger.info " > file.download.read"

  # 改行コード、NULL、空文字
  buffer.gsub!(/\R/, "\n")
  buffer.gsub!(/\000/, "")
  buffer.gsub!(/\"\"/, "NULL")
  logger.info " > buffer.gsub!"

  data = StringIO.new buffer
  logger.info " > data = StringIO.new buffer"

  bucket.create_file data, file.name
  logger.info " > bucket.create_file data, file.name"
end
