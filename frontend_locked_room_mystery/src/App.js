import React, { useState } from 'react';
import './App.css';

/* 
  ====== COLOR PALETTE ======
  primary: #f90101 (red), secondary: #0a0a0a (black), accent: #fcfcfc (white)
*/

/*
  FREEPIK HARD MODE ASSET INTEGRATION

  Sources:
  - assets/freepik_hard_mode_assets.md (please see for attribution/URLs)
  - All assets below are mapped per Freepik's requirements.
*/

// --- CRIME SCENE ---

// FREEPIK: Crime Scene, very detailed, attribution: upklyak
const CRIME_SCENE_IMAGE =
  'https://img.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm'; // page url

const CRIME_SCENE_IMAGE_DIRECT =
  'https://img.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.jpg?w=1480&t=st=1689060000~exp=1689060600~hmac=c8ab2cd6a42f0fe3eeb37c36493d23e14c4125618a7026ebb3eb98bbb254cbef'; // try direct jpg

// --- CLUES ---

// PNG/icon links from Freepik icon sets, attribution: Freepik
const CLUE_ICONS = [
  // 0
  'https://cdn-icons-png.flaticon.com/512/3062/3062634.png', // Bloody Knife Flat Icon
  // 1
  'https://cdn-icons-png.flaticon.com/512/61/61456.png',     // Fingerprint Icon
  // 2
  'https://cdn-icons-png.flaticon.com/512/866/866218.png',   // Gold Watch Icon
  // 3
  'https://cdn-icons-png.flaticon.com/512/993/993651.png',   // Blood Stain/Spatter Icon
  // 4
  'https://cdn-icons-png.flaticon.com/512/4151/4151862.png'  // Key Icon
];

// Attribution mapping for clues (to show if needed)
const CLUE_ATTRIBUTIONS = [
  "Knife icon by Freepik",
  "Fingerprint icon by Freepik",
  "Watch icon by Freepik",
  "Blood stain icon by Freepik",
  "Key icon by Freepik"
];

// --- SUSPECTS ---

// Illustration pages per mapping in freepik_hard_mode_assets.md
const SUSPECT_IMAGES = [
  // 0. Police Officer
  'https://img.freepik.com/free-vector/policeman-character-design_1308-102774.jpg',
  // 1. Female Chef
  'https://img.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.jpg',
  // 2. Burglar
  'https://img.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.jpg',
  // 3. Old Lady
  'https://img.freepik.com/free-vector/old-lady-character_1308-133288.jpg',
  // 4. Nerdy Guy
  'https://img.freepik.com/free-vector/young-man-character_1308-144883.jpg'
];

// Attribution mapping for suspects (to show if needed)
const SUSPECT_ATTRIBUTIONS = [
  "Policeman/characters by pch.vector",
  "Chef/characters by pch.vector",
  "Thief/characters by pch.vector",
  "Old lady/characters by pch.vector",
  "Young man/characters by pch.vector"
];

// ==========================
// MOCK CLUES and SUSPECTS, now expanded for all mapped assets
// ==========================
const mockClues = [
  {
    id: 1,
    name: 'Bloody Knife',
    description: 'A blood-stained kitchen knife found near the sofa. Someone left it in a hurry.',
    icon: CLUE_ICONS[0],
    attribution: CLUE_ATTRIBUTIONS[0],
    location: { x: 65, y: 78 }, // harder: slightly changed location
    relatedSuspectId: 3
  },
  {
    id: 2,
    name: 'Gold Watch',
    description: 'An expensive gold watch, stopped at 7:20 PM. The owner must have struggled.',
    icon: CLUE_ICONS[2],
    attribution: CLUE_ATTRIBUTIONS[2],
    location: { x: 39, y: 60 },
    relatedSuspectId: 1,
    redHerring: true
  },
  {
    id: 3,
    name: 'Fingerprint',
    description: 'A clear fingerprint found on the window lock. Might belong to the culprit.',
    icon: CLUE_ICONS[1],
    attribution: CLUE_ATTRIBUTIONS[1],
    location: { x: 88, y: 35 },
    relatedSuspectId: 2
  },
  {
    id: 4,
    name: 'Blood Stain',
    description: 'A subtle blood spatter, hidden on the carpet. Only visible on close look.',
    icon: CLUE_ICONS[3],
    attribution: CLUE_ATTRIBUTIONS[3],
    location: { x: 73, y: 59 },
    relatedSuspectId: 3
  },
  {
    id: 5,
    name: 'Key',
    description: 'A small brass key, tucked under a magazine. Was it used to lock the room?',
    icon: CLUE_ICONS[4],
    attribution: CLUE_ATTRIBUTIONS[4],
    location: { x: 15, y: 83 },
    relatedSuspectId: 4
  }
];

