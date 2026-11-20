import { useEffect, useRef, useState } from 'react';
import './CrochetGallery.scss';

const labels = ["A little bunny glasses tray", "Pink crochet flower coaster", "Matcha with a handmade coaster", "A second flower coaster study", "An afternoon matcha break", "A sunny matcha break"];
const studies = labels.map((label, i) => ({
  id: i + 1, label,
  src: `${process.env.PUBLIC_URL || ''}/crochet/photo-${String(i + 1).padStart(2, '0')}.jpg`,
}));

function StudyPhoto({ photo }) {
  const [available, setAvailable] = useState(true);
  return <figure className="crochet-photo">
    <div className="crochet-photo-space">
      <span className="crochet-placeholder" aria-hidden="true">{photo.id % 2 ? '✿' : '✳'}</span>
      {available && <img loading="lazy" src={photo.src} alt={photo.label} onError={() => setAvailable(false)}/>}
    </div>
    <figcaption>{photo.label}</figcaption>
  </figure>;
}

export default function CrochetGallery({ onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const scrollBefore = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const buttons = [...document.querySelectorAll('.crochet-overlay button, .crochet-overlay a')].filter(el => !el.disabled);
        if (!buttons.length) return;
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = scrollBefore; document.removeEventListener('keydown', onKey); };
  }, [onClose]);
  return <div className="crochet-overlay" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="crochet-dialog" role="dialog" aria-modal="true" aria-labelledby="crochet-title">
      <div className="crochet-dialog-top"><span>✳ AN AFTER-HOURS LITTLE CORNER</span><button ref={closeRef} type="button" onClick={onClose} aria-label="Close crochet gallery">close ×</button></div>
      <div className="crochet-dialog-heading"><div><h2 id="crochet-title">little <em>stitches.</em></h2><p>Things I'm learning to make, one loop at a time.</p></div><span aria-hidden="true">✿</span></div>
      <div className="crochet-gallery-grid">{studies.map(photo => <StudyPhoto key={photo.id} photo={photo}/>)}</div>
      <p className="crochet-dialog-footer">a little handmade detour ♡</p>
    </div>
  </div>;
}
