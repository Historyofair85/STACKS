import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <div className="card mt-3">
            <div className="row g-0">
                <div className="col-md-4">
                <img className="card-img-top" src="https://wallpapers.com/images/high/blue-shield-marvel-logo-me8zqnsvdsii8ik5.webp" alt="random" style={{ width: "300px", height: "200px" }}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">{ post.date_created }</h6>
                        <h5 className="card-title">{ post.title }</h5>
                        <h6 className="card-subtitle">Author: { post.author.username }</h6>
                        <p className="card-text">{ post.content }</p>
                        <Link className='btn btn-primary mx-2 btn-sm' to={`/posts/${post.id}`}>Expand</Link>
                        <Link className='btn btn-primary mx-2 btn-sm' to={`/posts/${post.id}`}>Edit</Link>
                        <Link className='btn btn-primary mx-2 btm-sm' to={`/posts/${post.id}`}>Snap</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
