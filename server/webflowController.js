export const getWebflowData = async (req, res) => {
  // Retrieve API URL and Token from environment variables
  const apiUrl =
    "https://api.webflow.com/v2/collections/665bd736fe353cccc2c89489/items";
  const apiToken =
    "Bearer 6e319b150e1ae1a1064c19c4cdf28c4723633f7f73ae5eca31ce177d79d12945";

  // Check if the necessary environment variables are defined
  if (!apiUrl || !apiToken) {
    const missingVar = !apiUrl ? "WEBFLOW_API_URL" : "WEBFLOW_API_TOKEN";
    console.error(`Error: ${missingVar} is not defined.`);
    return res.status(500).json({
      error: `${missingVar} is not defined.`,
    });
  }

  try {
    // Make a request to the Webflow API with the appropriate headers
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: apiToken,
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not OK (status code not in the range 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error fetching data from Webflow API: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    // Parse the JSON data from the response
    const data = await response.json();
    // Send the parsed data as the JSON response
    res.json(data);
  } catch (error) {
    // Log the error message to the console for debugging
    console.error("Error fetching data from Webflow API:", error.message);
    // Send a 500 Internal Server Error response with the error message
    res.status(500).json({ error: error.message });
  }
};
