import React from "react";
const icons = [
    <svg width="22" height="22" style={{color:'#a78bfa'}} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M12 8v4l3 2"/></svg>,
    <svg width="22" height="22" style={{color:'#a78bfa'}} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M8 12h8"/></svg>,
    <svg width="22" height="22" style={{color:'#a78bfa'}} fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M8 12h8"/></svg>,
    <svg width="22" height="22" style={{color:'#a78bfa'}} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 17v-5"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/></svg>,
    <svg width="22" height="22" style={{color:'#a78bfa'}} fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M8 12h8"/></svg>
];

export default function PitchOutput({ pitch, isHistory }) {
  if (!pitch) return null;
  const {
    startupName = "",
    oneLiner = "",
    elevatorPitch = "",
    keyFeatures = [],
    mvpRoadmap = []
  } = pitch;

  const sections = [
    { title: "Startup Name", content: startupName, icon: icons[0], isList: false },
    { title: "One-liner", content: oneLiner, icon: icons[1], isList: false },
    { title: "Elevator Pitch", content: elevatorPitch, icon: icons[2], isList: false, className: "whitespace-pre-line" },
    { title: "Key Features", content: keyFeatures, icon: icons[3], isList: true },
    { title: "MVP Roadmap", content: mvpRoadmap, icon: icons[4], isList: true },
  ];

  if (!isHistory) {
    return (
      <div className="output-grid">
        {sections.map((section, idx) => (
          <div className="card card-sm-padding" key={idx}>
            <div className="title flex items-center gap-2 mb-2">{section.icon} {section.title}</div>
            {section.isList ? (
              <ul className="list-disc pl-5 space-y-2">
                {(section.content || []).map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            ) : (
              <div className={section.className || ""}>{section.content}</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="history-cards-column">
      {sections.map((section, idx) => (
        <div className="card card-sm-padding" key={idx}>
          <div className="title flex items-center gap-2 mb-2">{section.icon} {section.title}</div>
          {section.isList ? (
            <ul className="list-disc pl-5 space-y-2">
              {(section.content || []).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          ) : (
            <div className={section.className || ""}>{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}