/* ==========================================================================
   KAZA CAFÉ — MASCOTTES
   Redessinées au trait depuis le menu imprimé : sandwich, tasse fumante,
   verre glacé, biscuit souriant. Chacune a de petites jambes.
   Couleur = currentColor (hérite du texte). Animations dans base.css :
   .m-walk (les jambes marchent), la tasse fume, le biscuit cligne des yeux.
   ========================================================================== */
(function () {
  const svg = (cls, body, label) =>
    `<svg class="m ${cls}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"'}>${body}</svg>`;

  const legs = (x1, x2, y) =>
    `<g class="legs"><path class="leg leg-l" d="M${x1} ${y}v8h-4"/><path class="leg leg-r" d="M${x2} ${y}v8h4"/></g>`;

  const M = {
    sandwich: (label) => svg("m-sandwich",
      `<path d="M13 27c0-9 8.5-14.5 19-14.5S51 18 51 27z"/>
       <path d="M24 18.5l1.5-1M31 16.5l1.5-.5M38 18l1.5 1" stroke-width="2"/>
       <path d="M12 31c2.5-2.4 5 2.4 7.5 0s5 2.4 7.5 0 5 2.4 7.5 0 5 2.4 7.5 0 5 2.4 7.5 0 5 2.4 7.5 0"/>
       <path d="M13 35.5h38"/>
       <path d="M13.5 39.5h37c0 4-2.6 6.5-6 6.5H19.5c-3.4 0-6-2.5-6-6.5z"/>
       ${legs(25, 39, 46)}`, label),

    cup: (label) => svg("m-cup",
      `<g class="steam"><path d="M25 5.5c-2 2.6 2 4.6 0 7.5"/><path d="M32 3.5c-2 2.6 2 4.6 0 7.5"/><path d="M39 5.5c-2 2.6 2 4.6 0 7.5"/></g>
       <path d="M17 18h30l-3.2 22.5H20.2z"/>
       <path d="M46.6 22.5c6.4-.6 6.8 10.6-1.6 11"/>
       <path d="M13 44c0 2 8.5 3.6 19 3.6S51 46 51 44c0-1.8-8.5-3.4-19-3.4S13 42.2 13 44z"/>
       ${legs(25, 39, 47.6)}`, label),

    glass: (label) => svg("m-glass",
      `<path d="M37 15l5-10.5"/>
       <path d="M18 15h28"/>
       <path d="M19.5 15l3 31h19l3-31"/>
       <rect x="25.5" y="23" width="6" height="6" rx="1.2" transform="rotate(-12 28.5 26)" stroke-width="2"/>
       <rect x="33" y="28" width="5.5" height="5.5" rx="1.2" transform="rotate(10 35.75 30.75)" stroke-width="2"/>
       ${legs(27, 37, 46)}`, label),

    cookie: (label) => svg("m-cookie",
      `<circle cx="32" cy="26" r="18"/>
       <g class="eyes"><circle cx="26" cy="23.5" r="1.9" fill="currentColor" stroke="none"/><circle cx="38" cy="23.5" r="1.9" fill="currentColor" stroke="none"/></g>
       <path d="M25.5 30.5c3.4 3.4 9.6 3.4 13 0"/>
       <g fill="currentColor" stroke="none" opacity=".42"><circle cx="21" cy="17" r="1.6"/><circle cx="41" cy="15" r="1.4"/><circle cx="44" cy="29" r="1.6"/><circle cx="20" cy="31" r="1.3"/><circle cx="32" cy="38.5" r="1.5"/><circle cx="31" cy="13" r="1.2"/></g>
       ${legs(26, 38, 44)}`, label)
  };

  window.KazaMascots = M;
})();
