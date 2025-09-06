import React from 'react';
import Profile from '../../components/profile/Profile';
import { useRouter } from 'next/router';

export default function ProfileByName() {
    const router = useRouter();

    const { channelName } = router.query;

    if (channelName == null) {
        return null;
    }

    return (
        <Profile
            channelName={!Array.isArray(channelName) ? channelName : undefined}
        />
    );
}
