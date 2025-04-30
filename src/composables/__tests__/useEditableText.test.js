import { describe, it, expect, vi } from 'vitest';
import { useEditableText } from '../useEditableText';

describe('useEditableText', () => {
  it('应该使用初始值', () => {
    const { text } = useEditableText({ initialValue: '测试文本' });
    expect(text.value).toBe('测试文本');
  });
  
  it('应该在输入时更新文本', () => {
    const onUpdate = vi.fn();
    const { handleInput } = useEditableText({ onUpdate });
    
    const event = {
      target: {
        textContent: '新文本'
      }
    };
    
    handleInput(event);
    expect(onUpdate).toHaveBeenCalledWith('新文本');
  });
  
  it('应该在中文输入法组合时忽略输入', () => {
    const onUpdate = vi.fn();
    const { handleInput, isComposing } = useEditableText({ onUpdate });
    
    isComposing.value = true;
    
    const event = {
      target: {
        textContent: '新文本'
      }
    };
    
    handleInput(event);
    expect(onUpdate).not.toHaveBeenCalled();
  });
  
  it('应该在中文输入法组合结束时更新文本', () => {
    const onUpdate = vi.fn();
    const { handleCompositionEnd, isComposing } = useEditableText({ onUpdate });
    
    isComposing.value = true;
    
    const event = {
      target: {
        textContent: '新文本'
      }
    };
    
    handleCompositionEnd(event);
    expect(isComposing.value).toBe(false);
    expect(onUpdate).toHaveBeenCalledWith('新文本');
  });
  
  it('应该可以设置可编辑状态', () => {
    const { editable, setEditable } = useEditableText();
    
    expect(editable.value).toBe(true);
    
    setEditable(false);
    expect(editable.value).toBe(false);
    
    setEditable(true);
    expect(editable.value).toBe(true);
  });
}); 