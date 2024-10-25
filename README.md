<<<<<<< HEAD

# angular-blogApp-simon-fankhauser

=======

# BlogApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

> > > > > > > 55a1196 (initial commit)

# Angular Projekt - Iteration 0 Setup

Dieses Repository enthält die grundlegende Entwicklungsumgebung für ein Angular-Projekt. Diese Einrichtung wurde im Rahmen der Iteration 0 des agilen Entwicklungsprozesses vorgenommen, um alle technischen Voraussetzungen für die kommende Entwicklung sicherzustellen.

## Projektübersicht

In dieser Iteration 0 wurden folgende Ziele umgesetzt:

1. Aufsetzen eines neuen Angular-Projekts mit SCSS als Präprozessor.
2. Konfiguration eines öffentlichen GitHub-Repositories.
3. Integration von Code-Qualitätstools für statische Codeanalyse und Formatierung.
4. Einrichtung einer GitHub Actions CI/CD-Pipeline für automatische Builds, Tests, Sicherheitsüberprüfungen und Deployment auf Azure.

## Voraussetzungen

- Node.js und npm (mindestens Node.js v20.x und npm v7+)
- Angular CLI (wird automatisch im Setup installiert)
- Azure CLI (falls du die Bereitstellung manuell testen möchtest)
- Ein Azure-Konto mit Berechtigungen für das Deployment

## Inhaltsverzeichnis

1. [Setup eines neuen Angular-Projekts](#setup-eines-neuen-angular-projekts)
2. [Einrichten des GitHub-Repositories](#einrichten-des-github-repositories)
3. [Konfiguration von Code-Qualitätstools](#konfiguration-von-code-qualitätstools)
4. [CI/CD-Pipeline für Deployment auf Azure](#cicd-pipeline-für-deployment-auf-azure)
5. [Sicherheitsüberprüfung und Abhängigkeitsmanagement](#sicherheitsüberprüfung-und-abhängigkeitsmanagement)
6. [Dokumentation für Entwickler](#dokumentation-für-entwickler)

---

### Setup eines neuen Angular-Projekts

1. **Angular CLI installieren** (falls noch nicht installiert):
   ```bash
   npm install -g @angular/cli
   ```

Neues Angular-Projekt erstellen: Erstelle das Angular-Projekt und setze SCSS als Standard für die Stylesheets:

bash
Code kopieren
ng new angular-BLOG-APP-simon-fankhauser --style=scss
In das Projektverzeichnis wechseln:

bash
Code kopieren
cd angular-BLOG-APP-simon-fankhauser
Einrichten des GitHub-Repositories
Initialisiere Git:

bash
Code kopieren
git init
git add .
git commit -m "Initial commit"
Remote-Repository auf GitHub erstellen: Erstelle ein Repository auf GitHub mit dem Namen angular-BLOG-APP-simon-fankhauser und veröffentliche das Projekt:

bash
Code kopieren
git remote add origin https://github.com/hftm-in2022/angular-BLOG-APP-simon-fankhauser.git
git push -u origin main
Konfiguration von Code-Qualitätstools
ESLint zur statischen Codeanalyse:

bash
Code kopieren
ng add @angular-eslint/schematics
Prettier zur Code-Formatierung:

bash
Code kopieren
npm install --save-dev prettier
Erstelle eine .prettierrc-Datei im Root-Verzeichnis mit folgendem Inhalt:

json
Code kopieren
{
"singleQuote": true,
"trailingComma": "all"
}
CommitLint zur Prüfung von Commit-Nachrichten:

bash
Code kopieren
npm install --save-dev @commitlint/config-conventional @commitlint/cli husky lint-staged
Husky und Lint-Staged einrichten:

bash
Code kopieren
npx husky install
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
In der package.json:

json
Code kopieren
"lint-staged": {
"_.ts": ["eslint --fix"],
"_.scss": ["prettier --write"],
"_.{ts,js,html}": "eslint --cache --fix",
"_.{ts,js,html,css,scss,less,md}": "prettier --write"
}
CI/CD-Pipeline für Deployment auf Azure
Service Principal in Azure erstellen: Führe folgenden Befehl in der Azure CLI aus, um Anmeldeinformationen für das Deployment zu erstellen:

bash
Code kopieren
az ad sp create-for-rbac --name "BLOG-APP" --role contributor --scopes /subscriptions/{subscription-id} --sdk-auth --output json
Speichere die Ausgabe als GitHub Secret mit dem Namen AZURE_CREDENTIALS.

GitHub Actions Workflow (.github/workflows/deploy.yml): Der folgende Workflow führt die Schritte Build, Tests, Sicherheitsüberprüfungen und Deployment durch:

yaml
Code kopieren
name: Azure Deployment

on:
push:
branches: - main

jobs:
build:
runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20.x'

      - run: npm install

      - name: Install Angular CLI
        run: npm install -g @angular/cli

      - name: Run ESLint
        run: npm run lint

      - name: Run Unit Tests
        run: npm run test -- --watch=false --browsers=ChromeHeadless

      - name: Build the project
        run: npm run build --prod

      - name: Run security audit
        run: npm audit --audit-level=high

      - name: Run security audit and fix
        run: npm audit fix

      - name: Check for outdated dependencies
        run: npm outdated

      - name: Update dependencies
        run: npm update

      - name: Check for Angular updates
        run: ng update --force

      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'BLOG-APP'
          slot-name: 'production'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}

Sicherheitsüberprüfung und Abhängigkeitsmanagement
Sicherheitsüberprüfung: Die Pipeline verwendet npm audit zur Überprüfung auf Sicherheitslücken und npm audit fix, um diese automatisch zu beheben.
Abhängigkeitsmanagement: npm outdated überprüft, ob alle Pakete auf dem neuesten Stand sind, und npm update aktualisiert automatisch alle Abhängigkeiten auf die neueste Version.
Dokumentation für Entwickler
Entwicklung lokal starten:

bash
Code kopieren
ng serve
Build erstellen:

bash
Code kopieren
ng build --prod
Tests ausführen:

bash
Code kopieren
npm run test
Code-Qualität sicherstellen: Vor jedem Commit überprüft Husky automatisch den Code-Standard und die Formatierung.

Deployment auf Azure: Das Deployment erfolgt automatisch, wenn neue Änderungen in den main-Branch gepusht werden. GitHub Actions kümmert sich dabei um den gesamten Workflow, einschließlich Build, Tests, Sicherheitsüberprüfung und Bereitstellung auf Azure.
