import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLogoGenerator } from '../useLogoGenerator';

// 模拟Pinia store
const mockStore = {
  updatePrefix: vi.fn(),
  updateSuffix: vi.fn()
};

describe('useLogoGenerator', () => {
  beforeEach(() => {
    // 清除所有本地存储
    localStorage.clear();
    // 重置所有模拟
    vi.clearAllMocks();
  });
  
  it('应该使用初始值', () => {
    const {
      prefixText,
      suffixText,
      prefixColor,
      suffixColor,
      bgColor,
      fontSize
    } = useLogoGenerator({
      store: mockStore,
      prefixInitial: '测试',
      suffixInitial: '文本',
      prefixColorInitial: '#ffffff',
      suffixColorInitial: '#000000',
      bgColorInitial: '#ff9900'
    });
    
    expect(prefixText.value).toBe('测试');
    expect(suffixText.value).toBe('文本');
    expect(prefixColor.value).toBe('#ffffff');
    expect(suffixColor.value).toBe('#000000');
    expect(bgColor.value).toBe('#ff9900');
    expect(fontSize.value).toBe(60);
  });
  
  it('应该更新字体大小', () => {
    const { fontSize, updateFontSize } = useLogoGenerator({ store: mockStore });
    
    updateFontSize(100);
    expect(fontSize.value).toBe(100);
  });
  
  it('应该切换透明背景', () => {
    const { transparentBg, toggleTransparentBg, transparentBgColor } = useLogoGenerator({ store: mockStore });
    
    expect(transparentBg.value).toBe(false);
    expect(transparentBgColor.value).toBe('#000000');
    
    toggleTransparentBg();
    expect(transparentBg.value).toBe(true);
    expect(transparentBgColor.value).toBe('transparent');
  });
  
  it('应该切换反向高亮', () => {
    const { reverseHighlight, toggleReverseHighlight } = useLogoGenerator({ store: mockStore });
    
    expect(reverseHighlight.value).toBe(false);
    
    toggleReverseHighlight();
    expect(reverseHighlight.value).toBe(true);
    
    toggleReverseHighlight();
    expect(reverseHighlight.value).toBe(false);
  });
  
  it('应该重置所有设置', () => {
    const {
      prefixText,
      suffixText,
      prefixColor,
      suffixColor,
      bgColor,
      fontSize,
      transparentBg,
      reverseHighlight,
      resetSettings
    } = useLogoGenerator({
      store: mockStore,
      prefixInitial: '测试',
      suffixInitial: '文本',
      prefixColorInitial: '#ffffff',
      suffixColorInitial: '#000000',
      bgColorInitial: '#ff9900'
    });
    
    // 修改设置
    prefixText.value = '新前缀';
    suffixText.value = '新后缀';
    prefixColor.value = '#ff0000';
    suffixColor.value = '#00ff00';
    bgColor.value = '#0000ff';
    fontSize.value = 100;
    transparentBg.value = true;
    reverseHighlight.value = true;
    
    // 重置
    resetSettings();
    
    // 验证重置结果
    expect(prefixText.value).toBe('测试');
    expect(suffixText.value).toBe('文本');
    expect(prefixColor.value).toBe('#ffffff');
    expect(suffixColor.value).toBe('#000000');
    expect(bgColor.value).toBe('#ff9900');
    expect(fontSize.value).toBe(60);
    expect(transparentBg.value).toBe(false);
    expect(reverseHighlight.value).toBe(false);
  });
}); 