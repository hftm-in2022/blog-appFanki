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

## Aufgabe: Sprint1 - Blog-Daten in der AppComponent darstellen und Backend anbinden

### 1. Anbindung des Backends

- **CORS-Konfiguration**: Da das Backend extern bereitgestellt wird, musste CORS nicht explizit im Frontend konfiguriert werden. Die Anfragen werden direkt über die URL des Azure-gehosteten Backends abgesetzt, welches die entsprechenden CORS-Einstellungen implementiert.
- **Datenvalidierung**: Die empfangenen Blogdaten werden in der Angular-Komponente `AppComponent` über die BlogService-Methode `getBlogs()` abgerufen und in einem TypeScript-Interface `Blog` typisiert. Diese Typisierung hilft bei der Validierung der Datenstruktur, sodass nur valide Daten in der Anwendung verarbeitet werden.

### 2. Interceptor implementieren

- **Logging und CorrelationId-Interceptor**: Ein HTTP-Interceptor wurde implementiert, um entweder eine CorrelationId oder eine Logging-Funktion in jede Anfrage einzufügen. Dieser Interceptor fügt der Anfrage einen Header hinzu, der die Korrelation von Anfragen erleichtert oder das Logging für Debugging-Zwecke unterstützt. Der Interceptor wurde mithilfe von Angular's `HttpInterceptor`-Funktionalität implementiert und in der `AppModule`-Konfiguration registriert, sodass er bei jeder HTTP-Anfrage automatisch ausgeführt wird.

### 3. Datenanzeige mit Angular Control Flow Syntax, Flexbox und SCSS

- **Angular Control Flow Syntax (`*ngIf`, `*ngFor`)**: Die `AppComponent` verwendet die Angular Control Flow Syntax, um dynamische Anzeigen zu steuern. Beispielsweise wird `*ngIf` verwendet, um den Ladeindikator anzuzeigen, während die Daten geladen werden, und `*ngFor`, um über die Liste der Blogs zu iterieren und jeden Blog als Karte anzuzeigen.
- **Flexbox für responsive Darstellung**: Flexbox wird im SCSS verwendet, um die Blogkarten in einer responsiven Anordnung darzustellen. Die `.blog-container`-Klasse nutzt Flexbox, um die Karten gleichmäßig zu verteilen und bei unterschiedlichen Bildschirmgrößen automatisch anzupassen. Zusätzlich sorgen die CSS-Medienabfragen dafür, dass die Darstellung auf mobilen und Tablet-Geräten optimal bleibt.
- **SCSS für Styling**: SCSS wurde verwendet, um die Anwendung zu gestalten und das Layout konsistent zu halten. Alle wichtigen UI-Elemente, wie der Like-Button, die Navigationspfeile und die Blog-Karten, sind im SCSS gestaltet. Die Animation des Like-Buttons wird ebenfalls im SCSS definiert, um eine visuelle Rückmeldung beim Liken eines Beitrags zu geben.

### Weitere Funktionen

- **Blog-Erstellungsfunktion**: Die `AppComponent` enthält eine Formularansicht, die über den Button "Neuer Blog" oben rechts geöffnet werden kann. Über das Formular können Benutzer einen neuen Blogeintrag mit Titel, Autor und Inhalt erstellen. Der neue Blog wird zur Blogliste hinzugefügt und sofort angezeigt.
- **Blog-Bearbeitungsfunktion**: In der Detailansicht eines Blogs gibt es eine Option, den Inhalt des Blogs zu bearbeiten. Diese Funktion ist über einen Bearbeiten-Button verfügbar und ermöglicht es dem Benutzer, Titel und Inhalt des Blogs zu aktualisieren. Änderungen werden direkt in der Blogliste gespeichert und angezeigt.
- **Responsive Design**: Die Anwendung ist vollständig responsive und unterstützt verschiedene Bildschirmgrößen durch Flexbox und CSS-Medienabfragen. Dadurch passt sich die Darstellung der Blogs, Navigationselemente und Formularelemente an die jeweilige Bildschirmbreite an.

### Zusammenfassung der Technologien und Ansätze

- **Angular Services**: Der `BlogService` verwaltet alle HTTP-Anfragen an das Backend und sorgt für die Abstraktion der Datenzugriffe.
- **Angular Interceptor**: Der HTTP-Interceptor fügt entweder Logging oder eine CorrelationId zu jeder Anfrage hinzu, um die Nachverfolgbarkeit und das Debugging zu erleichtern.
- **Angular Control Flow Syntax**: `*ngIf` und `*ngFor` sorgen für dynamische und bedingte Anzeige der Daten.
- **Flexbox und SCSS**: Flexbox und SCSS werden verwendet, um eine moderne und anpassbare Benutzeroberfläche zu schaffen, die auf allen Gerätetypen gut funktioniert.

Diese Umsetzung erfüllt alle Anforderungen und Best Practices für eine skalierbare und benutzerfreundliche Blog-Anwendung mit Angular.

## Weiterführende Hilfe

Für weitere Informationen zur Angular CLI kannst du die [Angular CLI-Dokumentation](https://angular.dev/tools/cli) besuchen.
