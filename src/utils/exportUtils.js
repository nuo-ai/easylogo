import { toPng, toSvg } from 'html-to-image';

/**
 * 下载图片
 * @param {string} imgsrc - 图片数据URL
 * @param {string} name - 文件名
 */
export const downloadImage = (imgsrc, name) => {
  const image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = name || 'photo';
    a.href = url;
    a.dispatchEvent(event);
  };
  image.src = imgsrc;
};

/**
 * 导出Logo为PNG
 * @param {HTMLElement} node - 要导出的DOM节点
 * @param {string} prefix - 前缀文本
 * @param {string} suffix - 后缀文本
 * @returns {Promise<boolean>} 是否导出成功
 */
export const exportAsPng = async (node, prefix, suffix) => {
  try {
    const dataUrl = await toPng(node, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: null
    });
    downloadImage(dataUrl, `${prefix}-${suffix}.png`);
    return true;
  } catch {
    return false;
  }
};

/**
 * 导出Logo为SVG
 * @param {HTMLElement} node - 要导出的DOM节点
 * @param {string} prefix - 前缀文本
 * @param {string} suffix - 后缀文本
 * @returns {Promise<boolean>} 是否导出成功
 */
export const exportAsSvg = async (node, prefix, suffix) => {
  try {
    const dataUrl = await toSvg(node, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: null
    });
    const link = document.createElement('a');
    link.download = `${prefix}-${suffix}.svg`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch {
    return false;
  }
}; 