const { Probot } = require('probot');
const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');

dotenv.config();

const app = new Probot({
  // function to get the JWT for authentication
  // This JWT is required to access the GitHub API as an app
  // You can generate and download the private key for your GitHub App and store it as a file
  privateKey: process.env.PRIVATE_KEY,
  // Your GitHub App ID
  appId: process.env.APP_ID,
  // Enable debug logging
  logLevel: 'debug',
});

// event handler for pull requests
app.on('pull_request.opened', async (context) => {
  const { owner, repo, number } = context.issue();
  const octokit = new Octokit({ auth: context.github.token });

  //get details
  const { data: pullRequest } = await octokit.pulls.get({ owner, repo, pull_number: number });

  //extract information and create award
  const award = {
    recipient: pullRequest.user.email,
    title: `Pull Request #${pullRequest.number} Opened`,
    description: pullRequest.title,
    additional_description: 'Draft award additional description',
  };

  //output as json
  console.log(JSON.stringify(award));
});

//start the Probot app
app.start();
