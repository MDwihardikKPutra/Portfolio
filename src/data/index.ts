import type { Language } from "../translations";
export type { Language };
import { translations } from "../translations";

export interface Project {
  title: string;
  category: string;
  description: string;
  images?: string[];
  image?: string;
  tags: string[];
  link: string;
  featured: boolean;
  type: "project" | "personal";
}

export interface SkillSet {
  category: string;
  items: string[];
}

export const getProjects = (language: Language): Project[] => {
  const t = translations[language];

  return [
    {
      title: "PT Puri Ganesha Engineering",
      category: t.project1Category,
      description: t.project1Desc,
      images: ["/pge-hero.png", "/pge-project.png", "/pge-aboutus.png"],
      tags: ["React", "Full-Stack"],
      link: "https://pg-engineering.com",
      featured: true,
      type: "project",
    },
    {
      title: "PGE System",
      category: t.project2Category,
      description: t.project2Desc,
      images: [
        "/Web-PGE-System.png",
        "/Web-PGE-System1.png",
        "/Web-PGE-System2.png",
        "/Web-PGE-System3.png",
        "/Web-PGE-System4.png",
      ],
      tags: ["Laravel 11", "Enterprise"],
      link: "#",
      featured: true,
      type: "project",
    },
    {
      title: "Network Infrastructure",
      category: t.project3Category,
      description: t.project3Desc,
      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Linux", "Network"],
      link: "#",
      featured: true,
      type: "project",
    },
    {
      title: t.dataAnalystProjectTitle,
      category: t.project4Category,
      description: t.project4Desc,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Python", "Data Analysis", "Pandas"],
      link: "/projects/data-analyst",
      featured: true,
      type: "personal",
    },
  ];
};

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "medium";
}

// Essay types and functions are now in utils/loadEssay.ts
export type { Essay } from "../utils/loadEssay";
export { getEssays, getEssayById } from "../utils/loadEssay";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/ddiko105",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/",
    icon: "linkedin",
  },
  {
    name: "Medium",
    url: "https://medium.com/@ddiko105",
    icon: "medium",
  },
];

export const getSkills = (language: Language): SkillSet[] => {
  const t = translations[language];

  return [
    {
      category: t.backendDev,
      items: ["Laravel 11", "PHP", "RESTful API"],
    },
    {
      category: t.frontendDev,
      items: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    },
    {
      category: t.databaseMgmt,
      items: ["MySQL", "PostgreSQL"],
    },
    {
      category: language === "en" ? "Infrastructure & Operations" : "Infrastruktur & Operasi",
      items: [
        "Linux Server Administration",
        "MikroTik RouterOS",
        "TrueNAS Scale",
        "Cloud Services & Security",
        "Server Management",
      ],
    },
  ];
};

