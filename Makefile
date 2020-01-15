.PHONY=run debug
run:
	yarn run develop

debug:
	rm -r .cache
	env "NODE_ENV=development" "DEBUG=gatsby:query-watcher" yarn run develop
