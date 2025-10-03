const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.log("JSON parse error:", err);
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { industry, ideaDescription, targetAudience } = body;

  const prompt = `
You are a startup pitch generator. Please return ONLY a JSON object, no text outside the JSON.
Keys must use camelCase: startupName, oneLiner, elevatorPitch, keyFeatures, mvpRoadmap.

Instructions:
- Use a professional, but engaging tone.
- Each section must be concise, but highlight what makes the idea unique and valuable.
- For keyFeatures and mvpRoadmap, use short bullet points (1 phrase per bullet, max 5 per list).
- Avoid generic buzzwords like “revolutionary”, “disruptive”, unless absolutely justified.
- ElevatorPitch must be max 3 sentences, focused on the product and its benefits.
- Use real, concrete examples if possible.

Inputs:
Industry: ${industry}
Idea: ${ideaDescription}
Target Audience: ${targetAudience}

Return ONLY the JSON object, nothing else.
`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 700,
        temperature: 0.6,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    let rawText = data.content[0].text;
    let jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log("Claude nu a returnat niciun JSON valid. Raw:", rawText);
      return { statusCode: 500, body: "Claude did not return valid JSON" };
    }

    let pitch;
    try {
      pitch = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.log("Claude JSON parse error:", err, "Raw JSON:", jsonMatch[0]);
      return { statusCode: 500, body: "Claude did not return valid JSON" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(pitch)
    };
  } catch (error) {
    console.log("Claude error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }

};
