"""
TerraQuant AI - Leaderboard Service
Sustainability rankings
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List


DATA_FILE = Path(__file__).parent / "data" / "leaderboard.json"


def _normalize_entry(entry: Dict[str, Any], fallback_rank: int) -> Dict[str, Any]:
    score = float(entry.get("score", 0))
    reduction = float(entry.get("reduction", 0))
    verified = bool(entry.get("verified", False))

    return {
        "rank": int(entry.get("rank", fallback_rank)),
        "company": entry.get("company", "Unknown Company"),
        "score": round(score, 1),
        "reduction": round(reduction, 1),
        "industry": entry.get("industry", "Unknown"),
        "verified": verified,
        "verification_status": "verified" if verified else "unverified",
        "source_name": entry.get("source_name", "Internal demo dataset" if not verified else "Public filing"),
        "source_url": entry.get("source_url", ""),
        "last_updated": entry.get("last_updated", ""),
        "notes": entry.get("notes", ""),
    }


def _sort_and_rank(entries: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    sorted_entries = sorted(
        entries,
        key=lambda item: (
            not bool(item.get("verified", False)),
            -float(item.get("score", 0)),
            -float(item.get("reduction", 0)),
            str(item.get("company", "")),
        ),
    )

    ranked_entries = []
    for index, entry in enumerate(sorted_entries, start=1):
        normalized = _normalize_entry(entry, index)
        normalized["rank"] = index
        ranked_entries.append(normalized)
    return ranked_entries


def _load_data_file() -> List[Dict[str, Any]]:
    if not DATA_FILE.exists():
        return []

    try:
        with DATA_FILE.open("r", encoding="utf-8") as file_handle:
            payload = json.load(file_handle)
        if isinstance(payload, list):
            return [entry for entry in payload if isinstance(entry, dict)]
        if isinstance(payload, dict):
            entries = payload.get("leaderboard", [])
            if isinstance(entries, list):
                return [entry for entry in entries if isinstance(entry, dict)]
    except Exception:
        return []

    return []


def _demo_entries() -> List[Dict[str, Any]]:
    return [
        {
            "company": "GreenTech Corp",
            "score": 95.8,
            "reduction": 32.5,
            "industry": "Technology",
            "verified": False,
            "source_name": "Demo dataset",
            "notes": "Replace with audited company ESG or emissions data.",
        },
        {
            "company": "EcoSolutions Ltd",
            "score": 92.3,
            "reduction": 28.7,
            "industry": "Manufacturing",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "Carbon Zero Inc",
            "score": 89.5,
            "reduction": 25.3,
            "industry": "Energy",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "Sustainable Ventures",
            "score": 86.1,
            "reduction": 22.8,
            "industry": "Retail",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "Clean Energy Co",
            "score": 84.7,
            "reduction": 20.5,
            "industry": "Transportation",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "Earth First Global",
            "score": 82.3,
            "reduction": 18.9,
            "industry": "Finance",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "Green Horizon",
            "score": 79.8,
            "reduction": 16.4,
            "industry": "Healthcare",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "EcoTech Systems",
            "score": 77.2,
            "reduction": 14.7,
            "industry": "Technology",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "Net Zero Partners",
            "score": 74.5,
            "reduction": 12.3,
            "industry": "Manufacturing",
            "verified": False,
            "source_name": "Demo dataset",
        },
        {
            "company": "Climate Champions",
            "score": 71.9,
            "reduction": 10.8,
            "industry": "Agriculture",
            "verified": False,
            "source_name": "Demo dataset",
        },
    ]

def get_leaderboard_data():
    """Get sustainability leaderboard.

    The service prefers verified records from backend/data/leaderboard.json.
    If no source file is available yet, it returns demo records marked as unverified.
    """
    records = _load_data_file()
    if not records:
        records = _demo_entries()

    ranked_entries = _sort_and_rank(records)
    verified_count = sum(1 for entry in ranked_entries if entry["verified"])

    return {
        "leaderboard": ranked_entries,
        "summary": {
            "total": len(ranked_entries),
            "verified": verified_count,
            "unverified": len(ranked_entries) - verified_count,
            "source": "backend/data/leaderboard.json" if DATA_FILE.exists() else "demo fallback",
        },
    }
