const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ Cho phép require.context (bắt buộc để expo-router hoạt động đúng)
config.transformer.unstable_allowRequireContext = true;

// ✅ Kết hợp react-native-svg-transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// ✅ Loại bỏ svg khỏi assetExts (để transformer xử lý)
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

// ✅ Đảm bảo sourceExts có svg
config.resolver.sourceExts.push('svg');

// ✅ Đảm bảo có đủ các định dạng ảnh thông thường
config.resolver.assetExts.push('png', 'jpg', 'jpeg');

module.exports = config;
