export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  message: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

// In-memory fallback seeded with realistic bookings
let inMemoryBookings: Booking[] = [
  {
    id: "PRC-498210",
    name: "Marcus Vance",
    phone: "(425) 555-0144",
    email: "marcus@vancecorp.com",
    service: "Lawn Mowing & Edging",
    date: "2026-05-28",
    timeSlot: "Morning (8AM - 12PM)",
    message: "Corner lot, needs clean mechanical edging on the sidewalk.",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "PRC-719324",
    name: "Sarah Lindqvist",
    phone: "(425) 555-9876",
    email: "sarah.lindqvist@outlook.com",
    service: "Driveway & Patio Jet Wash",
    date: "2026-05-29",
    timeSlot: "Afternoon (1PM - 5PM)",
    message: "Heavy moss on the brick patio path. Needs pre-treatment.",
    status: "Pending",
    createdAt: new Date().toISOString()
  },
  {
    id: "PRC-281045",
    name: "David K. Mercer",
    phone: "(425) 555-1234",
    email: "d.mercer@gmail.com",
    service: "Hedge Trimming & Shaping",
    date: "2026-06-01",
    timeSlot: "Morning (8AM - 12PM)",
    message: "Arborvitae hedge shaping, about 8 feet tall.",
    status: "Pending",
    createdAt: new Date().toISOString()
  }
];

export async function getBookings(): Promise<{ bookings: Booking[]; isFallback: boolean }> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(`${url}/get/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          const parsed = JSON.parse(data.result);
          if (Array.isArray(parsed)) {
            return { bookings: parsed, isFallback: false };
          }
        }
      }
    } catch (e) {
      console.error("KV fetch error, using fallback:", e);
    }
  }

  // Fallback to in-memory list
  return { bookings: inMemoryBookings, isFallback: true };
}

export async function saveBookings(bookings: Booking[]): Promise<boolean> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(`${url}/set/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(JSON.stringify(bookings))
      });
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.error("KV save error:", e);
    }
  }

  inMemoryBookings = bookings;
  return false;
}
