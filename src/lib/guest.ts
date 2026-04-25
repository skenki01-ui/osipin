export function getGuestId(): string {
  let guestId = localStorage.getItem("guest_id");

  if (!guestId) {
    guestId =
      "guest_" +
      Math.random().toString(36).slice(2) +
      "_" +
      Date.now().toString(36);

    localStorage.setItem("guest_id", guestId);
  }

  return guestId;
}