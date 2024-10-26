import { Flex, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import TransactionItem from "./transaction-item";
import { css } from "@emotion/react";

const Transactions: FC = () => {
    return <div css={styles}>
        <Flex justify="space-between" className="transaction-header">
            <p>
                <Typography.Text
                    style={{
                        fontSize: 20,
                        fontWeight: 500
                    }}>Last Transaction</Typography.Text>
            </p>
            <p>
                <Link to={"#"}>
                    <Typography.Text
                        style={{
                            fontSize: 15,
                        }}>View all</Typography.Text>
                </Link>
            </p>
        </Flex>
        <Flex className="transaction-items" vertical gap={20}>
            <TransactionItem
                image=""
                amount={-1000}
                description="Description"
                title="Netflix"
            />
            <TransactionItem
                image=""
                amount={-1000}
                description="Description"
                title="Netflix"
            />
            <TransactionItem
                image=""
                amount={1000}
                description="Description"
                title="Netflix"
            />
        </Flex>
    </div>
}

const styles = css(`
    .transaction-header {
        margin-bottom: 30px;    
    }
`)
export default Transactions;