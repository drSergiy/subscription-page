import { Box, Button, Group, Image, Text } from '@mantine/core'
import { IconBrandTelegram } from '@tabler/icons-react'

import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'
import { LanguagePicker } from '@shared/ui/language-picker/language-picker.shared'
import { BRAND, brandUi } from '@shared/constants'

import classes from './site-footer.module.css'

export const SiteFooterWidget = () => {
    const config = useAppConfig()
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()
    const ui = brandUi(currentLang)

    const year = new Date().getFullYear()

    return (
        <Box className={classes.footer} component="footer">
            <Group gap={8} grow mb={20} wrap="nowrap">
                <Button
                    className={classes.linkSolid}
                    component="a"
                    href={BRAND.links.channel}
                    leftSection={<IconBrandTelegram size={17} />}
                    rel="noopener"
                    target="_blank"
                >
                    {ui.channel}
                </Button>
                <Button
                    className={classes.linkOutline}
                    component="a"
                    href={BRAND.links.bot}
                    leftSection={<IconBrandTelegram size={17} />}
                    rel="noopener"
                    target="_blank"
                    variant="default"
                >
                    {ui.bot}
                </Button>
            </Group>

            <Group gap={9} mb={10} wrap="nowrap">
                <Image alt="" className={classes.mark} src={BRAND.logoSrc} />
                <Text className={classes.brandName}>{config.brandingSettings.title}</Text>
            </Group>

            <Text className={classes.note}>{BRAND.footerText}</Text>
            <Text className={classes.note}>
                © {year} {config.brandingSettings.title}
            </Text>

            <Box mt={18}>
                <LanguagePicker
                    currentLang={currentLang}
                    locales={config.locales}
                    onLanguageChange={setLanguage}
                />
            </Box>
        </Box>
    )
}
