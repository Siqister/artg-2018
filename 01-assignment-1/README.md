# Review of npm and git

Both Git/github and npm are tools we'll use extensively throughout the class. We'll have many opportunities to practice with their use, and this brief assignment will get you up to speed.

## Installation
Please install the latest versions of the following on your computer
* Node.js
* npm
* Git

Please also sign up for a Github account if you don't already have one.

## Work flow 1: getting started with the course repo
This workflow lets you copy the course material "repo" (repository) to under your own Github account and get started with work in this course. This way, any changes you make to the repo will stay your own, without changing the master repo.

### Forking the main course repo
Make sure you have the required software installed and log into Github. Navigate to to the [course repo](https://github.com/Siqister/artg-2018), and click on the "fork" button on the upper right corner. That's it!

### Cloning the repo
Using the command line, navigate to a folder on your computer (perhaps desktop or documents), and type in the following command:
```
git clone <repository url>
```
Documentation [here](https://git-scm.com/docs/git-clone)

Your now have a local repo that tracks the remote repo.

### What remote repo is this tracking?
To see what remote repo that your local repo is tracking (there may be several), type. What do you see?
```
git remote -v
```

## Work flow 2: making, staging, and committing changes
To make changes to the repo involves a 3-step process. First, you edit files and save them as you normally would. Then, you have to "stage" changed files and directories so that they are in queue to be committed. Finally, you "commit" changes, which then becomes a part of the repo's version history.

### Staging for commit
```
git add [file path]
```
To stage all the files changed since the last commit:
```
git add --all
```
To check the status of your working directory, including which files are changed but not staged, staged but not committed, use
```
git status
```

### Committing staged changes
```
git commit -m "Some commit message"
```

### Push changes from local repo to remote repo
```
git push [remote repo name] [local branch name]
```

## Work flow 3: setting up your own git repo and adding remote origin

## Work flow 4: working with branches