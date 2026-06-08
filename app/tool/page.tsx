"use client";

import { useState, useRef, useEffect } from "react";

const GEBIEDEN = [
  "Energie",
  "Slaap",
  "Voeding",
  "Beweging",
  "Werk & Loopbaan",
  "Relaties",
  "Zelfzorg",
  "Plezier & Genieten",
  "Zingeving",
  "Financiën",
];

const TIPS: Record<string, { adem: string; olie: string; ontspanning: string }> = {
  Energie: {
    adem: "Probeer de 4-7-8 neusademhaling: adem langzaam in door je neus gedurende 4 tellen, houd je adem vast gedurende 7 tellen, en adem volledig uit door je neus in 8 tellen. Dit activeert je parasympathisch zenuwstelsel en geeft direct meer rust en energie.",
    olie: "Pepermunt of rozemarijn essentiële olie op je polsen of nek geeft een directe energieboost zonder cafeïne.",
    ontspanning: "Plan elke dag één moment van 10 minuten echte rust — geen scherm, geen taken. Gun je lichaam herseltijd.",
  },
  Slaap: {
    adem: "Doe vlak voor het slapen 5 minuten buikademhaling via je neus: leg één hand op je buik, adem rustig in door je neus zodat je buik omhoog beweegt, en adem weer langzaam uit door je neus. Je borst blijft stil. Dit kalmeert je zenuwstelsel en bereidt je voor op diepe slaap.",
    olie: "Lavendel of kamille essentiële olie op je kussen of in een diffuser kalmeert het zenuwstelsel en bereidt je lichaam voor op diepe slaap.",
    ontspanning: "Maak van het uur voor bedtijd een vaste winddown-routine: dim de lichten, sluit schermen af en drink een kopje kruidenthee.",
  },
  Voeding: {
    adem: "Eet bewust: neem voor de maaltijd drie tellen in door je neus, houd kort vast, en adem rustig uit door je neus. Herhaal dit drie keer. Dit activeert de spijsvertering en helpt je lichaam beter voedingsstoffen op te nemen.",
    olie: "Gember of kardemom essentiële olie (1 druppel in warme thee of water) ondersteunt een gezonde spijsvertering en vermindert een opgeblazen gevoel.",
    ontspanning: "Eet minimaal één maaltijd per dag zonder afleiding. Proef bewust, kauw rustig en geniet van wat je eet.",
  },
  Beweging: {
    adem: "Beweeg met je neusademhaling mee. Begin een wandeling met dit ritme: adem in door je neus gedurende 3 stappen, adem uit door je neus gedurende 4 stappen. Mond blijft gesloten. Dit maakt beweging een energiebron in plaats van een taak.",
    olie: "Eucalyptus of dennen essentiële olie voor het bewegen helpt de ademhaling te openen en geeft het gevoel van frisse energie.",
    ontspanning: "Kies beweging die blij maakt, niet die moet. Dansen in de keuken telt ook. Plezier is het beste motivatiemiddel.",
  },
  "Werk & Loopbaan": {
    adem: "Gebruik de box-neusademhaling bij stressvolle werkmomenten: adem in door je neus gedurende 4 tellen, houd vast 4 tellen, adem uit door je neus 4 tellen, houd leeg 4 tellen. Mond blijft gesloten. Doet wonderen voor je concentratie en rust.",
    olie: "Sinaasappel of bergamot essentiële olie op je werkplek creëert een positieve sfeer en verhoogt focus en stemming.",
    ontspanning: "Bouw bewust rustmomenten in je werkdag. Elke 90 minuten 10 minuten echte pauze houdt je brein scherp en energiek.",
  },
  Relaties: {
    adem: "Wanneer een gesprek spannend voelt, adem dan bewust in door je neus en adem langzaam uit door je neus — maak de uitademing twee keer zo lang als de inademing. Dit geeft je zenuwstelsel rust en je brein ruimte om te voelen in plaats van te reageren.",
    olie: "Roos of ylang-ylang essentiële olie opent het hart en ondersteunt zachtheid en verbinding in je relaties.",
    ontspanning: "Plan regelmatig tijd voor verbinding zonder agenda — gewoon samen zijn, zonder prestaties of verwachtingen.",
  },
  Zelfzorg: {
    adem: "Zie bewust neusademen als de meest liefdevolle daad voor jezelf. Adem drie minuten lang alleen in en uit door je neus, met volledige aandacht voor het gevoel van de lucht bij je neusgaten. Dit is pure zelfzorg.",
    olie: "Frankincense of sandelhout essentiële olie ondersteunt zelfreflectie en het gevoel van veiligheid bij jezelf. Gebruik tijdens meditatie of een warm bad.",
    ontspanning: "Maak een lijst van wat jou écht voedt — niet wat goed voor je is, maar wat jou blij maakt. Plan dat in.",
  },
  "Plezier & Genieten": {
    adem: "Plezier begint met aanwezig zijn. Oefen sensory neusademhaling: adem langzaam in door je neus en neem bewust één zintuiglijke gewaarwording mee — een geur, geluid, gevoel. Adem rustig uit door je neus. Herhaal dit een paar keer.",
    olie: "Citrus-blends of ylang-ylang essentiële olie roepen vreugde en lichtheid op. Gebruik ze als je bewust wil genieten van een moment.",
    ontspanning: "Schrijf dagelijks drie dingen op waarvan je genoten hebt — hoe klein ook. Dit traint je brein om plezier te herkennen en er meer van te willen.",
  },
  Zingeving: {
    adem: 'Begin je dag met 5 minuten stille neusademhaling: adem rustig in door je neus, adem rustig uit door je neus, en stel jezelf de vraag: "Wat wil ik vandaag bijdragen?" Luister in de stilte na elke uitademing naar wat er opkomt.',
    olie: "Frankincense en mirre essentiële olie zijn al eeuwenlang verbonden met bezinning en spirituele verbinding. Gebruik ze bij reflectiemomenten.",
    ontspanning: "Zoek wekelijks iets wat je raakt — een boek, gesprek, wandeling in de natuur. Zingeving groeit waar je aandacht naartoe gaat.",
  },
  "Financiën": {
    adem: "Financiële spanning zit vaak vastgezet in het lichaam. Doe bij geldzorgen eerst een lange neusuitademing: adem in door je neus gedurende 4 tellen, adem uit door je neus gedurende 8 tellen. Herhaal dit 5 keer om het stresssysteem te kalmeren.",
    olie: "Bergamot of basilicum essentiële olie helpt bij stressverlichting en het nemen van heldere beslissingen.",
    ontspanning: "Verbind geld niet alleen aan angst maar ook aan vrijheid. Schrijf op wat financiële ruimte jou zou geven — plezier, rust, keuzes.",
  },
};

