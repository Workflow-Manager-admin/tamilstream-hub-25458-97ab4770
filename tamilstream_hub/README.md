# Directors Mania – Movie Streaming Platform

This project is a minimal React template rebranded as "Directors Mania", with a clean, modern UI tailored for movie lovers who celebrate directors and their movies.

## Features

- **Director-Focused Branding**: Experience a look centered around noted directors and their movies.
- **Clean Modern UI**: Sharp, visually prominent styles, logo, and subtle cues that highlight directors.
- **Lightweight & Fast**: Minimal UI dependencies, quick loads, and responsive across devices.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --dm-primary: #161826;
  --dm-accent: #7098d3;
  --dm-highlight: #fde047;
  --text-color: #fbf9f9;
  --text-secondary: rgba(255,255,255,.82);
  --border-color: #2a365255;
}
```
*(Palette is inspired by cinematic and directorial cues: deep blues, gentle spotlight yellow, soft contrast)*

### Components

UI is written in pure HTML/CSS—in `src/App.css`—without external frameworks.

Key components:

- **Header, Navbar** (`.navbar`, `.logo`): Features the "Directors Mania" logo
- **Container** (`.container`): Centers and pads main body
- **Sidebar**: Filtering UI, colored with DM brand
- **Typography**: Headers feature bold styles and a highlight for director focus

## About

"Directors Mania" is intended for discovering movies by director focus—upgrade, adapt, and expand as needed!

To learn React, check out the [React documentation](https://reactjs.org/).

*(Other sections remain as in the original template.)*
