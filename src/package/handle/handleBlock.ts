import postcss, { AtRule, ChildNode, Comment, Declaration, Rule, list } from "postcss";
import PropertyGroups from "../utils/propertyGroups/PropertyGroups";
import { removeFromArrayByIndex } from "../utils/removeFromArrayByIndex";
import { Options } from "../../types";
import { isCommentGroupName } from "../utils/isCommentGroupName";

export function handleBlock(block: Rule | AtRule, options: Options) {
    const listOfProperties = block.nodes as (Declaration | Comment | Rule | AtRule)[];
    const toExec = [];
    
    // Responsible for sorting properties
    const Groups = new PropertyGroups();
    let hasUnrecognisablePropety = false;
    let currentSpacing: string | undefined = "";

    for (let i = 0; i < listOfProperties.length; i++) {
        // Handle @media @mixin
        if (listOfProperties[i].type === 'comment') {
            const comment = listOfProperties[i] as Comment; 

            if (isCommentGroupName(comment.text)) block.nodes[i] = null as any;
        }

        // Handle @media @mixin
        else if (listOfProperties[i].type === 'atrule') {
            const rule = listOfProperties[i] as AtRule; 
            
            toExec.push(() => handleBlock(rule, options));
        }
        
        // Handle nested Rule
        else if (listOfProperties[i].type === 'rule') {
            const rule = listOfProperties[i] as Rule; 
            
            toExec.push(() => handleBlock(rule, options));
        }
        
        // Handle Property Declaration
        else if (listOfProperties[i].type === 'decl') {
            const property = listOfProperties[i] as Declaration; 
            
            const wasAdded = Groups.append(property)

            if (wasAdded) block.nodes[i] = null as any; 
            else {
                hasUnrecognisablePropety = true;
                currentSpacing = block.nodes[i].raws.before;
            }
        }
    }
    
    // Remove properties that will be readded as sorted
    block.nodes = block.nodes.filter(node => !!node)

    if (hasUnrecognisablePropety) block.nodes.unshift(new Comment({ text: "Ungrouped", raws: { before: "\n" + currentSpacing } }))

    let groupsArray = Array.from(Groups.groups);

    groupsArray = groupsArray.filter(group => group[1].length > 0);

    // Append sorted properties
    for (let i = 0; i < groupsArray.length; i++) {
        const [key, value] = groupsArray[i];
        // Add comment for unsorted

        // Adding propertes
        for (let i = 0; i < value.length; i++) {
            block.nodes.unshift(value[i]);
        }
        
        // Adding propety group name as comment
        if (value.length > 0) {
            let spacing = value[0].raws.before;

            if (groupsArray.length-1 !== i) {
                spacing = "\n" + spacing;      
            }

            block.nodes.unshift(new Comment({ text: key, raws: { before: spacing } }))            
        }

    }   

    toExec.forEach(cb => cb());
}