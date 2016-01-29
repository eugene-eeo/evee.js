bundle:
	cat evee.js \
	    plugins/*.js | uglifyjs -mc > evee.bundle.js

gzip: bundle
	cat evee.bundle.js | gzip > evee.bundle.js.gz

stats: gzip
	cat evee.bundle.js.gz | wc -c

clean:
	-test -f evee.min.js       && rm evee.min.js
	-test -f evee.bundle.js    && rm evee.bundle.js
	-test -f evee.bundle.js.gz && rm evee.bundle.js.gz

min:
	cat evee.js | uglifyjs -mc > evee.min.js
