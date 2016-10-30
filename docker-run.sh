#!/bin/bash
docker kill front;docker rm front
docker rmi front-image 211.157.146.6:5000/task-management-frontend
rm -rf dist
ng build --prod
docker build -t front-image .

docker tag front-image 211.157.146.6:5000/task-management-frontend
docker push 211.157.146.6:5000/task-management-frontend
docker rmi front-image

docker run -d -p 4000:80 --name=front 211.157.146.6:5000/task-management-frontend
