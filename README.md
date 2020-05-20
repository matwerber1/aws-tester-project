# Amazon Cognito UI Tester

# Demo

https://matwerber1.github.io/aws-tester-project

## Local Deployment

1. Clone this project

  ```sh
  git clone https://github.com/matwerber1/amazon-cognito-ui-tester.git
  ```

2. Install dependencies

  ```sh
  npm install
  ```

3. Run local version of the web UI

  ```sh
  npm run start
  ```

## Publishing a github.io webpage

This optional step allows you to publish your site to GitHub.io. This project's dependencies include [react-gh-pages](https://github.com/gitname/react-gh-pages), which makes it a breeze to publish to github.io. 

1. Complete the **Local Deployment** steps above to make sure things are working as expected.

2. Open package.json and edit the replace `YOUR_GIT_USERNAME` and `YOUR_REPOSITORY_NAME` with proper values:

  ```
  "homepage": "https://YOUR_GIT_USERNAME.github.io/YOUR_REPOSITORY_NAME",
  ```

3. Build the web app app, publish to a `gh-pages` branch:

  ```
  npm run deploy
  ```

Read more about how this works at [react-gh-pages](https://github.com/gitname/react-gh-pages).
