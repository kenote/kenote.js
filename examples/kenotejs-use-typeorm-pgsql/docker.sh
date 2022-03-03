#!/bin/bash

type=$1

start(){
  case $type in
    init)
      [ ! -d ./.docker ] && mkdir .docker
      cp -r ./config ./.docker/
      cp -r ./static ./.docker/
      cp -r ./views ./.docker/
      cp -r ./config.docker.yml ./.docker/config/server/
    ;;
    start)
      [ -f ./docker-compose.yml ] && docker-compose up -d
    ;;
    stop)
      [ -f ./docker-compose.yml ] && docker-compose down
    ;;
    remove)
      [ -f ./docker-compose.yml ] && docker-compose down -v
    ;;
    *)
    exit;;
  esac
}

start