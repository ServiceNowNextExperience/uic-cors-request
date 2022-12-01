# ServiceNow UIC CORS Request

## Example of how to make a client-side Javascript Cross Origin Resource Sharing (CORS) request from a custom Next Experience (UIB) Component

NOTE: This is just an example.  Be careful when modifying the security of your application, and be sure that you understand the [CORS Standards](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).


## Usage
1. Make sure that you have the [ServiceNow Command Line Interface (CLI) tools installed](https://www.servicenow.com/community/next-experience-articles/setting-up-command-line-interface-cli-for-custom-component-dev/ta-p/2361588).
2. Fork this repo and pull it locally.
3. Make sure that you're connected to your instance with a SN CLI profile and authenticated using "snc ui-component login {instance_url} basic {user_name} {password}".
4. Run "npm install" to load all of the NPM packages. (Again, you may need to refer to the article above to make sure that you have component dev running locally).
5. Finally, run "snc ui-component deploy --force" to deploy the component to your instance.
6. Open a UIB Page and drag and drop the UIC Cors Request component onto the screen.
7. Use this as inspiration as you dig in and figure out how it all works!
