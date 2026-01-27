const API_URL = import.meta.env.VITE_API_URL;

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL + endpoint, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      ...(options.headers || {})
    },
    body: options.body || null
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response.json();
}
