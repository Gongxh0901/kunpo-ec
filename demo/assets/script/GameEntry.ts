import { _decorator, Component, JsonAsset, Node, Prefab } from 'cc';
import { componentUpdateOrderList } from './ec/ComponentTypes';
import { ec, KunpoAssets } from './header';
const { ccclass, property, menu } = _decorator;
@ccclass("GameEntry")
@menu("kunpo/GameEntry")
export class GameEntry extends Component {
    @property({ type: JsonAsset, displayName: "实体配置文件", tooltip: "通过kunpo-ec插件导出的配置文件" })
    private ec_config: JsonAsset = null;

    @property({ type: Node })
    private btnAddEntity: Node = null;

    @property({ type: Node })
    private btnClearWorld: Node = null;

    @property({ type: Node })
    private btnCreateWorld: Node = null;


    private world: ec.EntityManager = null;
    protected start(): void {
        this.btnAddEntity.active = false;
        this.btnClearWorld.active = false;
        this.btnCreateWorld.active = false;

        // 初始化ec
        ec.ECManager.init(this.ec_config.json);
        this.loadResources();
    }

    /** 2. 加载剩余资源 */
    private loadResources(): void {
        let paths: KunpoAssets.IAssetConfig[] = [
            { path: "prefab", type: Prefab },
        ];
        let loader = new KunpoAssets.AssetLoader("load");
        loader.start({
            configs: paths,
            complete: () => {
                console.log("loadResources complete");
                this.onCreateWorld();
            },
            fail: (msg: string, err: Error) => {
                console.error("loadResources fail", msg, err);
            },
            progress: (percent: number) => {
                console.log("loadResources progress", percent);
            }
        });
    }

    protected update(dt: number): void {
        this.world?.update(dt);
    }

    public onCreateWorld(): void {
        if (this.world) {
            return;
        }
        // 创建一个世界
        this.world = ec.ECManager.createECWorld("world", this.node, componentUpdateOrderList, 300, 10);

        this.btnAddEntity.active = true;
        this.btnClearWorld.active = true;
        this.btnCreateWorld.active = false;
    }

    public onCreateEntity(): void {
        if (!this.world) {
            console.warn("world is not created");
            return;
        }
        ec.ECManager.createEntity("world", "entity1");
    }

    public onClearWorld(): void {
        if (!this.world) {
            console.warn("world is not created");
            return;
        }
        ec.ECManager.destroyECWorld("world");
        this.world = null;

        this.btnAddEntity.active = false;
        this.btnClearWorld.active = false;
        this.btnCreateWorld.active = true;
    }
}