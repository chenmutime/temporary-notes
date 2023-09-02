# Note
This project was forked from [https://github.com/mubaidr/vite-vue3-chrome-extension-v3]

## Features

## Usage

### Folders

- `src` - main source.
  - `content-script` - scripts and components to be injected as `content_script`
    -  `iframe` content script iframe vue3 app which will be injected into page
  - `background` - scripts for background.
  - `options` - options vuejs application root
  - `pages` - application pages, common to all views (About, Contact, Authentication etc)
  - `components` - auto-imported Vue components that are shared in popup and options page.
  - `assets` - assets used in Vue components
- `dist` - built files, also serve stub entry for Vite on development.
