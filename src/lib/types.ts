export type Thread = {
    thread_id: number,
    title: string,
    timeStamp: number,
    resolved: boolean,
    labels: string[]
}

export type ThreadPost = {
    uid: number,
    post_id: number,
    username: string,
    timeStamp: number,
    solution: boolean,
    text: string
}