const PROFIELEN = [
  { min: 0, max: 4.9, naam: "Uitgeput maar bewust", tekst: "Je lichaam en geest staan onder grote druk. Je voelt dat er iets moet veranderen, en dat bewustzijn is al een kracht. Nu is het tijd om te stoppen met doorzetten op wilskracht en te beginnen met luisteren naar wat je écht nodig hebt." },
  { min: 5, max: 6.9, naam: "Veerkrachtig maar zoekend", tekst: "Je houdt veel ballen in de lucht en doet het best — maar je voelt dat er meer in zit. Er is ruimte om te groeien van overleven naar echt genieten. Je energiereserves zijn er, ze vragen alleen om de juiste voeding." },
  { min: 7, max: 7.9, naam: "In beweging naar balans", tekst: "Je bent op de goede weg. Op veel gebieden gaat het goed, en je hebt al geleerd hoe je voor jezelf zorgt. Een paar gerichte stappen kunnen het verschil maken tussen goed en volop leven." },
  { min: 8, max: 10, naam: "In balans en bloeiend", tekst: "Je leeft grotendeels in lijn met wat je energie geeft. Dat is een prestatie op zich. Gebruik deze scan om te zien waar nog wat extra aandacht je leven nóg rijker kan maken." },
];

function getScoreButtonStyle(score: number, selected: number | null): React.CSSProperties {
  const isSelected = selected === score;
  if (!isSelected) {
    return {
      width: 26, height: 26, borderRadius: 6,
      border: "1.5px solid #c5d9cc", background: "white",
      fontSize: "0.72rem", fontWeight: 500, cursor: "pointer",
      color: "#6a8a78", display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "Inter, sans-serif",
      transition: "all 0.15s",
    };
  }
  if (score >= 8) {
    return {
      width: 26, height: 26, borderRadius: 6,
      border: "1.5px solid #c9a84c", background: "#c9a84c",
      fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
      color: "white", display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "Inter, sans-serif",
      transform: "scale(1.1)", boxShadow: "0 0 0 2px rgba(201,168,76,0.25)",
      transition: "all 0.15s",
    };
  }
  return {
    width: 26, height: 26, borderRadius: 6,
    border: "1.5px solid #5c8a72", background: "#5c8a72",
    fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
    color: "white", display: "flex", alignItems: "center",
    justifyContent: "center", fontFamily: "Inter, sans-serif",
    transform: "scale(1.1)", boxShadow: "0 0 0 2px rgba(92,138,114,0.25)",
    transition: "all 0.15s",
  };
}

