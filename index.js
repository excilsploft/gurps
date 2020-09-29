const github = require('@actions/github');
const yargs  = require('yargs');
const columnify = require('columnify');

// get the repos and branches for given owner
async function getRepoBranches(authToken, owner) {

	const octokit = github.getOctokit(authToken);
	const orgName = owner;
	const repoList = [];

	const {data: repos} =  await octokit.repos.listForOrg({
		org: orgName, });

	repos.forEach( repo => {

		const repoObj = {};
		repoObj['name'] = repo.name;
		repoObj['url'] = repo.url;
		repoObj['branches'] = [];
		repoList.push(repoObj)

	});
		

	for ( const repo of repoList ) {
		const {data: branches} = await octokit.repos.listBranches({
			owner: orgName,
			repo: repo.name, });

		branches.forEach( branch => {
			repo['branches'].push(branch.name);
		});
	}

	return repoList;
}

// return the result set as columns if a branch matches the param
async function byBranch(authToken, owner, branchName) {

	const repoList = await getRepoBranches(authToken, owner);

	const data = [];

	for (let repo of repoList ) {
		for (let branch of repo.branches) {
			if (branch.includes(branchName)) {
				let foundData = {
					repo: repo.name,
					branch: branch,
				}
				data.push(foundData);
			}
		}
	}

	return columnify(data, { columns: ['repo', 'branch']});
}


// return the result set as columns if a repo matches the param
async function byRepo(authToken, owner, repoName) {

	const repoList = await getRepoBranches(authToken, owner);

	const data = [];

	for (let repo of repoList ) {
		if (repo.name.includes(repoName)) {
			for (let branch of repo.branches) {
				let foundData = {
					repo: repo.name,
					branch: branch,
				}
				data.push(foundData);
			}
		}
	}

	return columnify(data, { columns: ['repo', 'branch']});
}

// return the result set as JSON
async function asJSON(authToken, owner) {

	const repoList = await getRepoBranches(authToken, owner);
	return JSON.stringify(repoList, null, 4);	
}	

// the main function called
async function cli () {

	const options = yargs
		.env('GITHUB')
		.usage('Usage: -b <branch>')
		.option('r', { alias: 'repo', describe: 'the repo name to filter on', type: 'string', demandOption: false})
		.option('b', { alias: 'branch', describe: 'the branch name to filter on', type: 'string', demandOption: false})
		.option('t', { alias: 'auth-token', describe: 'the github auth token, env [GITHUB_AUTH_TOKEN]', type: 'string', demandOption: true})
		.option('o', { alias: 'owner', describe: 'the github owner or org, env [GITHUB_OWNER]', type: 'string', demandOption: true})
		.example('$0 -b <your word>', 'get branches with your word in the name')
		.example('$0 -r <your word>', 'get repos with your word in the name')
		.example('$0', 'get repos and branches as JSON')
	    .help('help')
		.alias('h', 'help')
		.argv;


	let output = ''

	switch (true) {

		case (options.repo != null):
			output = await byRepo(options.authToken, options.owner, options.repo);
			break;
		case (options.branch != null):
			output = await byBranch(options.authToken, options.owner, options.branch);
			break;
		default:
			output = await asJSON(options.authToken, options.owner);
			break
	}

	console.log(output);
}


exports.getRepoBranches = getRepoBranches;
exports.cli = cli;
