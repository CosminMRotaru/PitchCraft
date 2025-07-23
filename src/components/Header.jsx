import React from "react";
import jsPDF from "jspdf";

export default function Header({ onShowHistory, pitchHistory = [] }) {
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFont("Inter", "bold");
        doc.setFontSize(20);
        doc.text("PitchCraft - Pitch History", 18, 20);

        let y = 35;
        const maxWidth = 180;
        pitchHistory.forEach((pitch, idx) => {
            doc.setFontSize(15);
            doc.text(`${idx + 1}. ${pitch.startupName || "Startup Name"}`, 16, y, {maxWidth});
            y += 10;
            doc.setFontSize(11);
            doc.text(`One-liner: ${pitch.oneLiner || ""}`, 18, y, {maxWidth});
            y += 7 + doc.getTextDimensions(`One-liner: ${pitch.oneLiner || ""}`, {maxWidth}).h;
            doc.text(`Elevator Pitch: ${pitch.elevatorPitch || ""}`, 18, y, {maxWidth});
            y += 7 + doc.getTextDimensions(`Elevator Pitch: ${pitch.elevatorPitch || ""}`, {maxWidth}).h;
            doc.text(`Key Features: ${(pitch.keyFeatures || []).join(", ")}`, 18, y, {maxWidth});
            y += 7 + doc.getTextDimensions(`Key Features: ${(pitch.keyFeatures || []).join(", ")}`, {maxWidth}).h;
            doc.text(`MVP Roadmap: ${(pitch.mvpRoadmap || []).join(", ")}`, 18, y, {maxWidth});
            y += 12 + doc.getTextDimensions(`MVP Roadmap: ${(pitch.mvpRoadmap || []).join(", ")}`, {maxWidth}).h;
            if (y > 270) {
                doc.addPage();
                y = 15;
            }
        });
        doc.save("pitchcraft-history.pdf");
    };

    return (
        <header className="w-full max-w-5xl mx-auto flex justify-between items-center py-6 px-4">
            <div className="flex items-center gap-3">
                <span className="header-logo-icon">
                    <svg width="36" height="36" viewBox="0 0 491.52 491.52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="autopitchBrainGrad" x1="0" y1="0" x2="491" y2="491" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#6d4aff"/>
                                <stop offset="1" stopColor="#ec4899"/>
                            </linearGradient>
                        </defs>
                        <g>
                            <g>
                                <path 
                                    d="M410.9,192.2C409.45,85.97,321.71,0,214.06,0C105.52,0,17.21,87.42,17.26,193.89c-0.27,2.78-6.07,68.89,41.09,136.09
                                        c20.27,28.9,33.38,56.54,40.08,84.5c4.55,18.95,7.85,51.35,7.85,77.04h20.48c0-27.09-3.54-61.5-8.41-81.82
                                        c-7.32-30.51-21.46-60.43-43.24-91.48c-42.62-60.74-37.52-121.76-37.42-123.34c0-96.16,79.12-174.4,176.37-174.4
                                        c97.26,0,176.38,78.24,176.38,174.4v2.65l49.42,89.19H395.8v92.16h-81.92v112.64h20.48v-92.16h81.92V307.2h58.34L410.9,192.2z"
                                    fill="url(#autopitchBrainGrad)" />
                            </g>
                        </g>
                        <g>
                            <g>
                                <path 
                                    d="M283.16,143.36v-20.48h-20.48V92.16H242.2v30.72h-20.48V92.16h-20.48v30.72h-20.48V92.16h-20.48v30.72H139.8v20.48h-30.72
                                        v20.48h30.72v20.48h-30.72v20.48h30.72v20.48h-30.72v20.48h30.72v20.48h20.48v30.72h20.48v-30.72h20.48v30.72h20.48v-30.72h20.48
                                        v30.72h20.48v-30.72h20.48v-20.48h30.72v-20.48h-30.72V204.8h30.72v-20.48h-30.72v-20.48h30.72v0v-20.48H283.16z M262.68,245.76
                                        h-102.4v-102.4h102.4V245.76z"
                                    fill="#fff"/>
                            </g>
                        </g>
                    </svg>
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider text-white">PitchCraft</h1>
            </div>
            <nav className="flex gap-2 items-center">
                <button
                    className="btn btn-alt-bg header-btn"
                    onClick={handleExportPDF}
                >
                    Export PDF
                </button>
                <button
                    className="btn header-btn"
                    onClick={onShowHistory}
                >
                    History
                </button>
            </nav>
        </header>
    );
}
