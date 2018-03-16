# NODE:   Security on API
## Details
* Build a node app with express
* Create this end point
	* first endpoint is called _api_v1/token 
		* should accept GET method only 
		* should create a new JWT token 
		* should persist the token in some(e.g. memory) storage
		* should return the token to the user 
		* should throttle connection to 10 request per minute
	* second endpoint is called _api_v1/refresh_token
		* should accept POST method only 
		* should refresh a previous given token by reading in the storage 
		* should give 403 if the token to refresh is expire more than 1hour
		* should throttle connection to 10 request per minute
	* third endpoint is called _api_v1/hello
		* should accept GET method only 
		* should return a string “Hello World!” 
		* should return 403 if the call doesn’t contain a valid token
		
## Heads-up
* Usage of promises, await and async will be good advantage.
* Show usage of security approach
* Has to be deployable, `npm install` should install all dependencies 
and allow to run app from command line (there should be no external dependencies not specified in package.json) 
* Has to be testable, `npm test` should run all tests
* Has repository created with git: there should be a git history which will show how the work has been realized 
