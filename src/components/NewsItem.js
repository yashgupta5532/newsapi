import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date ,source} = this.props;
        return (
            <div>
                <div className="card my-3">
                    <span class="position-absolute top-0 start-85 translate-middle badge rounded-pill bg-success" style={{left:"85%",zIndex:2}}>
                    {source}</span>
                    <img src={imageUrl} className="card-img-top" alt="img" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text">By {author} on <strong><small class="text-body-secondary">{new Date(date).toGMTString()}</small></strong></p>
                        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
