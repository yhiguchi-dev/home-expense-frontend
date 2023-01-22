type Props = {
  gitHubUser: string;
};

const GitHubUser = ({ gitHubUser }: Props): JSX.Element => {
  return <div>{gitHubUser}</div>;
};
export default GitHubUser;
