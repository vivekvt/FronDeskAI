# Agent Configuration

This folder contains the version-controlled source of truth for the ElevenLabs phone agent configuration. The actual live configuration lives on the ElevenLabs dashboard. Update it there whenever you change these files.

## Files

| File | Purpose |
|---|---|
| `instruction.md` | Full system prompt for the ElevenLabs agent |
| `tools.json` | Webhook tool schema to paste into ElevenLabs |

---

## Setup Guide

### 1. Create an ElevenLabs Conversational AI Agent

1. Go to [elevenlabs.io](https://elevenlabs.io) → **Conversational AI** → **Agents**
2. Click **Create Agent**
3. Choose a voice (e.g. Aria)

### 2. Set the System Prompt & Timezone

1. Open your agent → **Configuration** tab
2. Paste the full contents of `instruction.md` into the **System Prompt** field
3. Set the agent's **Timezone** to `America/Toronto`. This ensures `{{system__time}}` returns Eastern Time so Clara resolves relative dates ("tomorrow", "this Friday") correctly
4. Save

### 3. Add Webhook Tools

You need to add **two tools**. Add them one at a time via **Tools** tab → **Add Tool** → **Webhook**.

Each tool's full JSON schema is in `tools.json`. You can use those as a reference when filling in the ElevenLabs form.

#### Tool 1: `check_availability`
- **Name:** `check_availability`
- **URL:** `https://frondeskai-app.vercel.app/api/agent/check-availability`
- **Method:** `POST`
- **Parameters:** `appointmentDate` (string, required), date in YYYY-MM-DD format

Returns all open 30-minute slots for that day. Clara reads them back to the caller.

#### Tool 2: `book_appointment`
- **Name:** `book_appointment`
- **URL:** `https://frondeskai-app.vercel.app/api/agent/book-appointment`
- **Method:** `POST`
- **Parameters:** `session_id`, `customerPhone`, `customerName`, `service`, `appointmentDate`, `appointmentTime`, `notes`

Called only after the caller has confirmed their chosen time slot.

> **Tip:** If you redeploy to a different Vercel URL, update both URLs in `tools.json` and in the ElevenLabs dashboard.

### 4. Connect Your Twilio Phone Number

1. In your agent → **Telephony** tab
2. Click **Add Phone Number** → **Twilio**
3. Enter your Twilio Account SID, Auth Token, and the phone number you want to use
4. ElevenLabs handles the Twilio integration fully. No Twilio SDK is needed in this project

### 5. Test the Agent

- Use the **Test** button in the ElevenLabs dashboard to do a test call
- Or dial your Twilio number directly
- Check the **Dashboard** at `/dashboard` to see if the appointment was created in Firestore

