import { Node } from "cc";
import { ec } from "../../../header";
import { ComponentType } from "../../ComponentTypes";

const { ecclass, ecprop } = ec._ecdecorator;

@ecclass("RootNode", ComponentType.RootNode, { describe: "实体根节点组件" })
export class RootNode extends ec.Component {
    private _node: Node = null;
    protected onAdd(): void {
        this.needUpdate = false;

        let rootnode = new Node();
        ec.ECManager.getECWorldNode(this.entity.entityManager.name).addChild(rootnode);
        this._node = rootnode;
    }

    protected onEnter(): void {

    }

    protected onRemove(): void {
        this._node.destroy()
    }

    public get node(): Node {
        return this._node;
    }
}