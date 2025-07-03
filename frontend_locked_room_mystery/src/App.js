import React, { useState, useEffect } from 'react';
import './App.css';

/* 
  Refactored Locked Room Mystery Game – Dynamic, Deductive Interrogation
  (c) 2024 — Freepik Asset integration/attribution preserved.
*/

// --- STATIC ASSETS, CLUE ICONS AND MAPPINGS --- (from Freepik doc)
const CRIME_SCENE_IMAGE =
  'https://img.freepik.com/free/vector/detective-investigating-murder-crime-scene_24640459.htm'; // page url for attribution

const CRIME_SCENE_IMAGE_DIRECT =
  'https://img.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.jpg?w=1480&t=st=1689060000~exp=1689060600~hmac=c8ab2cd6a42f0fe3eeb37c36493d23e14c4125618a7026ebb3eb98bbb254cbef';

const CLUE_ICONS = [
  'https://cdn-icons-png.flaticon.com/512/3062/3062634.png', // Bloody Knife Flat Icon
  'https://cdn-icons-png.flaticon.com/512/61/61456.png',     // Fingerprint Icon
  'https://cdn-icons-png.flaticon.com/512/866/866218.png',   // Gold Watch Icon
  'https://cdn-icons-png.flaticon.com/512/993/993651.png',   // Blood Stain/Spatter Icon
  'https://cdn-icons-png.flaticon.com/512/4151/4151862.png'  // Key Icon
];
const CLUE_ATTRIBUTIONS = [
  "Knife icon by Freepik",
  "Fingerprint icon by Freepik",
  "Watch icon by Freepik",
  "Blood stain icon by Freepik",
  "Key icon by Freepik"
];

const SUSPECT_IMAGES = [
  'https://img.freepik.com/free-vector/policeman-character-design_1308-102774.jpg',
  'https://img.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.jpg',
  'https://img.freepik.com/free/vector/hand-drawn-cartoon-thief-character_1308-133295.jpg',
  'https://img.freepik.com/free/vector/old-lady-character_1308-133288.jpg',
  'https://img.freepik.com/free/vector/young-man-character_1308-144883.jpg'
];

// --- SUSPECTS and QUESTION BANK (each suspect must be interrogated) ---
const baseSuspects = [
  {
    id: 1,
    name: 'Officer Redmond',
    occupation: 'Police Officer',
    image: SUSPECT_IMAGES[0]
  },
  {
    id: 2,
    name: 'Linda Crumb',
    occupation: 'Pastry Chef',
    image: SUSPECT_IMAGES[1]
  },
  {
    id: 3,
    name: 'Vic Shade',
    occupation: 'Cat Burglar',
    image: SUSPECT_IMAGES[2]
  },
  {
    id: 4,
    name: 'Mrs. Gertrude Ash',
    occupation: 'Retired Teacher',
    image: SUSPECT_IMAGES[3]
  },
  {
    id: 5,
    name: 'Ned Glassman',
    occupation: 'Student (Nerdy Guy)',
    image: SUSPECT_IMAGES[4]
  }
];

// Each entry: question id, question string, "knowledge" (answer), and optionally a clueId to reveal if first time asked
const questionTemplates = [
  {
    key: "alibi",
    text: "Where were you at the time of the murder?"
  },
  {
    key: "motive",
    text: "Did you have any reason to harm the victim?"
  },
  {
    key: "clue",
    text: "Can you explain how this clue relates to you?"
  },
  {
    key: "rumor",
    text: "What do you know about the other suspects?"
  },
  {
    key: "scene",
    text: "Did you notice anything unusual in the crime scene?"
  },
  {
    key: "relationship",
    text: "Describe your relationship with the victim."
  },
  // Add further for variety
];

