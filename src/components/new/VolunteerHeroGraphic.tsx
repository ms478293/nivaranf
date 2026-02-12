"use client";

export const VolunteerHeroGraphic = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-10 right-10 h-40 w-40 rounded-3xl bg-gradient-to-br from-primary-200 via-primary-400 to-primary-600 opacity-70 shadow-2xl" style={{ transform: "rotateX(30deg) rotateY(-20deg) rotateZ(15deg)", animation: "floatOne 8s ease-in-out infinite" }} />
      <div className="absolute top-28 right-36 h-24 w-24 rounded-2xl bg-gradient-to-br from-secondary-200 via-secondary-400 to-secondary-600 opacity-70 shadow-2xl" style={{ transform: "rotateX(-20deg) rotateY(25deg) rotateZ(-10deg)", animation: "floatTwo 10s ease-in-out infinite" }} />
      <div className="absolute -bottom-6 left-6 h-32 w-32 rounded-3xl bg-gradient-to-br from-forest-200 via-forest-400 to-forest-600 opacity-70 shadow-2xl" style={{ transform: "rotateX(25deg) rotateY(10deg) rotateZ(-12deg)", animation: "floatThree 9s ease-in-out infinite" }} />
      <div className="absolute bottom-8 left-40 h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 opacity-70 shadow-2xl" style={{ transform: "rotateX(-15deg) rotateY(30deg) rotateZ(8deg)", animation: "floatTwo 11s ease-in-out infinite" }} />
      <style jsx>{`
        @keyframes floatOne {
          0% { transform: translateY(0) rotateX(30deg) rotateY(-20deg) rotateZ(15deg); }
          50% { transform: translateY(-18px) rotateX(35deg) rotateY(-10deg) rotateZ(18deg); }
          100% { transform: translateY(0) rotateX(30deg) rotateY(-20deg) rotateZ(15deg); }
        }
        @keyframes floatTwo {
          0% { transform: translateY(0) rotateX(-20deg) rotateY(25deg) rotateZ(-10deg); }
          50% { transform: translateY(14px) rotateX(-10deg) rotateY(30deg) rotateZ(-6deg); }
          100% { transform: translateY(0) rotateX(-20deg) rotateY(25deg) rotateZ(-10deg); }
        }
        @keyframes floatThree {
          0% { transform: translateY(0) rotateX(25deg) rotateY(10deg) rotateZ(-12deg); }
          50% { transform: translateY(-12px) rotateX(30deg) rotateY(18deg) rotateZ(-6deg); }
          100% { transform: translateY(0) rotateX(25deg) rotateY(10deg) rotateZ(-12deg); }
        }
      `}</style>
    </div>
  );
};
