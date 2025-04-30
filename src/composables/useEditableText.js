import { ref, watch } from 'vue';

/**
 * 可复用的文本编辑逻辑
 * @param {Object} options - 配置选项
 * @param {string} options.initialValue - 初始值
 * @param {Function} options.onUpdate - 更新回调函数
 * @param {boolean} options.isComposition - 是否处理中文输入法
 * @returns {Object} 编辑逻辑对象
 */
export function useEditableText(options = {}) {
  const { initialValue = '', onUpdate = () => {}, isComposition = true } = options;
  
  const text = ref(initialValue);
  const isComposing = ref(false);
  const editable = ref(true);
  
  // 处理输入事件
  const handleInput = (e) => {
    if (isComposition && isComposing.value) return;
    
    // 获取当前文本内容
    const newText = e.target.textContent || '';
    
    // 更新文本值
    text.value = newText;
    
    // 调用更新回调
    onUpdate(newText);
  };
  
  // 处理中文输入法开始事件
  const handleCompositionStart = () => {
    isComposing.value = true;
  };
  
  // 处理中文输入法结束事件
  const handleCompositionEnd = (e) => {
    isComposing.value = false;
    handleInput(e);
  };
  
  // 监听外部值变化
  watch(() => options.initialValue, (newValue) => {
    if (newValue !== text.value) {
      text.value = newValue;
    }
  });
  
  // 设置可编辑状态
  const setEditable = (value) => {
    editable.value = value;
  };
  
  return {
    text,
    editable,
    isComposing,
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
    setEditable
  };
} 