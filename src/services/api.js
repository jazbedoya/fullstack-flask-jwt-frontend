const API_URL = "http://127.0.0.1:5000/api";

// endpoint = "/orders", "/customers", etc
// options = { method, body }
export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL + endpoint, {
    method: options.method || "GET",   //  acepta POST
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      ...(options.headers || {})
    },
    body: options.body || null          //acepta body
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response.json();
}
