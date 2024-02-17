import { signIn, signOut, useSession } from 'next-auth/react';
import { User } from '../components/testimonial/User';
import { useAdminSettings } from '../hooks/useAdminSettings';
import { useUpdateAdminSettings } from '../hooks/useUpdateAdminSettings';
// import { useTwitchChannels } from '../hooks/useTwitchChannels';
// import { useTwitchCategories } from '../hooks/useTwitchCategories';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from '../components/toasts';

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

    const [blacklistedStreamTagsString, setBlacklistedStreamTagsString] =
        useState<string>('');

    useEffect(() => {
        if (adminSettings && settingsFetched) {
            setBlacklistedChannelIdsString(
                adminSettings.blacklistedChannelIds.join('\n')
            );
            setBlackListedCategoryIdsString(
                adminSettings.blacklistedStreamCategoryIds?.join('\n')
            );
            setBlacklistedStreamTagsString(
                adminSettings.blacklistedTags?.join('\n')
            );
        }
    }, [settingsFetched, adminSettings]);

    const { addToast } = useToasts();

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
                            label="Channel Id Blacklist"
                            value={blacklistedChannelIdsString}
                            onChange={(newValue) =>
                                setBlacklistedChannelIdsString(newValue)
                            }
                        />
                    </div>
                    <div className="mt-10">
                        <TextArea
                            label="Category Name Blacklist"
                            value={blacklistedCategoryIdsString}
                            onChange={(newValue) =>
                                setBlackListedCategoryIdsString(newValue)
                            }
                        />
                    </div>
                    <div className="mt-10">
                        <TextArea
                            label="Stream Tag Blacklist"
                            value={blacklistedStreamTagsString}
                            onChange={(newValue) =>
                                setBlacklistedStreamTagsString(newValue)
                            }
                        />
                    </div>
                    <div className="text-center mt-10 pb-10">
                        <button
                            type="button"
                            disabled={updateIsPending}
                            className={clsx(
                                'rounded-md px-10 py-2.5 text-sm font-semibold text-white shadow-sm',
                                ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500',
                                updateIsPending
                                    ? 'bg-gray-400 cursor-not-allowed pr-4'
                                    : 'bg-cyan-500 hover:bg-cyan-400'
                            )}
                            onClick={() =>
                                updateAdminSettings(
                                    {
                                        blacklistedChannelIds:
                                            blacklistedChannelIdsString
                                                .split('\n')
                                                .map((id) => id.trim())
                                                .filter((id) => !!id.length),
                                        blacklistedStreamCategoryIds:
                                            blacklistedCategoryIdsString
                                                .split('\n')
                                                .map((id) => id.trim())
                                                .filter((id) => !!id.length),
                                        blacklistedTags:
                                            blacklistedStreamTagsString
                                                .split('\n')
                                                .map((tag) => tag.trim())
                                                .filter((tag) => !!tag.length),
                                    },
                                    {
                                        onSuccess: () => {
                                            addToast('Settings saved!', {
                                                appearance: 'success',
                                                autoDismiss: true,
                                                autoDismissTimeout: 3000,
                                            });
                                        },
                                    }
                                )
                            }
                        >
                            Save
                            {updateIsPending && (
                                <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    spin
                                    className="ml-2"
                                />
                            )}
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
                    rows={6}
                    placeholder="Enter new-line separated list"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-100 shadow-sm ring-1 ring-inset bg-gray-700 ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 outline-none sm:text-sm sm:leading-6"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};
