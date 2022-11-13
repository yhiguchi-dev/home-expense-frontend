import { selector, useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";

import { githubApi } from "@/modules/api/githubApi";

const gitHubUserSelector = selector({
  key: "gitHubUserSelector",
  get: async (): Promise<string> => {
    console.log("gitHubUserSelector");
    return githubApi();
  },
});

export const useGetGitHubUser = (): string => {
  return useRecoilValue(gitHubUserSelector);
};

export const useResetGitHubUser = (): (() => void) => {
  return useRecoilRefresher_UNSTABLE(gitHubUserSelector);
};
