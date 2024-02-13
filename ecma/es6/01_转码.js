/*
  babel 编译器
  ES6 语法在不同的浏览器和 nodejs 中兼容不同
  babel 可以实现对不同浏览器和 nodejs 中对 ES6 语法的兼容性
  通常项目在代码上线之前，会对 ES6 代码进行编译，将 ES6 语法转为 ES5 的语法
  https://www.babeljs.cn/docs
*/

/*
  npm 命令包管理工具
  npm init 初始化包文件默认项生成 pakeage.json
  npm install babel 安装包命令
  安装后包的文件会存放在 node_modules 文件夹中

  区分 npm 安装包的环境
  npm i --save x 指定安装包存放在 dependencies 中
  npm i --save-dev x 指定安装包存放在 devDependencies 中
  npm i --global x 指定安装包存放在全局环境中
*/

/*
  babel 相关的配置包文件
  babel-presets-env 规则集，指定 TC39 提案对应的转码规则，
  babel-core 核心包，编译时需要调用 babel 的 api 来转码
  babel-cli 脚手架工具，提供终端运行命令，在 pakeage.json 配置脚本运行信息
  babel-node 提供支持 ES6 的交互解释器(REPL)环境，可以直接运行 ES6 代码
  babel-register 改写 require 命令，运行时即时编译，只对 require 引入的文件进行编译
  babel-polyfill babel 中默认只转换新语法，不会将新 api 转码

  注意 babel-node 和 babel-register 不能在生产环境中使用，包体会更沉重
*/

// 在 .babelrc 文件中配置信息
// { "presets":["@babel/preset-env"] }

/*
  pakeage.json
  {
    "scripts":{
      // 指定 -o 或者 --out-file 参数输出文件
      "build":"babel demo.js -o bundle.js"
      "build":"babel demo.js --out-file bundle.js"

      // 指定 -d 或 --out-dir 参数输出目录
      "build":"babel src -d lib" 
      "build":"babel src --out-dir lib"

      // 直接运行 ES6 代码
      "script-node":"babel-node ./src/app.js"

      // 运行 babel-register 文件
      "script-test":"node ./src/app.js"
    }
  }
*/

// npm install @babel/core @babel/cli @babel/preset-env -D
// npm install @babel/register @babel/node -D
// npm install @babel/polyfill -D
