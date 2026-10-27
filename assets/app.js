// Concept 4 — Signature. Renders the navigation, footer and global overlays,
// then wires up every interactive feature used across the pages: dark mode,
// mega menus, search palette, call-back form, lightboxes, counters,
// countdowns, filters, course finder, quizzes, the book store (cart +
// checkout + payment gateway mock) and the city-wise gallery.
(function () {
  var page = document.body.dataset.page || "";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var inr = function (n) { return "₹" + n.toLocaleString("en-IN"); };

  var I = {
    search: '<path d="M21 21l-4.3-4.3"/><circle cx="11" cy="11" r="7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20V2H6.5A2.5 2.5 0 004 4.5v15zM4 19.5A2.5 2.5 0 006.5 22H20"/>',
    quiz: '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9"/>',
    play: '<rect x="2" y="4" width="20" height="16" rx="4"/><path d="M10 9l5 3-5 3z"/>',
    news: '<path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zM18 14h-8M15 18h-5M10 6h8v4h-8z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/>',
    cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    star: '<path d="M12 2l3 6.5 7 1-5 5 1.2 7L12 18l-6.2 3.5L7 14.5l-5-5 7-1z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    pen: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    file: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
    users: '<path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.3L7 22l5-3 5 3-1.2-8.7"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM17 6h3v2a3 3 0 01-3 3M7 6H4v2a3 3 0 003 3"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0M12 17v5"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    bag: '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/>',
    building: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>'
  };
  function ic(name, cls) { return '<svg class="' + (cls || "ic") + '" viewBox="0 0 24 24" aria-hidden="true">' + I[name] + "</svg>"; }

  // ---------- Site data ----------
  var BRANCHES = [
    { key: "hyderabad", city: "Hyderabad", phones: ["9966436875", "8179100389"], addr: "Bala Latha's CSB IAS Academy Main Branch, Tushara Building, Ashok Nagar, Hyderabad, Telangana — 500080" },
    { key: "vijayawada", city: "Vijayawada", phones: ["9989589222", "9030999129"], addr: "Lagadapati's Block, Andhra Loyola College, Veterinary Colony, Vijayawada, Andhra Pradesh — 520008" },
    { key: "tirupati", city: "Tirupati", phones: ["8121993444", "8121776555"], addr: "New Balaji Colony, Opposite Sonovision, Air Bypass Road, Tirupati, Andhra Pradesh — 517501" }
  ];
  var fmtPhone = function (p) { return p.slice(0, 5) + " " + p.slice(5); };

  // Book catalogue (mock prices) — shared by home, books, book detail, cart and checkout
  var BOOKS = [
    { id: "ap-ca", t: "AP Current Affairs", k: "CSB PUBLICATIONS", tag: "2026 EDITION", s: "red", cat: "state", lang: "English · Telugu", p: 349, m: 449, d: "Andhra Pradesh current affairs for APPSC Group 1 & 2 — schemes, budget, economy and events." },
    { id: "ts-ca", t: "Telangana Current Affairs", k: "CSB PUBLICATIONS", tag: "2026 EDITION", s: "", cat: "state", lang: "English · Telugu", p: 349, m: 449, d: "Telangana-focused current affairs for TGPSC Groups with practice MCQs." },
    { id: "monthly", t: "Current Affairs Monthly", k: "OCTOBER 2026", tag: "MAGAZINE", s: "black", cat: "magazine", lang: "English", p: 99, m: 120, d: "The month's national and international developments, analysed for UPSC with 100 MCQs." },
    { id: "polity", t: "Indian Polity & Governance", k: "CSB IAS ACADEMY", tag: "UPSC GS-II", s: "", cat: "civils", lang: "English", p: 499, m: 650, d: "Constitution, Parliament, judiciary, federalism and governance — Prelims and Mains ready." },
    { id: "economy", t: "Indian Economy", k: "CSB IAS ACADEMY", tag: "UPSC GS-III", s: "white", cat: "civils", lang: "English", p: 449, m: 599, d: "Concepts, budget, banking, Economic Survey highlights and practice questions." },
    { id: "ethics", t: "Ethics, Integrity & Aptitude", k: "CSB IAS ACADEMY", tag: "UPSC GS-IV", s: "red", cat: "civils", lang: "English", p: 399, m: 499, d: "Thinkers, case studies and answer frameworks for the Ethics paper." },
    { id: "history", t: "Modern Indian History", k: "CSB IAS ACADEMY", tag: "UPSC GS-I", s: "black", cat: "civils", lang: "English", p: 399, m: 520, d: "From 1757 to Independence — movements, leaders and timelines." },
    { id: "geo", t: "Geography of India & AP", k: "CSB GROUPS ACADEMY", tag: "APPSC · TGPSC", s: "white", cat: "state", lang: "Telugu", p: 379, m: 480, d: "Physical, economic and Andhra Pradesh geography with maps." },
    { id: "g1", t: "APPSC Group 1 Mains Guide", k: "CSB GROUPS ACADEMY", tag: "NEW", s: "red", cat: "state", lang: "English · Telugu", p: 599, m: 750, d: "Paper-wise strategy, model answers and previous questions for Group 1 Mains." },
    { id: "pyq", t: "UPSC Prelims PYQs 2013–2026", k: "CSB IAS ACADEMY", tag: "SOLVED", s: "", cat: "civils", lang: "English", p: 449, m: 599, d: "Fourteen years of Prelims questions, topic-wise with detailed explanations." },
    { id: "csat", t: "CSAT Practice Workbook", k: "CSB IAS ACADEMY", tag: "PAPER II", s: "black", cat: "civils", lang: "English", p: 299, m: 399, d: "Quant, reasoning and comprehension drills with timed sets." },
    { id: "essay", t: "Essay & Answer Writing", k: "CSB IAS ACADEMY", tag: "MAINS", s: "white", cat: "civils", lang: "English", p: 349, m: 450, d: "Structures, sample essays and 100 practice prompts." }
  ];
  var byId = {}; BOOKS.forEach(function (b) { byId[b.id] = b; });
  function cover(b) { return '<div class="bk ' + b.s + '"><small>' + b.k + "</small><b>" + b.t + "</b><em>" + b.tag + "</em></div>"; }
  function bookCard(b) {
    var off = Math.round((1 - b.p / b.m) * 100);
    return '<article class="book rv" data-cat="' + b.cat + '">' +
      '<a class="cover" href="book-detail.html?id=' + b.id + '" aria-label="' + b.t + '">' + cover(b) + "</a>" +
      '<div class="meta"><span class="pill">' + b.lang + "</span></div>" +
      '<h3><a href="book-detail.html?id=' + b.id + '">' + b.t + "</a></h3>" +
      '<div class="pr"><b>' + inr(b.p) + "</b><s>" + inr(b.m) + "</s><span>" + off + "% off</span></div>" +
      '<div class="acts"><button class="btn btn-ghost" type="button" data-add="' + b.id + '">Add to cart</button><button class="btn btn-red" type="button" data-buy="' + b.id + '">Buy now</button></div></article>';
  }

  // ---------- Navigation ----------
  var MENUS = [
    { label: "About", key: "about", side: ["About CSB", "Built by a two-time <em>civil servant.</em>", "about.html", "Our story"], links: [
      ["About the Academy", "16+ years of UPSC mentoring", "building", "about.html"],
      ["Balalatha Madam", "Founder · AIR 399 & AIR 167", "user", "founder.html"],
      ["Mentors", "One-to-one guidance", "users", "mentors.html"],
      ["Faculty", "Subject experts", "cap", "faculty.html"],
      ["Our Awards", "Recognition & honours", "trophy", "our-awards.html"],
      ["Branches", "Hyderabad · Vijayawada · Tirupati", "pin", "contact.html"]
    ] },
    { label: "Courses", key: "courses", side: ["Programmes", "Find the course that fits <em>your</em> stage.", "courses.html", "All courses"], links: [
      ["General Studies PCM", "Prelims-cum-Mains foundation", "book", "course-detail.html"],
      ["Degree + Civils", "Graduate + prepare from year one", "cap", "course-detail.html"],
      ["Mission Ekalavya", "Scholarship & mentorship track", "target", "course-detail.html"],
      ["Test Series", "Prelims & Mains, all-India rank", "quiz", "course-detail.html"],
      ["APPSC & TGPSC Groups", "CSB Groups Academy", "building", "courses.html"],
      ["Mentorship Programme", "Year-long guided preparation", "users", "course-detail.html"]
    ] },
    { label: "Results", key: "results", side: ["Results", "Real ranks. <em>Real</em> faces.", "rankers.html", "All results"], links: [
      ["Rankers", "UPSC Civil Services ranks", "award", "rankers.html"],
      ["Achievers", "APPSC, TGPSC & other services", "trophy", "achievers.html"],
      ["Student Videos", "Rankers' speeches & stories", "mic", "student-videos.html"]
    ] },
    { label: "Current Affairs", key: "current-affairs", side: ["Current Affairs", "Read today, <em>remember</em> on exam day.", "current-affairs.html", "All articles"], links: [
      ["Daily Current Affairs", "News analysed for UPSC", "news", "current-affairs.html"],
      ["Prelims", "Facts, schemes and maps", "target", "current-affairs.html"],
      ["Mains", "Model answers and analysis", "pen", "current-affairs.html"],
      ["Monthly Magazines", "Free PDF every month", "file", "current-affairs.html"],
      ["Important Notes", "One-page revision notes", "book", "current-affairs.html"],
      ["AP & TS Current Affairs", "For APPSC & TGPSC", "pin", "books.html"]
    ] },
    { label: "Gallery", key: "gallery", side: ["Gallery", "Our classrooms and <em>campuses.</em>", "gallery.html", "Open gallery"], links: [
      ["Classrooms", "Inside our lecture halls", "image", "gallery.html#classrooms"],
      ["Hyderabad", "Main branch · Ashok Nagar", "pin", "gallery.html#hyderabad"],
      ["Vijayawada", "Andhra Loyola College", "pin", "gallery.html#vijayawada"],
      ["Tirupati", "Air Bypass Road", "pin", "gallery.html#tirupati"]
    ] },
    { label: "More", key: "more", side: ["Learn free", "Videos, events and <em>daily</em> quizzes.", "videos.html", "Watch videos"], links: [
      ["Videos", "Lectures & news analysis", "play", "videos.html"],
      ["Events", "Seminars & workshops", "cal", "events.html"],
      ["Quizzes", "Daily practice & leaderboard", "quiz", "quiz.html"]
    ] }
  ];
  var ACTIVE = { about: "about", founder: "about", mentors: "about", faculty: "about", awards: "about", courses: "courses", results: "results", "current-affairs": "current-affairs", gallery: "gallery", videos: "more", events: "more", quiz: "more" };

  function megaLinks(list) {
    return list.map(function (l) {
      return '<a href="' + l[3] + '"><span class="mi">' + ic(l[2]) + "</span><span><b>" + l[0] + "</b><span>" + l[1] + "</span></span></a>";
    }).join("");
  }
  var chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' + I.chev + "</svg>";
  function menuBtn(m) {
    var on = ACTIVE[page] === m.key ? ' class="on"' : "";
    return '<button type="button"' + on + ' data-mega="mega-' + m.key + '" aria-expanded="false">' + m.label + chev + "</button>";
  }
  var M = {}; MENUS.forEach(function (m) { M[m.key] = m; });
  var onIf = function (k) { return page === k ? ' class="on"' : ""; };

  var nav =
    '<div class="progress" id="progress"></div>' +
    '<header class="nav" id="nav"><div class="nav-bar">' +
      '<a class="brand" href="index.html"><img src="assets/img/just_logo.png" alt=""><span><b>CSB IAS Academy</b><small>HYDERABAD · VIJAYAWADA · TIRUPATI</small></span></a>' +
      '<nav class="menu" aria-label="Main">' +
        '<a href="index.html"' + onIf("home") + ">Home</a>" +
        menuBtn(M.about) + menuBtn(M.courses) + menuBtn(M.results) + menuBtn(M["current-affairs"]) +
        '<a href="books.html"' + onIf("books") + ">Books</a>" +
        menuBtn(M.gallery) + menuBtn(M.more) +
        '<a href="contact.html"' + onIf("contact") + ">Contact</a>" +
      "</nav>" +
      '<div class="tools">' +
        '<button class="kbd-search" type="button" data-palette aria-label="Search">' + ic("search") + "<span>Search</span><kbd>Ctrl K</kbd></button>" +
        '<button class="tool cart-btn" type="button" data-cart aria-label="Open cart">' + ic("bag") + '<span class="count" data-n="0">0</span></button>' +
        '<button class="tool" type="button" id="mode" aria-label="Toggle dark mode">' + ic("moon") + "</button>" +
        '<button class="btn btn-red btn-sm nav-cta" type="button" data-callback>Free Counselling</button>' +
        '<button class="tool burger" type="button" id="burger" aria-label="Open menu">' + ic("menu") + "</button>" +
      "</div></div></header>" +
    MENUS.map(function (m) {
      var three = m.links.length > 4 ? " three" : "";
      return '<div class="mega" id="mega-' + m.key + '"><div class="mega-in' + (three ? " slim" : "") + '"><div class="mega-side"><div><span class="eyebrow">' + m.side[0] + '</span><h3 style="margin-top:10px">' + m.side[1] + '</h3></div><a class="link" href="' + m.side[2] + '">' + m.side[3] + " " + ic("arrow") + '</a></div><div class="mega-links' + three + '">' + megaLinks(m.links) + "</div></div></div>";
    }).join("") +
    '<div class="overlay" id="overlay" role="dialog" aria-label="Menu">' +
      '<button class="tool overlay-close" type="button" id="overlay-close" aria-label="Close menu">' + ic("x") + "</button>" +
      '<a class="big" href="index.html">Home ' + ic("arrow") + "</a>" +
      MENUS.map(function (m) {
        return '<a class="big" href="' + m.side[2] + '">' + m.label + " " + ic("arrow") + '</a><div class="subs">' + m.links.map(function (c) { return '<a class="chip" href="' + c[3] + '">' + c[0] + "</a>"; }).join("") + "</div>";
      }).join("") +
      '<a class="big" href="books.html">Books ' + ic("arrow") + "</a>" +
      '<a class="big" href="contact.html">Contact ' + ic("arrow") + "</a>" +
      '<div class="mode-row"><span>Dark mode</span><button class="tool" type="button" data-mode-alt aria-label="Toggle dark mode">' + ic("moon") + "</button></div>" +
      '<div style="margin-top:28px"><button class="btn btn-red" type="button" data-callback style="width:100%">Book Free Counselling</button></div>' +
    "</div>" +
    '<nav class="tabbar" aria-label="Quick">' +
      '<a href="index.html"' + onIf("home") + ">" + ic("home") + "Home</a>" +
      '<a href="courses.html"' + onIf("courses") + ">" + ic("book") + "Courses</a>" +
      '<a href="rankers.html"' + onIf("results") + ">" + ic("award") + "Results</a>" +
      '<a href="books.html"' + onIf("books") + ">" + ic("bag") + "Books</a>" +
      '<a href="contact.html"' + onIf("contact") + ">" + ic("phone") + "Contact</a>" +
    "</nav>" +
    '<a class="fab" href="https://wa.me/919966436875" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg></a>';

  // Search palette entries
  var INDEX = [
    ["Pages", "Home", "index.html"], ["Pages", "About the Academy", "about.html"], ["Pages", "Balalatha Madam — Founder", "founder.html"],
    ["Pages", "Mentors", "mentors.html"], ["Pages", "Faculty", "faculty.html"], ["Pages", "Rankers", "rankers.html"], ["Pages", "Achievers", "achievers.html"],
    ["Pages", "Student Videos — Rankers' speeches", "student-videos.html"], ["Pages", "Books Store", "books.html"], ["Pages", "Cart & Checkout", "checkout.html"],
    ["Pages", "All Courses", "courses.html"], ["Pages", "Current Affairs", "current-affairs.html"], ["Pages", "Videos", "videos.html"], ["Pages", "Events", "events.html"],
    ["Pages", "Quizzes", "quiz.html"], ["Pages", "Our Awards", "our-awards.html"], ["Pages", "Contact & Branches", "contact.html"],
    ["Gallery", "Classrooms", "gallery.html#classrooms"], ["Gallery", "Hyderabad branch", "gallery.html#hyderabad"], ["Gallery", "Vijayawada branch", "gallery.html#vijayawada"], ["Gallery", "Tirupati branch", "gallery.html#tirupati"],
    ["Courses", "General Studies PCM", "course-detail.html"], ["Courses", "Degree + IAS Integrated Program", "course-detail.html"], ["Courses", "Mission Ekalavya", "course-detail.html"], ["Courses", "Mains Test Series 2026", "course-detail.html"], ["Courses", "Mentorship Programme 2026-27", "course-detail.html"]
  ].concat(BOOKS.map(function (b) { return ["Books", b.t, "book-detail.html?id=" + b.id]; }));

  var overlays =
    '<div class="scrim" id="palette" role="dialog" aria-label="Search"><div class="palette">' +
      '<div class="palette-in">' + ic("search") + '<input id="palette-q" placeholder="Search courses, books, rankers, pages…" autocomplete="off"><kbd class="pill">Esc</kbd></div>' +
      '<ul id="palette-list"></ul><div class="foot-p" style="display:flex;gap:16px;padding:12px 18px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)"><span>↑ ↓ to move</span><span>Enter to open</span><span>Esc to close</span></div></div></div>' +
    '<div class="scrim" id="callback" role="dialog" aria-label="Request a callback"><div class="modal">' +
      '<button class="tool x" type="button" data-close aria-label="Close">' + ic("x") + "</button>" +
      '<span class="eyebrow">Free counselling</span><h3 style="font-size:32px;margin:10px 0 8px">Talk to a <em>mentor</em></h3><p class="muted" style="margin-bottom:22px">Leave your number — a counsellor from your nearest branch will call you back.</p>' +
      '<form class="form" data-demo-form><div class="field"><label for="cb-name">Name</label><input class="input" id="cb-name" required></div>' +
      '<div class="field"><label for="cb-phone">Phone</label><input class="input" id="cb-phone" type="tel" required></div>' +
      '<div class="row2"><div class="field"><label for="cb-int">Interested in</label><select class="input" id="cb-int"><option>UPSC Civils</option><option>APPSC / TGPSC Groups</option><option>Degree + Civils</option><option>Test Series</option><option>Mentorship</option></select></div>' +
      '<div class="field"><label for="cb-br">Branch</label><select class="input" id="cb-br"><option>Hyderabad</option><option>Vijayawada</option><option>Tirupati</option><option>Online</option></select></div></div>' +
      '<button class="btn btn-red" type="submit">Request a call back</button></form>' +
      '<p class="ok" hidden>Thank you! Our counsellor will call you shortly.</p></div></div>' +
    '<div class="scrim" id="lightbox" role="dialog" aria-label="Media"><div class="lightbox"><div class="frame" id="lb-frame"></div><p id="lb-cap"></p></div>' +
      '<button class="tool" type="button" data-close aria-label="Close" style="position:fixed;top:20px;right:20px">' + ic("x") + "</button></div>" +
    '<div class="drawer" id="cart" role="dialog" aria-label="Cart"><div class="shade" data-close-cart></div><div class="panel-d">' +
      '<header><h3>Your cart</h3><button class="tool" type="button" data-close-cart aria-label="Close cart">' + ic("x") + "</button></header>" +
      '<div class="items" id="cart-items"></div>' +
      '<footer id="cart-foot"><div class="row-sum"><span class="muted">Subtotal</span><span id="cart-sub">₹0</span></div><div class="row-sum"><span class="muted">Delivery</span><span id="cart-del">Free</span></div><div class="row-sum total"><span>Total</span><span id="cart-total">₹0</span></div><a class="btn btn-red" href="checkout.html">Checkout securely</a><a class="btn btn-ghost" href="books.html">Continue shopping</a></footer>' +
    "</div></div>";

  var SOCIAL = {
    YouTube: '<path d="M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.6 12a31 31 0 00.4 4.8 3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-4.8 31 31 0 00-.4-4.8zM9.8 15.1V8.9l5.7 3.1z"/>',
    Instagram: '<path fill-rule="evenodd" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 5.5a1 1 0 110 2 1 1 0 010-2z"/>',
    Facebook: '<path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>',
    Telegram: '<path d="M21.5 3.5L2.8 10.7c-1.3.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.4-1.4zM8.6 13.4l9.6-6c.5-.3.9-.1.5.2l-8.1 7.3-.3 3.4z"/>',
    X: '<path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.3 4.7H5.5z"/>'
  };
  var footer =
    '<footer class="foot"><div class="wrap">' +
      '<div class="foot-word">If you can dream it,<br><em>you can do it.</em></div>' +
      '<div class="foot-grid">' +
        '<div><img src="assets/img/logo.png" alt="CSB IAS Academy" style="height:52px;background:#fff;border-radius:10px;padding:4px 8px">' +
          '<p style="margin-top:16px;max-width:380px">Founded by Smt. Bala Latha Mallavarapu — empowering aspirants through excellence in governance and law for 16+ years.</p>' +
          '<form class="news" data-demo-form><label class="sr" for="nl">Email</label><input id="nl" placeholder="Get the daily brief — your email" required><button class="btn btn-red btn-sm" type="submit">Subscribe</button></form><p class="ok" hidden style="margin-top:10px">Subscribed! Check your inbox tomorrow morning.</p>' +
          '<div class="socials">' + Object.keys(SOCIAL).map(function (k) { return '<a href="#" aria-label="' + k + '"><svg viewBox="0 0 24 24">' + SOCIAL[k] + "</svg></a>"; }).join("") + "</div>" +
          '<p class="small" style="margin-top:12px">@balalathamadam · @csbiasacademyofficial · @balalathaconnects</p>' +
          '<div class="foot-apps"><a href="https://play.google.com/store/apps/details?id=co.thanos.vrdlc&amp;hl=en_IN" target="_blank" rel="noopener"><img src="assets/img/google-play.svg" alt="Get it on Google Play"></a><a href="https://apps.apple.com/in/app/myinstitute/id1472483563" target="_blank" rel="noopener"><img src="assets/img/app-store.svg" alt="Download on the App Store"></a></div></div>' +
        '<div><h4>Academy</h4><ul><li><a href="about.html">About Us</a></li><li><a href="founder.html">Balalatha Madam</a></li><li><a href="mentors.html">Mentors</a></li><li><a href="faculty.html">Faculty</a></li><li><a href="our-awards.html">Our Awards</a></li><li><a href="gallery.html">Gallery</a></li></ul>' +
          '<h4 style="margin-top:28px">Results</h4><ul><li><a href="rankers.html">Rankers</a></li><li><a href="achievers.html">Achievers</a></li><li><a href="student-videos.html">Student Videos</a></li></ul></div>' +
        '<div><h4>Learn</h4><ul><li><a href="courses.html">All Courses</a></li><li><a href="books.html">Books Store</a></li><li><a href="current-affairs.html">Current Affairs</a></li><li><a href="videos.html">Videos</a></li><li><a href="quiz.html">Free Quizzes</a></li><li><a href="events.html">Events</a></li></ul></div>' +
        '<div><h4>Branches</h4><div class="branch-list">' + BRANCHES.map(function (b) {
          return "<div><b>" + b.city + "</b><span>" + b.addr + "</span>" + b.phones.map(function (p) { return '<a href="tel:+91' + p + '">' + fmtPhone(p) + "</a>"; }).join(" · ") + "</div>";
        }).join("") + "</div></div>" +
      "</div>" +
      '<div class="foot-bottom"><span>© 2026 CSB IAS Academy · CSB Groups Academy. All rights reserved.</span><span style="display:flex;gap:20px;flex-wrap:wrap"><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a><a href="#">Refund &amp; Shipping Policy</a></span></div>' +
    "</div></footer>";

  var top = document.createElement("div");
  top.innerHTML = nav + overlays;
  while (top.firstChild) document.body.insertBefore(top.firstChild, document.body.firstChild);
  var fslot = $("#site-footer");
  if (fslot) fslot.outerHTML = footer;

  // ---------- Dark mode ----------
  var root = document.documentElement;
  var modeBtn = $("#mode");
  function setMode(m) {
    root.dataset.mode = m;
    modeBtn.innerHTML = ic(m === "dark" ? "sun" : "moon");
    store.set("csb-mode", m);
  }
  setMode(store.get("csb-mode", "light"));
  modeBtn.addEventListener("click", function () { setMode(root.dataset.mode === "dark" ? "light" : "dark"); });
  // Phones hide the nav toggle; the menu has its own.
  $$("[data-mode-alt]").forEach(function (b) { b.addEventListener("click", function () { modeBtn.click(); }); });

  // ---------- Scroll: nav state + progress ----------
  var navEl = $("#nav"), prog = $("#progress");
  function onScroll() {
    navEl.classList.toggle("scrolled", window.scrollY > 20);
    var h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Fit the nav bar to any width: hide the tagline and search label first,
  // then fall back to the menu button, instead of letting items spill out.
  var bar = $(".nav-bar"), menuEl = $(".menu", bar);
  function overflowing() {
    return bar.scrollWidth > bar.clientWidth + 1 || (getComputedStyle(menuEl).display !== "none" && menuEl.scrollWidth > menuEl.clientWidth + 1);
  }
  function fitNav() {
    bar.classList.remove("tight", "compact");
    if (overflowing()) bar.classList.add("tight");
    if (overflowing()) bar.classList.add("compact");
  }
  fitNav();
  window.addEventListener("resize", fitNav);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNav);

  // ---------- Mega menus ----------
  var openMega = null;
  function closeMega() {
    if (!openMega) return;
    openMega.classList.remove("open");
    $$("[data-mega]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    openMega = null;
  }
  $$("[data-mega]").forEach(function (b) {
    var panel = document.getElementById(b.dataset.mega);
    function show() { closeMega(); panel.classList.add("open"); b.setAttribute("aria-expanded", "true"); openMega = panel; }
    b.addEventListener("click", function (e) { e.stopPropagation(); if (openMega === panel) closeMega(); else show(); });
    b.addEventListener("mouseenter", function () { if (openMega !== panel) show(); });
    panel.addEventListener("mouseleave", closeMega);
  });
  document.addEventListener("click", function (e) { if (openMega && !openMega.contains(e.target)) closeMega(); });

  // ---------- Mobile overlay ----------
  var ov = $("#overlay");
  $("#burger").addEventListener("click", function () { ov.classList.add("open"); document.body.style.overflow = "hidden"; });
  $("#overlay-close").addEventListener("click", function () { ov.classList.remove("open"); document.body.style.overflow = ""; });
  $$("a", ov).forEach(function (a) { a.addEventListener("click", function () { ov.classList.remove("open"); document.body.style.overflow = ""; }); });

  // ---------- Scrims (palette / callback / lightbox / gateway) ----------
  function openScrim(id) { $("#" + id).classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeScrims() {
    $$(".scrim.open").forEach(function (s) { s.classList.remove("open"); });
    $("#lb-frame").innerHTML = "";
    document.body.style.overflow = "";
  }
  $$(".scrim").forEach(function (s) {
    s.addEventListener("click", function (e) { if (e.target === s || e.target.closest("[data-close]")) closeScrims(); });
  });
  document.addEventListener("click", function (e) {
    var cb = e.target.closest("[data-callback]");
    if (cb) { e.preventDefault(); ov.classList.remove("open"); openScrim("callback"); }
    var v = e.target.closest("[data-video]");
    if (v) {
      e.preventDefault();
      $("#lb-frame").innerHTML = '<iframe src="https://www.youtube.com/embed/' + v.dataset.video + '?autoplay=1" title="Video" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      $("#lb-cap").textContent = v.dataset.title || "";
      openScrim("lightbox");
    }
    var im = e.target.closest("[data-img]");
    if (im) {
      e.preventDefault();
      $("#lb-frame").innerHTML = '<img src="' + im.dataset.img + '" alt="">';
      $("#lb-cap").textContent = im.dataset.title || "";
      openScrim("lightbox");
    }
  });

  // Command palette
  var pq = $("#palette-q"), pl = $("#palette-list"), sel = 0;
  var groupIcon = { Courses: "book", Books: "bag", Gallery: "image", Pages: "arrow" };
  function renderPalette() {
    var q = pq.value.trim().toLowerCase();
    var hits = INDEX.filter(function (r) { return !q || r[1].toLowerCase().indexOf(q) > -1 || r[0].toLowerCase().indexOf(q) > -1; });
    var html = "", last = "";
    hits.forEach(function (r) {
      if (r[0] !== last) { html += '<li class="grp">' + r[0] + "</li>"; last = r[0]; }
      html += '<li><a href="' + r[2] + '">' + ic(groupIcon[r[0]] || "arrow") + r[1] + "<small>" + r[0] + "</small></a></li>";
    });
    pl.innerHTML = html || '<li class="grp">No results</li>';
    sel = 0; markSel();
  }
  function markSel() { $$("a", pl).forEach(function (a, i) { a.classList.toggle("sel", i === sel); }); }
  function openPalette() { openScrim("palette"); pq.value = ""; renderPalette(); setTimeout(function () { pq.focus(); }, 50); }
  $$("[data-palette]").forEach(function (b) { b.addEventListener("click", openPalette); });
  pq.addEventListener("input", renderPalette);
  pq.addEventListener("keydown", function (e) {
    var items = $$("a", pl);
    if (e.key === "ArrowDown") { sel = Math.min(sel + 1, items.length - 1); markSel(); e.preventDefault(); }
    if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); markSel(); e.preventDefault(); }
    if (e.key === "Enter" && items[sel]) location.href = items[sel].getAttribute("href");
  });
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); }
    if (e.key === "Escape") { closeScrims(); closeMega(); closeCart(); ov.classList.remove("open"); document.body.style.overflow = ""; }
  });

  // Demo forms: swap to a thank-you message
  $$("form[data-demo-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = f.parentElement.querySelector(".ok");
      f.hidden = true;
      if (ok) ok.hidden = false;
    });
  });

  // ---------- Book store: render catalogue, cart, checkout ----------
  $$("[data-books]").forEach(function (box) {
    var which = box.dataset.books;
    var list = which === "all" ? BOOKS : which.split(",").map(function (id) { return byId[id]; }).filter(Boolean);
    box.innerHTML = list.map(bookCard).join("");
  });
  $$("[data-cover]").forEach(function (el) { var b = byId[el.dataset.cover]; if (b) el.innerHTML = cover(b); });

  var cart = store.get("csb-cart", {});
  function cartCount() { return Object.keys(cart).reduce(function (s, k) { return s + cart[k]; }, 0); }
  function cartTotals() {
    var sub = Object.keys(cart).reduce(function (s, k) { return s + (byId[k] ? byId[k].p * cart[k] : 0); }, 0);
    var del = sub === 0 || sub >= 499 ? 0 : 49;
    return { sub: sub, del: del, total: sub + del };
  }
  function saveCart() { store.set("csb-cart", cart); renderCart(); }
  function addToCart(id, n) { cart[id] = (cart[id] || 0) + (n || 1); if (cart[id] <= 0) delete cart[id]; saveCart(); }
  function renderCart() {
    var n = cartCount();
    $$(".cart-btn .count").forEach(function (c) { c.textContent = n; c.dataset.n = n; });
    var items = $("#cart-items"), t = cartTotals();
    items.innerHTML = n ? Object.keys(cart).map(function (id) {
      var b = byId[id]; if (!b) return "";
      return '<div class="ci"><div>' + cover(b) + "</div><div><b>" + b.t + "</b><span>" + inr(b.p) + ' each</span><div><span class="qty"><button type="button" data-q="' + id + '" data-d="-1" aria-label="Decrease">−</button><i>' + cart[id] + '</i><button type="button" data-q="' + id + '" data-d="1" aria-label="Increase">+</button></span></div></div><div style="text-align:right"><b>' + inr(b.p * cart[id]) + '</b><button class="rm" type="button" data-q="' + id + '" data-d="-999">Remove</button></div></div>';
    }).join("") : '<div class="empty">' + ic("bag", "ic") + '<p style="margin-top:10px">Your cart is empty.</p><a class="link" href="books.html" style="margin-top:12px">Browse books</a></div>';
    $("#cart-foot").hidden = !n;
    $("#cart-sub").textContent = inr(t.sub);
    $("#cart-del").textContent = t.del ? inr(t.del) : "Free";
    $("#cart-total").textContent = inr(t.total);
    renderCheckout();
  }
  var drawer = $("#cart");
  function openCart() { drawer.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeCart() { drawer.classList.remove("open"); if (!$(".scrim.open")) document.body.style.overflow = ""; }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-cart]")) { e.preventDefault(); openCart(); }
    if (e.target.closest("[data-close-cart]")) closeCart();
    var q = e.target.closest("[data-q]");
    if (q) addToCart(q.dataset.q, +q.dataset.d);
    var add = e.target.closest("[data-add]");
    if (add) {
      addToCart(add.dataset.add, 1);
      add.textContent = "Added ✓"; add.classList.add("added");
      setTimeout(function () { add.textContent = "Add to cart"; add.classList.remove("added"); }, 1600);
      openCart();
    }
    var buy = e.target.closest("[data-buy]");
    if (buy) { if (!cart[buy.dataset.buy]) addToCart(buy.dataset.buy, 1); location.href = "checkout.html"; }
  });

  // Checkout page: order summary + payment gateway mock
  function renderCheckout() {
    var box = $("[data-checkout-summary]");
    if (!box) return;
    var ids = Object.keys(cart), t = cartTotals();
    box.innerHTML = ids.length ? ids.map(function (id) {
      var b = byId[id];
      return '<div class="ci"><div>' + cover(b) + "</div><div><b>" + b.t + "</b><span>Qty " + cart[id] + "</span></div><b>" + inr(b.p * cart[id]) + "</b></div>";
    }).join("") : '<p class="muted">Your cart is empty — <a class="link" href="books.html">add some books</a>.</p>';
    $$("[data-sum]").forEach(function (el) { el.textContent = el.dataset.sum === "del" ? (t.del ? inr(t.del) : "Free") : inr(t[el.dataset.sum]); });
    var payBtn = $("[data-pay]");
    if (payBtn) payBtn.disabled = !ids.length;
  }
  var payForm = $("form[data-checkout]");
  if (payForm) {
    payForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!cartCount()) return;
      $("#gw-amt").textContent = inr(cartTotals().total);
      $$(".gw-step").forEach(function (s) { s.hidden = s.dataset.gs !== "pay"; });
      var m = (payForm.querySelector("input[name=pm]:checked") || {}).value || "upi";
      gwTab(m === "cod" ? "upi" : m);
      if (m === "cod") { finishOrder(true); return; }
      openScrim("gateway");
    });
  }
  function gwTab(name) {
    $$(".gw-tabs button").forEach(function (b) { b.classList.toggle("on", b.dataset.gw === name); });
    $$(".gw-pane").forEach(function (p) { p.classList.toggle("on", p.dataset.gp === name); });
  }
  $$(".gw-tabs button").forEach(function (b) { b.addEventListener("click", function () { gwTab(b.dataset.gw); }); });
  $$(".upi-apps button,.banks button").forEach(function (b) {
    b.addEventListener("click", function () { $$("button", b.parentElement).forEach(function (o) { o.classList.remove("on"); }); b.classList.add("on"); });
  });
  var gwPay = $("[data-gw-pay]");
  if (gwPay) gwPay.addEventListener("click", function () {
    $$(".gw-step").forEach(function (s) { s.hidden = s.dataset.gs !== "wait"; });
    setTimeout(function () { finishOrder(false); }, 1800);
  });
  function finishOrder(cod) {
    var total = cartTotals().total;
    var id = "CSB" + Date.now().toString().slice(-8);
    closeScrims();
    $("[data-stage='checkout']").hidden = true;
    var done = $("[data-stage='done']"); done.hidden = false;
    $("#order-id").textContent = id;
    $("#order-amt").textContent = inr(total) + (cod ? " · Cash on delivery" : " · Paid");
    cart = {}; saveCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Book detail page (?id=)
  var bd = $("[data-book-detail]");
  if (bd) {
    var bid = new URLSearchParams(location.search).get("id") || "ap-ca";
    var b = byId[bid] || BOOKS[0];
    document.title = b.t + " — CSB Publications";
    $$("[data-bd]", bd).forEach(function (el) {
      var k = el.dataset.bd;
      if (k === "cover") el.innerHTML = cover(b);
      else if (k === "p") el.textContent = inr(b.p);
      else if (k === "m") el.textContent = inr(b.m);
      else if (k === "off") el.textContent = Math.round((1 - b.p / b.m) * 100) + "% off";
      else el.textContent = b[k];
    });
    $$("[data-add-this],[data-buy-this]", bd).forEach(function (btn) {
      btn.setAttribute(btn.hasAttribute("data-add-this") ? "data-add" : "data-buy", b.id);
    });
  }
  renderCart();

  // ---------- City gallery tabs (#classrooms / #hyderabad / …) ----------
  var cityTabs = $("[data-city-tabs]");
  if (cityTabs) {
    var showCity = function (key) {
      if (!document.getElementById("city-" + key)) key = "all";
      $$("button", cityTabs).forEach(function (b) { b.classList.toggle("on", b.dataset.city === key); });
      $$(".city-pane").forEach(function (p) { p.classList.toggle("on", key === "all" || p.id === "city-" + key); });
    };
    $$("button", cityTabs).forEach(function (b) {
      b.addEventListener("click", function () { showCity(b.dataset.city); history.replaceState(null, "", "#" + b.dataset.city); });
    });
    showCity((location.hash || "#all").slice(1));
    window.addEventListener("hashchange", function () { showCity(location.hash.slice(1)); });
  }

  // ---------- Reveal on scroll + counters ----------
  // "?shot" (used for static review screenshots) shows everything at once.
  if (/[?&]shot/.test(location.search)) {
    $$(".rv").forEach(function (el) { el.classList.add("in"); el.style.transition = "none"; });
    $$("[data-count]").forEach(function (el) { el.textContent = (+el.dataset.count).toLocaleString("en-IN") + (el.dataset.suffix || ""); el.removeAttribute("data-count"); });
  }
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      if (en.target.dataset.count) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 }) : null;
  $$(".rv,[data-count]").forEach(function (el) { if (io) io.observe(el); else el.classList.add("in"); });
  function countUp(el) {
    var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || "", t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1600, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString("en-IN") + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- Countdown ----------
  $$("[data-countdown]").forEach(function (el) {
    var target = new Date(el.dataset.countdown).getTime();
    function tick() {
      var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      var parts = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
      Object.keys(parts).forEach(function (k) { var n = el.querySelector("[data-" + k + "]"); if (n) n.textContent = String(parts[k]).padStart(2, "0"); });
    }
    tick(); setInterval(tick, 1000);
  });

  // ---------- Tickers / marquees: duplicate for a seamless loop ----------
  $$("[data-dup]").forEach(function (t) { t.innerHTML += t.innerHTML; });

  // ---------- Generic switchers: buttons[data-for] toggle panels ----------
  $$("[data-switch]").forEach(function (group) {
    var btns = $$("[data-for]", group);
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (o) { o.classList.remove("on"); var p = document.getElementById(o.dataset.for); if (p) p.classList.remove("on"); });
        b.classList.add("on");
        var p = document.getElementById(b.dataset.for); if (p) p.classList.add("on");
      });
    });
  });

  // ---------- Filter chips: [data-filter-group="#target"] ----------
  $$("[data-filter-group]").forEach(function (g) {
    var target = $(g.dataset.filterGroup);
    $$(".chip", g).forEach(function (c) {
      c.addEventListener("click", function () {
        $$(".chip", g).forEach(function (o) { o.classList.remove("on"); });
        c.classList.add("on");
        $$("[data-cat]", target).forEach(function (el) {
          el.style.display = c.dataset.f === "all" || el.dataset.cat.split(" ").indexOf(c.dataset.f) > -1 ? "" : "none";
        });
      });
    });
  });
  $$("[data-search]").forEach(function (inp) {
    var target = $(inp.dataset.search);
    inp.addEventListener("input", function () {
      var q = inp.value.toLowerCase();
      $$("[data-cat]", target).forEach(function (el) { el.style.display = el.textContent.toLowerCase().indexOf(q) > -1 ? "" : "none"; });
    });
  });

  // ---------- Mini daily quiz (home) ----------
  $$("[data-mini-quiz]").forEach(function (q) {
    var btns = $$("button", q), done = false;
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        if (done) return; done = true;
        btns.forEach(function (o) { if (o.dataset.correct) o.classList.add("right"); });
        if (!b.dataset.correct) b.classList.add("wrong");
        var r = q.querySelector(".mq-res"); if (r) r.hidden = false;
      });
    });
  });

  // ---------- Course finder ----------
  var finder = $("[data-finder]");
  if (finder) {
    var steps = $$(".fq", finder), dots = $$(".steps-dots span", finder), answers = [];
    var RESULTS = {
      school: ["Degree + IAS Integrated Program", "Start UPSC preparation alongside your graduation — exam-ready by the time you graduate.", "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=70"],
      fresh: ["General Studies PCM", "A complete Prelims-cum-Mains classroom programme with regular tests and mentorship.", "https://images.unsplash.com/photo-1722573783625-eceb04251036?auto=format&fit=crop&w=400&q=70"],
      working: ["Mentorship Programme 2026-27", "Year-long guided preparation with test series — built for limited weekday time.", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=70"],
      repeat: ["Mains Test Series 2026", "You know the syllabus — sharpen it with exam-pattern tests and evaluation.", "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=70"],
      state: ["APPSC & TGPSC Groups", "State services preparation at CSB Groups Academy — Group 1 & 2.", "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=70"],
      merit: ["Mission Ekalavya", "Scholarship-based mentorship for committed aspirants.", "https://images.unsplash.com/photo-1709290749293-c6152a187b14?auto=format&fit=crop&w=400&q=70"]
    };
    var show = function (i) {
      steps.forEach(function (s, j) { s.hidden = j !== i; });
      dots.forEach(function (d, j) { d.classList.toggle("on", j <= i); });
    };
    steps.forEach(function (s, i) {
      $$("button[data-v]", s).forEach(function (b) {
        b.addEventListener("click", function () {
          answers[i] = b.dataset.v;
          if (i < steps.length - 2) return show(i + 1);
          var key = answers[2] === "scholar" ? "merit" : answers[1] === "state" ? "state" : answers[0];
          var r = RESULTS[key] || RESULTS.fresh;
          var res = $(".fresult", finder);
          res.querySelector("img").src = r[2];
          res.querySelector("h4").textContent = r[0];
          res.querySelector("p").textContent = r[1];
          show(steps.length - 1);
        });
      });
    });
    var restart = $("[data-restart]", finder);
    if (restart) restart.addEventListener("click", function () { answers = []; show(0); });
    show(0);
  }

  // ---------- Journey stepper ----------
  $$("[data-journey]").forEach(function (j) {
    var st = $$(".jstep", j);
    st.forEach(function (s) { s.addEventListener("click", function () { st.forEach(function (o) { o.classList.remove("on"); }); s.classList.add("on"); }); });
  });

  // ---------- Before / after ----------
  $$("[data-ba]").forEach(function (box) {
    var drag = false;
    function set(x) { var r = box.getBoundingClientRect(); box.style.setProperty("--pos", Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)) + "%"); }
    box.addEventListener("pointerdown", function (e) { drag = true; set(e.clientX); });
    box.addEventListener("pointermove", function (e) { if (drag) set(e.clientX); });
    ["pointerup", "pointerleave"].forEach(function (ev) { box.addEventListener(ev, function () { drag = false; }); });
  });

  // ---------- Article table of contents highlight ----------
  var toc = $("[data-toc]");
  if (toc && "IntersectionObserver" in window) {
    var links = $$("a", toc);
    var tio = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + x.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    links.forEach(function (a) { var t = $(a.getAttribute("href")); if (t) tio.observe(t); });
  }

  // ---------- Add to calendar (.ics download) ----------
  $$("[data-ics]").forEach(function (b) {
    b.addEventListener("click", function () {
      var d = b.dataset.ics.split("|");
      var ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:" + d[1] + "\r\nSUMMARY:" + d[0] + "\r\nLOCATION:" + d[2] + "\r\nEND:VEVENT\r\nEND:VCALENDAR";
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
      a.download = "csb-event.ics"; a.click();
    });
  });

  // ---------- Quiz engine (one question at a time) ----------
  var qe = $("[data-quiz-engine]");
  if (qe) {
    var Q = [
      ["The High-Level Committee on Simultaneous Elections recommended synchronising municipal elections within how many days of general elections?", ["30 days", "60 days", "100 days", "180 days"], 2, "The committee recommended a 100-day window for local body elections."],
      ["Which body decides the policy repo rate in India?", ["Ministry of Finance", "Monetary Policy Committee", "NITI Aayog", "Finance Commission"], 1, "The six-member MPC, constituted under the RBI Act, fixes the repo rate."],
      ["The Ramsar Convention relates to the conservation of:", ["Wetlands", "Migratory birds only", "Coral reefs", "Tiger reserves"], 0, "The Ramsar Convention (1971) is the treaty on wetlands of international importance."],
      ["Article 32 of the Indian Constitution deals with:", ["Right to equality", "Right to constitutional remedies", "Right to freedom of religion", "Directive Principles"], 1, "Dr. Ambedkar called Article 32 the 'heart and soul' of the Constitution."],
      ["Which of these is a Harappan site in Gujarat?", ["Kalibangan", "Lothal", "Rakhigarhi", "Banawali"], 1, "Lothal is known for its dockyard."]
    ];
    var cur = 0, picks = [], left = 480, timer = null;
    var qn = $("[data-qn]", qe), qt = $("[data-qt]", qe), qo = $("[data-qo]", qe), qp = $("[data-qp]", qe), qb = $("[data-qbar]", qe), tm = $("[data-timer]", qe);
    var render = function () {
      qn.textContent = "Question " + (cur + 1) + " of " + Q.length;
      qt.textContent = Q[cur][0];
      qb.style.width = ((cur + 1) / Q.length) * 100 + "%";
      qo.innerHTML = Q[cur][1].map(function (o, i) {
        return '<button type="button" class="qopt' + (picks[cur] === i ? " sel" : "") + '" data-i="' + i + '"><span class="k">' + "ABCD"[i] + "</span>" + o + "</button>";
      }).join("");
      qp.innerHTML = Q.map(function (_, i) { return '<button type="button" class="' + (i === cur ? "cur" : picks[i] != null ? "done" : "") + '" data-j="' + i + '">' + (i + 1) + "</button>"; }).join("");
    };
    var tickQ = function () {
      left--; tm.textContent = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
      if (left <= 0) finish();
    };
    qo.addEventListener("click", function (e) { var b = e.target.closest(".qopt"); if (!b) return; picks[cur] = +b.dataset.i; render(); });
    qp.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; cur = +b.dataset.j; render(); });
    $("[data-prev]", qe).addEventListener("click", function () { cur = Math.max(0, cur - 1); render(); });
    $("[data-next]", qe).addEventListener("click", function () { cur = Math.min(Q.length - 1, cur + 1); render(); });
    var finish = function () {
      clearInterval(timer);
      var score = Q.reduce(function (s, q, i) { return s + (picks[i] === q[2] ? 1 : 0); }, 0);
      $("[data-stage='run']").hidden = true;
      var res = $("[data-stage='result']"); res.hidden = false;
      $("[data-score]").textContent = score + "/" + Q.length;
      $(".ring", res).style.setProperty("--p", (score / Q.length) * 100 + "%");
      $("[data-review]").innerHTML = Q.map(function (q, i) {
        var ok = picks[i] === q[2];
        return '<div class="box" style="padding:20px"><div class="meta" style="margin-bottom:6px"><span class="pill ' + (ok ? "" : "pill-live") + '">' + (ok ? "Correct" : picks[i] == null ? "Skipped" : "Incorrect") + '</span></div><b style="color:var(--ink)">' + (i + 1) + ". " + q[0] + '</b><p class="muted small" style="margin-top:8px">Answer: <b style="color:var(--ink)">' + q[1][q[2]] + "</b> — " + q[3] + "</p></div>";
      }).join("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    $("[data-finish]", qe).addEventListener("click", finish);
    var startForm = $("form[data-quiz-start]");
    if (startForm) {
      startForm.addEventListener("submit", function (e) {
        e.preventDefault();
        $("[data-stage='start']").hidden = true;
        $("[data-stage='run']").hidden = false;
        timer = setInterval(tickQ, 1000);
      });
    } else {
      timer = setInterval(tickQ, 1000);
    }
    render();
  }
})();
