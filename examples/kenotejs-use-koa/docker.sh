#!/bin/bash


type=$1

start(){
  case $type in
    init)
      cp -r ./config ./.docker/
      cp -r ./mock ./.docker/
      cp -r ./static ./.docker/
      cp -r ./views ./.docker/
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