import BaseBlock from "@/classes/BaseBlock";

class Limits {
    up: BaseBlock
    right: BaseBlock
    down: BaseBlock
    left: BaseBlock

    constructor(up: BaseBlock, right: BaseBlock, down: BaseBlock, left: BaseBlock) {
        this.up = up
        this.right = right;
        this.down = down
        this.left = left
    }
}

export default Limits