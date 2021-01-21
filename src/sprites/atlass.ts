import Atlass from "../classes/Atlass";

const atlass: Map<string, Atlass> = new Map()
atlass.set("ball",     new Atlass(3,  587,38, 38))
atlass.set("platform", new Atlass(108,176,210,18))
atlass.set("yellow",   new Atlass(174,36, 42, 20))
atlass.set("red",      new Atlass(0,  36, 42, 20))
atlass.set("green",    new Atlass(174,0,  42, 20))
atlass.set("pink",     new Atlass(116,36, 42, 20))

export default atlass