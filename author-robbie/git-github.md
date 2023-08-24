# Git/Github

## What is git?

- Version control software, probably the most popular of its kind.
- Using a hidden folder (.git), it will track file updates and additions.

## What is github?

- Git does its work locally, so Github comes in to help store the changes in a remote repository.

## Commands

```bash
git init
# Initialises a new git repository within the current folder, beginning on the 'main' branch typically.
```

```bash

git status
# Tells us a bit of information about our state
```

```bash
git branch
# Tells us what branch we are working on
```

```bash
git --help
# General git help
```

```bash
git add filename.md
# Add a file to the "staging" area, where the file is "ready" to be committed
```

```bash
git add .
# Stages entire folder's contents
```

```bash
git commit -m "creates readme file"
# Commit the staged files alongside a hopefully meaningful message
# Messages may often be written in present tense, it's preference
```

```bash
git log
# Show a log of recent commits and information about them
```

```bash
git restore --staged index.html
# Unstages a file
```

```bash
git checkout e23fa6
# Go to an older commit to have a look around
```

```bash
git checkout main
# Go to working on the main branch
```

```bash
git checkout -b 'dark_mode'
# Creates a new named branch and immediately checks out to it.
```

```bash
git remote add origin (origin address)
# Adding a remote origin to work with a remote repo
```

```bash
git push origin main
# Pushes/publishes the branch you're on now to the origin (which can be called another name, if you like) to the named branch (in this case, main)
```

```bash
git clone (origin url)
# Clones repo into current folder using
```

```bash
git pull origin main
# Pulls everything from the remote origin, from the main branch
```

```bash
git merge feature/oldBranch
# Merges two branches into one
# You should use this from the receiving branch (possibly main)
```

### Extra notes

- Branches are useful for having multiple people working on the same project at the same time
- Pull requests in github are particularly useful in collaborative efforts:
  - Changes can be reviewed
  - Changes can be subjectted to linting/testing
  - Github may alert you of any merge conflicts
- It is good practice to delete a branch after merging it
