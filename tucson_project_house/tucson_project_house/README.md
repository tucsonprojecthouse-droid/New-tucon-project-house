# Tucson Project House — Website

A small Flask (Python) website for Tucson Project House: music, fashion,
and film events, with an interactive events calendar.

## Project structure

```
tucson_project_house/
├── app.py                  # Creates the Flask app, registers routes
├── config.py                # Site-wide settings (contact email, partners, etc.)
├── requirements.txt
├── vercel.json               # Vercel hosting config
├── api/
│   └── index.py              # Entry point Vercel uses to run the app
├── routes/
│   ├── main.py                # Homepage route
│   └── api_events.py          # JSON API the calendar JS calls
├── data/
│   └── events.py              # All event data lives here (swap for a DB later)
├── templates/
│   ├── base.html
│   ├── index.html
│   └── components/            # One small HTML file per section/button
├── static/
│   ├── css/                   # One small CSS file per section
│   └── js/                    # One small JS file per interactive piece
```

Each button, section, and behavior lives in its own small file, so you
(or Claude, later) can find and change one thing without touching
anything else.

## Running it locally

1. Install Python 3.10+ if you don't have it.
2. Open a terminal in this folder and run:
   ```
   pip install -r requirements.txt
   python app.py
   ```
3. Open **http://localhost:5000** in your browser.

## Adding/editing events

Open `data/events.py` and edit the `EVENTS` list — each event is a
dictionary with a name, category (`music`/`fashion`/`film`), date, time,
venue, description, RSVP status, flyer image path, and register link.
No other file needs to change.

---

## Hosting it online

You mentioned GitHub + Vercel, or Hostinger — steps for both below.
**Vercel is the easier and recommended path** for a Python/Flask site
like this one.

### Option A: GitHub + Vercel (recommended)

**Step 1 — Push the code to GitHub**
1. Create a new repository on GitHub (e.g. `tucson-project-house`).
2. In this project folder, run:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tucson-project-house.git
   git push -u origin main
   ```

**Step 2 — Import the project into Vercel**
1. Go to https://vercel.com and sign in (you can sign in with your GitHub account).
2. Click **"Add New..." → "Project"**.
3. Select your `tucson-project-house` GitHub repo and click **Import**.
4. Vercel should auto-detect it as a Python project because of `vercel.json`.
   Leave the default settings and click **Deploy**.
5. After a minute, Vercel gives you a live URL like
   `https://tucson-project-house.vercel.app` — that's your live site.

**Step 3 — Future updates**
Any time you push new commits to the `main` branch on GitHub, Vercel
automatically redeploys the site. No extra steps needed.

**Step 4 — Custom domain (optional)**
In your Vercel project, go to **Settings → Domains** and add your own
domain (e.g. tucsonprojecthouse.com), then follow Vercel's instructions
to update your domain's DNS records at your domain registrar.

### Option B: Hostinger

Hostinger's shared hosting is built mainly for PHP, but their **Business/
Cloud plans** support Python apps through hPanel:

1. Log into hPanel → find **"Setup Python App"** (under the Advanced/Website section).
2. Click **Create Application**, choose a Python version (3.10+), and point
   the application root to the folder where you'll upload this project.
3. Upload all the project files via the **File Manager** or FTP (an FTP
   client like FileZilla works well for this).
4. In the Python app setup, set the **Startup file** to `app.py` and the
   **Entry point / callable** to `app` (matching the Flask app object).
5. In the Python app's shell/terminal option, run:
   ```
   pip install -r requirements.txt
   ```
6. Restart the app from hPanel. Hostinger will give you the URL (or connect
   it to your domain if you've pointed one at this hosting account).

If Hostinger's Python support gives you trouble, GitHub + Vercel is the
simpler, more reliable option for this kind of site.

---

## Connecting a real database later

Right now, all event data lives in `data/events.py` as a plain Python
list. When you're ready for a real database:

1. Pick a database. Two easy options that work well with Vercel:
   - **Postgres** via [Neon](https://neon.tech) or [Vercel Postgres](https://vercel.com/storage/postgres) (both have free tiers)
2. Add the connection string to `config.py` as `DATABASE_URL`.
3. Install a database library, e.g. `pip install psycopg2-binary SQLAlchemy`
   and add it to `requirements.txt`.
4. In `data/events.py`, replace the body of `get_all_events()` and
   `get_events_by_category()` with real database queries — keep the
   function names and the shape of the data they return the same, so
   nothing else in the app needs to change.

No other file — not the routes, not the templates, not the JavaScript —
needs to change when you make this switch.
