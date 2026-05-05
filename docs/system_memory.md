# Gastroshows: Technical & Conceptual Memory

## Project Overview
Gastroshows is a high-end administrative and customer-facing platform for managing "Secret Dining" experiences. It blends traditional Catalan gastronomy with a modern "Show" element.

## Tech Stack
- **Framework**: Next.js (App Router, Turbopack enabled).
- **Database**: PostgreSQL via Supabase.
- **ORM**: Prisma.
- **Auth**: NextAuth.js (Session-based).
- **Styling**: Vanilla CSS with CSS Variables and TailwindCSS for utilities.
- **Email**: Mailrelay SMTP integration.
- **AI**: Google Gemini Pro/Flash (integrated for the AI Assistant).

## Core Architecture
### 1. Public Site
- **Design System**: Dual-mode "Clandestino" (Dark/Gold) and "Revelado" (Light/Gold).
- **Navigation**: Minimalist with immersive blur transitions.
- **Key Modules**: Event browsing, gift card purchasing, and reservation booking.

### 2. Admin Panel (Gastroshows Console)
- **UI Paradigm**: Smartphone OS / Odoo inspired.
- **Navigation**: Centralized via a floating "ChefHat" button.
- **Real-time Availability**: Dynamic calculation based on live `Reservation` data, not manual counters. Satuday capacity is fixed at 80 (40 mid + 40 night).
- **Marketing Hub**: Workflow builder for automated communication sequences.

## Design DNA
- **Brand Color**: `#efb810` (Gold).
- **Typography**: Montserrat (Sans) and Cormorant Garamond (Serif).
- **Interactive Patterns**: 
    - **Growth-Hover**: Every button/link grows 50% (`scale(1.5)`) in 0.75s on hover.
    - **Explosion-Click**: Interactive elements trigger a visual "explosion" effect (expanding ghosting) upon click (`:active`).
    - **Floating Console**: Persistent circular toggles (40px) for Theme and Demo mode in the TopBar.
    - **Smart Pagination (Odoo-style)**: List views implement a range-based pagination (`offset`/`limit` in URL). The range text (e.g., "1-25") is editable to allow manual jump to any specific record range (e.g., "5-40").

## Data Model (Simplified)
- **Event**: Defines the date, type, and base capacity.
- **Reservation**: Linked to an event, tracks guest count and status.
- **Settings**: Key-value store for global configurations (e.g., `demo_mode`).
- **Automation**: Workflows for email dispatch based on triggers.

## AI Assistant Integration
- **Function**: Natural language interface to modify the application.
- **Mechanism**: Gemini-driven tool-calling that can edit code, update settings, or query data.
- **UI**: Smartphone-style chat with real-time feedback and GitHub PR integration for safe deployment.

## Future Vision (Roadmap)
- **Predictive Intelligence**: Custom models trained on historical reservation data to predict campaign success and KPI trends.
- **Full OS Experience**: Further evolution of the admin panel into a window-based or multi-tasking OS interface.

## AI Prompting Guidelines for this Repo
- **Precision**: Use pixels (px) and exact hex codes for UI requests.
- **Modularity**: Always maintain separation between the Public site and Admin panel.
- **Animation First**: Any new interactive element must inherit the Growth+Explosion pattern.
