import { Circle, Vector } from "detect-collisions";
import { random } from "lodash";
import LiveSimulationData from "./LiveSimulationData";

class BindingInstance extends Circle {
    id: number;
    child: BindingInstance | null;
    parent: BindingInstance | null;
    bound: boolean;
    partners: number[];
    kOn?: number;
    kOff?: number;
    constructor(
        circle: Circle,
        id: number,
        partners: number[],
        kOn?: number,
        kOff?: number
    ) {
        super(circle.pos, circle.r);
        this.id = id;
        this.partners = partners;
        this.bound = false;
        this.child = null;
        this.parent = null;
        this.kOn = kOn;
        this.kOff = kOff;
    }

    private rotate(x: number, y: number, angle: number, center: number[]) {
        // center of rotation is (𝛼,𝛽) and the rotation angle is 𝜃
        //(𝑥,𝑦)↦(𝑥′,𝑦′)=(𝛼+(𝑥−𝛼)cos𝜃−(𝑦−𝛽)sin𝜃, 𝛽+(𝑥−𝛼)sin𝜃+(𝑦−𝛽)cos𝜃).
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const newX = center[0] + (x - center[0]) * cos - (y - center[1]) * sin;
        const newY = center[1] + (x - center[0]) * sin + (y - center[1]) * cos;
        return [newX, newY];
    }

    private findCenter(agent: BindingInstance, ligand: BindingInstance) {
        const dx = ligand.pos.x - agent.pos.x;
        const dy = ligand.pos.y - agent.pos.y;
        const halfdx = dx / 2;
        const halfdy = dy / 2;
        const x = agent.pos.x + halfdx;
        const y = agent.pos.y + halfdy;
        return [x, y];
    }

    private releaseFromParent() {
        this.isTrigger = false;
        this.bound = false;
        this.parent = null;
    }

    private bindToParent(
        parent: BindingInstance,
        overlapV: Vector
    ): BindingInstance {
        this.isTrigger = true;
        this.parent = parent;
        // adjust the ligand to the exact edge of the parent
        this.move(-overlapV.x, -overlapV.y);
        this.bound = true;
        return this;
    }

    /** PUBLIC METHODS BELOW */

    public move(x: number, y: number) {
        if (this.parent) {
            this.parent.move(x, y);
        } else {
            this.setPosition(this.pos.x + x, this.pos.y + y);
            if (this.child) {
                this.child.setPosition(
                    this.child.pos.x + x,
                    this.child.pos.y + y
                );
            }
        }
    }

    public isBoundPair(other: BindingInstance) {
        return this.child == other || other.child == this;
    }

    public rotateGroup(xStep: number, yStep: number) {
        if (!this.child) {
            return;
        }
        const angle = random(-Math.PI / 4, Math.PI / 4, true);
        const center = this.findCenter(this, this.child);
        const newCirclePosition = this.rotate(
            this.pos.x,
            this.pos.y,
            angle,
            center
        );
        this.setPosition(newCirclePosition[0], newCirclePosition[1]);
        const childPosX = this.child.pos.x + xStep;
        const childPosY = this.child.pos.y + yStep;
        const childPosAndRotation = this.rotate(
            childPosX,
            childPosY,
            angle,
            center
        );
        this.child.setPosition(childPosAndRotation[0], childPosAndRotation[1]);
    }

    public oneStep(
        size: number,
        timeFactor: number = LiveSimulationData.DEFAULT_TIME_FACTOR
    ) {
        if (this.bound) {
            return;
        }
        // D(r)≈(4.10901922×10^−3)/r nm^2/s
        const diffusionCoefficient = (4 * 10 ** -3) / this.r;

        const amplitude = Math.sqrt(2 * diffusionCoefficient) * timeFactor;
        let xStep = random(-amplitude, amplitude, true);
        let yStep = random(-amplitude, amplitude, true);
        const posX = this.pos.x + xStep;
        const posY = this.pos.y + yStep;
        const edge = size / 2;

        if (posX > edge + this.r) {
            const over = posX - edge;
            xStep = xStep - over;
        }
        if (posX < -edge - this.r) {
            const over = posX + edge;
            xStep = xStep - over;
        }
        if (posY > edge + this.r) {
            yStep = yStep - size;
        }
        if (posY < -edge - this.r) {
            yStep = size + yStep;
        }
        this.setPosition(this.pos.x + xStep, this.pos.y + yStep);
        if (this.child) {
            // first check if it will unbind, otherwise rotate
            const unbind = this.checkWillUnbind(this.child);
            if (!unbind) {
                this.rotateGroup(xStep, yStep);
            } else {
                return true;
            }
        }
    }

    public checkWillUnbind(ligand: BindingInstance): boolean {
        if (ligand.kOff === undefined) {
            return false;
        }
        const willUnBind = random(0, 1, true) < ligand.kOff;
        if (!willUnBind) {
            return false;
        }
        this.child = null;
        this.isTrigger = false;
        ligand.releaseFromParent();
        // QUESTION: should the ligand be moved to a random position?
        return true;
    }

    public checkWillBind(ligand: BindingInstance, overlapV: Vector): boolean {
        if (ligand.bound || this.child) {
            // already have bound ligand or already bound
            // can't bind to another ligand
            return false;
        }
        if (ligand.kOn === undefined) {
            return false;
        }
        const willBind = random(0, 1, true) < ligand.kOn;
        if (!willBind) {
            return false;
        }
        this.isTrigger = true;
        this.child = ligand.bindToParent(this, overlapV);
        return true;
    }
}

export default BindingInstance;
