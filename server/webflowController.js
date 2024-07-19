export const getWebflowData = async (req, res) => {
  // Retrieve API URL and Token from environment variables
  const apiUrl = process.env.WEBFLOW_API_URL;
  const apiToken = process.env.WEBFLOW_API_TOKEN;

  // Check if the necessary environment variables are defined
  if (!apiUrl || !apiToken) {
    const missingVar = !apiUrl ? "WEBFLOW_API_URL" : "WEBFLOW_API_TOKEN";
    console.error(`Error: ${missingVar} is not defined.`);
    return res.status(500).json({
      error: `${missingVar} is not defined.`,
    });
  }

  console.log("API URL:", apiUrl); // Debug: Log API URL
  console.log("API Token:", apiToken);

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
