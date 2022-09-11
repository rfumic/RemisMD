const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: ['github'],
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: 'com.rfumic.RemisMD',
        productName: 'RemisMD',
        win: {
          target: 'NSIS',
          icon: 'build/icons/icon.png',
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
        fileAssociations: {
          ext: ['md', 'markdown'],
          name: 'Markdown',
        },
      },
    },
  },
});
