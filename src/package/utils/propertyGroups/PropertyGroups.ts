import { Declaration } from "postcss";
import propertyCategories from "./propertyCategories";


export default class PropertyGroups {
    groups: Map<string, any[]>
    
    constructor() {
        this.groups = new Map([
            ["position and layout", []],
            ["display and visibility", []],
            ["clipping", []],
            ["animation", []],
            ["box model", []],
            ["background", []],
            ["typography", []],
        ]);
    }

    private getGroupFromProperty(property: string): string | null {
        return (propertyCategories[property] ?? null)
    }

    append(property: Declaration) {
        const category = this.getGroupFromProperty(property.prop);
        
        if (!category) return null;

        return this.groups.get(category)!.push(property);
    }
}