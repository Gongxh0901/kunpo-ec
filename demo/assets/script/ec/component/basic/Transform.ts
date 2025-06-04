import { v2, v3, Vec2, Vec3 } from "cc";
import { ec } from "../../../header";
import { ComponentType } from "../../ComponentTypes";

const { ecclass, ecprop } = ec._ecdecorator;

@ecclass("Transform", ComponentType.Transform, { describe: "位置组件" })
export class Transform extends ec.Component {
    /** 位置 */
    private _position: Vec3 = v3(0, 0, 0);
    /** 朝向 */
    private _direction: Vec2 = v2(0, 0);
    /** 移动方向 */
    private _moveDir: Vec2 = v2(0, 0);
    protected onAdd(): void {
        this.needUpdate = false;
    }

    protected onEnter(): void {
        this._position = v3(0, 0, 0);
        // this._direction = cc.v2(0, 0);
        this._moveDir.x = Math.random() * 2 - 1;
        this._moveDir.y = Math.random() * 2 - 1;
        this._moveDir = this._moveDir.normalize();
    }

    protected onRemove(): void {
        this._position.x = 0;
        this._position.y = 0;
        this._direction.x = 0;
        this._direction.y = 0;
        this._moveDir.x = 0;
        this._moveDir.y = 0;
    }

    public setPosition(x: number | Vec3 | Vec2, y?: number): void {
        if (typeof x === "object") {
            this._position.x = x.x || 0;
            this._position.y = x.y || 0;

            x instanceof Vec3 && (this._position.z = x.z || 0);
        } else {
            this._position.x = x || 0;
            this._position.y = y || 0;
        }
    }

    public setDirection(x: number | Vec2, y?: number): void {
        if (typeof x === "object") {
            if (this._direction.x == (x.x || 0) && this._direction.y == (x.y || 0)) {
                return;
            }
            this._direction.x = x.x || 0;
            this._direction.y = x.y || 0;
        } else {
            if (this._direction.x == (x || 0) && this._direction.y == (y || 0)) {
                return
            }
            this._direction.x = x || 0;
            this._direction.y = y || 0;
        }
    }

    public setMoveDir(x: number | Vec2, y?: number): void {
        if (typeof x === "object") {
            this._moveDir.x = x.x || 0;
            this._moveDir.y = x.y || 0;
        } else {
            this._moveDir.x = x || 0;
            this._moveDir.y = y || 0;
        }
    }

    public getPosition(): Vec3 {
        return this._position;
    }

    public getDirection(): Vec2 {
        return this._direction;
    }

    public getMoveDir(): Vec2 {
        return this._moveDir;
    }
}