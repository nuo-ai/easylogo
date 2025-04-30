import { vi } from 'vitest';

// 模拟localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn(key => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

// 模拟document.createElement
const mockElement = {
  setAttribute: vi.fn(),
  style: {},
  dispatchEvent: vi.fn(),
  click: vi.fn()
};

document.createElement = vi.fn((tag) => {
  if (tag === 'a') {
    return {
      ...mockElement,
      download: '',
      href: ''
    };
  }
  if (tag === 'canvas') {
    return {
      ...mockElement,
      getContext: () => ({
        drawImage: vi.fn()
      }),
      toDataURL: vi.fn(() => 'mock-data-url')
    };
  }
  return mockElement;
});

// 模拟Image构造函数
global.Image = class {
  constructor() {
    this.onload = null;
    this.src = '';
    this.width = 100;
    this.height = 100;
    setTimeout(() => this.onload?.(), 0);
  }
  setAttribute = vi.fn();
};

// 模拟MouseEvent构造函数
global.MouseEvent = class {
  constructor(type, options) {
    this.type = type;
    this.options = options;
  }
};

// 设置全局localStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
}); 