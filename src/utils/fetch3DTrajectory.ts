import { SimulariumController, loadSimulariumFile } from "@aics/simularium-viewer";

 const fetch3DTrajectory =  async (url: string, simulariumController: SimulariumController) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const blob = await response.blob();
                    const simulariumFile = await loadSimulariumFile(blob);
                    await simulariumController.changeFile(
                        {
                            simulariumFile: simulariumFile,
                        },
                        "example"
                    );
                } else {
                    throw new Error(`Failed to fetch - ${response.status}`);
                }
            } catch (error) {
                console.log(error);
            }
        };
    

export default fetch3DTrajectory;