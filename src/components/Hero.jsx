import React from "react";

export default function Hero({ onGenerate, loading, disabled, btnText, fieldsFilled }) {
    return (
        <section className="text-center space-y-4 pt-8">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white glow-title">
                Craft Your Perfect <br /> Startup Pitch With AI
            </h2>
            <p className="text-xl text-gray-300 mt-2">From name to roadmap — all in seconds.</p>
            <div className="relative inline-block">
                <button
                    className={`btn btn-gradient-pulse mt-4 flex items-center justify-center gap-2 ${loading ? "btn-gradient-loading" : ""}`}
                    onClick={onGenerate}
                    disabled={disabled}
                    aria-label={fieldsFilled ? "Generate Pitch" : "Complete the fields below"}
                    style={{ minWidth: "170px", minHeight: "54px" }}
                >
                    {loading ? (
                        <>
                            <span className="loader-spin"></span>
                            <span className="loading-anim-text ml-2">Generating…</span>
                        </>
                    ) : (
                        <>
                            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                                      stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>{btnText}</span>
                        </>
                    )}
                </button>
                {!fieldsFilled && !loading && (
                    <span className="hero-btn-tooltip">
                        Please fill all the fields
                    </span>
                )}
            </div>
        </section>
    );
}