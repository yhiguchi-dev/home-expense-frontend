type Size = "7";

type HeightStyle = Record<Size, string>;

const heightStyle: HeightStyle = {
  "7": "h-7",
};

type Props = {
  height: Size;
};

const HomeIcon = ({ height }: Props): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${heightStyle[height]}`}
    viewBox="0 0 48 48"
  >
    <path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z" />
  </svg>
);
export default HomeIcon;
