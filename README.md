# Librarte

This application allow users to exchange books with each other. The project aims to promote reading and the sharing of knowledge through books with ease. Librarte is a modern and accessible solution for book lovers, allowing them to expand their personal libraries without the need to spend large sums of money on new books. By promoting circular economy and sustainability, the project contributes to waste reduction and the appreciation of a sharing culture.

**disclaimer**: This project is under development.

## Tech stack

Frontend:
- React
- Tailwindcss
- Next

Backend:
- Nestjs
- Prisma
- MySQL

## Getting started

To launch the application easier, make sure to have Docker Desktop installed on your machine, it will avoid versioning conflicts. Otherwise, go to the next section (without docker).

### With docker

1° - Launch a terminal inside a empty folder

2° - Clone the repository:
```sh
git clone https://github.com/DavidEsdrs/librarte.git .

```
3° - Compose the app:
```sh
docker compose up
```
After some tries there will be 4 containers running, nginx, app, client and db.
Go to localhost:80 and enjoy 😄