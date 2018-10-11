import { HN_API_URL } from '../config';

const genPromise = url =>
  fetch(`${HN_API_URL}/${url}.json`).then(res => res.json());

export const getItem = id => genPromise(`item/${id}`);
export const getUser = id => genPromise(`user/${id}`);

export const getTopStories = () => genPromise('topstories');
export const getNewStories = () => genPromise('newstories');
export const getBestStories = () => genPromise('beststories');
export const getAskStories = () => genPromise('askstories');
export const getShowStories = () => genPromise('showstories');
