docker-compose up -d

docker-compose down


build your image:

docker build -t blockbuster-api .

command to spin up your container:
docker run -p80:3000 blockbuster-api
