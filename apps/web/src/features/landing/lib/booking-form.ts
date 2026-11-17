export function validateBookingFields(fields: { location: string; date: string; time: string }) {
  return {
    ...(!fields.location.trim() && { location: "Enter a location in Lagos." }),
    ...(!fields.date && { date: "Choose a flight date." }),
    ...(!fields.time && { time: "Choose a flight time." }),
  };
}
