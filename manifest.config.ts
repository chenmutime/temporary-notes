import { defineManifest } from '@crxjs/vite-plugin'
// @ts-ignore
import packageJson from './package.json'

const { version, name } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : name,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  author: 'chenmutime@outlook.com',
  description: 'You can quickly capture text content, jot down ideas, and later copy them to the clipboard in bulk.',
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_title: 'Temporary Notes',
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      all_frames: false,
      js: ['src/content-script/index.ts'],
      matches: ['https://*/*'],
      run_at: 'document_end',
    },
  ],
  options_page: 'src/options/index.html',
  web_accessible_resources: [
    {
      matches: ['https://*/*'],
      resources: ['src/content-script/index.ts'],
    },
    {
      matches: ['https://*/*'],
      resources: ['src/content-script/iframe/index.html'],
    },
  ],
  permissions: ['storage', 'contextMenus', 'clipboardWrite', 'activeTab', 'tabs'],
  icons: {
    16: 'src/assets/logo.png',
    32: 'src/assets/logo.png',
    48: 'src/assets/logo.png',
    128: 'src/assets/logo.png',
  },
}))
