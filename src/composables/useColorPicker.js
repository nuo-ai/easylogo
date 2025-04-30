import { ref, computed } from 'vue';

/**
 * 可复用的颜色选择逻辑
 * @param {Object} options - 配置选项
 * @param {string} options.initialColor - 初始颜色
 * @param {Function} options.onChange - 颜色变化回调
 * @returns {Object} 颜色选择逻辑对象
 */
export function useColorPicker(options = {}) {
  const { initialColor = '#ffffff', onChange = () => {} } = options;
  
  const color = ref(initialColor);
  
  // 计算RGB值
  const rgb = computed(() => {
    const r = parseInt(color.value.slice(1, 3), 16);
    const g = parseInt(color.value.slice(3, 5), 16);
    const b = parseInt(color.value.slice(5, 7), 16);
    return { r, g, b };
  });
  
  // 计算HSL值
  const hsl = computed(() => {
    const { r, g, b } = rgb.value;
    
    // 转换为0-1范围
    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;
    
    const max = Math.max(r1, g1, b1);
    const min = Math.min(r1, g1, b1);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // 灰色
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r1: h = (g1 - b1) / d + (g1 < b1 ? 6 : 0); break;
        case g1: h = (b1 - r1) / d + 2; break;
        case b1: h = (r1 - g1) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  });
  
  // 更新颜色
  const updateColor = (newColor) => {
    color.value = newColor;
    onChange(newColor);
  };
  
  // 生成随机颜色
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let newColor = '#';
    for (let i = 0; i < 6; i++) {
      newColor += letters[Math.floor(Math.random() * 16)];
    }
    updateColor(newColor);
    return newColor;
  };
  
  return {
    color,
    rgb,
    hsl,
    updateColor,
    generateRandomColor
  };
} 