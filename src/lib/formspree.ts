import { BookingData } from "./types";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export async function submitBookingToFormspree(data: BookingData): Promise<{ success: boolean; message: string }> {
  if (!FORMSPREE_ENDPOINT || !FORMSPREE_ENDPOINT.includes("formspree.io")) {
    console.error("Missing or invalid Formspree endpoint in .env.local");
    return {
      success: false,
      message: "Configuration error. Please contact the site administrator.",
    };
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "Service Type": data.serviceId,
        "Date": data.date,
        "Time": data.time,
        "Dog Name": data.dogName,
        "Dog Size": data.dogSize,
        "Dog Energy (1-5)": data.dogEnergy,
        "Special Notes": data.notes,
        "Client Name": data.clientName,
        "Client Phone": data.clientPhone,
        "Client Email": data.clientEmail,
        "_subject": `New Booking Request from ${data.clientName} for ${data.dogName}`,
      }),
    });

    if (response.ok) {
      return { success: true, message: "Request Received!" };
    } else {
      const errorData = await response.json().catch(() => null);
      console.error("Formspree Error:", errorData);
      return { success: false, message: "Submission failed. Please try again." };
    }
  } catch (error) {
    console.error("Network Error submitting to Formspree:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}