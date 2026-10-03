
export const contact = {
  wa1: "6285126054350",
  wa2: "6282210317785",
  phone: "(0851) 2605-4350",
  waLink: (building: string, room: string) => `https://wa.me/6285126054350?text=Halo%20Admin%20${building},%20saya%20mau%20tanya%20kamar%20${room}%20untuk%20tanggal%20...`
}

export const buildings = [
  { id: "sky_house", name: "Sky House", label: "Apartemen Sky House", badge: "Premium", color: "#E6EEF7", desc: "Lebih luas & ada TV" },
  { id: "tokyo", name: "Tokyo", label: "Apartemen Tokyo", badge: "Value", color: "#FFF4E0", desc: "Ekonomis & nyaman" }
] as const;

export type RoomType = {
  id: string;
  buildingId: "sky_house" | "tokyo";
  name: string;
  slug: string;
  typeLabel: string;
  priceWeekday: number;
  priceWeekend: number;
  priceMonthly: number;
  priceMonthlyLabel: string;
  weekdayLabel: string;
  weekendLabel: string;
  capacity: number;
  beds: string;
  baths: string;
  size: string;
  facilities: string[];
  photos: string[];
  location: string;
  popular?: boolean;
};

export const roomTypes: RoomType[] = [
  {
    id: "sky-studio",
    buildingId: "sky_house",
    name: "Kamar Studio Sky House",
    slug: "sky-house-studio",
    typeLabel: "Studio",
    priceWeekday: 250000,
    priceWeekend: 280000,
    priceMonthly: 5000000,
    priceMonthlyLabel: "5 Jt",
    weekdayLabel: "Senin - Kamis",
    weekendLabel: "Jumat - Minggu",
    capacity: 2,
    beds: "1 Bed",
    baths: "1 Bath",
    size: "22 Sq Ft",
    location: "Sky House, BSD",
    popular: true,
    facilities: ["Kasur 140cm", "AC", "Kulkas", "TV", "Water heater", "Termos listrik", "Shampoo", "Sikat gigi", "Handuk", "Keset", "Tissue"],
    photos: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop"]
  },
  {
    id: "sky-family",
    buildingId: "sky_house",
    name: "Kamar Family (D2) Sky House",
    slug: "sky-house-family-d2",
    typeLabel: "Family D2",
    priceWeekday: 550000,
    priceWeekend: 600000,
    priceMonthly: 10000000,
    priceMonthlyLabel: "10 Jt",
    weekdayLabel: "Senin - Jumat",
    weekendLabel: "Sabtu - Minggu",
    capacity: 4,
    beds: "2 Beds",
    baths: "1 Bath",
    size: "45 Sq Ft",
    location: "Sky House, BSD",
    facilities: ["Kasur 140cm x2", "AC", "Kulkas", "TV", "Water heater", "Dapur", "Termos listrik", "Handuk"],
    photos: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop"]
  },
  {
    id: "tokyo-studio",
    buildingId: "tokyo",
    name: "Kamar Studio Tokyo",
    slug: "tokyo-studio",
    typeLabel: "Studio",
    priceWeekday: 160000,
    priceWeekend: 180000,
    priceMonthly: 4200000,
    priceMonthlyLabel: "4,2 Jt",
    weekdayLabel: "Senin - Kamis",
    weekendLabel: "Jumat - Minggu",
    capacity: 2,
    beds: "1 Bed",
    baths: "1 Bath",
    size: "20 Sq Ft",
    location: "Tokyo, PIK2",
    popular: true,
    facilities: ["Kasur 140cm", "AC", "Kulkas", "Water heater", "Termos listrik", "Alat mandi", "Shampoo", "Sabun", "Sikat gigi"],
    photos: ["https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&auto=format&fit=crop"]
  },
  {
    id: "tokyo-2br",
    buildingId: "tokyo",
    name: "Kamar 2 Bedroom Tokyo",
    slug: "tokyo-2br",
    typeLabel: "2 Bedroom",
    priceWeekday: 250000,
    priceWeekend: 280000,
    priceMonthly: 5000000,
    priceMonthlyLabel: "5 Jt",
    weekdayLabel: "Senin - Kamis",
    weekendLabel: "Jumat - Minggu",
    capacity: 4,
    beds: "2 Beds",
    baths: "1 Bath",
    size: "38 Sq Ft",
    location: "Tokyo, PIK2",
    facilities: ["Kasur 140cm x2", "AC", "Kulkas", "Water heater", "Termos listrik", "Shampoo"],
    photos: ["https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&auto=format&fit=crop"]
  }
];

export const parking = {
  sky_house: { mobil_per_jam: "Rp4.000", mobil_24jam: "Rp30.000", motor_per_jam: "Rp2.000", motor_24jam: "Rp15.000" },
  tokyo: { mobil_per_jam: "Rp5.000", mobil_24jam: "Rp45.000 - 50.000", motor_per_jam: "Rp3.000", motor_24jam: "Rp20.000 - 25.000" }
};

export const procedures = {
  checkin: "14.00",
  checkout: "11.00",
  tokyo_max: "22.00",
  note: "Tidak dapat menambah waktu check-in per jam karena kami sewa permalam tidak perjam. Untuk Tokyo maksimal check-in 22.00 WIB, setelah itu lewat Akses Lobby Ground."
};

export const rules = {
  prohibited: [
    { title: "Perbuatan mesum/asusila", desc: "Indecent acts" },
    { title: "Prostitusi atau menjual diri", desc: "Prostitution" },
    { title: "Percabulan", desc: "Sexual abuse" },
    { title: "Peredaran atau penggunaan barang terlarang", desc: "Drug distribution" },
    { title: "Aktivitas ilegal lainnya", desc: "Other illegal" }
  ],
  sanction: "Penghuni dapat dikenakan tindakan sesuai peraturan pengelola, tata tertib gedung, dan ketentuan hukum yang berlaku. Pelanggar dapat dipidana kurungan penjara maksimal 3 bulan dan denda Rp 50.000.000"
};

export function formatPrice(n: number){ return new Intl.NumberFormat("id-ID").format(n) }
