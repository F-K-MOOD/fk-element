# Stylelint 配置错误原因及解决方案

## 错误概述

项目在运行 Stylelint 时出现了以下错误：

```
Could not find 'stylelint-config-html'
```

## 错误原因分析

通过分析项目的 `stylelint.config.js` 文件和相关依赖，发现了以下问题：

1. **间接依赖缺失**：

   - 项目中安装了 `stylelint-config-recommended-vue@1.5.0`
   - 该版本的配置包内部依赖于 `stylelint-config-html`，但项目中未安装此依赖

2. **自定义语法解析器缺失**：
   - 在 `stylelint.config.js` 中配置了 `customSyntax: "postcss-styled-syntax"`
   - 但项目中未安装 `postcss-styled-syntax` 包

## 解决方案

### 步骤 1: 安装缺失的依赖

```bash
# 安装 stylelint-config-html 依赖
pnpm add -D stylelint-config-html

# 安装 postcss-styled-syntax 依赖
pnpm add -D postcss-styled-syntax
```

### 步骤 2: 验证修复结果

运行 Stylelint 检查确认问题已解决：

```bash
npx stylelint "**/*.{css,scss,vue}"
```

## 技术说明

### stylelint-config-recommended-vue 依赖关系

`stylelint-config-recommended-vue@1.5.0` 内部依赖于 `stylelint-config-html`，这是因为：

- Vue 文件包含 HTML 模板部分
- 为了正确处理 Vue 文件中的 HTML 和 CSS 部分，需要 HTML 配置作为基础

### 自定义语法解析器的作用

`postcss-styled-syntax` 在 Stylelint 配置中用于：

- 正确解析不同格式的 CSS (常规 CSS、SCSS、Vue SFC 中的样式等)
- 确保 Stylelint 规则能够应用到各种文件类型中
- 提供一致的代码检查体验

## 经验总结

1. 安装依赖包时，要注意其间接依赖关系，尤其是配置类的包
2. 对于使用自定义语法解析器的工具，确保相应的包已正确安装
3. 在 Windows PowerShell 中，使用分号 `;` 作为命令分隔符，而不是 `&&`

## 相关文件

- `stylelint.config.js` - Stylelint 配置文件
- `package.json` - 项目依赖配置文件
