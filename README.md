# Nuxt Task Tracker

Современный Fullstack Kanban-трекер задач, построенный на экосистеме Nuxt 3. Проект демонстрирует реализацию SSR приложения с авторизацией, управлением состоянием и интеграцией с реляционной базой данных.

## Основные возможности

* **Fullstack Auth:** Регистрация и авторизация пользователей (Sidebase Auth + Prisma).
* **Kanban Board:** Интерактивное управление задачами с Drag-and-Drop (vuedraggable).
* **Personal Space:** Каждый пользователь видит и управляет только своими задачами.
* **Persistence:** Хранение данных в SQLite через Prisma ORM.
* **Modern UI:** Адаптивный интерфейс на Tailwind CSS с использованием Lucide иконок.
* **State Management:** Использование Pinia для реактивного управления данными на фронтенде.

## Стек технологий

* **Frontend:** [Nuxt 3](https://nuxt.com/), [Vue 3](https://vuejs.org/), [Pinia](https://pinia.vuejs.org/), [Tailwind CSS](https://tailwindcss.com/).
* **Backend:** [Nitro](https://nitro.unjs.io/) (Server Engine), [Prisma ORM](https://www.prisma.io/).
* **Database:** SQLite.
* **Auth:** [Sidebase Auth](https://sidebase.io/nuxt-auth) (NextAuth.js engine).

## Быстрый старт

1. **Клонируйте репозиторий:**
   ```
   git clone [https://github.com/Raven-Vitos/NuxtTaskTracker.git](https://github.com/Raven-Vitos/NuxtTaskTracker.git)
   cd NuxtTaskTracker
   ```

2. **Установите зависимости:**
   ```
   npm install
   ```

3. **Настройте базу данных:**
   ```
   npx prisma migrate dev --name init
   ```

4. **Запустите проект в режиме разработки:**
   ```
   npm run dev
   ```

## Архитектура приложения

- `server/api/`: API-эндпоинты для задач и аутентификации.
- `server/utils/`: Конфигурация клиента Prisma.
- `stores/`: Глобальное состояние приложения (Pinia).
- `app/pages/`: Маршрутизация и бизнес-логика страниц.
- `prisma/`: Схема базы данных и миграции.