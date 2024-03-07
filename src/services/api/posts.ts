import { instance } from "../instance"

export interface Posts {
    title: string
    contents: string
    category: "DAILY" | "LOVE" | "EXERCISE" | "FOOD" | "ETC"
    viewCount: number
    commentCount: number
    imageUrls: string[]
    votingEnabled: boolean
}

export const getPosts = async () => {
    try {
        const res = await instance.get('/api/post')
        const posts : Posts[] = res.data.result
        return posts
    } catch (err) {
        console.log('posts 불러오기 에러 :', err)
    }
}