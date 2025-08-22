Express backend to handle **non-booking** communications:
- `POST /api/contact` – General enquiry email
- `POST /api/callback` – Request a phone callback
- `GET  /api/whatsapp-link` – Computed WhatsApp deep link and telephone URI

## Setup
1. Copy `.env.example` to `.env` and fill SMTP settings.
2. Install deps and run:
   ```bash
   npm i
   npm run dev