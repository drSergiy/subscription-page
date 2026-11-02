import { Stack, Text, Timeline } from '@mantine/core'
import clsx from 'clsx'

import { getLocalizedText } from '@shared/utils/config-parser'

import { IBlockRendererProps } from '../renderer-block.interface'
import classes from './timeline-block.module.css'

export const TimelineBlockRenderer = ({
    blocks,
    isMobile,
    currentLang,
    renderBlockButtons
}: IBlockRendererProps) => {
    return (
        <Timeline
            active={blocks.length}
            bulletSize={30}
            classNames={{
                root: classes.timelineRoot,
                item: classes.timelineItem,
                itemBullet: classes.timelineItemBullet
            }}
            lineWidth={1}
        >
            {blocks.map((block, index) => {
                // Шаг с добавлением подписки — главное действие, его и выделяем красным
                const isKeyStep = block.buttons.some(
                    (button) => button.type === 'subscriptionLink'
                )

                return (
                    <Timeline.Item
                        bullet={
                            <span className={clsx(classes.num, isKeyStep && classes.numKey)}>
                                {index + 1}
                            </span>
                        }
                        key={index}
                        title={
                            <Text
                                className={classes.stepTitle}
                                dangerouslySetInnerHTML={{
                                    __html: getLocalizedText(block.title, currentLang)
                                }}
                                size={isMobile ? 'sm' : 'md'}
                            />
                        }
                    >
                        <Stack gap="sm" pt={4}>
                            <Text
                                className={classes.stepText}
                                dangerouslySetInnerHTML={{
                                    __html: getLocalizedText(block.description, currentLang)
                                }}
                                size={isMobile ? 'xs' : 'sm'}
                            />
                            {renderBlockButtons(block.buttons, 'default')}
                        </Stack>
                    </Timeline.Item>
                )
            })}
        </Timeline>
    )
}
