import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // 清除所有本地存储
    localStorage.clear();
    // 重置所有模拟
    vi.clearAllMocks();
  });
  
  it('应该使用默认值当本地存储为空时', () => {
    const defaultValue = { text: '测试' };
    const { value } = useLocalStorage('test', defaultValue);
    
    expect(value.value).toEqual(defaultValue);
    expect(localStorage.getItem).toHaveBeenCalledWith('test');
  });
  
  it('应该从本地存储加载已存在的值', () => {
    const storedValue = { text: '已存储' };
    localStorage.setItem('test', JSON.stringify(storedValue));
    
    const { value } = useLocalStorage('test', { text: '默认' });
    
    expect(value.value).toEqual(storedValue);
    expect(localStorage.getItem).toHaveBeenCalledWith('test');
  });
  
  it('应该在值变化时更新本地存储', () => {
    const { value } = useLocalStorage('test', { text: '初始' });
    
    value.value = { text: '更新' };
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test',
      JSON.stringify({ text: '更新' })
    );
  });
  
  it('应该可以清除存储的值', () => {
    const defaultValue = { text: '默认' };
    const { value, clear } = useLocalStorage('test', defaultValue);
    
    value.value = { text: '测试' };
    clear();
    
    expect(value.value).toEqual(defaultValue);
    expect(localStorage.removeItem).toHaveBeenCalledWith('test');
  });
  
  it('应该处理无效的JSON数据', () => {
    localStorage.setItem('test', 'invalid-json');
    
    const defaultValue = { text: '默认' };
    const { value } = useLocalStorage('test', defaultValue);
    
    expect(value.value).toEqual(defaultValue);
  });
}); 