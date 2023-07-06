# Vue 3 + TypeScript + Vite

内置 eslint stylelint commit-hook 进行代码规范

##### 开发须知

1. 严格按照 eslint、styleLint 规范代码开发，否则 commit 不了
2. npm run eslint:fix  自动修复 eslint  — ps: 若无法修复请手动修复
3. npm run stylelint:fix 自动修复 stylelint
4. 严格按照 Angular 规范提交代码



##### 为什么要用 stylelint ？

1. 样式顺序会影响重排重绘损耗性能。
2. 规范顺序后多人开发方便查看样式。



##### 开发必备插件 — VSCode

1. ESlint — 方便代码规范和保存自动修复
2. Stylelint — 方便样式规范和保存自动修复
3. TypeScript Vue Plugin
4. Vue Language Features


##### 提交示例

git commit -m "feat: 新的功能"
