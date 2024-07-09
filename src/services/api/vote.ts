import { instance } from "../instance";

interface VoteCounts {
  supportCount: number;
  opposeCount: number;
}

export const postSupport = async (postId: number) => {
  try {
    await instance.post(`/api/vote/${postId}/support`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteSupport = async (postId: number) => {
  try {
    await instance.delete(`/api/vote/${postId}/support`);
  } catch (err) {
    console.log(err);
  }
};

export const getVote = async (postId: number) => {
  try {
    const res = await instance.get(`/api/vote/${postId}`);
    return res.data.result as "SUPPORT" | "OPPOSE";
  } catch (err) {
    console.log(err);
  }
};

export const getVoteCounts = async (postId: number) => {
  try {
    const res = await instance.get(`/api/vote/${postId}/counts`);
    return res.data.result as VoteCounts;
  } catch (err) {
    console.log(err);
  }
};

export const postOppose = async (postId: number) => {
    try {
      await instance.post(`/api/vote/${postId}/oppose`);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteOppose = async (postId: number) => {
    try {
      await instance.delete(`/api/vote/${postId}/oppose`);
    } catch (err) {
      console.log(err);
    }
  };