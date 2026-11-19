import { useEffect, useRef, useState } from 'react';
import { mountAsciiBunny } from './bunnyEngine';

export default function AsciiBunny() {
  const ref = useRef(null);
  const [message, setMessage] = useState('she hops all on her own ♡');
  useEffect(() => mountAsciiBunny(ref.current, { onGreet: setMessage }), []);
  return (
    <div className="bunny-composition">
      <span className="hand-note" aria-hidden="true">psst… she'll hop! ↙</span>
      <div className="bunny-window">
        <span className="bunny-star first" aria-hidden="true">✳</span>
        <span className="bunny-star second" aria-hidden="true">✧</span>
        <canvas ref={ref} width={500} height={540} role="button" tabIndex={0}
          aria-label="A flowing ASCII rabbit with a tiny flower tucked into its ear. It hops on its own; click or press Enter to make it hop." />
      </div>
      <div className="bunny-caption"><span>INTERACTIVE ASCII STUDY / 001</span><span aria-live="polite">{message}</span></div>
    </div>
  );
}
