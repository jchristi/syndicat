lint:
	./node_modules/.bin/eslint **/*.js

test:
	./node_modules/.bin/mocha \
		--full-trace \
		--recursive \
		--async-only \
		--bail \
		--colors \
		--reporter spec \
		tests/

testdebug:
	./node_modules/.bin/mocha \
		--full-trace \
		--debug \
		--recursive \
		--async-only \
		--bail \
		--colors \
		--reporter spec
		tests/

ci:
	./node_modules/.bin/mocha \
		--recursive \
		--async-only \
		--reporter spec \
		tests/
