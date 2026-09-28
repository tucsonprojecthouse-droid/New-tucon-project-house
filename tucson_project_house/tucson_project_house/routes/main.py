"""
routes/main.py
---------------
Handles the main page(s) of the site — right now just the homepage.
Add new page routes here (e.g. an /about page) as separate functions.
"""

from flask import Blueprint, render_template, current_app
from data.events import get_all_events

main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def home():
    events = get_all_events()
    return render_template(
        "index.html",
        events=events,
        site_name=current_app.config["SITE_NAME"],
        contact_email=current_app.config["CONTACT_EMAIL"],
        instagram_url=current_app.config["INSTAGRAM_URL"],
        tiktok_url=current_app.config["TIKTOK_URL"],
        partners=current_app.config["PARTNERS"],
    )
