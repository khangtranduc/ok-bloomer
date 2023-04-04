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

export type Product = {
    product_id: number,
    suid: number,
    sname: string,
    name: string,
    thumbnail: string,
    price: number,
    rating: number,
    stock: number,
    category: string,
    description: string,
}

export type Review = {
    username: string,
    buid: number,
    product_id: number,
    title: string,
    text: string,
    timeStamp: number,
    rating: number
}

export type CartItem = {
    count: number,
    product_id: number,
    name: string,
    thumbnail: string,
    suid: number,
    price: number
}

export type Blog = {
    bid: number,
    uid: number,
    username: string,
    name?: string,
    title: string,
    text: string,
    thumbnail: string,
    timeStamp: number
}

export type Category = {
    category: string,
    count: number
}