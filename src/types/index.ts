export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface Repo {
  name: string;
  language: string;
  stargazers_count: number;
}

export interface AnalysisResult {
  user: GitHubUser;
  repos: Repo[];
  insights: string;
  tips: string[];
  languageData: { name: string; value: number }[];
  commitActivity: { name: string; total: number }[];
}
