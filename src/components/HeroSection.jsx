import React from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-container">

                <div className="hero-left">
                    <h1 className="hero-title">
                        How We Turn Thar Into a <span>Trail Beast</span>
                    </h1>

                    <p className="hero-text">
                        At Off-Road Mutants (ORM), we believe the Mahindra Thar already
                        holds raw off-road DNA — and our ORM 2” Lift Kit unlocks its true
                        mutant potential. This upgrade goes beyond height — it’s a
                        transformation of stance, control, and confidence.
                    </p>

                    <p className="hero-text">
                        At Off-Road Mutants (ORM), we believe every vehicle has the
                        potential to become a true off-road powerhouse. Our modification
                        process goes far beyond adding accessories. Built with precision
                        engineering and forged for endurance, the ORM 2” Lift Kit gives your
                        Thar the perfect elevation to dominate rocks, mud, and rugged
                        trails.
                    </p>

                    <p className="hero-text">
                        It improves ground clearance, suspension geometry, and off-road
                        capability — without compromising stability or handling.
                    </p>

                    <button className="hero-btn">Shop Now →</button>
                </div>

                <div className="hero-right">
                    <div className="model-circle">
                        <model-viewer
                            src="/model/orm-model.glb"
                            alt="Thar ORM Leveling Kit 3D Model"
                            auto-rotate
                            camera-controls
                            disable-zoom
                            rotation-per-second="18deg"
                            exposure="1"
                            shadow-intensity="1"
                            interaction-prompt="none"
                        ></model-viewer>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
