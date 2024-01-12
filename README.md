# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Connecting to mongoDB

Make sure to install Mongosh on your system. 
After Creating a DataBase, create a table with following schema:
```bash
    name: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true,
    },
    score: {
      type: 'number',
      required: true,
    },
    created_date: {
      type: 'object',

      required: true,
    },
    updated_date: {
      type: 'object',

      required: true,
    }
```
Then create a .env file in the root of your project, type the local address of your running mongoDb. for example 

```bash
#.env file
MONGODB_URI='mongodb://127.0.0.1:27017/doodle'

```


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## PREVIEW

![Doodle Jump GIF](https://github.com/prstwo/doodlejump-vue/blob/main/assets/gif/doodle-preview-gif.mp4)


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
