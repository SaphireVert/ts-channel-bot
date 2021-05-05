up:
    cd ./app && npm start

dev:
    cd ./app && npm run dev

docker-dev:
    docker-compose -f docker-compose-dev.yml up
    
docker-prod:
    docker-compose -f docker-compose-prod.yml up --build