import { ec } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { LimitMove, LimitType } from "./LimitMove";
import { Transform } from "./Transform";

const { ecclass, ecprop } = ec._ecdecorator;

@ecclass("ScreenRebound", ComponentType.ScreenRebound, { describe: "屏幕边缘反弹组件" })
export class ScreenRebound extends ec.Component {
    private _transform: Transform = null;
    private _limitmove: LimitMove = null;

    protected onAdd(): void {
        this.needUpdate = true;
    }

    protected onEnter(): void {
        this._transform = this.getComponent(ComponentType.Transform);
        this._limitmove = this.getComponent(ComponentType.LimitMove);
    }

    protected onRemove(): void {
        this._transform = null;
        this._limitmove = null;
    }

    protected onUpdate(dt: number): void {
        let limitType = this._limitmove.limitType;
        let moveDir = this._transform.getMoveDir();
        if (limitType == LimitType.LimitAll) {
            this._transform.setMoveDir(-moveDir.x, -moveDir.y);
        } else if (limitType == LimitType.LimitX) {
            this._transform.setMoveDir(-moveDir.x, moveDir.y);
        } else if (limitType == LimitType.LimitY) {
            this._transform.setMoveDir(moveDir.x, -moveDir.y);
        }
    }
}