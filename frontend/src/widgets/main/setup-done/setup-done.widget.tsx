import { Box, Button, Group, Text } from '@mantine/core'
import { IconCheck, IconPlayerPlay } from '@tabler/icons-react'

import { BRAND, brandUi } from '@shared/constants'
import { useTranslation } from '@shared/hooks'

import classes from './setup-done.module.css'

export const SetupDoneWidget = () => {
    const { currentLang } = useTranslation()
    const ui = brandUi(currentLang)

    return (
        <Box className={classes.done}>
            <Group gap="sm" justify="center" mb={24} wrap="nowrap">
                <span className={classes.mark}>
                    <IconCheck size={17} stroke={2.6} />
                </span>
                <Text className={classes.title}>{ui.setupDone}</Text>
            </Group>

            <Button
                className={classes.videoButton}
                component="a"
                fullWidth
                href={BRAND.links.video}
                leftSection={<IconPlayerPlay size={17} />}
                rel="noopener"
                target="_blank"
                variant="default"
            >
                {ui.videoGuide}
            </Button>
        </Box>
    )
}
