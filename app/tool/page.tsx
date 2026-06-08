'use client';

// ════════════════════════════════════════════════════════════
//  Plak hier jouw artifact uit Claude.ai
//
//  Hoe:
//  1. Open jouw artifact op claude.ai
//  2. Klik rechtsboven op het code-icoontje ( </> )
//  3. Selecteer alle code en kopieer
//  4. Vervang de MijnTool functie hieronder door jouw code
//
//  Let op: zorg dat jouw component een 'export default' heeft.
//  Als je meerdere componenten hebt, zet ze allemaal in dit bestand.
// ════════════════════════════════════════════════════════════

export default function MijnTool() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--color-achtergrond)',
      fontFamily: 'var(--font-hoofd, Inter, system-ui, sans-serif)',
    }}>
      <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>👋</p>
      <p style={{ color: 'var(--color-primair)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Jouw tool komt hier te staan
      </p>
      <p style={{ color: 'var(--color-tekst)', opacity: 0.6, fontSize: '0.9rem', maxWidth: 400 }}>
        Vervang deze placeholder door jouw artifact-code uit Claude.ai.
      </p>
    </div>
  );
}
