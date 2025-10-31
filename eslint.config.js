const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);

// Chức năng:

// Sử dụng cấu hình chuẩn Expo (eslint-config-expo/flat).
// Bỏ qua thư mục dist.
// Giúp kiểm tra code chuẩn, tránh lỗi JS/TS.