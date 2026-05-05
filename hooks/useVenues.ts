"use client";

import { useEffect, useState } from "react";

export type VenueOption = { id: string; name: string; capacity: number };

export function useVenues() {
  const [venues, setVenues] = useState<VenueOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/venues")
      .then((r) => r.json())
      .then((json) => {
        if (json.ok) setVenues(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { venues, loading };
}
