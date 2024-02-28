import instance from "./instance";

export const get = async () => {
    try {
        const res = await instance.get('/api/')
        return res
    } catch (err) {
        console.log('에러 :', err)
    }
}