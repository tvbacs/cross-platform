// src/utils/getImageUri.ts
import CONFIG from '../constants/env';

export const getImageUri = (image?: string) => {
  const uri = image
    ? image.startsWith('http')
      ? image
      : `${CONFIG.API_BASE_URL}/${image.replace(/^\/+/, '')}`
    : 'https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png';

  console.log('Image URL:', uri); // <-- hiển thị đường dẫn trong console
  return uri;
};
