.PHONY: help
help: ## Prints help for targets with comments
	@grep -E '^[a-zA-Z._-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dev: ## Starts dev web server with a clear cache
	yarn cleanly-develop

.PHONY: post
post:
	@./bin/generate_blog_post.sh
