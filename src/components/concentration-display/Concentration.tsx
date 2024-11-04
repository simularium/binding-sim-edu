import React, { useContext, useState } from "react";
import { map } from "lodash";
import { Flex } from "antd";
import classNames from "classnames";

import {
    AgentName,
    CurrentConcentration,
    InputConcentration,
    UiElement,
} from "../../types";
import { SimulariumContext } from "../../simulation/context";
import LiveConcentrationDisplay from "./LiveConcentrationDisplay";
import ConcentrationSlider from "./ConcentrationSlider";
import { PROMPT_TO_ADJUST_B, MICRO } from "../../constants";
import ResizeContainer from "../shared/ResizeContainer";
import glowStyle from "../shared/progression-control.module.css";
import InfoText from "../shared/InfoText";

import styles from "./concentration.module.css";
import numberStyles from "./concentration-slider.module.css";

interface AgentProps {
    adjustableAgent: AgentName;
    concentration: InputConcentration;
    onChange: (name: string, value: number) => void;
    onChangeComplete?: (name: string, value: number) => void;
    liveConcentration: CurrentConcentration;
}

enum HighlightState {
    Initial,
    Show,
    Off,
}

const Concentration: React.FC<AgentProps> = ({
    concentration,
    onChange,
    adjustableAgent,
    liveConcentration,
    onChangeComplete,
}) => {
    const { isPlaying, maxConcentration, page, getAgentColor } =
        useContext(SimulariumContext);
    const [width, setWidth] = useState<number>(0);

    const MARGINS = 64.2;
    // on super small screens this can result in a negative number
    const widthMinusMargins = Math.max(width - MARGINS, 0);
    const [highlightState, setHighlightState] = useState<HighlightState>(
        HighlightState.Initial
    );

    if (
        page === PROMPT_TO_ADJUST_B &&
        !isPlaying &&
        highlightState === HighlightState.Initial
    ) {
        setHighlightState(HighlightState.Show);
    }

    const handleChange = (name: string, value: number) => {
        if (highlightState === HighlightState.Show) {
            setHighlightState(HighlightState.Off);
        }
        onChange(name, value);
    };

    const getComponent = (
        agent: AgentName,
        currentConcentrationOfAgent: number
    ) => {
        if (adjustableAgent === agent && !isPlaying) {
            return (
                <ConcentrationSlider
                    min={0}
                    max={maxConcentration}
                    name={agent}
                    initialValue={concentration[agent] || 0}
                    onChange={handleChange}
                    onChangeComplete={onChangeComplete}
                    key={agent}
                />
            );
        } else {
            let percentage: number | undefined = undefined;
            const startingConcentration = concentration[agent];
            if (startingConcentration !== undefined) {
                percentage =
                    (startingConcentration / maxConcentration) *
                    widthMinusMargins;
            }
            const numberLabel = (
                <div
                    className={classNames([
                        numberStyles.numberLabel,
                        styles.concentrationLabel,
                    ])}
                >
                    {concentration[agent]}
                </div>
            );
            return (
                <>
                    {percentage && (
                        <div
                            className={styles.concentrationMarker}
                            style={{
                                left: percentage,
                            }}
                        >
                            {agent === adjustableAgent &&
                                concentration[agent] !== maxConcentration &&
                                numberLabel}
                        </div>
                    )}
                    <LiveConcentrationDisplay
                        width={widthMinusMargins}
                        agent={agent}
                        concentration={currentConcentrationOfAgent}
                    />
                </>
            );
        }
    };

    const showHighlight =
        highlightState === HighlightState.Show &&
        page === PROMPT_TO_ADJUST_B &&
        !isPlaying;
    return (
        <>
            <h3>
                Agent Concentrations{" "}
                <InfoText uiElement={UiElement.Concentration} />
            </h3>
            <Flex className={styles.container} vertical>
                {map(
                    liveConcentration,
                    (agentLiveConcentration: number, agent: AgentName) => {
                        return (
                            <Flex
                                className={classNames(styles.concentration, {
                                    [glowStyle.hintHighlight]:
                                        showHighlight &&
                                        adjustableAgent === agent,
                                })}
                                vertical
                                key={agent}
                            >
                                <span
                                    className={styles.agentName}
                                    style={{
                                        color: getAgentColor(agent),
                                    }}
                                >
                                    {agent}
                                </span>
                                <ResizeContainer
                                    className={styles.widthWrapper}
                                    setWidth={setWidth}
                                >
                                    {getComponent(
                                        agent,
                                        agentLiveConcentration
                                    )}
                                    <span className={styles.unit}>
                                        {MICRO}M
                                    </span>
                                </ResizeContainer>
                            </Flex>
                        );
                    }
                )}
            </Flex>
        </>
    );
};

export default Concentration;
