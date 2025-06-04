/**
 * @Author: Gongxh
 * @Date: 2025-02-10
 * @Description: 纹理组件
 */
import { Node } from "cc";
import { ec } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { RootNode } from "./RootNode";
const { ecclass, ecprop } = ec._ecdecorator;

@ecclass("RenderTexture", ComponentType.Render, { describe: "渲染组件" })
export class RenderTexture extends ec.Component {
    @ecprop({ type: "spriteframe", defaultValue: "", displayName: "图片" })
    private uuid: string = "";

    private _node: Node = null;

    private _rootnode: RootNode = null;
    protected onAdd(): void {
        this.needUpdate = false;
    }

    protected onEnter(): void {
        this._rootnode = this.getComponent(ComponentType.RootNode);

        let node = new Node();
        this._rootnode.node.addChild(node);
        this._node = node;

        // let sprite = node.addComponent(ccc.Sprite);
        // sprite.spriteFrame = ec.AssetPool.getByUUID<ccc.SpriteFrame>(this.uuid);
    }

    protected onRemove(): void {
        // 组件删除时 把node回收  自行实现
        this._node.destroy();
    }
}