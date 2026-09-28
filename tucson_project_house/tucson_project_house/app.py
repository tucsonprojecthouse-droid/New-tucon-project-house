"""
app.py
------
The Flask application factory. This file just wires everything together:
it creates the Flask app, loads config, and registers each "blueprint"
(a self-contained group of routes) from the routes/ folder.

Keeping this file tiny makes it easy to see the whole app at a glance,
and easy to add new sections later without touching existing code.
"""

from flask import Flask
from config import Config
from routes.main import main_bp
from routes.api_events import api_events_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Each blueprint is one "area" of the site / API.
    app.register_blueprint(main_bp)
    app.register_blueprint(api_events_bp)

    return app


# This lets you run `python app.py` locally for development.
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
