import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const Dev = () => {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center">
        <h1 className="text-2x font-bold text-center">Dev</h1>
        <div className="mt-5 w-full flex flex-col justify-center bg-slate-200 px-4 py-6 rounded-lg">
          {/* write code here */}
          <TypeAnimation
            sequence={[
              "Hafidh Ahmad Fauzan adalah seorang mahasiswa D4 Manajemen Informatika dan anggota dari Tim Development AZALE.AI ",
              "Muhammad Aziiz Pranaja adalah seorang mahasiswa D4 Manajemen Informatika dan anggota dari Tim Development AZALE.AI ",
            ]}
            wrapper="span"
            speed={30}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={0}
          />
        </div>
      </div>
    </div>
  );
};

export default Dev;
