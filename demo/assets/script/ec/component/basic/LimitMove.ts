import { screen, view } from "cc";
import { ec } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { Transform } from "./Transform";

const { ecclass, ecprop } = ec._ecdecorator;

export enum LimitType {
    None,
    LimitX,
    LimitY,
    LimitAll,
}

@ecclass("LimitMove", ComponentType.LimitMove, { describe: "限制移动组件" })
export class LimitMove extends ec.Component {
    @ecprop({ type: "int", displayName: "半径", defaultValue: 30 })
    radius: number = 30;

    private _limitType: LimitType = LimitType.None;
    private _transform: Transform = null;
    protected onAdd(): void {
        this.needUpdate = false;
    }

    protected onEnter(): void {
        this.radius = 30;
        this._limitType = LimitType.None;
        this._transform = this.getComponent(ComponentType.Transform);
    }

    protected onRemove(): void {
        this._transform = null;
        this._limitType = LimitType.None;
        this.radius = 30;
    }

    public get limitType(): LimitType {
        return this._limitType;
    }

    public limitAdjust(moveX: number, moveY: number): { newX: number, newY: number } {
        let pos = this._transform.getPosition();
        let newX = pos.x + moveX;
        let newY = pos.y + moveY;

        let halfWidth = screen.windowSize.width / view.getScaleX() * 0.5;
        let halfHeight = screen.windowSize.height / view.getScaleY() * 0.5;

        this._limitType = LimitType.None;

        let isLimitX = false;
        let isLimitY = false;
        if (newX - this.radius < -halfWidth) {
            newX = -halfWidth + this.radius;
            isLimitX = true;
        } else if (newX + this.radius > halfWidth) {
            newX = halfWidth - this.radius;
            isLimitX = true;
        }

        if (newY - this.radius < -halfHeight) {
            newY = -halfHeight + this.radius;
            isLimitY = true;
        } else if (newY + this.radius > halfHeight) {
            newY = halfHeight - this.radius;
            isLimitY = true;
        }

        if (isLimitX && isLimitY) {
            this._limitType = LimitType.LimitAll;
        } else if (isLimitX) {
            this._limitType = LimitType.LimitX;
        } else if (isLimitY) {
            this._limitType = LimitType.LimitY;
        } else {
            this._limitType = LimitType.None;
        }
        return { newX, newY };
    }
}