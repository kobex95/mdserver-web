# 安装脚本和地址修改日志

## 修改时间
2026年1月31日

## 修改内容

### 1. 主安装脚本修改
**文件**: `scripts/install.sh`
- 将 `github.com/midoks/mdserver-web` 修改为 `github.com/kobex95/mdserver-web`
- 修改了主下载地址和macOS特定安装地址

### 2. 更新脚本修改
**文件**: `scripts/update.sh`
- 将更新源地址从原作者仓库修改为当前仓库

### 3. 开发版本脚本修改
**文件**: `scripts/install_dev.sh`
- 修改开发版本下载地址
- 统一使用master分支而非dev分支

**文件**: `scripts/update_dev.sh`
- 修改开发版本更新地址
- 统一文件夹命名规则

### 4. macOS安装脚本修改
**文件**: `scripts/install/macos.sh`
- 修改macOS版本的下载地址

### 5. 旧版本脚本修改
**文件**: `scripts/old/install.sh`
- 修改旧版本安装脚本中的所有GitHub地址
- 统一使用新的仓库地址

**文件**: `scripts/old/update.sh`
- 修改旧版本更新脚本中的GitHub地址

### 6. README文档修改
**文件**: `README.md`
- 修改所有安装命令中的GitHub地址
- 统一指向 `kobex95/mdserver-web` 仓库
- 包括JSDelivr CDN地址和各种备用地址

## 修改影响
- ✅ 所有安装脚本现在指向正确的仓库地址
- ✅ 用户可以通过新地址正常安装和更新
- ✅ 保持了原有的功能和兼容性
- ✅ 统一了所有分支和版本的下载源

## 验证要点
1. 确保所有脚本中的GitHub地址都已正确修改
2. 测试安装脚本能否正常下载和安装
3. 验证更新功能是否正常工作
4. 确认README中的安装命令有效

---
*本次修改确保了项目能够通过正确的仓库地址进行分发和维护。*