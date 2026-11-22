/* ══════════════════════════════════════════════════════════════
   data-home.js  ·  all content for the home page
   verses · seven studies · five written pages · notebook entries
   ══════════════════════════════════════════════════════════════ */
window.ST = window.ST || {};
ST.HOME = {

  /* ───────── verses for the day-card ───────── */
  verses: [
    {
      dev: "आ नो भद्राः क्रतवो यन्तु विश्वतः॥",
      translit: "ā no bhadrāḥ kratavo yantu viśvataḥ",
      meaning: "Let noble thoughts come to us from every side.",
      source: "Rig Veda 1.89.8",
      study: "quote"
    },
    {
      dev: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      translit: "karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi",
      meaning: "You have a right to action alone — never to its fruits. Do not let the fruit be your motive, and do not cling to inaction.",
      source: "Bhagavad Gita 2.47",
      study: "gita"
    },
    {
      dev: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
      translit: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ\nāgamāpāyino 'nityās tāṁs titikṣasva bhārata",
      meaning: "The contacts of the senses with the world, O son of Kunti, bring cold and heat, pleasure and pain. They come and go — they are impermanent. Endure them bravely.",
      source: "Bhagavad Gita 2.14",
      study: "gita"
    },
    {
      dev: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
      translit: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
      meaning: "Lift yourself by your own self; do not let yourself fall. For the self alone is the friend of the self — and the self alone is its enemy.",
      source: "Bhagavad Gita 6.5",
      study: "gita"
    },
    {
      dev: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥",
      translit: "oṁ pūrṇam adaḥ pūrṇam idaṁ pūrṇāt pūrṇam udacyate\npūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate",
      meaning: "That is whole; this is whole. From the whole, the whole arises. Take the whole from the whole — the whole alone remains.",
      source: "Isha Upanishad, Invocation",
      study: "upanishads"
    },
    {
      dev: "असतो मा सद्गमय।\nतमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय॥",
      translit: "asato mā sad gamaya\ntamaso mā jyotir gamaya\nmṛtyor mā amṛtaṁ gamaya",
      meaning: "Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality.",
      source: "Brihadaranyaka Upanishad 1.3.28",
      study: "upanishads"
    },
    {
      dev: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
      translit: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
      meaning: "Whenever dharma declines, O Bharata, and adharma rises, then I send forth myself.",
      source: "Bhagavad Gita 4.7",
      study: "gita"
    },
    {
      dev: "शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥",
      translit: "śuklāmbaradharaṁ viṣṇuṁ śaśivarṇaṁ caturbhujam\nprasanna-vadanaṁ dhyāyet sarva-vighnopaśāntaye",
      meaning: "Meditate on Vishnu, clothed in white, radiant like the moon, four-armed, with a serene face — for the quieting of all obstacles.",
      source: "Vishnu Sahasranama, Opening",
      study: "vishnu"
    }
  ],

  /* ───────── seven shelves ───────── */
  library: [
    {
      id: "gita",
      title: "Bhagavad Gita",
      dev: "भगवद्गीता",
      cat: "scriptures",
      catLabel: "Scriptures",
      icon: "i-lotus",
      hue: "#B86B2B",
      hs: "rgba(184,107,43,.11)",
      desc: "A battlefield dialogue.",
      streams: [
        { kicker: "Stream I", title: "Direct Teachings", desc: "Verses laid out word-by-word with careful translation and commentary." },
        { kicker: "Stream II", title: "Anubhava", desc: "My own honest reflections — clearly labelled as not scripture." }
      ]
    },
    {
      id: "upanishads",
      title: "Upanishads",
      dev: "उपनिषदः",
      cat: "scriptures",
      catLabel: "Scriptures",
      icon: "i-book",
      hue: "#3B4470",
      hs: "rgba(59,68,112,.10)",
      desc: "Upanishad teachings.",
      streams: [
        { kicker: "Stream I", title: "Direct Teachings", desc: "Verses from Isha, Brihadaranyaka and Chandogya, read slowly." }
      ]
    },
    {
      id: "ramayana",
      title: "Ramayana",
      dev: "रामायणम्",
      cat: "scriptures",
      catLabel: "Scriptures",
      icon: "i-bow",
      hue: "#A8332B",
      hs: "rgba(168,51,43,.10)",
      desc: "The story of righteousness.",
      streams: [
        { kicker: "Stream I", title: "Retellings", desc: "Small episodes retold, with care, in my own words." },
        { kicker: "Stream II", title: "Notes", desc: "Themes — promise, exile, surrender, and returning home." }
      ]
    },
    {
      id: "Lalitha",
      title: "Lalitha Sahasranama Stotram",
      dev: "श्री ललितासहस्रनाम स्तोत्र",
      cat: "stotras",
      catLabel: "Stotras & Slokas",
      icon: "i-rings",
      hue: "#1C6B7A",
      hs: "rgba(28,107,122,.10)",
      desc: "The thousand names of Lalitha Devi.",
      streams: [
        { kicker: "Stream I", title: "Aphorisms", desc: "Each sutra, its words, its meaning, and why it still matters." }
      ]
    },
    {
      id: "vishnu",
      title: "Vishnu Sahasranama",
      dev: "विष्णुसहस्रनाम",
      cat: "stotras",
      catLabel: "Stotras & Slokas",
      icon: "i-mala",
      hue: "#A8842C",
      hs: "rgba(168,132,44,.12)",
      desc: "The thousand names of Vishnu.",
      streams: [
        { kicker: "Word by word", title: "Name Explorer", desc: "Take a single name, hold it, and see how it unfolds into prayer." },
        { kicker: "Stream I", title: "Opening Verse", desc: "The traditional opening — with translation and quiet commentary." }
      ]
    },
    {
      id: "compass",
      title: "The Dharma Compass",
      dev: "धर्मदिशा",
      cat: "reflections",
      catLabel: "Reflections",
      icon: "i-compass",
      hue: "#5E7162",
      hs: "rgba(94,113,98,.12)",
      desc: "Essays on my views of dharma.",
      streams: [
        { kicker: "Essay", title: "Setting the Compass Right Again", desc: "A short essay written on a drifting afternoon." }
      ]
    },
    {
      id: "evening",
      title: "Evening Notes",
      dev: "सन्ध्या",
      cat: "reflections",
      catLabel: "Reflections",
      icon: "i-diya",
      hue: "#A8506B",
      hs: "rgba(168,80,107,.10)",
      desc: "Random thoughts and collections.",
      streams: [
        { kicker: "Journal", title: "Ordinary Days", desc: "Small things noticed on ordinary afternoons." }
      ]
    }
  ],

  /* ───────── written pages (per study) ───────── */
  pages: {

    gita: [
      {
        title: "The Yoga of Action",
        subtitle: "BG 2.47",
        type: "Direct Teaching",
        dev: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        translit: "karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi",
        words: [
          ["कर्मणि", "karmaṇi", "in action"],
          ["एव", "eva", "only / alone"],
          ["अधिकारः", "adhikāraḥ", "right, authority"],
          ["ते", "te", "your"],
          ["मा", "mā", "never (prohibitive)"],
          ["फलेषु", "phaleṣu", "in the fruits"],
          ["कदाचन", "kadācana", "at any time"],
          ["कर्मफल", "karma-phala", "fruit of action"],
          ["हेतुः", "hetuḥ", "cause"],
          ["भूः", "bhūḥ", "be (you)"],
          ["सङ्गः", "saṅgaḥ", "attachment"],
          ["अस्तु", "astu", "let there be"],
          ["अकर्मणि", "akarmaṇi", "in inaction"]
        ],
        translation: "You have a right to action alone, never to its fruits. Do not let the fruit be your motive, nor let your attachment be to inaction.",
        commentary: "<p>Krishna does not tell Arjuna to stop caring about outcomes. He tells him to stop making the outcome the <em>reason</em> he acts. This is a different instruction, and a much harder one.</p><p>The mind, when it becomes anxious, moves its weight onto the future — onto whether the thing will work, whether I will succeed, whether it will be received. Krishna asks that weight to come back onto the present step. Not that the step become careless, but that it stop being mortgaged to a result it cannot command.</p>",
        reflection: "<p>The first time I actually read this verse slowly, I realised I had been treating it as a licence to be careless. But it is the opposite — it is a demand that I be more honest, more careful, because I can no longer hide behind the outcome. When the fruit is gone as a measure, what is left is: was the step itself taken with a clean heart?</p><p>I keep a small version of this verse on my desk. On good days it feels obvious. On bad days it feels like a wound — because it shows me how much of my anxiety I have quietly dressed up as devotion to the task.</p>"
      },
      {
        title: "Endure the Pairs",
        subtitle: "BG 2.14",
        type: "Direct Teaching",
        dev: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
        translit: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ\nāgamāpāyino 'nityās tāṁs titikṣasva bhārata",
        words: [
          ["मात्रास्पर्शाः", "mātrā-sparśāḥ", "contacts of the senses"],
          ["तु", "tu", "indeed"],
          ["कौन्तेय", "kaunteya", "O son of Kunti"],
          ["शीतोष्ण", "śītoṣṇa", "cold and heat"],
          ["सुखदुःखदाः", "sukha-duḥkha-dāḥ", "giving pleasure and pain"],
          ["आगमापायिनः", "āgamāpāyinaḥ", "coming and going"],
          ["अनित्याः", "anityāḥ", "impermanent"],
          ["तान्", "tān", "them"],
          ["तितिक्षस्व", "titikṣasva", "endure, forbear"],
          ["भारत", "bhārata", "O descendant of Bharata"]
        ],
        translation: "The contacts of the senses with the world, O son of Kunti, bring cold and heat, pleasure and pain. They come and go — they are impermanent. Endure them bravely.",
        commentary: "<p>This verse is quietly radical: it does not promise that pleasure will stop appearing, only that it will not last. The instruction is not to feel nothing — it is to stop treating each feeling as an emergency.</p>",
        reflection: "<p>I have never been good at this one. When something pleasant comes, I cling. When something painful comes, I panic. Krishna's verse does not ask me to stop feeling; it asks me to stop pretending that the weather is the climate.</p>"
      },
      {
        title: "Lift Yourself",
        subtitle: "BG 6.5",
        type: "Direct Teaching",
        dev: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
        translit: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
        words: [
          ["उद्धरेत्", "uddharet", "one should lift"],
          ["आत्मना", "ātmanā", "by the self"],
          ["आत्मानम्", "ātmānam", "the self"],
          ["न", "na", "not"],
          ["अवसादयेत्", "avasādayet", "should let sink"],
          ["आत्मा", "ātmā", "the self"],
          ["एव", "eva", "indeed"],
          ["हि", "hi", "for"],
          ["बन्धुः", "bandhuḥ", "friend"],
          ["रिपुः", "ripuḥ", "enemy"]
        ],
        translation: "Lift yourself by your own self; do not let yourself fall. For the self alone is the friend of the self — and the self alone is its enemy.",
        commentary: "<p>There is no external rescuer here, and no external enemy either. The same faculty that can drag us down is the one that can lift us up. The verse is not harsh; it is honest.</p>",
        reflection: "<p>This is the verse I return to when I am most disappointed in myself. It does not pretend I have not fallen. It simply refuses to let the fall be the last word.</p>"
      }
    ],

    upanishads: [
      {
        title: "That Is Whole",
        subtitle: "Isha Upanishad, Invocation",
        type: "Direct Teaching",
        dev: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥",
        translit: "oṁ pūrṇam adaḥ pūrṇam idaṁ pūrṇāt pūrṇam udacyate\npūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate",
        words: [
          ["ॐ", "oṁ", "the sacred syllable"],
          ["पूर्णम्", "pūrṇam", "whole, full, complete"],
          ["अदः", "adaḥ", "that (the transcendent)"],
          ["इदम्", "idam", "this (the manifest)"],
          ["पूर्णात्", "pūrṇāt", "from the whole"],
          ["उदच्यते", "udacyate", "arises, is produced"],
          ["पूर्णस्य", "pūrṇasya", "of the whole"],
          ["आदाय", "ādāya", "having taken"],
          ["अवशिष्यते", "avaśiṣyate", "remains"]
        ],
        translation: "That is whole; this is whole. From the whole, the whole arises. Take the whole from the whole — the whole alone remains.",
        commentary: "<p>The arithmetic of this verse is deliberately impossible. Remove a whole from a whole, and the whole remains — because the whole was never the kind of thing that could be subtracted from.</p>",
        reflection: "<p>When I am anxious, I am usually operating on scarcity arithmetic. This verse quietly refuses that arithmetic.</p>"
      }
    ],

    vishnu: [
      {
        title: "The Opening Verse",
        subtitle: "Vishnu Sahasranama",
        type: "Direct Teaching",
        dev: "शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥",
        translit: "śuklāmbaradharaṁ viṣṇuṁ śaśivarṇaṁ caturbhujam\nprasanna-vadanaṁ dhyāyet sarva-vighnopaśāntaye",
        words: [
          ["शुक्लाम्बरधरम्", "śuklāmbaradharam", "wearing white garments"],
          ["विष्णुम्", "viṣṇum", "Vishnu (the all-pervading)"],
          ["शशिवर्णम्", "śaśivarṇam", "moon-coloured, radiant"],
          ["चतुर्भुजम्", "caturbhujam", "four-armed"],
          ["प्रसन्नवदनम्", "prasanna-vadanam", "with a serene face"],
          ["ध्यायेत्", "dhyāyet", "one should meditate on"],
          ["सर्वविघ्न", "sarva-vighna", "all obstacles"],
          ["उपशान्तये", "upaśāntaye", "for the quieting of"]
        ],
        translation: "Meditate on Vishnu, clothed in white, radiant like the moon, four-armed, with a serene face — for the quieting of all obstacles.",
        commentary: "<p>The verse does not promise that obstacles will be removed; it says they will be <em>quieted</em>. The image is not a warrior-king clearing the road; it is a moon-white presence whose nearness is enough to make the road feel less impossible.</p>",
        reflection: "<p>I am, by temperament, someone who wants obstacles removed. This verse taught me to want something slightly different — to want to sit near the one presence that makes the obstacle feel smaller.</p>"
      }
    ],

    compass: [
      {
        title: "Setting the Compass Right Again",
        subtitle: "An essay",
        type: "Essay",
        epigraph: {
          dev: "सत्यमेव जयते",
          translit: "satyam eva jayate",
          meaning: "Truth alone triumphs.",
          cite: "Mundaka Upanishad 3.1.6"
        },
        commentary: "<p>There is a particular kind of tiredness that comes from having told a small lie and now needing to keep it alive. It is not the tiredness of honest work. It is the tiredness of having to remember, at every turn, which version of yourself is in the room.</p><p>I have come to believe that dharma is, at its heart, the refusal to live like that. Not a set of rules on a wall, but the quiet architecture that lets a person be one person in every room. When you speak truthfully and act sincerely, you do not have to maintain two separate selves.</p><p>A compass does not break because the traveller takes a wrong turn. Its whole purpose is to be glanced at again — without drama, without self-flagellation — and to gently show which way is north. The mistake is not the compass's failure. The mistake is deciding that the compass is now useless because the needle swung.</p><p>Returning to dharma is often very small. It is a text you send saying, actually, I was wrong. It is a habit you quietly stop. It is a sentence you apologise for. It is turning the compass and looking at it again, without pretending the last hour has not happened.</p><p>The Bhagavad Gita does not ask Arjuna to have been blameless. It asks him to fight — which, for most of us, most days, means: get up, do the honest thing, and do not dress the failure up as something it is not. Truth alone wins. Not truth followed by fifteen lies to cover the trail — just truth, plainly, gently, and enough.</p>",
        signature: "Kept humbly, corrected freely."
      }
    ],

    evening: [
      {
        title: "Ordinary Days",
        subtitle: "An evening note",
        type: "Journal",
        commentary: "<p>There is a small window in the late afternoon when the light falls across the desk in a way that makes even a stack of unfinished work look like it is being forgiven. I have started keeping that window in mind as a small dharma of its own.</p><p>Nothing important happens in this window. That is the point. The kettle is somewhere behind me, and the page in front of me is half-written, and there is no obligation to make it more than what it is.</p><p>The scriptures say a lot about the sacred. I have come to think the sacred is mostly what we fail to notice on an ordinary afternoon.</p>",
        signature: "Written on a Tuesday, before evening."
      }
    ]
  },

  /* ───────── notebook shelf ───────── */
  notebook: [
    {
      date: "Nov 2024",
      title: "On Setting the Compass Right",
      desc: "Why honesty still matters when the road gets steep — a short essay on dharma as the refusal to live in two selves.",
      section: "The Dharma Compass",
      hue: "var(--sage)",
      study: "compass",
      pageIndex: 0
    },
    {
      date: "Oct 2024",
      title: "Enduring the Pairs",
      desc: "BG 2.14 — on cold and heat, pleasure and pain, and the quiet discipline of not panicking at the weather.",
      section: "Bhagavad Gita · 2.14",
      hue: "var(--sandalwood)",
      study: "gita",
      pageIndex: 1
    },
    {
      date: "Sep 2024",
      title: "When the Fruit Is Gone",
      desc: "A reflection on BG 2.47, and what remains to act on when the outcome is no longer the measure.",
      section: "Bhagavad Gita · 2.47",
      hue: "var(--sandalwood)",
      study: "gita",
      pageIndex: 0
    },
    {
      date: "Aug 2024",
      title: "A Name, Held Quietly",
      desc: "Opening the Vishnu Sahasranama — not to finish it, but to sit with one name at a time.",
      section: "Vishnu Sahasranama",
      hue: "var(--gold)",
      study: "vishnu",
      pageIndex: 0
    },
    {
      date: "Jul 2024",
      title: "Ordinary Days",
      desc: "A small evening note on light across a desk, and the sacred as the thing we most often fail to notice.",
      section: "Evening Notes",
      hue: "var(--rose)",
      study: "evening",
      pageIndex: 0
    }
  ]
};