// Essay functions moved to utils/loadEssay.ts - using markdown files
// Legacy code below (kept for reference, but not used)
const _getEssaysLegacy = (language: Language): Essay[] => {
  const t = translations[language];

  return [
    {
      id: "i-am-angry-and-disappointed",
      title: "I Am Angry and Disappointed as If I Have Many Choices",
      titleId: "Saya Marah dan Kecewa Seolah Punya Banyak Pilihan",
      excerpt: "Riding home from work on the motorcycle I've used since high school, the bike knows every turn and pothole on the road. Even without my command, it will bring me home. I find myself sighing more often than paying attention to the road.",
      excerptId: "Pulang kerja dengan motor yang sudah saya pakai sejak SMA, motor ini tahu setiap belokan dan lubang di jalan. Bahkan tanpa perintah saya, dia akan membawa saya pulang. Saya menemukan diri saya menghela napas lebih sering daripada memperhatikan jalan.",
      content: `Riding home from work on the motorcycle I've used since high school, the bike knows every turn and pothole on the road. Even without my command, it will bring me home. I find myself sighing more often than paying attention to the road. It's a bad habit that's deeply ingrained.

Lately, this is what I constantly feel. It turns out that starting work can be this stressful; not the dramatic, conflicting kind of stress, but a silent one born from routine. Living through repetitive days, I feel like a headless person. My body moves automatically: wake up, shower, work, eat, sleep—like a robot programmed for a single, meaningless function.

But that's the only thing I can do right now. What else, really? I always thought that after the demanding years of school and college, I would find something "fun," "exciting," or "interesting" in the working world. There are no feelings whatsoever that can fulfill my right to be a complete human being.

A human without feelings is no different from Astro in Naoki Urasawa's series Pluto. I look at my face in the mirror; it behaves as if I'm human, smiling if necessary, nodding if required. But I know, if someone could detach the emotional chip in my skull, it could simply be replaced with a new one. All the emotions could even be refilled, as if this emptiness is just a bug that needs patching.

I try to escape, trying to fill this void with things that matter. Buying lots of books, reading lots of books—this activity has been somewhat entertaining lately. But ironically, it only sinks me deeper into things without emotion. I've become accustomed to analyzing my life, dissecting it completely, without ever truly feeling it. I need a rush of dopamine, not from books that make me think, but from experiences that make me feel.

I keep wishing that someday there will be a genius scientist who can detect what feeling is truly being felt when a person feels empty—an early warning signal, a detector—so I can take the medicine. But humans tend to realize it only when it's already severe, when the emptiness has permeated and feels cold.

All my anger over this repetitive routine, anger born from an unbearable saturation, makes me increasingly bitter, more cynical, and strangely, feel like I can conquer the world. That anger gives me the illusion of strength, the illusion that I am a caged lion ready to pounce.

I am angry, I am disappointed, and I act as if I have many choices in my hands.

Yet, when all the lights are off and I'm just staring at the bedroom ceiling, I know the truth. I know how limited my scope for movement is.

But do I really have many choices?`,
      contentId: `Pulang kerja dengan motor yang sudah saya pakai sejak SMA, motor ini tahu setiap belokan dan lubang di jalan. Bahkan tanpa perintah saya, dia akan membawa saya pulang. Saya menemukan diri saya menghela napas lebih sering daripada memperhatikan jalan. Ini adalah kebiasaan buruk yang sudah sangat mengakar.

Belakangan ini, inilah yang terus saya rasakan. Ternyata memulai bekerja bisa ses stressful ini; bukan stress yang dramatis dan penuh konflik, tapi yang sunyi, lahir dari rutinitas. Hidup melalui hari-hari yang berulang, saya merasa seperti orang tanpa kepala. Tubuh saya bergerak otomatis: bangun, mandi, kerja, makan, tidur—seperti robot yang diprogram untuk satu fungsi yang tidak berarti.

Tapi itu satu-satunya hal yang bisa saya lakukan sekarang. Apa lagi, benar-benar? Saya selalu berpikir bahwa setelah tahun-tahun menuntut di sekolah dan kuliah, saya akan menemukan sesuatu yang "menyenangkan," "menarik," atau "menarik" di dunia kerja. Tidak ada perasaan sama sekali yang dapat memenuhi hak saya untuk menjadi manusia yang utuh.

Manusia tanpa perasaan tidak berbeda dengan Astro dalam serial Pluto karya Naoki Urasawa. Saya melihat wajah saya di cermin; dia berperilaku seolah-olah saya manusia, tersenyum jika perlu, mengangguk jika diperlukan. Tapi saya tahu, jika seseorang bisa melepaskan chip emosional di tengkorak saya, itu bisa diganti dengan yang baru. Semua emosi bahkan bisa diisi ulang, seolah-olah kekosongan ini hanyalah bug yang perlu diperbaiki.

Saya mencoba melarikan diri, mencoba mengisi kekosongan ini dengan hal-hal yang penting. Membeli banyak buku, membaca banyak buku—aktivitas ini agak menghibur belakangan ini. Tapi ironisnya, itu hanya membuat saya tenggelam lebih dalam ke hal-hal tanpa emosi. Saya sudah terbiasa menganalisis hidup saya, membedahnya sepenuhnya, tanpa pernah benar-benar merasakannya. Saya butuh ledakan dopamin, bukan dari buku yang membuat saya berpikir, tapi dari pengalaman yang membuat saya merasa.

Saya terus berharap bahwa suatu hari nanti akan ada ilmuwan jenius yang dapat mendeteksi perasaan apa yang benar-benar dirasakan ketika seseorang merasa kosong—sinyal peringatan dini, detektor—agar saya bisa minum obatnya. Tapi manusia cenderung menyadarinya hanya ketika sudah parah, ketika kekosongan telah meresap dan terasa dingin.

Semua kemarahan saya atas rutinitas yang berulang ini, kemarahan yang lahir dari kejenuhan yang tak tertahankan, membuat saya semakin pahit, lebih sinis, dan anehnya, merasa seperti bisa menaklukkan dunia. Kemarahan itu memberi saya ilusi kekuatan, ilusi bahwa saya adalah singa yang terkurung siap menerkam.

Saya marah, saya kecewa, dan saya bertindak seolah-olah saya punya banyak pilihan di tangan saya.

Namun, ketika semua lampu padam dan saya hanya menatap langit-langit kamar tidur, saya tahu kebenarannya. Saya tahu betapa terbatasnya ruang gerak saya.

Tapi apakah saya benar-benar punya banyak pilihan?`,
      date: "2025-01-15",
    },
    {
      id: "the-art-of-silence",
      title: "The Art of Silence",
      titleId: "Seni Keheningan",
      excerpt: "In a world filled with constant noise, silence has become a luxury. We fill every moment with sound—music, podcasts, notifications—afraid of what we might hear in the quiet spaces between.",
      excerptId: "Di dunia yang dipenuhi dengan kebisingan yang konstan, keheningan telah menjadi kemewahan. Kita mengisi setiap momen dengan suara—musik, podcast, notifikasi—takut akan apa yang mungkin kita dengar di ruang-ruang sunyi di antara.",
      content: `In a world filled with constant noise, silence has become a luxury. We fill every moment with sound—music, podcasts, notifications—afraid of what we might hear in the quiet spaces between.

The fear of silence is perhaps the fear of ourselves. When the external noise stops, we are left alone with our thoughts, our doubts, our unspoken truths. It's easier to drown them out than to face them.

But silence is not emptiness. It is a canvas upon which we can paint our deepest reflections. In silence, we find clarity. In silence, we discover what truly matters.

I've learned to embrace these quiet moments, to sit with the discomfort of stillness. It is in these spaces that I find my most honest thoughts, my clearest insights, my truest self.

The art of silence is not about avoiding sound, but about choosing when to listen and when to let the quiet speak.`,
      contentId: `Di dunia yang dipenuhi dengan kebisingan yang konstan, keheningan telah menjadi kemewahan. Kita mengisi setiap momen dengan suara—musik, podcast, notifikasi—takut akan apa yang mungkin kita dengar di ruang-ruang sunyi di antara.

Ketakutan akan keheningan mungkin adalah ketakutan akan diri kita sendiri. Ketika suara eksternal berhenti, kita ditinggalkan sendirian dengan pikiran kita, keraguan kita, kebenaran kita yang tidak terucapkan. Lebih mudah untuk menenggelamkannya daripada menghadapinya.

Tapi keheningan bukanlah kekosongan. Itu adalah kanvas di mana kita bisa melukis refleksi terdalam kita. Dalam keheningan, kita menemukan kejelasan. Dalam keheningan, kita menemukan apa yang benar-benar penting.

Saya telah belajar untuk merangkul momen-momen sunyi ini, untuk duduk dengan ketidaknyamanan ketenangan. Di ruang-ruang inilah saya menemukan pikiran saya yang paling jujur, wawasan saya yang paling jelas, diri saya yang paling benar.

Seni keheningan bukan tentang menghindari suara, tapi tentang memilih kapan harus mendengarkan dan kapan membiarkan keheningan berbicara.`,
      date: "2025-01-10",
    },
    {
      id: "on-photography-and-memory",
      title: "On Photography and Memory",
      titleId: "Tentang Fotografi dan Memori",
      excerpt: "Every photograph is a moment frozen in time, but what we capture is not the moment itself—it's our memory of it, filtered through the lens of our perception, our emotions, our expectations.",
      excerptId: "Setiap foto adalah momen yang membeku dalam waktu, tapi yang kita tangkap bukanlah momen itu sendiri—itu adalah ingatan kita tentangnya, yang disaring melalui lensa persepsi kita, emosi kita, harapan kita.",
      content: `Every photograph is a moment frozen in time, but what we capture is not the moment itself—it's our memory of it, filtered through the lens of our perception, our emotions, our expectations.

When I look at old photographs, I don't see the past as it was. I see it as I remember it, or as I wish it had been. The camera lies, not because it distorts reality, but because it can only capture a fragment—a single frame in an infinite sequence of moments.

Photography has taught me that memory is not a recording but a reconstruction. We don't remember events; we remember our last memory of them. Each time we recall something, we reshape it slightly, until the memory becomes more about how we feel about it than what actually happened.

This is both beautiful and terrifying. Beautiful because it means we can find meaning in our past, can shape our narrative. Terrifying because it means we can never truly return to a moment, can never experience it exactly as it was.

But perhaps that's the point. Perhaps the value of photography is not in preserving the past, but in creating a bridge between who we were and who we are becoming.`,
      contentId: `Setiap foto adalah momen yang membeku dalam waktu, tapi yang kita tangkap bukanlah momen itu sendiri—itu adalah ingatan kita tentangnya, yang disaring melalui lensa persepsi kita, emosi kita, harapan kita.

Ketika saya melihat foto-foto lama, saya tidak melihat masa lalu seperti apa adanya. Saya melihatnya seperti yang saya ingat, atau seperti yang saya harapkan. Kamera berbohong, bukan karena mendistorsi kenyataan, tapi karena hanya bisa menangkap fragmen—satu frame dalam urutan momen yang tak terbatas.

Fotografi telah mengajarkan saya bahwa ingatan bukanlah rekaman tapi rekonstruksi. Kita tidak mengingat peristiwa; kita mengingat ingatan terakhir kita tentang mereka. Setiap kali kita mengingat sesuatu, kita sedikit membentuknya kembali, sampai ingatan itu menjadi lebih tentang bagaimana perasaan kita tentangnya daripada apa yang sebenarnya terjadi.

Ini indah dan menakutkan. Indah karena berarti kita bisa menemukan makna dalam masa lalu kita, bisa membentuk narasi kita. Menakutkan karena berarti kita tidak pernah bisa benar-benar kembali ke suatu momen, tidak pernah bisa mengalaminya persis seperti dulu.

Tapi mungkin itu intinya. Mungkin nilai fotografi bukan dalam melestarikan masa lalu, tapi dalam menciptakan jembatan antara siapa kita dulu dan siapa kita yang sedang menjadi.`,
      date: "2025-01-05",
    },
    {
      id: "the-routine-of-existence",
      title: "The Routine of Existence",
      titleId: "Rutinitas Eksistensi",
      excerpt: "We wake up, we work, we sleep. We repeat. In this repetition, we find comfort and security, but also a slow erosion of wonder, a gradual numbing of the senses.",
      excerptId: "Kita bangun, kita bekerja, kita tidur. Kita mengulang. Dalam pengulangan ini, kita menemukan kenyamanan dan keamanan, tapi juga erosi lambat dari keajaiban, mati rasa bertahap dari indera.",
      content: `We wake up, we work, we sleep. We repeat. In this repetition, we find comfort and security, but also a slow erosion of wonder, a gradual numbing of the senses.

The routine becomes a cage we've built ourselves, thinking it would protect us from chaos. Instead, it protects us from life itself—from spontaneity, from discovery, from the unexpected beauty that comes when we step off the well-trodden path.

I've noticed how my days blur into each other, how Monday feels the same as Friday, how weeks pass without leaving a mark. It's not that nothing happens—it's that everything happens in the same way, following the same script, producing the same outcomes.

Breaking the routine requires courage. It means facing uncertainty, embracing discomfort, choosing the unknown over the familiar. But it's in these breaks that we find ourselves again, remember what it feels like to be truly alive.

The routine of existence is not the enemy—it's the comfort zone that becomes a prison when we forget we can leave.`,
      contentId: `Kita bangun, kita bekerja, kita tidur. Kita mengulang. Dalam pengulangan ini, kita menemukan kenyamanan dan keamanan, tapi juga erosi lambat dari keajaiban, mati rasa bertahap dari indera.

Rutinitas menjadi sangkar yang kita bangun sendiri, berpikir itu akan melindungi kita dari kekacauan. Sebaliknya, itu melindungi kita dari kehidupan itu sendiri—dari spontanitas, dari penemuan, dari keindahan tak terduga yang datang ketika kita melangkah keluar dari jalan yang sudah biasa.

Saya telah memperhatikan bagaimana hari-hari saya kabur menjadi satu, bagaimana Senin terasa sama dengan Jumat, bagaimana minggu-minggu berlalu tanpa meninggalkan bekas. Bukan berarti tidak ada yang terjadi—tapi semuanya terjadi dengan cara yang sama, mengikuti skrip yang sama, menghasilkan hasil yang sama.

Memecahkan rutinitas membutuhkan keberanian. Itu berarti menghadapi ketidakpastian, merangkul ketidaknyamanan, memilih yang tidak dikenal daripada yang familiar. Tapi dalam istirahat-istirahat inilah kita menemukan diri kita lagi, mengingat bagaimana rasanya benar-benar hidup.

Rutinitas eksistensi bukanlah musuh—itu adalah zona nyaman yang menjadi penjara ketika kita lupa bahwa kita bisa pergi.`,
      date: "2024-12-28",
    },
    {
      id: "writing-as-thinking",
      title: "Writing as Thinking",
      titleId: "Menulis sebagai Berpikir",
      excerpt: "I don't write to express what I already know. I write to discover what I don't know, to untangle the knots in my mind, to make sense of the chaos within.",
      excerptId: "Saya tidak menulis untuk mengekspresikan apa yang sudah saya ketahui. Saya menulis untuk menemukan apa yang tidak saya ketahui, untuk mengurai simpul-simpul di pikiran saya, untuk memahami kekacauan di dalam.",
      content: `I don't write to express what I already know. I write to discover what I don't know, to untangle the knots in my mind, to make sense of the chaos within.

Writing is thinking made visible. When I put words on paper, I'm not just recording thoughts—I'm creating them. The act of writing forces me to slow down, to examine each idea, to see connections I hadn't noticed before.

There's something magical about watching a thought take shape through words. It starts as a vague feeling, an intuition, a half-formed idea. Then, as I write, it crystallizes. It becomes something concrete, something I can examine, question, refine.

This is why I write essays. Not because I have answers, but because I have questions. Not because I want to teach, but because I want to learn. Writing is my way of thinking out loud, of having a conversation with myself, of exploring the landscape of my own mind.

The blank page is not empty—it's full of possibilities. Every word I write opens up new paths, new questions, new ways of seeing. And that's the beauty of it.`,
      contentId: `Saya tidak menulis untuk mengekspresikan apa yang sudah saya ketahui. Saya menulis untuk menemukan apa yang tidak saya ketahui, untuk mengurai simpul-simpul di pikiran saya, untuk memahami kekacauan di dalam.

Menulis adalah berpikir yang dibuat terlihat. Ketika saya menaruh kata-kata di atas kertas, saya tidak hanya merekam pikiran—saya menciptakannya. Tindakan menulis memaksa saya untuk melambat, untuk memeriksa setiap ide, untuk melihat koneksi yang belum saya perhatikan sebelumnya.

Ada sesuatu yang ajaib tentang menonton sebuah pikiran mengambil bentuk melalui kata-kata. Itu dimulai sebagai perasaan samar, intuisi, ide yang setengah terbentuk. Kemudian, saat saya menulis, itu mengkristal. Itu menjadi sesuatu yang konkret, sesuatu yang bisa saya periksa, pertanyakan, perbaiki.

Inilah mengapa saya menulis esai. Bukan karena saya punya jawaban, tapi karena saya punya pertanyaan. Bukan karena saya ingin mengajar, tapi karena saya ingin belajar. Menulis adalah cara saya untuk berpikir keras, untuk bercakap-cakap dengan diri sendiri, untuk menjelajahi lanskap pikiran saya sendiri.

Halaman kosong tidak kosong—itu penuh dengan kemungkinan. Setiap kata yang saya tulis membuka jalan baru, pertanyaan baru, cara baru untuk melihat. Dan itulah keindahannya.`,
      date: "2024-12-20",
    },
    {
      id: "the-weight-of-expectations",
      title: "The Weight of Expectations",
      titleId: "Beban Ekspektasi",
      excerpt: "We carry expectations like stones in our pockets—expectations from others, expectations from ourselves, expectations from a future that hasn't happened yet. The weight grows heavier with each passing day.",
      excerptId: "Kita membawa ekspektasi seperti batu di saku kita—ekspektasi dari orang lain, ekspektasi dari diri kita sendiri, ekspektasi dari masa depan yang belum terjadi. Beban menjadi lebih berat dengan setiap hari yang berlalu.",
      content: `We carry expectations like stones in our pockets—expectations from others, expectations from ourselves, expectations from a future that hasn't happened yet. The weight grows heavier with each passing day.

I've spent years trying to meet these expectations, to be the person others want me to be, to achieve the things I'm supposed to achieve. But the more I try, the heavier the stones become, until I can barely move under their weight.

The problem is not the expectations themselves—it's that we never question them. We accept them as truth, as inevitability, as the only way forward. We forget that we can put the stones down, that we can choose which ones to carry and which ones to leave behind.

Learning to let go has been one of the hardest lessons of my life. It means disappointing people, falling short of my own standards, accepting that I can't be everything to everyone. But it also means freedom—the freedom to be myself, to follow my own path, to define success on my own terms.

The weight of expectations is real, but it's also optional. We can choose to carry it, or we can choose to set it down and walk lighter.`,
      contentId: `Kita membawa ekspektasi seperti batu di saku kita—ekspektasi dari orang lain, ekspektasi dari diri kita sendiri, ekspektasi dari masa depan yang belum terjadi. Beban menjadi lebih berat dengan setiap hari yang berlalu.

Saya telah menghabiskan bertahun-tahun mencoba memenuhi ekspektasi ini, untuk menjadi orang yang diinginkan orang lain, untuk mencapai hal-hal yang seharusnya saya capai. Tapi semakin saya mencoba, semakin berat batu-batu itu menjadi, sampai saya hampir tidak bisa bergerak di bawah beban mereka.

Masalahnya bukan ekspektasi itu sendiri—tapi kita tidak pernah mempertanyakannya. Kita menerimanya sebagai kebenaran, sebagai keniscayaan, sebagai satu-satunya jalan ke depan. Kita lupa bahwa kita bisa meletakkan batu-batu itu, bahwa kita bisa memilih mana yang harus dibawa dan mana yang harus ditinggalkan.

Belajar melepaskan telah menjadi salah satu pelajaran tersulit dalam hidup saya. Itu berarti mengecewakan orang, tidak mencapai standar saya sendiri, menerima bahwa saya tidak bisa menjadi segalanya untuk semua orang. Tapi itu juga berarti kebebasan—kebebasan untuk menjadi diri saya sendiri, untuk mengikuti jalan saya sendiri, untuk mendefinisikan kesuksesan dengan syarat saya sendiri.

Beban ekspektasi itu nyata, tapi itu juga opsional. Kita bisa memilih untuk membawanya, atau kita bisa memilih untuk meletakkannya dan berjalan lebih ringan.`,
      date: "2024-12-15",
    },
  ];
};

// Essay functions moved to utils/loadEssay.ts
