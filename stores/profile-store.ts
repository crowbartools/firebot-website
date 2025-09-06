import { makeAutoObservable, reaction, toJS } from 'mobx';
import moment from 'moment';
import { ChannelInfo, ProfileData, StreamVariant } from '../types/profile';
import getMappedRoles, {
    getChannelInfo,
    getProfileDataFromByteBin,
    getProfileDataFromCrowbar,
} from '../utils/profile';

class ProfileStore {
    profileData: ProfileData = null;
    channelInfo: ChannelInfo = null;
    isLoading = true;
    unableToLoad = false;
    showStream = true;
    streamInFront = false;
    activeTabIndex = 0;

    streamVariant: StreamVariant = 'hide';

    quotesPagination = {
        currentPage: 1,
        pageSize: 25,
    };

    commandsPagination = {
        currentPage: 1,
        pageSize: 25,
    };

    selectedCommandSortTag: this['profileData']['sortTags'][0] | null = null;

    commandQuery = '';
    variableQuery = '';
    quoteQuery = '';

    commandSortTags: ProfileData['sortTags'] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        reaction(
            () => this.quoteQuery,
            () => {
                this.quotesPagination.currentPage = 1;
            }
        );

        reaction(
            () => this.commandQuery,
            () => {
                this.commandsPagination.currentPage = 1;
            }
        );
    }

    setCommandQuery(query: string) {
        this.commandQuery = query;
    }

    setQuoteQuery(query: string) {
        this.quoteQuery = query;
    }

    setVariableQuery(query: string) {
        this.variableQuery = query;
    }

    setSelectedCommandSortTag(sortTag: this['selectedCommandSortTag']) {
        if (sortTag.id === 'allCommands') {
            this.selectedCommandSortTag = null;
        } else {
            this.selectedCommandSortTag = sortTag;
        }
        this.setCurrentCommandsPage(1);
    }

    get filteredCommands() {
        return (
            this.profileData?.commands.allowedCmds.filter((c) => {
                if (
                    this.selectedCommandSortTag &&
                    !c.sortTags?.includes(this.selectedCommandSortTag.id)
                ) {
                    return false;
                }
                return c.trigger
                    .toLowerCase()
                    .includes(this.commandQuery.toLowerCase());
            }) ?? []
        );
    }

    get currentCommands() {
        const offset =
            (this.commandsPagination.currentPage - 1) *
            this.commandsPagination.pageSize;
        return this.filteredCommands.slice(
            offset,
            offset + this.commandsPagination.pageSize
        );
    }

    get filteredVariables() {
        const normalizedQuery = this.variableQuery
            .trim()
            .toLowerCase()
            .replace('$', '');
        return [...this.profileData.variables]
            .sort((a, b) => {
                if (a.handle < b.handle) {
                    return -1;
                }
                if (a.handle > b.handle) {
                    return 1;
                }
                return 0;
            })
            .filter(
                (v) =>
                    v.handle.toLowerCase().includes(normalizedQuery) ||
                    v.description.toLowerCase().includes(normalizedQuery)
            );
    }

    get filteredQuotes() {
        const normalizedQuery = this.quoteQuery.trim().toLowerCase();
        const queryIsNum = /^\d+$/.test(normalizedQuery);
        return (
            this.profileData?.quotes.quotes.filter((c) =>
                queryIsNum
                    ? c.text?.toLowerCase().includes(normalizedQuery) ||
                      c._id?.toString() === normalizedQuery
                    : c.text?.toLowerCase().includes(normalizedQuery) ||
                      c.originator?.toLowerCase().includes(normalizedQuery) ||
                      c.game?.toLowerCase().includes(normalizedQuery) ||
                      moment(c.createdAt)
                          .format('M/D/YYYY')
                          .includes(normalizedQuery)
            ) ?? []
        );
    }

    get currentQuotes() {
        const offset =
            (this.quotesPagination.currentPage - 1) *
            this.quotesPagination.pageSize;
        return this.filteredQuotes.slice(
            offset,
            offset + this.quotesPagination.pageSize
        );
    }

    setActiveTabIndex(index: number) {
        this.activeTabIndex = index;
    }

    setCurrentCommandsPage(page: number) {
        this.commandsPagination.currentPage = page;
    }

    setCurrentQuotesPage(page: number) {
        this.quotesPagination.currentPage = page;
    }

    toggleShowStream() {
        this.showStream = !this.showStream;
        this.setStreamVariant(this.showStream ? 'subsequentShow' : 'hide');
    }

    setStreamInFront(inFront: boolean) {
        this.streamInFront = inFront;
        window.scrollTo({
            top: 0,
        });
        this.setStreamVariant(this.streamInFront ? 'front' : 'subsequentShow');
    }

    setStreamVariant(variant: StreamVariant) {
        this.streamVariant = variant;
    }

    setProfileData(profileData: ProfileData) {
        if (profileData == null) {
            return;
        }
        this.profileData = profileData;
        this.profileData.quotes.quotes = toJS(
            this.profileData.quotes.quotes
        ).reverse();
        this.profileData.commands.allowedCmds.map((c) => {
            const permissionsRestriction =
                c.restrictionData?.restrictions?.find(
                    (r) => r.type === 'firebot:permissions'
                );
            if (permissionsRestriction?.roleIds?.length > 0) {
                c.permissions = {
                    roles: getMappedRoles(permissionsRestriction.roleIds),
                };
            }
            if (c.subCommands?.length > 0) {
                c.subCommands = c.subCommands?.filter((f) => f.active);
                if (c.fallbackSubcommand) {
                    c.subCommands.push(c.fallbackSubcommand);
                }
                c.subCommands?.map((sc) => {
                    const scPermRestriction =
                        sc.restrictionData?.restrictions?.find(
                            (r) => r.type === 'firebot:permissions'
                        );
                    if (scPermRestriction?.roleIds?.length > 0) {
                        sc.permissions = {
                            roles: getMappedRoles(scPermRestriction.roleIds),
                        };
                    }
                    return sc;
                });
            }
            return c;
        });

        this.commandSortTags =
            this.profileData.sortTags?.filter((st) =>
                this.profileData.commands.allowedCmds.some((c) =>
                    c.sortTags?.includes(st.id)
                )
            ) ?? [];

        if (this.profileData.profilePage === 'quotes') {
            this.activeTabIndex = 1;
        }
    }

    setChannelInfo(channelInfo: ChannelInfo) {
        this.channelInfo = channelInfo;
    }

    getProfileData(channelName?: string, binId?: string) {
        this.isLoading = true;
        this.unableToLoad = false;

        if (!channelName && !binId) {
            this.isLoading = false;
            this.unableToLoad = true;
            return;
        }

        if (binId) {
            getProfileDataFromByteBin(binId).then((profileData) => {
                this.setProfileData(profileData);
                if (!profileData) {
                    this.unableToLoad = true;
                    this.isLoading = false;
                    return;
                }
                getChannelInfo(profileData.owner).then((channelInfo) => {
                    this.setChannelInfo(channelInfo);
                    if (channelInfo.isLive) {
                        this.setStreamVariant('firstShow');
                    }
                    this.isLoading = false;
                });
            });
        } else if (channelName) {
            Promise.all([
                getChannelInfo(channelName),
                getProfileDataFromCrowbar(channelName),
            ]).then(([channelInfo, profileData]) => {
                if (!channelInfo) {
                    this.unableToLoad = true;
                    this.isLoading = false;
                    return;
                }

                this.setChannelInfo(channelInfo);

                if (channelInfo.isLive) {
                    this.setStreamVariant('firstShow');
                }

                this.setProfileData(profileData);

                this.isLoading = false;
            });
        }
    }
}

export const profileStore = new ProfileStore();
