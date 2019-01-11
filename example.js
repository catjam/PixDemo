const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const moment = require('moment');

(async () => {
  const browser = await (puppeteer.launch({
    // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
    executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
    //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 不会打开浏览器
    headless: true
  }));
  const page = await browser.newPage();
  // https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js

  // http://localhost:9000/html/?module=md-blog-article&style=template4&theme=libo&data=standard
  const module_name = 'md-agent';
  const style = 'template4';
  const theme = 'libo';
  const data = 'standard';

  // await page.emulate(devices['iPhone X']);
  await page.goto(`http://localhost:9000/html/?module=${module_name}&style=${style}&theme=${theme}&data=${data}`);
  await page.waitFor(3000);
  // 异步加载的图片特殊处理
  await page.$$eval('.pre-img', imgs => {
    [...imgs].forEach((img) => {
      img.style.backgroundImage = 'none';
      img.style.backgroundColor = '#999';
    });
  });
  await page.$$eval('.mg-loading', els => [...els].map(el => el.style.display = 'none'));
  // 不出现局部滚动条
  await page.$eval('.ct-module', el => el.style.overflow = 'initial');

  const date = moment(new Date).format('YYYYMMDDhhmmss');
  await page.screenshot({
    path: `${module_name}--${style}--${theme}--${data}--${date}.png`,
    type: 'png',
    // quality: 100, 只对jpg有效
    fullPage: true,
    // 指定区域截图，clip和fullPage两者只能设置一个
    // clip: {
    //   x: 0,
    //   y: 0,
    //   width: 1000,
    //   height: 40
    // }
  });
  browser.close();
})();