export async function generatePitch({ industry, ideaDescription, targetAudience }) {
  const response = await fetch("/.netlify/functions/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ industry, ideaDescription, targetAudience })
  });
  if (!response.ok) throw new Error("Claude API error");
  return await response.json();
}