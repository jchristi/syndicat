# test:
# 	./node_modules/.bin/ava --fail-fast -v tests/**/*_test.js
#
# debugtest:
# 	./node_modules/.bin/ava --fail-fast -v -s tests/**/*_test.js

test:
	./node_modules/mocha/bin/mocha --full-trace --recursive --async-only \
		--bail --colors --reporter spec tests/

