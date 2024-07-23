import Atlas from "@/classes/Atlas";
import {BlockColor} from "@/classes/Block";

type SpriteAtlas = {
    [key in BlockColor]: Atlas;
};

export const ball = new Atlas(3,  587,38, 38);
export const platform = new Atlas(108,176,210,18);

export const blockAtlas: SpriteAtlas = {
    yellow:   new Atlas(174,36, 42, 20),
    red:      new Atlas(0,  36, 42, 20),
    green:    new Atlas(174,0,  42, 20),
    pink:     new Atlas(116,36, 42, 20),
}
