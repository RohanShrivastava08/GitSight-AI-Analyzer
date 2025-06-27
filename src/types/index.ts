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
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export interface Rating {
  category: string;
  score: number;
  pros: string[];
  cons: string[];
}

export interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface AnalysisResult {
  user: GitHubUser;
  repos: Repo[];
  insights: string[];
  tips: string[];
  contributionStrategies: string[];
  languageData: { name: string; value: number }[];
  commitActivity: { name: string; total: number }[];
  ratings: Rating[];
  contributionData: ContributionData[];
}
