# Projet d'Apprentissage des Tests : NestJS & Angular

Ce projet a pour objectif de fournir un environnement d'apprentissage des tests unitaires, fonctionnels, d'intégration et end-to-end (E2E) en utilisant NestJS pour le backend et Angular pour le frontend. Le module développé dans ce projet est un simple module de connexion (authentification).

## Table des Matières

- [Installation](#installation)
- [Tests Disponibles](#tests-disponibles)
- [Utilisation](#utilisation)
- [Contributions](#contributions)

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) version 14 ou supérieure
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [NestJS CLI](https://nestjs.com/) pour le backend
- [Angular CLI](https://angular.io/cli) pour le frontend

### Backend (NestJS)

1. Clonez ce dépôt :
    ```bash
    git clone https://github.com/ton-utilisateur/testproject.git
    ```
2. Accédez au répertoire backend :
    ```bash
    cd testproject
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```
4. Démarrez le serveur de développement :
    ```bash
    npm run start:dev
    ```

### Frontend (Angular)

1. Accédez au répertoire frontend :
    ```bash
    cd testfront
    ```
2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Démarrez le serveur de développement :
    ```bash
    ng serve
    ```


## Tests Disponibles

### Backend

- **Tests Unitaires** : Pour tester des fonctions et des composants spécifiques.
- **Tests d'Intégration** : Pour tester plusieurs composants ensemble.
- **Tests Fonctionnels** : Pour tester le module de connexion dans son ensemble.

### Frontend

- **Tests Unitaires** : Pour tester des composants et des services Angular individuellement.
- **Tests End-to-End (E2E)** : Pour tester l'application dans son ensemble du point de vue de l'utilisateur final.

## Utilisation

### Exécuter les Tests Backend

- Tests unitaires :
    ```bash
    npm run test
    ```
### Exécuter les Tests Frontend

- Tests unitaires :
    ```bash
    ng test
    ```
- Tests E2E :
    ```bash
    nmp run cy:open
    ```

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Crée une branche pour ta fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit tes changements (`git commit -am 'Ajoute nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvre une Pull Request

