# BlogApp

Dieses Projekt wurde mit [Angular CLI](https://github.com/angular/angular-cli) Version 18.2.9 generiert.

## Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Entwicklungsserver](#entwicklungsserver)
3. [Code-Qualität und Tests](#code-qualität-und-tests)
4. [CI/CD-Pipeline für Deployment auf Azure](#cicd-pipeline-für-deployment-auf-azure)
5. [Sicherheitsüberprüfung und Abhängigkeitsmanagement](#sicherheitsüberprüfung-und-abhängigkeitsmanagement)
6. [Setup und Nutzung](#setup-und-nutzung)
7. [Weiterführende Hilfe](#weiterführende-hilfe)

## Projektübersicht

Dieses Repository enthält die grundlegende Entwicklungsumgebung für ein Angular-Projekt. Diese Einrichtung wurde im Rahmen der Iteration 0 des agilen Entwicklungsprozesses vorgenommen, um alle technischen Voraussetzungen für die Entwicklung sicherzustellen. Dies umfasst:

1. Aufsetzen eines neuen Angular-Projekts mit SCSS als Präprozessor.
2. Konfiguration eines öffentlichen GitHub-Repositories.
3. Integration von Code-Qualitätstools für statische Codeanalyse und Formatierung.
4. Einrichtung einer GitHub Actions CI/CD-Pipeline für automatische Builds, Tests, Sicherheitsüberprüfungen und Deployment auf Azure.

## Entwicklungsserver

- Starte den Entwicklungsserver mit:
  ```bash
  ng serve
  ```
- Öffne dann `http://localhost:4200/` im Browser. Die Anwendung wird automatisch aktualisiert, wenn Änderungen am Code vorgenommen werden.

## Code-Qualität und Tests

### Linting

- Linting zur Code-Qualitätsprüfung wird über ESLint durchgeführt:
  ```bash
  npm run lint
  ```

### Unit-Tests

- Unit-Tests werden mit Karma ausgeführt:
  ```bash
  npm run test -- --watch=false --browsers=ChromeHeadless
  ```

### End-to-End-Tests

- E2E-Tests können mit einem geeigneten Framework ausgeführt werden. Installiere ein Tool wie Protractor oder Cypress und führe die Tests wie folgt aus:
  ```bash
  ng e2e
  ```

## CI/CD-Pipeline für Deployment auf Azure

Das Projekt enthält eine GitHub Actions CI/CD-Pipeline, die automatische Builds, Tests, Sicherheitsüberprüfungen und das Deployment auf Azure durchführt.

### Workflow-Übersicht

Der Workflow läuft bei jedem Push in den `main`-Branch sowie bei Pull-Request-Events. Die Schritte umfassen:

1. **Code Checkout**: Holt den neuesten Code vom Repository.
2. **Node.js-Umgebung einrichten**: Verwendet Node.js Version 20.x.
3. **Abhängigkeiten installieren**: Führt `npm ci` aus, um Abhängigkeiten basierend auf `package-lock.json` zu installieren.
4. **Code-Qualitätsprüfungen und Tests**:
   - **Linting** mit ESLint.
   - **Unit-Tests** mit Karma.
5. **Build**: Führt `ng build --prod` aus, um die Anwendung für die Produktion zu erstellen.
6. **Sicherheitsüberprüfungen**:
   - `npm audit` prüft auf Sicherheitslücken.
   - `npm audit fix` behebt automatisch erkannte Schwachstellen.
7. **Deployment auf Azure**:
   - Die gebaute Anwendung wird mit `Azure/static-web-apps-deploy@v1` direkt auf Azure Static Web Apps bereitgestellt.

### Automatisches Deployment

Das Deployment erfolgt automatisch bei jedem Push in den `main`-Branch. Die CI/CD-Pipeline kümmert sich um den gesamten Workflow von Build über Tests und Sicherheitsüberprüfung bis hin zur Bereitstellung auf Azure.

## Sicherheitsüberprüfung und Abhängigkeitsmanagement

- **Sicherheitsüberprüfung**: `npm audit` überprüft die Abhängigkeiten auf Sicherheitslücken, während `npm audit fix` gefundene Schwachstellen automatisch behebt.
- **Abhängigkeitsmanagement**: Der Workflow prüft veraltete Pakete mit `npm outdated` und aktualisiert Abhängigkeiten mit `npm update`, um sicherzustellen, dass das Projekt aktuell bleibt.

## Setup und Nutzung

### Voraussetzungen

- **Node.js und npm** (mindestens Node.js v20.x und npm v7+)
- **Angular CLI** (wird automatisch im Setup installiert)
- **Azure CLI** (optional, falls das Deployment manuell getestet werden soll)
- **Azure-Konto**: Für das automatische Deployment auf Azure ist ein Konto mit Berechtigungen erforderlich.

### Projekt initialisieren und GitHub-Repository einrichten

1. **Angular-Projekt erstellen**:
   ```bash
   ng new blog-app --style=scss
   cd blog-app
   ```
2. **Git initialisieren** und erstes Commit erstellen:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. **GitHub-Repository hinzufügen** und Änderungen pushen:
   ```bash
   git remote add origin https://github.com/<your-username>/blog-app.git
   git push -u origin main
   ```

## Weiterführende Hilfe

Für weitere Informationen zur Angular CLI kannst du die [Angular CLI-Dokumentation](https://angular.dev/tools/cli) besuchen.
