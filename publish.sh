git checkout build
git merge main
npm run build
mkdir publish
cp dist/* publish/
git add publish
git commit -m "Publish build to build branch"
git push origin build
echo "You're now on the build branch!"
