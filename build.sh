cd "$(dirname "$0")"

cd ./web
ng build --environment=prod

cd ..
docker build -t cs-team-tv .