function Spinweb({ scores }: { scores: (number | null)[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = 150, cy = 150, r = 120, n = 10;
    ctx.clearRect(0, 0, 300, 300);

    for (let ring = 1; ring <= 10; ring++) {
      const rr = (r * ring) / 10;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + rr * Math.cos(angle);
        const y = cy + rr * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 10 ? "#5c8a72" : "#c5d9cc";
      ctx.lineWidth = ring === 10 ? 1.5 : 0.8;
      ctx.stroke();
    }

    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      ctx.strokeStyle = "#c5d9cc";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    if (scores.some((s) => s !== null)) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const rr = (r * (scores[i] ?? 0)) / 10;
        const x = cx + rr * Math.cos(angle);
        const y = cy + rr * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(92,138,114,0.25)";
      ctx.fill();
      ctx.strokeStyle = "#5c8a72";
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < n; i++) {
        if (scores[i] !== null) {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const rr = (r * scores[i]!) / 10;
          ctx.beginPath();
          ctx.arc(cx + rr * Math.cos(angle), cy + rr * Math.sin(angle), 3.5, 0, Math.PI * 2);
          ctx.fillStyle = scores[i]! >= 8 ? "#c9a84c" : "#5c8a72";
          ctx.fill();
        }
      }
    }

    ctx.font = "500 9px Inter, sans-serif";
    ctx.fillStyle = "#3d6b55";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const lr = r + 20;
      ctx.fillText(
        GEBIEDEN[i].split(" ")[0],
        cx + lr * Math.cos(angle),
        cy + lr * Math.sin(angle)
      );
    }
  }, [scores]);

  return <canvas ref={canvasRef} width={300} height={300} />;
}

