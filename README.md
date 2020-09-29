# gurps

A Node.js commandline tool for retrieving repos for a given org or owner

## Install

1. `git clone git@github.com:excilsploft/gurps.git`
2. `cd gurps`
3. `npm install -g gurps`
4. `gurps --help`
5. Set up GITHUB_AUTH_TOKEN and GITHUB_OWNER [environment variables](#usage)

## Usage<a name="usage"></a>

gurps needs a couple of environment variables set up
  ```
	GITHUB_AUTH_TOKEN=<your github auth token>
	GITHUB_OWNER=<your github user name or Org>
  ```
1. open your `.bashrc` in your favourite editor.ie (`vim /Users/<your_username>/.bashrc`)
2. add the following lines with your values and save the file:
   ```
	export GITHUB_AUTH_TOKEN=<your github auth token>
	export GITHUB_OWNER=<your github user name or Org>

   ```
3. type `source ~/.bashrc` in your favourite terminal emulator
4. run `gurps` or with the commandline flags a


altnernately, they can be provided on the command line (not recommended)

here is how to get a [Github Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)


```
Usage: -b <branch>

Options:
      --version     Show version number                                [boolean]
  -r, --repo        the repo name to filter on                          [string]
  -b, --branch      the branch name to filter on                        [string]
  -t, --auth-token  the github auth token, env [GITHUB_AUTH_TOKEN]
                                                             [string] [required]
  -o, --owner       the github owner or org, env [GITHUB_OWNER]
                                                             [string] [required]
  -h, --help        Show help                                          [boolean]

Examples:
  gurps -b <your word>  get branches with your word in the name
  gurps -r <your word>  get repos with your word in the name
  gurps                 get repos and branches as JSON

```

## Running from Docker

1. clone the repo
2. create a `.env` file with the following lines:
  ```
	GITHUB_AUTH_TOKEN=<your github auth token>
	GITHUB_OWNER=<your github user name or Org>
  ```
4. run `make`
3. run `docker run --rm --env-file ./.env gurps:latest gurps -b <your branch string>`

Alternatively,
1. set up the env variables in your .bashrc as noted in the [above](#usage)
2. clone the repo and change the directory to it
3. run `make`
4. run `docker run --rm --env GITHUB_AUTH_TOKEN --env GITHUB_OWNER gurps:latest gurps -b <your branch string>`

