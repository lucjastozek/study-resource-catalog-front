import moment from "moment";

export function formatTimeSubmitted(creation_time: string) {
    return moment().diff(moment(creation_time), "days") === 0
        ? `${moment().diff(moment(creation_time), "hours")} hours ago`
        : `${moment().diff(moment(creation_time), "days")} days ago`;
}
