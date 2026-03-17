# FrontDeskAI

An AI-powered front desk voice agent that answers phone calls and books appointments in real time. Built with ElevenLabs, Twilio, Next.js, and Firebase.

**Live:** [frondeskai-app.vercel.app](https://frondeskai-app.vercel.app)

---

## How It Works

1. A customer calls the Twilio phone number **(867) 679-1431**
2. ElevenLabs voice agent (Clara) answers and collects name, service, and preferred date
3. Agent calls `/api/agent/check-availability` to fetch open slots for that day
4. Clara reads back available times, caller picks one
5. Agent calls `/api/agent/book-appointment` to confirm the booking
6. Appointment is saved to Firestore and appears live on the dashboard

---

## Stack

| Layer | Tech |
|---|---|
| Voice agent | ElevenLabs Conversational AI |
| Phone number | Twilio (connected via ElevenLabs Telephony) |
| Frontend + API | Next.js 16 (App Router) |
| Database | Firebase Firestore |
| UI | Tailwind CSS v4 + shadcn/ui |
| Hosting | Vercel |

---

## Project Structure

```
├── agents/
│   ├── instruction.md       # Agent system prompt (paste into ElevenLabs)
│   ├── tools.json           # Webhook tool schema (paste into ElevenLabs)
│   └── README.md            # ElevenLabs setup guide
├── app/
│   ├── page.tsx             # Landing page
│   ├── dashboard/
│   │   ├── page.tsx         # Appointments dashboard
│   │   └── settings/        # Business settings
│   └── api/agent/
│       ├── check-availability/ # Returns open slots for a given date
│       └── book-appointment/   # Books the appointment in Firestore
├── components/
│   ├── dashboard/           # Sidebar, header
│   └── appointments/        # Card + list components
├── lib/
│   ├── business-config.ts   # Hardcoded business config
│   ├── firebase.ts          # Firestore init
│   └── appointments-db.ts   # Firestore CRUD
└── hooks/
    └── use-appointments.ts  # Real-time Firestore listener
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your Firebase credentials
```

### 3. Run locally
```bash
npm run dev
```

### 4. Configure ElevenLabs
See [`agents/README.md`](agents/README.md) for the full setup guide.

---

## Environment Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Business Config

The business name, services, hours, and phone number are hardcoded in [`lib/business-config.ts`](lib/business-config.ts). Edit that file to change anything. The dashboard settings page and the agent instruction both pull from it.

---

*Built with Cursor for the Cursor Hackathon, Waterloo, ON 2026*
