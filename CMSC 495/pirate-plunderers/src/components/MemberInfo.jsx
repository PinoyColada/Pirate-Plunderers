const MemberInfo = (props) => {
    return (
        <div>
            <img src={props.image} alt={`${props.image} headshot`} />
            <h3>{props.name}</h3>
            <h4>{props.role}</h4>
        </div>
    )
}

export default MemberInfo;