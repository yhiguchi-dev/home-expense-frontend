type Props = {
  children: JSX.Element;
};

const CSRComponent = (props: Props): JSX.Element => {
  return props.children;
};

export default CSRComponent;
