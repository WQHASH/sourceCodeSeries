*  "babel": "babel src/index.js --watch -o dist/index.js",  
*		=> 将src/index.js（es6） 文件实时转换成dist/index.js(es5)  这里只是单独转文件
*  
*  "babel": "babel src --watch --out-file dist/index.js"
*		=> 这里将src下的整个文件同一转换到  dist/index.js下 （注意的是 输出的文件只能是一个文件，而不是文件夹!!）
*
*