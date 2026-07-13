from datetime import datetime
from email.utils import parsedate_to_datetime

import feedparser
import requests

DOE_FEED_URL = "https://www.energy.gov/rss/energygov/2193718"
ACTIVITY_API_URL = "http://127.0.0.1:8000/activity"


def format_date(published_date: str) -> str | None:
    """Convert an RSS date into YYYY-MM-DD format."""
    if not published_date:
        return None

    try:
        parsed_date = parsedate_to_datetime(published_date)
        return parsed_date.date().isoformat()
    except (TypeError, ValueError):
        return None


def activity_already_exists(source_url: str) -> bool:
    """Check whether this source URL is already stored in the database."""
    response = requests.get(ACTIVITY_API_URL, timeout=15)
    response.raise_for_status()

    existing_activities = response.json()

    return any(
        activity.get("source_url") == source_url
        for activity in existing_activities
    )


def add_activity(entry: dict) -> None:
    """Send one DOE RSS entry to the FastAPI activity endpoint."""
    source_url = entry.get("link", "").strip()

    if not source_url:
        print("Skipped entry without a source URL.")
        return

    if activity_already_exists(source_url):
        print(f"Skipped duplicate: {entry.get('title', 'Untitled')}")
        return

    activity_data = {
        "agency": "DOE",
        "title": entry.get("title", "Untitled DOE update").strip(),
        "category": "Federal",
        "date": format_date(entry.get("published", "")),
        "source_url": source_url,
        "summary": entry.get("summary", "").strip(),
    }

    response = requests.post(
        ACTIVITY_API_URL,
        json=activity_data,
        timeout=15,
    )

    response.raise_for_status()

    created_activity = response.json()

    print(
        f"Added record {created_activity['id']}: "
        f"{created_activity['title']}"
    )


def run_scraper(limit: int = 5) -> None:
    """Read the DOE RSS feed and add the newest entries."""
    feed = feedparser.parse(DOE_FEED_URL)

    if feed.bozo:
        raise RuntimeError(f"DOE feed could not be parsed: {feed.bozo_exception}")

    entries = feed.entries[:limit]

    if not entries:
        print("No DOE entries were found.")
        return

    print(f"Found {len(entries)} DOE entries.")

    for entry in entries:
        try:
            add_activity(entry)
        except requests.RequestException as error:
            print(f"Could not add {entry.get('title', 'entry')}: {error}")


if __name__ == "__main__":
    print(f"DOE scraper started at {datetime.now().isoformat(timespec='seconds')}")
    run_scraper(limit=5)