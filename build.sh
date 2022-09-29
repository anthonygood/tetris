
rm -rf dist
mkdir dist
cp src/index.html dist/index.html
cp src/style.css dist/style.css

npm run bundle
