// webpack只会监听被require或import的文件，所以添加以下代码，否则html等文件不会被监听。
require('./src/index.html');
require('./src/css/index.css');
require('./src/index');