export const User: React.FC<{
    username: string;
    avatarUrl: string;
    onSignOutClick: () => void;
}> = ({ username, avatarUrl, onSignOutClick }) => {
    return (
        <div className="flex-shrink-0 block">
            <div className="flex items-center">
                <div>
                    <img
                        className="inline-block h-20 w-20 rounded-full"
                        src={avatarUrl}
                        alt=""
                    />
                </div>
                <div className="ml-3">
                    <p className="text-base font-medium text-white">
                        {username}
                    </p>
                    <a
                        className="text-sm font-medium text-blue-400 hover:text-blue-600 cursor-pointer"
                        onClick={() => onSignOutClick()}
                    >
                        Sign Out
                    </a>
                </div>
            </div>
        </div>
    );
};
