# EasyLogo

一个简单易用的在线 Logo 生成器，基于 Vue 3 + Vite + Tailwind CSS 构建。

![GitHub last commit](https://img.shields.io/github/last-commit/nuoai/easylogo.svg) ![GitHub issues](https://img.shields.io/github/issues/nuoai/easylogo.svg) ![GitHub stars](https://img.shields.io/github/stars/nuoai/easylogo.svg?style=social)

**EasyLogo - 让每个人都能轻松设计专业 Logo**

## 功能特点

- 🎨 自定义文本和颜色
- 🖼️ 支持导出 PNG 和 SVG 格式
- 📱 响应式设计，支持移动端
- 💾 本地存储，自动保存编辑内容
- 🌍 支持多语言（简体中文/英文）
- 🎯 实时预览
- 🎨 丰富的颜色选择器
- 📏 可调节字体大小
- 🔄 支持反向高亮效果

## 开发指南

### 环境要求

- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
# 运行单元测试
npm run test

# 运行测试覆盖率报告
npm run test:coverage
```

### 代码规范

```bash
# 运行 ESLint
npm run lint

# 格式化代码
npm run format
```

## 项目结构

```
src/
├── assets/        # 静态资源
├── components/    # Vue 组件
├── composables/   # 组合式函数
├── stores/        # Pinia 状态管理
├── utils/         # 工具函数
└── views/         # 页面视图
```

## 主要模块说明

### 组件

- `LogoGenerator.vue`: Logo 生成器主组件
- `ExportBtn.vue`: 导出按钮组件
- `FontSelector.vue`: 字体选择器组件

### 组合式函数

- `useLogoGenerator`: Logo 生成核心逻辑
- `useEditableText`: 文本编辑逻辑
- `useColorPicker`: 颜色选择逻辑

### 工具函数

- `exportUtils`: 导出相关工具函数

## 使用说明

1. 在文本框中输入你想要的前缀和后缀文本
2. 使用颜色选择器自定义文本和背景颜色
3. 调整字体大小和字体样式
4. 选择是否启用透明背景或反向高亮
5. 点击导出按钮，选择导出格式（PNG/SVG）

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 更新日志

详见 [CHANGELOG.md](CHANGELOG.md)
