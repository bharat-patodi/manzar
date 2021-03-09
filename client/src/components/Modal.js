function Modal(props) {
    return(
        <>
        <div className ="overlay">
            <div className ="overlay__close-button">
                <button className="close-btn" onClick = {props.closeModal}>x</button>
            </div>
            <div className = "overlay__modal">
                <div className="overlay__modal-container">
                    <div className="overlay__modal-content-container">
                        <div className="modal__user">
                            <img src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707" alt="user-profile-picture"></img>
                            <div className = "user-info">
                                <h2 className= "portfolio_title">Personal portfolio website</h2>
                                <h4 className="user-name">Masud Rana</h4>
                                <button className="follow-user">Follow</button>
                            </div>
                        </div>

                        <div className="modal__portfolio" >
                            {/* <iframe src="https://jonny.me/" frameBorder = "0" scrolling="no" className="portfolio-preview" height="600%" width="100%"/>
                            <a href="https://jonny.me/"alt="portfolio-link" className="portfolio-link"/> */}
                            <a href="https://jonny.me/" className="portfolio-item-link"
                            style={{backgroundImage: "url(" + "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" + ")"}}
                            >

                            </a>    
                        </div>
                    
                        <div className="description-container">
                            <p>Hi Dribbblers!</p>
                            <p>This is my concept of Personal portfolio website design.
                            <br/>
                            I am available for freelance work.</p>
                            <p>I am available for work :
                            <br/>
                            <a href="mailto:abc@gamil.com">mailto:abc@gamil.com</a>
                            </p>
                        </div>
                    </div>
                    
                </div>
                </div>
            
        </div>
        
        </>
    )
}


export default Modal;
