test:
	./node_modules/mocha/bin/mocha --full-trace --recursive --async-only \
		--bail --colors --reporter spec tests/

testdebug:
	./node_modules/mocha/bin/mocha --full-trace --debug --recursive --async-only \
		--bail --colors --reporter spec tests/

ci:
	./node_modules/mocha/bin/mocha --recursive --async-only --reporter spec tests/
