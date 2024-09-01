const UserViewDetail = ({record}) => {
    console.log("record", record);
    return(
        <>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <p>Ten:</p>
            <p>{record?.name}</p>
           
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            
            <p>Sdt:</p>
            <p>{record?.phone}</p>
            
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            
            <p>Email:</p>
            <p>{record?.email}</p>
            
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            
            <p>Username:</p>
            <p>{record?.username}</p>
           
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            
            <p>Address.City:</p>
            <p>{'${record?.address?.city - ${ record?.address.street}'}</p>

            
        </div>
        
        </>
    );
};
export default UserViewDetail;