// Individual suspect responses, clue assignment, and linkage (killer defined at runtime!)
const SUSPECT_PROFILES = [
  {
    id: 1,
    alibi: "I arrived after the commotion. My own watch was already in the room—odd, since I never take it off.",
    motive: "The victim exposed my shady partnerships. I wouldn't have risked my career over it.",
    clue: "That gold watch? Yes, it's mine. But someone could have stolen and planted it.",
    rumor: "The burglar has a record, and the chef was seen arguing with the victim last week.",
    scene: "The room seemed ransacked, as if someone searched for something.",
    relationship: "Professional—sometimes adversarial, but not deadly.",
  },
  {
    id: 2,
    alibi: "I was busy in the kitchen making soufflé. I never left, except to check the oven.",
    motive: "The victim's reviews nearly ruined my business, but I'd never resort to murder!",
    clue: "That fingerprint? I lean on that windowsill when I daydream, that's all.",
    rumor: "The old lady heard things nobody else did; she's always snooping.",
    scene: "I heard a muffled sound through the vent around 7:15. It startled me.",
    relationship: "Just a regular customer—not a friend, not an enemy.",
  },
  {
    id: 3,
    alibi: "I'm a thief, not a killer! I was at the next-door flat cracking a safe, not in here.",
    motive: "No motive, except maybe getting caught in the act. But murder, that's not my style.",
    clue: "Yes, that's my knife—well, was. Someone must've grabbed it from my kit.",
    rumor: "The cop had the most to lose, if caught for corruption.",
    scene: "I saw someone slip into this room as I fled through the window.",
    relationship: "Victim tried to stop me once, but I slipped away.",
  },
  {
    id: 4,
    alibi: "I must have dozed off in my chair. The commotion woke me, but I barely heard anything.",
    motive: "The victim failed my grandson, but that's no cause for violence.",
    clue: "That little key? I lost it ages ago—didn't even notice it was gone.",
    rumor: "That nerdy boy argued with the victim over some contest.",
    scene: "I only saw shadows under the door.",
    relationship: "We exchanged pleasantries—not much else.",
  },
  {
    id: 5,
    alibi: "I was deep into a science book, oblivious to the world. No one ever notices me.",
    motive: "He dismissed my research, made a joke of my ideas… but I’d never hurt anyone.",
    clue: "Blood stain? Gross! Maybe I cut myself—paper can be vicious.",
    rumor: "The chef and the cop… something tense between them.",
    scene: "Heard footsteps running, then silence.",
    relationship: "He barely knew my name.",
  }
];

// All clues, but now to be revealed only per suspect and question type
const ALL_CLUES = [
  {
    id: 1,
    name: 'Bloody Knife',
    description: 'A blood-stained kitchen knife found near the sofa. Someone left it in a hurry.',
    icon: CLUE_ICONS[0],
    attribution: CLUE_ATTRIBUTIONS[0]
  },
  {
    id: 2,
    name: 'Gold Watch',
    description: 'An expensive gold watch, stopped at 7:20 PM. The owner must have struggled.',
    icon: CLUE_ICONS[2],
    attribution: CLUE_ATTRIBUTIONS[2]
  },
  {
    id: 3,
    name: 'Fingerprint',
    description: 'A clear fingerprint found on the window lock. Might belong to the culprit.',
    icon: CLUE_ICONS[1],
    attribution: CLUE_ATTRIBUTIONS[1]
  },
  {
    id: 4,
    name: 'Blood Stain',
    description: 'A subtle blood spatter, hidden on the carpet. Only visible on close look.',
    icon: CLUE_ICONS[3],
    attribution: CLUE_ATTRIBUTIONS[3]
  },
  {
    id: 5,
    name: 'Key',
    description: 'A small brass key, tucked under a magazine. Was it used to lock the room?',
    icon: CLUE_ICONS[4],
    attribution: CLUE_ATTRIBUTIONS[4]
  }
];

const STORY_INTRO =
  'A scream echoes from the penthouse. The famous food critic is found dead! The room is locked from inside, but clues are scattered. Who did it? There are secrets hidden in every answer — question the suspects carefully!';

// --- Helper for random integer in [min, max] ---
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==================== COMPONENTS ====================

