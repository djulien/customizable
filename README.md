# customizable
Node.js wedge to allow customized code to override repo code

# Installation
`npm install customize --save`

# Usage
```javascript
require('customize');
...
require('other.js');
```

Will actually require **'my-other.js'** in place of **'other.js'** if found.

See test/test.js for an example.

# License
MIT
