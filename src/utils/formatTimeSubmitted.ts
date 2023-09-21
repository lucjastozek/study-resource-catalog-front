import moment from "moment";

export function formatTimeSubmitted(creation_time: string) {
    const now = moment();
    const mins = moment.utc(now.diff(creation_time)).format("m");

    if (now.diff(moment(creation_time), "days") > 0) {
        return `${now.diff(moment(creation_time), "days")} days ago`;
    } else if (now.diff(moment(creation_time), "hours") > 1) {
        return `${now.diff(moment(creation_time), "hours")} hours ago`;
    } else if (Number(mins) < 1) {
        return "Just now";
    } else if (Number(mins) < 60) {
        return `${mins} minutes ago`;
    }
}
