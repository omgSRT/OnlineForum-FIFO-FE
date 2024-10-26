import { Card, Flex } from 'antd';
import ArrowRightSvg from '/public/arrow-right.svg';
import { EventsWrapper } from '../layout/events-wrapper';
import { EventItem } from './event-item';

export const EventList = () => {
    return (
        <Card
            title={
                <Flex align="center" gap={4}>
                    Events
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
            <EventItem />
            <EventItem />
            <EventItem />
            <EventItem />
          </EventsWrapper>
        </Card>
    );
};
