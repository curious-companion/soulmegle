import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import '../styles/ParticlesBackground.css';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (main) => {
    await loadSlim(main);
  }, []);

  return (
    <div className="particles-background">

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: "#000", // Set background color
          },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 5, random: true },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              outModes: { default: "out" },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
