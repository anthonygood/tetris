git checkout build
rm -rf dist
npm run build
git add dist
git commit -m "Publish build to build branch"
git push origin build
echo "You're now on the build branch!"
