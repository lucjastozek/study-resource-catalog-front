import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";

export function filterResourcesByTags(
    resources: Resource[],
    selectedTags: string[],
    resourceTags: TagI[]
): Resource[] {
    return resources.filter((resource) =>
        selectedTags.length > 0
            ? resourceTags
                  .filter((r) => r.resource_id === resource.resource_id)
                  .some((r) => selectedTags.includes(r.name))
            : true
    );
}
