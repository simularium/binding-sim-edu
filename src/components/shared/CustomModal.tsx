import React, { useState } from "react";
import { Modal } from "antd";
import { PillButton } from "./ButtonLibrary";

import styles from "./custom-modal.module.css";

interface CustomModalProps {
    title: string;
    content: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ title, content }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <PillButton
                size="small"
                ghost
                className="inline-pill"
                onClick={showModal}
            >
                {title}
            </PillButton>
            <Modal
                title={title}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                className={styles.container}
                style={{ width: "auto" }}
                okText="Close"
                footer={(_, { OkBtn }) => (
                    <>
                        <OkBtn />
                    </>
                )}
            >
                {content}
            </Modal>
        </>
    );
};

export default CustomModal;
