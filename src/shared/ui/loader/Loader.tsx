import s from './Loader.module.css';
import cn from "classnames";

interface ILoader {
  className?: string;
}

export const Loader = ({ className }: ILoader) => {
  return <div className={cn(s.loader, className)}></div>;
};

export default Loader;