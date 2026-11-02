import {
    TSubscriptionPageAppConfig,
    TSubscriptionPageButtonConfig,
    TSubscriptionPagePlatformKey
} from '@remnawave/subscription-page-types'
import { Box, Button, ButtonVariant, NativeSelect, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useClipboard } from '@mantine/hooks'
import { useState } from 'react'
import clsx from 'clsx'

import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { useSubscription } from '@entities/subscription-info-store'
import { getIconFromLibrary } from '@shared/utils/config-parser'
import { TemplateEngine } from '@shared/utils/template-engine'
import { useAppConfig } from '@entities/app-config-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'
import { brandUi } from '@shared/constants'

import { SetupDoneWidget } from '../setup-done'

import { IBlockRendererProps } from './components/blocks/renderer-block.interface'
import classes from './installation-guide.module.css'

export type TBlockVariant = 'accordion' | 'cards' | 'minimal' | 'timeline'

interface IProps {
    BlockRenderer: React.ComponentType<IBlockRendererProps>
    hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean>
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

export const InstallationGuideConnector = (props: IProps) => {
    const { isMobile, hasPlatformApps, BlockRenderer, platform } = props

    const { t, currentLang, baseTranslations } = useTranslation()
    const ui = brandUi(currentLang)

    const { platforms, svgLibrary } = useAppConfig()
    const { copy } = useClipboard({ timeout: 2_000 })
    const subscription = useSubscription()

    const [selectedAppIndex, setSelectedAppIndex] = useState(0)
    const [selectedPlatform, setSelectedPlatform] = useState<TSubscriptionPagePlatformKey>(() => {
        if (platform && hasPlatformApps[platform]) {
            return platform
        }

        const firstAvailable = (
            Object.keys(hasPlatformApps) as TSubscriptionPagePlatformKey[]
        ).find((key) => hasPlatformApps[key])
        return firstAvailable!
    })

    const platformApps = platforms[selectedPlatform]!.apps
    const selectedApp = platformApps[selectedAppIndex] ?? platformApps[0]

    const availablePlatforms = (
        Object.entries(hasPlatformApps) as [TSubscriptionPagePlatformKey, boolean][]
    )
        .filter(([_, hasApps]) => hasApps)
        .map(([platform]) => {
            const platformConfig = platforms[platform]!
            return {
                value: platform,
                label: t(platformConfig.displayName),
                icon: getIconFromLibrary(platformConfig.svgIconKey, svgLibrary)
            }
        })

    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    const handleButtonClick = (button: TSubscriptionPageButtonConfig) => {
        let formattedUrl: string | undefined

        if (button.type === 'subscriptionLink' || button.type === 'copyButton') {
            formattedUrl = TemplateEngine.formatWithMetaInfo(button.link, {
                username: subscription.user.username,
                subscriptionUrl
            })
        }

        switch (button.type) {
            case 'copyButton': {
                if (!formattedUrl) return

                copy(formattedUrl)
                notifications.show({
                    title: t(baseTranslations.linkCopied),
                    message: t(baseTranslations.linkCopiedToClipboard),
                    color: 'red'
                })
                break
            }
            case 'external': {
                window.open(button.link, '_blank')
                break
            }
            case 'subscriptionLink': {
                if (!formattedUrl) return

                window.open(formattedUrl, '_blank')
                break
            }
            default:
                break
        }
    }

    /**
     * Кнопки шага. Красной делается только добавление подписки —
     * это единственное действие, ради которого человек сюда пришёл.
     */
    const renderBlockButtons = (
        buttons: TSubscriptionPageButtonConfig[],
        _variant: ButtonVariant
    ) => {
        if (buttons.length === 0) return null

        return (
            <Stack gap={8}>
                {buttons.map((button, index) => {
                    const isPrimary = button.type === 'subscriptionLink'

                    return (
                        <Button
                            className={clsx(
                                classes.stepButton,
                                isPrimary ? classes.stepButtonKey : index === 0 && classes.stepButtonSolid
                            )}
                            fullWidth
                            key={index}
                            leftSection={
                                <span
                                    className={classes.btnIcon}
                                    dangerouslySetInnerHTML={{
                                        __html: getIconFromLibrary(button.svgIconKey, svgLibrary)
                                    }}
                                />
                            }
                            onClick={() => handleButtonClick(button)}
                            variant="default"
                        >
                            {t(button.text)}
                        </Button>
                    )
                })}
            </Stack>
        )
    }

    const getIcon = (iconKey: string) => getIconFromLibrary(iconKey, svgLibrary)

    return (
        <Box className="tv-section">
            <Title className={classes.sectionTitle} order={2}>
                {t(baseTranslations.installationGuideHeader)}
            </Title>

            {availablePlatforms.length > 1 && (
                <>
                    <Text className="tv-label">{ui.pickDevice}</Text>
                    <NativeSelect
                        classNames={{ input: classes.deviceSelect }}
                        data={availablePlatforms.map((opt) => ({
                            value: opt.value,
                            label: opt.label
                        }))}
                        mb={18}
                        onChange={(event) => {
                            vibrate([80])
                            const value = event.target.value as unknown as TSubscriptionPagePlatformKey
                            setSelectedPlatform(value)
                            setSelectedAppIndex(0)
                        }}
                        size="md"
                        value={selectedPlatform}
                    />
                </>
            )}

            {platformApps.length > 0 && (
                <Box>
                    {platformApps.length > 1 && (
                        <Text className="tv-label">{ui.pickApp}</Text>
                    )}

                    <div className={classes.appsGrid} role="tablist">
                        {platformApps.map((app: TSubscriptionPageAppConfig, index: number) => {
                            const isActive = index === selectedAppIndex

                            return (
                                <UnstyledButton
                                    aria-selected={isActive}
                                    className={clsx(
                                        classes.appButton,
                                        isActive && classes.appButtonActive
                                    )}
                                    key={app.name}
                                    onClick={() => {
                                        vibrate('toggle')
                                        setSelectedAppIndex(index)
                                    }}
                                    role="tab"
                                >
                                    {app.featured && <span className={classes.featuredBadge} />}
                                    <span className={classes.appName}>{app.name}</span>
                                </UnstyledButton>
                            )
                        })}
                    </div>

                    {selectedApp && (
                        <>
                            <BlockRenderer
                                blocks={selectedApp.blocks}
                                currentLang={currentLang}
                                getIconFromLibrary={getIcon}
                                isMobile={isMobile}
                                renderBlockButtons={renderBlockButtons}
                                svgLibrary={svgLibrary}
                            />
                            <SetupDoneWidget />
                        </>
                    )}
                </Box>
            )}
        </Box>
    )
}
