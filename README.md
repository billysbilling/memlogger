# memlogger
Logs memory usage objects via custom log function


## Install

In your deps:

```json
{
  "memlogger": "git://github.com/billysbilling/memlogger.git#v0.0.1"
}
```

Or if you prefer a tarball:

```json
{
  "memlogger": "https://github.com/billysbilling/memlogger/archive/v0.0.1.tar.gz"
}
```

## Use

```js
require('memlogger')(console.log);
```

Or if you have some custom log function that takes an object of properties to log:

```js
require('memlogger')(logger.info.bind(logger));
```

And if you want to customize the memory usage interval

```js
require('memlogger')(console.log, 30000); // log usage every 30 seconds via console.log
```
