// vite.config.ts
import { crx } from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { dirname, join, relative, resolve } from "path";
import AutoImport from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.3.0/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/vite.mjs";
import Components from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/vite@4.4.9_@types+node@18.17.3_sass@1.64.2/node_modules/vite/dist/node/index.js";

// manifest.config.ts
import { defineManifest } from "file:///D:/front-end-project/temporary-notes/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  dependencies: {
    "element-plus": "^2.3.12",
    vue: "^3.3.4",
    "vue-router": "^4.2.4"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.18",
    "@iconify-json/mdi": "^1.1.54",
    "@tailwindcss/forms": "^0.5.4",
    "@types/chrome": "^0.0.243",
    "@types/eslint": "^8.44.2",
    "@types/eslint-config-prettier": "^6.11.0",
    "@types/node": "^18.17.3",
    "@types/prettier": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.3.0",
    "@typescript-eslint/parser": "^6.3.0",
    "@vitejs/plugin-vue": "^4.2.3",
    "@vue/compiler-sfc": "^3.3.4",
    "@vueuse/core": "^10.3.0",
    autoprefixer: "^10.4.14",
    eslint: "^8.46.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-vue": "^9.16.1",
    postcss: "^8.4.27",
    prettier: "^3.0.1",
    "prettier-plugin-tailwindcss": "^0.4.1",
    sass: "^1.64.2",
    tailwindcss: "^3.3.3",
    typescript: "^5.1.6",
    "unplugin-auto-import": "^0.16.6",
    "unplugin-icons": "^0.16.5",
    "unplugin-vue-components": "^0.25.1",
    vite: "^4.4.9",
    "vite-plugin-pages": "^0.31.0",
    "vue-tsc": "^1.8.8",
    "webext-bridge": "^6.0.1"
  },
  name: "Temporary Notes",
  overrides: {
    "@crxjs/vite-plugin": "$@crxjs/vite-plugin"
  },
  pnpm: {
    overrides: {},
    peerDependencyRules: {
      allowAny: [],
      allowedDeprecatedVersions: {
        "sourcemap-codec": "1.4.8"
      },
      allowedVersions: {},
      ignoreMissing: []
    }
  },
  private: true,
  scripts: {
    build: "vite build",
    dev: "vite",
    lint: "eslint . --fix --ext js,mjs,cjs,ts,mts,cts,vue",
    preview: "vite preview"
  },
  type: "module",
  version: "1.0.0"
};

// manifest.config.ts
var { version, name } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async (env) => ({
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : name,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  author: "chenmutime@outlook.com",
  description: "You can quickly capture text content, jot down ideas, and later copy them to the clipboard in bulk without the need to log in.",
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_title: "Temporary Notes"
  },
  background: {
    service_worker: "src/background/index.ts"
  },
  content_scripts: [
    {
      all_frames: false,
      js: ["src/content-script/index.ts"],
      matches: ["*://*/*"],
      run_at: "document_end"
    }
  ],
  host_permissions: ["*://*/*"],
  options_page: "src/options/index.html",
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/index.ts"]
    },
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/iframe/index.html"]
    }
  ],
  permissions: ["storage", "contextMenus", "clipboardWrite", "activeTab", "tabs"],
  icons: {
    16: "src/assets/logo.png",
    32: "src/assets/logo.png",
    48: "src/assets/logo.png",
    128: "src/assets/logo.png"
  }
}));

