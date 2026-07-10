# 贡献指南

## 前提

环境要求:
  参考 [Wails3 安装教程](https://v3.wails.io/zh-cn/quick-start/installation/)

## 贡献流程

1. [Fork 本项目](https://github.com/LateDreamXD/moekoe-lite/fork) 到你的 GitHub 账号
2. 克隆你的 Fork 以及仓库中的子模块到本地
3. 进行修改并提交到你的 Fork
4. [提交 Pull Request](https://github.com/LateDreamXD/moekoe-lite/compare) 到本项目

## 开发命令参考

```sh
# 安装依赖
pnpm install

# 启动 Wails 开发进程（任一）
pnpm dev
wails3 dev

# 构建应用（任一）
pnpm build
wails3 build

# 仅启动 Vite 开发服务器
pnpm run -C frontend dev
```
