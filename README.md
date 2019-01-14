# 1.启动site项目
    n v6.11.5 (注意切换到老版本)

# 2.切换node版本（async await新版支持）
    npm install -g n
    n stable

# 3.安装puppeteer
### 1. 修改全局变量，可以npm搜puppeteer
    vi ~/.bash_profile
    # 增加 
    export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
    source ~/.bash_profile
### 2. 安装puppeteer
    npm i puppeteer (确保 node是最新版本)
    #or "yarn add puppeteer" 
### 3. 安装chromium
    [地址：](https://download-chromium.appspot.com/)
### 4. 切换example里面chromium地址
    executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
### 5. 因为page-monitor代码比较老需要修改包里面源码
    # 参考将node_modules 里面page-monitor进行修改
    [地址：](https://github.com/fouber/page-monitor/pull/19)

### 6. 脚本执行
    page-monitor 方案 dom diff
    node index.js

    puppeteer 方案 pixel diff
    node example.js

    两张图片生成最终的对比图
    node diff.js

