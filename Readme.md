# Ecommerce (Portfolio)

> **MERN + TypeScript e‑commerce app:-** Clean architecture, typed everywhere, and focused on real‑world flows: auth, 
> CRUD, cart, checkout, and an admin panel.

<br/>

## Demo

> **Live demo:** https://aplamart.shop

<br/>

## Table of contents

* [What this is](#what-this-is)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Architecture overview](#architecture-overview)
* [Quick start (dev)](#quick-start-dev)
* [Environment variables](#environment-variables)
* [Seed admin](#seed-admin)
* [Scripts you should have](#scripts-you-should-have)
* [Deployment](#deployment)
* [Docker (optional)](#docker-optional)
* [Testing & CI](#testing--ci)
* [Security notes](#security-notes)
* [Folder structure](#folder-structure)
* [Design decisions & tradeoffs](#design-decisions--tradeoffs)
* [Challenges I solved](#challenges-i-solved)
* [What I Learned](#what-i-learned)
* [Future work](#future-work)
* [Contributing](#contributing)
* [Contact](#contact)
* [License](#license)

---

## What this is

This repo is a complete e‑commerce application intended to be a portfolio item. It's focused on clarity, correctness, 
and a few production‑grade features.

It contains three top-level workspaces:

* `client` — React + TypeScript frontend
* `server` — Node + Express (TypeScript) backend with REST
* `common` — shared types, interfaces, helpers (used by both client & server)

---

## Features

* **User Auth:** Registration, login, and JWT-based sessions (access + refresh tokens).
* **Role-based Access:** Customers and admin user roles to interact with the application. Customers can shop, manage their own addresses, and view their own orders. Admins can be a customer plus: can view statistics, add and edit products, view and manage all orders and payments, view and manage all customers, upload and delete media, look for customer queries and disputes.
* **Product Listing:** Search, Categories, and Pagination.
* **Product Page:** A product details page featuring gallery, cart actions, reviews, and related products.
* **Cart:** Users can add/remove products from the cart and update the quantity.
* **Checkout Flow:** User adds products to the cart → Selects a shipping address → Confirms order items → Pays for the order and completes the checkout.
* **Media Management:** A media management feature for admin to upload and reuse media in multiple places. This eliminates the need for uploading the same media multiple times and increasing the storage.
* **Profile Page:** A my account page to view orders, manage addresses, update account info and profile picture, and update password.
* **Image Upload:** Client → Server (Multer) → Cloudinary.
* **Validation:** Input forms and server requests are strictly validated using Zod.
* **Admin Seed:** A seeder function to create the super admin when the application is deployed.

---

## Tech stack

* **Frontend:** TypeScript, React.js, Vite, React Router 7.0, Redux ToolKit.
* **Backend:** Node.js (TypeScript), Express 5.x, Mongoose 8.x.
* **Database:** MongoDB (Community edition).
* **Authentication:** Cookie-based JWT (access + refresh) tokens.
* **Payments:** PayPal sandbox.
* **Media Storage:** Cloudinary.

---

## Architecture overview

```
  [Browser / Client] ---- [PayPal]
         |
         |  HTTPS REST API
         v
     [Server (Express)]
      /       \
     /         \
[MongoDB] [Cloudinary]
```

---

## Quick start (dev)

```bash
# 1) Clone
git clone https://github.com/imstoicbtw/ecommerce.git
cd ecommerce

# 2) Server setup
cd server
npm install
nano .env

# 3) Client setup
cd ../client
npm install

# 4) Common setup
cd ../common
npm install

# 5) Build
cd ..
npm run build

# 6) Seed admin
cd ./server 
node ./dist/seeder seedAdmin

# 7) Run dev environment
cd ..
npm run dev
```

Visit: `http://localhost:3000`

---

## Environment variables

**server/.env:**

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
ACCESS_TOKEN_SECRET=Some_Random_String
REFRESH_TOKEN_SECRET=Some_Random_String
CLOUDINARY_KEY=YOUR_CLOUDINARY_KEY
CLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
```

---

## Seed data

Demo account:

```
email: admin@mail.com
password: Admin#3
```

---

## Folder structure

```
/ (root)
├─ client/      # React app
├─ server/      # Express API
├─ common/      # Shared types
└─ README.md
```

---

## What I Learned

### TypeScript
* Learned basic data typing + generics.
* Strong typing gave me confidence across client and server.
* Reduced runtime bugs and helped me understand the code better.
* The typing doesn't follow industry standards, but I am leaning and understanding TypeScript more and more.
### Zod Validation
* Build form validations and server-side request validators.
* Stopped invalid inputs before hitting the database.
* Centralized validation helped me connect frontend and backend better.
### Aggregation Pipelines
* Learned how to write aggregated pipelines for effectively and efficiently query the database.
* Used it to build advanced queries for products and categories.
* Realized aggregation can replace multiple roundtrips with single optimized query.
### Express Middlewares
* Created multiple new middlewares for authentication, validation, image upload, and global error handling.
### Hybrid Authentication
* Implemented JWT and cookies for access + refresh tokens.
* Learned management and retrieval of the session.
### Cloudinary
Integrated image uploads + destroy to Cloudinary.
Read about transformations on the fly.
Stored secured URLs in MongoDB instead of large binary data.

---

## Contributing

This is mainly a personal portfolio project, but feel free to clone, open issues, or PRs.

---

## Contact

* LinkedIn: https://linkedin.com/in/isufiyanmalik
* Email: `whosufiyanmalik@gmail.com`

---

## License

MIT License
