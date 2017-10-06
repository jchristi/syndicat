BINDIR=./node_modules/.bin
MOCHA=$(BINDIR)/mocha
MOCHADEFAULTOPTS=--recursive --async-only --colors --reporter spec -t 15000
JEST=$(BINDIR)/jest
JESTDEFAULTOPTS=
TESTDIR=tests/


lint:
	$(BINDIR)/eslint --ignore-path .gitignore .

test:
	$(JEST) $(JESTDEFAULTOPTS)

mochatest:
	$(MOCHA) $(MOCHADEFAULTOPTS) \
		--full-trace \
		--bail \
		$(TESTDIR)

mochatestdebug:
	$(MOCHA) $(MOCHADEFAULTOPTS) \
		--full-trace \
		--debug \
		--bail \
		$(TESTDIR)

mochaci: lint
	$(MOCHA) $(MOCHADEFAULTOPTS) $(TESTDIR)

ci: lint test
