BINDIR=./node_modules/.bin
MOCHA=$(BINDIR)/mocha
MOCHADEFAULTOPTS=--recursive --async-only --colors --reporter spec
TESTDIR=tests/


lint:
	$(BINDIR)/eslint **/*.js

test:
	$(MOCHA) $(MOCHADEFAULTOPTS) \
		--full-trace \
		--bail \
		$(TESTDIR)

testdebug:
	$(MOCHA) $(MOCHADEFAULTOPTS) \
		--full-trace \
		--debug \
		--bail \
		$(TESTDIR)

ci: lint
	$(MOCHA) $(MOCHADEFAULTOPTS) $(TESTDIR)
