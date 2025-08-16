# My Blog API Lambda

A GraphQL-based blog API service built with TypeScript, supporting both AWS Lambda deployment and local development.

## ✨ Features

- 🚀 **GraphQL API** - Modern API query language
- ⚡ **AWS Lambda** - Serverless deployment with auto-scaling
- 🔧 **TypeScript** - Type-safe development experience
- 🗄️ **PostgreSQL** - Reliable relational database
- 🛠️ **Local Development** - Hot-reload development server
- 📦 **ESBuild** - Fast building and bundling

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   AWS Lambda    │    │   PostgreSQL    │
│   Application   │───▶│   GraphQL API   │───▶│   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 GraphQL Schema

### Type Definitions

```graphql
type Post {
  id: ID!
  title: String!
  slug: String!
  summary: String!
  cover: String!
  icon: String!
  published_date: String!
  is_pinned: Boolean!
  tags: [String!]!
  markdown: String!
}

type Query {
  posts: [Post!]!
  post(slug: String!): Post
}
```

### Query Examples

Get all posts:

```graphql
query GetPosts {
  posts {
    id
    title
    slug
    summary
    cover
    published_date
    is_pinned
    tags
  }
}
```

Get a single post by slug:

```graphql
query GetPost($slug: String!) {
  post(slug: $slug) {
    id
    title
    slug
    summary
    cover
    icon
    published_date
    is_pinned
    tags
    markdown
  }
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm (recommended) or npm
- PostgreSQL database

### Install Dependencies

```bash
pnpm install
```

### Environment Configuration

Create a `.env` file and configure the following environment variables:

```env
# Database configuration
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

# AWS configuration
AWS_REGION=ca-central-1

# Development server port (optional)
PORT=4000
```

### Database Schema

Create the `posts` table:

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT,
  cover VARCHAR(500),
  icon VARCHAR(500),
  published_date TIMESTAMP,
  is_pinned BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  markdown TEXT
);
```

## 🛠️ Development

### Start Development Server

```bash
pnpm start
```

The development server will start at `http://localhost:4000/graphql` with GraphQL Playground interface.

### Build for Production

```bash
pnpm run build:prod
```

### Package for Deployment

```bash
pnpm run package
```

This creates a `deployment-package.zip` file that can be directly uploaded to AWS Lambda.

### Clean Build Files

```bash
pnpm clean
```

## 📁 Project Structure

```
my-blog-api-lambda/
├── src/
│   ├── graphql/
│   │   └── schema.graphql     # GraphQL Schema definitions
│   ├── databaseConfig.ts      # Database connection configuration
│   ├── index.ts              # Lambda entry point
│   └── resolvers.ts          # GraphQL resolvers
├── dev-server.ts             # Local development server
├── esbuild.config.js         # Build configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 🚢 Deployment

### AWS Lambda Deployment

1. Build and package the project:

   ```bash
   pnpm run package
   ```

2. Upload `deployment-package.zip` to AWS Lambda

3. Configure environment variables (database connection info, etc.)

4. Set up API Gateway trigger

### Recommended Configuration

- **Memory**: 512MB - 1024MB
- **Timeout**: 30 seconds
- **Runtime**: Node.js 22.x
- **Architecture**: x86_64 or arm64

## 🔧 Tech Stack

- **Language**: TypeScript
- **Framework**: Apollo Server
- **Database**: PostgreSQL
- **Deployment**: AWS Lambda
- **Build Tool**: ESBuild
- **Dev Tools**: ts-node-dev

## 📝 API Documentation

After deployment, GraphQL Playground can be accessed via:

- **Local Development**: `http://localhost:4000/graphql`
- **Production**: Your API Gateway endpoint URL

## 📄 License

ISC License
