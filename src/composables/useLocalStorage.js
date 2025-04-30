import { ref, watch } from 'vue';

/**
 * 本地存储组合式函数
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {Object} 存储相关的响应式对象和方法
 */
export function useLocalStorage(key, defaultValue) {
  // 从本地存储获取初始值
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;
  
  // 创建响应式引用
  const value = ref(initialValue);
  
  // 监听值的变化并保存到本地存储
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });
  
  // 清除存储的值
  const clear = () => {
    localStorage.removeItem(key);
    value.value = defaultValue;
  };
  
  return {
    value,
    clear
  };
} 