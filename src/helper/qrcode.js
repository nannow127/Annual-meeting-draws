import { onMounted, ref } from 'vue';
import { toDataURL } from 'qrcode';

export function getQrcode(url) {
  const qrCodeData = ref('');
  const options = {
    width: 100, // 二维码的宽度
    height: 100, // 二维码的高度
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  };
  onMounted(() => {
    toDataURL(url, options, (err, dataURL) => {
      if (err) {
        console.error(err);
        return;
      }

      // 在这里可以使用生成的二维码 dataURL
      // console.log(dataURL)
      qrCodeData.value = dataURL;
    });
  });

  return qrCodeData;
}
