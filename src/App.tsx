
import { useState, useEffect } from "react"
import { roomTypes, contact, parking, rules } from "./apartment-data"

export default function App(){
  const [building, setBuilding] = useState<"all"|"sky_house"|"tokyo">("all");
  const [active, setActive] = useState("home");
  const sections = ["home","apartments","amenities","contact"] as const
  const filtered = building==="all" ? roomTypes : roomTypes.filter((r:any)=>r.buildingId===building);

  useEffect(()=>{
    const onScroll=()=>{
      const pos=window.scrollY+250
      for(const id of sections){
        const el=document.getElementById(id)
        if(el && pos>=el.offsetTop && pos<el.offsetTop+el.offsetHeight){ setActive(id); break }
      }
    }
    window.addEventListener("scroll", onScroll)
    return ()=>window.removeEventListener("scroll", onScroll)
  },[])

  const scrollTo=(id:string)=>{ setActive(id as any); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}) }

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#121619]">
      <div className="bg-[#0F172A] text-white text-[11px] py-2 px-6 flex justify-between"><span>{roomTypes.length}+ Unit Tersedia</span><span className="hidden md:block">4.8/5 Rating</span><span>{contact.phone}</span></div>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E2E8F0] px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="font-bold text-[20px] tracking-tight">SKY HOUSE & TOKYO</div>
        <div className="hidden md:flex gap-6 text-[13px]">
          {sections.map(s=>(
            <button key={s} onClick={()=>scrollTo(s)} className={`pb-1 capitalize transition ${active===s ? 'text-black border-b-2 border-black font-bold' : 'text-[#64748B] hover:text-black'}`}>{s}</button>
          ))}
        </div>
        <a href={contact.waLink("Sky House Tokyo","")} target="_blank" className="bg-[#0F172A] text-white px-5 py-2.5 rounded-full text-sm">Chat WA</a>
      </nav>

      <section id="home" className="relative mx-4 md:mx-12 mt-6 rounded-[24px] overflow-hidden h-[560px] bg-cover bg-center" style={{backgroundImage:"url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop)"}}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        <div className="relative z-10 p-8 md:p-16 max-w-[560px]">
          <h1 className="text-[42px] md:text-[52px] font-bold leading-[0.95]">Find Your<br/>Perfect Apartment<br/><span className="text-[#14B8A6] font-serif italic">Live. Comfortably.</span></h1>
          <p className="mt-4 text-[15px] text-[#475569]">Sewa apartemen Sky House & Tokyo. Nyaman, aman, terpercaya. Check-in 14.00 - Check-out 11.00 WIB.</p>
          <button onClick={()=>scrollTo("apartments")} className="mt-6 bg-[#0F172A] text-white px-6 py-3 rounded-full text-sm">Browse Apartments →</button>
        </div>
        <div className="absolute bottom-6 left-4 right-4 md:left-16 md:right-16 bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-3 flex flex-wrap md:flex-nowrap gap-2 items-center">
          <div className="flex-1 min-w-[140px]"><div className="text-[10px] uppercase text-gray-400">Location</div><select className="w-full text-sm font-medium bg-transparent" value={building} onChange={e=>setBuilding(e.target.value as any)}><option value="all">Semua Gedung</option><option value="sky_house">Sky House</option><option value="tokyo">Tokyo</option></select></div>
          <div className="flex-1 border-l pl-3"><div className="text-[10px] uppercase text-gray-400">Check-in</div><div className="text-sm font-medium">14.00 WIB</div></div>
          <div className="flex-1 border-l pl-3"><div className="text-[10px] uppercase text-gray-400">Price</div><div className="text-sm font-medium">160K - 600K</div></div>
          <button onClick={()=>scrollTo("apartments")} className="bg-[#0F172A] text-white px-6 py-3 rounded-full text-sm ml-auto">Search</button>
        </div>
      </section>

      <section id="apartments" className="px-6 md:px-12 mt-10">
        <h2 className="text-[22px] font-bold mb-6">Featured Apartments - Sky House & Tokyo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((room:any)=>(
            <div key={room.id} className="bg-white rounded-[16px] overflow-hidden border border-gray-100 shadow-sm">
              <div className="relative h-[200px]"><img src={room.photos[0]} alt={room.name} className="w-full h-full object-cover"/><span className={`absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full ${room.popular?'bg-[#14B8A6] text-white':'bg-white'}`}>{room.popular?'POPULAR':'NEW'}</span></div>
              <div className="p-4">
                <div className="font-bold text-[15px]">{room.name}</div>
                <div className="text-[11px] text-gray-500">{room.location}</div>
                <div className="mt-3 flex gap-2">
                  <div className="bg-[#FFF4E0] px-3 py-1.5 rounded-lg text-center"><div className="text-[10px] text-gray-500">{room.weekdayLabel}</div><div className="font-bold text-sm">{room.priceWeekday/1000}K</div></div>
                  <div className="bg-[#E6EEF7] px-3 py-1.5 rounded-lg text-center"><div className="text-[10px] text-gray-500">{room.weekendLabel}</div><div className="font-bold text-sm">{room.priceWeekend/1000}K</div></div>
                  <div className="ml-auto text-right"><div className="text-[10px] text-gray-500">Per bulan</div><div className="font-bold text-[#7A2E1B]">{room.priceMonthlyLabel}</div></div>
                </div>
                <a href={contact.waLink(room.buildingId, room.name)} target="_blank" className="mt-3 block w-full text-center bg-[#0F172A] text-white py-2.5 rounded-full text-sm">Booking via WA</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="amenities" className="px-6 md:px-12 mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0]">
          <h3 className="font-bold text-sm">Apartemen Sky House - Tarif Parkir</h3>
          <div className="mt-4 grid grid-cols-3 text-[13px] gap-y-2"><div className="font-medium text-gray-400 text-[11px] uppercase">Kendaraan</div><div className="text-[11px] uppercase text-gray-400">Per Jam</div><div className="text-[11px] uppercase text-gray-400">24 Jam</div><div>Mobil</div><div>{parking.sky_house.mobil_per_jam}</div><div>{parking.sky_house.mobil_24jam}</div><div>Motor</div><div>{parking.sky_house.motor_per_jam}</div><div>{parking.sky_house.motor_24jam}</div></div>
        </div>
        <div className="bg-[#FFFBEB] rounded-[16px] p-6 border border-[#FDE68A]">
          <h3 className="font-bold text-sm">Apartemen Tokyo - Tarif Parkir</h3>
          <div className="mt-4 grid grid-cols-3 text-[13px] gap-y-2"><div className="font-medium text-gray-400 text-[11px] uppercase">Kendaraan</div><div className="text-[11px] uppercase text-gray-400">Per Jam</div><div className="text-[11px] uppercase text-gray-400">24 Jam</div><div>Mobil</div><div>{parking.tokyo.mobil_per_jam}</div><div>{parking.tokyo.mobil_24jam}</div><div>Motor</div><div>{parking.tokyo.motor_per_jam}</div><div>{parking.tokyo.motor_24jam}</div></div>
        </div>
      </section>

      <section id="contact" className="px-6 md:px-12 mt-8">
        <div className="bg-[#24425F] text-white rounded-[16px] p-4 flex justify-between items-center"><div className="font-bold">Prosedur Waktu Check-in dan Check-out</div><div className="text-[12px] opacity-70">Sewa permalam, tidak perjam</div></div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white border rounded-[12px] overflow-hidden"><img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600" className="h-[160px] w-full object-cover"/><div className="p-4"><div className="text-[10px] uppercase tracking-wide text-gray-400">CHECK-IN</div><div className="font-bold text-[20px]">14.00 siang WIB</div></div></div>
          <div className="bg-white border rounded-[12px] overflow-hidden"><img src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=600" className="h-[160px] w-full object-cover"/><div className="p-4"><div className="text-[10px] uppercase tracking-wide text-gray-400">CHECK-OUT</div><div className="font-bold text-[20px]">11.00 siang WIB</div></div></div>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[12px] overflow-hidden"><img src="https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=600" className="h-[160px] w-full object-cover"/><div className="p-4"><div className="text-[10px] uppercase tracking-wide text-gray-400">KETENTUAN</div><div className="font-bold text-[14px] mt-1">Tidak dapat menambah waktu per jam</div></div></div>
        </div>
        <div className="mt-4 bg-[#FEF2F2] border-l-4 border-[#DC2626] rounded-[12px] p-4 flex gap-3"><div className="font-bold text-[13px]">Kebijakan Khusus Apartemen Tokyo:</div><div className="text-[12px]">Maksimal check-in 22.00 WIB via Lobby Ground.</div></div>

        <div className="mt-8 bg-[#991B1B] text-white rounded-t-[16px] p-4 text-center"><div className="font-bold text-[18px]">Peraturan Menginap - Dilarang Keras</div><div className="text-[11px] opacity-80 mt-1">Harap dibaca sebelum booking • Pelanggaran dikenakan sanksi</div></div>
        <div className="bg-white border-x border-b border-[#E5E7EB] rounded-b-[16px] p-6 md:p-8">
          <p className="text-[13px] text-center text-gray-600 max-w-[600px] mx-auto">Unit kami hanya diperuntukkan untuk menginap dan beristirahat. Dilarang menggunakan unit untuk kegiatan terlarang termasuk:</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {rules.prohibited.map((r:any,i:number)=>{
              const icons = [
                <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="23" y2="14" strokeWidth="2"/><line x1="23" y1="8" x2="17" y2="14" strokeWidth="2"/></svg>,
                <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><line x1="4" y1="4" x2="20" y2="20" strokeWidth="2"/></svg>,
                <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1.5"><path d="M10.5 20.5l-3-3a4.5 4.5 0 0 1 0-6.36l6.36-6.36a4.5 4.5 0 0 1 6.36 0l3 3a4.5 4.5 0 0 1 0 6.36l-6.36 6.36a4.5 4.5 0 0 1-6.36 0z"/><line x1="4" y1="4" x2="20" y2="20" strokeWidth="2"/></svg>,
                <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"/><line x1="4" y1="4" x2="20" y2="20" strokeWidth="2"/></svg>
              ]
              return (
                <div key={i} className="bg-[#FFF5F5] rounded-[12px] p-4 text-center border border-[#FECACA] hover:border-[#991B1B] transition">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white border border-[#FECACA] flex items-center justify-center">{icons[i]}</div>
                  <div className="text-[11px] font-bold mt-3 leading-tight">{r.title}</div>
                </div>
              )
            })}
          </div>
          <div className="bg-[#1F2937] rounded-[12px] p-4 mt-8 flex gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <div className="text-[11px] text-white leading-relaxed">Apabila ditemukan pelanggaran, dapat dikenakan tindakan sesuai peraturan pengelola, tata tertib gedung, dan ketentuan hukum yang berlaku.<span className="font-bold"> Kurungan maksimal 3 bulan dan denda Rp 50.000.000</span></div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F172A] text-white mt-12 p-8 text-xs flex justify-between"><span>© 2024 Sky House & Tokyo</span><span>WA {contact.wa1}</span></footer>
    </div>
  )
}
