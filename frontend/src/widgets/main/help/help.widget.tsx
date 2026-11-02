import { Accordion, Box, Button, Text, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconBrandTelegram, IconCopy } from '@tabler/icons-react'
import { useClipboard } from '@mantine/hooks'

import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { useSubscription } from '@entities/subscription-info-store'
import { BRAND, brandFaq, brandUi } from '@shared/constants'
import { useTranslation } from '@shared/hooks'

import classes from './help.module.css'

export const HelpWidget = () => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const ui = brandUi(currentLang)
    const faq = brandFaq(currentLang)

    const { copy } = useClipboard({ timeout: 2_000 })
    const subscription = useSubscription()

    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    const handleCopy = () => {
        copy(subscriptionUrl)
        notifications.show({
            title: t(baseTranslations.linkCopied),
            message: t(baseTranslations.linkCopiedToClipboard),
            color: 'red'
        })
    }

    return (
        <Box className="tv-section">
            <Title className={classes.sectionTitle} order={2}>
                {ui.helpHeader}
            </Title>

            <Accordion
                chevronPosition="right"
                classNames={{
                    item: classes.item,
                    control: classes.control,
                    label: classes.label,
                    content: classes.content,
                    chevron: classes.chevron
                }}
                variant="unstyled"
            >
                {faq.map((entry, index) => (
                    <Accordion.Item key={index} value={`q${index}`}>
                        <Accordion.Control>{entry.q}</Accordion.Control>
                        <Accordion.Panel>
                            <Text className={classes.answer} size="sm">
                                {entry.a}
                            </Text>

                            {'withCopyButton' in entry && entry.withCopyButton && (
                                <Button
                                    className={classes.copyButton}
                                    fullWidth
                                    leftSection={<IconCopy size={17} />}
                                    mt={14}
                                    onClick={handleCopy}
                                    variant="default"
                                >
                                    {ui.copySubscription}
                                </Button>
                            )}
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Button
                className={classes.supportButton}
                component="a"
                fullWidth
                href={BRAND.links.support}
                leftSection={<IconBrandTelegram size={17} />}
                mt={18}
                rel="noopener"
                target="_blank"
            >
                {ui.writeSupport}
            </Button>
        </Box>
    )
}
