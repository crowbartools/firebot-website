import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ScrollAnchor } from '../components';
import FeatureShowcaseSection from '../components/home/FeatureShowcaseSection';
import FAQSection from '../components/home/FAQSection';
import HelpSection from '../components/home/HelpSection';
import AllFeaturesSection from '../components/home/AllFeaturesSection';
import TeamSection from '../components/home/TeamSection';
import { TestimonialsSection } from '../components/home/testimonials/TestimonialsSection';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getUsers } from '../backend/twitch-api';
import { people } from '../constants/people';
import { testimonials } from '../constants/testimonials';

import NodeCache from 'node-cache';
import { TwitchUser } from '../types/twitch';

const cache = new NodeCache({ checkperiod: 10, stdTTL: 300 });

type HomeData = {
    contributorUsers: Record<string, TwitchUser>;
    testimonialUsers: Record<string, TwitchUser>;
};

export const getServerSideProps: GetServerSideProps<HomeData> = async () => {
    let props: HomeData = cache.get<HomeData>('homeData');

    if (props == null) {
        const contributorUsers = await getUsers(
            people.map((p) => p.id),
            false
        );
        const testimonialUsers = await getUsers(
            testimonials.map((t) => t.userId),
            true
        );

        props = {
            contributorUsers,
            testimonialUsers,
        };

        cache.set<HomeData>('homeData', props);
    }

    return {
        props,
    };
};

function Home({
    contributorUsers,
    testimonialUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="mb-12 overflow-x-hidden">
            <HeroSection />
            <div id="features-section">
                <ScrollAnchor anchorId="features" />
                <FeatureShowcaseSection />
                <AllFeaturesSection />
            </div>
            <div id="testimonial-section">
                <ScrollAnchor anchorId="testimonials" />
                <TestimonialsSection userData={testimonialUsers} />
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
                <TeamSection userData={contributorUsers} />
            </div>
        </div>
    );
}

export default Home;
