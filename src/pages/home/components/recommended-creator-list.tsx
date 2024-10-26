import { Card, Flex } from 'antd';
import ArrowRightSvg from '/public/arrow-right.svg';
import { RecommendedItem } from './recommended-item';
import { EventsWrapper } from '../layout/events-wrapper';

export const RecommendedCreatorList = () => {
    return (
        <Card
            title={
                <Flex align="center" gap={4}>
                    Recommended creator
                    <img src={ArrowRightSvg} />
                </Flex>
            }
            style={{
                width: 326,
                height: 'fit-content',
            }}
            className="card-menu card-events"
        >
            <EventsWrapper>
                <RecommendedItem />
                <RecommendedItem />
                <RecommendedItem />
                <RecommendedItem />
                <RecommendedItem />
            </EventsWrapper>
        </Card>
    );
};
