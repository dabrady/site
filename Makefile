.PHONY: help
help: ## Prints help for targets with comments
	@grep -E '^[a-zA-Z._-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## Installs project dependencies
	yarn install

.PHONY: clean
clean: ## Cleans build artifacts
	yarn clean

.PHONY: dev
dev: FLAGS ?= '--open'
dev: ## Starts dev web server with a clear cache
	yarn develop ${FLAGS}

.PHONY: post
post: ## Starts a new blog post
	@./bin/generate_blog_post.sh

.PHONY: pin-nodejs
pin-nodejs: NODE_VERSION ?= $(subst v,,$(shell node -v))
pin-nodejs: ## Updates the version of Node.js used by this project
	@echo "🛠  Pinning Node.js version to ${NODE_VERSION}"
	@echo ${NODE_VERSION} > .node-version
	@sed -i '' -e 's/nodejs .*/nodejs ${NODE_VERSION}/' .tool-versions
	@echo "🤙🏻 Done."