const mockSuspects = [
  {
    id: 1,
    name: 'Officer Redmond',
    occupation: 'Police Officer',
    alibi: 'Claims to have arrived after the crime, but his watch was at the scene.',
    motive: 'Victim uncovered corrupt dealings.',
    clueId: 2,
    image: SUSPECT_IMAGES[0]
  },
  {
    id: 2,
    name: 'Linda Crumb',
    occupation: 'Pastry Chef',
    alibi: 'Was prepping dessert; a fingerprint was found at the window.',
    motive: 'Victim gave her poor reviews, hurting business.',
    clueId: 3,
    image: SUSPECT_IMAGES[1]
  },
  {
    id: 3,
    name: 'Vic Shade',
    occupation: 'Cat Burglar',
    alibi: 'Says he was breaking in next door, but a bloody knife was left behind.',
    motive: 'Victim caught him mid-robbery.',
    clueId: 1,
    image: SUSPECT_IMAGES[2]
  },
  {
    id: 4,
    name: 'Mrs. Gertrude Ash',
    occupation: 'Retired Teacher',
    alibi: 'Heard a commotion but claims she was napping. A key was found near her seat.',
    motive: 'Victim failed her grandson.',
    clueId: 5,
    image: SUSPECT_IMAGES[3]
  },
  {
    id: 5,
    name: 'Ned Glassman',
    occupation: 'Student (Nerdy Guy)',
    alibi: 'Was reading in the lounge; no one noticed him. Nothing seems missing except his dignity.',
    motive: 'Victim insulted his research.',
    clueId: 4, // blood stain loosely associated
    image: SUSPECT_IMAGES[4]
  }
];

const storyIntro =
  'A scream echoes from the penthouse. The famous food critic is found dead! The room is locked from inside, but clues are scattered. Who did it?';

// ===============================
// COMPONENTS
// ===============================

// CrimeSceneCanvas: shows the illustration, clickable clues overlayed
function CrimeSceneCanvas({ clues, foundClueIds, onClueClick }) {
  return (
    <div className="crime-scene-canvas">
      {/* Freepik very-detailed image */}
      <a
        href="https://www.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-label="Freepik crime scene attribution"
        style={{ position: 'absolute', left: 3, top: 3, zIndex: 5, fontSize: 8, color: '#999' }}
      >
        {/* visually hidden, keeps attribution legal */}
        Crime scene by upklyak (Freepik)
      </a>
      <img
        src={CRIME_SCENE_IMAGE_DIRECT}
        alt="Crime Scene (illustrated by upklyak/Freepik)"
        className="crime-scene-img"
        style={{ width: '100%', borderRadius: 24, boxShadow: '0 4px 40px #0a0a0a33' }}
      />
      {/* Overlayed Clue Icons */}
      {clues.map((clue, i) => (
        <button
          key={clue.id}
          className={`clue-icon-btn${foundClueIds.includes(clue.id) ? ' found' : ''}`}
          style={{
            left: `${clue.location.x}%`,
            top: `${clue.location.y}%`
          }}
          onClick={() => onClueClick(clue)}
          aria-label={`Find clue: ${clue.name}`}
        >
          <img
            src={clue.icon}
            alt={clue.name}
            className="clue-icon-img"
            style={{ opacity: foundClueIds.includes(clue.id) ? 0.65 : 1 }}
          />
          {/* Spark/flash when unfound */}
          {!foundClueIds.includes(clue.id) && <span className="clue-sparkle" />}
        </button>
      ))}
    </div>
  );
}

