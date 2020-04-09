uppload-serverless-s3
===

Example python backend for uploading images to AWS S3 using serverless.

Example uploader using uppload and create-react-app.

To set up the backend:

1. Set up your AWS credentials in serverless.yml
2. Run `npm install` to install dependencies.
3. Run `npm run deploy` to deploy.

This creates the S3 bucket and API. Output shows something like:

    api keys:
      dev-uppload-serverless-s3-api-key: <snip1>
    endpoints:
    ANY - https://<snip2>.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
    functions:
    wsgi: uppload-serverless-s3-dev-wsgi

You need the secret api key and the API prefix to run the demo.
Copy the example/.env.template to example/.env and fill them in.

Then you can start the demo by running under example:

1. `npm install`
2. `npm start

The demo allows uploads from camera or local files.
You can add other methods normally using uppload:
https://uppload.js.org/
