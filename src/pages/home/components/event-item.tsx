import { Flex, Tag, Typography } from 'antd';
import LocationSvg from '/public/location.svg';

export const EventItem = () => {
    return (
        <Flex gap={16} className='event-item'>
            <Flex vertical justify="space-between" align="center" className="event-date-wrapper">
                <Typography.Title level={5} style={{ textTransform: 'uppercase' }}>
                    MAR
                </Typography.Title>
                <Typography.Title level={2} className="event-date">
                    12
                </Typography.Title>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={5} style={{ textTransform: 'uppercase' }}>
                    ETHVIETNAM 2024
                </Typography.Title>
                <Flex align="center" gap={6}>
                    <img src={LocationSvg} alt="location" />
                    <Typography.Text
                        style={{
                            fontSize: 10,
                        }}
                        type="secondary"
                    >
                        THISKYHALL • Ho Chi Minh, Viet Nam
                    </Typography.Text>
                </Flex>
                <Flex gap={10}>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <Tag key={index}>Blockchain</Tag>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
