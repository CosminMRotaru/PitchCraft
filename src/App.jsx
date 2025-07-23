import { useRef, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Form from "./components/Form";
import PitchOutput from "./components/PitchOutput";
import { generatePitch } from "./api/claude";

export default function App() {
    const [pitch, setPitch] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const [industry, setIndustry] = useState("");
    const [ideaDescription, setIdeaDescription] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const endOfOutputRef = useRef(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("pitchcraft-history") || "[]");
        setHistory(saved);
    }, []);

    useEffect(() => {
        if (pitch && endOfOutputRef.current) {
            endOfOutputRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [pitch]);

    const handlePitch = (newPitch) => {
        setPitch(newPitch);
        const pitchWithDate = { ...newPitch, date: new Date().toISOString() };
        const updated = [pitchWithDate, ...history];
        setHistory(updated);
        localStorage.setItem("pitchcraft-history", JSON.stringify(updated));
    };

    const shakeForm = () => {
        const form = document.getElementById("pitchform");
        if (form) {
            form.classList.add("shake-anim");
            setTimeout(() => form.classList.remove("shake-anim"), 600);
        }
    };

    const handleGenerate = async () => {
        if (!industry.trim() || !ideaDescription.trim() || !targetAudience.trim()) {
            shakeForm();
            return;
        }
        setLoading(true);
        setError("");
        try {
            const newPitch = await generatePitch({ industry, ideaDescription, targetAudience });
            handlePitch(newPitch);
        } catch {
            setError("Generation failed. Try again.");
        }
        setLoading(false);
    };

    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem("pitchcraft-history");
    };

    const fieldsFilled = industry.trim() && ideaDescription.trim() && targetAudience.trim();
    let heroBtnText = loading
        ? ""
        : fieldsFilled
            ? "Generate Pitch"
            : "Complete the fields below";

    function renderHistory() {
        if (!history.length) return (
            <div className="max-w-2xl mx-auto text-gray-400 text-center mt-16">No pitch history yet.</div>
        );
        return (
            <div className="max-w-6xl mx-auto pt-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Pitch History</h2>
                <div className="history-masonry">
                    {history.map((pitch, idx) => (
                        <div className="history-masonry-card" key={idx}>
                            <div className="history-masonry-meta">{new Date(pitch.date).toLocaleString()}</div>
                            <PitchOutput pitch={pitch} isHistory />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24">
            <Header
                onShowHistory={() => setShowHistory(true)}
                pitchHistory={history}
            />
            <main className="flex flex-col items-center px-4 space-y-4 py-0 md:space-y-8 md:py-10">
                {showHistory ? (
                    <>
                        <button className="btn mb-6" onClick={() => setShowHistory(false)}>
                            Back to Generator
                        </button>
                        <button
                            className="btn mb-6 bg-pink-600 hover:bg-pink-700"
                            onClick={handleClearHistory}
                        >
                            Clear History
                        </button>
                        {renderHistory()}
                    </>
                ) : (
                    <>
                        <Hero
                            onGenerate={handleGenerate}
                            loading={loading}
                            disabled={loading}
                            btnText={heroBtnText}
                            fieldsFilled={fieldsFilled}
                        />
                        <div id="pitchform">
                          <Form
                            industry={industry}
                            setIndustry={setIndustry}
                            ideaDescription={ideaDescription}
                            setIdeaDescription={setIdeaDescription}
                            targetAudience={targetAudience}
                            setTargetAudience={setTargetAudience}
                            error={error}
                          />
                        </div>
                        {pitch && (
                            <>
                              <PitchOutput pitch={pitch} />
                              <div ref={endOfOutputRef} />
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
