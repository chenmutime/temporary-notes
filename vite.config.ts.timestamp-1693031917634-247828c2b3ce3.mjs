// vite.config.ts
import { crx } from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { dirname, join, relative, resolve } from "path";
import AutoImport from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.3.0/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/vite.mjs";
import Components from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/vite@4.4.9_@types+node@18.17.3_sass@1.64.2/node_modules/vite/dist/node/index.js";
import Pages from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/vite-plugin-pages@0.31.0_@vue+compiler-sfc@3.3.4_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///D:/front-end-project/snippet-recorder2/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  dependencies: {
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
  version: "0.0.1"
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
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    // default_popup: 'src/popup/index.html',
    default_title: "Open note list"
  },
  background: {
    service_worker: "src/background/index.ts"
  },
  // content_scripts: [
  //   {
  //     all_frames: false,
  //     js: ['src/content-script/index.ts'],
  //     matches: ['*://*/*'],
  //     run_at: 'document_end',
  //   },
  // ],
  side_panel: {
    default_path: "/src/sidepanel/sidepanel.html"
  },
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
  permissions: ["storage", "contextMenus", "sidePanel", "clipboardWrite"],
  icons: {
    16: "src/assets/logo.png",
    32: "src/assets/logo.png",
    48: "src/assets/logo.png",
    128: "src/assets/logo.png"
  }
}));

