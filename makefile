# Paths
webpack_build := webpack/webpack.config.js
webpack_dev := webpack/webpack.dev.js

# NPX functions
tsc := node_modules/.bin/tsc
webpack := node_modules/.bin/webpack
webpack_dev_server := node_modules/.bin/webpack-dev-server
mocha := node_modules/.bin/mocha
ts-node := node_modules/.bin/ts-node

# Docker
image_name := went-ui
image_tag := went-ui
image_repo := rpnittech/went-ui

.IGNORE: clean-linux kill stop

main: run

run:
	@echo "[INFO] Starting development"
	@PORTAL_PATH="https://devl.auth.rpngo.com/" \
	GO_API_PATH="https://devl.api.go.rpngo.com" \
	VENDOR_PATH="https://devl.vendor.rpngo.com" \
	NODE_ENV=development \
	$(webpack_dev_server) --config $(webpack_dev) --open

local:
	@echo "[INFO] Starting development"
	@PORTAL_PATH="https://devl.auth.rpngo.com/" \
	GO_API_PATH="http://localhost:8080" \
	VENDOR_PATH="https://devl.vendor.rpngo.com" \
	NODE_ENV=development \
	$(webpack_dev_server) --config $(webpack_dev) --open

prod:
	@echo "[INFO] Starting development"
	@PORTAL_PATH="https://auth.rpngo.com/" \
	GO_API_PATH="http://localhost:8080" \
	VENDOR_PATH="https://vendor.rpngo.com" \
	NODE_ENV=development \
	$(webpack_dev_server) --config $(webpack_dev) --open

build: clean-linux
	@echo "[INFO] Starting build"
	@NODE_ENV=production $(ts-node) script/clean-app.ts
	@NODE_ENV=production $(webpack) --config $(webpack_build)

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

clean-linux:
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf .nyc_output
	@rm -rf coverage

docker: build
	@echo "[INFO] Create docker image"
	@docker build -t $(image_name) -f Dockerfile ./

kill:
	@echo "[INFO] Killing docker image"
	@docker kill $(image_tag)

stop: kill
	@echo "[INFO] Stopping docker image"
	@docker rm $(image_tag)

tag:
	@echo "[INFO] Mark docker tag"
	@docker tag $(image_name) $(image_repo):1.1.0

publish: stop tag
	@echo "[INFO] Publish docker image"
	@docker push $(image_repo):1.1.0
