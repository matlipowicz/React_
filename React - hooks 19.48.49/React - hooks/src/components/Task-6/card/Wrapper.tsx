type childrenProp = {
    children: string | JSX.Element | JSX.Element[];
};

export const Wrapper = ({ children }: childrenProp) => {
    return <div className="card-wrapper">{children}</div>;
};
