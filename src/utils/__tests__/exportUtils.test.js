import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportAsPng, exportAsSvg } from '../exportUtils';
import { toPng, toSvg } from 'html-to-image';

// 模拟html-to-image模块
vi.mock('html-to-image', () => ({
  toPng: vi.fn().mockResolvedValue('data:image/png;base64,mock-png-data'),
  toSvg: vi.fn().mockResolvedValue('data:image/svg+xml;base64,mock-svg-data')
}));

describe('exportUtils', () => {
  let node;
  
  beforeEach(() => {
    // 创建测试DOM节点
    document.body.innerHTML = `
      <div id="logo">
        <span class="prefix">edit</span>
        <span class="postfix">me</span>
      </div>
    `;
    node = document.getElementById('logo');
    
    // 重置所有模拟
    vi.clearAllMocks();
  });
  
  describe('exportAsPng', () => {
    it('应该成功导出PNG', async () => {
      const result = await exportAsPng(node, 'edit', 'me');
      
      expect(result).toBe(true);
      expect(toPng).toHaveBeenCalledWith(node, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: null
      });
    });
    
    it('应该在导出失败时返回false', async () => {
      toPng.mockRejectedValueOnce(new Error('导出失败'));
      
      const result = await exportAsPng(node, 'edit', 'me');
      
      expect(result).toBe(false);
    });
  });
  
  describe('exportAsSvg', () => {
    it('应该成功导出SVG', async () => {
      const result = await exportAsSvg(node, 'edit', 'me');
      
      expect(result).toBe(true);
      expect(toSvg).toHaveBeenCalledWith(node, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: null
      });
    });
    
    it('应该在导出失败时返回false', async () => {
      toSvg.mockRejectedValueOnce(new Error('导出失败'));
      
      const result = await exportAsSvg(node, 'edit', 'me');
      
      expect(result).toBe(false);
    });
  });
}); 