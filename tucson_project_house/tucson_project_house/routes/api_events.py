"""
routes/api_events.py
---------------------
A small JSON API the calendar's JavaScript calls to get event data
without reloading the page. Keeping this separate from main.py means
the "page" routes and "data" routes never get tangled together.
"""

from flask import Blueprint, jsonify, request
from data.events import get_events_by_category, get_event_by_id

api_events_bp = Blueprint("api_events", __name__, url_prefix="/api")


@api_events_bp.route("/events")
def list_events():
    """GET /api/events?category=music|fashion|film|all"""
    category = request.args.get("category", "all")
    events = get_events_by_category(category)
    return jsonify(events)


@api_events_bp.route("/events/<int:event_id>")
def single_event(event_id):
    """GET /api/events/<id> — used by the detail modal."""
    event = get_event_by_id(event_id)
    if event is None:
        return jsonify({"error": "Event not found"}), 404
    return jsonify(event)
