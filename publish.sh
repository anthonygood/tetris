git checkout build
rm -rf dist
npm run build
cp dist publish
git add publish
git commit -m "Publish build to build branch"
git push origin build
echo "You're now on the build branch!"
