#!/bin/bash

# eslint, pretter
npm install --save-dev eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks
touch .prettierrc
# {
#   "semi": false,
#   "tabWidth": 2,
#   "printWidth": 100,
#   "singleQuote": true,
#   "trailingComma": "all",
#   "jsxSingleQuote": true,
#   "bracketSpacing": true
# }

# directory
mkdir src
mv pages src/
mv styles src/

# files
rm -rf src/pages/api
rm -rf src/styles/Home.module.css

mv index.tsx index.default.tsx
touch src/pages/index.tsx
touch src/pages/blog.tsx
touch src/pages/contact.tsx

#touch src/styles/style.css
touch src/styles/index.module.css
touch src/styles/blog.module.css
touch src/styles/contact.module.css

# data
mkdir data
touch data/blog01.md
touch data/blog02.md
touch data/blog03.md
touch data/blog04.md
touch data/blog05.md
touch data/blog06.md

# markdown
npm install raw-loader gray-matter react-markdown
npm install --save-dev @types/webpack-env