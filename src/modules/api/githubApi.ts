import { NetworkError } from "@/modules/error";
import { get } from "@/modules/http";

export const githubApi = async (): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const param = {
    url: "https://api.github.com/users/defunkt",
  };
  const response = await get<GitHubUser>(param);
  switch (response.type) {
    case "success":
      return JSON.stringify(response.body);
    default:
      throw new NetworkError(response.code, "network error");
  }
};

export type GitHubUser = {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: string;
  public_gists: string;
  followers: string;
  following: string;
  created_at: string;
  updated_at: string;
};
