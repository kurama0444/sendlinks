# Send a Link to Kura

A simple web application to instantly send links to my computer using Firebase Realtime Database.

## Features
- **Instant Sync**: Links sent via the web interface are immediately received by the local listener.
- **Online Status**: Real-time heartbeat indicator to show if the receiver is online.
- **Modern Stack**: Built with Vite and Firebase 10+.

## Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Create a `.env` file in the root directory and add your Firebase credentials (see `.env.example`):
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    ...
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Run Local Listener**:
    ```bash
    npm run listener
    ```

## Deployment to GitHub Pages

This project is configured to automatically build and deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

1.  **GitHub Secrets**:
    Go to your repository settings on GitHub: `Settings > Secrets and variables > Actions`.
    Add the following secrets using the values from your Firebase Console:
    - `VITE_FIREBASE_API_KEY`
    - `VITE_FIREBASE_AUTH_DOMAIN`
    - `VITE_FIREBASE_DATABASE_URL`
    - `VITE_FIREBASE_PROJECT_ID`
    - `VITE_FIREBASE_STORAGE_BUCKET`
    - `VITE_FIREBASE_MESSAGING_SENDER_ID`
    - `VITE_FIREBASE_APP_ID`
    - `VITE_FIREBASE_MEASUREMENT_ID`

2.  **Enable GitHub Pages**:
    Go to `Settings > Pages`. Under **Build and deployment > Source**, select **GitHub Actions**.

3.  **Push to Main**:
    Any push to the `main` branch will now trigger the deployment workflow.
