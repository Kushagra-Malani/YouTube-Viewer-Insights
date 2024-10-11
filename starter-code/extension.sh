rm -rf extension extension.zip
cp -r public extension 
cd extension
 
declare -A scripts0=(
    [file]='inject.js'
    [url]='https://cdn.botpress.cloud/webchat/v1/inject.js'
)
declare -A scripts1=(
    [file]='config.js'
    [url]='https://mediafiles.botpress.cloud/8d9b8b72-a4fc-497b-b709-f6a7ac4dff74/webchat/config.js'
)

declare -n scripts
for scripts  in ${!scripts@}; do
  curl ${scripts[url]} -o ${scripts[file]}
  sed -i"" -e "s|${scripts[url]}|${scripts[file]}|g" home.html
done

zip -r extension.zip *
mv extension.zip ../