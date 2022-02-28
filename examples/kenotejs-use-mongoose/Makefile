all: install

clear:
	@rm -rf node_modules
	@rm -rf package-lock.json
	@rm -rf yarn.lock

install:
	@npm install

reinstall:
	@make clear
	@make install

pm2.start:
	@[ -f pm2.config.js ] && pm2 start pm2.config.js

pm2.stop:
	@[ -f pm2.config.js ] && pm2 stop pm2.config.js

pm2.remove:
	@[ -f pm2.config.js ] && pm2 delete pm2.config.js

docker.init:
	@sh ./docker.sh init

docker.start:
	@sh ./docker.sh start

docker.stop:
	@sh ./docker.sh stop

docker.remove:
	@sh ./docker.sh remove