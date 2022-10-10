git checkout build
git merge main
npm run build
cp dist/* ./
git add .
git commit -m "Publish build to build branch"
git push origin build
echo "You're now on the build branch!"
