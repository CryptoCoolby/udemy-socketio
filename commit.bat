git add .
set /P comment=Enter comment for commit:
git commit -m "%comment%"
git push heroku master
heroku open
