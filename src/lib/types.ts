import type { UTYPE } from "../app"

export type User = {
    uid: number,
    email: string,
    fname: string,
    lname: string,
    username: string,
    utype: UTYPE,
    credit?: number,
    verified?: boolean,
    balance?: number,
    last?:string, //Stores the last message (for displaying chats)
}

export type Message = {
    suid: number,
    ruid: number,
    mid: number,
    text: string,
    timeStamp: number
}

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