# Next.js Starter Template 🚀

A Next.js starter template to help you build scalable, modern web applications. This template includes:

- **Authentication** via [NextAuth.js](https://next-auth.js.org/) with support for email/password and Google provider.
- **Database Integration**: Prisma ORM with PostgreSQL.
- **Code Quality Tools**: Prettier and ESLint pre-configured for consistent code formatting and linting.

---

## Features ✨

- **Authentication**: Email/password and Google provider integrated with NextAuth.js.
- **Prisma ORM**: Database integration with PostgreSQL.
- **Prettier**: Automatic code formatting.
- **ESLint**: Linting to ensure clean, error-free code.

---

## Prerequisites 🛠️

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/): Make sure you have a running PostgreSQL instance.
- [Prisma CLI](https://www.prisma.io/docs/getting-started) (Optional for Prisma setup)

---

## Getting Started 🏗️

### 1. Clone the Repository

```bash
git clone https://github.com/abhishek-shivale/nextjs-starter
cd nextjs-starter
```

### 2. Install Dependencies

Using pnpm:

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project and add the following values:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Authentication
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
```

> Replace placeholders with your own credentials:
> - For PostgreSQL: Set `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` to match your PostgreSQL setup.
> - For Google OAuth: Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the [Google Cloud Console](https://console.cloud.google.com/).

### 4. Set Up Prisma

Run the following command to generate the Prisma client and migrate the database:

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

This will apply any pending migrations to your PostgreSQL database and generate the Prisma client for querying the database.

### 5. Run the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Authentication Providers ⚙️

### Email and Password
- Users can sign up or log in using their email and password.

### Google
- Integrated via NextAuth.js. Make sure to configure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`.

---

## Prisma & PostgreSQL 🗄️

- The project uses Prisma ORM for interacting with a PostgreSQL database.
- Make sure your database is set up correctly and the `DATABASE_URL` in `.env.local` is configured.

---

## Linting and Formatting 🧹

### Run Prettier

```bash
pnpm prettier
```

### Run ESLint

```bash
pnpm lint
```

### Fix Lint Issues

```bash
pnpm lint:fix
```

---

## Contributing 🤝

Feel free to fork, submit issues, or create pull requests. Contributions are always welcome!

---

## License 📄

This project is licensed under the [MIT License](LICENSE).

