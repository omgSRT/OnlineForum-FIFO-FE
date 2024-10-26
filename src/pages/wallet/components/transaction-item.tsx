import { formatSignedNumber } from "@/utils/number";
import { css } from "@emotion/react";
import { Avatar, Flex, Typography } from "antd";
import { title } from "process";
import { FC } from "react";

interface TransactionItemProps {
    image: string;
    title: string;
    description: string;
    amount: number;
}

const TransactionItem: FC<TransactionItemProps> = ({ image, title, description, amount }) => {
    return <Flex css={styles} gap={15} align="center">
        <div className="image">
            <Avatar src={image} size={50}></Avatar>
        </div>
        <div>
            <div>
                <Typography.Text className="text-title">{title}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="text-description">{description}</Typography.Text>
            </div>
        </div>
        <div className={`amount ${amount > 0 ? 'deposit' : 'withdraw'}`}>{formatSignedNumber(amount)} MC</div>
    </Flex>
}

const styles = css(`
    .text-title {
        font-size: 16px;
        font-weight: 400;
    }

    .text-description {
        font-size: 14px;
        color: #bdbdbd;
    }

    .amount {
        margin-left: auto;
        font-size: 16px;
        font-weight: 400;
    }

    .deposit {
        color: #18C07A
    }
        
    .withdraw {
        color: #FF0000;
    }
`)

export default TransactionItem;