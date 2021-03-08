function Modal(props) {
    console.log(props)

    return(
        <>
        <div>
            <p>Modal Working!</p>
            <button onClick = {props.changeModalState}>x</button>
        </div>
        
        </>
    )
}

export default Modal;