"""
config.py
---------
All site-wide settings live here in one place, so you never have to hunt
through the codebase to change something like the contact email.

When you add a database later, its connection string (DATABASE_URL) also
belongs here.
"""

import os


class Config:
    # General site info — shown in the footer / contact section.
    SITE_NAME = "Tucson Project House"
    CONTACT_EMAIL = "tucsonprojecthouse@gmail.com"
    INSTAGRAM_URL = "https://instagram.com/tucsonprojecthouse"
    TIKTOK_URL = "https://tiktok.com/@tucsonprojecthouse"

    # Partners & Sponsors shown in the logo strip.
    PARTNERS = [
        "ZULE'S ENTERPRISE",
        "SONORA PRESS",
        "4TH AVE SUPPLY",
        "DESERT TAPE CO.",
        "BARRIO SOUND",
        "RAILA",
    ]

    # Placeholder for a future database connection, e.g.:
    # DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///tph.db")
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-change-me")
