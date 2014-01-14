test: test-unit

test-unit:
	NODE_PATH=src ./node_modules/.bin/mocha --check-leaks --recursive test/unit $(other_options)

test-unit-continuously:
	make test-unit other_options=" --reporter min -w"
