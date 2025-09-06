import React from 'react';
import Profile from '../../components/profile/Profile';

export default function ProfileByBinIdPage() {
    let binId: string = null;

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);

        binId = urlParams.get('id');
    }

    return <Profile binId={binId} />;
}
