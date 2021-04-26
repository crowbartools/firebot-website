import React from 'react';
import HeroSection from '../components/home/HeroSection';
import { ScrollAnchor } from '../components';
import FeatureShowcaseSection from '../components/home/FeatureShowcaseSection';
import FAQSection from '../components/home/FAQSection';
import HelpSection from '../components/home/HelpSection';
import AllFeaturesSection from '../components/home/AllFeaturesSection';
import TeamSection from '../components/home/TeamSection';

export const Home: React.FC = () => {
    return (
        <div className="mb-12">
            <HeroSection />
            <div id="features-section">
                <ScrollAnchor anchorId="features" />
                <FeatureShowcaseSection />
                <AllFeaturesSection />
            </div>
            <div id="faq-section">
                <ScrollAnchor anchorId="faq" />
                <FAQSection />
            </div>
            <div id="help-section">
                <ScrollAnchor anchorId="help" />
                <HelpSection />
            </div>
            <div id="team-section">
                <ScrollAnchor anchorId="team" />
                <TeamSection />
            </div>
        </div>
    );
};

export default Home;
