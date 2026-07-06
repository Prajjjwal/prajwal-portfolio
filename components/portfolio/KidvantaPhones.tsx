// CSS-only phone mockups echoing the Kidvanta app design
// (vivid v2 palette: sunrise gradient, teal, periwinkle on a soft lilac canvas).
export default function KidvantaPhones() {
  return (
    <div className="phones">
      {/* Onboarding screen — sunrise gradient */}
      <div className="phone" style={{ background: "linear-gradient(160deg, #FF5E9C, #FF9A62)" }}>
        <div className="phone-notch" />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6%" }}>
          <div style={{ width: "38%", aspectRatio: "1", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "55%", aspectRatio: "1", borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />
          </div>
          <div style={{ width: "60%", height: "4%", borderRadius: "100px", background: "rgba(255,255,255,0.6)" }} />
          <div style={{ width: "44%", height: "3%", borderRadius: "100px", background: "rgba(255,255,255,0.35)" }} />
          <div style={{ width: "68%", height: "9%", borderRadius: "100px", background: "#fff", marginTop: "8%" }} />
        </div>
      </div>

      {/* Parent dashboard — light canvas with cards */}
      <div className="phone" style={{ background: "#EEEFF7", transform: "translateY(-8%) scale(1.08)", zIndex: 2 }}>
        <div className="phone-notch" style={{ background: "rgba(4,5,13,0.2)" }} />
        <div style={{ position: "absolute", inset: "10% 8% 6%", display: "flex", flexDirection: "column", gap: "5%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6%" }}>
            <div style={{ width: "22%", aspectRatio: "1", borderRadius: "50%", background: "linear-gradient(135deg, #6B6AF2, #8E6DF0)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ width: "80%", height: "6px", borderRadius: "100px", background: "#0E1230", opacity: 0.8, maxHeight: "8%" }} />
              <div style={{ width: "55%", height: "4px", borderRadius: "100px", background: "#0E1230", opacity: 0.25, marginTop: "10%" }} />
            </div>
          </div>
          <div style={{ height: "26%", borderRadius: "12px", background: "linear-gradient(135deg, #FF5E9C, #FF9A62)", padding: "8%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "8%" }}>
            <div style={{ width: "70%", height: "5px", borderRadius: "100px", background: "rgba(255,255,255,0.8)" }} />
            <div style={{ width: "45%", height: "4px", borderRadius: "100px", background: "rgba(255,255,255,0.45)" }} />
          </div>
          <div style={{ display: "flex", gap: "6%", height: "20%" }}>
            <div style={{ flex: 1, borderRadius: "10px", background: "#17C39B", opacity: 0.9 }} />
            <div style={{ flex: 1, borderRadius: "10px", background: "#6B6AF2", opacity: 0.9 }} />
          </div>
          <div style={{ flex: 1, borderRadius: "10px", background: "#fff", border: "1px solid #E8E9F4" }} />
        </div>
      </div>

      {/* Doctor queue — dark teal */}
      <div className="phone" style={{ background: "#12798E" }}>
        <div className="phone-notch" />
        <div style={{ position: "absolute", inset: "12% 10% 8%", display: "flex", flexDirection: "column", gap: "7%" }}>
          <div style={{ width: "65%", height: "5px", borderRadius: "100px", background: "rgba(255,255,255,0.75)" }} />
          <div style={{ width: "40%", height: "4px", borderRadius: "100px", background: "rgba(255,255,255,0.35)" }} />
          {[0.95, 0.75, 0.55].map((o, i) => (
            <div key={i} style={{ height: "16%", borderRadius: "10px", background: `rgba(255,255,255,${0.12 + i * 0.02})`, display: "flex", alignItems: "center", gap: "6%", padding: "0 6%", opacity: o }}>
              <div style={{ width: "18%", aspectRatio: "1", borderRadius: "50%", background: i === 0 ? "#FFC44F" : i === 1 ? "#17C39B" : "#F98CA5" }} />
              <div style={{ flex: 1, height: "24%", borderRadius: "100px", background: "rgba(255,255,255,0.5)" }} />
            </div>
          ))}
          <div style={{ marginTop: "auto", height: "11%", borderRadius: "100px", background: "#FFC44F" }} />
        </div>
      </div>
    </div>
  );
}
