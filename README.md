# Webhead Calendar — frontend

A comic-inspired private calendar interface built with React 18, Vite, React Router, and custom CSS. It includes five switchable themes, calendar navigation, private notes, note editing, and signup, login, and OTP screens.

## Run the frontend

```sh
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173`. Set `VITE_API_URL` in `.env.local` if the API is hosted elsewhere. The default is `http://localhost:8080/api`.

The UI expects the API routes described in the supplied specification: `/auth/signup`, `/auth/verify-otp`, `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/resend-otp`, and `/notes`. Refresh uses the server's httpOnly cookie; access tokens stay in React memory. Guests see no notes.

This folder is frontend only. The Spring Boot service and PostgreSQL setup are not included in this pass.
"# aven_calendar" 
