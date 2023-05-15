import postcss, { AtRule, Rule } from "postcss";
import { handleBlock } from "./handle/handleBlock";
import { Options } from "../types";
import postcsScss from "postcss-scss"

/**
 * @param options Not used for now. Only for future updates;
 */
export function GroupCSS(css: string, options: Options) {
    try {
        const result = postcsScss.parse(css);

        const listOfCssBlocks = result.nodes; // List of Css Blocks

        for (let i = 0; i < listOfCssBlocks.length; i++) {
            if (listOfCssBlocks[i].type === "rule") handleBlock(listOfCssBlocks[i] as Rule, options);
            if (listOfCssBlocks[i].type === "atrule") handleBlock(listOfCssBlocks[i] as AtRule, options);
        }

        return result.toResult().css;
    } catch(e) {
        console.error(e);
        return (e as any).toString();
    }
}