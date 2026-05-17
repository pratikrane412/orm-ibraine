import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cars = [
  { id: 1, tabLabel: "Lift Diff Drop Kit", bgName: "LIFT DIFF DROP KIT", modelSrc: "/model/1.glb" },
  { id: 2, tabLabel: "Front Stabilizer Link", bgName: "FRONT STABILIZER LINK", modelSrc: "/model/8.glb" },
  { id: 3, tabLabel: "Wheel Spacer", bgName: "WHEEL SPACER", modelSrc: "/model/3.glb" },
  { id: 4, tabLabel: "Pan Hard Rod", bgName: "PAN HARD ROD", modelSrc: "/model/4.glb" },
  { id: 5, tabLabel: "Upper Control Arms – Red", bgName: "UPPER CONTROL ARMS", modelSrc: "/model/5.glb" },
  { id: 6, tabLabel: "Upper Control Arms – White", bgName: "UPPER CONTROL ARMS", modelSrc: "/model/6.glb" },
  { id: 7, tabLabel: "Upper Control Arms – Black", bgName: "UPPER CONTROL ARMS", modelSrc: "/model/7.glb" },
];

const OffRoadCollection = () => {
  const [index, setIndex] = useState(4);
  const [orbitAngle, setOrbitAngle] = useState(45);
  const navigate = useNavigate();

  const nextCar = () => setIndex((p) => (p + 1) % cars.length);
  const prevCar = () => setIndex((p) => (p - 1 + cars.length) % cars.length);
  const rotateLeft = () => setOrbitAngle((p) => p - 45);
  const rotateRight = () => setOrbitAngle((p) => p + 45);

  useEffect(() => { setOrbitAngle(45); }, [index]);

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-orm-dark text-white px-[6%] pt-[80px] pb-[60px]">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

      <div className="relative z-[2] text-center mb-[40px]">
        <div className="inline-block px-2.5 py-0.5 bg-white/[0.03] border border-white/10 rounded-full mb-3 backdrop-blur-md">
          <span className="text-orm-gold text-[0.55rem] font-bold tracking-[0.3em] uppercase">Engineering Showcase</span>
        </div>
        <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black leading-[1.1] tracking-tight text-white mb-3">
          Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-orm-gold via-white to-orm-gold">Engineering.</span>
        </h2>
        <p className="text-white/30 text-[0.65rem] tracking-[0.15em] uppercase">Explore components in high-fidelity 3D.</p>
      </div>

      <div className="relative z-[2] flex gap-2 w-full max-w-[1200px] px-4 pb-4 mx-auto mb-8 overflow-x-auto no-scrollbar justify-start lg:justify-center">
        {cars.map((car, i) => (
          <button key={car.id} className={`flex-none px-4 py-2 rounded-full text-[0.55rem] font-bold tracking-[0.05em] uppercase transition-all duration-500 border ${i === index ? "bg-white text-black border-white shadow-md scale-105" : "bg-white/[0.03] border-white/5 text-white/30 hover:text-white"}`} onClick={() => setIndex(i)}>
            {car.tabLabel}
          </button>
        ))}
      </div>

      <div className="relative z-[2] w-full max-w-[1200px] h-[450px] flex items-center justify-center mb-8 max-md:h-[300px]">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black text-white/[0.01] pointer-events-none select-none z-0 tracking-tighter leading-none uppercase">{cars[index].bgName}</h1>

        <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/[0.02] border border-white/5 rounded-full w-10 h-10 flex items-center justify-center text-white/20 transition-all z-10 hover:text-white hover:bg-white/5" onClick={prevCar}><FaChevronLeft size={12} /></button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/[0.02] border border-white/5 rounded-full w-10 h-10 flex items-center justify-center text-white/20 transition-all z-10 hover:text-white hover:bg-white/5" onClick={nextCar}><FaChevronRight size={12} /></button>

        <div className="w-full max-w-[900px] h-full relative z-[5] flex flex-col items-center">
          <model-viewer key={cars[index].id} src={cars[index].modelSrc} camera-controls disable-zoom interaction-prompt="none" camera-orbit={`${orbitAngle}deg 70deg 95%`} field-of-view="25deg" shadow-intensity="2" exposure="1.5" environment-image="neutral" className="w-full h-full bg-transparent" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/5">
             <div className="w-1 h-1 bg-orm-gold rounded-full"></div>
             <span className="text-[0.5rem] font-bold text-white/30 uppercase tracking-[0.2em]">Interactive 360 View</span>
          </div>
        </div>
      </div>

      <div className="relative z-[2] flex flex-col items-center gap-6 w-full">
        <div className="flex gap-3 items-center">
          <button className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/5 text-white/40 flex items-center justify-center transition-all hover:bg-white/5 hover:text-white" onClick={rotateLeft}><FaChevronLeft size={10} /></button>
          <button className="group relative overflow-hidden bg-orm-gold text-black px-10 py-3.5 rounded-full font-black text-[0.6rem] uppercase tracking-[0.1em] transition-all hover:shadow-lg active:scale-95" onClick={() => navigate("/collections/thar")}>
            <span className="relative z-10">Configure Part</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
          <button className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/5 text-white/40 flex items-center justify-center transition-all hover:bg-white/5 hover:text-white" onClick={rotateRight}><FaChevronRight size={10} /></button>
        </div>
      </div>
    </section>
  );
};

export default OffRoadCollection;
