/**
 * Editorial content, BRAND.md section 6.
 * Six topics, each written in the Simpul tone of voice: spec first, warm
 * second, no filler, and no em dash or en dash anywhere. R11.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | {
      kind: "table";
      head: string[];
      rows: string[][];
    };

export type Article = {
  slug: string;
  title: string;
  /** rendered as its own block beside the title, never inline. R50. */
  category: string;
  excerpt: string;
  readMinutes: number;
  date: string;
  dateLabel: string;
  cover: string;
  coverAlt: string;
  /** slugs from products.ts that this article actually references */
  productSlugs: string[];
  body: Block[];
  featured?: boolean;
};

export const ARTICLES: Article[] = [
  {
    slug: "cara-pakai-pashmina-simpel-ke-kantor",
    title: "Cara pakai pashmina simpel untuk ke kantor, tiga menit jadi",
    category: "Tutorial",
    excerpt:
      "Empat langkah, satu jarum, dan tidak perlu cermin besar. Gaya yang sama dipakai tiap pagi tanpa bikin telat standup.",
    readMinutes: 5,
    date: "2026-07-12",
    dateLabel: "12 Juli 2026",
    cover: "img/articles/cara-pakai-pashmina-kantor.jpg",
    coverAlt:
      "Perempuan muda membentuk pashmina di depan cermin pada pagi hari",
    productSlugs: ["pashmina-alun-voal", "set-jarum-magnet", "inner-ninja-antem"],
    featured: true,
    body: [
      {
        kind: "p",
        text: "Gaya ini dipilih karena tiga alasan. Tidak butuh banyak jarum, tidak perlu diperbaiki sepanjang hari, dan bentuknya tetap sopan buat rapat. Kalau kamu baru pindah dari segi empat ke pashmina, mulai dari sini.",
      },
      { kind: "h2", text: "Yang perlu disiapkan" },
      {
        kind: "list",
        items: [
          "Satu pashmina 175x75 cm, bahan voal atau ceruty",
          "Satu inner ninja yang pas, tidak longgar di bagian dahi",
          "Dua jarum magnet, satu untuk bahu, satu untuk dada",
        ],
      },
      { kind: "h2", text: "Langkahnya" },
      {
        kind: "steps",
        items: [
          {
            title: "Bagi kainnya tidak sama panjang",
            text: "Letakkan pashmina di kepala dengan sisi kanan lebih panjang, kira kira dua banding satu. Sisi pendek nanti jadi lapisan depan, sisi panjang yang dililit.",
          },
          {
            title: "Kunci di bawah dagu",
            text: "Satukan kedua sisi tepat di bawah dagu dengan satu jarum magnet. Jangan terlalu kencang, sisakan ruang satu jari supaya tidak mencekik waktu bicara.",
          },
          {
            title: "Bawa sisi panjang melewati bahu",
            text: "Ambil sisi yang panjang, bawa ke belakang leher, lalu jatuhkan ke depan di bahu yang berlawanan. Biarkan jatuh sendiri, jangan ditarik supaya lipatannya tetap alami.",
          },
          {
            title: "Rapikan bagian depan",
            text: "Tarik pelan lapisan depan supaya menutupi dada, lalu kunci dengan jarum kedua di bagian bahu. Selesai, dan biasanya memang tidak sampai tiga menit setelah beberapa kali latihan.",
          },
        ],
      },
      {
        kind: "quote",
        text: "Kalau bentuknya berubah sebelum jam makan siang, biasanya bukan cara pakainya yang salah, tapi bahannya terlalu licin.",
      },
      { kind: "h2", text: "Kalau masih sering berantakan" },
      {
        kind: "p",
        text: "Dua penyebab yang paling sering. Pertama, innernya kebesaran jadi hijabnya ikut bergeser tiap kali kepala menoleh. Kedua, bahannya terlalu jatuh untuk gaya ini. Voal dan ceruty cocok, satin licin dan lebih cocok untuk acara. Kalau kamu butuh yang bentuknya bertahan sampai sore, coba diamond crepe.",
      },
    ],
  },
  {
    slug: "beda-voal-ceruty-diamond-crepe",
    title: "Beda voal, ceruty babydoll, dan diamond crepe, mana yang cocok buat kamu",
    category: "Panduan bahan",
    excerpt:
      "Tiga bahan yang paling sering ditanya, dibandingkan dari berat, jatuh, tekstur, dan siapa yang cocok pakai apa.",
    readMinutes: 6,
    date: "2026-07-05",
    dateLabel: "5 Juli 2026",
    cover: "img/articles/beda-voal-ceruty-diamond.jpg",
    coverAlt: "Tiga jenis kain hijab dibentangkan berdampingan di meja kayu",
    productSlugs: [
      "pashmina-alun-voal",
      "pashmina-alun-ceruty",
      "pashmina-bilah-diamond",
    ],
    body: [
      {
        kind: "p",
        text: "Nama bahan di marketplace sering dipakai sembarangan, jadi wajar kalau membingungkan. Ini perbandingan yang jujur, termasuk kekurangan masing masing.",
      },
      {
        kind: "table",
        head: ["", "Voal", "Ceruty babydoll", "Diamond crepe"],
        rows: [
          ["Berat per lembar", "Sekitar 95 gram", "Sekitar 80 gram", "Sekitar 115 gram"],
          ["Permukaan", "Matte halus, nap rapat", "Crepe lembut", "Tekstur kulit jeruk"],
          ["Jatuhnya", "Rapi dan terkontrol", "Paling jatuh dan ringan", "Berdiri, lebih bertubuh"],
          ["Bertahan sampai sore", "Cukup", "Kurang, cenderung letoy", "Paling bertahan"],
          ["Cocok buat", "Harian dan kerja", "Pemula dan cuaca panas", "Yang hijabnya sering letoy"],
          ["Kekurangan", "Perlu disetrika kalau terlipat lama", "Bentuk gampang turun", "Terasa lebih tebal saat panas"],
        ],
      },
      { kind: "h2", text: "Cara memilih dalam satu kalimat" },
      {
        kind: "list",
        items: [
          "Kalau kamu baru mulai pakai pashmina, ambil ceruty babydoll, paling gampang dibentuk.",
          "Kalau hijabmu selalu letoy jam dua siang, ambil diamond crepe.",
          "Kalau kamu mau satu bahan yang aman untuk semua situasi, ambil voal.",
        ],
      },
      {
        kind: "p",
        text: "Satu catatan soal harga. Bahan yang lebih mahal belum tentu lebih cocok buat kamu. Ceruty adalah yang paling murah di koleksi ini dan justru paling banyak dibeli ulang, karena enak dipakai di cuaca Jakarta.",
      },
    ],
  },
  {
    slug: "panduan-warna-hijab-2026",
    title: "Panduan warna hijab 2026, netral yang tetap terlihat segar",
    category: "Gaya",
    excerpt:
      "Olive, mocha, beige, dan dusty blue, dan cara memadukannya dengan outfit yang sudah kamu punya tanpa beli baju baru.",
    readMinutes: 5,
    date: "2026-06-28",
    dateLabel: "28 Juni 2026",
    cover: "img/articles/panduan-warna-hijab-2026.jpg",
    coverAlt:
      "Tumpukan hijab warna netral olive, mocha, dan biru kabut di atas meja terang",
    productSlugs: [
      "pashmina-sanding-viscose",
      "segi-empat-titik-voal",
      "pashmina-alun-voal",
    ],
    body: [
      {
        kind: "p",
        text: "Warna netral sedang naik dan alasannya masuk akal. Netral gampang dipadukan, tidak cepat bosan, dan tidak menua di foto. Tapi netral yang salah bisa bikin wajah terlihat lelah, jadi ini panduannya.",
      },
      { kind: "h2", text: "Empat warna dan pasangannya" },
      {
        kind: "table",
        head: ["Warna", "Kesan", "Paling aman dipadukan dengan"],
        rows: [
          ["Zaitun", "Tenang, sedikit earthy", "Krem, putih tulang, denim gelap"],
          ["Mocha", "Hangat, dewasa", "Krem susu, hitam, abu kabut"],
          ["Krem susu", "Terang, bersih", "Hampir semua, termasuk motif"],
          ["Biru senja", "Segar, tidak mencolok", "Putih tulang, abu, coklat muda"],
        ],
      },
      { kind: "h2", text: "Cara memilih kalau kulitmu cenderung kuning" },
      {
        kind: "p",
        text: "Ambil netral yang hangat, mocha dan krem susu, dan hindari abu yang terlalu dingin dekat wajah. Kalau kamu tetap mau warna dingin seperti biru senja, letakkan lapisan krem di bagian depan supaya ada transisi.",
      },
      {
        kind: "quote",
        text: "Netral bukan berarti tidak berwarna. Netral berarti warnanya tidak berteriak.",
      },
      {
        kind: "p",
        text: "Kalau kamu cuma mau beli tiga, ambil krem susu, zaitun, dan hitam pekat. Tiga itu menutup hampir semua situasi, dari kuliah sampai kondangan siang.",
      },
    ],
  },
  {
    slug: "rahasia-hijab-tidak-mudah-letoy",
    title: "Rahasia hijab tidak mudah letoy, dari cara cuci sampai cara simpan",
    category: "Perawatan",
    excerpt:
      "Suhu air, deterjen, cara jemur, cara lipat, dan lima kesalahan yang paling sering bikin hijab cepat rusak.",
    readMinutes: 7,
    date: "2026-06-20",
    dateLabel: "20 Juni 2026",
    cover: "img/articles/rahasia-hijab-tidak-letoy.jpg",
    coverAlt:
      "Hijab dicuci dengan tangan di baskom berisi air dingin di dekat jendela",
    productSlugs: ["pashmina-bilah-diamond", "pouch-kanvas", "pashmina-alun-voal"],
    body: [
      {
        kind: "p",
        text: "Hijab jarang rusak karena dipakai. Biasanya rusak karena dicuci dan disimpan dengan cara yang salah. Ini urutan yang benar, dan kenapa tiap langkahnya penting.",
      },
      { kind: "h2", text: "Mencuci" },
      {
        kind: "steps",
        items: [
          {
            title: "Pakai air dingin, maksimal 30 derajat",
            text: "Air panas melemaskan serat dan itulah awal letoy. Kalau ragu, pakai air keran biasa tanpa dicampur air panas sama sekali.",
          },
          {
            title: "Deterjen cair, bukan bubuk",
            text: "Butiran deterjen bubuk sering tidak larut sempurna dan meninggalkan bercak putih di kain gelap. Deterjen cair untuk pakaian halus lebih aman.",
          },
          {
            title: "Jangan direndam lebih dari 15 menit",
            text: "Merendam lama membuat warna luntur, terutama pada warna gelap seperti marun dan biru tinta. Cukup lima sampai sepuluh menit.",
          },
          {
            title: "Jangan diperas dengan cara dipuntir",
            text: "Puntiran merusak jatuhnya kain secara permanen. Tekan pelan di antara dua telapak tangan, atau gulung dengan handuk lalu tekan.",
          },
        ],
      },
      { kind: "h2", text: "Menjemur dan menyimpan" },
      {
        kind: "list",
        items: [
          "Jemur di tempat teduh dengan angin, bukan di bawah matahari langsung, karena sinar UV memudarkan warna.",
          "Gantung memanjang, jangan dilipat di atas jemuran, supaya tidak ada garis lipat permanen di tengah.",
          "Simpan digulung, bukan dilipat, terutama untuk voal dan satin.",
          "Kalau dibawa di dalam tas, masukkan ke pouch supaya tidak tergencet botol minum.",
        ],
      },
      { kind: "h2", text: "Lima kesalahan yang paling sering" },
      {
        kind: "list",
        items: [
          "Mencuci hijab bersama jeans, resletingnya menyangkut dan menarik serat.",
          "Memakai pemutih pada hijab putih tulang, warnanya justru berubah kekuningan.",
          "Menyetrika satin dengan suhu tinggi tanpa alas kain.",
          "Menyemprot parfum langsung ke kain, alkoholnya meninggalkan noda samar.",
          "Menyimpan dalam kondisi belum benar benar kering, ini yang bikin bau apek.",
        ],
      },
    ],
  },
  {
    slug: "segi-empat-110-atau-115",
    title: "Segi empat 110 atau 115, mana ukuran yang pas untuk bentuk wajah kamu",
    category: "Panduan ukuran",
    excerpt:
      "Selisihnya cuma lima sentimeter, tapi hasilnya beda jelas di bagian dada dan di sisi wajah. Ini cara memilihnya.",
    readMinutes: 4,
    date: "2026-06-14",
    dateLabel: "14 Juni 2026",
    cover: "img/articles/segi-empat-110-atau-115.jpg",
    coverAlt:
      "Dua hijab segi empat berbeda ukuran dibentangkan berdampingan untuk dibandingkan",
    productSlugs: [
      "segi-empat-kanvas-polycotton",
      "segi-empat-titik-voal",
      "segi-empat-satin-lembayung",
    ],
    body: [
      {
        kind: "p",
        text: "Lima sentimeter kedengarannya sedikit. Tapi karena segi empat dilipat jadi segitiga, selisih itu berlipat dan terasa jelas di bagian yang menutupi dada.",
      },
      {
        kind: "table",
        head: ["", "110 x 110 cm", "115 x 115 cm"],
        rows: [
          ["Panjang jatuh di depan", "Sampai sekitar ulu hati", "Sampai bawah dada"],
          ["Perlu ditumpuk", "Kadang perlu untuk kerja", "Umumnya tidak perlu"],
          ["Kesan di wajah", "Lebih ringkas", "Sedikit lebih membingkai"],
          ["Cocok untuk", "Sekolah, kuliah, harian", "Kerja, acara, yang mau tertutup rapi"],
        ],
      },
      { kind: "h2", text: "Kalau wajahmu bulat" },
      {
        kind: "p",
        text: "Ambil 115 dan tarik sedikit lebih maju di bagian pelipis. Sisi yang jatuh lebih panjang membuat garis vertikal dan itu menyeimbangkan lebar wajah.",
      },
      { kind: "h2", text: "Kalau wajahmu panjang atau lonjong" },
      {
        kind: "p",
        text: "110 biasanya lebih pas, dan biarkan sedikit lebih longgar di bagian pipi. Jangan ditarik terlalu ke belakang karena justru memanjangkan tampilan wajah.",
      },
      {
        kind: "p",
        text: "Kalau masih ragu, mulai dari 110 di bahan polycotton yang murah, lalu naik ke 115 di voal setelah tahu gaya harianmu seperti apa.",
      },
    ],
  },
  {
    slug: "sport-hijab-bukan-jersey-biasa",
    title: "Sport hijab bukan cuma jersey biasa, ini yang bikin beda",
    category: "Panduan bahan",
    excerpt:
      "Bahan quick dry, karet anti geser, dan kenapa hijab harian justru bikin repot waktu olahraga.",
    readMinutes: 4,
    date: "2026-06-07",
    dateLabel: "7 Juni 2026",
    cover: "img/articles/sport-hijab-bukan-jersey-biasa.jpg",
    coverAlt:
      "Perempuan muda memakai sport hijab saat pemanasan di ruangan terang",
    productSlugs: ["sport-hijab-laju", "inner-ninja-antem", "pouch-kanvas"],
    body: [
      {
        kind: "p",
        text: "Banyak yang memakai bergo jersey biasa buat olahraga dan mengeluh gerah. Masalahnya bukan modelnya, tapi bahannya menahan keringat, bukan memindahkannya.",
      },
      { kind: "h2", text: "Tiga hal yang membedakan" },
      {
        kind: "steps",
        items: [
          {
            title: "Bahan quick dry, bukan katun",
            text: "Katun menyerap keringat lalu menahannya, jadi terasa berat dan dingin setelah selesai. Quick dry knit memindahkan keringat ke permukaan luar supaya cepat menguap.",
          },
          {
            title: "Karet anti geser di bagian dalam",
            text: "Tanpa itu, hijab bergeser tiap kali kamu menunduk atau melompat, dan kamu berhenti tiap lima menit untuk membetulkan.",
          },
          {
            title: "Jahitan flatlock",
            text: "Jahitan biasa menonjol dan menggesek kulit yang basah oleh keringat. Flatlock rata, jadi tidak menimbulkan iritasi di leher.",
          },
        ],
      },
      {
        kind: "quote",
        text: "Kalau kamu berhenti tiga kali dalam satu sesi lari cuma untuk membetulkan hijab, itu bukan salah kamu.",
      },
      {
        kind: "p",
        text: "Satu tips terakhir. Jangan pakai pelembut kain untuk sport hijab, karena lapisan pelembut menutup pori kain dan menghilangkan sifat quick dry-nya.",
      },
    ],
  },
];

export const articleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const featuredArticle = (): Article =>
  ARTICLES.find((a) => a.featured) ?? ARTICLES[0];

export const otherArticles = (slug: string, limit = 3): Article[] =>
  ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