// --- Modal --- (for generic popups)
function Modal({ open, onClose, title, children }) {
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

// --- Crime Scene --- (static image + illustrated overlay with clue "shadows")
function CrimeSceneCanvas({ revealedClues }) {
  // Display only the icons for clues already discovered, in their proper (fake) scene positions (positions are arbitrary)
  // For greater immersion, we might show "shadows" for unfound clues, but for simplicity, only found clues get shown.
  const clueSceneLocations = [
    { x: 65, y: 78 }, // knife
    { x: 39, y: 60 }, // watch
    { x: 88, y: 35 }, // fingerprint
    { x: 73, y: 59 }, // blood stain
    { x: 15, y: 83 }, // key
  ];
  return (
    <div className="crime-scene-canvas" style={{ position: 'relative' }}>
      <a
        href={CRIME_SCENE_IMAGE}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-label="Freepik crime scene attribution"
        style={{ position: 'absolute', left: 3, top: 3, zIndex: 5, fontSize: 8, color: '#999' }}
      >
        Crime scene by upklyak (Freepik)
      </a>
      <img
        src={CRIME_SCENE_IMAGE_DIRECT}
        alt="Crime Scene (illustrated by upklyak/Freepik)"
        className="crime-scene-img"
        style={{ width: '100%', borderRadius: 24, boxShadow: '0 4px 40px #0a0a0a33' }}
      />
      {revealedClues.map((clueId, idx) => {
        const clue = ALL_CLUES.find(cl => cl.id === clueId);
        if (!clue) return null;
        const pos = clueSceneLocations[idx] || {x: 20, y: 20+10*idx};
        return (
          <div
            key={clue.id}
            className="clue-icon-btn found"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              pointerEvents: 'none'
            }}
            title={clue.name}
          >
            <img src={clue.icon} alt={clue.name} className="clue-icon-img" style={{opacity: 0.83}} />
          </div>
        );
      })}
    </div>
  );
}

