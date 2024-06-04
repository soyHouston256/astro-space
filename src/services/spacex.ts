import { type Doc, type NextData, type SpaceXAPI } from "../types/api";

export const getlastestLaunches = async () => {
    const res = await fetch("https://api.spacexdata.com/v5/launches/query",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: {},
            options: {
                sort: {
                    date_unix: "asc"
                },
                limit: 12
            },
        }),
    })

    const { docs: launches } = (await res.json()) as SpaceXAPI;
    return launches;

}
export const getlastestLaunchesById = async ({id}: {id: string}) => {
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)

    const launch = (await res.json()) as Doc;
    return launch;
}
export const getNextLaunches = async () => {
    const res = await fetch("https://api.spacexdata.com/v3/launches/next")
    const data = await res.json();
    console.log(data);
    const launch = data as NextData;
    return launch;
}
export const getPastLaunches = async () => {
    const res = await fetch("https://api.spacexdata.com/v5/launches/past?limit=10&offset=0")
    const data = await res.json();
    const limitData = data.slice(data.lenght-10, 10);
    return limitData;
}
