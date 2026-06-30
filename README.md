# MoeKoe Music: Tauri Edition

> [!WARNING]
> 此分支已不再维护

> [!IMPORTANT]
> 由于 Tauri 依赖在 Windows 环境依赖 [Edge WebView2](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/)  
> 请确保你的系统没有缺失 Edge WebView2  
> Windows 10 1803+ / Windows 11 / Edge 中默认安装了 Edge WebView2, 无需额外安装

受够了 [Electron 版](https://github.com/MoeKoeMusic/MoeKoeMusic)的缺点? 来试试 Tauri 版吧!

| 对比           | Electron 版           | Tauri 版                      |
| -------------- | --------------------- | ----------------------------- |
| 功能           | ✅ 完整               | 🛠️ 部分功能仍在适配中[^1][^2] |
| 性能           | 🤔 一般               | ✅ 极佳                       |
| 内存占用[^3]   | ❌️ 较高 (大小 ~200MB) | ✅ 极低 (大小 >=30MB)         |
| 可执行文件大小 | ❌️ 大 (大小 ~400MB)   | ✅ 极小 (大小 ~10MB)          |

<small>
* 对比基于 Windows 11 上的测试结果。
</small>

## 手动构建

尝试手动构建? 请参考[贡献指南](CONTRIBUTING.md)中的开发命令参考

[^1]: 仍在适配中的功能见[#1](https://github.com/LateDreamXD/moekoe-tauri/issues/1)

[^2]: 由于采用了补丁的修改方式, 以保证对未来版本的最大兼容

[^3]: 包含 [api](https://github.com/MakcRe/KuGouMusicApi) server 在内的内存占用
