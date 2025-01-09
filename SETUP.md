# Project Setup and Deployment Guide

## 1. Initial Setup of the Angular Project

### 1.1 Create a New Angular Project

Create a new Angular project using SCSS as the CSS preprocessor:

```bash
ng new angular-<your project name> --style=scss
```

### 1.1 Create a New Angular Project

- Initialize the Git repository:

```bash
git init
```

- Commit the project and publish it on GitHub:

```bash
git add .
git commit -m "Initial commit"
git remote add origin <your remote repository>
git push -u origin main
```

## 2. Setting Up Husky, Lint-Staged, CommitLint, and Prettier

- Install the necessary packages:

### 2.1 ESLint

Install ESLint to ensure code quality and consistency:

```bash
ng add @angular-eslint/schematics
```

### 2.2 Prettier

Prettier is used for code formatting. Install Prettier:

```bash
npm install prettier --save-dev^
```

Add the following Lines in package.json to format code with Prettier:

```bash
"scripts": {
 "format": "npx prettier --write ./src/app/*"
}
```

### 2.3 Environments für Angular generieren

Generate environments for Angular to manage different configurations:

```bash
ng generate environments^
```

### 2.4 Commitlint

CommitLint ensures that all commit messages follow a specific convention. Install CommitLint:

```bash
npm install @commitlint/cli @commitlint/config-conventional^
```

Add the following lines to package.json:

```bash
"commitlint": {
 "extends": [
   "@commitlint/config-conventional"
 ]
}
```

### 2.5 Lint-staged

Lint-Staged allows you to run linters (e.g., ESLint, Prettier) only on staged files before committing. Install it:

```bash
npm install --save-dev lint-staged^
```

Add Lint-Staged configuration to package.json:

```bash
"lint-staged": {
 "*.{ts,js,html}": "eslint --cache --fix",
 "*.{ts,js,html,css,scss,less,md}": "prettier --write"
}
```

### 2.6 Husky

Husky allows you to easily run Git hooks, like running linting before each commit. Install Husky:

```bash
npm install --save-dev husky^
npx husky init
```

Add the following Lines to package.json to prepare Husky after installation:

```bash
"scripts": {
 "prepare": "husky"
}
```

```bash
npm run prepare
echo 'npx --no-install commitlint --edit "$1"' > .husky/commit-msg
echo 'npx --no-install lint-staged' > .husky/pre-commit
```

Ensure both .husky/commit-msg and .husky/pre-commit files are saved with UTF-8 encoding.

## 3. Deployment to Azure using GitHub Actions

### 3.1 Install Azure Plugin for Visual Studio Code

Install the Azure Plugin for Visual Studio Code to enable easy deployment to Azure.

### 3.2 Create an Azure Static Web App

1. Open the Azure tab in Visual Studio Code.
2. Create a new Static Web App:

   - Select the resource group.
   - Enter a name for the Static Web App.
   - Choose Angular as the framework.
   - For the directory, enter /.
   - For the build output directory, enter `dist/<your-app-name>/browser`.
