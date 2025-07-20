import React from "react";
export default function Form({
  industry, setIndustry,
  ideaDescription, setIdeaDescription,
  targetAudience, setTargetAudience,
  error
}) {
  return (
    <div className="card card-padding w-full max-w-2xl mx-auto" id="pitchform">
      <form className="flex flex-col space-y-6 relative z-10">
        <div>
          <label className="block text-white font-medium mb-2">Industry</label>
          <input
            type="text"
            placeholder="Fintech"
            className="input-border w-full"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Idea Description</label>
            <input
              type="text"
              placeholder="A platform for managing personal finances"
              className="input-border w-full"
              value={ideaDescription}
              onChange={e => setIdeaDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Target Audience</label>
            <input
              type="text"
              placeholder="Young professionals"
              className="input-border w-full"
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="text-pink-400 text-center mt-2">{error}</div>}
      </form>
    </div>
  );
}