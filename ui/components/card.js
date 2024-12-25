export const Card = (props) => {
    return (
        <div className="bg-[#1F2022] p-2 rounded-lg lg:p-8" >
            {props.children}
        </div>
    );
}