import { Box, Collapse, Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useState } from 'react'

import {
    formatDate,
    getExpirationTextUtil,
    getLocalizedText
} from '@shared/utils/config-parser'
import { useSubscription } from '@entities/subscription-info-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'

import classes from './subscription-slab.module.css'

interface IProps {
    isMobile: boolean
}

export const SubscriptionInfoCollapsedWidget = ({ isMobile }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    const [isExpanded, setIsExpanded] = useState(false)

    const { user } = subscription

    const isActive = user.userStatus === 'ACTIVE'
    const isWarning = isActive && user.daysLeft > 0 && user.daysLeft <= 3

    const dotClass = !isActive
        ? classes.dotDead
        : isWarning
          ? classes.dotWarn
          : classes.dotLive

    const statusText = isActive
        ? getLocalizedText(baseTranslations.active, currentLang)
        : getLocalizedText(baseTranslations.inactive, currentLang)

    const rows = [
        { k: t(baseTranslations.status), v: statusText },
        {
            k: t(baseTranslations.bandwidth),
            v: `${user.trafficUsed} / ${user.trafficLimit === '0' ? '∞' : user.trafficLimit}`
        },
        { k: t(baseTranslations.expires), v: formatDate(user.expiresAt, currentLang, baseTranslations) }
    ]

    return (
        <Box className={classes.slab}>
            <UnstyledButton
                aria-expanded={isExpanded}
                className={classes.head}
                onClick={() => {
                    vibrate('tap')
                    setIsExpanded(!isExpanded)
                }}
            >
                <Group align="flex-start" gap="sm" justify="space-between" wrap="nowrap">
                    <Stack gap={6} style={{ minWidth: 0, flex: 1 }}>
                        <Text className={classes.who} size={isMobile ? 'md' : 'lg'}>
                            {user.username}
                        </Text>
                        <Group gap={7} wrap="nowrap">
                            <span className={dotClass} />
                            <Text className={classes.state} size="xs">
                                {statusText} ·{' '}
                                {getExpirationTextUtil(
                                    user.expiresAt,
                                    currentLang,
                                    baseTranslations
                                )}
                            </Text>
                        </Group>
                    </Stack>

                    <IconChevronDown
                        className={classes.chevron}
                        data-open={isExpanded || undefined}
                        size={20}
                    />
                </Group>
            </UnstyledButton>

            <Collapse expanded={isExpanded} keepMounted>
                <Box className={classes.more}>
                    {rows.map((row) => (
                        <Group className={classes.row} gap="md" justify="space-between" key={row.k}>
                            <Text className={classes.rowKey} size="sm">
                                {row.k}
                            </Text>
                            <Text className={classes.rowVal} size="sm">
                                {row.v}
                            </Text>
                        </Group>
                    ))}
                </Box>
            </Collapse>
        </Box>
    )
}
