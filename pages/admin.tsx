import { signIn, signOut, useSession } from 'next-auth/react';
import { User } from '../components/testimonial/User';
import { useAdminSettings } from '../hooks/useAdminSettings';
import { useUpdateAdminSettings } from '../hooks/useUpdateAdminSettings';
// import { useTwitchChannels } from '../hooks/useTwitchChannels';
// import { useTwitchCategories } from '../hooks/useTwitchCategories';
import { useEffect, useState } from 'react';

function WatchAdminPage() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="flex flex-col items-center">
                <button
                    type="button"
                    onClick={() => signIn('twitch')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in with Twitch
                </button>
            </div>
        );
    }
    return (
        <>
            <div className="flex justify-center items-center mb-14">
                <User
                    username={session.user.name}
                    avatarUrl={session.user.image}
                    onSignOutClick={signOut}
                />
            </div>
            {!session.user.isAdmin && (
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">
                        You are not authorized to view this page.
                    </h1>
                </div>
            )}
            {session.user.isAdmin && <AdminSettings />}
        </>
    );
}

export default WatchAdminPage;

const AdminSettings: React.FC = () => {
    const { data: adminSettings, isFetched: settingsFetched } =
        useAdminSettings();
    const { mutate: updateAdminSettings, isPending: updateIsPending } =
        useUpdateAdminSettings();

    const [blacklistedChannelIdsString, setBlacklistedChannelIdsString] =
        useState<string>('');
    const [blacklistedCategoryIdsString, setBlackListedCategoryIdsString] =
        useState<string>('');

    useEffect(() => {
        if (adminSettings && settingsFetched) {
            setBlacklistedChannelIdsString(
                adminSettings.blacklistedChannelIds.join(',')
            );
            setBlackListedCategoryIdsString(
                adminSettings.blacklistedStreamCategoryIds?.join(',')
            );
        }
    }, [settingsFetched, adminSettings]);

    // const [channelQuery, setChannelQuery] = useState('');
    // const [categoriesQuery, setCategoriesQuery] = useState('');

    // const { data: channels } = useTwitchChannels(channelQuery);
    // const { data: categories } = useTwitchCategories(categoriesQuery);

    return (
        <div className="px-96">
            <h1 className="text-3xl font-extrabold text-center">Admin</h1>
            {settingsFetched && (
                <>
                    <div className="mt-10">
                        <TextArea
                            label="Blacklisted Channel Ids"
                            value={blacklistedChannelIdsString}
                            onChange={(newValue) =>
                                setBlacklistedChannelIdsString(newValue)
                            }
                        />
                    </div>
                    <div className="mt-10">
                        <TextArea
                            label="Blacklisted Category Names"
                            value={blacklistedCategoryIdsString}
                            onChange={(newValue) =>
                                setBlackListedCategoryIdsString(newValue)
                            }
                        />
                    </div>
                    <div className="text-center mt-10">
                        <button
                            type="button"
                            disabled={updateIsPending}
                            className="rounded-md bg-cyan-500 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 disabled:bg-gray-400 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                            onClick={() =>
                                updateAdminSettings({
                                    blacklistedChannelIds:
                                        blacklistedChannelIdsString
                                            .split(',')
                                            .map((id) => id.trim())
                                            .filter((id) => !!id.length),
                                    blacklistedStreamCategoryIds:
                                        blacklistedCategoryIdsString
                                            .split(',')
                                            .map((id) => id.trim())
                                            .filter((id) => !!id.length),
                                })
                            }
                        >
                            Save
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const TextArea: React.FC<{
    label: string;
    onChange: (newValue: string) => void;
    value?: string;
}> = ({ label, value, onChange }) => {
    return (
        <div>
            <label
                htmlFor="comment"
                className="block font-medium leading-6 text-white"
            >
                {label}
            </label>
            <div className="mt-2">
                <textarea
                    rows={5}
                    placeholder="Enter comma separated list"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-100 shadow-sm ring-1 ring-inset bg-gray-700 ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 outline-none sm:text-sm sm:leading-6"
                    defaultValue={''}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};
