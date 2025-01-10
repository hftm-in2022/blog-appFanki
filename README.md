# Blog App Documentation

Die Angular Blog App ist eine Webanwendung, die mit dem Angular-Framework entwickelt wurde. Sie verwendet SCSS für das Styling und implementiert Best Practices in den Bereichen Codequalität, Tests und Deployment. Die Anwendung dient als Plattform, um Blogposts anzuzeigen und eine benutzerfreundliche Erfahrung zu bieten.

[Visit Website](https://icy-river-0bba8530f-7.eastus2.5.azurestaticapps.net)

---

## Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Setup und Nutzung](#setup-und-nutzung)
3. [Technologie-Stack](#technologie-stack)
4. [Besondere Funktionen](#besondere-funktionen)
5. [Projektstruktur](#projektstruktur)
6. [Code-Qualität und Tests](#code-qualität-und-tests)
7. [CI/CD-Pipeline für Deployment auf Azure](#cicd-pipeline-für-deployment-auf-azure)
8. [Backend Integration](#backend-integration)
9. [Authentication](#authentication)
10. [Features](#features)
11. [State Management](#state-management)
12. [Contributing Guide](#contributing-guide)
13. [Weiterführende Hilfe](#weiterführende-hilfe)

---

## Projektübersicht

Dieses Repository enthält die grundlegende Entwicklungsumgebung für eine Angular-basierte Bloganwendung. Die wichtigsten Aspekte der Anwendung umfassen:

- **Mehrere Routen und Lazy Loading:** Navigation zwischen Blog-Übersicht, Detailansicht und Blog-Erstellung.
- **Reaktive Formulare:** Validierung für Blogtitel und Inhalte.
- **Modularität:** Klare Trennung der Features in Module und Wiederverwendbarkeit durch Shared-Komponenten.
- **Authentifizierung:** Nutzung von Keycloak zur Sicherung geschützter Routen.
- **Deployment:** Automatische Bereitstellung auf Azure Static Web Apps über eine GitHub Actions CI/CD-Pipeline.

---

## Setup und Nutzung

### Voraussetzungen

- **Node.js und npm** (mindestens Node.js v20.x und npm v7+)
- **Angular CLI** (wird automatisch im Setup installiert)

### Schritte

1. **Repository klonen:**

   ```bash
   git clone https://github.com/hftm-in2022/angular-blog-app-simon-fankhauser.git

   ```

2. **In das Projektverzeichnis wechseln:**

   ```bash
   cd blog-app

   ```

3. **Abhängigkeiten installieren:**

   ```bash
   npm install

   ```

4. **Die Anwendung starten:**

   ```bash
   ng serve

   ```

5. **Die Anwendung im Browser öffnen:**
   http://localhost:4200

## Technologie-Stack

- **Frontend:** Angular
- **Styling:** SCSS
- **State Management:** Angular Signals
- **Backend:** REST API (Keycloak für Authentifizierung)
- **Hosting:** Azure Static Web Apps
- **CI/CD:** GitHub Actions

## Besondere Funktionen

- **Responsives Design:** Optimiert für mobile und Desktop-Geräte.
- **Lazy Loading:** Reduziert die Ladezeit durch bedarfsgerechtes Laden von Modulen.
- **Keycloak-Integration:** Sichere Authentifizierung und autorisierte Routen.
- **Formulare mit Validierung:** Unterstützt synchrone und asynchrone Validierungen.

## Projektstruktur

### Core

- **auth:** Authentifizierungskonfiguration und Service.
- **guards:** Routen-Guards.
- **interceptors:** Logging- und Correlation-ID-Interceptors.
- **services:** Globale Dienste wie `BlogBackendService` und Error Handling.
- **stores:** Redux-ähnliches State Management mit Signals.

### Features

- **add-blog-page:** Komponente zum Erstellen von Blogs.
- **blog-detail-page:** Detailansicht eines Blogs.
- **blog-overview-page:** Übersicht aller Blogs.

### Shared

- Wiederverwendbare Komponenten wie Blog-Karten und gemeinsame SCSS-Dateien.

## Code-Qualität und Tests

### Linting

**Code-Qualität prüfen:**

````bash
npm run lint

### Unit-Tests

**Tests ausführen:**

```bash
npm run test -- --watch=false --browsers=ChromeHeadless

## CI/CD-Pipeline für Deployment auf Azure

Die Anwendung wird mit einer GitHub Actions CI/CD-Pipeline bereitgestellt, die folgende Schritte umfasst:

1. **Code Checkout:** Holt den neuesten Code aus dem Repository.
2. **Abhängigkeiten installieren:** Führt `npm install` aus.
3. **Tests und Linting:** Überprüft die Code-Qualität und führt Unit-Tests aus.
4. **Build und Deployment:** Die Anwendung wird mit `Azure/static-web-apps-deploy` auf Azure Static Web Apps bereitgestellt.

---

## Backend Integration

- **Datenabruf:** Die Anwendung verwendet den `BlogBackendService`, um Daten vom Backend zu laden.
- **Datenvalidierung:** Daten werden mit TypeScript-Schnittstellen und zusätzlichen Validierungen auf Client-Seite überprüft.
- **CORS-Konfiguration:** Das Backend unterstützt die Frontend-Kommunikation durch korrekt konfigurierte CORS-Einstellungen.

---

## Authentication

### Keycloak Integration

- **Authentifizierung:** Erfolgt über `angular-auth-oidc-client`.
- **Geschützte Routen:** Nur für authentifizierte Benutzer zugänglich.

### Dynamic Sidebar

- **Buttons wie "Add Blog":** Sind nur sichtbar, wenn der Benutzer angemeldet ist.
- **Guards:** Routen wie `/add-blog` sind durch den `isAuthenticatedGuard` geschützt.

---

## Features

### Blog Overview

- **Übersicht aller Blogs:** Blogs werden in einer Karte dargestellt.
- **Responsive Design:** Flexbox und SCSS werden für die Anpassung an unterschiedliche Bildschirmgrößen verwendet.

### Blog Detail Page

- **Details anzeigen:** Zeigt Inhalte, Kommentare und Metadaten eines Blogs.
- **Navigation:** Zurück zur Blog-Übersicht über einen Button.

### Add Blog Page

- **Formular:** Validierung für Titel und Inhalt.
- **Speichern:** Spinner wird während der Speicherung angezeigt.

---

## State Management

### Redux-ähnliche Architektur

- **BlogStateStore:** Verwendet Angular Signals für State-Management.
- **Asynchrone Aktionen:** RxJS wird für API-Aufrufe genutzt.

## Contributing Guide

### Feature Branch erstellen:

```bash
git checkout -b feature-name

### Änderungen committen:

- Nutze Conventional Commit Messages.

### Branch pushen:

```bash
git push origin feature-name

### Pull Request erstellen:

- Beschreibe die Änderungen detailliert.

---

## Weiterführende Hilfe

Für weitere Informationen zur Angular CLI besuche die [Angular CLI-Dokumentation](https://angular.dev/tools/cli).
````
