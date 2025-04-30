import { ref, computed } from 'vue';
import { useEditableText } from './useEditableText';
import { useColorPicker } from './useColorPicker';
import { useLocalStorage } from './useLocalStorage';

/**
 * 可复用的Logo生成逻辑
 * @param {Object} options - 配置选项
 * @param {Object} options.store - Pinia store
 * @param {string} options.prefixInitial - 前缀初始值
 * @param {string} options.suffixInitial - 后缀初始值
 * @param {string} options.prefixColorInitial - 前缀颜色初始值
 * @param {string} options.suffixColorInitial - 后缀颜色初始值
 * @param {string} options.bgColorInitial - 背景颜色初始值
 * @returns {Object} Logo生成逻辑对象
 */
export function useLogoGenerator(options = {}) {
  const {
    store,
    prefixInitial = 'edit',
    suffixInitial = 'me',
    prefixColorInitial = '#ffffff',
    suffixColorInitial = '#000000',
    bgColorInitial = '#ff9900'
  } = options;
  
  // 本地存储
  const storage = useLocalStorage('logo-settings', {
    prefix: prefixInitial,
    suffix: suffixInitial,
    prefixColor: prefixColorInitial,
    suffixColor: suffixColorInitial,
    bgColor: bgColorInitial,
    fontSize: 60,
    transparentBg: false,
    reverseHighlight: false
  });
  
  // 字体大小
  const fontSize = ref(storage.value.value.fontSize);
  
  // 透明背景
  const transparentBg = ref(storage.value.value.transparentBg);
  
  // 反向高亮
  const reverseHighlight = ref(storage.value.value.reverseHighlight);
  
  // 前缀文本编辑
  const prefixEditor = useEditableText({
    initialValue: storage.value.value.prefix,
    onUpdate: (text) => {
      store.updatePrefix(text);
      storage.value.value.prefix = text;
    }
  });
  
  // 后缀文本编辑
  const suffixEditor = useEditableText({
    initialValue: storage.value.value.suffix,
    onUpdate: (text) => {
      store.updateSuffix(text);
      storage.value.value.suffix = text;
    }
  });
  
  // 前缀颜色选择
  const prefixColorPicker = useColorPicker({
    initialColor: storage.value.value.prefixColor,
    onChange: (color) => {
      storage.value.value.prefixColor = color;
    }
  });
  
  // 后缀颜色选择
  const suffixColorPicker = useColorPicker({
    initialColor: storage.value.value.suffixColor,
    onChange: (color) => {
      storage.value.value.suffixColor = color;
    }
  });
  
  // 背景颜色选择
  const bgColorPicker = useColorPicker({
    initialColor: storage.value.value.bgColor,
    onChange: (color) => {
      storage.value.value.bgColor = color;
    }
  });
  
  // 计算背景颜色
  const transparentBgColor = computed(() => {
    return transparentBg.value ? 'transparent' : '#000000';
  });
  
  // 更新字体大小
  const updateFontSize = (size) => {
    fontSize.value = size;
    storage.value.value.fontSize = size;
  };
  
  // 切换透明背景
  const toggleTransparentBg = () => {
    transparentBg.value = !transparentBg.value;
    storage.value.value.transparentBg = transparentBg.value;
  };
  
  // 切换反向高亮
  const toggleReverseHighlight = () => {
    reverseHighlight.value = !reverseHighlight.value;
    storage.value.value.reverseHighlight = reverseHighlight.value;
  };
  
  // 重置所有设置
  const resetSettings = () => {
    prefixEditor.text.value = prefixInitial;
    suffixEditor.text.value = suffixInitial;
    prefixColorPicker.updateColor(prefixColorInitial);
    suffixColorPicker.updateColor(suffixColorInitial);
    bgColorPicker.updateColor(bgColorInitial);
    fontSize.value = 60;
    transparentBg.value = false;
    reverseHighlight.value = false;
    
    // 清除本地存储
    storage.clear();
  };
  
  return {
    // 状态
    fontSize,
    transparentBg,
    reverseHighlight,
    transparentBgColor,
    
    // 前缀相关
    prefixText: prefixEditor.text,
    prefixEditable: prefixEditor.editable,
    prefixIsComposing: prefixEditor.isComposing,
    prefixHandleInput: prefixEditor.handleInput,
    prefixHandleCompositionStart: prefixEditor.handleCompositionStart,
    prefixHandleCompositionEnd: prefixEditor.handleCompositionEnd,
    prefixColor: prefixColorPicker.color,
    
    // 后缀相关
    suffixText: suffixEditor.text,
    suffixEditable: suffixEditor.editable,
    suffixIsComposing: suffixEditor.isComposing,
    suffixHandleInput: suffixEditor.handleInput,
    suffixHandleCompositionStart: suffixEditor.handleCompositionStart,
    suffixHandleCompositionEnd: suffixEditor.handleCompositionEnd,
    suffixColor: suffixColorPicker.color,
    
    // 背景颜色
    bgColor: bgColorPicker.color,
    
    // 方法
    updateFontSize,
    toggleTransparentBg,
    toggleReverseHighlight,
    resetSettings,
    setEditable: prefixEditor.setEditable
  };
} 