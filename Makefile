BINDIR=./node_modules/.bin
MOCHA=$(BINDIR)/mocha
MOCHADEFAULTOPTS=--recursive --async-only --colors --reporter spec -t 15000
TESTDIR=tests/


lint:
	$(BINDIR)/eslint --ignore-path .gitignore .

test:
	$(MOCHA) $(MOCHADEFAULTOPTS) \
		--full-trace \
		$(TESTDIR)

testdebug:
	$(MOCHA) $(MOCHADEFAULTOPTS) \
		--full-trace \
		--debug \
		--bail \
		$(TESTDIR)

ci: lint
	$(MOCHA) $(MOCHADEFAULTOPTS) $(TESTDIR)
