//import React from 'react';


function ImageCard({
    imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvrzSDN6MRRKmnlkpQ9DV3LIp7TLFDFg5B5AD-M3vMAXgOdWSONNn4TAONIb8ud1uojj4&usqp=CAU',
    description = 'VietNam'
}){
    return (
        <div className="image-row row mb-3">
                <div className="image-card col-12 col-md-3">
                    <img
                     className="img-fluid"
                     src={imageUrl}
                     alt="VietNam"
                    />
                </div>
                <div className="image-description col-12 col-md-9">
                    <h1>{description}</h1>
                </div>
            </div>
    )
}

export default ImageCard;