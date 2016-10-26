#!/bin/bash
docker kill front;docker rm front
docker rmi front-dist
docker build -t front-dist .

docker run -d -p 4000:80 --name=front front-dist:latest