export default function EnergiescanPage() {
  const [scores, setScores] = useState<(number | null)[]>(new Array(10).fill(null));
  const [stap, setStap] = useState<"invullen" | "resultaten">("invullen");
  const resultatenRef = useRef<HTMLDivElement>(null);

  const setScore = (index: number, score: number) => {
    const nieuw = [...scores];
    nieuw[index] = score;
    setScores(nieuw);
  };

  const allesIngevuld = scores.every((s) => s !== null);
  const aantalIngevuld = scores.filter((s) => s !== null).length;

  const toonResultaten = () => {
    setStap("resultaten");
    setTimeout(() => resultatenRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const opnieuw = () => {
    setScores(new Array(10).fill(null));
    setStap("invullen");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const gemiddelde = allesIngevuld
    ? scores.reduce((a, b) => a + (b ?? 0), 0) / 10
    : 0;
  const profiel =
    PROFIELEN.find((p) => gemiddelde >= p.min && gemiddelde <= p.max) ?? PROFIELEN[1];
  const lageGebieden = GEBIEDEN.map((naam, i) => ({ naam, score: scores[i] ?? 0 }))
    .filter((g) => g.score < 8 && scores[GEBIEDEN.indexOf(g.naam)] !== null)
    .sort((a, b) => a.score - b.score);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        .es-score-btn:hover {
          background: #e8f0eb !important;
          border-color: #5c8a72 !important;
          color: #3d6b55 !important;
        }
        .es-cta-primair:hover { background: #3d6b55 !important; }
        .es-dienst-link:hover { background: #d4e8da !important; }
        .es-opnieuw:hover { background: #5c8a72 !important; color: white !important; }
        .es-bekijk-btn:hover:not(:disabled) { background: #3d6b55 !important; }
      `}</style>

      <div style={{ fontFamily: "Inter, sans-serif", background: "#e8f0eb", color: "#2a2a2a", minHeight: "100vh", paddingBottom: "3rem" }}>

        {/* Header */}
        <div style={{ background: "#5c8a72", color: "white", textAlign: "center", padding: "2.5rem 1.5rem 2rem" }}>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", fontWeight: 500, letterSpacing: "0.02em", marginBottom: "0.4rem" }}>
            Energiescan
          </h1>
          <p style={{ fontSize: "0.9rem", opacity: 0.85, fontWeight: 300, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
            Ontdek waar jouw energie stroomt en waar ze vastloopt
          </p>
        </div>

        {/* Stap invullen */}
        {stap === "invullen" && (
          <div>
            <div style={{ maxWidth: 560, margin: "2rem auto 0", padding: "0 1.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.92rem", color: "#4a6058", lineHeight: 1.7 }}>
                Geef elk levensgebied een score van 1 tot 10.<br />Hoe tevreden ben jij hier nu mee?
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "1.5rem 1rem 0" }}>
              <Spinweb scores={scores} />
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "0.75rem", fontSize: "0.75rem", color: "#5a7a68" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "#5c8a72" }} />
                <span>Score 1–7</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "#c9a84c" }} />
                <span>Score 8–10</span>
              </div>
            </div>

            {/* Gebieden grid */}
            <div style={{ maxWidth: 560, margin: "1.5rem auto 0", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {GEBIEDEN.map((naam, i) => (
                <div
                  key={naam}
                  style={{
                    background: "white", borderRadius: 12, padding: "0.75rem 1rem",
                    display: "flex", flexDirection: "column", gap: "0.4rem",
                    border: scores[i] !== null ? "1.5px solid #5c8a72" : "1.5px solid transparent",
                    transition: "border 0.2s",
                  }}
                >
                  <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#3d6b55", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {naam}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {Array.from({ length: 10 }, (_, j) => j + 1).map((s) => (
                      <button
                        key={s}
                        className="es-score-btn"
                        onClick={() => setScore(i, s)}
                        style={getScoreButtonStyle(s, scores[i])}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ maxWidth: 560, margin: "1.5rem auto 0", padding: "0 1.5rem", textAlign: "center" }}>
              <button
                className="es-bekijk-btn"
                disabled={!allesIngevuld}
                onClick={toonResultaten}
                style={{
                  background: "#5c8a72", color: "white", border: "none", borderRadius: 50,
                  padding: "0.85rem 2.5rem", fontSize: "0.95rem", fontFamily: "Inter, sans-serif",
                  fontWeight: 500, cursor: allesIngevuld ? "pointer" : "not-allowed",
                  opacity: allesIngevuld ? 1 : 0.4, transition: "background 0.2s",
                }}
              >
                Bekijk mijn energieprofiel
              </button>
              <p style={{ fontSize: "0.8rem", color: "#7a9a88", marginTop: "0.6rem" }}>
                {allesIngevuld ? "Alles ingevuld — bekijk jouw profiel!" : `${aantalIngevuld} van 10 ingevuld`}
              </p>
            </div>
          </div>
        )}

        {/* Stap resultaten */}
        {stap === "resultaten" && (
          <div ref={resultatenRef} style={{ maxWidth: 560, margin: "0 auto", padding: "0 1.5rem" }}>

            {/* Profielkaart */}
            <div style={{ background: "#5c8a72", color: "white", borderRadius: 16, padding: "1.75rem 1.5rem", marginTop: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.75, marginBottom: "0.4rem" }}>
                Jouw energieprofiel
              </div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 500, marginBottom: "0.75rem" }}>
                {profiel.naam}
              </div>
              <div style={{ fontSize: "0.88rem", lineHeight: 1.7, opacity: 0.9, fontWeight: 300 }}>
                {profiel.tekst}
              </div>
              <div style={{ display: "inline-block", background: "#e8d5a3", color: "#3d6b55", fontWeight: 600, fontSize: "0.85rem", borderRadius: 50, padding: "0.25rem 1rem", marginTop: "1rem" }}>
                Gemiddelde score: {gemiddelde.toFixed(1)}
              </div>
            </div>

            {/* Tips */}
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 500, color: "#3d6b55", margin: "1.75rem 0 1rem" }}>
              {lageGebieden.length === 0
                ? "Jij scoort op alle gebieden hoog — goed bezig!"
                : `Aandacht voor ${lageGebieden.length} gebied${lageGebieden.length > 1 ? "en" : ""}`}
            </p>

            {lageGebieden.length === 0 ? (
              <p style={{ fontSize: "0.9rem", color: "#5a7a68", lineHeight: 1.7 }}>
                Jouw energie is goed in balans. Gebruik de tips hieronder om dit niveau te onderhouden en verder te verdiepen.
              </p>
            ) : (
              lageGebieden.map((g) => {
                const t = TIPS[g.naam];
                if (!t) return null;
                return (
                  <div key={g.naam} style={{ background: "white", borderRadius: 14, padding: "1.25rem 1.25rem 1rem", marginBottom: "0.85rem", borderLeft: "4px solid #5c8a72" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#5c8a72", marginBottom: "0.3rem" }}>
                      {g.naam}{" "}
                      <span style={{ display: "inline-block", background: "#fef3e2", color: "#9a6b10", fontSize: "0.72rem", fontWeight: 600, borderRadius: 50, padding: "0.15rem 0.6rem", marginLeft: 6 }}>
                        score {g.score}
                      </span>
                    </div>
                    {(["adem", "olie", "ontspanning"] as const).map((soort) => (
                      <div key={soort} style={{ marginTop: "0.75rem", paddingTop: "0.6rem", borderTop: "1px solid #eef3ef" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#7a9a88", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>
                          {soort === "adem" ? "Ademhaling" : soort === "olie" ? "Essentiële oliën" : "Ontspanning & zelfzorg"}
                        </div>
                        <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#3a3a3a" }}>{t[soort]}</p>
                      </div>
                    ))}
                  </div>
                );
              })
            )}

            {/* CTA sectie */}
            <div style={{ background: "white", borderRadius: 16, padding: "1.75rem 1.5rem", marginTop: "1.75rem", textAlign: "center", border: "1.5px solid #d0e4d8" }}>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", fontWeight: 500, color: "#3d6b55", marginBottom: "0.5rem" }}>
                Klaar voor de volgende stap?
              </h3>
              <p style={{ fontSize: "0.87rem", color: "#5a7a68", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                Samen kijken we waar jouw energie lekt en hoe je vanuit plezier en genieten weer in balans komt.
              </p>
              <a
                className="es-cta-primair"
                href="https://praktijkconfident.clientomgeving.nl/afspraak-maken"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block", background: "#5c8a72", color: "white", border: "none",
                  borderRadius: 50, padding: "0.9rem 2rem", fontSize: "0.95rem",
                  fontFamily: "Inter, sans-serif", fontWeight: 500, cursor: "pointer",
                  textDecoration: "none", marginBottom: "1rem", transition: "background 0.2s",
                }}
              >
                Plan een gratis kennismakingsgesprek
              </a>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem", marginTop: "0.5rem" }}>
                {["NEI-therapie", "Ademcoaching", "Aromatherapie"].map((dienst) => (
                  <a
                    key={dienst}
                    className="es-dienst-link"
                    href="https://praktijkconfident.nl/diensten/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "block", background: "#e8f0eb", color: "#3d6b55", borderRadius: 10,
                      padding: "0.7rem 0.5rem", fontSize: "0.78rem", fontWeight: 500,
                      textDecoration: "none", textAlign: "center", border: "1.5px solid #c5d9cc",
                      transition: "background 0.15s", lineHeight: 1.4,
                    }}
                  >
                    {dienst}
                  </a>
                ))}
              </div>
            </div>

            <button
              className="es-opnieuw"
              onClick={opnieuw}
              style={{
                display: "block", margin: "1.5rem auto 0", background: "transparent",
                border: "1.5px solid #5c8a72", color: "#5c8a72", borderRadius: 50,
                padding: "0.65rem 2rem", fontSize: "0.88rem", fontFamily: "Inter, sans-serif",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              ← Opnieuw invullen
            </button>
          </div>
        )}
      </div>
    </>
  );
}