// SuspectTray: bottom or side display of suspects
function SuspectTray({ suspects, revealed, onSuspectClick, accusationDisabled }) {
  return (
    <div className={`suspect-tray ${revealed ? 'revealed' : ''}`}>
      <h3>Suspects</h3>
      <div className="suspect-list">
        {suspects.map((suspect) => (
          <div
            className="suspect-card"
            key={suspect.id}
            onClick={() => revealed && onSuspectClick(suspect)}
            tabIndex={revealed ? 0 : -1}
            style={{ opacity: revealed ? 1 : 0.45, pointerEvents: revealed ? 'auto' : 'none' }}
            aria-label={`View suspect: ${suspect.name}`}
          >
            <img src={suspect.image} alt={suspect.name} className="suspect-img" />
            <div className="suspect-name">{suspect.name}</div>
            {revealed && <button disabled={accusationDisabled} className="accuse-btn">Accuse</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Footer for Freepik attribution/credits
function AttributionFooter() {
  return (
    <footer className="main-footer" style={{ marginTop: 24, color: '#0a0a0a99', fontSize: 13 }}>
      &copy; {new Date().getFullYear()} Cartoon Locked Room Mystery &mdash; Color palette:{' '}
      <span style={{ color: '#f90101' }}>#f90101</span>,{' '}
      <span style={{ color: '#0a0a0a' }}>#0a0a0a</span>,{' '}
      <span style={{ color: '#fcfcfc', background: "#0a0a0a33", padding: "0 2px" }}>#fcfcfc</span>
      <br />
      <span style={{ fontSize: 12, color: "#b80000", fontWeight: 500 }}>
        Cartoon illustrations &amp; icons by&nbsp;
        <a
          href="https://www.freepik.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#f90101", textDecoration: "underline", fontWeight: 700 }}
        >Freepik</a>,{' '}
        upklyak, pch.vector, and icon contributors <br />
        <span style={{ color: "#444" }}>
          <a
            href="https://www.freepik.com/about_us#nav-freepik-license"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#888" }}
          >license info</a>
        </span>
      </span>
    </footer>
  );
}

// Modal popup
function Modal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// Accusation dialog/flow
function AccusationModal({ open, suspects, onAccuse, onCancel, disabledIds }) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onCancel} title="Make Your Accusation">
      <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
        {suspects.map(suspect => (
          <button key={suspect.id}
            onClick={() => onAccuse(suspect)}
            className="modal-accuse-btn"
            disabled={disabledIds && disabledIds.includes(suspect.id)}
          >
            <img src={suspect.image} alt={suspect.name} className="modal-suspect-thumb" />
            <span>{suspect.name} ({suspect.occupation})</span>
          </button>
        ))}
      </div>
      <div className="modal-actions">
        <button onClick={onCancel} className="modal-cancel-btn">Cancel</button>
      </div>
    </Modal>
  );
}

// ===============================
// MAIN GAME COMPONENT
// ===============================
function App() {
  // Theme always light per spec.
  const theme = 'light';

  // GAME STATE
  const [showIntro, setShowIntro] = useState(true);
  const [foundClues, setFoundClues] = useState([]); // array of clue ids
  const [clueModal, setClueModal] = useState(null); // clue obj or null
  const [suspectModal, setSuspectModal] = useState(null); // suspect obj or null
  const [accusationOpen, setAccusationOpen] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [disabledAccuses, setDisabledAccuses] = useState([]);

  // Reveal Suspects when all clues found
  const allCluesFound = foundClues.length === mockClues.length;

  // Accusation mechanics: Solution is suspect #3 ("Vic Shade") with clue #1 (knife)
  const solutionSuspectId = 3; // THE REAL KILLER!
  const solutionClueId = 1;

  // PUBLIC_INTERFACE
  function handleClueClick(clue) {
    if (!foundClues.includes(clue.id)) {
      setFoundClues([...foundClues, clue.id]);
    }
    setClueModal(clue);
  }

  // PUBLIC_INTERFACE
  function handleCloseClueModal() {
    setClueModal(null);
  }

  // PUBLIC_INTERFACE
  function handleSuspectClick(suspect) {
    setSuspectModal(suspect);
  }

  // PUBLIC_INTERFACE
  function handleCloseSuspectModal() {
    setSuspectModal(null);
  }

  // PUBLIC_INTERFACE
  function handleOpenAccusation() {
    setAccusationOpen(true);
    setLastResult(null);
  }

  // PUBLIC_INTERFACE
  function handleAccuse(suspect) {
    setAccusationOpen(false);
    if (suspect.id === solutionSuspectId) {
      setLastResult({
        win: true,
        suspect
      });
    } else {
      setLastResult({
        win: false,
        suspect
      });
      setDisabledAccuses([...disabledAccuses, suspect.id]);
    }
  }

  function handleDismissResult() {
    setLastResult(null);
    setDisabledAccuses([]);
  }

  // Style clue connection/attribution for modal
  function renderClueConnection(clueId) {
    const clue = mockClues.find(c => c.id === clueId);
    if (clue) {
      return (
        <div className="modal-clue-link">
          <img src={clue.icon} alt={clue.name} className="modal-clue-thumb" />
          <span>{clue.name}</span>
          <span style={{ fontSize: '0.76em', color: "#999", marginLeft: 7, maxWidth: 36 }} title={clue.attribution}>
            <a
              href={getClueAttributionUrl(clue.name)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#b80000", textDecoration: "none" }}
            >ⓘ</a>
          </span>
        </div>
      );
    }
    return null;
  }

  function getClueAttributionUrl(clueName) {
    // Map for in-modal license direct links
    switch(clueName) {
      case "Bloody Knife":
        return "https://www.freepik.com/free-icon/knife_1489972.htm";
      case "Fingerprint":
        return "https://www.freepik.com/free-icon/fingerprint_318-740317.htm";
      case "Gold Watch":
        return "https://www.freepik.com/free-icon/watch_2058877.htm";
      case "Blood Stain":
        return "https://www.freepik.com/free-icon/blood-stain_952007.htm";
      case "Key":
        return "https://www.freepik.com/free-icon/key_2941735.htm";
      default:
        return "https://www.freepik.com";
    }
  }

  // Suspect modal extra: attribution
  function renderSuspectAttribution(suspect) {
    if (!suspect) return null;
    let idx = mockSuspects.findIndex(s => s.id === suspect.id);
    if (idx === -1) return null;
    let linkMap = [
      "https://www.freepik.com/free-vector/policeman-character-design_1308-102774.htm",
      "https://www.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.htm",
      "https://www.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.htm",
      "https://www.freepik.com/free-vector/old-lady-character_1308-133288.htm",
      "https://www.freepik.com/free-vector/young-man-character_1308-144883.htm"
    ];
    return (
      <div style={{fontSize:"0.9em", color: "#ca1010", margin: "10px 2px 0 2px"}}>
        <a href={linkMap[idx]} target="_blank" rel="noopener noreferrer"
          style={{color:"#f90101", fontWeight:"bold", textDecoration:"underline"}}
        >Freepik asset credits</a>
      </div>
    );
  }

  // ==================== RENDER ====================
  return (
    <div className="App" data-theme={theme} style={{ background: '#fcfcfc', color: '#0a0a0a', minHeight: '100vh' }}>
      {/* ==============================
           MODAL: GAME INTRO STORY
        ============================== */}
      <Modal open={showIntro} onClose={() => setShowIntro(false)}>
        <div className="intro-modal">
          <h1 style={{ color: '#f90101', fontFamily: 'cursive', fontWeight: 700, fontSize: 36, marginBottom: 12 }}>
            Locked Room Mystery!
          </h1>
          <p style={{ fontSize: 20, margin: '8px 0 16px' }}>{storyIntro}</p>
          <button style={{ background: '#f90101', color: '#fff', border: 'none', fontWeight: 600, borderRadius: 8, padding: '12px 24px', fontSize: 18, cursor: 'pointer', marginTop: 14 }} onClick={() => setShowIntro(false)}>
            Enter the Scene
          </button>
        </div>
      </Modal>

      {/* ==============================
          CRIME SCENE & CLUE OVERLAY
        ============================== */}
      <main className="main-layout">
        <h1 className="main-title" style={{ color: '#f90101', marginBottom: 8, fontFamily: 'cursive', fontWeight: 'bold' }}>
          Cartoon Crime Scene
        </h1>
        <p className="subtitle" style={{ color: '#0a0a0a', marginBottom: 14, fontWeight: 500 }}>
          Find all the clues, crack the case. Click on sparkle icons to reveal clues. Clues can connect to each suspect!
        </p>
        <div className="main-content">
          <CrimeSceneCanvas
            clues={mockClues}
            foundClueIds={foundClues}
            onClueClick={handleClueClick}
          />
        </div>
      </main>

      {/* ==============================
          MODAL: CLUE DETAIL
        ============================== */}
      <Modal
        open={!!clueModal}
        onClose={handleCloseClueModal}
        title={clueModal?.name}
      >
        {clueModal && (
          <div>
            <img src={clueModal.icon} className="modal-clue-img" alt={clueModal.name} />
            <p style={{ margin: '10px 0', color: '#222' }}>{clueModal.description}</p>
            <hr />
            <div>
              <strong>Connected to suspect:</strong>
              <div style={{ height: 10 }} />
              {renderClueConnection(clueModal.relatedSuspectId)}
              {clueModal.redHerring && (
                <div style={{ color: '#f90101', fontWeight: 700, marginTop: 10 }}>
                  Red herring! This clue might lead you astray.
                </div>
              )}
            </div>
            <p style={{ fontSize: '0.82em', color: "#888", marginTop: 9 }}>
              <a
                href={getClueAttributionUrl(clueModal.name)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#b80000", textDecoration: "underline" }}
              >Clue asset © Freepik</a>
            </p>
          </div>
        )}
      </Modal>

      {/* ==============================
          SUSPECTS TRAY (reveal after all clues found)
        ============================== */}
      <SuspectTray
        suspects={mockSuspects}
        revealed={allCluesFound}
        onSuspectClick={handleSuspectClick}
        accusationDisabled={lastResult !== null || accusationOpen}
      />

      {/* ==============================
          MODAL: SUSPECT PROFILE
        ============================== */}
      <Modal
        open={!!suspectModal}
        onClose={handleCloseSuspectModal}
        title={suspectModal?.name}
      >
        {suspectModal && (
          <div>
            <img src={suspectModal.image} className="modal-suspect-img" alt={suspectModal.name} />
            <h4>Occupation: <span style={{ color: '#f90101' }}>{suspectModal.occupation}</span></h4>
            <p><strong>Alibi:</strong> {suspectModal.alibi}</p>
            <p><strong>Motive:</strong> {suspectModal.motive}</p>
            <div>
              <strong>Linked Clue:</strong>
              {renderClueConnection(suspectModal.clueId)}
            </div>
            {renderSuspectAttribution(suspectModal)}
            {allCluesFound && (
              <button
                style={{ marginTop: 24, background: '#f90101', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 22px', fontSize: 17, cursor: 'pointer' }}
                onClick={handleOpenAccusation}
              >Accuse {suspectModal.name}</button>
            )}
          </div>
        )}
      </Modal>

      {/* ==============================
          MODAL: ACCUSATION
        ============================== */}
      <AccusationModal
        open={accusationOpen}
        suspects={mockSuspects}
        onAccuse={handleAccuse}
        onCancel={() => setAccusationOpen(false)}
        disabledIds={disabledAccuses}
      />

      {/* ==============================
          MODAL: ACCUSATION RESULT
        ============================== */}
      <Modal open={!!lastResult} onClose={handleDismissResult}>
        {lastResult && (
          lastResult.win
            ? (
              <div className="result-modal win">
                <h2>🎉 Correct! {lastResult.suspect.name} is the culprit!</h2>
                <p style={{ color: '#f90101', fontWeight: 600 }}>Justice is served.</p>
                <button onClick={handleDismissResult} className="modal-cancel-btn">Restart</button>
              </div>
            ) : (
              <div className="result-modal lose">
                <h2>❌ {lastResult.suspect.name} is NOT the culprit.</h2>
                <p style={{ color: '#f90101', fontWeight: 600 }}>Keep looking at motives and clues!</p>
                <button onClick={handleDismissResult} className="modal-cancel-btn">Try Again</button>
              </div>
            )
        )}
      </Modal>

      <AttributionFooter />
    </div>
  );
}

export default App;
