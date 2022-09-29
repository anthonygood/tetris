git checkout build
npm run build
git add dist
git commit -m "Publish build to build branch"
git push origin build
