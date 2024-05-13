import { atom } from "recoil";

interface BlogState {
    title: string;
    content: string;
    tags: string[]; // Specify the type of tags
  }

export const blogStateAtom = atom<BlogState>({
    key: 'blogState', // unique ID (with respect to other atoms/selectors)
    default: {
        title:"",
        content:"",
        tags:[]
    }
  });