# Project SafeWalk

A mobile application designed to improve user safety during commutes, especially in unfamiliar or unsafe environments. This app is aimed at providing peace of mind to users who often travel alone, by offering real-time location tracking, emergency notifications, and a user-friendly interface. It is especially beneficial for users such as students, night-shift workers, and travelers who may find themselves in vulnerable situations, ensuring that they have a reliable means to communicate with trusted contacts and access assistance when needed. 


### Team Members:
- Paramvir Toor - Project Manager
- Alfredo Gonzalez - Backend Developer
- Julian Prater - Frontend Developer
- Aaron Cantu - Frontend Developer
- Yengtaova Yuatongjerxiong - UX/UI
- Mayuka Nozaki - Quality Assurance

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

## Introduction

This document provides instructions on installing the necessary frameworks, configuring, and using the SafeWalk app. 

## Features

- **User Registration and Authentication**: A secure sign-up and login process.
- **Real-Time Location Tracking**: Monitor your journey in real time.
- **Emergency Contacts**: Manage a list of emergency contacts.
- **Panic Button**: Send immediate alerts in emergencies.

## Installation

### Prerequisites
- Node.js (LTS version)
- npm (Node Package Manager)
- A code editor (like Visual Studio Code)
- Command Line Interface (CLI) such as Terminal or Command Prompt

### Ionic Framework
Install the Ionic CLI globally on your system:


```bash
npm install -g @ionic/cli
```



### Backend Setup

1.  Navigate to the backend directory.
2.  Run `npm install` to install node packages.
3.  Add `serviceAccountKey.json` to the main directory for database access (Firebase service key).
4.  The default port is set to 3000, but it's configurable.
5.  Run `node index.js` to start the Express server.
6.  Use `test.REST` for API endpoint examples (requires VS Code extension).

### Frontend Setup

1.  API URLs are specified in the `.ts` files within the `tabs` directory.
2.  Add the "environments" folder to the "src" folder for Google authentication setup.
3.  Navigate to the root directory of "Project SafeWalk".
4.  Run `ionic serve` in the console to start the application.

