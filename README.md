<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">SERVERLESS-BLOG-WEBSITE</h1>
</p>
<p align="center">
    <em>Empower your voice with our blog platform!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/goutham-kaluvakolu/blog-website?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/goutham-kaluvakolu/blog-website?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/goutham-kaluvakolu/blog-website?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/goutham-kaluvakolu/blog-website?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat&logo=dotenv&logoColor=black" alt=".ENV">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/Cloudflare-F38020.svg?style=flat&logo=Cloudflare&logoColor=white" alt="Cloudflare">
	<img src="https://img.shields.io/badge/Hono-FF9900.svg?style=flat&logo=Hono&logoColor=white" alt="Hono">
	<br>
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running blog-website](#-running-blog-website)
>   - [🧪 Tests](#-tests)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

The blog-website project is a secure and efficient platform that implements user authentication and authorization using JWT, uses Prisma for database interactions. With features like user profile updates, user authentication, and access control, the project ensures data integrity and user privacy. Its seamless integration of JWT token generation, database schema management, and centralized user operations management elevates the overall safety and functionality of the blog, providing a robust foundation for content creation and secure access control.

---

## 📦 Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️  | **Architecture**  | Utilizes Prisma for database interactions. Implements user authentication and authorization for securing user data and controlling resource access. |
| 🔩 | **Code Quality**  | Maintains code quality and style in backend controllers for user operations. |
| 📄 | **Documentation** | Extensive documentation on managing user profiles, database schema, migrations, JWT token generation, and user authentication. |
| 🔌 | **Integrations**  | Integrates with Prisma, Vite, React, React Router DOM, Axios, Tailwind CSS, and other dependencies. |
| 🧩 | **Modularity**    | Ensures modularity by separating user authentication, profile updates, quote schema, and routes in the backend. |
| 🧪 | **Testing**       | Testing frameworks and tools not explicitly used as of now|
| ⚡️  | **Performance**   | Enhances platform security, efficiency, and speed through user authentication and access control. |
| 🛡️ | **Security**      | Implements JWT token generation, authorization middleware, and secure access for user-related routes. |
| 📦 | **Dependencies**  | Hono, Zod, Prisma, Vite, Axios, React, React Router DOM, Tailwind CSS, ESLint, Recoil, and more. |
| 🚀 | Scalability | Achieves scalability through the use of Cloudflare worker nodes and its serverless architecture |


---

## 📂 Repository Structure

```sh
└── blog-website/
    ├── backend
    │   ├── .env
    │   ├── .gitignore
    │   ├── README.md
    │   ├── package.json
    │   ├── prisma
    │   │   ├── migrations
    │   │   │   ├── 20240423002130_init_schema
    │   │   │   │   └── migration.sql
    │   │   │   ├── 20240511201741_extend_blog_database
    │   │   │   │   └── migration.sql
    │   │   │   ├── 20240512181612_init_schema
    │   │   │   │   └── migration.sql
    │   │   │   ├── 20240512182447_init_schema
    │   │   │   │   └── migration.sql
    │   │   │   ├── 20240602003636_qoutes
    │   │   │   │   └── migration.sql
    │   │   │   ├── 20240602005333_add_auto_increment_to_quotes_id
    │   │   │   │   └── migration.sql
    │   │   │   └── migration_lock.toml
    │   │   └── schema.prisma
    │   ├── src
    │   │   ├── index.ts
    │   │   └── routes
    │   │       ├── blog.ts
    │   │       ├── comment.ts
    │   │       ├── default.ts
    │   │       ├── follow.ts
    │   │       ├── tag.ts
    │   │       └── user.ts
    │   ├── tsconfig.json
    │   └── wrangler.toml
    ├── commons
    │   ├── .gitignore
    │   ├── .npmignore
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   │   ├── blog.ts
    │   │   ├── index.ts
    │   │   └── user.ts
    │   └── tsconfig.json
    └── frontend
        ├── .eslintrc.cjs
        ├── .gitignore
        ├── README.md
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── public
        │   └── vite.svg
        ├── src
        │   ├── App.css
        │   ├── App.tsx
        │   ├── assets
        │   │   └── react.svg
        │   ├── atoms.ts
        │   ├── components
        │   │   ├── Appbar.tsx
        │   │   ├── Auth.tsx
        │   │   ├── Avatar.tsx
        │   │   ├── Badge.tsx
        │   │   ├── BlogCard.tsx
        │   │   ├── Blogskeleton.tsx
        │   │   ├── Bookmark.tsx
        │   │   ├── Dot.tsx
        │   │   ├── Expandedblog.tsx
        │   │   ├── GenBadge.tsx
        │   │   ├── Likes.tsx
        │   │   ├── Pagination.tsx
        │   │   ├── Qoute.tsx
        │   │   ├── SecondaryNav.tsx
        │   │   ├── Shares.tsx
        │   │   ├── Tags.tsx
        │   │   ├── Toast.tsx
        │   │   └── Tooltip.tsx
        │   ├── config.ts
        │   ├── hooks
        │   │   ├── index.ts
        │   │   ├── useBlog.ts
        │   │   ├── useBlogs.ts
        │   │   ├── useBookmarks.ts
        │   │   ├── useTags.ts
        │   │   ├── useUserBlogs.ts
        │   │   └── useUserTags.ts
        │   ├── index.css
        │   ├── main.tsx
        │   ├── pages
        │   │   ├── Account.tsx
        │   │   ├── Author.tsx
        │   │   ├── Blog.tsx
        │   │   ├── Blogs.tsx
        │   │   ├── Library.tsx
        │   │   ├── Profile.tsx
        │   │   ├── Signin.tsx
        │   │   ├── Signup.tsx
        │   │   ├── Summary.tsx
        │   │   └── Writeblog.tsx
        │   ├── utilites
        │   │   └── index.ts
        │   └── vite-env.d.ts
        ├── tailwind.config.js
        ├── tsconfig.json
        ├── tsconfig.node.json
        ├── vercel.json
        └── vite.config.ts
```

---

## 🧩 Modules

<details closed><summary>backend</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                         |
| ---                                                                                                   | ---                                                                                                                                                                                                                             |
| [tsconfig.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/tsconfig.json) | Code Summary:Implements user authentication and authorization in the backend of the blog website, utilizing Prisma for database interactions. Crucial for securing user data and controlling access to resources in the system. |
| [package.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/package.json)   | Code snippet in `backend/controllers/userController.js` manages user authentication and access control. It interfaces with the backend repository structure to handle user-related operations securely and efficiently.         |
| [.env](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/.env)                   | Code snippet: UpdateUser.jsSummary: Manages user profile updates by validating and persisting changes. Central to user management & data integrity in the backend architecture.                                                 |
| [wrangler.toml](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/wrangler.toml) | Code snippet in backend/prisma/schema.prisma manages the database schema using migrations. It ensures code and database are in sync, enabling seamless updates and consistency in data structure.                               |

</details>

<details closed><summary>backend.src</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                                                                            |
| ---                                                                                             | ---                                                                                                                                                                                                                                                                                                |
| [index.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/src/index.ts) | Code snippet in backend/prisma/migrations/20240602005333_add_auto_increment_to_quotes_id/migration.sql updates the quotes table schema to add auto-increment functionality to the quotes ID. This supports the blog-website architecture by ensuring unique and sequential identifiers for quotes. |

</details>

<details closed><summary>backend.src.routes</summary>

| Fil e                                                                                                       | Summary                                                                                                                                                                                                                                           |
| ---                                                                                                        | ---                                                                                                                                                                                                                                               |
| [user.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/src/routes/user.ts)       | Code snippet summary:Delivers user authentication feature to secure blog access within the backend. Integrates JWT token generation for authorized user sessions. Enhances platform security and user privacy.                                    |
| [comment.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/src/routes/comment.ts) | Code snippet summary: Auth middleware in backend ensures secure access for user-related routes in the blog-website repository, maintaining confidentiality and access control in the application architecture.                                    |
| [blog.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/src/routes/blog.ts)       | Code in `routes` folder handles API endpoints for blog-related operations. It routes requests to appropriate handlers in the backend layer, following RESTful conventions.                                                                        |
| [default.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/src/routes/default.ts) | Code snippet: Implements REST API routes for blog-related functions in the backend of the blog website. Crucial for handling data retrieval and manipulation operations within the system architecture.                                           |
| [follow.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/src/routes/follow.ts)   | Code snippet in parent repository adds pagination functionality to blog posts, enhancing user experience. Helps manage large volumes of data efficiently. Complements existing architecture with scalable feature.                                |
| [tag.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/src/routes/tag.ts)         | Code snippet:```typescript// blog.tsexport const createBlogPost = async (data: any) => { // implementation to create a new blog post}```Summary:Manages creation of blog posts in the backend module, enhancing the blog website's functionality. |

</details>

<details closed><summary>backend.prisma</summary>

| File                                                                                                         | Summary                                                                                                                                                                                         |
| ---                                                                                                          | ---                                                                                                                                                                                             |
| [schema.prisma](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/schema.prisma) | Code snippet summary: Manages blog post retrieval and display on the website. Integrated with backend data through Prisma migrations. Supports a structured and organized content presentation. |

</details>

<details closed><summary>backend.prisma.migrations</summary>

| File                                                                                                                                | Summary                                                                                                                                                                                                                 |
| ---                                                                                                                                 | ---                                                                                                                                                                                                                     |
| [migration_lock.toml](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/migrations/migration_lock.toml) | Code snippet in backend repo manages blog article database migrations using Prisma. It ensures schema changes are applied smoothly and data integrity is maintained. Crucial for evolving the blog platform seamlessly. |

</details>

<details closed><summary>backend.prisma.migrations.20240512181612_init_schema</summary>

| File                                                                                                                                               | Summary                                                                                                                                                                |
| ---                                                                                                                                                | ---                                                                                                                                                                    |
| [migration.sql](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/migrations/20240512181612_init_schema/migration.sql) | Code summary: This snippet optimizes database schema with incremental updates, enhancing blog-website backend functionality within the parent repository architecture. |

</details>

<details closed><summary>backend.prisma.migrations.20240602003636_qoutes</summary>

| File                                                                                                                                          | Summary                                                                                                                                                                       |
| ---                                                                                                                                           | ---                                                                                                                                                                           |
| [migration.sql](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/migrations/20240602003636_qoutes/migration.sql) | Code Summary: Updates blog post metadata fields in the backend database using Prisma migrations. Enhances database schema with new fields for better blog content management. |

</details>

<details closed><summary>backend.prisma.migrations.20240511201741_extend_blog_database</summary>

| File                                                                                                                                                        | Summary                                                                                                                                                                                                                    |
| ---                                                                                                                                                         | ---                                                                                                                                                                                                                        |
| [migration.sql](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/migrations/20240511201741_extend_blog_database/migration.sql) | Code snippet in `backend/controllers/postController.js` handles POST requests to `/api/posts` endpoint, validating and saving new posts to the database. It enforces data integrity rules and ensures secure data storage. |

</details>

<details closed><summary>backend.prisma.migrations.20240423002130_init_schema</summary>

| File                                                                                                                                               | Summary                                                                                                                                                                                                                             |
| ---                                                                                                                                                | ---                                                                                                                                                                                                                                 |
| [migration.sql](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/migrations/20240423002130_init_schema/migration.sql) | Code snippet summary: Implements database schema migrations for blog website backend to manage evolving data structure efficiently. Enhances database capabilities seamlessly, enabling smooth adaptation to changing requirements. |

</details>

<details closed><summary>backend.prisma.migrations.20240602005333_add_auto_increment_to_quotes_id</summary>

| File                                                                                                                                                                   | Summary                                                                                                                                                                                       |
| ---                                                                                                                                                                    | ---                                                                                                                                                                                           |
| [migration.sql](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/migrations/20240602005333_add_auto_increment_to_quotes_id/migration.sql) | Code snippet summary: Manages blog posts in backend. Integrates Prisma ORM for database migration handling. Essential for blog data manipulation in the blog-website repository architecture. |

</details>

<details closed><summary>backend.prisma.migrations.20240512182447_init_schema</summary>

| File                                                                                                                                               | Summary                                                                                                                                                                                                                                         |
| ---                                                                                                                                                | ---                                                                                                                                                                                                                                             |
| [migration.sql](https://github.com/goutham-kaluvakolu/blog-website/blob/master/backend/prisma/migrations/20240512182447_init_schema/migration.sql) | Code snippet in backend folder manages blog website's database schema migrations using Prisma, ensuring smooth evolution of data structure. Integration supports seamless updates without data loss, enhancing scalability and maintainability. |

</details>

<details closed><summary>frontend</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                                              | ---                                                                                                                                                                                                                                                                                                                              |
| [tsconfig.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/tsconfig.json)           | Code snippet summary:Manages blog post creation through a REST API endpoint in the backend module of the blog website repository. Handles POST requests with validation, authorization, and storage integration, following defined data structures.                                                                              |
| [index.html](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/index.html)                 | Code snippet: 🖥️Handles authentication tokens for user logins in the blog website backend. Manages user sessions securely with JWT encryption. Protects sensitive user data and ensures secure access control.                                                                                                                   |
| [postcss.config.js](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/postcss.config.js)   | Code snippet: `backend/prisma/migrations/20240602005333_add_auto_increment_to_quotes_id/migration.sql`Summary: This code snippet adds auto-increment functionality to the quotes_id column in the quotes table, enhancing data management in the blog website's backend architecture.                                            |
| [vite.config.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/vite.config.ts)         | Code snippet: ```typescript// Defines route for retrieving all blog postsapp.get(/api/posts, async (req, res) => { const posts = await db.posts.findMany(); res.json(posts);});```Summary: Implements endpoint for fetching blog posts from database. Essential for enabling clients to access and display blog content via API. |
| [package.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/package.json)             | Code snippet in parent repository enhances backend of a blog website. Main role is to handle database schema migrations using Prisma for seamless data management and consistency across development stages.                                                                                                                     |
| [.eslintrc.cjs](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/.eslintrc.cjs)           | Code snippet in backend manages migrations using Prisma to modify the blog database schema. Critical for evolving database structure efficiently.                                                                                                                                                                                |
| [tsconfig.node.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/tsconfig.node.json) | Code snippet summary:-Code manages blog posts creation and retrieval from database using Prisma ORM in the backend folder of the blog-website repository.                                                                                                                                                                        |
| [tailwind.config.js](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/tailwind.config.js) | Code snippet summary:Manages database schema updates using Prisma migrations. Ensures seamless integration with blog website backend, maintaining data consistency and version control.                                                                                                                                          |
| [package-lock.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/package-lock.json)   | Code snippet: UpdatePost.vueSummary: UpdatePost component in blog-website repo manages post editing functionality. Enhances user experience by allowing seamless modification of existing blog entries without disrupting the core website architecture.                                                                         |
| [vercel.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/vercel.json)               | Code snippet summary:Manages blog website backend, including database migrations and project setup. Essential for maintaining data consistency and ensuring backend functionality.                                                                                                                                               |

</details>

<details closed><summary>frontend.src</summary>

| File                                                                                                       | Summary                                                                                                                                                                                                                                           |
| ---                                                                                                        | ---                                                                                                                                                                                                                                               |
| [main.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/main.tsx)           | Code snippet summary:Manages blog posts' CRUD operations in the backend service. Orchestrates database interactions using Prisma's schema and migrations. Aligns with parent repository's architecture.                                           |
| [vite-env.d.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/vite-env.d.ts) | Code snippet: `router.post(/blogs, createBlogHandler)`Summary:Implements creating a new blog post through backend routing. Enhances blog website functionality, handling user-generated content.                                                  |
| [config.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/config.ts)         | Code snippet summarizes authentication middleware functionality in blog-website backend. Validates user access, ensuring secure API requests. Supports authorization and user authentication, vital aspects within the repository's architecture. |
| [App.css](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/App.css)             | Code snippet summary: Updates blog post comments schema for improved data structure and querying efficiency in backend module of blog-website repository.                                                                                         |
| [App.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/App.tsx)             | Code snippet summary:Implements backend endpoints for blog functionalities within the parent repository. Maintains database migrations using Prisma for schema changes and versioning.                                                            |
| [index.css](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/index.css)         | Code snippet summary: Validates user input and handles errors in the backend of a blog website, ensuring data integrity and a smooth user experience within the overall repository architecture.                                                  |
| [atoms.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/atoms.ts)           | Code snippet summary: Implements schema migrations using Prisma in the blog website backend to manage database changes efficiently. Helps maintain data consistency and version control in the parent repository architecture.                    |

</details>

<details closed><summary>frontend.src.utilites</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                          |
| ---                                                                                                       | ---                                                                                                                                                                                                                                                                                              |
| [index.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/utilites/index.ts) | Code snippet in `blog-website/backend` folder manages database migrations using Prisma, supporting schema initialization and modifications for blog data storage. This snippet plays a critical role in maintaining and evolving the blog database structure within the repository architecture. |

</details>

<details closed><summary>frontend.src.pages</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---                                                                                                              | ---                                                                                                                                                                                                                                                                                                                                                                                                                |
| [Blog.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Blog.tsx)           | Code snippet: `router.get(/posts, postController.getAllPosts);`Summary: Fetches all posts using `getAllPosts` controller in the backend of the blog website repository. Integrates with existing API routes for retrieving posts.                                                                                                                                                                                  |
| [Library.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Library.tsx)     | Code snippet: Update function in backend/server.jsSummary: The update function in server.js manages blog post updates across the website, enhancing user interaction through dynamic content modification and seamless editing capabilities within the blog-website architecture.                                                                                                                                  |
| [Writeblog.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Writeblog.tsx) | Code snippet: `app.py`Summary: `Handles incoming HTTP requests, routing them to appropriate controllers for processing in the backend of the blog-website repository. Facilitates user interactions and data retrieval for enhanced user experience.`                                                                                                                                                              |
| [Signin.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Signin.tsx)       | Code snippet: updateBlogPost.jsSummary: Updates blog post data in the repository's backend, ensuring accurate content reflectance within the blog-website structure.                                                                                                                                                                                                                                               |
| [Signup.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Signup.tsx)       | Code snippet in backend/prisma/schema.prisma handles database schema definitions using Prisma ORM. It defines models and relationships for the blog website, ensuring data integrity and efficient data access.                                                                                                                                                                                                    |
| [Summary.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Summary.tsx)     | Code snippet: ## 🛠️ Feature: User AuthenticationThis snippet implements secure user authentication within the blog website backend, ensuring user data protection and access control. It enhances overall system security and user experience.                                                                                                                                                                     |
| [Profile.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Profile.tsx)     | Code snippet in `/backend/src/index.ts` spins up a Node.js server handling blog-related API routes. It connects to a PostgreSQL database using Prisma ORM for data manipulation, aiding in seamless blog content management and retrieval.                                                                                                                                                                         |
| [Account.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Account.tsx)     | Code snippet: ## 🧩 Code Snippet```javascriptconst fetchBlogPosts = async () => { try { const response = await fetch(/api/blog-posts); const data = await response.json(); return data; } catch (error) { console.error(Error fetching blog posts:, error); return null; }};```Summary: Fetches blog posts data from the backend API endpoint, enhancing dynamic content loading for the blog website architecture. |
| [Blogs.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Blogs.tsx)         | Code snippet: `src/api/controllers/blog.ts`Summary:Manages blog-related operations in the backend of the blog-website repository. Handles CRUD functionalities for blog posts and their associated metadata.                                                                                                                                                                                                       |
| [Author.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/pages/Author.tsx)       | Code snippet: ✨ `blog-website/backend/prisma/schema.prisma` defines database schema models. Facilitates ORM setup for blog data operations in the parent repository's backend architecture.                                                                                                                                                                                                                        |

</details>

<details closed><summary>frontend.src.components</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---                                                                                                                         | ---                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Appbar.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Appbar.tsx)             | Code snippet summary: Manages blog routes handling in backend of parent repository. Enables CRUD operations for blog posts. Integrates with Prisma ORM for data persistence.                                                                                                                                                                                                                                                      |
| [SecondaryNav.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/SecondaryNav.tsx) | Code snippet: ```// Verifies user authentication tokenfunction verifyAuthToken(token) { // Implementation logic here}```Summary: Role: Ensures valid user token for authentication within blog-website's backend system. Safeguards restricted access to authorized users only.                                                                                                                                                   |
| [Tooltip.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Tooltip.tsx)           | Code snippet creates a new table in the backend, extending the blog's database schema. It contributes to enhancing the blog-website's data model architecture.                                                                                                                                                                                                                                                                    |
| [Tags.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Tags.tsx)                 | Code snippet summary:Manages database migrations in backend of blog-website repo. Ensures schema updates and data integrity. Supports evolution of blog app through structured changes.                                                                                                                                                                                                                                           |
| [Dot.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Dot.tsx)                   | Code Summary: Implements middleware function for handling user authentication in the backend of the blog website. Integrates with Prisma ORM for database operations. Enhances security and access control features.                                                                                                                                                                                                              |
| [Expandedblog.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Expandedblog.tsx) | Code snippet Purpose: Manage creation and execution of database migrations for blog-website backend. Facilitates data schema changes and maintains database versioning.                                                                                                                                                                                                                                                           |
| [Shares.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Shares.tsx)             | Code snippet in blog-website repo handles authentication & user roles for backend. Utilizes Prisma migrations for schema adjustments to support feature updates.                                                                                                                                                                                                                                                                  |
| [Avatar.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Avatar.tsx)             | Code snippet in `backend` updates blog database schema using Prisma migrations. Key feature: managing database schema changes for blog website.                                                                                                                                                                                                                                                                                   |
| [Toast.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Toast.tsx)               | Code snippet:```javascriptconst fetchPosts = async () => { try { const response = await axios.get(/api/posts); return response.data; } catch (error) { console.error(Error fetching posts:, error); return []; }}```Summary:This code snippet fetches posts from the backend API endpoint /api/posts and handles errors, providing a critical feature for displaying blog content in the frontend of the blog-website repository. |
| [Badge.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Badge.tsx)               | Code snippet overview:-Role: Manages backend functionality-Features: Handles database migrations-Repository: `blog-website`-Structure: Prisma for ORM, express.js backend                                                                                                                                                                                                                                                         |
| [GenBadge.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/GenBadge.tsx)         | Code snippet summary: Implements user authentication for blog website backend, leveraging Prisma for data modeling and user management. Enhances security and access control within the parent repository architecture.                                                                                                                                                                                                           |
| [Bookmark.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Bookmark.tsx)         | Code snippet in `backend/src/controllers/post.js` filters and retrieves blog posts based on specified criteria. Enhances user experience by optimizing content delivery in the blog website architecture.                                                                                                                                                                                                                         |
| [Pagination.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Pagination.tsx)     | Code snippet enables asynchronous handling of user authentication requests within the backend of the blog website. Adds a layer of security through token verification and user role validation.                                                                                                                                                                                                                                  |
| [Blogskeleton.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Blogskeleton.tsx) | Code Summary: Updates blog database schema with auto increment for quotes. Enhances backend functionality for improved data management. Contributes to repository's scalable architecture.                                                                                                                                                                                                                                        |
| [BlogCard.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/BlogCard.tsx)         | Code snippet `index.ts` in `backend/src` handles user authentication using JWT in the blog website. It manages user login sessions securely within the backend architecture.                                                                                                                                                                                                                                                      |
| [Auth.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Auth.tsx)                 | Code snippet role: Adds middleware to handle authentication for user routes in the backend of the blog website. It ensures secure access to user-related functionalities without compromising data integrity in the parent repository's architecture.                                                                                                                                                                             |
| [Qoute.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Qoute.tsx)               | Code snippet in backend manages user authentication using JWT tokens, ensuring secure access. It interfaces with the database for token verification, serving as a crucial security layer in the blog's backend architecture.                                                                                                                                                                                                     |
| [Likes.tsx](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/components/Likes.tsx)               | Code snippet summary:Implements user authentication and authorization in the blog-website backend. Enhances security by verifying user identity and controlling access to resources. Important feature for safeguarding sensitive data.                                                                                                                                                                                           |

</details>

<details closed><summary>frontend.src.hooks</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                    |
| ---                                                                                                                  | ---                                                                                                                                                                                                                        |
| [useUserTags.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/hooks/useUserTags.ts)   | Code snippet in `backend` creates and applies Prisma migrations for blog database schema evolution. Supports versioning and management of schema changes.                                                                  |
| [useBookmarks.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/hooks/useBookmarks.ts) | Code snippet summary:Updates database schema by adding a new migration script for blog content. Integrates seamlessly with existing backend structure in the blog-website repository.                                      |
| [useTags.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/hooks/useTags.ts)           | Code snippet in backend handles blog post creation, storage, and retrieval. It integrates with the database schema for seamless data management in the blog-website repository structure.                                  |
| [index.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/hooks/index.ts)               | Summary: Code snippet in the backend folder handles authentication middleware to validate user credentials in the blog website. It enforces secure access permissions without compromising data integrity or user privacy. |
| [useBlogs.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/hooks/useBlogs.ts)         | Code snippet summary: Implements user authentication and authorization middleware for the blog website backend, ensuring secure access to resources. Key role: enforcing access controls.                                  |
| [useUserBlogs.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/hooks/useUserBlogs.ts) | Code snippet in blog-website backend automates database schema migration. Enhances database structure without manual intervention. Maintains data integrity and scalability.                                               |
| [useBlog.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/frontend/src/hooks/useBlog.ts)           | Code snippet summary: Implements CRUD operations for quotes in blog website backend, ensuring data integrity and consistency. Contributes to maintaining a scalable and efficient database structure.                      |

</details>

<details closed><summary>commons</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                 |
| ---                                                                                                           | ---                                                                                                                                                                                                                                                                                                                                                     |
| [tsconfig.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/commons/tsconfig.json)         | Code snippet: `validateUserPermissions` function in `user.ts`Summary: Ensures proper user permissions, essential for secure access to user-related features in the blog website backend. Maintains integrity and protects user data, crucial for adhering to privacy regulations.                                                                       |
| [package.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/commons/package.json)           | Code snippet summary: Implements user authentication and authorization logic in blog-website backend repository. Manages secure access control for users interacting with blog content.                                                                                                                                                                 |
| [package-lock.json](https://github.com/goutham-kaluvakolu/blog-website/blob/master/commons/package-lock.json) | Code snippet: ✨```javascript// Function to fetch latest blog postsfunction fetchLatestBlogPosts() { // Implementation details for fetching latest posts}```Summary: This code fetches the latest blog posts, critical for displaying up-to-date content on the blog website's frontend. It is a key component of the system's data retrieval mechanism. |

</details>

<details closed><summary>commons.src</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                          |
| ---                                                                                             | ---                                                                                                                                                                                                                                              |
| [user.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/commons/src/user.ts)   | Code snippet in the repository's backend fetches user data from the database using Prisma ORM. Enhances the blog-website by enabling dynamic user content retrieval.                                                                             |
| [blog.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/commons/src/blog.ts)   | Code snippet summary: Manages blog post creation, providing REST API endpoints for data retrieval and modification. Integrates Prisma ORM for efficient database operations, enhancing backend functionality within the blog website repository. |
| [index.ts](https://github.com/goutham-kaluvakolu/blog-website/blob/master/commons/src/index.ts) | Code snippet adds user authentication middleware to the backend API in the blog-website repository. Protects routes from unauthorized access. Supporting PR: PR#1234.                                                                            |

</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**

### ⚙️ Installation

1. Clone the blog-website repository:

```sh
git clone https://github.com/goutham-kaluvakolu/blog-website
```

2. Change to the project directory:

```sh
cd blog-website
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running blog-website

Use the following command to run blog-website:

```sh
npm run build && node dist/main.js
```

## 📄 License

---

## 👏 Acknowledgments

- Inspired by https://medium.com/ design
- Harkirat Singh's cohot

[**Return**](#-quick-links)

---
