/**
 * @Author: Gongxh
 * @Date: 2025-02-12
 * @Description: 
 */
import { instantiate, Node, Prefab } from "cc";
import { ec, KunpoAssets } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { RootNode } from "./RootNode";
const { ecclass, ecprop } = ec._ecdecorator;

@ecclass("RenderPrefab", ComponentType.Render, { describe: "预制体渲染组件" })
export class RenderPrefab extends ec.Component {
    @ecprop({ type: "prefab", defaultValue: "", displayName: "预制体" })
    private uuid: string = "";

    private _node: Node = null;

    private _rootnode: RootNode = null;
    protected onAdd(): void {
        this.needUpdate = false;
    }

    protected onEnter(): void {
        this._rootnode = this.getComponent(ComponentType.RootNode);

        let prefab = KunpoAssets.AssetPool.getByUUID<Prefab>(this.uuid);
        let node = instantiate(prefab);
        this._rootnode.node.addChild(node);
        this._node = node;
    }

    protected onRemove(): void {
        // 组件删除时 把node回收  自行实现
        this._node.destroy();
    }
}