// --- Suspect Tray --- (click to interrogate, show disabled/locked or accusation status)
function SuspectTray({ suspects, progress, onInterrogate, canAccuse }) {
  return (
    <div className={`suspect-tray revealed`}>
      <h3>Suspects</h3>
      <div className="suspect-list">
        {suspects.map(suspect => {
          const qCount = (progress[suspect.id]?.questionsAsked.length || 0);
          const ready = qCount >= 3;
          return (
            <div
              className="suspect-card"
              key={suspect.id}
              tabIndex={canAccuse && ready ? 0 : -1}
              aria-label={`Interrogate suspect: ${suspect.name}`}
              onClick={() => onInterrogate(suspect)}
              style={{
                opacity: ready ? 1 : 0.68,
                pointerEvents: canAccuse || !ready ? 'auto' : 'auto'
              }}
            >
              <img src={suspect.image} alt={suspect.name} className="suspect-img" />
              <div className="suspect-name">{suspect.name}</div>
              <span style={{
                color: ready ? "#0a0" : "#b80000",
                fontWeight: 600,
                fontSize: "0.97em"
              }}>
                {ready
                  ? <span>Ready</span>
                  : <span>{3 - qCount} more question{3 - qCount !== 1 ? 's' : ''}</span>}
              </span>
              {ready && canAccuse && (
                <button
                  className="accuse-btn"
                  style={{ marginTop: 8, fontWeight: 700 }}
                  onClick={e => {
                    e.stopPropagation();
                    onInterrogate(suspect, true);
                  }}
                >Accuse</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Interrogation Modal (dynamic Q/A with clue reveals) ---
function InterrogationModal({
  open,
  suspect,
  profile,
  asked,
  onAsk,
  revealedClues,
  onClose,
  accusationAvailable,
  onAccuse
}) {
  if (!open || !suspect || !profile) return null;
  // Deny already asked question types
  const unanswered = questionTemplates.filter(q => !asked.includes(q.key));
  const clueAwardMap = {
    3: 1, // Vic Shade (burglar) -> knife
    2: 3, // Linda Crumb (chef) -> fingerprint
    1: 2, // Officer Redmond -> watch
    4: 5, // Mrs. Ash -> key
    5: 4, // Ned Glassman -> blood stain
  };
  // For each question type, show disabled if asked, and attach which clue (if first time for each type)
  return (
    <Modal open={open} onClose={onClose} title={`Interrogating: ${suspect.name}`}>
      <div style={{marginBottom:12}}>
        <img src={suspect.image} alt={suspect.name} className="modal-suspect-img" />
        <div><strong>Occupation:</strong> <span style={{color:'#f90101'}}>{suspect.occupation}</span></div>
        <div style={{margin:'8px 0'}}><em>Select a topic to question. Minimum 3 are required before you can accuse.</em></div>
        <ul style={{listStyle:'none', padding:0, margin:'16px 0 0 0'}}>
          {questionTemplates.map(q => (
            <li key={q.key} style={{marginBottom:6}}>
              <button
                disabled={asked.includes(q.key)}
                className="modal-cancel-btn"
                style={{
                  background: asked.includes(q.key) ? '#bbb' : '#f90101',
                  cursor: asked.includes(q.key) ? 'not-allowed' : "pointer",
                  marginBottom: 1,
                  fontWeight: 600
                }}
                onClick={() => !asked.includes(q.key) && onAsk(q)}
              >
                {q.text}
              </button>
              {asked.includes(q.key) && (
                <span style={{fontSize:'0.85em',color:'#0a0a0a88',marginLeft:7}}>(Asked)</span>
              )}
            </li>
          ))}
        </ul>
        <div style={{margin:'16px 0 0 0',fontSize:'0.98em'}}>
          <strong>Answered topics:</strong>
          <div>
            {asked.length === 0
              ? <span style={{color:'#b80000'}}>No questions asked yet.</span>
              : asked.map(k=><span key={k} style={{marginRight:5, color:'#06b'}}>{questionTemplates.find(q=>q.key===k)?.text}</span>)}
          </div>
        </div>
      </div>
      {/* Once enough topics asked, accusation is available */}
      {accusationAvailable && (
        <div className="modal-actions" style={{marginTop:22}}>
          <button className="modal-accuse-btn" onClick={()=>onAccuse(suspect)}>Accuse {suspect.name}</button>
        </div>
      )}
    </Modal>
  );
}

// --- Answer Modal (show the response to a selected question, with optional clue reveal) ---
function QAResultModal({ open, question, answer, clue, onClose }) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose} title={question?.text || "Q&A"}>
      <div style={{margin:"0 0 10px 0",fontWeight:600}}>{answer}</div>
      {clue && (
        <div style={{margin:"18px 0 0 0"}}>
          <div style={{fontWeight:600,marginBottom:8}}><span role="img" aria-label="clue">🕵️‍♂️</span> New Clue Found:</div>
          <img src={clue.icon} alt={clue.name} className="modal-clue-img" />
          <div style={{margin:'6px 0',fontWeight:700}}>{clue.name}</div>
          <div style={{fontSize:'0.93em',lineHeight:1.28,maxWidth:260}}>{clue.description}</div>
        </div>
      )}
      <div>
        <a
          href="https://www.freepik.com/about_us#nav-freepik-license"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#888", fontSize: 12, textDecoration: "underline" }}
        >Asset credits & license</a>
      </div>
    </Modal>
  );
}

// --- Modal for determining result of accusation (win/lose), including randomized killer
function AccusationResultModal({ open, correct, suspect, killerProfile, onClose }) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose}>
      {correct ? (
        <div className="result-modal win">
          <h2>🎉 {suspect.name} is the killer!</h2>
          <p style={{ color: '#f90101', fontWeight: 600 }}>Justice is served.<br />You deduced the culprit!</p>
          <div style={{margin:"10px 0 8px 0"}}>
            <img src={killerProfile?.image} alt={killerProfile?.name} className="modal-suspect-img" />
          </div>
          <button className="modal-cancel-btn" onClick={onClose}>Play Again</button>
        </div>
      ) : (
        <div className="result-modal lose">
          <h2>❌ {suspect.name} is NOT the killer.</h2>
          <p style={{ color: '#f90101', fontWeight: 600 }}>Keep interrogating and look for inconsistencies.<br />Think about clues and psychology!</p>
          <button className="modal-cancel-btn" onClick={onClose}>Try Again</button>
        </div>
      )}
    </Modal>
  );
}

// --- Attribution Footer ---
function AttributionFooter() {
  return (
    <footer className="main-footer" style={{ marginTop: 24, color: '#0a0a0a99', fontSize: 13 }}>
      &copy; {new Date().getFullYear()} Cartoon Locked Room Mystery &mdash; 
      Color palette: <span style={{ color: '#f90101' }}>#f90101</span>,{' '}
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
        upklyak, pch.vector & icon contributors &nbsp;|&nbsp;
        <a
          href="https://www.freepik.com/about_us#nav-freepik-license"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#888" }}
        >license info</a>
      </span>
    </footer>
  );
}

// ==================== GAME LOGIC AND APP ====================

// PUBLIC_INTERFACE
function App() {
  // --- State ---
  const [showIntro, setShowIntro] = useState(true);
  const [gameId, setGameId] = useState(randInt(100,9999)); // for forcing reset
  // killerId (chosen at game start)
  const [killerId, setKillerId] = useState(null);
  // Track per-suspect progress: { [suspectId]: { questionsAsked: [key], clueIds: [id] } }
  const [progress, setProgress] = useState({});
  // All clues discovered (by clue id)
  const [revealedClues, setRevealedClues] = useState([]);
  // Current interrogation session
  const [currentSuspect, setCurrentSuspect] = useState(null); // suspect obj
  const [currentProfile, setCurrentProfile] = useState(null); // profile obj
  // For QA - which question in progress
  const [qaModal, setQaModal] = useState({ open: false, question: null, answer: '', clue: null });
  // For endgame
  const [accuseOpen, setAccuseOpen] = useState(false);
  const [accuseSuspect, setAccuseSuspect] = useState(null);
  const [resultModal, setResultModal] = useState({ open: false, correct: false, suspect: null });

  // --- Start/Reset logic (initialize gameplay random killer, reset all state) ---
  useEffect(() => {
    // Pick killer randomly
    const newKillerId = baseSuspects[randInt(0, baseSuspects.length-1)].id;
    setKillerId(newKillerId);
    // Reset progression, clues, modals
    setProgress({});
    setRevealedClues([]);
    setCurrentSuspect(null);
    setCurrentProfile(null);
    setQaModal({ open: false, question: null, answer: '', clue: null });
    setAccuseOpen(false);
    setAccuseSuspect(null);
    setResultModal({ open: false, correct: false, suspect: null });
    // eslint-disable-next-line
  }, [gameId]);

  // --- Interrogation/QA Handling ---
  function handleInterrogate(suspect, forceAccuse = false) {
    const sid = suspect.id;
    setCurrentSuspect(suspect);
    setCurrentProfile(SUSPECT_PROFILES.find(sp => sp.id === sid));
    setQaModal({ open: false, question: null, answer: '', clue: null });
    setAccuseSuspect(forceAccuse ? suspect : null);
    setAccuseOpen(forceAccuse);
  }

  function handleAskQuestion(q) {
    // Get answer from suspect profile
    if (!currentProfile || !currentSuspect) return;
    const answerRaw = currentProfile[q.key];
    let answer = answerRaw || "No comment.";
    // Clue reward? Only if: not already revealed in player inventory
    let clueReward = null;
    // Each suspect is linked to a specific clue (see above mapping), only one per suspect, and only for certain question category!
    // Only allow for first time a specific question category is asked
    const clueAwardMap = {
      3: 1, // Vic Shade (burglar) -> knife
      2: 3, // Linda Crumb (chef) -> fingerprint
      1: 2, // Officer Redmond -> watch
      4: 5, // Mrs. Ash -> key
      5: 4, // Ned Glassman -> blood stain
    };
    const specialCategory = ["clue", "scene", "alibi"];
    // Only for first special category per suspect, in the order above
    if (
      specialCategory.includes(q.key) &&
      !revealedClues.includes(clueAwardMap[currentSuspect.id]) &&
      !(progress[currentSuspect.id]?.clueIds || []).includes(clueAwardMap[currentSuspect.id])
    ) {
      clueReward = ALL_CLUES.find(c => c.id === clueAwardMap[currentSuspect.id]);
    }
    // Update progress
    setProgress(prev => {
      const old = prev[currentSuspect.id] || { questionsAsked: [], clueIds: [] };
      const newClueIds = clueReward ? [...old.clueIds, clueReward.id] : old.clueIds;
      return {
        ...prev,
        [currentSuspect.id]: {
          questionsAsked: [...old.questionsAsked, q.key],
          clueIds: newClueIds
        }
      };
    });
    // Update global clues if revealed
    if (clueReward && !revealedClues.includes(clueReward.id)) {
      setRevealedClues(prev => [...prev, clueReward.id]);
    }
    // Display answer + reward
    setQaModal({
      open: true,
      question: q,
      answer,
      clue: clueReward
    });
  }

  function handleEndQA() {
    setQaModal({ open: false, question: null, answer: '', clue: null });
    // If all requirements met, enable accusation
    setCurrentSuspect(currentSuspect); // force modal rerender for accusation enable
  }

  // --- Accusation Flow ---
  function handleOpenAccuse() {
    setAccuseOpen(true);
  }
  function handleAccuse(suspect) {
    const correct = suspect.id === killerId;
    setResultModal({
      open: true,
      correct,
      suspect,
      killerProfile: baseSuspects.find(s => s.id === killerId)
    });
    setAccuseOpen(false); setAccuseSuspect(null);
    setCurrentSuspect(null); setCurrentProfile(null);
  }
  function handleResetGame() {
    setGameId(randInt(100,999999)); // triggers reinit
    setShowIntro(true);
  }
  function handleCloseResultModal() {
    setResultModal({ open: false, correct: false, suspect: null });
    handleResetGame();
  }

  // --- Main render variables ---
  // After all suspects are ready (each questioned 3+ times), enable accusation
  const allReady = baseSuspects.every(s =>
    (progress[s.id]?.questionsAsked.length || 0) >= 3
  );
  // Show suspects always (player picks who to interrogate), accusation after allReady
  return (
    <div className="App" data-theme='light' style={{ background: '#fcfcfc', color: '#0a0a0a', minHeight: '100vh' }}>
      {/* STORY INTRO */}
      <Modal open={showIntro} onClose={() => setShowIntro(false)}>
        <div className="intro-modal">
          <h1 style={{ color: '#f90101', fontFamily: 'cursive', fontWeight: 700, fontSize: 36, marginBottom: 12 }}>
            Locked Room Mystery!
          </h1>
          <p style={{ fontSize: 20, margin: '8px 0 16px' }}>{STORY_INTRO}</p>
          <button style={{
            background: '#f90101', color: '#fff', border: 'none', fontWeight: 600, borderRadius: 8,
            padding: '12px 24px', fontSize: 18, cursor: 'pointer', marginTop: 14
          }} onClick={() => setShowIntro(false)}>
            Enter the Scene
          </button>
        </div>
      </Modal>
      {/* CRIME SCENE */}
      <main className="main-layout">
        <h1 className="main-title" style={{
          color: '#f90101', marginBottom: 8, fontFamily: 'cursive', fontWeight: 'bold' 
        }}>
          Cartoon Crime Scene
        </h1>
        <p className="subtitle" style={{
          color: '#0a0a0a', marginBottom: 14, fontWeight: 500 
        }}>
          Interrogate each suspect (minimum 3 topics each) to reveal clues and unlock accusation.<br />
          Gather all clues and deduce the killer logically!
        </p>
        <div className="main-content">
          <CrimeSceneCanvas revealedClues={revealedClues}/>
        </div>
      </main>
      {/* SUSPECTS TRAY */}
      <SuspectTray
        suspects={baseSuspects}
        progress={progress}
        onInterrogate={handleInterrogate}
        canAccuse={allReady}
      />

      {/* INTERROGATION MODAL */}
      <InterrogationModal
        open={!!currentSuspect && !accuseOpen}
        suspect={currentSuspect}
        profile={currentProfile}
        asked={progress[currentSuspect?.id]?.questionsAsked || []}
        revealedClues={revealedClues}
        onAsk={handleAskQuestion}
        onClose={() => { setCurrentSuspect(null); setCurrentProfile(null); }}
        accusationAvailable={(progress[currentSuspect?.id]?.questionsAsked.length || 0) >= 3 && allReady}
        onAccuse={handleAccuse}
      />
      {/* Q/A RESPONSE MODAL */}
      <QAResultModal
        open={qaModal.open}
        question={qaModal.question}
        answer={qaModal.answer}
        clue={qaModal.clue}
        onClose={handleEndQA}
      />

      {/* ACCUSATION START (pick suspect, after allReady) */}
      {/* Modal replaced: Accuse button now always on each ready-card */}
      {/* ACCUSATION RESULT */}
      <AccusationResultModal
        open={resultModal.open}
        correct={resultModal.correct}
        suspect={resultModal.suspect}
        killerProfile={resultModal.killerProfile}
        onClose={handleCloseResultModal}
      />

      {/* Attribution */}
      <AttributionFooter />
    </div>
  );
}

export default App;
