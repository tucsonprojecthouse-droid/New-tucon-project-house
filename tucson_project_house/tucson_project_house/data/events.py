"""
data/events.py
--------------
This file is the site's ONLY source of event data right now.

Every event is a plain Python dictionary in the EVENTS list below.
To add, edit, or remove an event, just edit this list — nothing else
in the app needs to change.

WHEN YOU ADD A REAL DATABASE LATER:
Keep the two functions below (get_all_events, get_events_by_category)
with the exact same names and return shape. Swap the body of each
function to run a database query instead of reading the EVENTS list.
Every route and template that uses events calls these two functions,
so the rest of the app won't need to change at all.
"""

EVENTS = [
    {
        "id": 1,
        "name": "Fall Sessions: Live at TPH",
        "category": "music",  # one of: music, fashion, film
        "date": "2026-10-10",  # YYYY-MM-DD
        "time": "7:00 PM - 10:00 PM",
        "venue": "TBD - venue announced closer to date",
        "description": (
            "An intimate night of live sets from local Tucson artists, "
            "kicking off Tucson Project House's fall lineup."
        ),
        "rsvp_status": "Guest List Only",  # Guest List Only / Open / Sold Out
        "flyer_image": "/static/img/placeholder-event.jpg",
        "register_url": "#",
    },
]


def get_all_events():
    """Return every event, sorted by date (soonest first)."""
    return sorted(EVENTS, key=lambda e: e["date"])


def get_events_by_category(category: str):
    """Return only events matching a category ('music', 'fashion', 'film')."""
    if category == "all":
        return get_all_events()
    return [e for e in get_all_events() if e["category"] == category]


def get_event_by_id(event_id: int):
    """Return a single event by its id, or None if not found."""
    return next((e for e in EVENTS if e["id"] == event_id), None)
