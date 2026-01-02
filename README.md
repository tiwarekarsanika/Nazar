# Project Nazar (नज़र) — E-commerce + Real-Time Observability

![Architecture Diagram](./NAZAR%20Architecture%20Diagram.png)

## Overview

Nazar is a fully containerized, production-ready e-commerce platform designed with real-time observability, scalability, and clean application layering as core principles.

The system streams every user interaction through Kafka, processes analytic workloads through Redis, stores structured data in Supabase, and exposes full-stack metrics through Prometheus and Grafana — all orchestrated via Docker Compose.

## Key Capabilities

- End-to-end containerized architecture (frontend, backend, infrastructure)
- Non-blocking API design using Kafka event streaming
- Real-time analytics powered by Redis
- Structured data storage using Supabase (PostgreSQL)
- Full observability pipeline (Prometheus + Grafana)
- Clear backend layering and modular folder structure
- Individual Docker containers for frontend and backend

---

## Architecture Summary

**Flow of interactions**

- User clicks, wishlist actions, and purchases are streamed into Kafka
- Kafka producers publish events; consumers process and push to Redis
- Redis stores optimized real-time analytic structures
- Supabase stores cart, wishlist, user data, and relational entities
- Prometheus scrapes:
  - API latency
  - Kafka consumer metrics
  - Redis internals
- Grafana visualizes application, business, and infrastructure insights

The architecture ensures that a single API request can trigger multiple downstream processes while maintaining stability under parallel load.

---

## Repository Structure

```
.
├── server
└── frontend
```

### `/server` — Node.js + Express (Dockerized)

Backend is designed using a layered architecture:

**1️⃣ Repository Layer**
- Direct database access (Supabase, Redis)
- Data persistence and retrieval logic

**2️⃣ Service Layer**
- Business logic
- Multiple repositories orchestrated per API
- Cross-service workflows

**3️⃣ Controller Layer**
- Handles request/response objects
- Validates and dispatches to services

**4️⃣ Routing Layer**
- API route definitions
- Mapping of endpoints to controllers

**Additional backend components**

- Kafka producer + consumer modules
- Redis interaction modules
- Supabase integration
- Prometheus metrics exposure

Everything runs inside a dedicated backend Docker container.

---

### `/frontend` — Next.js + Tailwind (Dockerized)

Tech stack:

- Next.js
- Tailwind CSS
- ShadCN UI components
- Axios for backend communication (stored in `/utils`)
- Zustand for global state management

Frontend runs as its own Docker container.

---

## Running Locally (Docker Compose)

Clone the repository:

```bash
git clone <your-repo-url>
cd nazar
```

Build and start all services:

```bash
docker compose up -d --build
```

This starts:

- Backend (Express)
- Frontend (Next.js)
- Kafka
- Redis
- Prometheus
- Grafana

---

## Deployment

The full system is deployed on DigitalOcean containers.

- **UI:** https://nazar.sanikat.tech  
- **Monitoring Dashboard:** https://lnkd.in/dwJr-h49

---

## Detailed Walkthrough

A full write-up of the architecture, design choices, and implementation details is available here:

https://lnkd.in/dEyAKVVZ

---

## Tech Stack

**Infrastructure**
- Docker / Docker Compose
- DigitalOcean
- Prometheus
- Grafana

**Backend**
- Node.js
- Express.js
- Kafka
- Redis
- Supabase (PostgreSQL)

**Frontend**
- Next.js
- Tailwind CSS
- ShadCN
- Zustand
- Axios

---

## Name Origin

**Nazar (नज़र)** — “to observe”  
Reflecting the project focus on real-time insight and system visibility.

---
