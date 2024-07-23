import Atlass from "@/classes/Atlass";
import {BlockColor} from "@/classes/Block";

type SpriteAtlas = {
    [key in BlockColor]: Atlass;
};

export const ball = new Atlass(3,  587,38, 38);
export const platform = new Atlass(108,176,210,18);

export const blockAtlas: SpriteAtlas = {
    yellow:   new Atlass(174,36, 42, 20),
    red:      new Atlass(0,  36, 42, 20),
    green:    new Atlass(174,0,  42, 20),
    pink:     new Atlass(116,36, 42, 20),
}
