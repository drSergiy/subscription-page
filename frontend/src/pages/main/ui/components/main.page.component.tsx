import { Box, Group, Image, Title } from '@mantine/core'
import { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'

import {
    AccordionBlockRenderer,
    CardsBlockRenderer,
    HelpWidget,
    InstallationGuideConnector,
    MinimalBlockRenderer,
    RawKeysWidget,
    SiteFooterWidget,
    SubscriptionInfoCardsWidget,
    SubscriptionInfoCollapsedWidget,
    SubscriptionInfoExpandedWidget,
    SubscriptionLinkWidget,
    TimelineBlockRenderer
} from '@widgets/main'
import { useAppConfig } from '@entities/app-config-store'
import { BRAND } from '@shared/constants'
import { Page } from '@shared/ui'

import classes from './main.page.module.css'

interface IMainPageComponentProps {
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

const BLOCK_RENDERERS = {
    cards: CardsBlockRenderer,
    timeline: TimelineBlockRenderer,
    accordion: AccordionBlockRenderer,
    minimal: MinimalBlockRenderer
} as const

const SUBSCRIPTION_INFO_BLOCK_RENDERERS = {
    cards: SubscriptionInfoCardsWidget,
    collapsed: SubscriptionInfoCollapsedWidget,
    expanded: SubscriptionInfoExpandedWidget,
    hidden: null
} as const

export const MainPageComponent = ({ isMobile, platform }: IMainPageComponentProps) => {
    const config = useAppConfig()

    const brandName = config.brandingSettings.title

    const hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean> = {
        ios: Boolean(config.platforms.ios?.apps.length),
        android: Boolean(config.platforms.android?.apps.length),
        linux: Boolean(config.platforms.linux?.apps.length),
        macos: Boolean(config.platforms.macos?.apps.length),
        windows: Boolean(config.platforms.windows?.apps.length),
        androidTV: Boolean(config.platforms.androidTV?.apps.length),
        appleTV: Boolean(config.platforms.appleTV?.apps.length)
    }

    const atLeastOnePlatformApp = Object.values(hasPlatformApps).some((value) => value)

    const SubscriptionInfoBlockRenderer =
        SUBSCRIPTION_INFO_BLOCK_RENDERERS[config.uiConfig.subscriptionInfoBlockType]

    return (
        <Page>
            <Box className="tv-sheet">
                <Box className="header-wrapper">
                    <Group gap="sm" justify="space-between" px={16} py={14} wrap="nowrap">
                        <Group gap={10} style={{ minWidth: 0, userSelect: 'none' }} wrap="nowrap">
                            <Image alt="" className={classes.logo} src={BRAND.logoSrc} />
                            <Title className={classes.brand} order={4}>
                                {brandName}
                            </Title>
                        </Group>

                        <SubscriptionLinkWidget
                            hideGetLink={config.baseSettings.hideGetLinkButton}
                            supportUrl={BRAND.links.support}
                        />
                    </Group>
                </Box>

                {SubscriptionInfoBlockRenderer && (
                    <SubscriptionInfoBlockRenderer isMobile={isMobile} />
                )}

                {atLeastOnePlatformApp && (
                    <InstallationGuideConnector
                        BlockRenderer={BLOCK_RENDERERS[config.uiConfig.installationGuidesBlockType]}
                        hasPlatformApps={hasPlatformApps}
                        isMobile={isMobile}
                        platform={platform}
                    />
                )}

                <RawKeysWidget isMobile={isMobile} />

                <HelpWidget />

                <SiteFooterWidget />
            </Box>
        </Page>
    )
}
