import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/admin/web/google-reviews?placeId=...&minRating=...&sortBy=...
 * Fetches real reviews from Google Places API.
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get("placeId");
    const minRating = parseInt(searchParams.get("minRating") || "1");
    const sortBy = searchParams.get("sortBy") || "latest";

    if (!placeId) {
      return NextResponse.json({ ok: false, error: "Missing placeId" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      // For demonstration, if no API key is provided, return mock "real" reviews
      // In a real scenario, this would fail or use a fallback.
      return NextResponse.json({ 
        ok: true, 
        message: "API Key missing. Showing demo reviews.",
        data: [
          { name: "Google Local Guide", text: "Excelente servicio en este restaurante. Las vistas son increíbles.", rating: 5, date: "Hace 2 días", avatar: "https://lh3.googleusercontent.com/a-/ALV-EMjI..." },
          { name: "Foodie Traveler", text: "Buena comida pero un poco ruidoso. El postre fue lo mejor.", rating: 4, date: "Hace 1 semana", avatar: "https://lh3.googleusercontent.com/a-/ALV-EMjI..." }
        ]
      });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=es`;
    
    const res = await fetch(url);
    const json = await res.json();

    if (!json.result || !json.result.reviews) {
      return NextResponse.json({ ok: false, error: "No reviews found for this Place ID" }, { status: 404 });
    }

    let reviews = json.result.reviews.map((r: any) => ({
      name: r.author_name,
      text: r.text,
      rating: r.rating,
      date: r.relative_time_description,
      avatar: r.profile_photo_url
    }));

    // Filter by rating
    reviews = reviews.filter((r: any) => r.rating >= minRating);

    // Sort
    if (sortBy === "random") {
      reviews.sort(() => Math.random() - 0.5);
    } else {
      // Google returns latest by default usually, but we could add more logic here if we had timestamps
    }

    return NextResponse.json({ ok: true, data: reviews });
  } catch (err: any) {
    console.error("[api] GET /admin/web/google-reviews failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}