// vite.config.ts
var __vite_injected_original_dirname = "D:\\front-end-project\\temporary-notes";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": resolve(join(__vite_injected_original_dirname, "src")),
      src: resolve(join(__vite_injected_original_dirname, "src"))
    }
  },
  plugins: [
    crx({ manifest: manifest_config_default }),
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "vue/macros", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables/"]
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: "i",
          enabledCollections: ["mdi"]
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: "vue3"
    }),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        iframe: "src/content-script/iframe/index.html"
      }
    }
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false
    }
  },
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
    exclude: ["vue-demi"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250LWVuZC1wcm9qZWN0XFxcXHRlbXBvcmFyeS1ub3Rlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZnJvbnQtZW5kLXByb2plY3RcXFxcdGVtcG9yYXJ5LW5vdGVzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udC1lbmQtcHJvamVjdC90ZW1wb3Jhcnktbm90ZXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luLCByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuY29uZmlnJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfic6IHJlc29sdmUoam9pbihfX2Rpcm5hbWUsICdzcmMnKSksXHJcbiAgICAgIHNyYzogcmVzb2x2ZShqb2luKF9fZGlybmFtZSwgJ3NyYycpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICBjcngoeyBtYW5pZmVzdCB9KSxcclxuXHJcbiAgICB2dWUoKSxcclxuXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvY29yZSddLFxyXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcy8nXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgICAgLy8gZ2VuZXJhdGUgYGNvbXBvbmVudHMuZC50c2AgZm9yIHRzIHN1cHBvcnQgd2l0aCBWb2xhclxyXG4gICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgLy8gYXV0byBpbXBvcnQgaWNvbnNcclxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgIHByZWZpeDogJ2knLFxyXG4gICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ21kaSddLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWljb25zXHJcbiAgICBJY29ucyh7XHJcbiAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2Fzc2V0cy1yZXdyaXRlJyxcclxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxyXG4gICAgICBhcHBseTogJ2J1aWxkJyxcclxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwsIHsgcGF0aCB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcclxuICAgICAgICAgIC9cIlxcL2Fzc2V0c1xcLy9nLFxyXG4gICAgICAgICAgYFwiJHtyZWxhdGl2ZShkaXJuYW1lKHBhdGgpLCAnL2Fzc2V0cycpfS9gXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgaWZyYW1lOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9pbmRleC5odG1sJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDg4ODgsXHJcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgaG1yOiB7XHJcbiAgICAgIHBvcnQ6IDg4ODksXHJcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJ10sXHJcbiAgICBleGNsdWRlOiBbJ3Z1ZS1kZW1pJ10sXHJcbiAgfSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udC1lbmQtcHJvamVjdFxcXFx0ZW1wb3Jhcnktbm90ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGZyb250LWVuZC1wcm9qZWN0XFxcXHRlbXBvcmFyeS1ub3Rlc1xcXFxtYW5pZmVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Zyb250LWVuZC1wcm9qZWN0L3RlbXBvcmFyeS1ub3Rlcy9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcclxuLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcblxyXG5jb25zdCB7IHZlcnNpb24sIG5hbWUgfSA9IHBhY2thZ2VKc29uXHJcbi8vIENvbnZlcnQgZnJvbSBTZW12ZXIgKGV4YW1wbGU6IDAuMS4wLWJldGE2KVxyXG5jb25zdCBbbWFqb3IsIG1pbm9yLCBwYXRjaCwgbGFiZWwgPSAnMCddID0gdmVyc2lvblxyXG4gIC8vIGNhbiBvbmx5IGNvbnRhaW4gZGlnaXRzLCBkb3RzLCBvciBkYXNoXHJcbiAgLnJlcGxhY2UoL1teXFxkLi1dKy9nLCAnJylcclxuICAvLyBzcGxpdCBpbnRvIHZlcnNpb24gcGFydHNcclxuICAuc3BsaXQoL1suLV0vKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKGVudikgPT4gKHtcclxuICBuYW1lOiBlbnYubW9kZSA9PT0gJ3N0YWdpbmcnID8gYFtJTlRFUk5BTF0gJHtuYW1lfWAgOiBuYW1lLFxyXG4gIC8vIHVwIHRvIGZvdXIgbnVtYmVycyBzZXBhcmF0ZWQgYnkgZG90c1xyXG4gIHZlcnNpb246IGAke21ham9yfS4ke21pbm9yfS4ke3BhdGNofS4ke2xhYmVsfWAsXHJcbiAgLy8gc2VtdmVyIGlzIE9LIGluIFwidmVyc2lvbl9uYW1lXCJcclxuICB2ZXJzaW9uX25hbWU6IHZlcnNpb24sXHJcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcclxuICBhdXRob3I6ICdjaGVubXV0aW1lQG91dGxvb2suY29tJyxcclxuICBkZXNjcmlwdGlvbjogJ1lvdSBjYW4gcXVpY2tseSBjYXB0dXJlIHRleHQgY29udGVudCwgam90IGRvd24gaWRlYXMsIGFuZCBsYXRlciBjb3B5IHRoZW0gdG8gdGhlIGNsaXBib2FyZCBpbiBidWxrIHdpdGhvdXQgdGhlIG5lZWQgdG8gbG9nIGluLicsXHJcbiAgLy8ga2V5OiAnZWtnbWNicGdnbGZsbWdjZmFqbmdscGJjYmRjY25uamUnLFxyXG4gIGFjdGlvbjoge1xyXG4gICAgZGVmYXVsdF90aXRsZTogJ1RlbXBvcmFyeSBOb3RlcycsXHJcbiAgfSxcclxuICBiYWNrZ3JvdW5kOiB7XHJcbiAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzJyxcclxuICB9LFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBhbGxfZnJhbWVzOiBmYWxzZSxcclxuICAgICAganM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXHJcbiAgICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxyXG4gICAgICBydW5fYXQ6ICdkb2N1bWVudF9lbmQnLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGhvc3RfcGVybWlzc2lvbnM6IFsnKjovLyovKiddLFxyXG4gIG9wdGlvbnNfcGFnZTogJ3NyYy9vcHRpb25zL2luZGV4Lmh0bWwnLFxyXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcclxuICAgICAgcmVzb3VyY2VzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9pbmRleC50cyddLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbWF0Y2hlczogWycqOi8vKi8qJ10sXHJcbiAgICAgIHJlc291cmNlczogWydzcmMvY29udGVudC1zY3JpcHQvaWZyYW1lL2luZGV4Lmh0bWwnXSxcclxuICAgIH0sXHJcbiAgXSxcclxuICBwZXJtaXNzaW9uczogWydzdG9yYWdlJywgJ2NvbnRleHRNZW51cycsICdjbGlwYm9hcmRXcml0ZScsICdhY3RpdmVUYWInLCAndGFicyddLFxyXG4gIGljb25zOiB7XHJcbiAgICAxNjogJ3NyYy9hc3NldHMvbG9nby5wbmcnLFxyXG4gICAgMzI6ICdzcmMvYXNzZXRzL2xvZ28ucG5nJyxcclxuICAgIDQ4OiAnc3JjL2Fzc2V0cy9sb2dvLnBuZycsXHJcbiAgICAxMjg6ICdzcmMvYXNzZXRzL2xvZ28ucG5nJyxcclxuICB9LFxyXG59KSlcclxuIiwgIntcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjMuMTJcIixcclxuICAgIFwidnVlXCI6IFwiXjMuMy40XCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjRcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4xOFwiLFxyXG4gICAgXCJAaWNvbmlmeS1qc29uL21kaVwiOiBcIl4xLjEuNTRcIixcclxuICAgIFwiQHRhaWx3aW5kY3NzL2Zvcm1zXCI6IFwiXjAuNS40XCIsXHJcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0M1wiLFxyXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiXjguNDQuMlwiLFxyXG4gICAgXCJAdHlwZXMvZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl42LjExLjBcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMTguMTcuM1wiLFxyXG4gICAgXCJAdHlwZXMvcHJldHRpZXJcIjogXCJeMy4wLjBcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi4zLjBcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjMuMFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4yLjNcIixcclxuICAgIFwiQHZ1ZS9jb21waWxlci1zZmNcIjogXCJeMy4zLjRcIixcclxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjMuMFwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNFwiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC40Ni4wXCIsXHJcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4wLjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4xNi4xXCIsXHJcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjI3XCIsXHJcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4xXCIsXHJcbiAgICBcInByZXR0aWVyLXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4wLjQuMVwiLFxyXG4gICAgXCJzYXNzXCI6IFwiXjEuNjQuMlwiLFxyXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjMuM1wiLFxyXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMS42XCIsXHJcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTYuNlwiLFxyXG4gICAgXCJ1bnBsdWdpbi1pY29uc1wiOiBcIl4wLjE2LjVcIixcclxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNS4xXCIsXHJcbiAgICBcInZpdGVcIjogXCJeNC40LjlcIixcclxuICAgIFwidml0ZS1wbHVnaW4tcGFnZXNcIjogXCJeMC4zMS4wXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjhcIixcclxuICAgIFwid2ViZXh0LWJyaWRnZVwiOiBcIl42LjAuMVwiXHJcbiAgfSxcclxuICBcIm5hbWVcIjogXCJUZW1wb3JhcnkgTm90ZXNcIixcclxuICBcIm92ZXJyaWRlc1wiOiB7XHJcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIiRAY3J4anMvdml0ZS1wbHVnaW5cIlxyXG4gIH0sXHJcbiAgXCJwbnBtXCI6IHtcclxuICAgIFwib3ZlcnJpZGVzXCI6IHt9LFxyXG4gICAgXCJwZWVyRGVwZW5kZW5jeVJ1bGVzXCI6IHtcclxuICAgICAgXCJhbGxvd0FueVwiOiBbXSxcclxuICAgICAgXCJhbGxvd2VkRGVwcmVjYXRlZFZlcnNpb25zXCI6IHtcclxuICAgICAgICBcInNvdXJjZW1hcC1jb2RlY1wiOiBcIjEuNC44XCJcclxuICAgICAgfSxcclxuICAgICAgXCJhbGxvd2VkVmVyc2lvbnNcIjoge30sXHJcbiAgICAgIFwiaWdub3JlTWlzc2luZ1wiOiBbXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgXCJwcml2YXRlXCI6IHRydWUsXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwibGludFwiOiBcImVzbGludCAuIC0tZml4IC0tZXh0IGpzLG1qcyxjanMsdHMsbXRzLGN0cyx2dWVcIixcclxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiXHJcbiAgfSxcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUyxTQUFTLFdBQVc7QUFDeFQsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsU0FBUyxNQUFNLFVBQVUsZUFBZTtBQUNqRCxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7OztBQ1ArUSxTQUFTLHNCQUFzQjs7O0FDQTNVO0FBQUEsRUFDRSxjQUFnQjtBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEIsS0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixzQkFBc0I7QUFBQSxJQUN0QixxQkFBcUI7QUFB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QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLEtBQUssa0NBQVcsS0FBSyxDQUFDO0FBQUEsTUFDbkMsS0FBSyxRQUFRLEtBQUssa0NBQVcsS0FBSyxDQUFDO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJLEVBQUUsa0NBQVMsQ0FBQztBQUFBLElBRWhCLElBQUk7QUFBQSxJQUVKLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsY0FBYyxjQUFjO0FBQUEsTUFDM0QsS0FBSztBQUFBLE1BQ0wsTUFBTSxDQUFDLGtCQUFrQjtBQUFBLElBQzNCLENBQUM7QUFBQTtBQUFBLElBR0QsV0FBVztBQUFBLE1BQ1QsTUFBTSxDQUFDLGdCQUFnQjtBQUFBO0FBQUEsTUFFdkIsS0FBSztBQUFBLE1BQ0wsV0FBVztBQUFBO0FBQUEsUUFFVCxjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixvQkFBb0IsQ0FBQyxLQUFLO0FBQUEsUUFDNUIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBLElBR0QsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBO0FBQUEsSUFHRDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsbUJBQW1CLE1BQU0sRUFBRSxLQUFLLEdBQUc7QUFDakMsZUFBTyxLQUFLO0FBQUEsVUFDVjtBQUFBLFVBQ0EsSUFBSSxTQUFTLFFBQVEsSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUFBLFFBQ3hDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxPQUFPLGNBQWM7QUFBQSxJQUMvQixTQUFTLENBQUMsVUFBVTtBQUFBLEVBQ3RCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
