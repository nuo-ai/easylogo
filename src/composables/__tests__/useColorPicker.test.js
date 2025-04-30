import { describe, it, expect, vi } from 'vitest';
import { useColorPicker } from '../useColorPicker';

describe('useColorPicker', () => {
  it('应该使用初始颜色', () => {
    const { color } = useColorPicker({ initialColor: '#ff0000' });
    expect(color.value).toBe('#ff0000');
  });
  
  it('应该正确计算RGB值', () => {
    const { rgb } = useColorPicker({ initialColor: '#ff0000' });
    expect(rgb.value).toEqual({ r: 255, g: 0, b: 0 });
  });
  
  it('应该正确计算HSL值', () => {
    const { hsl } = useColorPicker({ initialColor: '#ff0000' });
    expect(hsl.value).toEqual({ h: 0, s: 100, l: 50 });
  });
  
  it('应该在更新颜色时调用回调', () => {
    const onChange = vi.fn();
    const { updateColor } = useColorPicker({ onChange });
    
    updateColor('#00ff00');
    expect(onChange).toHaveBeenCalledWith('#00ff00');
  });
  
  it('应该生成有效的随机颜色', () => {
    const { generateRandomColor } = useColorPicker();
    
    const color = generateRandomColor();
    expect(color).toMatch(/^#[0-9a-f]{6}$/i);
  });
  
  it('应该处理无效的颜色值', () => {
    const { color, updateColor } = useColorPicker({ initialColor: '#ff0000' });
    
    // 无效的颜色值应该被忽略
    updateColor('invalid');
    expect(color.value).toBe('#ff0000');
  });
}); 