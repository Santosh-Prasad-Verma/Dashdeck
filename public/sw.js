// Service Worker placeholder
// This file prevents 404 errors in development
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
