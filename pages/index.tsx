import React from 'react';
import HeroSection from '../components/HeroSection';
import { ScrollAnchor } from '../components';
import FeatureShowcaseSection from '../components/FeatureShowcaseSection';
import FAQSection from '../components/FAQSection';
import HelpSection from '../components/HelpSection';
import AllFeaturesSection from '../components/AllFeaturesSection';
import TeamSection from '../components/TeamSection';

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
