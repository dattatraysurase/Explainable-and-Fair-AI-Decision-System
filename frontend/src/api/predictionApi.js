const API_URL = `${import.meta.env.VITE_API_URL}/predictions`

export const predictLoan = async (data, token) => {
  const response = await fetch(
    `${API_URL}/predict`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Prediction failed"
    );
  }

  return result;
};


export const getPredictions = async (token) => {
  const response = await fetch(
    API_URL,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch predictions"
    );
  }

  return result;
};


// Get specific prediction by ID
export const getPredictionById = async (id, token) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch prediction"
    )
  }

  return result
}