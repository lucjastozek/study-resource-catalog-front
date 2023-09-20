import moment from "moment";
import { Resource } from "../interface/Resource";

export function sortResourcesByDate(resources: Resource[]): Resource[] {
    return resources.sort((a, b) =>
        moment(b.creation_date).diff(moment(a.creation_date))
    );
}