// vite.config.ts
var __vite_injected_original_dirname = "D:\\front-end-project\\snippet-recorder2";
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
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: ""
        },
        {
          dir: "src/options/pages",
          baseRoute: "options"
        },
        {
          dir: "src/popup/pages",
          baseRoute: "popup"
        },
        {
          dir: "src/content-script/iframe/pages",
          baseRoute: "iframe"
        }
      ]
    }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGZyb250LWVuZC1wcm9qZWN0XFxcXHNuaXBwZXQtcmVjb3JkZXIyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcm9udC1lbmQtcHJvamVjdFxcXFxzbmlwcGV0LXJlY29yZGVyMlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZnJvbnQtZW5kLXByb2plY3Qvc25pcHBldC1yZWNvcmRlcjIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luLCByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5jb25maWcnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICd+JzogcmVzb2x2ZShqb2luKF9fZGlybmFtZSwgJ3NyYycpKSxcclxuICAgICAgc3JjOiByZXNvbHZlKGpvaW4oX19kaXJuYW1lLCAnc3JjJykpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxyXG5cclxuICAgIHZ1ZSgpLFxyXG5cclxuICAgIFBhZ2VzKHtcclxuICAgICAgZGlyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRpcjogJ3NyYy9wYWdlcycsXHJcbiAgICAgICAgICBiYXNlUm91dGU6ICcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGlyOiAnc3JjL29wdGlvbnMvcGFnZXMnLFxyXG4gICAgICAgICAgYmFzZVJvdXRlOiAnb3B0aW9ucycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkaXI6ICdzcmMvcG9wdXAvcGFnZXMnLFxyXG4gICAgICAgICAgYmFzZVJvdXRlOiAncG9wdXAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGlyOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9wYWdlcycsXHJcbiAgICAgICAgICBiYXNlUm91dGU6ICdpZnJhbWUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvY29yZSddLFxyXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcy8nXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgICAgLy8gZ2VuZXJhdGUgYGNvbXBvbmVudHMuZC50c2AgZm9yIHRzIHN1cHBvcnQgd2l0aCBWb2xhclxyXG4gICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgLy8gYXV0byBpbXBvcnQgaWNvbnNcclxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgIHByZWZpeDogJ2knLFxyXG4gICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ21kaSddLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWljb25zXHJcbiAgICBJY29ucyh7XHJcbiAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2Fzc2V0cy1yZXdyaXRlJyxcclxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxyXG4gICAgICBhcHBseTogJ2J1aWxkJyxcclxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwsIHsgcGF0aCB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcclxuICAgICAgICAgIC9cIlxcL2Fzc2V0c1xcLy9nLFxyXG4gICAgICAgICAgYFwiJHtyZWxhdGl2ZShkaXJuYW1lKHBhdGgpLCAnL2Fzc2V0cycpfS9gXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgaWZyYW1lOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9pbmRleC5odG1sJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDg4ODgsXHJcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgaG1yOiB7XHJcbiAgICAgIHBvcnQ6IDg4ODksXHJcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJ10sXHJcbiAgICBleGNsdWRlOiBbJ3Z1ZS1kZW1pJ10sXHJcbiAgfSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcm9udC1lbmQtcHJvamVjdFxcXFxzbmlwcGV0LXJlY29yZGVyMlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZnJvbnQtZW5kLXByb2plY3RcXFxcc25pcHBldC1yZWNvcmRlcjJcXFxcbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcm9udC1lbmQtcHJvamVjdC9zbmlwcGV0LXJlY29yZGVyMi9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcclxuLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcblxyXG5jb25zdCB7IHZlcnNpb24sIG5hbWUgfSA9IHBhY2thZ2VKc29uXHJcbi8vIENvbnZlcnQgZnJvbSBTZW12ZXIgKGV4YW1wbGU6IDAuMS4wLWJldGE2KVxyXG5jb25zdCBbbWFqb3IsIG1pbm9yLCBwYXRjaCwgbGFiZWwgPSAnMCddID0gdmVyc2lvblxyXG4gIC8vIGNhbiBvbmx5IGNvbnRhaW4gZGlnaXRzLCBkb3RzLCBvciBkYXNoXHJcbiAgLnJlcGxhY2UoL1teXFxkLi1dKy9nLCAnJylcclxuICAvLyBzcGxpdCBpbnRvIHZlcnNpb24gcGFydHNcclxuICAuc3BsaXQoL1suLV0vKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKGVudikgPT4gKHtcclxuICBuYW1lOiBlbnYubW9kZSA9PT0gJ3N0YWdpbmcnID8gYFtJTlRFUk5BTF0gJHtuYW1lfWAgOiBuYW1lLFxyXG4gIC8vIHVwIHRvIGZvdXIgbnVtYmVycyBzZXBhcmF0ZWQgYnkgZG90c1xyXG4gIHZlcnNpb246IGAke21ham9yfS4ke21pbm9yfS4ke3BhdGNofS4ke2xhYmVsfWAsXHJcbiAgLy8gc2VtdmVyIGlzIE9LIGluIFwidmVyc2lvbl9uYW1lXCJcclxuICB2ZXJzaW9uX25hbWU6IHZlcnNpb24sXHJcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcclxuICAvLyBrZXk6ICdla2dtY2JwZ2dsZmxtZ2NmYWpuZ2xwYmNiZGNjbm5qZScsXHJcbiAgYWN0aW9uOiB7XHJcbiAgICAvLyBkZWZhdWx0X3BvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxyXG4gICAgZGVmYXVsdF90aXRsZTogJ09wZW4gbm90ZSBsaXN0JyxcclxuICB9LFxyXG4gIGJhY2tncm91bmQ6IHtcclxuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxyXG4gIH0sXHJcbiAgLy8gY29udGVudF9zY3JpcHRzOiBbXHJcbiAgLy8gICB7XHJcbiAgLy8gICAgIGFsbF9mcmFtZXM6IGZhbHNlLFxyXG4gIC8vICAgICBqczogWydzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHMnXSxcclxuICAvLyAgICAgbWF0Y2hlczogWycqOi8vKi8qJ10sXHJcbiAgLy8gICAgIHJ1bl9hdDogJ2RvY3VtZW50X2VuZCcsXHJcbiAgLy8gICB9LFxyXG4gIC8vIF0sXHJcbiAgc2lkZV9wYW5lbDoge1xyXG4gICAgZGVmYXVsdF9wYXRoOiAnL3NyYy9zaWRlcGFuZWwvc2lkZXBhbmVsLmh0bWwnLFxyXG4gIH0sXHJcbiAgaG9zdF9wZXJtaXNzaW9uczogWycqOi8vKi8qJ10sXHJcbiAgb3B0aW9uc19wYWdlOiAnc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsXHJcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXHJcbiAgICB7XHJcbiAgICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxyXG4gICAgICByZXNvdXJjZXM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcclxuICAgICAgcmVzb3VyY2VzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCddLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIHBlcm1pc3Npb25zOiBbJ3N0b3JhZ2UnLCAnY29udGV4dE1lbnVzJywgJ3NpZGVQYW5lbCcsICdjbGlwYm9hcmRXcml0ZSddLFxyXG4gIGljb25zOiB7XHJcbiAgICAxNjogJ3NyYy9hc3NldHMvbG9nby5wbmcnLFxyXG4gICAgMzI6ICdzcmMvYXNzZXRzL2xvZ28ucG5nJyxcclxuICAgIDQ4OiAnc3JjL2Fzc2V0cy9sb2dvLnBuZycsXHJcbiAgICAxMjg6ICdzcmMvYXNzZXRzL2xvZ28ucG5nJyxcclxuICB9LFxyXG59KSlcclxuIiwgIntcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcInZ1ZVwiOiBcIl4zLjMuNFwiLFxyXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMi40XCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMThcIixcclxuICAgIFwiQGljb25pZnktanNvbi9tZGlcIjogXCJeMS4xLjU0XCIsXHJcbiAgICBcIkB0YWlsd2luZGNzcy9mb3Jtc1wiOiBcIl4wLjUuNFwiLFxyXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNDNcIixcclxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIl44LjQ0LjJcIixcclxuICAgIFwiQHR5cGVzL2VzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeNi4xMS4wXCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjE3LjNcIixcclxuICAgIFwiQHR5cGVzL3ByZXR0aWVyXCI6IFwiXjMuMC4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjYuMy4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNi4zLjBcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuMi4zXCIsXHJcbiAgICBcIkB2dWUvY29tcGlsZXItc2ZjXCI6IFwiXjMuMy40XCIsXHJcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC4zLjBcIixcclxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTRcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguNDYuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMC4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMTYuMVwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4yN1wiLFxyXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjAuMVwiLFxyXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC40LjFcIixcclxuICAgIFwic2Fzc1wiOiBcIl4xLjY0LjJcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy4zLjNcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjEuNlwiLFxyXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE2LjZcIixcclxuICAgIFwidW5wbHVnaW4taWNvbnNcIjogXCJeMC4xNi41XCIsXHJcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjUuMVwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC45XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXBhZ2VzXCI6IFwiXjAuMzEuMFwiLFxyXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjEuOC44XCIsXHJcbiAgICBcIndlYmV4dC1icmlkZ2VcIjogXCJeNi4wLjFcIlxyXG4gIH0sXHJcbiAgXCJuYW1lXCI6IFwiVGVtcG9yYXJ5IE5vdGVzXCIsXHJcbiAgXCJvdmVycmlkZXNcIjoge1xyXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCIkQGNyeGpzL3ZpdGUtcGx1Z2luXCJcclxuICB9LFxyXG4gIFwicG5wbVwiOiB7XHJcbiAgICBcIm92ZXJyaWRlc1wiOiB7fSxcclxuICAgIFwicGVlckRlcGVuZGVuY3lSdWxlc1wiOiB7XHJcbiAgICAgIFwiYWxsb3dBbnlcIjogW10sXHJcbiAgICAgIFwiYWxsb3dlZERlcHJlY2F0ZWRWZXJzaW9uc1wiOiB7XHJcbiAgICAgICAgXCJzb3VyY2VtYXAtY29kZWNcIjogXCIxLjQuOFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWxsb3dlZFZlcnNpb25zXCI6IHt9LFxyXG4gICAgICBcImlnbm9yZU1pc3NpbmdcIjogW11cclxuICAgIH1cclxuICB9LFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWZpeCAtLWV4dCBqcyxtanMsY2pzLHRzLG10cyxjdHMsdnVlXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIlxyXG4gIH0sXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIlxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxXQUFXO0FBQzlULE9BQU8sU0FBUztBQUNoQixTQUFTLFNBQVMsTUFBTSxVQUFVLGVBQWU7QUFDakQsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVzs7O0FDUmdTLFNBQVMsc0JBQXNCOzs7QUNBalY7QUFBQSxFQUNFLGNBQWdCO0FBQUEsSUFDZCxLQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLGlDQUFpQztBQUFBLElBQ2pDLGVBQWU7QUFBQSxJQUNmLG1CQUFtQjtBQUFBLElBQ25CLG9DQUFvQztBQUFBLElBQ3BDLDZCQUE2QjtBQUFBLElBQzdCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWdCO0FBQUEsSUFDaEIsUUFBVTtBQUFBLElBQ1YsMEJBQTBCO0FBQUEsSUFDMUIscUJBQXFCO0FBQUEsSUFDckIsU0FBVztBQUFBLElBQ1gsVUFBWTtBQUFBLElBQ1osK0JBQStCO0FBQUEsSUFDL0IsTUFBUTtBQUFBLElBQ1IsYUFBZTtBQUFBLElBQ2YsWUFBYztBQUFBLElBQ2Qsd0JBQXdCO0FBQUEsSUFDeEIsa0JBQWtCO0FBQUEsSUFDbEIsMkJBQTJCO0FBQUEsSUFDM0IsTUFBUTtBQUFBLElBQ1IscUJBQXFCO0FBQUEsSUFDckIsV0FBVztBQUFBLElBQ1gsaUJBQWlC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
