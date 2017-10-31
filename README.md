## process-shadow

一个小的工具包，用来以nodejs的方式运行其他的程序，比如hexo的server，将父进程的stdio与子进程的stdio同步，并且两者同时运行，一个被终止，另一个也终止。就像同生共死一样。这样就可以用pm2等进程管理器来管理了。

简单的例子如下：

```javascript
const shadow = require('process-shadow')
shadow("top")
```

这时候这个nodejs进程就像top进程的影子一样，两者如同一体，同生共死，有福同享，有难同当。