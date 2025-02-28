import React, { ReactNode, useContext, useState } from "react";

import VisibilityControl from "../shared/VisibilityControl";
import ProductConcentrationPlot from "../plots/ProductConcentrationPlot";
import EquilibriumPlot from "../plots/EquilibriumPlot";
import RecordEquilibriumButton from "../RecordEquilibriumButton";
import { ProductOverTimeTrace } from "../plots/types";

import styles from "./layout.module.css";
import { AB, AC } from "../agent-symbols";
import ResizeContainer from "../shared/ResizeContainer";
import { SimulariumContext } from "../../simulation/context";
import HelpPopup from "../HelpPopup";
import InfoText from "../shared/InfoText";
import { ProductName, UiElement } from "../../types";

interface RightPanelProps {
    productOverTimeTraces: ProductOverTimeTrace[];
    currentProductConcentrationArray: number[];
    currentAdjustableAgentConcentration: number;
    handleRecordEquilibrium: () => void;
    equilibriumData: {
        inputConcentrations: number[];
        reactantConcentrations: number[];
        productConcentrations: number[];
        timeToEquilibrium: number[];
        colors: string[];
        kd: number;
    };
    equilibriumFeedback: ReactNode | string;
    showHelpPanel: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({
    productOverTimeTraces,
    handleRecordEquilibrium,
    equilibriumData,
    equilibriumFeedback,
    currentProductConcentrationArray,
    currentAdjustableAgentConcentration,
    showHelpPanel,
}) => {
    const { productName } = useContext(SimulariumContext);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    let data = productOverTimeTraces;
    if (currentProductConcentrationArray.length > 1) {
        data = [
            ...productOverTimeTraces,
            {
                inputConcentration: currentAdjustableAgentConcentration,
                productConcentrations: currentProductConcentrationArray,
            },
        ];
    }

    const plotHeight = height / 3 - 20; // 20px to make room for the title
    return (
        <ResizeContainer
            setWidth={setWidth}
            setHeight={setHeight}
            style={{ height: "100%" }}
        >
            <VisibilityControl notInIntroduction>
                <h3>
                    Concentration over time for{" "}
                    {productName === ProductName.AB ? <AB /> : <AC />}{" "}
                    <InfoText uiElement={UiElement.ConcentrationOverTimePlot} />
                </h3>
                <HelpPopup
                    content={
                        "Use this plot to help determine when the reaction reaches equilibrium."
                    }
                    initialOpen={showHelpPanel}
                >
                    <ProductConcentrationPlot
                        data={data}
                        width={width}
                        height={plotHeight}
                        dotsX={equilibriumData.timeToEquilibrium}
                        dotsY={equilibriumData.productConcentrations}
                        colors={equilibriumData.colors}
                    />
                </HelpPopup>
            </VisibilityControl>
            <VisibilityControl notInIntroduction notInBonusMaterial>
                <h3>
                    Equilibrium concentrations{" "}
                    <InfoText uiElement={UiElement.EquilibriumPlot} />
                </h3>
                <EquilibriumPlot
                    width={width}
                    height={plotHeight}
                    x={equilibriumData.reactantConcentrations}
                    y={equilibriumData.productConcentrations}
                    colors={equilibriumData.colors}
                    kd={equilibriumData.kd}
                />
                <div className={styles.recordButton}>
                    <RecordEquilibriumButton
                        handleRecordEquilibrium={handleRecordEquilibrium}
                    />
                </div>
                <div className={styles.feedback}>{equilibriumFeedback}</div>
            </VisibilityControl>
        </ResizeContainer>
    );
};

export default RightPanel;
